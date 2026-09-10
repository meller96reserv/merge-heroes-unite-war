# TASK-0259 — actual native rewarded verification

Live Start.io inventory: NOT_RUN. Owner Merge Heroes Android/iOS IDs are absent.
No IDs from the supplied APK were reused. SDK adapters compile on both hosts;
Android and iOS standalone apps launch with the provider returning unavailable.
Confirmed/duplicate/stale/cancel/failure/timeout authority is covered by existing
pure controller and platform tests, reused without a duplicate full-suite run.

PASS on final Android/iOS Release candidate: native analytics toggle; Wheel result
reservation, unavailable-video rejection, and the same pending Watch & Claim after
restart; Shop unavailable behavior. Actual iOS saves validate pending reserved and
cancelled ad operation, with no completed grant. This cannot establish live
SDK completion, no-fill or dismissal callbacks without owner IDs/inventory.

After owner configuration: load a real rewarded video separately on each host;
confirm exactly1000 Shop coins, saved Wheel reward only after completion, and
reserved stage multiplier bonus only after completion. Skip/fail/background/
stale/duplicate must not grant. No banner/interstitial/automatic format exists
in the application. Keep raw SDK/network logs local and sanitize evidence.
