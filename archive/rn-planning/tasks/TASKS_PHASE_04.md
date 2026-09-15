# Atomic tasks — phase 04

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_04_PROJECT_FOUNDATION.md).

<a id="task-0047"></a>
## TASK-0047 — React Native Expo application foundation

Phase: 04 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0252](TASKS_PHASE_00.md) — React Native Skia architecture consistency amendment

Parallelization: Allowed after listed dependencies; exclusive ownership of package.json. Integrate shared registries coherently.

Evidence: [README.md](../analysis/reports/foundation/README.md), [browser.json](../analysis/reports/foundation/browser.json), [production-browser.json](../analysis/reports/foundation/production-browser.json), [toolchain.json](../analysis/reports/foundation/toolchain.json).

### Goal
Pin an Expo-compatible RN/React/Skia/Reanimated/Worklets/Gesture Handler stack and npm lockfile; root npm run dev:web launches the shared RN application with verified Fast Refresh. Clean npm ci, typecheck and web export pass.

### Context
Bounded react native expo application foundation deliverable. Authoritative output: `package.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

### Files expected to create
- `package.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Pin an Expo-compatible RN/React/Skia/Reanimated/Worklets/Gesture Handler stack and npm lockfile; root npm run dev:web launches the shared RN application with verified Fast Refresh. Clean npm ci, typecheck and web export pass.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Existing repository/user edits preserved; occupied dev port; missing CanvasKit; browser load failure; no research assets in bundle.

### Test cases
Clean lockfile install; Expo version compatibility; TypeScript; production web export; actual browser boot and state-preserving Fast Refresh. Native builds remain TASK-0202/0203.

### Manual verification
Exercise `package.json` through the smallest relevant RN/Skia/core/platform harness. Pin an Expo-compatible RN/React/Skia/Reanimated/Worklets/Gesture Handler stack and npm lockfile; root npm run dev:web launches the shared RN application with verified Fast Refresh. Clean npm ci, typecheck and web export pass. Record platform limitations separately.

### Acceptance criteria
- Pin an Expo-compatible RN/React/Skia/Reanimated/Worklets/Gesture Handler stack and npm lockfile; root npm run dev:web launches the shared RN application with verified Fast Refresh. Clean npm ci, typecheck and web export pass.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0048"></a>
## TASK-0048 — Core TypeScript boundary

Phase: 04 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0047](TASKS_PHASE_04.md) — React Native Expo application foundation

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/tsconfig.json. Integrate shared registries coherently.

Evidence: [README.md](../analysis/reports/core-boundary/README.md), [test-boundary.mjs](../tooling/core/test-boundary.mjs).

### Goal
Configure strict pure TypeScript core compilation without rendering/native/browser imports or globals; enforce dependency direction with a negative import fixture.

### Context
Bounded core typescript boundary deliverable. Authoritative output: `game-core/tsconfig.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `package.json` — dependency output

### Files expected to create
- `game-core/tsconfig.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Configure strict pure TypeScript core compilation without rendering/native/browser imports or globals; enforce dependency direction with a negative import fixture.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser.

### Test cases
Compile the pure core; reject deliberately injected React Native, Skia, DOM and application imports without leaving invalid fixtures in source.

### Manual verification
Exercise `game-core/tsconfig.json` through the smallest relevant RN/Skia/core/platform harness. Configure strict pure TypeScript core compilation without rendering/native/browser imports or globals; enforce dependency direction with a negative import fixture. Record platform limitations separately.

### Acceptance criteria
- Configure strict pure TypeScript core compilation without rendering/native/browser imports or globals; enforce dependency direction with a negative import fixture.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0049"></a>
## TASK-0049 — Shared Skia game surface

Phase: 04 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0047](TASKS_PHASE_04.md) — React Native Expo application foundation

Parallelization: Allowed after listed dependencies; exclusive ownership of app/README.md. Integrate shared registries coherently.

Evidence: [README.md](../app/README.md), [README.md](../analysis/reports/skia-surface/README.md), [browser.json](../analysis/reports/skia-surface/browser.json), [browser.json](../analysis/reports/skia-surface/production/browser.json), [browser.json](../analysis/reports/skia-surface/bootstrap/browser.json), [source-hashes.json](../analysis/reports/skia-surface/source-hashes.json).

### Goal
Create the shared RN Skia game surface with browser CanvasKit startup, visible drawing, Gesture Handler interaction and Reanimated motion; native uses the same surface module.

### Context
Bounded shared skia game surface deliverable. Authoritative output: `app/README.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `package.json` — dependency output

### Files expected to create
- `app/README.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Create the shared RN Skia game surface with browser CanvasKit startup, visible drawing, Gesture Handler interaction and Reanimated motion; native uses the same surface module.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Async WASM load/retry; repeated mount; browser resize; cancelled gesture; same shared presentation source on all platforms.

### Test cases
Actual browser renders Skia Canvas; pointer interaction and Reanimated movement change pixels; resize remains visible; missing WASM yields recoverable error. Typecheck and web export pass.

### Manual verification
Exercise `app/README.md` through the smallest relevant RN/Skia/core/platform harness. Create the shared RN Skia game surface with browser CanvasKit startup, visible drawing, Gesture Handler interaction and Reanimated motion; native uses the same surface module. Record platform limitations separately.

### Acceptance criteria
- Create the shared RN Skia game surface with browser CanvasKit startup, visible drawing, Gesture Handler interaction and Reanimated motion; native uses the same surface module.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0050"></a>
## TASK-0050 — Config loader validation

Phase: 04 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0048](TASKS_PHASE_04.md) — Core TypeScript boundary · [TASK-0052](TASKS_PHASE_04.md) — Runtime ports and test fakes

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/config/ConfigLoader.ts. Integrate shared registries coherently.

