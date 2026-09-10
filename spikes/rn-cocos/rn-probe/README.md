# Standalone React Native native probe

TASK-0039 verifies the pinned RN0.86.3 entry screen before Cocos integration.
Android API36 arm64 emulator and iPhone17Pro iOS26.2 simulator both build,
install and show the actual RN screen. [Expected/actual evidence](../evidence/rn-standalone.json)
includes binary hashes, architectures and [Android counter verification](../evidence/rn-android-touch.json).

From the repository root:

```sh
python3 spikes/rn-cocos/run.py npm ci --prefix spikes/rn-cocos/rn-probe
cd spikes/rn-cocos/rn-probe/ios
python3 ../../run.py pod install
cd ../../../..
python3 spikes/rn-cocos/build.py rn android
python3 spikes/rn-cocos/build.py rn ios
```

The build helper uses the pinned Node/JDK/SDK environment for Gradle and writes
build logs to the spike. For iOS, the installed SDK26.2 build23C57 currently needs
the signed simulator26.2 build23C52 selected with:

```sh
xcrun simctl runtime match set iphoneos26.2 23C52 --sdkBuild 23C57
```

This supported Apple mapping was verified with `xcodebuild -showdestinations`.
Undo it with `xcrun simctl runtime match set iphoneos26.2 --default --sdkBuild 23C57`.
No Creator/Xcode binaries or security settings were patched. CocoaPods required
correcting the existing local `.netrc` permissions to owner-only; contents were preserved.

Start Metro in a separate terminal:

```sh
cd spikes/rn-cocos/rn-probe
python3 ../run.py npm start -- --port 8081
```

For Android, run `adb reverse tcp:8081 tcp:8081`, install
`android/app/build/outputs/apk/debug/app-debug.apk`, and launch
`com.kiselnativeprobe/.MainActivity`. For iOS, install the app from
`.tools/rn-ios-derived/Build/Products/Debug-iphonesimulator/KiselNativeProbe.app`
using `xcrun simctl install <booted-device> <app-path>`, then launch
`org.reactjs.native.example.KiselNativeProbe`.

Verification artifacts:

- [Android build](../logs/rn-android-build.log) and [iOS build](../logs/rn-ios-build.log).
- [CocoaPods install](../logs/rn-pod-install.log), [Jest](../logs/rn-jest.log), [TypeScript](../logs/rn-typescript.log).
- [Android screen](../evidence/rn-android-after.png) and [iOS screen](../evidence/rn-ios-launch.png).

The first Android counter attempt spanned two separate captures and observed +2;
a consecutive capture/tap/capture run verified +1. This is retained in its evidence.
The iOS attempt before runtime mapping failed and remains in
[the failed build log](../logs/rn-ios-build-attempt1.log).

This task establishes standalone RN builds. Native integration, physical devices,
lifecycle, audio focus and bidirectional bridge acceptance remain separate tasks
in the [NAT ledger](../ACCEPTANCE.md).

Additional iOS input check: [Maestro flow](../flows/rn-counter.yaml) asserted RN counter0, tapped rn-tap-button, then asserted counter1. [Actual log](../logs/rn-ios-touch.log) and [screenshot](../evidence/rn-ios-touch.png).
