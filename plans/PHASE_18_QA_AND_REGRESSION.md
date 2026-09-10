# PHASE 18 — Qa And Regression

## Goal
Close product acceptance gates. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/qa/01_TEST_STRATEGY.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md) · [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md) · [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md)

## Inputs
- [01_TEST_STRATEGY.md](../docs/qa/01_TEST_STRATEGY.md)
- [03_INTEGRATION_TEST_MATRIX.md](../docs/qa/03_INTEGRATION_TEST_MATRIX.md)
- [09_SAVE_MIGRATIONS.md](../docs/technical/09_SAVE_MIGRATIONS.md)
- `analysis/reports/performance_acceptance.md` — TASK-0220 predecessor
- `analysis/figma/asset_ownership.csv` — TASK-0028 predecessor
- `analysis/figma/font_ownership.csv` — TASK-0029 predecessor
- `analysis/figma/audio_asset_ownership.csv` — TASK-0177 predecessor

## Outputs
- `analysis/reports/qa_unit_results.md` — Core unit matrix execution
- `analysis/reports/qa_integration_results.md` — Integration matrix execution
- `analysis/reports/qa_gameplay_results.md` — Gameplay golden path execution
- `analysis/reports/qa_visual_results.md` — Visual regression execution
- `analysis/reports/qa_device_results.md` — Device matrix execution
- `analysis/reports/qa_save_results.md` — Save migration release QA
- `analysis/reports/qa_accessibility_results.md` — Accessibility localization QA
- `analysis/reports/qa_audio_results.md` — Audio haptic release QA
- `analysis/reports/qa_defect_register.md` — Regression defect closure
- `analysis/reports/beta_gate.md` — Beta gate acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0220](../tasks/TASKS_PHASE_17.md) — Performance budget acceptance
- [TASK-0028](../tasks/TASKS_PHASE_02.md) — Asset rights ledger
- [TASK-0029](../tasks/TASKS_PHASE_02.md) — Font acquisition
- [TASK-0177](../tasks/TASKS_PHASE_14.md) — Audio acquisition

## Risks
Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 18.1

[TASK-0221](../tasks/TASKS_PHASE_18.md) — Core unit matrix execution. Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies. Required predecessors: TASK-0079, TASK-0080.

### Step 18.2

[TASK-0222](../tasks/TASKS_PHASE_18.md) — Integration matrix execution. Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems. Required predecessors: TASK-0221, TASK-0157, TASK-0143, TASK-0127, TASK-0211.

### Step 18.3

[TASK-0223](../tasks/TASKS_PHASE_18.md) — Gameplay golden path execution. Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices. Required predecessors: TASK-0079, TASK-0080, TASK-0155, TASK-0156, TASK-0150, TASK-0143, TASK-0126, TASK-0211, TASK-0118, TASK-0243, TASK-0196, TASK-0259.

### Step 18.4

[TASK-0224](../tasks/TASKS_PHASE_18.md) — Visual regression execution. One final representative responsive/safe-area browser pass across required screens, using user visual/interaction review as final visual acceptance where provided. Preserve high Figma fidelity. No repeated golden captures or large combinatorial viewport/state matrix; native layout smoke stays in Android/iOS release checks. Required predecessors: TASK-0223, TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068.

### Step 18.5

[TASK-0225](../tasks/TASKS_PHASE_18.md) — Device matrix execution. Record actual physical/emulator models,OS,build and pass/block status for every required tier. Required predecessors: TASK-0224.

### Step 18.6

[TASK-0226](../tasks/TASKS_PHASE_18.md) — Save migration release QA. Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred. Required predecessors: TASK-0225.

### Step 18.7

[TASK-0227](../tasks/TASKS_PHASE_18.md) — Accessibility localization QA. Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required. Required predecessors: TASK-0224, TASK-0198.

### Step 18.8

[TASK-0228](../tasks/TASKS_PHASE_18.md) — Audio haptic release QA. Validate original asset rights,event coverage,mix,focus and preference persistence on physical devices. Required predecessors: TASK-0186, TASK-0211.

### Step 18.9

[TASK-0229](../tasks/TASKS_PHASE_18.md) — Regression defect closure. Close all known P0/P1 product defects with focused fix/retest evidence; reuse final gameplay, responsive, native, audio and performance checks. Do not create a duplicate QA campaign. Required predecessors: TASK-0049, TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068, TASK-0075, TASK-0077, TASK-0079, TASK-0117, TASK-0118, TASK-0126, TASK-0128, TASK-0129, TASK-0135, TASK-0139, TASK-0147, TASK-0148, TASK-0156, TASK-0159, TASK-0176, TASK-0177, TASK-0179, TASK-0183, TASK-0184, TASK-0185, TASK-0198, TASK-0202, TASK-0203, TASK-0206, TASK-0207, TASK-0208, TASK-0210, TASK-0243, TASK-0253.

### Step 18.10

[TASK-0230](../tasks/TASKS_PHASE_18.md) — Beta gate acceptance. Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate. Required predecessors: TASK-0229, TASK-0028, TASK-0029, TASK-0177.

## Files/directories expected to be created
- `analysis/reports/qa_unit_results.md`
- `analysis/reports/qa_integration_results.md`
- `analysis/reports/qa_gameplay_results.md`
- `analysis/reports/qa_visual_results.md`
- `analysis/reports/qa_device_results.md`
- `analysis/reports/qa_save_results.md`
- `analysis/reports/qa_accessibility_results.md`
- `analysis/reports/qa_audio_results.md`
- `analysis/reports/qa_defect_register.md`
- `analysis/reports/beta_gate.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0221](../tasks/TASKS_PHASE_18.md) — Core unit matrix execution
- [TASK-0222](../tasks/TASKS_PHASE_18.md) — Integration matrix execution
- [TASK-0223](../tasks/TASKS_PHASE_18.md) — Gameplay golden path execution
- [TASK-0224](../tasks/TASKS_PHASE_18.md) — Visual regression execution
- [TASK-0225](../tasks/TASKS_PHASE_18.md) — Device matrix execution
- [TASK-0226](../tasks/TASKS_PHASE_18.md) — Save migration release QA
- [TASK-0227](../tasks/TASKS_PHASE_18.md) — Accessibility localization QA
- [TASK-0228](../tasks/TASKS_PHASE_18.md) — Audio haptic release QA
- [TASK-0229](../tasks/TASKS_PHASE_18.md) — Regression defect closure
- [TASK-0230](../tasks/TASKS_PHASE_18.md) — Beta gate acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0221: DEFERRED_POST_DELIVERY.
- TASK-0222: DEFERRED_POST_DELIVERY.
- TASK-0223: DEFERRED_POST_DELIVERY.
- TASK-0224: DEFERRED_POST_DELIVERY.
- TASK-0225: DEFERRED_POST_DELIVERY.
- TASK-0226: DEFERRED_POST_DELIVERY.
- TASK-0227: DEFERRED_POST_DELIVERY.
- TASK-0228: DEFERRED_POST_DELIVERY.
- TASK-0229: SUPPORTING_REQUIRED.
- TASK-0230: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
