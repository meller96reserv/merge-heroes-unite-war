# Current checkpoint — TASK-0229 physical review corrections

Runtime source: 413986f (texture leases/reviewed runtime sizes); economy checkpoint:
9d5b7ca. Earlier native fixes: 6c324f6 / ae95a03. Preserve all; do not restart planning
or reopen deferred engineering. React Native/Expo/Skia remains the only runtime.

Version 0.2.1 (3), com.mergeheroes.unitewar. Owner defect fixes are implemented:
empty new game/first buy, real enemy/boss roster, earned board rows, continuing
attack presentation, equipment art, one Settings screen, ad focus recovery,
bounded battle rendering. Shipped economy now scales using the 30 captured prices
plus an explicit proposed tail. Old saves/currency/ownership/pending results survive.
Free Coins remains exactly 1000; Daily/Wheel/completion-only grants unchanged.

Texture audit: no whole-registry preload or permanent route textures. Visible
sprites share image leases and retire last-consumer resources; 69 runtime copies
were downscaled, 9 density choices added, source/raw art unchanged. Battle returns
to 29 images after other routes; 11.1–11.2 MiB capacity at 3×, 15.69 MiB at 4×.
Art folder 110.36→94.76 MiB compressed; primary improvement is runtime residency.

## Accepted verification — reuse

21 focused economy/core cases, 2 resource lease cases, typecheck, registry/source
hash checks and web production build PASS. Prior 5 audio tests reused. Dev 3×/4×
and production web 3× routes/restart PASS, app errors0. Final Android Release
APK/AAB and iOS arm64 Release Simulator build PASS. Both native platforms pass
Battle, Equipment inventory, all three Dragons, Settings, unavailable Shop ad,
restart; current Android fatal/JS signatures0. Short final Android sample:
PSS281132 KiB, P95 32ms, janky1.83%, slow bitmap uploads0. Emulator/encounter limits
apply. User physical visual/audio/smoothness/pacing review remains pending.

## Artifact handoff

Final 0.2.1-3 package is complete. Source ZIP checkpoint:38f58a8; subsequent
commits record artifact/checkpoint metadata only. Artifact SHA256/ZIP CRC,
Android APK/AAB bundle identity, iOS version and archived runtime-source checks
PASS. Paths/hashes:analysis/reports/release_manifest.json and DELIVERY_CANDIDATE.md. APK/AAB/iOS Simulator ZIP/project
ZIP belong under .tools/delivery/0.2.1-3. Private project settings are mode0600;
never print or commit them. Previous .tools/delivery/0.2.0-2 remains untouched.

## Exact next step / external gates

Only the owner review and external gates remain; do not redo accepted work.
Planning/runtime consistency:34 checks PASS,0 errors; executable graph acyclic
with no dangling dependencies. TASK-0258: obtain actual Merge Heroes Start.io Android/iOS App IDs, configure
EXPO_PUBLIC_STARTIO_ANDROID_APP_ID / EXPO_PUBLIC_STARTIO_IOS_APP_ID and rebuild.
TASK-0259: validate actual completed/skip/no-fill/stale rewarded callbacks with
real inventory. Missing IDs honestly return unavailable. Never use reference APK
identifiers. TASK-0237 / DELIVERY_COMPLETE also requires owner-approved Terms and
Privacy HTTPS URLs. Android distribution signing, physical-iOS provisioning and
GitLab/store publication require owner inputs/authorization; none is claimed.
No DELIVERY_COMPLETE.md until required gates actually pass.

## Environment

npm run dev:web remains on localhost8082, PID38972. Android emulator-5556 and iOS
Simulator8697D7C3-4589-4DDF-BB64-50AC6DD24CDA retain final apps and existing progress.
Build commands: npm run build:android / npm run build:ios:sim. Package command:
python3 tooling/release/package-candidate.py (uses committed HEAD for source ZIP).
Native prebuild preserves generated projects. Raw logs/screenshots stay ignored or
under /tmp. See qa_defect_register.md and runtime_texture_audit.md for actual
checks, remaining physical review and measurement limits.
