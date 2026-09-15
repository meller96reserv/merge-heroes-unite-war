# Local patch ledger

## Offline edition added by explicit user request

`runtime/original/` and `runtime/local/` retain the original archive and previously working online guest client. `runtime/offline/` is a separate generated adaptation, built by `capture/scripts/prepare-offline.py`. It is packaged as `com.kisel.referencebenchmark.offline` so it does not share accounts or saves with the online wrapper. This user-authorized offline variant intentionally changes server-dependent behavior and must not be presented as an unchanged online benchmark.

| File / subsystem | Offline change | Gameplay / measurement effect |
|---|---|---|
| `index.html` | Add offline config/adapter and restrictive Content Security Policy | External web resources are blocked; no portal services |
| `main.9b5b8.js` | Install adapter after main modules load, before `cc.game.run` | Startup hook only |
| `reference-offline-settings.js` | Frozen successful public `/setting/version` response; event/notice lists and external link fields disabled | No live events/notices; config does not refresh from server |
| `reference-offline.js` / ConnMgr | Local startup identity, one local server slot, device time; original local save writers; rank requests take existing unavailable handlers | Local progress only; no cloud authority, clock verification or multiplayer/rank competition |
| AdMgr / selected PopupMgr screens | Ads never grant completion; account/cloud/rank/mail/cash screens report unavailable | Online-only rewards, purchases and services unavailable; earned-currency base play retained |
| `assets/main/index.6e590.js` | Remove a 513-byte conditional block inside the captured SweetAlert dependency that could disable page input and play external audio for Russian-language browsers on `.ru/.su/.by` domains | No combat/economy change. The predicate did not match the appassets origin in the previous APK. This finding does not establish the cause of the Play Protect warning |
| Android offline flavor | Remove INTERNET permission, block WebView network loads/external requests and disable CDN fallback | No server/CDN dependency; missing uncaptured resources cannot be fetched at runtime |

The adapter does not fabricate completed purchases, ad completions, ranks or rewards. The offline adapter acknowledges local persistence; battle, merge, earned-currency purchase and normal discovery rewards execute in the original client. Existing clock-based client behavior now trusts the device clock. Full late-game coverage is not established. See `capture/reports/OFFLINE_VERIFICATION.md` for actual smoke evidence and APK hash.

The sections below describe the preserved **online** guest variant.

Build /heroes-unite/51/; source capture 2026-09-10T18-05-52-247Z. Original files are byte-identical, checked by SHA-256, read-only copies. Local files are independent copies; no hardlinks to original.

| File | Original | Local modification / reason | Gameplay | Benchmark effect |
|---|---|---|---|---|
| Directory layout | Public files.crazygames.com/heroes-unite/51/ | Served as local HTTP root; original relative paths retained | No intended change | Local asset I/O replaces CDN latency; startup timings are not public-network startup |
| index.html | Remote CrazyGames SDK script | benchmark-portal.js reports SDK disabled; captured original SDK remains archived | No gameplay/reward mutations; plugin uses built-in public guest fallback | Removes SDK mock authenticated user, ads, telemetry, portal/cloud/social host overhead. Public guest backend still required |

Runtime adaptation status is recorded in capture/reports/LOCAL_VERIFICATION.md. No economy, progression, combat, rewards, renderer or effects changed.

## Android host: public asset fallback cache

The standalone Activity first serves bundled assets with WebViewAssetLoader. If an `/assets/` path is absent, it requests that exact path from the same pinned public build (`https://files.crazygames.com/heroes-unite/51/`) and returns HTTP 200 bytes to the WebView, caching them in this app's private `cache/public-assets/`. Other paths cannot use the fallback; traversal, auth/cookies, redirects and backend emulation are excluded. Missing/unavailable resources stay errors. This resolves platform/native texture requests not produced by desktop bulk loading.

No game JS/economy/combat/progression/renderer is modified. Startup on an empty asset cache can include CDN latency; subsequent app launches use the cached files. Benchmark results must state whether the cache was warm. The APK bundles most captured resources and needs no Mac server, but uncaptured assets can still require public CDN access. Guest backend access was already required. The fallback is wrapper code under `android/`, not a production dependency.

The public bulk-loading scripts are capture tools only; they never run in the benchmark app. No particles, audio, renderer feature, hero content or combat subsystem was disabled.
