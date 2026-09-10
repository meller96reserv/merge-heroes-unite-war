# Atomic tasks — phase 07

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_07_HERO_PURCHASE_AND_MERGE.md).

<a id="task-0081"></a>
## TASK-0081 — Hero definition and instance model

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0079](TASKS_PHASE_06.md) — State invariant tests

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/model/Hero.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [hero.tap](../analysis/reports/board/hero.tap).

### Goal
Separate family/tier/visual definition from owned instance,slot,upgrade and deployment state.

### Context
This is the bounded hero definition and instance model deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/model/Hero.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- `game-core/tests/unit/state-invariants.test.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/model/Hero.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/model/Hero.ts`; unresolved reference behavior stays gated.
2. Separate family/tier/visual definition from owned instance,slot,upgrade and deployment state.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Separate family/tier/visual definition from owned instance,slot,upgrade and deployment state. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Separate family/tier/visual definition from owned instance,slot,upgrade and deployment state.
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


<a id="task-0082"></a>
## TASK-0082 — Board slot model

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0081](TASKS_PHASE_07.md) — Hero definition and instance model

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/model/Board.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [slots.tap](../analysis/reports/board/slots.tap).

### Goal
Represent15logical slots with5initial open and explicit unlock IDs; reject duplicate occupancy.

### Context
This is the bounded board slot model deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/model/Board.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- `game-core/src/model/Hero.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/model/Board.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/model/Board.ts`; unresolved reference behavior stays gated.
2. Represent15logical slots with5initial open and explicit unlock IDs; reject duplicate occupancy.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Represent15logical slots with5initial open and explicit unlock IDs; reject duplicate occupancy. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Represent15logical slots with5initial open and explicit unlock IDs; reject duplicate occupancy.
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


<a id="task-0083"></a>
## TASK-0083 — Purchase quote selector

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0082](TASKS_PHASE_07.md) — Board slot model

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/selectors/PurchaseQuote.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [quote.tap](../analysis/reports/board/quote.tap).

### Goal
Read exact configured cost and capacity; expose insufficient/full/locked reasons without changing purchase count.

### Context
This is the bounded purchase quote selector deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/selectors/PurchaseQuote.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- `game-core/src/model/Board.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/selectors/PurchaseQuote.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/selectors/PurchaseQuote.ts`; unresolved reference behavior stays gated.
2. Read exact configured cost and capacity; expose insufficient/full/locked reasons without changing purchase count.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Read exact configured cost and capacity; expose insufficient/full/locked reasons without changing purchase count. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Read exact configured cost and capacity; expose insufficient/full/locked reasons without changing purchase count.
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


<a id="task-0084"></a>
## TASK-0084 — Purchase hero transaction

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0083](TASKS_PHASE_07.md) — Purchase quote selector; [TASK-0073](TASKS_PHASE_06.md) — Durable transaction coordinator

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/PurchaseHero.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [purchase.tap](../analysis/reports/board/purchase.tap).

### Goal
Atomically debit quoted cost,increment count and create one hero in deterministic free slot.

### Context
This is the bounded purchase hero transaction deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/commands/PurchaseHero.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- `game-core/src/selectors/PurchaseQuote.ts` — future artifact from listed dependency
- `game-core/src/systems/TransactionCoordinator.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/PurchaseHero.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/PurchaseHero.ts`; unresolved reference behavior stays gated.
2. Atomically debit quoted cost,increment count and create one hero in deterministic free slot.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Atomically debit quoted cost,increment count and create one hero in deterministic free slot. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Atomically debit quoted cost,increment count and create one hero in deterministic free slot.
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


<a id="task-0085"></a>
## TASK-0085 — Purchase hold controller

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0084](TASKS_PHASE_07.md) — Purchase hero transaction · [TASK-0009](TASKS_PHASE_01.md) — Input purchase capture · [TASK-0078](TASKS_PHASE_06.md) — Input router

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/input/PurchaseHold.ts. Integrate shared registries coherently.

Evidence: [hold.tap](../analysis/reports/board/hold.tap).

