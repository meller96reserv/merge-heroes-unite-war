# Domain game core

The deterministic core accepts Command objects with commandId, expectedRevision where necessary and typed payloads. The dispatcher validates state/config, builds a draft, produces a transaction result and commits through SaveCoordinator for durable actions. A rejected command returns a typed reason and leaves state hash and RNG state unchanged. Read-only selectors never mutate state.

Use canonical decimal currency strings at serialization boundaries and bigint arithmetic inside Amount. Combat integers must stay within validated safe bounds. Separate seeded combat RNG from reward RNG. Reward outcomes are persisted before presentation; RNG state is not reset by a reopened popup. Logical world time, monotonic simulation time and UTC wall time are separate clocks.

Tick order is fixed: cooldowns → target selection → attack intents → due hits → damage/deaths → reward commits → stage transition events. Proposed step is 50 ms, at most five catch-up steps; background suspends simulation and delegates elapsed-time rewards to OfflineService. Same seed and ordered commands produce identical state/events at a specified tick count. Real timers, browser globals, audio and node positions are forbidden in rules.

Invariants: no negative balance; each owned hero occupies exactly one unlocked slot; deployed IDs are owned and within cap; IDs are unique; merge reduces occupancy by one; stage first-clear watermark never decreases; every granted claim has a receipt or persistent source watermark; no transient animation lock is restored from save.

Tests target behavior: equality-cost purchase succeeds; one-less fails; cross-family merge rejects; boss lethal hit/timeout tie follows configured order; duplicate claim command grants once; split tick batches produce the same result. Long simulated runs report impossible states, not just final snapshots.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
