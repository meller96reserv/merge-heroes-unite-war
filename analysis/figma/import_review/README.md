# TASK-0030 — Raster import calibration

[Calibration manifest](../import_calibration.json) measures all351 immutable rasters and their source-node usage. It records exact source dimensions/hash, alpha bounds,14 nonempty padding offsets, full-canvas preservation, cropped-coordinate compensation and geometric pivots. No original image or `.fig` was modified; automatic trim remains off. Figma node bounds are recorded separately from an unknown fill transform and do not authorize arbitrary nonuniform artwork scaling.

Run from repository root with the pinned analysis Python/Pillow environment:

```sh
/tmp/kisel-planning-venv/bin/python tools/analysis/calibrate_import.py
```

The deterministic checks compare351 hashes/alpha bounds, reconstruct eight selected sprites byte-for-byte at1x and preserve all four corner patches in40 cases at0.5/0.75/1/1.5/2x. Six negative cases reject null/unreviewed insets, undersized targets, reference-only selection, a baked-decoration panel, a rejected scale and release use without rights. This is source calibration; Cocos import/render/color/compression checks are NOT_RUN and belong to TASK-0033/TASK-0034 and phase05.

[Candidate sheet](candidate-panels.png) and [cap measurements](border-measurements.png) distinguish eight measured candidates from fixed-only artwork. Plain navy has a bottom-center ornament; gold/black and stats panels contain row dividers. Those three selected source-backed panels cannot use nine-slice without separate source-supported layout elements. The ten unused lower-resolution candidate variants also remain fixed/unselected with null insets.

[Visual decisions](visual-decisions.json) are independent review inputs bound to exact source hashes and cap values. Each links its light/dark stretch fixture. Blue/dark square panels and the board slot retain usable corners at0.5…2x. The red/gold/orange buttons and ornate equipment/navy frames reject0.5x because their compressed gradient, reflection bands or crowded ornament visibly degrade; their reviewed range is0.75…2x. These are bounded uniform source-pixel fixtures. Anisotropic sizes and final display-size parity still require Cocos import QA. A numeric cap alone never constitutes a visual parity PASS.

Character review covers the23 source-backed high-resolution hero/enemy/boss images: [sheet1](character-anchors-1.png), [sheet2](character-anchors-2.png), [bosses](boss-anchors.png). Full alpha extents preserve feet, wings, weapons and glow. Bottom-center of the measured alpha box is a reviewed geometric placement proposal, not an extracted anatomical/rig pivot; the fairy's visual base does not imply that it stands on the ground. Low-resolution variants keep their own measured canvas and offsets. Projectile sockets and exact animation pivots remain separate motion/import work; no flattened body is segmented.

All351 supplied rasters still lack distributable-rights proof. Calibration permits local analysis only; release selection is rejected until TASK-0233 resolves rights. Licensed fonts have their separate [font ledger](../font_ownership.csv). Missing/unmapped source nodes and reference-only scopes remain explicit exclusions.
