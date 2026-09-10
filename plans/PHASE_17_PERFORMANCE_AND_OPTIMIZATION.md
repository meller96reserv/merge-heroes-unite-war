# PHASE 17 — Performance And Optimization

## Goal
Meet measured device budgets. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/technical/14_PERFORMANCE_BUDGET.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md) · [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)

## Inputs
- [14_PERFORMANCE_BUDGET.md](../docs/technical/14_PERFORMANCE_BUDGET.md)
- [06_PERFORMANCE_TESTING.md](../docs/qa/06_PERFORMANCE_TESTING.md)
- `tests/integration/native-production.md` — TASK-0211 predecessor
- `analysis/reports/content_fidelity_acceptance.md` — TASK-0200 predecessor
- `tests/integration/audio-mix.md` — TASK-0186 predecessor
- `tooling/ci/native-builds.md` — TASK-0212 predecessor

## Outputs
- `analysis/reports/performance_baseline.md` — Performance baseline capture
- `analysis/reports/texture_optimization.md` — Texture residency optimization
- `analysis/reports/pool_optimization.md` — Pool allocation optimization
- `analysis/reports/drawcall_optimization.md` — Draw-call batching optimization
- `app/src/presentation/QualityPreset.ts` — Low-quality preset
- `analysis/reports/save_throughput.md` — Save throughput optimization
- `analysis/reports/native_memory_acceptance.md` — Native memory leak closure
- `analysis/reports/performance_acceptance.md` — Performance budget acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0211](../tasks/TASKS_PHASE_16.md) — Native production lifecycle QA
- [TASK-0200](../tasks/TASKS_PHASE_15.md) — Content fidelity acceptance
- [TASK-0186](../tasks/TASKS_PHASE_14.md) — Audio mix acceptance
- [TASK-0212](../tasks/TASKS_PHASE_16.md) — Native build reproducibility

## Risks
Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 17.1

[TASK-0213](../tasks/TASKS_PHASE_17.md) — Performance baseline capture. Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit. Required predecessors: TASK-0211, TASK-0196, TASK-0198, TASK-0118, TASK-0126, TASK-0143, TASK-0186, TASK-0212.

### Step 17.2

[TASK-0214](../tasks/TASKS_PHASE_17.md) — Texture residency optimization. Reduce measured route residency using reviewed sizing/atlas/loading changes and compare visual quality. Required predecessors: TASK-0213.

### Step 17.3

[TASK-0215](../tasks/TASKS_PHASE_17.md) — Pool allocation optimization. Remove measured per-hit allocations and retained callbacks; stress fixture shows bounded counts. Required predecessors: TASK-0214.

### Step 17.4

[TASK-0216](../tasks/TASKS_PHASE_17.md) — Draw-call batching optimization. Group compatible materials/atlases based on profiler trace without changing UI layering. Required predecessors: TASK-0215.

### Step 17.5

[TASK-0217](../tasks/TASKS_PHASE_17.md) — Low-quality preset. Reduce cosmetics/parallax/flyers and optional30fpsrender while preserving core state hash. Required predecessors: TASK-0213, TASK-0159.

### Step 17.6

[TASK-0218](../tasks/TASKS_PHASE_17.md) — Save throughput optimization. Measure durable queue under kill bursts and optimize batching/journal only with crash-idempotency tests. Required predecessors: TASK-0217.

### Step 17.7

[TASK-0219](../tasks/TASKS_PHASE_17.md) — Native memory leak closure. Close reproduced resource leaks using representative route/background/reopen checks and bounded pool/subscription observations. Reuse lifecycle smoke; long soak permutations are deferred. Required predecessors: TASK-0217, TASK-0207.

### Step 17.8

[TASK-0220](../tasks/TASKS_PHASE_17.md) — Performance budget acceptance. Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign. Required predecessors: TASK-0219.

## Files/directories expected to be created
- `analysis/reports/performance_baseline.md`
- `analysis/reports/texture_optimization.md`
- `analysis/reports/pool_optimization.md`
- `analysis/reports/drawcall_optimization.md`
- `app/src/presentation/QualityPreset.ts`
- `analysis/reports/save_throughput.md`
- `analysis/reports/native_memory_acceptance.md`
- `analysis/reports/performance_acceptance.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0213](../tasks/TASKS_PHASE_17.md) — Performance baseline capture
- [TASK-0214](../tasks/TASKS_PHASE_17.md) — Texture residency optimization
- [TASK-0215](../tasks/TASKS_PHASE_17.md) — Pool allocation optimization
- [TASK-0216](../tasks/TASKS_PHASE_17.md) — Draw-call batching optimization
- [TASK-0217](../tasks/TASKS_PHASE_17.md) — Low-quality preset
- [TASK-0218](../tasks/TASKS_PHASE_17.md) — Save throughput optimization
- [TASK-0219](../tasks/TASKS_PHASE_17.md) — Native memory leak closure
- [TASK-0220](../tasks/TASKS_PHASE_17.md) — Performance budget acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0214: DEFERRED_POST_DELIVERY.
- TASK-0215: DEFERRED_POST_DELIVERY.
- TASK-0216: DEFERRED_POST_DELIVERY.
- TASK-0218: DEFERRED_POST_DELIVERY.
- TASK-0213: DEFERRED_POST_DELIVERY.
- TASK-0217: DEFERRED_POST_DELIVERY.
- TASK-0219: DEFERRED_POST_DELIVERY.
- TASK-0220: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
