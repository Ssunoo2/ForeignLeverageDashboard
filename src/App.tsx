import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BarChart3, BookOpen, CheckCircle2, ClipboardCheck, ClipboardList, Compass, GitCompare, Globe2, Home, Info, ListChecks, Map, Search } from "lucide-react";
import { categoryDefinitions } from "./data/categoryDefinitions";
import { defaultProfileId, getWeightingProfile, weightingProfiles } from "./data/weightingProfiles";
import { countries, getCountryBySlug, slugifyCountry } from "./lib/countryUtils";
import { assessCountryDataQuality, rankCountriesByDataQuality } from "./lib/dataQuality";
import { buildDiscoveryRecommendation, defaultDiscoveryAnswers, pushFactorOptions, type DiscoveryAnswers, type DiscoveryPushFactor, type DiscoveryRiskTolerance, type DiscoveryTimeHorizon } from "./lib/discovery";
import { getResearchQueue, researchFilterOptions, summarizeResearchQueue, type ResearchFilterId, type ResearchIssueType, type ResearchPriority } from "./lib/research";
import { calculateAllProfileScores, calculateCategoryCompletion, calculateWeightedScore, confidenceRank, formatScore, getAverageConfidence, getFreshnessStatus } from "./lib/scoring";
import { summarizeValidation, validateCountry } from "./lib/validation";
import type { Confidence, CountryEvaluation } from "./types/country";
import type { CategoryId } from "./types/scoring";
import { CategoryBarChart } from "./components/CategoryBarChart";
import { DataQualityPanel } from "./components/DataQualityPanel";
import { ConfidenceBadge } from "./components/ConfidenceBadge";
import { CountryCard } from "./components/CountryCard";
import { CountryScoreTable } from "./components/CountryScoreTable";
import { DataFreshnessBadge } from "./components/DataFreshnessBadge";
import { ProfileSelector } from "./components/ProfileSelector";
import { ProfileScoreCard } from "./components/ProfileScoreCard";
import { ResearchTasksPanel } from "./components/ResearchTasksPanel";
import { RiskBadge } from "./components/RiskBadge";
import { ScoreBar } from "./components/ScoreBar";
import { WeightedRankingTable } from "./components/WeightedRankingTable";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/discover", label: "Discover", icon: Compass },
  { path: "/countries", label: "Countries", icon: Map },
  { path: "/rankings", label: "Rankings", icon: BarChart3 },
  { path: "/compare", label: "Compare", icon: GitCompare },
  { path: "/research", label: "Research", icon: ClipboardList },
  { path: "/review", label: "Review", icon: ClipboardCheck },
  { path: "/methodology", label: "Methodology", icon: Info },
  { path: "/sources", label: "Sources", icon: BookOpen }
];

const categoryGroups = ["All", ...Array.from(new Set(categoryDefinitions.map((category) => category.group)))];
const confidenceOptions: Array<"Any" | Confidence> = ["Any", "Low", "Medium", "High"];
const researchIssueOptions: Array<"All" | ResearchIssueType> = ["All", "missing_category", "source_gap", "missing_metrics", "low_confidence", "stale"];
const priorityOptions: Array<"All" | ResearchPriority> = ["All", "High", "Medium", "Low"];
const discoveryDealbreakerIds: CategoryId[] = [
  "legal_residency",
  "safety",
  "healthcare",
  "cost_of_living",
  "currency_banking",
  "tax_treatment",
  "property_rights",
  "climate_resilience",
  "civil_liberties",
  "global_connectivity",
  "family_suitability",
  "digital_freedom"
];

export function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [profileId, setProfileId] = useState(defaultProfileId);
  const profile = getWeightingProfile(profileId);
  const validationIssues = useMemo(() => countries.flatMap(validateCountry), []);
  const validationSummary = useMemo(() => summarizeValidation(validationIssues), [validationIssues]);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page = renderPage(path, profileId, setProfileId, navigate);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <Globe2 aria-hidden="true" size={28} />
          <div>
            <strong>Foreign Leverage</strong>
            <span>Relocation dashboard</span>
          </div>
        </div>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/" ? path === "/" : path.startsWith(item.path);
            return (
              <button className={active ? "nav-link active" : "nav-link"} key={item.path} onClick={() => navigate(item.path)}>
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-panel">
          <span className="section-label">Data Mode</span>
          <p>Demo data only. Scores are placeholders for interface development and require source review.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              <ListChecks aria-hidden="true" size={14} />
              Static prototype
            </p>
            <h1>{getPageTitle(path)}</h1>
          </div>
          <ProfileSelector selectedProfileId={profileId} onChange={setProfileId} />
        </header>

        {validationIssues.length > 0 ? (
          <div className="validation-strip">
            <AlertTriangle aria-hidden="true" size={18} />
            <span>
              {validationSummary.errors} errors and {validationSummary.warnings} warnings are visible in the data layer.
            </span>
          </div>
        ) : null}

        {page}
      </main>
    </div>
  );
}

