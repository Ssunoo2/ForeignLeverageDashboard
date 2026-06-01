# Roadmap Defaults

This is the universal baseline for how project roadmaps are structured. It applies to every project unless the project's own `roadmap.md` explicitly overrides a rule with a justified reason logged in `decisions.md`.

The project's own `roadmap.md` is the ordered execution plan — the bridge between planning (PRD, architecture, design) and building. It's designed to be picked up by an execution agent (e.g., Claude Code running Sonnet) and followed task-by-task without re-deriving context.

---

## What the roadmap is for

The roadmap answers: *given everything the other docs describe, what do we build, in what order, to get from nothing to a shippable MVP?*

It is the handoff document between two modes of work:

- **Planning mode** (typically with a high-reasoning model in a chat interface): fill out PRD, architecture, design, security, integrations. Then break the work into ordered, executable tasks in `roadmap.md`.
- **Execution mode** (typically with an agentic coding tool): read the roadmap, pick the next unblocked task, build it, mark it done, move on.

This division only works if the roadmap is unambiguous. Tasks that require the executor to re-derive scope, re-decide architecture, or guess at acceptance criteria will break the handoff.

## Phase structure

Every roadmap uses these phases. Skip a phase only if it's genuinely empty.

1. **Foundation** — repo setup, scaffolding, dev environment, deployable "hello world," CI, auth if needed. The boring stuff that has to exist before features can.
2. **MVP Core** — the minimum set of features from PRD §"Core functionality" needed to validate the core value proposition. If you cut any of these, the app doesn't demonstrate its reason for existing.
3. **MVP Polish** — error handling, edge cases, empty/loading/failure states, basic accessibility, the UX work needed to put real users in front of it (not just internal demos).
4. **Post-MVP / Deferred** — features cut from MVP, growth features, optimizations, nice-to-haves. Document them so they're not lost, but they don't get built until MVP ships.

The MVP boundary lives between phases 3 and 4. Be ruthless about what crosses it.

## MVP discipline

- **The cut test:** for every candidate feature, ask "if we cut this, does the app still demonstrate its core value?" If yes, cut it from MVP, move it to Post-MVP.
- **No speculative work in MVP.** Features added "because we'll probably need it" almost always end up unused or wrong. Build when you need it.
- **Polish is not optional;** it's a phase. Skipping MVP Polish to ship faster ships something users will reject.
- **Refactors are not roadmap items in MVP.** If code works and meets acceptance criteria, don't refactor it before MVP. Add a Post-MVP entry if it genuinely needs cleanup.

## Task format

Every task block follows this shape:

```
### [Task name]
- **Status:** Not started | In progress | Done | Blocked
- **Depends on:** [task names, or "none"]
- **Acceptance criteria:**
  - [ ] [specific, checkable criterion]
  - [ ] [specific, checkable criterion]
- **Relevant docs:** [pointers, e.g. "prd.md §Core functionality", "architecture.md §Stack"]
- **Notes:** [optional — context that helps an agent pick this up cold]
```

## Writing tasks for autonomous execution

The single most important property of a task: **a fresh agent session can read this task and execute it without asking clarifying questions.** That requires:

- **Acceptance criteria are checkable, and each criterion is a single check.** Good — three separate criteria: `User can sign up with email and password.` / `Signup triggers a verification email within 30 seconds.` / `Login is blocked until verification is complete.` Bad: `Auth works well.` Also bad: combining three checks into one bullet — split them so each can be ticked off independently.
- **Reference docs by section,** not in general. "See `prd.md` §Users" tells the agent exactly where to look. "See the PRD" forces re-reading.
- **State assumptions explicitly.** If the task assumes a library is installed or a schema migration has run, say so under Depends on.
- **No verb soup.** "Improve performance" or "clean up the auth code" are not tasks; they're regrets. Say what specifically gets better, by what measure.
- **Right-size the granularity.** A task should be completable in roughly one focused session (a couple of hours of work, give or take). Larger than that → split. Smaller than 15 minutes of meaningful work → batch with neighbors.

