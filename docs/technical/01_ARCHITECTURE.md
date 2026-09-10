# Architecture

Accepted runtime: React Native + TypeScript with Expo, Skia, Reanimated and Gesture Handler. Dependency direction: app presentation/platform adapters → game-core ports/selectors/commands. Core imports no rendering, native or browser modules. Infrastructure supplies clock, RNG, save store, logger and optional analytics.

Boot: initialize platform runtime (CanvasKit first on Web) → mount RN providers → load minimum assets and validated config → read/migrate save → reconcile pending transactions/offline → install state → accept input. Failure exposes a recoverable loading/error state. Core instances and subscriptions have explicit mount/dispose lifetimes; routes never create a second authority.

Skia renders shared state and semantic images. Gesture Handler maps a single layout transform into hit tests and domain commands. Reanimated drives presentation values at display cadence. Core simulation uses bounded deterministic ticks; immutable event batches trigger presentation. Rendering callbacks do not apply damage or grant rewards. RN AppState cancels drags and pauses ticks/audio; resume reconciles once. Async service callbacks cannot re-enter a transaction or revive a disposed generation.

Native acceptance tests the real application on Android/iOS after the browser-first slice. Historical probes do not gate this foundation and do not count as new-runtime native acceptance.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)
