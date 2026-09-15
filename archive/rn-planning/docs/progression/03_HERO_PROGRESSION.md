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

## TASK-0229 early-platforms-v1 amendment

[OBSERVED owner requirement / EV-045] Account Level1: max1 active hero; Level2:
max2. All five visible battle placement positions remain available; this is not
a slot/layout unlock. Future capacity thresholds remain UNKNOWN and are absent
from production. Do not infer a third grant from account3 or other board labels.

[PROPOSED project rule] Exact XP is unavailable. Each successful manual or
automatic merge awards10 accountXP;100 totalXP reaches Level2. No Level3+
thresholds are introduced. Failed/replayed merges give no extra XP; the10th
merge, capacity2 and result hero commit together. XP continues to accumulate;
this does not imply further capacity grants. No new level currency grant.
Battle shows account level/earlyXP and deployed count/limit, with one saved
unlock notification and existing progress sound/haptic. Old saves retain their
existing level/XP; no retrospective XP is inferred from receipts.

Required combat compatibility: the prior final stage boss4.8M HP and Shadow
Dungeon8M HP assumed three maxed active heroes, exceeding the supported two-hero
maximum before their deadlines. Their PROPOSED HP is now3.2M and5,333,333
respectively (two-thirds budget); timers, rewards, other enemies and progression
costs remain unchanged. This preserves a beatable fully developed endgame
without inventing a third capacity unlock. Owning tests use two active heroes.
