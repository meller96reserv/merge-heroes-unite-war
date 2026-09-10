# TASK-0237 — runnable candidate; final delivery BLOCKED externally

Candidate0.2.1 (3), com.mergeheroes.unitewar, shared RN/TS/Expo/Skia. Required
screens/core/meta, motion/audio, persistence and native platform implementation
are present; final Web/Android/iOS Simulator builds and exercised flows pass.
[Actual checks](CANDIDATE_MILESTONES.md) · [Defect closure](qa_defect_register.md).

DELIVERY_COMPLETE is not asserted and no DELIVERY_COMPLETE.md is emitted.
Exact owner actions:
1. Supply Merge Heroes Start.io App IDs separately for Android/iOS. Configure the
   existing env settings and rebuild; then verify real completed/skipped/no-fill
   rewarded videos. Reference APK identifiers must not be used.
2. Supply approved HTTPS Terms of Use and Privacy Policy URLs. The actual handlers
   are wired; absent URLs currently show an honest unavailable state.
3. For distribution after candidate review: provide owner signing/accounts and
   the required GitLab destination. Current APK uses the development certificate
   in Release mode; iOS artifact runs on Simulator. No store/repository publication
   or physical-iOS distribution is claimed.

Owner reviews visuals/audio in npm run dev:web and compares the new APK on the
physical Android phone with reported jank. The targeted optimization pass and
its measurement limits are recorded in the defect register. AppMetrica native SDK
is consent-gated with the project TZ identifier; owner dashboard receipt is not
claimed. Native local notification controls and required SDK builds passed.

All independent implementation work is finished. Deferred engineering/QA stays
deferred; resume only the named external gates or a concrete user-reported defect.
[Build/handoff guide](../../docs/release/CANDIDATE_BUILD.md).
