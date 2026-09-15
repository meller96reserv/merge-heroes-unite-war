# Wheel outcome and presentation

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

SpinId entitlement; segmentId is a visual mapping. Probability is not inferred from segment angular area.

## B. Inputs

Spin(commandId,offerId), resume pending spin

## C. Outputs/events

wheel.started/landed; reward.committed

## D. State

spinId,outcome,consumedFreeToken,costReceipt,nextFreeAt,claimStatus

## E. Preconditions

Config weights validated; eligible cooldown-free or bonus free spin; no parallel active spin. No paid spin is required by the delivery scope.

## F. Transaction order

reserve cost/free entitlement + choose outcome + persist spin record → animate to segment → reward commit once → show receipt

## G. State machine

```text
AVAILABLE→RESERVED→SPINNING→LANDED→CLAIMED; interruption restores RESERVED/CLAIMED
```

## H. Algorithms

```text
outcome = weightedChoice(config.weights,rng)
landingAngle = angleFor(outcome.segmentId)+fullRotations
view decelerates to chosen angle, never chooses reward
crash before landing resumes result without reroll or second charge
```

## I. Config dependencies

WheelOutcome.fortuneV1/rewards/animation. U-015 remains UNKNOWN reference parity;
ADR-007 permits the explicitly PROPOSED versioned product weights below.

## J. UI dependencies

SCREEN-013/014/015;12 labelled constructed sectors and decorative wheel icon must not be conflated

## K. Animation/audio hooks

Animation IDs: `wheel.accelerate`, `wheel.tick`, `wheel.decelerate`, `wheel.land`. Audio IDs: `wheel.tick`, `wheel.result`. Haptic/interrupt decision: medium final only;tick audio throttled. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist outcome before playing animation; duplicate platform callback cannot reroll. No real-money payout in scope.

## M. Analytics

wheel_spin {offer,spinId,outcome}; reward source wheel

## N. Edge cases

Back/home midspin; appkill; timer expiry; invalid weights;FAIL/free-spin outcome; double tap

## O. Test matrix

unit weighted bounds with seeded RNG; idempotent interrupted spin; visual pointer landing each segment

## P. Evidence

EV-004 wheel variants present; reference wheel not yet observed

## Q. Unknowns

U-015

## R. Acceptance criteria

Segment/outcome map exhaustive; spin cost/free counter/reward consistent across every crash boundary; no inferred probabilities.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).


Product amendment overrides any free/paid claim ambiguity:12-hour cooldown from durable reservation; persist pending outcome; result CTA Watch & Claim requires confirmed rewarded completion. Pulse Tap entry/CTA with reduced-motion alternative; entry and panel both show timer. TASK-0136 is independent of daily/quest UI so wheel follows the playable slice.

## Implemented product rule: fortune-v1 (TASK-0136)

Twelve segments clockwise from the top: 10000 gold (Mega Win), 100 gold,
FAIL, 500 gold, 1000 gold, 200 gold, 3 free spins, 300 gold, FAIL, 5000 gold,
150 gold, 800 gold. Labels/order come from supplied Figma; every weight=1 is
an explicit PROPOSED project choice, not reference probability evidence.
Outcome IDs include the version and index; retain their immutable definitions
for pending saves. Landing rotation is `(360 - index × 30) % 360` and has no
economic authority. FAIL has an empty grant, with the same confirmed-ad claim
contract; free-spin rewards become entitlements only after confirmed claim.
The saved selection is reused by spin ID without consuming RNG again.

TASK-0137: reservation atomically saves outcome, reward RNG, receipt and nextFreeAt.
The regular timed entitlement is used first; bonus spins are consumed only while
that entitlement is cooling down. Every reservation starts a new 12-hour timer.
Pending results prevent new spins even after cooldown expiry. UTC earlier than
the saved activity/update watermark is rejected; this is local rollback protection,
not a claim of server-backed clock-tamper prevention. No currency is debited.
