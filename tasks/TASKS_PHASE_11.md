# Atomic tasks — phase 11

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_11_META_SCREENS.md).

<a id="task-0128"></a>
## TASK-0128 — Route and popup coordinator

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0061](TASKS_PHASE_05.md), [TASK-0078](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/NavigationCoordinator.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

Current delivery scope: One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/ui/MILESTONE.md).

### Goal
One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor.

### Context
Bounded route and popup coordinator deliverable. Authoritative output: `app/src/ui/NavigationCoordinator.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- `tests/integration/save-offline.md` — dependency output
- `app/src/components/BottomNavigation.tsx` — dependency output
- `app/src/input/InputRouter.ts` — dependency output

### Files expected to create
- `app/src/ui/NavigationCoordinator.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `app/src/ui/NavigationCoordinator.ts` through the smallest relevant RN/Skia/core/platform harness. One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor. Record platform limitations separately.

### Acceptance criteria
- One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0129"></a>
## TASK-0129 — Settings persistence binding

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0128](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/SettingsController.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/ui/MILESTONE.md).

### Goal
Persist music/SFX/haptics/reduced motion preferences and apply settings revision ordering.

### Context
Bounded settings persistence binding deliverable. Authoritative output: `app/src/ui/SettingsController.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- `app/src/ui/NavigationCoordinator.ts` — dependency output

### Files expected to create
- `app/src/ui/SettingsController.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Persist music/SFX/haptics/reduced motion preferences and apply settings revision ordering.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `app/src/ui/SettingsController.ts` through the smallest relevant RN/Skia/core/platform harness. Persist music/SFX/haptics/reduced motion preferences and apply settings revision ordering. Record platform limitations separately.

### Acceptance criteria
- Persist music/SFX/haptics/reduced motion preferences and apply settings revision ordering.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0130"></a>
## TASK-0130 — Quest event reducer

