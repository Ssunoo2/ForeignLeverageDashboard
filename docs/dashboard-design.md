# Dashboard Design Document

This document outlines a localhost dashboard for comparing countries as relocation, residency, investment, and long-term backup-base candidates.

The first version should be static, local, and simple. Avoid auth, databases, and API calls until the scoring schema stabilizes.

---

# Product Goal

Build a local dashboard at `localhost:3000` that displays structured country evaluations produced from the relocation scoring framework.

The dashboard should help users:

- Compare countries across standardized relocation criteria
- View category-level strengths and weaknesses
- Switch between weighting profiles
- See confidence and data freshness
- Understand why a country ranks well or poorly
- Identify countries worth deeper research

---

# Suggested MVP Stack

Recommended:

- Next.js or Vite React
- TypeScript
- Static JSON files
- Recharts or similar for charts
- Tailwind or simple CSS modules

Avoid in MVP:

- Database
- Auth
- Paid APIs
- User accounts
- Server-side LLM calls
- Complicated CMS

---

# App Routes

```txt
/
/countries
/countries/[countrySlug]
/compare
/rankings
/methodology
/sources
```

## `/`
Home page with project explanation, top rankings by selected profile, and links to methodology.

## `/countries`
Grid or table of all country cards.

## `/countries/[countrySlug]`
Detailed country page with summary, scores, charts, risks, and source notes.

## `/compare`
Select 2–5 countries and compare scores side by side.

## `/rankings`
Profile-based ranking table.

## `/methodology`
Human-readable explanation of the scoring framework.

## `/sources`
Source quality rules and data caveats.

---

# Core Components

## CountryCard
Displays:

- Country name
- Region
- Selected profile score
- Confidence badge
- Best-for tags
- Major risks
- Last updated

## CountryScoreTable
Displays all category scores for a country.

Columns:

- Category
- Score
- Confidence
- Rationale
- Strengths
- Weaknesses

## WeightedRankingTable
Displays all countries ranked by selected weighting profile.

Columns:

- Rank
- Country
- Weighted score
- Confidence
- Best for
- Major risks
- Last updated

## ProfileSelector
Dropdown or tabs:

- Balanced Relocation
- Climate Hedge
- Remote Worker / Entrepreneur
- Wealth Preservation
- Frontier Upside
- Family and Aging

## CategoryRadarChart
Displays category scores visually.

Useful groupings:

- Livability
- Opportunity
- Stability
- Resource security
- Freedom/optionality

## RiskBadge
Examples:

- Currency Risk
- Capital Controls
- Climate Risk
- Political Volatility
- High Crime
- Foreign Ownership Restrictions
- Data Uncertain

## ConfidenceBadge
Values:

- High
- Medium
- Low

## DataFreshnessBadge
Values:

- Current
- Review Soon
- Stale
- Unknown

---

# Country Detail Page Layout

```txt
Country Header
- Name
- Region
- Evaluation date
- Confidence
- Best for / Bad for tags

Summary Thesis

Profile Scores
- Balanced
- Climate Hedge
- Remote Worker
- Wealth Preservation
- Frontier Upside
- Family/Aging

Charts
- Radar chart
- Bar chart by category

Major Strengths
Major Weaknesses
Major Risks
Open Questions
Data Gaps

Category Score Table

Source Notes

Human Review Notes
```

---

# Comparison Page Layout

User selects countries:

```txt
[Argentina] [Uruguay] [Chile] [Portugal]
```

Then display:

- Overall profile score comparison
- Category score matrix
- Strength/risk comparison
- Best-for tags
- Confidence and freshness

Example matrix:

| Category | Country A | Country B | Country C |
|---|---:|---:|---:|
| Legal Residency | 7 | 8 | 6 |
| Cost of Living | 8 | 6 | 5 |
| Currency/Banking | 3 | 8 | 7 |

---

# Ranking Page Layout

Controls:

- Weighting profile selector
- Region filter
- Minimum confidence filter
- Exclude stale evaluations toggle

Table:

| Rank | Country | Score | Best For | Risks | Confidence | Updated |
|---:|---|---:|---|---|---|---|
| 1 | Exampleland | 82 | Remote Work | Property rights | Medium | 2026-06-01 |

---

# Visual Design Notes

Use a serious, research-dashboard feel.

Suggested tone:

- Clean
- Data-forward
- Strategic
- Not travel-bloggy
- Not fearmongering
- Not overconfident

Color ideas:

- Green: strength
- Yellow: mixed
- Red: risk
- Blue: source/data confidence
- Gray: unknown/stale

Avoid:

- Overly patriotic flags everywhere
- “Top 10 places to escape America” clickbait style
- Overprecise decimal rankings that imply false certainty

---

# Data Handling

For MVP:

```txt
/src/data/countries/*.json
/src/data/weightingProfiles.ts
/src/data/categoryDefinitions.ts
```

The app should:

1. Load country JSON files.
2. Validate category IDs.
3. Compute weighted scores from selected profile.
4. Display missing categories as incomplete.
5. Display confidence and data gaps prominently.

---

# Scoring Calculation

Pseudo-code:

```ts
function calculateWeightedScore(country, profileWeights) {
  let weightedTotal = 0;
  let totalWeightUsed = 0;

  for (const [categoryId, weight] of Object.entries(profileWeights)) {
    const category = country.category_scores.find(c => c.category_id === categoryId);

    if (!category || typeof category.score !== 'number') continue;

    weightedTotal += category.score * weight;
    totalWeightUsed += weight;
  }

  if (totalWeightUsed === 0) return null;

  return (weightedTotal / totalWeightUsed) * 10;
}
```

This converts 0–10 category scores to a 0–100 profile score.

---

# MVP Build Order

## Phase 1: Static Data Display

- Create country JSON schema
- Add 2–3 sample country JSON files
- Render country cards
- Render country detail pages
- Add methodology page

## Phase 2: Weighted Rankings

- Add weighting profile config
- Create scoring utility
- Add ranking page
- Add profile selector

## Phase 3: Comparison Tools

- Add compare page
- Add multi-country selection
- Add category matrix
- Add radar/bar charts

## Phase 4: LLM Workflow

- Add prompt docs
- Generate country JSON manually
- Validate JSON shape
- Add human review field

## Phase 5: Public Website Candidate

- Add SEO-friendly pages
- Add disclaimers
- Add source citations
- Add update dates
- Improve performance and accessibility

---

# Important Product Rules

- Never hide low-confidence data.
- Never show an overall score without showing category scores.
- Never imply the rankings are investment, tax, legal, or immigration advice.
- Always show evaluation date.
- Always distinguish data from judgment.
- Make it easy to see why a country scored well.
