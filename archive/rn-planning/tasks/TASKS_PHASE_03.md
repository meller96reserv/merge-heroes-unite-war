# Historical phase — SUPERSEDED by ADR-007

Completed evidence is retained; incomplete tasks are SUPERSEDED. This phase is outside the executable production graph.

# Atomic tasks — phase 03

Current task statuses below match the machine-readable manifest. Planning artifacts alone do not imply implementation completion. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_03_NATIVE_INTEGRATION_SPIKE.md).

<a id="task-0037"></a>
## TASK-0037 — Native toolchain lock

Phase: 03 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0003](TASKS_PHASE_00.md) — Host decision

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/toolchain.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [toolchain.json](../spikes/rn-cocos/toolchain.json), [toolchain-cocos-web.log](../spikes/rn-cocos/logs/toolchain-cocos-web.log).

### Goal
Install/pin missing Cocos3.8patch and compatible RN/native tools; record actual paths/versions from successful probes.

### Context
This is the bounded native toolchain lock deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/toolchain.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md)

### Files expected to create

- `spikes/rn-cocos/toolchain.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/toolchain.json`; unresolved reference behavior stays gated.
2. Install/pin missing Cocos3.8patch and compatible RN/native tools; record actual paths/versions from successful probes.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/Cocos/native harness that reaches this output. Install/pin missing Cocos3.8patch and compatible RN/native tools; record actual paths/versions from successful probes. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Install/pin missing Cocos3.8patch and compatible RN/native tools; record actual paths/versions from successful probes.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0038"></a>
## TASK-0038 — Standalone Cocos export probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0037](TASKS_PHASE_03.md) — Native toolchain lock

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/cocos-probe/README.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [cocos-android-standalone.json](../spikes/rn-cocos/evidence/cocos-android-standalone.json), [cocos-ios-standalone.json](../spikes/rn-cocos/evidence/cocos-ios-standalone.json), [cocos-web-preview.json](../spikes/rn-cocos/evidence/cocos-web-preview.json).

### Goal
Create minimal colored scene with touch counter and export Android/iOS; attach actual build logs.

### Context
This is the bounded standalone cocos export probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/cocos-probe/README.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/toolchain.json` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/cocos-probe/README.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/cocos-probe/README.md`; unresolved reference behavior stays gated.
2. Create minimal colored scene with touch counter and export Android/iOS; attach actual build logs.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Create minimal colored scene with touch counter and export Android/iOS; attach actual build logs. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Create minimal colored scene with touch counter and export Android/iOS; attach actual build logs.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0039"></a>
## TASK-0039 — Standalone RN host probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0037](TASKS_PHASE_03.md) — Native toolchain lock

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/rn-probe/README.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [rn-standalone.json](../spikes/rn-cocos/evidence/rn-standalone.json), [rn-android-build.log](../spikes/rn-cocos/logs/rn-android-build.log), [rn-ios-build.log](../spikes/rn-cocos/logs/rn-ios-build.log).

### Goal
Create minimal RN entry screen using pinned versions and demonstrate both target builds.

### Context
This is the bounded standalone rn host probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/rn-probe/README.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/toolchain.json` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/rn-probe/README.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/rn-probe/README.md`; unresolved reference behavior stays gated.
2. Create minimal RN entry screen using pinned versions and demonstrate both target builds.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Create minimal RN entry screen using pinned versions and demonstrate both target builds. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Create minimal RN entry screen using pinned versions and demonstrate both target builds.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0040"></a>
## TASK-0040 — Android full-screen host probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0038](TASKS_PHASE_03.md) — Standalone Cocos export probe; [TASK-0039](TASKS_PHASE_03.md) — Standalone RN host probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/android-host-results.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [android-host-results.md](../spikes/rn-cocos/android-host-results.md), [android-host.json](../spikes/rn-cocos/evidence/android-host.json).

### Goal
Launch one CocosActivity from RN,render continuously and return with Back; no duplicate engine creation.

### Context
This is the bounded android full-screen host probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/android-host-results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/cocos-probe/README.md` — future artifact from listed dependency
- `spikes/rn-cocos/rn-probe/README.md` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/android-host-results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/android-host-results.md`; unresolved reference behavior stays gated.
2. Launch one CocosActivity from RN,render continuously and return with Back; no duplicate engine creation.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Launch one CocosActivity from RN,render continuously and return with Back; no duplicate engine creation. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Launch one CocosActivity from RN,render continuously and return with Back; no duplicate engine creation.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0041"></a>
## TASK-0041 — iOS full-screen host probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0038](TASKS_PHASE_03.md) — Standalone Cocos export probe; [TASK-0039](TASKS_PHASE_03.md) — Standalone RN host probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/ios-host-results.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [ios-host-results.md](../spikes/rn-cocos/ios-host-results.md), [ios-host.json](../spikes/rn-cocos/evidence/ios-host.json).

### Goal
Present one CocosViewController from RN and dismiss; attach simulator/device results or precise environment blocker.

### Context
This is the bounded ios full-screen host probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/ios-host-results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/cocos-probe/README.md` — future artifact from listed dependency
- `spikes/rn-cocos/rn-probe/README.md` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/ios-host-results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/ios-host-results.md`; unresolved reference behavior stays gated.
2. Present one CocosViewController from RN and dismiss; attach simulator/device results or precise environment blocker.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Present one CocosViewController from RN and dismiss; attach simulator/device results or precise environment blocker. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Present one CocosViewController from RN and dismiss; attach simulator/device results or precise environment blocker.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0042"></a>
## TASK-0042 — Bridge ping probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0040](TASKS_PHASE_03.md) — Android full-screen host probe; [TASK-0041](TASKS_PHASE_03.md) — iOS full-screen host probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/bridge-results.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [bridge-results.json](../spikes/rn-cocos/bridge-results.json), [bridge-all-jest.log](../spikes/rn-cocos/logs/bridge-all-jest.log), [bridge-typescript-final.log](../spikes/rn-cocos/logs/bridge-typescript-final.log).

