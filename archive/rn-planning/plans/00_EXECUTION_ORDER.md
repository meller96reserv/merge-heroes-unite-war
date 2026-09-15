# Delivery execution order

The task DAG is authoritative; numeric phases are organizational labels. Choose
an unfinished REQUIRED_NOW or SUPPORTING_REQUIRED task whose actual dependencies
are COMPLETED. Preserve current work and coherent TASK-ID commits. Deferred
specifications remain available but do not gate or expand this delivery.

1. Continue after TASK-0167: remaining motion/VFX 0168–0176 and audio 0177–0186.
2. Required boot/start/maintenance, Settings/Wheel fixtures 0062/0067/0068 and route/settings bindings 0128/0129; save support tasks may run when required.
3. Wheel/daily/confirmed rewarded flows 0133–0139 and0254–0258, including real Free coins and win Boost UX. Never fabricate completion for unavailable inventory.
4. Complete other supplied Figma screens/actions: equipment/upgrades0063/0064/0119–0127, relic/dungeon0065/0242/0243/0246, daily0066/0135; complete visual regression0069.
5. Shipped content validation, persistence/restart, platform composition, notification controls and project AppMetrica. Review identity/legal/toolchain inputs early; they no longer wait for beta acceptance.
6. Actual Android/iOS production builds, native lifecycle/performance/visual/audio/rewarded smoke and P0/P1 closure; package-named APK/AAB/project ZIP and GitLab/repository metadata.
7. TASK-0237 closes DELIVERY_COMPLETE only after every current requirement is verified. Complete independent work before reporting exact external-only prerequisites. Publication still requires authorization for the concrete artifact.

Use `python3 tools/analysis/delivery_scope.py --refresh` after status changes.
Scope checks are not product acceptance. Keep root `npm run dev:web` playable.

[Scope report](DELIVERY_SCOPE.md) · [Manifest](../tasks/task_manifest.json) · [Graph](01_DEPENDENCY_GRAPH.md) · [Remaining critical path](02_CRITICAL_PATH.md) · [ADR-007](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md)

Current user-authorized [delivery QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) overrides exhaustive or duplicate acceptance requirements. Retain correctness tests and release builds/smoke; batch presentation checks and allow user browser visual acceptance. Keep evidence concise and do not claim unperformed checks.

Current user override: [six-hour candidate mode](DELIVERY_CANDIDATE_MODE.md). Group coherent task IDs, reuse green checks, prioritize reachable required UI and early Android/iOS Simulator launches; no repeated full-suite/report ceremony. Final native smoke still checks the completed app.
