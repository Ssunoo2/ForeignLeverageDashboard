# Feature: [Feature name]

*Mini-PRD for a single post-MVP feature. One feature per file, stored in `features/<feature-name>.md`. Lighter than `prd.md` — this is feature-scoped, not product-scoped, and assumes the product context already exists.*

## One-line description

*What does this feature do, in one sentence? Plain language.*

[Your answer here]

## Problem

*What specific user pain does this address? Cite the evidence: user feedback, support tickets, observed behavior, your own usage. "We think users would like this" is not evidence; "three users asked for this in the last month" is.*

[Your answer here]

## Users affected

*Which user types or segments will use this feature? All users, or a subset? Rough portion if known.*

[Your answer here]

## Success signal

*How will you know this feature is working once shipped? Concrete and observable — adoption rate, reduction in a specific support volume, completion rate of a flow, time-to-task. Different from acceptance criteria, which verify the feature is built correctly; this verifies it's worth having.*

[Your answer here]

## Scope

*What's in this feature and what's explicitly out. Feature-level non-goals protect against scope creep at the feature level.*

**In:**

[Your answer here]

**Out:**

[Your answer here]

## Affected surface area

*What existing code, UX flows, or integrations does this touch? This is the regression vector — every item here is something that could break if the feature is implemented carelessly. Be specific: file paths, screen names, API endpoints, DB tables, third-party calls.*

[Your answer here]

## Dependencies

*What this feature depends on. Existing features that must work first, libraries, third-party services, prior decisions in `decisions.md`.*

[Your answer here]

## Acceptance criteria

*High-level criteria for "this feature works." Each criterion is a single check. Detailed task-level criteria go in the corresponding `roadmap.md` task entries.*

- [ ] [criterion]
- [ ] [criterion]
- [ ] [criterion]

## Regression checks

*Manual or automated checks to run before declaring this feature done, to verify the affected surface area still works. Different from acceptance criteria — those verify the new thing works; these verify the old thing didn't break.*

- [ ] [check]
- [ ] [check]

## Open questions

*Unresolved questions whose answers will shape implementation. Resolved questions move to `decisions.md`.*

[Your answer here]

## Related decisions

*Links to `decisions.md` entries that informed this feature spec or that this spec depends on.*

[Your answer here]
