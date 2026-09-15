# Summon/gacha (conditional)

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Summon draws weighted definitions; ordinary board purchase is deterministic until observed otherwise. Openx1/x10 may be item opening.

## B. Inputs

Summon request after feature gate

## C. Outputs/events

summon.reserved/completed; item/hero reward

## D. State

requestId,outcomes,pityCounter,poolVersion

## E. Preconditions

P2 scope approved; disclosed/verified table and cost; valid pool

## F. Transaction order

reserve cost→draw complete outcome list→persist outcomes+pity→present→grant/claim once

## G. State machine

```text
DISABLED; AVAILABLE→RESERVED→REVEAL→COMPLETE
```

## H. Algorithms

```text
draw count1 or10 from versioned pool; pity transition part of same transaction
no independent draw on rerender/resume; unknown table rejects production load
```

## I. Config dependencies

summon.schema.json; equipment/rewards

## J. UI dependencies

SCREEN-005 x1/x10; SCREEN-004 x10 does not prove hero gacha

## K. Animation/audio hooks

Animation IDs: `chest.open`. Audio IDs: `reward.chest`. Haptic/interrupt decision: mode-gated;new rare reveal needs a dedicated reviewed profile. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Save outcomes+pity+payment receipt atomically

## M. Analytics

summon {poolVersion,count}; no personal spend profiling

## N. Edge cases

Pool changed midrequest;10results partial render; capacity; timeout

## O. Test matrix

unit seeded outcomes and bounds; idempotent reload; malformed table rejection

## P. Evidence

EV-007 listing mentions LR pickup summon; Figma opening controls

## Q. Unknowns

U-019

## R. Acceptance criteria

MVP does not implement unknown monetized gacha; future outcome persistence and disclosure task is explicit.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
