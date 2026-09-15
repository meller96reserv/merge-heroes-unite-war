# Enemy lifecycle

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Enemy definition vs spawned encounter entity; spawnOrdinal is stable order.

## B. Inputs

enter encounter, tick, damage result

## C. Outputs/events

enemy.spawned, enemy.died, encounter.completed

## D. State

definitionId,entityId,encounterId,hp,alive,deathCommitted; runtime target/attack state

## E. Preconditions

enemy definition and stage link exist; HP positive at spawn

## F. Transaction order

spawn → damage clamp → alive→dead edge → reserve death reward → persist → remove logical entity → recycle view

## G. State machine

```text
SPAWNING→ALIVE→DYING_COMMITTED→REMOVED
```

## H. Algorithms

```text
if hpBefore>0 and hpAfter==0 and not deathCommitted: mark death once; enqueue unique reward(encounterId,entityId)
```

## I. Config dependencies

enemy.schema.json / stage.schema.json

## J. UI dependencies

SCREEN-003; enemy_* families and three boss_* dragon variants

## K. Animation/audio hooks

Animation IDs: `enemy.spawn`, `enemy.idle`, `enemy.attack`, `enemy.hit`, `enemy.death`. Audio IDs: `enemy.deathSmall`, `enemy.deathLarge`. Haptic/interrupt decision: none for frequent enemy events. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Save checkpoint must pair deathCommitted with reward receipt; reference HP restore U-013

## M. Analytics

enemy_kill aggregated, stage events

## N. Edge cases

simultaneous hits; corpse pooling; despawn without death; missing art

## O. Test matrix

unit death crossing once; integration1000 reused views cannot reuse logical IDs

## P. Evidence

EV-004 art; EV-012 live enemies

## Q. Unknowns

U-004,U-022,U-031

## R. Acceptance criteria

Zero duplicate death rewards; enemy visual may fade after logical removal; all live enemies have positive HP.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
