# Motion/VFX milestone notes

QA follows [the user's consolidated policy](../../../docs/qa/10_DELIVERY_QA_POLICY.md).
Short browser checks are implementation evidence; final user visual review and
native release smoke remain separate. No unperformed check is marked PASS.

- TASK-0168: exact same-batch normal damage sums, distinct critical labels,
  48-label/512-ID bounds, 650/800 ms rise/spread and reduced opacity-only motion.
  Pause clears cosmetics, target anchors follow hero/enemy positions. Typecheck
  and web production export passed. Existing damage/runtime tests plus the exact
  sum/saturation regression passed (3 tests). Chromium: real critical hit and
  actual game canvas render, zero app errors. One debugging image stayed in /tmp.
  Native execution and user final visual acceptance: not claimed.

- TASK-0169: bounded 24 symbolic coin/gem flyers consume new durable receipts;
  HUD balances remain authoritative immediately. Reduced motion skips flight,
  blur/resize cancels it and stale completions cannot grant anything. Typecheck
  and web export passed; receipt/repeat/cancel and failed-save runtime checks
  passed (2 tests). Chromium actual battle emitted five reward coins and cleared
  them on blur with zero app errors. No image capture was needed.

- TASK-0170: shared Reanimated press/selection ownership, 200 ms tab crossfade,
  280 ms exact-balance pulse and bounded notification reveal. Reduced motion
  retains opacity press feedback. Production HUD, purchase cards, boosts and
  navigation use these presenters; claimability selectors remain TASK-0132.
  Web export passed; Chromium purchase/counter, tab open/return and existing
  button/notice fixture passed with zero app errors. No extra visual matrix or
  new presentation test suite was created. User visual review remains available.

- TASK-0171: shared generation-safe 280/180 ms modal/route transition controller;
  exiting modal retains input ownership and invalidates stale completion work.
  Existing windows use React Native Modal for focus/Back/Escape ownership, with
  opacity-only reduced motion. Typecheck/web export passed (also confirming
  TASK-0170 types). Chromium opened/closed Heroes, Settings and Shop via Escape
  and Back, then bought a hero successfully; zero app errors. No images needed.

- TASK-0172: wheel angular motion accelerates continuously then decelerates to
  the supplied saved target, with 45 ms pointer/audio tick throttling. Fortune
  uses the proposed 900 + 2800 ms profile; win boost uses required 1500 ms.
  Animation never selects or grants an outcome. One mathematical regression
  covers monotonicity, target alignment and boost duration. Typecheck/web export
  passed; existing browser button harness replaced a running spin and settled
  only the current target with zero errors. Full wheel UI/claim flows remain
  TASK-0068/0136–0139/0257; this is their shared motion controller.

- TASK-0173: committed meta-event binding coalesces one burst per transaction,
  preferring reward/upgrade over equip feedback. Required daily/chest/relic/item
  event contracts share the same bounded original primitives and active-screen
  hook. Actual hero discovery after buy + drag/merge rendered a burst and modal
  entry cleared it; zero Chromium app errors, typecheck and web export passed.
  Daily/equipment/relic product controllers remain their owning DAG tasks; their
  eventual whole-flow acceptance is not claimed by this presenter checkpoint.

- TASK-0174: selected the allowed static fallback for flattened Figma scenery
  (GAP-005). Shared placement preserves the current composition and clamps image
  coverage to the visible world, without fabricated layers or idle timers.
  Typecheck/web export passed; Chromium at 390×844 rendered the actual game with
  zero app errors. Responsive matrix deferred to the one final responsive pass.

- TASK-0175: Expo Haptics 57.0.2 is pinned to the installed SDK recommendation.
  Native iOS feedback and Android semantic haptics consume explicit UI actions
  or one highest-priority committed event per transaction. Preferences, focus,
  deduplication and a 250 ms global cooldown suppress unwanted requests. Driver
  rejection cannot affect gameplay. Two service tests, typecheck/web export and
  browser purchase/tab smoke passed. Browser reports unavailable hardware;
  physical/native actuator behavior remains for native release smoke.
  API source: [official Expo Haptics documentation](https://docs.expo.dev/versions/latest/sdk/haptics/).
