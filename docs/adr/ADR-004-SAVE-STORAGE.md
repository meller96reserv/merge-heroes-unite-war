# ADR-004 — Save storage

## Status
Proposed, durability test required. Recorded2026-09-08. This records planning authorization, not a successful native build.

## Context and evidence
Recover last valid snapshot and prevent repeated claims across crashes. Provider-specific atomicity is not assumed. See [evidence](../03_EVIDENCE_LEDGER.md), [unknowns](../04_UNKNOWNS_REGISTER.md) and [architecture](../technical/01_ARCHITECTURE.md).

## Decision
Versioned A/B snapshots with checksum, generation, transaction receipts and source watermarks; native app-private files, web IndexedDB adapter.

## Consequences and alternatives
Write/verify barrier can be costly; measure sustained kill rewards and redesign journal if necessary before shipping. Checksum is not anti-cheat.

## Verification and revisit trigger
Complete [PHASE_12_SAVE_AND_OFFLINE](../../plans/PHASE_12_SAVE_AND_OFFLINE.md), attach acceptance results and update this ADR if measured evidence invalidates its premises. Do not rewrite historical evidence to make the selected approach appear confirmed.

## Tasks
[Task index](../../tasks/TASK_INDEX.md) · [Documentation index](../00_INDEX.md).
