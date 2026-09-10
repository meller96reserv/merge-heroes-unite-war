# Atomic task index

[Delivery scope](../plans/DELIVERY_SCOPE.md) governs current execution. Stable IDs and deferred specifications are preserved.

| Task | Phase | Priority | Deliverable | Dependencies | Complexity | Risk | Delivery scope |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [TASK-0001](TASKS_PHASE_00.md#task-0001) | 00 | P0 | Planning handoff validation | none | S | low | COMPLETED |
| [TASK-0002](TASKS_PHASE_00.md#task-0002) | 00 | P0 | Implementation workspace baseline | TASK-0001 | S | low | COMPLETED |
| [TASK-0003](TASKS_PHASE_00.md#task-0003) | 00 | P0 | Host decision | TASK-0002 | S | low | COMPLETED |
| [TASK-0004](TASKS_PHASE_00.md#task-0004) | 00 | P0 | Fidelity gate registry | TASK-0003 | S | low | COMPLETED |
| [TASK-0005](TASKS_PHASE_01.md#task-0005) | 01 | P0 | Reference version lock | TASK-0004 | S | medium | COMPLETED |
| [TASK-0006](TASKS_PHASE_01.md#task-0006) | 01 | P0 | Auto-merge unlock capture | TASK-0004, TASK-0005 | S | medium | COMPLETED |
| [TASK-0007](TASKS_PHASE_01.md#task-0007) | 01 | P0 | Auto-merge ordering | TASK-0006, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0008](TASKS_PHASE_01.md#task-0008) | 01 | P0 | Purchase cost measurements | TASK-0004, TASK-0005 | S | medium | COMPLETED |
| [TASK-0009](TASKS_PHASE_01.md#task-0009) | 01 | P0 | Input purchase capture | TASK-0004, TASK-0005 | S | medium | COMPLETED |
| [TASK-0010](TASKS_PHASE_01.md#task-0010) | 01 | P0 | Combat balance measurements | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0011](TASKS_PHASE_01.md#task-0011) | 01 | P0 | Targeting capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0012](TASKS_PHASE_01.md#task-0012) | 01 | P0 | Boss observations | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0013](TASKS_PHASE_01.md#task-0013) | 01 | P0 | Reward catalogue | TASK-0004, TASK-0005 | S | high | DEFERRED_POST_DELIVERY |
| [TASK-0014](TASKS_PHASE_01.md#task-0014) | 01 | P0 | Offline measurements | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0015](TASKS_PHASE_01.md#task-0015) | 01 | P0 | Save behavior capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0016](TASKS_PHASE_01.md#task-0016) | 01 | P1 | Daily reward observations | TASK-0004, TASK-0005 | S | high | DEFERRED_POST_DELIVERY |
| [TASK-0017](TASKS_PHASE_01.md#task-0017) | 01 | P1 | Wheel observations | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0018](TASKS_PHASE_01.md#task-0018) | 01 | P1 | Equipment observations | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0019](TASKS_PHASE_01.md#task-0019) | 01 | P1 | Quest observations | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0020](TASKS_PHASE_01.md#task-0020) | 01 | P0 | Death recovery capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0021](TASKS_PHASE_01.md#task-0021) | 01 | P0 | Deployment capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0022](TASKS_PHASE_01.md#task-0022) | 01 | P0 | Unlock capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0023](TASKS_PHASE_01.md#task-0023) | 01 | P0 | Lifecycle capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0024](TASKS_PHASE_01.md#task-0024) | 01 | P1 | Skills capture | TASK-0004, TASK-0005 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0025](TASKS_PHASE_02.md#task-0025) | 02 | P0 | Immutable extraction verification | TASK-0001 | M | low | COMPLETED |
| [TASK-0026](TASKS_PHASE_02.md#task-0026) | 02 | P0 | Asset semantic validator | TASK-0001, TASK-0025 | M | low | COMPLETED |
| [TASK-0027](TASKS_PHASE_02.md#task-0027) | 02 | P0 | Near duplicate adjudication | TASK-0001, TASK-0025 | M | low | COMPLETED |
| [TASK-0028](TASKS_PHASE_02.md#task-0028) | 02 | P0 | Asset rights ledger | TASK-0001, TASK-0025 | S | low | COMPLETED |
| [TASK-0029](TASKS_PHASE_02.md#task-0029) | 02 | P0 | Font acquisition | TASK-0001, TASK-0025 | S | low | COMPLETED |
| [TASK-0030](TASKS_PHASE_02.md#task-0030) | 02 | P0 | Asset import calibration | TASK-0001, TASK-0025 | M | low | COMPLETED |
| [TASK-0031](TASKS_PHASE_02.md#task-0031) | 02 | P0 | Content visual mapping | TASK-0001, TASK-0025 | S | low | COMPLETED |
| [TASK-0032](TASKS_PHASE_02.md#task-0032) | 02 | P0 | Atlas membership manifest | TASK-0001, TASK-0025 | S | low | COMPLETED |
| [TASK-0033](TASKS_PHASE_02.md#task-0033) | 02 | P0 | Runtime import tool | TASK-0030, TASK-0032, TASK-0049 | M | low | COMPLETED |
| [TASK-0034](TASKS_PHASE_02.md#task-0034) | 02 | P0 | Sprite registry validation | TASK-0033, TASK-0026 | M | low | COMPLETED |
| [TASK-0035](TASKS_PHASE_02.md#task-0035) | 02 | P0 | Button state asset review | TASK-0001, TASK-0025 | M | low | COMPLETED |
| [TASK-0036](TASKS_PHASE_02.md#task-0036) | 02 | P0 | Missing popup designs | TASK-0001, TASK-0025 | M | low | DEFERRED_POST_DELIVERY |
| [TASK-0037](TASKS_PHASE_03.md#task-0037) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0003 | M | high | HISTORICAL |
| [TASK-0038](TASKS_PHASE_03.md#task-0038) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0037 | M | high | HISTORICAL |
| [TASK-0039](TASKS_PHASE_03.md#task-0039) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0037 | M | high | HISTORICAL |
| [TASK-0040](TASKS_PHASE_03.md#task-0040) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0038, TASK-0039 | L | high | HISTORICAL |
| [TASK-0041](TASKS_PHASE_03.md#task-0041) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0038, TASK-0039 | L | high | HISTORICAL |
| [TASK-0042](TASKS_PHASE_03.md#task-0042) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0040, TASK-0041 | M | high | HISTORICAL |
| [TASK-0043](TASKS_PHASE_03.md#task-0043) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0042 | M | high | HISTORICAL |
| [TASK-0044](TASKS_PHASE_03.md#task-0044) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0043 | M | high | HISTORICAL |
| [TASK-0045](TASKS_PHASE_03.md#task-0045) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0043 | M | high | HISTORICAL |
| [TASK-0046](TASKS_PHASE_03.md#task-0046) | 03 | P0 | Historical native spike evidence (SUPERSEDED strategy) | TASK-0045, TASK-0044, TASK-0042 | M | high | HISTORICAL |
| [TASK-0047](TASKS_PHASE_04.md#task-0047) | 04 | P0 | React Native Expo application foundation | TASK-0252 | M | medium | COMPLETED |
| [TASK-0048](TASKS_PHASE_04.md#task-0048) | 04 | P0 | Core TypeScript boundary | TASK-0047 | M | medium | COMPLETED |
| [TASK-0049](TASKS_PHASE_04.md#task-0049) | 04 | P0 | Shared Skia game surface | TASK-0047 | M | medium | COMPLETED |
| [TASK-0050](TASKS_PHASE_04.md#task-0050) | 04 | P0 | Config loader validation | TASK-0048, TASK-0052 | M | medium | COMPLETED |
| [TASK-0051](TASKS_PHASE_04.md#task-0051) | 04 | P0 | Typed domain event bus | TASK-0048 | M | medium | COMPLETED |
| [TASK-0052](TASKS_PHASE_04.md#task-0052) | 04 | P0 | Runtime ports and test fakes | TASK-0048 | M | medium | COMPLETED |
| [TASK-0053](TASKS_PHASE_04.md#task-0053) | 04 | P0 | Core CI checks | TASK-0050, TASK-0051 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0054](TASKS_PHASE_04.md#task-0054) | 04 | P0 | Web fixture harness | TASK-0049, TASK-0050 | M | medium | COMPLETED |
| [TASK-0055](TASKS_PHASE_05.md#task-0055) | 05 | P0 | Board layout conflict review | TASK-0030, TASK-0004 | M | low | COMPLETED |
| [TASK-0056](TASKS_PHASE_05.md#task-0056) | 05 | P0 | Design token import | TASK-0049, TASK-0029 | M | low | COMPLETED |
| [TASK-0057](TASKS_PHASE_05.md#task-0057) | 05 | P0 | Responsive canvas anchors | TASK-0056, TASK-0055 | M | low | COMPLETED |
| [TASK-0058](TASKS_PHASE_05.md#task-0058) | 05 | P0 | Reusable button states | TASK-0057, TASK-0035 | M | low | COMPLETED |
| [TASK-0059](TASKS_PHASE_05.md#task-0059) | 05 | P0 | Currency and stage HUD fixture | TASK-0058, TASK-0034, TASK-0054 | M | low | COMPLETED |
| [TASK-0060](TASKS_PHASE_05.md#task-0060) | 05 | P0 | Board and battle static fixture | TASK-0058, TASK-0034, TASK-0054 | M | low | COMPLETED |
| [TASK-0061](TASKS_PHASE_05.md#task-0061) | 05 | P0 | Bottom navigation fixture | TASK-0058, TASK-0034, TASK-0054 | M | low | COMPLETED |
| [TASK-0062](TASKS_PHASE_05.md#task-0062) | 05 | P0 | Loading start maintenance fixtures | TASK-0034, TASK-0054, TASK-0058 | M | low | REQUIRED_NOW |
| [TASK-0063](TASKS_PHASE_05.md#task-0063) | 05 | P0 | Hero equipment static fixture | TASK-0034, TASK-0054, TASK-0058 | M | low | REQUIRED_NOW |
| [TASK-0064](TASKS_PHASE_05.md#task-0064) | 05 | P0 | Hero upgrades static fixture | TASK-0034, TASK-0054, TASK-0058 | M | low | REQUIRED_NOW |
| [TASK-0065](TASKS_PHASE_05.md#task-0065) | 05 | P1 | Relic dungeon static fixtures | TASK-0034, TASK-0054, TASK-0058 | M | low | REQUIRED_NOW |
| [TASK-0066](TASKS_PHASE_05.md#task-0066) | 05 | P0 | Daily reward static fixtures | TASK-0034, TASK-0054, TASK-0058 | M | high | REQUIRED_NOW |
| [TASK-0067](TASKS_PHASE_05.md#task-0067) | 05 | P0 | Settings static fixtures | TASK-0058, TASK-0034, TASK-0054 | M | low | REQUIRED_NOW |
| [TASK-0068](TASKS_PHASE_05.md#task-0068) | 05 | P0 | Wheel static fixtures | TASK-0058, TASK-0034, TASK-0054 | M | low | REQUIRED_NOW |
| [TASK-0069](TASKS_PHASE_05.md#task-0069) | 05 | P0 | Static golden comparison | TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068 | M | low | DEFERRED_POST_DELIVERY |
| [TASK-0070](TASKS_PHASE_06.md#task-0070) | 06 | P0 | Amount value type | TASK-0048, TASK-0052 | M | medium | COMPLETED |
| [TASK-0071](TASKS_PHASE_06.md#task-0071) | 06 | P0 | Normalized game state | TASK-0070 | M | medium | COMPLETED |
| [TASK-0072](TASKS_PHASE_06.md#task-0072) | 06 | P0 | Command dispatcher | TASK-0071, TASK-0051 | M | medium | COMPLETED |
| [TASK-0073](TASKS_PHASE_06.md#task-0073) | 06 | P0 | Durable transaction coordinator | TASK-0072, TASK-0052 | L | high | COMPLETED |
| [TASK-0074](TASKS_PHASE_06.md#task-0074) | 06 | P0 | Reward receipt service | TASK-0073 | M | high | COMPLETED |
| [TASK-0075](TASKS_PHASE_06.md#task-0075) | 06 | P0 | Seeded RNG streams | TASK-0052 | M | medium | COMPLETED |
| [TASK-0076](TASKS_PHASE_06.md#task-0076) | 06 | P0 | Game state selectors | TASK-0071 | S | medium | COMPLETED |
| [TASK-0077](TASKS_PHASE_06.md#task-0077) | 06 | P0 | Simulation clock | TASK-0052 | M | medium | COMPLETED |
| [TASK-0078](TASKS_PHASE_06.md#task-0078) | 06 | P0 | Input router | TASK-0058, TASK-0049 | M | medium | COMPLETED |
| [TASK-0079](TASKS_PHASE_06.md#task-0079) | 06 | P0 | State invariant tests | TASK-0074, TASK-0076, TASK-0075, TASK-0077 | M | medium | COMPLETED |
| [TASK-0080](TASKS_PHASE_06.md#task-0080) | 06 | P0 | Core replay harness | TASK-0079, TASK-0077 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0081](TASKS_PHASE_07.md#task-0081) | 07 | P0 | Hero definition and instance model | TASK-0079 | S | medium | COMPLETED |
| [TASK-0082](TASKS_PHASE_07.md#task-0082) | 07 | P0 | Board slot model | TASK-0081 | S | medium | COMPLETED |
| [TASK-0083](TASKS_PHASE_07.md#task-0083) | 07 | P0 | Purchase quote selector | TASK-0082 | S | medium | COMPLETED |
| [TASK-0084](TASKS_PHASE_07.md#task-0084) | 07 | P0 | Purchase hero transaction | TASK-0083, TASK-0073 | M | high | COMPLETED |
| [TASK-0085](TASKS_PHASE_07.md#task-0085) | 07 | P0 | Purchase hold controller | TASK-0084, TASK-0009, TASK-0078 | M | medium | COMPLETED |
| [TASK-0086](TASKS_PHASE_07.md#task-0086) | 07 | P0 | Manual merge compatibility | TASK-0085 | M | medium | COMPLETED |
| [TASK-0087](TASKS_PHASE_07.md#task-0087) | 07 | P0 | Manual merge transaction | TASK-0086, TASK-0074 | M | high | COMPLETED |
| [TASK-0088](TASKS_PHASE_07.md#task-0088) | 07 | P0 | Timed auto-merge entitlement | TASK-0087, TASK-0006, TASK-0074 | M | medium | COMPLETED |
| [TASK-0089](TASKS_PHASE_07.md#task-0089) | 07 | P0 | Auto-merge pair selector | TASK-0088 | S | medium | COMPLETED |
| [TASK-0090](TASKS_PHASE_07.md#task-0090) | 07 | P0 | Auto-merge cascade reducer | TASK-0089, TASK-0006 | M | high | COMPLETED |
| [TASK-0091](TASKS_PHASE_07.md#task-0091) | 07 | P0 | Discovery reward command | TASK-0090 | M | high | COMPLETED |
| [TASK-0092](TASKS_PHASE_07.md#task-0092) | 07 | P0 | Deployment command | TASK-0091 | M | medium | COMPLETED |
| [TASK-0093](TASKS_PHASE_07.md#task-0093) | 07 | P0 | Board input projection | TASK-0092, TASK-0060, TASK-0078 | M | medium | COMPLETED |
| [TASK-0094](TASKS_PHASE_07.md#task-0094) | 07 | P0 | Purchase merge acceptance | TASK-0093, TASK-0091 | M | medium | COMPLETED |
| [TASK-0095](TASKS_PHASE_08.md#task-0095) | 08 | P0 | Combat entity model | TASK-0092 | S | medium | COMPLETED |
| [TASK-0096](TASKS_PHASE_08.md#task-0096) | 08 | P0 | Encounter spawn service | TASK-0095 | M | medium | COMPLETED |
| [TASK-0097](TASKS_PHASE_08.md#task-0097) | 08 | P0 | Target selector | TASK-0096 | S | medium | COMPLETED |
| [TASK-0098](TASKS_PHASE_08.md#task-0098) | 08 | P0 | Attack cooldown system | TASK-0097 | M | medium | COMPLETED |
| [TASK-0099](TASKS_PHASE_08.md#task-0099) | 08 | P0 | Hit intent queue | TASK-0098 | M | medium | COMPLETED |
| [TASK-0100](TASKS_PHASE_08.md#task-0100) | 08 | P0 | Damage resolver | TASK-0099 | M | high | COMPLETED |
| [TASK-0101](TASKS_PHASE_08.md#task-0101) | 08 | P0 | Death reducer | TASK-0100 | M | medium | COMPLETED |
| [TASK-0102](TASKS_PHASE_08.md#task-0102) | 08 | P0 | Battle tick pipeline | TASK-0101 | M | medium | COMPLETED |
| [TASK-0103](TASKS_PHASE_08.md#task-0103) | 08 | P0 | Hero combat presenter | TASK-0102 | M | medium | COMPLETED |
| [TASK-0104](TASKS_PHASE_08.md#task-0104) | 08 | P0 | Enemy presenter | TASK-0103 | M | medium | COMPLETED |
| [TASK-0105](TASKS_PHASE_08.md#task-0105) | 08 | P0 | Projectile presenter | TASK-0104 | M | medium | COMPLETED |
| [TASK-0106](TASKS_PHASE_08.md#task-0106) | 08 | P0 | Damage label presenter | TASK-0105 | M | high | COMPLETED |
| [TASK-0107](TASKS_PHASE_08.md#task-0107) | 08 | P0 | Combat reward adapter | TASK-0106 | M | high | COMPLETED |
| [TASK-0108](TASKS_PHASE_08.md#task-0108) | 08 | P0 | Mode attack and recovery policy | TASK-0107 | M | medium | COMPLETED |
| [TASK-0109](TASKS_PHASE_08.md#task-0109) | 08 | P0 | Combat deterministic fixtures | TASK-0108 | M | medium | COMPLETED |
| [TASK-0110](TASKS_PHASE_08.md#task-0110) | 08 | P0 | Combat visual acceptance | TASK-0109 | M | medium | COMPLETED |
| [TASK-0111](TASKS_PHASE_09.md#task-0111) | 09 | P0 | Stage definition graph | TASK-0102 | M | medium | COMPLETED |
| [TASK-0112](TASKS_PHASE_09.md#task-0112) | 09 | P0 | Wave progression reducer | TASK-0111 | M | medium | COMPLETED |
| [TASK-0113](TASKS_PHASE_09.md#task-0113) | 09 | P0 | First-clear reward watermark | TASK-0112 | M | high | COMPLETED |
| [TASK-0114](TASKS_PHASE_09.md#task-0114) | 09 | P0 | Boss timer and tie rule | TASK-0113 | M | medium | COMPLETED |
| [TASK-0115](TASKS_PHASE_09.md#task-0115) | 09 | P0 | Boss failure and retry | TASK-0114 | M | medium | COMPLETED |
| [TASK-0116](TASKS_PHASE_09.md#task-0116) | 09 | P0 | Unlock condition evaluator | TASK-0115 | M | medium | COMPLETED |
| [TASK-0117](TASKS_PHASE_09.md#task-0117) | 09 | P0 | Stage boss HUD presenter | TASK-0116 | M | medium | COMPLETED |
| [TASK-0118](TASKS_PHASE_09.md#task-0118) | 09 | P0 | Stage boss acceptance | TASK-0117 | M | medium | COMPLETED |
| [TASK-0119](TASKS_PHASE_10.md#task-0119) | 10 | P1 | Equipment instance model | TASK-0071, TASK-0073, TASK-0074 | S | medium | SUPPORTING_REQUIRED |
| [TASK-0120](TASKS_PHASE_10.md#task-0120) | 10 | P1 | Equipment slot compatibility | TASK-0119 | M | medium | SUPPORTING_REQUIRED |
| [TASK-0121](TASKS_PHASE_10.md#task-0121) | 10 | P1 | Equip and swap transaction | TASK-0120 | M | high | SUPPORTING_REQUIRED |
| [TASK-0122](TASKS_PHASE_10.md#task-0122) | 10 | P1 | Equipment enhancement transaction | TASK-0121 | M | high | SUPPORTING_REQUIRED |
| [TASK-0123](TASKS_PHASE_10.md#task-0123) | 10 | P1 | Hero stat aggregation | TASK-0122 | M | medium | SUPPORTING_REQUIRED |
| [TASK-0124](TASKS_PHASE_10.md#task-0124) | 10 | P1 | Hero upgrade transaction | TASK-0123 | M | high | SUPPORTING_REQUIRED |
| [TASK-0125](TASKS_PHASE_10.md#task-0125) | 10 | P1 | Equipment panel binding | TASK-0063, TASK-0124 | M | medium | REQUIRED_NOW |
| [TASK-0126](TASKS_PHASE_10.md#task-0126) | 10 | P1 | Hero upgrades panel binding | TASK-0064, TASK-0125 | M | medium | REQUIRED_NOW |
| [TASK-0127](TASKS_PHASE_10.md#task-0127) | 10 | P1 | Equipment progression acceptance | TASK-0126 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0128](TASKS_PHASE_11.md#task-0128) | 11 | P1 | Route and popup coordinator | TASK-0061, TASK-0078 | M | medium | SUPPORTING_REQUIRED |
| [TASK-0129](TASKS_PHASE_11.md#task-0129) | 11 | P1 | Settings persistence binding | TASK-0128 | M | medium | REQUIRED_NOW |
| [TASK-0130](TASKS_PHASE_11.md#task-0130) | 11 | P1 | Quest event reducer | TASK-0129 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0131](TASKS_PHASE_11.md#task-0131) | 11 | P1 | Quest claim transaction | TASK-0130 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0132](TASKS_PHASE_11.md#task-0132) | 11 | P1 | Red-dot selectors | TASK-0117, TASK-0129 | S | medium | SUPPORTING_REQUIRED |
| [TASK-0133](TASKS_PHASE_11.md#task-0133) | 11 | P1 | Daily period service | TASK-0077 | M | medium | SUPPORTING_REQUIRED |
| [TASK-0134](TASKS_PHASE_11.md#task-0134) | 11 | P1 | Daily claim transaction | TASK-0133 | M | high | REQUIRED_NOW |
| [TASK-0135](TASKS_PHASE_11.md#task-0135) | 11 | P1 | Daily panel binding | TASK-0066, TASK-0134 | M | medium | REQUIRED_NOW |
| [TASK-0136](TASKS_PHASE_11.md#task-0136) | 11 | P1 | Wheel outcome selector | TASK-0075, TASK-0074, TASK-0050 | S | medium | REQUIRED_NOW |
| [TASK-0137](TASKS_PHASE_11.md#task-0137) | 11 | P1 | Wheel reserve transaction | TASK-0136 | M | high | REQUIRED_NOW |
| [TASK-0138](TASKS_PHASE_11.md#task-0138) | 11 | P1 | Wheel claim transaction | TASK-0137, TASK-0254 | M | high | REQUIRED_NOW |
| [TASK-0139](TASKS_PHASE_11.md#task-0139) | 11 | P1 | Wheel panel controller | TASK-0138, TASK-0068 | M | medium | REQUIRED_NOW |
| [TASK-0140](TASKS_PHASE_11.md#task-0140) | 11 | P1 | Quest and offline popup binding | TASK-0139 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0141](TASKS_PHASE_11.md#task-0141) | 11 | P1 | Tutorial step reducer | TASK-0140 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0142](TASKS_PHASE_11.md#task-0142) | 11 | P1 | Tutorial input mask | TASK-0141 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0143](TASKS_PHASE_11.md#task-0143) | 11 | P1 | Meta lifecycle acceptance | TASK-0129, TASK-0135, TASK-0139, TASK-0128 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0144](TASKS_PHASE_12.md#task-0144) | 12 | P0 | Save envelope codec | TASK-0071 | M | high | COMPLETED |
| [TASK-0145](TASKS_PHASE_12.md#task-0145) | 12 | P0 | Web save adapter | TASK-0144, TASK-0049 | M | high | COMPLETED |
| [TASK-0146](TASKS_PHASE_12.md#task-0146) | 12 | P0 | Native save adapter contract | TASK-0052, TASK-0047 | M | high | COMPLETED |
| [TASK-0147](TASKS_PHASE_12.md#task-0147) | 12 | P0 | Save candidate recovery | TASK-0144, TASK-0145 | M | high | COMPLETED |
| [TASK-0148](TASKS_PHASE_12.md#task-0148) | 12 | P0 | Save checkpoint scheduling | TASK-0073, TASK-0147 | M | high | SUPPORTING_REQUIRED |
| [TASK-0149](TASKS_PHASE_12.md#task-0149) | 12 | P0 | Save migration pipeline | TASK-0148 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0150](TASKS_PHASE_12.md#task-0150) | 12 | P0 | Migration fixture suite | TASK-0149 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0151](TASKS_PHASE_12.md#task-0151) | 12 | P0 | Offline interval calculator | TASK-0077 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0152](TASKS_PHASE_12.md#task-0152) | 12 | P0 | Offline entitlement reservation | TASK-0151, TASK-0074, TASK-0148 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0153](TASKS_PHASE_12.md#task-0153) | 12 | P0 | Offline claim transaction | TASK-0152 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0154](TASKS_PHASE_12.md#task-0154) | 12 | P0 | Receipt compaction policy | TASK-0148, TASK-0147 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0155](TASKS_PHASE_12.md#task-0155) | 12 | P0 | Save crash injection harness | TASK-0154, TASK-0149 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0156](TASKS_PHASE_12.md#task-0156) | 12 | P0 | Lifecycle save integration | TASK-0047, TASK-0148 | M | high | SUPPORTING_REQUIRED |
| [TASK-0157](TASKS_PHASE_12.md#task-0157) | 12 | P0 | Save offline acceptance | TASK-0155, TASK-0156, TASK-0150 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0158](TASKS_PHASE_13.md#task-0158) | 13 | P0 | Motion art calibration | TASK-0030 | S | medium | COMPLETED |
| [TASK-0159](TASKS_PHASE_13.md#task-0159) | 13 | P0 | Animation director | TASK-0110, TASK-0158 | M | medium | COMPLETED |
| [TASK-0160](TASKS_PHASE_13.md#task-0160) | 13 | P0 | Presentation pool manager | TASK-0159 | M | medium | COMPLETED |
| [TASK-0161](TASKS_PHASE_13.md#task-0161) | 13 | P0 | Hero idle spawn profiles | TASK-0160 | M | medium | COMPLETED |
| [TASK-0162](TASKS_PHASE_13.md#task-0162) | 13 | P0 | Hero attack hit profiles | TASK-0161 | M | medium | COMPLETED |
| [TASK-0163](TASKS_PHASE_13.md#task-0163) | 13 | P0 | Enemy boss profiles | TASK-0162 | M | medium | COMPLETED |
| [TASK-0164](TASKS_PHASE_13.md#task-0164) | 13 | P0 | Merge convergence profile | TASK-0163 | M | medium | COMPLETED |
| [TASK-0165](TASKS_PHASE_13.md#task-0165) | 13 | P0 | Merge cascade escalation | TASK-0164 | M | high | COMPLETED |
| [TASK-0166](TASKS_PHASE_13.md#task-0166) | 13 | P0 | Projectile art task | TASK-0165 | M | medium | COMPLETED |
| [TASK-0167](TASKS_PHASE_13.md#task-0167) | 13 | P0 | Effect primitive task | TASK-0166 | M | medium | COMPLETED |
| [TASK-0168](TASKS_PHASE_13.md#task-0168) | 13 | P0 | Damage number motion | TASK-0167 | M | high | REQUIRED_NOW |
| [TASK-0169](TASKS_PHASE_13.md#task-0169) | 13 | P0 | Currency reward flyers | TASK-0168 | M | high | REQUIRED_NOW |
| [TASK-0170](TASKS_PHASE_13.md#task-0170) | 13 | P0 | UI button counter motion | TASK-0169 | M | medium | REQUIRED_NOW |
| [TASK-0171](TASKS_PHASE_13.md#task-0171) | 13 | P0 | Popup route transitions | TASK-0170 | M | medium | REQUIRED_NOW |
| [TASK-0172](TASKS_PHASE_13.md#task-0172) | 13 | P1 | Wheel motion profile | TASK-0171 | M | medium | REQUIRED_NOW |
| [TASK-0173](TASKS_PHASE_13.md#task-0173) | 13 | P1 | Daily chest upgrade feedback | TASK-0172 | M | medium | REQUIRED_NOW |
| [TASK-0174](TASKS_PHASE_13.md#task-0174) | 13 | P1 | Background motion fallback | TASK-0173 | M | medium | REQUIRED_NOW |
| [TASK-0175](TASKS_PHASE_13.md#task-0175) | 13 | P0 | Haptic event adapter | TASK-0174, TASK-0047 | M | medium | REQUIRED_NOW |
| [TASK-0176](TASKS_PHASE_13.md#task-0176) | 13 | P0 | Motion freeze and interruption QA | TASK-0175 | M | medium | REQUIRED_NOW |
| [TASK-0177](TASKS_PHASE_14.md#task-0177) | 14 | P0 | Audio acquisition | TASK-0001 | M | low | REQUIRED_NOW |
| [TASK-0178](TASKS_PHASE_14.md#task-0178) | 14 | P1 | Music acquisition | TASK-0001 | M | low | REQUIRED_NOW |
| [TASK-0179](TASKS_PHASE_14.md#task-0179) | 14 | P1 | Ambience acquisition | TASK-0001 | M | low | REQUIRED_NOW |
| [TASK-0180](TASKS_PHASE_14.md#task-0180) | 14 | P1 | Audio import validation | TASK-0177, TASK-0049 | M | low | DEFERRED_POST_DELIVERY |
| [TASK-0181](TASKS_PHASE_14.md#task-0181) | 14 | P0 | Audio director buses | TASK-0177, TASK-0049 | M | low | REQUIRED_NOW |
| [TASK-0182](TASKS_PHASE_14.md#task-0182) | 14 | P1 | Audio voice budget | TASK-0181 | M | low | SUPPORTING_REQUIRED |
| [TASK-0183](TASKS_PHASE_14.md#task-0183) | 14 | P1 | Music duck crossfade | TASK-0182, TASK-0178 | M | low | REQUIRED_NOW |
| [TASK-0184](TASKS_PHASE_14.md#task-0184) | 14 | P0 | Audio event wiring | TASK-0182, TASK-0159 | M | low | REQUIRED_NOW |
| [TASK-0185](TASKS_PHASE_14.md#task-0185) | 14 | P0 | Audio settings lifecycle | TASK-0181, TASK-0047 | M | low | SUPPORTING_REQUIRED |
| [TASK-0186](TASKS_PHASE_14.md#task-0186) | 14 | P1 | Audio mix acceptance | TASK-0184, TASK-0185, TASK-0183, TASK-0179, TASK-0177, TASK-0049 | M | low | DEFERRED_POST_DELIVERY |
| [TASK-0187](TASKS_PHASE_15.md#task-0187) | 15 | P1 | Numeric precision capture | TASK-0008 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0188](TASKS_PHASE_15.md#task-0188) | 15 | P1 | Balance fitting tool | TASK-0187 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0189](TASKS_PHASE_15.md#task-0189) | 15 | P1 | Hero tier content table | TASK-0031, TASK-0050, TASK-0118 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0190](TASKS_PHASE_15.md#task-0190) | 15 | P1 | Hero enemy content table | TASK-0189 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0191](TASKS_PHASE_15.md#task-0191) | 15 | P1 | Stage world content table | TASK-0190 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0192](TASKS_PHASE_15.md#task-0192) | 15 | P1 | Economy merge content table | TASK-0191 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0193](TASKS_PHASE_15.md#task-0193) | 15 | P1 | Equipment reward content table | TASK-0120, TASK-0031, TASK-0074 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0194](TASKS_PHASE_15.md#task-0194) | 15 | P1 | Meta unlock content table | TASK-0117, TASK-0075, TASK-0253 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0195](TASKS_PHASE_15.md#task-0195) | 15 | P1 | Animation audio config table | TASK-0194, TASK-0176, TASK-0186 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0196](TASKS_PHASE_15.md#task-0196) | 15 | P1 | Content cross-reference validator | TASK-0195 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0197](TASKS_PHASE_15.md#task-0197) | 15 | P1 | Balance simulation report | TASK-0196 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0198](TASKS_PHASE_15.md#task-0198) | 15 | P1 | Number formatter localization | TASK-0054, TASK-0070 | M | medium | SUPPORTING_REQUIRED |
| [TASK-0199](TASKS_PHASE_15.md#task-0199) | 15 | P1 | Localization string catalogue | TASK-0198 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0200](TASKS_PHASE_15.md#task-0200) | 15 | P1 | Content fidelity acceptance | TASK-0196, TASK-0198, TASK-0118, TASK-0127, TASK-0143 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0201](TASKS_PHASE_16.md#task-0201) | 16 | P0 | Production platform service composition | TASK-0047, TASK-0147 | M | high | SUPPORTING_REQUIRED |
| [TASK-0202](TASKS_PHASE_16.md#task-0202) | 16 | P0 | Android application build and smoke | TASK-0201 | L | high | REQUIRED_NOW |
| [TASK-0203](TASKS_PHASE_16.md#task-0203) | 16 | P0 | iOS application build and smoke | TASK-0201 | L | high | REQUIRED_NOW |
| [TASK-0204](TASKS_PHASE_16.md#task-0204) | 16 | P0 | Typed platform service requests | TASK-0052, TASK-0201 | M | high | SUPPORTING_REQUIRED |
| [TASK-0205](TASKS_PHASE_16.md#task-0205) | 16 | P0 | Platform request coordinator | TASK-0204 | M | high | SUPPORTING_REQUIRED |
| [TASK-0206](TASKS_PHASE_16.md#task-0206) | 16 | P0 | Native storage implementation | TASK-0146, TASK-0205 | M | high | SUPPORTING_REQUIRED |
| [TASK-0207](TASKS_PHASE_16.md#task-0207) | 16 | P0 | Application lifecycle and audio coordination | TASK-0156, TASK-0185, TASK-0206 | M | high | SUPPORTING_REQUIRED |
| [TASK-0208](TASKS_PHASE_16.md#task-0208) | 16 | P0 | Deep-link notification routing | TASK-0128, TASK-0129, TASK-0207 | M | high | REQUIRED_NOW |
| [TASK-0209](TASKS_PHASE_16.md#task-0209) | 16 | P0 | Analytics decision | TASK-0201 | M | high | REQUIRED_NOW |
| [TASK-0210](TASKS_PHASE_16.md#task-0210) | 16 | P0 | Analytics adapter | TASK-0209 | M | high | REQUIRED_NOW |
| [TASK-0211](TASKS_PHASE_16.md#task-0211) | 16 | P0 | Native production lifecycle QA | TASK-0202, TASK-0203, TASK-0207, TASK-0208, TASK-0210, TASK-0206 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0212](TASKS_PHASE_16.md#task-0212) | 16 | P0 | Native build reproducibility | TASK-0202, TASK-0203 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0213](TASKS_PHASE_17.md#task-0213) | 17 | P0 | Performance baseline capture | TASK-0211, TASK-0196, TASK-0198, TASK-0118, TASK-0126, TASK-0143, TASK-0186, TASK-0212 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0214](TASKS_PHASE_17.md#task-0214) | 17 | P0 | Texture residency optimization | TASK-0213 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0215](TASKS_PHASE_17.md#task-0215) | 17 | P0 | Pool allocation optimization | TASK-0214 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0216](TASKS_PHASE_17.md#task-0216) | 17 | P0 | Draw-call batching optimization | TASK-0215 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0217](TASKS_PHASE_17.md#task-0217) | 17 | P0 | Low-quality preset | TASK-0213, TASK-0159 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0218](TASKS_PHASE_17.md#task-0218) | 17 | P0 | Save throughput optimization | TASK-0217 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0219](TASKS_PHASE_17.md#task-0219) | 17 | P0 | Native memory leak closure | TASK-0217, TASK-0207 | L | medium | DEFERRED_POST_DELIVERY |
| [TASK-0220](TASKS_PHASE_17.md#task-0220) | 17 | P0 | Performance budget acceptance | TASK-0219 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0221](TASKS_PHASE_18.md#task-0221) | 18 | P0 | Core unit matrix execution | TASK-0079, TASK-0080 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0222](TASKS_PHASE_18.md#task-0222) | 18 | P0 | Integration matrix execution | TASK-0221, TASK-0157, TASK-0143, TASK-0127, TASK-0211 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0223](TASKS_PHASE_18.md#task-0223) | 18 | P0 | Gameplay golden path execution | TASK-0079, TASK-0080, TASK-0155, TASK-0156, TASK-0150, TASK-0143, TASK-0126, TASK-0211, TASK-0118, TASK-0243, TASK-0196, TASK-0259 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0224](TASKS_PHASE_18.md#task-0224) | 18 | P0 | Visual regression execution | TASK-0223, TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0225](TASKS_PHASE_18.md#task-0225) | 18 | P0 | Device matrix execution | TASK-0224 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0226](TASKS_PHASE_18.md#task-0226) | 18 | P0 | Save migration release QA | TASK-0225 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0227](TASKS_PHASE_18.md#task-0227) | 18 | P0 | Accessibility localization QA | TASK-0224, TASK-0198 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0228](TASKS_PHASE_18.md#task-0228) | 18 | P0 | Audio haptic release QA | TASK-0186, TASK-0211 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0229](TASKS_PHASE_18.md#task-0229) | 18 | P0 | Regression defect closure | TASK-0049, TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068, TASK-0075, TASK-0077, TASK-0079, TASK-0117, TASK-0118, TASK-0126, TASK-0128, TASK-0129, TASK-0135, TASK-0139, TASK-0147, TASK-0148, TASK-0156, TASK-0159, TASK-0176, TASK-0177, TASK-0179, TASK-0183, TASK-0184, TASK-0185, TASK-0198, TASK-0202, TASK-0203, TASK-0206, TASK-0207, TASK-0208, TASK-0210, TASK-0243, TASK-0253 | M | medium | SUPPORTING_REQUIRED |
| [TASK-0230](TASKS_PHASE_18.md#task-0230) | 18 | P0 | Beta gate acceptance | TASK-0229, TASK-0028, TASK-0029, TASK-0177 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0231](TASKS_PHASE_19.md#task-0231) | 19 | P0 | Release readiness | TASK-0253 | S | high | REQUIRED_NOW |
| [TASK-0232](TASKS_PHASE_19.md#task-0232) | 19 | P0 | Current platform requirements review | TASK-0231 | M | high | REQUIRED_NOW |
| [TASK-0233](TASKS_PHASE_19.md#task-0233) | 19 | P0 | Distribution rights acceptance | TASK-0028, TASK-0029, TASK-0177, TASK-0178, TASK-0179 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0234](TASKS_PHASE_19.md#task-0234) | 19 | P0 | Release build provenance | TASK-0028, TASK-0029, TASK-0177, TASK-0178, TASK-0179, TASK-0202, TASK-0203, TASK-0229, TASK-0232 | M | high | REQUIRED_NOW |
| [TASK-0235](TASKS_PHASE_19.md#task-0235) | 19 | P0 | Store metadata package | TASK-0234 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0236](TASKS_PHASE_19.md#task-0236) | 19 | P0 | Rollback and recovery drill | TASK-0234, TASK-0155, TASK-0150 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0237](TASKS_PHASE_19.md#task-0237) | 19 | P0 | Production release gate | TASK-0132, TASK-0234, TASK-0246, TASK-0259 | M | high | REQUIRED_NOW |
| [TASK-0238](TASKS_PHASE_19.md#task-0238) | 19 | P0 | Controlled distribution task | TASK-0237 | M | high | DEFERRED_POST_DELIVERY |
| [TASK-0239](TASKS_PHASE_20.md#task-0239) | 20 | P2 | Alternative mode capture | TASK-0237 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0240](TASKS_PHASE_20.md#task-0240) | 20 | P2 | Summon capture | TASK-0237 | S | medium | DEFERRED_POST_DELIVERY |
| [TASK-0241](TASKS_PHASE_20.md#task-0241) | 20 | P2 | Prestige presence check | TASK-0237 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0242](TASKS_PHASE_20.md#task-0242) | 20 | P2 | Relic progression design | TASK-0065, TASK-0074, TASK-0075 | M | medium | REQUIRED_NOW |
| [TASK-0243](TASKS_PHASE_20.md#task-0243) | 20 | P2 | Dragon mode implementation slice | TASK-0065, TASK-0074, TASK-0118 | M | medium | REQUIRED_NOW |
| [TASK-0244](TASKS_PHASE_20.md#task-0244) | 20 | P2 | Demon mode implementation slice | TASK-0237, TASK-0239 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0245](TASKS_PHASE_20.md#task-0245) | 20 | P2 | Tower mode implementation slice | TASK-0237, TASK-0239 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0246](TASKS_PHASE_20.md#task-0246) | 20 | P2 | Summon pool reducer | TASK-0074, TASK-0075, TASK-0120, TASK-0242 | M | medium | REQUIRED_NOW |
| [TASK-0247](TASKS_PHASE_20.md#task-0247) | 20 | P2 | Skill status reducer | TASK-0237 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0248](TASKS_PHASE_20.md#task-0248) | 20 | P2 | Custom character motion | TASK-0237 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0249](TASKS_PHASE_20.md#task-0249) | 20 | P2 | Background expansion | TASK-0237 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0250](TASKS_PHASE_20.md#task-0250) | 20 | P2 | Post-launch diagnostics triage | TASK-0237 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0251](TASKS_PHASE_20.md#task-0251) | 20 | P2 | Optional online systems ADR | TASK-0237 | M | medium | DEFERRED_POST_DELIVERY |
| [TASK-0252](TASKS_PHASE_00.md#task-0252) | 00 | P0 | React Native Skia architecture consistency amendment | TASK-0003, TASK-0004 | M | medium | COMPLETED |
| [TASK-0253](TASKS_PHASE_00.md#task-0253) | 00 | P0 | Targeted product requirements amendment | TASK-0252 | M | low | COMPLETED |
| [TASK-0254](TASKS_PHASE_11.md#task-0254) | 11 | P0 | Rewarded operation authority | TASK-0074, TASK-0077 | M | high | REQUIRED_NOW |
| [TASK-0255](TASKS_PHASE_11.md#task-0255) | 11 | P0 | Free coins rewarded claim | TASK-0254 | M | high | REQUIRED_NOW |
| [TASK-0256](TASKS_PHASE_11.md#task-0256) | 11 | P0 | Stage reward multiplier claim | TASK-0254, TASK-0107 | M | high | REQUIRED_NOW |
| [TASK-0257](TASKS_PHASE_11.md#task-0257) | 11 | P0 | Rewarded shop wheel and win UI | TASK-0255, TASK-0256, TASK-0139, TASK-0061 | M | high | REQUIRED_NOW |
| [TASK-0258](TASKS_PHASE_16.md#task-0258) | 16 | P0 | Start.io React Native rewarded provider | TASK-0201, TASK-0254 | M | high | REQUIRED_NOW |
| [TASK-0259](TASKS_PHASE_16.md#task-0259) | 16 | P0 | Rewarded native completion acceptance | TASK-0207, TASK-0257, TASK-0258 | M | high | REQUIRED_NOW |
