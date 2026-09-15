# PHASE 05 — Static Vertical Slice

## Goal
Reconstruct Figma components and responsive fixtures. Deliver only the bounded outputs listed below.

## Why this phase exists
docs/12_UI_LAYOUT_SPEC.md defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)

## Inputs
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `analysis/figma/import_calibration.json` — TASK-0030 predecessor
- `analysis/reports/fidelity_gates.json` — TASK-0004 predecessor
- `app/README.md` — TASK-0049 predecessor
- `analysis/figma/font_ownership.csv` — TASK-0029 predecessor
- `analysis/figma/button_state_decisions.csv` — TASK-0035 predecessor
- `tooling/assets/validate-registry.ts` — TASK-0034 predecessor
- `app/src/debug/FixtureHarness.ts` — TASK-0054 predecessor

## Outputs
- `analysis/figma/board_layout_decision.md` — Board layout conflict review
- `app/src/ui/DesignTokens.ts` — Design token import
- `app/src/ui/ResponsiveLayout.ts` — Responsive canvas anchors
- `app/src/ui/GameButton.ts` — Reusable button states
- `app/src/components/Hud.tsx` — Currency and stage HUD fixture
- `app/src/components/BattleBoard.tsx` — Board and battle static fixture
- `app/src/components/BottomNavigation.tsx` — Bottom navigation fixture
- `app/src/components/BootPanels.tsx` — Loading start maintenance fixtures
- `app/src/components/HeroEquipmentPanel.tsx` — Hero equipment static fixture
- `app/src/components/HeroUpgradesPanel.tsx` — Hero upgrades static fixture
- `app/src/components/ExtendedModePanels.tsx` — Relic dungeon static fixtures
- `app/src/components/DailyRewardPanel.tsx` — Daily reward static fixtures
- `app/src/components/SettingsPanel.tsx` — Settings static fixtures
- `app/src/components/WheelPanel.tsx` — Wheel static fixtures
- `tooling/visual/compare-static.ts` — Static golden comparison

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies
- [TASK-0030](../tasks/TASKS_PHASE_02.md) — Asset import calibration
- [TASK-0004](../tasks/TASKS_PHASE_00.md) — Fidelity gate registry
- [TASK-0049](../tasks/TASKS_PHASE_04.md) — Shared Skia game surface
- [TASK-0029](../tasks/TASKS_PHASE_02.md) — Font acquisition
- [TASK-0035](../tasks/TASKS_PHASE_02.md) — Button state asset review
- [TASK-0034](../tasks/TASKS_PHASE_02.md) — Sprite registry validation
- [TASK-0054](../tasks/TASKS_PHASE_04.md) — Web fixture harness

## Risks
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change. Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/platform-service/save boundaries. Production follows accepted ADR-007; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence
### Step 05.1

[TASK-0055](../tasks/TASKS_PHASE_05.md) — Board layout conflict review. Compare exact10-slot Figma fixture with15-slot gameplay adaptation at430x932/360x640; approve44point targets and HUD clearance. Required predecessors: TASK-0030, TASK-0004.

### Step 05.2

[TASK-0056](../tasks/TASKS_PHASE_05.md) — Design token import. Import measured colors,type/spacing tokens and explicit proposed motion tokens without balance text reuse. Required predecessors: TASK-0049, TASK-0029.

### Step 05.3

[TASK-0057](../tasks/TASKS_PHASE_05.md) — Responsive canvas anchors. Apply safe area and portrait aspect policy at five required viewports; record anchor measurements. Required predecessors: TASK-0056, TASK-0055.

### Step 05.4

[TASK-0058](../tasks/TASKS_PHASE_05.md) — Reusable button states. Implement normal pressed disabled loading selected locked visuals and one input owner. Required predecessors: TASK-0057, TASK-0035.

### Step 05.5

[TASK-0059](../tasks/TASKS_PHASE_05.md) — Currency and stage HUD fixture. Reconstruct measured HUD positions and stage health with injected Figma text; exact values remain fixture-only. Required predecessors: TASK-0058, TASK-0034, TASK-0054.

### Step 05.6

[TASK-0060](../tasks/TASKS_PHASE_05.md) — Board and battle static fixture. Render Figma ground/heroes/slots plus separate15-slot adaptation using calibrated feet and source art. Required predecessors: TASK-0058, TASK-0034, TASK-0054.

### Step 05.7

[TASK-0061](../tasks/TASKS_PHASE_05.md) — Bottom navigation fixture. Reconstruct five79x80tabs at source anchors with selected/locked states and safe-area protection. Required predecessors: TASK-0058, TASK-0034, TASK-0054.

### Step 05.8

[TASK-0062](../tasks/TASKS_PHASE_05.md) — Loading start maintenance fixtures. Build SCREEN001/002/012 loading/progress/error/retry and LET'S PLAY; clickable Terms/Privacy and menu music after permitted audio activation; no flattened interactive screen. Required predecessors: TASK-0034, TASK-0054, TASK-0058.

### Step 05.9

