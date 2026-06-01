# Project Launchpad

A documentation-first scaffolding system for AI-assisted development. Before any code gets written, you fill out the docs that define what you're building, for whom, on what stack, and under what constraints. The agent reads these before it generates anything.

The premise: agents produce their best work when the rules are explicit and on disk, not floating around in your head.

## The workflow this enables

Projects in this system move through two distinct modes:

1. **Planning mode** — typically with a high-reasoning model in a chat interface (e.g., Opus on claude.ai). Walk through gating questions, fill out PRD, architecture, design, security overlays, integrations registry, and an ordered roadmap of tasks. Then run an acceptance review to catch contradictions, fix vagueness, and confirm shared understanding before handoff.
2. **Execution mode** — typically with an agentic coding tool (e.g., Claude Code running Sonnet). At session start the agent re-orients on `roadmap.md` and spot-checks recent claimed progress. For each task, it walks through acceptance criteria explicitly, demonstrates each is met, and only marks Done after your confirmation. When MVP is built, it follows the MVP gate outcomes protocol instead of silently rolling into Post-MVP work.

The bridge between modes is `roadmap.md`, gated by the acceptance review. If the roadmap is unambiguous and the user has confirmed an MVP summary in plain prose, execution runs cleanly. If either is vague, execution stalls or drifts. The whole system is designed to make that bridge solid.

## Structure

```
your-project/
├── CLAUDE.md              # Agent instructions — read first
├── intake-prompt.md       # Paste-ready kickoff prompt for planning mode
├── defaults/              # Universal baselines (inherited, do not edit per-project)
│   ├── security.md
│   ├── integrations.md
│   ├── roadmap.md
│   └── ... (more over time)
├── templates/             # Skeletons — copy to project root and fill in
│   ├── prd.md
│   ├── roadmap.md
│   ├── architecture.md
│   ├── design.md
│   ├── security.md
│   ├── integrations.md
│   ├── decisions.md
│   ├── feature-spec.md      # Post-MVP — one feature per file
│   ├── monetization.md
│   ├── compliance.md
│   ├── data-model.md
│   ├── glossary.md
│   └── testing.md
├── prd.md                 # Project-specific docs at the root (filled from templates)
├── roadmap.md             # Ordered execution plan — the planning→execution bridge
├── architecture.md
├── design.md
├── security.md            # Project-specific overrides and additions on defaults/security.md
├── integrations.md        # Per-provider registry (rate limits, caching, failure behavior)
├── decisions.md
├── features/              # Post-MVP — one feature-spec.md per new feature
│   └── <feature-name>.md
└── ... (conditional docs as relevant)
```

- **`defaults/`** holds rules true for any project. Copied from the launchpad and updated centrally as the launchpad evolves.
- **`templates/`** holds skeletons with section headers and prompts. During intake, copy the relevant template to the project root and fill it in. The originals stay as reference.
- **Project root** holds the docs unique to this app — PRD, stack, threat model, roadmap, exceptions to defaults.

When the project's doc and a default disagree, the project wins — but the override must be logged in `decisions.md` so it's deliberate, not accidental.

## How to use

1. Copy this directory into a new project as your starting point. If working in claude.ai, upload `CLAUDE.md`, the `defaults/` directory, and the `templates/` directory to a new Project as project knowledge.
2. Open `intake-prompt.md` and paste the kickoff prompt into a new conversation with a high-reasoning model. The agent will read the launchpad docs, ask the gating questions, then walk through each applicable doc section by section.
3. After the docs are filled, the agent will help you break the project into ordered tasks in `roadmap.md`. This is the document the execution agent will follow.
4. Skip the docs that don't apply. No payments? No `monetization.md`. Personal tool? No `compliance.md`. No external APIs? No `integrations.md`.
5. Leave `defaults/` and `templates/` mostly alone — they're the shared baseline and skeletons. Override individual rules in the project's own doc when needed, and log the reason in `decisions.md`.
6. Before handoff, the agent runs an acceptance review — sweeps all docs for placeholders, broken references, contradictions, and vague roadmap tasks; fixes what's fixable, surfaces what needs your input. Then it produces a plain-prose MVP summary in its own words for you to confirm.
7. After you confirm the summary, hand the project off to the execution agent. With docs, roadmap, and acceptance review complete, it can pick up tasks and build without re-deriving context.

