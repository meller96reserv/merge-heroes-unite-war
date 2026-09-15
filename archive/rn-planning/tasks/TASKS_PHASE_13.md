# Atomic tasks — phase 13

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_13_ANIMATION_VFX_HAPTICS.md).

<a id="task-0158"></a>
## TASK-0158 — Motion art calibration

Phase: 13 · Priority: P0 · Type: research · Status: COMPLETED

Dependencies: [TASK-0030](TASKS_PHASE_02.md) — Asset import calibration

Parallelization: Allowed after listed dependencies; exclusive edit ownership for analysis/figma/motion_calibration.json. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [calibration.json](../analysis/reports/motion/calibration.json).

### Goal
Review flattened character feet,sockets and background layer limits; do not auto-cut limbs.

### Context
This is the bounded motion art calibration deliverable within deliver bounded expressive presentation. Its authoritative output is `analysis/figma/motion_calibration.json`; adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `analysis/figma/import_calibration.json` — future artifact from listed dependency

### Files expected to create

- `analysis/figma/motion_calibration.json`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `analysis/figma/motion_calibration.json`; unresolved reference behavior stays gated.
2. Review flattened character feet,sockets and background layer limits; do not auto-cut limbs.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Review flattened character feet,sockets and background layer limits; do not auto-cut limbs. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Review flattened character feet,sockets and background layer limits; do not auto-cut limbs.
- Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.
- Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
S · Risk: medium. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
U-026 [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).


<a id="task-0159"></a>
## TASK-0159 — Animation director

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0110](TASKS_PHASE_08.md) — Combat visual acceptance · [TASK-0158](TASKS_PHASE_13.md) — Motion art calibration

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/AnimationDirector.ts. Integrate shared registries coherently.

Evidence: [director.tap](../analysis/reports/motion/director.tap).

### Goal
Resolve profiles/events with priority,cancel-and-reconcile and reduced-motion mode.

### Context
Bounded animation director deliverable. Authoritative output: `app/src/presentation/AnimationDirector.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `tests/integration/combat-presentation.md` — dependency output
- `analysis/figma/motion_calibration.json` — dependency output

### Files expected to create
- `app/src/presentation/AnimationDirector.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Resolve profiles/events with priority,cancel-and-reconcile and reduced-motion mode.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/AnimationDirector.ts` through the smallest relevant RN/Skia/core/platform harness. Resolve profiles/events with priority,cancel-and-reconcile and reduced-motion mode. Record platform limitations separately.

### Acceptance criteria
- Resolve profiles/events with priority,cancel-and-reconcile and reduced-motion mode.
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


<a id="task-0160"></a>
## TASK-0160 — Presentation pool manager

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0159](TASKS_PHASE_13.md) — Animation director

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/EffectPool.ts. Integrate shared registries coherently.

Evidence: [pool.tap](../analysis/reports/motion/pool.tap).

### Goal
Bound acquire/release,reset callbacks/Skia resources/Reanimated values and guard reused effect generation.

### Context
Bounded presentation pool manager deliverable. Authoritative output: `app/src/presentation/EffectPool.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/AnimationDirector.ts` — dependency output

### Files expected to create
- `app/src/presentation/EffectPool.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Bound acquire/release,reset callbacks/Skia resources/Reanimated values and guard reused effect generation.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/EffectPool.ts` through the smallest relevant RN/Skia/core/platform harness. Bound acquire/release,reset callbacks/Skia resources/Reanimated values and guard reused effect generation. Record platform limitations separately.

### Acceptance criteria
- Bound acquire/release,reset callbacks/Skia resources/Reanimated values and guard reused effect generation.
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


<a id="task-0161"></a>
## TASK-0161 — Hero idle spawn profiles

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0160](TASKS_PHASE_13.md) — Presentation pool manager

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/HeroMotion.ts. Integrate shared registries coherently.

Evidence: [hero.tap](../analysis/reports/motion/hero.tap), [results.json](../analysis/reports/motion/hero/results.json).

### Goal
Implement grounded idle/spawn for10families and verify no clipping/foot drift.

### Context
Bounded hero idle spawn profiles deliverable. Authoritative output: `app/src/presentation/HeroMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/EffectPool.ts` — dependency output

### Files expected to create
- `app/src/presentation/HeroMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement grounded idle/spawn for10families and verify no clipping/foot drift.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/HeroMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Implement grounded idle/spawn for10families and verify no clipping/foot drift. Record platform limitations separately.

### Acceptance criteria
- Implement grounded idle/spawn for10families and verify no clipping/foot drift.
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


