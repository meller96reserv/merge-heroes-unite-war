# Physical Android defect pass — TASK-0229 code closure

Version 0.2.1 (3), runtime checkpoint 413986f. All seven owner-reported defects
have targeted fixes: empty new game/first buy starts battle; 10 normal enemy and
3 boss appearances; earned 5→10→15 board slots; one Figma Settings route;
complete equipment art mappings; ordered ad/audio focus recovery; separate static
and animated battle surfaces. Economy pacing and texture ownership were added to
this same pass, not separate planning/research missions.

Shipped economy v2 preserves the 30 captured prices and every existing balance,
hero/item/level/receipt/pending reward. Later purchases share a growing recruitment
index; upgrade/enhancement costs and enemy/boss challenges scale. Free Coins stays
exactly 1000 with no cooldown; Daily/Wheel and completion-only grants are unchanged.
See [the bounded balance rule](../../docs/progression/SHIPPED_ECONOMY_AMENDMENT.md).

Texture boot no longer retains the complete registry. Visible sprites share reads
and leases; last-route images retire. 69 reviewed runtime icon/portrait copies
are smaller, source/raw art unchanged. 3× browser Battle returns to 29 images,
11.1–11.2 MiB RGBA capacity after all six tested route round trips; 4× repeats also
pass (15.69 MiB). [Audit and size policy](runtime_texture_audit.md).

Actual checks: 21 relevant economy/core cases PASS, 2 resource lease cases PASS;
previous 5 audio recovery checks reused (audio code unchanged). Typecheck,
source/runtime hashes, registry (170 base/346 variants/5 components), production
web export PASS. Dev web 3× route residency and 4× repeat routes, production web
3× repeat routes PASS, app errors 0. Boot→empty idle board→first purchase→Settings
→unavailable Shop→reload PASS after the economy change.

Final Android Release APK/AAB and iOS arm64 Release Simulator builds PASS.
Both final native apps: existing-save install, Battle, equipment inventory,
Infernal/Frost/Shadow entry and leave, Settings controls, unavailable Shop return,
restart PASS. Final iOS Battle screenshot visibly renders the shared Skia art;
current Android process fatal/ReactNativeJS error signatures 0. No live Start.io
completion or owner AppMetrica dashboard receipt is claimed.

Rendering measurement: indicative same-emulator 12-second samples before/after
surface separation improved janky frames 19.61%→0.41%, P95 93→26 ms, process PSS
594784→358428 KiB. Encounters/host load differ; these are not physical-phone FPS
certification. No low-quality preset, 30 FPS default or VFX reduction was used.
Final economy/texture build sample: 712 frames, 1.83% janky, P95 32 ms, zero slow
bitmap uploads and PSS 281132 KiB. Host load/encounters differ from the interim
sample; this supports lower retained process memory, not a universal FPS claim.

## Final Android owner/manual review — pending, not automated PASS

- Fresh install: zero heroes, five available slots; first buy/deploy starts battle.
  An upgrade install must preserve existing money, heroes, equipment and rewards.
- Buy/drag/merge, changing normal enemies and bosses; attack motion continues
  after boss replacement. Earn rows at boss 1-3 and 1-6 and use the new slots.
- Normal play economy: early buys accessible, repeated prices grow; upgrades,
  equipment and later rows/challenges require continued progress. 1000/Daily/Wheel
  rewards feel useful without skipping most progression or creating excessive grind.
- Equipment art is sharp/correct; Settings is the single branded blue/gold screen.
  Repeated Equipment/Dungeon/Wheel→Battle transitions show no missing textures.
- Music/SFX respect settings, background/foreground and rewarded outcomes; no
  stuck mute or duplicate loop. Actual completed/skip/no-fill ads need owner IDs.
- Compare smoothness and responsive/safe-area layout on the originally reported
  physical Android phone. User visual/audio review is the agreed final gate.

No known blocking failure remains in exercised required paths. The owner review
above is still pending. Final delivery remains externally blocked by real Merge
Heroes Start.io IDs/live inventory, approved legal URLs and distribution signing.

## Historical 0.2.0 candidate observations — superseded by owner defect review

Previous checkpoint accepted exercised paths; the later physical review invalidated final defect closure. User visual/audio and same-physical-phone performance review remain the agreed acceptance method.
- Fixed: Battle Speed/Auto/Gold action wiring, debit/expiry/retry tests and browser smoke pass.
- Targeted rendering pass: three-hero 12s browser CPU sample before/after; React renderWithHooks inclusive 664→543ms, Label 58→19ms, unchanged Sprite/board work removed from sampled hot paths. No app errors. Browser timings are diagnostic and not physical-device FPS proof. Memoization preserves artwork, animation and domain behavior.
- Android API36 arm64 Release 12s samples: 618→686 rendered frames, janky 5.83%→3.94%, P95 48→32ms, P99 150→61ms; P50 18→22ms and GPU P50 15→17ms. Host load and evolving encounter differ, so these are indicative observations, not a controlled physical-device FPS claim. PSS 392136→336696KB. Owner should retest the resulting APK on the reported physical phone. No low-quality mode or effect reduction was introduced.
- Fixed/verified in 5123d0e: native Skia touch interception, native number formatting, iOS framework launch and local-notification Keychain failures. Reuse green checks.
- External-only: owner Start.io IDs/live inventory, Terms/Privacy URLs, and distribution signing. Required final gate stays open.

- Native smoke found compact Relics Open x1 overlapping bottom navigation. Relics and single Equipment artboards now scale their complete content to the available safe-area body. Long hero upgrade list still scrolls. Compact 402×777 browser: real Daily→Relic Open→Equipment CTA→Upgrades PASS, errors0. Native iOS focused retest PASS; final Android Equipment/Relics/Dungeon/Settings/Wheel/Shop/restart PASS.

Final checks: production web build + 430×932/360×640/768×1024 gameplay/routes/restart smoke PASS, browser errors0. Android Release APK/AAB and iOS Release Simulator builds PASS. Both native platforms reserve Wheel, fail unavailable ad without claim, then reopen the same pending result after restart. iOS actual A/B saves both validate: generation923, heroes4, relicCopies1, pendingWheel reserved, ad status cancelled. Analytics consent native toggles PASS; external dashboard receipt is not claimed. No new iOS app crash report since final Release install. Android20 native libraries have >=16KB load alignment; APK zipalign16KB PASS.

Remaining P2/device-review item: evaluate the optimized APK on the same physical Android phone reported by the owner. Emulator numbers are indicative, not physical-device certification. Deferred exhaustive soak/reference/device matrices remain deferred.
