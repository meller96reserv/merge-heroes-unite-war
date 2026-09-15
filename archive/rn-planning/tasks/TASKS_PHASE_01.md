# Atomic tasks — phase 01

Current task statuses below match the machine-readable manifest. Planning artifacts alone do not imply implementation completion. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_01_REFERENCE_REVERSE_ENGINEERING.md).

<a id="task-0005"></a>
## TASK-0005 — Reference version lock

Phase: 01 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0004](TASKS_PHASE_00.md) — Fidelity gate registry

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/version_lock.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [version_lock.json](../analysis/reference/version_lock.json), [web_run03_loading.png](../analysis/reference/version_sources/web_run03_loading.png), [ios_us_lookup.json](../analysis/reference/version_sources/ios_us_lookup.json).

### Goal
Confirm LIVE_CRAZY3.16.2 screenshot and capture mobile versions separately; no cross-version formula mixing.

### Context
This is the bounded reference version lock deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/version_lock.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/version_lock.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/version_lock.json`; unresolved reference behavior stays gated.
2. Confirm LIVE_CRAZY3.16.2 screenshot and capture mobile versions separately; no cross-version formula mixing.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Confirm LIVE_CRAZY3.16.2 screenshot and capture mobile versions separately; no cross-version formula mixing. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Confirm LIVE_CRAZY3.16.2 screenshot and capture mobile versions separately; no cross-version formula mixing.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-012 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0006"></a>
## TASK-0006 — Auto-merge unlock capture

Phase: 01 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0004](TASKS_PHASE_00.md) — Fidelity gate registry; [TASK-0005](TASKS_PHASE_01.md) — Reference version lock

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/auto_unlock_capture.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [auto_unlock_capture.md](../analysis/reference/auto_unlock_capture.md), [auto_free_activation.png](../analysis/reference/screenshots/auto_free_activation.png).

### Goal
Finish tutorial and inspect reachable boosts/settings; record activation cost duration and availability or bounded access blocker.

### Context
This is the bounded auto-merge unlock capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/auto_unlock_capture.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/auto_unlock_capture.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/auto_unlock_capture.md`; unresolved reference behavior stays gated.
2. Finish tutorial and inspect reachable boosts/settings; record activation cost duration and availability or bounded access blocker.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Finish tutorial and inspect reachable boosts/settings; record activation cost duration and availability or bounded access blocker. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Finish tutorial and inspect reachable boosts/settings; record activation cost duration and availability or bounded access blocker.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-030 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0007"></a>
## TASK-0007 — Auto-merge ordering

Phase: 01 · Priority: P0 · Type: research · Status: IN_PROGRESS

Dependencies: [TASK-0006](TASKS_PHASE_01.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/auto_order_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Capture five repeats each of [1,1,2],[1,1,1,1],disjoint pairs and max tier; establish pair order and destination only from outcomes.

### Context
This is the bounded auto-merge ordering deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/auto_order_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- `analysis/reference/auto_unlock_capture.md` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/auto_order_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/auto_order_cases.csv`; unresolved reference behavior stays gated.
2. Capture five repeats each of [1,1,2],[1,1,1,1],disjoint pairs and max tier; establish pair order and destination only from outcomes.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Capture five repeats each of [1,1,2],[1,1,1,1],disjoint pairs and max tier; establish pair order and destination only from outcomes. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Capture five repeats each of [1,1,2],[1,1,1,1],disjoint pairs and max tier; establish pair order and destination only from outcomes.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-002 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0008"></a>
## TASK-0008 — Purchase cost measurements

Phase: 01 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0004](TASKS_PHASE_00.md) — Fidelity gate registry; [TASK-0005](TASKS_PHASE_01.md) — Reference version lock

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/purchase_cost_series.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [purchase_cost_series.csv](../analysis/reference/purchase_cost_series.csv), [purchase_cost_fit.json](../analysis/reference/purchase_cost_fit.json), [purchase_cost_capture.md](../analysis/reference/purchase_cost_capture.md).

### Goal
Record thirty sequential prices with no active farming; compare before/after currency and fit residuals separately.

### Context
This is the bounded purchase cost measurements deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/purchase_cost_series.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/purchase_cost_series.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/purchase_cost_series.csv`; unresolved reference behavior stays gated.
2. Record thirty sequential prices with no active farming; compare before/after currency and fit residuals separately.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Record thirty sequential prices with no active farming; compare before/after currency and fit residuals separately. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record thirty sequential prices with no active farming; compare before/after currency and fit residuals separately.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-003 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0009"></a>
## TASK-0009 — Input purchase capture

Phase: 01 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0004](TASKS_PHASE_00.md) — Fidelity gate registry; [TASK-0005](TASKS_PHASE_01.md) — Reference version lock

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/purchase_input_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [purchase_input_cases.csv](../analysis/reference/purchase_input_cases.csv), [purchase_input_results.json](../analysis/reference/purchase_input_results.json), [purchase_input_capture.md](../analysis/reference/purchase_input_capture.md).

