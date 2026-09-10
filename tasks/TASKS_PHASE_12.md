# Atomic tasks — phase 12

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_12_SAVE_AND_OFFLINE.md).

<a id="task-0144"></a>
## TASK-0144 — Save envelope codec

Phase: 12 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0071](TASKS_PHASE_06.md) — Normalized game state

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/persistence/SaveCodec.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [codec.tap](../analysis/reports/save/codec.tap).

### Goal
Canonical encode/decode schemaVersion/dataVersion/generation with checksum wrapper and strict validation.

### Context
This is the bounded save envelope codec deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/src/persistence/SaveCodec.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- `game-core/src/model/GameState.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/persistence/SaveCodec.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/persistence/SaveCodec.ts`; unresolved reference behavior stays gated.
2. Canonical encode/decode schemaVersion/dataVersion/generation with checksum wrapper and strict validation.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Canonical encode/decode schemaVersion/dataVersion/generation with checksum wrapper and strict validation. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Canonical encode/decode schemaVersion/dataVersion/generation with checksum wrapper and strict validation.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0145"></a>
## TASK-0145 — Web save adapter

Phase: 12 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0144](TASKS_PHASE_12.md) — Save envelope codec · [TASK-0049](TASKS_PHASE_04.md) — Shared Skia game surface

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/WebSaveStore.ts. Integrate shared registries coherently.

Evidence: [indexeddb.json](../analysis/reports/save/indexeddb.json).

### Goal
Implement isolated IndexedDB A/B candidate write/read/verify and injected quota failure.

### Context
Bounded web save adapter deliverable. Authoritative output: `app/src/platform/WebSaveStore.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- `game-core/src/persistence/SaveCodec.ts` — dependency output
- `app/README.md` — dependency output

### Files expected to create
- `app/src/platform/WebSaveStore.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement isolated IndexedDB A/B candidate write/read/verify and injected quota failure.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise `app/src/platform/WebSaveStore.ts` through the smallest relevant RN/Skia/core/platform harness. Implement isolated IndexedDB A/B candidate write/read/verify and injected quota failure. Record platform limitations separately.

### Acceptance criteria
- Implement isolated IndexedDB A/B candidate write/read/verify and injected quota failure.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0146"></a>
## TASK-0146 — Native save adapter contract

Phase: 12 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0052](TASKS_PHASE_04.md) — Runtime ports and test fakes · [TASK-0047](TASKS_PHASE_04.md) — React Native Expo application foundation

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/SaveStore.ts. Integrate shared registries coherently.

Evidence: [native-contract.tap](../analysis/reports/save/native-contract.tap), [native-contract.md](../analysis/reports/save/native-contract.md).

### Goal
Expose app-private atomic candidate transport with one writer and account/environment namespace.

### Context
Bounded native save adapter contract deliverable. Authoritative output: `app/src/platform/SaveStore.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/ports/index.ts` — dependency output
- `package.json` — dependency output

### Files expected to create
- `app/src/platform/SaveStore.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Expose app-private atomic candidate transport with one writer and account/environment namespace.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise `app/src/platform/SaveStore.ts` through the smallest relevant RN/Skia/core/platform harness. Expose app-private atomic candidate transport with one writer and account/environment namespace. Record platform limitations separately.

### Acceptance criteria
- Expose app-private atomic candidate transport with one writer and account/environment namespace.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0147"></a>
## TASK-0147 — Save candidate recovery

Phase: 12 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0144](TASKS_PHASE_12.md) — Save envelope codec · [TASK-0145](TASKS_PHASE_12.md) — Web save adapter

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/persistence/SaveRecovery.ts. Integrate shared registries coherently.

Evidence: [recovery.tap](../analysis/reports/save/recovery.tap).

### Goal
Scan both generations,choose newest valid supported candidate and preserve corrupt bytes.

### Context
Bounded save candidate recovery deliverable. Authoritative output: `game-core/src/persistence/SaveRecovery.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- `game-core/src/persistence/SaveCodec.ts` — dependency output
- `app/src/platform/WebSaveStore.ts` — dependency output

