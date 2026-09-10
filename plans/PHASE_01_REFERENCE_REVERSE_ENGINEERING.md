# PHASE 01 — Reference Reverse Engineering

## Goal
Close behavior-specific evidence gates. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md) · [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [07_QUESTS.md](../docs/progression/07_QUESTS.md) · [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md)

## Inputs
- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md)
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- [07_QUESTS.md](../docs/progression/07_QUESTS.md)
- [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md)
- `analysis/reports/fidelity_gates.json` — TASK-0004 predecessor

## Outputs
- `analysis/reference/version_lock.json` — Reference version lock
- `analysis/reference/auto_unlock_capture.md` — Auto-merge unlock capture
- `analysis/reference/auto_order_cases.csv` — Auto-merge ordering
- `analysis/reference/purchase_cost_series.csv` — Purchase cost measurements
- `analysis/reference/purchase_input_cases.csv` — Input purchase capture
- `analysis/reference/combat_samples.csv` — Combat balance measurements
- `analysis/reference/targeting_cases.md` — Targeting capture
- `analysis/reference/boss_cases.csv` — Boss observations
- `analysis/reference/reward_catalogue.csv` — Reward catalogue
- `analysis/reference/offline_cases.csv` — Offline measurements
- `analysis/reference/save_reload_cases.md` — Save behavior capture
- `analysis/reference/daily_cases.md` — Daily reward observations
- `analysis/reference/wheel_cases.md` — Wheel observations
- `analysis/reference/equipment_cases.csv` — Equipment observations
- `analysis/reference/quest_cases.csv` — Quest observations
- `analysis/reference/recovery_cases.md` — Death recovery capture
- `analysis/reference/deployment_cases.md` — Deployment capture
- `analysis/reference/unlock_cases.csv` — Unlock capture
- `analysis/reference/lifecycle_cases.md` — Lifecycle capture
- `analysis/reference/skills_cases.md` — Skills capture

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0004](../tasks/TASKS_PHASE_00.md) — Fidelity gate registry

## Risks
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 01.1

[TASK-0005](../tasks/TASKS_PHASE_01.md) — Reference version lock. Confirm LIVE_CRAZY3.16.2 screenshot and capture mobile versions separately; no cross-version formula mixing. Required predecessors: TASK-0004.

### Step 01.2

[TASK-0006](../tasks/TASKS_PHASE_01.md) — Auto-merge unlock capture. Finish tutorial and inspect reachable boosts/settings; record activation cost duration and availability or bounded access blocker. Required predecessors: TASK-0004, TASK-0005.

### Step 01.3

[TASK-0007](../tasks/TASKS_PHASE_01.md) — Auto-merge ordering. Capture five repeats each of [1,1,2],[1,1,1,1],disjoint pairs and max tier; establish pair order and destination only from outcomes. Required predecessors: TASK-0006, TASK-0005.

### Step 01.4

[TASK-0008](../tasks/TASKS_PHASE_01.md) — Purchase cost measurements. Record thirty sequential prices with no active farming; compare before/after currency and fit residuals separately. Required predecessors: TASK-0004, TASK-0005.

### Step 01.5

[TASK-0009](../tasks/TASKS_PHASE_01.md) — Input purchase capture. Test tap,20rapid taps,2s hold,cancel and full board; count accepted buys and tier advance rules. Required predecessors: TASK-0004, TASK-0005.

### Step 01.6

[TASK-0010](../tasks/TASKS_PHASE_01.md) — Combat balance measurements. Record twenty hits per tier/target with release impact crit/defense labels separated; include video PTS and uncertainty. Required predecessors: TASK-0004, TASK-0005.

### Step 01.7

[TASK-0011](../tasks/TASKS_PHASE_01.md) — Targeting capture. Observe multiple targets and a target dying during projectile flight; distinguish selection from renderer travel. Required predecessors: TASK-0004, TASK-0005.

### Step 01.8

[TASK-0012](../tasks/TASKS_PHASE_01.md) — Boss observations. Capture three boss entries,one timeout,one win and manual retry; record timer HP rewards and farm destination. Required predecessors: TASK-0004, TASK-0005.

### Step 01.9

[TASK-0013](../tasks/TASKS_PHASE_01.md) — Reward catalogue. Separate kill,first-clear,discovery and repeated-tier rewards; preserve tier2+10gold and tier3+1000gold as distinct observed cases. Required predecessors: TASK-0004, TASK-0005.

### Step 01.10

[TASK-0014](../tasks/TASKS_PHASE_01.md) — Offline measurements. Compare60s/10m/2h/24h absent intervals,stage/balance and repeated claim; do not substitute foreground farming. Required predecessors: TASK-0004, TASK-0005.

### Step 01.11

[TASK-0015](../tasks/TASKS_PHASE_01.md) — Save behavior capture. Reload after purchase/merge/claim and compare visible board/balances; describe bounded reference persistence observations. Required predecessors: TASK-0004, TASK-0005.

### Step 01.12

[TASK-0016](../tasks/TASKS_PHASE_01.md) — Daily reward observations. Record calendar vs Figma chest conflict,claim/double claim/reset/missed day semantics or concrete waiting limitation. Required predecessors: TASK-0004, TASK-0005.

### Step 01.13

[TASK-0017](../tasks/TASKS_PHASE_01.md) — Wheel observations. Locate live wheel or record bounded absence; capture free/paid/cooldown states and disclosed weights without paid spins. Required predecessors: TASK-0004, TASK-0005.

### Step 01.14

