# PHASE 12 — Save And Offline

## Goal
Prove durable recovery and offline claims. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/technical/08_SAVE_SYSTEM.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)

## Inputs
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- `game-core/src/model/GameState.ts` — TASK-0071 predecessor
- `app/README.md` — TASK-0049 predecessor
- `game-core/src/ports/index.ts` — TASK-0052 predecessor
- `package.json` — TASK-0047 predecessor
- `game-core/src/systems/TransactionCoordinator.ts` — TASK-0073 predecessor
- `game-core/src/systems/SimulationClock.ts` — TASK-0077 predecessor
- `game-core/src/systems/RewardService.ts` — TASK-0074 predecessor

## Outputs
- `game-core/src/persistence/SaveCodec.ts` — Save envelope codec
- `app/src/platform/WebSaveStore.ts` — Web save adapter
- `app/src/platform/SaveStore.ts` — Native save adapter contract
- `game-core/src/persistence/SaveRecovery.ts` — Save candidate recovery
- `game-core/src/persistence/SaveCoordinator.ts` — Save checkpoint scheduling
- `game-core/src/persistence/Migrations.ts` — Save migration pipeline
- `game-core/tests/fixtures/save-migrations/README.md` — Migration fixture suite
- `game-core/src/systems/OfflineService.ts` — Offline interval calculator
- `game-core/src/commands/ReserveOffline.ts` — Offline entitlement reservation
- `game-core/src/commands/ClaimOffline.ts` — Offline claim transaction
- `game-core/src/persistence/ReceiptCompaction.ts` — Receipt compaction policy
- `game-core/tests/integration/save-crash.test.ts` — Save crash injection harness
- `app/src/platform/LifecycleCoordinator.ts` — Lifecycle save integration
- `tests/integration/save-offline.md` — Save offline acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0071](../tasks/TASKS_PHASE_06.md) — Normalized game state
- [TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface
- [TASK-0052](../tasks/TASKS_PHASE_04.md) — Runtime ports and test fakes
- [TASK-0047](../tasks/TASKS_PHASE_04.md) — React Native Expo application foundation
- [TASK-0073](../tasks/TASKS_PHASE_06.md) — Durable transaction coordinator
- [TASK-0077](../tasks/TASKS_PHASE_06.md) — Simulation clock
- [TASK-0074](../tasks/TASKS_PHASE_06.md) — Reward receipt service

## Risks
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 12.1

[TASK-0144](../tasks/TASKS_PHASE_12.md) — Save envelope codec. Canonical encode/decode schemaVersion/dataVersion/generation with checksum wrapper and strict validation. Required predecessors: TASK-0071.

### Step 12.2

[TASK-0145](../tasks/TASKS_PHASE_12.md) — Web save adapter. Implement isolated IndexedDB A/B candidate write/read/verify and injected quota failure. Required predecessors: TASK-0144, TASK-0049.

### Step 12.3

[TASK-0146](../tasks/TASKS_PHASE_12.md) — Native save adapter contract. Expose app-private atomic candidate transport with one writer and account/environment namespace. Required predecessors: TASK-0052, TASK-0047.

### Step 12.4

[TASK-0147](../tasks/TASKS_PHASE_12.md) — Save candidate recovery. Scan both generations,choose newest valid supported candidate and preserve corrupt bytes. Required predecessors: TASK-0144, TASK-0145.

### Step 12.5

[TASK-0148](../tasks/TASKS_PHASE_12.md) — Save checkpoint scheduling. Flush durable queue on lifecycle and coalesce only safe progress snapshots; expose backlog metrics. Required predecessors: TASK-0073, TASK-0147.

### Step 12.6

[TASK-0149](../tasks/TASKS_PHASE_12.md) — Save migration pipeline. Apply sequential pure migrations on backup draft and reject unknown future version without overwrite. Required predecessors: TASK-0148.

### Step 12.7

[TASK-0150](../tasks/TASKS_PHASE_12.md) — Migration fixture suite. Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format. Required predecessors: TASK-0149.

### Step 12.8

[TASK-0151](../tasks/TASKS_PHASE_12.md) — Offline interval calculator. Clamp negative/capped UTC elapsed and integer reward units without offline stage advancement in fixture. Required predecessors: TASK-0077.

### Step 12.9

[TASK-0152](../tasks/TASKS_PHASE_12.md) — Offline entitlement reservation. Persist stable from/to/grants pending claim before popup and avoid overlap with prior watermark. Required predecessors: TASK-0151, TASK-0074, TASK-0148.

### Step 12.10

[TASK-0153](../tasks/TASKS_PHASE_12.md) — Offline claim transaction. Grant pending entitlement once and advance watermark atomically across crash/retry. Required predecessors: TASK-0152.

### Step 12.11

[TASK-0154](../tasks/TASKS_PHASE_12.md) — Receipt compaction policy. Bound receipt history only when source watermarks prove old replay remains rejected. Required predecessors: TASK-0148, TASK-0147.

### Step 12.12

[TASK-0155](../tasks/TASKS_PHASE_12.md) — Save crash injection harness. Crash at each write/verify/install/event barrier and prove exact old-or-new economic state. Required predecessors: TASK-0154, TASK-0149.

### Step 12.13

[TASK-0156](../tasks/TASKS_PHASE_12.md) — Lifecycle save integration. Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation. Required predecessors: TASK-0047, TASK-0148.

### Step 12.14

[TASK-0157](../tasks/TASKS_PHASE_12.md) — Save offline acceptance. Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred. Required predecessors: TASK-0155, TASK-0156, TASK-0150.

## Files/directories expected to be created
- `game-core/src/persistence/SaveCodec.ts`
- `app/src/platform/WebSaveStore.ts`
- `app/src/platform/SaveStore.ts`
- `game-core/src/persistence/SaveRecovery.ts`
- `game-core/src/persistence/SaveCoordinator.ts`
- `game-core/src/persistence/Migrations.ts`
- `game-core/tests/fixtures/save-migrations/README.md`
- `game-core/src/systems/OfflineService.ts`
- `game-core/src/commands/ReserveOffline.ts`
- `game-core/src/commands/ClaimOffline.ts`
- `game-core/src/persistence/ReceiptCompaction.ts`
- `game-core/tests/integration/save-crash.test.ts`
- `app/src/platform/LifecycleCoordinator.ts`
- `tests/integration/save-offline.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0144](../tasks/TASKS_PHASE_12.md) — Save envelope codec
- [TASK-0145](../tasks/TASKS_PHASE_12.md) — Web save adapter
- [TASK-0146](../tasks/TASKS_PHASE_12.md) — Native save adapter contract
- [TASK-0147](../tasks/TASKS_PHASE_12.md) — Save candidate recovery
- [TASK-0148](../tasks/TASKS_PHASE_12.md) — Save checkpoint scheduling
- [TASK-0149](../tasks/TASKS_PHASE_12.md) — Save migration pipeline
- [TASK-0150](../tasks/TASKS_PHASE_12.md) — Migration fixture suite
- [TASK-0151](../tasks/TASKS_PHASE_12.md) — Offline interval calculator
- [TASK-0152](../tasks/TASKS_PHASE_12.md) — Offline entitlement reservation
- [TASK-0153](../tasks/TASKS_PHASE_12.md) — Offline claim transaction
- [TASK-0154](../tasks/TASKS_PHASE_12.md) — Receipt compaction policy
- [TASK-0155](../tasks/TASKS_PHASE_12.md) — Save crash injection harness
- [TASK-0156](../tasks/TASKS_PHASE_12.md) — Lifecycle save integration
- [TASK-0157](../tasks/TASKS_PHASE_12.md) — Save offline acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0151: DEFERRED_POST_DELIVERY.
- TASK-0152: DEFERRED_POST_DELIVERY.
- TASK-0153: DEFERRED_POST_DELIVERY.
- TASK-0148: SUPPORTING_REQUIRED.
- TASK-0149: DEFERRED_POST_DELIVERY.
- TASK-0150: DEFERRED_POST_DELIVERY.
- TASK-0154: DEFERRED_POST_DELIVERY.
- TASK-0155: DEFERRED_POST_DELIVERY.
- TASK-0156: SUPPORTING_REQUIRED.
- TASK-0157: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
