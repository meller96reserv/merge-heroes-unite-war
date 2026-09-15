# Android application integration

Build the Expo/RN Android application with the pinned SDK-compatible toolchain. Use standard RN Activity ownership; app screens and Skia live in its React tree. Config plugins express required manifest/settings changes reproducibly. Do not retain Activity references in long-lived services.

Back dismisses the top modal, cancels active interaction, then follows route/exit policy. A required save barrier has a bounded timeout with an honest recoverable error; process recreation restores disk state. AppState, focus, keyboard, system bars and safe insets route through shared platform services.

Validate gesture navigation, cutouts, low memory, process kill, audio focus/headphones and rapid background/foreground. Keep one audio focus owner through the audio adapter. Build/install/touch acceptance is TASK-0202; repeated lifecycle/storage/performance acceptance is TASK-0211 and later device QA. Web evidence cannot satisfy these cases.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)
