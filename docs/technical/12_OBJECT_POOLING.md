# Object pooling

Bound reusable presentation records for enemies, projectiles, damage labels, hit flashes, coin/gem flyers, particles and temporary merge rings. Hero instances can be retained while owned; reuse their presentation records only when identity binding is reset. Never pool domain IDs or reuse reward transaction IDs.

Pool contract acquire(profile)→handle{slot,generation}, release(handle). Reset transform/opacity/Skia resources/text/audio handles, remove listeners, cancel Reanimated animations, clear scheduled callbacks and cancel target references. A stale release with another generation is ignored and logged in debug. Pool capacity is bounded; cosmetic overflow drops an effect or uses a simpler combined label. Domain attacks/damage continue regardless of pool availability.

Initial proposed caps: projectiles64, damage labels48, hit flashes32, currency flyers24, merge rings8, enemy views24. These are instrumentation starting points, not measured device limits. Prewarm gradually after first frame to avoid a boot spike. Record peak occupancy, allocation misses and dropped cosmetics per encounter.

Stress fixture: 20 attackers, 20 enemies, simultaneous crit/death/reward burst, then navigate away mid-effect. After two minutes there must be no unbounded effect count or retained entity reference. Low quality reduces particle count and flyer count before lowering domain tick rate; do not alter damage, reward or RNG.

Acceptance: acquire-release-reacquire has clean state; teardown invalidates callbacks; pool saturation changes only visuals; profiler shows no recurring per-hit presentation resource allocation after warmup.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)

Skia images/paths are retained by the asset/presentation owner and explicitly disposed where supported. Do not build an imperative native-view pool without measured allocation pressure. Reanimated shared values reset before slot reuse; no domain identity is pooled.
