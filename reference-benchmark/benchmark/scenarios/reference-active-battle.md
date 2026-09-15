# Reference active battle — one useful baseline

This scenario and existing 90-second baseline describe the online guest variant. Since adding the offline flavor, select the online target with `REFERENCE_MODE=online npm run benchmark -- --seconds 90 --warmup 15`. The default tool target is now the offline app; its server/event behavior differs and results must be labelled separately. No new benchmark was run for the offline change.

Use the standalone debug APK `com.kisel.referencebenchmark`; retain its isolated guest save. Device must have Internet access to the game's public guest backend. Record Android/WebView versions and resolution (the script does so). Reference build: LIVE_CRAZY 3.16.2, public directory 51. This is the web game in a thin WebView, not the store-native game.

1. Install with `npm run android:install -- --online`, launch with `npm run android:run -- --online`.
2. On first install dismiss Android's fullscreen hint. Follow normal tutorial: buy two level-1 heroes with a short pause between taps, merge them, dismiss discovery, and drag the level-2 hero from its board tile onto the field. Complete the withdrawal/redeploy prompt if it appears. Do not edit storage or unlock flags.
3. Keep at least the early archer deployed against continuously spawning enemies. Record the actual stage/hero state in the run notes. Avoid menus obscuring the battle; dismiss any tutorial overlay using normal touches. Additional purchases/merges are optional and must be recorded if performed.
4. Close capture/local desktop Chrome windows to avoid host load. Run `REFERENCE_MODE=online npm run benchmark -- --seconds 90 --warmup 15`. It force-stops and starts only this benchmark package, retains saves, records Activity launch duration, warms up and samples memory/window/compositor statistics once. Resume battle through ordinary UI if necessary.
5. During the 90-second sample let combat run. A first boss is optional; don't grind for it or repeat equivalent scenarios.
6. Record one screenshot at start/end, whether rendering/touch continued, and whether the process crashed. One background/resume check after sampling is sufficient. No 5–10 minute soak unless a real failure warrants it.

Results: `benchmark/results/latest.json`, `latest.md`, timestamped run directory with raw diagnostics. Host PSS may exclude a sandboxed WebView renderer. SurfaceFlinger can omit window latency data on some Android versions; null means unavailable. HWUI gfxinfo jank/frame counts are not automatically WebGL game FPS. Any optional Cocos frame-counter measurement must be labelled engine loop FPS, not physical display presentation rate.

Comparison needs the same device/emulator, graphics backend, resolution, WebView build, thermal/host load, hero state and duration. Local asset startup and SDK-disabled portal behavior differ from the public website; Internet guest services remain remote. No ads are simulated and no game rewards are injected. This is one practical baseline, not a statistical leak or production QA study.
