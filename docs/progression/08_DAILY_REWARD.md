# Daily and attendance rewards

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Daily claim period differs from 7-day launch event. Figma one chest is a presentation, not proof of calendar rules.

## B. Inputs

Boot/resume eligibility, ClaimDaily

## C. Outputs/events

daily.available/claimed; reward.committed

## D. State

periodKey,lastClaimedPeriod,streak/attendanceIndex only if verified

## E. Preconditions

Period eligible, source configured, no consumed token

## F. Transaction order

calculate period → persist entitlement → claim atomically with reward and period watermark → emit → dismiss

## G. State machine

```text
UNAVAILABLE→AVAILABLE→CLAIM_PENDING→CLAIMED→NEXT_PERIOD
```

## H. Algorithms

```text
PROPOSED period=floor(trustedUtcMillis/86400000)
claim key=daily:period; never reset based on decrement-only UI timer
reference attendance consecutive-days behavior and missed-day reset remain capture tasks
```

## I. Config dependencies

daily-rewards.schema.json/rewards/time policy

## J. UI dependencies

SCREEN-008/009; live attendance7-day layout differs, CF-009

## K. Animation/audio hooks

Animation IDs: `daily.claim`, `chest.open`, `reward.gem`. Audio IDs: `reward.daily`, `reward.chest`. Haptic/interrupt decision: medium. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Store lastClaimedPeriod and pending token, not local formatted date; prevent rollback duplicate claim

## M. Analytics

daily_claim {period,index,transactionId}

## N. Edge cases

Midnight during popup; missed day; device clock rollback; double resume/claim

## O. Test matrix

unit once/period,UTC boundary; integration crash+double tap; manual advertised streak rules

## P. Evidence

EV-013 live Attendance Reward7days, first day+1000gem shown; Figma+1000gold chest

## Q. Unknowns

U-014,U-007

## R. Acceptance criteria

Current period rewarded once; long absence does not invent streak penalties; conflicting presentation clearly documented.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).

## Daily-v1 delivery rule — PROPOSED

The Figma GET FREE GOLD action durably reserves the current UTC day; CLAIM grants
exactly 1000 gold and consumes that day once. Both supplied variants are reachable.
A reserved day survives route close/restart/midnight; claiming it may be followed
by the next eligible day. A backward wall clock cannot reserve an earlier day.
There is no streak penalty, ad requirement or extra currency gift. Future clock
manipulation cannot be fully prevented by a local-only clock and is not claimed.
