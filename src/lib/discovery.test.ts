import { describe, expect, it } from "vitest";
import { countries } from "./countryUtils";
import { buildDiscoveryRecommendation, defaultDiscoveryAnswers } from "./discovery";

describe("discovery recommendations", () => {
  it("maps remote work pressure to the remote worker profile", () => {
    const recommendation = buildDiscoveryRecommendation(countries, {
      ...defaultDiscoveryAnswers,
      pushFactors: ["remote_work"],
      dealbreakers: ["income_portability", "infrastructure"]
    });

    expect(recommendation.profileId).toBe("remote_worker");
    expect(recommendation.priorityCategories.some((category) => category.categoryId === "income_portability")).toBe(true);
    expect(recommendation.shortlist.length).toBeGreaterThan(0);
  });

  it("maps climate pressure and long horizon toward climate hedge", () => {
    const recommendation = buildDiscoveryRecommendation(countries, {
      ...defaultDiscoveryAnswers,
      pushFactors: ["climate_resilience"],
      timeHorizon: "decade_plus"
    });

    expect(recommendation.profileId).toBe("climate_hedge");
    expect(recommendation.priorityCategories.some((category) => category.categoryId === "climate_resilience")).toBe(true);
  });

  it("returns a warning when region filters exclude all countries", () => {
    const recommendation = buildDiscoveryRecommendation(countries, {
      ...defaultDiscoveryAnswers,
      preferredRegion: "Nowhere"
    });

    expect(recommendation.shortlist).toHaveLength(0);
    expect(recommendation.warnings.some((warning) => warning.includes("No countries matched"))).toBe(true);
  });
});
