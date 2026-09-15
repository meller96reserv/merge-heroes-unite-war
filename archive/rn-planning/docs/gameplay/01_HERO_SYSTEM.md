# Hero definitions and instances

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Definition = reference hero identity/family/tier/stats. Instance = owned unit with stable instanceId. Tier is merge progression; hero upgradeLevel and accountLevel are separate. visualId is Figma art mapping, not a stat source.

## B. Inputs

purchase.succeeded, merge.completed, deploy/withdraw commands, upgrade transaction, tick.

## C. Outputs/events

hero.spawned, hero.deployed, hero.withdrawn, hero.statsChanged; immutable combat snapshots.

## D. State

Persistent: instanceId, definitionId, tier, slotId, upgradeLevel, equippedItemIds, deployed, alive/recovery if verified. Runtime: targetId, cooldownTicks, attackSeq, transient buffs, presentation phase. Animation state is renderer-owned.

## E. Preconditions

Definition exists; tier and visual profile valid; slot unique; deploy capacity available. Never infer family compatibility from portrait border color.

## F. Transaction order

Validate command and config refs → compute candidate instance/stats → validate board+roster invariants → durable commit → emit one entity delta.

## G. State machine

```text
OWNED_RESERVE ↔ DEPLOYED → RECOVERING (only if measured) → OWNED_RESERVE; either owned state → CONSUMED_BY_MERGE.
```

## H. Algorithms

```text
effectiveStats = resolve(definition.baseStats, upgradeConfig, equippedItems, validBuffs)
resolve emits no side effects; visualId comes from explicit content mapping
consumed instances are absent from board and roster after merge
```

## I. Config dependencies

hero.schema.json; hero-tiers.schema.json; equipment.schema.json; explicit tier→visual mapping. No balance in presentation component.

## J. UI dependencies

SCREEN-003 board/world, SCREEN-004 detail, SCREEN-007 list; HeroView/Portrait use semantic families hero_*, portrait_*.

## K. Animation/audio hooks

Animation IDs: `hero.spawn`, `hero.idle`, `hero.attack`, `hero.hit`, `hero.mergeOut`, `hero.mergeIn`, `hero.upgrade`. Audio IDs: `hero.spawn`, `equipment.upgrade`. Haptic/interrupt decision: light/medium after committed result. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Instances retain IDs across normal reload. Transient attack state either saved at defined checkpoint or deterministically reset at encounter restart; one policy per save version.

## M. Analytics

hero_tier_reached once per discovered tier; hero_deploy/withdraw optional debug traces.

## N. Edge cases

Consumed deployed unit; duplicate ID; invalid definition; stale target; upgrade while firing; missing art; unknown max tier.

## O. Test matrix

Unit: stats composition and ownership. Integration: board/roster referential integrity on merge+reload. Manual: portrait and world correspond to same visualId.

## P. Evidence

EV-004 Figma ten named archetypes; EV-010 live Archer tier2; these are different identity systems (CF-004).

## Q. Unknowns

U-023 deployment restrictions; U-022 recovery; U-035 reference/art correspondence; U-004 real stats.

## R. Acceptance criteria

Every live instance has one valid definition and at most one board position; deployed set references existing instances; view deletion cannot change ownership; no unresolved required data ref.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
