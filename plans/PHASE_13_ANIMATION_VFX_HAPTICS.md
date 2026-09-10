# PHASE 13 — Animation Vfx Haptics

## Goal
Deliver bounded expressive presentation. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/visual/04_ANIMATION_LANGUAGE.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

## Inputs
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `analysis/figma/import_calibration.json` — TASK-0030 predecessor
- `tests/integration/combat-presentation.md` — TASK-0110 predecessor
- `package.json` — TASK-0047 predecessor

## Outputs
- `analysis/figma/motion_calibration.json` — Motion art calibration
- `app/src/presentation/AnimationDirector.ts` — Animation director
- `app/src/presentation/EffectPool.ts` — Presentation pool manager
- `app/src/presentation/HeroMotion.ts` — Hero idle spawn profiles
- `app/src/presentation/HeroCombatMotion.ts` — Hero attack hit profiles
- `app/src/presentation/EnemyMotion.ts` — Enemy boss profiles
- `app/src/presentation/MergeMotion.ts` — Merge convergence profile
- `app/src/presentation/CascadeMotion.ts` — Merge cascade escalation
- `app/assets/art/effects/projectile-manifest.json` — Projectile art task
- `app/src/presentation/EffectPrimitives.ts` — Effect primitive task
- `app/src/presentation/DamageMotion.ts` — Damage number motion
- `app/src/presentation/RewardMotion.ts` — Currency reward flyers
- `app/src/presentation/UiMotion.ts` — UI button counter motion
- `app/src/presentation/TransitionMotion.ts` — Popup route transitions
- `app/src/presentation/WheelMotion.ts` — Wheel motion profile
- `app/src/presentation/MetaRewardMotion.ts` — Daily chest upgrade feedback
- `app/src/presentation/BackgroundMotion.ts` — Background motion fallback
- `app/src/platform/Haptics.ts` — Haptic event adapter
- `tests/integration/motion-interruption.md` — Motion freeze and interruption QA

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0030](../tasks/TASKS_PHASE_02.md) — Asset import calibration
- [TASK-0110](../tasks/TASKS_PHASE_08.md) — Combat visual acceptance
- [TASK-0047](../tasks/TASKS_PHASE_04.md) — React Native Expo application foundation

## Risks
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 13.1

[TASK-0158](../tasks/TASKS_PHASE_13.md) — Motion art calibration. Review flattened character feet,sockets and background layer limits; do not auto-cut limbs. Required predecessors: TASK-0030.

### Step 13.2

[TASK-0159](../tasks/TASKS_PHASE_13.md) — Animation director. Resolve profiles/events with priority,cancel-and-reconcile and reduced-motion mode. Required predecessors: TASK-0110, TASK-0158.

### Step 13.3

[TASK-0160](../tasks/TASKS_PHASE_13.md) — Presentation pool manager. Bound acquire/release,reset callbacks/Skia resources/Reanimated values and guard reused effect generation. Required predecessors: TASK-0159.

### Step 13.4

[TASK-0161](../tasks/TASKS_PHASE_13.md) — Hero idle spawn profiles. Implement grounded idle/spawn for10families and verify no clipping/foot drift. Required predecessors: TASK-0160.

### Step 13.5

[TASK-0162](../tasks/TASKS_PHASE_13.md) — Hero attack hit profiles. Align anticipation/release/recovery with domain timestamps; hit cannot restart death. Required predecessors: TASK-0161.

### Step 13.6

[TASK-0163](../tasks/TASKS_PHASE_13.md) — Enemy boss profiles. Implement spawn/hit/death and boss intro/death with pool teardown and skip behavior. Required predecessors: TASK-0162.

### Step 13.7

[TASK-0164](../tasks/TASKS_PHASE_13.md) — Merge convergence profile. Implement650msstaged merge keyed by mergeId and reconstruct result after any cancellation. Required predecessors: TASK-0163.

### Step 13.8

[TASK-0165](../tasks/TASKS_PHASE_13.md) — Merge cascade escalation. Sequence bounded intensity/pitch hooks and cap concurrent rings while preserving committed order. Required predecessors: TASK-0164.

### Step 13.9

[TASK-0166](../tasks/TASKS_PHASE_13.md) — Projectile art task. Create original arrow/magic primitive assets and reviewed sockets; no reference extraction. Required predecessors: TASK-0165.

### Step 13.10

[TASK-0167](../tasks/TASKS_PHASE_13.md) — Effect primitive task. Create bounded hit/crit/merge/death/reward primitives matching palette and outline style. Required predecessors: TASK-0166.

### Step 13.11

[TASK-0168](../tasks/TASKS_PHASE_13.md) — Damage number motion. Pool48labels with normal/crit rise/spread and bounded presentation-only coalescing. Required predecessors: TASK-0167.

### Step 13.12

[TASK-0169](../tasks/TASKS_PHASE_13.md) — Currency reward flyers. Animate bounded symbolic coins/gems to HUD after commit; skip leaves final balance correct. Required predecessors: TASK-0168.

