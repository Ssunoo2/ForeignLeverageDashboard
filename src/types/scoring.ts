import type { CountryEvaluation } from "./country";

export type CategoryId =
  | "legal_residency"
  | "tax_treatment"
  | "cost_of_living"
  | "currency_banking"
  | "economy_opportunity"
  | "income_portability"
  | "climate_resilience"
  | "food_water_energy"
  | "geopolitical_risk"
  | "political_stability"
  | "safety"
  | "healthcare"
  | "infrastructure"
  | "property_rights"
  | "demographics"
  | "culture_language"
  | "family_suitability"
  | "global_connectivity"
  | "digital_freedom"
  | "civil_liberties"
  | "state_capacity"
  | "legal_system"
  | "community_networks"
  | "daily_friction"
  | "exit_optionality"
  | "time_horizon_fit"
  | "risk_tolerance_fit"
  | "foreigner_backlash"
  | "aging_suitability"
  | "supply_chain"
  | "insurance_signals"
  | "data_quality"
  | "tail_risk"
  | "psychological_fit";

export interface CategoryDefinition {
  id: CategoryId;
  label: string;
  group: "Access" | "Money" | "Opportunity" | "Resilience" | "Stability" | "Livability" | "Freedom" | "Fit";
  shortDescription: string;
}

export interface WeightingProfile {
  id: string;
  label: string;
  description: string;
  weights: Partial<Record<CategoryId, number>>;
}

export interface WeightedScoreResult {
  country: CountryEvaluation;
  profileId: string;
  score: number | null;
  completionRate: number;
  totalWeightUsed: number;
  missingCategoryIds: CategoryId[];
}
