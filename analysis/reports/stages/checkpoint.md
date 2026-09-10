# TASK-0118 — playable battle and stage checkpoint

The actual React Native/TypeScript/Expo/Skia game opens with `npm run dev:web` at http://localhost:8082. Buy heroes, drag matching heroes to merge, tap to deploy/withdraw, defeat enemies, clear sequential waves, challenge bosses, farm after timeout, retry for free, and open five board slots after each chapter boss. Stage/kill/discovery rewards and their progression changes are durable and idempotent. The six-stage content is explicitly [PROPOSED](../../../docs/implementation/PLAYABLE_STAGES.md), separate from reference balance.

| Check | Actual result | Evidence |
| --- | --- | --- |
| All domain/controller/presenter tests | 92 passed, 0 failed | [regression.tap](regression.tap) |
| Stage acceptance | Six-stage chain at 16/33/100 ms cadence; identical saved results; 310 gold on full first clear, 320 after terminal repeat; 6 first-clear receipts remain 6 after reopen; timeout/tie/retry/stale input tests pass | [acceptance.tap](acceptance.tap) |
| Actual browser gameplay | Purchase, two drag merges, boss timeout/farm/retry/win, second row and reload pass with 0 runtime errors | [stage-loop.json](browser/stage-loop.json) |
| Board interaction regression | Quick taps, holds, full board, invalid/outside/blur drops, quota failure and reload pass; visible withdraw controls isolate board accounting | [board evidence](../board/browser/acceptance.json) |
| Browser reward recovery | Four unique kills through stage progression/farming reach 120 gold; failure preserves gold/sequence; retry/reload do not replay grants | [rewards.json](../combat/browser/rewards.json) |
| Responsive Figma fixtures | Both canonical 10-slot and adapted 15-slot fixtures at five viewports pass composition/input checks | [visual-check.json](../battle-screen/visual-check.json) |
| Fast Refresh | Real Skia text updates; open modal retained; 0 full navigations | [fast-refresh.json](../battle-screen/fast-refresh.json) |
| Production Web export | `npm run build:web` exit 0; served exported app fights, advances stage and buys/merges; development fixture query ignored | [production-game.json](browser/production-game.json), [sanitized build summary](web-export-summary.json) |
| Types/domain boundary/assets | `npm run typecheck`, `npm run build:core`, `npm run assets:validate` pass; 33 runtime assets, 63 density variants, one component export | Command results and existing registry validation |
| Planning consistency | 33 checks, 0 errors; acyclic executable DAG, no dangling dependencies or production Cocos requirements | [consistency.json](consistency.json) |
| Credential regression | 0 exact-value matches across all reachable local Git refs; synthetic staged scanner/sanitizer tests pass | [security-verification.json](security-verification.json) |

The production reducer additionally rejects wrong wave cursors, nonexistent enemy IDs, altered reward IDs and incomplete clear claims before any reward mutation. Save retry after an unacknowledged successful write reuses identical bytes; a different concurrent state remains a conflict. Old saves without `waveOrdinal` retain their board/currencies/receipts and default to wave 0.

Limits remain explicit: native hardware/build/power-loss/performance acceptance is NOT_RUN. Full Figma pixel calibration is OPEN at 7.485% differing canonical pixels (tolerance 16; original target 1.5%). Remaining screen flows, music/SFX, offline progression, AppMetrica and real Start.io rewarded adapters remain their assigned tasks; no simulated ad callback grants rewards. Combat visual quality-mode acceptance TASK-0108–0110 is still separate. Source art/reference analysis and the superseded native spike remain preserved.

SEC-001 is not fully closed: the exposed value was real proxy authentication. The affected pushed branch history was cleaned separately in the security checkpoint. Credential revocation/rotation still requires the proxy owner; no administrative capability is available here. GitHub caches/PR refs and other clones cannot be proven erased by a branch rewrite. See the [security incident](../security/SEC-001.md).
