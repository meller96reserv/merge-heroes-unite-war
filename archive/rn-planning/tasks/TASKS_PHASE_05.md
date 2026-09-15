# Atomic tasks — phase 05

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_05_STATIC_VERTICAL_SLICE.md).

<a id="task-0055"></a>
## TASK-0055 — Board layout conflict review

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0030](TASKS_PHASE_02.md) — Asset import calibration · [TASK-0004](TASKS_PHASE_00.md) — Fidelity gate registry

Parallelization: Allowed after listed dependencies; exclusive ownership of analysis/figma/board_layout_decision.md. Integrate shared registries coherently.

Evidence: [board_layout_decision.md](../analysis/figma/board_layout_decision.md).

### Goal
Compare exact10-slot Figma fixture with15-slot gameplay adaptation at430x932/360x640; approve44point targets and HUD clearance.

### Context
Bounded board layout conflict review deliverable. Authoritative output: `analysis/figma/board_layout_decision.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- [import_calibration.json](../analysis/figma/import_calibration.json)
- [fidelity_gates.json](../analysis/reports/fidelity_gates.json)

### Files expected to create
- `analysis/figma/board_layout_decision.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Compare exact10-slot Figma fixture with15-slot gameplay adaptation at430x932/360x640; approve44point targets and HUD clearance.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `analysis/figma/board_layout_decision.md` through the smallest relevant RN/Skia/core/platform harness. Compare exact10-slot Figma fixture with15-slot gameplay adaptation at430x932/360x640; approve44point targets and HUD clearance. Record platform limitations separately.

### Acceptance criteria
- Compare exact10-slot Figma fixture with15-slot gameplay adaptation at430x932/360x640; approve44point targets and HUD clearance.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
Exact-parity verification remains assigned to TASK-0022. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0056"></a>
## TASK-0056 — Design token import

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0049](TASKS_PHASE_04.md) — Shared Skia game surface · [TASK-0029](TASKS_PHASE_02.md) — Font acquisition

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/DesignTokens.ts. Integrate shared registries coherently.

Evidence: [tokens.tap](../analysis/reports/ui-foundation/tokens.tap).

### Goal
Import measured colors,type/spacing tokens and explicit proposed motion tokens without balance text reuse.

### Context
Bounded design token import deliverable. Authoritative output: `app/src/ui/DesignTokens.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/README.md` — dependency output
- [font_ownership.csv](../analysis/figma/font_ownership.csv)

### Files expected to create
- `app/src/ui/DesignTokens.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Import measured colors,type/spacing tokens and explicit proposed motion tokens without balance text reuse.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/ui/DesignTokens.ts` through the smallest relevant RN/Skia/core/platform harness. Import measured colors,type/spacing tokens and explicit proposed motion tokens without balance text reuse. Record platform limitations separately.

### Acceptance criteria
- Import measured colors,type/spacing tokens and explicit proposed motion tokens without balance text reuse.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0057"></a>
## TASK-0057 — Responsive canvas anchors

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0056](TASKS_PHASE_05.md) — Design token import · [TASK-0055](TASKS_PHASE_05.md) — Board layout conflict review

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/ResponsiveLayout.ts. Integrate shared registries coherently.

Evidence: [layout.tap](../analysis/reports/ui-foundation/layout.tap), [anchors.json](../analysis/reports/ui-foundation/anchors.json).

### Goal
Apply safe area and portrait aspect policy at five required viewports; record anchor measurements.

### Context
Bounded responsive canvas anchors deliverable. Authoritative output: `app/src/ui/ResponsiveLayout.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/DesignTokens.ts` — dependency output
- `analysis/figma/board_layout_decision.md` — dependency output

### Files expected to create
- `app/src/ui/ResponsiveLayout.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Apply safe area and portrait aspect policy at five required viewports; record anchor measurements.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/ui/ResponsiveLayout.ts` through the smallest relevant RN/Skia/core/platform harness. Apply safe area and portrait aspect policy at five required viewports; record anchor measurements. Record platform limitations separately.

### Acceptance criteria
- Apply safe area and portrait aspect policy at five required viewports; record anchor measurements.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0058"></a>
## TASK-0058 — Reusable button states

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0057](TASKS_PHASE_05.md) — Responsive canvas anchors · [TASK-0035](TASKS_PHASE_02.md) — Button state asset review

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/GameButton.ts. Integrate shared registries coherently.

Evidence: [button-interaction.json](../analysis/reports/ui-foundation/button-interaction.json), [button-states.png](../analysis/reports/ui-foundation/button-states.png).

### Goal
Implement normal pressed disabled loading selected locked visuals and one input owner.

### Context
Bounded reusable button states deliverable. Authoritative output: `app/src/ui/GameButton.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/ResponsiveLayout.ts` — dependency output
- `analysis/figma/button_state_decisions.csv` — dependency output