### Files expected to create
- `game-core/src/persistence/SaveRecovery.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Scan both generations,choose newest valid supported candidate and preserve corrupt bytes.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise `game-core/src/persistence/SaveRecovery.ts` through the smallest relevant RN/Skia/core/platform harness. Scan both generations,choose newest valid supported candidate and preserve corrupt bytes. Record platform limitations separately.

### Acceptance criteria
- Scan both generations,choose newest valid supported candidate and preserve corrupt bytes.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0148"></a>
## TASK-0148 — Save checkpoint scheduling

Phase: 12 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0073](TASKS_PHASE_06.md), [TASK-0147](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/persistence/SaveCoordinator.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [platform-services.test.ts](../tests/unit/platform-services.test.ts), [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Flush durable queue on lifecycle and coalesce only safe progress snapshots; expose backlog metrics.

### Context
This is the bounded save checkpoint scheduling deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/src/persistence/SaveCoordinator.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- `game-core/src/persistence/SaveRecovery.ts` — future artifact from listed dependency
- `game-core/src/systems/TransactionCoordinator.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/persistence/SaveCoordinator.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/persistence/SaveCoordinator.ts`; unresolved reference behavior stays gated.
2. Flush durable queue on lifecycle and coalesce only safe progress snapshots; expose backlog metrics.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Flush durable queue on lifecycle and coalesce only safe progress snapshots; expose backlog metrics. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Flush durable queue on lifecycle and coalesce only safe progress snapshots; expose backlog metrics.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0149"></a>
## TASK-0149 — Save migration pipeline

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0148](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/persistence/Migrations.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Apply sequential pure migrations on backup draft and reject unknown future version without overwrite.

### Context
This is the bounded save migration pipeline deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/src/persistence/Migrations.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md)
- `game-core/src/persistence/SaveCoordinator.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/persistence/Migrations.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/persistence/Migrations.ts`; unresolved reference behavior stays gated.
2. Apply sequential pure migrations on backup draft and reject unknown future version without overwrite.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Apply sequential pure migrations on backup draft and reject unknown future version without overwrite. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Apply sequential pure migrations on backup draft and reject unknown future version without overwrite.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0150"></a>
## TASK-0150 — Migration fixture suite

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0149](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/tests/fixtures/save-migrations/README.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format.

### Context
This is the bounded migration fixture suite deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/tests/fixtures/save-migrations/README.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md)
- `game-core/src/persistence/Migrations.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/tests/fixtures/save-migrations/README.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/tests/fixtures/save-migrations/README.md`; unresolved reference behavior stays gated.
2. Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0151"></a>
## TASK-0151 — Offline interval calculator

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0077](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/OfflineService.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Clamp negative/capped UTC elapsed and integer reward units without offline stage advancement in fixture.

### Context
Bounded offline interval calculator deliverable. Authoritative output: `game-core/src/systems/OfflineService.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/SimulationClock.ts` — dependency output

### Files expected to create
- `game-core/src/systems/OfflineService.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Clamp negative/capped UTC elapsed and integer reward units without offline stage advancement in fixture.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise `game-core/src/systems/OfflineService.ts` through the smallest relevant RN/Skia/core/platform harness. Clamp negative/capped UTC elapsed and integer reward units without offline stage advancement in fixture. Record platform limitations separately.

