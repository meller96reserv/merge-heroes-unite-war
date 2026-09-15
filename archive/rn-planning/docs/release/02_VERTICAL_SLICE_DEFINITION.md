# Vertical slice definition

The first slice is a polished, playable native portrait loop: app launch→start→battle HUD/board→buy two heroes→merge with result/discovery feedback→deploy→automatic attack/projectile/hit/death→currency reward→next stage→save→restart/resume. Include one boss attempt/fail-or-win path and settings mute/haptics. It must use real Figma-derived components and a small original audio/effects set.

Minimal content is an explicitly labeled development fixture with at least3hero tiers,2enemy profiles, a short stage chain and1boss. Mapping tier→visual is reviewed independently of reference human characters. No full-screen screenshot substitute. First exact static comparison uses430×932; then15-slot functional adaptation and small-screen test.

Dependencies: native feasibility before foundation, source/asset/font/layout decisions, core state/transactions, purchase/merge, battle/stage, minimal durable save/offline barrier, core motion/audio subset. Numeric phase order is not the slice order; phase12 persistence and phase13/14 subset come before meta expansion.

Pass: same command fixture produces expected state after restart; merge interruption and duplicate reward tests pass; native host re-entry/audio/touch works; target frame/memory budgets are recorded; Figma anchors and readable effects reviewed. Slice is not beta or a proof of full reference parity.

## Traceability

[Scope](../01_PROJECT_SCOPE.md) · [Execution order](../../plans/00_EXECUTION_ORDER.md) · [QA checklist](../qa/09_RELEASE_CHECKLIST.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Task index](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
