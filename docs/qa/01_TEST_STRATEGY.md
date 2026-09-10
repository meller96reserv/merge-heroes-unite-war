# Test strategy

All runtime tests in this section are planned, NOT RUN. Planning validation checks document/schema/manifest integrity and must not be described as game QA. Future tests use deterministic fixtures with explicit evidenceMode, seed, clock, config digest and expected state/events.

Test pyramid: pure game-core unit/property tests for economic and simulation invariants; deterministic simulations for long progression; RN/Skia interaction harness for interaction/presentation; native host lifecycle tests on both platforms; golden screenshots and device performance sessions. Avoid tests that merely assert implementation structure. Each meaningful branch has a behavioral oracle in the matrices.

P0 failures: duplicate/lost rewards, negative balance, invalid ownership, crash/unrecoverable save, nonfunctional native host, unusable core controls. P1: broken meta flow, major visual mismatch, severe jank/audio focus error. P2: cosmetic polish/extended content. Release has zero openP0, no unacceptedP1 and explicitP2 backlog.

Evidence records test ID/build/device/fixture/input/expected/actual/artifact path. A pass on web does not imply Android/iOS pass. Unknown reference rules are resolved before parity expectations are written; proposed fixtures can verify architecture while parity remains gated.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).

Current user-authorized [delivery QA policy](10_DELIVERY_QA_POLICY.md) overrides exhaustive or duplicate acceptance requirements. Retain correctness tests and release builds/smoke; batch presentation checks and allow user browser visual acceptance. Keep evidence concise and do not claim unperformed checks.
