# Currencies and number formatting

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

CurrencyId gold/gem; blue_orb is Figma upgrade-token candidate, not confirmed gold alias. Reference also shows other ticket/token icons; keep their identity UNKNOWN.

## B. Inputs

Spend/Grant transaction; settings locale

## C. Outputs/events

currency.changed, transaction.rejected

## D. State

balances map decimal nonnegative integer strings; formatter uses bigint; display never becomes stored value

## E. Preconditions

Known currency ID and amount>=0; spend<=balance

## F. Transaction order

validate amount → debit/credit candidate → durable checkpoint → publish receipt

## G. State machine

```text
AVAILABLE→COMMIT_PENDING→AVAILABLE / REJECTED
```

## H. Algorithms

```text
parseDecimalStrict; add/subtract bigint; reject negative and malformed strings
format <1000 exact; >=1000 use3 significant digits,K/M/B/T then scientific fallback; floor display near thresholds (PROPOSED)
```

## I. Config dependencies

economy.schema.json and currency definitions

## J. UI dependencies

SCREEN-003…007 top HUD; currency_gold_coin / currency_gem_blue; proposed orb ID remains gated

## K. Animation/audio hooks

Animation IDs: `currency.bump`, `reward.coin`, `reward.gem`. Audio IDs: `economy.goldGain`, `economy.goldSpend`, `economy.gemGain`. Haptic/interrupt decision: none for frequent counters. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Canonical decimal strings avoid JSON bigint limitation; do not parse formatted K/M values

## M. Analytics

currency_earned/spent {currency,reason,amount,transactionId}

## N. Edge cases

Exactly funds; huge amount; locale separators; invalid exponent/string; negative grant

## O. Test matrix

unit bigint bounds,999/1000/999999; same formatter across screens; schema reject unsafe numeric balances

## P. Evidence

EV-009 gold, EV-010 gems; EV-004 blue orb art

## Q. Unknowns

U-034,U-016

## R. Acceptance criteria

No negative balance, no float precision loss, one shared formatter and transaction API.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