function renderPage(
  path: string,
  profileId: string,
  setProfileId: (profileId: string) => void,
  navigate: (path: string) => void
) {
  const profile = getWeightingProfile(profileId);

  if (path.startsWith("/countries/")) {
    const slug = path.split("/").filter(Boolean)[1];
    const country = getCountryBySlug(slug);
    return country ? <CountryDetailPage country={country} onNavigate={navigate} /> : <NotFoundPage onNavigate={navigate} />;
  }

  if (path === "/discover") return <DiscoverPage onNavigate={navigate} />;
  if (path === "/countries") return <CountriesPage profileId={profileId} onNavigate={navigate} />;
  if (path === "/rankings") return <RankingsPage profileId={profileId} setProfileId={setProfileId} onNavigate={navigate} />;
  if (path === "/compare") return <ComparePage />;
  if (path === "/research") return <ResearchPage onNavigate={navigate} />;
  if (path === "/review") return <ReviewPage onNavigate={navigate} />;
  if (path === "/methodology") return <MethodologyPage />;
  if (path === "/sources") return <SourcesPage />;
  return <DashboardPage profileId={profile.id} onNavigate={navigate} />;
}

function getPageTitle(path: string) {
  if (path.startsWith("/countries/")) return "Country Detail";
  if (path === "/discover") return "Find Your Fit";
  if (path === "/countries") return "Countries";
  if (path === "/rankings") return "Weighted Rankings";
  if (path === "/compare") return "Compare Countries";
  if (path === "/research") return "Research Queue";
  if (path === "/review") return "Review Dashboard";
  if (path === "/methodology") return "Methodology";
  if (path === "/sources") return "Sources";
  return "Dashboard";
}