<a id="task-0162"></a>
## TASK-0162 — Hero attack hit profiles

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0161](TASKS_PHASE_13.md) — Hero idle spawn profiles

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/HeroCombatMotion.ts. Integrate shared registries coherently.

Evidence: [hero-combat.tap](../analysis/reports/motion/hero-combat.tap), [results.json](../analysis/reports/motion/attack/results.json).

Encounter replacement regression: [cause, fix and acceptance](../analysis/reports/motion/encounter-regression/README.md).

### Goal
Align anticipation/release/recovery with domain timestamps; hit cannot restart death.

### Context
Bounded hero attack hit profiles deliverable. Authoritative output: `app/src/presentation/HeroCombatMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/HeroMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/HeroCombatMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Align anticipation/release/recovery with domain timestamps; hit cannot restart death.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/HeroCombatMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Align anticipation/release/recovery with domain timestamps; hit cannot restart death. Record platform limitations separately.

### Acceptance criteria
- A surviving owned hero keeps attack motion across wave/boss encounter replacements; a reset attack counter must not produce a strike or suppress later attacks.
- Align anticipation/release/recovery with domain timestamps; hit cannot restart death.
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


<a id="task-0163"></a>
## TASK-0163 — Enemy boss profiles

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0162](TASKS_PHASE_13.md) — Hero attack hit profiles

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/EnemyMotion.ts. Integrate shared registries coherently.

Evidence: [enemy.tap](../analysis/reports/motion/enemy.tap), [results.json](../analysis/reports/motion/enemy/results.json).

### Goal
Implement spawn/hit/death and boss intro/death with pool teardown and skip behavior.

### Context
Bounded enemy boss profiles deliverable. Authoritative output: `app/src/presentation/EnemyMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- `app/src/presentation/HeroCombatMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/EnemyMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement spawn/hit/death and boss intro/death with pool teardown and skip behavior.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/EnemyMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Implement spawn/hit/death and boss intro/death with pool teardown and skip behavior. Record platform limitations separately.

### Acceptance criteria
- Implement spawn/hit/death and boss intro/death with pool teardown and skip behavior.
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


<a id="task-0164"></a>
## TASK-0164 — Merge convergence profile

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0163](TASKS_PHASE_13.md) — Enemy boss profiles

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/MergeMotion.ts. Integrate shared registries coherently.

Evidence: [merge.tap](../analysis/reports/motion/merge.tap), [results.json](../analysis/reports/motion/merge/results.json).

### Goal
Implement650msstaged merge keyed by mergeId and reconstruct result after any cancellation.

### Context
Bounded merge convergence profile deliverable. Authoritative output: `app/src/presentation/MergeMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/EnemyMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/MergeMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement650msstaged merge keyed by mergeId and reconstruct result after any cancellation.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/MergeMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Implement650msstaged merge keyed by mergeId and reconstruct result after any cancellation. Record platform limitations separately.

### Acceptance criteria
- Implement650msstaged merge keyed by mergeId and reconstruct result after any cancellation.
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


<a id="task-0165"></a>
## TASK-0165 — Merge cascade escalation

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0164](TASKS_PHASE_13.md) — Merge convergence profile

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/CascadeMotion.ts. Integrate shared registries coherently.

Evidence: [tests.tap](../analysis/reports/motion/cascade/tests.tap), [results.json](../analysis/reports/motion/cascade/browser/results.json).

### Goal
Sequence bounded intensity/pitch hooks and cap concurrent rings while preserving committed order.

### Context
Bounded merge cascade escalation deliverable. Authoritative output: `app/src/presentation/CascadeMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/MergeMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/CascadeMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Sequence bounded intensity/pitch hooks and cap concurrent rings while preserving committed order.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/CascadeMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Sequence bounded intensity/pitch hooks and cap concurrent rings while preserving committed order. Record platform limitations separately.

### Acceptance criteria
- Sequence bounded intensity/pitch hooks and cap concurrent rings while preserving committed order.
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


<a id="task-0166"></a>
## TASK-0166 — Projectile art task

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0165](TASKS_PHASE_13.md) — Merge cascade escalation

Parallelization: Allowed after listed dependencies; exclusive ownership of app/assets/art/effects/projectile-manifest.json. Integrate shared registries coherently.

Evidence: [tests.tap](../analysis/reports/motion/projectiles/tests.tap), [results.json](../analysis/reports/motion/projectiles/results.json).

### Goal
Create original arrow/magic primitive assets and reviewed sockets; no reference extraction.

### Context
Bounded projectile art task deliverable. Authoritative output: `app/assets/art/effects/projectile-manifest.json`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [10_PROJECTILE_SYSTEM.md](../docs/gameplay/10_PROJECTILE_SYSTEM.md)
- `app/src/presentation/CascadeMotion.ts` — dependency output

### Files expected to create
- `app/assets/art/effects/projectile-manifest.json`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Create original arrow/magic primitive assets and reviewed sockets; no reference extraction.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/assets/art/effects/projectile-manifest.json` through the smallest relevant RN/Skia/core/platform harness. Create original arrow/magic primitive assets and reviewed sockets; no reference extraction. Record platform limitations separately.