[TASK-0018](../tasks/TASKS_PHASE_01.md) — Equipment observations. Capture owned item equip/swap/enhance before/after on two heroes and distinguish reference system from Figma associations. Required predecessors: TASK-0004, TASK-0005.

### Step 01.15

[TASK-0019](../tasks/TASKS_PHASE_01.md) — Quest observations. Record first two quest conditions/reward icon meanings and claim idempotency; ongoing farm deltas excluded. Required predecessors: TASK-0004, TASK-0005.

### Step 01.16

[TASK-0020](../tasks/TASKS_PHASE_01.md) — Death recovery capture. Inspect normal versus Legendary mode attacks,hero HP/death/recovery; no permanent loss rule without evidence. Required predecessors: TASK-0004, TASK-0005.

### Step 01.17

[TASK-0021](../tasks/TASKS_PHASE_01.md) — Deployment capture. Test cap,tap withdrawal,drag replacement and merge involving deployed units; preserve owned board identity. Required predecessors: TASK-0004, TASK-0005.

### Step 01.18

[TASK-0022](../tasks/TASKS_PHASE_01.md) — Unlock capture. Cross account/hero/stage thresholds and identify labels2/3/4/6/10 and31/101/401/601 with screenshots. Required predecessors: TASK-0004, TASK-0005.

### Step 01.19

[TASK-0023](../tasks/TASKS_PHASE_01.md) — Lifecycle capture. Compare settings and another meta route10s,then background/lock/resume; identify which clocks continue. Required predecessors: TASK-0004, TASK-0005.

### Step 01.20

[TASK-0024](../tasks/TASKS_PHASE_01.md) — Skills capture. Capture reachable skill details,cooldown,target/status stacking and mode availability; unresolved content remains gated. Required predecessors: TASK-0004, TASK-0005.

## Files/directories expected to be created
- `analysis/reference/version_lock.json`
- `analysis/reference/auto_unlock_capture.md`
- `analysis/reference/auto_order_cases.csv`
- `analysis/reference/purchase_cost_series.csv`
- `analysis/reference/purchase_input_cases.csv`
- `analysis/reference/combat_samples.csv`
- `analysis/reference/targeting_cases.md`
- `analysis/reference/boss_cases.csv`
- `analysis/reference/reward_catalogue.csv`
- `analysis/reference/offline_cases.csv`
- `analysis/reference/save_reload_cases.md`
- `analysis/reference/daily_cases.md`
- `analysis/reference/wheel_cases.md`
- `analysis/reference/equipment_cases.csv`
- `analysis/reference/quest_cases.csv`
- `analysis/reference/recovery_cases.md`
- `analysis/reference/deployment_cases.md`
- `analysis/reference/unlock_cases.csv`
- `analysis/reference/lifecycle_cases.md`
- `analysis/reference/skills_cases.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0005](../tasks/TASKS_PHASE_01.md) — Reference version lock
- [TASK-0006](../tasks/TASKS_PHASE_01.md) — Auto-merge unlock capture
- [TASK-0007](../tasks/TASKS_PHASE_01.md) — Auto-merge ordering
- [TASK-0008](../tasks/TASKS_PHASE_01.md) — Purchase cost measurements
- [TASK-0009](../tasks/TASKS_PHASE_01.md) — Input purchase capture
- [TASK-0010](../tasks/TASKS_PHASE_01.md) — Combat balance measurements
- [TASK-0011](../tasks/TASKS_PHASE_01.md) — Targeting capture
- [TASK-0012](../tasks/TASKS_PHASE_01.md) — Boss observations
- [TASK-0013](../tasks/TASKS_PHASE_01.md) — Reward catalogue
- [TASK-0014](../tasks/TASKS_PHASE_01.md) — Offline measurements
- [TASK-0015](../tasks/TASKS_PHASE_01.md) — Save behavior capture
- [TASK-0016](../tasks/TASKS_PHASE_01.md) — Daily reward observations
- [TASK-0017](../tasks/TASKS_PHASE_01.md) — Wheel observations
- [TASK-0018](../tasks/TASKS_PHASE_01.md) — Equipment observations
- [TASK-0019](../tasks/TASKS_PHASE_01.md) — Quest observations
- [TASK-0020](../tasks/TASKS_PHASE_01.md) — Death recovery capture
- [TASK-0021](../tasks/TASKS_PHASE_01.md) — Deployment capture
- [TASK-0022](../tasks/TASKS_PHASE_01.md) — Unlock capture
- [TASK-0023](../tasks/TASKS_PHASE_01.md) — Lifecycle capture
- [TASK-0024](../tasks/TASKS_PHASE_01.md) — Skills capture

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0007: DEFERRED_POST_DELIVERY.
- TASK-0010: DEFERRED_POST_DELIVERY.
- TASK-0011: DEFERRED_POST_DELIVERY.
- TASK-0012: DEFERRED_POST_DELIVERY.
- TASK-0013: DEFERRED_POST_DELIVERY.
- TASK-0014: DEFERRED_POST_DELIVERY.
- TASK-0015: DEFERRED_POST_DELIVERY.
- TASK-0016: DEFERRED_POST_DELIVERY.
- TASK-0017: DEFERRED_POST_DELIVERY.
- TASK-0018: DEFERRED_POST_DELIVERY.
- TASK-0019: DEFERRED_POST_DELIVERY.
- TASK-0020: DEFERRED_POST_DELIVERY.
- TASK-0021: DEFERRED_POST_DELIVERY.
- TASK-0022: DEFERRED_POST_DELIVERY.
- TASK-0023: DEFERRED_POST_DELIVERY.
- TASK-0024: DEFERRED_POST_DELIVERY.
