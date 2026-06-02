import { categoryDefinitions, categoryIds, getCategoryDefinition } from "../data/categoryDefinitions";
import type { CategoryScore, CountryEvaluation } from "../types/country";
import type { CategoryId } from "../types/scoring";
import { getFreshnessStatus } from "./scoring";

export type ResearchIssueType = "missing_category" | "low_confidence" | "source_gap" | "missing_metrics" | "stale";
export type ResearchPriority = "High" | "Medium" | "Low";

export interface ResearchTask {
  id: string;
  country: string;
  isoCode: string;
  categoryId: CategoryId;
  categoryLabel: string;
  group: string;
  type: ResearchIssueType;
  priority: ResearchPriority;
  title: string;
  detail: string;
}

export interface CategoryResearchStatus {
  hasSourceGap: boolean;
  hasMissingMetrics: boolean;
  isLowConfidence: boolean;
  isStale: boolean;
}

export const researchFilterOptions = [
  { id: "all", label: "All Categories" },
  { id: "needs_research", label: "Needs Research" },
  { id: "low_confidence", label: "Low Confidence" },
  { id: "source_gap", label: "Source Gaps" },
  { id: "missing_metrics", label: "Missing Metrics" },
  { id: "stale", label: "Stale or Review Soon" }
] as const;

export type ResearchFilterId = (typeof researchFilterOptions)[number]["id"];

export function getCategoryResearchStatus(category: CategoryScore): CategoryResearchStatus {
  return {
    hasSourceGap: categoryHasSourceGap(category),
    hasMissingMetrics: category.key_metrics.length === 0,
    isLowConfidence: category.confidence === "Low",
    isStale: getFreshnessStatus(category.last_updated) !== "Current"
  };
}

export function categoryMatchesResearchFilter(category: CategoryScore, filter: ResearchFilterId) {
  const status = getCategoryResearchStatus(category);

  if (filter === "all") return true;
  if (filter === "needs_research") {
    return status.hasSourceGap || status.hasMissingMetrics || status.isLowConfidence || status.isStale;
  }
  if (filter === "low_confidence") return status.isLowConfidence;
  if (filter === "source_gap") return status.hasSourceGap;
  if (filter === "missing_metrics") return status.hasMissingMetrics;
  if (filter === "stale") return status.isStale;
  return true;
}

export function getResearchTasksForCountry(country: CountryEvaluation): ResearchTask[] {
  const tasks: ResearchTask[] = [];
  const scoredIds = new Set(country.category_scores.map((category) => category.category_id));

  for (const categoryId of categoryIds) {
    if (!scoredIds.has(categoryId)) {
      const definition = getCategoryDefinition(categoryId);
      tasks.push({
        id: `${country.iso_code}-${categoryId}-missing`,
        country: country.country,
        isoCode: country.iso_code,
        categoryId,
        categoryLabel: definition?.label ?? categoryId,
        group: definition?.group ?? "Fit",
        type: "missing_category",
        priority: "High",
        title: `Add ${definition?.label ?? categoryId}`,
        detail: "This category is missing from the country file, so profile scores that use it are incomplete."
      });
    }
  }

  for (const category of country.category_scores) {
    const categoryId = category.category_id as CategoryId;
    const definition = getCategoryDefinition(category.category_id);
    const categoryLabel = definition?.label ?? category.category_name;
    const group = definition?.group ?? "Fit";
    const status = getCategoryResearchStatus(category);

    if (status.hasSourceGap) {
      tasks.push({
        id: `${country.iso_code}-${category.category_id}-source`,
        country: country.country,
        isoCode: country.iso_code,
        categoryId,
        categoryLabel,
        group,
        type: "source_gap",
        priority: category.confidence === "High" ? "Medium" : "High",
        title: `Strengthen sources for ${categoryLabel}`,
        detail: "Source notes or data gaps indicate fresh verification, official sources, or stronger evidence are still needed."
      });
    }

    if (status.hasMissingMetrics) {
      tasks.push({
        id: `${country.iso_code}-${category.category_id}-metrics`,
        country: country.country,
        isoCode: country.iso_code,
        categoryId,
        categoryLabel,
        group,
        type: "missing_metrics",
        priority: category.confidence === "Low" ? "High" : "Medium",
        title: `Add key metrics for ${categoryLabel}`,
        detail: "This category has no structured key_metrics, so its evidence is harder to inspect in the UI."
      });
    }

    if (status.isLowConfidence) {
      tasks.push({
        id: `${country.iso_code}-${category.category_id}-confidence`,
        country: country.country,
        isoCode: country.iso_code,
        categoryId,
        categoryLabel,
        group,
        type: "low_confidence",
        priority: "Medium",
        title: `Review Low confidence score for ${categoryLabel}`,
        detail: "Keep confidence Low unless recent, credible evidence supports upgrading it."
      });
    }

    if (status.isStale) {
      tasks.push({
        id: `${country.iso_code}-${category.category_id}-stale`,
        country: country.country,
        isoCode: country.iso_code,
        categoryId,
        categoryLabel,
        group,
        type: "stale",
        priority: getFreshnessStatus(category.last_updated) === "Stale" ? "High" : "Medium",
        title: `Refresh ${categoryLabel}`,
        detail: `Last updated ${category.last_updated}; freshness status is ${getFreshnessStatus(category.last_updated)}.`
      });
    }
  }

  return tasks.sort(sortResearchTasks);
}

