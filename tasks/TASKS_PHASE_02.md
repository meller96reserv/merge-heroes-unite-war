# Atomic tasks — phase 02

Current task statuses below match the machine-readable manifest. Planning artifacts alone do not imply implementation completion. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_02_FIGMA_AND_ASSET_PIPELINE.md).

<a id="task-0025"></a>
## TASK-0025 — Immutable extraction verification

Phase: 02 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/source_integrity.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [source_integrity.json](../analysis/figma/source_integrity.json), [verify_fig_extraction.py](../tools/analysis/verify_fig_extraction.py).

### Goal
Re-run safe extraction and compare original/copy SHA and351source records; reject path traversal and CRC errors.

### Context
This is the bounded immutable extraction verification deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/source_integrity.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/source_integrity.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/source_integrity.json`; unresolved reference behavior stays gated.
2. Re-run safe extraction and compare original/copy SHA and351source records; reject path traversal and CRC errors.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Re-run safe extraction and compare original/copy SHA and351source records; reject path traversal and CRC errors. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Re-run safe extraction and compare original/copy SHA and351source records; reject path traversal and CRC errors.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0026"></a>
## TASK-0026 — Asset semantic validator

Phase: 02 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for tools/analysis/asset_semantic_validator.py. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [asset_semantic_validation.json](../analysis/reports/asset_semantic_validation.json), [asset_semantic_validator.py](../tools/analysis/asset_semantic_validator.py), [test_asset_semantic_validator.py](../tools/analysis/test_asset_semantic_validator.py).

### Goal
Validate351unique semantic IDs,source hashes,scope category and screenshot references; fail orphan runtime selection.

### Context
This is the bounded asset semantic validator deliverable within create traceable runtime import inputs. Its authoritative output is `tools/analysis/asset_semantic_validator.py`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `tools/analysis/asset_semantic_validator.py`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `tools/analysis/asset_semantic_validator.py`; unresolved reference behavior stays gated.
2. Validate351unique semantic IDs,source hashes,scope category and screenshot references; fail orphan runtime selection.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Validate351unique semantic IDs,source hashes,scope category and screenshot references; fail orphan runtime selection. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Validate351unique semantic IDs,source hashes,scope category and screenshot references; fail orphan runtime selection.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0027"></a>
## TASK-0027 — Near duplicate adjudication

Phase: 02 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/near_duplicate_decisions.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [near_duplicate_validation.json](../analysis/reports/near_duplicate_validation.json), [near_duplicate_visual_review.json](../analysis/figma/near_duplicate_visual_review.json).

### Goal
Review167candidate pairs by alpha/outline/resolution and retain explicit keep/alias decisions; no pHash-only deletion.

### Context
This is the bounded near duplicate adjudication deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/near_duplicate_decisions.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/near_duplicate_decisions.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/near_duplicate_decisions.csv`; unresolved reference behavior stays gated.
2. Review167candidate pairs by alpha/outline/resolution and retain explicit keep/alias decisions; no pHash-only deletion.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Review167candidate pairs by alpha/outline/resolution and retain explicit keep/alias decisions; no pHash-only deletion. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Review167candidate pairs by alpha/outline/resolution and retain explicit keep/alias decisions; no pHash-only deletion.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0028"></a>
## TASK-0028 — Asset rights ledger

Phase: 02 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/asset_ownership.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [asset_rights_validation.json](../analysis/reports/asset_rights_validation.json).

### Goal
Attach owner/license/distribution proof for selected assets or mark release exclusion; user supply alone is not proof.

### Context
This is the bounded asset rights ledger deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/asset_ownership.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

None; update the existing artifact listed below.

### Files expected to modify

