# PHASE 10 — Hero Progression And Equipment

## Goal
Implement owned items and hero upgrades. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/progression/10_EQUIPMENT.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md) · [equipment.schema.json](../data-spec/equipment.schema.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

## Inputs
- [10_EQUIPMENT.md](../docs/progression/10_EQUIPMENT.md)
- [equipment.schema.json](../data-spec/equipment.schema.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `tests/integration/save-offline.md` — TASK-0157 predecessor
- `app/src/components/HeroEquipmentPanel.tsx` — TASK-0063 predecessor
- `app/src/components/HeroUpgradesPanel.tsx` — TASK-0064 predecessor

## Outputs
- `game-core/src/model/Equipment.ts` — Equipment instance model
- `game-core/src/systems/EquipmentRules.ts` — Equipment slot compatibility
- `game-core/src/commands/EquipItem.ts` — Equip and swap transaction
- `game-core/src/commands/EnhanceItem.ts` — Equipment enhancement transaction
- `game-core/src/selectors/HeroStats.ts` — Hero stat aggregation
- `game-core/src/commands/UpgradeHero.ts` — Hero upgrade transaction
- `app/src/ui/EquipmentPanel.ts` — Equipment panel binding
- `app/src/ui/HeroUpgradesPanel.ts` — Hero upgrades panel binding
- `game-core/tests/integration/equipment.test.ts` — Equipment progression acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0157](../tasks/TASKS_PHASE_12.md) — Save offline acceptance
- [TASK-0063](../tasks/TASKS_PHASE_05.md) — Hero equipment static fixture
- [TASK-0064](../tasks/TASKS_PHASE_05.md) — Hero upgrades static fixture

## Risks
Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 10.1

[TASK-0119](../tasks/TASKS_PHASE_10.md) — Equipment instance model. Represent owned item IDs,slot type,level and optional owner; one item cannot be on two heroes. Required predecessors: TASK-0071, TASK-0073, TASK-0074.

### Step 10.2

[TASK-0120](../tasks/TASKS_PHASE_10.md) — Equipment slot compatibility. Validate allowed family/slot and ownership before equip; wrong slot rejects unchanged. Required predecessors: TASK-0119.

### Step 10.3

[TASK-0121](../tasks/TASKS_PHASE_10.md) — Equip and swap transaction. Atomically unequip prior item and bind new item with stable stats recomputation. Required predecessors: TASK-0120.

### Step 10.4

[TASK-0122](../tasks/TASKS_PHASE_10.md) — Equipment enhancement transaction. Debit configured cost and increment item level once; max/insufficient/pending cases reject correctly. Required predecessors: TASK-0121.

### Step 10.5

[TASK-0123](../tasks/TASKS_PHASE_10.md) — Hero stat aggregation. Combine base,tier,upgrade,item bonuses in documented order without double counting or overflow. Required predecessors: TASK-0122.

### Step 10.6

[TASK-0124](../tasks/TASKS_PHASE_10.md) — Hero upgrade transaction. Apply level cap,cost and stat change atomically; selected UI hero does not redirect stale request. Required predecessors: TASK-0123.

### Step 10.7

[TASK-0125](../tasks/TASKS_PHASE_10.md) — Equipment panel binding. Bind inventory/slots/selection and equip/unequip/loading/empty/locked/error states to commands. Required predecessors: TASK-0063, TASK-0124.

### Step 10.8

[TASK-0126](../tasks/TASKS_PHASE_10.md) — Hero upgrades panel binding. Show exact costs and affordable/max states across scroll/selection changes. Required predecessors: TASK-0064, TASK-0125.

### Step 10.9

[TASK-0127](../tasks/TASKS_PHASE_10.md) — Equipment progression acceptance. Test swap,unequip,upgrade cap,save failure,restart and repeated input with conserved ownership. Required predecessors: TASK-0126.

## Files/directories expected to be created
- `game-core/src/model/Equipment.ts`
- `game-core/src/systems/EquipmentRules.ts`
- `game-core/src/commands/EquipItem.ts`
- `game-core/src/commands/EnhanceItem.ts`
- `game-core/src/selectors/HeroStats.ts`
- `game-core/src/commands/UpgradeHero.ts`
- `app/src/ui/EquipmentPanel.ts`
- `app/src/ui/HeroUpgradesPanel.ts`
- `game-core/tests/integration/equipment.test.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0119](../tasks/TASKS_PHASE_10.md) — Equipment instance model
- [TASK-0120](../tasks/TASKS_PHASE_10.md) — Equipment slot compatibility
- [TASK-0121](../tasks/TASKS_PHASE_10.md) — Equip and swap transaction
- [TASK-0122](../tasks/TASKS_PHASE_10.md) — Equipment enhancement transaction
- [TASK-0123](../tasks/TASKS_PHASE_10.md) — Hero stat aggregation
- [TASK-0124](../tasks/TASKS_PHASE_10.md) — Hero upgrade transaction
- [TASK-0125](../tasks/TASKS_PHASE_10.md) — Equipment panel binding
- [TASK-0126](../tasks/TASKS_PHASE_10.md) — Hero upgrades panel binding
- [TASK-0127](../tasks/TASKS_PHASE_10.md) — Equipment progression acceptance

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0125: REQUIRED_NOW.
- TASK-0126: REQUIRED_NOW.
- TASK-0119: SUPPORTING_REQUIRED.
- TASK-0120: SUPPORTING_REQUIRED.
- TASK-0121: SUPPORTING_REQUIRED.
- TASK-0122: SUPPORTING_REQUIRED.
- TASK-0123: SUPPORTING_REQUIRED.
- TASK-0124: SUPPORTING_REQUIRED.
- TASK-0127: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
