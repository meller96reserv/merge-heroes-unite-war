# Alternative battle contents

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Content mode owns independent attempt/reward ledger and roster constraints; Dragon/Demon/Tower are advertised names.

## B. Inputs

EnterMode(modeId), retry/exit, encounter events after unlock

## C. Outputs/events

mode.entered/completed/failed; typed reward request

## D. State

modeProgressById,attemptId,entryCostToken

## E. Preconditions

P2 scope enabled; rules verified; no mixing stage reward identity with dungeon rewards

## F. Transaction order

validate unlock/entry cost → durable attempt → mode simulation → settle outcome → return normal stage snapshot

## G. State machine

```text
LOCKED→AVAILABLE→ENTERING→ACTIVE→RESULT→AVAILABLE
```

## H. Algorithms

```text
modeAdapter provides encounter config and reward policy; reuse pure battle, never duplicate BattleSystem
normal stage suspended/continued only by explicit policy
```

## I. Config dependencies

modes.schema.json; stage/enemy/rewards

## J. UI dependencies

SCREEN-006 three dragon cards; alternate tower/castle screens require source capture

## K. Animation/audio hooks

Animation IDs: `screen.transition`, `boss.intro`. Audio IDs: `music.boss`. Haptic/interrupt decision: mode-gated;release background bundle after exit. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Separate saved mode progress and first-clear rewards; entry cost and attempt id atomic

## M. Analytics

mode_start/complete/fail

## N. Edge cases

exit before reward; resume; roster prohibited; entry token duplicate

## O. Test matrix

schema references valid; unit attempt idempotency; integration normal stage unaffected

## P. Evidence

EV-006 advertised contents; EV-004 dungeon Figma

## Q. Unknowns

U-018

## R. Acceptance criteria

Post-MVP task gate is explicit; shared simulation reused; no invented content progression in MVP.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).

## Dragon-v1 delivery override — PROPOSED

All three Figma challenges are required and enabled, superseding earlier P2 gates.
Adopt displayed HP 5,000 / 10,000 / 15,000 as explicit product values; each is a
45-second DPS challenge using the shared BattleSystem, not reference mode parity.
Entry/retry is free with a deployed hero. Chapter state stays untouched; entering
suspends its encounter, return restarts that same chapter wave without duplicating
its reward identities. Restart resumes the saved attempt from full enemy health;
there is no offline dungeon damage or unearned reward. Buy/merge/equipment are
available during the challenge. Timeout/leave grants nothing. Victory grants
500/1000/1500 gold, 50/75/100 gems and 25/50/75 orbs once per unique attempt and
offers the existing 2-second rewarded Boost flow for the gold. Failed settlement
retains the exact pending attempt command; visual death never grants rewards.
