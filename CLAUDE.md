# Agent Instructions

You are working in a project that uses a documentation-first workflow. Before generating any code, read the project documentation and adhere to it. Treat the docs as the source of truth.

## Defaults, templates, and overrides

This project uses a layered doc system:

- **`defaults/<doc>.md`** — universal baselines that apply to every project (e.g., `defaults/security.md`, `defaults/integrations.md`, `defaults/roadmap.md`). Do not edit these in the project; treat them as inherited rules.
- **`templates/<doc>.md`** — skeletons used to start a new project-root doc. Copy the template to the project root, then fill it in. Leave the originals in `templates/` untouched as reference.
- **`<doc>.md`** at the project root — project-specific content filled in from the template: this app's PRD, threat model, stack choices, exceptions to defaults, and additions that go beyond them.

**Read both defaults and project-root docs, in this order:** defaults first, then the project's version layered on top. Templates are not read at runtime — they're only used during intake to create new project-root docs.

**Conflict resolution:**
- The project's doc wins when it explicitly overrides a default.
- Every override must have a corresponding entry in `decisions.md` explaining why the default doesn't apply.
- If the project's doc is silent on something the default covers, the default applies.
- If you spot an apparent conflict that isn't documented in `decisions.md`, treat it as drift — flag it and ask before proceeding.

**Missing files:**
- Default exists, project file missing → defaults apply alone.
- Project file exists, no default → project file is the only source.
- Neither exists → see "Required vs conditional docs" below.

## Two modes: planning and execution

Projects in this system move through two distinct modes:

- **Planning mode** — typically with a high-reasoning model in a chat interface. Goal: produce a complete set of project docs (PRD, architecture, design, security overlays, integrations registry) and an ordered, executable roadmap.
- **Execution mode** — typically with an agentic coding tool. Goal: pick up the next unblocked task from `roadmap.md`, build it, mark it done, move on. No re-planning unless a task reveals a gap that requires it.

The handoff between modes runs through `roadmap.md`. If the roadmap is unambiguous, execution mode runs cleanly. If it's vague, execution mode stalls on clarifying questions or makes guesses that contradict planning intent.

**In planning mode:** focus on producing high-quality docs and a roadmap with checkable acceptance criteria.

**In execution mode:** trust the planning docs. Pick the next unblocked task. Build it. Verify acceptance criteria. Update status. Only escalate back to planning when a task can't be completed as written (missing predecessor, criteria turn out wrong, scope larger than the task implied).

## Read order

Before responding to any non-trivial request, read these in order. For each, check `defaults/<name>.md` first if it exists, then the project's `<name>.md`:

1. `prd.md` — what is being built and for whom
2. `roadmap.md` — what's being built next; current task status
3. `architecture.md` — stack and infrastructure constraints
4. `design.md` — visual and interaction conventions
5. `security.md` — input handling, auth, secrets, threat model
6. `integrations.md` — external APIs, webhooks, rate limits, caching strategy (read whenever code touches an external service)
7. `data-model.md`, `monetization.md`, `compliance.md`, `glossary.md`, `testing.md` — as relevant
8. `decisions.md` — review past decisions before making new ones

Trivial requests (typo fixes, formatting, one-liners) don't require a full doc read. Use judgment.

## Required vs conditional docs

**Required for every project:**
`prd.md`, `roadmap.md`, `architecture.md`, `design.md`, `security.md`, `decisions.md`

**Conditional — only required if the criterion is met:**

| Doc | Required when |
|---|---|
| `integrations.md` | The app calls any external API or receives any webhook |
| `monetization.md` | The app charges users or has paid tiers |
| `compliance.md` | Handles PII, payments, health data, or operates in a regulated jurisdiction |
| `data-model.md` | The app has non-trivial persistent state |
| `glossary.md` | The domain has specialized vocabulary |
| `testing.md` | The project has more than one core feature |
| `features/<name>.md` | Post-MVP — one per new feature being added (from `templates/feature-spec.md`) |

If a conditional criterion is not met, the doc should not exist. Don't suggest creating it.

## Planning mode workflow

When a new project starts, or when a required doc is missing, run planning mode end-to-end before any code is written. Planning has four steps; do not declare ready for execution handoff until Step 4 is complete.

