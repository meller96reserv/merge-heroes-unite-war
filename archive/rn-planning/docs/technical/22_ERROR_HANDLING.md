# Error handling

Error taxonomy: ConfigInvalid (boot blocked), AssetMissing (required block/optional fallback), SaveWriteFailed (durable action not installed), SaveCorrupt (recover candidate), SaveFutureVersion (update required), PlatformServiceUnavailable (adapter initialization failed), StaleCommand (safe reject), InsufficientFunds/BoardFull (expected UI result), NativeLifecycleFailure (recoverable application error), AudioUnavailable (silence).

Every failure has code, user-safe localization key, diagnostic context, retryability and correlation ID. Do not show stack traces or implementation names in player flows. Retry keeps the same transaction/request ID where side effects might have occurred. Disable repeated buttons only while a pending operation is active; provide an exit/cancel path for unrecoverable initialization.

Recovery order: keep current valid state → record bounded local diagnostic → offer appropriate retry → reload candidate if needed → explicit reset only after preserving corrupt bytes. Never silently replace a corrupted save with a new account. If a reward animation fails, reconcile visuals from committed state; do not roll back the grant.

Host lifecycle errors cancel subscriptions and invalidate session generation. A stale native callback after dismissal is discarded. Missing optional content shows a neutral unavailable panel and releases its bundle. Partial required content cannot enter battle.

Acceptance: injected failures at read/write/verify/init/load/tween/audio paths have deterministic UI outcomes; repeated retry cannot double-charge; offline mode has a supported local launch path; logs contain no account secrets.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
