# Security Defaults

This is the universal security baseline. It applies to every project unless the project's own `security.md` explicitly overrides a rule with a justified reason logged in `decisions.md`.

The project-specific `security.md` should cover: threat model for this app, sensitive data inventory, exceptions to these defaults, and rules that go beyond the baseline.

---

## Input validation

- **Validate every input** on the server: type, length, format, range, allowed values. Client-side validation is for UX only — never for security.
- **Reject by default, allow by exception.** Whitelist allowed values; do not blacklist disallowed ones.
- **Use a schema validation library** (zod, pydantic, joi, valibot) rather than hand-rolling checks. Schemas are reviewable and consistent.
- **Parameterize all database queries.** No string concatenation, no f-strings, no template literals into SQL. Use the ORM or the driver's parameter binding.
- **Sanitize before render, not just before storage.** Treat all stored data as untrusted at render time. Escape HTML, JSON, shell args, and URLs based on the output context.
- **Enforce size limits** on every input — bodies, query params, headers, uploaded files. Reject oversized requests at the edge.

## Authentication & authorization

- **Modern password hashing only:** argon2id (preferred), bcrypt, or scrypt. Never MD5, SHA1, SHA256-without-KDF, or homegrown schemes.
- **Authorization checks on every protected endpoint.** Authentication (who) and authorization (what they can do) are separate. Check both.
- **Never trust client-supplied identity claims** (user ID, role, tenant ID) without server-side verification against the session.
- **Session tokens expire.** Short-lived access tokens (minutes), longer refresh tokens (days), with rotation on refresh.
- **Constant-time comparison** for tokens, password hashes, and HMAC signatures. Use the language's `crypto.timingSafeEqual` or equivalent.
- **Generic auth errors.** "Invalid email or password" — not "email not found" vs. "wrong password" (prevents account enumeration).
- **Lockout with care.** Rate limit auth attempts per account *and* per IP. Avoid permanent lockouts that enable DoS.

## Authorization patterns to enforce

- **Ownership checks on every record access.** Authenticated ≠ authorized for *this* record. `SELECT ... WHERE id = ? AND owner = ?`, not just `WHERE id = ?`. (Prevents IDOR — Insecure Direct Object Reference.)
- **No mass assignment.** Explicitly list fields the client can update. Never `Object.assign(user, req.body)` or equivalent — users will set `isAdmin: true`.
- **Default deny on new endpoints.** New routes should require auth unless explicitly marked public.

## Admin interfaces

- **Admin interfaces require stricter auth than user interfaces.** MFA mandatory, shorter session lifetimes, IP allowlist where feasible.
- **Separate the admin domain or path** so it can be locked down independently (VPN-only, separate auth realm, separate deploy).
- **All admin actions log to an audit trail** with who, what, when, from where. Retain longer than regular logs.
- **No shared admin accounts.** One identity per human. Service accounts are separate from human accounts.
- **Avoid persistent "god mode."** Even admins should have scoped permissions; use a break-glass account with logging and alerting for the rare cases unrestricted access is needed.
- **Admin endpoints are not exempt from baseline rules** — they still need input validation, ownership checks, rate limits, and CSRF protection.

## Secrets management

- **Environment variables, not source code.** No API keys, DB passwords, JWT secrets, webhook secrets, or third-party tokens in the repo. Ever.
- **`.env` files in `.gitignore`** from the first commit. Provide `.env.example` with dummy values.
- **Separate secrets per environment** (dev, staging, prod). Never reuse production secrets in dev.
- **Use a secret manager in production** (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, 1Password, Doppler).
- **Rotate on exposure.** If a secret touches a screen, a log, a chat, or a public repo even momentarily, rotate it.

## Client-side data exposure

- **The browser is hostile territory.** Anything sent to the client is visible, modifiable, and persistent if the user wants it to be.
- **No secrets in client bundles.** API keys for third-party services must be either (a) public by design (e.g. Stripe publishable key, Google Maps key with referrer restrictions) or (b) proxied through your server.
- **No source maps in production** unless served from an authenticated location. They reveal full source code.
- **localStorage and sessionStorage are not secure.** Readable by any script on the page, persistent across sessions. Don't store JWTs, PII, or anything sensitive there. Prefer `httpOnly` `secure` `sameSite=strict` cookies for auth tokens.
- **Strip sensitive fields server-side before responding.** Don't send the password hash, internal IDs, soft-deleted records, or other users' data and expect the client to hide it. If the client receives it, the user has it.
- **No debug logs in production.** Strip `console.log` of internal state, request payloads, user objects. Use a logger with environment-aware levels.
- **Mobile app binaries are extractable.** Hardcoded credentials in iOS/Android apps can be pulled out with five minutes of effort. Treat mobile apps like web frontends — no secrets.
- **Browser extensions and third-party scripts** see everything on the page. Use Subresource Integrity (SRI) for third-party scripts and limit them ruthlessly.