### Goal
Schedule accepted repeat commands with cancel/up/background cleanup; no uncontrolled timer after pointer release.

### Context
Bounded purchase hold controller deliverable. Authoritative output: `app/src/input/PurchaseHold.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- `game-core/src/commands/PurchaseHero.ts` — dependency output
- [purchase_input_cases.csv](../analysis/reference/purchase_input_cases.csv)
- `app/src/input/InputRouter.ts` — dependency output

### Files expected to create
- `app/src/input/PurchaseHold.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Schedule accepted repeat commands with cancel/up/background cleanup; no uncontrolled timer after pointer release.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `app/src/input/PurchaseHold.ts` through the smallest relevant RN/Skia/core/platform harness. Schedule accepted repeat commands with cancel/up/background cleanup; no uncontrolled timer after pointer release. Record platform limitations separately.

### Acceptance criteria
- Schedule accepted repeat commands with cancel/up/background cleanup; no uncontrolled timer after pointer release.
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


<a id="task-0086"></a>
## TASK-0086 — Manual merge compatibility

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0085](TASKS_PHASE_07.md) — Purchase hold controller

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/MergeRules.ts. Integrate shared registries coherently.

Evidence: [merge-rules.tap](../analysis/reports/board/merge-rules.tap).

### Goal
Validate same configured family/tier or explicit pair,max tier and deployment policy before any consume.

### Context
Bounded manual merge compatibility deliverable. Authoritative output: `game-core/src/systems/MergeRules.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- `app/src/input/PurchaseHold.ts` — dependency output

### Files expected to create
- `game-core/src/systems/MergeRules.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate same configured family/tier or explicit pair,max tier and deployment policy before any consume.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `game-core/src/systems/MergeRules.ts` through the smallest relevant RN/Skia/core/platform harness. Validate same configured family/tier or explicit pair,max tier and deployment policy before any consume. Record platform limitations separately.

### Acceptance criteria
- Validate same configured family/tier or explicit pair,max tier and deployment policy before any consume.
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


<a id="task-0087"></a>
## TASK-0087 — Manual merge transaction

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0086](TASKS_PHASE_07.md) — Manual merge compatibility · [TASK-0074](TASKS_PHASE_06.md) — Reward receipt service

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/commands/MergeHeroes.ts. Integrate shared registries coherently.

Evidence: [merge.tap](../analysis/reports/board/merge.tap).

### Goal
Consume source/target and create result at drop target in one durable transaction with discovery hook.

### Context
Bounded manual merge transaction deliverable. Authoritative output: `game-core/src/commands/MergeHeroes.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/MergeRules.ts` — dependency output
- `game-core/src/systems/RewardService.ts` — dependency output

