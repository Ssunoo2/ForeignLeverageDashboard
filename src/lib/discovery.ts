import { getCategoryDefinition } from "../data/categoryDefinitions";
import { getWeightingProfile } from "../data/weightingProfiles";
import type { CountryEvaluation } from "../types/country";
import type { CategoryId } from "../types/scoring";
import { calculateWeightedScore, getAverageConfidence } from "./scoring";

export type DiscoveryPushFactor =
  | "political_instability"
  | "cost_pressure"
  | "remote_work"
  | "wealth_safety"
  | "family_safety"
  | "climate_resilience"
  | "freedom_values"
  | "retirement_healthcare"
  | "frontier_upside"
  | "soft_exit";

export type DiscoveryRiskTolerance = "low" | "medium" | "high";
export type DiscoveryTimeHorizon = "test_stay" | "one_year" | "five_years" | "decade_plus";

export interface DiscoveryAnswers {
  pushFactors: DiscoveryPushFactor[];
  dealbreakers: CategoryId[];
  riskTolerance: DiscoveryRiskTolerance;
  timeHorizon: DiscoveryTimeHorizon;
  preferredRegion: string;
}

export interface DiscoveryRecommendation {
  profileId: string;
  profileLabel: string;
  profileReason: string;
  priorityCategories: Array<{
    categoryId: CategoryId;
    label: string;
    reason: string;
  }>;
  shortlist: Array<{
    country: CountryEvaluation;
    score: number | null;
    fitReason: string;
    caveats: string[];
    overlooked: boolean;
  }>;
  warnings: string[];
}

export const defaultDiscoveryAnswers: DiscoveryAnswers = {
  pushFactors: ["political_instability", "soft_exit"],
  dealbreakers: ["legal_residency", "safety", "currency_banking"],
  riskTolerance: "medium",
  timeHorizon: "five_years",
  preferredRegion: "All"
};

export const pushFactorOptions: Array<{ id: DiscoveryPushFactor; label: string; description: string }> = [
  {
    id: "political_instability",
    label: "Political or institutional instability",
    description: "You want a credible Plan B if home conditions get worse."
  },
  {
    id: "cost_pressure",
    label: "Cost pressure",
    description: "Housing, healthcare, taxes, or daily costs are pushing you to look abroad."
  },
  {
    id: "remote_work",
    label: "Remote work or business portability",
    description: "You earn online and need internet, banking, time-zone fit, and legal stay options."
  },
  {
    id: "wealth_safety",
    label: "Wealth preservation",
    description: "You care about banking, property rights, tax predictability, and capital exit."
  },
  {
    id: "family_safety",
    label: "Family stability",
    description: "You need safety, healthcare, schools, infrastructure, and household durability."
  },
  {
    id: "climate_resilience",
    label: "Climate and resource resilience",
    description: "You are thinking about livability, water, energy, food, and tail risk."
  },
  {
    id: "freedom_values",
    label: "Freedom, autonomy, or values fit",
    description: "Civil liberties, digital freedom, culture, and legal predictability matter most."
  },
  {
    id: "retirement_healthcare",
    label: "Retirement or aging support",
    description: "Healthcare, safety, cost, and long-term support are central."
  },
  {
    id: "frontier_upside",
    label: "Frontier upside",
    description: "You will accept volatility for opportunity, low costs, or asymmetric upside."
  },
  {
    id: "soft_exit",
    label: "Soft exit or test stay",
    description: "You want optionality before deciding whether to move."
  }
];

const pushFactorProfileMap: Record<DiscoveryPushFactor, string> = {
  political_instability: "balanced",
  cost_pressure: "remote_worker",
  remote_work: "remote_worker",
  wealth_safety: "wealth_preservation",
  family_safety: "family_aging",
  climate_resilience: "climate_hedge",
  freedom_values: "balanced",
  retirement_healthcare: "family_aging",
  frontier_upside: "frontier_upside",
  soft_exit: "balanced"
};

