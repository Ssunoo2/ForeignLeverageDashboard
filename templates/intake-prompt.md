# Intake Kickoff Prompt

This is the prompt you paste at the start of a new project to enter planning mode. Use it with a high-reasoning model in a chat interface (e.g., Claude Opus on claude.ai). The agent will read the launchpad docs, walk you through intake, fill out the project docs, and produce a roadmap ready for handoff to an execution agent.

## Setup

Before pasting the prompt, make the launchpad files accessible to the agent. Two common options:

- **In claude.ai:** create a Project, upload `CLAUDE.md`, the entire `defaults/` directory, and the entire `templates/` directory as project knowledge. Then start a new conversation in that project.
- **In Claude Code or another file-aware agent:** clone the launchpad into your project directory; the agent will read it from disk.

## The prompt

Copy everything in the block below and paste it as your first message:

```
You are starting a new project that uses the Project Launchpad documentation system. Your first task is to operate in PLANNING MODE — produce a complete set of project docs and an ordered roadmap. Do not write any application code during this conversation.

Before asking me anything, read:

1. CLAUDE.md in full — the doc system, the planning/execution mode split, the intake checklist, and the operating rules you must follow.
2. Every file in defaults/ — the universal baselines that apply to every project.
3. The skeletons in templates/ — what you will be populating during this conversation.

Then run intake. It has two parts:

PART 1 — gating questions: ask the gating questions from CLAUDE.md to determine which conditional docs apply. One or two at a time, not all at once.

PART 2 — section walkthrough: for each applicable doc, work through the sections of the corresponding template with me. Ask 1-2 sections worth of questions at a time. Push back on vague answers; "a productivity app for everyone" is not an answer — ask follow-ups and offer concrete examples of good specificity. If a question can't be resolved right now, capture it in prd.md under "Open questions" and move on. When all sections of a doc are filled, show me the completed doc and confirm before moving to the next doc. Don't confirm after every section — that's stop-start friction. Confirm at doc boundaries.

As answers come in, copy the relevant template from templates/<doc>.md to <doc>.md at the project root and fill in the sections. Use my exact phrasing where it works; tighten and clarify where it doesn't.

Once the intake docs are complete, plan the roadmap:

- Help me define the MVP boundary using the cut test from defaults/roadmap.md: for every candidate feature, ask "if we cut this, does the app still demonstrate its core value?" If yes, it goes to Post-MVP.
- Break the work into ordered tasks across the four phases: Foundation, MVP Core, MVP Polish, Post-MVP.
- Every task must have checkable acceptance criteria, explicit dependencies, and references to relevant doc sections. The goal: a fresh agent session can pick up any task cold and execute it without clarifying questions.
- Right-size tasks: roughly one focused session of work each. Larger → split. Smaller → batch.
- Confirm the full roadmap with me before moving to the acceptance review.

Once the roadmap is confirmed, run the acceptance review (Step 4 in CLAUDE.md). This is a structural verification pass, not a re-read for impressions. Run each check explicitly:

- Placeholder sweep: are any "[Your answer here]" or unfilled bracketed examples left in any doc?
- Cross-reference resolution: does every reference like "prd.md §Core functionality" point to a section that actually exists and has content?
- Contradiction sweep: do any docs disagree with each other? (PRD non-goals vs. roadmap tasks; architecture stack vs. integrations; security inventory vs. compliance frameworks; design accessibility vs. roadmap polish; apparent default overrides without decisions.md entries.)
- Roadmap task quality: are acceptance criteria checkable and single-purpose? Are dependencies real? Any cycles? Any task with >5 criteria that should be split?
- MVP boundary clarity: is every task unambiguous about whether it's MVP or Post-MVP?
- Defaults coverage: every external service mentioned anywhere has an integrations.md entry; every sensitive data category in use is in security.md.

Fix what's fixable directly. Surface anything that needs my input, and resolve before continuing.

Then produce a plain-prose MVP summary in your own words — not a doc dump, not a paraphrase that just rearranges section headers. The summary must reflect actual comprehension. Cover: what the app does (one or two sentences), who it's for, the MVP boundary (in vs. deferred), the first three tasks the execution agent will pick up, and the MVP gate. Show me the summary and ask: "Does this match your understanding? Anything missing or off?"

Only after I confirm the MVP summary, declare planning complete and the project ready for handoff to an execution agent.

Start now by reading the docs listed above, then ask the first intake question. Do not preamble.
```

## What to expect

After pasting, the agent should:

1. Acknowledge it has read the launchpad docs (or ask you to provide them if it doesn't have access).
2. Ask the first gating question — typically "What does this app do, in one sentence?"
3. Work through the gating questions one or two at a time, then move into the section walkthrough for each applicable doc.
4. Confirm each filled-in doc with you before moving to the next.
5. Help you define the MVP boundary and break work into a roadmap.
6. Run the acceptance review — sweep docs for placeholders, broken references, contradictions, and roadmap quality issues; fix what's fixable, surface what needs your input.
7. Produce a plain-prose MVP summary in its own words and ask you to confirm it matches your understanding.
8. Declare planning complete only after you confirm the summary.

At that point, you're ready to hand off to an execution agent (e.g., Claude Code with Sonnet) which reads the same launchpad docs plus your filled-in project docs and roadmap, then picks up tasks one by one.

## When to use a different prompt

- **Resuming a project mid-flight:** the agent should read the existing docs, check `roadmap.md` for current status, and either continue planning gaps or hand off to execution. A dedicated resume prompt can come later if the simple "read everything and continue" approach gets noisy.
- **Roadmap-only revisions:** if planning is complete but the roadmap needs rework (scope shift, new constraint), you can start a planning-mode conversation focused only on that.
- **Execution mode:** the execution agent reads `CLAUDE.md` and the project docs directly; no separate kickoff prompt needed. It picks up the next unblocked task from `roadmap.md` and builds.
