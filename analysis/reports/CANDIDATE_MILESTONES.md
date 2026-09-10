# Runnable candidate milestones

## Entry and early platform — TASK-0062/0201/0202

Figma loading/start/error surfaces are reachable. Loading counts actual save and
mandatory asset loads; LET'S PLAY starts the shared Battle. Original transparent
logo variant, collage and panels are reused; legal actions use configured URLs
and honestly report missing owner URLs. Saved sound preferences apply before
native menu playback; browser playback respects user activation.

One service composition owns storage/audio/haptics/rewarded/analytics seams.
Native early Android build/install/Skia/touch/purchase/restart PASS on arm64 API36
emulator. Purchase increased owned heroes from one to two; restart preserved
both; combat reached stage_1_3. Initial async File.text handle and unawaited
Expo57 move errors are fixed: synchronous snapshot reads, awaited rename with
strong handle retention. Existing native transport contract test PASS.

Typecheck, 49 semantic assets/95 derivatives validation and one browser
entry/legal/purchase smoke PASS (zero app-caused console errors). Final visual
acceptance belongs to the user. Early iOS Simulator compilation PASS; installation,
launch, Skia/touch/Battle and restart smoke are NOT_RUN at the user-requested
pause. TASK-0203 remains IN_PROGRESS. Expo Swift compatibility patches preserve
ARC/thread/lifetime behavior and are reapplied by postinstall. Final
platform/provider integrations remain separate. Resume from
`analysis/reports/RESUME_CHECKPOINT.md`.

## Known issue — Android stutter

User reports successful launch of the Android build on a physical device, with
noticeable jank/stutter. Device/build metrics and cause are not yet measured.
Track under TASK-0229 and final TASK-0237 optimization/smoke: finish required
features first, then profile and optimize Android/iOS. Investigate earlier only
if a crash, broken input or unusable required feature appears. User-reported
launch supplements the existing emulator check; it does not claim performance
acceptance or a measured root cause.

## Equipment / Hero Upgrades — TASK-0063/0064/0119–0126

Heroes tab opens the Figma equipment composition with real owned hero selection,
six slots and inventory selection. Equip/swap/unequip, item enhancement, Open
x1/x10 and EXP → Hero Upgrades are functional shared RN/Skia flows. Upgrade rows
show live stats, orb costs, locked/affordable/max states in a clipped scroll list.
Permanent archetype levels survive merges; equipment on consumed heroes returns
to inventory. Stats update the current battle without resetting attack cadence.
Meta-v1 formulas are explicitly PROPOSED in docs/progression/10_EQUIPMENT.md.

PASS: TypeScript; asset validation (129 semantic records, 255 density variants,
5 component exports); targeted equipment/currency/duplicate/failed-write/restart/
merge/battle/boost tests. One real Chromium smoke opened both screens, inventory,
upgrade action and returned to playable Battle: zero app console/page errors.
Inspected two local screenshots; final visual acceptance stays with the user.
A stale Metro file map was restarted; npm run dev:web remains on port 8082.
No new native build was required for this TypeScript/asset milestone. Device
performance remains open for the dedicated final optimization pass.

## Daily / Relics / Dungeon — TASK-0065/0066/0133–0135/0242/0243/0246

All remaining Figma artboards are reachable shared interactive RN/Skia screens.
Daily reserves then claims 1000 gold once per UTC day, with durable pending claim
and rollback guard. Relics Open x1 (100 gold) / x10 (100 gems) atomically debit,
draw and persist collection/passive stats; last reveal survives restart. Three
Figma dragons use the existing battle/projectile/hero runtime, 45-second DPS
challenges, persisted attempts, independent chapter progress and exactly-once
win rewards/standard rewarded boost offers. Product values are explicitly
PROPOSED in the affected Daily/Relics/Battle content specs.

PASS: typecheck; 3 Daily and 4 extended-mode correctness tests covering duplicate,
failed-save retry, restart, x1/x10 RNG/currency, all three simulated victories,
timeout and abandonment. Browser Daily reserve/claim → relic opening → each
actual dragon entry/exit → Battle purchase PASS, zero app console/page errors.
One local visual inspection caught/fixed an opaque chest asset and stray JSX
whitespace rejected by Skia. Figma source assets remain unchanged. Final user
visual review and completed-feature native smoke remain pending.

## Platform safety primitives — TASK-0148/0156/0204/0205

Serialized save queue preserves every accepted economic commit and provides a
flush barrier/backlog status. Lifecycle generation guard pauses once and resumes
only the current foreground generation after pending writes settle. Typed
rewarded results require exact operation/placement identity and an explicit
completion flag; the request coordinator deduplicates, times out and rejects
late callbacks. Analytics adapter drops unapproved fields and requires consent.

PASS: five targeted platform tests (save failure/recovery and ordered revisions;
stale lifecycle generations; rewarded callback identity/timeout; analytics
consent, bounded queue and routing allowlist), latest 2026-09-09. Android SDK
compilation passed. Native UI/complete iOS runtime verification remain part of
the ongoing platform milestone and are not implied by these primitive tests.

