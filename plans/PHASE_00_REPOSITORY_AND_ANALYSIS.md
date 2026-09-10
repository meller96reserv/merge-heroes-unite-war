# PHASE 00 — Repository And Analysis

## Goal
Lock handoff and implementation boundaries. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/01_PROJECT_SCOPE.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md) · [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md) · [CODEX_EXECUTION_RULES.md](../CODEX_EXECUTION_RULES.md) · [00_EXECUTION_ORDER.md](../plans/00_EXECUTION_ORDER.md)

## Inputs
- [01_PROJECT_SCOPE.md](../docs/01_PROJECT_SCOPE.md)
- [02_SOURCE_OF_TRUTH.md](../docs/02_SOURCE_OF_TRUTH.md)
- [CODEX_EXECUTION_RULES.md](../CODEX_EXECUTION_RULES.md)
- [00_EXECUTION_ORDER.md](../plans/00_EXECUTION_ORDER.md)

## Outputs
- `analysis/reports/implementation_handoff.md` — Planning handoff validation
- `analysis/reports/implementation_baseline.json` — Implementation workspace baseline
- `docs/adr/ADR-002-MOBILE-HOST.md` — Host decision
- `analysis/reports/fidelity_gates.json` — Fidelity gate registry
- `docs/adr/ADR-007-RN-SKIA-RUNTIME.md` — React Native Skia architecture consistency amendment

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
None outside this phase.

## Risks
Source changed since planning; user edits present; unknown gate accidentally marked closed. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 00.1

[TASK-0001](../tasks/TASKS_PHASE_00.md) — Planning handoff validation. Re-run planning validator, verify source hashes and record accepted gates without changing runtime. Required predecessors: none.

### Step 00.2

[TASK-0002](../tasks/TASKS_PHASE_00.md) — Implementation workspace baseline. Record current HEAD and user changes; establish isolated implementation branch/worktree without restoring deleted app. Required predecessors: TASK-0001.

### Step 00.3

[TASK-0003](../tasks/TASKS_PHASE_00.md) — Host decision. Lock RN scope from master baseline and document any explicit exception; do not infer it from deleted files. Required predecessors: TASK-0002.

### Step 00.4

[TASK-0004](../tasks/TASKS_PHASE_00.md) — Fidelity gate registry. Map each HIGH unknown to blocked behavior/data import and named evidence task; proposed fixtures remain separate. Required predecessors: TASK-0003.

### Step 00.5

[TASK-0252](../tasks/TASKS_PHASE_00.md) — React Native Skia architecture consistency amendment. Targeted migration preserves product evidence and retires obsolete production assumptions; validator reports zero dangling dependencies, zero production Cocos requirements and an acyclic executable DAG. Required predecessors: TASK-0003, TASK-0004.


[TASK-0253](../tasks/TASKS_PHASE_00.md) — Targeted product requirements amendment. Adopt app-specific TZ,applicable rewarded-ad behavior and relevant delivery guidelines; update affected tasks only; pass consistency without changing runtime architecture. Required predecessors: TASK-0252.

## Files/directories expected to be created
- `analysis/reports/implementation_handoff.md`
- `analysis/reports/implementation_baseline.json`
- `docs/adr/ADR-002-MOBILE-HOST.md`
- `analysis/reports/fidelity_gates.json`
- `docs/adr/ADR-007-RN-SKIA-RUNTIME.md`

- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`

## Existing files expected to be modified

- [ADR-002-MOBILE-HOST.md](../docs/adr/ADR-002-MOBILE-HOST.md)

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Run planning validator and source SHA comparison; report exact failures and do not repair user files automatically. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
Use the same RN/Skia/core implementation with deterministic fixtures. Verify preview-specific storage/audio unlock and viewport behavior where affected; Web and native share gameplay, assets and Skia composition.

## Failure/rollback strategy
Keep prior valid source/config/save generation. Revert only the bounded implementation changes on its branch, preserving user edits and captured evidence. Failed durable commands retain old state; failed schema migration preserves backup; failed native checks remain open in their owning tasks and gate release.

## Definition of Done
All in-scope task oracles pass; artifacts,source docs,schemas and tests agree; evidence links resolve; no task hides unresolved work behind a generic TODO. Optional excludedP2work is explicitly classified.

## Exit criteria
Dependent tasks can consume the listed outputs with named versions and accepted gates. Release/runtime feasibility is claimed only where actual execution evidence exists. Update task manifest and phase result with accepted/not-run/blocked distinctions.

## Tasks generated from this phase
- [TASK-0001](../tasks/TASKS_PHASE_00.md) — Planning handoff validation
- [TASK-0002](../tasks/TASKS_PHASE_00.md) — Implementation workspace baseline
- [TASK-0003](../tasks/TASKS_PHASE_00.md) — Host decision
- [TASK-0004](../tasks/TASKS_PHASE_00.md) — Fidelity gate registry
- [TASK-0252](../tasks/TASKS_PHASE_00.md) — React Native Skia architecture consistency amendment
