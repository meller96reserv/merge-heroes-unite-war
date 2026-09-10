# ADR-003 — Domain separation

## Status
Accepted planning contract. Recorded2026-09-08. This records planning authorization, not a successful native build.

## Context and evidence
Core transactions and replay tests should run without a renderer. UI tween completion cannot control money or progression. See [evidence](../03_EVIDENCE_LEDGER.md), [unknowns](../04_UNKNOWNS_REGISTER.md) and [architecture](../technical/01_ARCHITECTURE.md).

## Decision
Pure TypeScript deterministic game-core; engine/native dependencies only through adapters.

## Consequences and alternatives
More explicit events/adapters; maintain one state authority and prohibit cc imports in core.

## Verification and revisit trigger
Complete [PHASE_06_CORE_GAME_STATE](../../plans/PHASE_06_CORE_GAME_STATE.md), attach acceptance results and update this ADR if measured evidence invalidates its premises. Do not rewrite historical evidence to make the selected approach appear confirmed.

## Tasks
[Task index](../../tasks/TASK_INDEX.md) · [Documentation index](../00_INDEX.md).
