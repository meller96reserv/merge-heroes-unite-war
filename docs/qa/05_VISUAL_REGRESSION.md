# Visual regression

Source goldens:15 Figma screenshots at430×932, IDs in screen_map.json. Runtime fixture modes: figmaExact for static comparisons and gameplayAdapted for the15-slot board. Do not compare one mode against the other's golden. Dynamic text values are injected from the Figma text inventory for exact fixtures; production balances remain separate.

Capture protocol: pin fonts/build/renderer/viewport/DPR; load deterministic fixture; wait required assets/fonts; freeze animations at settled marker; hide debug overlay; save source/runtime/50%overlay/diff and anchor report. Compare HUD bounds, five nav positions, stage label, board cells, popup extents, text baselines, pivots and image crop. No flattened screen background may satisfy interactive fixture requirements.

Proposed starting thresholds: anchor drift≤2px at430×932; changed-pixel ratio≤1.5% after per-channel tolerance16 for stable UI regions. Mask only known nondeterministic pixels with documented reason; never mask a wrong layout. Different native font rasterization may require separate baselines but does not excuse wrong metrics.

Review360×640,390×844,412×915,430×932,768×1024 safe-area cases, long text, huge numbers and disabled/pressed/locked/loading states. Failure report identifies source node and runtime component, then updates only the intentional region after review.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).

Current user-authorized [delivery QA policy](10_DELIVERY_QA_POLICY.md) overrides exhaustive or duplicate acceptance requirements. Retain correctness tests and release builds/smoke; batch presentation checks and allow user browser visual acceptance. Keep evidence concise and do not claim unperformed checks.
