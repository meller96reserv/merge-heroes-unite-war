# Atomic tasks — phase 18

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_18_QA_AND_REGRESSION.md).

<a id="task-0221"></a>
## TASK-0221 — Core unit matrix execution

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0079](TASKS_PHASE_06.md), [TASK-0080](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_unit_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0223.

Current delivery scope: Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies.

### Context
This is the bounded core unit matrix execution deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_unit_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/performance_acceptance.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_unit_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_unit_results.md`; unresolved reference behavior stays gated.
2. Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies.
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


<a id="task-0222"></a>
## TASK-0222 — Integration matrix execution

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0221](TASKS_PHASE_18.md), [TASK-0157](TASKS_PHASE_12.md), [TASK-0143](TASKS_PHASE_11.md), [TASK-0127](TASKS_PHASE_10.md), [TASK-0211](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_integration_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0211, TASK-0223.

Current delivery scope: Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems.

### Context
This is the bounded integration matrix execution deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_integration_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_unit_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_integration_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_integration_results.md`; unresolved reference behavior stays gated.
2. Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems.
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


<a id="task-0223"></a>
## TASK-0223 — Gameplay golden path execution

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0079](TASKS_PHASE_06.md), [TASK-0080](TASKS_PHASE_06.md), [TASK-0155](TASKS_PHASE_12.md), [TASK-0156](TASKS_PHASE_12.md), [TASK-0150](TASKS_PHASE_12.md), [TASK-0143](TASKS_PHASE_11.md), [TASK-0126](TASKS_PHASE_10.md), [TASK-0211](TASKS_PHASE_16.md), [TASK-0118](TASKS_PHASE_09.md), [TASK-0243](TASKS_PHASE_20.md), [TASK-0196](TASKS_PHASE_15.md), [TASK-0259](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_gameplay_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices.

### Context
This is the bounded gameplay golden path execution deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_gameplay_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_integration_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_gameplay_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_gameplay_results.md`; unresolved reference behavior stays gated.
2. Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices.
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


<a id="task-0224"></a>
## TASK-0224 — Visual regression execution

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0223](TASKS_PHASE_18.md), [TASK-0059](TASKS_PHASE_05.md), [TASK-0060](TASKS_PHASE_05.md), [TASK-0061](TASKS_PHASE_05.md), [TASK-0062](TASKS_PHASE_05.md), [TASK-0063](TASKS_PHASE_05.md), [TASK-0064](TASKS_PHASE_05.md), [TASK-0065](TASKS_PHASE_05.md), [TASK-0066](TASKS_PHASE_05.md), [TASK-0067](TASKS_PHASE_05.md), [TASK-0068](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_visual_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
One final representative responsive/safe-area browser pass across required screens, using user visual/interaction review as final visual acceptance where provided. Preserve high Figma fidelity. No repeated golden captures or large combinatorial viewport/state matrix; native layout smoke stays in Android/iOS release checks.

### Context
This is the bounded visual regression execution deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_visual_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_gameplay_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_visual_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_visual_results.md`; unresolved reference behavior stays gated.
2. One final representative responsive/safe-area browser pass across required screens, using user visual/interaction review as final visual acceptance where provided. Preserve high Figma fidelity. No repeated golden captures or large combinatorial viewport/state matrix; native layout smoke stays in Android/iOS release checks.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
One final representative responsive/safe-area browser pass across required screens, using user visual/interaction review as final visual acceptance where provided. Preserve high Figma fidelity. No repeated golden captures or large combinatorial viewport/state matrix; native layout smoke stays in Android/iOS release checks. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- One final representative responsive/safe-area browser pass across required screens, using user visual/interaction review as final visual acceptance where provided. Preserve high Figma fidelity. No repeated golden captures or large combinatorial viewport/state matrix; native layout smoke stays in Android/iOS release checks.
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


<a id="task-0225"></a>
## TASK-0225 — Device matrix execution

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0224](TASKS_PHASE_18.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_device_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0202, TASK-0203, TASK-0224.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Record actual physical/emulator models,OS,build and pass/block status for every required tier.

### Context
This is the bounded device matrix execution deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_device_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_visual_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_device_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_device_results.md`; unresolved reference behavior stays gated.
2. Record actual physical/emulator models,OS,build and pass/block status for every required tier.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Record actual physical/emulator models,OS,build and pass/block status for every required tier. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record actual physical/emulator models,OS,build and pass/block status for every required tier.
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


<a id="task-0226"></a>
## TASK-0226 — Save migration release QA

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0225](TASKS_PHASE_18.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_save_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0150, TASK-0155, TASK-0223.

Current delivery scope: Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred.

### Context
This is the bounded save migration release qa deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_save_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md)
- `analysis/reports/qa_device_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_save_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_save_results.md`; unresolved reference behavior stays gated.
2. Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred.
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


<a id="task-0227"></a>
## TASK-0227 — Accessibility localization QA

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0224](TASKS_PHASE_18.md), [TASK-0198](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_accessibility_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required.

### Context
This is the bounded accessibility localization qa deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_accessibility_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_save_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_accessibility_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_accessibility_results.md`; unresolved reference behavior stays gated.
2. Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required.
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


<a id="task-0228"></a>
## TASK-0228 — Audio haptic release QA

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0186](TASKS_PHASE_14.md), [TASK-0211](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_audio_results.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0186, TASK-0202, TASK-0203.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Validate original asset rights,event coverage,mix,focus and preference persistence on physical devices.

### Context
This is the bounded audio haptic release qa deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_audio_results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_accessibility_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_audio_results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_audio_results.md`; unresolved reference behavior stays gated.
2. Validate original asset rights,event coverage,mix,focus and preference persistence on physical devices.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Validate original asset rights,event coverage,mix,focus and preference persistence on physical devices. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Validate original asset rights,event coverage,mix,focus and preference persistence on physical devices.
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


<a id="task-0229"></a>
## TASK-0229 — Regression defect closure

Phase: 18 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0049](TASKS_PHASE_04.md), [TASK-0059](TASKS_PHASE_05.md), [TASK-0060](TASKS_PHASE_05.md), [TASK-0061](TASKS_PHASE_05.md), [TASK-0062](TASKS_PHASE_05.md), [TASK-0063](TASKS_PHASE_05.md), [TASK-0064](TASKS_PHASE_05.md), [TASK-0065](TASKS_PHASE_05.md), [TASK-0066](TASKS_PHASE_05.md), [TASK-0067](TASKS_PHASE_05.md), [TASK-0068](TASKS_PHASE_05.md), [TASK-0075](TASKS_PHASE_06.md), [TASK-0077](TASKS_PHASE_06.md), [TASK-0079](TASKS_PHASE_06.md), [TASK-0117](TASKS_PHASE_09.md), [TASK-0118](TASKS_PHASE_09.md), [TASK-0126](TASKS_PHASE_10.md), [TASK-0128](TASKS_PHASE_11.md), [TASK-0129](TASKS_PHASE_11.md), [TASK-0135](TASKS_PHASE_11.md), [TASK-0139](TASKS_PHASE_11.md), [TASK-0147](TASKS_PHASE_12.md), [TASK-0148](TASKS_PHASE_12.md), [TASK-0156](TASKS_PHASE_12.md), [TASK-0159](TASKS_PHASE_13.md), [TASK-0176](TASKS_PHASE_13.md), [TASK-0177](TASKS_PHASE_14.md), [TASK-0179](TASKS_PHASE_14.md), [TASK-0183](TASKS_PHASE_14.md), [TASK-0184](TASKS_PHASE_14.md), [TASK-0185](TASKS_PHASE_14.md), [TASK-0198](TASKS_PHASE_15.md), [TASK-0202](TASKS_PHASE_16.md), [TASK-0203](TASKS_PHASE_16.md), [TASK-0206](TASKS_PHASE_16.md), [TASK-0207](TASKS_PHASE_16.md), [TASK-0208](TASKS_PHASE_16.md), [TASK-0210](TASKS_PHASE_16.md), [TASK-0243](TASKS_PHASE_20.md), [TASK-0253](TASKS_PHASE_00.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/qa_defect_register.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [qa_defect_register.md](../analysis/reports/qa_defect_register.md), [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Close all known P0/P1 product defects with focused fix/retest evidence; reuse final gameplay, responsive, native, audio and performance checks. Do not create a duplicate QA campaign.

### Context
This is the bounded regression defect closure deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/qa_defect_register.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_audio_results.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/qa_defect_register.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/qa_defect_register.md`; unresolved reference behavior stays gated.
2. Close all known P0/P1 product defects with focused fix/retest evidence; reuse final gameplay, responsive, native, audio and performance checks. Do not create a duplicate QA campaign.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Close all known P0/P1 product defects with focused fix/retest evidence; reuse final gameplay, responsive, native, audio and performance checks. Do not create a duplicate QA campaign. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- EV-045 correction: fresh simultaneous deploymentCapacity1, account2 capacity2; full-cap rejection and reserve/merge/restore ownership remain correct. Keep all five visible battle platforms unchanged; no capacity-driven visual locks. Persist the limit; test level1, level2, legacy repair and duplicate/failed commits. Later unlock levels UNKNOWN; first-level XP rule is explicitly PROPOSED.
- Close all known P0/P1 product defects with focused fix/retest evidence; reuse final gameplay, responsive, native, audio and performance checks. Do not create a duplicate QA campaign.
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


<a id="task-0230"></a>
## TASK-0230 — Beta gate acceptance

Phase: 18 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0229](TASKS_PHASE_18.md), [TASK-0028](TASKS_PHASE_02.md), [TASK-0029](TASKS_PHASE_02.md), [TASK-0177](TASKS_PHASE_14.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/beta_gate.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0229, TASK-0237.

Current delivery scope: Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate.

### Context
This is the bounded beta gate acceptance deliverable within close product acceptance gates. Its authoritative output is `analysis/reports/beta_gate.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- `analysis/reports/qa_defect_register.md` — future artifact from listed dependency
- [asset_ownership.csv](../analysis/figma/asset_ownership.csv)
- `analysis/figma/font_ownership.csv` — future artifact from listed dependency
- [audio_asset_ownership.csv](../analysis/figma/audio_asset_ownership.csv)

### Files expected to create

- `analysis/reports/beta_gate.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/beta_gate.md`; unresolved reference behavior stays gated.
2. Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.

### Test cases
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.

### Manual verification
Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate.
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
