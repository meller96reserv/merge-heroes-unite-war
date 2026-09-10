# Atomic tasks — phase 16

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_16_REACT_NATIVE_PRODUCTION_INTEGRATION.md).

<a id="task-0201"></a>
## TASK-0201 — Production platform service composition

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0047](TASKS_PHASE_04.md), [TASK-0147](TASKS_PHASE_12.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/services.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Compose shared RN storage,lifecycle,audio,haptics and AppMetrica plus rewarded-provider seams with loading/recovery states; preserve one game authority.

### Context
Bounded production platform service composition deliverable. Authoritative output: `app/src/platform/services.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `package.json` — dependency output
- `tests/integration/save-offline.md` — dependency output

### Files expected to create
- `app/src/platform/services.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Compose shared RN storage,lifecycle,audio,haptics and AppMetrica plus rewarded-provider seams with loading/recovery states; preserve one game authority.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/platform/services.ts` through the smallest relevant RN/Skia/core/platform harness. Compose shared RN storage,lifecycle,audio,haptics and AppMetrica plus rewarded-provider seams with loading/recovery states; preserve one game authority. Record platform limitations separately.

### Acceptance criteria
- Compose shared RN storage,lifecycle,audio,haptics and AppMetrica plus rewarded-provider seams with loading/recovery states; preserve one game authority.
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


<a id="task-0202"></a>
## TASK-0202 — Android application build and smoke

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0201](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/native/android-smoke.md. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Early Android prebuild/build/install verifies actual shared Skia Battle, touch and restart. Final candidate smoke rebuilds after platform/features land; it does not gate this early launch on final analytics or release ceremony. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [android-smoke.md](../tests/native/android-smoke.md).

### Goal
Build and install the actual Expo/RN application from pinned reproducible inputs; verify Skia screen, touch, Back and process restoration on Android. Record unavailable physical cases separately.

### Context
Bounded android application build and smoke deliverable. Authoritative output: `tests/native/android-smoke.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/services.ts` — dependency output

### Files expected to create
- `tests/native/android-smoke.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Build and install the actual Expo/RN application from pinned reproducible inputs; verify Skia screen, touch, Back and process restoration on Android. Record unavailable physical cases separately.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `tests/native/android-smoke.md` through the smallest relevant RN/Skia/core/platform harness. Build and install the actual Expo/RN application from pinned reproducible inputs; verify Skia screen, touch, Back and process restoration on Android. Record unavailable physical cases separately. Record platform limitations separately.

### Acceptance criteria
- Build and install the actual Expo/RN application from pinned reproducible inputs; verify Skia screen, touch, Back and process restoration on Android. Record unavailable physical cases separately.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
L · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0203"></a>
## TASK-0203 — iOS application build and smoke

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0201](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/native/ios-smoke.md. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Early iOS Simulator prebuild/build/install verifies actual shared Skia Battle, touch and restart without distribution signing. Final candidate smoke rebuilds after platform/features land. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [ios-smoke.md](../tests/native/ios-smoke.md).

### Goal
Build and install the actual Expo/RN application on iOS Simulator; verify shared Skia screen, touch, routes and AppState without retained subscriptions. Record physical-only cases separately.

### Context
Bounded ios application build and smoke deliverable. Authoritative output: `tests/native/ios-smoke.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/services.ts` — dependency output

### Files expected to create
- `tests/native/ios-smoke.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Build and install the actual Expo/RN application on iOS Simulator; verify shared Skia screen, touch, routes and AppState without retained subscriptions. Record physical-only cases separately.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `tests/native/ios-smoke.md` through the smallest relevant RN/Skia/core/platform harness. Build and install the actual Expo/RN application on iOS Simulator; verify shared Skia screen, touch, routes and AppState without retained subscriptions. Record physical-only cases separately. Record platform limitations separately.

### Acceptance criteria
- Build and install the actual Expo/RN application on iOS Simulator; verify shared Skia screen, touch, routes and AppState without retained subscriptions. Record physical-only cases separately.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
L · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0204"></a>
## TASK-0204 — Typed platform service requests

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0052](TASKS_PHASE_04.md), [TASK-0201](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/PlatformRequests.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [platform-services.test.ts](../tests/unit/platform-services.test.ts), [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Define typed async platform service requests/results on Android/iOS/Web; validate external values and preserve operation IDs, cancellation and domain authority.

### Context
Bounded typed platform service requests deliverable. Authoritative output: `app/src/platform/PlatformRequests.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `tests/native/android-smoke.md` — dependency output
- `tests/native/ios-smoke.md` — dependency output

### Files expected to create
- `app/src/platform/PlatformRequests.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Define typed async platform service requests/results on Android/iOS/Web; validate external values and preserve operation IDs, cancellation and domain authority.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/platform/PlatformRequests.ts` through the smallest relevant RN/Skia/core/platform harness. Define typed async platform service requests/results on Android/iOS/Web; validate external values and preserve operation IDs, cancellation and domain authority. Record platform limitations separately.

### Acceptance criteria
- Define typed async platform service requests/results on Android/iOS/Web; validate external values and preserve operation IDs, cancellation and domain authority.
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


<a id="task-0205"></a>
## TASK-0205 — Platform request coordinator

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0204](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/RequestCoordinator.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [platform-services.test.ts](../tests/unit/platform-services.test.ts), [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Coordinate async platform operations using mount generations, operation IDs, timeout/cancellation and stale/duplicate-result rejection. Direct typed calls replace serialized host initialization.

### Context
Bounded platform request coordinator deliverable. Authoritative output: `app/src/platform/RequestCoordinator.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/PlatformRequests.ts` — dependency output

### Files expected to create
- `app/src/platform/RequestCoordinator.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Coordinate async platform operations using mount generations, operation IDs, timeout/cancellation and stale/duplicate-result rejection. Direct typed calls replace serialized host initialization.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/platform/RequestCoordinator.ts` through the smallest relevant RN/Skia/core/platform harness. Coordinate async platform operations using mount generations, operation IDs, timeout/cancellation and stale/duplicate-result rejection. Direct typed calls replace serialized host initialization. Record platform limitations separately.

### Acceptance criteria
- Coordinate async platform operations using mount generations, operation IDs, timeout/cancellation and stale/duplicate-result rejection. Direct typed calls replace serialized host initialization.
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


<a id="task-0206"></a>
## TASK-0206 — Native storage implementation

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0146](TASKS_PHASE_12.md), [TASK-0205](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/NativeSaveStore.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [ios-smoke.md](../tests/native/ios-smoke.md).

### Goal
Implement and measure app-private A/Bwrite/read/verify and account namespace on both hosts.

### Context
Bounded native storage implementation deliverable. Authoritative output: `app/src/platform/NativeSaveStore.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/RequestCoordinator.ts` — dependency output
- `app/src/platform/SaveStore.ts` — dependency output

### Files expected to create
- `app/src/platform/NativeSaveStore.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement and measure app-private A/Bwrite/read/verify and account namespace on both hosts.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/platform/NativeSaveStore.ts` through the smallest relevant RN/Skia/core/platform harness. Implement and measure app-private A/Bwrite/read/verify and account namespace on both hosts. Record platform limitations separately.

### Acceptance criteria
- Implement and measure app-private A/Bwrite/read/verify and account namespace on both hosts.
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


<a id="task-0207"></a>
## TASK-0207 — Application lifecycle and audio coordination

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0156](TASKS_PHASE_12.md), [TASK-0185](TASKS_PHASE_14.md), [TASK-0206](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/Lifecycle.ts. Integrate shared registries coherently.

Delivery classification: **SUPPORTING_REQUIRED**. Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [ios-smoke.md](../tests/native/ios-smoke.md).

### Goal
Coordinate AppState/visibility, save barriers, ticks and audio focus exactly once; reject stale completion after unmount and resume one reconciliation.

### Context
Bounded application lifecycle and audio coordination deliverable. Authoritative output: `app/src/platform/Lifecycle.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/NativeSaveStore.ts` — dependency output

### Files expected to create
- `app/src/platform/Lifecycle.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Coordinate AppState/visibility, save barriers, ticks and audio focus exactly once; reject stale completion after unmount and resume one reconciliation.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/platform/Lifecycle.ts` through the smallest relevant RN/Skia/core/platform harness. Coordinate AppState/visibility, save barriers, ticks and audio focus exactly once; reject stale completion after unmount and resume one reconciliation. Record platform limitations separately.

### Acceptance criteria
- Coordinate AppState/visibility, save barriers, ticks and audio focus exactly once; reject stale completion after unmount and resume one reconciliation.
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


<a id="task-0208"></a>
## TASK-0208 — Deep-link notification routing

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0128](TASKS_PHASE_11.md), [TASK-0129](TASKS_PHASE_11.md), [TASK-0207](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/navigation/ExternalRoutes.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

Current delivery scope: Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system.

### Context
Bounded deep-link notification routing deliverable. Authoritative output: `app/src/navigation/ExternalRoutes.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/Lifecycle.ts` — dependency output

### Files expected to create
- `app/src/navigation/ExternalRoutes.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/navigation/ExternalRoutes.ts` through the smallest relevant RN/Skia/core/platform harness. Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system. Record platform limitations separately.

### Acceptance criteria
- Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system.
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


<a id="task-0209"></a>
## TASK-0209 — Analytics decision

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0201](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of docs/technical/21_ANALYTICS_EVENTS.md. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Validate AppMetrica consent/data-minimization/retention and pinned RN/Expo integration; source the project UUID from app-specific TZ,never the shared example or package label.

### Context
Bounded analytics decision deliverable. Authoritative output: `docs/technical/21_ANALYTICS_EVENTS.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/services.ts` — dependency output

### Files expected to create


### Files expected to modify
- `docs/technical/21_ANALYTICS_EVENTS.md`

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate AppMetrica consent/data-minimization/retention and pinned RN/Expo integration; source the project UUID from app-specific TZ,never the shared example or package label.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `docs/technical/21_ANALYTICS_EVENTS.md` through the smallest relevant RN/Skia/core/platform harness. Validate AppMetrica consent/data-minimization/retention and pinned RN/Expo integration; source the project UUID from app-specific TZ,never the shared example or package label. Record platform limitations separately.

### Acceptance criteria
- Validate AppMetrica consent/data-minimization/retention and pinned RN/Expo integration; source the project UUID from app-specific TZ,never the shared example or package label.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: high. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-028 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0210"></a>
## TASK-0210 — Analytics adapter

Phase: 16 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0209](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/analytics/AnalyticsAdapter.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Integrate AppMetrica native plugin with project-specific build configuration,consent,bounded event queue and durable-event dedupe; keys/raw saves never enter logs.

### Context
Bounded analytics adapter deliverable. Authoritative output: `app/src/analytics/AnalyticsAdapter.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [21_ANALYTICS_EVENTS.md](../docs/technical/21_ANALYTICS_EVENTS.md)

### Files expected to create
- `app/src/analytics/AnalyticsAdapter.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Integrate AppMetrica native plugin with project-specific build configuration,consent,bounded event queue and durable-event dedupe; keys/raw saves never enter logs.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `app/src/analytics/AnalyticsAdapter.ts` through the smallest relevant RN/Skia/core/platform harness. Integrate AppMetrica native plugin with project-specific build configuration,consent,bounded event queue and durable-event dedupe; keys/raw saves never enter logs. Record platform limitations separately.

### Acceptance criteria
- Integrate AppMetrica native plugin with project-specific build configuration,consent,bounded event queue and durable-event dedupe; keys/raw saves never enter logs.
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


<a id="task-0211"></a>
## TASK-0211 — Native production lifecycle QA

Phase: 16 · Priority: P0 · Type: test · Status: NOT_STARTED

Dependencies: [TASK-0202](TASKS_PHASE_16.md), [TASK-0203](TASKS_PHASE_16.md), [TASK-0207](TASKS_PHASE_16.md), [TASK-0208](TASKS_PHASE_16.md), [TASK-0210](TASKS_PHASE_16.md), [TASK-0206](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/integration/native-production.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

Current delivery scope: One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks.

### Context
Bounded native production lifecycle qa deliverable. Authoritative output: `tests/integration/native-production.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/platform/Lifecycle.ts` — dependency output
- `app/src/navigation/ExternalRoutes.ts` — dependency output
- `app/src/analytics/AnalyticsAdapter.ts` — dependency output
- `app/src/platform/NativeSaveStore.ts` — dependency output

### Files expected to create
- `tests/integration/native-production.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `tests/integration/native-production.md` through the smallest relevant RN/Skia/core/platform harness. One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks. Record platform limitations separately.

### Acceptance criteria
- One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks.
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


<a id="task-0212"></a>
## TASK-0212 — Native build reproducibility

Phase: 16 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0202](TASKS_PHASE_16.md), [TASK-0203](TASKS_PHASE_16.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tooling/ci/native-builds.md. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. User-authorized six-hour candidate: preserve required runtime behavior in owning implementation and final smoke; defer standalone research/export/exhaustive QA or formal distribution ceremony.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Build both targets from clean checkout with pinned versions and artifact provenance; secrets remain external.

### Context
Bounded native build reproducibility deliverable. Authoritative output: `tooling/ci/native-builds.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `tests/integration/native-production.md` — dependency output

### Files expected to create
- `tooling/ci/native-builds.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Build both targets from clean checkout with pinned versions and artifact provenance; secrets remain external.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cold install; background during input/write; stale callback after route disposal; unavailable audio/storage; duplicate resume; process death.

### Test cases
Build and exercise the actual RN application on the task target; stale/duplicate async result, unmount, background/resume and failure preserve authoritative progress. Report Web/simulator/physical results separately.

### Manual verification
Exercise `tooling/ci/native-builds.md` through the smallest relevant RN/Skia/core/platform harness. Build both targets from clean checkout with pinned versions and artifact provenance; secrets remain external. Record platform limitations separately.

### Acceptance criteria
- Build both targets from clean checkout with pinned versions and artifact provenance; secrets remain external.
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

<a id="task-0258"></a>
## TASK-0258 — Start.io React Native rewarded provider

Phase: 16 · Priority: P0 · Type: implementation · Status: BLOCKED

Dependencies: [TASK-0201](TASKS_PHASE_16.md), [TASK-0254](TASKS_PHASE_11.md)

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

### Goal
Verify Start.io integration with pinned RN/Expo native builds and project IDs; expose rewarded completion only; disable banners,ordinary interstitials,automatic splash/return ads; web unavailable with debug-only fakes.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`app/src/platform/StartIoRewarded.ts`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Verify Start.io integration with pinned RN/Expo native builds and project IDs; expose rewarded completion only; disable banners,ordinary interstitials,automatic splash/return ads; web unavailable with debug-only fakes.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Verify Start.io integration with pinned RN/Expo native builds and project IDs; expose rewarded completion only; disable banners,ordinary interstitials,automatic splash/return ads; web unavailable with debug-only fakes. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Verify Start.io integration with pinned RN/Expo native builds and project IDs; expose rewarded completion only; disable banners,ordinary interstitials,automatic splash/return ads; web unavailable with debug-only fakes.
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

<a id="task-0259"></a>
## TASK-0259 — Rewarded native completion acceptance

Phase: 16 · Priority: P0 · Type: test · Status: BLOCKED

Dependencies: [TASK-0207](TASKS_PHASE_16.md), [TASK-0257](TASKS_PHASE_11.md), [TASK-0258](TASKS_PHASE_16.md)

Delivery classification: **REQUIRED_NOW**. Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Exercise completed/skip/no-fill/error/background/process-death/duplicate/wrong-placement on Android/iOS; prove no unconfirmed reward and no prohibited ad formats; unavailable cases remain NOT_RUN.

### Context
Bounded product requirement from the authoritative amendment.

### Source-of-truth docs
[05_PRODUCT_REQUIREMENTS_AMENDMENT.md](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [06_REWARDS.md](../docs/progression/06_REWARDS.md)

### Exact files to inspect first
- `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md`
- `docs/technical/18_PLATFORM_SERVICES.md`
- `docs/progression/06_REWARDS.md`

### Files expected to create
`tests/native/rewarded-ads.md`

### Files expected to modify
Named integration points and task evidence only.

### Implementation steps
1. Verify dependencies and source contract.
2. Exercise completed/skip/no-fill/error/background/process-death/duplicate/wrong-placement on Android/iOS; prove no unconfirmed reward and no prohibited ad formats; unavailable cases remain NOT_RUN.
3. Run meaningful success/failure checks.
4. Record evidence and commit accepted work.

### Edge cases
Cancellation,duplicate callback,stale operation,process restart,missing SDK or configuration,storage failure.

### Test cases
Exercise completed/skip/no-fill/error/background/process-death/duplicate/wrong-placement on Android/iOS; prove no unconfirmed reward and no prohibited ad formats; unavailable cases remain NOT_RUN. Test deterministic failure/retry and confirm actual outcomes before completion.

### Manual verification
Exercise real browser/native behavior as applicable; missing native execution is NOT_RUN.

### Acceptance criteria
- Exercise completed/skip/no-fill/error/background/process-death/duplicate/wrong-placement on Android/iOS; prove no unconfirmed reward and no prohibited ad formats; unavailable cases remain NOT_RUN.
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
