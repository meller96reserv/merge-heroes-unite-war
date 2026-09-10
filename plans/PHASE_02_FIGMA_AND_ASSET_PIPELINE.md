# PHASE 02 — Figma And Asset Pipeline

## Goal
Create traceable runtime import inputs. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/08_FIGMA_ASSET_MAP.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json)

## Inputs
- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — TASK-0001 predecessor
- `app/README.md` — TASK-0049 predecessor

## Outputs
- `analysis/figma/source_integrity.json` — Immutable extraction verification
- `tools/analysis/asset_semantic_validator.py` — Asset semantic validator
- `analysis/figma/near_duplicate_decisions.csv` — Near duplicate adjudication
- `analysis/figma/asset_ownership.csv` — Asset rights ledger
- `analysis/figma/font_ownership.csv` — Font acquisition
- `analysis/figma/import_calibration.json` — Asset import calibration
- `analysis/figma/content_visual_mapping.csv` — Content visual mapping
- `analysis/figma/atlas_plan.json` — Atlas membership manifest
- `tooling/assets/import-figma.ts` — Runtime import tool
- `tooling/assets/validate-registry.ts` — Sprite registry validation
- `analysis/figma/button_state_decisions.csv` — Button state asset review
- `docs/screens/MISSING_POPUP_DESIGNS.md` — Missing popup designs

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0001](../tasks/TASKS_PHASE_00.md) — Planning handoff validation
- [TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface

## Risks
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 02.1

[TASK-0025](../tasks/TASKS_PHASE_02.md) — Immutable extraction verification. Re-run safe extraction and compare original/copy SHA and351source records; reject path traversal and CRC errors. Required predecessors: TASK-0001.

### Step 02.2

[TASK-0026](../tasks/TASKS_PHASE_02.md) — Asset semantic validator. Validate351unique semantic IDs,source hashes,scope category and screenshot references; fail orphan runtime selection. Required predecessors: TASK-0001, TASK-0025.

### Step 02.3

[TASK-0027](../tasks/TASKS_PHASE_02.md) — Near duplicate adjudication. Review167candidate pairs by alpha/outline/resolution and retain explicit keep/alias decisions; no pHash-only deletion. Required predecessors: TASK-0001, TASK-0025.

### Step 02.4

[TASK-0028](../tasks/TASKS_PHASE_02.md) — Asset rights ledger. Attach owner/license/distribution proof for selected assets or mark release exclusion; user supply alone is not proof. Required predecessors: TASK-0001, TASK-0025.

### Step 02.5

[TASK-0029](../tasks/TASKS_PHASE_02.md) — Font acquisition. Acquire exact PassionOne/Roboto/Nunito files and licenses; compare glyph metrics and Cyrillic coverage. Required predecessors: TASK-0001, TASK-0025.

### Step 02.6

[TASK-0030](../tasks/TASKS_PHASE_02.md) — Asset import calibration. Measure chosen9slice borders,pivots,trim offsets and intended display resolution; null insets cannot enter stretched UI. Required predecessors: TASK-0001, TASK-0025.

### Step 02.7

[TASK-0031](../tasks/TASKS_PHASE_02.md) — Content visual mapping. Map definition tiers to10Figma hero families separately from reference human names; record reviewed silhouette/rarity choices. Required predecessors: TASK-0001, TASK-0025.

### Step 02.8

[TASK-0032](../tasks/TASKS_PHASE_02.md) — Atlas membership manifest. Assign selected assets to co-resident2048groups and standalone backgrounds; estimate decoded resident bytes per route. Required predecessors: TASK-0001, TASK-0025.

### Step 02.9

[TASK-0033](../tasks/TASKS_PHASE_02.md) — Runtime import tool. Generate reviewed runtime sprites and stable registry from semantic/import manifests without changing raw source. Required predecessors: TASK-0030, TASK-0032, TASK-0049.

### Step 02.10

[TASK-0034](../tasks/TASKS_PHASE_02.md) — Sprite registry validation. Fail duplicate runtime IDs,missing semantic refs,reference-only imports and invalid trim/pivot metadata. Required predecessors: TASK-0033, TASK-0026.

### Step 02.11

[TASK-0035](../tasks/TASKS_PHASE_02.md) — Button state asset review. Choose tint/overlay/new-art decision for pressed disabled loading selected locked states per component. Required predecessors: TASK-0001, TASK-0025.

### Step 02.12

[TASK-0036](../tasks/TASKS_PHASE_02.md) — Missing popup designs. Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required. Required predecessors: TASK-0001, TASK-0025.

## Files/directories expected to be created
- `analysis/figma/source_integrity.json`
- `tools/analysis/asset_semantic_validator.py`
- `analysis/figma/near_duplicate_decisions.csv`
- `analysis/figma/asset_ownership.csv`
- `analysis/figma/font_ownership.csv`
- `analysis/figma/import_calibration.json`
- `analysis/figma/content_visual_mapping.csv`
- `analysis/figma/atlas_plan.json`
- `tooling/assets/import-figma.ts`
- `tooling/assets/validate-registry.ts`
- `analysis/figma/button_state_decisions.csv`
- `docs/screens/MISSING_POPUP_DESIGNS.md`

## Existing files expected to be modified

- [asset_ownership.csv](../analysis/figma/asset_ownership.csv)

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0025](../tasks/TASKS_PHASE_02.md) — Immutable extraction verification
- [TASK-0026](../tasks/TASKS_PHASE_02.md) — Asset semantic validator
- [TASK-0027](../tasks/TASKS_PHASE_02.md) — Near duplicate adjudication
- [TASK-0028](../tasks/TASKS_PHASE_02.md) — Asset rights ledger
- [TASK-0029](../tasks/TASKS_PHASE_02.md) — Font acquisition
- [TASK-0030](../tasks/TASKS_PHASE_02.md) — Asset import calibration
- [TASK-0031](../tasks/TASKS_PHASE_02.md) — Content visual mapping
- [TASK-0032](../tasks/TASKS_PHASE_02.md) — Atlas membership manifest
- [TASK-0033](../tasks/TASKS_PHASE_02.md) — Runtime import tool
- [TASK-0034](../tasks/TASKS_PHASE_02.md) — Sprite registry validation
- [TASK-0035](../tasks/TASKS_PHASE_02.md) — Button state asset review
- [TASK-0036](../tasks/TASKS_PHASE_02.md) — Missing popup designs

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0036: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
