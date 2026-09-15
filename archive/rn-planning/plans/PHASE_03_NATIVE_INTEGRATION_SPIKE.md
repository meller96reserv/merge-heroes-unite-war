# Historical phase — SUPERSEDED by ADR-007

Original spike plan retained below as historical evidence. No active production task depends on this phase; incomplete tasks are SUPERSEDED.

# PHASE 03 — Native Integration Spike

## Goal
Prove native host feasibility early. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) · [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md) · [Execution rules](../CODEX_EXECUTION_RULES.md).

## Inputs

- [15_REACT_NATIVE_COCOS_INTEGRATION.md](../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md)
- [ACCEPTANCE.md](../spikes/rn-cocos/ACCEPTANCE.md)
- [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md)

## Outputs

- `spikes/rn-cocos/toolchain.json` — Native toolchain lock
- `spikes/rn-cocos/cocos-probe/README.md` — Standalone Cocos export probe
- `spikes/rn-cocos/rn-probe/README.md` — Standalone RN host probe
- `spikes/rn-cocos/android-host-results.md` — Android full-screen host probe
- `spikes/rn-cocos/ios-host-results.md` — iOS full-screen host probe
- `spikes/rn-cocos/bridge-results.json` — Bridge ping probe
- `spikes/rn-cocos/lifecycle-results.json` — Native lifecycle probe
- `spikes/rn-cocos/audio-results.md` — Native audio focus probe
- `spikes/rn-cocos/memory-cycles.csv` — Native memory probe
- `spikes/rn-cocos/acceptance-results.md` — Native integration acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies

- [TASK-0003](../tasks/TASKS_PHASE_00.md) — Host decision

## Risks
Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/bridge/save boundaries. Native production phases require accepted spike strategy; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence

### Step 03.1

[TASK-0037](../tasks/TASKS_PHASE_03.md) — Native toolchain lock. Install/pin missing Cocos3.8patch and compatible RN/native tools; record actual paths/versions from successful probes. Required predecessors: TASK-0003.

### Step 03.2

[TASK-0038](../tasks/TASKS_PHASE_03.md) — Standalone Cocos export probe. Create minimal colored scene with touch counter and export Android/iOS; attach actual build logs. Required predecessors: TASK-0037.

### Step 03.3

[TASK-0039](../tasks/TASKS_PHASE_03.md) — Standalone RN host probe. Create minimal RN entry screen using pinned versions and demonstrate both target builds. Required predecessors: TASK-0037.

### Step 03.4

[TASK-0040](../tasks/TASKS_PHASE_03.md) — Android full-screen host probe. Launch one CocosActivity from RN,render continuously and return with Back; no duplicate engine creation. Required predecessors: TASK-0038, TASK-0039.

### Step 03.5

[TASK-0041](../tasks/TASKS_PHASE_03.md) — iOS full-screen host probe. Present one CocosViewController from RN and dismiss; attach simulator/device results or precise environment blocker. Required predecessors: TASK-0038, TASK-0039.

### Step 03.6

[TASK-0042](../tasks/TASKS_PHASE_03.md) — Bridge ping probe. Send typed ping each direction and reject malformed/stale generation messages on receiving runtime thread. Required predecessors: TASK-0040, TASK-0041.

### Step 03.7

[TASK-0043](../tasks/TASKS_PHASE_03.md) — Native lifecycle probe. Run10reopen and10background cycles on both targets; record touch surface and session ownership outcomes. Required predecessors: TASK-0042.

### Step 03.8

[TASK-0044](../tasks/TASKS_PHASE_03.md) — Native audio focus probe. Test loop+oneshot interruption/mute/headphones and resume once on both hosts. Required predecessors: TASK-0043.

### Step 03.9

[TASK-0045](../tasks/TASKS_PHASE_03.md) — Native memory probe. Record baseline and10cycle memory with warmup; investigate retained Activity/controller/engine growth. Required predecessors: TASK-0043.

### Step 03.10

