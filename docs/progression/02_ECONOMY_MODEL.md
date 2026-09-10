# Economy model

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Source=kill/stage/quest/discovery/daily/offline; sink=buy/upgrade/spin if enabled. Fixture economics are separate from measured reference.

## B. Inputs

Command cost evaluation and reward calculation

## C. Outputs/events

immutable quote, receipt, economy error

## D. State

offer purchase counts, balances, claim watermarks; config version pinned in save

## E. Preconditions

All cost/reward refs valid; evidence mode explicit

## F. Transaction order

quote at execution revision → check → compute draft → validate conservation → persist → events

## G. State machine

```text
QUOTED→COMMIT_PENDING→COMMITTED / REJECTED
```

## H. Algorithms

```text
netDelta = sum(validatedGrants)-sum(validatedCosts)
price curves are explicit tables until enough observed samples fit a model
never fit Figma50/120 to live first buys1
```

## I. Config dependencies

economy/rewards schema; reference_balance_observed.json vs proposed_balance_v1.json

## J. UI dependencies

HUD quotes, Buy, enhance, spin; no duplicated cost expressions in buttons

## K. Animation/audio hooks

Animation IDs: `currency.bump`. Audio IDs: `economy.goldSpend`, `economy.goldGain`. Haptic/interrupt decision: derive feedback from receipt reason. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Data version stored; schema migration never silently revalues existing currency

## M. Analytics

source_sink_totals aggregated, no analytics-dependent awards

## N. Edge cases

Queued price changes; repeated farming vs first-clear; rewarded1000gold shop claims have no cooldown; unconfirmed ads grant zero; IAP out of scope

## O. Test matrix

unit affordable/unaffordable; simulation no impossible negative balance; import checks observed/proposed separation

## P. Evidence

EV-009 buy1; EV-010 discovery bonus; EV-012 kill reward1

## Q. Unknowns

U-003,U-004,U-007,U-034

## R. Acceptance criteria

Every source/sink has reason ID, tests and provenance; no hidden UI currency writes.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