**To start a new project-root doc:** copy `templates/<doc>.md` to `<doc>.md` at the project root, then fill in sections as answers come in. Leave the originals in `templates/` untouched.

### Step 1: Gating questions

Ask these first to determine which conditional docs apply. One or two at a time, not all at once. Don't invent defaults — confirm each answer with the user.

1. **What does this app do, in one sentence?** (orients everything; goes into `prd.md`)
2. **What platform?** (web, mobile native, cross-platform, desktop, CLI, self-hosted server) → `architecture.md`
3. **Does it charge users?** → if yes, `monetization.md` applies
4. **Does it handle PII, payments, health data, or operate in a regulated jurisdiction?** → if yes, `compliance.md` applies
5. **Does it have non-trivial persistent state?** → if yes, `data-model.md` applies
6. **Does it call any external APIs or receive webhooks?** → if yes, `integrations.md` applies
7. **Does the domain have specialized vocabulary?** → if yes, `glossary.md` applies

### Step 2: Section walkthrough

After gating, walk through each applicable doc with the user. For each doc:

1. Open the template (`templates/<name>.md`). Treat each section header as a question to walk through with the user.
2. Ask one or two sections worth of questions at a time. Don't dump the whole template.
3. Push back on vague answers; offer concrete examples of good specificity. Vague planning docs produce broken execution mode.
4. If an answer can't be resolved right now, capture it under `prd.md` §"Open questions" if applicable, or note it in the doc and move on.
5. **When all sections of a doc are filled, show the user the completed doc and confirm before moving to the next doc.** Don't confirm after every section — that's stop-start friction. Confirm at doc boundaries.

**Order of docs to walk through** (skip any whose gating question was "no"):

1. `prd.md` — most important; everything flows from this
2. `architecture.md` — stack, infrastructure, deployment
3. `design.md` — visual style, components, interaction patterns. **Special handling:** when entering this doc, the agent's first action is to offer the preset choice from `templates/design.md` §"Quick-start." If the user picks a preset, fetch/reference its content, populate the sections from it, then walk through the remaining sections to tighten to the project's brand. If the user opts to build from scratch, walk through the sections normally.
4. `security.md` — sensitive data, threat model, exceptions to defaults
5. `integrations.md` (if applicable) — provider registry; for each provider, note the data category (immutable / slowly-changing / fast-changing / user-generated)
6. `data-model.md` (if applicable) — entities, relationships, constraints
7. `monetization.md` (if applicable) — model, tiers, billing flows
8. `compliance.md` (if applicable) — frameworks, residency, user rights
9. `glossary.md` (if applicable) — domain terms
10. `testing.md` — once the project has more than one core feature

For `security.md` and `integrations.md` specifically: the defaults already cover the universal baseline. The project versions only need what's specific to this app — sensitive data inventory, threat model, stricter rules for security; the provider registry, rate limits, caching strategy, and failure behavior for integrations.

### Step 3: Roadmap planning

Once the project docs are filled in, produce `roadmap.md`. This is what enables the handoff to execution mode.

1. **Define the MVP boundary.** Apply the cut test from `defaults/roadmap.md` — anything that can be removed without killing the core value goes to Post-MVP.
2. **Break MVP into ordered tasks** across Foundation, MVP Core, and MVP Polish phases.
3. **Each task must be self-contained** — a fresh agent session can read it cold and execute it without clarifying questions. Acceptance criteria must be checkable. Dependencies must be explicit. References to other docs must be by section.
4. **Right-size tasks** — roughly one focused session of work each. Larger → split. Smaller → batch.
5. **Confirm the full roadmap with the user** before moving to Step 4.

### Step 4: Acceptance review

Before declaring planning complete and handing off to execution mode, run an acceptance review. Goal: catch contradictions, gaps, and vagueness that will trip up the execution agent. This is structural verification, not a re-read for impressions. Run each check explicitly.

