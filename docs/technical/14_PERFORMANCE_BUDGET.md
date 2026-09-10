# Performance budget

All budgets are PROPOSED acceptance targets. Target 60 fps on representative mid/high devices: p95 frame time≤16.7 ms, p99≤33.3 ms; low tier stable 30 fps with p95≤33.3 ms. Record release build, device, thermal state, warmup and sampling method. Web preview results are separate from native.

Initial ceilings: battle textures≤128 MiB; low-tier process resident memory≤350 MiB; cold interactive launch≤5 s, warm route re-entry≤1.5 s. Track Skia texture/command cost, effect occupancy, JS/UI frame time, React commits, allocations and retained resources. Engine-specific draw-call/node counts are replaced by measured RN/Skia metrics; set detailed budgets from TASK-0213 baseline before optimizing. Do not claim old probe baselines as application measurements.

No React setState loop at display frequency. Reanimated drives continuous presentation; deterministic simulation and domain commands are bounded on JS. Profile representative drag, merge and battle bursts before memoization or thread relocation. Native service calls carry coarse operations; no transform/event firehose.

Save commit p95≤50 ms target; track queue length and oldest age. If persistence cannot sustain rewards, redesign journaling with crash tests before relaxing durability. Saturated VFX may drop cosmetics only.

Collect browser performance traces, RN JS/UI profiles, Android Perfetto/memory and iOS Instruments. Ten mount cycles plus a 30-minute stress session must show no monotonic retained memory after warmup; 50-cycle acceptance remains in production QA. Quality tiers preserve identical core state hashes.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)

TASK-0229 runtime correction: load one appropriate density per visible Sprite,
deduplicate pending reads and retire last-consumer images after a short route
grace period. Never preload the complete registry or retain closed-route textures
on Battle. Reviewed runtime size limits and measured cache capacity are in the
[focused texture audit](../../analysis/reports/runtime_texture_audit.md).
Owner delivery policy uses focused native/browser smoke; historical exhaustive
sampling instructions above do not reopen deferred performance campaigns.