const pushFactorCategories: Record<DiscoveryPushFactor, Array<{ categoryId: CategoryId; reason: string }>> = {
  political_instability: [
    { categoryId: "political_stability", reason: "Reduces institutional and policy volatility." },
    { categoryId: "civil_liberties", reason: "Helps avoid trading instability for authoritarian control." },
    { categoryId: "exit_optionality", reason: "Keeps future moves open." }
  ],
  cost_pressure: [
    { categoryId: "cost_of_living", reason: "Shows how much life your money buys." },
    { categoryId: "healthcare", reason: "Healthcare costs often drive relocation pressure." },
    { categoryId: "daily_friction", reason: "Low costs are less useful if daily life is painful." }
  ],
  remote_work: [
    { categoryId: "income_portability", reason: "Core fit for remote work and online business." },
    { categoryId: "infrastructure", reason: "Internet and electricity reliability are basic work infrastructure." },
    { categoryId: "digital_freedom", reason: "Online work needs open digital systems." }
  ],
  wealth_safety: [
    { categoryId: "currency_banking", reason: "Capital should not be trapped or exposed to unstable banking." },
    { categoryId: "property_rights", reason: "Property only helps if ownership and resale are reliable." },
    { categoryId: "legal_system", reason: "Contracts and disputes matter when things go wrong." }
  ],
  family_safety: [
    { categoryId: "safety", reason: "Families need predictable everyday security." },
    { categoryId: "family_suitability", reason: "Schools, childcare, and family neighborhoods matter." },
    { categoryId: "healthcare", reason: "Family healthcare quality and access are central." }
  ],
  climate_resilience: [
    { categoryId: "climate_resilience", reason: "Tests long-term physical livability." },
    { categoryId: "food_water_energy", reason: "Hard-resource security matters in bad decades." },
    { categoryId: "tail_risk", reason: "Shows how the country may behave under stress." }
  ],
  freedom_values: [
    { categoryId: "civil_liberties", reason: "Core signal for speech, movement, and personal autonomy." },
    { categoryId: "digital_freedom", reason: "Important for privacy and internet-dependent life." },
    { categoryId: "culture_language", reason: "Values fit still has to work socially." }
  ],
  retirement_healthcare: [
    { categoryId: "healthcare", reason: "Healthcare quality becomes more important with age." },
    { categoryId: "aging_suitability", reason: "A country should work at age 75, not only age 35." },
    { categoryId: "global_connectivity", reason: "Family visitation and emergency travel matter." }
  ],
  frontier_upside: [
    { categoryId: "economy_opportunity", reason: "Measures reform, growth, and opportunity." },
    { categoryId: "risk_tolerance_fit", reason: "Separates useful volatility from reckless risk." },
    { categoryId: "data_quality", reason: "Frontier narratives need extra skepticism." }
  ],
  soft_exit: [
    { categoryId: "legal_residency", reason: "A Plan B is only useful if you can legally stay." },
    { categoryId: "time_horizon_fit", reason: "Distinguishes test stays from long-term bases." },
    { categoryId: "global_connectivity", reason: "Soft exits need practical return and visit options." }
  ]
};

export function buildDiscoveryRecommendation(countries: CountryEvaluation[], answers: DiscoveryAnswers): DiscoveryRecommendation {
  const profileId = chooseProfile(answers);
  const profile = getWeightingProfile(profileId);
  const priorityCategories = buildPriorityCategories(answers);
  const regionFilteredCountries = answers.preferredRegion === "All"
    ? countries
    : countries.filter((country) => country.region === answers.preferredRegion);
  const ranked = regionFilteredCountries
    .map((country) => {
      const weighted = calculateWeightedScore(country, profile);
      const dealbreakerPenalty = calculateDealbreakerPenalty(country, answers.dealbreakers);
      const riskPenalty = calculateRiskPenalty(country, answers.riskTolerance);
      const adjustedScore = weighted.score === null ? null : Math.max(0, weighted.score - dealbreakerPenalty - riskPenalty);

      return {
        country,
        score: adjustedScore,
        fitReason: buildFitReason(country, profile.label, answers),
        caveats: buildCaveats(country, answers, weighted.completionRate),
        overlooked: isPotentiallyOverlooked(country.country)
      };
    })
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
    .slice(0, 5);

  return {
    profileId,
    profileLabel: profile.label,
    profileReason: buildProfileReason(profile.label, answers),
    priorityCategories,
    shortlist: ranked,
    warnings: buildWarnings(answers, ranked.length)
  };
}

