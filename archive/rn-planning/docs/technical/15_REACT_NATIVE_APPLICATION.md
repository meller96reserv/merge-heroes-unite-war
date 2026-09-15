# React Native application ownership

RN owns the game application, screen composition, navigation, touch arbitration, safe areas and platform adapters. Expo config/prebuild manages native projects where supported; a development build is used for incompatible Expo Go modules. This choice does not change game code or Skia presentation.

GestureHandlerRootView and SafeAreaProvider wrap one application root. Apply safe-area insets once in the shared layout. Keyboard, Back, accessibility and modal ownership use RN APIs. Keep React renders tied to state/route changes; continuous transforms use Reanimated. Domain remains independent of React lifecycle.

AppState/visibility changes cancel active drags, suspend ticks/audio and schedule a serialized save barrier. Foreground resumes only after reconciliation; repeated signals are idempotent. Process death restores durable disk state. Route unmount disposes presentation subscriptions without destroying persistent domain progress.

Browser uses CanvasKit initialization, browser storage/audio implementations and the same application tree. Its acceptance is independent from later Android/iOS build, interruption and performance evidence.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)
