# Offline time and pending claim

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Wall clock UTC for elapsed; monotonic time for live simulation; offline duration is clamped and never affected by debug simulation speed.

## B. Inputs

APP_BACKGROUND/FOREGROUND; cold boot; ClaimOffline

## C. Outputs/events

offline.available/claimed, reward.committed

## D. State

lastActiveAt,lastProcessedAt,pendingClaim{id,from,to,duration,reward},lastClaimedToken

## E. Preconditions

Valid save;now sanitized; absence duration positive; no already processed interval

## F. Transaction order

background checkpoint → foreground clamp elapsed → calculate from saved eligible rate → persist pending token with reserved from/to boundary → popup → grant+receipt+advance processed watermark atomically

## G. State machine

```text
ACTIVE→BACKGROUND→CALCULATING→CLAIMABLE→CLAIMED→ACTIVE
```

## H. Algorithms

```text
elapsed=max(0,min(now-lastProcessedAt,capMs))
reward=floor(savedRatePerSecond*elapsed/1000) [PROPOSED gold-only]
if pendingClaim exists: show same token, do not recompute/reroll
new intervals start at prior processed boundary; no overlap
```

## I. Config dependencies

economy.offline config; save/time-service schema; cap8h is proposed fixture only

## J. UI dependencies

Proposed offline modal using gold panel/chest assets; not observed Figma frame

## K. Animation/audio hooks

Animation IDs: `offline.popup`, `reward.coin`, `currency.bump`. Audio IDs: `reward.offline`, `economy.goldGain`. Haptic/interrupt decision: medium claim;no reward waits for fly icon. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Pending token persisted before popup; grant and claimed marker atomic;backup restore never replays consumed interval

## M. Analytics

offline_claim {duration,capped,reward,transactionId}

## N. Edge cases

Clock backward/future; timezone/DST; two resumes; crash before/after pending/grant;existing unclaimed reward

## O. Test matrix

unit negative/huge elapsed and duplicate resume; fault-inject claim; native process-kill; compare measured caps later

## P. Evidence

EV-025 observed offline3:34,247Kgold+fourotherrewardicons;balance visible before popup dismissal. Exact rate/cap/formula unknown;gold-onlyfixture is a deliberate proposed simplification (CF012).

## Q. Unknowns

U-006,U-013,U-033

## R. Acceptance criteria

Every interval processed at most once; reward nonnegative and capped; debug time does not change daily/offline wall clock.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
