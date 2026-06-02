import type { CountryEvaluation, Confidence } from "../types/country";
import type { CategoryId, WeightedCategoryContribution, WeightedScoreResult, WeightingProfile } from "../types/scoring";
import { categoryIds, getCategoryDefinition } from "../data/categoryDefinitions";
import { weightingProfiles } from "../data/weightingProfiles";

const confidenceValues: Record<Confidence, number> = {
  Low: 1,
  Medium: 2,
  High: 3
};

export function confidenceRank(confidence: Confidence) {
  return confidenceValues[confidence];
}

export function calculateWeightedScore(country: CountryEvaluation, profile: WeightingProfile): WeightedScoreResult {
  const scoresByCategory = new Map(country.category_scores.map((score) => [score.category_id, score]));
  let weightedTotal = 0;
  let totalWeightUsed = 0;
  let expectedWeight = 0;
  const missingCategoryIds: CategoryId[] = [];

  for (const [categoryId, weight] of Object.entries(profile.weights) as [CategoryId, number][]) {
    expectedWeight += weight;
    const categoryScore = scoresByCategory.get(categoryId);

    if (!categoryScore || typeof categoryScore.score !== "number") {
      missingCategoryIds.push(categoryId);
      continue;
    }

    weightedTotal += categoryScore.score * weight;
    totalWeightUsed += weight;
  }

  return {
    country,
    profileId: profile.id,
    score: totalWeightUsed > 0 ? (weightedTotal / totalWeightUsed) * 10 : null,
    completionRate: expectedWeight > 0 ? totalWeightUsed / expectedWeight : 0,
    totalWeightUsed,
    missingCategoryIds
  };
}

export function rankCountries(countries: CountryEvaluation[], profile: WeightingProfile) {
  return countries
    .map((country) => calculateWeightedScore(country, profile))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
}

export function calculateAllProfileScores(country: CountryEvaluation) {
  return weightingProfiles.map((profile) => calculateWeightedScore(country, profile));
}

export function calculateProfileBreakdown(country: CountryEvaluation, profile: WeightingProfile): WeightedCategoryContribution[] {
  const scoresByCategory = new Map(country.category_scores.map((score) => [score.category_id, score]));
  const totalWeightUsed = Object.entries(profile.weights).reduce((total, [categoryId, weight]) => {
    return scoresByCategory.has(categoryId) ? total + weight : total;
  }, 0);

  return (Object.entries(profile.weights) as [CategoryId, number][])
    .map(([categoryId, weight]) => {
      const categoryScore = scoresByCategory.get(categoryId);
      const normalizedWeight = totalWeightUsed > 0 ? weight / totalWeightUsed : 0;
      const contribution = categoryScore ? categoryScore.score * normalizedWeight * 10 : null;

      return {
        categoryId,
        categoryLabel: getCategoryDefinition(categoryId)?.label ?? categoryId,
        weight,
        score: categoryScore?.score ?? null,
        confidence: categoryScore?.confidence ?? null,
        contribution,
        rationale: categoryScore?.rationale ?? null,
        missing: !categoryScore
      };
    })
    .sort((a, b) => (b.contribution ?? -1) - (a.contribution ?? -1));
}

export function calculateCategoryCompletion(country: CountryEvaluation) {
  const presentIds = new Set(country.category_scores.map((score) => score.category_id));
  return presentIds.size / categoryIds.length;
}

export function getAverageConfidence(country: CountryEvaluation): Confidence {
  if (country.category_scores.length === 0) return "Low";

  const average =
    country.category_scores.reduce((sum, category) => sum + confidenceValues[category.confidence], 0) /
    country.category_scores.length;

  if (average >= 2.5) return "High";
  if (average >= 1.5) return "Medium";
  return "Low";
}

export function getFreshnessStatus(dateText: string) {
  const timestamp = Date.parse(dateText);
  if (Number.isNaN(timestamp)) return "Unknown";

  const ageDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
  if (ageDays <= 180) return "Current";
  if (ageDays <= 365) return "Review Soon";
  return "Stale";
}

export function formatScore(score: number | null) {
  return score === null ? "N/A" : Math.round(score).toString();
}
