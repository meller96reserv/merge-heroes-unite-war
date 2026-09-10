from plan_common import *

docs={
'01_ARCHITECTURE':('Architecture','''Decision status: [PROPOSED, conditional native acceptance]. Cocos Creator 3.8 LTS renders the game. A pure TypeScript game-core owns simulation, currency, merges, progression and reward transactions. React Native owns application entry, native lifecycle, system integrations and storage transport. No engine classes cross the domain boundary. Exact Cocos patch, RN version and native toolchain are locked together by PHASE_03; neither the old deleted app nor a fresh React web prototype is a foundation.

Dependency direction: mobile-shell → native host → Cocos adapter → game-core. Domain emits immutable event batches; presenters read selectors and subscribe by mount generation. Infrastructure implements Clock, RNG, SaveStore, Logger and optional Analytics ports. Domain tests use fake ports. Cocos components may animate projected state, never credit currency on tween completion. Game data is versioned and validated before domain creation.

Boot order: RN creates session → Cocos boots assets and bridge → game.ready → app.initialize with configuration, safe area and settings → validate/load/migrate save → reconcile offline entitlement → install state → render → accept commands. Invalid required config stops loading with a retryable diagnostic, not a half-populated scene. Reward/save writes are serialized; native callbacks do not re-enter a transaction.

Single game instance per host session. Opening a meta screen changes the presentation route; application background changes lifecycle separately. A foreground modal can leave battle running, but modal input owns hit testing. Domain tick never crosses the bridge. Currency/stage summaries are coalesced and sent only after commit.

Architecture acceptance: run domain with no cc/RN imports; Cocos web preview uses the same domain; duplicate host callbacks do not duplicate rewards; disposal removes all subscriptions; both mobile hosts pass the spike before production integration.'''),
'02_REPOSITORY_STRUCTURE':('Repository structure','''[OBSERVED] Current repository contains source documents and an empty AGENTS.md; no current package manifest or runtime exists. The user's removal of the old app is preserved. This planning run creates only documentation, schemas, research captures and analysis scripts.

[PROPOSED] Future roots: game-core/src/{model,commands,systems,events,ports,selectors,config}; game-core/tests/{unit,simulation,fixtures}; cocos-game/assets/{scenes,prefabs,scripts,game-data,art,audio}; mobile-shell/{src,android,ios}; tooling/{assets,config,visual,balance}; tests/{integration,e2e,goldens}; spikes/rn-cocos for the isolated feasibility project. Keep engine-generated build products, private signing assets and node_modules out of version control. Commit source .meta UUID files beside Cocos assets.

Domain modules: currency/Amount, commands/PurchaseHero, commands/MergeHeroes, systems/BattleSystem, systems/StageSystem, systems/RewardService, systems/OfflineService. Adapters: CocosGameController, HeroView, EnemyView, BoardView, InputRouter, AnimationDirector, AudioDirector, SaveCoordinator and HostBridge. RN exposes GameHostScreen plus a typed GameHost native module; it does not duplicate game navigation or battle UI.

Package manager, scripts and exact dependencies are a PHASE_04 decision after the spike. Intended commands build:core, test:core, validate:data, preview:web, capture:visual and test:bridge are contracts to implement, not commands that already work. Each task lists future files explicitly. Generated content must have a generator/source path and deterministic output. Root documentation stays readable without installing Cocos.

Acceptance: dependency lint prevents game-core→cc/RN imports; all configuration has schema validation; production build excludes research images and debug harnesses; clean checkout build is demonstrated in PHASE_20_BUILD_AND_CI documentation, with secrets supplied externally.'''.replace('PHASE_20_BUILD_AND_CI','20_BUILD_AND_CI')),
'03_DOMAIN_GAME_CORE':('Domain game core','''The deterministic core accepts Command objects with commandId, expectedRevision where necessary and typed payloads. The dispatcher validates state/config, builds a draft, produces a transaction result and commits through SaveCoordinator for durable actions. A rejected command returns a typed reason and leaves state hash and RNG state unchanged. Read-only selectors never mutate state.

Use canonical decimal currency strings at serialization boundaries and bigint arithmetic inside Amount. Combat integers must stay within validated safe bounds. Separate seeded combat RNG from reward RNG. Reward outcomes are persisted before presentation; RNG state is not reset by a reopened popup. Logical world time, monotonic simulation time and UTC wall time are separate clocks.

Tick order is fixed: cooldowns → target selection → attack intents → due hits → damage/deaths → reward commits → stage transition events. Proposed step is 50 ms, at most five catch-up steps; background suspends simulation and delegates elapsed-time rewards to OfflineService. Same seed and ordered commands produce identical state/events at a specified tick count. Real timers, browser globals, audio and node positions are forbidden in rules.

Invariants: no negative balance; each owned hero occupies exactly one unlocked slot; deployed IDs are owned and within cap; IDs are unique; merge reduces occupancy by one; stage first-clear watermark never decreases; every granted claim has a receipt or persistent source watermark; no transient animation lock is restored from save.

Tests target behavior: equality-cost purchase succeeds; one-less fails; cross-family merge rejects; boss lethal hit/timeout tie follows configured order; duplicate claim command grants once; split tick batches produce the same result. Long simulated runs report impossible states, not just final snapshots.'''),
'04_COCOS_RENDERING_LAYER':('Cocos rendering layer','''Cocos is a projection and interaction layer. Boot scene loads minimal UI, then Battle scene composes background, combat entities, board, HUD and navigation. Meta panels are prefabs on a stable root; opening equipment does not instantiate another domain. Asset semantic IDs resolve through a generated registry of SpriteFrame UUIDs, not hash filenames.

Canvas layers from back to front: WorldBackground 0; BattleEntities 100; BattleVFX 200; Board 300; HUD 400; Navigation 500; PopupDimmer 600; Popup 700; Tutorial 800; Toast 900; Debug 1000. Tutorial mask permits only a named target. Pointer capture routes one gesture to one owner; closing a popup consumes that pointer-up so it cannot buy a hero underneath.

HeroView binds immutable instance ID, definition visual, ground pivot and deployment state. Presentation snapshots interpolate render positions; domain range/target calculations do not inspect transformed sprites. Pool release cancels tweens, clears callbacks/material overrides and increments generation. A late effect callback checks generation before touching a reused node.

Flat Figma characters receive whole-sprite squash/rotation/offset animation; no automatic limb cutting. A floor shadow is a separate primitive below the sprite. 9-slice values require calibrated metadata; unknown insets do not receive arbitrary stretch settings. All animation profiles have reduced-motion and low-quality paths.

Acceptance: same core state can be rendered after route change or interrupted merge; paused/frozen debug mode shows the committed result; no reward is lost when its VFX is skipped; Cocos web and native use the same prefabs and layouts.'''),
'05_EVENT_SYSTEM':('Event system','''Use a typed union of domain events with eventId, transactionId, revision and simulationTick. An event batch becomes visible only after its authoritative state commit. Subscribers receive snapshots/read-only event values. Presentation events are not commands and cannot recursively mutate the same draft.

Core families: hero.purchased, hero.spawned, hero.merged, hero.discovered, hero.deployed, hero.withdrawn, battle.attackStarted, projectile.released, battle.hit, battle.critical, enemy.died, boss.spawned, boss.failed, boss.defeated, stage.changed, reward.committed, currency.changed, unlock.changed, quest.progressed, daily.claimed, wheel.reserved, wheel.landed, equipment.changed, settings.changed. Entity IDs and amounts are payload fields; event names remain low-cardinality.

Dispatch is ordered within a transaction. Presenters may coalesce currency counter updates by revision, never reward receipts. Quest progression consumes committed source event IDs exactly once. Audio and haptics subscribe through their directors, allowing cooldown/concurrency budgets to suppress presentation without affecting game rules.

Subscription API returns an idempotent dispose callback. Scene/popup scope owns its subscriptions and cancels all on teardown. Dispatch uses a stable subscriber snapshot so unsubscribe during an event cannot skip another observer. Observer exceptions are logged and isolated; they do not roll back an already persisted transaction.

Acceptance: nested commands queue after current commit; one failing UI listener cannot block save; ten route enters/exits leave listener count at baseline; duplicate native reward callback maps to one reward command and one receipt.'''),
'06_STATE_MANAGEMENT':('State management','''Maintain one normalized GameState and a separate ephemeral ViewState. GameState contains player, balances, owned heroes, board, progression, stages, equipment, unlocks, claims, settings and source watermarks. ViewState contains selected tab, popup stack, drag pointer, animation handles and inspection selection. See the save schema for persistence fields; derived DPS, red dots, affordability and formatted numbers are selectors.

AppState: Boot→Loading→Ready or RecoverableError; Ready can become Backgrounded or Exiting. MainBattleState: Idle/Encounter/Boss/Farming. MergeState: Idle/Validating/Committed/Presenting, with presentation cancellation returning to the current authoritative board. PopupState is an ordered queue with priority and dedupe key, not multiple booleans that can overlap.

Rewards follow a durable draft barrier. During an outstanding save the old visible balance remains authoritative; conflicting purchases/claims queue or return busy. A success installs the new revision then emits events. A failed write retains the old state, presents retry and keeps the same commandId for retry. Non-economic simulation state can checkpoint at a measured cadence, but kill rewards and stage transitions may not overtake the durable queue.

Red dots are derived from claimable rewards, affordable upgrades and unlocked unseen content; announcedIds survive restart. UI selection may be reset safely after migration. A changed account closes the current session before loading another save namespace.

Acceptance: opening the same popup twice produces one entry; updating a balance refreshes only subscribed selectors; interrupted animations reconcile state; stale expectedRevision returns a typed rejection without partial mutation.'''),
'07_CONFIG_AND_DATA_SCHEMAS':('Configuration and data schemas','''Planning contracts live in data-spec. Future runtime data is generated into cocos-game/assets/game-data from reviewed source tables. Each record uses stable semantic IDs, explicit schema/data versions and evidence provenance. Observed values and proposed fixtures are separate files. Figma text is a visual fixture, not a balance import.

Validation order: parse JSON → JSON Schema 2020-12 → unique IDs → foreign keys → numeric bounds → graph constraints → visual/audio/profile existence → evidence/fidelity policy. Fail a build on unknown hero/asset references, zero total wheel weight, non-advancing merge results, circular next-stage graph, inaccessible required slot unlock, or reward table with an unsupported grant kind. Disabled optional modes are explicitly disabled, not populated with invented values.

Monetary values use canonical strings without leading zeros or floating notation. Rates declare time units; percentages use basis points. Timing fields end in Ms. Currency display is localized separately and never reparsed for transactions. Large-number fixture boundaries include 999/1000/999999/1000000 and values above Number.MAX_SAFE_INTEGER.

Generated data includes a content digest and source report; production startup verifies supported versions before state hydration. Config updates cannot invalidate active wheel outcomes or remove owned item definitions without an explicit migration/alias map. Tables can include reference-evidence IDs but production may strip large research metadata.

Acceptance: validate all configs in CI before Cocos build; invalid references produce file/record/field diagnostics; a proposed fixture cannot silently pass the reference-parity release gate; generated output is byte-stable for identical inputs.'''),
'08_SAVE_SYSTEM':('Save system','''[PROPOSED] SaveStore exposes readCandidates(namespace), writeCandidate(slot, bytes), verifyCandidate(slot), and flush(). The coordinator serializes mutations and maintains two full snapshots A/B with generation and checksum in a storage wrapper. The JSON save payload itself follows save.schema.json. Checksum detects corruption, not cheating. A pointer is only a hint: boot scans both candidates and chooses the newest valid supported generation.

Commit procedure: validate command → clone draft → apply debit/grant and source watermark/receipt → encode canonical payload and checksum → write inactive slot → read/verify → install revision in memory → publish events → update active pointer best effort. If write fails, retain prior authoritative state. A crash after verified write and before presentation restores the new committed state; duplicate command/claim IDs return prior outcome. Never award from a popup completion callback.

Namespaces include local account ID and environment; guest and signed-in saves are never blindly merged. Settings share an explicit authority policy with RN: initialization hydrates saved preferences, later host changes are versioned. Save.changed bridge messages are invalidation metadata, not a second save writer. Web preview uses an IndexedDB adapter; native uses an app-private atomic file adapter owned by the host integration.

Checkpoint budget is measured on target devices; coalesce safe progress snapshots but never collapse independent claim watermarks. Retain bounded receipts only after source-specific monotonic watermarks preserve replay protection. A future server-authoritative purchase receipt cannot be pruned like a local combat reward.

Acceptance: corrupt A restores B; corrupt both shows recover/reset choices without silently deleting originals; full disk blocks durable purchases with retry; crash at each commit step never creates a partial debit or duplicate grant. See migration and QA documents.'''),
'09_SAVE_MIGRATIONS':('Save migrations','''SchemaVersion describes shape; dataVersion describes content; app/build version describes binaries. Never conflate these numbers. Version 1 is a proposed first shipped format. No real existing player saves are present in this repository and no production migration is executed by planning.

Migration pipeline: read both candidates → validate wrapper/checksum → detect version → copy original to recovery archive → apply pure sequential migrateVnToVnPlus1 functions on a draft → resolve content aliases → validate full latest schema/invariants → persist a new generation → hydrate. Unknown future versions are read-only blocked with an update message. Never downgrade by guessing fields.

Proposed synthetic v0→v1 test: convert safe integer currency values to decimal strings, initialize sourceWatermarks empty, map old discoveredTier integer to explicit discoveredTiers list only from documented v0 semantics. Unsafe integers or missing item aliases reject with actionable diagnostics. This is a test fixture contract, not a claim that such a released v0 exists.

Content removal requires migration mappings for heroes, equipment, stage IDs and pending wheel reward IDs. Preserve monetary totals and owned-item uniqueness. Quarantine unknown optional content for support; do not silently sell or delete it. Migration must be idempotent at the coordinator level: once new generation exists, another boot does not regrant migration compensation.

Acceptance: fixtures for every supported version, malformed values, missing aliases, interrupted write and future version; source backups remain byte-identical; migration output has valid invariants and identical replay results on repeated independent runs.'''),
'10_OFFLINE_TIME_SERVICE':('Offline time service','''Use injected WallClock.nowUtcMs for offline/daily deadlines and monotonic time for live simulation. Lifecycle records lastActiveAt after flushing; resume does not feed wall-clock elapsed time into battle ticks. Current reference offline formula remains UNKNOWN; the proposed fixture earns only gold at configured rate, capped at eight hours, with no offline stage advancement.

Compute interval [lastProcessedAt, now]; elapsed=max(0, min(now-lastProcessedAt, capMs)). Convert using integer seconds with an explicit remainder policy, then Amount multiplication. A reversed clock grants zero and records a clock anomaly without moving the durable watermark backwards. A huge forward jump is capped; keep lastProcessedAt monotonic. Local-only time cannot prove trusted elapsed time against a user changing the clock.

Before showing the offline popup, persist a pending entitlement with stable claim ID, from/to timestamps and grants. Claim atomically credits, stores receipt and advances watermark. Reopening, process death, duplicate resume and two claim taps reuse that entitlement. A later interval starts after its toAt; never recompute a pending reward with newer rates or configuration.

Foreground modals are separate from app background. Reference settings did not pause combat; whether all routes do so is still a capture task. A short inactive interval can be suppressed by a configurable minimum, but the watermark must still advance so repeated short sessions cannot accumulate a duplicate interval.

Acceptance: zero/negative/cap/cap+1 intervals; UTC midnight and timezone change; suspend/resume twice; kill before popup, during claim and after commit; every interval grants at most once. No claim of server-grade clock security.'''),
'11_ASSET_LOADING':('Asset loading','''Source inventory contains 351 images, approximately 905.53 MiB decoded RGBA if all loaded. This is a source-library size, not a runtime budget. Load a minimal boot bundle, then shared HUD/board plus current-world entities. Equipment, relic, dungeon and reward art load on route demand. Release route-specific references after transitions and pool drains.

Use semantic asset IDs from analysis/figma/semantic_map.json. Import tooling chooses the appropriate resolution variant by measured on-screen size, preserves aspect ratio/alpha and commits Cocos .meta UUIDs. Original .fig and extracted source hashes remain unchanged. Reference screenshots and marketing frames are excluded from runtime bundles.

Atlas groups: ui_common, ui_battle, ui_meta, icons_currency, portraits, equipment_by_family and effect_primitives. Large full-screen backgrounds remain standalone; large character variants are sized before packing. Target atlas edge 2048 initially; avoid one all-assets atlas and scene-spanning accidental residency. Mipmaps default off for pixel-aligned 2D UI, enable only after a world-scale sampling test. Platform compression choices are benchmarked for alpha/outline fidelity.

Loading failures display retry/fallback for optional visuals; a required definition visual failure prevents entering a broken battle. Asset requests have cancellation/generation guards. Concurrent requests deduplicate by bundle key; releasing an old screen cannot evict assets retained by another.

Acceptance: cold boot does not decode all 351 sources; ten meta-route cycles return near baseline memory; airplane-mode native launch uses bundled essential assets; atlas changes preserve trim offsets and grounded character feet.'''),
'12_OBJECT_POOLING':('Object pooling','''Pool enemies, projectiles, damage labels, hit flashes, coin/gem flyers, particles and temporary merge rings. Hero instances can be retained while owned; pool their visual nodes only when identity binding is reset. Never pool domain IDs or reuse reward transaction IDs.

Pool contract acquire(profile)→handle{node,generation}, release(handle). Reset transform/opacity/material/label/audio handles, remove listeners, stop tweens, clear scheduled callbacks and cancel target references. A stale release with another generation is ignored and logged in debug. Pool capacity is bounded; cosmetic overflow drops an effect or uses a simpler combined label. Domain attacks/damage continue regardless of pool availability.

Initial proposed caps: projectiles64, damage labels48, hit flashes32, currency flyers24, merge rings8, enemy views24. These are instrumentation starting points, not measured device limits. Prewarm gradually after first frame to avoid a boot spike. Record peak occupancy, allocation misses and dropped cosmetics per encounter.

Stress fixture: 20 attackers, 20 enemies, simultaneous crit/death/reward burst, then navigate away mid-effect. After two minutes there must be no unbounded node count or retained entity reference. Low quality reduces particle count and flyer count before lowering domain tick rate; do not alter damage, reward or RNG.

Acceptance: acquire-release-reacquire has clean state; teardown invalidates callbacks; pool saturation changes only visuals; profiler shows no recurring per-hit node allocation after warmup.'''),
'13_AUDIO_RUNTIME':('Audio runtime','''AudioDirector resolves semantic events through audio-event configuration and an acquired asset registry. Buses: music, sfx, ui, ambience and optional voice. Master mute, per-bus gain, focus state and lifecycle mute compose multiplicatively. Missing optional audio produces a diagnostic once, then silence; it does not block a reward.

Prioritize UI confirmations, merge result and boss cues above ambient combat repetition. Enforce event cooldown plus global voice budget (proposed 24 SFX voices, four UI, two music crossfade sources). Steal the oldest lowest-priority cosmetic voice. Pitch variation uses presentation RNG, independent of reward/combat RNG. Music ducking uses reference-counted duck requests with bounded attack/release so interrupted popups do not leave music permanently quiet.

Native host owns platform audio focus and interruption signals; Cocos owns playback and mixer settings. On app.pause, stop/hold loops and suspend new one-shots; resume restores one loop per bus and never replays all missed combat sounds. iOS phone call/interruption, Android transient focus loss and headphone changes are explicit spike/QA cases. Web audio unlock requires a user gesture and may remain muted before it.

Assets are new original or licensed work. No source audio was extracted from the reference. Acquisition ledger records author, license, source and proof. Decode short SFX ahead of use; stream longer music where supported and measured. All looping clips have clean loop boundaries.

Acceptance: mute persists; repeated resumes do not double music; 100 hit events respect limits; rewarded action produces one confirmation even after duplicated callback; mix is evaluated on speaker and headphones.'''),
'14_PERFORMANCE_BUDGET':('Performance budget','''All budgets are [PROPOSED acceptance targets], not measured outcomes. Target60 fps on representative mid/high devices and stable30 fps on the low tier. At60 fps, p95 frame time≤16.7 ms and p99≤33.3 ms during the core stress fixture; low-tier p95≤33.3 ms. Measure native release builds after warmup, record thermal state and device/OS/build identifiers.

Initial ceilings: resident textures≤128 MiB in battle, total process resident memory≤350 MiB on low-tier target, draw calls≤150 for battle and≤220 during reward overlay, active nodes≤1000, steady-state per-hit node allocations zero. Cold interactive launch≤5 s on mid-tier local install; warm host re-entry≤1.5 s. These numbers must be revised with evidence if engine baseline alone exceeds them, not silently ignored.

Bridge carries control and summaries only: no per-frame transform traffic, normal summary rate≤4 messages/s, maximum encoded message64 KiB, batched events≤32. Save commit p95 target≤50 ms on device; queue length and oldest age are visible. If persistence throughput cannot sustain combat rewards, redesign the journal/barrier with crash tests before relaxing durability.

Collect Cocos profiler, Android Perfetto/memory and iOS Instruments allocations/time profiler with release symbols where available. RN JS/UI thread and Cocos render/simulation thread measurements are separate. FPS alone cannot detect growing native heaps or bridge stalls.

Acceptance: ten host reopen cycles and 30-minute stress session show no monotonic memory slope after warmup; record raw traces and percentile method; low-quality fallback preserves state hash for identical input/seed.'''),
'15_REACT_NATIVE_COCOS_INTEGRATION':('React Native and Cocos integration','''Status: [PROPOSED strategy A; NOT VERIFIED]. Compare A: full-screen native Cocos Activity/ViewController launched from RN; B: embedded Cocos surface as RN native view; C: Cocos web build in RN WebView. A is preferred for a clear engine/lifecycle owner and native rendering. B adds surface sizing, touch arbitration, render-context ownership and simultaneous RN composition risks. C can provide a fallback preview but changes performance/audio/storage behavior and cannot be silently substituted for the native requirement.

Android and iOS must share the versioned bridge contract but may use different host glue. Current RN documentation describes TurboModules/codegen for new native integrations; current Cocos 3.8 documentation exposes Java/Objective-C reflection and script callbacks. These primitives do not prove that a supported RN+Cocos integration exists. The spike must prove the assembled product on installed versions.

The environment has Xcode26.3 and Android SDK/emulator tools; no Cocos Creator installation was found in inspected standard locations. There is no Cocos native export or RN package in the current repository. Planning deliberately includes an executable spike plan and acceptance ledger, not a fabricated successful build. Installation/version lock is a concrete first spike task. Full production host work depends on its pass report.

Spike scope is a colored Cocos scene, tap counter, bidirectional ping, lifecycle/audio probe and repeated enter/exit. No game features. Run 10+ reopen cycles, rotate/background/foreground, Android Back, iOS dismissal, process death and invalid/stale message cases. Capture build commands/logs, device IDs (redacted for sharing), memory traces and screen recordings.

Failure path: repair lifecycle/ownership once with a bounded issue list; if native A cannot pass, record ADR evidence and compare B, then C, with explicit fidelity/performance tradeoffs. Flutter is only a separately approved architecture change after evidence, never an automatic implementation detour.

Primary sources: [RN native platform](https://reactnative.dev/docs/native-platform), [Turbo native modules](https://reactnative.dev/docs/turbo-native-modules-introduction), [Cocos Java reflection](https://docs.cocos.com/creator/3.8/manual/en/advanced-topics/java-reflection.html), [Cocos Objective-C reflection](https://docs.cocos.com/creator/3.8/manual/en/advanced-topics/oc-reflection.html).'''),
'16_ANDROID_INTEGRATION':('Android integration','''[PROPOSED] RN MainActivity starts GameActivity through a generated native module. GameActivity owns the exported Cocos engine lifecycle and native surface; do not create another engine from every React render. Prefer one active engine session with explicit destroy/re-enter semantics verified by the selected Cocos export. Exported Gradle/CMake files are inspected before deciding module boundaries.

GameActivity forwards onPause/onResume, surface events, low-memory and Back through the engine's supported lifecycle. Native callbacks marshal to the Cocos game thread before script evaluation, and to the RN/native-module thread expected by RN. Never call JS from an arbitrary audio/network callback. Avoid constructing executable JavaScript from unescaped bridge payload text; use a fixed registered receiver plus safe JSON argument encoding.

Back handling: dismiss top in-game popup first, then ask the game for a durable exit checkpoint; return to RN once acknowledgment or bounded timeout occurs. Exit timeout reports a save warning and retains last valid generation, rather than claiming a successful flush. Android process recreation restores from disk, not static Activity references. No Activity context is held by a long-lived singleton after destroy.

Audio focus has one owner. Background interrupts live ticks and queues one resume/offline reconciliation. Safe areas/system bars are measured on the current surface and delivered in physical/logical units explicitly. Test gesture navigation, display cutouts, keyboard dismissal, low memory and rapid Activity reopen.

Acceptance artifacts: installable debug and release-like APK/AAB test build, device logs, touch/ping/Back video, ten-cycle memory trace and crash-free process recreation. API levels, NDK/AGP, ABI and store requirements are pinned/verified during spike/release tasks; planning does not invent compatibility results.'''),
'17_IOS_INTEGRATION':('iOS integration','''[PROPOSED] RN presents a full-screen GameViewController wrapping the exported Cocos native view and engine owner. It must implement a single lifecycle authority; RN view rerenders cannot create duplicate engine instances. The chosen Cocos patch's generated Objective-C++ entry points determine which host files are moved into a reusable target.

Bridge calls cross onto the engine/game thread using supported scheduling; RN events return through its expected native-module dispatcher. Keep Objective-C++/C++ lifetimes explicit. Do not capture the controller strongly in permanent callbacks. Dismissal cancels callbacks and releases surface resources only after the engine acknowledges shutdown or a documented retained-engine policy.

Scene/application inactive, background, foreground, audio interruption and memory warning are distinct events. Stop live simulation on background, flush durable state, and restore audio once. Test home indicator/safe-area changes, permission overlays, headphones and phone interruption. Orientation is portrait for this product; iPad/tablet letterboxing/adaptation follows responsive spec.

Build simulator first to inspect integration, then a physical device for graphics/audio/performance. Signing identity and provisioning are release inputs; never place certificates/private keys in source. Xcode26.3 is locally present, but this is not evidence of a compiled RN/Cocos app. If no physical iOS device/signing is available during spike, attach simulator result and name the device-only checks still blocked; production gate remains closed.

Acceptance: RN screen→game→RN repeated10+ times; native render/touch and bidirectional events work; no duplicate music; Instruments allocations settle after warmup; process termination restores a valid save. iOS failure cannot be hidden by an Android-only success.'''),
'18_BRIDGE_PROTOCOL':('Bridge protocol','''[PROPOSED protocol v1]. Envelope: version, type, requestId (nullable for notifications), sessionId, generation, sequence, timestamp and typed payload. All messages validate against bridge.schema.json plus bridge-payloads.schema.json. UTF-8 JSON maximum64 KiB; sequence is monotonic per sender/session. Timestamp is diagnostic, never a trusted reward clock.

Handshake: Cocos creates session generation and emits game.ready with supported protocol/build capabilities. Host sends app.initialize with same session/generation, environment, safe areas, settings and optional initial route. Game validates exactly once; duplicate initialize with identical requestId returns cached status. A changed account requires closing old session, clearing callbacks and a fresh initialization. Unsupported major version returns game.error and prevents economic commands.

Game→host: game.ready, game.error, game.exitRequested, progress.stageChanged, currency.changed, reward.claimed, purchase.requested, ad.rewardRequested, analytics.event, save.changed, player.levelChanged. Host→game: app.initialize, app.userChanged, app.purchaseResult, app.rewardGranted, app.pause, app.resume, app.settingsChanged, app.deepLink, app.notificationOpened. See the machine-readable protocol catalogue for payloads, direction and retry/ordering policy. Purchases/ads are disabled in MVP; message boundaries are reserved, not production integrations.

Requests get stable requestId. Side-effect result callbacks include an operationId/transactionId bound to the pending request. Duplicate results reuse an existing receipt; stale session/generation is rejected. Missing/out-of-order control messages trigger state resynchronization, not replay of arbitrary economic actions. Only app.rewardGranted from an authorized pending operation can request a grant; arbitrary host input cannot name unrestricted currencies/amounts.

Timeouts: proposed handshake10 s, pause flush2 s, external purchase/ad120 s with cancel/pending reconciliation. Transport can retry idempotent initialize/settings/control with same requestId and bounded backoff. Never retry a purchase charge by minting a new ID. During background, queue bounded summaries and coalesce by revision; discard old presentation notifications.

Acceptance: schema rejection includes field path; unknown type/version, oversize, duplicate, stale generation, reordered callbacks and teardown are covered in the native harness; no per-frame bridge traffic.'''),
'19_WEB_PREVIEW_AND_DEBUG':('Web preview and debug','''Cocos Web is the preview renderer for the same domain, data and prefabs. Do not build a separate React battle prototype. Web preview is useful for deterministic screenshot capture, state inspectors, input simulation and early mechanic QA; it does not prove native lifecycle, memory, audio focus or integration feasibility.

Debug-only panel: fixed seed; pause/step tick; freeze animation progress; set fixture state; force stage/boss; grant test currency through a clearly marked debug command; inspect state/revision/receipts; show hitboxes/pivots/safe areas; pool counts/draw calls; mute/solo buses; simulate offline interval and storage failure. Production build excludes this panel, debug commands and unrestricted state import.

Visual harness loads a named fixture with stable clock/seed, exact viewport and fonts, then freezes motion at an explicit marker. Captures pair with Figma source screen IDs and an adaptation mode. Hide debug overlays in final goldens but attach measured anchor reports. Screenshot fixture must never be a flattened full-screen image posing as interactive UI.

Browser storage adapter is isolated by environment. Use a repeatable clean-save command only in test builds. Audio starts on gesture and is measured separately from native. Resize cases include360×640,390×844,412×915,430×932 and768×1024 with letterbox/adaptation policy.

Acceptance: scripted buy→merge→deploy→kill can run in web and pure-core fixtures with matching state; animation freeze does not change reward result; release bundle contains no debug import route.'''),
'20_BUILD_AND_CI':('Build and CI','''No build pipeline exists yet. [PROPOSED] CI stages: source/config validation → core typecheck/lint/tests → deterministic simulation → asset registry validation → Cocos web build → bridge contract tests → Android native build → iOS build on macOS → smoke/visual reports. Sign/distribute only in a separately gated release job with protected secrets.

Pin Cocos patch, RN, package manager, Node, Java, Android SDK/NDK/AGP and Xcode in a version manifest created by PHASE_03/04. Commit Cocos build profiles and documented local commands. Official Cocos CLI supports project/build configuration workflows; exact selected-version invocation is checked against an exported profile before CI adoption: [Cocos command-line build](https://docs.cocos.com/creator/3.8/manual/en/editor/publish/publish-in-command-line.html).

Cache dependencies by lockfile/toolchain and generated imports by source hash; never reuse stale .meta outputs from another data version. Artifacts include appVersion/buildNumber/dataVersion/saveSchemaVersion/bridgeVersion, source commit, config digest and target. Fail if required assets/licenses are absent, generated data differs from committed source, or proposed balance is mislabeled observed.

Pull requests require appropriate domain/integration/visual checks based on changed surface. Native integration changes require both host builds and lifecycle harness; pure content changes need schema/reference/golden checks. Nightly soak runs collect memory/frame/save queue metrics. Attach reports, not only a green status.

Release rollback: retain previous signed build/config package; do not downgrade save shape without a supported reader; disable only non-economic optional features through reviewed configuration when available. Store signing/publishing remain future release tasks, outside this planning mission.'''),
'21_ANALYTICS_EVENTS':('Analytics events','''[PROPOSED, provider UNKNOWN U028]. Define an interface and local test sink first. No live analytics requests in planning or core tests. Gameplay works with a no-op sink. Consent/environment policy is resolved before any external SDK is selected.

Events: session_started/session_ended, tutorial_step_completed, hero_purchased, merge_completed, hero_discovered, deployment_changed, stage_started/stage_cleared, boss_attempt/boss_result, reward_claimed, offline_claimed, quest_claimed, daily_claimed, wheel_started/wheel_result, equipment_changed, upgrade_purchased, insufficient_currency, save_error, bridge_error and performance_summary. Each has schemaVersion, eventId, sessionId, build/data version and coarse elapsed duration. Reward events include source and stable transaction ID; never full save contents.

Use bounded enums and numeric buckets for tier/stage/duration where practical. No names, email, advertising IDs, copied guest identifiers, raw bridge payloads, exact local file paths or screenshots. Consent denied drops nonessential analytics. Diagnostics can remain local and export only through an explicit support flow.

Economic analytics emit after durable commit. Duplicate callbacks cannot produce duplicate reward_claimed because its eventId derives from the transaction receipt. Queue is bounded and expiry-defined; network failure never blocks gameplay or retrying a save. Batch background flush respects platform time constraints.

Acceptance: fake sink verifies one event per committed reward and none on rejection; denied consent sends nothing; schema rejects arbitrary properties; production debug data is absent. Provider choice and retention are release decisions, not invented reference behavior.'''),
'22_ERROR_HANDLING':('Error handling','''Error taxonomy: ConfigInvalid (boot blocked), AssetMissing (required block/optional fallback), SaveWriteFailed (durable action not installed), SaveCorrupt (recover candidate), SaveFutureVersion (update required), BridgeUnavailable/ProtocolMismatch (host initialization blocked), StaleCommand (safe reject), InsufficientFunds/BoardFull (expected UI result), NativeLifecycleFailure (return to shell with diagnostics), AudioUnavailable (silence).

Every failure has code, user-safe localization key, diagnostic context, retryability and correlation ID. Do not show stack traces or implementation names in player flows. Retry keeps the same transaction/request ID where side effects might have occurred. Disable repeated buttons only while a pending operation is active; provide an exit/cancel path for unrecoverable initialization.

Recovery order: keep current valid state → record bounded local diagnostic → offer appropriate retry → reload candidate if needed → explicit reset only after preserving corrupt bytes. Never silently replace a corrupted save with a new account. If a reward animation fails, reconcile visuals from committed state; do not roll back the grant.

Host lifecycle errors cancel subscriptions and invalidate session generation. A stale native callback after dismissal is discarded. Missing optional content shows a neutral unavailable panel and releases its bundle. Partial required content cannot enter battle.

Acceptance: injected failures at read/write/verify/init/load/tween/audio paths have deterministic UI outcomes; repeated retry cannot double-charge; offline mode has a supported local launch path; logs contain no account secrets.'''),
'23_SECURITY_AND_ANTI_TAMPER':('Security and anti-tamper','''Scope is local-first single-player planning. Local checksums detect accidental corruption; they are not cryptographic proof against a device owner. Do not promise cheat-proof currency, trusted wall time or server-verified purchases without a backend. No production monetization, ads or account integration is included in MVP.

Validate every boundary: config JSON, save payload, native bridge envelope, deep-link allowlist and external result IDs. Reject oversized/deeply nested input before parsing where possible; cap string/array lengths in transport validators. Native bridge exposes a fixed receiver, not arbitrary eval code assembled from user-controlled strings. Deep links select allowlisted routes after unlock checks and never grant resources directly.

Purchases/ads, if introduced later, require platform/server verification, pending-operation storage, idempotent receipt ledger and reconciliation after process death. A callback labelled success is not sufficient proof. Keep credentials/signing keys outside source and logs. No account identifiers from captured research are copied into product data.

Save recovery preserves evidence for the user; quarantine invalid bytes, do not execute embedded content. Modifying time caps rewards but remains locally tamperable. Debug grants/state import are compile-time excluded from release.

Acceptance: malformed/stale/replayed bridge input cannot mutate balances; numeric overflow and negative amounts reject; deep-link routes cannot bypass unlocks; release package contains no debug endpoints or signing secrets. Later online features require a new ADR and threat model.''')}

