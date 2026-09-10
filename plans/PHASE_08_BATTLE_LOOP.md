# PHASE 08 — Battle Loop

## Goal
Implement deterministic combat and projection. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/gameplay/06_BATTLE_SYSTEM.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md)

## Inputs
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md)
- `game-core/src/commands/DeployHero.ts` — TASK-0092 predecessor

## Outputs
- `game-core/src/model/CombatEntity.ts` — Combat entity model
- `game-core/src/systems/EncounterSpawner.ts` — Encounter spawn service
- `game-core/src/systems/TargetingSystem.ts` — Target selector
- `game-core/src/systems/AttackSystem.ts` — Attack cooldown system
- `game-core/src/systems/HitQueue.ts` — Hit intent queue
- `game-core/src/systems/DamageResolver.ts` — Damage resolver
- `game-core/src/systems/DeathSystem.ts` — Death reducer
- `game-core/src/systems/BattleSystem.ts` — Battle tick pipeline
- `app/src/battle/HeroView.ts` — Hero combat presenter
- `app/src/battle/EnemyView.ts` — Enemy presenter
- `app/src/battle/ProjectileView.ts` — Projectile presenter
- `app/src/battle/DamageLabel.ts` — Damage label presenter
- `game-core/src/systems/KillRewardService.ts` — Combat reward adapter
- `game-core/src/systems/RecoveryPolicy.ts` — Mode attack and recovery policy
- `game-core/tests/simulation/combat.test.ts` — Combat deterministic fixtures
- `tests/integration/combat-presentation.md` — Combat visual acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0092](../tasks/TASKS_PHASE_07.md) — Deployment command

## Risks
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 08.1

[TASK-0095](../tasks/TASKS_PHASE_08.md) — Combat entity model. Represent HP,stats,cooldown,target and stable spawnOrdinal independently of presentation transforms. Required predecessors: TASK-0092.

### Step 08.2

[TASK-0096](../tasks/TASKS_PHASE_08.md) — Encounter spawn service. Instantiate configured waves with unique encounter/entity IDs and no reward on spawn. Required predecessors: TASK-0095.

### Step 08.3

[TASK-0097](../tasks/TASKS_PHASE_08.md) — Target selector. Choose configured deterministic target; clear dead/stale IDs and test ties across stage boundary. Required predecessors: TASK-0096.

### Step 08.4

[TASK-0098](../tasks/TASKS_PHASE_08.md) — Attack cooldown system. Emit scheduled attack intents at exact ticks and respect disabled/dead actors. Required predecessors: TASK-0097.

### Step 08.5

[TASK-0099](../tasks/TASKS_PHASE_08.md) — Hit intent queue. Resolve due attacks in stable order with explicit target-stale policy; renderer does not schedule damage. Required predecessors: TASK-0098.

### Step 08.6

[TASK-0100](../tasks/TASKS_PHASE_08.md) — Damage resolver. Apply configured integer rounding defense crit and minimum; clamp HP and reject overflow config. Required predecessors: TASK-0099.

### Step 08.7

[TASK-0101](../tasks/TASKS_PHASE_08.md) — Death reducer. Emit one death per entity and create unique kill entitlement under simultaneous lethal hits. Required predecessors: TASK-0100.

### Step 08.8

[TASK-0102](../tasks/TASKS_PHASE_08.md) — Battle tick pipeline. Compose cooldown,target,intents,hits,damage,deaths,rewards and stage handoff in documented order. Required predecessors: TASK-0101.

### Step 08.9

[TASK-0103](../tasks/TASKS_PHASE_08.md) — Hero combat presenter. Bind owned/deployed hero to battle anchor and event phases; no combat rules in component. Required predecessors: TASK-0102.

### Step 08.10

[TASK-0104](../tasks/TASKS_PHASE_08.md) — Enemy presenter. Project HP/hit/death and release pooled view after fade without retaining target references. Required predecessors: TASK-0103.

### Step 08.11

[TASK-0105](../tasks/TASKS_PHASE_08.md) — Projectile presenter. Animate configured travel and cancel stale visual safely; impact callback never grants damage. Required predecessors: TASK-0104.

### Step 08.12

[TASK-0106](../tasks/TASKS_PHASE_08.md) — Damage label presenter. Display exact committed damage with normal/crit styles and bounded pooled overlap. Required predecessors: TASK-0105.

### Step 08.13

[TASK-0107](../tasks/TASKS_PHASE_08.md) — Combat reward adapter. Use unique encounter/entity source token and durable queue; repeated callbacks cannot grant twice. Required predecessors: TASK-0106.

### Step 08.14

[TASK-0108](../tasks/TASKS_PHASE_08.md) — Mode attack and recovery policy. Gate enemy counterattack/death behavior by verified mode config; no invented permanent hero loss. Required predecessors: TASK-0107.

### Step 08.15

[TASK-0109](../tasks/TASKS_PHASE_08.md) — Combat deterministic fixtures. Run twenty-hit cases,simultaneous deaths,zero targets and varied render cadence with same seed. Required predecessors: TASK-0108.

### Step 08.16

[TASK-0110](../tasks/TASKS_PHASE_08.md) — Combat visual acceptance. Capture melee/ranged/magic,hits,crit,death and missing target under full/low/reduced motion. Required predecessors: TASK-0109.

## Files/directories expected to be created
- `game-core/src/model/CombatEntity.ts`
- `game-core/src/systems/EncounterSpawner.ts`
- `game-core/src/systems/TargetingSystem.ts`
- `game-core/src/systems/AttackSystem.ts`
- `game-core/src/systems/HitQueue.ts`
- `game-core/src/systems/DamageResolver.ts`
- `game-core/src/systems/DeathSystem.ts`
- `game-core/src/systems/BattleSystem.ts`
- `app/src/battle/HeroView.ts`
- `app/src/battle/EnemyView.ts`
- `app/src/battle/ProjectileView.ts`
- `app/src/battle/DamageLabel.ts`
- `game-core/src/systems/KillRewardService.ts`
- `game-core/src/systems/RecoveryPolicy.ts`
- `game-core/tests/simulation/combat.test.ts`
- `tests/integration/combat-presentation.md`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0095](../tasks/TASKS_PHASE_08.md) — Combat entity model
- [TASK-0096](../tasks/TASKS_PHASE_08.md) — Encounter spawn service
- [TASK-0097](../tasks/TASKS_PHASE_08.md) — Target selector
- [TASK-0098](../tasks/TASKS_PHASE_08.md) — Attack cooldown system
- [TASK-0099](../tasks/TASKS_PHASE_08.md) — Hit intent queue
- [TASK-0100](../tasks/TASKS_PHASE_08.md) — Damage resolver
- [TASK-0101](../tasks/TASKS_PHASE_08.md) — Death reducer
- [TASK-0102](../tasks/TASKS_PHASE_08.md) — Battle tick pipeline
- [TASK-0103](../tasks/TASKS_PHASE_08.md) — Hero combat presenter
- [TASK-0104](../tasks/TASKS_PHASE_08.md) — Enemy presenter
- [TASK-0105](../tasks/TASKS_PHASE_08.md) — Projectile presenter
- [TASK-0106](../tasks/TASKS_PHASE_08.md) — Damage label presenter
- [TASK-0107](../tasks/TASKS_PHASE_08.md) — Combat reward adapter
- [TASK-0108](../tasks/TASKS_PHASE_08.md) — Mode attack and recovery policy
- [TASK-0109](../tasks/TASKS_PHASE_08.md) — Combat deterministic fixtures
- [TASK-0110](../tasks/TASKS_PHASE_08.md) — Combat visual acceptance
