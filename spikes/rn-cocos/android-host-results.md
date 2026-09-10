# TASK-0040 — Android full-screen native host

PASS on the isolated `kisel_native_api36` arm64 emulator, 2026-09-08. RN0.86.3 opens the native Cocos3.8.8 Activity inside the same application/process. The scene renders continuously, receives touch and returns to RN with Back. Two observed creations each had one live owner; each destruction returned the count to zero. This is a debug feasibility fixture, with no gameplay.

[Machine evidence and binary/video hashes](evidence/android-host.json) · [native input provenance](evidence/android-host-native-input.json) · [successful build](logs/android-host-build-attempt2.log) · [application events](logs/android-host-isolated-events.log).

| Input | Expected | Actual |
| --- | --- | --- |
| RN `open-cocos` button | Native surface in the same app | CocosHostActivity, same PID2727 as RN, one owner |
| Uninterrupted screen recording | At least60s, visible counters advance | 68.7462s; PTS1→62 shows frames17065→18248 and time482→543s, unchanged taps2 |
| One tap at Android(540,1400) | One increment and color change | Cocos(215,386.2037), taps1→2, violet→teal |
| Back, reopen, one tap, Back | RN restored; no simultaneous duplicate engine | Owners1→0→1→0; second scene taps0→1; final RN screen |

Visible evidence: [video1s](evidence/android-host-isolated-video-1s.png), [video62s](evidence/android-host-isolated-video-62s.png), [before touch](evidence/android-host-isolated-before-touch.png), [after touch](evidence/android-host-isolated-after-touch.png), [second scene](evidence/android-host-isolated-reopened.png), [second touch](evidence/android-host-isolated-reopened-touch.png), [RN restored](evidence/android-host-isolated-rn-return2.png). Local recording is ignored by Git at `evidence/videos/android-host-isolated-70s.mp4`.

Reproduction from the repository root, with Metro running as documented in [RN README](rn-probe/README.md):

```sh
python3 spikes/rn-cocos/build.py cocos android
python3 spikes/rn-cocos/build.py rn android
adb -s emulator-5556 reverse tcp:8081 tcp:8081
adb -s emulator-5556 install -r spikes/rn-cocos/rn-probe/android/app/build/outputs/apk/debug/app-debug.apk
adb -s emulator-5556 shell am start -n com.kiselnativeprobe/.MainActivity
```

The RN build helper stages the verified Cocos ELF and asset directory automatically. Gradle compiles the editor's existing Java/GameActivity adapter without modifying vendor files. TurboModule codegen registers the launch module; the app CMake file fails configuration if its generated target is absent. Activity launch and lifecycle glue execute on the Android UI thread. API33+ uses the supported Back dispatcher; API24–32 uses its compatibility callback. Only API36 was executed here.

The first integrated build compiled but retained a stale CMake configuration without the generated C++ module provider. UI command completion did not prove navigation: the receiver was null and the button disabled. That attempt was rejected, and the app CMake configuration now requires the provider. The first shared-emulator install also failed for insufficient storage; only our previous probe apps were removed before retrying. Unrelated apps and the user's existing AVD were preserved.

Two recordings on the shared emulator were interrupted by inputs whose source was not established. They do not prove continuous rendering. The accepted run uses a separate repository-local AVD (API36, arm64, 2GiB RAM, 8GiB data, headless host GPU). Its first-use fullscreen hint was acknowledged before recording.

The RN label `opening` records the launch request result; it is not a bridge/lifecycle readiness acknowledgement. TASK-0042 owns that protocol. Physical-device installation, release-like builds, popup Back, ten-cycle memory/listener baselines, background/audio and process-death cases remain unpassed in [NAT acceptance](ACCEPTANCE.md). Emulator FPS under concurrent builds is not a physical performance-budget result.
