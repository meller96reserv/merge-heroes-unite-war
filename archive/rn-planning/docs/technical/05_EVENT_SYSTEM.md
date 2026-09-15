# Event system

Use a typed union of domain events with eventId, transactionId, revision and simulationTick. An event batch becomes visible only after its authoritative state commit. Subscribers receive snapshots/read-only event values. Presentation events are not commands and cannot recursively mutate the same draft.

Core families: hero.purchased, hero.spawned, hero.merged, hero.discovered, hero.deployed, hero.withdrawn, battle.attackStarted, projectile.released, battle.hit, battle.critical, enemy.died, boss.spawned, boss.failed, boss.defeated, stage.changed, reward.committed, currency.changed, unlock.changed, quest.progressed, daily.claimed, wheel.reserved, wheel.landed, equipment.changed, settings.changed. Entity IDs and amounts are payload fields; event names remain low-cardinality.

Dispatch is ordered within a transaction. Presenters may coalesce currency counter updates by revision, never reward receipts. Quest progression consumes committed source event IDs exactly once. Audio and haptics subscribe through their directors, allowing cooldown/concurrency budgets to suppress presentation without affecting game rules.

Subscription API returns an idempotent dispose callback. Scene/popup scope owns its subscriptions and cancels all on teardown. Dispatch uses a stable subscriber snapshot so unsubscribe during an event cannot skip another observer. Observer exceptions are logged and isolated; they do not roll back an already persisted transaction.

Acceptance: nested commands queue after current commit; one failing UI listener cannot block save; ten route enters/exits leave listener count at baseline; duplicate native reward callback maps to one reward command and one receipt.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
