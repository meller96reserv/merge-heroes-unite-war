# Capture coverage

Source: public Heroes Unite, `files.crazygames.com/heroes-unite/51/`, visible version **LIVE_CRAZY 3.16.2**, captured 2026-09-10. This is a public client archive for reference/benchmarking, not a claim of source-code reconstruction or complete backend/offline reproduction.

## Existing research reused

Read the existing `analysis/reference/capture_index.md`, `version_lock.json`, `auto_unlock_capture.md`, and related screen/capture planning. Existing RUN-02 recording is 4091.12 seconds (about 68 minutes), 60 indexed screenshots and 11 short review clips. Existing mechanic observations, balance samples and timing measurements remain the evidence for those topics. No new video or balance/timing investigation was undertaken. Those historical files are not copied or modified; this workspace runs independently of them.

## New network capture

| Area | New capture coverage |
|---|---|
| Public portal, fullscreen entry, boot/tutorial | Exercised in fresh dedicated Chrome guest profile; actual HTML/JS/CSS/config/images/audio/font responses recorded |
| Purchase / early merge / deployment / combat | Early tutorial inputs and battle exercised only to start the runtime and its lazy loading; existing research reused for mechanics |
| Stages / first boss availability | Public session advanced through early stages; boss retry became available. No new deliberate boss timing/retry investigation |
| Settings / attendance | Opened for resource capture; version read from settings; attendance UI reached |
| Menu, hero, collection, dungeon, events, rewards, wheel and later battle asset families | Their explicitly declared public release bundles were loaded by standard Cocos `loadBundle` + `loadDir` in the live public browser. 101 bundles returned LOADED, 1059 assets reported. See `public-bundle-load.json`. This is **resource coverage**, not a claim that every corresponding screen/locked flow was played |
| Platform-specific startup textures | 41 exact missing Android request paths across two batches were subsequently navigated in the isolated public browser and returned HTTP 200; see supplementary HAR and index `supplements` |
| Offline, daily timing, paid/rewarded outcomes | Existing evidence reused; no fabricated ad completion or gameplay rewards; no new timed/offline/ad-outcome study |
| Source maps / WASM | Explicit sourceMappingURL scan found zero declarations in archived JS. No WASM response was observed. No guessed source-map URLs or unpublished/debug bundles requested |

`debug_scene` is deliberately excluded. The core/resources bundles were captured as actually requested during startup, while all other declared non-debug bundles were loaded through the public client's normal asset loader. Additional platform/content-specific dependencies outside exercised paths may still be absent. HTTP failure details are retained in `resource-index.json`; no failed main game-host request in the initial public capture. Initial unrelated portal/advertising bodies were pruned before normalization.

## Important separation

Bulk loading changes transient memory during **capture only**. Benchmark launches start fresh processes and never run the bulk loader. The local game keeps its original lazy loading. Bundled files do not imply all assets are resident at runtime.

Coverage is broad for the declared public release bundles and exercised flows; **not 100% of every possible remote/game state**. No private endpoints, unpublished source, source maps guessed by name, production assets, production modules or old authenticated browser profiles were used.

## Android completion additions

A mobile-capability capture repeated asset loading, not gameplay research. 101 bundles completed; the large resources loadDir hit its 25-second limit, so that part remains PARTIAL. Complete responses from this pass were recovered from the append-only journal after finalization stalled; no bytes were invented.

The working Android wrapper additionally delivered 46 HTTP-200 public asset responses through its exact-path CDN cache. These were exported with adb run-as, hashed, indexed, copied into original/local trees, and included in the final APK. A fallback remains for future unexercised assets. Full source headers are unavailable for these cache files and their MIME field is marked inferred.
