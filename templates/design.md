# Design

*Visual and interaction conventions for this app. Defines the look-and-feel so the agent doesn't reinvent it on each component.*

## Quick-start: pick a preset (optional)

*To skip building visual identity from scratch, base this doc on a pre-built aesthetic preset. Two community resources curate these:*

- *[VoltAgent/awesome-claude-design](https://github.com/VoltAgent/awesome-claude-design) — 68 ready-to-use DESIGN.md systems modeled on real products (Linear, Notion, Vercel, Raycast, Stripe, Warp, etc.)*
- *[rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design) — 57+ brand systems with a 9-section canonical format, plus remix recipes for adapting them*

*Workflow: pick one that matches your project's vibe, copy its content into this doc, then tighten the typography/palette/voice to your brand. Don't just borrow wholesale — adapt to make it distinct. The preset gives you structure and quality baseline; your brand replaces the visual identity layer.*

*Avoid these AI-slop tells regardless of which preset you start from: Inter/Roboto fonts, purple-on-white or purple-on-dark gradients, default shadcn dark theme, cookie-cutter rounded-corner card layouts. Pick fonts that suit the product; ground colors in the product's story.*

**Started from:** *[preset name and link, or "from scratch"]*

---

## Visual style

*Overall aesthetic — minimal, playful, technical, brutalist, etc. What apps would yours sit comfortably alongside?*

[Your answer here]

## Voice and copy

*This section governs text the app produces for end users — UI copy, error messages, marketing, onboarding, README, in-app messaging. It does NOT apply to:*

- *Chat responses to the developer/user (talk however the developer prefers)*
- *Internal docs (PRD, roadmap, decisions, this design doc itself)*
- *Code comments or technical documentation*

*Only text a real user will see in the shipped product is held to this standard.*

### Brand voice

*How should the app sound? Pick 2-3 adjectives that feel specific: warm + direct, dry + precise, playful + irreverent, austere + technical. Avoid empty ones like "professional" or "friendly" — they don't constrain choices.*

[Your answer here]

### Anti-slop discipline

*All user-facing copy should avoid the recognizable patterns of AI-generated text. Curated resources to apply as a final polish pass:*

- *[hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) — banned phrases, structural cliches, before/after rewrites*
- *[conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing) — two-pass audit-and-rewrite skill*

*The most common tells to watch for, baked into this doc so they're visible at write time:*

- **Phrase tells.** "Delve into," "navigate the landscape," "in the realm of," "it's important to note," "it's worth mentioning," "at its core." Drop them.
- **"Not just X, it's Y" patterns.** AI uses contrastive setups thousands of times more often than humans. One per piece is fine; clustering them is the tell.
- **Em-dash overuse.** Em-dashes are fine sparingly and intentionally. Sprinkled throughout to add drama: tell.
- **Tricolons everywhere.** Three-part structures — "X, Y, and Z" — feel rhythmic but get formulaic when every paragraph has one.
- **Stacked hedges.** "Could potentially help users to perhaps achieve..." Pick one hedge or none.
- **Empty intensifiers.** "Truly seamless," "incredibly powerful," "revolutionary." Replace with the specific claim or drop.
- **Throat-clearing openers.** "Let's explore," "Imagine a world where," "In today's fast-paced..." Start with the actual point.
- **Forced symmetry.** Paragraph endings that echo paragraph openings. Subheaders that mirror each other in length. Looks polished, reads artificial.
- **Negative listings as definition.** "This isn't just X, it isn't Y, it's Z." One use is rhetorical; three uses is template.

### Specific copy decisions

*Project-specific voice rules that override or extend the above. Examples: terms of art, naming conventions, tone for error messages, profanity policy, voice for empty states.*

[Your answer here]

## Typography

*Heading and body fonts. Size scale. Weight conventions.*

[Your answer here]

## Color palette

*Primary, secondary, neutrals, semantic colors (success, warning, error). Hex codes or design tokens.*

[Your answer here]

## Spacing and layout

*Spacing scale (e.g., 4/8/16/24/32px). Container widths. Grid system.*

[Your answer here]

## Component conventions

*Component library (shadcn, MUI, custom). Naming conventions. File organization.*

[Your answer here]

## Interaction patterns

*Loading states, error states, empty states. Confirmations on destructive actions. Animation philosophy (subtle, expressive, none).*

[Your answer here]

## Responsive behavior

*Breakpoints. Mobile-first or desktop-first. What changes between sizes.*

[Your answer here]

## Accessibility

*Commitments — WCAG AA minimum, keyboard nav, screen reader testing, contrast, visible focus states.*

[Your answer here]

## Inspirations

*Apps or design systems that inform the look. Optional.*

[Your answer here]
