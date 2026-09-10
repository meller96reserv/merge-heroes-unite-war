# Quests

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Quest definition supplies objective event, target count, reward and reset policy; guided task HUD is not all quest types.

## B. Inputs

Committed domain events; ClaimQuest

## C. Outputs/events

quest.progressChanged, quest.claimed, notification.changed

## D. State

progressById,claimedPeriods,activeSequenceId

## E. Preconditions

Objective event matches filters; claim count>=target; period valid

## F. Transaction order

increment bounded objective → expose claim → on claim grant+advance sequence atomically → persist → feedback

## G. State machine

```text
LOCKED→ACTIVE→CLAIMABLE→CLAIMED→NEXT
```

## H. Algorithms

```text
counter=min(target,counter+matchingEvent.amount)
claim uses reward token questId:period; duplicate returns receipt
next quest activation only after commit
```

## I. Config dependencies

quests.schema.json/rewards/unlocks

## J. UI dependencies

Main HUD kill stage monsters(0/2→2/2), claim button and red dot; missing standalone Figma quest screen functional-equivalent

## K. Animation/audio hooks

Animation IDs: `quest.progress`, `quest.claim`, `reward.coin`. Audio IDs: `progress.stageClear`. Haptic/interrupt decision: light on claim;progress pulse grants nothing. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist counters with critical event checkpoints; source event dedupe avoids duplicated kills on reload

## M. Analytics

quest_claim and objective completions

## N. Edge cases

Two events same tick; reward+next race; daily reset; tutorial filters

## O. Test matrix

unit counter filters and cap; integration double claim and sequence; manual red dots

## P. Evidence

EV-013 kill2 quest and300 token reward shown; exact currency identity and claim sequence captured separately

## Q. Unknowns

U-017,U-007

## R. Acceptance criteria

Progress/claim states consistent; next objective cannot receive stale previous quest event.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