Phase: 11 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0129](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/QuestService.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Count committed deduplicated source events and expose complete/unclaimed/claimed states.

### Context
Bounded quest event reducer deliverable. Authoritative output: `game-core/src/systems/QuestService.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [07_QUESTS.md](../docs/progression/07_QUESTS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [07_QUESTS.md](../docs/progression/07_QUESTS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/ui/SettingsController.ts` — dependency output

### Files expected to create
- `game-core/src/systems/QuestService.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Count committed deduplicated source events and expose complete/unclaimed/claimed states.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `game-core/src/systems/QuestService.ts` through the smallest relevant RN/Skia/core/platform harness. Count committed deduplicated source events and expose complete/unclaimed/claimed states. Record platform limitations separately.

### Acceptance criteria
- Count committed deduplicated source events and expose complete/unclaimed/claimed states.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0019. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0131"></a>
## TASK-0131 — Quest claim transaction

Phase: 11 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0130](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/ClaimQuest.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Grant reward and advance quest/reset marker once through durable coordinator.

### Context
This is the bounded quest claim transaction deliverable within implement claims navigation and settings. Its authoritative output is `game-core/src/commands/ClaimQuest.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [07_QUESTS.md](../docs/progression/07_QUESTS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [07_QUESTS.md](../docs/progression/07_QUESTS.md)
- `game-core/src/systems/QuestService.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/ClaimQuest.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/ClaimQuest.ts`; unresolved reference behavior stays gated.
2. Grant reward and advance quest/reset marker once through durable coordinator.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Grant reward and advance quest/reset marker once through durable coordinator. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Grant reward and advance quest/reset marker once through durable coordinator.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0132"></a>
## TASK-0132 — Red-dot selectors

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0117](TASKS_PHASE_09.md), [TASK-0129](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/selectors/RedDots.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

Current delivery scope: Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system.

### Context
This is the bounded red-dot selectors deliverable within implement claims navigation and settings. Its authoritative output is `game-core/src/selectors/RedDots.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- `game-core/src/commands/ClaimQuest.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/selectors/RedDots.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/selectors/RedDots.ts`; unresolved reference behavior stays gated.
2. Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0133"></a>
## TASK-0133 — Daily period service

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0077](TASKS_PHASE_06.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/DailyService.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

Current delivery scope: One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [daily.test.ts](../tests/unit/daily.test.ts), [extended-modes.test.ts](../tests/unit/extended-modes.test.ts), [extended-flow.py](../tests/browser/extended-flow.py).

### Goal
One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required.

### Context
Bounded daily period service deliverable. Authoritative output: `game-core/src/systems/DailyService.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/selectors/RedDots.ts` — dependency output

### Files expected to create
- `game-core/src/systems/DailyService.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `game-core/src/systems/DailyService.ts` through the smallest relevant RN/Skia/core/platform harness. One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required. Record platform limitations separately.

### Acceptance criteria
- One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0016. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0134"></a>
## TASK-0134 — Daily claim transaction

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0133](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/ClaimDaily.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [daily.test.ts](../tests/unit/daily.test.ts), [extended-modes.test.ts](../tests/unit/extended-modes.test.ts), [extended-flow.py](../tests/browser/extended-flow.py).

### Goal
Credit configured day reward and watermark atomically; double tap/reopen same day cannot regrant.

### Context
This is the bounded daily claim transaction deliverable within implement claims navigation and settings. Its authoritative output is `game-core/src/commands/ClaimDaily.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- `game-core/src/systems/DailyService.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/ClaimDaily.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/ClaimDaily.ts`; unresolved reference behavior stays gated.
2. Credit configured day reward and watermark atomically; double tap/reopen same day cannot regrant.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Credit configured day reward and watermark atomically; double tap/reopen same day cannot regrant. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Credit configured day reward and watermark atomically; double tap/reopen same day cannot regrant.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0135"></a>
## TASK-0135 — Daily panel binding

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0066](TASKS_PHASE_05.md), [TASK-0134](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/DailyPanel.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [daily.test.ts](../tests/unit/daily.test.ts), [extended-modes.test.ts](../tests/unit/extended-modes.test.ts), [extended-flow.py](../tests/browser/extended-flow.py).

### Goal
Render available/claimed/loading/error variants and Figma chest layout with actual reward values.

### Context
Bounded daily panel binding deliverable. Authoritative output: `app/src/ui/DailyPanel.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- `game-core/src/commands/ClaimDaily.ts` — dependency output
- `app/src/components/DailyRewardPanel.tsx` — dependency output

### Files expected to create
- `app/src/ui/DailyPanel.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Render available/claimed/loading/error variants and Figma chest layout with actual reward values.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `app/src/ui/DailyPanel.ts` through the smallest relevant RN/Skia/core/platform harness. Render available/claimed/loading/error variants and Figma chest layout with actual reward values. Record platform limitations separately.

### Acceptance criteria
- Render available/claimed/loading/error variants and Figma chest layout with actual reward values.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0136"></a>
## TASK-0136 — Wheel outcome selector

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0075](TASKS_PHASE_06.md), [TASK-0074](TASKS_PHASE_06.md), [TASK-0050](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/WheelOutcome.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/wheel/MILESTONE.md).

### Goal
Validate weights/segment mapping and select using reward RNG once per stable spin ID; keep12-hour cooldown and proposed weights distinct from observed reference.

### Context
Bounded wheel outcome selector deliverable. Authoritative output: `game-core/src/systems/WheelOutcome.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/ui/DailyPanel.ts` — dependency output

### Files expected to create
- `game-core/src/systems/WheelOutcome.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate weights/segment mapping and select using reward RNG once per stable spin ID; keep12-hour cooldown and proposed weights distinct from observed reference.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `game-core/src/systems/WheelOutcome.ts` through the smallest relevant RN/Skia/core/platform harness. Validate weights/segment mapping and select using reward RNG once per stable spin ID; keep12-hour cooldown and proposed weights distinct from observed reference. Record platform limitations separately.

### Acceptance criteria
- Validate weights/segment mapping and select using reward RNG once per stable spin ID; keep12-hour cooldown and proposed weights distinct from observed reference.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.
- Any rule awaiting reference verification is explicitly versioned PROPOSED with behavioral tests; do not claim exact reference parity. ADR-007 authorizes the approximation.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0017. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0137"></a>
## TASK-0137 — Wheel reserve transaction

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0136](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/ReserveSpin.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/wheel/MILESTONE.md).

### Goal
Reserve one eligible free spin and pending outcome atomically; set nextFreeAt to reservationUTC+12hours and never reroll a pending result.

### Context
This is the bounded wheel reserve transaction deliverable within implement claims navigation and settings. Its authoritative output is `game-core/src/commands/ReserveSpin.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `game-core/src/systems/WheelOutcome.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/ReserveSpin.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/ReserveSpin.ts`; unresolved reference behavior stays gated.
2. Reserve one eligible free spin and pending outcome atomically; set nextFreeAt to reservationUTC+12hours and never reroll a pending result.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Reserve one eligible free spin and pending outcome atomically; set nextFreeAt to reservationUTC+12hours and never reroll a pending result. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Reserve one eligible free spin and pending outcome atomically; set nextFreeAt to reservationUTC+12hours and never reroll a pending result.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0138"></a>
## TASK-0138 — Wheel claim transaction

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0137](TASKS_PHASE_11.md), [TASK-0254](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/CompleteSpin.ts. Shared registries are integrated by their dedicated validation/wiring task.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/wheel/MILESTONE.md).

### Goal
Claim the saved wheel outcome exactly once only after confirmed rewarded completion for its operation; reject dismissal,missing,wrong,stale or duplicate results.

### Context
This is the bounded wheel claim transaction deliverable within implement claims navigation and settings. Its authoritative output is `game-core/src/commands/CompleteSpin.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `game-core/src/commands/ReserveSpin.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/CompleteSpin.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/CompleteSpin.ts`; unresolved reference behavior stays gated.
2. Claim the saved wheel outcome exactly once only after confirmed rewarded completion for its operation; reject dismissal,missing,wrong,stale or duplicate results.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Claim the saved wheel outcome exactly once only after confirmed rewarded completion for its operation; reject dismissal,missing,wrong,stale or duplicate results. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Claim the saved wheel outcome exactly once only after confirmed rewarded completion for its operation; reject dismissal,missing,wrong,stale or duplicate results.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0139"></a>
## TASK-0139 — Wheel panel controller

Phase: 11 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0138](TASKS_PHASE_11.md), [TASK-0068](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/WheelController.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/wheel/MILESTONE.md).

