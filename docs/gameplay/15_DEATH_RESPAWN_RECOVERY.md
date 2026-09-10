# Death and recovery

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Owned hero loss, temporary combat death, withdrawal and reserve state are distinct.

## B. Inputs

Enemy attack if verified, HP0, withdraw, recovery timer

## C. Outputs/events

hero.disabled/recovered or hero.withdrawn; no implicit item deletion

## D. State

alive,recoverAtTick if applicable; persistent ownership remains until verified rule

## E. Preconditions

Death mechanic enabled by observed config; absence of enemy damage evidence is not immortality proof

## F. Transaction order

damage → dead transition once → remove from active roster → evaluate stall → recover by configured policy → restore eligible state

## G. State machine

```text
ACTIVE→DISABLED→RECOVERING→RESERVE; no-owned-unit deletion in proposed baseline
```

## H. Algorithms

```text
if noActiveHeroes: battle.state=STALLED
provide purchase/deploy/retry route; never delete roster because sprite death animation finished
```

## I. Config dependencies

hero/enemy/battle recovery policy

## J. UI dependencies

SCREEN-003 disabled visual and clear recovery label; no fake timer

## K. Animation/audio hooks

Animation IDs: `hero.hit`, `hero.death`, `hero.recover`. Audio IDs: `hero.spawn`. Haptic/interrupt decision: none;death/recovery events enabled only by verified mode. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Save ownership separately from encounter alive flag; migrate recover timestamps safely

## M. Analytics

battle_stalled, hero_recovered if enabled

## N. Edge cases

all dead; revive after app pause; merge disabled unit; empty roster

## O. Test matrix

unit no negative HP and ownership retention; integration restart during recovery

## P. Evidence

EV-011 withdrawal observed; true hero death not confirmed

## Q. Unknowns

U-022,U-013

## R. Acceptance criteria

No unverified permanent loss; stalled gameplay offers valid recovery input; future death rule has tests and save policy.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