## Transport & storage

- **HTTPS only.** Redirect HTTP → HTTPS. Set HSTS with a long max-age once stable.
- **TLS 1.2 minimum, prefer 1.3.** Disable old ciphers.
- **Encrypt sensitive data at rest.** Database-level encryption for PII, payment data, health data. Field-level encryption for the most sensitive fields.
- **Secure cookies:** `httpOnly`, `secure`, `sameSite=strict` (or `lax` if you need cross-site navigation). Set `domain` and `path` as narrowly as possible.
- **Backups are sensitive too.** Encrypt them. Restrict access. Test restores. A backup leak is a data leak.

## Security headers

Set at the edge (CDN, reverse proxy, or framework middleware) so they apply uniformly:

- **Content-Security-Policy (CSP)** — restrict what scripts, styles, images, fonts, and connections the page can load. Start strict, use nonces for inline scripts, loosen only with justification.
- **Strict-Transport-Security:** `max-age=31536000; includeSubDomains; preload` once stable.
- **X-Content-Type-Options: nosniff** — prevents MIME confusion.
- **X-Frame-Options: DENY** or **CSP `frame-ancestors 'none'`** — prevents clickjacking. Allow specific embeds explicitly.
- **Referrer-Policy: strict-origin-when-cross-origin** — limits referrer leakage to third parties.
- **Permissions-Policy** — disable APIs the app doesn't use (camera, microphone, geolocation, payment, etc.).
- **Cross-Origin-Opener-Policy: same-origin** and **Cross-Origin-Resource-Policy: same-origin** where applicable, to mitigate Spectre-class and cross-window attacks.

## Rate limiting & abuse prevention

- **Per-IP and per-user rate limits** on all endpoints. Stricter on auth endpoints (login, signup, password reset, MFA).
- **Stricter limits on expensive endpoints** (AI calls, search, file uploads, email sends).
- **CAPTCHA or proof-of-work** on public unauthenticated endpoints that can be abused (signup, contact forms, password reset).
- **Idempotency keys** on state-changing requests (payments, sends) to prevent double-submit and retry abuse.

## CSRF & cross-origin

- **CSRF protection** on state-changing requests if using cookie-based auth. SameSite cookies + CSRF tokens, or use bearer tokens in headers (which are not auto-attached by browsers).
- **CORS allowlist.** Specify exact origins, not `*`, when credentials are involved. Reject unexpected origins.
- **Validate redirect URLs.** Open redirects are used in phishing. Allowlist destinations, or restrict to same-origin.

## File uploads

- **Validate file type by content,** not just extension or MIME header (both are client-controlled). Use magic-number detection.
- **Enforce size limits** at the edge.
- **Store outside the web root** or in object storage with no-execute policies. Never serve uploads from a directory that can execute code.
- **Generate new filenames.** Don't trust user-supplied names — they can contain path traversal or executable extensions.
- **Scan for malware** if uploads are shared with other users.

## Server-side request forgery (SSRF)

- **If the server fetches URLs supplied by the user** (webhooks, image proxies, link previews), validate the URL against an allowlist or block private IP ranges (10.x, 172.16-31.x, 192.168.x, 127.x, 169.254.x, ::1, fc00::/7).
- **Use a dedicated HTTP client** with redirect limits and timeouts. Don't follow redirects to disallowed targets.

## Webhooks & third-party callbacks

- **Verify signatures.** Stripe, GitHub, etc. sign their webhooks. Verify the signature with a constant-time comparison before processing.
- **Reject replays.** Check the timestamp; reject if older than a few minutes. Track recently-seen event IDs.

## Logging & monitoring

- **No PII or secrets in logs.** No passwords, no full credit card numbers, no API keys, no auth tokens, no full request bodies on sensitive endpoints. Redact at the logging layer, not at every call site.
- **Log security events:** failed logins, permission denials, rate-limit triggers, signature mismatches, validation rejections at suspicious rates.
- **Generic errors to users, detailed errors to logs.** Production responses should never include stack traces, SQL fragments, or internal paths.
- **Alert on anomalies:** spike in 401/403, spike in 5xx, sudden traffic from a new geography, login attempts across many accounts from one IP.

## Dependencies & supply chain

