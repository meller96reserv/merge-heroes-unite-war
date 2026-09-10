# Save migrations

SchemaVersion describes shape; dataVersion describes content; app/build version describes binaries. Never conflate these numbers. Version 1 is a proposed first shipped format. No real existing player saves are present in this repository and no production migration is executed by planning.

Migration pipeline: read both candidates → validate wrapper/checksum → detect version → copy original to recovery archive → apply pure sequential migrateVnToVnPlus1 functions on a draft → resolve content aliases → validate full latest schema/invariants → persist a new generation → hydrate. Unknown future versions are read-only blocked with an update message. Never downgrade by guessing fields.

Proposed synthetic v0→v1 test: convert safe integer currency values to decimal strings, initialize sourceWatermarks empty, map old discoveredTier integer to explicit discoveredTiers list only from documented v0 semantics. Unsafe integers or missing item aliases reject with actionable diagnostics. This is a test fixture contract, not a claim that such a released v0 exists.

Content removal requires migration mappings for heroes, equipment, stage IDs and pending wheel reward IDs. Preserve monetary totals and owned-item uniqueness. Quarantine unknown optional content for support; do not silently sell or delete it. Migration must be idempotent at the coordinator level: once new generation exists, another boot does not regrant migration compensation.

Acceptance: fixtures for every supported version, malformed values, missing aliases, interrupted write and future version; source backups remain byte-identical; migration output has valid invariants and identical replay results on repeated independent runs.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
