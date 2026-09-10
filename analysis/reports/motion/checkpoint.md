# TASK-0164 — combat acceptance and initial motion checkpoint

Continued from the clean TASK-0118 checkpoint without resetting or regenerating
the plan. Completed TASK-0108–0110 and TASK-0158–0164 as individual coherent Git
checkpoints. The actual React Native/Expo/Skia game remains at
http://localhost:8082 (`npm run dev:web`).

The visible battle now uses calibrated feet for all ten hero families, grounded
breathing and staged appearance, attack release aligned to core hit deadlines,
priority-controlled hit/death, distinct boss introduction/death and a 650ms
merge convergence/reveal. The board result and discovery reward are durable
before merge motion starts; blur/modal/resize or a changed result cancels the
cosmetic overlay and exposes current state. Reduced motion uses static spatial
positions and short opacity feedback. Current chapter enemies remain passive;
explicit counterattack fixtures preserve encounter damage across redeployment
without deleting owned heroes.

| Check | Actual result | Evidence |
| --- | --- | --- |
| Domain/controller/presentation regression | 114 passed, 0 failed | [TAP](checkpoint-tests.tap) |
| Deterministic combat | Twenty seeded hits match at 120/60/30/10 FPS inputs; mutual lethal, zero/missing targets, stale hits, saturation, pause and overflow pass | [fixtures](../combat/deterministic-fixtures.tap) |
| Combat presentation | 18 browser cases; melee/ranged/magic, normal/crit, death, missing source/target, full/low/reduced; same core hashes | [cases](../combat/presentation/results.json) |
| Grounded heroes | 10 families, 0–1px grounded foot-edge raster drift; fairy hover explicitly proposed; reduced frames identical | [markers](hero/results.json) |
| Attack motion | Three families; visible preparation/release/recovery, HP changes only on the domain step | [markers](attack/results.json) |
| Enemy/boss motion | Four full/reduced cases; visible death release; equal core hashes, stale leases rejected | [markers](enemy/results.json), [tests](enemy.tap) |
| Actual merge interaction | 650ms convergence/reveal, visible result ring, committed gold before animation; interruption and reload preserve tier 3 / 195 gold | [markers](merge/results.json), [tests](merge.tap) |
| Frame delivery | Chained derived transform moves through four real browser frames without React state or forced snapshot draws | [probe](frame-probe/results.json) |
| Fast Refresh | Real Skia text update, modal retained, zero full navigations; merge acceptance repeated afterward | [result](../battle-screen/fast-refresh.json) |
| Playable stage loop | Waves → boss timeout → farm → buy/merge → retry → win → row unlock → reload, zero runtime errors | [stage loop](browser/stage-loop.json) |
| Production Web | Export builds; served app fights, advances stage and buys/merges; debug fixture query ignored, zero runtime errors | [production](browser/production-game.json), [build/exclusion/compatibility](checkpoint-build.json) |
| Planning consistency | 33 checks, zero errors, no dangling dependencies or production Cocos requirements, acyclic task graph | [validator](consistency.json) |

A warm-process screenshot discrepancy was investigated with temporary numeric
instrumentation. Fresh **unmodified** Skia 2.6.2 and a subsequent real Fast Refresh
both passed the visible reveal oracle. The experimental dependency patch was
removed; all four inspected package files match their original bytes. No
underlying library defect is asserted. Diagnostic console/network logs remain
outside Git; the export log is an [allowlisted summary](web-export-summary.json).

Limits: these are authored PROPOSED motion profiles, not measured reference-motion
parity. Physical Android/iOS execution and GPU/device performance remain NOT_RUN.
The separate full-screen Figma pixel gate remains open. TASK-0165 onward owns
remaining cascade/VFX/reward/UI motion; audio acquisition/runtime and required
Settings/Wheel/rewarded flows remain their existing DAG tasks. No animation
callback applies damage, grants currency, chooses a wheel outcome or confirms an ad.
