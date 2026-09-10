# TASK-0232 — current runnable candidate requirements

Reviewed 2026-09-09. This is a native build compatibility review; store submission
certification and owner signing remain outside the six-hour candidate.

- Installed RN0.86.3/Expo57 uses Hermes/new architecture, Android JDK17/SDK36 and
  NDK configured by the pinned Expo/RN dependencies (Android min24/target36; iOS min16.4). Current Debug SDK build and
  physical Android launch passed; final embedded arm64 Release build is TASK-0234.
- Android native libraries need 16 KB ELF/ZIP alignment; final APK alignment will
  be checked alongside the build. [Android requirement](https://developer.android.com/guide/practices/page-sizes).
- Xcode26.3 with iOS26.2 SDK meets the current SDK build floor. The actual iOS26.2
  Simulator source build, Skia/touch/routes/restart passed; final embedded Release
  Simulator build is TASK-0234. [Apple SDK requirements](https://developer.apple.com/news/upcoming-requirements/).
- Compile the same app; no Expo Go/WebView/separate web game. Expo source-module
  and bounded Swift6.2 compatibility fixes are retained.
- App ID, version/build2, icon and exact external provider/legal/signing inputs are
  recorded in release_identity.json. Distribution is not authorized or claimed.

Candidate build commands: npm run native:prebuild -- --no-install (existing projects
are preserved), npm run build:android, npm run build:ios:sim. Native dependency
changes require a normal pod install first; no dependency change in this version bump.