### Acceptance criteria
- Create original arrow/magic primitive assets and reviewed sockets; no reference extraction.
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


<a id="task-0167"></a>
## TASK-0167 — Effect primitive task

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0166](TASKS_PHASE_13.md) — Projectile art task

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/EffectPrimitives.ts. Integrate shared registries coherently.

Evidence: [tests.tap](../analysis/reports/motion/primitives/tests.tap), [results.json](../analysis/reports/motion/primitives/results.json).

### Goal
Create bounded hit/crit/merge/death/reward primitives matching palette and outline style.

### Context
Bounded effect primitive task deliverable. Authoritative output: `app/src/presentation/EffectPrimitives.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/assets/art/effects/projectile-manifest.json` — dependency output

### Files expected to create
- `app/src/presentation/EffectPrimitives.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Create bounded hit/crit/merge/death/reward primitives matching palette and outline style.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/EffectPrimitives.ts` through the smallest relevant RN/Skia/core/platform harness. Create bounded hit/crit/merge/death/reward primitives matching palette and outline style. Record platform limitations separately.

### Acceptance criteria
- Create bounded hit/crit/merge/death/reward primitives matching palette and outline style.
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


<a id="task-0168"></a>
## TASK-0168 — Damage number motion

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0167](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/DamageMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Pool48labels with normal/crit rise/spread and bounded presentation-only coalescing.

### Context
Bounded damage number motion deliverable. Authoritative output: `app/src/presentation/DamageMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [09_DAMAGE_CRIT_DEFENSE.md](../docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md)
- `app/src/presentation/EffectPrimitives.ts` — dependency output

### Files expected to create
- `app/src/presentation/DamageMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Pool48labels with normal/crit rise/spread and bounded presentation-only coalescing.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/DamageMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Pool48labels with normal/crit rise/spread and bounded presentation-only coalescing. Record platform limitations separately.

### Acceptance criteria
- Pool48labels with normal/crit rise/spread and bounded presentation-only coalescing.
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


<a id="task-0169"></a>
## TASK-0169 — Currency reward flyers

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0168](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/RewardMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Animate bounded symbolic coins/gems to HUD after commit; skip leaves final balance correct.

### Context
Bounded currency reward flyers deliverable. Authoritative output: `app/src/presentation/RewardMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/DamageMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/RewardMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Animate bounded symbolic coins/gems to HUD after commit; skip leaves final balance correct.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/RewardMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Animate bounded symbolic coins/gems to HUD after commit; skip leaves final balance correct. Record platform limitations separately.

### Acceptance criteria
- Animate bounded symbolic coins/gems to HUD after commit; skip leaves final balance correct.
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


<a id="task-0170"></a>
## TASK-0170 — UI button counter motion

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0169](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/UiMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Implement pressed/counter/tab/red-dot states with coalesced revisions and no tween property fights.

### Context
Bounded ui button counter motion deliverable. Authoritative output: `app/src/presentation/UiMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/RewardMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/UiMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement pressed/counter/tab/red-dot states with coalesced revisions and no tween property fights.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/UiMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Implement pressed/counter/tab/red-dot states with coalesced revisions and no tween property fights. Record platform limitations separately.

### Acceptance criteria
- Implement pressed/counter/tab/red-dot states with coalesced revisions and no tween property fights.
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


<a id="task-0171"></a>
## TASK-0171 — Popup route transitions

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0170](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/TransitionMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Implement280/180msmodal and route transitions with input ownership and load generation cleanup.

### Context
Bounded popup route transitions deliverable. Authoritative output: `app/src/presentation/TransitionMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/UiMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/TransitionMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Implement280/180msmodal and route transitions with input ownership and load generation cleanup.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/TransitionMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Implement280/180msmodal and route transitions with input ownership and load generation cleanup. Record platform limitations separately.

### Acceptance criteria
- Implement280/180msmodal and route transitions with input ownership and load generation cleanup.
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


<a id="task-0172"></a>
## TASK-0172 — Wheel motion profile

Phase: 13 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0171](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/WheelMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Accelerate/decelerate monotonically to saved angle and throttle pointer ticks; no outcome chosen by tween.

### Context
Bounded wheel motion profile deliverable. Authoritative output: `app/src/presentation/WheelMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [09_WHEEL_OF_LUCK.md](../docs/progression/09_WHEEL_OF_LUCK.md)
- `app/src/presentation/TransitionMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/WheelMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Accelerate/decelerate monotonically to saved angle and throttle pointer ticks; no outcome chosen by tween.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/WheelMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Accelerate/decelerate monotonically to saved angle and throttle pointer ticks; no outcome chosen by tween. Record platform limitations separately.

### Acceptance criteria
- Accelerate/decelerate monotonically to saved angle and throttle pointer ticks; no outcome chosen by tween.
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


<a id="task-0173"></a>
## TASK-0173 — Daily chest upgrade feedback

Phase: 13 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0172](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/MetaRewardMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

Current delivery scope: Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite.

### Context
Bounded daily chest upgrade feedback deliverable. Authoritative output: `app/src/presentation/MetaRewardMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [08_DAILY_REWARD.md](../docs/progression/08_DAILY_REWARD.md)
- `app/src/presentation/WheelMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/MetaRewardMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/MetaRewardMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite. Record platform limitations separately.

### Acceptance criteria
- Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite.
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


<a id="task-0174"></a>
## TASK-0174 — Background motion fallback

Phase: 13 · Priority: P1 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0173](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/presentation/BackgroundMotion.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Keep flattened scenery static/subtle drift with clamped edges; reduced motion disables offset.

### Context
Bounded background motion fallback deliverable. Authoritative output: `app/src/presentation/BackgroundMotion.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/presentation/MetaRewardMotion.ts` — dependency output

### Files expected to create
- `app/src/presentation/BackgroundMotion.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Keep flattened scenery static/subtle drift with clamped edges; reduced motion disables offset.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/presentation/BackgroundMotion.ts` through the smallest relevant RN/Skia/core/platform harness. Keep flattened scenery static/subtle drift with clamped edges; reduced motion disables offset. Record platform limitations separately.

### Acceptance criteria
- Keep flattened scenery static/subtle drift with clamped edges; reduced motion disables offset.
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


<a id="task-0175"></a>
## TASK-0175 — Haptic event adapter

Phase: 13 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0174](TASKS_PHASE_13.md), [TASK-0047](TASKS_PHASE_04.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/platform/Haptics.ts. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
Map semantic events to supported native feedback with preference,cooldown and background suppression.

### Context
Bounded haptic event adapter deliverable. Authoritative output: `app/src/platform/Haptics.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `app/src/presentation/BackgroundMotion.ts` — dependency output
- `package.json` — dependency output

### Files expected to create
- `app/src/platform/Haptics.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Map semantic events to supported native feedback with preference,cooldown and background suppression.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `app/src/platform/Haptics.ts` through the smallest relevant RN/Skia/core/platform harness. Map semantic events to supported native feedback with preference,cooldown and background suppression. Record platform limitations separately.

### Acceptance criteria
- Map semantic events to supported native feedback with preference,cooldown and background suppression.
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


<a id="task-0176"></a>
## TASK-0176 — Motion freeze and interruption QA

Phase: 13 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0175](TASKS_PHASE_13.md)

Parallelization: Allowed after listed dependencies; exclusive ownership of tests/integration/motion-interruption.md. Integrate shared registries coherently.

Delivery classification: **REQUIRED_NOW**. Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.

Current delivery scope: One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix.

[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.

Current QA policy: [batched delivery checks](../docs/qa/10_DELIVERY_QA_POLICY.md). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.

Evidence: [motion-interruption.md](../tests/integration/motion-interruption.md), [MILESTONE.md](../analysis/reports/motion/MILESTONE.md).

### Goal
One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix.

### Context
Bounded motion freeze and interruption qa deliverable. Authoritative output: `tests/integration/motion-interruption.md`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md) · [animation_matrix.csv](../docs/visual/animation_matrix.csv) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [04_ANIMATION_LANGUAGE.md](../docs/visual/04_ANIMATION_LANGUAGE.md)
- [animation_matrix.csv](../docs/visual/animation_matrix.csv)
- `app/src/platform/Haptics.ts` — dependency output

### Files expected to create
- `tests/integration/motion-interruption.md`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.

### Test cases
Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.

### Manual verification
Exercise `tests/integration/motion-interruption.md` through the smallest relevant RN/Skia/core/platform harness. One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix. Record platform limitations separately.

### Acceptance criteria
- One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix.
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
