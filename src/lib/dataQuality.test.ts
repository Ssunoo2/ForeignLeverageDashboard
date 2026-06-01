import { describe, expect, it } from "vitest";
import type { CountryEvaluation } from "../types/country";
import { assessCountryDataQuality, getCoreCategoryIds, rankCountriesByDataQuality } from "./dataQuality";
import uruguay from "../data/countries/uruguay.json";

function makeCategory(categoryId: string, score = 7) {
  return {
    category_id: categoryId,
    category_name: categoryId,
    score,
    confidence: "High" as const,
    rationale: "Reviewed rationale.",
    strengths: ["Strength"],
    weaknesses: ["Weakness"],
    regional_caveats: [],
    key_metrics: [],
    source_notes: ["Tier 1 official source reviewed."],
    data_gaps: [],
    last_updated: "2026-06-01"
  };
}

function makeCountry(overrides: Partial<CountryEvaluation> = {}): CountryEvaluation {
  return {
    country: "Reviewland",
    iso_code: "RVW",
    region: "Test Region",
    subregion: "Test Subregion",
    evaluation_date: "2026-06-01",
    evaluated_by: "Human draft",
    overall_summary: "A reviewed test fixture.",
    best_for: [],
    bad_for: [],
    major_strengths: [],
    major_weaknesses: [],
    major_risks: [],
    open_questions: [],
    data_gaps: ["Non-blocking gap"],
    source_notes: ["Top-level source note"],
    human_review: {
      status: "in_review",
      reviewer: null,
      review_date: null,
      notes: null
    },
    category_scores: getCoreCategoryIds().map((categoryId) => makeCategory(categoryId)),
    ...overrides
  };
}

describe("data quality assessment", () => {
  it("does not promote demo data even when category coverage exists", () => {
    const demoCountry = makeCountry({
      evaluated_by: "Demo placeholder data",
      human_review: {
        status: "unreviewed",
        reviewer: null,
        review_date: null,
        notes: "Demo data only."
      }
    });

    const result = assessCountryDataQuality(demoCountry);
    expect(result.status).toBe("Demo");
    expect(result.blockers).toContain("Marked as demo or placeholder data.");
  });

  it("flags missing core categories and source gaps", () => {
    const incompleteCountry = makeCountry({
      category_scores: [
        {
          ...makeCategory("legal_residency"),
          confidence: "Low",
          source_notes: ["Demo placeholder; verify with official sources."],
          data_gaps: ["Current official source review."]
        }
      ]
    });

    const result = assessCountryDataQuality(incompleteCountry);
    expect(result.issueCounts.missingCategories).toBeGreaterThan(0);
    expect(result.issueCounts.sourceGapCategories).toBe(1);
    expect(result.blockers.some((blocker) => blocker.includes("core review categories"))).toBe(true);
  });

  it("ranks higher quality countries first", () => {
    const reviewedCountry = makeCountry({
      country: "Reviewedland",
      human_review: {
        status: "reviewed",
        reviewer: "Reviewer",
        review_date: "2026-06-01",
        notes: "Reviewed."
      }
    });
    const demoCountry = makeCountry({
      country: "Demoland",
      evaluated_by: "Demo placeholder data"
    });

    const ranked = rankCountriesByDataQuality([demoCountry, reviewedCountry]);
    expect(ranked[0].country.country).toBe("Reviewedland");
  });

  it("treats the Uruguay pilot as an in-review researched draft, not demo data", () => {
    const result = assessCountryDataQuality(uruguay as CountryEvaluation);

    expect(result.status).not.toBe("Demo");
    expect(result.blockers).not.toContain("Marked as demo or placeholder data.");
    expect(uruguay.human_review.status).toBe("in_review");
  });
});
