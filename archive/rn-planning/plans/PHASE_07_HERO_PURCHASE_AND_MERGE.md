# PHASE 07 — Hero Purchase And Merge

## Goal
Implement board purchase merge and deployment. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/gameplay/03_MERGE_SYSTEM.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md) · [merge.schema.json](../data-spec/merge.schema.json) · [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md)

## Inputs
- [03_MERGE_SYSTEM.md](../docs/gameplay/03_MERGE_SYSTEM.md)
- [merge.schema.json](../data-spec/merge.schema.json)
- [02_HERO_PURCHASE_SUMMON_SYSTEM.md](../docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [04_AUTO_MERGE_SYSTEM.md](../docs/gameplay/04_AUTO_MERGE_SYSTEM.md)
- [05_BOARD_SLOT_SYSTEM.md](../docs/gameplay/05_BOARD_SLOT_SYSTEM.md)
- `game-core/tests/unit/state-invariants.test.ts` — TASK-0079 predecessor
- `game-core/src/systems/TransactionCoordinator.ts` — TASK-0073 predecessor
- `analysis/reference/purchase_input_cases.csv` — TASK-0009 predecessor
- `app/src/input/InputRouter.ts` — TASK-0078 predecessor
- `game-core/src/systems/RewardService.ts` — TASK-0074 predecessor
- `analysis/reference/auto_unlock_capture.md` — TASK-0006 predecessor
- `app/src/components/BattleBoard.tsx` — TASK-0060 predecessor

## Outputs
- `game-core/src/model/Hero.ts` — Hero definition and instance model
- `game-core/src/model/Board.ts` — Board slot model
- `game-core/src/selectors/PurchaseQuote.ts` — Purchase quote selector
- `game-core/src/commands/PurchaseHero.ts` — Purchase hero transaction
- `app/src/input/PurchaseHold.ts` — Purchase hold controller
- `game-core/src/systems/MergeRules.ts` — Manual merge compatibility
- `game-core/src/commands/MergeHeroes.ts` — Manual merge transaction
- `game-core/src/commands/ActivateAutoMerge.ts` — Timed auto-merge entitlement
- `game-core/src/systems/AutoMergeSelector.ts` — Auto-merge pair selector
- `game-core/src/systems/AutoMergeSystem.ts` — Auto-merge cascade reducer
- `game-core/src/systems/DiscoveryService.ts` — Discovery reward command
- `game-core/src/commands/DeployHero.ts` — Deployment command
- `app/src/ui/BoardPresenter.ts` — Board input projection
- `game-core/tests/integration/purchase-merge.test.ts` — Purchase merge acceptance

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0079](../tasks/TASKS_PHASE_06.md) — State invariant tests
- [TASK-0073](../tasks/TASKS_PHASE_06.md) — Durable transaction coordinator
- [TASK-0009](../tasks/TASKS_PHASE_01.md) — Input purchase capture
- [TASK-0078](../tasks/TASKS_PHASE_06.md) — Input router
- [TASK-0074](../tasks/TASKS_PHASE_06.md) — Reward receipt service
- [TASK-0006](../tasks/TASKS_PHASE_01.md) — Auto-merge unlock capture
- [TASK-0060](../tasks/TASKS_PHASE_05.md) — Board and battle static fixture

## Risks
Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 07.1

[TASK-0081](../tasks/TASKS_PHASE_07.md) — Hero definition and instance model. Separate family/tier/visual definition from owned instance,slot,upgrade and deployment state. Required predecessors: TASK-0079.

### Step 07.2

[TASK-0082](../tasks/TASKS_PHASE_07.md) — Board slot model. Represent15logical slots with5initial open and explicit unlock IDs; reject duplicate occupancy. Required predecessors: TASK-0081.

### Step 07.3

[TASK-0083](../tasks/TASKS_PHASE_07.md) — Purchase quote selector. Read exact configured cost and capacity; expose insufficient/full/locked reasons without changing purchase count. Required predecessors: TASK-0082.

### Step 07.4

[TASK-0084](../tasks/TASKS_PHASE_07.md) — Purchase hero transaction. Atomically debit quoted cost,increment count and create one hero in deterministic free slot. Required predecessors: TASK-0083, TASK-0073.

### Step 07.5

[TASK-0085](../tasks/TASKS_PHASE_07.md) — Purchase hold controller. Schedule accepted repeat commands with cancel/up/background cleanup; no uncontrolled timer after pointer release. Required predecessors: TASK-0084, TASK-0009, TASK-0078.

### Step 07.6

