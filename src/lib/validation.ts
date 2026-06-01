import type { CountryEvaluation } from "../types/country";
import { categoryIdSet, categoryIds } from "../data/categoryDefinitions";

export interface ValidationIssue {
  level: "error" | "warning";
  message: string;
}

const freshnessThresholdDays = 365;

function isDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

function daysSince(dateText: string) {
  const timestamp = Date.parse(dateText);
  if (Number.isNaN(timestamp)) return Number.POSITIVE_INFINITY;
  return (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
}

export function validateCountry(country: CountryEvaluation): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seenCategoryIds = new Set<string>();

  if (!country.country) issues.push({ level: "error", message: "Country name is missing." });
  if (!country.region) issues.push({ level: "error", message: `${country.country || "Country"} region is missing.` });
  if (!country.overall_summary) issues.push({ level: "error", message: `${country.country || "Country"} needs an overall_summary.` });
  if (!/^[A-Z]{3}$/.test(country.iso_code)) {
    issues.push({ level: "warning", message: `${country.country} should use ISO 3166-1 alpha-3 code when possible.` });
  }
  if (!isDateString(country.evaluation_date)) {
    issues.push({ level: "error", message: `${country.country} has an invalid evaluation_date.` });
  }
  if (isDateString(country.evaluation_date) && daysSince(country.evaluation_date) > freshnessThresholdDays) {
    issues.push({ level: "warning", message: `${country.country} evaluation_date is older than ${freshnessThresholdDays} days.` });
  }
  if (!Array.isArray(country.category_scores)) {
    issues.push({ level: "error", message: `${country.country} category_scores must be an array.` });
    return issues;
  }

  for (const category of country.category_scores) {
    if (seenCategoryIds.has(category.category_id)) {
      issues.push({ level: "error", message: `${country.country} has duplicate category ID: ${category.category_id}.` });
    }
    seenCategoryIds.add(category.category_id);

    if (!categoryIdSet.has(category.category_id as never)) {
      issues.push({ level: "error", message: `${country.country} has invalid category ID: ${category.category_id}.` });
    }
    if (typeof category.score !== "number" || category.score < 0 || category.score > 10) {
      issues.push({ level: "error", message: `${country.country} / ${category.category_id} score must be 0-10.` });
    }
    if (!["Low", "Medium", "High"].includes(category.confidence)) {
      issues.push({ level: "error", message: `${country.country} / ${category.category_id} has invalid confidence.` });
    }
    if (!category.rationale) {
      issues.push({ level: "error", message: `${country.country} / ${category.category_id} needs rationale.` });
    }
    if (!isDateString(category.last_updated)) {
      issues.push({ level: "error", message: `${country.country} / ${category.category_id} has invalid last_updated.` });
    }
    if (isDateString(category.last_updated) && daysSince(category.last_updated) > freshnessThresholdDays) {
      issues.push({ level: "warning", message: `${country.country} / ${category.category_id} is older than ${freshnessThresholdDays} days.` });
    }
    if (!Array.isArray(category.strengths) || !Array.isArray(category.weaknesses)) {
      issues.push({ level: "error", message: `${country.country} / ${category.category_id} strengths and weaknesses must be arrays.` });
    }
    if (!Array.isArray(category.source_notes) || category.source_notes.length === 0) {
      issues.push({ level: "warning", message: `${country.country} / ${category.category_id} needs source_notes.` });
    }
    if (!Array.isArray(category.data_gaps)) {
      issues.push({ level: "error", message: `${country.country} / ${category.category_id} data_gaps must be an array.` });
    }
  }

  if (country.category_scores.length < 15) {
    issues.push({ level: "warning", message: `${country.country} has fewer than 15 scored categories.` });
  }

  const missingCoreCategories = categoryIds
    .slice(0, 25)
    .filter((categoryId) => !seenCategoryIds.has(categoryId));
  if (missingCoreCategories.length > 0) {
    issues.push({
      level: "warning",
      message: `${country.country} is missing ${missingCoreCategories.length} core categories.`
    });
  }

  const lowConfidenceCount = country.category_scores.filter((category) => category.confidence === "Low").length;
  if (country.category_scores.length > 0 && lowConfidenceCount / country.category_scores.length > 0.5) {
    issues.push({ level: "warning", message: `${country.country} has more than half of categories at Low confidence.` });
  }

  if (!country.source_notes.length) {
    issues.push({ level: "warning", message: `${country.country} needs top-level source_notes.` });
  }
  if (!country.data_gaps.length) {
    issues.push({ level: "warning", message: `${country.country} should list top-level data_gaps.` });
  }

  return issues;
}

export function summarizeValidation(issues: ValidationIssue[]) {
  return {
    errors: issues.filter((issue) => issue.level === "error").length,
    warnings: issues.filter((issue) => issue.level === "warning").length
  };
}
