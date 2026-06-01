# Weighting Profiles

This file defines how category scores should be weighted for different relocation strategies.

The LLM should produce category-level scores only. The app should calculate weighted totals using these profiles.

Weights should sum to 1.00 for each profile.

---

# Profile Philosophy

## Balanced Relocation
For a well-educated American seeking a realistic long-term place to live, not just speculate.

## Climate Hedge
For people prioritizing climate resilience, food/water security, and long-term survivability.

## Remote Worker / Entrepreneur
For people earning online, building software, running a small business, or selling internationally.

## Wealth Preservation
For people prioritizing property rights, banking, tax predictability, and capital safety.

## Frontier Upside
For people willing to accept volatility in exchange for asymmetric opportunity.

## Family and Aging
For people prioritizing healthcare, safety, education, infrastructure, and long-term household stability.

---

# Category IDs

Use these exact IDs in country data and UI code:

- legal_residency
- tax_treatment
- cost_of_living
- currency_banking
- economy_opportunity
- income_portability
- climate_resilience
- food_water_energy
- geopolitical_risk
- political_stability
- safety
- healthcare
- infrastructure
- property_rights
- demographics
- culture_language
- family_suitability
- global_connectivity
- digital_freedom
- civil_liberties
- state_capacity
- legal_system
- community_networks
- daily_friction
- exit_optionality
- time_horizon_fit
- risk_tolerance_fit
- foreigner_backlash
- aging_suitability
- supply_chain
- insurance_signals
- data_quality
- tail_risk
- psychological_fit

---

# Weight Sets

## Balanced Relocation

```json
{
  "legal_residency": 0.06,
  "tax_treatment": 0.04,
  "cost_of_living": 0.06,
  "currency_banking": 0.04,
  "economy_opportunity": 0.05,
  "income_portability": 0.05,
  "climate_resilience": 0.06,
  "food_water_energy": 0.05,
  "geopolitical_risk": 0.05,
  "political_stability": 0.06,
  "safety": 0.07,
  "healthcare": 0.06,
  "infrastructure": 0.06,
  "property_rights": 0.04,
  "demographics": 0.03,
  "culture_language": 0.05,
  "family_suitability": 0.03,
  "global_connectivity": 0.04,
  "digital_freedom": 0.03,
  "civil_liberties": 0.04,
  "state_capacity": 0.04,
  "legal_system": 0.04,
  "community_networks": 0.03,
  "daily_friction": 0.05,
  "exit_optionality": 0.04
}
```

## Climate Hedge

```json
{
  "climate_resilience": 0.16,
  "food_water_energy": 0.13,
  "geopolitical_risk": 0.08,
  "political_stability": 0.08,
  "state_capacity": 0.07,
  "infrastructure": 0.07,
  "healthcare": 0.06,
  "safety": 0.06,
  "property_rights": 0.05,
  "tail_risk": 0.07,
  "supply_chain": 0.05,
  "insurance_signals": 0.05,
  "cost_of_living": 0.04,
  "legal_residency": 0.05,
  "exit_optionality": 0.03
}
```

## Remote Worker / Entrepreneur

```json
{
  "legal_residency": 0.08,
  "tax_treatment": 0.08,
  "cost_of_living": 0.09,
  "currency_banking": 0.07,
  "economy_opportunity": 0.07,
  "income_portability": 0.13,
  "infrastructure": 0.10,
  "digital_freedom": 0.08,
  "global_connectivity": 0.06,
  "supply_chain": 0.05,
  "daily_friction": 0.05,
  "safety": 0.05,
  "culture_language": 0.04,
  "community_networks": 0.04,
  "exit_optionality": 0.01
}
```

## Wealth Preservation

```json
{
  "currency_banking": 0.12,
  "property_rights": 0.12,
  "tax_treatment": 0.10,
  "political_stability": 0.10,
  "legal_system": 0.10,
  "state_capacity": 0.08,
  "geopolitical_risk": 0.08,
  "civil_liberties": 0.06,
  "exit_optionality": 0.08,
  "tail_risk": 0.08,
  "insurance_signals": 0.04,
  "data_quality": 0.04
}
```

## Frontier Upside

```json
{
  "economy_opportunity": 0.15,
  "cost_of_living": 0.10,
  "demographics": 0.08,
  "food_water_energy": 0.09,
  "income_portability": 0.08,
  "property_rights": 0.07,
  "tax_treatment": 0.07,
  "risk_tolerance_fit": 0.10,
  "legal_residency": 0.06,
  "currency_banking": 0.05,
  "political_stability": 0.05,
  "infrastructure": 0.05,
  "community_networks": 0.03,
  "exit_optionality": 0.02
}
```

## Family and Aging

```json
{
  "safety": 0.12,
  "healthcare": 0.12,
  "family_suitability": 0.10,
  "aging_suitability": 0.10,
  "infrastructure": 0.08,
  "political_stability": 0.08,
  "state_capacity": 0.07,
  "culture_language": 0.06,
  "cost_of_living": 0.06,
  "climate_resilience": 0.06,
  "legal_residency": 0.05,
  "daily_friction": 0.05,
  "global_connectivity": 0.03,
  "property_rights": 0.02
}
```

---

# Implementation Notes

- Store these profiles in the app as a config object.
- Do not ask the LLM to calculate final rankings unless needed for quick analysis.
- The dashboard should calculate weighted scores from category scores.
- If a country is missing a category score, either exclude that category from the denominator or mark the weighted score as incomplete.
- Display profile-specific rankings separately.
