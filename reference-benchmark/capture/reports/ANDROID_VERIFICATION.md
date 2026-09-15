# Android reference result — 2026-09-10

Historical **online** guest-variant result. Its APK is now preserved as `build/apk/heroes-unite-reference-online.apk` with the hash below. The predictable main APK now points to the user-requested offline build; see [offline verification](OFFLINE_VERIFICATION.md). Do not apply the old performance numbers to the offline adaptation.

Status: APK BUILD / INSTALL / LAUNCH / REPRESENTATIVE INPUT AND COMBAT / SHORT BASELINE completed. This is a private, debug-signed reference wrapper, not the production Android release. iOS is deferred by user direction.

Artifact: `build/apk/heroes-unite-reference-benchmark.apk`, 39,820,219 bytes (38.0 MiB). SHA-256: `0b83b4dfcb1344c15a09db6e6319a827ee572df96aa7a55f26cedc1a190d3398`. Package: `com.kisel.referencebenchmark`. Public reference: LIVE_CRAZY 3.16.2, directory 51.

Device: visible `medium_phone` AVD, `emulator-5554`, sdk_gphone64_arm64, Android 16 / API 36, 1080×2400, density 420; WebView 151.0.7922.199. Runtime canvas: 822×1828. Existing emulator data was retained. No physical-device test was performed.

| Check | Result / actual evidence |
|---|---|
| Standalone install/start | PASS. Final APK installed with `adb install -r`; Activity opens the bundled appassets HTTPS client without a Mac server. `android-build.json`, `android-final-state.json`. |
| Rendering/input/combat | PASS. Ordinary Android touches dismissed overlays; drag deployed the level-2 archer. Stage 1-9 shows attacks, damage 5, changing enemy HP and replacement enemies. `android-gameplay-verified.png`. No game state was injected. |
| Process restart / saved session | PASS for one restart in the benchmark. Guest session and deployed hero returned; startup attendance/event overlays appeared normally. |
| Background/resume | PASS for one Home → Activity resume after the sample. Same PlayScene, hero still deployed, enemy HP changing. `android-resume.png`, `android-final-state.json`. |
| Purchase/merge | Verified in local browser evidence; not independently repeated to completion in Android. Android tutorial/purchase prompts remain available. |
| Audio | Audio resources loaded and AudioContext was observed running. Audible output NOT_RUN; do not claim listening verification. |
| Short stability | Same app PID 7912 throughout the 90-second sample; no captured app fatal/error log. No crash observed during this sample. This does not establish absence of leaks. |

## One recorded baseline

Run `20260910T185118Z`: 20-second warmup, one 90-second sample. Early battle with one deployed level-2 archer at stage 1-9. Existing guest state and asset/OS caches were warm; the app process was force-stopped before launch. Desktop capture browsers were closed. This measures an emulator, not physical Android hardware.

The attendance/event overlay was present during the sample while combat continued behind it. Overlays were dismissed after sampling; `benchmark-start.png` shows attendance, `benchmark-active.png` shows the following tutorial, and `android-resume.png` shows the unobscured field. Those names do not establish unobscured gameplay throughout the timed interval. This is a battle-with-overlay baseline; no second equivalent run was performed.

| Metric | Result | Scope |
|---|---:|---|
| Engine loop FPS | 13.86 | Cocos director: 1,257 frames / 90.6612 s between two read-only snapshots. Not physical display presentations. |
| Host PSS, launch / warm / end | 91.2 / 128.1 / 129.7 MiB | App host only. Timed samples stayed about 129.4–130.3 MiB. |
| WebView renderer RSS, end snapshot | 383.6 MiB | PID 7937 from raw process snapshot; RSS includes shared mappings. Do not add RSS to PSS. Renderer PSS was not collected. |
| Activity startup | 1,342 ms | Android `am start -W` TotalTime. Time to interactive gameplay NOT_MEASURED; PlayScene existed by the first frame snapshot at 23.03 s. |
| HWUI frames / janky frames | 1,234 / 1,230 | Android window statistics; not equivalent to WebGL game frame rate. |
| HWUI p50 / p90 / p95 / p99 | 150 / 200 / 200 / 200 ms | Same window metric limitation. |
| SurfaceFlinger presentation FPS | UNAVAILABLE | No suitable SurfaceView latency layer exposed; no value inferred. |

The low frame rate and high window jank are retained as observations. Optimizing the reference runtime or deeply investigating emulator performance is outside this capture task. Raw results and scoped metrics: `benchmark/results/latest.json`, `latest.md`, and timestamped run directory. CPU output is a system snapshot, not a dedicated per-process interval benchmark.

## Adaptations and remaining dependencies

The local portal adapter selects the unmodified client's built-in guest fallback; registration is unnecessary. Backend authorization/version checks remain intact. Missing Android texture variants initially blocked startup; 46 actually returned public assets were imported from the wrapper's public-asset cache and included in this final APK, in addition to desktop/mobile and exact-path supplementary capture.

The wrapper can fetch remaining missing `/assets/` paths from the pinned public CDN and cache successful responses. Internet is still required for `new-crazy-api.superjoy2.link` guest services and potentially uncaptured lazy assets. This is standalone from the Mac, not fully offline. Ads/account/social portal overhead is excluded. No economy, rewards, combat, renderer, effects or audio code was changed. See `runtime/LOCAL_PATCHES.md`.

Late-game flow QA, exhaustive coverage, repeated cycles, long soaks, audible listening, physical-device testing and iOS are NOT_RUN. Existing repository reference investigation was reused for mechanics/screens; this work concentrated on actual bytes, local execution and Android.

The visible `medium_phone` emulator is left running. Close its window or run `adb -s emulator-5554 emu kill` to stop it without wiping saved data.
