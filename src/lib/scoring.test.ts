import { describe, expect, it } from "vitest";
import type { CountryEvaluation } from "../types/country";
import { weightingProfiles } from "../data/weightingProfiles";
import { calculateProfileBreakdown, calculateWeightedScore, formatScore, getAverageConfidence, getFreshnessStatus } from "./scoring";
import { validateCountry } from "./validation";

const baseCountry: CountryEvaluation = {
  country: "Testland",
  iso_code: "TST",
  region: "Test Region",
  subregion: "Test Subregion",
  evaluation_date: "2026-06-01",
  evaluated_by: "test",
  overall_summary: "A test fixture.",
  best_for: [],
  bad_for: [],
  major_strengths: [],
  major_weaknesses: [],
  major_risks: [],
  open_questions: [],
  data_gaps: ["Test gap"],
  source_notes: ["Test source"],
  human_review: {
    status: "unreviewed",
    reviewer: null,
    review_date: null,
    notes: null
  },
  category_scores: [
    {
      category_id: "cost_of_living",
      category_name: "Cost of Living vs U.S.",
      score: 8,
      confidence: "High",
      rationale: "Test rationale.",
      strengths: ["Strong value"],
      weaknesses: ["Imported goods"],
      regional_caveats: [],
      key_metrics: [],
      source_notes: ["Fixture source"],
      data_gaps: [],
      last_updated: "2026-06-01"
    },
    {
      category_id: "currency_banking",
      category_name: "Currency and Banking Stability",
      score: 4,
      confidence: "Low",
      rationale: "Test rationale.",
      strengths: [],
      weaknesses: ["Volatile"],
      regional_caveats: [],
      key_metrics: [],
      source_notes: ["Fixture source"],
      data_gaps: [],
      last_updated: "2026-06-01"
    }
  ]
};

describe("scoring", () => {
  it("computes weighted profile scores from available category scores only", () => {
    const profile = weightingProfiles.find((item) => item.id === "frontier_upside")!;
    const result = calculateWeightedScore(baseCountry, profile);

    expect(result.score).toBeCloseTo(66.67, 1);
    expect(result.completionRate).toBeCloseTo(0.15, 2);
    expect(result.missingCategoryIds).toContain("economy_opportunity");
  });

  it("formats null scores without inventing a value", () => {
    expect(formatScore(null)).toBe("N/A");
  });

  it("averages category confidence without treating low confidence as a low score", () => {
    expect(getAverageConfidence(baseCountry)).toBe("Medium");
  });

  it("classifies known fresh dates", () => {
    expect(getFreshnessStatus("2026-06-01")).toBe("Current");
  });

  it("returns profile contribution rows without hiding missing categories", () => {
    const profile = weightingProfiles.find((item) => item.id === "frontier_upside")!;
    const breakdown = calculateProfileBreakdown(baseCountry, profile);
    const costRow = breakdown.find((row) => row.categoryId === "cost_of_living")!;
    const economyRow = breakdown.find((row) => row.categoryId === "economy_opportunity")!;

    expect(costRow.contribution).toBeCloseTo(53.33, 1);
    expect(costRow.missing).toBe(false);
    expect(economyRow.missing).toBe(true);
    expect(economyRow.contribution).toBeNull();
  });
});

describe("validation", () => {
  it("catches invalid and duplicate category IDs", () => {
    const invalidCountry: CountryEvaluation = {
      ...baseCountry,
      category_scores: [
        baseCountry.category_scores[0],
        {
          ...baseCountry.category_scores[0],
          score: 11
        },
        {
          ...baseCountry.category_scores[1],
          category_id: "made_up_category"
        }
      ]
    };

    const messages = validateCountry(invalidCountry).map((issue) => issue.message);
    expect(messages.some((message) => message.includes("duplicate category ID"))).toBe(true);
    expect(messages.some((message) => message.includes("invalid category ID"))).toBe(true);
    expect(messages.some((message) => message.includes("score must be 0-10"))).toBe(true);
  });
});
