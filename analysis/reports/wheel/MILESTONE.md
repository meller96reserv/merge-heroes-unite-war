# Wheel delivery milestone

This is shared concise evidence under the delivery QA policy. Product completion
requires the reachable controller, durable reservation and confirmed-ad claim;
the presentation fixture alone does not complete the feature.

## TASK-0068 — Figma component

- Source: supplied Figma `YL2jFE10viR9zQV5GzBCuZ`, SCREEN-013/014/015,
  nodes 2:265 and 2:287; original sector export 2:634. Original ring, pointer,
  button, orb and back-arrow assets retain semantic IDs. Twelve live labels and
  a rotating sector group preserve the source composition.
- DEV browser fixture `?fixture=wheel-ui`: free/spinning/result/cooldown states,
  slowing rotation, pulse and disabled cooldown action. The fixture grants no
  game currency. The real battle header shows readiness and the saved countdown.
- PASS: typecheck, web production build, asset validator (38 source records,
  73 variants, 2 original component exports, 6 invalid-input cases).
- PASS: Chromium at 430×932, spin reaches Watch & Claim, cooldown disables CTA,
  Back returns to the playable battle, 0 app-caused console/page errors.
  One temporary screenshot was reviewed; exhaustive golden matrices omitted
  under the user-authorized batched QA policy.
- Full user-facing wheel flow, audio and native release acceptance remain open
  in their implementation tasks. User visual review remains the final visual gate.

## TASK-0136 — Outcome authority

- `fortune-v1` retains all twelve Figma labels in clockwise order; equal positive
  weights are an explicit project proposal. The reward RNG and saved spin ID
  select the result; rotation only projects its index. Existing selections replay
  without another draw. Twelve-hour duration is the product requirement.
- PASS: 2 `wheel-outcome.test.ts` tests cover exhaustive mapping, invalid weights,
  deterministic replay, conflicting IDs and reachability across the saved stream.
  Typecheck and pure-core build/boundary check PASS. Reservation/restart and claim
  correctness are the next dependent tasks, not claimed by this selector.

## TASK-0137 — Durable reservation

- A single transaction installs the pending result, advanced reward RNG, spin
  entitlement and 12-hour deadline. Pending results block rerolls after reopen
  and even after timer expiry. Bonus spins bypass cooldown; rollback is rejected.
- PASS: 3 `wheel-reserve.test.ts` correctness tests cover simultaneous duplicate
  requests, save/reload, pending expiry, exact cooldown boundary, bonus debit,
  rollback, and injected write/verify/flush failures with safe retry/recovery.
  Currency stays unchanged throughout reservation. Typecheck, core boundary/build
  and web production export PASS. Normal-game routing/claim follows TASK-0139.

## TASK-0254 — Rewarded operation authority

- Backward-compatible saved records bind placement, outcome, operation and app
  session. Only a matching completed result confirms eligibility; consumption is
  atomic with the owner's grant. Pending callbacks expire after a proposed ten
  minutes; confirmed entitlements survive restart. A new attempt invalidates the
  prior unconfirmed callback without removing the saved prize.
- PASS: 4 `rewarded-operation.test.ts` correctness tests cover cancellation,
  failure, unavailable inventory, wrong operation/placement/outcome/session,
  rollback/expiry, replacement, duplicate completion/consumption, restart, and
  failed confirmation/consumption writes. Existing wheel reservation save tests
  also PASS with the optional schema field. Typecheck and pure-core build PASS.
- This is domain authority, not a native SDK acceptance claim. Start.io device
  integration remains TASK-0258/0259; normal web cannot fabricate completion.

## TASK-0138 — Confirmed wheel claim

- The placement owner reserves an ad only for the existing pending spin. A
  matching current completion confirms its operation; the claim consumes that
  confirmation and grants the immutable saved outcome in one durable transaction.
  Failed/cancelled ads preserve the prize for another attempt. Saved confirmed
  operations can finish a claim without watching another video after restart.
- PASS: 3 `wheel-claim.test.ts` tests exercise all twelve outcomes (gold, three
  free spins and empty FAIL receipt), duplicate taps, restart, cancelled/failed/
  unavailable ads with retry, and failed claim save/retry without double payment.
  Typecheck and core build/boundary PASS. The actual screen controller follows.

## TASK-0139 — Reachable flow checkpoint (IN_PROGRESS)

- The battle Wheel entry now opens the actual interactive Figma screen. The same
  game/save powers reservation, decelerating motion, 12-hour timers, saved result,
  bonus spin availability, Watch & Claim, retry and return to battle. Confirmed
  claims recovered after a save failure use Claim Reward without another video.
- PASS: 2 controller correctness tests exercise the whole reserve/motion/ad
  failure/reopen/claim flow and failed post-video save/retry without another ad.
- PASS: `tests/browser/wheel-flow.py` through root dev preview: normal unavailable
  adapter preserves the prize; explicit DEV completion grants once. Both survive
  reload, close with Back/Escape and return to working purchase controls; 0 app
  errors. Production export also passes the normal flow with the DEV completion
  query ignored, and a real decelerating spin longer than 3 seconds.
- Typecheck and clean web export PASS. Audio ticks/result remain to be connected
  through TASK-0177/0181/0184. TASK-0139 stays IN_PROGRESS until its sound behavior
  is present. Native rewarded inventory remains its separate integration gate.

## TASK-0139 — Controller acceptance after audio integration

The prior checkpoint's missing sound is now implemented by TASK-0181: pointer
crossings trigger throttled ticks with the actual deceleration, landing plays an
original success or neutral empty-result cue, and haptics respect preference/focus.
Browser verification of the normal reachable Wheel produced 28 presentation
sounds with no errors; focus pauses/resumes loops without stale sound replay.
The existing normal/DEV-confirmed/production-ignores-DEV golden paths and durable
claim tests remain applicable. TASK-0139's controller is complete; Start.io device
inventory and final cross-product audio/native release review remain their named
tasks, and this does not assert overall product DELIVERY_COMPLETE.