### Files expected to create
- `app/src/ui/GameButton.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement normal pressed disabled loading selected locked visuals and one input owner.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/ui/GameButton.ts` through the smallest relevant RN/Skia/core/platform harness. Implement normal pressed disabled loading selected locked visuals and one input owner. Record platform limitations separately.

### Acceptance criteria
- Implement normal pressed disabled loading selected locked visuals and one input owner.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0059"></a>
## TASK-0059 — Currency and stage HUD fixture

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0058](TASKS_PHASE_05.md) — Reusable button states · [TASK-0034](TASKS_PHASE_02.md) — Sprite registry validation · [TASK-0054](TASKS_PHASE_04.md) — Web fixture harness

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/Hud.tsx. Integrate shared registries coherently.

Evidence: [README.md](../analysis/reports/battle-screen/README.md), [visual-check.json](../analysis/reports/battle-screen/visual-check.json), [fast-refresh.json](../analysis/reports/battle-screen/fast-refresh.json).

### Goal
Reconstruct measured HUD positions and stage health with injected Figma text; exact values remain fixture-only.

### Context
Bounded currency and stage hud fixture deliverable. Authoritative output: `app/src/components/Hud.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/Hud.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Reconstruct measured HUD positions and stage health with injected Figma text; exact values remain fixture-only.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/Hud.tsx` through the smallest relevant RN/Skia/core/platform harness. Reconstruct measured HUD positions and stage health with injected Figma text; exact values remain fixture-only. Record platform limitations separately.

### Acceptance criteria
- Reconstruct measured HUD positions and stage health with injected Figma text; exact values remain fixture-only.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0060"></a>
## TASK-0060 — Board and battle static fixture

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0058](TASKS_PHASE_05.md) — Reusable button states · [TASK-0034](TASKS_PHASE_02.md) — Sprite registry validation · [TASK-0054](TASKS_PHASE_04.md) — Web fixture harness

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/BattleBoard.tsx. Integrate shared registries coherently.

Evidence: [README.md](../analysis/reports/battle-screen/README.md), [visual-check.json](../analysis/reports/battle-screen/visual-check.json).

### Goal
Render Figma ground/heroes/slots plus separate15-slot adaptation using calibrated feet and source art.

### Context
Bounded board and battle static fixture deliverable. Authoritative output: `app/src/components/BattleBoard.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/BattleBoard.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Render Figma ground/heroes/slots plus separate15-slot adaptation using calibrated feet and source art.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/BattleBoard.tsx` through the smallest relevant RN/Skia/core/platform harness. Render Figma ground/heroes/slots plus separate15-slot adaptation using calibrated feet and source art. Record platform limitations separately.

### Acceptance criteria
- Render Figma ground/heroes/slots plus separate15-slot adaptation using calibrated feet and source art.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0061"></a>
## TASK-0061 — Bottom navigation fixture

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0058](TASKS_PHASE_05.md) — Reusable button states · [TASK-0034](TASKS_PHASE_02.md) — Sprite registry validation · [TASK-0054](TASKS_PHASE_04.md) — Web fixture harness

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/BottomNavigation.tsx. Integrate shared registries coherently.

Evidence: [README.md](../analysis/reports/battle-screen/README.md), [press-feedback.json](../analysis/reports/battle-screen/press-feedback.json).

### Goal
Reconstruct five79x80tabs at source anchors with selected/locked states and safe-area protection.

### Context
Bounded bottom navigation fixture deliverable. Authoritative output: `app/src/components/BottomNavigation.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/BottomNavigation.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Reconstruct five79x80tabs at source anchors with selected/locked states and safe-area protection.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/BottomNavigation.tsx` through the smallest relevant RN/Skia/core/platform harness. Reconstruct five79x80tabs at source anchors with selected/locked states and safe-area protection. Record platform limitations separately.

### Acceptance criteria
- Reconstruct five79x80tabs at source anchors with selected/locked states and safe-area protection.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0062"></a>
## TASK-0062 — Loading start maintenance fixtures

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md), [TASK-0058](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/BootPanels.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md).

### Goal
Build SCREEN001/002/012 loading/progress/error/retry and LET'S PLAY; clickable Terms/Privacy and menu music after permitted audio activation; no flattened interactive screen.

### Context
Bounded loading start maintenance fixtures deliverable. Authoritative output: `app/src/components/BootPanels.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/BootPanels.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Build SCREEN001/002/012 loading/progress/error/retry and LET'S PLAY; clickable Terms/Privacy and menu music after permitted audio activation; no flattened interactive screen.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/BootPanels.tsx` through the smallest relevant RN/Skia/core/platform harness. Build SCREEN001/002/012 loading/progress/error/retry and LET'S PLAY; clickable Terms/Privacy and menu music after permitted audio activation; no flattened interactive screen. Record platform limitations separately.

