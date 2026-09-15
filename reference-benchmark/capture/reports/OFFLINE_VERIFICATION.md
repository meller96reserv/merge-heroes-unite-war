# Offline Android edition

User explicitly requested an autonomous **reference APK**, allowing local simplifications. Completed: separate offline build, install, guest startup without any Internet permission, purchases, merge, deployment/combat and one local-save restart smoke. This is a reference adaptation, not the production game or a store release.

Artifact: `build/apk/heroes-unite-reference-offline.apk`, also copied to the predictable `build/apk/heroes-unite-reference-benchmark.apk`.

- Size: **39,822,581 bytes / 38.0 MiB**.
- SHA-256: `334c81d29160bb40de2b09eca28164363bdc924c48991f6a3087b359a7cf4720`.
- Label: **Heroes Unite Offline Reference**.
- Package: `com.kisel.referencebenchmark.offline`.
- Build: debug signing, Android minimum API 26, target 35, compile 36.
- Previous online APK is preserved separately as `heroes-unite-reference-online.apk`; this app installs alongside it and starts its own local progress. No existing data was cleared.

## Network independence

`aapt dump permissions` on the final compiled APK lists the package and **no requested permissions**. In particular, INTERNET is absent. WebView network loads are also blocked, external requests/navigation are rejected, and the online wrapper's CDN fallback returns immediately in this flavor. The entry page's Content Security Policy restricts web content to local/self/data/blob resources. The native app loads bundled bytes through WebViewAssetLoader; no Mac server is involved.

The app's fresh guest state was created locally, with no imported account/save/cache. Public settings were frozen at build time from the exact unauthenticated `/setting/version` configuration call; no credentials or player response bodies are embedded. The offline app never needs to fetch this snapshot. Original local save writers store actual gameplay results, while server time is replaced with device time.

## Actual short smoke

Visible `medium_phone`, `emulator-5554`, Android 16 / API 36, WebView 151.0.7922.199, 1080×2400. All offline app launches had no INTERNET permission. The emulator's system radios were not toggled; network denial is enforced at the app permission level.

| Check | Evidence / result |
|---|---|
| Startup | PASS: locally created guest reaches PlayScene with the normal tutorial. No registration or original server calls. |
| Input / purchase | PASS: two ordinary taps purchase two level-1 heroes; gold 100 → 98. `offline-two-heroes-fixed.png`. |
| Merge | PASS: ordinary drag merges them into the level-2 Archer; original discovery reward is shown. `offline-merged.png`. |
| Deployment / combat | PASS: normal deployment gesture, first enemy defeated, stage 1-2 enemy appears. `offline-deploy-tutorial.png`. |
| Local save / restart | PASS: Home, force-stop, one cold launch; Archer and 100 gems retained, stage advances to 1-3. `offline-restored.png`, before/after JSON. Activity launch was 1,445 ms in this smoke; not time-to-interactive. |
| External web resources | None recorded in the inspected resource timeline before/after restart. All settings/session/save calls were handled inside the JS adapter. |
| Integrity of isolation | Original archive and online runtime were not patched. Git HEAD/index unchanged; no production paths modified, staging, commits or pushes. |

The first development build exposed an actual blocker: treating “no rank” as numeric rank 0 requested a nonexistent Spine skin and left the loading mask active. The final build routes unavailable ranking through the client's existing failure handlers, which hide rank/loading UI. The smoke above was completed after this fix. No repeated benchmark, long soak or exhaustive menu/late-game QA was run.

Machine-readable evidence: `offline-verification.json`, `offline-apk-permissions.txt`, `offline-before-restart.json`, `offline-after-restart.json`, `android-build.json`. Screenshot filenames describe attempted actions; `offline-first-launch.png` and `offline-two-heroes.png` belong to the earlier blocked build and are not PASS evidence.

## Differences and limits

- Base earned-currency purchase, merge, battle, progression, discovery rewards and rendering use original client code.
- Cloud accounts/save/sync, online rankings/mail, real-money purchases and rewarded-ad completion are unavailable. Live event/notice lists are disabled. No online reward or payment success is fabricated.
- Progress is local to this separate package. Uninstalling/clearing its data removes that progress; there is no cloud recovery. Device-clock changes can affect client timers.
- All currently captured assets are bundled. Complete late-game resource coverage has not been proven; missing uncaptured assets cannot be downloaded by this app. Representative early gameplay works offline.
- A 513-byte third-party conditional input/audio block was removed from the offline copy. Its language/domain predicate was inactive at the appassets origin in the old APK. This is not evidence explaining the earlier Play Protect warning. See the local patch ledger.
- Existing 13.86 FPS / 90-second benchmark results apply to the old online guest variant. Offline performance was not rebenchmarked. Physical-device, audible-audio and iOS checks were not performed.

## Rebuild / install

From `reference-benchmark/`:

```sh
npm run android:build
npm run android:install
npm run android:run
```

These default to offline. To target the preserved online variant, append `-- --online` to each command. `runtime/offline/` is generated from `runtime/local/`, the frozen config and the adapter scripts. No game server is contacted during an offline build; uncached build-tool dependencies can still require Internet on the development machine.

The visible `medium_phone` emulator is left running with data retained. Close its window or run `adb -s emulator-5554 emu kill` to stop it.
