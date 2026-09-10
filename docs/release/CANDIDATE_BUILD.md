# Runnable candidate 0.2.1 (3)

Shared React Native / TypeScript / Expo / Skia. Package com.mergeheroes.unitewar.

- Node22 + npm ci; npm run dev:web starts the actual game with Fast Refresh on8082.
- npm run native:prebuild preserves native projects. Install current CocoaPods
  dependencies on macOS when generating iOS for the first time. JDK17/AndroidSDK
  and Xcode26/iOS26 SDK are required by this checked toolchain.
- npm run build:android creates arm64 APK/AAB with embedded JS/assets. Candidate
  uses the existing development certificate; owner production signing is separate.
- npm run build:ios:sim creates arm64 Release Simulator app with embedded assets.
- python3 tooling/release/package-candidate.py assembles package-named artifacts
  and committed project ZIP under .tools/delivery/0.2.1-3 with SHA256SUMS/manifest. The project identifier handoff is saved separately as
  project-settings.private.json (mode0600); never publish/log its contents.

Source ZIP includes runtime art/audio/fonts, game-core, modules, schemas, pinned
package files and project requirements. Historical spikes, duplicate raw research
art, reference clips and raw logs remain in the repository/local research area.
The .fig and reference APK are owner-provided local files, not application inputs.

Android: adb install -r com.mergeheroes.unitewar.apk. Compatible candidate signing
allows an upgrade without deleting progress. iOS: unzip the Simulator archive,
xcrun simctl install booted MergeHeroesUniteWar.app, then xcrun simctl launch booted
com.mergeheroes.unitewar. A physical iPhone requires owner signing/provisioning.

External completion inputs: EXPO_PUBLIC_TERMS_URL, EXPO_PUBLIC_PRIVACY_URL,
EXPO_PUBLIC_STARTIO_ANDROID_APP_ID and EXPO_PUBLIC_STARTIO_IOS_APP_ID. IDs must
belong to Merge Heroes. AppMetrica's app-specific TZ identifier is already wired;
SDK collection begins only after Settings consent. Never print identifiers in logs.
Native ads honestly return unavailable without IDs; existing explicit web/dev
rewarded fixtures exercise complete flows. No false rewarded completion is used
in release. Rebuild after adding owner settings and perform live ad verification.

Candidate build success does not mean store publication or DELIVERY_COMPLETE.
Required legal/live-ad acceptance remains in the final gate. Owner reviews visual
and audio polish, including physical Android performance on the reported device.
