# Auto-merge scheduler and cascades

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Auto eligibility = unlock + activation mode + optional expiry. Cascade depth counts merge operations caused by one scheduling root, distinct from hero tier.

## B. Inputs

BoardChanged after purchase/merge, activation command, resume with settled board. Never rescan in a renderer callback.

## C. Outputs/events

merge.scanCompleted; merge.completed per pair; cascade.completed {rootId,operations}; explicit no_pair/max_tier outcomes.

## D. State

Persistent auto mode/entitlement/expiry and settled board. Live60-minute activation is now observed. Proposed wall-UTC expiry is guarded against clock rollback; reference background expiry policy remains U-030. Runtime root transaction ID, pending operation queue, presentation batch cursor.

## E. Preconditions

Feature eligibility verified; no tutorial prohibition; single serialized mutation owner; finite board and valid max tier. Unknown unlock/order gates block REFERENCE_EXACT mode.

## F. Transaction order

Scan immutable board → deterministic choose pair → atomic resolver → rescan resulting board until no pair or budget → persist settled state per command boundary → emit ordered result batch. New buy commands queue after current batch.

## G. State machine

```text
DISABLED ↔ IDLE → SCANNING → RESOLVING → CASCADE → SCANNING; no pair → IDLE; pause → SUSPENDED → IDLE.
```

## H. Algorithms

```text
PROPOSED policy A (not observed ordering):
while pair = firstCompatiblePairByAscendingSlot(board):
  merge(pair.sourceHighSlot,pair.destinationLowSlot)
  operations += 1
  assert operations <= initialOccupiedCount-1
return settledBoard, orderedEvents
Candidate B tier-first and C purchase-fed remain capture alternatives, not simultaneous runtime policies.
```

## I. Config dependencies

merge.schema.json autoPolicy enum, activation rule, max tier, presentation batch max, expiry. Pair selector pure and injectable for observed policy replacement.

## J. UI dependencies

SCREEN-003 booster indicator/board; timed expiry badge required. Live panel after first boss shows60minutes,Free video option and500gem option; free activation produced a59:51countdown. No always-on tutorial default.

## K. Animation/audio hooks

Animation IDs: `merge.cascade`, `hero.mergeOut`, `hero.mergeIn`. Audio IDs: `merge.cascade`. Haptic/interrupt decision: medium;cap4,no unbounded escalation. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Do not save half-consumed sources. If several pair operations are batched, save final candidate once; on write failure discard draft. Reload starts settled board and no replayed grants.

## M. Analytics

hero_merge(mode=auto), cascade_length; analytics never triggers next merge.

## N. Edge cases

[1,1,2]→[3]; [1,1,1]→[2,1]; [1,1,1,1]→[3] under proposed policy; two disjoint families; full board pair frees one; only max-tier pairs do not loop.

## O. Test matrix

Unit golden boards for each policy. Property/stress ≥1000 seeded boards: termination, deterministic output, no illegal tier/negative funds. Pause/save/rapid buy replay integration; 0.5/1/2x presentation QA.

## P. Evidence

EV-006 marketing; EV-009/010 manual tutorial; EV-022 observed60-minute auto panel and free activation; EV-023 observed two buys causing2→3→4cascade including a deployed hero, result remained deployed in slot2. Exact general ordering/max-tier/expiry semantics remain unproven.

## Q. Unknowns

U-002 and U-030 HIGH: implement configurable proposed fixture only until capture task closes. Verify new purchases during cascade and max tier explicitly.

## R. Acceptance criteria

Scheduler terminates within occupiedCount-1 operations, emits no duplicate commands, correctly settles full-board cascade; animation interruption cannot alter result; unknown ordering cannot be mislabeled reference exact.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).

## Shipped browser/native control — PROPOSED booster-v1

TASK-0229 wires the existing accepted auto primitives into the Battle control.
Optional activation costs 100 gold for 60 minutes, with a free pause/resume during
that entitlement. This is a coherent product approximation, not the reference's
500-gem/ad offer. No additional rewarded placement is introduced. Stable slot-order
cascades settle inside activation/toggle and board-changing purchase/move/deploy/
merge transactions; max-tier and deployed/gear rules remain unchanged. Expiry uses
max(current wall, persisted observed wall). Save failure retains the same command.
Speed toggles 1×/2× combat; victory offer and transition clocks remain real time.
Gold booster opens the required Shop 1000-coins confirmed rewarded action.