### Goal
Test tap,20rapid taps,2s hold,cancel and full board; count accepted buys and tier advance rules.

### Context
This is the bounded input purchase capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/purchase_input_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/purchase_input_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/purchase_input_cases.csv`; unresolved reference behavior stays gated.
2. Test tap,20rapid taps,2s hold,cancel and full board; count accepted buys and tier advance rules.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Test tap,20rapid taps,2s hold,cancel and full board; count accepted buys and tier advance rules. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Test tap,20rapid taps,2s hold,cancel and full board; count accepted buys and tier advance rules.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-032 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0010"></a>
## TASK-0010 — Combat balance measurements

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/combat_samples.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Record twenty hits per tier/target with release impact crit/defense labels separated; include video PTS and uncertainty.

### Context
This is the bounded combat balance measurements deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/combat_samples.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/combat_samples.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/combat_samples.csv`; unresolved reference behavior stays gated.
2. Record twenty hits per tier/target with release impact crit/defense labels separated; include video PTS and uncertainty.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Record twenty hits per tier/target with release impact crit/defense labels separated; include video PTS and uncertainty. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record twenty hits per tier/target with release impact crit/defense labels separated; include video PTS and uncertainty.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-004 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0011"></a>
## TASK-0011 — Targeting capture

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/targeting_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Observe multiple targets and a target dying during projectile flight; distinguish selection from renderer travel.

### Context
This is the bounded targeting capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/targeting_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/targeting_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/targeting_cases.md`; unresolved reference behavior stays gated.
2. Observe multiple targets and a target dying during projectile flight; distinguish selection from renderer travel.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Observe multiple targets and a target dying during projectile flight; distinguish selection from renderer travel. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Observe multiple targets and a target dying during projectile flight; distinguish selection from renderer travel.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-031 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0012"></a>
## TASK-0012 — Boss observations

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/boss_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Capture three boss entries,one timeout,one win and manual retry; record timer HP rewards and farm destination.

### Context
This is the bounded boss observations deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/boss_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/boss_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/boss_cases.csv`; unresolved reference behavior stays gated.
2. Capture three boss entries,one timeout,one win and manual retry; record timer HP rewards and farm destination.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Capture three boss entries,one timeout,one win and manual retry; record timer HP rewards and farm destination. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Capture three boss entries,one timeout,one win and manual retry; record timer HP rewards and farm destination.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-005 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0013"></a>
## TASK-0013 — Reward catalogue

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/reward_catalogue.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Separate kill,first-clear,discovery and repeated-tier rewards; preserve tier2+10gold and tier3+1000gold as distinct observed cases.

