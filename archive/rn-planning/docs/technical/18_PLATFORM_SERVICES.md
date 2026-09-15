# Typed platform services

Direct TypeScript ports connect the shared application to storage, clock, audio, haptics, links and optional consented analytics. Use platform-specific adapter files only where APIs differ. No serialized game/host handshake or per-frame native messaging layer is required.

Async operations carry operation IDs and an application mount generation where cancellation matters. Validate external values before domain commands, reject stale/replayed results, serialize durable writes and retain receipts/watermarks. These correctness guarantees survive the architecture change. Time used for rewards comes from the core clock policy, never an untrusted callback timestamp.

SaveStore acknowledges only a durable completed write; audio and haptics acknowledge presentation only. Deep links use an allowlist plus unlock checks. Economic authority stays in game-core. Rewarded-only Start.io is now required where technically compatible; AppMetrica is selected. IAP and payouts remain excluded. Typed provider results identify a reserved operation, never an arbitrary reward amount. Only SDK reward completion permits a durable grant; missing/closed/failed ads do not.

TASK-0052 defines domain ports/fakes. TASK-0204/0205 cover typed platform requests and stale/duplicate-result tests; TASK-0206/0207 integrate storage and lifecycle. Historical protocol schemas remain archival fixtures, not production codegen inputs.

[Technical index](00_TECH_INDEX.md) · [ADR-007](../adr/ADR-007-RN-SKIA-RUNTIME.md) · [Task index](../../tasks/TASK_INDEX.md)

## Candidate native providers

Start.io uses a local Expo module, pinned Android 5.3.1 / iOS 4.14.0. Only explicit
rewarded requests can initialize/load/show inventory. Android auto-init provider,
splash, return and auto-interstitial ads are disabled; iOS return ads disabled,
no splash/banner/ordinary interstitial call exists. Ad close can report completion
only after that exact ad's video-completed delegate. JS validates operation ID,
placement, status and completion flag; bounded timeout/cancellation rejects late
callbacks. Missing owner app IDs produce unavailable, never a fake reward.
Ads default to non-personalized consent; SDK consent UI remains available.
Debug test inventory requires explicit configuration and cannot be enabled in a
release build. Source policies:
[Android SDK](https://support.start.io/hc/en-us/articles/360014774799-Integration-via-Maven),
[iOS SDK](https://support.start.io/hc/en-us/articles/360006012653-iOS-SDK-Integration-Standard).

Notifications use Expo 57 local daily/wheel reminders only after Settings opt-in
and OS permission. No remote push account/token is required. Disabling cancels
both scheduled IDs. Payload routing allows only battle/daily/wheel and rejects
extra properties, including reward amounts. Denied permissions keep play usable.

## Targeted supplied APK comparison — 2026-09-09

Read-only inspection of `docs/tz/com.chickenmaracana.pop.apk`, SHA256
`46346726285d9ffeab4f555c93b77b515033723e2c61ba70f6930eddf3c3dd25`,
using local Android apkanalyzer on manifest and StartApp Flutter adapter methods.
OBSERVED: manifest APPLICATION_ID metadata and StartAppInitProvider; adapter
loadFullScreenAd passes REWARDED_VIDEO to SDK loadAd, then showFullScreenAd
installs VideoListener and calls showAd. onVideoCompleted is separate from
adHidden/adNotDisplayed; ad objects are removed from its keeper on close/failure.
This establishes adapter structure, not live ad completion or application reward
authority. No reference ID, key, application code, ad URL or extracted resource
is copied. No exhaustive Flutter/application reverse engineering was performed.

Merge Heroes deliberately initializes explicitly from its own configuration and
removes automatic StartAppInitProvider. The existing native provider follows the
SDK rewarded load/show/completion sequence with per-attempt identity, cancellation
and a durable game-core grant. Only Free Coins (1000, unlimited), reserved Wheel
Watch & Claim, and reserved stage multiplier Claim are exposed. All videos load
dynamically through SDK inventory. Missing owner IDs remain explicit unavailable;
web/dev uses the existing opt-in debug provider. Live native fill remains NOT_RUN.