Evidence: [config.tap](../analysis/reports/core-services/config.tap).

### Goal
Validate schema then IDs/graphs/numeric bounds before domain creation; report exact file and field.

### Context
Bounded config loader validation deliverable. Authoritative output: `game-core/src/config/ConfigLoader.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- `game-core/tsconfig.json` — dependency output
- `game-core/src/ports/index.ts` — dependency output

### Files expected to create
- `game-core/src/config/ConfigLoader.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate schema then IDs/graphs/numeric bounds before domain creation; report exact file and field.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser.

### Test cases
Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain.

### Manual verification
Exercise `game-core/src/config/ConfigLoader.ts` through the smallest relevant RN/Skia/core/platform harness. Validate schema then IDs/graphs/numeric bounds before domain creation; report exact file and field. Record platform limitations separately.

### Acceptance criteria
- Validate schema then IDs/graphs/numeric bounds before domain creation; report exact file and field.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0051"></a>
## TASK-0051 — Typed domain event bus

Phase: 04 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0048](TASKS_PHASE_04.md) — Core TypeScript boundary

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/events/EventBus.ts. Integrate shared registries coherently.

Evidence: [tests.tap](../analysis/reports/core-services/tests.tap).

### Goal
Dispatch immutable ordered batches; observer failure isolated and dispose idempotent.

### Context
Bounded typed domain event bus deliverable. Authoritative output: `game-core/src/events/EventBus.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- `game-core/tsconfig.json` — dependency output

### Files expected to create
- `game-core/src/events/EventBus.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Dispatch immutable ordered batches; observer failure isolated and dispose idempotent.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser.

### Test cases
Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain.

### Manual verification
Exercise `game-core/src/events/EventBus.ts` through the smallest relevant RN/Skia/core/platform harness. Dispatch immutable ordered batches; observer failure isolated and dispose idempotent. Record platform limitations separately.

### Acceptance criteria
- Dispatch immutable ordered batches; observer failure isolated and dispose idempotent.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0052"></a>
## TASK-0052 — Runtime ports and test fakes

Phase: 04 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0048](TASKS_PHASE_04.md) — Core TypeScript boundary

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/ports/index.ts. Integrate shared registries coherently.

Evidence: [tests.tap](../analysis/reports/core-services/tests.tap).

### Goal
Define Clock,RNG,SaveStore,Logger,Analytics interfaces with deterministic fake implementations.

### Context
Bounded runtime ports and test fakes deliverable. Authoritative output: `game-core/src/ports/index.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- `game-core/tsconfig.json` — dependency output

### Files expected to create
- `game-core/src/ports/index.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Define Clock,RNG,SaveStore,Logger,Analytics interfaces with deterministic fake implementations.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser.

### Test cases
Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain.

### Manual verification
Exercise `game-core/src/ports/index.ts` through the smallest relevant RN/Skia/core/platform harness. Define Clock,RNG,SaveStore,Logger,Analytics interfaces with deterministic fake implementations. Record platform limitations separately.

### Acceptance criteria
- Define Clock,RNG,SaveStore,Logger,Analytics interfaces with deterministic fake implementations.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0053"></a>
## TASK-0053 — Core CI checks

Phase: 04 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0050](TASKS_PHASE_04.md), [TASK-0051](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tooling/ci/core-checks.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Implement reproducible typecheck/schema/core-test pipeline and attach clean-checkout result.

### Context
Bounded core ci checks deliverable. Authoritative output: `tooling/ci/core-checks.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- `game-core/src/config/ConfigLoader.ts` — dependency output
- `game-core/src/events/EventBus.ts` — dependency output

### Files expected to create
- `tooling/ci/core-checks.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement reproducible typecheck/schema/core-test pipeline and attach clean-checkout result.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser.

### Test cases
Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain.

### Manual verification
Exercise `tooling/ci/core-checks.md` through the smallest relevant RN/Skia/core/platform harness. Implement reproducible typecheck/schema/core-test pipeline and attach clean-checkout result. Record platform limitations separately.

### Acceptance criteria
- Implement reproducible typecheck/schema/core-test pipeline and attach clean-checkout result.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0054"></a>
## TASK-0054 — Web fixture harness

Phase: 04 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0049](TASKS_PHASE_04.md) — Shared Skia game surface · [TASK-0050](TASKS_PHASE_04.md) — Config loader validation

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/debug/FixtureHarness.ts. Integrate shared registries coherently.

Evidence: [fixtures.tap](../analysis/reports/ui-foundation/fixtures.tap), [fixture-export.json](../analysis/reports/ui-foundation/fixture-export.json).

### Goal
Load named seed/clock/state and freeze animation markers; production build excludes debug routes.

### Context
Bounded web fixture harness deliverable. Authoritative output: `app/src/debug/FixtureHarness.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md) · [README.md](../data-spec/README.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_REPOSITORY_STRUCTURE.md](../docs/technical/02_REPOSITORY_STRUCTURE.md)
- [README.md](../data-spec/README.md)
- `app/README.md` — dependency output
- `game-core/src/config/ConfigLoader.ts` — dependency output

### Files expected to create
- `app/src/debug/FixtureHarness.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Load named seed/clock/state and freeze animation markers; production build excludes debug routes.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Clean checkout; invalid config; stale generated asset registry; accidental core import of engine/browser.

### Test cases
Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain.

### Manual verification
Exercise `app/src/debug/FixtureHarness.ts` through the smallest relevant RN/Skia/core/platform harness. Load named seed/clock/state and freeze animation markers; production build excludes debug routes. Record platform limitations separately.

### Acceptance criteria
- Load named seed/clock/state and freeze animation markers; production build excludes debug routes.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
