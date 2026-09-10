# TASK-0162 — attack motion after encounter replacement

2026-09-09; follow-up to checkpoint `4b45998`.

The reported bug was reproduced: the hero keeps firing and dealing damage after
a boss dies, but stops performing its attack motion. On the first replacement it
also performs a strike without an attack intent.

`BattleSystem` correctly resets attack sequences for each encounter. The owned
hero ID and its React component survive that transition. Previously the motion
director retained its seen attack keys, so it rejected the next encounter's
attacks as duplicates. Comparing sequences with `!==` also treated the reset to
zero as a new attack. [Before-fix measurements](before.json) retain that expected
failure; this is historical failure evidence, not a passed acceptance check.

`HeroView` now carries `encounterId`. On encounter replacement the combat motion
hook cancels the old director generation, restores current opacity, clears the
strike/flash and establishes the new HP/sequence baseline. Only increasing
sequences start attacks. The independent idle/spawn presenter stays mounted;
stale completion tickets cannot finish new encounter animations. Gameplay,
damage, projectile deadlines and durable rewards are unchanged.

The [browser regression](../../../../tests/browser/hero-encounter-motion.py) uses
the real `BattleSystem`, `BattleActors`, hero assets and RN/Skia motion. Each of
three attack families kills three bosses with the same owned hero (18 attacks).
The diagnostic next-encounter control replaces only a slain enemy's fixture
scene; it fabricates no reward or persistence acknowledgement and is development
only.

[Results](results.json): all 18 attacks pass. A hero-only 125×120 pixel crop
excludes projectiles, enemies and damage labels. Three samples at 50/100/150ms
detect 2,555–4,525 changed pixels relative to idle for every attack; scene-entry
80→150ms differences are only 9–670 pixels. The 1,000-pixel threshold separates
attack motion from subtle idle breathing. The initial reproduction used two
attack markers, which could miss a pose; its pixel counts are not directly
comparable to the final sampled oracle. Six small third-encounter crops are
retained for review.

The core clock advances separately: projectiles exist before impact, enemy HP
does not change while presentation advances, and each hit applies only at its
scheduled simulation tick. [The real stage-loop test](stages/stage-loop.json)
also passes sequential waves, boss timeout/farming, buy/merge to tier 3, manual
boss retry, victory, slot unlock and reload persistence. Both browser checks
report zero runtime errors.

[115 unit/core tests](tests.tap), TypeScript, the pure-core boundary, asset
validation and the production web export passed; [command results](checks.json)
record actual exits separately from the sanitized export summary.
[Fast Refresh](fast-refresh.json) and [planning consistency](consistency.json)
are attached to this checkpoint. Native device execution remains NOT_RUN; this
fix does not change the open exact-Figma or native release acceptance gates.

Reproduce from the repository root with `npm run dev:web`, then run
`tests/browser/hero-encounter-motion.py` with Python Playwright and Pillow.
`KISEL_MOTION_EVIDENCE_DIR` selects an alternate report directory.