- [asset_ownership.csv](../analysis/figma/asset_ownership.csv)

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/asset_ownership.csv`; unresolved reference behavior stays gated.
2. Attach owner/license/distribution proof for selected assets or mark release exclusion; user supply alone is not proof.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Attach owner/license/distribution proof for selected assets or mark release exclusion; user supply alone is not proof. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Attach owner/license/distribution proof for selected assets or mark release exclusion; user supply alone is not proof.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-008 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0029"></a>
## TASK-0029 — Font acquisition

Phase: 02 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/font_ownership.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [font_ownership.csv](../analysis/figma/font_ownership.csv), [metrics.json](../analysis/figma/fonts/metrics.json), [README.md](../analysis/figma/fonts/README.md).

### Goal
Acquire exact PassionOne/Roboto/Nunito files and licenses; compare glyph metrics and Cyrillic coverage.

### Context
This is the bounded font acquisition deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/font_ownership.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/font_ownership.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/font_ownership.csv`; unresolved reference behavior stays gated.
2. Acquire exact PassionOne/Roboto/Nunito files and licenses; compare glyph metrics and Cyrillic coverage.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Acquire exact PassionOne/Roboto/Nunito files and licenses; compare glyph metrics and Cyrillic coverage. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Acquire exact PassionOne/Roboto/Nunito files and licenses; compare glyph metrics and Cyrillic coverage.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-009 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0030"></a>
## TASK-0030 — Asset import calibration

Phase: 02 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/import_calibration.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [import_calibration.json](../analysis/figma/import_calibration.json), [README.md](../analysis/figma/import_review/README.md), [visual-decisions.json](../analysis/figma/import_review/visual-decisions.json).

### Goal
Measure chosen9slice borders,pivots,trim offsets and intended display resolution; null insets cannot enter stretched UI.

### Context
This is the bounded asset import calibration deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/import_calibration.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/import_calibration.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/import_calibration.json`; unresolved reference behavior stays gated.
2. Measure chosen9slice borders,pivots,trim offsets and intended display resolution; null insets cannot enter stretched UI.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Measure chosen9slice borders,pivots,trim offsets and intended display resolution; null insets cannot enter stretched UI. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Measure chosen9slice borders,pivots,trim offsets and intended display resolution; null insets cannot enter stretched UI.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-010 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0031"></a>
## TASK-0031 — Content visual mapping

Phase: 02 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/content_visual_mapping.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [README.md](../analysis/reports/asset-import/README.md), [planning.json](../analysis/reports/asset-import/planning.json), [content_visual_mapping.csv](../analysis/figma/content_visual_mapping.csv).

### Goal
Map definition tiers to10Figma hero families separately from reference human names; record reviewed silhouette/rarity choices.

### Context
This is the bounded content visual mapping deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/content_visual_mapping.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/content_visual_mapping.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/content_visual_mapping.csv`; unresolved reference behavior stays gated.
2. Map definition tiers to10Figma hero families separately from reference human names; record reviewed silhouette/rarity choices.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Map definition tiers to10Figma hero families separately from reference human names; record reviewed silhouette/rarity choices. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Map definition tiers to10Figma hero families separately from reference human names; record reviewed silhouette/rarity choices.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-035 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0032"></a>
## TASK-0032 — Atlas membership manifest

Phase: 02 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/atlas_plan.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [README.md](../analysis/reports/asset-import/README.md), [planning.json](../analysis/reports/asset-import/planning.json), [atlas_plan.json](../analysis/figma/atlas_plan.json).

### Goal
Assign selected assets to co-resident2048groups and standalone backgrounds; estimate decoded resident bytes per route.

### Context
This is the bounded atlas membership manifest deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/atlas_plan.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/atlas_plan.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/atlas_plan.json`; unresolved reference behavior stays gated.
2. Assign selected assets to co-resident2048groups and standalone backgrounds; estimate decoded resident bytes per route.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Assign selected assets to co-resident2048groups and standalone backgrounds; estimate decoded resident bytes per route. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Assign selected assets to co-resident2048groups and standalone backgrounds; estimate decoded resident bytes per route.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0033"></a>
## TASK-0033 — Runtime import tool

Phase: 02 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0030](TASKS_PHASE_02.md) — Asset import calibration · [TASK-0032](TASKS_PHASE_02.md) — Atlas membership manifest · [TASK-0049](TASKS_PHASE_04.md) — Shared Skia game surface

Parallelization: Allowed after listed dependencies; exclusive ownership of tooling/assets/import-figma.ts. Integrate shared registries coherently.

Evidence: [import.json](../analysis/reports/asset-import/import.json), [runtime-sheet.jpg](../analysis/reports/asset-import/runtime-sheet.jpg), [asset-registry.json](../app/assets/asset-registry.json).

### Goal
Generate reviewed runtime sprites and stable registry from semantic/import manifests without changing raw source.

### Context
Bounded runtime import tool deliverable. Authoritative output: `tooling/assets/import-figma.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- [import_calibration.json](../analysis/figma/import_calibration.json)
- `analysis/figma/atlas_plan.json` — dependency output
- `app/README.md` — dependency output

