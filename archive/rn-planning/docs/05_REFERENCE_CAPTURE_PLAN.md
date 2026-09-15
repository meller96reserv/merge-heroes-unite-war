# План проверки референса

[PROPOSED] Каждый run: fresh isolated profile или явно указанный existing save; date/platform/runtime version, viewport, locale, reset state, capture file SHA, input coordinates и monotonic timestamp. До/после каждого действия: currency, board, deployed IDs, stage, modal. Видео собственного наблюдения без извлечения game code/audio; аккаунты, покупки и paid spins не нужны.

Текущий доступ: CrazyGames live работает; первый tutorial записан. Seed YouTube bot-check не обходить чужими cookies. Store notes полезны для version inventory, не для frame measurements. Доступный reference run можно продолжить самостоятельно; ниже задачи для случаев, не доказанных текущим сеансом.

| Capture | Сценарий | Минимальная выборка | Готовый результат |
|---|---|---|---|
| CAP-001 | launch→buy×2→drag merge→new hero→deploy→withdraw→redeploy→quest | 2 fresh runs | event timeline; tutorial gates; after-state screenshots |
| CAP-002 | auto unlock; [1,1,2], [1,1,1,1], two disjoint pairs, max tier/full board | 5 repeats/case | ordering/destination/cascade evidence |
| CAP-003 | prices and buy-tier | first 30 buys, 3 upgrades, 20 rapid taps, 2s hold | observed CSV; no formula without fit residuals |
| CAP-004 | attacks/target/defense/crit | ≥20 hits/tier/target; 3 targets | frame timestamps, distribution, confidence interval |
| CAP-005 | stages/bosses/retry | 3 consecutive bosses, 1 failure | cadence/timer/reward/state graph |
| CAP-006 | offline/save/lifecycle | 60s,10m,2h,24h; repeat resume | cap/rate; stage behavior; claim idempotency notes |
| CAP-007 | equipment/daily/wheel/quests/meta navigation | all reachable states; wheel probabilities only with defensible sample | screen-state matrix updates |
| CAP-008 | native feasibility + visual import/rights | Android+iOS and chosen asset families | spike report, rights ledger, calibrated pivots/insets |

## Measurement protocol

Frame time uses video PTS (ffprobe) rather than command wall intervals. Keep windup/release/impact/death distinct; screenshots alone give bounds, not precise duration. Hit samples split crit/noncrit; OCR numbers are transcribed and visually checked. Cost fits test exact integer samples before approximate exponential candidates; store error metrics, rounding and residuals. An empty timing/balance table is preferable to invented samples.

## Unknown-to-task mapping

The authoritative rows and exact verification methods are in [unknowns.json](../analysis/reference/unknowns.json). Each taskKey is assigned a unique future TASK by [task index](../tasks/TASK_INDEX.md); missing evidence keeps that task open. Unknown closure changes status only when capture ID and before/after results are attached. Architecture/art/license checks use native/source evidence instead of gameplay capture.

## Gate policy

Gate A can pass for documented observed first-session behaviors. Exact auto ordering, damage and boss/offline formulas have independent gates, so static layout and pure infrastructure can proceed. Proposed data is a separate development fixture marked `proposed-v1`; never publish it as reconstructed reference balance. [Evidence](03_EVIDENCE_LEDGER.md) · [Index](00_INDEX.md).