for stem,(title,body) in docs.items():
 path='docs/technical/'+stem+'.md'
 write(path,f'# {title}\n\n{body}\n\n## Traceability\n\n'+ ' · '.join(link(path,p) for p in ['docs/technical/00_TECH_INDEX.md','docs/17_GAME_STATE_MODEL.md','docs/04_UNKNOWNS_REGISTER.md','data-spec/README.md','tasks/TASK_INDEX.md','docs/qa/01_TEST_STRATEGY.md']))

adrs=[
('001-ENGINE','Engine','Accepted planning direction; exact patch pending spike','Cocos Creator3.8 LTS with TypeScript; choose patch only with verified Android/iOS exports.','Native2D rendering, Cocos web preview and one renderer fit the target. Plain RN rendering would split game rendering and simulation concerns.','Cocos native export/toolchain coupling and installation are unresolved. Revisit only if spike proves a blocking incompatibility.','PHASE_03_NATIVE_INTEGRATION_SPIKE'),
('002-MOBILE-HOST','Mobile host','Proposed, feasibility gate open','React Native shell with full-screen Cocos native host strategy A.','Shell handles application/system surfaces while game remains in Cocos. Embedded surface adds lifecycle/touch complexity; WebView remains a documented fallback.','No existing RN app is retained. Do not begin production shell integration until both host outcomes are recorded. Flutter requires a new decision, not a quiet substitution.','PHASE_03_NATIVE_INTEGRATION_SPIKE'),
('003-DOMAIN-SEPARATION','Domain separation','Accepted planning contract','Pure TypeScript deterministic game-core; engine/native dependencies only through adapters.','Core transactions and replay tests should run without a renderer. UI tween completion cannot control money or progression.','More explicit events/adapters; maintain one state authority and prohibit cc imports in core.','PHASE_06_CORE_GAME_STATE'),
('004-SAVE-STORAGE','Save storage','Proposed, durability test required','Versioned A/B snapshots with checksum, generation, transaction receipts and source watermarks; native app-private files, web IndexedDB adapter.','Recover last valid snapshot and prevent repeated claims across crashes. Provider-specific atomicity is not assumed.','Write/verify barrier can be costly; measure sustained kill rewards and redesign journal if necessary before shipping. Checksum is not anti-cheat.','PHASE_12_SAVE_AND_OFFLINE'),
('005-ASSET-PIPELINE','Asset pipeline','Accepted planning contract','Immutable source fig; semantic registry with resolution variants, reviewed pivots/trim/insets, grouped atlases and per-route loading.','351 source rasters need traceable classification and bounded runtime residency. A screenshot cannot substitute for constructed controls.','Rights/fonts, 9-slice calibration and runtime downscaling remain gates. Do not automatically chop flattened characters.','PHASE_02_FIGMA_AND_ASSET_PIPELINE'),
('006-RN-COCOS-BRIDGE','RN/Cocos bridge','Proposed protocol v1, native verification pending','Typed versioned JSON envelopes, session/generation guards, request IDs, per-message payload validation and idempotent operation results.','Native callbacks can be duplicated/reordered after lifecycle changes. A single protocol supports Android/iOS harnesses and web stubs.','No per-frame messages. Purchases/ads are reserved interfaces only. Exact thread scheduling and exported APIs are spike outputs.','PHASE_03_NATIVE_INTEGRATION_SPIKE')]
for slug,title,status,decision,why,consequences,phase in adrs:
 path=f'docs/adr/ADR-{slug}.md'
 write(path,f'''# ADR-{slug.split('-')[0]} — {title}

## Status
{status}. Recorded2026-09-08. This records planning authorization, not a successful native build.

## Context and evidence
{why} See [evidence](../03_EVIDENCE_LEDGER.md), [unknowns](../04_UNKNOWNS_REGISTER.md) and [architecture](../technical/01_ARCHITECTURE.md).

## Decision
{decision}

## Consequences and alternatives
{consequences}

## Verification and revisit trigger
Complete [{phase}](../../plans/{phase}.md), attach acceptance results and update this ADR if measured evidence invalidates its premises. Do not rewrite historical evidence to make the selected approach appear confirmed.

## Tasks
[Task index](../../tasks/TASK_INDEX.md) · [Documentation index](../00_INDEX.md).
''')

