# Codex execution rules after planning

The planning mission is complete and its root completion report is historical evidence. The user now authorizes implementation through [start_prompt.md](start_prompt.md). Execute the existing task DAG, bootstrap missing development tools safely, follow accepted ADR-007 and maintain the same RN/Skia application in browser and native. Task status and attached evidence describe current implementation progress.

1. Read docs/00_INDEX.md, the evidence/unknown/conflict registers, the relevant phase and one ready REQUIRED_NOW or SUPPORTING_REQUIRED atomic task. Use tasks/task_manifest.json dependencies rather than numeric phase order. TASK-0001 validates handoff before changes.
2. Preserve original .fig, source hashes, user edits and the deleted-app baseline. Do not restore old RN code from history as an assumed foundation. Use isolated implementation changes and inspect current repository state.
3. OBSERVED/MEASURED facts require source IDs, screenshots/video PTS or reproducible measurements. INFERRED/PROPOSED/UNKNOWN remain explicit. Figma numbers are visual fixtures; web3.16.2 and mobile store versions are separate datasets.
4. Unknowns have concrete verification tasks and behavior/data gates. Continue independent work; do not invent missing costs, probabilities, timers or algorithms. The user authorizes a coherent approximation: record a versioned PROPOSED product rule and owning-task tests before enabling it. Exact reference capture gates parity claims, not browser-first implementation.
5. ADR-007 supersedes the historical native spike strategy. Production uses RN/Expo, Skia, Reanimated and Gesture Handler. Pin compatible versions; browser-first development starts with root npm run dev:web. Native builds/device checks remain independently required for release; historical PARTIAL is never PASS.
6. Keep game-core pure and deterministic. Domain owns money,merges,damage,stage and reward receipts. Skia projects state, Gesture Handler routes input and Reanimated animates it. RN owns application/platform services. No per-frame service traffic and no reward/damage from tween completion.
7. Durable actions commit draft+receipt+watermark before state install/events. Duplicate requests/results are idempotent. Save failures preserve old authoritative state; migrations preserve backups. Decimal currencies never pass through floating display parsing.
8. Source art uses semantic IDs,calibrated pivots/trim/insets and bounded bundle residency. Never use a full-screen screenshot as interactive UI or chop flattened characters automatically. Keep all source assets classified even when out of MVP.
9. Audio is original or licensed. Do not extract reference code,audio or private resources. Rights/fonts/audio proof is required before distribution. Missing audio remains custom needed,not final.
10. Execute the smallest bounded task and its meaningful checks. Update evidence/spec/schema/task/test traceability together. Split newly discovered independent work into stable IDs; recompute DAG and critical path. Do not mark a task complete while its own oracle is unmet.
11. Test core invariants,save crash points,visual fixtures,native lifecycle and device performance according to changed surface. Web success does not prove mobile. Exact Figma and15-slot adaptation goldens are separate. Record actual expected/actual results and limits.
12. Keep debug tools and proposed fixtures out of release. Rewarded-only ads and AppMetrica are required by docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md; IAP,payouts,accounts and backend remain outside scope. Only confirmed rewarded completion may authorize an idempotent durable grant. Release submission/distribution needs explicit authorization for the concrete approved artifact.

Documentation changes follow evidence→unknown/conflict→spec/schema→phase/task→test. Never rewrite historical captures to match an implementation. [Task index](tasks/TASK_INDEX.md) · [Execution order](plans/00_EXECUTION_ORDER.md) · [Consistency report](analysis/reports/planning_consistency_report.md).

Current delivery scope is [the targeted amendment](plans/DELIVERY_SCOPE.md).
The three docs/tz files and supplied Figma determine required product behavior;
reference/internal documentation cannot add features. Deferred tasks retain
their original specifications and status but are excluded from active delivery.
Every required Figma screen and real action remains mandatory. Refresh the
delivery DAG after checkpoint status updates. TASK-0237 / DELIVERY_COMPLETE
requires the actual complete production product; unresolved external-only
requirements stay explicitly open after independent work is finished.

Current user-authorized [delivery QA policy](docs/qa/10_DELIVERY_QA_POLICY.md) overrides exhaustive or duplicate acceptance requirements. Retain correctness tests and release builds/smoke; batch presentation checks and allow user browser visual acceptance. Keep evidence concise and do not claim unperformed checks.

Current user override: [six-hour candidate mode](plans/DELIVERY_CANDIDATE_MODE.md). Group coherent task IDs, reuse green checks, prioritize reachable required UI and early Android/iOS Simulator launches; no repeated full-suite/report ceremony. Final native smoke still checks the completed app.
