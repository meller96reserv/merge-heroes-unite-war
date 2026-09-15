# Atomic tasks — phase 09

Task statuses below and the manifest describe actual progress; planning inputs alone do not imply acceptance. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_09_STAGE_AND_BOSS_PROGRESSION.md).

<a id="task-0111"></a>
## TASK-0111 — Stage definition graph

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0102](TASKS_PHASE_08.md) — Battle tick pipeline

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/model/Stage.ts. Integrate shared registries coherently.

Evidence: [graph.tap](../analysis/reports/stages/graph.tap).

### Goal
Validate ordinal/world/waves/next and explicit boss/farm references with no unintended cycle.

### Context
Bounded stage definition graph deliverable. Authoritative output: `game-core/src/model/Stage.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/systems/BattleSystem.ts` — dependency output

### Files expected to create
- `game-core/src/model/Stage.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Validate ordinal/world/waves/next and explicit boss/farm references with no unintended cycle.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise `game-core/src/model/Stage.ts` through the smallest relevant RN/Skia/core/platform harness. Validate ordinal/world/waves/next and explicit boss/farm references with no unintended cycle. Record platform limitations separately.

### Acceptance criteria
- Validate ordinal/world/waves/next and explicit boss/farm references with no unintended cycle.
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
Exact-parity verification remains assigned to TASK-0012. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0112"></a>
## TASK-0112 — Wave progression reducer

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0111](TASKS_PHASE_09.md) — Stage definition graph

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/StageSystem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [progression.tap](../analysis/reports/stages/progression.tap).

### Goal
Advance after committed final death exactly once; ignore stale prior-encounter events.

### Context
This is the bounded wave progression reducer deliverable within implement waves boss farming and unlocks. Its authoritative output is `game-core/src/systems/StageSystem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- `game-core/src/model/Stage.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/StageSystem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/StageSystem.ts`; unresolved reference behavior stays gated.
2. Advance after committed final death exactly once; ignore stale prior-encounter events.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Advance after committed final death exactly once; ignore stale prior-encounter events. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Advance after committed final death exactly once; ignore stale prior-encounter events.
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


<a id="task-0113"></a>
## TASK-0113 — First-clear reward watermark

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0112](TASKS_PHASE_09.md) — Wave progression reducer

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/StageRewardService.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [first-clear.tap](../analysis/reports/stages/first-clear.tap).

### Goal
Separate once-per-stage clear from repeat farm kill receipts and maintain monotonic highest ordinal.

### Context
This is the bounded first-clear reward watermark deliverable within implement waves boss farming and unlocks. Its authoritative output is `game-core/src/systems/StageRewardService.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- `game-core/src/systems/StageSystem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/StageRewardService.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/StageRewardService.ts`; unresolved reference behavior stays gated.
2. Separate once-per-stage clear from repeat farm kill receipts and maintain monotonic highest ordinal.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Separate once-per-stage clear from repeat farm kill receipts and maintain monotonic highest ordinal. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Separate once-per-stage clear from repeat farm kill receipts and maintain monotonic highest ordinal.
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


<a id="task-0114"></a>
## TASK-0114 — Boss timer and tie rule

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0113](TASKS_PHASE_09.md) — First-clear reward watermark

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/systems/BossSystem.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [boss-timer.tap](../analysis/reports/stages/boss-timer.tap).

### Goal
Use simulation time and explicit lethal-before-timeout policy; pause does not consume wall time.

### Context
This is the bounded boss timer and tie rule deliverable within implement waves boss farming and unlocks. Its authoritative output is `game-core/src/systems/BossSystem.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- `game-core/src/systems/StageRewardService.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/systems/BossSystem.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/systems/BossSystem.ts`; unresolved reference behavior stays gated.
2. Use simulation time and explicit lethal-before-timeout policy; pause does not consume wall time.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Use simulation time and explicit lethal-before-timeout policy; pause does not consume wall time. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Use simulation time and explicit lethal-before-timeout policy; pause does not consume wall time.
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


<a id="task-0115"></a>
## TASK-0115 — Boss failure and retry

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0114](TASKS_PHASE_09.md) — Boss timer and tie rule

Parallelization: Allowed after listed dependencies; exclusive edit ownership for game-core/src/commands/RetryBoss.ts. Shared registries are integrated by their dedicated validation/wiring task.

Evidence: [retry.tap](../analysis/reports/stages/retry.tap).

### Goal
Return to configured farm state after failure and create new encounter sequence on manual retry.

### Context
This is the bounded boss failure and retry deliverable within implement waves boss farming and unlocks. Its authoritative output is `game-core/src/commands/RetryBoss.ts`; adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- `game-core/src/systems/BossSystem.ts` — future artifact from listed dependency

### Files expected to create

- `game-core/src/commands/RetryBoss.ts`

### Files expected to modify

None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `game-core/src/commands/RetryBoss.ts`; unresolved reference behavior stays gated.
2. Return to configured farm state after failure and create new encounter sequence on manual retry.
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise the behavior described in Acceptance criteria through the smallest domain/RN/Skia/native harness that reaches this output. Return to configured farm state after failure and create new encounter sequence on manual retry. Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

