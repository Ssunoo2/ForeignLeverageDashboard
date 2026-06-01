import { ArrowRight, MapPin } from "lucide-react";
import type { CountryEvaluation } from "../types/country";
import type { WeightingProfile } from "../types/scoring";
import { calculateWeightedScore, formatScore, getAverageConfidence } from "../lib/scoring";
import { slugifyCountry } from "../lib/countryUtils";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { DataFreshnessBadge } from "./DataFreshnessBadge";
import { RiskBadge } from "./RiskBadge";
import { ScoreBar } from "./ScoreBar";

interface CountryCardProps {
  country: CountryEvaluation;
  profile: WeightingProfile;
  onNavigate: (path: string) => void;
}

export function CountryCard({ country, profile, onNavigate }: CountryCardProps) {
  const result = calculateWeightedScore(country, profile);
  const slug = slugifyCountry(country.country);

  return (
    <article className="card country-card">
      <div className="country-card-header">
        <div>
          <p className="eyebrow">
            <MapPin aria-hidden="true" size={14} />
            {country.region}
          </p>
          <h3>{country.country}</h3>
        </div>
        <div className="score-pill">
          <strong>{formatScore(result.score)}</strong>
          <span>{profile.label}</span>
        </div>
      </div>

      <ScoreBar value={result.score} />

      <div className="badge-row">
        <ConfidenceBadge confidence={getAverageConfidence(country)} />
        <DataFreshnessBadge date={country.evaluation_date} />
        <span className="badge completion">{Math.round(result.completionRate * 100)}% complete</span>
      </div>

      <p className="summary">{country.overall_summary}</p>

      <div className="tag-section">
        <span className="section-label">Best for</span>
        <div className="tag-row">
          {country.best_for.slice(0, 3).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="tag-section">
        <span className="section-label">Risks</span>
        <div className="tag-row">
          {country.major_risks.slice(0, 3).map((risk) => (
            <RiskBadge label={risk} key={risk} />
          ))}
        </div>
      </div>

      <button className="text-button" onClick={() => onNavigate(`/countries/${slug}`)}>
        View detail
        <ArrowRight aria-hidden="true" size={16} />
      </button>
    </article>
  );
}
