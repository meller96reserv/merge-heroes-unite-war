# Atomic tasks — phase 08

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_08_BATTLE_LOOP.md).

<a id="task-0095"></a>
## TASK-0095 — Combat entity model

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0092](TASKS_PHASE_07.md) — Deployment command

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/model/CombatEntity.ts. Integrate shared registries coherently.

Evidence: [entity.tap](../analysis/reports/combat/entity.tap).

### Goal
Represent HP,stats,cooldown,target and stable spawnOrdinal independently of presentation transforms.

### Context
Bounded combat entity model deliverable. Authoritative output: `game-core/src/model/CombatEntity.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/commands/DeployHero.ts` — dependency output

### Files expected to create
- `game-core/src/model/CombatEntity.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Represent HP,stats,cooldown,target and stable spawnOrdinal independently of presentation transforms.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `game-core/src/model/CombatEntity.ts` through the smallest relevant RN/Skia/core/platform harness. Represent HP,stats,cooldown,target and stable spawnOrdinal independently of presentation transforms. Record platform limitations separately.

### Acceptance criteria
- Represent HP,stats,cooldown,target and stable spawnOrdinal independently of presentation transforms.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0096"></a>
## TASK-0096 — Encounter spawn service

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0095](TASKS_PHASE_08.md) — Combat entity model

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/EncounterSpawner.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [spawn.tap](../analysis/reports/combat/spawn.tap).

### Goal
Instantiate configured waves with unique encounter/entity IDs and no reward on spawn.

### Context
This is the bounded encounter spawn service deliverable within implement deterministic combat and projection. Its authoritative output is `game-core/src/systems/EncounterSpawner.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/model/CombatEntity.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/EncounterSpawner.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/EncounterSpawner.ts`; unresolved reference behavior stays gated.
2. Instantiate configured waves with unique encounter/entity IDs and no reward on spawn.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Instantiate configured waves with unique encounter/entity IDs and no reward on spawn. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Instantiate configured waves with unique encounter/entity IDs and no reward on spawn.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0097"></a>
## TASK-0097 — Target selector

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0096](TASKS_PHASE_08.md) — Encounter spawn service

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/TargetingSystem.ts. Integrate shared registries coherently.

Evidence: [targeting.tap](../analysis/reports/combat/targeting.tap).

### Goal
Choose configured deterministic target; clear dead/stale IDs and test ties across stage boundary.

### Context
Bounded target selector deliverable. Authoritative output: `game-core/src/systems/TargetingSystem.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- [07_TARGETING_SYSTEM.md](../docs/gameplay/07_TARGETING_SYSTEM.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/EncounterSpawner.ts` — dependency output

### Files expected to create
- `game-core/src/systems/TargetingSystem.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Choose configured deterministic target; clear dead/stale IDs and test ties across stage boundary.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `game-core/src/systems/TargetingSystem.ts` through the smallest relevant RN/Skia/core/platform harness. Choose configured deterministic target; clear dead/stale IDs and test ties across stage boundary. Record platform limitations separately.

### Acceptance criteria
- Choose configured deterministic target; clear dead/stale IDs and test ties across stage boundary.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0011. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0098"></a>
## TASK-0098 — Attack cooldown system

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0097](TASKS_PHASE_08.md) — Target selector

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/AttackSystem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [attack.tap](../analysis/reports/combat/attack.tap).

### Goal
Emit scheduled attack intents at exact ticks and respect disabled/dead actors.

### Context
This is the bounded attack cooldown system deliverable within implement deterministic combat and projection. Its authoritative output is `game-core/src/systems/AttackSystem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/systems/TargetingSystem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/AttackSystem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/AttackSystem.ts`; unresolved reference behavior stays gated.
2. Emit scheduled attack intents at exact ticks and respect disabled/dead actors.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Emit scheduled attack intents at exact ticks and respect disabled/dead actors. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Emit scheduled attack intents at exact ticks and respect disabled/dead actors.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0099"></a>
## TASK-0099 — Hit intent queue

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0098](TASKS_PHASE_08.md) — Attack cooldown system

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/HitQueue.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [hit-queue.tap](../analysis/reports/combat/hit-queue.tap).

