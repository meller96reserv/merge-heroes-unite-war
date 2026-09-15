# Gameplay acceptance and golden path

GP-001 uses proposed-v1 fixture, not claimed reference balance: initialgold100, buycost1, two compatibletier1 heroes, configured resulttier2, attack1, enemyHP4, killreward1. Execute load→buy×2 (gold98, two occupied slots)→merge (one result, discovery reward from explicit fixture)→deploy (owned slot retained)→four configured hits→one kill reward→next stage→save→restart. Expected balances include explicit fixture reward IDs; do not infer hidden discovery grants.

GP-002 repeats with captured reference-derived data only after fidelity gate closure and records the expected numeric ledger from observed tables. GP-003 adds boss failure/retry and ensures farm kills can reward repeatedly while first clear remains once. GP-004 adds equipment, quest, daily, wheel and offline claim with restart at each boundary.

Input acceptance: tap/hold/drag cancel and full board; tutorial permits intended target; UI reports rejection without mutation. Merge result remains correct if interrupted at every marker. Battle scheduling is independent of render FPS. Hero death/permanent loss is never invented for a mode lacking evidence.

Every P0 system has ready/error/full/locked/pending states where applicable. Audio/haptic mute and reduced motion preserve usability. No placeholder balance/art is called exact parity. Pass requires state assertions plus readable Figma-based presentation on target viewports.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).