## Dependencies

- **Mark dependencies explicitly.** Don't rely on the executor inferring them from task order.
- **A dependency means the predecessor's acceptance criteria are met.** Not "started" — done.
- **Avoid cyclic dependencies.** If two tasks depend on each other, they're really one task; merge them, or split the shared work into a third predecessor.

## Mode header

Every project's `roadmap.md` starts with a mode header at the top that tracks current state at-a-glance:

```
**Mode:** Planning | Execution (Pre-MVP) | Execution (Post-MVP) | MVP Gate Pending
**Current task:** [task name, or "—" if no active task]
**Last updated:** YYYY-MM-DD
```

The agent maintains this header at session end and reads it first at session start. The header exists for one reason: to make the project's current state impossible to misread. A stale header means the project's state is uncertain; reconcile before continuing.

Mode transitions:
- **Planning → Execution (Pre-MVP)** when intake, roadmap, and acceptance review (Step 4) are complete.
- **Execution (Pre-MVP) → MVP Gate Pending** when the last MVP Polish task is verified Done.
- **MVP Gate Pending → Execution (Post-MVP)** when the user picks the "start Post-MVP work" or "iterate" path from §"MVP gate outcomes."
- **Any → Planning** when returning to full planning mode per the triggers in CLAUDE.md §"Post-MVP execution mode."

## Status lifecycle

- **Not started** — default state for new tasks.
- **In progress** — currently being worked on. Update when work begins.
- **Done** — all acceptance criteria met, verified, and (if applicable) merged to main. Don't mark done until criteria actually check out.
- **Blocked** — can't proceed; document what's blocking (external dependency, decision needed, etc.).

## When to update the roadmap

- **Discovery during execution — strict bar.** Only stop and propose a new predecessor task if you *literally cannot complete the current task* without it existing as a finished task. "Would be cleaner to do first" or "feels out of order" doesn't qualify. When the bar is met: draft the new task entry, surface to the user, add to the roadmap with confirmation. When the bar isn't met: build the current task as written. Don't silently expand the current task's scope either way.
- **Acceptance criteria turn out wrong:** update them, log the change in `decisions.md` if it affects scope.
- **A task is taking far longer than expected:** stop and split it. The original was too large.
- **MVP boundary shifts:** moving items in or out of MVP is a real decision; log it in `decisions.md`.

## What "done" means

A task is Done only after explicit verification with the user:

- **Each acceptance criterion has been demonstrated, not asserted.** Run the test that proves it, show the output, paste the relevant code with a brief explanation of why it satisfies the criterion, or describe the manual verification performed. "I believe this works" is not demonstration.
- **If `testing.md` exists and the task is feature work,** the tests it specifies are written and passing.
- **If `security.md` or `defaults/security.md` apply,** the relevant rules are followed.
- **The work is committed** (and merged, if working on branches).
- **The user has explicitly confirmed Done** after seeing the verification walkthrough.

Marking a task Done without verification is the most common way execution mode breaks. Future tasks that depend on this one will assume the criteria were met; if they weren't, the project develops silent inconsistencies that surface much later as bugs or wasted work.

If a criterion can't be demonstrated, the task is not Done. Mark it Blocked, document what's blocking in the task's Notes, and move on or escalate.

## MVP gate outcomes

Building MVP is not the end of planning. Once MVP is built and shipped to real users, the next decision is made against the MVP gate defined in `roadmap.md` §"MVP gate". Most projects fail to make this decision deliberately — they either silently abandon or zombie-march into Post-MVP work that won't fix anything.

Don't continue execution past MVP without going through this protocol.

### If the gate is met

The concept validated. Next steps:

