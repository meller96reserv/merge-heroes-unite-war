# PHASE 15 — Balance And Content

## Goal
Calibrate versioned content from evidence. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/progression/15_BALANCE_REVERSE_ENGINEERING.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md) · [reference_balance_observed.json](../data-spec/reference_balance_observed.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)

## Inputs
- [15_BALANCE_REVERSE_ENGINEERING.md](../docs/progression/15_BALANCE_REVERSE_ENGINEERING.md)
- [reference_balance_observed.json](../data-spec/reference_balance_observed.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- `analysis/reference/purchase_cost_series.csv` — TASK-0008 predecessor
- `analysis/figma/content_visual_mapping.csv` — TASK-0031 predecessor
- `tests/integration/motion-interruption.md` — TASK-0176 predecessor
- `tests/integration/audio-mix.md` — TASK-0186 predecessor
- `game-core/tests/simulation/stage-boss.test.ts` — TASK-0118 predecessor
- `game-core/tests/integration/equipment.test.ts` — TASK-0127 predecessor
- `tests/integration/meta-lifecycle.md` — TASK-0143 predecessor

## Outputs
- `analysis/reference/number_format_cases.csv` — Numeric precision capture
- `tools/analysis/balance_fit.py` — Balance fitting tool
- `app/assets/game-data/hero-tiers.json` — Hero tier content table
- `app/assets/game-data/heroes.json` — Hero enemy content table
- `app/assets/game-data/stages.json` — Stage world content table
- `app/assets/game-data/economy.json` — Economy merge content table
- `app/assets/game-data/equipment.json` — Equipment reward content table
- `app/assets/game-data/unlocks.json` — Meta unlock content table
- `app/assets/game-data/animations.json` — Animation audio config table
- `tooling/config/validate-content.ts` — Content cross-reference validator
- `analysis/reports/balance_simulation.md` — Balance simulation report
- `game-core/src/selectors/NumberFormatter.ts` — Number formatter localization
- `app/assets/game-data/localization/en.json` — Localization string catalogue
- `analysis/reports/content_fidelity_acceptance.md` — Content fidelity acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0008](../tasks/TASKS_PHASE_01.md) — Purchase cost measurements
- [TASK-0031](../tasks/TASKS_PHASE_02.md) — Content visual mapping
- [TASK-0176](../tasks/TASKS_PHASE_13.md) — Motion freeze and interruption QA
- [TASK-0186](../tasks/TASKS_PHASE_14.md) — Audio mix acceptance
- [TASK-0118](../tasks/TASKS_PHASE_09.md) — Stage boss acceptance
- [TASK-0127](../tasks/TASKS_PHASE_10.md) — Equipment progression acceptance
- [TASK-0143](../tasks/TASKS_PHASE_11.md) — Meta lifecycle acceptance

## Risks
Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 15.1

[TASK-0187](../tasks/TASKS_PHASE_15.md) — Numeric precision capture. Record displayedK/M/B scales and exact known prices; separate display abbreviation from arithmetic. Required predecessors: TASK-0008.

### Step 15.2

[TASK-0188](../tasks/TASKS_PHASE_15.md) — Balance fitting tool. Fit candidate rounded/piecewise/exponential models to observed samples and report residuals/holdout error; never extrapolate as fact. Required predecessors: TASK-0187.

### Step 15.3

[TASK-0189](../tasks/TASKS_PHASE_15.md) — Hero tier content table. Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite. Required predecessors: TASK-0031, TASK-0050, TASK-0118.

### Step 15.4

[TASK-0190](../tasks/TASKS_PHASE_15.md) — Hero enemy content table. Populate selected hero definitions and companion enemies/bosses records with valid stats/profile/asset refs. Required predecessors: TASK-0189.

### Step 15.5

[TASK-0191](../tasks/TASKS_PHASE_15.md) — Stage world content table. Populate a reviewed stage/world chain and explicit boss/farm values without square-HP extrapolation. Required predecessors: TASK-0190.

### Step 15.6

[TASK-0192](../tasks/TASKS_PHASE_15.md) — Economy merge content table. Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred. Required predecessors: TASK-0191.

### Step 15.7

[TASK-0193](../tasks/TASKS_PHASE_15.md) — Equipment reward content table. Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas. Required predecessors: TASK-0120, TASK-0031, TASK-0074.

### Step 15.8

