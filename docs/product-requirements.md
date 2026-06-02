# Product Requirements

## Product Name

Working name: Foreign Leverage Dashboard

## Product Vision

Build a transparent relocation intelligence tool for people evaluating countries as long-term relocation, second-residency, lifestyle, investment, or backup-base options.

The product should help users discover suitable countries, including countries they may not have considered, while making uncertainty, source quality, and data freshness visible.

## Target Users

Primary early users:

- Well-educated Americans considering a Plan B.
- Remote workers and entrepreneurs with portable income.
- People concerned about taxes, banking, inflation, property rights, or capital controls.
- Families seeking safer, calmer, more affordable, or more resilient environments.
- Research editors maintaining structured country data.

Secondary users:

- Retirees and aging planners.
- Climate and resilience planners.
- Freedom/civil-liberties motivated movers.
- Frontier investors or builders.
- Advisors, family offices, immigration/tax professionals, or relocation consultants.

## Core User Problems

- Users know they may want or need to leave, but do not know where to look.
- Popular relocation content is often anecdotal, promotional, or clickbait.
- Country recommendations are usually one-size-fits-all.
- Users cannot easily see why a country ranks well or poorly.
- Current relocation decisions require legal, tax, banking, healthcare, safety, and climate caveats.
- Unfamiliar countries may be dismissed too quickly or hyped without evidence.

## Core Value Proposition

The dashboard converts country evaluation into a transparent system:

Country -> category scores -> weighting profile -> computed ranking

It does not claim one universal best country. It helps users find countries that fit their specific goals, risk tolerance, and time horizon.

## MVP Scope

The MVP should include:

- Static country JSON files.
- Category-level scores with rationale, strengths, weaknesses, confidence, source notes, and data gaps.
- Weighting profiles:
  - Balanced Relocation
  - Climate Hedge
  - Remote Worker / Entrepreneur
  - Wealth Preservation
  - Frontier Upside
  - Family and Aging
- Country ranking page.
- Country detail page.
- Comparison page.
- Methodology page.
- Sources page.
- Review dashboard.
- Research queue.
- Expandable profile score breakdowns.
- Data quality scoring separate from country attractiveness.

## Non-Goals

Do not build these in the MVP:

- User accounts.
- Database.
- Live scraping.
- Paid subscriptions.
- AI chat interface.
- Real-time alerts.
- Legal, tax, immigration, investment, safety, or climate advice.
- Affiliate-driven recommendations.
- A single definitive “best countries” list.

## Key Product Principles

### Profile-Specific Ranking

Every ranking should be tied to a weighting profile. The product should avoid universal rankings unless clearly framed as one profile among many.

### Category Scores First

Country files provide category-level scores. The app computes profile scores from those categories.

### Explain the Math

Users should be able to expand a profile score and see:

- category
- weight
- category score
- contribution
- confidence
- missing categories

### Make Uncertainty Visible

Every score should preserve:

- confidence
- source notes
- data gaps
- freshness
- human review status

### Discovery Without Hype

The product should help users discover unfamiliar countries while clearly showing drawbacks and uncertainty.

### Research Integrity

Demo data, unreviewed data, and reviewed data must be visibly different.

## Core Pages

### Home

Purpose:

- Introduce the product.
- Show profile-based rankings.
- Communicate that the app is a research tool, not advice.

### Countries

Purpose:

- Browse all countries.
- See profile score, confidence, freshness, strengths, and risks.

### Country Detail

Purpose:

- Explain one country deeply.
- Show profile scores, category scores, rationale, source notes, data gaps, research tasks, and review status.

### Rankings

Purpose:

- Rank countries by selected weighting profile.
- Filter by region, confidence, completion, and freshness.

### Compare

Purpose:

- Compare 2-5 countries side by side.
- Show category scores, confidence, strengths, risks, and profile scores.

### Research

Purpose:

- Show open research tasks across countries.
- Help editors prioritize missing categories, source gaps, missing metrics, Low confidence, and stale data.

### Review

Purpose:

- Show country file readiness and blockers.
- Separate data quality from relocation attractiveness.

### Methodology

Purpose:

- Explain scoring scale, confidence scale, weighting profiles, and disclaimers.

### Sources

Purpose:

- Explain source tiers, freshness targets, and evidence caveats.

## Key Features

### Weighting Profiles

Users can switch profiles and see ranking changes.

Acceptance criteria:

- Profile scores are computed from category scores.
- Missing categories affect completion but do not disappear.
- Profile weights are stored outside UI components.

### Country Detail Evidence

Users can inspect the rationale behind every score.

Acceptance criteria:

- Category scores show rationale, strengths, weaknesses, confidence, source notes, and data gaps.
- Key metrics show source, source tier, date accessed, and notes.
- Research filters can focus on Low confidence, source gaps, missing metrics, and stale data.

### Research Queue

Editors can see what needs work next.

Acceptance criteria:

- Queue includes missing categories, source gaps, missing metrics, Low confidence, and stale categories.
- Tasks can be filtered by country, issue type, and priority.
- Tasks link back to country pages.

### Data Quality Score

Users and editors can see whether a country file is ready for trust.

Acceptance criteria:

- Data quality score is separate from relocation score.
- Demo data is blocked from being treated as reviewed.
- Validation errors, missing categories, source gaps, stale categories, and Low confidence are visible.

## Success Metrics

### Activation

- User switches weighting profile.
- User opens a country detail page.
- User expands a profile score breakdown.
- User compares at least two countries.

### Trust

- User opens source notes or key metrics.
- User views methodology or sources page.
- User notices confidence/freshness indicators.

### Discovery

- User views a country they had not previously considered.
- User changes shortlist after switching profiles.
- User uses compare page for unfamiliar countries.

### Research Quality

- Number of reviewed country files.
- Number of source gaps reduced.
- Number of stale categories reduced.
- Number of country files with full core category coverage.

### Monetization Readiness

- Users request custom reports.
- Users export or save comparisons.
- Users repeatedly return for updates.
- Users engage with full dossiers and source notes.

## Future Enhancements

- Saved shortlists.
- Custom weighting profiles.
- Country brief exports.
- PDF/Markdown reports.
- Source update alerts.
- Paid country dossiers.
- User profile intake quiz.
- City-level evaluation.
- Public SEO pages.
- Professional/advisor tier.

## Risks

- Scores may appear more objective than they are.
- Monetization could bias recommendations.
- Outdated legal/tax/immigration data could mislead users.
- Overfocus on U.S. users may limit global applicability.
- Climate and safety predictions may be overinterpreted.
- Users may mistake informational content for advice.

## Guardrails

- Always show confidence and source caveats.
- Do not hide data gaps.
- Do not sell affiliate placements as recommendations.
- Do not publish country files as reviewed until human review is complete.
- Do not provide legal, tax, immigration, investment, safety, or climate certainty.
- Keep methodology public and understandable.
