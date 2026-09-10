from plan_common import *
import csv
unit=[
('UT-001','Amount','0,1,9007199254740992 and10^30; add/subtract/format','exact results; negative debit rejected','06,15'),
('UT-002','Purchase','cost equals balance; one less; full board; repeated command','one debit+hero or no mutation','07'),
('UT-003','Hold input','20taps,2s hold,cancel/up/outside/background','one command per accepted repeat; no runaway timer','07'),
('UT-004','Manual merge','same pair,different family,tier,max,occupied/deployed','valid consumes two creates one at target; reject unchanged','07'),
('UT-005','Auto merge','[1,1,2],[1,1,1,1],disjoint pairs,max tier','configured stable order; terminates within occupancy−1','07'),
('UT-006','Deployment','owned/unowned,cap,withdraw twice','subset ownership and cap invariant','07'),
('UT-007','Targeting','two targets,dead target,stage boundary','stable tie-break; stale target policy','08'),
('UT-008','Attack scheduling','cooldown boundary,split ticks,missed render frames','same attack intents at same simulation ticks','08'),
('UT-009','Damage','zero defense,defense≥attack,crit0/100%,overflow','configured rounding/min damage; HP clamped','08'),
('UT-010','Death','two lethal hits same tick','one death and one kill entitlement','08'),
('UT-011','Stage/boss','last wave,timeout,lethal-timeout tie,retry farming','one first-clear; unique repeat encounter sequence','09'),
('UT-012','Unlocks','allOf/anyOf,boundary,already announced','condition correct; popup once','09'),
('UT-013','Rewards','duplicate claim,save failure,crash after persist','grant+receipt+watermark atomic; no duplicate','06,12'),
('UT-014','Quest','duplicate source event,target boundary,claim twice','counter bounded and reward once','11'),
('UT-015','Daily','UTC midnight,missed day,clock rollback','configured period/streak semantics; no second same-period claim','11'),
('UT-016','Wheel','reserve/reopen/skip/duplicate,zero weights','saved outcome survives; invalid table rejected','11'),
('UT-017','Equipment','equip owned item,swap,unequip,upgrade max','ownership unique; cost and stats atomic','10'),
('UT-018','Offline','negative/zero/cap/cap+1,repeat resume,pending claim','clamped interval and exactly-once watermark','12'),
('UT-019','Save/migration','corrupt A/B,future version,missing alias','last valid candidate or explicit recoverable block','12'),
('UT-020','RNG','same seed,render quality changes,extra audio calls','core replay identical; presentation RNG isolated','06,08'),
('UT-021','Red dots','claimability changes,seen/restart','derived state matches current claim/unlock facts','11'),
('UT-022','Bridge validation','unknown/stale/duplicate/oversize/malformed','reject before mutation; pending authority checked','03,16'),
('UT-023','Config graph','orphan IDs,cycle,invalid tier,zero wheel sum','diagnostic file/ID/field; build blocked','04,15'),
('UT-024','Subscriptions/pools','dispose during dispatch,late callback,reuse','no listener leak or reused-node mutation','13,17')]
integration=[
('IT-001','Fresh golden path','load→buy2→merge→deploy→kill→claim→restart','board/balance/receipt match expected fixture'),
('IT-002','Durable action crash points','terminate before write/during write/after verify/before animation','one valid old/new state, no partial economics'),
('IT-003','Modal input/lifecycle','open settings while fighting; close over buy; background mid merge','route policy respected; no click-through/duplicate result'),
('IT-004','Native host','RN→Cocos→RN10spike/50production cycles','touch/bridge/audio/memory acceptance pass'),
('IT-005','Meta atomicity','equip/daily/quest/wheel simultaneous callback and save','serialized durable transactions and truthful UI'),
('IT-006','Asset loading','rapid tab changes,missing optional/required asset','cancel stale load; optional fallback/required block'),
('IT-007','Offline resume','kill/reopen with pending reward,duplicate resume','one entitlement and correct watermark'),
('IT-008','Audio focus','music+boss cue,phone interruption,mute,reopen','one loop; settings/focus respected'),
('IT-009','Quality equivalence','same fixture full/low/reduced motion','same domain hash; only cosmetics differ'),
('IT-010','Migration release candidate','upgrade synthetic old save and then reopen','preserved totals/ownership; no repeated compensation'),
('IT-011','Navigation/deep links','locked/unlocked route before/after boot','allowlisted route; unlock cannot be bypassed'),
('IT-012','Long session','30min stress then all screens then restart','bounded memory/queues and valid restored state')]
def savecsv(path,headers,rows):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True)
 with p.open('w',newline='') as f:w=csv.writer(f);w.writerow(headers);w.writerows(rows)