1. **Log the result in `decisions.md`** — what was measured, by when, what evidence cleared the gate.
2. **Decide what's next.** Three reasonable paths:
   - Start Post-MVP work in priority order.
   - Revise the roadmap based on what shipping MVP taught you (often the right move — real users surface assumptions the PRD got wrong).
   - Declare the project mature and shift to maintenance mode.
3. **Update `roadmap.md` to reflect the chosen path** explicitly. Don't silently drift from "MVP shipped" into "now building random Post-MVP stuff."

### If the gate is not met

Most MVPs fail their first gate. This is the moment most projects silently die or push more code at a problem that more code won't solve. Force a decision before any more execution:

1. **Stop building Post-MVP features.** Adding more to a concept that didn't validate is the most common form of wasted work.
2. **Capture what was learned.** Why did the gate fail? What did real-user behavior reveal that the PRD assumed wrong? Add to `decisions.md`.
3. **Choose explicitly between:**
   - **Pivot** — the concept needs significant reshaping. Return to planning mode: revisit `prd.md`, redefine the MVP, rebuild the roadmap. Don't try to retrofit a new concept into the existing roadmap.
   - **Iterate** — the concept is right but the MVP missed something specific. Define a v1.1 scope and a revised gate. New roadmap entries; log the iteration decision.
   - **Kill** — the concept didn't work and isn't worth more investment. Document the postmortem in `decisions.md`: what was learned that could inform future projects.

The worst path is none of these — continuing to build because the project has momentum. Apply the cut test ruthlessly, the same way you did when defining MVP scope.

### If the gate signal is ambiguous

Sometimes the data is unclear. A few users seem engaged; others bounced. Treat ambiguous as "not met" for the purposes of this protocol — force the decision rather than continuing on hope. If you genuinely don't have enough signal, the right move is usually to define a clearer gate and give it a defined window (another 4 weeks, another 50 users) before deciding, not to keep building.

## Post-MVP roadmap structure

Once MVP has shipped and the path forward is "start Post-MVP work" or "iterate" (per §"MVP gate outcomes"), the roadmap structure evolves:

- **Preserve the MVP phases as history.** Don't delete Phases 1-3 — they're shipped history. Mark them complete (e.g., `## Phase 1: Foundation ✅ (completed YYYY-MM-DD)`). Future readers, including the agent in fresh sessions, need to see what was done.
- **Phase 4 (Post-MVP) becomes active.** What was previously deferred is now the working backlog.
- **Add a feature section per new feature.** Each new post-MVP feature gets its own section in `roadmap.md` with the feature name as a heading, a link to its `features/<feature-name>.md` spec, and ordered tasks underneath. Tasks use the same format as MVP tasks (status, dependencies, acceptance criteria, relevant docs, notes).
- **Add a Polish & Maintenance section.** Bugs, small UX fixes, refactors, security updates that don't warrant their own feature spec live here. Each item still gets its own task block with acceptance criteria — the lower bar for "feature" doesn't mean a lower bar for task discipline.
- **Optional: versioned releases.** If the project ships in cuts (v1.1, v1.2), group feature sections under version headers. Mark a version Done when all its tasks are Done and it has shipped.

The MVP gate metric is replaced by feature-level success signals captured in each feature's `features/<feature-name>.md` §"Success signal." Track those separately from acceptance criteria — a feature can be built correctly (all criteria met) and still fail its success signal (users don't adopt it). That's still useful information; log it in `decisions.md` and use it to inform what gets built next.

Keep one `roadmap.md` per project. Don't fragment into multiple files; sections grow as features are added. The single-source-of-truth property is what lets execution mode work across sessions.

## Project-specific overrides

The project's own `roadmap.md` should:

- **List the actual phases and tasks** for this app, using the format above.
- **Define the MVP boundary explicitly** — what features are in vs. deferred.
- **Track status as work progresses,** so the next session knows where to pick up.
- **Document exceptions to these defaults** with a `decisions.md` entry (e.g., skipping the Polish phase because the audience is internal).
