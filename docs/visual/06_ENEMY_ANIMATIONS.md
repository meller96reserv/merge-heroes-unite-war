# Enemy and boss animation specification

Ten enemy families and three dragon boss families have raster variants. Use family profiles for small creature, bulky creature and dragon. Normal spawn280ms, idle1.8s, hit140ms and death280ms; bosses use900ms entrance/death and smaller recoil to communicate mass. These are proposed timings.

Death wins over hit/attack. At zero HP the domain emits one death and reward; view finishes/fades or skips safely on scene exit. Pool release clears tint, HP label, target link and animation generation. Do not keep a dead collider/input target during a decorative fade.

Enemy attacks are mode/config gated. Live How to Play mentions monster counterattack and HP/DEF in Legendary Dungeon; it does not establish normal-stage attack/recovery formulas. Boss warning/timer remain readable above VFX. World shake is bounded and reduced-motion aware.

Acceptance: simultaneous hits produce one death presentation; boss skip does not skip reward;20-enemy stress fixture respects pool cap; all silhouettes and floor contacts remain consistent across resolution variants.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
