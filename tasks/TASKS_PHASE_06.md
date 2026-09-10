# Atomic tasks — phase 06

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_06_CORE_GAME_STATE.md).

<a id="task-0070"></a>
## TASK-0070 — Amount value type

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0048](TASKS_PHASE_04.md) — Core TypeScript boundary; [TASK-0052](TASKS_PHASE_04.md) — Runtime ports and test fakes

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/model/Amount.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [amount.tap](../analysis/reports/core-state/amount.tap).

### Goal
Implement bigint arithmetic with canonical decimal serialization and exact huge-value comparisons.

### Context
This is the bounded amount value type deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/model/Amount.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/tsconfig.json` — future artifact from listed dependency
- `game-core/src/ports/index.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/model/Amount.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/model/Amount.ts`; unresolved reference behavior stays gated.
2. Implement bigint arithmetic with canonical decimal serialization and exact huge-value comparisons.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Implement bigint arithmetic with canonical decimal serialization and exact huge-value comparisons. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Implement bigint arithmetic with canonical decimal serialization and exact huge-value comparisons.
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


<a id="task-0071"></a>
## TASK-0071 — Normalized game state

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0070](TASKS_PHASE_06.md) — Amount value type

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/model/GameState.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [state.tap](../analysis/reports/core-state/state.tap), [schema.json](../analysis/reports/core-state/schema.json).

### Goal
Define state groups and owned/deployed/board invariants matching save schema; keep ViewState separate.

### Context
This is the bounded normalized game state deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/model/GameState.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/model/Amount.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/model/GameState.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/model/GameState.ts`; unresolved reference behavior stays gated.
2. Define state groups and owned/deployed/board invariants matching save schema; keep ViewState separate.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Define state groups and owned/deployed/board invariants matching save schema; keep ViewState separate. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Define state groups and owned/deployed/board invariants matching save schema; keep ViewState separate.
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


<a id="task-0072"></a>
## TASK-0072 — Command dispatcher

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0071](TASKS_PHASE_06.md) — Normalized game state; [TASK-0051](TASKS_PHASE_04.md) — Typed domain event bus

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/Dispatcher.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [dispatcher.tap](../analysis/reports/core-state/dispatcher.tap).

### Goal
Validate commandId/revision,queue reentrant commands and return typed rejection without state/RNG mutation.

### Context
This is the bounded command dispatcher deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/commands/Dispatcher.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/model/GameState.ts` — future artifact from listed dependency
- `game-core/src/events/EventBus.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/Dispatcher.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/Dispatcher.ts`; unresolved reference behavior stays gated.
2. Validate commandId/revision,queue reentrant commands and return typed rejection without state/RNG mutation.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Validate commandId/revision,queue reentrant commands and return typed rejection without state/RNG mutation. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Validate commandId/revision,queue reentrant commands and return typed rejection without state/RNG mutation.
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


<a id="task-0073"></a>
## TASK-0073 — Durable transaction coordinator

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0072](TASKS_PHASE_06.md) — Command dispatcher; [TASK-0052](TASKS_PHASE_04.md) — Runtime ports and test fakes

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/TransactionCoordinator.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [transactions.tap](../analysis/reports/core-state/transactions.tap).

### Goal
Persist draft grant/debit/receipt/watermark before install/events; save failure retains old authoritative state. Unit tests use fault-injectable SaveStore ports;real web/native durability is a phase12 gate before playable purchase/merge acceptance.

### Context
This is the bounded durable transaction coordinator deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/systems/TransactionCoordinator.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/commands/Dispatcher.ts` — future artifact from listed dependency
- `game-core/src/ports/index.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/TransactionCoordinator.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/TransactionCoordinator.ts`; unresolved reference behavior stays gated.
2. Persist draft grant/debit/receipt/watermark before install/events; save failure retains old authoritative state. Unit tests use fault-injectable SaveStore ports;real web/native durability is a phase12 gate before playable purchase/merge acceptance.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Persist draft grant/debit/receipt/watermark before install/events; save failure retains old authoritative state. Unit tests use fault-injectable SaveStore ports;real web/native durability is a phase12 gate before playable purchase/merge acceptance. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Persist draft grant/debit/receipt/watermark before install/events; save failure retains old authoritative state. Unit tests use fault-injectable SaveStore ports;real web/native durability is a phase12 gate before playable purchase/merge acceptance.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
L · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0074"></a>
## TASK-0074 — Reward receipt service

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0073](TASKS_PHASE_06.md) — Durable transaction coordinator

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/RewardService.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [rewards.tap](../analysis/reports/core-state/rewards.tap), [primitives.md](../analysis/reports/core-state/primitives.md).

### Goal
Apply configured grant kinds once per source token and return cached outcome for duplicates.

### Context
This is the bounded reward receipt service deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/systems/RewardService.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/systems/TransactionCoordinator.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/RewardService.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/RewardService.ts`; unresolved reference behavior stays gated.
2. Apply configured grant kinds once per source token and return cached outcome for duplicates.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Apply configured grant kinds once per source token and return cached outcome for duplicates. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Apply configured grant kinds once per source token and return cached outcome for duplicates.
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


<a id="task-0075"></a>
## TASK-0075 — Seeded RNG streams

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0052](TASKS_PHASE_04.md) — Runtime ports and test fakes

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/ports/SeededRng.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [rng.tap](../analysis/reports/core-state/rng.tap).

### Goal
Separate combat/reward/presentation streams and serialize authoritative RNG state where required by replay policy.

### Context
This is the bounded seeded rng streams deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/ports/SeededRng.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/ports/index.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/ports/SeededRng.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/ports/SeededRng.ts`; unresolved reference behavior stays gated.
2. Separate combat/reward/presentation streams and serialize authoritative RNG state where required by replay policy.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Separate combat/reward/presentation streams and serialize authoritative RNG state where required by replay policy. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Separate combat/reward/presentation streams and serialize authoritative RNG state where required by replay policy.
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