### Acceptance criteria
- Build SCREEN001/002/012 loading/progress/error/retry and LET'S PLAY; clickable Terms/Privacy and menu music after permitted audio activation; no flattened interactive screen.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0063"></a>
## TASK-0063 — Hero equipment static fixture

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md), [TASK-0058](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/HeroEquipmentPanel.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Match SCREEN004 six equipment positions,hero/stat/card hierarchy and scroll bounds.

### Context
Bounded hero equipment static fixture deliverable. Authoritative output: `app/src/components/HeroEquipmentPanel.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/HeroEquipmentPanel.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Match SCREEN004 six equipment positions,hero/stat/card hierarchy and scroll bounds.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/HeroEquipmentPanel.tsx` through the smallest relevant RN/Skia/core/platform harness. Match SCREEN004 six equipment positions,hero/stat/card hierarchy and scroll bounds. Record platform limitations separately.

### Acceptance criteria
- Match SCREEN004 six equipment positions,hero/stat/card hierarchy and scroll bounds.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0064"></a>
## TASK-0064 — Hero upgrades static fixture

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md), [TASK-0058](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/HeroUpgradesPanel.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [equipment.test.ts](../tests/unit/equipment.test.ts), [equipment-flow.py](../tests/browser/equipment-flow.py).

### Goal
Match SCREEN007 five named cards,stats,orb prices and clipped list behavior.

### Context
Bounded hero upgrades static fixture deliverable. Authoritative output: `app/src/components/HeroUpgradesPanel.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/HeroUpgradesPanel.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Match SCREEN007 five named cards,stats,orb prices and clipped list behavior.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/HeroUpgradesPanel.tsx` through the smallest relevant RN/Skia/core/platform harness. Match SCREEN007 five named cards,stats,orb prices and clipped list behavior. Record platform limitations separately.

### Acceptance criteria
- Match SCREEN007 five named cards,stats,orb prices and clipped list behavior.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0065"></a>
## TASK-0065 — Relic dungeon static fixtures

Phase: 05 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md), [TASK-0058](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/ExtendedModePanels.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [daily.test.ts](../tests/unit/daily.test.ts), [extended-modes.test.ts](../tests/unit/extended-modes.test.ts), [extended-flow.py](../tests/browser/extended-flow.py).

### Goal
Reconstruct SCREEN005/006 art-only fixtures; keep unverified mode actions disabled outside debug.

### Context
Bounded relic dungeon static fixtures deliverable. Authoritative output: `app/src/components/ExtendedModePanels.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/ExtendedModePanels.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Reconstruct SCREEN005/006 art-only fixtures; keep unverified mode actions disabled outside debug.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/ExtendedModePanels.tsx` through the smallest relevant RN/Skia/core/platform harness. Reconstruct SCREEN005/006 art-only fixtures; keep unverified mode actions disabled outside debug. Record platform limitations separately.

### Acceptance criteria
- Reconstruct SCREEN005/006 art-only fixtures; keep unverified mode actions disabled outside debug.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0066"></a>
## TASK-0066 — Daily reward static fixtures

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md), [TASK-0058](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/DailyRewardPanel.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

Evidence: [CANDIDATE_MILESTONES.md](../analysis/reports/CANDIDATE_MILESTONES.md), [daily.test.ts](../tests/unit/daily.test.ts), [extended-modes.test.ts](../tests/unit/extended-modes.test.ts), [extended-flow.py](../tests/browser/extended-flow.py).

### Goal
Match SCREEN008/009 chest and claim variants with explicit visual-only1000gold fixture.

### Context
Bounded daily reward static fixtures deliverable. Authoritative output: `app/src/components/DailyRewardPanel.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/DailyRewardPanel.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Match SCREEN008/009 chest and claim variants with explicit visual-only1000gold fixture.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/DailyRewardPanel.tsx` through the smallest relevant RN/Skia/core/platform harness. Match SCREEN008/009 chest and claim variants with explicit visual-only1000gold fixture. Record platform limitations separately.

### Acceptance criteria
- Match SCREEN008/009 chest and claim variants with explicit visual-only1000gold fixture.
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


<a id="task-0067"></a>
## TASK-0067 — Settings static fixtures

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0058](TASKS_PHASE_05.md), [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/SettingsPanel.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/ui/MILESTONE.md).

### Goal
Match SCREEN010/011 sound/music and notification controls, permission-denied state, clickable Terms/Privacy and modal dimmer using acquired fonts.