[TASK-0063](../tasks/TASKS_PHASE_05.md) — Hero equipment static fixture. Match SCREEN004 six equipment positions,hero/stat/card hierarchy and scroll bounds. Required predecessors: TASK-0034, TASK-0054, TASK-0058.

### Step 05.10

[TASK-0064](../tasks/TASKS_PHASE_05.md) — Hero upgrades static fixture. Match SCREEN007 five named cards,stats,orb prices and clipped list behavior. Required predecessors: TASK-0034, TASK-0054, TASK-0058.

### Step 05.11

[TASK-0065](../tasks/TASKS_PHASE_05.md) — Relic dungeon static fixtures. Reconstruct SCREEN005/006 art-only fixtures; keep unverified mode actions disabled outside debug. Required predecessors: TASK-0034, TASK-0054, TASK-0058.

### Step 05.12

[TASK-0066](../tasks/TASKS_PHASE_05.md) — Daily reward static fixtures. Match SCREEN008/009 chest and claim variants with explicit visual-only1000gold fixture. Required predecessors: TASK-0034, TASK-0054, TASK-0058.

### Step 05.13

[TASK-0067](../tasks/TASKS_PHASE_05.md) — Settings static fixtures. Match SCREEN010/011 sound/music and notification controls, permission-denied state, clickable Terms/Privacy and modal dimmer using acquired fonts. Required predecessors: TASK-0058, TASK-0034, TASK-0054.

### Step 05.14

[TASK-0068](../tasks/TASKS_PHASE_05.md) — Wheel static fixtures. Build SCREEN013/014/015 twelve sectors, pointer,12-hour cooldown and entry/panel timers; pulsing Tap entry and Watch & Claim result state. Required predecessors: TASK-0058, TASK-0034, TASK-0054.

### Step 05.15

[TASK-0069](../tasks/TASKS_PHASE_05.md) — Static golden comparison. Capture all15source fixtures and report overlay/diff/anchor errors with separate gameplayAdapted baseline. Required predecessors: TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068.

## Files/directories expected to be created
- `analysis/figma/board_layout_decision.md`
- `app/src/ui/DesignTokens.ts`
- `app/src/ui/ResponsiveLayout.ts`
- `app/src/ui/GameButton.ts`
- `app/src/components/Hud.tsx`
- `app/src/components/BattleBoard.tsx`
- `app/src/components/BottomNavigation.tsx`
- `app/src/components/BootPanels.tsx`
- `app/src/components/HeroEquipmentPanel.tsx`
- `app/src/components/HeroUpgradesPanel.tsx`
- `app/src/components/ExtendedModePanels.tsx`
- `app/src/components/DailyRewardPanel.tsx`
- `app/src/components/SettingsPanel.tsx`
- `app/src/components/WheelPanel.tsx`
- `tooling/visual/compare-static.ts`

## Existing files expected to be modified

No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.

## Data migrations if any
No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.

## Tests required
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state. Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

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
- [TASK-0055](../tasks/TASKS_PHASE_05.md) — Board layout conflict review
- [TASK-0056](../tasks/TASKS_PHASE_05.md) — Design token import
- [TASK-0057](../tasks/TASKS_PHASE_05.md) — Responsive canvas anchors
- [TASK-0058](../tasks/TASKS_PHASE_05.md) — Reusable button states
- [TASK-0059](../tasks/TASKS_PHASE_05.md) — Currency and stage HUD fixture
- [TASK-0060](../tasks/TASKS_PHASE_05.md) — Board and battle static fixture
- [TASK-0061](../tasks/TASKS_PHASE_05.md) — Bottom navigation fixture
- [TASK-0062](../tasks/TASKS_PHASE_05.md) — Loading start maintenance fixtures
- [TASK-0063](../tasks/TASKS_PHASE_05.md) — Hero equipment static fixture
- [TASK-0064](../tasks/TASKS_PHASE_05.md) — Hero upgrades static fixture
- [TASK-0065](../tasks/TASKS_PHASE_05.md) — Relic dungeon static fixtures
- [TASK-0066](../tasks/TASKS_PHASE_05.md) — Daily reward static fixtures
- [TASK-0067](../tasks/TASKS_PHASE_05.md) — Settings static fixtures
- [TASK-0068](../tasks/TASKS_PHASE_05.md) — Wheel static fixtures
- [TASK-0069](../tasks/TASKS_PHASE_05.md) — Static golden comparison

## Current delivery scope

Only REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.
Original subsystem specifications remain available for deferred work.
[Authoritative classification and gate](DELIVERY_SCOPE.md).

- TASK-0062: REQUIRED_NOW.
- TASK-0063: REQUIRED_NOW.
- TASK-0064: REQUIRED_NOW.
- TASK-0065: REQUIRED_NOW.
- TASK-0066: REQUIRED_NOW.
- TASK-0067: REQUIRED_NOW.
- TASK-0068: REQUIRED_NOW.
- TASK-0069: DEFERRED_POST_DELIVERY.

Current [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.

[Six-hour candidate execution override](DELIVERY_CANDIDATE_MODE.md) governs grouped implementation and minimal checks.
