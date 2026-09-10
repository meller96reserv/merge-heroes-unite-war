# TASK-0202 early Android smoke

PASS: Expo prebuild; Gradle assembleDebug arm64-v8a; install and launch on
emulator-5556 / API36; actual Skia loading/start/Battle; LET'S PLAY and purchase
touch; authoritative A/B save; process stop/restart restores purchased heroes;
automatic battle advances to stage_1_3. Runtime failure found and corrected:
Expo57 move returns a Promise; await completion and retain File handles until
it resolves. Read small snapshots synchronously to avoid expired async handles.

APK: android/app/build/outputs/apk/debug/app-debug.apk (ignored generated output).
Node22.23.2, JDK17, project-pinned RN/Expo/Skia; Gradle cache is local .tools.
Debug client uses localhost:8082 and adb reverse tcp:8082 tcp:8082, sharing root
npm run dev:web. No separate native gameplay or renderer.

This is the early development build. Final release APK/AAB and complete-feature
smoke remain TASK-0234/0237; physical-only cases are NOT_RUN. Raw logs stay /tmp.
