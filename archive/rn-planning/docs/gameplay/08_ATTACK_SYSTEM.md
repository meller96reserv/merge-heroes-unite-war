# Attack cooldown and marker contract

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

AttackId = encounter + attacker + sequence. Logical windup/release/impact tick differs from visual animation duration.

## B. Inputs

Simulation tick and active target; stat/cooldown modifiers at documented boundaries.

## C. Outputs/events

attack.intent {attackId,attackerId,targetId,releaseTick,hitTick}; attack.cancelled; one resolved hit.

## D. State

Runtime nextAttackTick, attackSequence, phase, scheduled intent. Config controls intervalTicks and windupTicks.

## E. Preconditions

Active deployed alive attacker; target legal; tick>=nextAttackTick; no disabled status.

## F. Transaction order

Reserve attack ID → choose target/stats snapshot → set nextAttackTick from prior schedule/current tick policy → enqueue logical hit → publish visual markers. Renderer follows tick schedule.

## G. State machine

```text
READY→WINDUP→RELEASED→RECOVER→READY; invalidation before release→CANCELLED; post-release projectile uses its own rule.
```

## H. Algorithms

```text
if tick>=nextAttackTick && target:
 intent = snapshotAttackStats()
 nextAttackTick=tick+intervalTicks
 scheduleHit(tick+windupTicks+travelTicks)
 emit marker schedule; renderer may catch up but cannot call damage twice
```

## I. Config dependencies

hero attack profiles + animation.schema.json releaseMarker; all durations centralized; no gameplay setTimeout.

## J. UI dependencies

HeroView body transform for flattened sprites; separate shadow; socket coordinates calibrated per visual profile.

## K. Animation/audio hooks

Animation IDs: `hero.attack`, `projectile.launch`. Audio IDs: `combat.melee`, `combat.ranged`, `combat.magic`. Haptic/interrupt decision: none;profile selects melee/ranged/magic variant. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Encounter checkpoint policy determines cooldown restore; pause/resume must not produce burst of missed offline attacks.

## M. Analytics

No per-hit production analytics; debug attackId and timeline trace.

## N. Edge cases

Interval change during windup; merge attacker; pause before release; speed0.5/2x; large dt; missing sprite.

## O. Test matrix

Unit exact scheduled tick count, no double hit on repeated marker; integration renderer frozen/dropped frames same domain result; 60fps video marker QA.

## P. Evidence

EV-012 ranged projectile visible; popup icon values including2.0 are display facts, not measured interval.

## Q. Unknowns

U-004 real intervals and marker location; U-023 merging deployed attacker.

## R. Acceptance criteria

Every attack has one logical release/hit schedule; cooldown monotonic; no duplicated marker damage; debug animation speed leaves domain intact when separately configured.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
