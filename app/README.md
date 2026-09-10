# Shared React Native / Skia game

`npm run dev:web` starts the actual Expo application at http://localhost:8082 with Fast Refresh. One React Native/Skia screen composition and semantic asset registry serve Web and native. WebRoot initializes CanvasKit before importing the shared App; it provides a recoverable loading-error action.

The current battle composition replaces the bootstrap orb. World/HUD/board/navigation are individual Skia elements,with Gesture Handler/RN input ownership and density-aware Figma assets. Development visual fixtures use `?fixture=figma-battle-10` or `?fixture=adapted-battle-15`; release bundles exclude the fixture catalogue. The live game uses the same composition with durable buy/merge/deploy commands, fixed-step combat, sequential waves, boss timers, first-clear and farming rewards, manual boss retry and board row unlocks. The static fixture catalogue is independent of this playable state.

[Battle evidence](../analysis/reports/battle-screen/README.md) records browser/responsive/Fast Refresh acceptance and the outstanding exact-pixel gate. Historical foundation evidence remains in analysis/reports/foundation and skia-surface. Native runtime/device acceptance remains separate. Follow [product requirements](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) and [ADR-007](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md).

[Current playable checkpoint](../analysis/reports/stages/checkpoint.md) covers the six-stage browser loop and remaining gates. `GameRuntime` binds pure commands; `BattleRuntime` drives combat and durable boundaries; `loadGameRuntime` selects the platform save transport. Presentation never applies damage or grants rewards.

[Combat and motion checkpoint](../analysis/reports/motion/checkpoint.md) adds ten calibrated hero profiles, director/pool ownership, deadline-aligned attacks, enemy/boss reactions and committed 650ms merge presentation. Remaining motion/audio/Settings/Wheel flows stay in the existing DAG.
