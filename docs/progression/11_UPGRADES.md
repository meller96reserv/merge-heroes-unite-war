# Upgrade quotes and caps

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Upgrade is a discrete level transition; EXP button label does not prove formula. Quote evaluated at command execution.

## B. Inputs

UpgradeHero/EnhanceItem/BuyTierUpgrade

## C. Outputs/events

upgrade.completed/rejected, statsChanged, currency.changed

## D. State

level by system and cost progression index

## E. Preconditions

Eligible level<cap; config next entry exists; funds sufficient

## F. Transaction order

quote→spend+increment level→recompute dependent stats→persist→publish

## G. State machine

```text
AVAILABLE→PENDING→AVAILABLE/MAX
```

## H. Algorithms

```text
next = config.levels[level+1]; if absent reject MAX
apply exactly one quote to matching revision, no UI-side amount calculation
```

## I. Config dependencies

hero-tiers/equipment/economy schemas

## J. UI dependencies

SCREEN-004 ENCHANCE typo is source text; final copy decision explicit; SCREEN-007 cards

## K. Animation/audio hooks

Animation IDs: `hero.upgrade`, `equipment.enhance`, `currency.bump`. Audio IDs: `equipment.upgrade`, `economy.goldSpend`. Haptic/interrupt decision: medium. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Level and currency one transaction, no half-upgraded save

## M. Analytics

upgrade {system,from,to,cost}

## N. Edge cases

Rapid upgrades; cap increases; changed data version; equip modifier race

## O. Test matrix

unit exact cost/one short/max; migration cap; manual resulting label/stat delta

## P. Evidence

EV-004 enhance and EXP labels

## Q. Unknowns

U-016,U-032

## R. Acceptance criteria

One accepted upgrade changes exactly one level and correct balance; max action gives feedback and spends zero.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
