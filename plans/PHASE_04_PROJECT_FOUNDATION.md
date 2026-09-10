# PHASE 04 — Project Foundation

## Goal
Establish one typed project foundation. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/technical/02_REPOSITORY_STRUCTURE.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

## Inputs
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `docs/adr/ADR-007-RN-SKIA-RUNTIME.md` — TASK-0252 predecessor

## Outputs
- `package.json` — React Native Expo application foundation
- `game-core/tsconfig.json` — Core TypeScript boundary
- `app/README.md` — Shared Skia game surface
- `game-core/src/config/ConfigLoader.ts` — Config loader validation
- `game-core/src/events/EventBus.ts` — Typed domain event bus
- `game-core/src/ports/index.ts` — Runtime ports and test fakes
- `tooling/ci/core-checks.md` — Core CI checks
- `app/src/debug/FixtureHarness.ts` — Web fixture harness

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0252](../tasks/TASKS_PHASE_00.md) — React Native Skia architecture consistency amendment

## Risks
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 04.1

[TASK-0047](../tasks/TASKS_PHASE_04.md) — React Native Expo application foundation. Pin an Expo-compatible RN/React/Skia/Reanimated/Worklets/Gesture Handler stack and npm lockfile; root npm run dev:web launches the shared RN application with verified Fast Refresh. Clean npm ci, typecheck and web export pass. Required predecessors: TASK-0252.

### Step 04.2

[TASK-0048](../tasks/TASKS_PHASE_04.md) — Core TypeScript boundary. Configure strict pure TypeScript core compilation without rendering/native/browser imports or globals; enforce dependency direction with a negative import fixture. Required predecessors: TASK-0047.

### Step 04.3

[TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface. Create the shared RN Skia game surface with browser CanvasKit startup, visible drawing, Gesture Handler interaction and Reanimated motion; native uses the same surface module. Required predecessors: TASK-0047.

### Step 04.4

[TASK-0050](../tasks/TASKS_PHASE_04.md) — Config loader validation. Validate schema then IDs/graphs/numeric bounds before domain creation; report exact file and field. Required predecessors: TASK-0048, TASK-0052.

### Step 04.5

[TASK-0051](../tasks/TASKS_PHASE_04.md) — Typed domain event bus. Dispatch immutable ordered batches; observer failure isolated and dispose idempotent. Required predecessors: TASK-0048.

### Step 04.6

[TASK-0052](../tasks/TASKS_PHASE_04.md) — Runtime ports and test fakes. Define Clock,RNG,SaveStore,Logger,Analytics interfaces with deterministic fake implementations. Required predecessors: TASK-0048.

### Step 04.7

[TASK-0053](../tasks/TASKS_PHASE_04.md) — Core CI checks. Implement reproducible typecheck/schema/core-test pipeline and attach clean-checkout result. Required predecessors: TASK-0050, TASK-0051.

### Step 04.8

[TASK-0054](../tasks/TASKS_PHASE_04.md) — Web fixture harness. Load named seed/clock/state and freeze animation markers; production build excludes debug routes. Required predecessors: TASK-0049, TASK-0050.

## Files/directories expected to be created
- `package.json`
- `game-core/tsconfig.json`
- `app/README.md`
- `game-core/src/config/ConfigLoader.ts`
- `game-core/src/events/EventBus.ts`
- `game-core/src/ports/index.ts`
- `tooling/ci/core-checks.md`
- `app/src/debug/FixtureHarness.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0047](../tasks/TASKS_PHASE_04.md) — React Native Expo application foundation
- [TASK-0048](../tasks/TASKS_PHASE_04.md) — Core TypeScript boundary
- [TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface
- [TASK-0050](../tasks/TASKS_PHASE_04.md) — Config loader validation
- [TASK-0051](../tasks/TASKS_PHASE_04.md) — Typed domain event bus
- [TASK-0052](../tasks/TASKS_PHASE_04.md) — Runtime ports and test fakes
- [TASK-0053](../tasks/TASKS_PHASE_04.md) — Core CI checks
- [TASK-0054](../tasks/TASKS_PHASE_04.md) — Web fixture harness

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0053: DEFERRED_POST_DELIVERY.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
