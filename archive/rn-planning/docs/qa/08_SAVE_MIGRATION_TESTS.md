# Save migration and crash matrix

Inject crashes at: before draft, after draft, during inactive write, after write before verify, after verify before in-memory install, after install before event, during reward animation and during active-pointer update. For every case reopen and select newest valid generation. Expected state is exactly old or new transaction, never debit-only/grant-only.

Storage cases: empty fresh install; validA/B; corruptA; corruptB; both corrupt; future schema; truncated JSON; invalid checksum; full disk; denied access; delayed writes; duplicate callback; stale account namespace. Preserve corrupt candidates for recovery and present a clear user choice; no silent reset.

Migration fixtures: documented syntheticv0→v1 currency conversion, missing optional field, unsafe integer rejection, item/stage alias mapping, removed pending wheel outcome, repeated migration boot and interrupted migration write. Check total balances, hero/item ownership, discovered tiers, first-clear/source watermarks and pending claim identity.

Offline cases add UTC midnight/timezone change/backward clock/large forward jump, repeated resume and pending entitlement across config update. Daily/wheel/quest claims share the same exactly-once barrier. Receipt pruning test proves old source replay still rejects after compacting receipts.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).
