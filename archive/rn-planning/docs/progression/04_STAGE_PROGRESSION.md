# Stage progression rewards

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Current farming stage may repeat; highest cleared is monotonic; world is configured grouping.

## B. Inputs

stage.cleared, boss.failed/retry

## C. Outputs/events

progression.changed, unlock.available

## D. State

highestCleared,worldId,currentStage,firstClearReceipts

## E. Preconditions

Valid nextId and outcome; no duplicate encounter settlement

## F. Transaction order

kill reward → stage clear eligibility → first-clear once → highest watermark → unlock evaluation → next/farm checkpoint

## G. State machine

```text
ADVANCING↔FARMING→BOSS_RETRY
```

## H. Algorithms

```text
firstClearReward iff stageOrdinal>highestCleared; repeat kill reward keyed by unique encounterSequence
last stage enters content_complete without invalid next reference
```

## I. Config dependencies

stage/worlds/rewards/unlocks

## J. UI dependencies

SCREEN-003 stageHUD; dungeon progression separate

## K. Animation/audio hooks

Animation IDs: `stage.clear`, `reward.coin`. Audio IDs: `progress.stageClear`. Haptic/interrupt decision: light;no currency grant from effect. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Store encounter sequence to avoid farming reward key collision

## M. Analytics

stage_clear and boss retry outcome

## N. Edge cases

Repeated1-9; last stage; stage rollback from failed boss

## O. Test matrix

unit monotonic watermark; replay not double first-clear; integration fail/farm/retry

## P. Evidence

EV-014 stage1-9 repeat / boss retry shown

## Q. Unknowns

U-005,U-007

## R. Acceptance criteria

Highest clear never decreases; repeated encounters still use distinct eligible reward IDs.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