savecsv('docs/qa/unit_test_matrix.csv',['testId','system','cases','oracle','phase'],unit)
savecsv('docs/qa/integration_test_matrix.csv',['testId','surface','scenario','oracle'],integration)
qa={
'01_TEST_STRATEGY':('Test strategy','''All runtime tests in this section are planned, NOT RUN. Planning validation checks document/schema/manifest integrity and must not be described as game QA. Future tests use deterministic fixtures with explicit evidenceMode, seed, clock, config digest and expected state/events.

Test pyramid: pure game-core unit/property tests for economic and simulation invariants; deterministic simulations for long progression; Cocos adapter harness for interaction/presentation; native host lifecycle tests on both platforms; golden screenshots and device performance sessions. Avoid tests that merely assert implementation structure. Each meaningful branch has a behavioral oracle in the matrices.

P0 failures: duplicate/lost rewards, negative balance, invalid ownership, crash/unrecoverable save, nonfunctional native host, unusable core controls. P1: broken meta flow, major visual mismatch, severe jank/audio focus error. P2: cosmetic polish/extended content. Release has zero openP0, no unacceptedP1 and explicitP2 backlog.

Evidence records test ID/build/device/fixture/input/expected/actual/artifact path. A pass on web does not imply Android/iOS pass. Unknown reference rules are resolved before parity expectations are written; proposed fixtures can verify architecture while parity remains gated.'''),
'02_UNIT_TEST_MATRIX':('Unit test matrix',table(['ID','System','Cases','Oracle','Phase'],unit)+'''

Use property checks for generated valid boards and arbitrary command sequences: balances≥0, IDs unique, deployed subset, merges bounded, receipts/watermarks monotonic. Capture the failing seed and minimized command sequence. Every rejection preserves state and RNG hashes. No external clock/storage/network in core tests.'''),
'03_INTEGRATION_TEST_MATRIX':('Integration test matrix',table(['ID','Surface','Scenario','Oracle'],integration)+'''

Fault injection is a harness feature, excluded from production. Test adapter failures at deterministic barriers instead of relying only on random process kills. Pair automated state assertions with recordings for touch/audio/lifecycle behavior. All native cases include exact toolchain and OS versions.'''),
'04_GAMEPLAY_ACCEPTANCE':('Gameplay acceptance and golden path','''GP-001 uses proposed-v1 fixture, not claimed reference balance: initialgold100, buycost1, two compatibletier1 heroes, configured resulttier2, attack1, enemyHP4, killreward1. Execute load→buy×2 (gold98, two occupied slots)→merge (one result, discovery reward from explicit fixture)→deploy (owned slot retained)→four configured hits→one kill reward→next stage→save→restart. Expected balances include explicit fixture reward IDs; do not infer hidden discovery grants.

GP-002 repeats with captured reference-derived data only after fidelity gate closure and records the expected numeric ledger from observed tables. GP-003 adds boss failure/retry and ensures farm kills can reward repeatedly while first clear remains once. GP-004 adds equipment, quest, daily, wheel and offline claim with restart at each boundary.

Input acceptance: tap/hold/drag cancel and full board; tutorial permits intended target; UI reports rejection without mutation. Merge result remains correct if interrupted at every marker. Battle scheduling is independent of render FPS. Hero death/permanent loss is never invented for a mode lacking evidence.

Every P0 system has ready/error/full/locked/pending states where applicable. Audio/haptic mute and reduced motion preserve usability. No placeholder balance/art is called exact parity. Pass requires state assertions plus readable Figma-based presentation on target viewports.'''),
'05_VISUAL_REGRESSION':('Visual regression','''Source goldens:15 Figma screenshots at430×932, IDs in screen_map.json. Runtime fixture modes: figmaExact for static comparisons and gameplayAdapted for the15-slot board. Do not compare one mode against the other's golden. Dynamic text values are injected from the Figma text inventory for exact fixtures; production balances remain separate.

Capture protocol: pin fonts/build/renderer/viewport/DPR; load deterministic fixture; wait required assets/fonts; freeze animations at settled marker; hide debug overlay; save source/runtime/50%overlay/diff and anchor report. Compare HUD bounds, five nav positions, stage label, board cells, popup extents, text baselines, pivots and image crop. No flattened screen background may satisfy interactive fixture requirements.

Proposed starting thresholds: anchor drift≤2px at430×932; changed-pixel ratio≤1.5% after per-channel tolerance16 for stable UI regions. Mask only known nondeterministic pixels with documented reason; never mask a wrong layout. Different native font rasterization may require separate baselines but does not excuse wrong metrics.

Review360×640,390×844,412×915,430×932,768×1024 safe-area cases, long text, huge numbers and disabled/pressed/locked/loading states. Failure report identifies source node and runtime component, then updates only the intentional region after review.'''),
'06_PERFORMANCE_TESTING':('Performance testing','''Use native release-like builds on selected physical devices. Warm up2minutes, capture5minutes steady battle and30minutes soak. Stress20attackers/20enemies plus crit/death/reward bursts, repeated meta transitions and50host reopen cycles. Record frame-time distribution, process memory, texture memory, draw calls, node/pool counts, GC/allocations, bridge rate and save queue latency.

Proposed budgets are centralized in technical/14_PERFORMANCE_BUDGET.md. Report p50/p95/p99 and exact collection method; averages alone hide stalls. Capture Android Perfetto/memory and iOS Instruments traces. RN JS/UI and Cocos threads are measured separately. Thermal throttling, charging state and recording overhead are recorded.

Fallback order: reduce cosmetic particles/flyers/shake/parallax, simplify trails, trim texture residency/atlases, then offer30fps render mode if needed. Never change simulation step, rewards, merge ordering or RNG to make a performance test pass. Compare domain hashes under quality modes.

Acceptance: no unbounded memory/queue slope after warmup, no per-hit node allocations after pooling, stable touch response, and every budget exception has a measured report plus specific optimization task before release.'''),
'07_DEVICE_MATRIX':('Device matrix','''Exact physical models are UNKNOWN until inventory/availability is recorded; do not invent tested devices. Required tiers are below. Emulators/simulators validate navigation/builds but do not substitute for physical performance/audio/thermal tests.

| Tier | Required target | Main checks | Current status |
|---|---|---|---|
| Android low | physical3–4GiB RAM, minimum supported OS selected at version lock |30fps, memory, long session, storage pressure | NOT RUN |
| Android mid | physical6–8GiB, representative current supported OS |60fps, touch, gesture Back, audio focus | NOT RUN |
| Android emulator | local configured medium_phone | install, bridge, lifecycle automation | tools present; app absent |
| iPhone older | oldest supported physical performance tier after deployment-target decision | memory,30/60fps, safe area, interruptions | NOT RUN |
| iPhone current | physical current supported iOS |60fps, lifecycle, audio, signing | NOT RUN |
| iOS simulator | installed Xcode26.3 compatible simulator | build, bridge, layout | tools present; app absent |
| Tablet | iPad/Android portrait768×1024 class | layout/letterbox, touch targets | NOT RUN |
| Web | Chrome current at capture plus supported Safari | preview, storage, gesture audio, golden fixtures | reference browser only; product absent |

OS/minimum deployment targets and16KiB/page-size/store requirements must be checked against official platform docs at spike/release date. This document sets coverage, not a stale claimed compliance matrix.'''),
'08_SAVE_MIGRATION_TESTS':('Save migration and crash matrix','''Inject crashes at: before draft, after draft, during inactive write, after write before verify, after verify before in-memory install, after install before event, during reward animation and during active-pointer update. For every case reopen and select newest valid generation. Expected state is exactly old or new transaction, never debit-only/grant-only.

Storage cases: empty fresh install; validA/B; corruptA; corruptB; both corrupt; future schema; truncated JSON; invalid checksum; full disk; denied access; delayed writes; duplicate callback; stale account namespace. Preserve corrupt candidates for recovery and present a clear user choice; no silent reset.

Migration fixtures: documented syntheticv0→v1 currency conversion, missing optional field, unsafe integer rejection, item/stage alias mapping, removed pending wheel outcome, repeated migration boot and interrupted migration write. Check total balances, hero/item ownership, discovered tiers, first-clear/source watermarks and pending claim identity.

Offline cases add UTC midnight/timezone change/backward clock/large forward jump, repeated resume and pending entitlement across config update. Daily/wheel/quest claims share the same exactly-once barrier. Receipt pruning test proves old source replay still rejects after compacting receipts.'''),
'09_RELEASE_CHECKLIST':('Release checklist','''Release is future work; no build is distributed by this mission. Required evidence: scope signed by recorded project decision, source/version lock, allP0 tasks accepted, no blockingP1, schemas/content validated, native spike and production host acceptance, device QA/performance, visual/audio review, save migration/crash suite, rights/fonts/audio provenance and release configuration.

Check app identifiers, audience/rating, privacy/support/terms copy, analytics consent behavior and actual SDK data flows. Figma18+ and stale payout layer names are not legal/store requirements. No real-money payout copy is inherited. Purchases/ads remain disabled unless a later scope decision and verified platform integration are complete.

Build provenance includes source commit, toolchain, app/build/data/save/bridge versions, artifact checksums, signing channel and test report. Secrets remain external. Dry-run store metadata/assets before submission. Verify current official Android/iOS requirements at release time; no planning document claims future policy compliance.

Rollback/recovery plan preserves last compatible save reader, previous signed artifact and content package. Beta monitoring includes crash/save/bridge failures and performance, with consent/provider decisions recorded. Release owner and rollout criteria remain U029 until resolved.''')}
for stem,(title,body) in qa.items():
 write('docs/qa/'+stem+'.md',f'# {title}\n\n{body}\n\n## Traceability\n\n[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).')

