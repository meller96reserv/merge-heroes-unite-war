# Stage progression and farming

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

StageId is stable key; display chapter-stage, observed1-1 and1-9; encounter attempt differs from highest cleared stage.

## B. Inputs

boot, encounter complete, retry, boss clear

## C. Outputs/events

stage.entered, stage.cleared, stage.changed, unlock.available

## D. State

currentStageId,highestClearedStageId,encounterSequence,farmingStageId,attemptId

## E. Preconditions

Referenced wave/enemy/reward exist; previous critical reward persisted

## F. Transaction order

resolve enemy/wave completion → reward transaction → advance highest clear if new → evaluate unlocks → persist next stage → emit

## G. State machine

```text
ENTERING→WAVE→COMBAT→REWARD→CLEAR→NEXT; boss failure→FARMING→RETRY
```

## H. Algorithms

```text
nextStage = stage.nextId; never parse display string for logic
rewardKey includes encounterSequence for repeatable farming, firstClearKey includes stageId
highestCleared is monotonic; current farming stage may repeat
```

## I. Config dependencies

stage.schema.json/enemies/worlds/unlocks/rewards

## J. UI dependencies

SCREEN-003 label and enemy HP/stage track; progress semantics must be data-defined

## K. Animation/audio hooks

Animation IDs: `stage.progress`, `stage.clear`, `reward.coin`. Audio IDs: `progress.stageClear`, `economy.goldGain`. Haptic/interrupt decision: light on clear. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist attempt sequence and first-clear watermark atomically; no reward from stale previous generation

## M. Analytics

stage_start/clear, progression_monotonic test metric

## N. Edge cases

last configured stage; missing nextId; repeat farming; pending projectile; retry

## O. Test matrix

unit graph no dangling nextId, cycles allowed only explicit farming; integration double death one clear

## P. Evidence

EV-012 stage1-1→1-2; EV-014 farming1-9/boss retry visible

## Q. Unknowns

U-005,U-024,U-007

## R. Acceptance criteria

Progress advances only after eligible completion; first-clear reward once, repeat kill rewards use unique attempts; HUD is snapshot driven.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
