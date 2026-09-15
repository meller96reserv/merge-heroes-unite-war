# Portrait scaling and safe areas

[PROPOSED] Viewport safe rectangle = viewport minus RN safe-area insets once. Design width430; primary scale = safeWidth/430. Background covers safe rectangle with crop, HUD anchored top, navigation bottom, world and board share flexible height. Apply each edge inset once in shared layout; do not add duplicate RN padding around the Skia surface.

360×640: compact world vertically before shrinking interaction targets; board15 row hit zones stay≥44pt.390×844 and412×915: expand world/row spacing;430×932 golden fixture.768×1024 tablet: centered portrait playfield with decorative sides, never stretch characters horizontally. Desktop uses portrait pillarbox and ignores pointer starts outside canvas. Landscape mobile remains portrait lock; web landscape centers portrait area.

Validate notch/Dynamic Island, Android gesture+3button navigation, keyboard external links, split-screen/window resize, modal content taller than safe area. Modals max-height within safe rect and scroll content; close remains fixed. Low-height conflict is resolved by content scrolling/tab panels, not underlapping navbar.

Tests: assert key bounding boxes within safe rect, no world-shake displacement of HUD, inverse input transform roundtrip error<1px at5sample points; screenshot all15frames at canonical, main+settings+wheel at each variant. Reference exact composition screenshot uses saved designer data and frozen animations;15-slot adapted layout separate fixture.

[Layout](12_UI_LAYOUT_SPEC.md) · [Device matrix](qa/07_DEVICE_MATRIX.md) · [Screen catalog](09_SCREEN_CATALOG.md).


[Индекс](00_INDEX.md).
