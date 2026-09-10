# Offline time service

Use injected WallClock.nowUtcMs for offline/daily deadlines and monotonic time for live simulation. Lifecycle records lastActiveAt after flushing; resume does not feed wall-clock elapsed time into battle ticks. Current reference offline formula remains UNKNOWN; the proposed fixture earns only gold at configured rate, capped at eight hours, with no offline stage advancement.

Compute interval [lastProcessedAt, now]; elapsed=max(0, min(now-lastProcessedAt, capMs)). Compute floor(ratePerSecondBigInt * elapsedMsBigInt /1000n),rounding only once;no floating intermediate or early integer-second truncation. A reversed clock grants zero and records a clock anomaly without moving the durable watermark backwards. A huge forward jump is capped; keep lastProcessedAt monotonic. Local-only time cannot prove trusted elapsed time against a user changing the clock.

Before showing the offline popup, persist a pending entitlement with stable claim ID, from/to timestamps and grants. Claim atomically credits, stores receipt and advances watermark. Reopening, process death, duplicate resume and two claim taps reuse that entitlement. A later interval starts after its toAt; never recompute a pending reward with newer rates or configuration.

Foreground modals are separate from app background. Reference settings did not pause combat; whether all routes do so is still a capture task. A short inactive interval can be suppressed by a configurable minimum, but the watermark must still advance so repeated short sessions cannot accumulate a duplicate interval.

Acceptance: zero/negative/cap/cap+1 intervals; UTC midnight and timezone change; suspend/resume twice; kill before popup, during claim and after commit; every interval grants at most once. No claim of server-grade clock security.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
