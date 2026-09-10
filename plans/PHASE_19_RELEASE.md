# PHASE 19 — Release

## Goal
Prepare and verify distributable release. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/release/04_PRODUCTION_DEFINITION.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)

## Inputs
- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/beta_gate.md` — TASK-0230 predecessor
- `analysis/figma/asset_ownership.csv` — TASK-0028 predecessor
- `analysis/figma/font_ownership.csv` — TASK-0029 predecessor
- `analysis/figma/audio_asset_ownership.csv` — TASK-0177 predecessor
- `tooling/ci/native-builds.md` — TASK-0212 predecessor

## Outputs
- `analysis/reports/release_identity.json` — Release readiness
- `analysis/reports/platform_release_requirements.md` — Current platform requirements review
- `analysis/reports/release_rights.md` — Distribution rights acceptance
- `analysis/reports/release_manifest.json` — Release build provenance
- `docs/release/store_metadata.md` — Store metadata package
- `analysis/reports/release_rollback.md` — Rollback and recovery drill
- `analysis/reports/production_gate.md` — Production release gate
- `analysis/reports/distribution_record.md` — Controlled distribution task

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0230](../tasks/TASKS_PHASE_18.md) — Beta gate acceptance
- [TASK-0028](../tasks/TASKS_PHASE_02.md) — Asset rights ledger
- [TASK-0029](../tasks/TASKS_PHASE_02.md) — Font acquisition
- [TASK-0177](../tasks/TASKS_PHASE_14.md) — Audio acquisition
- [TASK-0212](../tasks/TASKS_PHASE_16.md) — Native build reproducibility

## Risks
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 19.1

[TASK-0231](../tasks/TASKS_PHASE_19.md) — Release readiness. Verify com.mergeheroes.unitewar,owner,audience,final Terms/Privacy/support URLs,AppMetrica and Start.io configuration from app-specific product decisions. Required predecessors: TASK-0253.

### Step 19.2

[TASK-0232](../tasks/TASKS_PHASE_19.md) — Current platform requirements review. Verify official Android/iOS/store/toolchain requirements at release date and map each to build evidence. Required predecessors: TASK-0231.

### Step 19.3

[TASK-0233](../tasks/TASKS_PHASE_19.md) — Distribution rights acceptance. Verify selected art/fonts/audio ownership proof and exclude unresolved assets from distributable bundle. Required predecessors: TASK-0028, TASK-0029, TASK-0177, TASK-0178, TASK-0179.

### Step 19.4

[TASK-0234](../tasks/TASKS_PHASE_19.md) — Release build provenance. Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff. Required predecessors: TASK-0028, TASK-0029, TASK-0177, TASK-0178, TASK-0179, TASK-0202, TASK-0203, TASK-0229, TASK-0232.

### Step 19.5

[TASK-0235](../tasks/TASKS_PHASE_19.md) — Store metadata package. Prepare accurate descriptions/screenshots/ratings/privacy answers from shipped behavior; no inherited payout text. Required predecessors: TASK-0234.

### Step 19.6

[TASK-0236](../tasks/TASKS_PHASE_19.md) — Rollback and recovery drill. Demonstrate previous compatible reader/artifact and save recovery without unsupported schema downgrade. Required predecessors: TASK-0234, TASK-0155, TASK-0150.

### Step 19.7

[TASK-0237](../tasks/TASKS_PHASE_19.md) — Production release gate. DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely. Required predecessors: TASK-0132, TASK-0234, TASK-0246, TASK-0259.

### Step 19.8

[TASK-0238](../tasks/TASKS_PHASE_19.md) — Controlled distribution task. After explicit release authorization,submit approved artifact/channel and record outcome; no implicit publication. Required predecessors: TASK-0237.

## Files/directories expected to be created
- `analysis/reports/release_identity.json`
- `analysis/reports/platform_release_requirements.md`
- `analysis/reports/release_rights.md`
- `analysis/reports/release_manifest.json`
- `docs/release/store_metadata.md`
- `analysis/reports/release_rollback.md`
- `analysis/reports/production_gate.md`
- `analysis/reports/distribution_record.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0231](../tasks/TASKS_PHASE_19.md) — Release readiness
- [TASK-0232](../tasks/TASKS_PHASE_19.md) — Current platform requirements review
- [TASK-0233](../tasks/TASKS_PHASE_19.md) — Distribution rights acceptance
- [TASK-0234](../tasks/TASKS_PHASE_19.md) — Release build provenance
- [TASK-0235](../tasks/TASKS_PHASE_19.md) — Store metadata package
- [TASK-0236](../tasks/TASKS_PHASE_19.md) — Rollback and recovery drill
- [TASK-0237](../tasks/TASKS_PHASE_19.md) — Production release gate
- [TASK-0238](../tasks/TASKS_PHASE_19.md) — Controlled distribution task

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0235: DEFERRED_POST_DELIVERY.
- TASK-0238: DEFERRED_POST_DELIVERY.
- TASK-0231: REQUIRED_NOW.
- TASK-0232: REQUIRED_NOW.
- TASK-0233: DEFERRED_POST_DELIVERY.
- TASK-0234: REQUIRED_NOW.
- TASK-0237: REQUIRED_NOW.
- TASK-0236: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
