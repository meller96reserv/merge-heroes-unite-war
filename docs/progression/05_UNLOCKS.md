# Unlock graph and notification aggregation

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

UnlockRule = stable condition AST; unlocked feature distinct from red-dot eligibility.

## B. Inputs

Account/tier/stage changes, boot/migration

## C. Outputs/events

feature.unlocked, notification.changed

## D. State

unlockedIds,announcedUnlockIds; derived red dots

## E. Preconditions

Condition evaluates against committed state; known dependency graph

## F. Transaction order

recompute condition → add unlock once → persist → enqueue popup once → derive tab notification OR

## G. State machine

```text
LOCKED→UNLOCKED_UNANNOUNCED→UNLOCKED
```

## H. Algorithms

```text
evaluate allOf/anyOf(stageAtLeast,accountLevelAtLeast,tierAtLeast)
redDot = any eligible action, not whether panel was never opened
```

## I. Config dependencies

unlocks.schema.json typed conditions

## J. UI dependencies

SCREEN-003 locked slots/tabs; hero/daily/wheel badge aggregation

## K. Animation/audio hooks

Animation IDs: `feature.unlock`, `slot.unlock`, `redDot.appear`. Audio IDs: `progress.unlock`. Haptic/interrupt decision: medium once. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist unlock and announcement separately; no reannouncement every boot

## M. Analytics

feature_unlock {id,sourceCondition}

## N. Edge cases

Threshold equal; changed config; duplicate popup; lock label type unknown

## O. Test matrix

unit boundary before/at threshold; acyclic prerequisite graph; reload one popup

## P. Evidence

EV-009 visible lock numerals; exact meaning U-024

## Q. Unknowns

U-024,U-030

## R. Acceptance criteria

Every unlock has valid condition, source evidence/proposal, visual/nav/tutorial hooks and once-only announcement.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
