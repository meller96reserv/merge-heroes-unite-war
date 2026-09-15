# UI motion and component coverage

Buttons define normal/pressed/disabled/loading/selected/locked states. Primary press80ms down plus120ms return; disabled stays readable with tint and no success sound. Loading consumes repeated taps and preserves label/size. Missing raster states can use reviewed tint/scale overlays; they must not be confused with missing logical states.

Counters animate display toward committed amount over280ms, coalescing updates by revision. Gameplay affordability reads exact Amount immediately, never the intermediate label. Popup enter280ms/exit180ms; dimmer owns input. Tab200ms switches selected art and panel; rapid taps cancel stale transitions. Red dots appear280ms, then remain static to avoid perpetual distraction.

Sliders track the pointer directly with no tween latency; toggles use140ms. Loading progress is monotonic and derived from actual loader weights. Maintenance remains static. Tutorial hand loops1.2s but permitted input uses named hit target, not hand coordinates.

Every screen/component is assigned a motion decision in component_motion_map.csv. No-motion is an explicit decision for static body copy/background decoration. Acceptance: keyboard/focus and touch states readable, popup close cannot click underlying purchase, and repeated transitions leave one active screen.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).


User-required exception to static attention policy: wheel entry pulses with Tap and result Watch & Claim pulses; Boost Reward is prominent for approximately2seconds, multiplier rotation approximately1.5seconds. Reduced-motion removes scale travel, not reward eligibility. These timings are product requirements/approximations,not measured reference motion.
