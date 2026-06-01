# Roadmap

This roadmap keeps the relocation dashboard focused and prevents scope creep.

---

# Phase 0 — Documentation and Schema

Goal: Create the rails before building.

Tasks:

- Create relocation framework document
- Create scoring rubric
- Create country output schema
- Create LLM evaluation prompt
- Create weighting profiles
- Create data sources guide
- Create dashboard design doc
- Create agents instructions

Exit criteria:

- All docs exist in `/docs`
- Category IDs are stable
- JSON schema is clear enough for country files
- Weighting profiles are defined

---

# Phase 1 — Static Local Dashboard

Goal: Render static country data locally.

Tasks:

- Set up Next.js or Vite React project
- Create TypeScript country types
- Add static country JSON files
- Build country list page
- Build country detail page
- Add basic score cards
- Add confidence badges
- Add major strengths/risks sections

Exit criteria:

- App runs on `localhost:3000`
- At least 3 countries render from JSON
- No database or API required

---

# Phase 2 — Weighted Rankings

Goal: Add profile-based rankings.

Tasks:

- Add weighting profile config
- Write `calculateWeightedScore` utility
- Add profile selector
- Build rankings page
- Show completion percentage for incomplete country data
- Show stale/missing data warnings

Exit criteria:

- User can switch between ranking profiles
- Country order changes based on weighting profile
- Scores are computed from category data, not hard-coded

---

# Phase 3 — Comparison View

Goal: Let users compare countries side by side.

Tasks:

- Build country multi-select
- Build comparison matrix
- Add category score comparison
- Add strengths/weaknesses comparison
- Add risk badge comparison
- Add confidence comparison

Exit criteria:

- User can compare 2–5 countries
- Differences are easy to see
- Low-confidence data is visible

---

# Phase 4 — Visualization

Goal: Make the dashboard more readable.

Tasks:

- Add radar chart
- Add bar chart by category
- Add profile score chart
- Add grouped category sections
- Add filters by region, confidence, and profile

Exit criteria:

- Users can understand country profiles visually
- Charts do not hide missing or low-confidence data

---

# Phase 5 — LLM-Assisted Scoring Workflow

Goal: Generate country JSON files semi-manually.

Tasks:

- Use `llm-evaluation-prompt.md` to evaluate countries
- Save LLM outputs as JSON
- Validate JSON files
- Add human review notes
- Track source gaps
- Create a checklist for country review

Exit criteria:

- 10+ country JSON files exist
- Every country has confidence and data gaps
- Human review status is tracked

---

# Phase 6 — Python/API Automation

Goal: Batch-generate and validate country evaluations.

Tasks:

- Create country list file
- Write Python script to build prompts
- Call LLM API
- Validate JSON output
- Save country JSON files
- Log failures and malformed outputs
- Add freshness metadata

Exit criteria:

- Script can generate draft country files
- Invalid outputs are rejected
- Human review remains required before publishing

---

# Phase 7 — Public Informational Website Candidate

Goal: Turn local dashboard into a useful public site.

Tasks:

- Add public methodology page
- Add disclaimers
- Add source pages
- Add SEO-friendly country pages
- Add sitemap
- Add accessibility pass
- Add performance pass
- Add source citations and update dates

Exit criteria:

- Site is useful to others without overstating certainty
- Scores are explainable
- Methodology is transparent

---

# Backlog Ideas

- User-adjustable custom weighting profiles
- Export country comparison as Markdown or PDF
- Add notes per country
- Add source freshness dashboard
- Add map view
- Add city-level evaluations
- Add regional climate filters
- Add family profile vs solo profile
- Add retirement profile
- Add property-investor profile
- Add API-backed data refresh
- Add admin review mode
- Add public comments or community submissions

---

# Do Not Build Yet

Avoid these until the core schema and dashboard are working:

- User accounts
- Paid subscriptions
- Live scraping
- Complex database schema
- AI chat interface
- Real-time source updates
- Public rankings marketed as definitive
- Legal/tax/immigration advice features
