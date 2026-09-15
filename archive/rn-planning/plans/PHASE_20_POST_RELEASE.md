# PHASE 20 — Post Release

## Goal
Extend only through evidence-backed scope. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/release/05_POST_LAUNCH_BACKLOG.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[05_POST_LAUNCH_BACKLOG.md](../docs/release/05_POST_LAUNCH_BACKLOG.md) · [16_BATTLE_CONTENT_MODES.md](../docs/gameplay/16_BATTLE_CONTENT_MODES.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

## Inputs
- [05_POST_LAUNCH_BACKLOG.md](../docs/release/05_POST_LAUNCH_BACKLOG.md)
- [16_BATTLE_CONTENT_MODES.md](../docs/gameplay/16_BATTLE_CONTENT_MODES.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `analysis/reports/production_gate.md` — TASK-0237 predecessor

## Outputs
- `analysis/reference/extended_mode_cases.md` — Alternative mode capture
- `analysis/reference/summon_cases.md` — Summon capture
- `analysis/reference/prestige_presence.md` — Prestige presence check
- `docs/progression/RELIC_EXTENSION.md` — Relic progression design
- `game-core/src/modes/DragonMode.ts` — Dragon mode implementation slice
- `game-core/src/modes/DemonMode.ts` — Demon mode implementation slice
- `game-core/src/modes/TowerMode.ts` — Tower mode implementation slice
- `game-core/src/systems/SummonService.ts` — Summon pool reducer
- `game-core/src/systems/SkillService.ts` — Skill status reducer
- `docs/visual/CUSTOM_CHARACTER_MOTION.md` — Custom character motion
- `docs/visual/LAYERED_BACKGROUND_EXTENSION.md` — Background expansion
- `analysis/reports/post_launch_triage.md` — Post-launch diagnostics triage
- `docs/adr/ADR-007-ONLINE-SYSTEMS.md` — Optional online systems ADR

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0237](../tasks/TASKS_PHASE_19.md) — Production release gate

## Risks
Unobserved feature; content removal migration; mode-specific recovery; optional monetization scope expansion. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 20.1

[TASK-0239](../tasks/TASKS_PHASE_20.md) — Alternative mode capture. Reach Dragon/Demon/Tower unlocks and record entry,roster,timer,reward/failure rules before implementation. Required predecessors: TASK-0237.

### Step 20.2

[TASK-0240](../tasks/TASKS_PHASE_20.md) — Summon capture. Record disclosed pool probabilities,pity andx1/x10rules without paid sampling or rarity guesswork. Required predecessors: TASK-0237.

### Step 20.3

[TASK-0241](../tasks/TASKS_PHASE_20.md) — Prestige presence check. Inspect bounded late-menu/versioned sources and record observed/unknown status; no invented rebirth loop. Required predecessors: TASK-0237.

### Step 20.4

[TASK-0242](../tasks/TASKS_PHASE_20.md) — Relic progression design. Specify the Figma relic collection and its working Open x1/x10 controls, ownership and useful bounded effects. Keep the 16 supplied relic visuals. No reference relic research, hidden rarity curve or unrelated progression system is required. Required predecessors: TASK-0065, TASK-0074, TASK-0075.

### Step 20.5

[TASK-0243](../tasks/TASKS_PHASE_20.md) — Dragon mode implementation slice. Implement the three Figma Dungeon entries (Infernal, Frost and Shadow Dragon) as functioning challenges using the shared combat runtime and durable rewards. Preserve their supplied art/composition; no reference Dragon/Demon/Tower mode parity is required. Required predecessors: TASK-0065, TASK-0074, TASK-0118.

### Step 20.6

[TASK-0244](../tasks/TASKS_PHASE_20.md) — Demon mode implementation slice. Implement one verified counterattack/recovery path and test hero defeat without unintended permanent loss. Required predecessors: TASK-0237, TASK-0239.

### Step 20.7

[TASK-0245](../tasks/TASKS_PHASE_20.md) — Tower mode implementation slice. Implement one verified floor progression/checkpoint/reward path with save compatibility. Required predecessors: TASK-0237, TASK-0239.

### Step 20.8

[TASK-0246](../tasks/TASKS_PHASE_20.md) — Summon pool reducer. Implement atomic Figma equipment/relic Open controls (x1/x10 where shown), configured in-game currency costs and saved item outcomes; bind required panels and reject insufficient/duplicate/restarted operations. Pity, reference summon events and real-money packs remain deferred. Required predecessors: TASK-0074, TASK-0075, TASK-0120, TASK-0242.

### Step 20.9

[TASK-0247](../tasks/TASKS_PHASE_20.md) — Skill status reducer. Implement one verified skill/status family with stacking,cooldown,target and interruption tests. Required predecessors: TASK-0237.

### Step 20.10

[TASK-0248](../tasks/TASKS_PHASE_20.md) — Custom character motion. Commission separable art/rigs only if whole-sprite quality insufficient; preserve provenance and runtime budgets. Required predecessors: TASK-0237.

### Step 20.11

[TASK-0249](../tasks/TASKS_PHASE_20.md) — Background expansion. Acquire true separated layers and compare parallax quality/memory before replacing flattened source. Required predecessors: TASK-0237.

### Step 20.12

[TASK-0250](../tasks/TASKS_PHASE_20.md) — Post-launch diagnostics triage. Turn consented crash/save/platform-service reports into bounded reproduction tasks with build/evidence IDs. Required predecessors: TASK-0237.

### Step 20.13

[TASK-0251](../tasks/TASKS_PHASE_20.md) — Optional online systems ADR. Define optional accounts/cloud-save/payments scope,authority and migrations; rewarded ads are already in scope under the product amendment and are not deferred here. Required predecessors: TASK-0237.

## Files/directories expected to be created
- `analysis/reference/extended_mode_cases.md`
- `analysis/reference/summon_cases.md`
- `analysis/reference/prestige_presence.md`
- `docs/progression/RELIC_EXTENSION.md`
- `game-core/src/modes/DragonMode.ts`
- `game-core/src/modes/DemonMode.ts`
- `game-core/src/modes/TowerMode.ts`
- `game-core/src/systems/SummonService.ts`
- `game-core/src/systems/SkillService.ts`
- `docs/visual/CUSTOM_CHARACTER_MOTION.md`
- `docs/visual/LAYERED_BACKGROUND_EXTENSION.md`
- `analysis/reports/post_launch_triage.md`
- `docs/adr/ADR-007-ONLINE-SYSTEMS.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Add feature-specific domain/save/visual tests after evidence/scope gate; disabled feature must not alter existing MVP. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0239](../tasks/TASKS_PHASE_20.md) — Alternative mode capture
- [TASK-0240](../tasks/TASKS_PHASE_20.md) — Summon capture
- [TASK-0241](../tasks/TASKS_PHASE_20.md) — Prestige presence check
- [TASK-0242](../tasks/TASKS_PHASE_20.md) — Relic progression design
- [TASK-0243](../tasks/TASKS_PHASE_20.md) — Dragon mode implementation slice
- [TASK-0244](../tasks/TASKS_PHASE_20.md) — Demon mode implementation slice
- [TASK-0245](../tasks/TASKS_PHASE_20.md) — Tower mode implementation slice
- [TASK-0246](../tasks/TASKS_PHASE_20.md) — Summon pool reducer
- [TASK-0247](../tasks/TASKS_PHASE_20.md) — Skill status reducer
- [TASK-0248](../tasks/TASKS_PHASE_20.md) — Custom character motion
- [TASK-0249](../tasks/TASKS_PHASE_20.md) — Background expansion
- [TASK-0250](../tasks/TASKS_PHASE_20.md) — Post-launch diagnostics triage
- [TASK-0251](../tasks/TASKS_PHASE_20.md) — Optional online systems ADR

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0239: DEFERRED_POST_DELIVERY.
- TASK-0240: DEFERRED_POST_DELIVERY.
- TASK-0241: DEFERRED_POST_DELIVERY.
- TASK-0244: DEFERRED_POST_DELIVERY.
- TASK-0245: DEFERRED_POST_DELIVERY.
- TASK-0247: DEFERRED_POST_DELIVERY.
- TASK-0248: DEFERRED_POST_DELIVERY.
- TASK-0249: DEFERRED_POST_DELIVERY.
- TASK-0250: DEFERRED_POST_DELIVERY.
- TASK-0251: DEFERRED_POST_DELIVERY.
- TASK-0242: REQUIRED_NOW.
- TASK-0243: REQUIRED_NOW.
- TASK-0246: REQUIRED_NOW.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
