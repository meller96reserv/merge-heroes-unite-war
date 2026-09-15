# Performance testing

Use native release-like builds on selected physical devices. Warm up2minutes, capture5minutes steady battle and30minutes soak. Stress20attackers/20enemies plus crit/death/reward bursts, repeated meta transitions and50host reopen cycles. Record frame-time distribution, process memory, texture memory, Skia render cost, effect occupancy, React commits, JS/UI frames, GC/allocations, platform service latency and save queue latency.

Proposed budgets are centralized in technical/14_PERFORMANCE_BUDGET.md. Report p50/p95/p99 and exact collection method; averages alone hide stalls. Capture Android Perfetto/memory and iOS Instruments traces. RN JS and UI worklet/render costs are measured separately. Thermal throttling, charging state and recording overhead are recorded.

Fallback order: reduce cosmetic particles/flyers/shake/parallax, simplify trails, trim texture residency/atlases, then offer30fps render mode if needed. Never change simulation step, rewards, merge ordering or RNG to make a performance test pass. Compare domain hashes under quality modes.

Acceptance: no unbounded memory/queue slope after warmup, no per-hit node allocations after pooling, stable touch response, and every budget exception has a measured report plus specific optimization task before release.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).