### Context
Bounded settings static fixtures deliverable. Authoritative output: `app/src/components/SettingsPanel.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/SettingsPanel.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Match SCREEN010/011 sound/music and notification controls, permission-denied state, clickable Terms/Privacy and modal dimmer using acquired fonts.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/SettingsPanel.tsx` through the smallest relevant RN/Skia/core/platform harness. Match SCREEN010/011 sound/music and notification controls, permission-denied state, clickable Terms/Privacy and modal dimmer using acquired fonts. Record platform limitations separately.

### Acceptance criteria
- Match SCREEN010/011 sound/music and notification controls, permission-denied state, clickable Terms/Privacy and modal dimmer using acquired fonts.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0068"></a>
## TASK-0068 — Wheel static fixtures

Phase: 05 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0058](TASKS_PHASE_05.md), [TASK-0034](TASKS_PHASE_02.md), [TASK-0054](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/components/WheelPanel.tsx. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/wheel/MILESTONE.md).

### Goal
Build SCREEN013/014/015 twelve sectors, pointer,12-hour cooldown and entry/panel timers; pulsing Tap entry and Watch & Claim result state.

### Context
Bounded wheel static fixtures deliverable. Authoritative output: `app/src/components/WheelPanel.tsx`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[Product amendment](../docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `app/src/ui/GameButton.ts` — dependency output
- `tooling/assets/validate-registry.ts` — dependency output
- `app/src/debug/FixtureHarness.ts` — dependency output

### Files expected to create
- `app/src/components/WheelPanel.tsx`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Build SCREEN013/014/015 twelve sectors, pointer,12-hour cooldown and entry/panel timers; pulsing Tap entry and Watch & Claim result state.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `app/src/components/WheelPanel.tsx` through the smallest relevant RN/Skia/core/platform harness. Build SCREEN013/014/015 twelve sectors, pointer,12-hour cooldown and entry/panel timers; pulsing Tap entry and Watch & Claim result state. Record platform limitations separately.

### Acceptance criteria
- Build SCREEN013/014/015 twelve sectors, pointer,12-hour cooldown and entry/panel timers; pulsing Tap entry and Watch & Claim result state.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0069"></a>
## TASK-0069 — Static golden comparison

Phase: 05 · Priority: P0 · Type: implementation · Status: NOT_STARTED

Dependencies: [TASK-0059](TASKS_PHASE_05.md), [TASK-0060](TASKS_PHASE_05.md), [TASK-0061](TASKS_PHASE_05.md), [TASK-0062](TASKS_PHASE_05.md), [TASK-0063](TASKS_PHASE_05.md), [TASK-0064](TASKS_PHASE_05.md), [TASK-0065](TASKS_PHASE_05.md), [TASK-0066](TASKS_PHASE_05.md), [TASK-0067](TASKS_PHASE_05.md), [TASK-0068](TASKS_PHASE_05.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tooling/visual/compare-static.ts. Integrate shared registries coherently.

Delivery classification: **DEFERRED_POST_DELIVERY**. Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in TASK-0224.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Candidate execution override: Required runtime checks belong to the implementation milestone/final smoke; standalone deferred specifications remain preserved. [Current policy](../plans/DELIVERY_CANDIDATE_MODE.md).

### Goal
Capture all15source fixtures and report overlay/diff/anchor errors with separate gameplayAdapted baseline.

### Context
Bounded static golden comparison deliverable. Authoritative output: `tooling/visual/compare-static.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md) · [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [12_UI_LAYOUT_SPEC.md](../docs/12_UI_LAYOUT_SPEC.md)
- [09_SCREEN_CATALOG.md](../docs/09_SCREEN_CATALOG.md)
- `app/src/components/Hud.tsx` — dependency output
- `app/src/components/BattleBoard.tsx` — dependency output
- `app/src/components/BottomNavigation.tsx` — dependency output
- `app/src/components/BootPanels.tsx` — dependency output
- `app/src/components/HeroEquipmentPanel.tsx` — dependency output
- `app/src/components/HeroUpgradesPanel.tsx` — dependency output
- `app/src/components/ExtendedModePanels.tsx` — dependency output
- `app/src/components/DailyRewardPanel.tsx` — dependency output
- `app/src/components/SettingsPanel.tsx` — dependency output
- `app/src/components/WheelPanel.tsx` — dependency output

### Files expected to create
- `tooling/visual/compare-static.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Capture all15source fixtures and report overlay/diff/anchor errors with separate gameplayAdapted baseline.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.

### Test cases
Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.

### Manual verification
Exercise `tooling/visual/compare-static.ts` through the smallest relevant RN/Skia/core/platform harness. Capture all15source fixtures and report overlay/diff/anchor errors with separate gameplayAdapted baseline. Record platform limitations separately.

### Acceptance criteria
- Capture all15source fixtures and report overlay/diff/anchor errors with separate gameplayAdapted baseline.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
M · Risk: low. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope. [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
