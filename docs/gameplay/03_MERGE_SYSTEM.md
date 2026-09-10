# Manual merge and atomic resolver

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Compatible pair is configured family+tier equality with an available result definition. source = dragged unit; destination = drop target. Visual archetype is not compatibility.

## B. Inputs

MergePair(commandId,sourceId,destinationId,expectedRevision); only eligible tutorial pair accepted when forced tutorial active.

## C. Outputs/events

merge.completed {oldIds,newId,resultTier,destinationSlot,cascadeDepth,transactionId}; board.changed; hero.statsChanged; tier discovery reward request once.

## D. State

Persistent board/units/roster/discoveredTiers; runtime drag pointer and pending revision. Domain never stores tween progress.

## E. Preconditions

Different existing IDs; compatible and below max tier; neither consumed; source/destination owned. Policy for deployed pair must be locked via U-023 before exact implementation.

## F. Transaction order

Validate both instances and slot ownership → compute new unit → remove both source IDs from board/roster → create one result at destination slot → optionally inherit destination deployment if policy permits → discover tier/reward once → persist one combined transaction → emit.

## G. State machine

```text
IDLE → DRAGGING → VALIDATING → COMMIT_PENDING → RESOLVED; invalid/cancel → IDLE without mutation.
```

## H. Algorithms

```text
merge(a,b): assert a.id != b.id && compatible(a,b)
result = config.result(a.definition,b.definition)
draft.remove(a); draft.remove(b)
draft.add(newId,result,b.slot)
assert occupiedAfter == occupiedBefore-1
assert unique(board.instanceIds)
commit and emit exactly one merge.completed
```

## I. Config dependencies

merge.schema.json compatibility/destination/max tier/deployed policy; hero-tiers.schema.json explicit result map.

## J. UI dependencies

SCREEN-003 drag highlight; invalid drop snaps back visually. Input owner releases on pointercancel, modal, pause or stale revision.

## K. Animation/audio hooks

Animation IDs: `hero.mergeOut`, `hero.mergeIn`, `merge.cascade`. Audio IDs: `merge.low`, `merge.mid`, `merge.high`, `merge.cascade`. Haptic/interrupt decision: medium,cooldown and intensity cap4. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist settled logical result before effect. Reload never reconstructs consumed units from effect progress. Discovery rewards in same durable transaction or separate persisted pending reward token.

## M. Analytics

hero_merge {fromTier,toTier,mode,depth,transactionId}; hero_tier_reached deduped by tier.

## N. Edge cases

Three equal → result+one; four equal → two results before cascade; invalid family; self-drop; max tier; full board pair; deployed sources; pause/drop twice.

## O. Test matrix

Unit: 2→1 count, destination, compatibility. Property: weighted tier mass conserved for power-of-two fixture, source IDs absent. Integration: duplicate command, crash while showing result; manual direction and hit regions.

## P. Evidence

EV-010 live two tier1→tier2 Archer; accepted tutorial drag from second slot onto first; no automatic merge while tutorial waited. This does not prove free-play pair priority.

## Q. Unknowns

U-002 auto ordering; U-023 deployed inheritance; U-035 result family/tier table. Safe resolver requires explicit config, no silently guessed original rule.

## R. Acceptance criteria

Exactly one result at configured destination; no source survives; no duplicate reward; same input/state yields same result; max tier rejects without losing units.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).

Implementation approximation: [playable-v1 rules](../implementation/PLAYABLE_V1_RULES.md). Source observations and golden fixtures are unchanged.
