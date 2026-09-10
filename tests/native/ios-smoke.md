# iOS application smoke — TASK-0203

2026-09-09, iPhone 17 Pro Simulator / iOS 26.2, arm64 Debug, Xcode 26.3.
Actual RN/Expo/Skia app installed and launched with AppMetrica and Start.io SDKs.
Maestro: loading → LET'S PLAY → Battle → buy → Equipment → Hero Upgrades →
Battle → stop/relaunch → LET'S PLAY → Battle: PASS. No save reset was used.

Expo precompiled modules referenced a missing dynamic React.framework; the
versioned config plugin builds Expo modules from source. Existing Expo weak
sendability helpers resolve Swift 6.2 compilation without changing dispatch or
object lifetime. Local notifications avoid remote push auto-registration.
Drawing-only canvases pass touch to actual native buttons and gesture handlers.
Bundled Skia resources are prepared before entry and shared across routes.

Debug connection: Simulator RCT_jsLocation = localhost:8082; npm run dev:web.
Final standalone Simulator build remains part of the delivery milestone.
Physical-device performance, distribution signing and live owner-configured ads
are not established by this Simulator check.