### Context
This is the bounded reward catalogue deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/reward_catalogue.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/reward_catalogue.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/reward_catalogue.csv`; unresolved reference behavior stays gated.
2. Separate kill,first-clear,discovery and repeated-tier rewards; preserve tier2+10gold and tier3+1000gold as distinct observed cases.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Separate kill,first-clear,discovery and repeated-tier rewards; preserve tier2+10gold and tier3+1000gold as distinct observed cases. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Separate kill,first-clear,discovery and repeated-tier rewards; preserve tier2+10gold and tier3+1000gold as distinct observed cases.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-007 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0014"></a>
## TASK-0014 — Offline measurements

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/offline_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Compare60s/10m/2h/24h absent intervals,stage/balance and repeated claim; do not substitute foreground farming.

### Context
This is the bounded offline measurements deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/offline_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/offline_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/offline_cases.csv`; unresolved reference behavior stays gated.
2. Compare60s/10m/2h/24h absent intervals,stage/balance and repeated claim; do not substitute foreground farming.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Compare60s/10m/2h/24h absent intervals,stage/balance and repeated claim; do not substitute foreground farming. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Compare60s/10m/2h/24h absent intervals,stage/balance and repeated claim; do not substitute foreground farming.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-006 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0015"></a>
## TASK-0015 — Save behavior capture

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/save_reload_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Reload after purchase/merge/claim and compare visible board/balances; describe bounded reference persistence observations.

### Context
This is the bounded save behavior capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/save_reload_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/save_reload_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/save_reload_cases.md`; unresolved reference behavior stays gated.
2. Reload after purchase/merge/claim and compare visible board/balances; describe bounded reference persistence observations.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Reload after purchase/merge/claim and compare visible board/balances; describe bounded reference persistence observations. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Reload after purchase/merge/claim and compare visible board/balances; describe bounded reference persistence observations.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-013 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0016"></a>
## TASK-0016 — Daily reward observations

Phase: 01 · Priority: P1 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/daily_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Record calendar vs Figma chest conflict,claim/double claim/reset/missed day semantics or concrete waiting limitation.

### Context
This is the bounded daily reward observations deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/daily_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/daily_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/daily_cases.md`; unresolved reference behavior stays gated.
2. Record calendar vs Figma chest conflict,claim/double claim/reset/missed day semantics or concrete waiting limitation.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Record calendar vs Figma chest conflict,claim/double claim/reset/missed day semantics or concrete waiting limitation. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record calendar vs Figma chest conflict,claim/double claim/reset/missed day semantics or concrete waiting limitation.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-014 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0017"></a>
## TASK-0017 — Wheel observations

Phase: 01 · Priority: P1 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/wheel_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Locate live wheel or record bounded absence; capture free/paid/cooldown states and disclosed weights without paid spins.

### Context
This is the bounded wheel observations deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/wheel_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/wheel_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/wheel_cases.md`; unresolved reference behavior stays gated.
2. Locate live wheel or record bounded absence; capture free/paid/cooldown states and disclosed weights without paid spins.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Locate live wheel or record bounded absence; capture free/paid/cooldown states and disclosed weights without paid spins. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Locate live wheel or record bounded absence; capture free/paid/cooldown states and disclosed weights without paid spins.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-015 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0018"></a>
## TASK-0018 — Equipment observations

Phase: 01 · Priority: P1 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/equipment_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Capture owned item equip/swap/enhance before/after on two heroes and distinguish reference system from Figma associations.

### Context
This is the bounded equipment observations deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/equipment_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/equipment_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/equipment_cases.csv`; unresolved reference behavior stays gated.
2. Capture owned item equip/swap/enhance before/after on two heroes and distinguish reference system from Figma associations.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Capture owned item equip/swap/enhance before/after on two heroes and distinguish reference system from Figma associations. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Capture owned item equip/swap/enhance before/after on two heroes and distinguish reference system from Figma associations.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-016 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0019"></a>
## TASK-0019 — Quest observations

Phase: 01 · Priority: P1 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/quest_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Record first two quest conditions/reward icon meanings and claim idempotency; ongoing farm deltas excluded.

