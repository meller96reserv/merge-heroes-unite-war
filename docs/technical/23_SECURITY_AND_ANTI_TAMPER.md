# Security and anti-tamper

Scope is local-first single-player planning. Local checksums detect accidental corruption; they are not cryptographic proof against a device owner. Do not promise cheat-proof currency, trusted wall time or server-verified purchases without a backend. Rewarded-only ads are required by the product amendment; IAP and account integration remain excluded.

Validate every boundary: config JSON, save payload, external platform service result, deep-link allowlist and external result IDs. Reject oversized/deeply nested input before parsing where possible; cap string/array lengths in transport validators. Platform adapters expose typed allowlisted operations; never evaluate user-controlled code. Deep links select allowlisted routes after unlock checks and never grant resources directly.

Rewarded ads require the specific provider completion callback for the reserved active operation, pending-operation storage, idempotent receipts and process-death reconciliation. Generic success,dismissal or untrusted client-supplied amount is not completion. Server proof is not claimed where the provider supplies only SDK callbacks. Keep credentials/signing keys outside source and logs. No account identifiers from captured research are copied into product data.

Save recovery preserves evidence for the user; quarantine invalid bytes, do not execute embedded content. Modifying time caps rewards but remains locally tamperable. Debug grants/state import are compile-time excluded from release.

Acceptance: malformed/stale/replayed platform-result input cannot mutate balances; numeric overflow and negative amounts reject; deep-link routes cannot bypass unlocks; release package contains no debug endpoints or signing secrets. Later online features require a new ADR and threat model.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
