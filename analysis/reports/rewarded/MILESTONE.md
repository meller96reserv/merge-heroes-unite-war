# Required rewarded-flow milestone

Core grant correctness and reachable UI/provider acceptance are separate.
Normal Web never substitutes a simulated completion for unavailable inventory.

## TASK-0255 — Free coins authority

- One unique completed shop operation grants exactly 1000 gold. No cooldown,
  debit, paid product or farming limit. Cancellation/no-fill/failure/stale-session/
  wrong-placement results grant nothing. A confirmed operation remains claimable
  after failed persistence or restart; operation/source receipts prevent duplicate
  grants. The owning UI uses a stable operation-based claim command ID.
- PASS: 3 core tests cover 40 separate videos at the same clock value, concurrent
  duplicate claims, rejected result paths and write/verify/flush failure with
  durable recovery/retry. Typecheck and pure core build PASS. Shop UI is TASK-0257;
  this core checkpoint alone is not a completed user-facing Shop feature.

## TASK-0256 — Durable stage boost

- A successful stage boundary records a 2-second offer in the same save as its
  base reward and stage advance. Base gold comes from that winning boundary's
  actual kill/first-clear receipts. This matches the existing displayed victory
  base; it never includes an unrelated prior balance or repays the base.
- Selection persists one x1–x10 result with the reward RNG before animation.
  Uniform integer weights are explicitly PROPOSED, not reference measurements.
  Expired unselected offers are removed at later wins; selected prizes survive
  interruption/restart. Only a bound completed video authorizes `(x−1) × base`;
  x1 writes a zero-bonus receipt. Missing/cancelled/duplicate callbacks cannot pay.
- PASS: 4 boost tests cover actual stage clear, offer boundary/rollback, all ten
  exact deltas, duplicate/restart, cancellation, and write/verify/flush failures
  in selection and claim without reroll/double grant. Eight related stage/reward/
  boss/audio tests still PASS. Typecheck, pure core and web export PASS.
  The visible 1.5-second multiplier presentation and ad controls are TASK-0257.

## TASK-0257 — Reachable reward screens

- Shop now opens a live Free Coins screen. Each completed video grants 1000 gold,
  with immediate repeat eligibility; cancel/no-fill displays a useful message.
  Stage wins expose Boost Reward for the saved 2-second offer. The selected
  multiplier animates for 1.5 seconds, then Claim starts the video. A pending
  Victory Reward remains reachable after Back/reload without rerolling.
- The shared controller retains actual completion callbacks across route closure
  and uses stable confirmation/claim IDs. A write followed by failed verification
  can retry the exact transaction without another video or duplicate currency.
- PASS: typecheck, web production export; 8 targeted navigation/Wheel/boost tests;
  6 real Chromium IndexedDB post-write failure cases across all three placements
  and confirmation/claim barriers, including route recreation and save recovery.
- PASS: one real-app browser smoke covers two consecutive 1000-coin videos,
  cancellation and normal-Web unavailable behavior, visible multiplier spin,
  Back/reload of the selected result, exact bonus receipt and return to battle.
  Zero app-caused console/page errors. The first smoke attempt used a too-short
  fixed second-video wait; waiting for the ready CTA/settled save passes.
- Minimal local screenshots were inspected, not committed. Shop/boost layouts
  reuse original Figma art; their ad-specific composition is PROPOSED because
  there is no supplied artboard for these two flows. User visual review remains
  the final presentation acceptance. Native provider/build checks are NOT_RUN
  here and remain TASK-0258/0259 and TASK-0202/0203. Normal Web cannot run Start.io;
  completed/cancelled fixtures require an explicit DEV query and are not ads.
