# Sprite atlas plan

Start with2048×2048 atlas groups by co-residency: ui_common, ui_battle, ui_meta, currency_icons, portraits, equipment_by_family, effects. Keep full backgrounds standalone. Character variants that exceed intended screen size are downscaled through reviewed import settings before packing; source resolution is not a runtime requirement.

Packing uses extrusion/padding to avoid bilinear bleeding. Atlas manifest maps semantic ID to bundled image and atlas rectangle, trim/original bounds and dependencies. Never assume a pHash near duplicate is replaceable: compare outlines, alpha, hue and actual node use. Current exact duplicate count is zero;167 pHash pairs are review candidates.

Texture residency target battle≤128MiB is proposed. Raw351-image decode size≈905.53MiB demonstrates why loading everything is unacceptable. Measure bundle residency by route and unload only after pooled effects release references. Compression is chosen per target after alpha/outline tests; do not claim ASTC/ETC settings are validated before device builds.

Acceptance: atlas boundaries show no halos at scale; changing routes does not retain all equipment/relic art; grouped atlases reduce measured texture/command cost without a single huge texture keeping unrelated screens resident.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
