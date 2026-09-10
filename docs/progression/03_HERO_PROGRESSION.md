# Hero tier, upgrades and discovery

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Tier from merge; upgradeLevel from meta; accountLevel from player experience; never conflate three axes.

## B. Inputs

Merge discovery, UpgradeHero, earned player XP

## C. Outputs/events

hero.statsChanged, hero.tierDiscovered, player.levelChanged

## D. State

discoveredTiers,heroUpgradeLevels,accountXp/accountLevel

## E. Preconditions

Tier exists; upgrade below cap; enough cost; unknown original curve gated

## F. Transaction order

resolve tier/level delta → first discovery check → calculate reward+stats → durable commit → emit

## G. State machine

```text
UNDISCOVERED→DISCOVERED; UPGRADE_AVAILABLE→MAX
```

## H. Algorithms

```text
if tier not in discovered: add tier; reserve configured first-discovery reward once
upgrade price/stats from level table, no interpolation without model decision
```

## I. Config dependencies

hero-tiers/economy/rewards schemas

## J. UI dependencies

SCREEN-004 detail, SCREEN-007 list; FigmaLv60/60 fixture not global cap

## K. Animation/audio hooks

Animation IDs: `hero.upgrade`, `feature.unlock`. Audio IDs: `equipment.upgrade`, `progress.unlock`. Haptic/interrupt decision: medium. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Save discovered set and grants together; rediscovery grants zero

## M. Analytics

hero_tier_reached/upgrade/player_levelChanged

## N. Edge cases

Same tier again; max cap; config raises cap; equipment modifiers

## O. Test matrix

unit discovery once; max rejects without spend; migration preserves existing levels

## P. Evidence

EV-010 first Archer reveal and hero percentage10%; EV-004 meta screens

## Q. Unknowns

U-007,U-016,U-024

## R. Acceptance criteria

Tier/level/account fields separate, every stat delta deterministic and discovery idempotent.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
