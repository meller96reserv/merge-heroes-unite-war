# Heroes Unite reference benchmark

## Current default: offline Android edition

The current `npm run android:build`, `android:install` and `android:run` commands target **Heroes Unite Offline Reference**, package `com.kisel.referencebenchmark.offline`. Its APK is `build/apk/heroes-unite-reference-offline.apk`; the predictable `heroes-unite-reference-benchmark.apk` is also updated to this build. It installs beside the previous online app with separate local progress. No previous app data is cleared or imported.

This flavor has **no Android permissions, including no INTERNET permission**. All game files come from `runtime/offline/`; the guest startup/settings/save adapter is local. The CDN fallback is disabled, WebView network loads and external navigation are blocked, and a restrictive content policy blocks external web resources. First launch needs no server or registration. Purchases using earned game currency, merging and combat retain the original client rules; cloud saves, rankings, real-money purchases, rewarded ads and live server events are unavailable. Device time replaces server time.

Build again with `npm run android:build`. It derives `runtime/offline/` from the preserved online client and `capture/offline/public-settings-response.json`. That frozen public configuration is retained locally; only if setting up a fresh capture workspace, obtain it once with `python3 capture/scripts/fetch-offline-settings.py`. No account/token is used by this public settings request. APK builds can need Internet for uncached Gradle dependencies; the installed offline app does not.

Optional local offline-client server: `npm run reference:offline`, then http://localhost:8087. Browser QA is not required for this delivery. [Offline changes and smoke](capture/reports/OFFLINE_VERIFICATION.md) describe exact scope. Archived 13.86 FPS / 90-second results below belong to the **online guest variant** and were not repeated or relabelled as offline performance.

The previous APK remains at `build/apk/heroes-unite-reference-online.apk`. To rebuild/install/run that variant explicitly, use `npm run android:build -- --online`, `npm run android:install -- --online`, `npm run android:run -- --online`. For its diagnostic tools set `REFERENCE_MODE=online` and `REFERENCE_PACKAGE=com.kisel.referencebenchmark`. Its documented Internet dependency below still applies. Rebuilding either flavor updates the predictable main APK; named APKs keep the variants unambiguous.

## Preserved capture and online guest variant

Private, removable reference/benchmark workspace. Everything here is isolated from the production game. **Never copy downloaded code, assets, fonts, artwork or audio into production.** No production dependency, configuration or task manifest is changed. No files are staged, committed or pushed.