function chooseProfile(answers: DiscoveryAnswers) {
  const counts = new Map<string, number>();
  for (const factor of answers.pushFactors) {
    const profileId = pushFactorProfileMap[factor];
    counts.set(profileId, (counts.get(profileId) ?? 0) + 1);
  }
  if (answers.riskTolerance === "low") counts.set("family_aging", (counts.get("family_aging") ?? 0) + 0.5);
  if (answers.riskTolerance === "high") counts.set("frontier_upside", (counts.get("frontier_upside") ?? 0) + 0.5);
  if (answers.timeHorizon === "decade_plus") counts.set("climate_hedge", (counts.get("climate_hedge") ?? 0) + 0.5);

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "balanced";
}

function buildPriorityCategories(answers: DiscoveryAnswers) {
  const categoryReasons = new Map<CategoryId, string>();
  for (const factor of answers.pushFactors) {
    for (const category of pushFactorCategories[factor]) {
      if (!categoryReasons.has(category.categoryId)) categoryReasons.set(category.categoryId, category.reason);
    }
  }
  for (const categoryId of answers.dealbreakers) {
    if (!categoryReasons.has(categoryId)) categoryReasons.set(categoryId, "Marked as a dealbreaker in the guided intake.");
  }

  return [...categoryReasons.entries()].slice(0, 10).map(([categoryId, reason]) => ({
    categoryId,
    label: getCategoryDefinition(categoryId)?.label ?? categoryId,
    reason
  }));
}

function calculateDealbreakerPenalty(country: CountryEvaluation, dealbreakers: CategoryId[]) {
  return dealbreakers.reduce((penalty, categoryId) => {
    const score = country.category_scores.find((category) => category.category_id === categoryId)?.score;
    if (score === undefined) return penalty + 4;
    if (score < 5) return penalty + (5 - score) * 2;
    return penalty;
  }, 0);
}

function calculateRiskPenalty(country: CountryEvaluation, riskTolerance: DiscoveryRiskTolerance) {
  if (riskTolerance === "high") return 0;
  const riskScore = country.category_scores.find((category) => category.category_id === "risk_tolerance_fit")?.score;
  const politicalScore = country.category_scores.find((category) => category.category_id === "political_stability")?.score;
  const bankingScore = country.category_scores.find((category) => category.category_id === "currency_banking")?.score;
  const weakSignals = [riskScore, politicalScore, bankingScore].filter((score): score is number => typeof score === "number" && score < 5).length;
  return riskTolerance === "low" ? weakSignals * 4 : weakSignals * 2;
}

function buildFitReason(country: CountryEvaluation, profileLabel: string, answers: DiscoveryAnswers) {
  const topBestFor = country.best_for.slice(0, 2).join(", ") || profileLabel;
  const horizon = answers.timeHorizon.replace("_", " ");
  return `${country.country} appears in this shortlist because it has signals for ${topBestFor} under a ${profileLabel} lens and a ${horizon} horizon.`;
}

function buildCaveats(country: CountryEvaluation, answers: DiscoveryAnswers, completionRate: number) {
  const caveats = [...country.major_risks.slice(0, 2)];
  if (completionRate < 0.95) caveats.push(`${Math.round(completionRate * 100)}% profile completion`);
  if (getAverageConfidence(country) === "Low") caveats.push("Low average confidence");
  for (const categoryId of answers.dealbreakers) {
    const score = country.category_scores.find((category) => category.category_id === categoryId)?.score;
    if (score !== undefined && score < 5) caveats.push(`${getCategoryDefinition(categoryId)?.label ?? categoryId} may violate a dealbreaker`);
  }
  return [...new Set(caveats)].slice(0, 4);
}

function buildProfileReason(profileLabel: string, answers: DiscoveryAnswers) {
  const factorLabels = answers.pushFactors
    .map((factor) => pushFactorOptions.find((option) => option.id === factor)?.label)
    .filter(Boolean)
    .join(", ");
  return `${profileLabel} is the closest match for these stated pressures: ${factorLabels || "general relocation optionality"}.`;
}

function buildWarnings(answers: DiscoveryAnswers, shortlistCount: number) {
  const warnings: string[] = [
    "This is a discovery aid, not legal, tax, immigration, investment, safety, or climate advice.",
    "Shortlist results depend on current static country data and visible source gaps."
  ];
  if (shortlistCount === 0) warnings.push("No countries matched the selected region filter.");
  if (answers.dealbreakers.length === 0) warnings.push("No dealbreakers selected; results may be too broad.");
  return warnings;
}

function isPotentiallyOverlooked(countryName: string) {
  return ["Uruguay", "Chile", "Paraguay", "Argentina"].includes(countryName);
}
