# Country Output Schema

This document defines the standard JSON shape for country evaluations.

The dashboard should render country pages from this structure. Future Python/API scripts should validate LLM outputs against this structure before saving.

---

# Design Principles

- One country per JSON file.
- Category scores are independent from weighted profile scores.
- Weighted profile scores should be computed by the app when possible.
- Every score requires a rationale and confidence level.
- Every country evaluation must include data gaps and open questions.
- Sources should be stored near the metric or claim they support.

---

# Top-Level Country Object

```json
{
  "country": "Argentina",
  "iso_code": "ARG",
  "region": "South America",
  "subregion": "Southern Cone",
  "hero_image": {
    "url": "https://example.com/image.jpg",
    "alt": "Human-readable image description.",
    "credit": "Photographer or source.",
    "license": "License label.",
    "source_url": "https://example.com/source-page"
  },
  "evaluation_date": "2026-06-01",
  "evaluated_by": "LLM + human review",
  "overall_summary": "Short thesis for the country.",
  "best_for": ["Frontier Upside", "Resource Security"],
  "bad_for": ["Low Volatility", "Currency Stability"],
  "major_strengths": [],
  "major_weaknesses": [],
  "major_risks": [],
  "open_questions": [],
  "data_gaps": [],
  "category_scores": [],
  "source_notes": [],
  "human_review": {
    "status": "unreviewed",
    "reviewer": null,
    "review_date": null,
    "notes": null
  }
}
```

---

# Category Score Object

Each item in `category_scores` should use this shape:

```json
{
  "category_id": "climate_resilience",
  "category_name": "Climate and Climate Change Resilience",
  "score": 7,
  "confidence": "Medium",
  "rationale": "Short explanation of why this score was assigned.",
  "strengths": [
    "Evidence-supported strength."
  ],
  "weaknesses": [
    "Evidence-supported weakness."
  ],
  "regional_caveats": [
    "Important variation inside the country."
  ],
  "key_metrics": [
    {
      "label": "Metric name",
      "value": "Metric value or qualitative estimate",
      "source": "Source name or URL",
      "source_tier": "Tier 1",
      "date_accessed": "2026-06-01",
      "notes": "Context or limitation."
    }
  ],
  "source_notes": [
    "Short source comment."
  ],
  "data_gaps": [
    "What still needs to be checked."
  ],
  "last_updated": "2026-06-01"
}
```

---

# Allowed Category IDs

```json
[
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
  "demographics",
  "culture_language",
  "family_suitability",
  "global_connectivity",
  "digital_freedom",
  "civil_liberties",
  "state_capacity",
  "legal_system",
  "community_networks",
  "daily_friction",
  "exit_optionality",
  "time_horizon_fit",
  "risk_tolerance_fit",
  "foreigner_backlash",
  "aging_suitability",
  "supply_chain",
  "insurance_signals",
  "data_quality",
  "tail_risk",
  "psychological_fit"
]
```

---

# Validation Rules

A country JSON file is valid if:

- `country` is a non-empty string.
- `iso_code` uses ISO 3166-1 alpha-3 format when possible.
- `evaluation_date` is YYYY-MM-DD.
- `category_scores` contains objects with valid `category_id` values.
- `score` is a number from 0 to 10.
- `confidence` is one of: `Low`, `Medium`, `High`.
- Every category has a non-empty `rationale`.
- Data gaps are allowed and encouraged.

A country JSON file should be marked incomplete if:

- Fewer than 15 categories are scored.
- Any required category has no rationale.
- More than half of categories have `Low` confidence.
- The evaluation is older than the configured freshness threshold.

---

# Optional Computed Fields

The app can compute and append these fields at runtime:

```json
{
  "computed_profile_scores": {
    "balanced": 72.4,
    "climate_hedge": 68.9,
    "remote_worker": 74.1,
    "wealth_preservation": 55.2,
    "frontier_upside": 83.7,
    "family_aging": 61.5
  },
  "category_completion_rate": 0.91,
  "average_confidence": "Medium",
  "freshness_status": "current"
}
```

---

# Recommended File Naming

Use lowercase kebab-case:

```txt
/data/countries/argentina.json
/data/countries/uruguay.json
/data/countries/chile.json
/data/countries/new-zealand.json
```

---

# Example Minimal Country JSON

```json
{
  "country": "Exampleland",
  "iso_code": "EXL",
  "region": "Example Region",
  "subregion": "Example Subregion",
  "evaluation_date": "2026-06-01",
  "evaluated_by": "LLM draft",
  "overall_summary": "Exampleland is a strong remote-worker base but has weak property rights.",
  "best_for": ["Remote Worker"],
  "bad_for": ["Wealth Preservation"],
  "major_strengths": ["Low cost of living", "Good internet"],
  "major_weaknesses": ["Weak courts"],
  "major_risks": ["Currency depreciation"],
  "open_questions": ["Confirm current digital nomad visa rules."],
  "data_gaps": ["Recent private healthcare cost data."],
  "category_scores": [
    {
      "category_id": "cost_of_living",
      "category_name": "Cost of Living vs U.S.",
      "score": 8,
      "confidence": "Medium",
      "rationale": "Most major costs are significantly below U.S. metro levels, but imported goods are expensive.",
      "strengths": ["Low rent", "Affordable restaurants"],
      "weaknesses": ["Imported electronics are costly"],
      "regional_caveats": ["Capital city is much more expensive than secondary cities"],
      "key_metrics": [],
      "source_notes": [],
      "data_gaps": ["Need current rental listings."],
      "last_updated": "2026-06-01"
    }
  ],
  "source_notes": [],
  "human_review": {
    "status": "unreviewed",
    "reviewer": null,
    "review_date": null,
    "notes": null
  }
}
```
