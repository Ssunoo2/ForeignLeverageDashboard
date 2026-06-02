import { describe, expect, it } from "vitest";
import type { CountryEvaluation } from "../types/country";
import uruguay from "../data/countries/uruguay.json";
import { categoryMatchesResearchFilter, getResearchQueue, getResearchTasksForCountry, summarizeResearchQueue } from "./research";

describe("research queue", () => {
  it("creates concrete tasks for source gaps and missing metrics", () => {
    const tasks = getResearchTasksForCountry(uruguay as CountryEvaluation);

    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks.some((task) => task.type === "source_gap")).toBe(true);
    expect(tasks.some((task) => task.type === "missing_metrics")).toBe(true);
  });

  it("summarizes task types across countries", () => {
    const queue = getResearchQueue([uruguay as CountryEvaluation]);
    const summary = summarizeResearchQueue(queue);

    expect(summary.high + summary.medium + summary.low).toBe(queue.length);
    expect(summary.sourceGaps).toBeGreaterThan(0);
  });

  it("filters low-confidence category rows", () => {
    const lowConfidenceCategory = (uruguay as CountryEvaluation).category_scores.find((category) => category.confidence === "Low")!;
    const higherConfidenceCategory = (uruguay as CountryEvaluation).category_scores.find((category) => category.confidence !== "Low")!;

    expect(categoryMatchesResearchFilter(lowConfidenceCategory, "low_confidence")).toBe(true);
    expect(categoryMatchesResearchFilter(higherConfidenceCategory, "low_confidence")).toBe(false);
  });
});
