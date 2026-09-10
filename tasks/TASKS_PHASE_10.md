# Atomic tasks — phase 10

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_10_HERO_PROGRESSION_AND_EQUIPMENT.md).

<a id="task-0119"></a>
## TASK-0119 — Equipment instance model

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0071](TASKS_PHASE_06.md), [TASK-0073](TASKS_PHASE_06.md), [TASK-0074](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/model/Equipment.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Represent owned item IDs,slot type,level and optional owner; one item cannot be on two heroes.

### Context
Bounded equipment instance model deliverable. Authoritative output: `game-core/src/model/Equipment.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `tests/integration/save-offline.md` — dependency output

### Files expected to create
- `game-core/src/model/Equipment.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Represent owned item IDs,slot type,level and optional owner; one item cannot be on two heroes.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise `game-core/src/model/Equipment.ts` through the smallest relevant RN/Skia/core/platform harness. Represent owned item IDs,slot type,level and optional owner; one item cannot be on two heroes. Record platform limitations separately.

### Acceptance criteria
- Represent owned item IDs,slot type,level and optional owner; one item cannot be on two heroes.
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
Exact-parity verification remains assigned to TASK-0018. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0120"></a>
## TASK-0120 — Equipment slot compatibility

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0119](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/EquipmentRules.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Validate allowed family/slot and ownership before equip; wrong slot rejects unchanged.

### Context
This is the bounded equipment slot compatibility deliverable within implement owned items and hero upgrades. Its authoritative output is `game-core/src/systems/EquipmentRules.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `game-core/src/model/Equipment.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/EquipmentRules.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/EquipmentRules.ts`; unresolved reference behavior stays gated.
2. Validate allowed family/slot and ownership before equip; wrong slot rejects unchanged.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Validate allowed family/slot and ownership before equip; wrong slot rejects unchanged. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Validate allowed family/slot and ownership before equip; wrong slot rejects unchanged.
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


<a id="task-0121"></a>
## TASK-0121 — Equip and swap transaction

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0120](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/EquipItem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Atomically unequip prior item and bind new item with stable stats recomputation.

### Context
This is the bounded equip and swap transaction deliverable within implement owned items and hero upgrades. Its authoritative output is `game-core/src/commands/EquipItem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `game-core/src/systems/EquipmentRules.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/EquipItem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/EquipItem.ts`; unresolved reference behavior stays gated.
2. Atomically unequip prior item and bind new item with stable stats recomputation.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Atomically unequip prior item and bind new item with stable stats recomputation. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Atomically unequip prior item and bind new item with stable stats recomputation.
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


<a id="task-0122"></a>
## TASK-0122 — Equipment enhancement transaction

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0121](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/EnhanceItem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Debit configured cost and increment item level once; max/insufficient/pending cases reject correctly.

### Context
This is the bounded equipment enhancement transaction deliverable within implement owned items and hero upgrades. Its authoritative output is `game-core/src/commands/EnhanceItem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `game-core/src/commands/EquipItem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/EnhanceItem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/EnhanceItem.ts`; unresolved reference behavior stays gated.
2. Debit configured cost and increment item level once; max/insufficient/pending cases reject correctly.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Debit configured cost and increment item level once; max/insufficient/pending cases reject correctly. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Debit configured cost and increment item level once; max/insufficient/pending cases reject correctly.
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


<a id="task-0123"></a>
## TASK-0123 — Hero stat aggregation

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0122](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/selectors/HeroStats.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Combine base,tier,upgrade,item bonuses in documented order without double counting or overflow.

### Context
This is the bounded hero stat aggregation deliverable within implement owned items and hero upgrades. Its authoritative output is `game-core/src/selectors/HeroStats.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `game-core/src/commands/EnhanceItem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/selectors/HeroStats.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/selectors/HeroStats.ts`; unresolved reference behavior stays gated.
2. Combine base,tier,upgrade,item bonuses in documented order without double counting or overflow.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Combine base,tier,upgrade,item bonuses in documented order without double counting or overflow. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Combine base,tier,upgrade,item bonuses in documented order without double counting or overflow.
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


<a id="task-0124"></a>
## TASK-0124 — Hero upgrade transaction

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0123](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/UpgradeHero.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Apply level cap,cost and stat change atomically; selected UI hero does not redirect stale request.

### Context
This is the bounded hero upgrade transaction deliverable within implement owned items and hero upgrades. Its authoritative output is `game-core/src/commands/UpgradeHero.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `game-core/src/selectors/HeroStats.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/UpgradeHero.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/UpgradeHero.ts`; unresolved reference behavior stays gated.
2. Apply level cap,cost and stat change atomically; selected UI hero does not redirect stale request.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Apply level cap,cost and stat change atomically; selected UI hero does not redirect stale request. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Apply level cap,cost and stat change atomically; selected UI hero does not redirect stale request.
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


<a id="task-0125"></a>
## TASK-0125 — Equipment panel binding

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0063](TASKS_PHASE_05.md), [TASK-0124](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/EquipmentPanel.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Bind inventory/slots/selection and equip/unequip/loading/empty/locked/error states to commands.

### Context
Bounded equipment panel binding deliverable. Authoritative output: `app/src/ui/EquipmentPanel.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `game-core/src/commands/UpgradeHero.ts` — dependency output
- `app/src/components/HeroEquipmentPanel.tsx` — dependency output

### Files expected to create
- `app/src/ui/EquipmentPanel.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Bind inventory/slots/selection and equip/unequip/loading/empty/locked/error states to commands.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise `app/src/ui/EquipmentPanel.ts` through the smallest relevant RN/Skia/core/platform harness. Bind inventory/slots/selection and equip/unequip/loading/empty/locked/error states to commands. Record platform limitations separately.

### Acceptance criteria
- Bind inventory/slots/selection and equip/unequip/loading/empty/locked/error states to commands.
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


<a id="task-0126"></a>
## TASK-0126 — Hero upgrades panel binding

Phase: 10 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0064](TASKS_PHASE_05.md), [TASK-0125](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/HeroUpgradesPanel.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Show exact costs and affordable/max states across scroll/selection changes.

### Context
Bounded hero upgrades panel binding deliverable. Authoritative output: `app/src/ui/HeroUpgradesPanel.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `app/src/ui/EquipmentPanel.ts` — dependency output
- `app/src/components/HeroUpgradesPanel.tsx` — dependency output

### Files expected to create
- `app/src/ui/HeroUpgradesPanel.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Show exact costs and affordable/max states across scroll/selection changes.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise `app/src/ui/HeroUpgradesPanel.ts` through the smallest relevant RN/Skia/core/platform harness. Show exact costs and affordable/max states across scroll/selection changes. Record platform limitations separately.

### Acceptance criteria
- Show exact costs and affordable/max states across scroll/selection changes.
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


<a id="task-0127"></a>
## TASK-0127 — Equipment progression acceptance

Phase: 10 · Priority: P1 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0126](TASKS_PHASE_10.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/tests/integration/equipment.test.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0121, TASK-0122, TASK-0124, TASK-0223.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Test swap,unequip,upgrade cap,save failure,restart and repeated input with conserved ownership.

### Context
Bounded equipment progression acceptance deliverable. Authoritative output: `game-core/tests/integration/equipment.test.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- `app/src/ui/HeroUpgradesPanel.ts` — dependency output

### Files expected to create
- `game-core/tests/integration/equipment.test.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Test swap,unequip,upgrade cap,save failure,restart and repeated input with conserved ownership.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.

### Test cases
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.

### Manual verification
Exercise `game-core/tests/integration/equipment.test.ts` through the smallest relevant RN/Skia/core/platform harness. Test swap,unequip,upgrade cap,save failure,restart and repeated input with conserved ownership. Record platform limitations separately.

### Acceptance criteria
- Test swap,unequip,upgrade cap,save failure,restart and repeated input with conserved ownership.
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
