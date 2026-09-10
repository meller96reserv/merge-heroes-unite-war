# Required UI milestone evidence

Small checks are grouped here under the delivery QA policy. Native release
checks and user visual acceptance remain separate; unreachable features are
never treated as complete.

## TASK-0128 — Navigation ownership

- Added the route history/load-generation and priority popup coordinator. Current
  Wheel navigation now uses it; Back preserves the prior route and saved prize.
  Popup IDs deduplicate, stale loads/exits are rejected, and a closing popup owns
  input until its transition finishes. Navigation has no reward/state authority.
- PASS: 2 coordinator tests, typecheck and web production export. Existing real
  browser Wheel flow passed normal unavailable and DEV confirmed-video paths,
  reopen/restart and return-to-battle, with zero app errors. Settings and remaining
  required routes still need their owning implementation tasks.

## TASK-0129 — Settings persistence binding

- Serial partial setting updates preserve other controls and use the dedicated
  settings revision. Music/SFX/haptics/reduced-motion/notification preferences
  persist through the existing save boundary. Closed controllers reject queued
  writes; failed writes preserve the installed preference and remain retryable.
- PASS: 2 controller tests plus the 2 audio persistence/lifecycle tests cover
  rapid ordered updates, real encode/decode, failure/retry and concurrent purchase
  currency. Typecheck and pure core build PASS. This completes the binding only;
  browser-visible Settings remains TASK-0067, implemented immediately next.

## TASK-0067 — Reachable Figma Settings variants

- Battle gear opens the real SCREEN-011 Settings window. Its secondary “Full
  settings” action opens SCREEN-010; Back/close returns through the prior route
  to playable battle. Original Figma panel/close art, layout anchors, fonts and
  interactive sliders/toggles are used. The full-screen gray panels required
  exact text-free component exports; the source image alone had a gold border.
- Music/SFX sliders support pointer and keyboard adjustment; committed gains and
  vibration survive restart. Notification permission is requested only from the
  toggle. Web denied/granted/revoked states reflect actual browser permission.
  Required native permission/routing remains TASK-0208, not claimed as tested.
- Legal actions use owner-configured HTTPS URLs and show an accessible error if
  unavailable. Final URLs remain external input under TASK-0231; no substitute
  legal document is invented. `.env.example` documents the two public fields.
- PASS: typecheck, asset validation (40 semantic imports, 77 density variants,
  5 text-free component exports), web production export. Browser Settings flow
  verifies both reachable variants, pointer/keyboard volume, saved mute/vibration,
  denied/granted/revoked notifications, legal fallback and return-to-battle;
  zero app errors. Initial empty-text console and invisible alert-host defects
  were fixed before acceptance; the final two screen compositions were inspected.
- The permission test uses Playwright's full `chromium` channel. A separate probe
  found headless-shell Notification.permission stayed denied despite an overridden
  granted Permissions API state. Full Chromium returns the actual override and
  passes the game test. This follows the documented [new headless mode](https://playwright.dev/docs/browsers#chromium-new-headless-mode).
  No production permission check was weakened for the test.
