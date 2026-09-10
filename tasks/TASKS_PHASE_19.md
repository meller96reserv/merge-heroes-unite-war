# Atomic tasks — phase 19

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_19_RELEASE.md).

<a id="task-0231"></a>
## TASK-0231 — Release readiness

Phase: 19 · Priority: P0 · Type: release · Status: COMPLETED

Dependencies: [TASK-0253](TASKS_PHASE_00.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/release_identity.json. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Verify runnable candidate package, app version/build counters, legal/platform configuration and exact missing owner inputs. Formal store/repository distribution readiness is post-delivery. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [release_identity.json](../analysis/reports/release_identity.json).

### Goal
Verify com.mergeheroes.unitewar,owner,audience,final Terms/Privacy/support URLs,AppMetrica and Start.io configuration from app-specific product decisions.

### Context
This is the bounded release readiness deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/release_identity.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/beta_gate.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/release_identity.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/release_identity.json`; unresolved reference behavior stays gated.
2. Verify com.mergeheroes.unitewar,owner,audience,final Terms/Privacy/support URLs,AppMetrica and Start.io configuration from app-specific product decisions.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
Verify com.mergeheroes.unitewar,owner,audience,final Terms/Privacy/support URLs,AppMetrica and Start.io configuration from app-specific product decisions. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Verify com.mergeheroes.unitewar,owner,audience,final Terms/Privacy/support URLs,AppMetrica and Start.io configuration from app-specific product decisions.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-029 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0232"></a>
## TASK-0232 — Current platform requirements review

Phase: 19 · Priority: P0 · Type: release · Status: COMPLETED

Dependencies: [TASK-0231](TASKS_PHASE_19.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/platform_release_requirements.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Verify current native build requirements needed by installed Android/iOS targets and SDK integrations. Store policy certification is post-delivery. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [platform_release_requirements.md](../analysis/reports/platform_release_requirements.md).

### Goal
Verify official Android/iOS/store/toolchain requirements at release date and map each to build evidence.

### Context
This is the bounded current platform requirements review deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/platform_release_requirements.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/release_identity.json` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/platform_release_requirements.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/platform_release_requirements.md`; unresolved reference behavior stays gated.
2. Verify official Android/iOS/store/toolchain requirements at release date and map each to build evidence.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
Verify official Android/iOS/store/toolchain requirements at release date and map each to build evidence. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Verify official Android/iOS/store/toolchain requirements at release date and map each to build evidence.
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


<a id="task-0233"></a>
## TASK-0233 — Distribution rights acceptance

Phase: 19 · Priority: P0 · Type: release · Status: NOT_STARTED

Dependencies: [TASK-0028](TASKS_PHASE_02.md), [TASK-0029](TASKS_PHASE_02.md), [TASK-0177](TASKS_PHASE_14.md), [TASK-0178](TASKS_PHASE_14.md), [TASK-0179](TASKS_PHASE_14.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/release_rights.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Verify selected art/fonts/audio ownership proof and exclude unresolved assets from distributable bundle.

### Context
This is the bounded distribution rights acceptance deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/release_rights.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- [asset_ownership.csv](../analysis/figma/asset_ownership.csv)
- `analysis/figma/font_ownership.csv` — future artifact from listed dependency
- [audio_asset_ownership.csv](../analysis/figma/audio_asset_ownership.csv)

### Files expected to create

- `analysis/reports/release_rights.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/release_rights.md`; unresolved reference behavior stays gated.
2. Verify selected art/fonts/audio ownership proof and exclude unresolved assets from distributable bundle.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
Verify selected art/fonts/audio ownership proof and exclude unresolved assets from distributable bundle. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Verify selected art/fonts/audio ownership proof and exclude unresolved assets from distributable bundle.
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


<a id="task-0234"></a>
## TASK-0234 — Release build provenance

Phase: 19 · Priority: P0 · Type: release · Status: COMPLETED

Dependencies: [TASK-0028](TASKS_PHASE_02.md), [TASK-0029](TASKS_PHASE_02.md), [TASK-0177](TASKS_PHASE_14.md), [TASK-0178](TASKS_PHASE_14.md), [TASK-0179](TASKS_PHASE_14.md), [TASK-0202](TASKS_PHASE_16.md), [TASK-0203](TASKS_PHASE_16.md), [TASK-0229](TASKS_PHASE_18.md), [TASK-0232](TASKS_PHASE_19.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/release_manifest.json. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

Current delivery scope: Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Produce runnable package-named Android APK/AAB and iOS Simulator app plus concise build commands, versions and artifact paths. Preserve project metadata; exhaustive distribution provenance, signing handoff and publication ceremony are post-delivery. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [release_manifest.json](../analysis/reports/release_manifest.json), [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff.

### Context
This is the bounded release build provenance deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/release_manifest.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/platform_release_requirements.md` — future artifact from listed dependency
- `analysis/reports/release_rights.md` — future artifact from listed dependency
- `tooling/ci/native-builds.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/release_manifest.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/release_manifest.json`; unresolved reference behavior stays gated.
2. Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff.
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


<a id="task-0235"></a>
## TASK-0235 — Store metadata package

Phase: 19 · Priority: P0 · Type: release · Status: NOT_STARTED

Dependencies: [TASK-0234](TASKS_PHASE_19.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for docs/release/store_metadata.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Store submission/marketing and reference-only Demon/Tower/skills/rigs/parallax/online systems are beyond the required delivery. Functional Figma Dungeon dragons and Relic/Open controls stay required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Prepare accurate descriptions/screenshots/ratings/privacy answers from shipped behavior; no inherited payout text.

### Context
This is the bounded store metadata package deliverable within prepare and verify distributable release. Its authoritative output is `docs/release/store_metadata.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/release_manifest.json` — future artifact from listed dependency

### Files expected to create

- `docs/release/store_metadata.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `docs/release/store_metadata.md`; unresolved reference behavior stays gated.
2. Prepare accurate descriptions/screenshots/ratings/privacy answers from shipped behavior; no inherited payout text.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
Prepare accurate descriptions/screenshots/ratings/privacy answers from shipped behavior; no inherited payout text. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Prepare accurate descriptions/screenshots/ratings/privacy answers from shipped behavior; no inherited payout text.
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


<a id="task-0236"></a>
## TASK-0236 — Rollback and recovery drill

Phase: 19 · Priority: P0 · Type: release · Status: NOT_STARTED

Dependencies: [TASK-0234](TASKS_PHASE_19.md), [TASK-0155](TASKS_PHASE_12.md), [TASK-0150](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/release_rollback.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Demonstrate previous compatible reader/artifact and save recovery without unsupported schema downgrade.

### Context
This is the bounded rollback and recovery drill deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/release_rollback.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `docs/release/store_metadata.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/release_rollback.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/release_rollback.md`; unresolved reference behavior stays gated.
2. Demonstrate previous compatible reader/artifact and save recovery without unsupported schema downgrade.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
Demonstrate previous compatible reader/artifact and save recovery without unsupported schema downgrade. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Demonstrate previous compatible reader/artifact and save recovery without unsupported schema downgrade.
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


<a id="task-0237"></a>
## TASK-0237 — Production release gate

Phase: 19 · Priority: P0 · Type: release · Status: BLOCKED

Dependencies: [TASK-0132](TASKS_PHASE_11.md), [TASK-0234](TASKS_PHASE_19.md), [TASK-0246](TASKS_PHASE_20.md), [TASK-0259](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/production_gate.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

Current delivery scope: DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Accept the complete required user-facing application, shared browser preview, Android and iOS Simulator candidate builds, changed economic/save/ad correctness and one final smoke with no known blocking runtime defects. User reviews visuals/audio. Record exact external-only provider/legal/signing inputs honestly; never label an unverified integration PASS. Formal distribution certification is post-delivery. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely.

### Context
This is the bounded production release gate deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/production_gate.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/release_rollback.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/production_gate.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/production_gate.md`; unresolved reference behavior stays gated.
2. DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely.
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


<a id="task-0238"></a>
## TASK-0238 — Controlled distribution task

Phase: 19 · Priority: P0 · Type: release · Status: NOT_STARTED

Dependencies: [TASK-0237](TASKS_PHASE_19.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/reports/distribution_record.md. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Store submission/marketing and reference-only Demon/Tower/skills/rigs/parallax/online systems are beyond the required delivery. Functional Figma Dungeon dragons and Relic/Open controls stay required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
After explicit release authorization,submit approved artifact/channel and record outcome; no implicit publication.

### Context
This is the bounded controlled distribution task deliverable within prepare and verify distributable release. Its authoritative output is `analysis/reports/distribution_record.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md) · [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_PRODUCTION_DEFINITION.md](../docs/release/04_PRODUCTION_DEFINITION.md)
- [09_RELEASE_CHECKLIST.md](../docs/qa/09_RELEASE_CHECKLIST.md)
- `analysis/reports/production_gate.md` — future artifact from listed dependency

### Files expected to create

- `analysis/reports/distribution_record.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/reports/distribution_record.md`; unresolved reference behavior stays gated.
2. After explicit release authorization,submit approved artifact/channel and record outcome; no implicit publication.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.

### Test cases
Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.

### Manual verification
After explicit release authorization,submit approved artifact/channel and record outcome; no implicit publication. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- After explicit release authorization,submit approved artifact/channel and record outcome; no implicit publication.
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
