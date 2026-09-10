# Device matrix

Exact physical models are UNKNOWN until inventory/availability is recorded; do not invent tested devices. Required tiers are below. Emulators/simulators validate navigation/builds but do not substitute for physical performance/audio/thermal tests.

| Tier | Required target | Main checks | Current status |
|---|---|---|---|
| Android low | physical3–4GiB RAM, minimum supported OS selected at version lock |30fps, memory, long session, storage pressure | NOT RUN |
| Android mid | physical6–8GiB, representative current supported OS |60fps, touch, gesture Back, audio focus | NOT RUN |
| Android emulator | local configured medium_phone | install, input, lifecycle automation | tools present; app absent |
| iPhone older | oldest supported physical performance tier after deployment-target decision | memory,30/60fps, safe area, interruptions | NOT RUN |
| iPhone current | physical current supported iOS |60fps, lifecycle, audio, signing | NOT RUN |
| iOS simulator | installed Xcode26.3 compatible simulator | build, Skia, layout | tools present; app absent |
| Tablet | iPad/Android portrait768×1024 class | layout/letterbox, touch targets | NOT RUN |
| Web | Chrome current at capture plus supported Safari | preview, storage, gesture audio, golden fixtures | reference browser only; product absent |

OS/minimum deployment targets and16KiB/page-size/store requirements must be checked against official platform docs at spike/release date. This document sets coverage, not a stale claimed compliance matrix.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).