### Goal
Animate to the saved segment with slowing motion/audio; show12-hour entry/panel timers, pulsing Tap and Watch & Claim; retain pending result across ad failure/reopen.

### Context
Bounded wheel panel controller deliverable. Authoritative output: `app/src/ui/WheelController.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `game-core/src/commands/CompleteSpin.ts` — dependency output
- `app/src/components/WheelPanel.tsx` — dependency output

### Files expected to create
- `app/src/ui/WheelController.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Animate to the saved segment with slowing motion/audio; show12-hour entry/panel timers, pulsing Tap and Watch & Claim; retain pending result across ad failure/reopen.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `app/src/ui/WheelController.ts` through the smallest relevant RN/Skia/core/platform harness. Animate to the saved segment with slowing motion/audio; show12-hour entry/panel timers, pulsing Tap and Watch & Claim; retain pending result across ad failure/reopen. Record platform limitations separately.

### Acceptance criteria
- Animate to the saved segment with slowing motion/audio; show12-hour entry/panel timers, pulsing Tap and Watch & Claim; retain pending result across ad failure/reopen.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0140"></a>
## TASK-0140 — Quest and offline popup binding

Phase: 11 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0139](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/RewardPopupController.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Display pending entitlements and invoke stable claim IDs; closing animation never credits.

### Context
Bounded quest and offline popup binding deliverable. Authoritative output: `app/src/ui/RewardPopupController.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [07_QUESTS.md](../docs/progression/07_QUESTS.md) · [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [07_QUESTS.md](../docs/progression/07_QUESTS.md)
- [13_OFFLINE_PROGRESS.md](../docs/progression/13_OFFLINE_PROGRESS.md)
- `app/src/ui/WheelController.ts` — dependency output

### Files expected to create
- `app/src/ui/RewardPopupController.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Display pending entitlements and invoke stable claim IDs; closing animation never credits.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `app/src/ui/RewardPopupController.ts` through the smallest relevant RN/Skia/core/platform harness. Display pending entitlements and invoke stable claim IDs; closing animation never credits. Record platform limitations separately.

### Acceptance criteria
- Display pending entitlements and invoke stable claim IDs; closing animation never credits.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0141"></a>
## TASK-0141 — Tutorial step reducer

Phase: 11 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0140](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/TutorialService.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Persist completion version and advance only on committed matching events; skip policy explicit.

### Context
Bounded tutorial step reducer deliverable. Authoritative output: `game-core/src/systems/TutorialService.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [17_TUTORIAL_SYSTEM.md](../docs/gameplay/17_TUTORIAL_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [17_TUTORIAL_SYSTEM.md](../docs/gameplay/17_TUTORIAL_SYSTEM.md)
- `app/src/ui/RewardPopupController.ts` — dependency output

### Files expected to create
- `game-core/src/systems/TutorialService.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Persist completion version and advance only on committed matching events; skip policy explicit.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `game-core/src/systems/TutorialService.ts` through the smallest relevant RN/Skia/core/platform harness. Persist completion version and advance only on committed matching events; skip policy explicit. Record platform limitations separately.

### Acceptance criteria
- Persist completion version and advance only on committed matching events; skip policy explicit.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0142"></a>
## TASK-0142 — Tutorial input mask

Phase: 11 · Priority: P1 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0141](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/TutorialOverlay.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Allow only named target,position hand responsively and clean mask on route change/restart.

### Context
Bounded tutorial input mask deliverable. Authoritative output: `app/src/ui/TutorialOverlay.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [17_TUTORIAL_SYSTEM.md](../docs/gameplay/17_TUTORIAL_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- [17_TUTORIAL_SYSTEM.md](../docs/gameplay/17_TUTORIAL_SYSTEM.md)
- `game-core/src/systems/TutorialService.ts` — dependency output

### Files expected to create
- `app/src/ui/TutorialOverlay.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Allow only named target,position hand responsively and clean mask on route change/restart.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `app/src/ui/TutorialOverlay.ts` through the smallest relevant RN/Skia/core/platform harness. Allow only named target,position hand responsively and clean mask on route change/restart. Record platform limitations separately.

### Acceptance criteria
- Allow only named target,position hand responsively and clean mask on route change/restart.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0143"></a>
## TASK-0143 — Meta lifecycle acceptance

Phase: 11 · Priority: P1 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0129](TASKS_PHASE_11.md), [TASK-0135](TASKS_PHASE_11.md), [TASK-0139](TASKS_PHASE_11.md), [TASK-0128](TASKS_PHASE_11.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/integration/meta-lifecycle.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance.

### Context
Bounded meta lifecycle acceptance deliverable. Authoritative output: `tests/integration/meta-lifecycle.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [11_NAVIGATION_FLOW.md](../docs/11_NAVIGATION_FLOW.md)
- [06_REWARDS.md](../docs/progression/06_REWARDS.md)
- `app/src/ui/TutorialOverlay.ts` — dependency output

### Files expected to create
- `tests/integration/meta-lifecycle.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.

### Test cases
Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.

### Manual verification
Exercise `tests/integration/meta-lifecycle.md` through the smallest relevant RN/Skia/core/platform harness. One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance. Record platform limitations separately.

### Acceptance criteria
- One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).