write('spikes/rn-cocos/README.md','''# RN/Cocos feasibility spike — execution plan only

Status: NOT RUN. No production game code or native spike implementation was created during this planning mission. Cocos Creator was not found in inspected standard installation locations. Android SDK tools and Xcode26.3 are present; a device/build result is still required. See [integration](../../docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md) and [phase03](../../plans/PHASE_03_NATIVE_INTEGRATION_SPIKE.md).

## Reproduction sequence for the future spike

1. Lock a Cocos3.8 LTS patch and current compatible RN release from official documentation. Record editor binary path, Node/package manager, JDK, SDK/NDK/AGP and Xcode in toolchain.json. Install missing tools through normal licensed sources.
2. Create an isolated minimal RN app and Cocos project under this directory. Export Android and iOS using saved build profiles. Inspect generated Activity/AppDelegate/engine bootstrap APIs before modifying host integration.
3. Build/run the standalone Cocos colored scene and RN entry screen separately. Save exact successful commands and full logs. Intended Cocos CLI shape is editor --project <project> --build <exported profile options>; resolve the selected version's configPath syntax from official CLI docs instead of pasting an unverified command.
4. Add full-screen host strategy A. A tap increments a local counter and emits a typed ping to RN; RN sends a command changing the scene color. Add a one-shot sound and loop to observe audio focus.
5. Exercise all acceptance cases in ACCEPTANCE.md. Capture before/after memory, logs, recordings, device/OS and exact commit. Test release-like builds, not only JS debug mode.
6. Record PASS/FAIL/BLOCKED per case. Attach iOS environment limitations precisely. Update ADR-002/006 with selected strategy and blocking defects. Production phase04/16 can proceed only according to these gates.

## Expected future artifacts

toolchain.json, android-build.log, ios-build.log, lifecycle-results.json, bridge-results.json, memory-cycles.csv and evidence/ recordings. These filenames describe required results; their absence is explicitly NOT RUN today. [Acceptance ledger](ACCEPTANCE.md) · [Tasks](../../tasks/TASKS_PHASE_03.md).
''')
cases=[('NAT-01','Android build installs','APK installed and launches on named emulator plus physical target'),('NAT-02','RN screen renders','Entry screen screenshot and navigation action'),('NAT-03','Cocos opens and renders continuously','60-second render/tick counter video'),('NAT-04','Touch works','Tap coordinates and visible counter response'),('NAT-05','Cocos→RN','Typed ping payload and receiver log'),('NAT-06','RN→Cocos','Typed command changes color once'),('NAT-07','Android Back','Popup then game dismissal returns correctly'),('NAT-08','Re-enter10+ times','Cycle log and memory slope after warmup'),('NAT-09','Background/resume','10cycles, no time catch-up or duplicate callbacks'),('NAT-10','Audio focus','Interrupt/resume/mute/headphones without duplicate loop'),('NAT-11','Engine ownership','No double initialization; listeners/resources return to baseline'),('NAT-12','iOS equivalent','Build/run simulator and physical-device checks, or specific blocker'),('NAT-13','Process death/save handshake','Valid generation restored; no stale result applied'),('NAT-14','Protocol robustness','Invalid/duplicate/stale/oversize messages rejected'),('NAT-15','ADR outcome','Strategy, versions, evidence and unresolved failures recorded')]
write('spikes/rn-cocos/ACCEPTANCE.md','# Native spike acceptance ledger\n\nAll rows NOT RUN at planning completion. This ledger is a plan, never evidence of technical feasibility.\n\n'+table(['ID','Case','Required evidence','Status'],[(i,t,e,'NOT RUN — Cocos project/export absent') for i,t,e in cases])+'\n\n[Spike plan](README.md) · [Native integration phase](../../plans/PHASE_03_NATIVE_INTEGRATION_SPIKE.md).')
