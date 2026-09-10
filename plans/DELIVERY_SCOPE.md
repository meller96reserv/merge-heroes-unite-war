# Current delivery scope

**Execution override:** [Six-hour runnable candidate mode](DELIVERY_CANDIDATE_MODE.md) supersedes standalone QA and formal distribution ceremony below. All required product behavior remains mandatory. Final native smoke rebuilds the complete app; early launches run before final platform gates.

Authority: app-specific [ТЗ](<../docs/tz/Merge Heroes Unite War тз на разработку.md>) first; [advertising requirements](<../docs/tz/Реклама в приложениях.md>) govern rewarded behavior; supplied Figma governs required screens/art/composition; [general instructions](<../docs/tz/Инструкция для разработчиков.md>) apply only to this game. Internal plans and reference research provide implementation detail, not extra delivery scope. This is a complete production delivery, not an MVP/prototype.

The amendment follows coherent checkpoint `70217f1` (TASK-0167). All 152 tasks remaining at that checkpoint were reviewed: 50 REQUIRED_NOW, 58 SUPPORTING_REQUIRED, 44 DEFERRED_POST_DELIVERY. Completed work is preserved. Per-task reasons, source references, original dependency/acceptance values and current dependencies are in the [manifest](../tasks/task_manifest.json) and [machine-readable report](../analysis/reports/delivery_scope.json).

All 15 supplied Figma artboards remain required. This includes equipment and hero upgrades, relic Open x1/x10, daily rewards, maintenance/retry, and the three Dungeon dragon entries as well as loading/start/battle/Settings/Wheel. Relevant relic/dragon/open tasks 0242/0243/0246 are promoted from the old post-release group and bounded to those actual controls; Demon/Tower/pity/reference research stay deferred. The source .fig, semantic mapping, original screenshots and product specs are unchanged.

## Remaining required tasks and preserved deferred groups

| Classification | Group | Task IDs |
| --- | --- | --- |
| DEFERRED_POST_DELIVERY | Reference parity research | TASK-0007, TASK-0010, TASK-0011, TASK-0012, TASK-0013, TASK-0014, TASK-0015, TASK-0016, TASK-0017, TASK-0018, TASK-0019, TASK-0020, TASK-0021, TASK-0022, TASK-0023, TASK-0024, TASK-0187, TASK-0188, TASK-0239, TASK-0240, TASK-0241 |
| DEFERRED_POST_DELIVERY | Candidate-mode redundant engineering and release ceremony | TASK-0036, TASK-0053, TASK-0080, TASK-0143, TASK-0149, TASK-0150, TASK-0154, TASK-0155, TASK-0186, TASK-0189, TASK-0190, TASK-0191, TASK-0192, TASK-0193, TASK-0194, TASK-0195, TASK-0196, TASK-0211, TASK-0212, TASK-0213, TASK-0217, TASK-0219, TASK-0223, TASK-0224, TASK-0227, TASK-0233, TASK-0236 |
| REQUIRED_NOW | Required Figma screens and actions | Completed |
| DEFERRED_POST_DELIVERY | Consolidated duplicate QA | TASK-0069, TASK-0127, TASK-0157, TASK-0180, TASK-0200, TASK-0220, TASK-0221, TASK-0222, TASK-0225, TASK-0226, TASK-0228, TASK-0230 |
| SUPPORTING_REQUIRED | Production reliability and acceptance | Completed |
| DEFERRED_POST_DELIVERY | Additional progression | TASK-0130, TASK-0131, TASK-0140, TASK-0141, TASK-0142, TASK-0151, TASK-0152, TASK-0153 |
| REQUIRED_NOW | Visual and audio polish | Completed |
| DEFERRED_POST_DELIVERY | Optional investigation and optimization campaigns | TASK-0197, TASK-0199, TASK-0214, TASK-0215, TASK-0216, TASK-0218 |
| REQUIRED_NOW | Platform, rewarded ads and delivery | TASK-0237, TASK-0258, TASK-0259 |
| DEFERRED_POST_DELIVERY | Post-delivery extensions | TASK-0235, TASK-0238, TASK-0244, TASK-0245, TASK-0247, TASK-0248, TASK-0249, TASK-0250, TASK-0251 |

Current remaining delivery tasks: 3. [Remaining critical path](02_CRITICAL_PATH.md): 9 relative points. [Executable graph](01_DEPENDENCY_GRAPH.md) excludes all deferred work.

## Delivery gate

TASK-0237 owns `DELIVERY_COMPLETE.md`; create it only when the product gate actually passes. Scope-validation PASS is not product completion.

- Every explicit app ТЗ feature and every required interactive Figma screen, with high visual fidelity and no placeholders.
- Polished buy/spawn/drag/merge/battle/stage/boss loop, required VFX/animations, menu/game music and SFX.
- Complete Settings sound/notification/legal controls; 12-hour Wheel with durable outcome, timers and Watch & Claim.
- Rewarded-only Start.io where supported: unlimited 1000-coin shop videos, wheel claims and the 2-second win Boost / 1.5-second x1–x10 multiplier flow; no unconfirmed or duplicate grants, banners, interstitials or automatic ads.
- Project AppMetrica/configuration, reliable native/web persistence and restart, responsive layouts/safe areas, usable permission/failure/cancellation states.
- Actual Android production build/smoke and APK/AAB; iOS production build where signing/environment allow; package-named project ZIP, tested artifacts/checksums and required GitLab/repository/build metadata with monotonic delivered versions. Signing material and private configuration stay out of public Git/ZIP.
- Required native performance, save, visual, interaction, audio and final release smoke acceptance; zero known P0/P1 defects. Deferred optimization projects do not excuse a measured defect.

An unavailable owner-controlled credential, signing account, physical device, Start.io registration, final legal/rights approval or GitLab destination must be recorded as an exact external action after all independent work is completed. Such cases are NOT_RUN/BLOCKED, not PASS; the gate stays open. Prepare concrete artifacts before requesting any necessary publication approval. No automatic account messages or release submission follow from this amendment.

[Consistency acceptance](../analysis/reports/delivery_consistency.json) · [Negative validator tests](../analysis/reports/delivery_scope_tests.txt).

No generic betting, withdrawals, paid packs, low-balance handouts, leaderboards absent from this app's Figma, reference-only quests/offline farming, or store submission are added. Existing durable state/receipts and already implemented core rules remain intact.

QA consolidation: 12 duplicate/exhaustive QA tasks are additionally deferred; their mandatory checks move to named active owners. [Current QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) governs lightweight presentation acceptance, batched milestones and retained final release safety. Current classifications: DEFERRED_POST_DELIVERY: 83, REQUIRED_NOW: 49, SUPPORTING_REQUIRED: 20.
