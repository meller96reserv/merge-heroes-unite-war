# PHASE 06 — Core Game State

## Goal
Implement deterministic state and durable transaction ports. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/technical/03_DOMAIN_GAME_CORE.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json)

## Inputs
- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/tsconfig.json` — TASK-0048 predecessor
- `game-core/src/ports/index.ts` — TASK-0052 predecessor
- `game-core/src/events/EventBus.ts` — TASK-0051 predecessor
- `app/src/ui/GameButton.ts` — TASK-0058 predecessor
- `app/README.md` — TASK-0049 predecessor

## Outputs
- `game-core/src/model/Amount.ts` — Amount value type
- `game-core/src/model/GameState.ts` — Normalized game state
- `game-core/src/commands/Dispatcher.ts` — Command dispatcher
- `game-core/src/systems/TransactionCoordinator.ts` — Durable transaction coordinator
- `game-core/src/systems/RewardService.ts` — Reward receipt service
- `game-core/src/ports/SeededRng.ts` — Seeded RNG streams
- `game-core/src/selectors/index.ts` — Game state selectors
- `game-core/src/systems/SimulationClock.ts` — Simulation clock
- `app/src/input/InputRouter.ts` — Input router
- `game-core/tests/unit/state-invariants.test.ts` — State invariant tests
- `game-core/tests/simulation/replay.test.ts` — Core replay harness

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0048](../tasks/TASKS_PHASE_04.md) — Core TypeScript boundary
- [TASK-0052](../tasks/TASKS_PHASE_04.md) — Runtime ports and test fakes
- [TASK-0051](../tasks/TASKS_PHASE_04.md) — Typed domain event bus
- [TASK-0058](../tasks/TASKS_PHASE_05.md) — Reusable button states
- [TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface

## Risks
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 06.1

[TASK-0070](../tasks/TASKS_PHASE_06.md) — Amount value type. Implement bigint arithmetic with canonical decimal serialization and exact huge-value comparisons. Required predecessors: TASK-0048, TASK-0052.

### Step 06.2

[TASK-0071](../tasks/TASKS_PHASE_06.md) — Normalized game state. Define state groups and owned/deployed/board invariants matching save schema; keep ViewState separate. Required predecessors: TASK-0070.

### Step 06.3

[TASK-0072](../tasks/TASKS_PHASE_06.md) — Command dispatcher. Validate commandId/revision,queue reentrant commands and return typed rejection without state/RNG mutation. Required predecessors: TASK-0071, TASK-0051.

### Step 06.4

[TASK-0073](../tasks/TASKS_PHASE_06.md) — Durable transaction coordinator. Persist draft grant/debit/receipt/watermark before install/events; save failure retains old authoritative state. Unit tests use fault-injectable SaveStore ports;real web/native durability is a phase12 gate before playable purchase/merge acceptance. Required predecessors: TASK-0072, TASK-0052.

### Step 06.5

[TASK-0074](../tasks/TASKS_PHASE_06.md) — Reward receipt service. Apply configured grant kinds once per source token and return cached outcome for duplicates. Required predecessors: TASK-0073.

### Step 06.6

[TASK-0075](../tasks/TASKS_PHASE_06.md) — Seeded RNG streams. Separate combat/reward/presentation streams and serialize authoritative RNG state where required by replay policy. Required predecessors: TASK-0052.

### Step 06.7

[TASK-0076](../tasks/TASKS_PHASE_06.md) — Game state selectors. Derive affordability,board occupancy,DPS display and claimability without mutation or reparsing labels. Required predecessors: TASK-0071.

### Step 06.8

[TASK-0077](../tasks/TASKS_PHASE_06.md) — Simulation clock. Implement proposed50msstep,max5catchup and explicit suspend; split-tick tests remain deterministic. Required predecessors: TASK-0052.

### Step 06.9

[TASK-0078](../tasks/TASKS_PHASE_06.md) — Input router. Capture one pointer owner with modal/tutorial priority and consume closing pointer-up. Required predecessors: TASK-0058, TASK-0049.

### Step 06.10

[TASK-0079](../tasks/TASKS_PHASE_06.md) — State invariant tests. Generate valid boards and command sequences; prove balance ownership ID and watermark invariants. Required predecessors: TASK-0074, TASK-0076, TASK-0075, TASK-0077.

### Step 06.11

[TASK-0080](../tasks/TASKS_PHASE_06.md) — Core replay harness. Replay same seed/commands at varied render cadence and compare final hash/events. Required predecessors: TASK-0079, TASK-0077.

## Files/directories expected to be created
- `game-core/src/model/Amount.ts`
- `game-core/src/model/GameState.ts`
- `game-core/src/commands/Dispatcher.ts`
- `game-core/src/systems/TransactionCoordinator.ts`
- `game-core/src/systems/RewardService.ts`
- `game-core/src/ports/SeededRng.ts`
- `game-core/src/selectors/index.ts`
- `game-core/src/systems/SimulationClock.ts`
- `app/src/input/InputRouter.ts`
- `game-core/tests/unit/state-invariants.test.ts`
- `game-core/tests/simulation/replay.test.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0070](../tasks/TASKS_PHASE_06.md) — Amount value type
- [TASK-0071](../tasks/TASKS_PHASE_06.md) — Normalized game state
- [TASK-0072](../tasks/TASKS_PHASE_06.md) — Command dispatcher
- [TASK-0073](../tasks/TASKS_PHASE_06.md) — Durable transaction coordinator
- [TASK-0074](../tasks/TASKS_PHASE_06.md) — Reward receipt service
- [TASK-0075](../tasks/TASKS_PHASE_06.md) — Seeded RNG streams
- [TASK-0076](../tasks/TASKS_PHASE_06.md) — Game state selectors
- [TASK-0077](../tasks/TASKS_PHASE_06.md) — Simulation clock
- [TASK-0078](../tasks/TASKS_PHASE_06.md) — Input router
- [TASK-0079](../tasks/TASKS_PHASE_06.md) — State invariant tests
- [TASK-0080](../tasks/TASKS_PHASE_06.md) — Core replay harness

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0080: DEFERRED_POST_DELIVERY.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