### Goal
Resolve due attacks in stable order with explicit target-stale policy; renderer does not schedule damage.

### Context
This is the bounded hit intent queue deliverable within implement deterministic combat and projection. Its authoritative output is `game-core/src/systems/HitQueue.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/systems/AttackSystem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/HitQueue.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/HitQueue.ts`; unresolved reference behavior stays gated.
2. Resolve due attacks in stable order with explicit target-stale policy; renderer does not schedule damage.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Resolve due attacks in stable order with explicit target-stale policy; renderer does not schedule damage. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Resolve due attacks in stable order with explicit target-stale policy; renderer does not schedule damage.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0100"></a>
## TASK-0100 — Damage resolver

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0099](TASKS_PHASE_08.md) — Hit intent queue

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/DamageResolver.ts. Integrate shared registries coherently.

Evidence: [damage.tap](../analysis/reports/combat/damage.tap).

### Goal
Apply configured integer rounding defense crit and minimum; clamp HP and reject overflow config.

### Context
Bounded damage resolver deliverable. Authoritative output: `game-core/src/systems/DamageResolver.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/HitQueue.ts` — dependency output

### Files expected to create
- `game-core/src/systems/DamageResolver.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Apply configured integer rounding defense crit and minimum; clamp HP and reject overflow config.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `game-core/src/systems/DamageResolver.ts` through the smallest relevant RN/Skia/core/platform harness. Apply configured integer rounding defense crit and minimum; clamp HP and reject overflow config. Record platform limitations separately.

### Acceptance criteria
- Apply configured integer rounding defense crit and minimum; clamp HP and reject overflow config.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0010. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0101"></a>
## TASK-0101 — Death reducer

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0100](TASKS_PHASE_08.md) — Damage resolver

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/DeathSystem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [death.tap](../analysis/reports/combat/death.tap).

### Goal
Emit one death per entity and create unique kill entitlement under simultaneous lethal hits.

### Context
This is the bounded death reducer deliverable within implement deterministic combat and projection. Its authoritative output is `game-core/src/systems/DeathSystem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/systems/DamageResolver.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/DeathSystem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/DeathSystem.ts`; unresolved reference behavior stays gated.
2. Emit one death per entity and create unique kill entitlement under simultaneous lethal hits.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Emit one death per entity and create unique kill entitlement under simultaneous lethal hits. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Emit one death per entity and create unique kill entitlement under simultaneous lethal hits.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0102"></a>
## TASK-0102 — Battle tick pipeline

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0101](TASKS_PHASE_08.md) — Death reducer

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/BattleSystem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [battle.tap](../analysis/reports/combat/battle.tap).

### Goal
Compose cooldown,target,intents,hits,damage,deaths,rewards and stage handoff in documented order.

### Context
This is the bounded battle tick pipeline deliverable within implement deterministic combat and projection. Its authoritative output is `game-core/src/systems/BattleSystem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/systems/DeathSystem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/BattleSystem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/BattleSystem.ts`; unresolved reference behavior stays gated.
2. Compose cooldown,target,intents,hits,damage,deaths,rewards and stage handoff in documented order.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Compose cooldown,target,intents,hits,damage,deaths,rewards and stage handoff in documented order. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Compose cooldown,target,intents,hits,damage,deaths,rewards and stage handoff in documented order.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0103"></a>
## TASK-0103 — Hero combat presenter

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0102](TASKS_PHASE_08.md) — Battle tick pipeline

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/battle/HeroView.ts. Integrate shared registries coherently.

Evidence: [hero-view.tap](../analysis/reports/combat/hero-view.tap), [hero.json](../analysis/reports/combat/browser/hero.json).

### Goal
Bind owned/deployed hero to battle anchor and event phases; no combat rules in component.

### Context
Bounded hero combat presenter deliverable. Authoritative output: `app/src/battle/HeroView.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/systems/BattleSystem.ts` — dependency output

### Files expected to create
- `app/src/battle/HeroView.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Bind owned/deployed hero to battle anchor and event phases; no combat rules in component.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `app/src/battle/HeroView.ts` through the smallest relevant RN/Skia/core/platform harness. Bind owned/deployed hero to battle anchor and event phases; no combat rules in component. Record platform limitations separately.

