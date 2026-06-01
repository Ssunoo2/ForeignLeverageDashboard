# LLM Evaluation Prompt

Use this prompt when asking an LLM to evaluate a country for the relocation dashboard.

Replace `{{COUNTRY}}` with the country name.

---

# Prompt

You are evaluating countries as long-term relocation, residency, investment, and backup-base candidates for a well-educated American.

Evaluate this country:

`{{COUNTRY}}`

Use a 0–10 score for each category:

- 0–2: Severe weakness / major risk
- 3–4: Below average / concerning
- 5–6: Acceptable / mixed
- 7–8: Strong
- 9–10: Exceptional

Use these confidence levels:

- High: Supported by recent, credible data and consistent evidence.
- Medium: Reasonable evidence, but some uncertainty or regional variation.
- Low: Sparse, conflicting, outdated, or heavily qualitative evidence.

Important rules:

- Do not invent precise statistics.
- If current data is needed, say so in `data_gaps`.
- Distinguish national conditions from city or regional conditions.
- Separate objective data from subjective judgment.
- Do not create an overall weighted ranking. The app will calculate weighted scores.
- Return valid JSON only.
- Include source notes, but do not include fake citations.
- If you are not using live web access, mark fresh-source-dependent claims as needing current verification.

Evaluate these category IDs:

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

Return this JSON shape:

```json
{
  "country": "string",
  "iso_code": "string",
  "region": "string",
  "subregion": "string",
  "evaluation_date": "YYYY-MM-DD",
  "evaluated_by": "LLM draft",
  "overall_summary": "One-paragraph thesis.",
  "best_for": ["string"],
  "bad_for": ["string"],
  "major_strengths": ["string"],
  "major_weaknesses": ["string"],
  "major_risks": ["string"],
  "open_questions": ["string"],
  "data_gaps": ["string"],
  "category_scores": [
    {
      "category_id": "string",
      "category_name": "string",
      "score": 0,
      "confidence": "Low | Medium | High",
      "rationale": "string",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "regional_caveats": ["string"],
      "key_metrics": [
        {
          "label": "string",
          "value": "string",
          "source": "string",
          "source_tier": "Tier 1 | Tier 2 | Tier 3 | Tier 4 | Unknown",
          "date_accessed": "YYYY-MM-DD or unknown",
          "notes": "string"
        }
      ],
      "source_notes": ["string"],
      "data_gaps": ["string"],
      "last_updated": "YYYY-MM-DD"
    }
  ],
  "source_notes": ["string"],
  "human_review": {
    "status": "unreviewed",
    "reviewer": null,
    "review_date": null,
    "notes": null
  }
}
```

---

# Optional Research-First Version

Use this variant if the LLM has browsing ability:

Before scoring, gather current information from reliable sources. Prioritize:

- Official immigration or government websites
- World Bank, IMF, OECD, UN, WHO
- National statistics agencies
- Climate Knowledge Portal / IPCC / ND-GAIN
- Reputable local and international news
- Reputable cost-of-living data, clearly labeled as soft evidence

For every category, include the most relevant source notes and mark data confidence.

Do not overweigh expat blogs, YouTube videos, or anecdotal reports. Use them only as soft sentiment.

---

# Optional Fast-Draft Version

Use this variant for early prototyping:

Create a first-pass country evaluation using general knowledge. Keep confidence conservative. Mark all data-dependent claims as needing fresh verification. Do not use more than 3 key metrics per category. Return valid JSON only.