### Step 13.13

[TASK-0170](../tasks/TASKS_PHASE_13.md) — UI button counter motion. Implement pressed/counter/tab/red-dot states with coalesced revisions and no tween property fights. Required predecessors: TASK-0169.

### Step 13.14

[TASK-0171](../tasks/TASKS_PHASE_13.md) — Popup route transitions. Implement280/180msmodal and route transitions with input ownership and load generation cleanup. Required predecessors: TASK-0170.

### Step 13.15

[TASK-0172](../tasks/TASKS_PHASE_13.md) — Wheel motion profile. Accelerate/decelerate monotonically to saved angle and throttle pointer ticks; no outcome chosen by tween. Required predecessors: TASK-0171.

### Step 13.16

[TASK-0173](../tasks/TASKS_PHASE_13.md) — Daily chest upgrade feedback. Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite. Required predecessors: TASK-0172.

### Step 13.17

[TASK-0174](../tasks/TASKS_PHASE_13.md) — Background motion fallback. Keep flattened scenery static/subtle drift with clamped edges; reduced motion disables offset. Required predecessors: TASK-0173.

### Step 13.18

[TASK-0175](../tasks/TASKS_PHASE_13.md) — Haptic event adapter. Map semantic events to supported native feedback with preference,cooldown and background suppression. Required predecessors: TASK-0174, TASK-0047.

### Step 13.19

[TASK-0176](../tasks/TASKS_PHASE_13.md) — Motion freeze and interruption QA. One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix. Required predecessors: TASK-0175.

## Files/directories expected to be created
- `analysis/figma/motion_calibration.json`
- `app/src/presentation/AnimationDirector.ts`
- `app/src/presentation/EffectPool.ts`
- `app/src/presentation/HeroMotion.ts`
- `app/src/presentation/HeroCombatMotion.ts`
- `app/src/presentation/EnemyMotion.ts`
- `app/src/presentation/MergeMotion.ts`
- `app/src/presentation/CascadeMotion.ts`
- `app/assets/art/effects/projectile-manifest.json`
- `app/src/presentation/EffectPrimitives.ts`
- `app/src/presentation/DamageMotion.ts`
- `app/src/presentation/RewardMotion.ts`
- `app/src/presentation/UiMotion.ts`
- `app/src/presentation/TransitionMotion.ts`
- `app/src/presentation/WheelMotion.ts`
- `app/src/presentation/MetaRewardMotion.ts`
- `app/src/presentation/BackgroundMotion.ts`
- `app/src/platform/Haptics.ts`
- `tests/integration/motion-interruption.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0158](../tasks/TASKS_PHASE_13.md) — Motion art calibration
- [TASK-0159](../tasks/TASKS_PHASE_13.md) — Animation director
- [TASK-0160](../tasks/TASKS_PHASE_13.md) — Presentation pool manager
- [TASK-0161](../tasks/TASKS_PHASE_13.md) — Hero idle spawn profiles
- [TASK-0162](../tasks/TASKS_PHASE_13.md) — Hero attack hit profiles
- [TASK-0163](../tasks/TASKS_PHASE_13.md) — Enemy boss profiles
- [TASK-0164](../tasks/TASKS_PHASE_13.md) — Merge convergence profile
- [TASK-0165](../tasks/TASKS_PHASE_13.md) — Merge cascade escalation
- [TASK-0166](../tasks/TASKS_PHASE_13.md) — Projectile art task
- [TASK-0167](../tasks/TASKS_PHASE_13.md) — Effect primitive task
- [TASK-0168](../tasks/TASKS_PHASE_13.md) — Damage number motion
- [TASK-0169](../tasks/TASKS_PHASE_13.md) — Currency reward flyers
- [TASK-0170](../tasks/TASKS_PHASE_13.md) — UI button counter motion
- [TASK-0171](../tasks/TASKS_PHASE_13.md) — Popup route transitions
- [TASK-0172](../tasks/TASKS_PHASE_13.md) — Wheel motion profile
- [TASK-0173](../tasks/TASKS_PHASE_13.md) — Daily chest upgrade feedback
- [TASK-0174](../tasks/TASKS_PHASE_13.md) — Background motion fallback
- [TASK-0175](../tasks/TASKS_PHASE_13.md) — Haptic event adapter
- [TASK-0176](../tasks/TASKS_PHASE_13.md) — Motion freeze and interruption QA

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0168: REQUIRED_NOW.
- TASK-0169: REQUIRED_NOW.
- TASK-0170: REQUIRED_NOW.
- TASK-0171: REQUIRED_NOW.
- TASK-0172: REQUIRED_NOW.
- TASK-0173: REQUIRED_NOW.
- TASK-0174: REQUIRED_NOW.
- TASK-0175: REQUIRED_NOW.
- TASK-0176: REQUIRED_NOW.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.