### Acceptance criteria
- Bind owned/deployed hero to battle anchor and event phases; no combat rules in component.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0104"></a>
## TASK-0104 — Enemy presenter

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0103](TASKS_PHASE_08.md) — Hero combat presenter

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/battle/EnemyView.ts. Integrate shared registries coherently.

Evidence: [enemy-view.tap](../analysis/reports/combat/enemy-view.tap), [enemy.json](../analysis/reports/combat/browser/enemy.json).

### Goal
Project HP/hit/death and release pooled view after fade without retaining target references.

### Context
Bounded enemy presenter deliverable. Authoritative output: `app/src/battle/EnemyView.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `app/src/battle/HeroView.ts` — dependency output

### Files expected to create
- `app/src/battle/EnemyView.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Project HP/hit/death and release pooled view after fade without retaining target references.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `app/src/battle/EnemyView.ts` through the smallest relevant RN/Skia/core/platform harness. Project HP/hit/death and release pooled view after fade without retaining target references. Record platform limitations separately.

### Acceptance criteria
- Project HP/hit/death and release pooled view after fade without retaining target references.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0105"></a>
## TASK-0105 — Projectile presenter

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0104](TASKS_PHASE_08.md) — Enemy presenter

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/battle/ProjectileView.ts. Integrate shared registries coherently.

Evidence: [projectile-view.tap](../analysis/reports/combat/projectile-view.tap), [projectile.json](../analysis/reports/combat/browser/projectile.json).

### Goal
Animate configured travel and cancel stale visual safely; impact callback never grants damage.

### Context
Bounded projectile presenter deliverable. Authoritative output: `app/src/battle/ProjectileView.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md)
- `app/src/battle/EnemyView.ts` — dependency output

### Files expected to create
- `app/src/battle/ProjectileView.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Animate configured travel and cancel stale visual safely; impact callback never grants damage.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `app/src/battle/ProjectileView.ts` through the smallest relevant RN/Skia/core/platform harness. Animate configured travel and cancel stale visual safely; impact callback never grants damage. Record platform limitations separately.

### Acceptance criteria
- Animate configured travel and cancel stale visual safely; impact callback never grants damage.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0106"></a>
## TASK-0106 — Damage label presenter

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0105](TASKS_PHASE_08.md) — Projectile presenter

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/battle/DamageLabel.ts. Integrate shared registries coherently.

Evidence: [damage-label.tap](../analysis/reports/combat/damage-label.tap), [damage-label.json](../analysis/reports/combat/browser/damage-label.json).

### Goal
Display exact committed damage with normal/crit styles and bounded pooled overlap.

### Context
Bounded damage label presenter deliverable. Authoritative output: `app/src/battle/DamageLabel.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `app/src/battle/ProjectileView.ts` — dependency output

### Files expected to create
- `app/src/battle/DamageLabel.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Display exact committed damage with normal/crit styles and bounded pooled overlap.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `app/src/battle/DamageLabel.ts` through the smallest relevant RN/Skia/core/platform harness. Display exact committed damage with normal/crit styles and bounded pooled overlap. Record platform limitations separately.

### Acceptance criteria
- Display exact committed damage with normal/crit styles and bounded pooled overlap.
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


<a id="task-0107"></a>
## TASK-0107 — Combat reward adapter

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0106](TASKS_PHASE_08.md) — Damage label presenter

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/KillRewardService.ts. Integrate shared registries coherently.

Evidence: [kill-rewards.tap](../analysis/reports/combat/kill-rewards.tap), [rewards.json](../analysis/reports/combat/browser/rewards.json).

### Goal
Use unique encounter/entity source token and durable queue; repeated callbacks cannot grant twice.