## Native/platform integration — TASK-0132/0198/0203/0206–0210/0258

Both current native debug builds compile with Start.io (Android 5.3.1 / iOS
4.14.0) and AppMetrica RN 4.2.0. iOS launches the actual shared Skia game; its
purchase → Equipment → Upgrades → Battle → restart smoke passes. Android
Settings → full Settings → Notifications passes. Typed ad adapter and native
modules only confirm the matching rewarded attempt after video completion;
owner Start.io App IDs are still missing, so TASK-0258 remains IN_PROGRESS and
live-ad TASK-0259 remains NOT_RUN. No substitute completion is used in production.

Settings persist explicit analytics consent, independent volume/notification
controls; AppMetrica uses the project-specific TZ identifier, payload allowlist,
no location/advertising-ID tracking and a bounded consent-gated queue. Local
reminders use route-only payloads, no push registration or reward payloads.
Current A/B save and lifecycle barriers are shared and preserve prior checks.

PASS: typecheck, targeted platform/selector/settings/rewarded tests; iOS actual
build/install/input/navigation/restart; Android current SDK build and Settings
permission interaction. Web Equipment/Upgrades smoke has zero app errors.
Native blockers fixed: Hermes currency formatting; Expo Swift/source module
compatibility; drawing canvases intercepting touches; repeated asynchronous
asset/font loading. Final performance and standalone builds are still pending.

Native follow-up PASS: iOS decode/recovery validated both saved slots, four
purchased heroes and generation304 after restart; Android OS notification
permission is granted and the native analytics consent control was exercised.

## TASK-0229 / TASK-0258 — Battle controls and supplied APK check

Battle Speed/Auto/Gold buttons now reach actual functionality in dev:web.
PROPOSED booster-v1: 100-gold/60-minute auto entitlement, pause/resume and atomic
purchase-fed cascades; persisted 1×/2× combat leaves the two-second victory offer
unchanged. Targeted boost-controls + existing combat-runtime: 4 PASS, 0 FAIL.
Browser speed/activate/pause/Shop rewarded action PASS, app-caused errors 0;
typecheck PASS. Final TASK-0229 performance/standalone smoke remains IN_PROGRESS.
APK adapter comparison is documented in docs/technical/18_PLATFORM_SERVICES.md;
no reference identifier, code, video URL or asset was transferred. Owner live ad
verification gates final delivery directly, without blocking independent closure.

## TASK-0229 — targeted render and compact-screen checkpoint

Measured hot paths, memoized unchanged Sprite/Label/board and stabilized board
layout inputs. Same three-hero browser sample reduced inclusive render work;
Android Release indicative frame/PSS observations are in qa_defect_register.md.
Original art, VFX, audio, battle and reward behavior retained. Remaining rewarded
labels use the existing exact native-safe amount formatter. Targeted display/
stage-boost checks: 6 PASS. Typecheck PASS, profiled browser errors0.
Compact native smoke exposed clipped Relics action; complete Relics/Equipment
content now fits above navigation. Compact browser real-open/CTA smoke PASS.
Final native route retest/build packaging remains active.

## TASK-0229 / TASK-0234 — final runnable checks

Android standalone Release APK/AAB and iOS arm64 Release Simulator build PASS.
Final native routes: Equipment/Upgrades, Daily (iOS), Relics real Open, Infernal
Dragon entry/Battle/leave, Settings, Wheel, Shop unavailable, restart PASS. Both
hosts preserve reserved Wheel result after unavailable ad and restart; native
analytics controls PASS. Current iOS A/B files decode/validate (generation923,
heroes4, relicCopies1, pending Wheel reserved). Existing business correctness is
reused. Production web export and default/compact/tablet gameplay/restart smoke
PASS with app errors0. Android20 libraries/ZIP16KB alignment PASS.

Only external provider/legal/distribution inputs remain. Live ad completion and
AppMetrica owner-dashboard receipt are not claimed. Final visual/audio review and
physical Android comparison belong to the owner per the agreed QA policy.


## TASK-0229 — physical review corrections, economy and runtime textures

Runtime checkpoint 413986f, version 0.2.1 (3). The owner defect pass is code-closed
with focused correctness checks, source-preserving texture audit and final native
builds/smoke. Existing acceptance is reused where code did not change. User
physical visual/audio/pacing review and external live-ad/legal/signing gates stay
explicit in qa_defect_register.md; DELIVERY_COMPLETE is not asserted.

Final artifacts0.2.1-3 packaged from source checkpoint38f58a8: APK/AAB, iOS
Simulator ZIP and project ZIP. All SHA256/ZIP CRC checks pass; APK/AAB embedded
JS match, iOS metadata0.2.1(3), archived runtime source matches the built source.
Planning consistency34PASS,0errors; active DAG acyclic/no dangling dependencies.
