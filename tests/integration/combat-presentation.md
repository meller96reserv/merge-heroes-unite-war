# TASK-0110 — combat presentation acceptance

Shared Expo/Skia browser capture: `tests/browser/combat-presentation.py`, Chromium,
430×932, seed `[1,2,3,4]`, 50 ms ticks / 150 ms hit schedule. DEV-only harness
uses the production BattleSystem, BattleActors, art, projectile and damage
presenters; it never writes a player save.

Evidence: [case results](../../analysis/reports/combat/presentation/results.json),
[deterministic fixtures](../../analysis/reports/combat/deterministic-fixtures.tap),
[production exclusion](../../analysis/reports/combat/presentation/production-exclusion.json).

| Input | Expected / observed |
| --- | --- |
| Turtle melee, raccoon ranged, fox magic × full/low/reduced | Attack queued at tick 20; first hit at 23, exact HP 20→10; second hit at 43, HP→0, one death / pending durable entitlement. Identical event + core hashes across modes. |
| Full | Slash, arrow and magic orb/trail; white 10 label, target flash, fade/death and settled disappearance captured. |
| Low | Same attack/hit/HP/death; secondary trail/glow omitted. Quality never affects simulation input. |
| Reduced motion | No traveling projectile or recoil; exact label and opacity/death remain. No damage/reward waits for a view callback. |
| Forced 100% critical | Exact yellow 20 label and lethal hit in all modes. Shipped chapter crit remains zero; fixture is not balance data. |
| Withdraw source during travel | Queued attack removed; no damage, enemy stays at 20 HP, no orphan projectile. |
| Missing projected target | Retained immutable core hit with absent presentation target projects zero projectiles. Separate HitQueue fixtures verify missing domain target cancels without retargeting. |
| Paused core | Five attempted steps leave state/events identical. |
| Saturation / zero / huge | TASK-0109 covers atomic queue rejection, bounded cosmetic pools, no RNG for zero, safe clamp and overflow rejection. |

PNG travel/hit/death/settled markers are adjacent to the JSON report, captured
with Playwright's controlled clock and CDP. Visual review confirms readable
labels, intact silhouettes and bounded effects. This is functioning-presentation
acceptance, not reference-motion parity or the separate full-screen Figma pixel
gate (TASK-0069). Physical Android/iOS validation is **NOT_RUN**.

The production export contains none of the fixture's unique markers. Capture
code retains counts, hashes and screenshots, never console messages or headers.
