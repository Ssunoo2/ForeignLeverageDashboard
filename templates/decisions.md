# Decisions

*Running log of non-trivial decisions and why they were made. Append new entries at the bottom. Never delete — superseded decisions are still useful history.*

## Format

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

---

## YYYY-MM-DD — Example decision (delete when adding real entries)
**Decision:** Use Postgres rather than SQLite for primary storage.
**Alternatives:** SQLite (simpler, single-file), MongoDB (schema-flexible).
**Rationale:** Multi-user from day one; need concurrent writes and row-level locking. Operational cost is acceptable.
**Revisit if:** App stays single-user and DB load remains low; SQLite would be simpler to operate.
