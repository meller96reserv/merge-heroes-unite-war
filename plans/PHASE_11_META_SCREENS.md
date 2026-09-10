# PHASE 11 — Meta Screens

## Goal
Implement claims navigation and settings. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/11_NAVIGATION_FLOW.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [07_QUESTS.md](../docs/progression/07_QUESTS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [17_TUTORIAL_SYSTEM.md](../docs/gameplay/17_TUTORIAL_SYSTEM.md)

## Inputs
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [07_QUESTS.md](../docs/progression/07_QUESTS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- [17_TUTORIAL_SYSTEM.md](../docs/gameplay/17_TUTORIAL_SYSTEM.md)
- `tests/integration/save-offline.md` — TASK-0157 predecessor
- `app/src/components/BottomNavigation.tsx` — TASK-0061 predecessor
- `app/src/input/InputRouter.ts` — TASK-0078 predecessor
- `app/src/components/DailyRewardPanel.tsx` — TASK-0066 predecessor
- `app/src/components/WheelPanel.tsx` — TASK-0068 predecessor

## Outputs
- `app/src/ui/NavigationCoordinator.ts` — Route and popup coordinator
- `app/src/ui/SettingsController.ts` — Settings persistence binding
- `game-core/src/systems/QuestService.ts` — Quest event reducer
- `game-core/src/commands/ClaimQuest.ts` — Quest claim transaction
- `game-core/src/selectors/RedDots.ts` — Red-dot selectors
- `game-core/src/systems/DailyService.ts` — Daily period service
- `game-core/src/commands/ClaimDaily.ts` — Daily claim transaction
- `app/src/ui/DailyPanel.ts` — Daily panel binding
- `game-core/src/systems/WheelOutcome.ts` — Wheel outcome selector
- `game-core/src/commands/ReserveSpin.ts` — Wheel reserve transaction
- `game-core/src/commands/CompleteSpin.ts` — Wheel claim transaction
- `app/src/ui/WheelController.ts` — Wheel panel controller
- `app/src/ui/RewardPopupController.ts` — Quest and offline popup binding
- `game-core/src/systems/TutorialService.ts` — Tutorial step reducer
- `app/src/ui/TutorialOverlay.ts` — Tutorial input mask
- `tests/integration/meta-lifecycle.md` — Meta lifecycle acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0157](../tasks/TASKS_PHASE_12.md) — Save offline acceptance
- [TASK-0061](../tasks/TASKS_PHASE_05.md) — Bottom navigation fixture
- [TASK-0078](../tasks/TASKS_PHASE_06.md) — Input router
- [TASK-0066](../tasks/TASKS_PHASE_05.md) — Daily reward static fixtures
- [TASK-0068](../tasks/TASKS_PHASE_05.md) — Wheel static fixtures

## Risks
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 11.1

[TASK-0128](../tasks/TASKS_PHASE_11.md) — Route and popup coordinator. One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor. Required predecessors: TASK-0061, TASK-0078.

### Step 11.2

[TASK-0129](../tasks/TASKS_PHASE_11.md) — Settings persistence binding. Persist music/SFX/haptics/reduced motion preferences and apply settings revision ordering. Required predecessors: TASK-0128.

### Step 11.3

[TASK-0130](../tasks/TASKS_PHASE_11.md) — Quest event reducer. Count committed deduplicated source events and expose complete/unclaimed/claimed states. Required predecessors: TASK-0129.

### Step 11.4

[TASK-0131](../tasks/TASKS_PHASE_11.md) — Quest claim transaction. Grant reward and advance quest/reset marker once through durable coordinator. Required predecessors: TASK-0130.

### Step 11.5

[TASK-0132](../tasks/TASKS_PHASE_11.md) — Red-dot selectors. Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system. Required predecessors: TASK-0117, TASK-0129.

### Step 11.6

[TASK-0133](../tasks/TASKS_PHASE_11.md) — Daily period service. One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required. Required predecessors: TASK-0077.

### Step 11.7

[TASK-0134](../tasks/TASKS_PHASE_11.md) — Daily claim transaction. Credit configured day reward and watermark atomically; double tap/reopen same day cannot regrant. Required predecessors: TASK-0133.

### Step 11.8

[TASK-0135](../tasks/TASKS_PHASE_11.md) — Daily panel binding. Render available/claimed/loading/error variants and Figma chest layout with actual reward values. Required predecessors: TASK-0066, TASK-0134.

### Step 11.9

[TASK-0136](../tasks/TASKS_PHASE_11.md) — Wheel outcome selector. Validate weights/segment mapping and select using reward RNG once per stable spin ID; keep12-hour cooldown and proposed weights distinct from observed reference. Required predecessors: TASK-0075, TASK-0074, TASK-0050.

### Step 11.10

[TASK-0137](../tasks/TASKS_PHASE_11.md) — Wheel reserve transaction. Reserve one eligible free spin and pending outcome atomically; set nextFreeAt to reservationUTC+12hours and never reroll a pending result. Required predecessors: TASK-0136.

### Step 11.11

[TASK-0138](../tasks/TASKS_PHASE_11.md) — Wheel claim transaction. Claim the saved wheel outcome exactly once only after confirmed rewarded completion for its operation; reject dismissal,missing,wrong,stale or duplicate results. Required predecessors: TASK-0137, TASK-0254.

### Step 11.12

[TASK-0139](../tasks/TASKS_PHASE_11.md) — Wheel panel controller. Animate to the saved segment with slowing motion/audio; show12-hour entry/panel timers, pulsing Tap and Watch & Claim; retain pending result across ad failure/reopen. Required predecessors: TASK-0138, TASK-0068.

### Step 11.13

[TASK-0140](../tasks/TASKS_PHASE_11.md) — Quest and offline popup binding. Display pending entitlements and invoke stable claim IDs; closing animation never credits. Required predecessors: TASK-0139.

### Step 11.14

[TASK-0141](../tasks/TASKS_PHASE_11.md) — Tutorial step reducer. Persist completion version and advance only on committed matching events; skip policy explicit. Required predecessors: TASK-0140.

### Step 11.15

[TASK-0142](../tasks/TASKS_PHASE_11.md) — Tutorial input mask. Allow only named target,position hand responsively and clean mask on route change/restart. Required predecessors: TASK-0141.

### Step 11.16

[TASK-0143](../tasks/TASKS_PHASE_11.md) — Meta lifecycle acceptance. One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance. Required predecessors: TASK-0129, TASK-0135, TASK-0139, TASK-0128.


[TASK-0254](../tasks/TASKS_PHASE_11.md) — Rewarded operation authority. Persist placement/operation/outcome and consume confirmed provider completion once; reject skipped,failed,unavailable,stale,duplicate and wrong-operation callbacks. Required predecessors: TASK-0074, TASK-0077.


[TASK-0255](../tasks/TASKS_PHASE_11.md) — Free coins rewarded claim. Grant exactly1000gold per unique completed shop video with no cooldown; unlimited separate videos,zero grant on cancellation and durable failure retry without duplication. Required predecessors: TASK-0254.


[TASK-0256](../tasks/TASKS_PHASE_11.md) — Stage reward multiplier claim. Reserve one x1–x10 multiplier per eligible successful stage token; grant only bonus above already committed base after rewarded completion; duplicate/reload/save failure cannot reroll or repay. Required predecessors: TASK-0254, TASK-0107.


[TASK-0257](../tasks/TASKS_PHASE_11.md) — Rewarded shop wheel and win UI. Wire Free coins,Watch & Claim and2s Boost Reward; run1.5s multiplier wheel then Claim video; show busy/cancel/no-fill/retry states without dead taps or animation-owned rewards. Required predecessors: TASK-0255, TASK-0256, TASK-0139, TASK-0061.

## Files/directories expected to be created
- `app/src/ui/NavigationCoordinator.ts`
- `app/src/ui/SettingsController.ts`
- `game-core/src/systems/QuestService.ts`
- `game-core/src/commands/ClaimQuest.ts`
- `game-core/src/selectors/RedDots.ts`
- `game-core/src/systems/DailyService.ts`
- `game-core/src/commands/ClaimDaily.ts`
- `app/src/ui/DailyPanel.ts`
- `game-core/src/systems/WheelOutcome.ts`
- `game-core/src/commands/ReserveSpin.ts`
- `game-core/src/commands/CompleteSpin.ts`
- `app/src/ui/WheelController.ts`
- `app/src/ui/RewardPopupController.ts`
- `game-core/src/systems/TutorialService.ts`
- `app/src/ui/TutorialOverlay.ts`
- `tests/integration/meta-lifecycle.md`

- `game-core/src/rewards/RewardedOperation.ts`

- `game-core/src/commands/ClaimFreeCoins.ts`

- `game-core/src/commands/ClaimStageBoost.ts`

- `app/src/rewards/RewardedController.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

## Manual validation procedure
Open each output from this phase, reproduce its named input/scenario, compare expected/actual behavior and retain evidence. For interactive outputs exercise success,disabled/locked,pending,error and interrupted states; for research verify source/time/version and uncertainty.

## Performance checks
Measure any changed native/render/storage hot path against [budgets](../docs/technical/14_PERFORMANCE_BUDGET.md). Documentation/research-only outputs need reproducible generation and bounded artifact size; they cannot claim runtime performance pass.

## Visual checks
Use source screen IDs and [visual protocol](../docs/qa/05_VISUAL_REGRESSION.md) for rendered outputs. Keep exact Figma and15-slot adaptation baselines separate. Nonvisual outputs need readable evidence/diagnostics, not screenshot-only assertions.

## Android checks
For native/runtime changes run relevant device/harness cases and attach actual build/OS results. Pure-domain/research tasks use platform-independent tests; Android acceptance remains in native/device tasks and is never inferred from web.

## iOS checks
Run equivalent native cases or record the precise environment blocker. Simulator success does not substitute for physical audio/performance. No Android-only result closes a both-platform gate.

## Web-preview checks
Use the same RN/Skia/core implementation with deterministic fixtures. Verify preview-specific storage/audio unlock and viewport behavior where affected; Web and native share gameplay, assets and Skia composition.

## Failure/rollback strategy
Keep prior valid source/config/save generation. Revert only the bounded implementation changes on its branch, preserving user edits and captured evidence. Failed durable commands retain old state; failed schema migration preserves backup; failed native checks remain open in their owning tasks and gate release.

## Definition of Done
All in-scope task oracles pass; artifacts,source docs,schemas and tests agree; evidence links resolve; no task hides unresolved work behind a generic TODO. Optional excludedP2work is explicitly classified.

## Exit criteria
Dependent tasks can consume the listed outputs with named versions and accepted gates. Release/runtime feasibility is claimed only where actual execution evidence exists. Update task manifest and phase result with accepted/not-run/blocked distinctions.

## Tasks generated from this phase
- [TASK-0128](../tasks/TASKS_PHASE_11.md) — Route and popup coordinator
- [TASK-0129](../tasks/TASKS_PHASE_11.md) — Settings persistence binding
- [TASK-0130](../tasks/TASKS_PHASE_11.md) — Quest event reducer
- [TASK-0131](../tasks/TASKS_PHASE_11.md) — Quest claim transaction
- [TASK-0132](../tasks/TASKS_PHASE_11.md) — Red-dot selectors
- [TASK-0133](../tasks/TASKS_PHASE_11.md) — Daily period service
- [TASK-0134](../tasks/TASKS_PHASE_11.md) — Daily claim transaction
- [TASK-0135](../tasks/TASKS_PHASE_11.md) — Daily panel binding
- [TASK-0136](../tasks/TASKS_PHASE_11.md) — Wheel outcome selector
- [TASK-0137](../tasks/TASKS_PHASE_11.md) — Wheel reserve transaction
- [TASK-0138](../tasks/TASKS_PHASE_11.md) — Wheel claim transaction
- [TASK-0139](../tasks/TASKS_PHASE_11.md) — Wheel panel controller
- [TASK-0140](../tasks/TASKS_PHASE_11.md) — Quest and offline popup binding
- [TASK-0141](../tasks/TASKS_PHASE_11.md) — Tutorial step reducer
- [TASK-0142](../tasks/TASKS_PHASE_11.md) — Tutorial input mask
- [TASK-0143](../tasks/TASKS_PHASE_11.md) — Meta lifecycle acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0130: DEFERRED_POST_DELIVERY.
- TASK-0131: DEFERRED_POST_DELIVERY.
- TASK-0140: DEFERRED_POST_DELIVERY.
- TASK-0141: DEFERRED_POST_DELIVERY.
- TASK-0142: DEFERRED_POST_DELIVERY.
- TASK-0129: REQUIRED_NOW.
- TASK-0134: REQUIRED_NOW.
- TASK-0135: REQUIRED_NOW.
- TASK-0136: REQUIRED_NOW.
- TASK-0137: REQUIRED_NOW.
- TASK-0138: REQUIRED_NOW.
- TASK-0139: REQUIRED_NOW.
- TASK-0254: REQUIRED_NOW.
- TASK-0255: REQUIRED_NOW.
- TASK-0256: REQUIRED_NOW.
- TASK-0257: REQUIRED_NOW.
- TASK-0128: SUPPORTING_REQUIRED.
- TASK-0132: SUPPORTING_REQUIRED.
- TASK-0133: SUPPORTING_REQUIRED.
- TASK-0143: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
