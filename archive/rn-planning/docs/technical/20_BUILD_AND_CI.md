# Build and CI

Foundation commands use the root npm lockfile. `npm ci` installs pinned dependencies; `npm run dev:web` launches the shared Expo application with Fast Refresh; `npm run build:web` exports it. CanvasKit is copied from the locked dependency into public during setup, never fetched from an unpinned CDN at runtime. TASK-0047 records exact versions and cold-browser evidence.

Incremental CI: planning/data/source validation → application/core typecheck and meaningful core tests → deterministic simulations → asset registry validation → Expo web export → browser interaction/goldens → Android build → iOS build on macOS → native smoke/device reports. Native checks are required for changed native surfaces and release, not as an obsolete early engine gate.

Pin Expo, RN, React, Skia, Reanimated, Worklets, Gesture Handler, npm/Node and native tools. Verify Expo package compatibility. Cache dependencies by lockfile and imports by source hash. Generated content records generator/source/data version. Build provenance includes source commit, toolchain/app/data/save versions, config digest, target and checksums.

Release jobs alone use signing secrets and explicit distribution authorization. Preserve the last compatible save reader and signed artifact. Debug/research assets must be excluded from production bundles. Do not label Web checks as Android/iOS acceptance.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)