[TASK-0046](../tasks/TASKS_PHASE_03.md) — Native integration acceptance. Evaluate every NAT case with evidence; update ADR strategy and keep failing platform gate closed. Required predecessors: TASK-0045, TASK-0044, TASK-0042.

## Files/directories expected to be created

- `spikes/rn-cocos/toolchain.json`
- `spikes/rn-cocos/cocos-probe/README.md`
- `spikes/rn-cocos/rn-probe/README.md`
- `spikes/rn-cocos/android-host-results.md`
- `spikes/rn-cocos/ios-host-results.md`
- `spikes/rn-cocos/bridge-results.json`
- `spikes/rn-cocos/lifecycle-results.json`
- `spikes/rn-cocos/audio-results.md`
- `spikes/rn-cocos/memory-cycles.csv`
- `spikes/rn-cocos/acceptance-results.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

## Manual validation procedure
Open each output from this phase, reproduce its named input/scenario, compare expected/actual behavior and retain evidence. For interactive outputs exercise success,disabled/locked,pending,error and interrupted states; for research verify source/time/version and uncertainty.

## Performance checks
Measure any changed native/render/storage hot path against [budgets](../docs/technical/14_PERFORMANCE_BUDGET.md). Documentation/research-only outputs need reproducible generation and bounded artifact size; they cannot claim runtime performance pass.

## Visual checks
Use source screen IDs and [visual protocol](../docs/qa/05_VISUAL_REGRESSION.md) for rendered outputs. Keep exact Figma and15-slot adaptation baselines separate. Nonvisual outputs need readable evidence/diagnostics, not screenshot-only assertions.

## Android checks
For native/runtime changes run relevant device/harness cases and attach actual build/OS results. Pure-domain/research tasks use platform-independent tests; Android acceptance remains in native/device tasks and is never inferred from web.

## iOS checks
Run equivalent native cases or record the precise environment blocker. Simulator success does not substitute for physical audio/performance. No Android-only result closes a both-platform gate.

## Web-preview checks
Use the same Cocos/core implementation with deterministic fixtures. Verify preview-specific storage/audio unlock and viewport behavior where affected; do not build a separate React game prototype.

## Failure/rollback strategy
Keep prior valid source/config/save generation. Revert only the bounded implementation changes on its branch, preserving user edits and captured evidence. Failed durable commands retain old state; failed schema migration preserves backup; native failure keeps integration gate closed.

## Definition of Done
All in-scope task oracles pass; artifacts,source docs,schemas and tests agree; evidence links resolve; no task hides unresolved work behind a generic TODO. Optional excludedP2work is explicitly classified.

## Exit criteria
Dependent tasks can consume the listed outputs with named versions and accepted gates. Release/runtime feasibility is claimed only where actual execution evidence exists. Update task manifest and phase result with accepted/not-run/blocked distinctions.

## Tasks generated from this phase

- [TASK-0037](../tasks/TASKS_PHASE_03.md) — Native toolchain lock
- [TASK-0038](../tasks/TASKS_PHASE_03.md) — Standalone Cocos export probe
- [TASK-0039](../tasks/TASKS_PHASE_03.md) — Standalone RN host probe
- [TASK-0040](../tasks/TASKS_PHASE_03.md) — Android full-screen host probe
- [TASK-0041](../tasks/TASKS_PHASE_03.md) — iOS full-screen host probe
- [TASK-0042](../tasks/TASKS_PHASE_03.md) — Bridge ping probe
- [TASK-0043](../tasks/TASKS_PHASE_03.md) — Native lifecycle probe
- [TASK-0044](../tasks/TASKS_PHASE_03.md) — Native audio focus probe
- [TASK-0045](../tasks/TASKS_PHASE_03.md) — Native memory probe
- [TASK-0046](../tasks/TASKS_PHASE_03.md) — Native integration acceptance

[Task file](../tasks/TASKS_PHASE_03.md) · [Execution order](00_EXECUTION_ORDER.md) · [Dependency graph](01_DEPENDENCY_GRAPH.md).
