# TASK-0055 — board composition decision

PROPOSED adaptation, CF-003 / U-025. Source: SCREEN-003 (2:426), local screenshot and measured node rectangles; ADR-007 authorizes this bounded decision. Keep the exact 5×2 designer fixture distinct from the 15-slot playable board. This does not establish hidden reference layout behavior.

| Viewport | Fixture | Slot art / target (points) | Board top | Last row bottom | Purchase top | Navigation top |
|---|---|---|---|---|---|---|
| 430×932 | Figma exact10 | 68×93 /68×93 | 549 | 744 | 761 | 847 |
| 430×932 | Adapted15 | 68×69 /68×69 | 541 | 748 | 761 | 847 |
| 360×640 | width-fit10 | 56.93×77.86 /56.93×77.86 | 319.35 | 482.60 | 496.84 | 568.84 |
| 360×640 | Adapted15 | 56.93×57.77 /56.93×57.77 | 312.65 | 485.95 | 496.84 | 568.84 |

Coordinates are calculated before insets; safe insets reduce available height exactly once. Width scale = min(safeWidth,430)/430; virtual height = safeHeight/scale. The 10-slot canonical board anchors at virtualHeight−383 and rows102; the adapted board at virtualHeight−391 and rows69. Columns remain x15+83c, width68. Navigation at virtualHeight−85, central purchase at virtualHeight−171. Board/purchase do not overlap; minimum adapted target57.77pt at360 width exceeds44pt. Adjacent columns have12.56pt gaps.

HUD stays at its measured top anchors. Compress the elastic world between stage bar and booster row on short devices; never compress board targets. World-only positioning cannot move HUD. Decorated platform rasters retain their own aspect and calibrated full-canvas alpha. Adapted heroes use a smaller full image above each platform; no automatic cropping. Tablet/desktop playfield is at most430pt wide, centered with decorative side color. Insets and extra-tall fixtures are exercised by TASK-0057.

Decision accepted for implementation: preserve ten-slot canonical visual evidence; use fifteen visible logical slots for gameplay. Geometry reviewed against source rectangles at both sizes; final rendered overlay/diff belongs to TASK-0059/0060 and is not claimed here. Native notch/device validation remains later QA.
