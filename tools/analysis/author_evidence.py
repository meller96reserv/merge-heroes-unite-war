from plan_common import *

unknowns=[
('U-001','RN/Cocos Android+iOS lifecycle feasibility','BLOCKER','03,16','Full-screen Activity/ViewController adapter','Build/run both targets; bidirectional echo; 10 reopen spike, 50 production cycles; process kill/resume; retain graphs','Native integration acceptance'),
('U-002','Auto-merge pair ordering and cascade destination','HIGH','07','First compatible pair in slot order; result destination explicit','Construct boards [1,1,2], [1,1,1,1], two disjoint pairs, max tier; record before/input/after at 60fps; repeat each 5 times','Auto-merge ordering'),
('U-003','Purchase cost function and rounding','HIGH','07,15','Only first two prices=1 observed; no fitted formula','Record first 30 sequential prices, all currency deltas; reset/profile version; fit exponential/rounded/piecewise and report residuals','Purchase cost measurements'),
('U-004','Damage, armor, crit and attack timing','HIGH','08,15','Injectable integer/fixed-point resolver; no parity numbers yet','20+ noncrit/crit separated hits per tier against 3 targets; frame markers; record displayed stats separately','Combat balance measurements'),
('U-005','Boss cadence, timeout, fail and retry','HIGH','09','Configured boss stage records and explicit stalled state','Reach 3 bosses; win and deliberately timeout one; log HP/timer/reward/stage before+after','Boss observations'),
('U-006','Offline rate/cap/stage simulation/claim timing','HIGH','12','Gold only, capped duration; pending idempotent token','Close at known state for 60s/10m/2h/24h; compare reward, stage, reconnect; repeated resume and clock rollback','Offline measurements'),
('U-007','Reward catalogue and first discovery grants','HIGH','09,11','First Archer popup +100 gem,+10 gold is one observed case','Repeat new tier discovery and same tier rediscovery; log quest/stage/kill rewards independently','Reward catalogue'),
('U-008','Production rights for supplied art','HIGH','19','User-provided source, rights unverified','Record asset owner/license permission provenance before distributable release; exclude unresolved resources','Asset rights ledger'),
('U-009','Font files and license provenance','MEDIUM','05,19','Passion One, Roboto, Nunito families observed; no fonts local','Get exact font versions/license from primary source; compare glyph metrics and baked text','Font acquisition'),
('U-010','9-slice borders and exact character pivots','MEDIUM','02,05','Use fixed sprites until border QA; foot pivot from alpha bbox','Inspect every chosen frame at 1x/2x and 0.5x stretch; annotate insets/socket; diff against source','Asset import calibration'),
('U-011','Formal requirement for RN host','HIGH','03','Preferred master baseline RN shell + Cocos','Inspect project contract/notes; default preferred host; record scope decision without claiming historical app proves requirement','Host decision'),
('U-012','Exact web runtime version and mobile parity','HIGH','01','Web capture 2026-09-08 is separate from store v3.18.0','Find visible version in settings/about; record public version/date; compare same first-session actions on Android/iOS','Reference version lock'),
('U-013','Reference save and recovery semantics','HIGH','12','Single writer versioned save with backup and commit-before-feedback','Browser reload after buy/merge/reward; controlled crash checkpoints in our harness; compare reference only by visible state','Save behavior capture'),
('U-014','Daily reset/streak/missed-day rules','MEDIUM','11','Independent UTC day claim, no streak penalty until measured','Capture claim, double claim, midnight boundary, missed day; record server vs device clock differences','Daily reward observations'),
('U-015','Wheel prizes/weights/free cadence/paid rules','HIGH','11','Predetermine token outcome; no real-money payout; weights UNKNOWN','Open live wheel if exists; observe all states and ≥200 spins only if freely available; do not infer weights from 12 artwork sectors','Wheel observations'),
('U-016','Equipment stat mapping, sets and upgrade costs','HIGH','10','Item instances + slots; additive stats proposed; art associations only','Capture equip/unequip/enhance before+after on two heroes; empty/locked/max states; inspect reference family mapping','Equipment observations'),
('U-017','Quest completion/reset/red dots','MEDIUM','11','Event counters with idempotent claim','Claim first quest; observe next conditions; navigate while battle active; reset boundaries','Quest observations'),
('U-018','Alternative contents rules','MEDIUM','20','Post-MVP Dragon/Demon/Tower; dungeon Figma as visual source','Reach unlock; capture entry cost, roster restrictions, timer/fail/reward for each','Alternative mode capture'),
('U-019','Summon x1/x10 probabilities/pity','MEDIUM','20','Out of MVP beyond equipment opening contract','Capture public probability disclosure, pool/version, x1/x10 outcomes and pity if shown; do not infer from colored frames','Summon capture'),
('U-020','Prestige/rebirth presence','LOW','20','Out of scope until observed','Inspect late menus/store/versioned gameplay; record NOT PRESENT only for bounded observed surface','Prestige presence check'),
('U-021','Skills, statuses and specials','MEDIUM','08,20','No active skills MVP until observed; typed hooks reserved','Record hero detail and special attack; inspect cooldown, targeting, buffs, stacking and interruption','Skills capture'),
('U-022','Hero death, recovery and enemy attacks','HIGH','08','Combat may stall; do not invent permanent hero loss','Underpower a roster; watch HP, death, respawn timers and save/reopen; compare withdraw/redeploy','Death recovery capture'),
('U-023','Deployment cap/selection and merge of deployed units','HIGH','07,08','Explicit deployed IDs; board instance remains occupied','Test capacity, tap withdrawal, drag deploy, merge deployed+reserve and two deployed; observe contribution changes','Deployment capture'),
('U-024','Slot/content unlock condition meaning','HIGH','07,09','Visible labels stored as display facts only','Capture threshold crossing for hero level 2/3/4/6/10 and roster 31/101/401/601; distinguish stage vs account level','Unlock capture'),
('U-025','15-slot behavior within 10-slot Figma composition','HIGH','05','15 logical slots; adapt 3 rows and preserve HUD anchors','Reconstruct 430x932 fixture and responsive 3-row variant; verify 44px targets and no overlap at 360x640','Board layout conflict review'),
('U-026','Parallax layers and sockets','COSMETIC','13','Flattened drift only; no destructive automatic segmentation','Inspect source fills for separable layers; visual-check proposed overlays/feet/sockets','Motion art calibration'),
('U-027','Original audio assets and reference sound character','HIGH','14','Complete event briefs proposed; no reference waveform copied','Listen to legally playable reference; capture functional notes only; produce licensed original variants and lifecycle QA','Audio acquisition'),
('U-028','Analytics provider and consent scope','LOW','16','Local no-op adapter, no PII','Confirm required events and provider; validate payload minimization/offline queue/consent before network adapter','Analytics decision'),
('U-029','Release owner, target audience, store copy and identifiers','HIGH','19','No real payouts; no inherited legal promises from Figma','Set bundle IDs, owner, audience, rights and final text in release manifest; validate store requirements at release date','Release readiness'),
('U-030','Auto-merge unlock/activation/duration','HIGH','07','Manual tutorial; auto policy gated by config after observation','Finish tutorial; inspect settings/boost buttons; activate auto; log duration, costs and background behavior','Auto-merge unlock capture'),
('U-031','Target selection/projectile retarget rule','HIGH','08','Lowest target spawnOrdinal, cancel stale target proposed','Capture multiple enemies and simultaneous kills, projectile in flight at stage boundary','Targeting capture'),
('U-032','Purchase tier advance, multi-buy/hold','HIGH','07','Single command per accepted input; hold disabled until measured','Test short tap, 2-second hold, full board, buy-tier upgrade; record expected grant/cost count','Input purchase capture'),
('U-033','Battle continuity during meta and background','HIGH','11,12','Foreground meta continues; background freezes and uses offline service','Before/after settings/hero modal for 10s; home/lock/resume and stage compare','Lifecycle capture'),
('U-034','Maximum numeric scale and display abbreviations','HIGH','15','Decimal string balances with bigint arithmetic; fixed-point multipliers','Capture K/M/B ranges and prices; test ceil/floor near powers of 1000 and huge save values','Numeric precision capture'),
('U-035','Reference tier to Figma visual mapping','HIGH','15','Keep definitionId/tier/visualId independent','Build explicit reviewed table; all 10 Figma hero archetypes named, no inferred stats from appearance','Content visual mapping')]
dump('analysis/reference/unknowns.json',[dict(zip(['id','unknown','severity','blocksPhase','hypothesis','verification','taskKey'],r)) for r in unknowns])
write('docs/04_UNKNOWNS_REGISTER.md','# Реестр неизвестного\n\nВсе строки [UNKNOWN]; hypothesis только [PROPOSED]. У каждого неизвестного есть метод проверки, будущая taskKey и phase gate. Точные TASK IDs подставляются в [capture plan](05_REFERENCE_CAPTURE_PLAN.md) из task manifest. Неизвестное не означает отсутствие системы.\n\n'+table(['ID','Unknown','Severity','Blocks phase','Current hypothesis','Verification method','Task key'],unknowns)+'\n\nBLOCKER U-001 блокирует native production integration, но имеет полный ранний [spike plan](../plans/PHASE_03_NATIVE_INTEGRATION_SPIKE.md). Planning допускается master §80, когда метод проверки конкретен. HIGH, влияющий на exact parity, блокирует соответствующий import/runtime rule; safe proposed fixture не снимает этот gate.\n\n[Evidence](03_EVIDENCE_LEDGER.md) · [Index](00_INDEX.md)')
write('docs/05_REFERENCE_CAPTURE_PLAN.md','''# План проверки референса

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
''')