release={
'01_MVP_DEFINITION':('MVP definition','''P0 core: portrait boot/start/battle, purchased heroes, manual merge and evidence-gated auto merge, board/deployment, deterministic attacks/projectiles/damage/death, stages/boss/farming, currencies/rewards, tutorial, durable save/offline, essential motion/SFX and native Android/iOS host. Figma art direction and functional15-slot adaptation are required. Exact reference values remain gated by measurements.

P1 core meta: hero upgrades/equipment, quests/red dots, daily reward, wheel, settings, responsive layout, complete original audio, localization readiness and content/balance calibration. Relic/dungeon visuals are catalogued but their full mechanics are P2 unless a scope ADR promotes them. Loading/error/maintenance states are accounted for.

MVP excludes live payments/ads/accounts/backend, prestige, full gacha/legendary content, all-reference-content parity and copied reference audio/code. Reserved interfaces do not imply shipped monetization. Every excluded Figma asset remains classified and traceable.

Exit: complete golden paths and allP0/P1 MVP tasks, native lifecycle/performance/device gates, save crash/migration suite, visual/audio acceptance and rights review. Proposed fixture gameplay can complete a vertical slice but cannot be marketed as exact reverse-engineered balance.'''),
'02_VERTICAL_SLICE_DEFINITION':('Vertical slice definition','''The first slice is a polished, playable native portrait loop: app launch→start→battle HUD/board→buy two heroes→merge with result/discovery feedback→deploy→automatic attack/projectile/hit/death→currency reward→next stage→save→restart/resume. Include one boss attempt/fail-or-win path and settings mute/haptics. It must use real Figma-derived components and a small original audio/effects set.

Minimal content is an explicitly labeled development fixture with at least3hero tiers,2enemy profiles, a short stage chain and1boss. Mapping tier→visual is reviewed independently of reference human characters. No full-screen screenshot substitute. First exact static comparison uses430×932; then15-slot functional adaptation and small-screen test.

Dependencies: native feasibility before foundation, source/asset/font/layout decisions, core state/transactions, purchase/merge, battle/stage, minimal durable save/offline barrier, core motion/audio subset. Numeric phase order is not the slice order; phase12 persistence and phase13/14 subset come before meta expansion.

Pass: same command fixture produces expected state after restart; merge interruption and duplicate reward tests pass; native host re-entry/audio/touch works; target frame/memory budgets are recorded; Figma anchors and readable effects reviewed. Slice is not beta or a proof of full reference parity.'''),
'03_BETA_DEFINITION':('Beta definition','''Beta contains the entire MVP scope with reviewed content, all core meta routes, complete acquisition ledgers and production host integration. It runs on the device matrix with stable save migration/recovery and no known reward duplication or progression blockers. No placeholder assets/audio/balance may be hidden as final.

Entry requires MVP acceptance, a reproducible signed test artifact, consent-aware diagnostics decision, support/recovery procedure and a small controlled distribution plan. Run long-session, upgrade/reinstall where applicable, offline clock and interrupted native lifecycle tests. Store/test-channel credentials are external inputs, never fabricated.

Exit criteria: zeroP0, no unacceptedP1, measured performance within budgets or approved measured revision, all release metadata/rights questions closed, and a documented rollback-compatible save policy. Feedback becomes bounded tasks linked to build/evidence, not ad hoc scope expansion.'''),
'04_PRODUCTION_DEFINITION':('Production definition','''Production readiness means a reproducible release artifact with completed MVP/beta gates, verified source rights, final original audio/fonts, supported-device results, save migration/crash recovery, native bridge/lifecycle stability and current platform/store review. Planning completion itself does not satisfy any of these runtime gates.

Release package: source/toolchain/data digests, app/build/schema/protocol versions, signed artifacts and checksums, QA reports, known issues, support/privacy/terms copy, store images and rollout/rollback instructions. Resolve U029 owner/audience/identifiers and U008/U009/U027 rights before distribution. No inherited Figma payout/age text is treated as a product legal decision.

Acceptance requires the release checklist with evidence paths and accountable reviewer/owner. Any P0 crash, duplicate currency, corrupt unrecoverable save, missing native platform or unlicensed required asset blocks release. Extended content remains post-launch unless explicitly promoted with its dependencies and tests.'''),
'05_POST_LAUNCH_BACKLOG':('Post-launch backlog','''P2 tracks: relic acquisition and sets; Dragon’s Lair/Demon’s Castle/Tower modes after direct capture; summon probabilities/pity only after disclosure/evidence; active skills/statuses; prestige only if observed or explicitly designed; additional hero/enemy/world content; custom skeletal art and layered parallax; optional online accounts/cloud save/monetization through separate ADRs.

Each promoted feature needs evidence status, data/save changes, UI states, motion/audio hooks, native implications, economy/security review where relevant and acceptance tests. Existing52 post-MVP asset candidates remain in the source registry, not loaded by default. Reference-only marketing assets remain excluded unless separately adapted and licensed.

Operational tasks: monitor consented crash/save/bridge metrics, triage reproduction fixtures, validate new content migrations, repeat store requirement checks and maintain rights records. A live event or remote config cannot bypass durable reward idempotency or introduce unreviewed balance. No production infrastructure or messaging is created during planning.''')}
for stem,(title,body) in release.items():write('docs/release/'+stem+'.md',f'# {title}\n\n{body}\n\n## Traceability\n\n[Scope](../01_PROJECT_SCOPE.md) · [Execution order](../../plans/00_EXECUTION_ORDER.md) · [QA checklist](../qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Task index](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).')
