# Hero animation specification

The Figma inventory has flattened whole-character rasters and portraits, not skeletal rigs or separate limbs. Initial runtime profiles use a root grounded pivot, sprite child and separate shadow. Idle uses±2px lift and≤2% squash over1.6s; feet should not visibly skate. Spawn280ms scales from foot with a brief1.08 overshoot.

Melee attack profile:80ms anticipation,60ms release,140ms recover; ranged/magic share the phase contract with distinct rotation/flash/projectile visual. Domain attack interval and release timestamp remain configuration. Hero hit140ms uses short tint/recoil; deployment280ms travels toward the battle anchor while the owned board slot retains its identity/Battle marker.

Merge-out and merge-in are one visual transaction keyed by mergeId. Equip/upgrade overlays do not permanently change base scale. Death/recovery support is gated by mode evidence; normal reference help describes counterattacks for Legendary Dungeon, so do not assume all stage enemies damage heroes.

Acceptance: all10 art families grounded in idle/attack/merge frames, no clipped weapons/glows after trim, pose neutral after interruption, and reduced-motion result is readable.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