Target: [public Heroes Unite](https://www.crazygames.com/game/heroes-unite), observed LIVE_CRAZY 3.16.2 / directory 51. This wraps the public web client; it is not the Android store implementation. Existing 68-minute research and screenshots under `analysis/reference/` were consulted; no repeat mechanics study was undertaken.

Completed: 2,340 captured response records / 1,166 distinct bodies (95.3 MB), preserved originals, working local client and standalone Android APK (39.8 MB). Android touch/combat/restart/resume passed a bounded smoke. One 90-second emulator baseline recorded 13.86 engine FPS with battle running behind a startup overlay, host PSS 129.7 MiB at end, Activity launch 1,342 ms. See [Android result and measurement limits](capture/reports/ANDROID_VERIFICATION.md). Registration is unnecessary; the original guest backend still requires Internet. iOS is deferred. Git HEAD/index are unchanged and no production files were modified; see [isolation evidence](capture/reports/git-isolation.json).

## Prerequisites

Node 20+ and npm, Python 3, Chrome, JDK 17, Android SDK platform 36/build-tools 36.0.0/platform-tools, and Internet. Run from this directory:

```sh
npm install
```

`android:build` discovers SDK/JDK installations, downloads checksum-pinned Gradle 8.14.3, resolves AGP 8.12.0 and AndroidX WebKit 1.14.0 into `android/.gradle-home`, and creates a **debug-only** keystore under `build/`. Set `JAVA_HOME` / `ANDROID_HOME` if automatic discovery fails. No production Android project is reused.

## Capture

```sh
npm run capture
```

A visible Chrome window opens with **only** `capture/profile/`. Start the public game using its normal fullscreen button. Stay a guest; do not sign into accounts. Bodies are continuously saved by SHA-256. To broaden public release asset coverage without grinding gameplay, run in a second terminal **while capture is active**:

```sh
npm run capture:bundles
```

This uses only bundle names explicitly declared by the received game manifest, standard Cocos asset APIs, and returned public responses. It does not instantiate scenes, edit progress or unlock flags. Debug bundles are excluded. Public source maps are archived only if actually received; no filename guessing.

Finalize with Ctrl-C in the capture terminal, or:

```sh
node capture/scripts/control.mjs '{"op":"stop"}'
npm run capture:prepare
```

Wait for `finalized: true` before preparing. The capture control endpoint is loopback `127.0.0.1:8091`; its JSON commands include `status`, `snapshot`, `click`, `drag`, `note`, `storage`, `stop`. DevTools uses loopback port 9227. Do not expose either port externally. Close the capture cleanly so HAR and storage exports finish. No long video is recorded.

For an Android-specific resource pass, use `node capture/scripts/capture.mjs --mobile` and the same bundle command. The current archive combines desktop/mobile evidence; per-session HAR/index files are preserved. For a genuinely new reference build, archive the current workspace before replacing the local runtime; do not mix versions. Do not edit `runtime/original/`.

If a local/Android startup requests a missing resource, `node capture/scripts/supplement.mjs assets/<exact-observed-path>` obtains that exact public response through isolated Chrome, updates the index and adds a supplementary HAR. `--from-android-report` batches exact 404 paths from `android-network-smoke.json`. Do not invent paths. Rerun `node capture/scripts/prepare.mjs` and rebuild. See [coverage](capture/reports/CAPTURE_COVERAGE.md).

## Local browser

```sh
npm run reference:web
```

Open **http://localhost:8087**. Standard HTTP supports fetch/modules/workers with correct MIME types and byte ranges. Local assets are served without the CrazyGames page. The tiny [portal adapter](capture/scripts/benchmark-portal.js) reports SDK unavailable to avoid the official SDK's localhost mock account. The untouched client takes its own guest fallback; no rewards, identity or gameplay results are fabricated.

**Internet is still required** for the original public guest backend (`new-crazy-api.superjoy2.link`) and its save/session/config services. Captured assets are bundled; an exact-path public CDN cache fetches any remaining platform/lazy assets. The game is not fully offline. Backend authorization/version checks are unchanged. The archived SDK is preserved even though the local entry does not execute it.

## Android commands (offline by default)

```sh
npm run android:build
npm run android:install
npm run android:run
```

Predictable APK, relative to repository root:

```text
reference-benchmark/build/apk/heroes-unite-reference-benchmark.apk
```

Direct commands:

```sh
adb install -r build/apk/heroes-unite-reference-offline.apk
adb shell am start -W -n com.kisel.referencebenchmark.offline/com.kisel.referencebenchmark.MainActivity
```

The online flavor of the standalone Java Activity uses hardware-accelerated WebView and WebViewAssetLoader (`https://appassets.androidplatform.net/`), JS, DOM/IndexedDB storage, portrait fullscreen, WebGL and pause/resume handling. No Mac server is needed. Debug WebView inspection is enabled because this APK is only for private development. Runtime assets are bundled from `runtime/local/` directly, without another source-tree copy. Missing `/assets/` files use a version-pinned public CDN fallback cached inside this separate app; the first launch can include network latency. Guest state belongs to this separate package; install `-r` retains it. Do not clear data to repeat a benchmark.

Set `ANDROID_SERIAL=emulator-5554` when more than one device is attached. An existing visible `medium_phone` emulator was used (saved data retained). Start it with `$ANDROID_HOME/emulator/emulator -avd medium_phone`; stop by closing its window or `adb -s emulator-5554 emu kill`. Do not use `-wipe-data`.

## One baseline

Follow [reference-active-battle](benchmark/scenarios/reference-active-battle.md), then:

```sh
REFERENCE_MODE=online npm run benchmark -- --seconds 90 --warmup 15
```

The script performs one process-cold launch with existing save, captures Activity startup, memory launch/warm/end, host HWUI frames/jank, CPU/process snapshots, relevant errors, and two read-only Cocos frame-counter samples where available. Results: [latest.md](benchmark/results/latest.md), `latest.json`, timestamped raw data. Cocos loop FPS, HWUI frame stats and compositor presentation rate are distinct metrics. Missing diagnostics remain null, never invented. No long soak or repeated equivalent runs.

Optional Android startup troubleshooting: `node benchmark/scripts/webview.mjs --observe` records 18 seconds of sanitized URL/status/error metadata after a WebView reload; it never records backend bodies/credentials. `adb` must be on PATH. The script owns only localhost forward 9228; remove it after use with `adb forward --remove tcp:9228`.

## Evidence and limitations

- [Capture summary](capture/reports/CAPTURE_SUMMARY.md), [coverage](capture/reports/CAPTURE_COVERAGE.md), [resource index](capture/reports/resource-index.json).
- [Local patches](runtime/LOCAL_PATCHES.md), [local smoke](capture/reports/LOCAL_VERIFICATION.md), [Android smoke](capture/reports/ANDROID_VERIFICATION.md).
- [Storage report](capture/reports/STORAGE_REPORT.md), regenerated with `npm run report:storage`.

Bodies are decoded browser bytes; original transport content-encoding is metadata. The filtered HAR embeds content but omits credentials and has unavailable timing placeholders. Session cookies/localStorage/IndexedDB/cache inventories are private local artifacts in ignored `capture/storage/`; the isolated profile remains the most complete guest-state copy. Public backend response **bodies** are intentionally not archived/replayed; they can contain guest/session credentials and authoritative state. Game assets and launch dependencies are archived. No backend is emulated.

Coverage does not prove every late-game or future remote resource. Android-specific variants required supplemental capture. Ads, portal analytics/account/social services are unavailable in the local adapter; these overheads are excluded from benchmark comparisons. Economy, merge, combat, effects, renderer, progression and rewards are unchanged. A short run does not establish absence of leaks. Audible audio is only claimed if separately documented.

Deleting `reference-benchmark/` removes this entire task without breaking production. Global SDK/tool caches may remain installed. The local `.gitignore` protects generated resources, profiles, credentials, logs, builds and APKs; **nothing from this task is committed**.

Implementation references: [Playwright contexts](https://playwright.dev/docs/api/class-browsercontext), [Cocos public bundle loading](https://docs.cocos.com/creator/2.4/manual/en/scripting/asset-bundle.html), [Android local WebView content](https://developer.android.com/develop/ui/views/layout/webapps/load-local-content), [Android dumpsys](https://developer.android.com/tools/dumpsys).
