# Atomic tasks — phase 14

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_14_AUDIO.md).

<a id="task-0177"></a>
## TASK-0177 — Audio acquisition

Phase: 14 · Priority: P0 · Type: asset · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/audio_asset_ownership.csv. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Acquire original/licensed core SFX with per-event brief,creator,file and distribution proof; no ripped reference audio.

### Context
This is the bounded audio acquisition deliverable within acquire and wire original audio. Its authoritative output is `analysis/figma/audio_asset_ownership.csv`; adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [06_AUDIO_ASSET_ACQUISITION.md](../docs/audio/06_AUDIO_ASSET_ACQUISITION.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [06_AUDIO_ASSET_ACQUISITION.md](../docs/audio/06_AUDIO_ASSET_ACQUISITION.md)
- `analysis/reports/implementation_handoff.md` — future artifact from listed dependency

### Files expected to create

None; update the existing artifact listed below.

### Files expected to modify

- [audio_asset_ownership.csv](../analysis/figma/audio_asset_ownership.csv)

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/audio_asset_ownership.csv`; unresolved reference behavior stays gated.
2. Acquire original/licensed core SFX with per-event brief,creator,file and distribution proof; no ripped reference audio.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Acquire original/licensed core SFX with per-event brief,creator,file and distribution proof; no ripped reference audio. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Acquire original/licensed core SFX with per-event brief,creator,file and distribution proof; no ripped reference audio.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-027 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0178"></a>
## TASK-0178 — Music acquisition

Phase: 14 · Priority: P1 · Type: asset · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/audio/music/manifest.json. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Acquire original main/boss loops with clean boundaries and compatible transitions; attach license and audition notes.

### Context
Bounded music acquisition deliverable. Authoritative output: `app/assets/audio/music/manifest.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [03_MUSIC_PLAN.md](../docs/audio/03_MUSIC_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [03_MUSIC_PLAN.md](../docs/audio/03_MUSIC_PLAN.md)
- [implementation_handoff.md](../analysis/reports/implementation_handoff.md)

### Files expected to create
- `app/assets/audio/music/manifest.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Acquire original main/boss loops with clean boundaries and compatible transitions; attach license and audition notes.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/assets/audio/music/manifest.json` through the smallest relevant RN/Skia/core/platform harness. Acquire original main/boss loops with clean boundaries and compatible transitions; attach license and audition notes. Record platform limitations separately.

### Acceptance criteria
- Acquire original main/boss loops with clean boundaries and compatible transitions; attach license and audition notes.
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


<a id="task-0179"></a>
## TASK-0179 — Ambience acquisition

Phase: 14 · Priority: P1 · Type: asset · Status: COMPLETED

Dependencies: [TASK-0001](TASKS_PHASE_00.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/audio/ambience/manifest.json. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Acquire quiet main-world loops and validate seamless repetition without distracting transient pattern.

### Context
Bounded ambience acquisition deliverable. Authoritative output: `app/assets/audio/ambience/manifest.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [04_AMBIENCE_PLAN.md](../docs/audio/04_AMBIENCE_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [04_AMBIENCE_PLAN.md](../docs/audio/04_AMBIENCE_PLAN.md)
- [implementation_handoff.md](../analysis/reports/implementation_handoff.md)

### Files expected to create
- `app/assets/audio/ambience/manifest.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Acquire quiet main-world loops and validate seamless repetition without distracting transient pattern.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/assets/audio/ambience/manifest.json` through the smallest relevant RN/Skia/core/platform harness. Acquire quiet main-world loops and validate seamless repetition without distracting transient pattern. Record platform limitations separately.

### Acceptance criteria
- Acquire quiet main-world loops and validate seamless repetition without distracting transient pattern.
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


<a id="task-0180"></a>
## TASK-0180 — Audio import validation

Phase: 14 · Priority: P1 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0177](TASKS_PHASE_14.md), [TASK-0049](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tooling/assets/validate-audio.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0177, TASK-0178, TASK-0179, TASK-0186.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Check event file refs,format,duration,loop metadata,peaks and license status before import.

### Context
Bounded audio import validation deliverable. Authoritative output: `tooling/assets/validate-audio.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [audio_asset_ownership.csv](../analysis/figma/audio_asset_ownership.csv)
- `app/README.md` — dependency output

### Files expected to create
- `tooling/assets/validate-audio.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Check event file refs,format,duration,loop metadata,peaks and license status before import.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `tooling/assets/validate-audio.ts` through the smallest relevant RN/Skia/core/platform harness. Check event file refs,format,duration,loop metadata,peaks and license status before import. Record platform limitations separately.

### Acceptance criteria
- Check event file refs,format,duration,loop metadata,peaks and license status before import.
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


<a id="task-0181"></a>
## TASK-0181 — Audio director buses

Phase: 14 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0177](TASKS_PHASE_14.md), [TASK-0049](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/audio/AudioDirector.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Implement licensed menu/game background music and SFX/UI/ambience buses,gain/mute; honor browser activation and audio focus; missing required release audio is not PASS.

### Context
Bounded audio director buses deliverable. Authoritative output: `app/src/audio/AudioDirector.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [audio_asset_ownership.csv](../analysis/figma/audio_asset_ownership.csv)
- `app/README.md` — dependency output

### Files expected to create
- `app/src/audio/AudioDirector.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement licensed menu/game background music and SFX/UI/ambience buses,gain/mute; honor browser activation and audio focus; missing required release audio is not PASS.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/src/audio/AudioDirector.ts` through the smallest relevant RN/Skia/core/platform harness. Implement licensed menu/game background music and SFX/UI/ambience buses,gain/mute; honor browser activation and audio focus; missing required release audio is not PASS. Record platform limitations separately.

### Acceptance criteria
- Implement licensed menu/game background music and SFX/UI/ambience buses,gain/mute; honor browser activation and audio focus; missing required release audio is not PASS.
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


<a id="task-0182"></a>
## TASK-0182 — Audio voice budget

Phase: 14 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0181](TASKS_PHASE_14.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/audio/VoiceAllocator.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Enforce matrix cooldown/concurrency,priority stealing and independent presentation RNG.

### Context
Bounded audio voice budget deliverable. Authoritative output: `app/src/audio/VoiceAllocator.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- `app/src/audio/AudioDirector.ts` — dependency output

### Files expected to create
- `app/src/audio/VoiceAllocator.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Enforce matrix cooldown/concurrency,priority stealing and independent presentation RNG.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/src/audio/VoiceAllocator.ts` through the smallest relevant RN/Skia/core/platform harness. Enforce matrix cooldown/concurrency,priority stealing and independent presentation RNG. Record platform limitations separately.

### Acceptance criteria
- Enforce matrix cooldown/concurrency,priority stealing and independent presentation RNG.
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


<a id="task-0183"></a>
## TASK-0183 — Music duck crossfade

Phase: 14 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0182](TASKS_PHASE_14.md), [TASK-0178](TASKS_PHASE_14.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/audio/MusicController.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Reference-count duck requests and crossfade boss/main without duplicate loops after interruption.

### Context
Bounded music duck crossfade deliverable. Authoritative output: `app/src/audio/MusicController.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [03_MUSIC_PLAN.md](../docs/audio/03_MUSIC_PLAN.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [03_MUSIC_PLAN.md](../docs/audio/03_MUSIC_PLAN.md)
- `app/src/audio/VoiceAllocator.ts` — dependency output
- `app/assets/audio/music/manifest.json` — dependency output

### Files expected to create
- `app/src/audio/MusicController.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Reference-count duck requests and crossfade boss/main without duplicate loops after interruption.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/src/audio/MusicController.ts` through the smallest relevant RN/Skia/core/platform harness. Reference-count duck requests and crossfade boss/main without duplicate loops after interruption. Record platform limitations separately.

### Acceptance criteria
- Reference-count duck requests and crossfade boss/main without duplicate loops after interruption.
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


<a id="task-0184"></a>
## TASK-0184 — Audio event wiring

Phase: 14 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0182](TASKS_PHASE_14.md), [TASK-0159](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/audio/AudioEventBindings.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

Current delivery scope: Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics.

### Context
Bounded audio event wiring deliverable. Authoritative output: `app/src/audio/AudioEventBindings.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- `app/src/audio/VoiceAllocator.ts` — dependency output
- `app/src/presentation/AnimationDirector.ts` — dependency output

### Files expected to create
- `app/src/audio/AudioEventBindings.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/src/audio/AudioEventBindings.ts` through the smallest relevant RN/Skia/core/platform harness. Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics. Record platform limitations separately.

### Acceptance criteria
- Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics.
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


<a id="task-0185"></a>
## TASK-0185 — Audio settings lifecycle

Phase: 14 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0181](TASKS_PHASE_14.md), [TASK-0047](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/audio/AudioLifecycle.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/audio/MILESTONE.md).

### Goal
Persist gains and respond to platform audio focus/background/web gesture unlock without replaying stale sounds.

### Context
Bounded audio settings lifecycle deliverable. Authoritative output: `app/src/audio/AudioLifecycle.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/audio/AudioDirector.ts` — dependency output
- `package.json` — dependency output

### Files expected to create
- `app/src/audio/AudioLifecycle.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Persist gains and respond to platform audio focus/background/web gesture unlock without replaying stale sounds.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `app/src/audio/AudioLifecycle.ts` through the smallest relevant RN/Skia/core/platform harness. Persist gains and respond to platform audio focus/background/web gesture unlock without replaying stale sounds. Record platform limitations separately.

### Acceptance criteria
- Persist gains and respond to platform audio focus/background/web gesture unlock without replaying stale sounds.
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


<a id="task-0186"></a>
## TASK-0186 — Audio mix acceptance

Phase: 14 · Priority: P1 · Type: test · Status: IN_PROGRESS

Dependencies: [TASK-0184](TASKS_PHASE_14.md), [TASK-0185](TASKS_PHASE_14.md), [TASK-0183](TASKS_PHASE_14.md), [TASK-0179](TASKS_PHASE_14.md), [TASK-0177](TASKS_PHASE_14.md), [TASK-0049](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/integration/audio-mix.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix.

### Context
Bounded audio mix acceptance deliverable. Authoritative output: `tests/integration/audio-mix.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- `app/src/audio/AudioEventBindings.ts` — dependency output
- `app/src/audio/AudioLifecycle.ts` — dependency output
- `app/src/audio/MusicController.ts` — dependency output
- `app/assets/audio/ambience/manifest.json` — dependency output
- `tooling/assets/validate-audio.ts` — dependency output

### Files expected to create
- `tests/integration/audio-mix.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.

### Test cases
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.

### Manual verification
Exercise `tests/integration/audio-mix.md` through the smallest relevant RN/Skia/core/platform harness. One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix. Record platform limitations separately.

### Acceptance criteria
- One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix.
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
