# PHASE 16 — React Native Platform Validation

## Goal
Harden both native hosts. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/technical/18_PLATFORM_SERVICES.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md) · [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md) · [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md) · [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

## Inputs
- [15_REACT_NATIVE_APPLICATION.md](../docs/technical/15_REACT_NATIVE_APPLICATION.md)
- [18_PLATFORM_SERVICES.md](../docs/technical/18_PLATFORM_SERVICES.md)
- [16_ANDROID_INTEGRATION.md](../docs/technical/16_ANDROID_INTEGRATION.md)
- [17_IOS_INTEGRATION.md](../docs/technical/17_IOS_INTEGRATION.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `package.json` — TASK-0047 predecessor
- `tests/integration/save-offline.md` — TASK-0157 predecessor
- `app/src/platform/SaveStore.ts` — TASK-0146 predecessor

## Outputs
- `app/src/platform/services.ts` — Production platform service composition
- `tests/native/android-smoke.md` — Android application build and smoke
- `tests/native/ios-smoke.md` — iOS application build and smoke
- `app/src/platform/PlatformRequests.ts` — Typed platform service requests
- `app/src/platform/RequestCoordinator.ts` — Platform request coordinator
- `app/src/platform/NativeSaveStore.ts` — Native storage implementation
- `app/src/platform/Lifecycle.ts` — Application lifecycle and audio coordination
- `app/src/navigation/ExternalRoutes.ts` — Deep-link notification routing
- `docs/technical/21_ANALYTICS_EVENTS.md` — Analytics decision
- `app/src/analytics/AnalyticsAdapter.ts` — Analytics adapter
- `tests/integration/native-production.md` — Native production lifecycle QA
- `tooling/ci/native-builds.md` — Native build reproducibility

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0047](../tasks/TASKS_PHASE_04.md) — React Native Expo application foundation
- [TASK-0157](../tasks/TASKS_PHASE_12.md) — Save offline acceptance
- [TASK-0146](../tasks/TASKS_PHASE_12.md) — Native save adapter contract

## Risks
Process recreation; account switch; stale generation; duplicate result; oversize payload; audio interruption. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 16.1

[TASK-0201](../tasks/TASKS_PHASE_16.md) — Production platform service composition. Compose shared RN storage,lifecycle,audio,haptics and AppMetrica plus rewarded-provider seams with loading/recovery states; preserve one game authority. Required predecessors: TASK-0047, TASK-0147.

### Step 16.2

[TASK-0202](../tasks/TASKS_PHASE_16.md) — Android application build and smoke. Build and install the actual Expo/RN application from pinned reproducible inputs; verify Skia screen, touch, Back and process restoration on Android. Record unavailable physical cases separately. Required predecessors: TASK-0201.

### Step 16.3

[TASK-0203](../tasks/TASKS_PHASE_16.md) — iOS application build and smoke. Build and install the actual Expo/RN application on iOS Simulator; verify shared Skia screen, touch, routes and AppState without retained subscriptions. Record physical-only cases separately. Required predecessors: TASK-0201.

### Step 16.4

[TASK-0204](../tasks/TASKS_PHASE_16.md) — Typed platform service requests. Define typed async platform service requests/results on Android/iOS/Web; validate external values and preserve operation IDs, cancellation and domain authority. Required predecessors: TASK-0052, TASK-0201.

### Step 16.5

[TASK-0205](../tasks/TASKS_PHASE_16.md) — Platform request coordinator. Coordinate async platform operations using mount generations, operation IDs, timeout/cancellation and stale/duplicate-result rejection. Direct typed calls replace serialized host initialization. Required predecessors: TASK-0204.

### Step 16.6

[TASK-0206](../tasks/TASKS_PHASE_16.md) — Native storage implementation. Implement and measure app-private A/Bwrite/read/verify and account namespace on both hosts. Required predecessors: TASK-0146, TASK-0205.

### Step 16.7

[TASK-0207](../tasks/TASKS_PHASE_16.md) — Application lifecycle and audio coordination. Coordinate AppState/visibility, save barriers, ticks and audio focus exactly once; reject stale completion after unmount and resume one reconciliation. Required predecessors: TASK-0156, TASK-0185, TASK-0206.

### Step 16.8

[TASK-0208](../tasks/TASKS_PHASE_16.md) — Deep-link notification routing. Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system. Required predecessors: TASK-0128, TASK-0129, TASK-0207.

### Step 16.9

[TASK-0209](../tasks/TASKS_PHASE_16.md) — Analytics decision. Validate AppMetrica consent/data-minimization/retention and pinned RN/Expo integration; source the project UUID from app-specific TZ,never the shared example or package label. Required predecessors: TASK-0201.

### Step 16.10

[TASK-0210](../tasks/TASKS_PHASE_16.md) — Analytics adapter. Integrate AppMetrica native plugin with project-specific build configuration,consent,bounded event queue and durable-event dedupe; keys/raw saves never enter logs. Required predecessors: TASK-0209.

### Step 16.11

[TASK-0211](../tasks/TASKS_PHASE_16.md) — Native production lifecycle QA. One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks. Required predecessors: TASK-0202, TASK-0203, TASK-0207, TASK-0208, TASK-0210, TASK-0206.

### Step 16.12

[TASK-0212](../tasks/TASKS_PHASE_16.md) — Native build reproducibility. Build both targets from clean checkout with pinned versions and artifact provenance; secrets remain external. Required predecessors: TASK-0202, TASK-0203.


[TASK-0258](../tasks/TASKS_PHASE_16.md) — Start.io React Native rewarded provider. Verify Start.io integration with pinned RN/Expo native builds and project IDs; expose rewarded completion only; disable banners,ordinary interstitials,automatic splash/return ads; web unavailable with debug-only fakes. Required predecessors: TASK-0201, TASK-0254.


[TASK-0259](../tasks/TASKS_PHASE_16.md) — Rewarded native completion acceptance. Exercise completed/skip/no-fill/error/background/process-death/duplicate/wrong-placement on Android/iOS; prove no unconfirmed reward and no prohibited ad formats; unavailable cases remain NOT_RUN. Required predecessors: TASK-0207, TASK-0257, TASK-0258.

## Files/directories expected to be created
- `app/src/platform/services.ts`
- `tests/native/android-smoke.md`
- `tests/native/ios-smoke.md`
- `app/src/platform/PlatformRequests.ts`
- `app/src/platform/RequestCoordinator.ts`
- `app/src/platform/NativeSaveStore.ts`
- `app/src/platform/Lifecycle.ts`
- `app/src/navigation/ExternalRoutes.ts`
- `docs/technical/21_ANALYTICS_EVENTS.md`
- `app/src/analytics/AnalyticsAdapter.ts`
- `tests/integration/native-production.md`
- `tooling/ci/native-builds.md`

- `app/src/platform/StartIoRewarded.ts`

- `tests/native/rewarded-ads.md`

## Existing files expected to be modified

- [21_ANALYTICS_EVENTS.md](../docs/technical/21_ANALYTICS_EVENTS.md)

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Use UT022 and IT004/008/011;50reopen cycles and process-death cases on both native hosts. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

## Manual validation procedure
Open each output from this phase, reproduce its named input/scenario, compare expected/actual behavior and retain evidence. For interactive outputs exercise success,disabled/locked,pending,error and interrupted states; for research verify source/time/version and uncertainty.

## Performance checks
Measure any changed native/render/storage hot path against [budgets](../docs/technical/14_PERFORMANCE_BUDGET.md). Documentation/research-only outputs need reproducible generation and bounded artifact size; they cannot claim runtime performance pass.

## Visual checks
Use source screen IDs and [visual protocol](../docs/qa/05_VISUAL_REGRESSION.md) for rendered outputs. Keep exact Figma and15-slot adaptation baselines separate. Nonvisual outputs need readable evidence/diagnostics, not screenshot-only assertions.

## Android checks
For native/runtime changes run relevant device/harness cases and attach actual build/OS results. Pure-domain/research tasks use platform-independent tests; Android acceptance remains in native/device tasks and is never inferred from web.

## iOS checks
Run equivalent native cases or record the precise environment blocker. Simulator success does not substitute for physical audio/performance. No Android-only result closes a both-platform gate.

## Web-preview checks
Use the same RN/Skia/core implementation with deterministic fixtures. Verify preview-specific storage/audio unlock and viewport behavior where affected; Web and native share gameplay, assets and Skia composition.

## Failure/rollback strategy
Keep prior valid source/config/save generation. Revert only the bounded implementation changes on its branch, preserving user edits and captured evidence. Failed durable commands retain old state; failed schema migration preserves backup; failed native checks remain open in their owning tasks and gate release.

## Definition of Done
All in-scope task oracles pass; artifacts,source docs,schemas and tests agree; evidence links resolve; no task hides unresolved work behind a generic TODO. Optional excludedP2work is explicitly classified.

## Exit criteria
Dependent tasks can consume the listed outputs with named versions and accepted gates. Release/runtime feasibility is claimed only where actual execution evidence exists. Update task manifest and phase result with accepted/not-run/blocked distinctions.

## Tasks generated from this phase
- [TASK-0201](../tasks/TASKS_PHASE_16.md) — Production platform service composition
- [TASK-0202](../tasks/TASKS_PHASE_16.md) — Android application build and smoke
- [TASK-0203](../tasks/TASKS_PHASE_16.md) — iOS application build and smoke
- [TASK-0204](../tasks/TASKS_PHASE_16.md) — Typed platform service requests
- [TASK-0205](../tasks/TASKS_PHASE_16.md) — Platform request coordinator
- [TASK-0206](../tasks/TASKS_PHASE_16.md) — Native storage implementation
- [TASK-0207](../tasks/TASKS_PHASE_16.md) — Application lifecycle and audio coordination
- [TASK-0208](../tasks/TASKS_PHASE_16.md) — Deep-link notification routing
- [TASK-0209](../tasks/TASKS_PHASE_16.md) — Analytics decision
- [TASK-0210](../tasks/TASKS_PHASE_16.md) — Analytics adapter
- [TASK-0211](../tasks/TASKS_PHASE_16.md) — Native production lifecycle QA
- [TASK-0212](../tasks/TASKS_PHASE_16.md) — Native build reproducibility

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0202: REQUIRED_NOW.
- TASK-0203: REQUIRED_NOW.
- TASK-0208: REQUIRED_NOW.
- TASK-0209: REQUIRED_NOW.
- TASK-0210: REQUIRED_NOW.
- TASK-0258: REQUIRED_NOW.
- TASK-0259: REQUIRED_NOW.
- TASK-0201: SUPPORTING_REQUIRED.
- TASK-0204: SUPPORTING_REQUIRED.
- TASK-0205: SUPPORTING_REQUIRED.
- TASK-0206: SUPPORTING_REQUIRED.
- TASK-0207: SUPPORTING_REQUIRED.
- TASK-0211: DEFERRED_POST_DELIVERY.
- TASK-0212: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
