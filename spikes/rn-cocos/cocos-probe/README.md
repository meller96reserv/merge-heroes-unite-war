# Standalone Cocos native probe

TASK-0038 completed on 2026-09-08 with Cocos Creator 3.8.8. The same scene renders a colored panel, elapsed/frame counters and one increment per touch on Android, iOS Simulator and browser. This is a native feasibility fixture with no gameplay.

From the repository root:

```sh
python3 spikes/rn-cocos/build.py cocos android
python3 spikes/rn-cocos/build.py cocos ios
python3 spikes/rn-cocos/preview.py
```

Preview: http://127.0.0.1:7457. The build helper exports through the pinned editor, then builds the actual native binary. `--skip-export` reuses the export for incremental native work. Build output, editor caches, installed tools and local recordings are ignored by Git.

| Target | Expected | Actual evidence |
| --- | --- | --- |
| Android API36 arm64 emulator, host Apple M1 GPU | Install native APK, render >60s, touch increments once | [Completed lifecycle build driver](../logs/lifecycle-cocos-android-build-driver.log), [standalone runtime log](../logs/cocos-android-runtime.log), [report](../evidence/cocos-android-standalone.json): counter 1→2, color changes; recorded video 64.625533s |
| iPhone 17 Pro simulator, iOS26.2 build23C52, arm64 Metal | Actual executable, visible scene >60s, touch increments once | [Completed lifecycle build driver](../logs/lifecycle-cocos-ios-build-driver.log), [standalone runtime log](../logs/cocos-ios-runtime.log), [touch flow](../flows/cocos-touch.yaml), [touch log](../logs/cocos-ios-touch.log), [report](../evidence/cocos-ios-standalone.json): counter 0→1, coordinates (215,372.9519), color changes |
| Chromium browser 430×932 | Same scene, one touch, ticks advance, no runtime error | [Report](../evidence/cocos-web-preview.json) and recorded before/after images |

Native screenshots: [Android before](../evidence/cocos-android-before.png), [Android after](../evidence/cocos-android-after.png), [iOS launch](../evidence/cocos-ios-launch.png), [iOS touch](../evidence/cocos-ios-touch.png). Diagnostic overlays are intentionally visible. Emulators, recording and concurrent builds are unsuitable for claiming physical-device performance budgets.

The Android export originally inherited minimum/target SDK21/24. The reproducible helper overrides these to 24/36; both APK metadata and installed package metadata were checked. Initial software GPU rendering was slow; the existing AVD is launched with `-gpu host` without rewriting or wiping its configuration.

For Apple Silicon Simulator, the project [CMake selection](native/engine/ios/AppleSiliconSimulator.cmake) selects the editor's shipped `external/ios-m1-simulator` libraries. The vendor application remains unchanged. The helper sets the simulator SDK and arm64 architecture, removes the template's arm64 exclusion and verifies the bundle executable with `lipo`. The initial empty-bundle attempt was rejected despite Xcode printing BUILD SUCCEEDED. Actual final executable: 121,668,960 bytes, arm64.

The installed iOS26.2 runtime build23C52 is explicitly mapped to SDK26.2 build23C57 through supported `simctl runtime match set`; the mapping and reversal command are recorded in [toolchain.json](../toolchain.json). All local UI automation uses Maestro2.10.0 with analytics and update checking disabled. No cloud service is used.

This task proves standalone export/render/input. RN integration, repeated engine ownership, Back/dismissal, protocol/lifecycle/audio, process death and physical-device cases belong to TASK-0040…0046. The [native acceptance ledger](../ACCEPTANCE.md) remains unpassed until integrated evidence satisfies every required row.
