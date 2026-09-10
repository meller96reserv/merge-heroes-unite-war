# Planning evidence workspace

This directory contains source analysis and our own reference-game observations. It is not a runtime asset bundle.

- [Figma audit](figma/README.md): immutable archive copy, 351 extracted rasters, manifests, semantic mapping, contact sheets, hierarchy and 15 screen renders.
- [Reference captures](reference/capture_index.md): 60 screenshots, the original silent recording, 11 short clips, frame sheets, observations and measurement tables.
- [Consistency report](reports/planning_consistency_report.md): document, schema, source-hash and dependency checks.
- [Remaining gates](reports/unresolved_blockers.md): concrete verification tasks for native feasibility, reference rules and release inputs.

The duplicate Figma archive at `figma/raw/source.fig` and full recording under `reference/videos/` are retained locally and excluded from Git because they exceed GitHub's regular file-size limit. Extracted game art, screenshots, short clips, frame sheets and manifests remain versioned. The short clips are the convenient review entry; regenerating them requires the local full recording. Captured temporary guest identifiers are research context and are not product/account configuration.

[Documentation index](../docs/00_INDEX.md) · [Analysis tools](../tools/analysis/README.md).
