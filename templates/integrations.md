# Integrations

*Project-specific overlay on `defaults/integrations.md`. The defaults cover the universal baseline — timeouts, retries, rate limit handling, webhooks, the four-category data lifecycle, cost controls. This doc is the registry of which providers this app uses and how each is configured.*

*Required if the app calls any external API or webhook. Skip otherwise.*

## Integration registry

*One section per provider. Copy the block below for each new integration. New integrations don't ship until they have a registry entry.*

---

### [Provider name, e.g. Stripe]

- **Purpose:** *[what this app uses it for]*
- **Auth method:** *[bearer token, OAuth, signed requests, mTLS]*
- **Rate limits:** *[per-second / per-minute / per-day; note per-resource limits if any]*
- **Data category:** *[immutable / slowly-changing / fast-changing / user-generated]*
- **Caching strategy:** *[where stored, TTL or "forever" or "no cache"]*
- **Cost:** *[per-call cost, or N/A for free tier]*
- **Sandbox endpoint:** *[URL or N/A]*
- **Production endpoint:** *[URL]*
- **API version pinned:** *[version string or N/A]*
- **Failure behavior:** *[hard-fail / degrade with stale cache / silent-fail with log]*
- **Documentation:** *[link to provider docs]*
- **Notes:** *[anything else worth knowing — known quirks, deprecation timelines, contact for escalation]*

---

## Stricter requirements beyond defaults

*Anything this app requires that goes beyond `defaults/integrations.md`. Examples: mandatory circuit breakers on the payment path, retry count > default for a flaky provider, specific cache backend required.*

[Your answer here]

## Exceptions to defaults

*Rules from `defaults/integrations.md` this project doesn't follow. Each exception must have a `decisions.md` entry explaining why.*

[Your answer here]

## Cross-integration concerns

*Anything that spans multiple providers — e.g., if both an LLM and a search API are called for one user request, what's the budget cap across the combined call? Webhook routing if multiple providers send to the same endpoint.*

[Your answer here]
