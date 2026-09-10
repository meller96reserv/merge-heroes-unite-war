# Web preview and debug

Root npm run dev:web starts the actual Expo/RN game with the same core, Skia components, data and assets. Fast Refresh is required; only platform initialization/services may differ. Web preview is useful for deterministic screenshot capture, state inspectors, input simulation and early mechanic QA; it does not prove native lifecycle, memory, audio focus or integration feasibility.

Debug-only panel: fixed seed; pause/step tick; freeze animation progress; set fixture state; force stage/boss; grant test currency through a clearly marked debug command; inspect state/revision/receipts; show hitboxes/pivots/safe areas; pool counts/draw calls; mute/solo buses; simulate offline interval and storage failure. Production build excludes this panel, debug commands and unrestricted state import.

Visual harness loads a named fixture with stable clock/seed, exact viewport and fonts, then freezes motion at an explicit marker. Captures pair with Figma source screen IDs and an adaptation mode. Hide debug overlays in final goldens but attach measured anchor reports. Screenshot fixture must never be a flattened full-screen image posing as interactive UI.

Browser storage adapter is isolated by environment. Use a repeatable clean-save command only in test builds. Audio starts on gesture and is measured separately from native. Resize cases include360×640,390×844,412×915,430×932 and768×1024 with letterbox/adaptation policy.

Acceptance: scripted buy→merge→deploy→kill can run in web and pure-core fixtures with matching state; animation freeze does not change reward result; release bundle contains no debug import route.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