### Context
This is the bounded quest observations deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/quest_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [07_QUESTS.md](../docs/progression/07_QUESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [07_QUESTS.md](../docs/progression/07_QUESTS.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/quest_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/quest_cases.csv`; unresolved reference behavior stays gated.
2. Record first two quest conditions/reward icon meanings and claim idempotency; ongoing farm deltas excluded.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Record first two quest conditions/reward icon meanings and claim idempotency; ongoing farm deltas excluded. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record first two quest conditions/reward icon meanings and claim idempotency; ongoing farm deltas excluded.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-017 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0020"></a>
## TASK-0020 — Death recovery capture

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/recovery_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Inspect normal versus Legendary mode attacks,hero HP/death/recovery; no permanent loss rule without evidence.

### Context
This is the bounded death recovery capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/recovery_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/recovery_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/recovery_cases.md`; unresolved reference behavior stays gated.
2. Inspect normal versus Legendary mode attacks,hero HP/death/recovery; no permanent loss rule without evidence.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Inspect normal versus Legendary mode attacks,hero HP/death/recovery; no permanent loss rule without evidence. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Inspect normal versus Legendary mode attacks,hero HP/death/recovery; no permanent loss rule without evidence.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-022 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0021"></a>
## TASK-0021 — Deployment capture

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/deployment_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Test cap,tap withdrawal,drag replacement and merge involving deployed units; preserve owned board identity.

### Context
This is the bounded deployment capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/deployment_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/deployment_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/deployment_cases.md`; unresolved reference behavior stays gated.
2. Test cap,tap withdrawal,drag replacement and merge involving deployed units; preserve owned board identity.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Test cap,tap withdrawal,drag replacement and merge involving deployed units; preserve owned board identity. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Test cap,tap withdrawal,drag replacement and merge involving deployed units; preserve owned board identity.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-023 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0022"></a>
## TASK-0022 — Unlock capture

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/unlock_cases.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Cross account/hero/stage thresholds and identify labels2/3/4/6/10 and31/101/401/601 with screenshots.

### Context
This is the bounded unlock capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/unlock_cases.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/unlock_cases.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/unlock_cases.csv`; unresolved reference behavior stays gated.
2. Cross account/hero/stage thresholds and identify labels2/3/4/6/10 and31/101/401/601 with screenshots.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Cross account/hero/stage thresholds and identify labels2/3/4/6/10 and31/101/401/601 with screenshots. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Cross account/hero/stage thresholds and identify labels2/3/4/6/10 and31/101/401/601 with screenshots.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-024 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0023"></a>
## TASK-0023 — Lifecycle capture

Phase: 01 · Priority: P0 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/lifecycle_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Compare settings and another meta route10s,then background/lock/resume; identify which clocks continue.

### Context
This is the bounded lifecycle capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/lifecycle_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/lifecycle_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/lifecycle_cases.md`; unresolved reference behavior stays gated.
2. Compare settings and another meta route10s,then background/lock/resume; identify which clocks continue.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Compare settings and another meta route10s,then background/lock/resume; identify which clocks continue. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Compare settings and another meta route10s,then background/lock/resume; identify which clocks continue.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-033 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0024"></a>
## TASK-0024 — Skills capture

Phase: 01 · Priority: P1 · Type: research · Status: NOT_STARTED

Dependencies: [TASK-0004](TASKS_PHASE_00.md), [TASK-0005](TASKS_PHASE_01.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reference/skills_cases.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Exact hidden formulas and additional reference captures do not expand the delivered product.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Capture reachable skill details,cooldown,target/status stacking and mode availability; unresolved content remains gated.

### Context
This is the bounded skills capture deliverable within close behavior-specific evidence gates. Its authoritative output is `analysis/reference/skills_cases.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md) · [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_REFERENCE_GAME_REVERSE_ENGINEERING.md](../docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md)
- [05_REFERENCE_CAPTURE_PLAN.md](../docs/05_REFERENCE_CAPTURE_PLAN.md)
- `analysis/reports/fidelity_gates.json` — future artifact from listed dependency
- `analysis/reference/version_lock.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reference/skills_cases.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reference/skills_cases.md`; unresolved reference behavior stays gated.
2. Capture reachable skill details,cooldown,target/status stacking and mode availability; unresolved content remains gated.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.

### Test cases
Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.

### Manual verification
Capture reachable skill details,cooldown,target/status stacking and mode availability; unresolved content remains gated. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Capture reachable skill details,cooldown,target/status stacking and mode availability; unresolved content remains gated.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-021 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
