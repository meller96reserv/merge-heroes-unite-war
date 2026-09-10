# Atomic tasks — phase 00

Current task statuses below match the machine-readable manifest. Planning artifacts alone do not imply implementation completion. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_00_REPOSITORY_AND_ANALYSIS.md).

<a id="task-0001"></a>
## TASK-0001 — Planning handoff validation

Phase: 00 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: None; first handoff task.

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/implementation_handoff.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [handoff report](../analysis/reports/implementation_handoff.md), [checks](../analysis/reports/implementation_handoff_checks.json).

### Goal
Re-run planning validator, verify source hashes and record accepted gates without changing runtime.

### Context
This is the bounded planning handoff validation deliverable within lock handoff and implementation boundaries. Its authoritative output is `analysis/reports/implementation_handoff.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md) · [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md)
- [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md)

### Files expected to create

- `analysis/reports/implementation_handoff.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/implementation_handoff.md`; unresolved reference behavior stays gated.
2. Re-run planning validator, verify source hashes and record accepted gates without changing runtime.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Source changed since planning; user edits present; unknown gate accidentally marked closed.

### Test cases
Run planning validator and source SHA comparison; report exact failures and do not repair user files automatically.

### Manual verification
Re-run planning validator, verify source hashes and record accepted gates without changing runtime. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Re-run planning validator, verify source hashes and record accepted gates without changing runtime.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0002"></a>
## TASK-0002 — Implementation workspace baseline

Phase: 00 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/implementation_baseline.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [implementation_baseline.json](../analysis/reports/implementation_baseline.json).

### Goal
Record current HEAD and user changes; establish isolated implementation branch/worktree without restoring deleted app.

### Context
This is the bounded implementation workspace baseline deliverable within lock handoff and implementation boundaries. Its authoritative output is `analysis/reports/implementation_baseline.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md) · [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md)
- [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/implementation_baseline.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/implementation_baseline.json`; unresolved reference behavior stays gated.
2. Record current HEAD and user changes; establish isolated implementation branch/worktree without restoring deleted app.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Source changed since planning; user edits present; unknown gate accidentally marked closed.

### Test cases
Run planning validator and source SHA comparison; report exact failures and do not repair user files automatically.

### Manual verification
Record current HEAD and user changes; establish isolated implementation branch/worktree without restoring deleted app. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record current HEAD and user changes; establish isolated implementation branch/worktree without restoring deleted app.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0003"></a>
## TASK-0003 — Host decision

Phase: 00 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0002](TASKS_PHASE_00.md) — Implementation workspace baseline

Parallelization: Allowed after listed dependencies; exclusive edit ownership for docs/adr/ADR-002-MOBILE-HOST.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md), [host_decision_checks.json](../analysis/reports/host_decision_checks.json).

### Goal
Lock RN scope from master baseline and document any explicit exception; do not infer it from deleted files.

### Context
This is the bounded host decision deliverable within lock handoff and implementation boundaries. Its authoritative output is `docs/adr/ADR-002-MOBILE-HOST.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md) · [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md)
- [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md)
- `analysis/reports/implementation_baseline.json` — future artifact from listed dependency

### Files expected to create

None; update the existing artifact listed below.

### Files expected to modify

- [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md)

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `docs/adr/ADR-002-MOBILE-HOST.md`; unresolved reference behavior stays gated.
2. Lock RN scope from master baseline and document any explicit exception; do not infer it from deleted files.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Source changed since planning; user edits present; unknown gate accidentally marked closed.

### Test cases
Run planning validator and source SHA comparison; report exact failures and do not repair user files automatically.

### Manual verification
Lock RN scope from master baseline and document any explicit exception; do not infer it from deleted files. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Lock RN scope from master baseline and document any explicit exception; do not infer it from deleted files.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-011 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0004"></a>
## TASK-0004 — Fidelity gate registry

Phase: 00 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0003](TASKS_PHASE_00.md) — Host decision

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/fidelity_gates.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [fidelity_gates.json](../analysis/reports/fidelity_gates.json).

### Goal
Map each HIGH unknown to blocked behavior/data import and named evidence task; proposed fixtures remain separate.