## File types

### Core (every project)

- **CLAUDE.md** — entry point for the agent. Indexes other docs, defines workflow rules. Mirror to `AGENTS.md` or `.cursorrules` if using other tools.
- **prd.md** — Product Requirements Document: what the app does, who uses it, core functionality, non-goals, long-term success ambition.
- **roadmap.md** — ordered execution plan with phases (Foundation, MVP Core, MVP Polish, Post-MVP) and per-task acceptance criteria. Designed to be picked up by an execution agent.
- **architecture.md** — tech stack, infrastructure, deployment target, key libraries.
- **design.md** — UI/UX principles, visual style, component conventions, interaction patterns.
- **security.md** — sensitive data inventory, threat model, exceptions to `defaults/security.md`, and stricter rules specific to this app.
- **decisions.md** — running log of non-trivial decisions and *why*. Prevents the agent (and future-you) from quietly undoing past choices.

### Conditional (only if relevant)

- **integrations.md** — per-provider registry: rate limits, caching strategy, auth, failure behavior. Required if the app calls any external API or receives webhooks (which is most apps these days).
- **features/&lt;name&gt;.md** — mini-PRD per post-MVP feature: problem, users affected, success signal, scope, affected surface area, regression checks. Required once you're past MVP and adding features.
- **monetization.md** — pricing, paid tiers, billing flows. Required if the app charges users.
- **compliance.md** — PII, PCI, HIPAA, GDPR, regional requirements. Required if handling regulated data.
- **data-model.md** — entities, relationships, schema rationale. Required if the app has non-trivial persistent state.
- **glossary.md** — domain terms and conventions. Required if the domain is jargon-heavy (TTRPGs, finance, medicine, etc.).
- **testing.md** — test philosophy, coverage expectations, what "done" means. Required once the project has more than one core feature.

### Defaults

Universal baselines live in `defaults/`. Each pairs with a project-root doc of the same name that overlays project-specific content. Currently:

- **defaults/security.md** — input validation, auth, secrets, client-side exposure, admin interfaces, security headers, AI/LLM risks, incident response.
- **defaults/integrations.md** — request hygiene, rate limits, webhooks, idempotency, data lifecycle categorization (immutable / slowly-changing / fast-changing / user-generated), cost controls, graceful degradation.
- **defaults/roadmap.md** — phase structure, MVP discipline, task format, dependency rules, writing tasks for autonomous execution.

More defaults will be added (design, testing) as the launchpad evolves.

## Philosophy

- **Conditional over comprehensive.** Empty templates are noise. Only create files that apply.
- **Defaults over reinvention.** If a rule applies to every project, it belongs in `defaults/` — written once, updated centrally, inherited everywhere.
- **PRD before architecture.** Locking the stack before understanding users is guessing.
- **Verify, don't assert.** A task is Done when each criterion has been demonstrated and the user has confirmed — not when the work feels finished.
- **Force the gate decision.** When MVP is built, the gate either cleared or didn't. Decide explicitly — pivot, iterate, or kill — rather than silently continuing on momentum.
- **Plan with the strongest model; execute with the fastest.** Use high-reasoning models to fill out docs and roadmap; use agentic coding tools to follow them. The roadmap is the contract between the two.
- **Decisions, not just specs.** Capturing *why* is what stops the agent from undoing your choices three sessions later. Overrides of defaults belong here too.
- **Docs are source of truth.** If code drifts from docs, one of them is wrong — flag it, don't paper over it.
- **Ask, don't assume.** Defaults the user didn't sign off on become bugs the user didn't sign up for.
