# Combat VFX and damage numbers

Effects are proposed original primitives: short weapon arc, muzzle glint, arrow/magic trail, hit flash, crit star, death puff, boss aura and bounded camera nudge. New art may be acquired if primitives cannot match style, but no reference texture is extracted. Projectile runtime art is a gap, not an assumed Figma asset.

Damage labels show the committed integer damage. Normal rises24px over650ms; crit rises32px over800ms with1.25 pop and a distinct marker/shape as well as color. Pool48 labels initially; combine low-priority simultaneous numbers by target/time bucket for presentation only. Cap spread to avoid covering stage HP or buy controls. Rounding/display never changes damage calculation.

Projectiles interpolate visual endpoints using attack event timing; impact SFX/VFX correspond to the committed hit. Target dies early: cancel obsolete visual or use configured harmless fade; do not select a new logical target in the renderer. Boss lethal hit and timeout use domain order.

Acceptance: stress burst leaves HUD readable, pooled overflow drops only cosmetics, zero references to dead entities after release, and low-quality/reduced-motion gameplay hashes match full quality.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).

TASK-0166 supplies the [original projectile manifest](../../app/assets/art/effects/projectile-manifest.json):
outlined arrow, mint weapon arc and violet magic core. All ten hero release
positions use the reviewed TASK-0158 whole-image sockets transformed through
contain-fit geometry. Target positions follow the projected enemy ordinal.
Low quality omits glow/long trail; reduced motion suppresses flight without
altering the core hit schedule. [Tests](../../analysis/reports/motion/projectiles/tests.tap)
and [browser cases](../../analysis/reports/motion/projectiles/results.json).

TASK-0167 adds five shared original recipes (hit, crit, merge, death, reward),
a 24-burst/192-particle upper bound, bounded event deduplication and leased
cancellation. Combat consumes resolved hit/death events; animation completion
only releases presentation. Low quality halves particles and reduced motion
uses a static fading ring. [Pool tests](../../analysis/reports/motion/primitives/tests.tap)
and [browser markers](../../analysis/reports/motion/primitives/results.json)
cover all five recipes; merge/reward controllers may reuse the same drawing.