function DashboardPage({ profileId, onNavigate }: { profileId: string; onNavigate: (path: string) => void }) {
  const profile = getWeightingProfile(profileId);

  return (
    <div className="page-stack">
      <section className="hero-band">
        <div>
          <p className="eyebrow">
            <Search aria-hidden="true" size={14} />
            Country to category scores to weighting profile to computed ranking
          </p>
          <h2>Structured relocation research without pretending uncertainty disappeared.</h2>
          <p>
            The prototype ranks countries from static JSON files, shows confidence and missing categories, and keeps the
            source-review caveats attached to the score.
          </p>
        </div>
        <div className="hero-metrics" aria-label="Prototype metrics">
          <div>
            <strong>{countries.length}</strong>
            <span>demo countries</span>
          </div>
          <div>
            <strong>{categoryDefinitions.length}</strong>
            <span>category IDs</span>
          </div>
          <div>
            <strong>{weightingProfiles.length}</strong>
            <span>profiles</span>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Current profile</p>
            <h2>{profile.label}</h2>
            <p>{profile.description}</p>
          </div>
          <button className="primary-button" onClick={() => onNavigate("/rankings")}>
            Open rankings
          </button>
        </div>
        <WeightedRankingTable countries={countries} profile={profile} onNavigate={onNavigate} />
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Country cards</p>
            <h2>Demo evaluations</h2>
          </div>
          <button className="secondary-button" onClick={() => onNavigate("/countries")}>
            View all
          </button>
        </div>
        <div className="country-grid">
          {countries.map((country) => (
            <CountryCard key={country.iso_code} country={country} profile={profile} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}

function DiscoverPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [answers, setAnswers] = useState<DiscoveryAnswers>(defaultDiscoveryAnswers);
  const regions = ["All", ...Array.from(new Set(countries.map((country) => country.region)))];
  const recommendation = buildDiscoveryRecommendation(countries, answers);

  const togglePushFactor = (factor: DiscoveryPushFactor) => {
    setAnswers((current) => {
      const hasFactor = current.pushFactors.includes(factor);
      const nextFactors = hasFactor
        ? current.pushFactors.filter((item) => item !== factor)
        : [...current.pushFactors, factor];
      return { ...current, pushFactors: nextFactors.length > 0 ? nextFactors : current.pushFactors };
    });
  };

  const toggleDealbreaker = (categoryId: CategoryId) => {
    setAnswers((current) => {
      const hasCategory = current.dealbreakers.includes(categoryId);
      return {
        ...current,
        dealbreakers: hasCategory
          ? current.dealbreakers.filter((item) => item !== categoryId)
          : [...current.dealbreakers, categoryId]
      };
    });
  };

  return (
    <div className="page-stack">
      <section className="hero-band discover-hero">
        <div>
          <p className="eyebrow">
            <Compass aria-hidden="true" size={14} />
            Guided discovery
          </p>
          <h2>Start with why you might leave, then discover countries that fit.</h2>
          <p>
            This flow maps your pressures and dealbreakers to a weighting profile, priority categories, and a short list.
            It is a discovery aid, not advice or a final relocation plan.
          </p>
        </div>
        <div className="hero-metrics">
          <div>
            <strong>{recommendation.profileLabel}</strong>
            <span>recommended lens</span>
          </div>
          <div>
            <strong>{recommendation.shortlist.length}</strong>
            <span>shortlist countries</span>
          </div>
        </div>
      </section>

      <section className="discover-layout">
        <div className="discover-form">
          <article className="card">
            <span className="section-label">What is pushing you to look abroad?</span>
            <div className="option-grid">
              {pushFactorOptions.map((option) => {
                const selected = answers.pushFactors.includes(option.id);
                return (
                  <button className={selected ? "option-card active" : "option-card"} key={option.id} onClick={() => togglePushFactor(option.id)}>
                    <strong>{option.label}</strong>
                    <span>{option.description}</span>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="card">
            <span className="section-label">What are your dealbreakers?</span>
            <div className="chip-grid">
              {discoveryDealbreakerIds.map((categoryId) => {
                const definition = categoryDefinitions.find((category) => category.id === categoryId);
                const selected = answers.dealbreakers.includes(categoryId);
                return (
                  <button className={selected ? "toggle-chip active" : "toggle-chip"} key={categoryId} onClick={() => toggleDealbreaker(categoryId)}>
                    {definition?.label ?? categoryId}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="filter-panel discover-controls">
            <label>
              <span className="section-label">Risk tolerance</span>
              <select value={answers.riskTolerance} onChange={(event) => setAnswers({ ...answers, riskTolerance: event.target.value as DiscoveryRiskTolerance })}>
                <option value="low">Low: prioritize stability</option>
                <option value="medium">Medium: tradeoffs are acceptable</option>
                <option value="high">High: frontier upside is okay</option>
              </select>
            </label>
            <label>
              <span className="section-label">Time horizon</span>
              <select value={answers.timeHorizon} onChange={(event) => setAnswers({ ...answers, timeHorizon: event.target.value as DiscoveryTimeHorizon })}>
                <option value="test_stay">1-3 month test stay</option>
                <option value="one_year">One-year base</option>
                <option value="five_years">Five-year plan</option>
                <option value="decade_plus">10+ year hedge</option>
              </select>
            </label>
            <label>
              <span className="section-label">Region</span>
              <select value={answers.preferredRegion} onChange={(event) => setAnswers({ ...answers, preferredRegion: event.target.value })}>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </label>
          </article>
        </div>

        <aside className="discover-results">
          <article className="card recommendation-card">
            <span className="section-label">Recommended profile</span>
            <h2>{recommendation.profileLabel}</h2>
            <p>{recommendation.profileReason}</p>
            <button className="secondary-button" onClick={() => onNavigate("/rankings")}>
              Open rankings
            </button>
          </article>

          <article className="card">
            <span className="section-label">Priority categories</span>
            <div className="priority-category-list">
              {recommendation.priorityCategories.map((category) => (
                <div key={category.categoryId}>
                  <strong>{category.label}</strong>
                  <p>{category.reason}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Suggested shortlist</p>
            <h2>Countries to inspect next</h2>
            <p>These are ranked from the selected profile, adjusted for your dealbreakers and risk tolerance.</p>
          </div>
        </div>
        <div className="shortlist-grid">
          {recommendation.shortlist.length > 0 ? recommendation.shortlist.map((item, index) => (
            <article className="card shortlist-card" key={item.country.iso_code}>
              <div className="shortlist-rank">
                <span>#{index + 1}</span>
                {item.overlooked ? <span className="badge freshness">May be overlooked</span> : null}
              </div>
              <h3>{item.country.country}</h3>
              <div className="score-pill inline-score">
                <strong>{formatScore(item.score)}</strong>
                <span>fit score</span>
              </div>
              <p>{item.fitReason}</p>
              <div className="tag-row">
                {item.caveats.map((caveat) => (
                  <RiskBadge key={caveat} label={caveat} />
                ))}
              </div>
              <button className="text-button" onClick={() => onNavigate(`/countries/${slugifyCountry(item.country.country)}`)}>
                Inspect evidence
              </button>
            </article>
          )) : (
            <article className="card empty-state">
              <span className="section-label">No shortlist</span>
              <p>No countries match the current region filter. Try All regions.</p>
            </article>
          )}
        </div>
      </section>

      <section className="callout">
        <AlertTriangle aria-hidden="true" size={18} />
        <div>
          <strong>Discovery caveats</strong>
          <ul>
            {recommendation.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function CountriesPage({ profileId, onNavigate }: { profileId: string; onNavigate: (path: string) => void }) {
  const profile = getWeightingProfile(profileId);

  return (
    <div className="page-stack">
      <PageIntro
        title="Country Evaluations"
        copy="Each card is rendered from a country JSON file. Computed profile scores are derived from category-level scores and the active weighting profile."
      />
      <div className="country-grid">
        {countries.map((country) => (
          <CountryCard key={country.iso_code} country={country} profile={profile} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

function RankingsPage({
  profileId,
  setProfileId,
  onNavigate
}: {
  profileId: string;
  setProfileId: (profileId: string) => void;
  onNavigate: (path: string) => void;
}) {
  const profile = getWeightingProfile(profileId);
  const [regionFilter, setRegionFilter] = useState("All");
  const [minimumConfidence, setMinimumConfidence] = useState<"Any" | Confidence>("Any");
  const [minimumCompletion, setMinimumCompletion] = useState(0);
  const [excludeStale, setExcludeStale] = useState(false);
  const regions = ["All", ...Array.from(new Set(countries.map((country) => country.region)))];
  const filteredCountries = countries.filter((country) => {
    const weightedScore = calculateWeightedScore(country, profile);
    const averageConfidence = getAverageConfidence(country);
    const freshness = getFreshnessStatus(country.evaluation_date);

    if (regionFilter !== "All" && country.region !== regionFilter) return false;
    if (minimumConfidence !== "Any" && confidenceRank(averageConfidence) < confidenceRank(minimumConfidence)) return false;
    if (weightedScore.completionRate * 100 < minimumCompletion) return false;
    if (excludeStale && freshness !== "Current") return false;
    return true;
  });

  return (
    <div className="page-stack">
      <PageIntro
        title="Profile-Based Rankings"
        copy="Scores are normalized to 0-100 from available category scores. Missing profile categories are excluded from the denominator and shown as incomplete."
      />
      <div className="toolbar-card">
        <ProfileSelector selectedProfileId={profileId} onChange={setProfileId} />
        <p>{profile.description}</p>
      </div>
      <div className="filter-panel">
        <label>
          <span className="section-label">Region</span>
          <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="section-label">Minimum Confidence</span>
          <select value={minimumConfidence} onChange={(event) => setMinimumConfidence(event.target.value as "Any" | Confidence)}>
            {confidenceOptions.map((confidence) => (
              <option key={confidence} value={confidence}>
                {confidence}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="section-label">Minimum Completion</span>
          <input
            max="100"
            min="0"
            step="5"
            type="range"
            value={minimumCompletion}
            onChange={(event) => setMinimumCompletion(Number(event.target.value))}
          />
          <strong>{minimumCompletion}%</strong>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" checked={excludeStale} onChange={(event) => setExcludeStale(event.target.checked)} />
          Exclude stale or unknown
        </label>
      </div>
      <p className="result-note">
        Showing {filteredCountries.length} of {countries.length} countries. Filters change the view only; source JSON is unchanged.
      </p>
      <WeightedRankingTable countries={filteredCountries} profile={profile} onNavigate={onNavigate} />
    </div>
  );
}

function CountryDetailPage({ country, onNavigate }: { country: CountryEvaluation; onNavigate: (path: string) => void }) {
  const profileScores = calculateAllProfileScores(country);
  const completion = calculateCategoryCompletion(country);
  const validationIssues = validateCountry(country);
  const [evidenceFilter, setEvidenceFilter] = useState<ResearchFilterId>("all");

  return (
    <div className="page-stack">
      <button className="text-button back-button" onClick={() => onNavigate("/countries")}>
        Back to countries
      </button>

      <section className="detail-header">
        {country.hero_image ? (
          <figure className="detail-hero-image">
            <img src={country.hero_image.url} alt={country.hero_image.alt} />
            <figcaption>
              Image:{" "}
              <a href={country.hero_image.source_url} target="_blank" rel="noreferrer">
                {country.hero_image.credit}
              </a>
              {" / "}
              {country.hero_image.license}
            </figcaption>
          </figure>
        ) : null}
        <div>
          <p className="eyebrow">{country.region} / {country.subregion}</p>
          <h2>{country.country}</h2>
          <p>{country.overall_summary}</p>
          <div className="badge-row">
            <ConfidenceBadge confidence={getAverageConfidence(country)} />
            <DataFreshnessBadge date={country.evaluation_date} />
            <span className="badge completion">{Math.round(completion * 100)}% category coverage</span>
            <span className="badge review">{country.human_review.status}</span>
          </div>
        </div>
        <div className="detail-score-panel">
          <span className="section-label">Evaluation date</span>
          <strong>{country.evaluation_date}</strong>
          <p>{country.evaluated_by}</p>
        </div>
      </section>

      <section className="profile-score-grid">
        {profileScores.map((result) => {
          const profile = getWeightingProfile(result.profileId);
          return <ProfileScoreCard country={country} key={profile.id} profile={profile} result={result} />;
        })}
      </section>

      <DataQualityPanel country={country} />
      <ResearchTasksPanel country={country} />

      <section className="detail-grid">
        <SummaryList title="Major Strengths" items={country.major_strengths} tone="positive" />
        <SummaryList title="Major Weaknesses" items={country.major_weaknesses} tone="caution" />
        <SummaryList title="Major Risks" items={country.major_risks} tone="risk" />
        <SummaryList title="Open Questions" items={country.open_questions} tone="neutral" />
      </section>

      <section className="callout">
        <CheckCircle2 aria-hidden="true" size={18} />
        <div>
          <strong>Source status</strong>
          <p>{country.source_notes.join(" ")}</p>
        </div>
      </section>

      {validationIssues.length > 0 ? (
        <section className="card">
          <span className="section-label">Validation Notes</span>
          <ul>
            {validationIssues.map((issue) => (
              <li key={issue.message}>{issue.message}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Category visualization</p>
            <h2>Score distribution</h2>
          </div>
        </div>
        <CategoryBarChart country={country} />
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Category evidence</p>
            <h2>Scores, rationales, and caveats</h2>
            <p>Filter the category evidence by research status to focus on source gaps, missing metrics, stale categories, or Low confidence scores.</p>
          </div>
        </div>
        <div className="research-filter-row">
          {researchFilterOptions.map((option) => (
            <button
              className={evidenceFilter === option.id ? "toggle-chip active" : "toggle-chip"}
              key={option.id}
              onClick={() => setEvidenceFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <CountryScoreTable country={country} filter={evidenceFilter} />
      </section>
    </div>
  );
}

function ResearchPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [countryFilter, setCountryFilter] = useState("All");
  const [issueFilter, setIssueFilter] = useState<"All" | ResearchIssueType>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | ResearchPriority>("All");
  const queue = getResearchQueue(countries);
  const summary = summarizeResearchQueue(queue);
  const filteredQueue = queue.filter((task) => {
    if (countryFilter !== "All" && task.isoCode !== countryFilter) return false;
    if (issueFilter !== "All" && task.type !== issueFilter) return false;
    if (priorityFilter !== "All" && task.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="page-stack">
      <PageIntro
        title="Research Queue"
        copy="This page turns country data gaps into an editorial work queue. It does not change scores; it shows what evidence needs attention next."
      />

      <section className="review-metrics">
        <article className="metric-card">
          <span>Open tasks</span>
          <strong>{queue.length}</strong>
          <small>{summary.high} high priority</small>
        </article>
        <article className="metric-card">
          <span>Source gaps</span>
          <strong>{summary.sourceGaps}</strong>
          <small>need stronger evidence</small>
        </article>
        <article className="metric-card">
          <span>Missing metrics</span>
          <strong>{summary.missingMetrics}</strong>
          <small>need structured citations</small>
        </article>
        <article className="metric-card">
          <span>Low confidence</span>
          <strong>{summary.lowConfidence}</strong>
          <small>need review before upgrade</small>
        </article>
      </section>

      <section className="filter-panel">
        <label>
          <span className="section-label">Country</span>
          <select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}>
            <option value="All">All</option>
            {countries.map((country) => (
              <option key={country.iso_code} value={country.iso_code}>
                {country.country}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="section-label">Issue Type</span>
          <select value={issueFilter} onChange={(event) => setIssueFilter(event.target.value as "All" | ResearchIssueType)}>
            {researchIssueOptions.map((issue) => (
              <option key={issue} value={issue}>
                {formatResearchLabel(issue)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="section-label">Priority</span>
          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as "All" | ResearchPriority)}>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
      </section>

      <p className="result-note">
        Showing {filteredQueue.length} of {queue.length} research tasks.
      </p>

      <section className="task-list research-queue-list">
        {filteredQueue.map((task) => (
          <article className="task-row" key={task.id}>
            <div>
              <div className="task-meta-line">
                <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                <span className="badge freshness">{task.country}</span>
                <span className="badge completion">{formatResearchLabel(task.type)}</span>
              </div>
              <strong>{task.title}</strong>
              <p>{task.detail}</p>
              <small>{task.group} / {task.categoryLabel}</small>
            </div>
            <button className="secondary-button" onClick={() => onNavigate(`/countries/${slugifyCountry(task.country)}`)}>
              Open country
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ComparePage() {
  const [selectedSlugs, setSelectedSlugs] = useState(countries.slice(0, 3).map((country) => slugifyCountry(country.country)));
  const [profileId, setProfileId] = useState(defaultProfileId);
  const [groupFilter, setGroupFilter] = useState("All");
  const profile = getWeightingProfile(profileId);
  const selectedCountries = countries.filter((country) => selectedSlugs.includes(slugifyCountry(country.country)));
  const visibleCategories = categoryDefinitions.filter((category) =>
    (groupFilter === "All" || category.group === groupFilter) &&
    selectedCountries.some((country) => country.category_scores.some((score) => score.category_id === category.id))
  );

  const toggleCountry = (country: CountryEvaluation) => {
    const slug = slugifyCountry(country.country);
    setSelectedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 5) return current;
      return [...current, slug];
    });
  };

  return (
    <div className="page-stack">
      <PageIntro
        title="Side-by-Side Comparison"
        copy="Compare category scores without collapsing the countries into a single universal answer."
      />

      <div className="toolbar-card compare-toolbar">
        <ProfileSelector selectedProfileId={profileId} onChange={setProfileId} />
        <label className="profile-selector">
          <span>Group</span>
          <select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
            {categoryGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>
        <div className="country-toggle-row">
          {countries.map((country) => {
            const selected = selectedSlugs.includes(slugifyCountry(country.country));
            return (
              <button className={selected ? "toggle-chip active" : "toggle-chip"} key={country.iso_code} onClick={() => toggleCountry(country)}>
                {country.country}
              </button>
            );
          })}
        </div>
      </div>

      <div className="comparison-grid">
        {selectedCountries.map((country) => {
          const score = calculateAllProfileScores(country).find((result) => result.profileId === profile.id);
          return (
            <article className="metric-card" key={country.iso_code}>
              <span>{country.country}</span>
              <strong>{formatScore(score?.score ?? null)}</strong>
              <ScoreBar value={score?.score ?? null} compact />
              <small>{country.best_for.slice(0, 2).join(", ")}</small>
            </article>
          );
        })}
      </div>

      <section className="detail-grid">
        {selectedCountries.map((country) => (
          <article className="card" key={country.iso_code}>
            <span className="section-label">{country.country}</span>
            <h3>Strengths and risks</h3>
            <div className="compare-chip-block">
              <span className="section-label">Best for</span>
              <div className="tag-row">
                {country.best_for.slice(0, 3).map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="compare-chip-block">
              <span className="section-label">Risks</span>
              <div className="tag-row">
                {country.major_risks.slice(0, 3).map((risk) => (
                  <RiskBadge key={risk} label={risk} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="table-shell">
        <table className="ranking-table compare-table">
          <thead>
            <tr>
              <th>Category</th>
              {selectedCountries.map((country) => (
                <th key={country.iso_code}>{country.country}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleCategories.map((category) => (
              <tr key={category.id}>
                <td>
                  <strong>{category.label}</strong>
                  <p className="cell-note">{category.group}</p>
                </td>
                {selectedCountries.map((country) => {
                  const score = country.category_scores.find((item) => item.category_id === category.id);
                  return (
                    <td key={country.iso_code}>
                      {score ? (
                        <>
                          <strong>{score.score}/10</strong>
                          <div className="badge-row">
                            <ConfidenceBadge confidence={score.confidence} />
                          </div>
                        </>
                      ) : (
                        <span className="missing">Missing</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReviewPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const ranked = rankReviewCountries();
  const totalBlockers = ranked.reduce((sum, item) => sum + item.quality.blockers.length, 0);
  const totalSourceGaps = ranked.reduce((sum, item) => sum + item.quality.issueCounts.sourceGapCategories, 0);
  const reviewedCount = ranked.filter((item) => item.quality.reviewed).length;

  return (
    <div className="page-stack">
      <PageIntro
        title="Country Review Dashboard"
        copy="This editorial dashboard separates data readiness from relocation desirability. It helps decide which country files need sources, review, or category coverage before their scores should be trusted."
      />

      <section className="review-metrics">
        <article className="metric-card">
          <span>Reviewed files</span>
          <strong>{reviewedCount}</strong>
          <small>of {countries.length}</small>
        </article>
        <article className="metric-card">
          <span>Total blockers</span>
          <strong>{totalBlockers}</strong>
          <small>across country files</small>
        </article>
        <article className="metric-card">
          <span>Source gap categories</span>
          <strong>{totalSourceGaps}</strong>
          <small>need stronger evidence</small>
        </article>
      </section>

      <section className="review-grid">
        {ranked.map(({ country }) => (
          <div className="review-country-card" key={country.iso_code}>
            <div className="review-card-title">
              <div>
                <p className="eyebrow">{country.region}</p>
                <h2>{country.country}</h2>
              </div>
              <button className="secondary-button" onClick={() => onNavigate(`/countries/${slugifyCountry(country.country)}`)}>
                Open country
              </button>
            </div>
            <DataQualityPanel country={country} compact />
            <ReviewDetails country={country} />
          </div>
        ))}
      </section>
    </div>
  );
}

function ReviewDetails({ country }: { country: CountryEvaluation }) {
  const quality = assessCountryDataQuality(country);
  const shownMissing = quality.missingCategoryIds.slice(0, 6);

  return (
    <div className="review-details">
      <div>
        <span className="section-label">Blockers</span>
        {quality.blockers.length > 0 ? (
          <ul>
            {quality.blockers.map((blocker) => (
              <li key={blocker}>{blocker}</li>
            ))}
          </ul>
        ) : (
          <p>No blocking review issues.</p>
        )}
      </div>
      <div>
        <span className="section-label">Next steps</span>
        <ul>
          {quality.recommendations.slice(0, 3).map((recommendation) => (
            <li key={recommendation}>{recommendation}</li>
          ))}
        </ul>
      </div>
      {shownMissing.length > 0 ? (
        <div>
          <span className="section-label">Missing categories</span>
          <div className="tag-row">
            {shownMissing.map((categoryId) => (
              <span className="badge completion" key={categoryId}>
                {categoryId}
              </span>
            ))}
            {quality.missingCategoryIds.length > shownMissing.length ? (
              <span className="badge review">+{quality.missingCategoryIds.length - shownMissing.length} more</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function rankReviewCountries() {
  return rankCountriesByDataQuality(countries);
}

function MethodologyPage() {
  return (
    <div className="page-stack">
      <PageIntro
        title="Scoring Methodology"
        copy="The app keeps raw country evaluations separate from computed rankings. Country JSON files provide category-level scores; weighting profiles calculate rankings at runtime."
      />

      <section className="method-grid">
        <article className="card">
          <span className="section-label">Score Scale</span>
          <h2>0-10 category scores</h2>
          <ul>
            <li>0-2: severe weakness or major risk</li>
            <li>3-4: below average, risky, or difficult</li>
            <li>5-6: acceptable or mixed</li>
            <li>7-8: strong with manageable caveats</li>
            <li>9-10: exceptional</li>
          </ul>
        </article>
        <article className="card">
          <span className="section-label">Confidence</span>
          <h2>Low, Medium, High</h2>
          <p>
            Confidence reflects evidence quality and freshness. Low confidence is not the same as a low score; it means the
            score needs better sourcing or review.
          </p>
        </article>
        <article className="card">
          <span className="section-label">Weighted Profiles</span>
          <h2>Different goals, different rankings</h2>
          <p>
            Balanced relocation, climate hedge, remote worker, wealth preservation, frontier upside, and family/aging
            profiles weight the same category scores differently.
          </p>
        </article>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Stable category IDs</p>
            <h2>Evaluation categories</h2>
          </div>
        </div>
        <div className="category-definition-grid">
          {categoryDefinitions.map((category) => (
            <article className="category-definition" key={category.id}>
              <span>{category.group}</span>
              <strong>{category.label}</strong>
              <p>{category.shortDescription}</p>
              <code>{category.id}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="callout">
        <AlertTriangle aria-hidden="true" size={18} />
        <div>
          <strong>Research disclaimer</strong>
          <p>
            This dashboard is an informational research tool. Country scores are structured estimates based on available
            data, source quality, and judgment. Always verify legal, tax, immigration, and investment decisions with
            qualified professionals.
          </p>
        </div>
      </section>
    </div>
  );
}

function SourcesPage() {
  return (
    <div className="page-stack">
      <PageIntro
        title="Sources and Freshness"
        copy="This page documents how country evidence should be gathered. The current prototype uses demo data, so source gaps remain visible until researched country files replace placeholders."
      />

      <section className="method-grid">
        <article className="card">
          <span className="section-label">Tier 1</span>
          <h2>Primary and institutional</h2>
          <p>Government sites, immigration ministries, tax authorities, central banks, national statistics offices, World Bank, IMF, OECD, UN agencies, WHO, IEA, FAO, IPCC, and national adaptation plans.</p>
        </article>
        <article className="card">
          <span className="section-label">Tier 2</span>
          <h2>Research and indexes</h2>
          <p>Governance indicators, Transparency International, Freedom House, Reporters Without Borders, ND-GAIN, World Justice Project, Global Peace Index, UNODC, and university research.</p>
        </article>
        <article className="card">
          <span className="section-label">Tier 3</span>
          <h2>Reputable media and analysts</h2>
          <p>Reuters, AP, Financial Times, The Economist, Bloomberg, reputable local newspapers, and clearly labeled consulting or risk-firm analysis.</p>
        </article>
        <article className="card">
          <span className="section-label">Tier 4</span>
          <h2>Soft sentiment</h2>
          <p>Numbeo, Expatistan, forums, Reddit, YouTube, real estate blogs, nomad reports, and trip reports. Useful for questions, not final scores by themselves.</p>
        </article>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Freshness expectations</p>
            <h2>What gets stale fastest</h2>
          </div>
        </div>
        <div className="table-shell">
          <table className="ranking-table source-table">
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Freshness Target</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Immigration rules", "0-6 months", "Visa and residency programs can change quickly."],
                ["Inflation and currency", "0-3 months", "Monetary stress can alter the relocation thesis fast."],
                ["Tax rules", "0-12 months", "Local treatment and U.S. interaction require current review."],
                ["Cost of living", "0-6 months", "Rent, imports, and healthcare prices move quickly."],
                ["Climate projections", "0-5 years", "Projection datasets age slower, but local adaptation and insurance change."],
                ["Property law", "0-12 months", "Foreign ownership and tax rules can shift politically."],
                ["Crime and safety", "0-24 months", "Official data may lag and local patterns vary."],
                ["Healthcare structure", "0-3 years", "System structure is slower-moving, but access and cost still need checks."]
              ].map(([type, target, reason]) => (
                <tr key={type}>
                  <td>{type}</td>
                  <td>{target}</td>
                  <td>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="callout">
        <AlertTriangle aria-hidden="true" size={18} />
        <div>
          <strong>Publication rule</strong>
          <p>
            A country should remain marked `unreviewed` until source notes, data gaps, and freshness have been checked by a human.
            This dashboard is informational and does not provide legal, tax, immigration, safety, climate, or investment advice.
          </p>
        </div>
      </section>
    </div>
  );
}

function PageIntro({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="page-intro">
      <h2>{title}</h2>
      <p>{copy}</p>
    </section>
  );
}

function SummaryList({ title, items, tone }: { title: string; items: string[]; tone: "positive" | "caution" | "risk" | "neutral" }) {
  return (
    <article className={`card summary-list summary-${tone}`}>
      <span className="section-label">{title}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function formatResearchLabel(value: string) {
  if (value === "All") return "All";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function NotFoundPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <section className="page-intro">
      <h2>Country not found</h2>
      <p>The country route does not match one of the static JSON files.</p>
      <button className="primary-button" onClick={() => onNavigate("/countries")}>
        Back to countries
      </button>
    </section>
  );
}
