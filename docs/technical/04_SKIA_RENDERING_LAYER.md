# Skia rendering layer

The RN BattleScreen composes one real-time Skia Canvas with layered background, combat actors/projectiles/VFX, board, HUD and navigation. RN components provide accessible controls and modal semantics with the same layout transform. Meta routes share the same game instance. Both native and Web use this composition and the same assets; Web initializes CanvasKit before importing Skia components.

Canonical Figma coordinates are top-left, 430×932. Derive a single layout transform from viewport and safe insets, then use its inverse for touch; image trim bounds, pivots and nine-slice values come from semantic metadata. Canonical 10-slot Figma fixtures and the proposed 15-slot responsive board remain distinct. Do not flatten an interactive screen into a screenshot.

Resolve semantic IDs through a generated static asset registry to bundled image resources and optional atlas rectangles. Decode only current route bundles, reuse textures/paths and release unused resources after pending drawing completes. Bound effect records; a dropped visual never drops its domain event.

Skia properties may consume Reanimated shared/derived values directly. Do not set React state every display frame. Gesture Handler reports drag coordinates and cancellation; final placement submits a command to core, and views reconcile accepted/rejected results. Stable entity keys and mount generations invalidate stale effects. Suspended/frozen visuals show the authoritative committed state on resume.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)
