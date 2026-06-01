# Relocation Dashboard Todo

This backlog expands the static dashboard without violating the MVP rules: static JSON first, no auth, no database, no live API calls, and no invented authority.

## P0 — Research Integrity

- Replace demo country scores with researched draft country JSON files.
- Keep every score category-level, with rationale, strengths, weaknesses, confidence, source notes, data gaps, and `last_updated`.
- Add a review workflow surface for `unreviewed`, `in_review`, `reviewed`, stale, and source-gap states.
- Add a source checklist before any country is treated as publishable.

Acceptance criteria:

- At least 5 countries have researched draft JSON.
- Every researched file passes validation.
- Demo data is never presented as researched truth.

## P1 — Validation and Tests

- Strengthen runtime validation for country files, category IDs, dates, source notes, duplicate categories, confidence values, and scoring ranges.
- Add tests for weighted scoring, missing category handling, confidence calculation, freshness, and validation failures.
- Surface validation summaries in the UI without hiding incomplete data.

Acceptance criteria:

- `npm test` runs locally.
- Invalid categories and duplicate category IDs are caught.
- Weighted profile scores are computed from category data only.

## P1 — Source and Methodology Pages

- Add a `/sources` page covering source tiers, freshness expectations, and research caveats.
- Expand `/methodology` with clearer profile scoring explanation and disclaimer language.
- Make source quality visible enough for a future public informational site.

Acceptance criteria:

- `/sources` is reachable from navigation.
- Source tiers and freshness targets are visible.
- Legal/tax/immigration/investment disclaimer is visible.

## P1 — Ranking and Compare Usability

- Add ranking filters for region, minimum confidence, minimum completion, and stale data.
- Improve comparison with category group filters and strengths/risks side-by-side.
- Keep low-confidence and missing category cells visible.

Acceptance criteria:

- Rankings can be filtered without mutating source data.
- Compare view supports 2-5 countries and category group filtering.
- Missing category values are shown explicitly.

## P2 — Visualization

- Add category bar charts before radar charts.
- Group categories by Access, Money, Opportunity, Resilience, Stability, Livability, Freedom, and Fit.
- Avoid charts that hide missing or low-confidence data.

Acceptance criteria:

- Country detail pages show a readable category score visualization.
- Bars include confidence and missing-data context.

## P2 — Data Expansion Workflow

- Create a repeatable checklist for adding a new country JSON file.
- Add a source freshness dashboard.
- Add an LLM draft import workflow only after the static data model is stable.

Acceptance criteria:

- New country additions have a clear manual checklist.
- Human review remains required before publication.

## Deferred

- Database
- Auth
- Paid APIs
- Live scraping
- AI chat interface
- Public rankings marketed as definitive
- Legal, tax, immigration, or investment advice features
