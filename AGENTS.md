# Project agent instructions

The active game is **Cocos Creator 3.8.8**, in `cocos-spike/`. That directory name is historical; it contains the current Android/iOS product. There is no React Native application to develop or build.

Before changing the game, read:
1. `CODEX_EXECUTION_RULES.md` — current working rules and user decisions.
2. `docs/00_INDEX.md` and `cocos-spike/DEVELOPMENT.md` — source map, gameplay, assets, builds.
3. `cocos-spike/HANDOFF.md` and `docs/BACKLOG.md` — actual release status and open work.
4. The relevant app-specific brief in `docs/tz/` and source files for the requested change.

The old RN/Skia task DAG, ADR-007 and six-hour candidate plan are archived under `archive/rn-planning/`. They do not govern Cocos development. Do not resume old TASK numbers, regenerate that DAG or restore RN infrastructure.

Keep `cocos-spike/assets/scripts/core/` pure TypeScript. Money, damage, merge, progression and reward receipts are authoritative there; scene animations, audio and haptics never grant rewards. Preserve atomic saves, idempotency and recovery. Never delete player saves to make a test pass.

User policy: complete related edits first, then run only relevant checks. One successful smoke normally suffices; no repeated cycles, long recording, broad QA or benchmark ceremony without a real blocking problem. Report NOT_RUN/BLOCKED honestly. Do not create emulator profiles unnecessarily; any emulator/Simulator should have a visible window and preserve its data.

Reuse `analysis/reference/` and `analysis/figma/` before investigating mechanics or art again. Preserve original .fig files. Distinguish measured reference facts from proposed product balance. Retain semantic asset IDs and .meta UUIDs; interactive screens must not be flattened screenshots.

Never commit private/, signing passwords/keys, tokens, raw runtime/network logs, caches or generated builds. Keep `.githooks/pre-commit` enabled (`git config core.hooksPath .githooks`); use `tooling/security/sanitize-log.py` for diagnostic summaries. Existing Android release signing must be restored privately, never silently regenerated.

Commit coherent completed work and update current docs when behavior or status changes. No automatic store publication or external messaging. Follow the user's current task and authorization; archived instructions do not expand its scope.