- Return to configured farm state after failure and create new encounter sequence on manual retry.
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


<a id="task-0116"></a>
## TASK-0116 — Unlock condition evaluator

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0115](TASKS_PHASE_09.md) — Boss failure and retry

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/src/systems/UnlockService.ts. Integrate shared registries coherently.

Evidence: [unlocks.tap](../analysis/reports/stages/unlocks.tap).

### Goal
Evaluate stage/account/tier allOf/anyOf and persist unlocked/announced IDs once.

### Context
Bounded unlock condition evaluator deliverable. Authoritative output: `game-core/src/systems/UnlockService.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md) · [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- [05_UNLOCKS.md](../docs/progression/05_UNLOCKS.md)
- [ADR-007-RN-SKIA-RUNTIME.md](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)
- `game-core/src/commands/RetryBoss.ts` — dependency output

### Files expected to create
- `game-core/src/systems/UnlockService.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Evaluate stage/account/tier allOf/anyOf and persist unlocked/announced IDs once.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise `game-core/src/systems/UnlockService.ts` through the smallest relevant RN/Skia/core/platform harness. Evaluate stage/account/tier allOf/anyOf and persist unlocked/announced IDs once. Record platform limitations separately.

### Acceptance criteria
- Evaluate stage/account/tier allOf/anyOf and persist unlocked/announced IDs once.
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
Exact-parity verification remains assigned to TASK-0022. These tasks do not block explicitly PROPOSED product rules under ADR-007. Existing evidence/unknown records remain authoritative.


<a id="task-0117"></a>
## TASK-0117 — Stage boss HUD presenter

Phase: 09 · Priority: P0 · Type: implementation · Status: COMPLETED

Dependencies: [TASK-0116](TASKS_PHASE_09.md) — Unlock condition evaluator

Parallelization: Allowed after listed dependencies; exclusive ownership of app/src/ui/StageHud.ts. Integrate shared registries coherently.

Evidence: [hud.tap](../analysis/reports/stages/hud.tap), [regression.tap](../analysis/reports/stages/regression.tap), [stage-loop.json](../analysis/reports/stages/browser/stage-loop.json), [implementation.md](../analysis/reports/stages/implementation.md).

### Goal
Display stage HP/timer/retry/farm states without inventing formula from Figma100label.

### Context
Bounded stage boss hud presenter deliverable. Authoritative output: `app/src/ui/StageHud.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- `game-core/src/systems/UnlockService.ts` — dependency output

### Files expected to create
- `app/src/ui/StageHud.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Display stage HP/timer/retry/farm states without inventing formula from Figma100label.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise `app/src/ui/StageHud.ts` through the smallest relevant RN/Skia/core/platform harness. Display stage HP/timer/retry/farm states without inventing formula from Figma100label. Record platform limitations separately.

### Acceptance criteria
- Display stage HP/timer/retry/farm states without inventing formula from Figma100label.
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


<a id="task-0118"></a>
## TASK-0118 — Stage boss acceptance

Phase: 09 · Priority: P0 · Type: test · Status: COMPLETED

Dependencies: [TASK-0117](TASKS_PHASE_09.md) — Stage boss HUD presenter

Parallelization: Allowed after listed dependencies; exclusive ownership of game-core/tests/simulation/stage-boss.test.ts. Integrate shared registries coherently.

Evidence: [acceptance.tap](../analysis/reports/stages/acceptance.tap), [regression.tap](../analysis/reports/stages/regression.tap), [production-game.json](../analysis/reports/stages/browser/production-game.json), [checkpoint.md](../analysis/reports/stages/checkpoint.md).

### Goal
Test three-stage chain,timeout,win,tie,retry and save/reopen without duplicated first-clear reward.

### Context
Bounded stage boss acceptance deliverable. Authoritative output: `game-core/tests/simulation/stage-boss.test.ts`. Adjacent systems remain separate tasks.

### Source-of-truth docs
[13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md) · [stage.schema.json](../data-spec/stage.schema.json) · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first
- [13_BOSS_SYSTEM.md](../docs/gameplay/13_BOSS_SYSTEM.md)
- [stage.schema.json](../data-spec/stage.schema.json)
- `app/src/ui/StageHud.ts` — dependency output

### Files expected to create
- `game-core/tests/simulation/stage-boss.test.ts`

### Files expected to modify
Only affected task status/evidence and named integration registries.

### Implementation steps
1. Read listed sources and verify dependency acceptance.
2. Test three-stage chain,timeout,win,tie,retry and save/reopen without duplicated first-clear reward.
3. Exercise the concrete edge cases and retain exact expected/actual evidence.
4. Update task/evidence traceability and commit only accepted coherent work.

### Edge cases
Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.

### Test cases
Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.

### Manual verification
Exercise `game-core/tests/simulation/stage-boss.test.ts` through the smallest relevant RN/Skia/core/platform harness. Test three-stage chain,timeout,win,tie,retry and save/reopen without duplicated first-clear reward. Record platform limitations separately.

### Acceptance criteria
- Test three-stage chain,timeout,win,tie,retry and save/reopen without duplicated first-clear reward.
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
