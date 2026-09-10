# TASK-0093 shared playable board acceptance

The real React Native screen now consumes the deterministic dispatcher snapshot. Purchases spawn into the first free slot, compatible drag/drop merges create one result at the destination, empty-cell moves retain the instance, and taps deploy/withdraw without removing ownership. Skia drag offsets and spawn springs use Reanimated shared values. Gesture Handler owns touch/mouse pan/tap; the domain owns all changes and rewards.

The browser acceptance drives real controls and IndexedDB: short purchase tap, tier-2/3 merge and first-discovery reward, repeated discovery paying zero, full-board rejection, incompatible drop, empty move, outside/blur cancellation, injected quota failure, modal return, reload and release-outside hold cleanup. All pass; runtime console/page error count is zero. Unit presenter checks additionally cover max tier, second pointer, safe-area coordinate inversion and stale revision. Native gesture/device execution remains NOT_RUN.

The production web export passes. Root npm run dev:web remains the shared Expo/Skia application on port 8082. Fast Refresh preserves an open modal after a HUD edit. Both canonical ten-slot and adapted fifteen-slot fixtures pass their bounded layout checks at five viewport sizes. The unmasked canonical pixel difference is 7.485% at tolerance 16, so the full TASK-0069 golden gate remains NEEDS_CALIBRATION; it is not marked passed.

Versioned product decisions are in docs/implementation/PLAYABLE_V1_RULES.md and game-core/src/content/PlayableConfig.ts. Reference balance and semantic Figma source analysis were preserved. Combat integration, real ads, wheel/settings, final audio/VFX and native validation remain the next DAG work; this checkpoint does not claim those features exist.