**1. Placeholder sweep.** For every project-root doc that exists, search for unresolved placeholders (`[Your answer here]`, `[fill in]`, bracketed examples that weren't replaced). Either fill them with the user or note them as deliberately empty.

**2. Cross-reference resolution.** For every reference like `prd.md §Core functionality` in any doc, verify that the target section exists and has populated content (not just a header with empty body). Broken references break execution mode.

**3. Contradiction sweep.** Check for direct conflicts between docs:
- `prd.md` §Non-goals vs. tasks in `roadmap.md` — any task building something the PRD explicitly excluded?
- `architecture.md` §Stack vs. `integrations.md` registry — any integration that doesn't fit the stack?
- `security.md` §"Sensitive data inventory" vs. `compliance.md` §"Applicable frameworks" — any data category that triggers a framework not listed?
- `design.md` §Accessibility vs. `roadmap.md` Polish phase — accessibility commitments without corresponding tasks?
- Any apparent override of a default (in `security.md` or `integrations.md`) without a matching `decisions.md` entry.

**4. Roadmap task quality.** For each task in `roadmap.md`:
- Acceptance criteria are checkable, and each criterion is a single check.
- Dependencies reference real tasks that exist in the roadmap.
- No cyclic dependencies.
- Right-sized — if a task has more than ~5 acceptance criteria, consider splitting.
- Relevant docs are referenced by section.

**5. MVP boundary clarity.** The MVP boundary between Phase 3 (MVP Polish) and Phase 4 (Post-MVP) is explicit. No task is ambiguous about which side it's on.

**6. Defaults coverage.** If `integrations.md` exists, every external service mentioned in `prd.md`, `architecture.md`, or `roadmap.md` has a registry entry. If `security.md` exists, sensitive data categories actually present in the project are inventoried.

**Handling findings:**
- **Fixable directly** (formatting, broken cross-refs, unfilled placeholders, minor task splits): fix and note the changes. Log in `decisions.md` only if the change has scope implications.
- **Requires user input** (genuine contradictions, missing content, scope ambiguity): surface to the user, ask, then resolve before continuing.

**7. MVP summary readback.** Produce a plain-prose summary in your own words — not a doc dump, not a paraphrase that just rearranges section headers. The summary must reflect actual comprehension. Cover:

- What the app does, in one or two sentences.
- Who it's for.
- The MVP boundary — what's included, what's deferred to Post-MVP.
- The first three tasks the execution agent will pick up.
- The MVP gate — what observable behavior tells us the concept validated.

Show this to the user and ask: *"Does this match your understanding? Anything missing or off?"* If the user pushes back, return to whichever step the issue traces to and resolve before re-running the review.

**Only after the user confirms the MVP summary, declare planning complete and the project ready for handoff to an execution agent.**

## Operating rules (execution mode)

- **Default to building, not refining.** Execution mode means writing code that completes the current task's acceptance criteria. Pick the next unblocked task in `roadmap.md`, build it, verify it, mark it Done. Roadmap edits, predecessor additions, doc drift flags, and decision logging are *exceptions* — triggered only when you literally cannot proceed with the current task. **If you spend more than one response modifying docs without writing code, you're drifting; return to the task and build.**
- **Never generate code that contradicts an existing doc** (default or project-specific). If a request conflicts with a doc, surface the conflict and ask whether to update the doc or adjust the request.
- **Defaults are not optional unless explicitly overridden.** A rule in any `defaults/*.md` applies even if the project's version doesn't mention it. Silence in the project doc is not an override.
- **Update task status as work progresses.** Mark In Progress when starting. Mark Done only after running the task verification protocol (`defaults/roadmap.md` §"What 'done' means") and getting explicit user confirmation. Self-declared Done without verification is the most common way execution mode breaks.
- **Log non-trivial decisions to `decisions.md`** — architectural choices, library swaps, schema changes, security model shifts, integration choices, and any override of a default. Log inline as you work, in 1-2 sentences. This is not a reason to stop building.
- **Treat missing required docs as a stop condition.** If `prd.md` or `roadmap.md` is empty and the user asks for a feature, return to planning mode first.
- **Flag doc drift only when it blocks the current task.** If the codebase has evolved past what the docs describe but the current task can still be completed as written, log it and keep building. If the drift makes the current task ambiguous or impossible, surface it and resolve before continuing.
- **Don't pad with conditional docs.** Missing `monetization.md` on a personal tool is correct, not an oversight.
- **Ask, don't assume.** When a doc is silent on a relevant detail, ask. Don't pick a default and hope.
- **New integrations require a registry entry.** Before writing code that calls a new external service, add a one-block entry to `integrations.md` covering the template fields, then keep building.
- **Missing predecessor — strict bar.** Only stop and propose a new predecessor task if you *literally cannot complete the current task* without it existing as a finished task. "This would be cleaner to do first" or "this feels out of order" doesn't qualify. When the bar is met: draft the proposed entry, surface to the user, add to the roadmap with confirmation. When the bar isn't met: build the current task as written.

## Execution mode session protocol

Execution mode runs across many sessions. Each session must start, run, and end in a way that keeps `roadmap.md` and the codebase in sync. Without this, every session inherits a slightly hallucinated view of the project's state, and small inconsistencies compound until the project is meaningfully broken.

### Session start

1. **Check the mode header at the top of `roadmap.md`.** It tells you the current mode (Planning / Execution Pre-MVP / Execution Post-MVP / MVP Gate Pending) and the current task. If the header is missing or stale, fix it before continuing — see "Session end" below for what it should contain.
2. **Read the current task block** in `roadmap.md` (not the whole roadmap — the read order at the top of this doc handles that).
3. **Sanity-check the current task's immediate dependencies.** Quickly verify that tasks marked Done actually produced what they claimed (file exists, function defined, test passes). Don't sweep the whole roadmap — just the dependencies of the task you're about to build. If something marked Done isn't, surface it before continuing.
4. **Report and start.** One line: "Picking up [task]; starting with [first concrete step]." Then build.

If the user redirects to a different task in conversation, take that instead.

### During the session

- **Mark the task In Progress** before starting work, not after.
- **Don't expand scope.** Work that wasn't in the task's acceptance criteria gets surfaced (per the missing predecessor rule), not silently done.
- **Log non-trivial decisions to `decisions.md` as they happen,** not at session end. End-of-session memory is unreliable.

### Task verification (before marking Done)

This is the most violated rule in agentic execution. A task is not Done until you have walked through each acceptance criterion explicitly:

1. **Read each criterion in your response** — literally quote it.
2. **Demonstrate it's met.** Run the test that proves it and show the output, paste the relevant code with a brief explanation of why it satisfies the criterion, or describe the manual verification you performed. "I believe this works" or "the implementation should handle this" is not demonstration.
3. **If a criterion can't be demonstrated, the task is not Done.** Mark Blocked, document what's blocking in the task's Notes, move on.
4. **Ask the user to confirm Done** after walking through all criteria. Only flip status to Done after explicit user confirmation.

Resist the pull to declare Done because the work feels finished. The pull is strong; the discipline is what makes execution mode trustworthy.

### Session end

Before ending the session:

1. **Commit work in progress** (if using version control). Don't leave uncommitted changes for the next session to rediscover.
2. **Update task statuses in `roadmap.md`** to reflect actual state: Done (only after verification + user confirmation), In Progress (if mid-task), Blocked (with notes on what's blocking).
3. **Update the mode header at the top of `roadmap.md`.** Set Mode, Current task, and Last updated. This is the first thing the next session reads — make it accurate.
4. **Note next-session context.** If you stopped mid-task with non-obvious state, add a brief note to that task. If you discovered something that affects future tasks, add a `decisions.md` entry.
5. **Give the user a short session summary:** what you worked on, current status, what's next.

If the session ends unexpectedly (context window, disconnect), the next session relies entirely on what's in the files. Make the files reflect reality.

### When MVP is built

When the last MVP Polish task is verified Done, do not silently proceed to Post-MVP work. Surface to the user that MVP is built and the MVP gate (defined in `roadmap.md`) is now the active question. Follow `defaults/roadmap.md` §"MVP gate outcomes" before resuming execution. Most MVPs fail their first gate; building Post-MVP features on top of an unvalidated MVP is the most common form of wasted work.

Once the gate is resolved and the path forward is "start Post-MVP work" or "iterate," shift to the **Post-MVP execution mode** below.

## Post-MVP execution mode

Once the MVP gate has been met and the user has chosen "start Post-MVP work" or "revise the roadmap" (per `defaults/roadmap.md` §"MVP gate outcomes", logged in `decisions.md`), execution shifts. The core discipline still applies — read order, task verification, session protocol, defaults adherence — but the *structure* of work changes.

### What changes

1. **Features replace phases.** Phases 1-3 (Foundation, MVP Core, MVP Polish) are complete and marked done in `roadmap.md`. New work is organized by *feature*, each with its own mini-PRD in `features/<feature-name>.md` (from `templates/feature-spec.md`) and its own block of tasks in `roadmap.md`.

2. **Regression is first-class.** Pre-MVP there was no working code to break. Post-MVP, every change can regress something users depend on. Before modifying existing code:
   - Inventory the affected surface area (recorded in the feature's spec).
   - Identify regression checks that protect that surface.
   - Run those checks before declaring the feature Done — *separately* from acceptance criteria. Acceptance criteria verify the new thing works; regression checks verify the old thing didn't break.

3. **User feedback is a primary input.** Pre-MVP, the task list came from the PRD and the initial roadmap. Post-MVP, feature ideas increasingly come from real-user signal — support tickets, usage data, direct feedback. Feature specs should cite the evidence that motivated them, not just describe the idea.

4. **The PRD ages.** Long-term success, target users, even core functionality may evolve as you learn from real users. If a proposed feature seems to drift from `prd.md` without an explicit PRD update, surface it: either update the PRD (logged in `decisions.md`) or scope the feature differently.

5. **Decision discipline grows.** More changes affect existing users; the bar for "non-trivial decision" drops. Library swaps, schema migrations, breaking changes, deprecation timelines, and small API contract changes all go in `decisions.md`.

### Per-feature workflow

For each new post-MVP feature, run a compressed version of the four-step planning workflow:

1. **Mini-intake.** Copy `templates/feature-spec.md` to `features/<feature-name>.md`. Walk the user through the sections — faster than the full PRD intake because most context already exists (`prd.md`, `architecture.md`, `design.md`). Ask 1-2 sections of questions at a time; confirm the completed spec before moving on.

2. **Mini-roadmap.** Add a feature section to `roadmap.md` with ordered tasks for this feature. Same task format as MVP tasks; new section header per feature so progress stays visible by feature.

3. **Mini-acceptance review.** For small features, skip the full review. Confirm: feature-spec is consistent with `prd.md` and `architecture.md`, tasks reference real doc sections, regression checks cover the affected surface area.

4. **Execute** using the standard execution mode session protocol. Each task still verifies with the user before flipping to Done. Before flipping the *feature* to Done, run the feature's regression checks (separate pass from task acceptance criteria).

### When to return to full planning mode

Some Post-MVP work isn't a feature — it's a strategic shift. Triggers for returning to full planning mode rather than the per-feature workflow:

- New work materially changes the product's identity, target users, or core value proposition.
- Multiple in-flight features conflict and the existing PRD doesn't resolve them.
- A failed MVP gate that's being reattempted with a revised concept (the "iterate" path from `defaults/roadmap.md` §"MVP gate outcomes").
- The roadmap has accumulated enough drift from the original docs that a fresh planning pass is cheaper than patching.

Rule of thumb: small enhancement → per-feature workflow; new product direction → full planning mode.

## Decision log format

Append to `decisions.md` using this format:

```
## YYYY-MM-DD — [decision title]
**Decision:** [what was decided]
**Alternatives:** [what else was considered]
**Rationale:** [why this won]
**Revisit if:** [conditions that would change the answer]
```

For decisions that override a default, also include:

```
**Overrides:** [path to default file] — [which rule, and why this project doesn't follow it]
```

## When the user asks you to skip the process

The user can override any of this. If they say "just write the code, don't worry about docs," do that — but note in your response which docs would normally have been read so they can revisit if needed.

**Defaults are an exception.** Even when skipping the doc process, do not violate `defaults/security.md` or `defaults/integrations.md` without an explicit override request. These defaults exist precisely because they apply when nobody is thinking about them. `defaults/roadmap.md` is process-only — if there's no roadmap, it doesn't apply.