write('analysis/figma/README.md','''# Figma analysis artifacts

[MEASURED] Local copy/inventory only. Original archive is ignored by the user's .gitignore and stays in docs. `raw/source.fig` is a byte-identical analysis copy; raw/images are source rasters, not production import. The CSV/JSON/source maps and contact sheets are review artifacts.

Reproduce in an isolated venv: install Pillow, numpy, scipy, ImageHash and jsonschema; run `python tools/analysis/fig_inventory.py`, then `python tools/analysis/semantic_map.py`. Tested with Python 3.13, Pillow 12.3.0, numpy 2.5.3, scipy 1.18.1, ImageHash 4.3.2, jsonschema 4.26.0. Browser capture used Playwright 1.62.0 + installed Chrome. Tool dependencies belong to analysis only.

MCP data is cached in node_inventory.json, text_inventory.json and styles_and_reactions.json; screenshots are direct 430×932 renders. Re-run read-only page inventory on the same file if design changes. Compare source hashes first; never assume current remote content matches a historical ZIP. `visual_classification.txt` is manually authored after visual inspection and is preserved across inventory regeneration.

See [audit](../../docs/07_FIGMA_TECHNICAL_AUDIT.md), [asset map](../../docs/08_FIGMA_ASSET_MAP.md) and [screen map](screen_map.json). No production imports have occurred.
''')
