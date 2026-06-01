# Agents Instructions

These instructions are for AI coding agents working on the relocation dashboard project.

---

# Project Goal

Build a local dashboard that evaluates countries as long-term relocation, residency, investment, and backup-base candidates for a well-educated American.

The dashboard should display structured country evaluations using standardized scoring categories, confidence levels, source notes, and weighting profiles.

---

# Core Principles

## Do Not Invent Authority

Do not present scores as objective truth. Scores are structured estimates.

Always preserve:

- Rationale
- Confidence
- Source notes
- Data gaps
- Last updated date

## Category Scores First

The LLM or data file should provide category-level scores.

The app should compute weighted profile scores.

Do not hard-code overall scores unless they are explicitly marked as manually computed or imported.

## Stable Category IDs

Use the category IDs from `scoring-rubric.md` and `country-output-schema.md`.

Do not rename category IDs casually. If a category ID changes, update:

- Schema
- Weighting profiles
- Country JSON files
- UI labels
- Scoring functions

## Human-Readable and Machine-Readable

The docs should remain readable by a person and usable by an LLM.

When creating new structures, prefer:

- Clear IDs
- Simple JSON
- Explicit score ranges
- Minimal cleverness

---

# Do Not

- Do not remove confidence fields.
- Do not remove data gaps.
- Do not remove source notes.
- Do not mix raw data and computed weighted scores without labeling them.
- Do not create fake citations.
- Do not make country rankings look more precise than they are.
- Do not build auth, payments, or a database in the MVP unless explicitly requested.
- Do not hard-code countries directly into UI components.
- Do not assume every country has every category scored.
- Do not silently ignore invalid category IDs.

---

# Always

- Validate country data before rendering.
- Display missing or stale data clearly.
- Use weighting profiles from config.
- Keep country data separate from UI components.
- Make the methodology visible to users.
- Show evaluation date.
- Show confidence level.
- Keep scoring transparent.
- Prefer static JSON for MVP.

---

# Recommended Project Structure

```txt
relocation-dashboard/
  docs/
    relocation-framework.md
    scoring-rubric.md
    llm-evaluation-prompt.md
    country-output-schema.md
    data-sources.md
    dashboard-design.md
    weighting-profiles.md
    agents.md
    roadmap.md

  src/
    app/
      page.tsx
      countries/
        page.tsx
        [country]/
          page.tsx
      compare/
        page.tsx
      rankings/
        page.tsx
      methodology/
        page.tsx

    components/
      CountryCard.tsx
      CountryScoreTable.tsx
      CategoryRadarChart.tsx
      WeightedRankingTable.tsx
      ConfidenceBadge.tsx
      RiskBadge.tsx
      ProfileSelector.tsx

    data/
      countries/
      weightingProfiles.ts
      categoryDefinitions.ts

    lib/
      scoring.ts
      validation.ts
      countryUtils.ts

    types/
      country.ts
      scoring.ts
```

---

# Data Model Rules

Each country should live in a separate JSON file.

Good:

```txt
src/data/countries/argentina.json
src/data/countries/uruguay.json
```

Bad:

```ts
const countries = [/* huge hardcoded object inside React component */]
```

---

# Scoring Rules

- Category scores are 0–10.
- Profile scores are computed as 0–100.
- If a category is missing, the app should either:
  - Exclude its weight from the denominator, and mark the score incomplete; or
  - Refuse to calculate the profile score until required categories are present.

Preferred MVP behavior:

- Calculate score from available categories.
- Display a completion percentage.
- Show missing categories.

---

# UI Rules

Every country card should show:

- Country name
- Region
- Selected profile score
- Confidence
- Last updated
- Best-for tags
- Major risk tags

Every country page should show:

- Overall thesis
- Profile scores
- Category scores
- Strengths
- Weaknesses
- Major risks
- Open questions
- Data gaps
- Source notes

---

# LLM Integration Rules

When adding LLM-generated country evaluations:

1. Use `llm-evaluation-prompt.md`.
2. Return valid JSON.
3. Validate against `country-output-schema.md`.
4. Save as a country JSON file.
5. Mark `human_review.status` as `unreviewed`.
6. Do not publish as authoritative until reviewed.

---

# Safety and Disclaimer Rules

This project is informational.

Do not present output as:

- Legal advice
- Tax advice
- Immigration advice
- Investment advice
- Safety guarantee
- Climate certainty

Suggested disclaimer:

> This dashboard is an informational research tool. Country scores are structured estimates based on available data, source quality, and judgment. Always verify legal, tax, immigration, and investment decisions with qualified professionals.

---

# Definition of Done for MVP

The MVP is complete when:

- At least 3 country JSON files render successfully.
- The `/countries` page shows country cards.
- Each country has a detail page.
- The `/rankings` page ranks countries by selected profile.
- The `/compare` page compares at least 2 countries.
- The methodology page explains the scoring system.
- Missing data and confidence levels are visible.
