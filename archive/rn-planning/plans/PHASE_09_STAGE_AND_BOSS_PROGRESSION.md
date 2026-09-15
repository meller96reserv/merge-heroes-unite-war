# PHASE 09 — Stage And Boss Progression

## Goal
Implement waves boss farming and unlocks. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/gameplay/13_BOSS_SYSTEM.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)

## Inputs
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- `game-core/src/systems/BattleSystem.ts` — TASK-0102 predecessor

## Outputs
- `game-core/src/model/Stage.ts` — Stage definition graph
- `game-core/src/systems/StageSystem.ts` — Wave progression reducer
- `game-core/src/systems/StageRewardService.ts` — First-clear reward watermark
- `game-core/src/systems/BossSystem.ts` — Boss timer and tie rule
- `game-core/src/commands/RetryBoss.ts` — Boss failure and retry
- `game-core/src/systems/UnlockService.ts` — Unlock condition evaluator
- `app/src/ui/StageHud.ts` — Stage boss HUD presenter
- `game-core/tests/simulation/stage-boss.test.ts` — Stage boss acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0102](../tasks/TASKS_PHASE_08.md) — Battle tick pipeline

## Risks
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 09.1

[TASK-0111](../tasks/TASKS_PHASE_09.md) — Stage definition graph. Validate ordinal/world/waves/next and explicit boss/farm references with no unintended cycle. Required predecessors: TASK-0102.

### Step 09.2

[TASK-0112](../tasks/TASKS_PHASE_09.md) — Wave progression reducer. Advance after committed final death exactly once; ignore stale prior-encounter events. Required predecessors: TASK-0111.

### Step 09.3

[TASK-0113](../tasks/TASKS_PHASE_09.md) — First-clear reward watermark. Separate once-per-stage clear from repeat farm kill receipts and maintain monotonic highest ordinal. Required predecessors: TASK-0112.

### Step 09.4

[TASK-0114](../tasks/TASKS_PHASE_09.md) — Boss timer and tie rule. Use simulation time and explicit lethal-before-timeout policy; pause does not consume wall time. Required predecessors: TASK-0113.

### Step 09.5

[TASK-0115](../tasks/TASKS_PHASE_09.md) — Boss failure and retry. Return to configured farm state after failure and create new encounter sequence on manual retry. Required predecessors: TASK-0114.

### Step 09.6

[TASK-0116](../tasks/TASKS_PHASE_09.md) — Unlock condition evaluator. Evaluate stage/account/tier allOf/anyOf and persist unlocked/announced IDs once. Required predecessors: TASK-0115.

### Step 09.7

[TASK-0117](../tasks/TASKS_PHASE_09.md) — Stage boss HUD presenter. Display stage HP/timer/retry/farm states without inventing formula from Figma100label. Required predecessors: TASK-0116.

### Step 09.8

[TASK-0118](../tasks/TASKS_PHASE_09.md) — Stage boss acceptance. Test three-stage chain,timeout,win,tie,retry and save/reopen without duplicated first-clear reward. Required predecessors: TASK-0117.

## Files/directories expected to be created
- `game-core/src/model/Stage.ts`
- `game-core/src/systems/StageSystem.ts`
- `game-core/src/systems/StageRewardService.ts`
- `game-core/src/systems/BossSystem.ts`
- `game-core/src/commands/RetryBoss.ts`
- `game-core/src/systems/UnlockService.ts`
- `app/src/ui/StageHud.ts`
- `game-core/tests/simulation/stage-boss.test.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0111](../tasks/TASKS_PHASE_09.md) — Stage definition graph
- [TASK-0112](../tasks/TASKS_PHASE_09.md) — Wave progression reducer
- [TASK-0113](../tasks/TASKS_PHASE_09.md) — First-clear reward watermark
- [TASK-0114](../tasks/TASKS_PHASE_09.md) — Boss timer and tie rule
- [TASK-0115](../tasks/TASKS_PHASE_09.md) — Boss failure and retry
- [TASK-0116](../tasks/TASKS_PHASE_09.md) — Unlock condition evaluator
- [TASK-0117](../tasks/TASKS_PHASE_09.md) — Stage boss HUD presenter
- [TASK-0118](../tasks/TASKS_PHASE_09.md) — Stage boss acceptance