- **Pin versions** (lockfile committed). Reproducible builds.
- **Vulnerability scanning** in CI: `npm audit`, `pip-audit`, `cargo audit`, Dependabot, Snyk, or equivalent. Fail the build on high/critical.
- **Minimize the dependency tree.** Every dep is attack surface. Prefer the standard library or a small, well-maintained package over a sprawling one.
- **Verify third-party scripts** with Subresource Integrity (SRI) hashes when including from CDNs.
- **Beware new packages, typo-squats, and recently-transferred maintainer accounts.** Pause before adding a dep with low downloads or a fresh maintainer.
- **Disable postinstall scripts where possible** (`npm ci --ignore-scripts`, equivalents) or audit them. Postinstall is a common malware vector.
- **Review lockfile changes in PRs.** Unexpected dependency additions are a red flag, even when the manifest looks unchanged.

## Database hygiene

- **Least-privilege DB users.** The app's runtime user should not be able to drop tables. Migrations run as a different user.
- **Separate read and write paths** where it adds meaningful protection (read replicas, read-only API tokens).
- **No raw DB access from the client.** Even with row-level security, prefer an API layer that enforces business rules.
- **Migrations are reviewed.** Schema changes can introduce vulnerabilities (dropped constraints, widened columns).

## Data retention & deletion

- **Define retention periods per data category:** user accounts, logs, backups, analytics, AI prompts/completions, support tickets, payment records.
- **Deletion means deletion everywhere:** primary DB, caches, search indexes, backups (or document why backups are exempt and when they age out), analytics platforms, third-party services, email providers, support tools, LLM provider logs.
- **Soft delete is fine for recovery windows;** eventual hard delete is the rule unless retention is legally required.
- **Account deletion must be available to users** if any consumer privacy law could apply (GDPR, CCPA, etc.) — assume it applies unless you've confirmed otherwise.
- **Audit logs may be retained longer** for security investigation, but redact PII where possible.

## Cryptography

- **Use the platform's crypto library.** Never implement your own primitives.
- **AES-GCM or ChaCha20-Poly1305** for symmetric encryption. Never ECB. Never reuse nonces.
- **Use HKDF** to derive keys; don't reuse the same key for multiple purposes.
- **JWT pitfalls:** reject `alg: none`, pin the algorithm server-side, use strong secrets (32+ random bytes), always set expiration. Prefer paseto or session cookies if you don't need the JWT properties.

## AI / LLM-specific risks

If the project calls an LLM API or embeds a model:

- **Treat LLM output as untrusted input.** If you pipe LLM output into a shell, a SQL query, an `eval()`, an HTML render, or another API call, you have a vulnerability. Constrain output with strict schemas (function calling, structured outputs) and validate before use.
- **Prompt injection is unavoidable.** User-controlled text reaching the LLM can override the system prompt. Don't rely on the system prompt for security boundaries; rely on what your code does with the output.
- **No high-impact actions on LLM intent alone.** "Send email," "delete record," "transfer funds," "run code" require explicit user confirmation, not just LLM decision. Treat the LLM as a confused deputy.
- **Validate tool arguments server-side.** When the LLM calls a tool/function, the arguments are effectively user-controlled. Apply the same validation rules as you would for direct user input.
- **Strip secrets and PII before sending to model providers.** Third-party LLM APIs are data egress. Treat them like any other third party.
- **Cost guardrails are security controls.** Unbounded LLM calls = unbounded billing = denial-of-wallet attack. Per-user, per-session, and per-request token caps.
- **Output filtering for end-user-facing models:** prevent system prompt extraction, PII leakage, and obvious jailbreak responses from reaching users.
- **Log prompts and completions with care.** Useful for audit and debugging, but now logs contain whatever PII the user typed. Apply redaction and retention.

## Incident response

Even solo projects need a documented plan. When something goes wrong:

- **On suspected secret leak:** rotate immediately, then investigate. Don't investigate first — every minute is more exposure.
- **On suspected breach:** preserve logs and DB snapshots before changing anything. Then rotate, patch, notify.
- **Notify affected users** when their data may have been exposed. Many jurisdictions require this within 72 hours of awareness.
- **Have a disaster recovery story.** Define an RPO (how much data loss is acceptable) and RTO (how long to recover). Test restores periodically — a backup you've never restored from is a hope.
- **Consider account-level compromise.** If the cloud account itself is compromised, can you recover? Multi-account isolation, billing alerts, MFA on the root account, and offline copies of critical secrets help.
- **Write a post-mortem in `decisions.md`** with timeline, root cause, what changed, what didn't. Blameless format.

## Project-specific overrides

The project's own `security.md` should document:

- **What sensitive data this app handles** (and where it lives — DB, cache, logs, third parties, LLM providers).
- **Threat model:** who would attack this, why, with what capability.
- **Exceptions to defaults** — with justification and a `decisions.md` entry.
- **Stricter requirements** that go beyond these defaults (e.g., MFA mandatory for all users, IP allowlist for admin, audit log retention requirements).
- **Compliance constraints** (linked to `compliance.md` if it exists).
