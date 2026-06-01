# Country Review Checklist

Use this checklist before treating a country JSON file as researched rather than demo data.

## File Readiness

- Country file lives in `src/data/countries/<country-slug>.json`.
- `evaluation_date` is current enough for the claim set.
- `evaluated_by` clearly distinguishes demo, LLM draft, human draft, or reviewed data.
- `human_review.status` is one of `unreviewed`, `in_review`, or `reviewed`.
- Top-level `source_notes` and `data_gaps` are present.

## Required Category Coverage

Before publication, every country should cover at least the core relocation categories:

- `legal_residency`
- `tax_treatment`
- `cost_of_living`
- `currency_banking`
- `economy_opportunity`
- `income_portability`
- `climate_resilience`
- `food_water_energy`
- `geopolitical_risk`
- `political_stability`
- `safety`
- `healthcare`
- `infrastructure`
- `property_rights`
- `culture_language`
- `global_connectivity`
- `daily_friction`
- `exit_optionality`
- `data_quality`
- `tail_risk`

The full 34-category set is preferred once the country is moved beyond draft status.

## Per-Category Review

Each category score needs:

- 0-10 score using the rubric.
- Confidence of `Low`, `Medium`, or `High`.
- Rationale that explains the score without overstating certainty.
- Strengths and weaknesses.
- `source_notes` that name source types or sources used.
- `data_gaps` for anything requiring fresher or stronger evidence.
- `last_updated` in `YYYY-MM-DD` format.

## Source Expectations

- Immigration, tax, banking, property, and legal claims should prefer Tier 1 official or institutional sources.
- Cost-of-living claims should use current local prices where possible and label soft sources clearly.
- Safety should not rely on anecdotes alone.
- Climate should distinguish national averages from regional risk.
- Real estate claims should not rely on broker/agent material alone.

## Human Review States

- `unreviewed`: demo data, LLM draft, or human notes that have not been source checked.
- `in_review`: actively being checked; gaps and questionable categories should remain visible.
- `reviewed`: category scores and source notes have been checked by a human, and remaining caveats are intentional.

## Do Not Promote If

- The file contains demo placeholder language.
- More than half of scored categories are Low confidence.
- Core categories are missing.
- Any category has no rationale.
- Important source notes are empty.
- Legal, tax, immigration, banking, or property sections depend only on anecdotal sources.
- The country is being presented as objective truth rather than a structured estimate.
