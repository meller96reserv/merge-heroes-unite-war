# Background and parallax

Most supplied backgrounds are flattened images. Treat each as a standalone layer unless separable source layers actually exist. Do not cut silhouettes from a flattened landscape and invent missing scenery behind them. Battle ground alignment and hero feet take priority over parallax.

Proposed initial implementation: static background with optional subtle full-layer offset≤3px, no implied depth. Future custom background layers may support far/mid/near factors0.1/0.25/0.5 after art approval. UI and board remain fixed. Clamp edges to prevent revealing empty pixels; portrait resize uses cover/crop policy documented per screen.

Low quality and reduced motion disable parallax. Background texture dimensions are selected by displayed area, not maximum source size. Dungeon backgrounds load only for that route/mode. Transition between worlds crossfades while preserving domain stage state.

Acceptance: narrow/tall/tablet viewports show no gaps, combat floor remains consistent, no parallax on modal text, and texture residency stays within budget.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
