# Release checklist

Release is future work; no build is distributed by this mission. Required evidence: scope signed by recorded project decision, source/version lock, allP0 tasks accepted, no blockingP1, schemas/content validated, native spike and production host acceptance, device QA/performance, visual/audio review, save migration/crash suite, rights/fonts/audio provenance and release configuration.

Check app identifiers, audience/rating, privacy/support/terms copy, analytics consent behavior and actual SDK data flows. Figma18+ and stale payout layer names are not legal/store requirements. No real-money payout copy is inherited. Rewarded-only Start.io flows are required and need verified native integration; banners,ordinary interstitials and automatic ads must be absent. IAP remains excluded.

Build provenance includes source commit, toolchain, app/build/data/save/platform-contract versions, artifact checksums, signing channel and test report. Secrets remain external. Dry-run store metadata/assets before submission. Verify current official Android/iOS requirements at release time; no planning document claims future policy compliance.

Rollback/recovery plan preserves last compatible save reader, previous signed artifact and content package. Beta monitoring includes crash/save/platform-service failures and performance, with consent/provider decisions recorded. Release owner and rollout criteria remain U029 until resolved.

## Traceability

[QA index](00_QA_INDEX.md) · [Unit matrix](unit_test_matrix.csv) · [Integration matrix](integration_test_matrix.csv) · [Performance budgets](../technical/14_PERFORMANCE_BUDGET.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Release](../release/04_PRODUCTION_DEFINITION.md).

Settings legal-link configuration: supply owner-approved HTTPS values for
`EXPO_PUBLIC_TERMS_URL` and `EXPO_PUBLIC_PRIVACY_URL` before the release build.
`.env.example` intentionally contains no fallback URLs. TASK-0067 wires both
Figma Settings variants to these handlers and an honest unavailable state;
TASK-0231 still owns the actual URLs and final legal acceptance. TASK-0208 owns
production native notification permission/routing; browser permission success
is not native acceptance.
