# Project agent instructions

This repository is governed by:

- `CODEX_EXECUTION_RULES.md`
- `docs/00_INDEX.md`
- `plans/00_EXECUTION_ORDER.md`
- `tasks/task_manifest.json`
- `docs/02_SOURCE_OF_TRUTH.md`
- `docs/03_EVIDENCE_LEDGER.md`
- `docs/04_UNKNOWNS_REGISTER.md`
- `docs/conflicts.md`

Before performing any implementation task:

1. Read `CODEX_EXECUTION_RULES.md`.
2. Resolve the next executable REQUIRED_NOW or SUPPORTING_REQUIRED task from `tasks/task_manifest.json`; DEFERRED_POST_DELIVERY tasks do not gate or expand this delivery.
3. Read that task completely.
4. Read its referenced source-of-truth documents.
5. Verify all dependencies are actually completed.
6. Implement only the bounded task.
7. Run its tests and acceptance criteria.
8. Record actual evidence before marking it complete.
9. Update the task manifest/status and affected documentation.
10. Never mark NOT_RUN, BLOCKED or UNKNOWN as PASS.

Important architectural rules:

- `game-core` must remain pure TypeScript with no React Native, Skia, presentation or browser imports.
- React Native owns the game; Skia renders its shared 2D surface, Reanimated animates presentation, and Gesture Handler routes input.
- Expo/RN owns application composition and platform services; Web and native share game code and assets.
- Economy, merge, damage, progression and rewards are authoritative in game-core.
- Animations, VFX and audio may never grant rewards or apply damage.
- Never infer reference-game behavior that remains UNKNOWN.
- PROPOSED behavior must remain explicitly distinguishable from OBSERVED/MEASURED behavior.
- Never overwrite or destructively modify the original `.fig`.
- Use semantic Figma asset IDs and the generated asset manifests.
- Never substitute a flattened screenshot for an interactive screen.
- Preserve save idempotency, transaction receipts and recovery guarantees.
- Use root `npm run dev:web` for browser-first development of the actual RN/Skia application.
- Follow accepted `docs/adr/ADR-007-RN-SKIA-RUNTIME.md`. Historical superseded tasks never gate the active production DAG; new native QA remains mandatory before release.
- Maintain a buildable/playable repository at milestone boundaries.
- Follow docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md: app-specific TZ overrides general examples; rewarded-only completion grants are durable/idempotent.
- SEC-001: do not stage raw runtime logs or headers/tokens. Keep .githooks/pre-commit enabled; diagnostic summaries use tooling/security/sanitize-log.py.

The task DAG is authoritative. Numeric phase order is not execution order.

Git checkpoints: commit coherent completed work regularly after its acceptance
criteria pass, preferably one meaningful task per commit. Group small related
documentation/evidence tasks when useful. Include TASK IDs in commit messages.
Keep unrelated unfinished work, secrets, caches and large generated output out
of completed-task commits. Do not commit broken states to satisfy task numbering.

Delivery authority: docs/tz app-specific ТЗ first; advertising ТЗ governs ads,
supplied Figma governs required screens/art/composition, and general developer
instructions apply only to this game. Internal/reference documents are supporting
guidance, not additional delivery scope. Follow [delivery scope](plans/DELIVERY_SCOPE.md).
After task status changes, refresh the delivery graph with
`python3 tools/analysis/delivery_scope.py --refresh`. TASK-0237 owns the actual
DELIVERY_COMPLETE gate; scope-validation PASS is not product completion.

Current user-authorized [delivery QA policy](docs/qa/10_DELIVERY_QA_POLICY.md) overrides exhaustive or duplicate acceptance requirements. Retain correctness tests and release builds/smoke; batch presentation checks and allow user browser visual acceptance. Keep evidence concise and do not claim unperformed checks.

Current user override: [six-hour candidate mode](plans/DELIVERY_CANDIDATE_MODE.md). Group coherent task IDs, reuse green checks, prioritize reachable required UI and early Android/iOS Simulator launches; no repeated full-suite/report ceremony. Final native smoke still checks the completed app.