### Context
This is the bounded fidelity gate registry deliverable within lock handoff and implementation boundaries. Its authoritative output is `analysis/reports/fidelity_gates.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md) · [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md)
- [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md)
- [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md)

### Files expected to create

- `analysis/reports/fidelity_gates.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/fidelity_gates.json`; unresolved reference behavior stays gated.
2. Map each HIGH unknown to blocked behavior/data import and named evidence task; proposed fixtures remain separate.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Source changed since planning; user edits present; unknown gate accidentally marked closed.

### Test cases
Run planning validator and source SHA comparison; report exact failures and do not repair user files automatically.

### Manual verification
Map each HIGH unknown to blocked behavior/data import and named evidence task; proposed fixtures remain separate. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Map each HIGH unknown to blocked behavior/data import and named evidence task; proposed fixtures remain separate.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).

<a id="task-0252"></a>
## TASK-0252 — React Native Skia architecture consistency amendment

Phase: 00 · Priority: P0 · Type: documentation · Status: COMPLETED

Dependencies: [TASK-0003](TASKS_PHASE_00.md) — Host decision · [TASK-0004](TASKS_PHASE_00.md) — Fidelity gate registry

Parallelization: Allowed after listed dependencies; exclusive ownership of docs/adr/ADR-007-RN-SKIA-RUNTIME.md. Integrate shared registries coherently.

Evidence: [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md), [runtime_amendment.md](../analysis/reports/runtime_amendment.md), [runtime_amendment_validation.json](../analysis/reports/runtime_amendment_validation.json), [runtime_preservation_audit.json](../analysis/reports/runtime_preservation_audit.json).

### Goal
Targeted migration preserves product evidence and retires obsolete production assumptions; validator reports zero dangling dependencies, zero production Cocos requirements and an acyclic executable DAG.

### Context
Bounded react native skia architecture consistency amendment deliverable. Authoritative output: `docs/adr/ADR-007-RN-SKIA-RUNTIME.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[CODEX_EXECUTION_RULES.md](../CODEX_EXECUTION_RULES.md) · [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md) · [00_EXECUTION_ORDER.md](../plans/00_EXECUTION_ORDER.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [CODEX_EXECUTION_RULES.md](../CODEX_EXECUTION_RULES.md)
- [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md)
- [00_EXECUTION_ORDER.md](../plans/00_EXECUTION_ORDER.md)
- [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md)
- [fidelity_gates.json](../analysis/reports/fidelity_gates.json)

### Files expected to create
- `docs/adr/ADR-007-RN-SKIA-RUNTIME.md`
- `analysis/reports/runtime_amendment.md`
- `analysis/reports/runtime_amendment_validation.json`

### Files expected to modify
- `tasks/task_manifest.json`
- `tools/analysis/validate_planning.py`

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Targeted migration preserves product evidence and retires obsolete production assumptions; validator reports zero dangling dependencies, zero production Cocos requirements and an acyclic executable DAG.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Historical completed evidence stays unchanged; incomplete spike remains SUPERSEDED, never PASS; active tasks cannot depend on retired tasks.

### Test cases
Run planning validator in implementation mode, negative DAG/obsolete requirement fixtures, and preservation hash comparison.

### Manual verification
Exercise `docs/adr/ADR-007-RN-SKIA-RUNTIME.md` through the smallest relevant RN/Skia/core/platform harness. Targeted migration preserves product evidence and retires obsolete production assumptions; validator reports zero dangling dependencies, zero production Cocos requirements and an acyclic executable DAG. Record platform limitations separately.

### Acceptance criteria
- Only affected runtime contracts, tasks and dependencies are amended.
- Preserved Figma analysis/source hashes and engine-independent specification content are audited.
- Planning validator passes with zero dangling dependencies, zero production Cocos requirements and acyclic executable graph.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).

<a id="task-0253"></a>
## TASK-0253 — Targeted product requirements amendment

Phase: 00 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0252](TASKS_PHASE_00.md)

Evidence: [product-amendment.json](../analysis/reports/product-amendment.json), [product-requirements-check.json](../analysis/reports/product-requirements-check.json), [product-consistency.json](../analysis/reports/product-consistency.json).

### Goal
Adopt app-specific TZ,applicable rewarded-ad behavior and relevant delivery guidelines; update affected tasks only; pass consistency without changing runtime architecture.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Adopt app-specific TZ,applicable rewarded-ad behavior and relevant delivery guidelines; update affected tasks only; pass consistency without changing runtime architecture.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Adopt app-specific TZ,applicable rewarded-ad behavior and relevant delivery guidelines; update affected tasks only; pass consistency without changing runtime architecture. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Adopt app-specific TZ,applicable rewarded-ad behavior and relevant delivery guidelines; update affected tasks only; pass consistency without changing runtime architecture.
- Record actual evidence; no NOT_RUN/UNKNOWN is PASS.
- Preserve shared RN/Skia gameplay and safe durable reward authority.

### Definition of Done
Output and actual evidence exist; all dependencies completed; own oracle passes.

### Do not do
Do not add betting,payouts,IAP or ordinary interstitial/banner ads. No grant from animation/ad dismissal. No secrets in source/logs.

### Estimated complexity
M · Risk: low.

### Notes / unknowns
Provider IDs/native compatibility and final legal links are verified by their owning tasks; visible gameplay continues independently.
