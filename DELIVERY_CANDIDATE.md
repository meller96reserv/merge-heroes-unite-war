# Merge Heroes Unite War — runnable candidate

Version0.2.1, build3, package com.mergeheroes.unitewar.

- Browser: npm run dev:web (localhost:8082, Fast Refresh, shared actual game).
- Android: .tools/delivery/0.2.1-3/com.mergeheroes.unitewar.apk and .aab.
- iOS Simulator: .tools/delivery/0.2.1-3/com.mergeheroes.unitewar.ios-simulator.zip.
- Project: .tools/delivery/0.2.1-3/com.mergeheroes.unitewar.zip.
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
