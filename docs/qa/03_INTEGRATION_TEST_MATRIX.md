# Integration test matrix

| ID | Surface | Scenario | Oracle |
| --- | --- | --- | --- |
| IT-001 | Fresh golden path | load→buy2→merge→deploy→kill→claim→restart | board/balance/receipt match expected fixture |
| IT-002 | Durable action crash points | terminate before write/during write/after verify/before animation | one valid old/new state, no partial economics |
| IT-003 | Modal input/lifecycle | open settings while fighting; close over buy; background mid merge | route policy respected; no click-through/duplicate result |
| IT-004 | Native host | RN route mount/unmount and 50 background/resume cycles | touch/platform-service/audio/memory acceptance pass |
| IT-005 | Meta atomicity | equip/daily/quest/wheel simultaneous callback and save | serialized durable transactions and truthful UI |
| IT-006 | Asset loading | rapid tab changes,missing optional/required asset | cancel stale load; optional fallback/required block |
| IT-007 | Offline resume | kill/reopen with pending reward,duplicate resume | one entitlement and correct watermark |
| IT-008 | Audio focus | music+boss cue,phone interruption,mute,reopen | one loop; settings/focus respected |
| IT-009 | Quality equivalence | same fixture full/low/reduced motion | same domain hash; only cosmetics differ |
| IT-010 | Migration release candidate | upgrade synthetic old save and then reopen | preserved totals/ownership; no repeated compensation |
| IT-011 | Navigation/deep links | locked/unlocked route before/after boot | allowlisted route; unlock cannot be bypassed |
| IT-012 | Long session | 30min stress then all screens then restart | bounded memory/queues and valid restored state |

Fault injection is a harness feature, excluded from production. Test adapter failures at deterministic barriers instead of relying only on random process kills. Pair automated state assertions with recordings for touch/audio/lifecycle behavior. All native cases include exact toolchain and OS versions.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).
