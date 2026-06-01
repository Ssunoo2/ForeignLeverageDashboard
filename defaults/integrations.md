# Integrations Defaults

This is the universal baseline for any external integration — REST APIs, webhooks, auth providers, payment processors, LLM APIs, email/SMS, third-party data sources. It applies to every project unless the project's own `integrations.md` explicitly overrides a rule with a justified reason logged in `decisions.md`.

The project-specific `integrations.md` covers: per-integration registry (which providers, what for, rate limits, caching strategy), failure behavior, and overrides of these defaults.

---

## Request hygiene

- **Set an explicit timeout on every outbound request.** No unbounded waits. Reasonable defaults: 5s connect, 30s total. Lower for user-facing paths.
- **Retry with exponential backoff and jitter** on transient failures (network errors, 5xx, 429). Cap at 3-5 attempts. Add jitter to avoid thundering herd.
- **Distinguish transient from terminal errors.** 4xx (except 408, 429) are usually terminal — don't retry. 5xx and network failures are transient.
- **Circuit breakers on flaky dependencies.** When error rate or latency spikes, stop calling for a cooldown window. Prevents cascade failures.

## Respecting outbound rate limits

- **Read the provider's rate limit documentation** before integrating. Note per-second, per-minute, per-day, and per-resource limits.
- **Throttle client-side**, not just on 429 response. Token bucket or leaky bucket. Hitting 429 means you're already past the limit and likely losing data.
- **Batch when possible.** Prefer bulk endpoints over loops of single requests. Group requests within the rate window.
- **Pagination:** persist cursors and offsets so a failed run can resume without re-fetching everything.

## Authentication and credentials

- **API keys in environment variables.** Never hardcoded. (See `defaults/security.md`.)
- **Use scoped tokens** where the provider supports them. Read-only when you only need to read.
- **Separate sandbox and production credentials.** Never use prod credentials in dev.
- **Rotate on exposure.** Any time a credential touches a log, screen, chat, or repo, even briefly.

## Webhooks (inbound)

- **Verify signatures with constant-time comparison.** Reject unsigned or invalid requests before parsing the body.
- **Reject replays.** Check the timestamp (reject if older than a few minutes) and track recently-seen event IDs.
- **Return 2xx fast; process async.** Don't do heavy work in the webhook handler. Queue and return immediately. Providers retry on timeout.
- **Idempotency.** The same webhook event ID must not cause duplicate side effects. Persist processed event IDs.

## Idempotency (outbound)

- **State-changing requests should use idempotency keys.** Payments, sends, creates. Generate the key server-side (UUID), persist it with the request, reuse it on retry.
- **Don't trust the network.** A timeout doesn't mean the request didn't succeed — it means you don't know. Idempotency keys make retries safe.

## Data lifecycle and caching

Every integration's data falls into one of four categories. Declare which one applies in `integrations.md` for each provider — it drives the entire caching and refetch strategy.

| Category | Behavior | Examples | Strategy |
|---|---|---|---|
| **Immutable** | Historical facts that never change | Calories of a banana, completed game results, stock price for a past date, geocoded coords for a stable address | Fetch once, store forever, no expiry. Always check local store first. |
| **Slowly-changing** | Facts that change rarely | Product catalogs, exchange rates, list of available LLM models, business hours | Cache with long TTL (hours to weeks). Refresh on schedule or on cache miss. |
| **Fast-changing** | Current values that change continuously | Live prices, current weather, real-time status, breaking news | Cache briefly (seconds to minutes) or fetch on demand. Stale data here is wrong data. |
| **User-generated** | The local DB is source of truth; the API is a sync target | Customer records pushed to a CRM, posts published to a platform | Don't cache from the API. Write locally first, sync outbound. |

- **Lookup-first pattern.** For immutable and slowly-changing data, always check local storage before calling the API. This saves rate limit budget, money, and latency.
- **Choose the cache layer deliberately.** In-memory for sub-second cache that's fine to lose. SQLite/Postgres for persistent caches. Redis if you need cross-instance sharing.
- **Cache key includes the API version.** When a provider updates its schema, you want a fresh fetch, not stale-shaped data.

## Cost controls

For paid APIs:

- **Budget caps per user, per session, per day.** Unbounded calls = unbounded billing = denial-of-wallet attack.
- **Alerts at threshold percentages** (50%, 80%, 100% of expected daily spend).
- **For LLM APIs specifically:** token caps per request, per user, per session. See `defaults/security.md` for the broader AI risk section.
- **Track cost in logs** for high-cost calls so you can audit usage after the fact.

## Error handling and graceful degradation

- **Define failure behavior per integration** in the project's `integrations.md`. When this provider is down, does the app:
  - Hard-fail (the feature can't work without it — e.g., payments)?
  - Degrade (show stale cache, queue for later, hide the feature)?
  - Silent-fail (log and continue — e.g., analytics)?
- **Stale-cache fallback** is your friend for slowly-changing data. Serve stale rather than nothing.
- **User-visible messaging.** When an essential feature fails because of a downstream provider, say so. "We're temporarily unable to reach our payment processor" beats a 500.

## Logging and observability

- **Log every outbound call** with: provider, endpoint, status, duration, request ID (if provided by the API), retry count.
- **No secrets or PII in logs.** (Per `defaults/security.md`.) Redact tokens, request bodies on sensitive endpoints, response bodies that contain user data.
- **Alert on anomalies:** spike in error rate per provider, latency increases, rate-limit warnings (response headers from providers often signal you're approaching the limit before you hit it).

## Versioning

- **Pin API versions** where the provider supports it (Stripe-Version header, Anthropic-Version header, etc.). Don't accept "latest."
- **Track deprecation notices.** Subscribe to provider changelogs or announcement lists.
- **Test in sandbox** before bumping versions in production.

## Documentation per integration

The project's `integrations.md` should maintain a registry of every external dependency. For each one, document the answers that drive code: rate limits, data category, caching strategy, auth method, sandbox vs. prod URLs, cost, and failure behavior. New integrations don't ship until the registry entry exists.

## Project-specific overrides

The project's own `integrations.md` should document:

- **The registry of integrations** — one entry per provider with the fields above.
- **Stricter requirements beyond defaults** (e.g., higher retry counts for critical paths, mandatory circuit breakers, specific cache backends).
- **Exceptions to defaults** — with justification and a `decisions.md` entry.
