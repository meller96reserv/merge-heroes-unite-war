# Save system

[PROPOSED] SaveStore exposes readCandidates(namespace), writeCandidate(slot, bytes), verifyCandidate(slot), and flush(). The coordinator serializes mutations and maintains two full snapshots A/B with generation and checksum in a storage wrapper. The JSON save payload itself follows save.schema.json. Checksum detects corruption, not cheating. A pointer is only a hint: boot scans both candidates and chooses the newest valid supported generation.

Commit procedure: validate command → clone draft → apply debit/grant and source watermark/receipt → encode canonical payload and checksum → write inactive slot → read/verify → install revision in memory → publish events → update active pointer best effort. If write fails, retain prior authoritative state. A crash after verified write and before presentation restores the new committed state; duplicate command/claim IDs return prior outcome. Never award from a popup completion callback.

Namespaces include local account ID and environment; guest and signed-in saves are never blindly merged. Settings share an explicit authority policy with RN: initialization hydrates saved preferences, later host changes are versioned. Typed save-revision notifications are invalidation metadata, not a second save writer. Web preview uses an IndexedDB adapter; native uses an app-private atomic file adapter owned by the host integration.

Checkpoint budget is measured on target devices; coalesce safe progress snapshots but never collapse independent claim watermarks. Retain bounded receipts only after source-specific monotonic watermarks preserve replay protection. A future server-authoritative purchase receipt cannot be pruned like a local combat reward.

Acceptance: corrupt A restores B; corrupt both shows recover/reset choices without silently deleting originals; full disk blocks durable purchases with retry; crash at each commit step never creates a partial debit or duplicate grant. See migration and QA documents.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