[TASK-0194](../tasks/TASKS_PHASE_15.md) — Meta unlock content table. Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue. Required predecessors: TASK-0117, TASK-0075, TASK-0253.

### Step 15.9

[TASK-0195](../tasks/TASKS_PHASE_15.md) — Animation audio config table. Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems. Required predecessors: TASK-0194, TASK-0176, TASK-0186.

### Step 15.10

[TASK-0196](../tasks/TASKS_PHASE_15.md) — Content cross-reference validator. Reject orphan IDs,cycles,invalid tier progression,missing licenses and mislabeled proposed data. Required predecessors: TASK-0195.

### Step 15.11

[TASK-0197](../tasks/TASKS_PHASE_15.md) — Balance simulation report. Run deterministic progression with purchase/merge strategies and report time-to-tier,boss stalls,currency sources/sinks. Required predecessors: TASK-0196.

### Step 15.12

[TASK-0198](../tasks/TASKS_PHASE_15.md) — Number formatter localization. Format huge Amount values with locale-aware grouping/compact notation; exact transaction value untouched. Required predecessors: TASK-0054, TASK-0070.

### Step 15.13

[TASK-0199](../tasks/TASKS_PHASE_15.md) — Localization string catalogue. Replace baked/dynamic UI text with stable keys and test long/Cyrillic strings without clipping. Required predecessors: TASK-0198.

### Step 15.14

[TASK-0200](../tasks/TASKS_PHASE_15.md) — Content fidelity acceptance. Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims. Required predecessors: TASK-0196, TASK-0198, TASK-0118, TASK-0127, TASK-0143.

## Files/directories expected to be created
- `analysis/reference/number_format_cases.csv`
- `tools/analysis/balance_fit.py`
- `app/assets/game-data/hero-tiers.json`
- `app/assets/game-data/heroes.json`
- `app/assets/game-data/stages.json`
- `app/assets/game-data/economy.json`
- `app/assets/game-data/equipment.json`
- `app/assets/game-data/unlocks.json`
- `app/assets/game-data/animations.json`
- `tooling/config/validate-content.ts`
- `analysis/reports/balance_simulation.md`
- `game-core/src/selectors/NumberFormatter.ts`
- `app/assets/game-data/localization/en.json`
- `analysis/reports/content_fidelity_acceptance.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0187](../tasks/TASKS_PHASE_15.md) — Numeric precision capture
- [TASK-0188](../tasks/TASKS_PHASE_15.md) — Balance fitting tool
- [TASK-0189](../tasks/TASKS_PHASE_15.md) — Hero tier content table
- [TASK-0190](../tasks/TASKS_PHASE_15.md) — Hero enemy content table
- [TASK-0191](../tasks/TASKS_PHASE_15.md) — Stage world content table
- [TASK-0192](../tasks/TASKS_PHASE_15.md) — Economy merge content table
- [TASK-0193](../tasks/TASKS_PHASE_15.md) — Equipment reward content table
- [TASK-0194](../tasks/TASKS_PHASE_15.md) — Meta unlock content table
- [TASK-0195](../tasks/TASKS_PHASE_15.md) — Animation audio config table
- [TASK-0196](../tasks/TASKS_PHASE_15.md) — Content cross-reference validator
- [TASK-0197](../tasks/TASKS_PHASE_15.md) — Balance simulation report
- [TASK-0198](../tasks/TASKS_PHASE_15.md) — Number formatter localization
- [TASK-0199](../tasks/TASKS_PHASE_15.md) — Localization string catalogue
- [TASK-0200](../tasks/TASKS_PHASE_15.md) — Content fidelity acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0187: DEFERRED_POST_DELIVERY.
- TASK-0188: DEFERRED_POST_DELIVERY.
- TASK-0197: DEFERRED_POST_DELIVERY.
- TASK-0199: DEFERRED_POST_DELIVERY.
- TASK-0189: DEFERRED_POST_DELIVERY.
- TASK-0190: DEFERRED_POST_DELIVERY.
- TASK-0191: DEFERRED_POST_DELIVERY.
- TASK-0192: DEFERRED_POST_DELIVERY.
- TASK-0193: DEFERRED_POST_DELIVERY.
- TASK-0194: DEFERRED_POST_DELIVERY.
- TASK-0195: DEFERRED_POST_DELIVERY.
- TASK-0196: DEFERRED_POST_DELIVERY.
- TASK-0198: SUPPORTING_REQUIRED.
- TASK-0200: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
