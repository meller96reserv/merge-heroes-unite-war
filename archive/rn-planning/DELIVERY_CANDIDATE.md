# Merge Heroes Unite War — runnable candidate

Version0.2.4, build6, package com.mergeheroes.unitewar.

- Browser: npm run dev:web (localhost:8082, Fast Refresh, shared actual game).
- Android: .tools/delivery/0.2.4-6/com.mergeheroes.unitewar.apk and .aab.
- iOS Simulator: .tools/delivery/0.2.4-6/com.mergeheroes.unitewar.ios-simulator.zip.
- Project: .tools/delivery/0.2.4-6/com.mergeheroes.unitewar.zip.
- Artifact metadata/checksums and private project settings accompany those files.

Original Figma screens/assets, buy/merge/battle/stages/bosses, Equipment/Upgrades,
Daily, Relics x1/x10, three Dragons, Settings/Wheel, motion/audio, confirmed-only
rewarded flows, native saves/notifications and consented AppMetrica are implemented.
Web/Android/iOS Simulator build and final smoke results are recorded in
[the milestone record](analysis/reports/CANDIDATE_MILESTONES.md).

Final delivery remains blocked by owner Start.io App IDs/live ad verification and
approved Terms/Privacy URLs. Android uses candidate development signing; physical
iOS/store/GitLab distribution needs owner configuration and is not claimed.
[Exact remaining actions](analysis/reports/production_gate.md) ·
[Build commands](docs/release/CANDIDATE_BUILD.md) ·
[Known device-review limits](analysis/reports/qa_defect_register.md).

Packaged runtime checkpoint5e569ac includes:

- Bounded Battle redraw/subscriptions, hidden-route animation suspension, exact-
  byte save validation reuse and bounded Android SoundPool SFX (loops stay Expo).
- Concurrent deployment cap1 at account1,2 at account2, without changing five
  visible battle positions. Stored reserves/ownership survive upgrade/restart.
- Minimal first-session buy/buy/merge/deploy/automatic-combat guide with saved
  steps, forward recovery and Skip. Advanced/completed saves never restart it.
- Subtle static stone-face highlight for the active hero, replacing the rectangle.
- Explicit PROPOSED first-level XP and two-hero endgame compatibility; later
  platform unlock levels remain UNKNOWN. Other prices/rewards unchanged.

Previous0.2.3-5/0.2.2-4 artifacts remain available. Physical Android FPS/audio and
multi-session pacing acceptance remains owner review; measured emulator/UI work
improvements do not prove performance on the owner's phone. Final native smoke,
checksums and handoff status are recorded with the packaged artifact manifest.
This is a runnable candidate, not satisfaction of external final delivery gates.

0.2.4(6) handoff verified: all four archives pass ZIP integrity/SHA256 and match
the committed source. APK installs/launches; browser and native smoke are green
within recorded limits. Test emulators were stopped; dev:web stays available.
