# Boss entry, timeout and retry

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

BossEncounter uses stage conditions, timer and special profile; no universal every-N formula without samples.

## B. Inputs

boss stage entered, retry tap, boss HP0, timer expiry

## C. Outputs/events

boss.warning, boss.started, boss.cleared, boss.failed

## D. State

bossStageId,attemptId,remainingTicks,phase,retryAvailable,returnFarmStageId

## E. Preconditions

Boss eligibility, roster, valid HP/timer config; previous attempt settled

## F. Transaction order

enter warning → new generation → start timer → resolve lethal hits before timeout at same tick (PROPOSED tie rule) → win reward or fail/farm checkpoint

## G. State machine

```text
AVAILABLE→WARNING→COMBAT→CLEARED; COMBAT→TIMEOUT→FARMING→AVAILABLE
```

## H. Algorithms

```text
if boss.hp==0: settleWin once
else if tick>=deadline: settleFail; return to configured farming stage
retry creates new attempt, never reuses reward key
```

## I. Config dependencies

stage.schema.json boss {timerTicks,retryPolicy,farmStageId}; enemy boss flag

## J. UI dependencies

SCREEN-003 warning/timer/retry; SCREEN-006 alt dragons not proof of stage-boss HP

## K. Animation/audio hooks

Animation IDs: `boss.intro`, `boss.hit`, `boss.death`, `boss.warning`. Audio IDs: `boss.intro`, `boss.death`, `combat.hit`. Haptic/interrupt decision: heavy intro/death with1500mscooldown;HUD fixed. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist failure/retry state and reward key; pause freezes simulation timer per proposed lifecycle policy

## M. Analytics

boss_start/clear/fail with stageId and attempt

## N. Edge cases

lethal hit on deadline; restart mid-warning; spam retry; pending old projectile

## O. Test matrix

unit deadline ordering; integration failure→farm→retry; native interruption

## P. Evidence

EV-014 retry prompt on1-9; exact first boss encounter requires video review

## Q. Unknowns

U-005,U-033

## R. Acceptance criteria

Win/fail mutually exclusive, at most one reward, retry no charge unless config explicitly observed; no permanent softlock.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