<a id="task-0254"></a>
## TASK-0254 — Rewarded operation authority

Phase: 11 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0074](TASKS_PHASE_06.md), [TASK-0077](TASKS_PHASE_06.md)

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/wheel/MILESTONE.md).

### Goal
Persist placement/operation/outcome and consume confirmed provider completion once; reject skipped,failed,unavailable,stale,duplicate and wrong-operation callbacks.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`game-core/src/rewards/RewardedOperation.ts`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Persist placement/operation/outcome and consume confirmed provider completion once; reject skipped,failed,unavailable,stale,duplicate and wrong-operation callbacks.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Persist placement/operation/outcome and consume confirmed provider completion once; reject skipped,failed,unavailable,stale,duplicate and wrong-operation callbacks. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Persist placement/operation/outcome and consume confirmed provider completion once; reject skipped,failed,unavailable,stale,duplicate and wrong-operation callbacks.
- Record actual evidence; no NOT_RUN/UNKNOWN is PASS.
- Preserve shared RN/Skia gameplay and safe durable reward authority.

### Definition of Done
Output and actual evidence exist; all dependencies completed; own oracle passes.

### Do not do
Do not add betting,payouts,IAP or ordinary interstitial/banner ads. No grant from animation/ad dismissal. No secrets in source/logs.

### Estimated complexity
M · Risk: high.

### Notes / unknowns
Provider IDs/native compatibility and final legal links are verified by their owning tasks; visible gameplay continues independently.

<a id="task-0255"></a>
## TASK-0255 — Free coins rewarded claim

Phase: 11 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0254](TASKS_PHASE_11.md)

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/rewarded/MILESTONE.md).

