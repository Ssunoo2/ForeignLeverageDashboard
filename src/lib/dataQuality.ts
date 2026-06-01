import { categoryIds } from "../data/categoryDefinitions";
import type { CategoryId } from "../types/scoring";
import type { CategoryScore, Confidence, CountryEvaluation } from "../types/country";
import { confidenceRank, getFreshnessStatus } from "./scoring";
import { summarizeValidation, validateCountry } from "./validation";

export interface DataQualityResult {
  score: number;
  status: "Demo" | "Needs Work" | "Draft" | "Review Ready" | "Reviewed";
  completionRate: number;
  reviewed: boolean;
  issueCounts: {
    validationErrors: number;
    validationWarnings: number;
    missingCategories: number;
    lowConfidence: number;
    staleCategories: number;
    sourceGapCategories: number;
    categoriesWithoutRationale: number;
  };
  blockers: string[];
  recommendations: string[];
  missingCategoryIds: CategoryId[];
}

const coreCategoryIds: CategoryId[] = [
  "legal_residency",
  "tax_treatment",
  "cost_of_living",
  "currency_banking",
  "economy_opportunity",
  "income_portability",
  "climate_resilience",
  "food_water_energy",
  "geopolitical_risk",
  "political_stability",
  "safety",
  "healthcare",
  "infrastructure",
  "property_rights",
  "culture_language",
  "global_connectivity",
  "daily_friction",
  "exit_optionality",
  "data_quality",
  "tail_risk"
];

export function getCoreCategoryIds() {
  return coreCategoryIds;
}

export function assessCountryDataQuality(country: CountryEvaluation): DataQualityResult {
  const scoredIds = new Set(country.category_scores.map((category) => category.category_id));
  const missingCategoryIds = categoryIds.filter((categoryId) => !scoredIds.has(categoryId));
  const missingCoreCategoryIds = coreCategoryIds.filter((categoryId) => !scoredIds.has(categoryId));
  const validationSummary = summarizeValidation(validateCountry(country));
  const lowConfidence = country.category_scores.filter((category) => category.confidence === "Low").length;
  const staleCategories = country.category_scores.filter((category) => getFreshnessStatus(category.last_updated) !== "Current").length;
  const sourceGapCategories = country.category_scores.filter(hasSourceGap).length;
  const categoriesWithoutRationale = country.category_scores.filter((category) => !category.rationale.trim()).length;
  const completionRate = categoryIds.length > 0 ? scoredIds.size / categoryIds.length : 0;
  const averageConfidence = calculateAverageConfidenceValue(country.category_scores);
  const sourceCoverage = country.category_scores.length > 0 ? 1 - sourceGapCategories / country.category_scores.length : 0;
  const freshnessCoverage = country.category_scores.length > 0 ? 1 - staleCategories / country.category_scores.length : 0;
  const validationPenalty = Math.min(30, validationSummary.errors * 10 + validationSummary.warnings * 2);
  const reviewedBonus = country.human_review.status === "reviewed" ? 8 : country.human_review.status === "in_review" ? 3 : 0;

  const rawScore =
    completionRate * 35 +
    averageConfidence * 20 +
    sourceCoverage * 20 +
    freshnessCoverage * 15 +
    reviewedBonus -
    validationPenalty;

  const blockers = buildBlockers(country, {
    validationErrors: validationSummary.errors,
    missingCoreCategories: missingCoreCategoryIds.length,
    lowConfidence,
    sourceGapCategories,
    categoriesWithoutRationale
  });
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  return {
    score,
    status: getDataQualityStatus(country, score, blockers),
    completionRate,
    reviewed: country.human_review.status === "reviewed",
    issueCounts: {
      validationErrors: validationSummary.errors,
      validationWarnings: validationSummary.warnings,
      missingCategories: missingCategoryIds.length,
      lowConfidence,
      staleCategories,
      sourceGapCategories,
      categoriesWithoutRationale
    },
    blockers,
    recommendations: buildRecommendations(country, {
      missingCategoryIds,
      missingCoreCategoryIds,
      lowConfidence,
      staleCategories,
      sourceGapCategories,
      validationSummary
    }),
    missingCategoryIds
  };
}

