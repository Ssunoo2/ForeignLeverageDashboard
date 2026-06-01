import type { WeightingProfile } from "../types/scoring";

export const weightingProfiles: WeightingProfile[] = [
  {
    id: "balanced",
    label: "Balanced Relocation",
    description: "A realistic long-term place to live, not just a speculative bet.",
    weights: {
      legal_residency: 0.06,
      tax_treatment: 0.04,
      cost_of_living: 0.06,
      currency_banking: 0.04,
      economy_opportunity: 0.05,
      income_portability: 0.05,
      climate_resilience: 0.06,
      food_water_energy: 0.05,
      geopolitical_risk: 0.05,
      political_stability: 0.06,
      safety: 0.07,
      healthcare: 0.06,
      infrastructure: 0.06,
      property_rights: 0.04,
      demographics: 0.03,
      culture_language: 0.05,
      family_suitability: 0.03,
      global_connectivity: 0.04,
      digital_freedom: 0.03,
      civil_liberties: 0.04,
      state_capacity: 0.04,
      legal_system: 0.04,
      community_networks: 0.03,
      daily_friction: 0.05,
      exit_optionality: 0.04
    }
  },
  {
    id: "climate_hedge",
    label: "Climate Hedge",
    description: "Prioritizes resource security, climate resilience, and crisis durability.",
    weights: {
      climate_resilience: 0.16,
      food_water_energy: 0.13,
      geopolitical_risk: 0.08,
      political_stability: 0.08,
      state_capacity: 0.07,
      infrastructure: 0.07,
      healthcare: 0.06,
      safety: 0.06,
      property_rights: 0.05,
      tail_risk: 0.07,
      supply_chain: 0.05,
      insurance_signals: 0.05,
      cost_of_living: 0.04,
      legal_residency: 0.05,
      exit_optionality: 0.03
    }
  },
  {
    id: "remote_worker",
    label: "Remote Worker / Entrepreneur",
    description: "For online earners, software builders, small businesses, and international operators.",
    weights: {
      legal_residency: 0.08,
      tax_treatment: 0.08,
      cost_of_living: 0.09,
      currency_banking: 0.07,
      economy_opportunity: 0.07,
      income_portability: 0.13,
      infrastructure: 0.1,
      digital_freedom: 0.08,
      global_connectivity: 0.06,
      supply_chain: 0.05,
      daily_friction: 0.05,
      safety: 0.05,
      culture_language: 0.04,
      community_networks: 0.04,
      exit_optionality: 0.01
    }
  },
  {
    id: "wealth_preservation",
    label: "Wealth Preservation",
    description: "Weights property rights, banking, tax predictability, and capital safety highest.",
    weights: {
      currency_banking: 0.12,
      property_rights: 0.12,
      tax_treatment: 0.1,
      political_stability: 0.1,
      legal_system: 0.1,
      state_capacity: 0.08,
      geopolitical_risk: 0.08,
      civil_liberties: 0.06,
      exit_optionality: 0.08,
      tail_risk: 0.08,
      insurance_signals: 0.04,
      data_quality: 0.04
    }
  },
  {
    id: "frontier_upside",
    label: "Frontier Upside",
    description: "Accepts volatility in exchange for asymmetric reform, value, or resource upside.",
    weights: {
      economy_opportunity: 0.15,
      cost_of_living: 0.1,
      demographics: 0.08,
      food_water_energy: 0.09,
      income_portability: 0.08,
      property_rights: 0.07,
      tax_treatment: 0.07,
      risk_tolerance_fit: 0.1,
      legal_residency: 0.06,
      currency_banking: 0.05,
      political_stability: 0.05,
      infrastructure: 0.05,
      community_networks: 0.03,
      exit_optionality: 0.02
    }
  },
  {
    id: "family_aging",
    label: "Family and Aging",
    description: "Prioritizes safety, healthcare, education, infrastructure, and household durability.",
    weights: {
      safety: 0.12,
      healthcare: 0.12,
      family_suitability: 0.1,
      aging_suitability: 0.1,
      infrastructure: 0.08,
      political_stability: 0.08,
      state_capacity: 0.07,
      culture_language: 0.06,
      cost_of_living: 0.06,
      climate_resilience: 0.06,
      legal_residency: 0.05,
      daily_friction: 0.05,
      global_connectivity: 0.03,
      property_rights: 0.02
    }
  }
];

export const defaultProfileId = "balanced";

export function getWeightingProfile(profileId: string) {
  return weightingProfiles.find((profile) => profile.id === profileId) ?? weightingProfiles[0];
}