export function getResearchQueue(countries: CountryEvaluation[]) {
  return countries.flatMap(getResearchTasksForCountry).sort(sortResearchTasks);
}

export function summarizeResearchQueue(tasks: ResearchTask[]) {
  return {
    high: tasks.filter((task) => task.priority === "High").length,
    medium: tasks.filter((task) => task.priority === "Medium").length,
    low: tasks.filter((task) => task.priority === "Low").length,
    missingCategories: tasks.filter((task) => task.type === "missing_category").length,
    sourceGaps: tasks.filter((task) => task.type === "source_gap").length,
    missingMetrics: tasks.filter((task) => task.type === "missing_metrics").length,
    lowConfidence: tasks.filter((task) => task.type === "low_confidence").length,
    stale: tasks.filter((task) => task.type === "stale").length
  };
}

export function getResearchFilterCount(country: CountryEvaluation, filter: ResearchFilterId) {
  return country.category_scores.filter((category) => categoryMatchesResearchFilter(category, filter)).length;
}

function categoryHasSourceGap(category: CategoryScore) {
  const sourceNotesEmpty = category.source_notes.length === 0;
  const gapMentionsSource = category.data_gaps.some((gap) => /source|verify|current|review|collect|fresh|add/i.test(gap));
  const placeholderSource = category.source_notes.some((note) => /demo placeholder|verify|not .*advice|no real source review|insufficient|needs more/i.test(note));
  const metricNeedsReview = category.key_metrics.some((metric) => /unknown|verify|review/i.test(metric.date_accessed) || /verify|not .*score|needs review/i.test(metric.notes));

  return sourceNotesEmpty || gapMentionsSource || placeholderSource || metricNeedsReview;
}

function sortResearchTasks(a: ResearchTask, b: ResearchTask) {
  const priorityRank: Record<ResearchPriority, number> = { High: 3, Medium: 2, Low: 1 };
  if (priorityRank[b.priority] !== priorityRank[a.priority]) return priorityRank[b.priority] - priorityRank[a.priority];
  if (a.country !== b.country) return a.country.localeCompare(b.country);
  const groupA = categoryDefinitions.find((category) => category.id === a.categoryId)?.group ?? "";
  const groupB = categoryDefinitions.find((category) => category.id === b.categoryId)?.group ?? "";
  return `${groupA}-${a.categoryLabel}-${a.type}`.localeCompare(`${groupB}-${b.categoryLabel}-${b.type}`);
}