### Context
Bounded combat reward adapter deliverable. Authoritative output: `game-core/src/systems/KillRewardService.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `app/src/battle/DamageLabel.ts` — dependency output

### Files expected to create
- `game-core/src/systems/KillRewardService.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Use unique encounter/entity source token and durable queue; repeated callbacks cannot grant twice.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `game-core/src/systems/KillRewardService.ts` through the smallest relevant RN/Skia/core/platform harness. Use unique encounter/entity source token and durable queue; repeated callbacks cannot grant twice. Record platform limitations separately.

### Acceptance criteria
- Use unique encounter/entity source token and durable queue; repeated callbacks cannot grant twice.
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


<a id="task-0108"></a>
## TASK-0108 — Mode attack and recovery policy

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0107](TASKS_PHASE_08.md) — Combat reward adapter

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/RecoveryPolicy.ts. Integrate shared registries coherently.

Evidence: [recovery-policy.tap](../analysis/reports/combat/recovery-policy.tap).

### Goal
Gate enemy counterattack/death behavior by verified mode config; no invented permanent hero loss.

### Context
Bounded mode attack and recovery policy deliverable. Authoritative output: `game-core/src/systems/RecoveryPolicy.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/KillRewardService.ts` — dependency output

### Files expected to create
- `game-core/src/systems/RecoveryPolicy.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Gate enemy counterattack/death behavior by verified mode config; no invented permanent hero loss.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise `game-core/src/systems/RecoveryPolicy.ts` through the smallest relevant RN/Skia/core/platform harness. Gate enemy counterattack/death behavior by verified mode config; no invented permanent hero loss. Record platform limitations separately.

### Acceptance criteria
- Gate enemy counterattack/death behavior by verified mode config; no invented permanent hero loss.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0020. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0109"></a>
## TASK-0109 — Combat deterministic fixtures

Phase: 08 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0108](TASKS_PHASE_08.md) — Mode attack and recovery policy

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/tests/simulation/combat.test.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [deterministic-fixtures.tap](../analysis/reports/combat/deterministic-fixtures.tap).

### Goal
Run twenty-hit cases,simultaneous deaths,zero targets and varied render cadence with same seed.

### Context
This is the bounded combat deterministic fixtures deliverable within implement deterministic combat and projection. Its authoritative output is `game-core/tests/simulation/combat.test.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/src/systems/RecoveryPolicy.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/tests/simulation/combat.test.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/tests/simulation/combat.test.ts`; unresolved reference behavior stays gated.
2. Run twenty-hit cases,simultaneous deaths,zero targets and varied render cadence with same seed.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Run twenty-hit cases,simultaneous deaths,zero targets and varied render cadence with same seed. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Run twenty-hit cases,simultaneous deaths,zero targets and varied render cadence with same seed.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0110"></a>
## TASK-0110 — Combat visual acceptance

Phase: 08 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0109](TASKS_PHASE_08.md) — Combat deterministic fixtures

Parallelization: Allowed after listed dependencies; exclusive edit ownership for tests/integration/combat-presentation.md. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [results.json](../analysis/reports/combat/presentation/results.json), [production-exclusion.json](../analysis/reports/combat/presentation/production-exclusion.json).

### Goal
Capture melee/ranged/magic,hits,crit,death and missing target under full/low/reduced motion.

### Context
This is the bounded combat visual acceptance deliverable within implement deterministic combat and projection. Its authoritative output is `tests/integration/combat-presentation.md`; adjacent systems remain separate tasks.

### Source-of-truth docs
[06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [06_BATTLE_SYSTEM.md](../docs/gameplay/06_BATTLE_SYSTEM.md)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `game-core/tests/simulation/combat.test.ts` — future artifact from listed dependency

### Files expected to create

- `tests/integration/combat-presentation.md`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `tests/integration/combat-presentation.md`; unresolved reference behavior stays gated.
2. Capture melee/ranged/magic,hits,crit,death and missing target under full/low/reduced motion.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.

### Test cases
Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.

### Manual verification
Capture melee/ranged/magic,hits,crit,death and missing target under full/low/reduced motion. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Capture melee/ranged/magic,hits,crit,death and missing target under full/low/reduced motion.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