export function rankCountriesByDataQuality(countries: CountryEvaluation[]) {
  return countries
    .map((country) => ({ country, quality: assessCountryDataQuality(country) }))
    .sort((a, b) => b.quality.score - a.quality.score || a.country.country.localeCompare(b.country.country));
}

function calculateAverageConfidenceValue(categoryScores: CategoryScore[]) {
  if (categoryScores.length === 0) return 0;
  const averageRank =
    categoryScores.reduce((total, category) => total + confidenceRank(category.confidence as Confidence), 0) /
    categoryScores.length;
  return (averageRank - 1) / 2;
}

function hasSourceGap(category: CategoryScore) {
  const sourceNotesEmpty = !Array.isArray(category.source_notes) || category.source_notes.length === 0;
  const gapMentionsSource = category.data_gaps.some((gap) => /source|verify|current|review/i.test(gap));
  const placeholderSource = category.source_notes.some((note) => /demo placeholder|verify|not .*advice|no real source review/i.test(note));
  return sourceNotesEmpty || gapMentionsSource || placeholderSource;
}

function buildBlockers(
  country: CountryEvaluation,
  counts: {
    validationErrors: number;
    missingCoreCategories: number;
    lowConfidence: number;
    sourceGapCategories: number;
    categoriesWithoutRationale: number;
  }
) {
  const blockers: string[] = [];

  if (/demo placeholder|demo data|sample/i.test(country.evaluated_by) || /demo data/i.test(country.human_review.notes ?? "")) {
    blockers.push("Marked as demo or placeholder data.");
  }
  if (counts.validationErrors > 0) blockers.push("Validation errors must be resolved.");
  if (counts.missingCoreCategories > 0) blockers.push(`${counts.missingCoreCategories} core review categories are missing.`);
  if (country.category_scores.length > 0 && counts.lowConfidence / country.category_scores.length > 0.5) {
    blockers.push("More than half of scored categories are Low confidence.");
  }
  if (counts.sourceGapCategories > 0) blockers.push(`${counts.sourceGapCategories} categories need stronger or fresher source notes.`);
  if (counts.categoriesWithoutRationale > 0) blockers.push("One or more categories are missing rationales.");

  return blockers;
}

function buildRecommendations(
  country: CountryEvaluation,
  context: {
    missingCategoryIds: CategoryId[];
    missingCoreCategoryIds: CategoryId[];
    lowConfidence: number;
    staleCategories: number;
    sourceGapCategories: number;
    validationSummary: { errors: number; warnings: number };
  }
) {
  const recommendations: string[] = [];

  if (context.missingCoreCategoryIds.length > 0) {
    recommendations.push("Fill core categories from the country review checklist first.");
  } else if (context.missingCategoryIds.length > 0) {
    recommendations.push("Add remaining non-core categories to improve profile completeness.");
  }
  if (context.sourceGapCategories > 0) {
    recommendations.push("Replace placeholder source notes with Tier 1/Tier 2 sources where possible.");
  }
  if (context.lowConfidence > 0) {
    recommendations.push("Upgrade confidence only where recent credible evidence supports it.");
  }
  if (context.staleCategories > 0) {
    recommendations.push("Refresh stale category dates and re-check fast-changing claims.");
  }
  if (context.validationSummary.errors + context.validationSummary.warnings > 0) {
    recommendations.push("Resolve validation findings before human review.");
  }
  if (country.human_review.status === "unreviewed") {
    recommendations.push("Move to in_review only after source notes and gaps have been checked.");
  }

  return recommendations;
}

function getDataQualityStatus(country: CountryEvaluation, score: number, blockers: string[]): DataQualityResult["status"] {
  if (/demo placeholder|demo data|sample/i.test(country.evaluated_by) || /demo data/i.test(country.human_review.notes ?? "")) return "Demo";
  if (country.human_review.status === "reviewed" && blockers.length === 0 && score >= 80) return "Reviewed";
  if (blockers.length === 0 && score >= 70) return "Review Ready";
  if (score >= 45) return "Draft";
  return "Needs Work";
}
