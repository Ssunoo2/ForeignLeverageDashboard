# Security

*Project-specific overlay on `defaults/security.md`. The defaults cover the universal baseline — input validation, auth, secrets, client-side exposure, etc. This doc covers what's unique to this app.*

## Sensitive data inventory

*What kinds of sensitive data does this app handle? Where does each live — DB tables, caches, logs, third-party services, LLM providers? PII, payment data, health data, auth tokens, anything that would be bad if leaked.*

[Your answer here]

## Threat model

*Who would attack this app, why, with what capability? Common categories:*
- *Curious users probing for IDOR or auth bypasses*
- *Spammers and scrapers abusing public endpoints*
- *Competitors seeking data exfiltration*
- *Targeted attackers if the app is high-value*

[Your answer here]

## Stricter requirements beyond defaults

*Anything this app requires that goes beyond `defaults/security.md`. Examples: MFA mandatory for all users, IP allowlist for admin, audit log retention > 1 year, field-level encryption for specific columns.*

[Your answer here]

## Exceptions to defaults

*Rules from `defaults/security.md` this project doesn't follow. Each exception must have a `decisions.md` entry explaining why.*

[Your answer here]

## Compliance constraints

*Link to `compliance.md` if it exists. Note any compliance frameworks that shape security choices (HIPAA, PCI, SOC 2, GDPR).*

[Your answer here]

## Incident response contacts

*Who handles a security incident for this project. Even solo projects benefit from a clear "if X, then Y" plan written down before X happens.*

[Your answer here]
