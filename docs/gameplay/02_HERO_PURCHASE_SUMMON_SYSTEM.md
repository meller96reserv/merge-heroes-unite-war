# Hero purchase transaction

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Buy means spending configured currency for a board unit. Summon/gacha and relic opening are separate commands and probability models.

## B. Inputs

BuyHero(commandId,offerId,expectedRevision); hold synthesizes repeated commands only when allowed; tutorial gate can accept a single named input.

## C. Outputs/events

purchase.succeeded {transactionId,instanceId,slotId,cost}; purchase.rejected {reason}; currency.changed; hero.spawned.

## D. State

Persistent: purchaseCountByOffer, balances, board, nextInstanceSequence. Runtime: serialized command queue and per-pointer hold token.

## E. Preconditions

Config valid; offer grants its explicit configured tier (PROPOSED; no inferred max-discovery offset); offer unlocked; currency >= cost; one unlocked empty slot after policy-defined existing cascade. Full board without free slot rejects with zero charge. Pending save blocks new economy mutation.

## F. Transaction order

Read cost at execution revision → check slot and funds → allocate ID → subtract currency + increment count + add instance in same draft → persist → publish → optionally schedule auto scan. Gold is never spent from view animation.

## G. State machine

```text
IDLE → VALIDATING → COMMIT_PENDING → SPAWN_FEEDBACK → IDLE; validation failure → REJECTED → IDLE.
```

## H. Algorithms

```text
on Buy(cmd):
 if alreadyApplied(cmd.id): return priorReceipt
 price = offer.costAt(purchaseCount)
 slot = firstUnlockedEmptySlot(board)
 if slot == none: reject BOARD_FULL
 if balance < price: reject INSUFFICIENT
 commit(balance-price, count+1, newInstance(slot))
 emit success; if autoEligible: enqueue MergeScan
```

## I. Config dependencies

economy.schema.json offers, hero definitions and board slots. EV-039 measures thirty tier1 prices: ordinals1–15=1,16–23=2,24–29=3,30=4. Exact generalized function remains U-003; proposed fixture stays separate.

## J. UI dependencies

SCREEN-003 Buy buttons and HUD; badge/tier/cost runtime labels. Figma buy prices50/120 are golden-state fixtures only.

## K. Animation/audio hooks

Animation IDs: `purchase.success`, `purchase.failure`, `hero.spawn`. Audio IDs: `economy.goldSpend`, `hero.spawn`, `ui.error`. Haptic/interrupt decision: light. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist amount, count and instance atomically. Retry with same command ID returns receipt, no second charge. Crash before durable write is no purchase; after durable write restores unit.

## M. Analytics

hero_purchase {offerId,tier,currency,amount,transactionId}; currency_spent once after commit.

## N. Edge cases

Exactly enough currency; one short; 20 taps; hold release outside canvas; full/locked board; app background mid-save; price changing after queued taps; max tier.

## O. Test matrix

Unit: funds and count invariants; 20 queued buys accept exactly min(funds/price,free slots) when auto disabled. Integration crash at each boundary; manual hold/pointer cancel.

## P. Evidence

EV-009 first two buys 100→99→98 with price1, units in first empty positions. EV-015 confirms2-second hold filled four free slots and displayed full-board feedback. EV-039 extends cost evidence to30 isolated purchases with equal displayed prices and currency deltas; candidate fits are DERIVED, not recovered reference logic. [Capture and residual limits](../../analysis/reference/purchase_cost_capture.md). EV-041 captures20rapid clicks accepting6buys into6free slots,2shold accepting2buys into2free slots,fullboard0charge andoutside release1buy/noongoingrepeat. [Input cases](../../analysis/reference/purchase_input_capture.md). Offer remains tier1 afterdiscovery6/account3. Exact repeat cadence, generalized purchase-tier changes and cost function remain U-032/U-003.

## Q. Unknowns

U-003 price curve; U-032 hold/bulk; U-030 auto trigger; U-024 slot unlock; U-035 grant definition mapping.

## R. Acceptance criteria

Rejected action changes no persistent field; each accepted ID allocates exactly one unit and spends exactly one evaluated price; replay is idempotent and full board gives visible feedback.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
