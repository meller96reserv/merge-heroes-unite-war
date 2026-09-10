# Equipment instances and stat composition

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Item definition, owned item instance, equipped slot and visual weapon are separate. Six Figma positions do not prove six canonical reference slot types.

## B. Inputs

Equip/Unequip/Enhance/OpenItem

## C. Outputs/events

equipment.changed, hero.statsChanged, item.enhanced

## D. State

itemInstances,id/definitionId/level/ownerHeroId; equippedBySlot

## E. Preconditions

Item owned; allowed slot/hero; enhancement cost valid; no same item twice

## F. Transaction order

validate → remove previous slot binding → bind new item → recompute stats pure → commit → feedback

## G. State machine

```text
EMPTY↔EQUIPPED→ENHANCE_PENDING→EQUIPPED/MAX
```

## H. Algorithms

```text
stats = base + sum(itemModifiers) then configured multiplicative groups
slot restrictions from config, never inferred from rarity frame hue
set bonuses disabled unless documented
```

## I. Config dependencies

equipment.schema.json/economy/rewards

## J. UI dependencies

SCREEN-004 six cards; SCREEN-007 upgrade currency orb; equipment109 sprites source-mapped

## K. Animation/audio hooks

Animation IDs: `equipment.equip`, `equipment.enhance`, `chest.open`. Audio IDs: `equipment.equip`, `equipment.upgrade`, `reward.chest`. Haptic/interrupt decision: light equip/medium enhance. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Item ownership/slot references saved atomically; migration removes invalid references with explicit recovery report

## M. Analytics

equipment_equip/enhance/open

## N. Edge cases

Swap equipped item; max; deleted definition; full inventory; equip during attack

## O. Test matrix

unit slot uniqueness and deterministic stat delta; double enhance spend once; reload after opening

## P. Evidence

EV-004 slots and artwork, actual functionality U-016

## Q. Unknowns

U-016,U-019,U-035

## R. Acceptance criteria

No item duplicated/lost by equip; correct cost/stat delta; unknown rarity/sets not silently invented.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).

## Executable meta-v1 rules — PROPOSED, TASK-0119–0126

Six visual slots map to offhand/feet/ring/weapon/armor/charm; exact local semantic
art defines available equipment per hero archetype. No invented rarity/set bonus.
Open x1 costs 10 gems; Open x10 costs 100, uniformly draws from the selected owned
hero's source-art pool, and durably saves debit, item IDs, RNG and receipt once.
Duplicate items remain individually owned and may be equipped on other compatible
heroes. Empty slots stay empty; no owned gear is fabricated from the Figma fixture.
Equip/swap/unequip is free, preserves prior items, and rejects another hero's item.
Enhancement levels 1–20 cost 25×current level gold; each attack slot adds 5% of
base attack per level, each defensive slot adds 5% base HP and 1 armor per level.

Permanent archetype upgrade levels 0–59 cost 5×(current+1) blue orbs; each adds
10% base attack/HP. The displayed level is 1–60. Levels persist after all copies
are merged and apply to future copies; stale expected-level commands reject.
Tier scaling is already in base stats, then additive level/item basis-point
bonuses apply once with integer floor. Equipped changes update active fighters
without restarting attack timers. Consumed heroes return equipment to inventory;
legacy per-instance upgrade levels carry their maximum to the merged hero.

Every confirmed ordinary kill now grants one blue orb and one gem (boss kills
five gems) alongside unchanged gold; these grants share the existing durable kill
receipt. This provides a repeatable gameplay source for the Figma currencies.
No currency comes from visual callbacks or a synthetic rewarded completion.
