# Layout reconstruction contract

[MEASURED] Canonical artboard430×932. [screen_map.json](../analysis/figma/screen_map.json) stores every direct-child rectangle and normalized bounds for15 artboards; [screen specs](09_SCREEN_CATALOG.md) map assets and text. Map top-left Figma coordinates to top-left Skia coordinates using one shared scale/offset transform; invert it for touch.

Main SCREEN-003 anchors [MEASURED]: currency backgrounds x61/y18/w144/h54 and x225/y17/w144/h54; stage label x79/y165; stage bar near y190; bottom tabs at x7,91,175,259,343 / y847 /79×80. Main board shows5 columns×2 rows; live behavior15 slots introduces CF-003. The exact remaining node rectangles are machine-readable, not hand-rounded copies.

[PROPOSED] Layer constants: BACKGROUND, WORLD, PROJECTILES, WORLD_VFX, HUD, BOARD, NAV, MODAL_BACKDROP, MODAL, REWARD_OVERLAY, TOAST, DEBUG. World shake moves world-only descendants; HUD/counter landing anchors stay fixed. Bottom-nav clickable hit areas cannot overlap OS home/navigation insets.

Use sprite assets for decorative backgrounds/cards, runtime text for prices/HP/level/counters and vector primitives for simple tracks/sliders. No screenshot-as-UI. Board15 adaptation uses3 rows inside elastic region and compact purchase area, retaining world readability; compare against ten-slot Figma fixture separately so adaptation is explicit. Figma exact nonadaptive fixture and functional-equivalent gameplay layout have different golden IDs.

Measurement acceptance [PROPOSED]: core anchor error≤2 reference px; no critical clipping at required viewports;44pt target minimum; font baseline≤2px where font version matches. Pixel threshold starts1.5% differing unmasked pixels at per-channel tolerance16; calibrate with same-render baseline and record rationale, never hide layout drift behind large masks.

[Responsive](14_RESPONSIVE_AND_SAFE_AREAS.md) · [Tokens](13_DESIGN_TOKENS.md) · [Visual QA](qa/05_VISUAL_REGRESSION.md).


[Индекс](00_INDEX.md).
