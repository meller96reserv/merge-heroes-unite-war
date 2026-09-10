# Animation language

All timing values in animation_matrix.csv are proposed design targets. Reference video measurements live separately. Use anticipation→action→settle, grounded pivots and bounded overshoot. Timing tokens: instant80ms, fast140ms, normal280ms, reward560ms, major900ms. Idle motion is slow and subtle; important rewards may be expressive while frequent hits remain economical.

An authoritative event starts presentation only after commit. Interrupt policy is cancel-and-reconcile: cancel tweens/effects, release pools and redraw committed state. Attack visual release markers align to configured domain hit scheduling but do not trigger damage. A presentation skip/reduced-motion option cannot change outcomes or RNG.

State priority: death/merge result > hit > attack > idle. Repeated hits coalesce flash, do not restart death. Global shake affects world only, max3px/120ms, never HUD. Reduced motion disables shake/parallax/large scale sweeps and replaces rewards with opacity/label updates. Debug freeze supports named markers for screenshots.

Acceptance: every matrix event has target, duration, easing, VFX/SFX/haptic decision, cancellation and fallback; no orphan nodes after interruption; no overlapping tweens fight the same transform property.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).

## Runtime implementation — ADR-007

Keep every existing timing, easing, priority and reduced-motion decision. Implement continuous values with Reanimated shared/derived values consumed by Skia; avoid React state updates per display frame. Gesture Handler updates drag visuals and submits a domain command only on completed interaction. AnimationDirector consumes committed events, cancels by entity/mount generation and reconciles authoritative final state after interruption. Bounded Skia effect records replace engine nodes; skipped VFX never skip damage or rewards.

TASK-0158 calibration is in [motion_calibration.json](../../analysis/figma/motion_calibration.json): whole-sprite feet/sockets are authored proposals, not extracted reference rig data. TASK-0159 adds [AnimationDirector](../../app/src/presentation/AnimationDirector.ts), with 64 matrix profiles imported by `tooling/assets/import-motion.py`. The director arbitrates mount generations, terminal death, priorities and cancel/reconcile; it owns no gameplay callbacks. Profile-specific Skia wiring continues in TASK-0161 onward. [Director acceptance](../../analysis/reports/motion/director.tap) covers cancellation, stale callbacks, capacity, reduced motion and unchanged core state.

TASK-0161 wires `useHeroMotion` to battle and board heroes. Each full-canvas anchor is transformed through Skia's contain-fit rectangle before use. Grounded breathing changes scale around the feet; only the ice fairy has a proposed 1.5px hover. Spawn settles in 280ms with 1.08 overshoot; reduced motion uses opacity only. [Ten-family browser markers](../../analysis/reports/motion/hero/results.json) measure 0–1px grounded foot-edge raster drift, static reduced-motion frames and no runtime errors. Native execution remains NOT_RUN.

TASK-0162 aligns hero release with the configured core hit delay. The current 150ms delay uses 80ms anticipation + 70ms release + 140ms recovery (290ms total); this runtime deadline overrides the matrix's generic 280ms proposal. Fresh attack sequences drive motion; toggling reduced motion does not replay an old attack. Hit interrupts attack, death is terminal for that mount. [Browser markers](../../analysis/reports/motion/attack/results.json) confirm all three attack families move while enemy HP stays unchanged until the core step; [timing/interruption tests](../../analysis/reports/motion/hero-combat.tap) cover zero/late schedules and stale death callbacks.

TASK-0163 applies director-owned enemy spawn/idle/hit/death and distinct 900ms boss intro/death. Whole boar art uses its calibrated contain-fit feet; grounded idle no longer translates the sprite. Reduced motion keeps opacity and exact HP only. Scene exit cancels remaining boss presentation immediately and retains committed progression. [Four browser cases](../../analysis/reports/motion/enemy/results.json) show normal/boss death release and matching full/reduced core hashes; [lease/skip tests](../../analysis/reports/motion/enemy.tap) reject callbacks from the previous encounter.

TASK-0164 presents committed `merge.completed` events as 180ms convergence,
90ms shrink, 120ms reveal and 260ms settle (650ms total). Four leased effects
bound allocation. The real board result stays mounted beneath the effect, so
completion does not replay spawn; blur, modal entry, resize or a consumed/moved
result cancels the overlay and exposes the committed board immediately.
Reduced motion uses a 140ms opacity reveal. [Merge acceptance](../../analysis/reports/motion/merge/results.json)
verifies actual drag/drop, visible reveal pixels, cancellation and durable reload;
[transaction/pool tests](../../analysis/reports/motion/merge.tap) prove failed saves
create no ghosts and completion cannot grant anything. Source art is unchanged.

TASK-0162 encounter regression: a hero's owned ID survives waves and bosses, but
its combat attack sequence restarts for each encounter. `HeroView` carries the
encounter ID so `useHeroCombatMotion` renews its director mount generation and
resets the HP/attack baseline on scene replacement. Zero/reset counters do not
start an attack; previous encounter callbacks cannot finish the new motion.
The hero's independent idle/spawn presenter stays mounted. See the
[regression evidence](../../analysis/reports/motion/encounter-regression/README.md).
