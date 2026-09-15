# Atomic tasks — phase 15

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_15_BALANCE_AND_CONTENT.md).

<a id="task-0187"></a>
## TASK-0187 — Numeric precision capture

Phase: 15 · Priority: P1 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0008](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/number_format_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Record displayedK/M/B scales and exact known prices; separate display abbreviation from arithmetic.

### Context
This is the bounded numeric precision capture deliverable within calibrate versioned content from evidence. Its authoritative output is `analysis/reference/number_format_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `analysis/reference/purchase_cost_series.csv` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/number_format_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/number_format_cases.csv`; unresolved reference behavior stays gated.
2. Record displayedK/M/B scales and exact known prices; separate display abbreviation from arithmetic.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Record displayedK/M/B scales and exact known prices; separate display abbreviation from arithmetic. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record displayedK/M/B scales and exact known prices; separate display abbreviation from arithmetic.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-034 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0188"></a>
## TASK-0188 — Balance fitting tool

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0187](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for tools/analysis/balance_fit.py. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Fit candidate rounded/piecewise/exponential models to observed samples and report residuals/holdout error; never extrapolate as fact.

### Context
This is the bounded balance fitting tool deliverable within calibrate versioned content from evidence. Its authoritative output is `tools/analysis/balance_fit.py`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `analysis/reference/number_format_cases.csv` — future artifact from listed dependency

### Files expected to create

- `tools/analysis/balance_fit.py`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `tools/analysis/balance_fit.py`; unresolved reference behavior stays gated.
2. Fit candidate rounded/piecewise/exponential models to observed samples and report residuals/holdout error; never extrapolate as fact.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Fit candidate rounded/piecewise/exponential models to observed samples and report residuals/holdout error; never extrapolate as fact. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Fit candidate rounded/piecewise/exponential models to observed samples and report residuals/holdout error; never extrapolate as fact.
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


<a id="task-0189"></a>
## TASK-0189 — Hero tier content table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0031](TASKS_PHASE_02.md), [TASK-0050](TASKS_PHASE_04.md), [TASK-0118](TASKS_PHASE_09.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/hero-tiers.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite.

### Context
Bounded hero tier content table deliverable. Authoritative output: `app/assets/game-data/hero-tiers.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `tools/analysis/balance_fit.py` — dependency output
- `analysis/figma/content_visual_mapping.csv` — dependency output

### Files expected to create
- `app/assets/game-data/hero-tiers.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/hero-tiers.json` through the smallest relevant RN/Skia/core/platform harness. Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite. Record platform limitations separately.

### Acceptance criteria
- Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite.
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
Exact-parity verification remains assigned to TASK-0013. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0190"></a>
## TASK-0190 — Hero enemy content table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0189](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/heroes.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Populate selected hero definitions and companion enemies/bosses records with valid stats/profile/asset refs.

### Context
Bounded hero enemy content table deliverable. Authoritative output: `app/assets/game-data/heroes.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/assets/game-data/hero-tiers.json` — dependency output

### Files expected to create
- `app/assets/game-data/heroes.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Populate selected hero definitions and companion enemies/bosses records with valid stats/profile/asset refs.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/heroes.json` through the smallest relevant RN/Skia/core/platform harness. Populate selected hero definitions and companion enemies/bosses records with valid stats/profile/asset refs. Record platform limitations separately.

### Acceptance criteria
- Populate selected hero definitions and companion enemies/bosses records with valid stats/profile/asset refs.
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
Exact-parity verification remains assigned to TASK-0010. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0191"></a>
## TASK-0191 — Stage world content table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0190](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/stages.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Populate a reviewed stage/world chain and explicit boss/farm values without square-HP extrapolation.

### Context
Bounded stage world content table deliverable. Authoritative output: `app/assets/game-data/stages.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/assets/game-data/heroes.json` — dependency output

### Files expected to create
- `app/assets/game-data/stages.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Populate a reviewed stage/world chain and explicit boss/farm values without square-HP extrapolation.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/stages.json` through the smallest relevant RN/Skia/core/platform harness. Populate a reviewed stage/world chain and explicit boss/farm values without square-HP extrapolation. Record platform limitations separately.

### Acceptance criteria
- Populate a reviewed stage/world chain and explicit boss/farm values without square-HP extrapolation.
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
Exact-parity verification remains assigned to TASK-0012. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0192"></a>
## TASK-0192 — Economy merge content table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0191](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/economy.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred.

### Context
Bounded economy merge content table deliverable. Authoritative output: `app/assets/game-data/economy.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `app/assets/game-data/stages.json` — dependency output

### Files expected to create
- `app/assets/game-data/economy.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/economy.json` through the smallest relevant RN/Skia/core/platform harness. Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred. Record platform limitations separately.

### Acceptance criteria
- Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred.
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


<a id="task-0193"></a>
## TASK-0193 — Equipment reward content table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0120](TASKS_PHASE_10.md), [TASK-0031](TASKS_PHASE_02.md), [TASK-0074](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/equipment.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas.

### Context
Bounded equipment reward content table deliverable. Authoritative output: `app/assets/game-data/equipment.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/assets/game-data/economy.json` — dependency output

### Files expected to create
- `app/assets/game-data/equipment.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/equipment.json` through the smallest relevant RN/Skia/core/platform harness. Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas. Record platform limitations separately.

### Acceptance criteria
- Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas.
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
Exact-parity verification remains assigned to TASK-0018, TASK-0013. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0194"></a>
## TASK-0194 — Meta unlock content table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0117](TASKS_PHASE_09.md), [TASK-0075](TASKS_PHASE_06.md), [TASK-0253](TASKS_PHASE_00.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/unlocks.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue.

### Context
Bounded meta unlock content table deliverable. Authoritative output: `app/assets/game-data/unlocks.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/assets/game-data/equipment.json` — dependency output

### Files expected to create
- `app/assets/game-data/unlocks.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/unlocks.json` through the smallest relevant RN/Skia/core/platform harness. Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue. Record platform limitations separately.

### Acceptance criteria
- Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue.
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
Exact-parity verification remains assigned to TASK-0016, TASK-0017, TASK-0022, TASK-0019. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0195"></a>
## TASK-0195 — Animation audio config table

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0194](TASKS_PHASE_15.md), [TASK-0176](TASKS_PHASE_13.md), [TASK-0186](TASKS_PHASE_14.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/animations.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems.

### Context
Bounded animation audio config table deliverable. Authoritative output: `app/assets/game-data/animations.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `app/assets/game-data/unlocks.json` — dependency output
- `tests/integration/motion-interruption.md` — dependency output
- `tests/integration/audio-mix.md` — dependency output

### Files expected to create
- `app/assets/game-data/animations.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/animations.json` through the smallest relevant RN/Skia/core/platform harness. Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems. Record platform limitations separately.

### Acceptance criteria
- Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems.
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


<a id="task-0196"></a>
## TASK-0196 — Content cross-reference validator

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0195](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tooling/config/validate-content.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Reject orphan IDs,cycles,invalid tier progression,missing licenses and mislabeled proposed data.

### Context
Bounded content cross-reference validator deliverable. Authoritative output: `tooling/config/validate-content.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `app/assets/game-data/animations.json` — dependency output

### Files expected to create
- `tooling/config/validate-content.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Reject orphan IDs,cycles,invalid tier progression,missing licenses and mislabeled proposed data.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `tooling/config/validate-content.ts` through the smallest relevant RN/Skia/core/platform harness. Reject orphan IDs,cycles,invalid tier progression,missing licenses and mislabeled proposed data. Record platform limitations separately.

### Acceptance criteria
- Reject orphan IDs,cycles,invalid tier progression,missing licenses and mislabeled proposed data.
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


<a id="task-0197"></a>
## TASK-0197 — Balance simulation report

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0196](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/balance_simulation.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Run deterministic progression with purchase/merge strategies and report time-to-tier,boss stalls,currency sources/sinks.

### Context
This is the bounded balance simulation report deliverable within calibrate versioned content from evidence. Its authoritative output is `analysis/reports/balance_simulation.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `tooling/config/validate-content.ts` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/balance_simulation.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/balance_simulation.md`; unresolved reference behavior stays gated.
2. Run deterministic progression with purchase/merge strategies and report time-to-tier,boss stalls,currency sources/sinks.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Run deterministic progression with purchase/merge strategies and report time-to-tier,boss stalls,currency sources/sinks. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Run deterministic progression with purchase/merge strategies and report time-to-tier,boss stalls,currency sources/sinks.
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


<a id="task-0198"></a>
## TASK-0198 — Number formatter localization

Phase: 15 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0054](TASKS_PHASE_04.md), [TASK-0070](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/selectors/NumberFormatter.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Format huge Amount values with locale-aware grouping/compact notation; exact transaction value untouched.

### Context
This is the bounded number formatter localization deliverable within calibrate versioned content from evidence. Its authoritative output is `game-core/src/selectors/NumberFormatter.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `analysis/reports/balance_simulation.md` — future artifact from listed dependency

### Files expected to create

- `game-core/src/selectors/NumberFormatter.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/selectors/NumberFormatter.ts`; unresolved reference behavior stays gated.
2. Format huge Amount values with locale-aware grouping/compact notation; exact transaction value untouched.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Format huge Amount values with locale-aware grouping/compact notation; exact transaction value untouched. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Format huge Amount values with locale-aware grouping/compact notation; exact transaction value untouched.
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


<a id="task-0199"></a>
## TASK-0199 — Localization string catalogue

Phase: 15 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0198](TASKS_PHASE_15.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/game-data/localization/en.json. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Replace baked/dynamic UI text with stable keys and test long/Cyrillic strings without clipping.

### Context
Bounded localization string catalogue deliverable. Authoritative output: `app/assets/game-data/localization/en.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `game-core/src/selectors/NumberFormatter.ts` — dependency output

### Files expected to create
- `app/assets/game-data/localization/en.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Replace baked/dynamic UI text with stable keys and test long/Cyrillic strings without clipping.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `app/assets/game-data/localization/en.json` through the smallest relevant RN/Skia/core/platform harness. Replace baked/dynamic UI text with stable keys and test long/Cyrillic strings without clipping. Record platform limitations separately.

### Acceptance criteria
- Replace baked/dynamic UI text with stable keys and test long/Cyrillic strings without clipping.
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


<a id="task-0200"></a>
## TASK-0200 — Content fidelity acceptance

Phase: 15 · Priority: P1 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0196](TASKS_PHASE_15.md), [TASK-0198](TASKS_PHASE_15.md), [TASK-0118](TASKS_PHASE_09.md), [TASK-0127](TASKS_PHASE_10.md), [TASK-0143](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of analysis/reports/content_fidelity_acceptance.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0196, TASK-0223.

Current delivery scope: Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims.

### Context
Bounded content fidelity acceptance deliverable. Authoritative output: `analysis/reports/content_fidelity_acceptance.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- `app/assets/game-data/localization/en.json` — dependency output
- `game-core/tests/simulation/stage-boss.test.ts` — dependency output
- `game-core/tests/integration/equipment.test.ts` — dependency output
- `tests/integration/meta-lifecycle.md` — dependency output

### Files expected to create
- `analysis/reports/content_fidelity_acceptance.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.

### Test cases
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.

### Manual verification
Exercise `analysis/reports/content_fidelity_acceptance.md` through the smallest relevant RN/Skia/core/platform harness. Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims. Record platform limitations separately.

### Acceptance criteria
- Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims.
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
