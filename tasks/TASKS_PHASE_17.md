# Atomic tasks — phase 17

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_17_PERFORMANCE_AND_OPTIMIZATION.md).

<a id="task-0213"></a>
## TASK-0213 — Performance baseline capture

Phase: 17 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0211](TASKS_PHASE_16.md), [TASK-0196](TASKS_PHASE_15.md), [TASK-0198](TASKS_PHASE_15.md), [TASK-0118](TASKS_PHASE_09.md), [TASK-0126](TASKS_PHASE_10.md), [TASK-0143](TASKS_PHASE_11.md), [TASK-0186](TASKS_PHASE_14.md), [TASK-0212](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of analysis/reports/performance_baseline.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit.

### Context
Bounded performance baseline capture deliverable. Authoritative output: `analysis/reports/performance_baseline.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `tests/integration/native-production.md` — dependency output
- `analysis/reports/content_fidelity_acceptance.md` — dependency output
- `tests/integration/audio-mix.md` — dependency output
- `tooling/ci/native-builds.md` — dependency output

### Files expected to create
- `analysis/reports/performance_baseline.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise `analysis/reports/performance_baseline.md` through the smallest relevant RN/Skia/core/platform harness. Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit. Record platform limitations separately.

### Acceptance criteria
- Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit.
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


<a id="task-0214"></a>
## TASK-0214 — Texture residency optimization

Phase: 17 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0213](TASKS_PHASE_17.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/texture_optimization.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Reduce measured route residency using reviewed sizing/atlas/loading changes and compare visual quality.

### Context
This is the bounded texture residency optimization deliverable within meet measured device budgets. Its authoritative output is `analysis/reports/texture_optimization.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `analysis/reports/performance_baseline.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/texture_optimization.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/texture_optimization.md`; unresolved reference behavior stays gated.
2. Reduce measured route residency using reviewed sizing/atlas/loading changes and compare visual quality.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Reduce measured route residency using reviewed sizing/atlas/loading changes and compare visual quality. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Reduce measured route residency using reviewed sizing/atlas/loading changes and compare visual quality.
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


<a id="task-0215"></a>
## TASK-0215 — Pool allocation optimization

Phase: 17 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0214](TASKS_PHASE_17.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/pool_optimization.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Remove measured per-hit allocations and retained callbacks; stress fixture shows bounded counts.

### Context
This is the bounded pool allocation optimization deliverable within meet measured device budgets. Its authoritative output is `analysis/reports/pool_optimization.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `analysis/reports/texture_optimization.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/pool_optimization.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/pool_optimization.md`; unresolved reference behavior stays gated.
2. Remove measured per-hit allocations and retained callbacks; stress fixture shows bounded counts.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Remove measured per-hit allocations and retained callbacks; stress fixture shows bounded counts. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Remove measured per-hit allocations and retained callbacks; stress fixture shows bounded counts.
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


<a id="task-0216"></a>
## TASK-0216 — Draw-call batching optimization

Phase: 17 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0215](TASKS_PHASE_17.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/drawcall_optimization.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Group compatible materials/atlases based on profiler trace without changing UI layering.

### Context
This is the bounded draw-call batching optimization deliverable within meet measured device budgets. Its authoritative output is `analysis/reports/drawcall_optimization.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `analysis/reports/pool_optimization.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/drawcall_optimization.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/drawcall_optimization.md`; unresolved reference behavior stays gated.
2. Group compatible materials/atlases based on profiler trace without changing UI layering.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Group compatible materials/atlases based on profiler trace without changing UI layering. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Group compatible materials/atlases based on profiler trace without changing UI layering.
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


<a id="task-0217"></a>
## TASK-0217 — Low-quality preset

Phase: 17 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0213](TASKS_PHASE_17.md), [TASK-0159](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/QualityPreset.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Reduce cosmetics/parallax/flyers and optional30fpsrender while preserving core state hash.

### Context
Bounded low-quality preset deliverable. Authoritative output: `app/src/presentation/QualityPreset.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `analysis/reports/drawcall_optimization.md` — dependency output

### Files expected to create
- `app/src/presentation/QualityPreset.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Reduce cosmetics/parallax/flyers and optional30fpsrender while preserving core state hash.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise `app/src/presentation/QualityPreset.ts` through the smallest relevant RN/Skia/core/platform harness. Reduce cosmetics/parallax/flyers and optional30fpsrender while preserving core state hash. Record platform limitations separately.

### Acceptance criteria
- Reduce cosmetics/parallax/flyers and optional30fpsrender while preserving core state hash.
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


<a id="task-0218"></a>
## TASK-0218 — Save throughput optimization

Phase: 17 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0217](TASKS_PHASE_17.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of analysis/reports/save_throughput.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Measure durable queue under kill bursts and optimize batching/journal only with crash-idempotency tests.

### Context
Bounded save throughput optimization deliverable. Authoritative output: `analysis/reports/save_throughput.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `app/src/presentation/QualityPreset.ts` — dependency output

### Files expected to create
- `analysis/reports/save_throughput.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Measure durable queue under kill bursts and optimize batching/journal only with crash-idempotency tests.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise `analysis/reports/save_throughput.md` through the smallest relevant RN/Skia/core/platform harness. Measure durable queue under kill bursts and optimize batching/journal only with crash-idempotency tests. Record platform limitations separately.

### Acceptance criteria
- Measure durable queue under kill bursts and optimize batching/journal only with crash-idempotency tests.
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


<a id="task-0219"></a>
## TASK-0219 — Native memory leak closure

Phase: 17 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0217](TASKS_PHASE_17.md), [TASK-0207](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of analysis/reports/native_memory_acceptance.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Close reproduced resource leaks using representative route/background/reopen checks and bounded pool/subscription observations. Reuse lifecycle smoke; long soak permutations are deferred.

### Context
Bounded native memory leak closure deliverable. Authoritative output: `analysis/reports/native_memory_acceptance.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `analysis/reports/save_throughput.md` — dependency output

### Files expected to create
- `analysis/reports/native_memory_acceptance.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Close reproduced resource leaks using representative route/background/reopen checks and bounded pool/subscription observations. Reuse lifecycle smoke; long soak permutations are deferred.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Exercise `analysis/reports/native_memory_acceptance.md` through the smallest relevant RN/Skia/core/platform harness. Close reproduced resource leaks using representative route/background/reopen checks and bounded pool/subscription observations. Reuse lifecycle smoke; long soak permutations are deferred. Record platform limitations separately.

### Acceptance criteria
- Close reproduced resource leaks using representative route/background/reopen checks and bounded pool/subscription observations. Reuse lifecycle smoke; long soak permutations are deferred.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
L · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0220"></a>
## TASK-0220 — Performance budget acceptance

Phase: 17 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0219](TASKS_PHASE_17.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/performance_acceptance.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0213, TASK-0219, TASK-0229.

Current delivery scope: Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign.

### Context
This is the bounded performance budget acceptance deliverable within meet measured device budgets. Its authoritative output is `analysis/reports/performance_acceptance.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `analysis/reports/native_memory_acceptance.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/performance_acceptance.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/performance_acceptance.md`; unresolved reference behavior stays gated.
2. Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.

### Test cases
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.

### Manual verification
Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign.
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
