# Reward transaction pipeline

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

RewardToken identifies entitlement; receipt proves applied reward. Visual fly icon is not entitlement.

## B. Inputs

Enemy/stage/discovery/quest/daily/wheel/offline entitlement

## C. Outputs/events

reward.committed and currency.changed after durable write

## D. State

pendingClaims,claimReceipts,sourceWatermarks,balances/items

## E. Preconditions

Token valid/current; entitlement condition true; not consumed; approved amount

## F. Transaction order

calculate → draft grant+receipt+source watermark → atomic persist → install snapshot → emit → animate → counter tween to snapshot

## G. State machine

```text
AVAILABLE→COMMIT_PENDING→COMMITTED→PRESENTED; interrupted presentation stays COMMITTED
```

## H. Algorithms

```text
if receipt(token): return priorReceipt
validate entitlement(source,period,attempt)
commit balances/items + consumed token in same save generation
on storage failure keep old committed state and retry; no visible grant
```

## I. Config dependencies

rewards.schema.json union currency/item/freeSpin; save.schema.json receipts

## J. UI dependencies

All claims; SCREEN-008/009 daily; wheel result; offline proposed popup

## K. Animation/audio hooks

Animation IDs: `reward.coin`, `reward.gem`, `currency.bump`. Audio IDs: `economy.goldGain`, `economy.gemGain`. Haptic/interrupt decision: claim-source-specific;no duplicate presentation per transaction. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

A/B save generations validated; no unbounded receipt pruning without monotonic source watermark guaranteeing old requests ineligible

## M. Analytics

reward_claimed once, reason source

## N. Edge cases

Crash between persistence and feedback; duplicate platform callback; scene closed; corrupted backup

## O. Test matrix

fault inject every commit boundary; duplicate100 times result same; reload after animation cancel

## P. Evidence

EV-010 rewards visibly already reflected behind popup; implementation durable contract proposed

## Q. Unknowns

U-007,U-013

## R. Acceptance criteria

One eligible token changes economy once; no callback/tween can mint rewards; write failure leaves funds unchanged.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).


Product amendment: reserved rewarded operations bind placement and outcome; completion only,never dismissed/displayed/clicked. Shop grants1000gold without cooldown per unique completed video. Stage-clear base reward remains ordinary earned currency; successful boost grants only the multiplier delta once (x1–x10), not the base twice. Tasks0254–0259 own failure/restart/callback acceptance.

TASK-0254 stores an optional backward-compatible `rewardedOperations` map.
Each record binds operation, placement, outcome and app-session identities.
PROPOSED callback freshness is 10 minutes; callbacks from another app session,
after a replacement attempt or outside that interval cannot confirm a reward.
Confirmed durable entitlements survive restart without expiry; consumption and
the actual feature grant share one transaction and permanent source watermark.
Cancellation/no-fill/failure retires the attempt but preserves the feature's prize
for another video. Native SDK callbacks are mapped by the platform adapter;
this pure domain contract does not claim a verified native integration.

TASK-0255/0256 implementation: Free coins grants exactly1000gold per unique
completed operation with no cooldown. Optional `stageBoosts` save records bind a
2-second offer to the successful stage boundary and its actual kill/first-clear
base gold. PROPOSED uniform x1–x10 selection consumes the saved reward RNG once;
selection precedes visual spin. Only the confirmed operation grants the delta
above that already-earned base. Expired unselected offers may be discarded;
selected/confirmed prizes survive restart. UI claim command IDs remain stable
per entitlement so retries reuse a candidate written before an acknowledgment
failure. TASK-0257 owns the reachable UI; TASK-0258/0259 owns the actual provider.
