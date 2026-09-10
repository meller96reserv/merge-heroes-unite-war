# iOS application integration

Build the Expo/RN application from reproducible prebuild/config-plugin inputs with the pinned Xcode/CocoaPods toolchain. Standard RN root ownership hosts the shared Skia surface and UI. Presentation mounts must dispose subscriptions and graphics resources; native callbacks cannot retain stale controllers or mutate a disposed domain session.

AppState and the audio adapter serialize inactive/background/resume and interruption handling. Test safe areas, dynamic system UI, keyboard, modal dismissal, audio routes, process restoration and repeated screen transitions. An inactive event is not evidence of a real phone/audio interruption.

TASK-0203 requires an actual simulator build/install/input report. TASK-0211 and the device matrix add physical audio/graphics/memory checks; unavailable physical checks remain NOT_RUN. Signing identity and provisioning remain external release inputs. Browser-first implementation proceeds before exhaustive device parity.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)

Current runnable toolchain: Xcode 26.3 / Swift 6.2, iOS 26.2 arm64 Simulator.
`tooling/native/with-candidate-native.cjs` disables precompiled Expo modules
because they referenced a missing dynamic React.framework in this source build.
The postinstall compatibility patch reuses Expo's own weak sendability wrapper;
JS-actor dispatch and weak lifetime remain unchanged. Simulator build, touch,
Equipment/Upgrades navigation and restart passed (tests/native/ios-smoke.md).