### Goal
Grant exactly1000gold per unique completed shop video with no cooldown; unlimited separate videos,zero grant on cancellation and durable failure retry without duplication.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`game-core/src/commands/ClaimFreeCoins.ts`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Grant exactly1000gold per unique completed shop video with no cooldown; unlimited separate videos,zero grant on cancellation and durable failure retry without duplication.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Grant exactly1000gold per unique completed shop video with no cooldown; unlimited separate videos,zero grant on cancellation and durable failure retry without duplication. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Grant exactly1000gold per unique completed shop video with no cooldown; unlimited separate videos,zero grant on cancellation and durable failure retry without duplication.
- Record actual evidence; no NOT_RUN/UNKNOWN is PASS.
- Preserve shared RN/Skia gameplay and safe durable reward authority.

### Definition of Done
Output and actual evidence exist; all dependencies completed; own oracle passes.

### Do not do
Do not add betting,payouts,IAP or ordinary interstitial/banner ads. No grant from animation/ad dismissal. No secrets in source/logs.

### Estimated complexity
M · Risk: high.

### Notes / unknowns
Provider IDs/native compatibility and final legal links are verified by their owning tasks; visible gameplay continues independently.

<a id="task-0256"></a>
## TASK-0256 — Stage reward multiplier claim

Phase: 11 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0254](TASKS_PHASE_11.md), [TASK-0107](TASKS_PHASE_08.md)

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/rewarded/MILESTONE.md).

### Goal
Reserve one x1–x10 multiplier per eligible successful stage token; grant only bonus above already committed base after rewarded completion; duplicate/reload/save failure cannot reroll or repay.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`game-core/src/commands/ClaimStageBoost.ts`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Reserve one x1–x10 multiplier per eligible successful stage token; grant only bonus above already committed base after rewarded completion; duplicate/reload/save failure cannot reroll or repay.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Reserve one x1–x10 multiplier per eligible successful stage token; grant only bonus above already committed base after rewarded completion; duplicate/reload/save failure cannot reroll or repay. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Reserve one x1–x10 multiplier per eligible successful stage token; grant only bonus above already committed base after rewarded completion; duplicate/reload/save failure cannot reroll or repay.
- Record actual evidence; no NOT_RUN/UNKNOWN is PASS.
- Preserve shared RN/Skia gameplay and safe durable reward authority.

### Definition of Done
Output and actual evidence exist; all dependencies completed; own oracle passes.

### Do not do
Do not add betting,payouts,IAP or ordinary interstitial/banner ads. No grant from animation/ad dismissal. No secrets in source/logs.

### Estimated complexity
M · Risk: high.

### Notes / unknowns
Provider IDs/native compatibility and final legal links are verified by their owning tasks; visible gameplay continues independently.

<a id="task-0257"></a>
## TASK-0257 — Rewarded shop wheel and win UI

Phase: 11 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0255](TASKS_PHASE_11.md), [TASK-0256](TASKS_PHASE_11.md), [TASK-0139](TASKS_PHASE_11.md), [TASK-0061](TASKS_PHASE_05.md)

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [MILESTONE.md](../analysis/reports/rewarded/MILESTONE.md).

### Goal
Wire Free coins,Watch & Claim and2s Boost Reward; run1.5s multiplier wheel then Claim video; show busy/cancel/no-fill/retry states without dead taps or animation-owned rewards.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`app/src/rewards/RewardedController.ts`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Wire Free coins,Watch & Claim and2s Boost Reward; run1.5s multiplier wheel then Claim video; show busy/cancel/no-fill/retry states without dead taps or animation-owned rewards.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Wire Free coins,Watch & Claim and2s Boost Reward; run1.5s multiplier wheel then Claim video; show busy/cancel/no-fill/retry states without dead taps or animation-owned rewards. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Wire Free coins,Watch & Claim and2s Boost Reward; run1.5s multiplier wheel then Claim video; show busy/cancel/no-fill/retry states without dead taps or animation-owned rewards.
- Record actual evidence; no NOT_RUN/UNKNOWN is PASS.
- Preserve shared RN/Skia gameplay and safe durable reward authority.

### Definition of Done
Output and actual evidence exist; all dependencies completed; own oracle passes.

### Do not do
Do not add betting,payouts,IAP or ordinary interstitial/banner ads. No grant from animation/ad dismissal. No secrets in source/logs.

### Estimated complexity
M · Risk: high.

### Notes / unknowns
Provider IDs/native compatibility and final legal links are verified by their owning tasks; visible gameplay continues independently.
