# Researched Country Template

Use this template when creating a researched country JSON file. It mirrors `country-output-schema.md`, but adds source expectations so the file can move from demo data to `in_review`.

## Top-Level Fields

```json
{
  "country": "Country Name",
  "iso_code": "ISO3",
  "region": "Region",
  "subregion": "Subregion",
  "evaluation_date": "YYYY-MM-DD",
  "evaluated_by": "Human researched draft",
  "overall_summary": "One paragraph thesis with uncertainty visible.",
  "best_for": [],
  "bad_for": [],
  "major_strengths": [],
  "major_weaknesses": [],
  "major_risks": [],
  "open_questions": [],
  "data_gaps": [],
  "category_scores": [],
  "source_notes": [],
  "human_review": {
    "status": "in_review",
    "reviewer": null,
    "review_date": null,
    "notes": "Human researched draft; requires final review before publication."
  }
}
```

## Required Source Passes

### Immigration and Residency

- Prefer official immigration ministry, consulate, or government portal pages.
- Record visa/residency pathway names, renewal uncertainty, and whether rules are recent.
- Do not rely on relocation firm summaries alone.

### Taxes and Wealth Treatment

- Prefer tax authority pages, official treaty documents, Big Four summaries, or reputable tax-law sources.
- Always note that U.S. citizens remain subject to U.S. tax/reporting rules.
- Do not present tax treatment as advice.

### Banking, Currency, and Macro

- Prefer central bank, IMF, World Bank, and national statistics sources.
- Capture qualitative direction if precise current numbers would require constant refresh.
- Note account-opening and FATCA uncertainty for Americans.

### Safety and Governance

- Prefer official crime data, U.S. State Department advisories, UNODC, World Bank governance indicators, Freedom House, World Justice Project, and reputable local reporting.
- Distinguish national conditions from city/neighborhood variation.

### Climate and Resources

- Prefer World Bank Climate Knowledge Portal, ND-GAIN, national adaptation plans, FAO, IEA, and water/energy ministries.
- Distinguish climate zones and local exposure.

### Cost of Living and Daily Life

- Use current local price sources, official cost indexes, rental listings, and clearly labeled soft sources.
- Treat Numbeo, forums, and YouTube as question-generators, not primary evidence.

## Per-Category Required Shape

Each category entry should include:

- `category_id`
- `category_name`
- `score`
- `confidence`
- `rationale`
- `strengths`
- `weaknesses`
- `regional_caveats`
- `key_metrics`
- `source_notes`
- `data_gaps`
- `last_updated`

## Key Metric Guidance

Use `key_metrics` for specific evidence that should be visible in the UI:

```json
{
  "label": "Official source or metric name",
  "value": "Short qualitative or quantitative value",
  "source": "Source name or URL",
  "source_tier": "Tier 1",
  "date_accessed": "YYYY-MM-DD",
  "notes": "Limitation or context."
}
```

## Review Rule

Set `human_review.status` to `in_review` for researched drafts. Use `reviewed` only after a human has checked source notes, data gaps, and category scores against the rubric.
