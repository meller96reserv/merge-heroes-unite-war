# Board, placement and deployment

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

SlotId stable row-major index; occupancy distinct from unlock; deployed unit retains owned board slot in observed tutorial. Empty tile is not a battle position.

## B. Inputs

Purchase, merge, deploy, withdraw, slot unlock, pointer drop, lifecycle cancellation.

## C. Outputs/events

board.changed; slot.unlocked; hero.deployed/withdrawn; rejected action reason.

## D. State

Persistent slots {id,unlockCondition,unitId}; deployed instance set; runtime selection/pointer owner. Proposed logical capacity15, initial5 based on web display.

## E. Preconditions

One unit per slot; locked slots empty; no unit appears twice; deployment subset of owned units and below configured cap.

## F. Transaction order

Resolve slot eligibility → validate ownership/revision → write occupancy/roster atomically → persist critical change → emit; display projection maps logical slots to responsive anchors.

## G. State machine

```text
LOCKED → EMPTY ↔ OCCUPIED_RESERVE ↔ OCCUPIED_DEPLOYED; merging removes one occupied position; unsupported sell disabled.
```

## H. Algorithms

```text
firstEmpty = lowest slotId with unlocked && unitId==null
on deploy(id): assert roster.size<cap; add id, keep slot occupied
on withdraw(id): remove id from deployed; retain unit+slot
on fullBoardPurchase: reject before spend; manual compatible merge remains possible
```

## I. Config dependencies

merge.schema.json board layout and deploy policy; unlocks.schema.json conditions; visual 430×932 ten-slot fixture separately.

## J. UI dependencies

SCREEN-003 Figma10 slots5×2 vs live15 positions5×3 CF-003; adapt elastic board and touch targets, do not silently reduce reference capacity.

## K. Animation/audio hooks

Animation IDs: `slot.unlock`, `hero.deploy`, `hero.withdraw`, `feature.locked`. Audio IDs: `progress.unlock`, `hero.spawn`, `ui.error`. Haptic/interrupt decision: light/medium;selection ring is static. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Store stable slot IDs, not visual coordinates. Schema migration adding slots preserves existing IDs and occupancy; invalid duplicates quarantined.

## M. Analytics

slot_unlock, hero_deploy, hero_withdraw; reject reasons debug-only aggregation.

## N. Edge cases

Board full; all locked; last-slot merge; expired unlock; invalid save duplicate occupancy; drag outside; two pointers; buy+drop same frame; delete/sell unknown.

## O. Test matrix

Unit placement first free; integration full board no charge; migrate10→15 fixture without moving old IDs; native touch cancellation; visual44px target at narrow screens.

## P. Evidence

EV-009 web15 positions,5 open; EV-011 deployed tag appears on retained board unit, tap withdraw. EV-004 Figma10.

## Q. Unknowns

U-024 labels 2/3/4/6/10/15/20 and gems need threshold-type verification; U-023 cap/merge restrictions; U-025 layout adaptation.

## R. Acceptance criteria

All board/roster invariants hold after every command and restore. Full board is recoverable by merge, no funds lost, UI states explicitly communicate locks.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