### Goal
Send typed ping each direction and reject malformed/stale generation messages on receiving runtime thread.

### Context
This is the bounded bridge ping probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/bridge-results.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [18_BRIDGE_PROTOCOL.md](../docs/technical/18_BRIDGE_PROTOCOL.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- [18_BRIDGE_PROTOCOL.md](../docs/technical/18_BRIDGE_PROTOCOL.md)
- `spikes/rn-cocos/android-host-results.md` — future artifact from listed dependency
- `spikes/rn-cocos/ios-host-results.md` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/bridge-results.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/bridge-results.json`; unresolved reference behavior stays gated.
2. Send typed ping each direction and reject malformed/stale generation messages on receiving runtime thread.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Send typed ping each direction and reject malformed/stale generation messages on receiving runtime thread. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Send typed ping each direction and reject malformed/stale generation messages on receiving runtime thread.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0043"></a>
## TASK-0043 — Native lifecycle probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0042](TASKS_PHASE_03.md) — Bridge ping probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/lifecycle-results.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [lifecycle-results.json](../spikes/rn-cocos/lifecycle-results.json), [lifecycle-ios.json](../spikes/rn-cocos/evidence/lifecycle-ios.json), [lifecycle-jest.log](../spikes/rn-cocos/logs/lifecycle-jest.log).

### Goal
Run10reopen and10background cycles on both targets; record touch surface and session ownership outcomes.

### Context
This is the bounded native lifecycle probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/lifecycle-results.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/bridge-results.json` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/lifecycle-results.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/lifecycle-results.json`; unresolved reference behavior stays gated.
2. Run10reopen and10background cycles on both targets; record touch surface and session ownership outcomes.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Run10reopen and10background cycles on both targets; record touch surface and session ownership outcomes. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Run10reopen and10background cycles on both targets; record touch surface and session ownership outcomes.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0044"></a>
## TASK-0044 — Native audio focus probe

Phase: 03 · Priority: P0 · Type: test · Status: SUPERSEDED

Dependencies: [TASK-0043](TASKS_PHASE_03.md) — Native lifecycle probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/audio-results.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [audio-results.md](../spikes/rn-cocos/audio-results.md). Simulator cases verified; full original physical oracle remains PARTIAL. Production pivot directed by user after this checkpoint.

### Goal
Test loop+oneshot interruption/mute/headphones and resume once on both hosts.

### Context
This is the bounded native audio focus probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/audio-results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/lifecycle-results.json` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/audio-results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/audio-results.md`; unresolved reference behavior stays gated.
2. Test loop+oneshot interruption/mute/headphones and resume once on both hosts.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Test loop+oneshot interruption/mute/headphones and resume once on both hosts. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Test loop+oneshot interruption/mute/headphones and resume once on both hosts.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0045"></a>
## TASK-0045 — Native memory probe

Phase: 03 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0043](TASKS_PHASE_03.md) — Native lifecycle probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/memory-cycles.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [memory-cycles.csv](../spikes/rn-cocos/memory-cycles.csv), [memory-results.json](../spikes/rn-cocos/memory-results.json), [memory-results.md](../spikes/rn-cocos/memory-results.md).

### Goal
Record baseline and10cycle memory with warmup; investigate retained Activity/controller/engine growth.

### Context
This is the bounded native memory probe deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/memory-cycles.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/lifecycle-results.json` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/memory-cycles.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/memory-cycles.csv`; unresolved reference behavior stays gated.
2. Record baseline and10cycle memory with warmup; investigate retained Activity/controller/engine growth.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Record baseline and10cycle memory with warmup; investigate retained Activity/controller/engine growth. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Record baseline and10cycle memory with warmup; investigate retained Activity/controller/engine growth.
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


Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.

<a id="task-0046"></a>
## TASK-0046 — Native integration acceptance

Phase: 03 · Priority: P0 · Type: test · Status: SUPERSEDED

Dependencies: [TASK-0045](TASKS_PHASE_03.md) — Native memory probe; [TASK-0044](TASKS_PHASE_03.md) — Native audio focus probe; [TASK-0042](TASKS_PHASE_03.md) — Bridge ping probe

Parallelization: Allowed after listed dependencies; exclusive edit ownership for spikes/rn-cocos/acceptance-results.md. Shared registries are integrated by their dedicated validation/wiring task.

### Goal
Evaluate every NAT case with evidence; update ADR strategy and keep failing platform gate closed.

### Context
This is the bounded native integration acceptance deliverable within prove native host feasibility early. Its authoritative output is `spikes/rn-cocos/acceptance-results.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- `spikes/rn-cocos/memory-cycles.csv` — future artifact from listed dependency
- `spikes/rn-cocos/audio-results.md` — future artifact from listed dependency
- `spikes/rn-cocos/bridge-results.json` — future artifact from listed dependency

### Files expected to create

- `spikes/rn-cocos/acceptance-results.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `spikes/rn-cocos/acceptance-results.md`; unresolved reference behavior stays gated.
2. Evaluate every NAT case with evidence; update ADR strategy and keep failing platform gate closed.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.

### Test cases
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.

### Manual verification
Evaluate every NAT case with evidence; update ADR strategy and keep failing platform gate closed. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Evaluate every NAT case with evidence; update ADR strategy and keep failing platform gate closed.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-001 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).

Historical applicability: SUPERSEDED by ADR-007. Original acceptance status and evidence above remain historical; no production dependency may target this task.
