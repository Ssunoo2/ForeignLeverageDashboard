# Roadmap

**Mode:** Planning
**Current task:** —
**Last updated:** YYYY-MM-DD

*The mode header above is maintained by the agent at session end and read first at session start. See `defaults/roadmap.md` §"Mode header" for transitions.*

---

*Project-specific overlay on `defaults/roadmap.md`. The defaults cover the universal baseline — phase structure, task format, MVP discipline, dependency rules, mode header, status lifecycle. This doc is the actual ordered execution plan for this project.*

*This is the bridge between planning and execution. Tasks here should be detailed enough that a fresh agent session can pick one up cold and execute it without re-deriving context.*

## MVP definition

*What does "MVP shipped" look like? A single, concrete description of the state the app is in when MVP is complete. This is the target the roadmap is aiming at.*

[Your answer here]

## MVP gate

*What observable behavior tells us the MVP validated the concept and we should keep investing? Concrete and observable — "10 weekly active users for 4 weeks," "first paying customer," "5 users complete the core flow without help." Different from `prd.md` §"Long-term success," which is the 6-12 month ambition; this is the proceed-or-pivot signal.*

[Your answer here]

---

## Phase 1: Foundation

*Setup, scaffolding, dev environment, deployable hello-world, CI, baseline auth. The boring stuff that has to exist before features can.*

### [Task name]
- **Status:** Not started
- **Depends on:** none
- **Acceptance criteria:**
  - [ ] [specific, checkable criterion]
  - [ ] [specific, checkable criterion]
- **Relevant docs:** [pointers, e.g. "architecture.md §Stack"]
- **Notes:** [optional]

---

## Phase 2: MVP Core

*The minimum set of features needed to validate the core value proposition. If you cut any of these, the app doesn't demonstrate its reason for existing.*

### [Task name]
- **Status:** Not started
- **Depends on:** [task name from Phase 1]
- **Acceptance criteria:**
  - [ ] [specific, checkable criterion]
- **Relevant docs:** [pointers, e.g. "prd.md §Core functionality"]
- **Notes:** [optional]

---

## Phase 3: MVP Polish

*Error handling, edge cases, empty/loading/failure states, basic accessibility — the work needed to put real users in front of it.*

### [Task name]
- **Status:** Not started
- **Depends on:** [task name from Phase 2]
- **Acceptance criteria:**
  - [ ] [specific, checkable criterion]
- **Relevant docs:** [pointers]
- **Notes:** [optional]

---

## Phase 4: Post-MVP / Deferred

*Features cut from MVP, growth features, optimizations, nice-to-haves. Documented so they're not lost; not built until MVP ships.*

### [Task name]
- **Status:** Not started
- **Depends on:** MVP shipped
- **Acceptance criteria:**
  - [ ] [specific, checkable criterion]
- **Relevant docs:** [pointers]
- **Notes:** [why this was deferred]

---

## Exceptions to defaults

*Anything from `defaults/roadmap.md` this project doesn't follow. Each exception must have a `decisions.md` entry.*

[Your answer here]