### Files expected to create
- `game-core/src/commands/MergeHeroes.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Consume source/target and create result at drop target in one durable transaction with discovery hook.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `game-core/src/commands/MergeHeroes.ts` through the smallest relevant RN/Skia/core/platform harness. Consume source/target and create result at drop target in one durable transaction with discovery hook. Record platform limitations separately.

### Acceptance criteria
- Consume source/target and create result at drop target in one durable transaction with discovery hook.
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
Exact-parity verification remains assigned to TASK-0021. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0088"></a>
## TASK-0088 — Timed auto-merge entitlement

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0087](TASKS_PHASE_07.md) — Manual merge transaction; [TASK-0006](TASKS_PHASE_01.md) — Auto-merge unlock capture; [TASK-0074](TASKS_PHASE_06.md) — Reward receipt service

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/ActivateAutoMerge.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [auto-entitlement.tap](../analysis/reports/board/auto-entitlement.tap).

### Goal
Reserve configured60-minute entitlement once,handle enable/disable/expiry and persist clock guard;development free grant is separate from disabled ad/payment providers.

### Context
This is the bounded timed auto-merge entitlement deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/commands/ActivateAutoMerge.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- `game-core/src/commands/MergeHeroes.ts` — future artifact from listed dependency
- `analysis/reference/auto_unlock_capture.md` — future artifact from listed dependency
- `game-core/src/systems/RewardService.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/ActivateAutoMerge.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/ActivateAutoMerge.ts`; unresolved reference behavior stays gated.
2. Reserve configured60-minute entitlement once,handle enable/disable/expiry and persist clock guard;development free grant is separate from disabled ad/payment providers.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Reserve configured60-minute entitlement once,handle enable/disable/expiry and persist clock guard;development free grant is separate from disabled ad/payment providers. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Reserve configured60-minute entitlement once,handle enable/disable/expiry and persist clock guard;development free grant is separate from disabled ad/payment providers.
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


<a id="task-0089"></a>
## TASK-0089 — Auto-merge pair selector

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0088](TASKS_PHASE_07.md) — Timed auto-merge entitlement

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/AutoMergeSelector.ts. Integrate shared registries coherently.

Evidence: [auto-selector.tap](../analysis/reports/board/auto-selector.tap).

### Goal
Implement only verified/configured policy with stable tie-break and unit cases for ambiguous boards. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.

### Context
Bounded auto-merge pair selector deliverable. Authoritative output: `game-core/src/systems/AutoMergeSelector.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/commands/ActivateAutoMerge.ts` — dependency output

### Files expected to create
- `game-core/src/systems/AutoMergeSelector.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement only verified/configured policy with stable tie-break and unit cases for ambiguous boards. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `game-core/src/systems/AutoMergeSelector.ts` through the smallest relevant RN/Skia/core/platform harness. Implement only verified/configured policy with stable tie-break and unit cases for ambiguous boards. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default. Record platform limitations separately.

### Acceptance criteria
- Implement only verified/configured policy with stable tie-break and unit cases for ambiguous boards. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0007. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0090"></a>
## TASK-0090 — Auto-merge cascade reducer

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0089](TASKS_PHASE_07.md) — Auto-merge pair selector; [TASK-0006](TASKS_PHASE_01.md) — Auto-merge unlock capture

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/AutoMergeSystem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [auto-cascade.tap](../analysis/reports/board/auto-cascade.tap).

### Goal
Repeat pair selection with occupancy-bound termination and deterministic chain IDs; serialize with purchases. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.

### Context
This is the bounded auto-merge cascade reducer deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/systems/AutoMergeSystem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- `game-core/src/systems/AutoMergeSelector.ts` — future artifact from listed dependency
- `analysis/reference/auto_unlock_capture.md` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/AutoMergeSystem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/AutoMergeSystem.ts`; unresolved reference behavior stays gated.
2. Repeat pair selection with occupancy-bound termination and deterministic chain IDs; serialize with purchases. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Repeat pair selection with occupancy-bound termination and deterministic chain IDs; serialize with purchases. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Repeat pair selection with occupancy-bound termination and deterministic chain IDs; serialize with purchases. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.
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


<a id="task-0091"></a>
## TASK-0091 — Discovery reward command

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0090](TASKS_PHASE_07.md) — Auto-merge cascade reducer

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/DiscoveryService.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [discovery.tap](../analysis/reports/board/discovery.tap).

### Goal
Mark discovered tier and reward token atomically; repeated-tier merge produces no discovery grant.

### Context
This is the bounded discovery reward command deliverable within implement board purchase merge and deployment. Its authoritative output is `game-core/src/systems/DiscoveryService.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- `game-core/src/systems/AutoMergeSystem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/DiscoveryService.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/DiscoveryService.ts`; unresolved reference behavior stays gated.
2. Mark discovered tier and reward token atomically; repeated-tier merge produces no discovery grant.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Mark discovered tier and reward token atomically; repeated-tier merge produces no discovery grant. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Mark discovered tier and reward token atomically; repeated-tier merge produces no discovery grant.
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


<a id="task-0092"></a>
## TASK-0092 — Deployment command

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0091](TASKS_PHASE_07.md) — Discovery reward command

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/commands/DeployHero.ts. Integrate shared registries coherently.