<a id="task-0076"></a>
## TASK-0076 — Game state selectors

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0071](TASKS_PHASE_06.md) — Normalized game state

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/selectors/index.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [selectors.tap](../analysis/reports/core-state/selectors.tap).

### Goal
Derive affordability,board occupancy,DPS display and claimability without mutation or reparsing labels.

### Context
This is the bounded game state selectors deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/selectors/index.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/model/GameState.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/selectors/index.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/selectors/index.ts`; unresolved reference behavior stays gated.
2. Derive affordability,board occupancy,DPS display and claimability without mutation or reparsing labels.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Derive affordability,board occupancy,DPS display and claimability without mutation or reparsing labels. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Derive affordability,board occupancy,DPS display and claimability without mutation or reparsing labels.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0077"></a>
## TASK-0077 — Simulation clock

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0052](TASKS_PHASE_04.md) — Runtime ports and test fakes

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/SimulationClock.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [clock.tap](../analysis/reports/core-state/clock.tap).

### Goal
Implement proposed50msstep,max5catchup and explicit suspend; split-tick tests remain deterministic.

### Context
This is the bounded simulation clock deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/src/systems/SimulationClock.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/ports/index.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/SimulationClock.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/SimulationClock.ts`; unresolved reference behavior stays gated.
2. Implement proposed50msstep,max5catchup and explicit suspend; split-tick tests remain deterministic.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Implement proposed50msstep,max5catchup and explicit suspend; split-tick tests remain deterministic. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Implement proposed50msstep,max5catchup and explicit suspend; split-tick tests remain deterministic.
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


<a id="task-0078"></a>
## TASK-0078 — Input router

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0058](TASKS_PHASE_05.md) — Reusable button states · [TASK-0049](TASKS_PHASE_04.md) — Shared Skia game surface

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/input/InputRouter.ts. Integrate shared registries coherently.

Evidence: [input-router.tap](../analysis/reports/core-state/input-router.tap).

### Goal
Capture one pointer owner with modal/tutorial priority and consume closing pointer-up.

### Context
Bounded input router deliverable. Authoritative output: `app/src/input/InputRouter.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `app/src/ui/GameButton.ts` — dependency output
- `app/README.md` — dependency output

### Files expected to create
- `app/src/input/InputRouter.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Capture one pointer owner with modal/tutorial priority and consume closing pointer-up.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise `app/src/input/InputRouter.ts` through the smallest relevant RN/Skia/core/platform harness. Capture one pointer owner with modal/tutorial priority and consume closing pointer-up. Record platform limitations separately.

### Acceptance criteria
- Capture one pointer owner with modal/tutorial priority and consume closing pointer-up.
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


<a id="task-0079"></a>
## TASK-0079 — State invariant tests

Phase: 06 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0074](TASKS_PHASE_06.md) — Reward receipt service; [TASK-0076](TASKS_PHASE_06.md) — Game state selectors; [TASK-0075](TASKS_PHASE_06.md) — Seeded RNG streams; [TASK-0077](TASKS_PHASE_06.md) — Simulation clock

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/tests/unit/state-invariants.test.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [invariants.tap](../analysis/reports/core-state/invariants.tap).

### Goal
Generate valid boards and command sequences; prove balance ownership ID and watermark invariants.

### Context
This is the bounded state invariant tests deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/tests/unit/state-invariants.test.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/src/systems/RewardService.ts` — future artifact from listed dependency
- `game-core/src/selectors/index.ts` — future artifact from listed dependency
- `game-core/src/ports/SeededRng.ts` — future artifact from listed dependency
- `game-core/src/systems/SimulationClock.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/tests/unit/state-invariants.test.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/tests/unit/state-invariants.test.ts`; unresolved reference behavior stays gated.
2. Generate valid boards and command sequences; prove balance ownership ID and watermark invariants.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Generate valid boards and command sequences; prove balance ownership ID and watermark invariants. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Generate valid boards and command sequences; prove balance ownership ID and watermark invariants.
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


<a id="task-0080"></a>
## TASK-0080 — Core replay harness

Phase: 06 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0079](TASKS_PHASE_06.md), [TASK-0077](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/tests/simulation/replay.test.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Replay same seed/commands at varied render cadence and compare final hash/events.

### Context
This is the bounded core replay harness deliverable within implement deterministic state and durable transaction ports. Its authoritative output is `game-core/tests/simulation/replay.test.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md) · [save.schema.json](../data-spec/save.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_DOMAIN_GAME_CORE.md](../docs/technical/03_DOMAIN_GAME_CORE.md)
- [save.schema.json](../data-spec/save.schema.json)
- `game-core/tests/unit/state-invariants.test.ts` — future artifact from listed dependency
- `game-core/src/systems/SimulationClock.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/tests/simulation/replay.test.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/tests/simulation/replay.test.ts`; unresolved reference behavior stays gated.
2. Replay same seed/commands at varied render cadence and compare final hash/events.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.

### Test cases
Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Replay same seed/commands at varied render cadence and compare final hash/events. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Replay same seed/commands at varied render cadence and compare final hash/events.
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
