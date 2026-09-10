# TASK-0041 — iOS full-screen native host

PASS for the bounded Debug arm64 iPhone17Pro Simulator probe, iOS26.2 build23C52, on 2026-09-08. RN0.86.3 opens the actual Cocos3.8.8 Metal scene, dismisses it and reopens the same engine. Touch increments once per action. The retained RN controller remains interactive and preserves its counter.

[Machine results and binary hashes](evidence/ios-host.json) · [verified Cocos archives](evidence/ios-host-native-input.json) · [successful build](logs/ios-host-build-attempt3.log) · [native events](logs/ios-host-events.log) · [successful UI flow](logs/ios-host-maestro-reenter-attempt2.log).

| Input | Expected | Actual |
| --- | --- | --- |
| RN open-cocos button | One visible native Cocos controller | One initialization, one controller, Metal scene with advancing frame counter |
| Touch at50%,60% | One increment and color change | Cocos(215,372.9519), taps0→1, teal→violet |
| Native Return to RN button | Restore an interactive RN controller | RN counter0→1 after its own button press |
| Reopen, touch, dismiss | Same engine; RN state retained | Initialization count1, entry count2, taps1→2; final RN counter1 |

Reviewed images: [before touch](evidence/ios-host-before-touch.png), [after touch](evidence/ios-host-after-touch.png), [second touch](evidence/ios-host-reopened-touch.png), [RN restored](evidence/ios-host-rn-return2.png).

Reproduce after the [standalone prerequisites](cocos-probe/README.md) and [Metro setup](rn-probe/README.md), from repository root:

```sh
python3 spikes/rn-cocos/build.py cocos ios
python3 spikes/rn-cocos/prepare_ios_host.py
cd spikes/rn-cocos/rn-probe/ios
python3 ../../run.py pod install
cd ../../../..
python3 spikes/rn-cocos/build.py rn ios
xcrun simctl install booted .tools/rn-ios-derived/Build/Products/Debug-iphonesimulator/KiselNativeProbe.app
xcrun simctl launch booted org.reactjs.native.example.KiselNativeProbe
python3 spikes/rn-cocos/run.py maestro --device <simulator-udid> test spikes/rn-cocos/flows/ios-host-open.yaml
python3 spikes/rn-cocos/run.py maestro --device <simulator-udid> test spikes/rn-cocos/flows/ios-host-reenter.yaml
```

The project consumes the exported Cocos engine and supplied arm64 simulator libraries; the source editor remains unchanged. TurboModule codegen supplies NativeCocosHost. Native glue initializes the platform once on the main thread. RN retains its UIWindow and original root controller. During game presentation it installs the Cocos controller as root; dismissal pauses Cocos and restores RN. Reopening resumes the retained controller/engine.

This root-controller switch follows Cocos3.8.8 SystemWindow::getWindowHandle(), which reads UIApplication.delegate.window.rootViewController.view. A modal above RN would leave that lookup pointing at the wrong rendering view. The strategy preserves native rendering without a vendor engine patch. Engine close is not called per dismissal; process termination owns final destruction.

Two compile failures were corrected: Xcode source references initially lacked their project-relative folder, then the runtime source needed an explicit Boost assertion header. Assertions remain enabled. No failing build is counted as passing.

The first reenter flow failed after [SpringBoard crashed in XCTest accessibility initialization](evidence/ios-host-simulator-springboard-failure.json). The app remained alive; bringing it to the foreground with simctl launch and rerunning the bounded flow passed. The [failed log](logs/ios-host-maestro-reenter.log) is retained. That interrupted run is not continuous-render or background/resume evidence.

Physical iOS hardware is not connected. Physical installation requires an unlocked/trusted device and valid signing/provisioning configuration. This is an unexecuted target, not a physical PASS. TASK-0043 owns application notifications, orientation/safe-area and background handling; TASK-0044/0045 own audio and repeated memory/listener baselines. Release configuration and the complete [NAT gate](ACCEPTANCE.md) remain unpassed. This task alone does not enable production gameplay.