### Acceptance criteria
- Clamp negative/capped UTC elapsed and integer reward units without offline stage advancement in fixture.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0014. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0152"></a>
## TASK-0152 — Offline entitlement reservation

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0151](TASKS_PHASE_12.md), [TASK-0074](TASKS_PHASE_06.md), [TASK-0148](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/ReserveOffline.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Persist stable from/to/grants pending claim before popup and avoid overlap with prior watermark.

### Context
This is the bounded offline entitlement reservation deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/src/commands/ReserveOffline.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- `game-core/src/systems/OfflineService.ts` — future artifact from listed dependency
- `game-core/src/systems/RewardService.ts` — future artifact from listed dependency
- `game-core/src/persistence/SaveCoordinator.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/ReserveOffline.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/ReserveOffline.ts`; unresolved reference behavior stays gated.
2. Persist stable from/to/grants pending claim before popup and avoid overlap with prior watermark.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Persist stable from/to/grants pending claim before popup and avoid overlap with prior watermark. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Persist stable from/to/grants pending claim before popup and avoid overlap with prior watermark.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0153"></a>
## TASK-0153 — Offline claim transaction

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0152](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/ClaimOffline.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Grant pending entitlement once and advance watermark atomically across crash/retry.

### Context
This is the bounded offline claim transaction deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/src/commands/ClaimOffline.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- `game-core/src/commands/ReserveOffline.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/ClaimOffline.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/ClaimOffline.ts`; unresolved reference behavior stays gated.
2. Grant pending entitlement once and advance watermark atomically across crash/retry.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Grant pending entitlement once and advance watermark atomically across crash/retry. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Grant pending entitlement once and advance watermark atomically across crash/retry.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0154"></a>
## TASK-0154 — Receipt compaction policy

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0148](TASKS_PHASE_12.md), [TASK-0147](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/persistence/ReceiptCompaction.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Bound receipt history only when source watermarks prove old replay remains rejected.

### Context
This is the bounded receipt compaction policy deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/src/persistence/ReceiptCompaction.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- `game-core/src/commands/ClaimOffline.ts` — future artifact from listed dependency
- `game-core/src/persistence/SaveRecovery.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/persistence/ReceiptCompaction.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/persistence/ReceiptCompaction.ts`; unresolved reference behavior stays gated.
2. Bound receipt history only when source watermarks prove old replay remains rejected.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Bound receipt history only when source watermarks prove old replay remains rejected. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Bound receipt history only when source watermarks prove old replay remains rejected.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0155"></a>
## TASK-0155 — Save crash injection harness

Phase: 12 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0154](TASKS_PHASE_12.md), [TASK-0149](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/tests/integration/save-crash.test.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Crash at each write/verify/install/event barrier and prove exact old-or-new economic state.

### Context
This is the bounded save crash injection harness deliverable within prove durable recovery and offline claims. Its authoritative output is `game-core/tests/integration/save-crash.test.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- `game-core/src/persistence/ReceiptCompaction.ts` — future artifact from listed dependency
- `game-core/src/persistence/Migrations.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/tests/integration/save-crash.test.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/tests/integration/save-crash.test.ts`; unresolved reference behavior stays gated.
2. Crash at each write/verify/install/event barrier and prove exact old-or-new economic state.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Crash at each write/verify/install/event barrier and prove exact old-or-new economic state. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Crash at each write/verify/install/event barrier and prove exact old-or-new economic state.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0156"></a>
## TASK-0156 — Lifecycle save integration

Phase: 12 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0047](TASKS_PHASE_04.md), [TASK-0148](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/LifecycleCoordinator.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

Current delivery scope: Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [platform-services.test.ts](../tests/unit/platform-services.test.ts), [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation.

### Context
Bounded lifecycle save integration deliverable. Authoritative output: `app/src/platform/LifecycleCoordinator.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/persistence/SaveCoordinator.ts` — dependency output
- `game-core/src/commands/ClaimOffline.ts` — dependency output
- `package.json` — dependency output

### Files expected to create
- `app/src/platform/LifecycleCoordinator.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise `app/src/platform/LifecycleCoordinator.ts` through the smallest relevant RN/Skia/core/platform harness. Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation. Record platform limitations separately.

### Acceptance criteria
- Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0157"></a>
## TASK-0157 — Save offline acceptance

Phase: 12 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0155](TASKS_PHASE_12.md), [TASK-0156](TASKS_PHASE_12.md), [TASK-0150](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/integration/save-offline.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0149, TASK-0150, TASK-0155, TASK-0156, TASK-0223.

Current delivery scope: Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred.

### Context
Bounded save offline acceptance deliverable. Authoritative output: `tests/integration/save-offline.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md) · [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_SAVE_SYSTEM.md](../docs/technical/08_SAVE_SYSTEM.md)
- [08_SAVE_MIGRATION_TESTS.md](../docs/qa/08_SAVE_MIGRATION_TESTS.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- `game-core/tests/integration/save-crash.test.ts` — dependency output
- `app/src/platform/LifecycleCoordinator.ts` — dependency output
- `game-core/tests/fixtures/save-migrations/README.md` — dependency output

### Files expected to create
- `tests/integration/save-offline.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.

### Test cases
Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.

### Manual verification
Exercise `tests/integration/save-offline.md` through the smallest relevant RN/Skia/core/platform harness. Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred. Record platform limitations separately.

### Acceptance criteria
- Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