[TASK-0086](../tasks/TASKS_PHASE_07.md) — Manual merge compatibility. Validate same configured family/tier or explicit pair,max tier and deployment policy before any consume. Required predecessors: TASK-0085.

### Step 07.7

[TASK-0087](../tasks/TASKS_PHASE_07.md) — Manual merge transaction. Consume source/target and create result at drop target in one durable transaction with discovery hook. Required predecessors: TASK-0086, TASK-0074.

### Step 07.8

[TASK-0088](../tasks/TASKS_PHASE_07.md) — Timed auto-merge entitlement. Reserve configured60-minute entitlement once,handle enable/disable/expiry and persist clock guard;development free grant is separate from disabled ad/payment providers. Required predecessors: TASK-0087, TASK-0006, TASK-0074.

### Step 07.9

[TASK-0089](../tasks/TASKS_PHASE_07.md) — Auto-merge pair selector. Implement only verified/configured policy with stable tie-break and unit cases for ambiguous boards. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default. Required predecessors: TASK-0088.

### Step 07.10

[TASK-0090](../tasks/TASKS_PHASE_07.md) — Auto-merge cascade reducer. Repeat pair selection with occupancy-bound termination and deterministic chain IDs; serialize with purchases. Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default. Required predecessors: TASK-0089, TASK-0006.

### Step 07.11

[TASK-0091](../tasks/TASKS_PHASE_07.md) — Discovery reward command. Mark discovered tier and reward token atomically; repeated-tier merge produces no discovery grant. Required predecessors: TASK-0090.

### Step 07.12

[TASK-0092](../tasks/TASKS_PHASE_07.md) — Deployment command. Enforce owned subset/cap and preserve board instance; withdrawal is idempotent. Required predecessors: TASK-0091.

### Step 07.13

[TASK-0093](../tasks/TASKS_PHASE_07.md) — Board input projection. Render drag targets,full/max/locked feedback and committed results; cancel gesture cannot mutate core. Required predecessors: TASK-0092, TASK-0060, TASK-0078.

### Step 07.14

[TASK-0094](../tasks/TASKS_PHASE_07.md) — Purchase merge acceptance. Exercise exact funds, full board, rapid input, cascade, max tier, deployed pair and interrupted presentation with deterministic storage success/failure fakes. Full save/offline integration remains TASK-0157. Required predecessors: TASK-0093, TASK-0091.

## Files/directories expected to be created
- `game-core/src/model/Hero.ts`
- `game-core/src/model/Board.ts`
- `game-core/src/selectors/PurchaseQuote.ts`
- `game-core/src/commands/PurchaseHero.ts`
- `app/src/input/PurchaseHold.ts`
- `game-core/src/systems/MergeRules.ts`
- `game-core/src/commands/MergeHeroes.ts`
- `game-core/src/commands/ActivateAutoMerge.ts`
- `game-core/src/systems/AutoMergeSelector.ts`
- `game-core/src/systems/AutoMergeSystem.ts`
- `game-core/src/systems/DiscoveryService.ts`
- `game-core/src/commands/DeployHero.ts`
- `app/src/ui/BoardPresenter.ts`
- `game-core/tests/integration/purchase-merge.test.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.

## Tests required
Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0081](../tasks/TASKS_PHASE_07.md) — Hero definition and instance model
- [TASK-0082](../tasks/TASKS_PHASE_07.md) — Board slot model
- [TASK-0083](../tasks/TASKS_PHASE_07.md) — Purchase quote selector
- [TASK-0084](../tasks/TASKS_PHASE_07.md) — Purchase hero transaction
- [TASK-0085](../tasks/TASKS_PHASE_07.md) — Purchase hold controller
- [TASK-0086](../tasks/TASKS_PHASE_07.md) — Manual merge compatibility
- [TASK-0087](../tasks/TASKS_PHASE_07.md) — Manual merge transaction
- [TASK-0088](../tasks/TASKS_PHASE_07.md) — Timed auto-merge entitlement
- [TASK-0089](../tasks/TASKS_PHASE_07.md) — Auto-merge pair selector
- [TASK-0090](../tasks/TASKS_PHASE_07.md) — Auto-merge cascade reducer
- [TASK-0091](../tasks/TASKS_PHASE_07.md) — Discovery reward command
- [TASK-0092](../tasks/TASKS_PHASE_07.md) — Deployment command
- [TASK-0093](../tasks/TASKS_PHASE_07.md) — Board input projection
- [TASK-0094](../tasks/TASKS_PHASE_07.md) — Purchase merge acceptance