### Files expected to create
- `tooling/assets/import-figma.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Generate reviewed runtime sprites and stable registry from semantic/import manifests without changing raw source.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise `tooling/assets/import-figma.ts` through the smallest relevant RN/Skia/core/platform harness. Generate reviewed runtime sprites and stable registry from semantic/import manifests without changing raw source. Record platform limitations separately.

### Acceptance criteria
- Generate reviewed runtime sprites and stable registry from semantic/import manifests without changing raw source.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0034"></a>
## TASK-0034 — Sprite registry validation

Phase: 02 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0033](TASKS_PHASE_02.md) — Runtime import tool; [TASK-0026](TASKS_PHASE_02.md) — Asset semantic validator

Parallelization: Allowed after listed dependencies; exclusive edit ownership for tooling/assets/validate-registry.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [registry-validation.json](../analysis/reports/asset-import/registry-validation.json).

### Goal
Fail duplicate runtime IDs,missing semantic refs,reference-only imports and invalid trim/pivot metadata.

### Context
This is the bounded sprite registry validation deliverable within create traceable runtime import inputs. Its authoritative output is `tooling/assets/validate-registry.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `tooling/assets/import-figma.ts` — future artifact from listed dependency
- `tools/analysis/asset_semantic_validator.py` — future artifact from listed dependency

### Files expected to create

- `tooling/assets/validate-registry.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `tooling/assets/validate-registry.ts`; unresolved reference behavior stays gated.
2. Fail duplicate runtime IDs,missing semantic refs,reference-only imports and invalid trim/pivot metadata.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Fail duplicate runtime IDs,missing semantic refs,reference-only imports and invalid trim/pivot metadata. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Fail duplicate runtime IDs,missing semantic refs,reference-only imports and invalid trim/pivot metadata.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0035"></a>
## TASK-0035 — Button state asset review

Phase: 02 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md) — Planning handoff validation; [TASK-0025](TASKS_PHASE_02.md) — Immutable extraction verification

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/button_state_decisions.csv. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [button-states.json](../analysis/reports/asset-import/button-states.json).

### Goal
Choose tint/overlay/new-art decision for pressed disabled loading selected locked states per component.

### Context
This is the bounded button state asset review deliverable within create traceable runtime import inputs. Its authoritative output is `analysis/figma/button_state_decisions.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/button_state_decisions.csv`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/button_state_decisions.csv`; unresolved reference behavior stays gated.
2. Choose tint/overlay/new-art decision for pressed disabled loading selected locked states per component.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Choose tint/overlay/new-art decision for pressed disabled loading selected locked states per component. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Choose tint/overlay/new-art decision for pressed disabled loading selected locked states per component.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0036"></a>
## TASK-0036 — Missing popup designs

Phase: 02 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0001](TASKS_PHASE_00.md), [TASK-0025](TASKS_PHASE_02.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for docs/screens/MISSING_POPUP_DESIGNS.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required.

### Context
This is the bounded missing popup designs deliverable within create traceable runtime import inputs. Its authoritative output is `docs/screens/MISSING_POPUP_DESIGNS.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md) · [semantic_map.json](../analysis/figma/semantic_map.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [08_FIGMA_ASSET_MAP.md](../docs/08_FIGMA_ASSET_MAP.md)
- [semantic_map.json](../analysis/figma/semantic_map.json)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency
- `analysis/figma/source_integrity.json` — future artifact from listed dependency

### Files expected to create

- `docs/screens/MISSING_POPUP_DESIGNS.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `docs/screens/MISSING_POPUP_DESIGNS.md`; unresolved reference behavior stays gated.
2. Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.

### Test cases
Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