Evidence: [deploy.tap](../analysis/reports/board/deploy.tap).

### Goal
Enforce owned subset/cap and preserve board instance; withdrawal is idempotent.

### Context
Bounded deployment command deliverable. Authoritative output: `game-core/src/commands/DeployHero.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/DiscoveryService.ts` — dependency output

### Files expected to create
- `game-core/src/commands/DeployHero.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Enforce owned subset/cap and preserve board instance; withdrawal is idempotent.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `game-core/src/commands/DeployHero.ts` through the smallest relevant RN/Skia/core/platform harness. Enforce owned subset/cap and preserve board instance; withdrawal is idempotent. Record platform limitations separately.

### Acceptance criteria
- Enforce owned subset/cap and preserve board instance; withdrawal is idempotent.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0021. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0093"></a>
## TASK-0093 — Board input projection

Phase: 07 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0092](TASKS_PHASE_07.md) — Deployment command · [TASK-0060](TASKS_PHASE_05.md) — Board and battle static fixture · [TASK-0078](TASKS_PHASE_06.md) — Input router

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/BoardPresenter.ts. Integrate shared registries coherently.

Evidence: [acceptance.json](../analysis/reports/board/browser/acceptance.json), [presenter.tap](../analysis/reports/board/presenter.tap), [build-checks.json](../analysis/reports/board/build-checks.json), [implementation.md](../analysis/reports/board/implementation.md).

### Goal
Render drag targets,full/max/locked feedback and committed results; cancel gesture cannot mutate core.

### Context
Bounded board input projection deliverable. Authoritative output: `app/src/ui/BoardPresenter.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- `game-core/src/commands/DeployHero.ts` — dependency output
- `app/src/components/BattleBoard.tsx` — dependency output
- `app/src/input/InputRouter.ts` — dependency output

### Files expected to create
- `app/src/ui/BoardPresenter.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Render drag targets,full/max/locked feedback and committed results; cancel gesture cannot mutate core.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `app/src/ui/BoardPresenter.ts` through the smallest relevant RN/Skia/core/platform harness. Render drag targets,full/max/locked feedback and committed results; cancel gesture cannot mutate core. Record platform limitations separately.

### Acceptance criteria
- Render drag targets,full/max/locked feedback and committed results; cancel gesture cannot mutate core.
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


<a id="task-0094"></a>
## TASK-0094 — Purchase merge acceptance

Phase: 07 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0093](TASKS_PHASE_07.md) — Board input projection · [TASK-0091](TASKS_PHASE_07.md) — Discovery reward command

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/tests/integration/purchase-merge.test.ts. Integrate shared registries coherently.

Evidence: [integration.tap](../analysis/reports/board/integration.tap), [acceptance.json](../analysis/reports/board/browser/acceptance.json).

### Goal
Exercise exact funds, full board, rapid input, cascade, max tier, deployed pair and interrupted presentation with deterministic storage success/failure fakes. Full save/offline integration remains TASK-0157.

### Context
Bounded purchase merge acceptance deliverable. Authoritative output: `game-core/tests/integration/purchase-merge.test.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/ui/BoardPresenter.ts` — dependency output
- `game-core/src/systems/DiscoveryService.ts` — dependency output

### Files expected to create
- `game-core/tests/integration/purchase-merge.test.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Exercise exact funds, full board, rapid input, cascade, max tier, deployed pair and interrupted presentation with deterministic storage success/failure fakes. Full save/offline integration remains TASK-0157.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.

### Test cases
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.

### Manual verification
Exercise `game-core/tests/integration/purchase-merge.test.ts` through the smallest relevant RN/Skia/core/platform harness. Exercise exact funds, full board, rapid input, cascade, max tier, deployed pair and interrupted presentation with deterministic storage success/failure fakes. Full save/offline integration remains TASK-0157. Record platform limitations separately.

### Acceptance criteria
- Exercise exact funds, full board, rapid input, cascade, max tier, deployed pair and interrupted presentation with deterministic storage success/failure fakes. Full save/offline integration remains TASK-0157.
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
