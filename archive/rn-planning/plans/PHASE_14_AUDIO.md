# PHASE 14 — Audio

## Goal
Acquire and wire original audio. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/audio/02_SFX_EVENT_MAP.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md) · [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv) · [06_AUDIO_ASSET_ACQUISITION.md](../docs/audio/06_AUDIO_ASSET_ACQUISITION.md) · [03_MUSIC_PLAN.md](../docs/audio/03_MUSIC_PLAN.md) · [04_AMBIENCE_PLAN.md](../docs/audio/04_AMBIENCE_PLAN.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

## Inputs
- [02_SFX_EVENT_MAP.md](../docs/audio/02_SFX_EVENT_MAP.md)
- [audio_event_matrix.csv](../docs/audio/audio_event_matrix.csv)
- [06_AUDIO_ASSET_ACQUISITION.md](../docs/audio/06_AUDIO_ASSET_ACQUISITION.md)
- [03_MUSIC_PLAN.md](../docs/audio/03_MUSIC_PLAN.md)
- [04_AMBIENCE_PLAN.md](../docs/audio/04_AMBIENCE_PLAN.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `analysis/reports/implementation_handoff.md` — TASK-0001 predecessor
- `app/README.md` — TASK-0049 predecessor
- `app/src/presentation/AnimationDirector.ts` — TASK-0159 predecessor
- `package.json` — TASK-0047 predecessor

## Outputs
- `analysis/figma/audio_asset_ownership.csv` — Audio acquisition
- `app/assets/audio/music/manifest.json` — Music acquisition
- `app/assets/audio/ambience/manifest.json` — Ambience acquisition
- `tooling/assets/validate-audio.ts` — Audio import validation
- `app/src/audio/AudioDirector.ts` — Audio director buses
- `app/src/audio/VoiceAllocator.ts` — Audio voice budget
- `app/src/audio/MusicController.ts` — Music duck crossfade
- `app/src/audio/AudioEventBindings.ts` — Audio event wiring
- `app/src/audio/AudioLifecycle.ts` — Audio settings lifecycle
- `tests/integration/audio-mix.md` — Audio mix acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0001](../tasks/TASKS_PHASE_00.md) — Planning handoff validation
- [TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface
- [TASK-0159](../tasks/TASKS_PHASE_13.md) — Animation director
- [TASK-0047](../tasks/TASKS_PHASE_04.md) — React Native Expo application foundation

## Risks
Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 14.1

[TASK-0177](../tasks/TASKS_PHASE_14.md) — Audio acquisition. Acquire original/licensed core SFX with per-event brief,creator,file and distribution proof; no ripped reference audio. Required predecessors: TASK-0001.

### Step 14.2

[TASK-0178](../tasks/TASKS_PHASE_14.md) — Music acquisition. Acquire original main/boss loops with clean boundaries and compatible transitions; attach license and audition notes. Required predecessors: TASK-0001.

### Step 14.3

[TASK-0179](../tasks/TASKS_PHASE_14.md) — Ambience acquisition. Acquire quiet main-world loops and validate seamless repetition without distracting transient pattern. Required predecessors: TASK-0001.

### Step 14.4

[TASK-0180](../tasks/TASKS_PHASE_14.md) — Audio import validation. Check event file refs,format,duration,loop metadata,peaks and license status before import. Required predecessors: TASK-0177, TASK-0049.

### Step 14.5

[TASK-0181](../tasks/TASKS_PHASE_14.md) — Audio director buses. Implement licensed menu/game background music and SFX/UI/ambience buses,gain/mute; honor browser activation and audio focus; missing required release audio is not PASS. Required predecessors: TASK-0177, TASK-0049.

### Step 14.6

[TASK-0182](../tasks/TASKS_PHASE_14.md) — Audio voice budget. Enforce matrix cooldown/concurrency,priority stealing and independent presentation RNG. Required predecessors: TASK-0181.

### Step 14.7

[TASK-0183](../tasks/TASKS_PHASE_14.md) — Music duck crossfade. Reference-count duck requests and crossfade boss/main without duplicate loops after interruption. Required predecessors: TASK-0182, TASK-0178.

### Step 14.8

[TASK-0184](../tasks/TASKS_PHASE_14.md) — Audio event wiring. Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics. Required predecessors: TASK-0182, TASK-0159.

### Step 14.9

[TASK-0185](../tasks/TASKS_PHASE_14.md) — Audio settings lifecycle. Persist gains and respond to platform audio focus/background/web gesture unlock without replaying stale sounds. Required predecessors: TASK-0181, TASK-0047.

### Step 14.10

[TASK-0186](../tasks/TASKS_PHASE_14.md) — Audio mix acceptance. One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix. Required predecessors: TASK-0184, TASK-0185, TASK-0183, TASK-0179, TASK-0177, TASK-0049.

## Files/directories expected to be created
- `analysis/figma/audio_asset_ownership.csv`
- `app/assets/audio/music/manifest.json`
- `app/assets/audio/ambience/manifest.json`
- `tooling/assets/validate-audio.ts`
- `app/src/audio/AudioDirector.ts`
- `app/src/audio/VoiceAllocator.ts`
- `app/src/audio/MusicController.ts`
- `app/src/audio/AudioEventBindings.ts`
- `app/src/audio/AudioLifecycle.ts`
- `tests/integration/audio-mix.md`

## Existing files expected to be modified

- [audio_asset_ownership.csv](../analysis/figma/audio_asset_ownership.csv)

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0177](../tasks/TASKS_PHASE_14.md) — Audio acquisition
- [TASK-0178](../tasks/TASKS_PHASE_14.md) — Music acquisition
- [TASK-0179](../tasks/TASKS_PHASE_14.md) — Ambience acquisition
- [TASK-0180](../tasks/TASKS_PHASE_14.md) — Audio import validation
- [TASK-0181](../tasks/TASKS_PHASE_14.md) — Audio director buses
- [TASK-0182](../tasks/TASKS_PHASE_14.md) — Audio voice budget
- [TASK-0183](../tasks/TASKS_PHASE_14.md) — Music duck crossfade
- [TASK-0184](../tasks/TASKS_PHASE_14.md) — Audio event wiring
- [TASK-0185](../tasks/TASKS_PHASE_14.md) — Audio settings lifecycle
- [TASK-0186](../tasks/TASKS_PHASE_14.md) — Audio mix acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0177: REQUIRED_NOW.
- TASK-0178: REQUIRED_NOW.
- TASK-0179: REQUIRED_NOW.
- TASK-0181: REQUIRED_NOW.
- TASK-0183: REQUIRED_NOW.
- TASK-0184: REQUIRED_NOW.
- TASK-0180: DEFERRED_POST_DELIVERY.
- TASK-0182: SUPPORTING_REQUIRED.
- TASK-0185: SUPPORTING_REQUIRED.
- TASK-0186: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
