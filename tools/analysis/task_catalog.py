"""Explicit bounded implementation work packages; all future, never executed by planning."""
PHASES=[
('REPOSITORY_AND_ANALYSIS','Lock handoff and implementation boundaries'),('REFERENCE_REVERSE_ENGINEERING','Close behavior-specific evidence gates'),('FIGMA_AND_ASSET_PIPELINE','Create traceable runtime import inputs'),('NATIVE_INTEGRATION_SPIKE','Prove native host feasibility early'),('PROJECT_FOUNDATION','Establish one typed project foundation'),('STATIC_VERTICAL_SLICE','Reconstruct Figma components and responsive fixtures'),('CORE_GAME_STATE','Implement deterministic state and durable transaction ports'),('HERO_PURCHASE_AND_MERGE','Implement board purchase merge and deployment'),('BATTLE_LOOP','Implement deterministic combat and projection'),('STAGE_AND_BOSS_PROGRESSION','Implement waves boss farming and unlocks'),('HERO_PROGRESSION_AND_EQUIPMENT','Implement owned items and hero upgrades'),('META_SCREENS','Implement claims navigation and settings'),('SAVE_AND_OFFLINE','Prove durable recovery and offline claims'),('ANIMATION_VFX_HAPTICS','Deliver bounded expressive presentation'),('AUDIO','Acquire and wire original audio'),('BALANCE_AND_CONTENT','Calibrate versioned content from evidence'),('REACT_NATIVE_PRODUCTION_INTEGRATION','Harden both native hosts'),('PERFORMANCE_AND_OPTIMIZATION','Meet measured device budgets'),('QA_AND_REGRESSION','Close product acceptance gates'),('RELEASE','Prepare and verify distributable release'),('POST_RELEASE','Extend only through evidence-backed scope')]

# title | future output path | concrete result/oracle. Each row is one independently reviewable deliverable.
CATALOG={
0:'''Planning handoff validation|analysis/reports/implementation_handoff.md|Re-run planning validator, verify source hashes and record accepted gates without changing runtime.
Implementation workspace baseline|analysis/reports/implementation_baseline.json|Record current HEAD and user changes; establish isolated implementation branch/worktree without restoring deleted app.
Host decision|docs/adr/ADR-002-MOBILE-HOST.md|Lock RN scope from master baseline and document any explicit exception; do not infer it from deleted files.
Fidelity gate registry|analysis/reports/fidelity_gates.json|Map each HIGH unknown to blocked behavior/data import and named evidence task; proposed fixtures remain separate.''',
1:'''Reference version lock|analysis/reference/version_lock.json|Confirm LIVE_CRAZY3.16.2 screenshot and capture mobile versions separately; no cross-version formula mixing.
Auto-merge unlock capture|analysis/reference/auto_unlock_capture.md|Finish tutorial and inspect reachable boosts/settings; record activation cost duration and availability or bounded access blocker.
Auto-merge ordering|analysis/reference/auto_order_cases.csv|Capture five repeats each of [1,1,2],[1,1,1,1],disjoint pairs and max tier; establish pair order and destination only from outcomes.
Purchase cost measurements|analysis/reference/purchase_cost_series.csv|Record thirty sequential prices with no active farming; compare before/after currency and fit residuals separately.
Input purchase capture|analysis/reference/purchase_input_cases.csv|Test tap,20rapid taps,2s hold,cancel and full board; count accepted buys and tier advance rules.
Combat balance measurements|analysis/reference/combat_samples.csv|Record twenty hits per tier/target with release impact crit/defense labels separated; include video PTS and uncertainty.
Targeting capture|analysis/reference/targeting_cases.md|Observe multiple targets and a target dying during projectile flight; distinguish selection from renderer travel.
Boss observations|analysis/reference/boss_cases.csv|Capture three boss entries,one timeout,one win and manual retry; record timer HP rewards and farm destination.
Reward catalogue|analysis/reference/reward_catalogue.csv|Separate kill,first-clear,discovery and repeated-tier rewards; preserve tier2+10gold and tier3+1000gold as distinct observed cases.
Offline measurements|analysis/reference/offline_cases.csv|Compare60s/10m/2h/24h absent intervals,stage/balance and repeated claim; do not substitute foreground farming.
Save behavior capture|analysis/reference/save_reload_cases.md|Reload after purchase/merge/claim and compare visible board/balances; describe bounded reference persistence observations.
Daily reward observations|analysis/reference/daily_cases.md|Record calendar vs Figma chest conflict,claim/double claim/reset/missed day semantics or concrete waiting limitation.
Wheel observations|analysis/reference/wheel_cases.md|Locate live wheel or record bounded absence; capture free/paid/cooldown states and disclosed weights without paid spins.
Equipment observations|analysis/reference/equipment_cases.csv|Capture owned item equip/swap/enhance before/after on two heroes and distinguish reference system from Figma associations.
Quest observations|analysis/reference/quest_cases.csv|Record first two quest conditions/reward icon meanings and claim idempotency; ongoing farm deltas excluded.
Death recovery capture|analysis/reference/recovery_cases.md|Inspect normal versus Legendary mode attacks,hero HP/death/recovery; no permanent loss rule without evidence.
Deployment capture|analysis/reference/deployment_cases.md|Test cap,tap withdrawal,drag replacement and merge involving deployed units; preserve owned board identity.
Unlock capture|analysis/reference/unlock_cases.csv|Cross account/hero/stage thresholds and identify labels2/3/4/6/10 and31/101/401/601 with screenshots.
Lifecycle capture|analysis/reference/lifecycle_cases.md|Compare settings and another meta route10s,then background/lock/resume; identify which clocks continue.
Skills capture|analysis/reference/skills_cases.md|Capture reachable skill details,cooldown,target/status stacking and mode availability; unresolved content remains gated.''',
2:'''Immutable extraction verification|analysis/figma/source_integrity.json|Re-run safe extraction and compare original/copy SHA and351source records; reject path traversal and CRC errors.
Asset semantic validator|tools/analysis/asset_semantic_validator.py|Validate351unique semantic IDs,source hashes,scope category and screenshot references; fail orphan runtime selection.
Near duplicate adjudication|analysis/figma/near_duplicate_decisions.csv|Review167candidate pairs by alpha/outline/resolution and retain explicit keep/alias decisions; no pHash-only deletion.
Asset rights ledger|analysis/figma/asset_ownership.csv|Attach owner/license/distribution proof for selected assets or mark release exclusion; user supply alone is not proof.
Font acquisition|analysis/figma/font_ownership.csv|Acquire exact PassionOne/Roboto/Nunito files and licenses; compare glyph metrics and Cyrillic coverage.
Asset import calibration|analysis/figma/import_calibration.json|Measure chosen9slice borders,pivots,trim offsets and intended display resolution; null insets cannot enter stretched UI.
Content visual mapping|analysis/figma/content_visual_mapping.csv|Map definition tiers to10Figma hero families separately from reference human names; record reviewed silhouette/rarity choices.
Atlas membership manifest|analysis/figma/atlas_plan.json|Assign selected assets to co-resident2048groups and standalone backgrounds; estimate decoded resident bytes per route.
Runtime import tool|tooling/assets/import-figma.ts|Generate reviewed runtime sprites and stable registry from semantic/import manifests without changing raw source.
Sprite registry validation|tooling/assets/validate-registry.ts|Fail duplicate UUIDs,missing semantic refs,reference-only imports and invalid trim/pivot metadata.
Button state asset review|analysis/figma/button_state_decisions.csv|Choose tint/overlay/new-art decision for pressed disabled loading selected locked states per component.
Missing popup designs|docs/screens/MISSING_POPUP_DESIGNS.md|Specify quest/offline/boss-failure/error composed layouts using existing tokens and44point controls.''',
3:'''Native toolchain lock|spikes/rn-cocos/toolchain.json|Install/pin missing Cocos3.8patch and compatible RN/native tools; record actual paths/versions from successful probes.
Standalone Cocos export probe|spikes/rn-cocos/cocos-probe/README.md|Create minimal colored scene with touch counter and export Android/iOS; attach actual build logs.
Standalone RN host probe|spikes/rn-cocos/rn-probe/README.md|Create minimal RN entry screen using pinned versions and demonstrate both target builds.
Android full-screen host probe|spikes/rn-cocos/android-host-results.md|Launch one CocosActivity from RN,render continuously and return with Back; no duplicate engine creation.
iOS full-screen host probe|spikes/rn-cocos/ios-host-results.md|Present one CocosViewController from RN and dismiss; attach simulator/device results or precise environment blocker.
Bridge ping probe|spikes/rn-cocos/bridge-results.json|Send typed ping each direction and reject malformed/stale generation messages on receiving runtime thread.
Native lifecycle probe|spikes/rn-cocos/lifecycle-results.json|Run10reopen and10background cycles on both targets; record touch surface and session ownership outcomes.
Native audio focus probe|spikes/rn-cocos/audio-results.md|Test loop+oneshot interruption/mute/headphones and resume once on both hosts.
Native memory probe|spikes/rn-cocos/memory-cycles.csv|Record baseline and10cycle memory with warmup; investigate retained Activity/controller/engine growth.
Native integration acceptance|spikes/rn-cocos/acceptance-results.md|Evaluate every NAT case with evidence; update ADR strategy and keep failing platform gate closed.''',
4:'''Workspace package foundation|package.json|Create pinned workspace scripts for core,data validation and Cocos tooling; clean install uses committed lockfile.
Core TypeScript boundary|game-core/tsconfig.json|Configure strict domain compilation without cc/RN/browser imports and enforce dependency direction.
Cocos project foundation|cocos-game/README.md|Create pinned Cocos project with Boot/Battle scenes and stable asset metadata; use same renderer for web/native.
Config loader validation|game-core/src/config/ConfigLoader.ts|Validate schema then IDs/graphs/numeric bounds before domain creation; report exact file and field.
Typed domain event bus|game-core/src/events/EventBus.ts|Dispatch immutable ordered batches; observer failure isolated and dispose idempotent.
Runtime ports and test fakes|game-core/src/ports/index.ts|Define Clock,RNG,SaveStore,Logger,Analytics interfaces with deterministic fake implementations.
Core CI checks|tooling/ci/core-checks.md|Implement reproducible typecheck/schema/core-test pipeline and attach clean-checkout result.
Web fixture harness|cocos-game/assets/scripts/debug/FixtureHarness.ts|Load named seed/clock/state and freeze animation markers; production build excludes debug routes.''',
5:'''Board layout conflict review|analysis/figma/board_layout_decision.md|Compare exact10-slot Figma fixture with15-slot gameplay adaptation at430x932/360x640; approve44point targets and HUD clearance.
Design token import|cocos-game/assets/scripts/ui/DesignTokens.ts|Import measured colors,type/spacing tokens and explicit proposed motion tokens without balance text reuse.
Responsive canvas anchors|cocos-game/assets/scripts/ui/ResponsiveLayout.ts|Apply safe area and portrait aspect policy at five required viewports; record anchor measurements.
Reusable button states|cocos-game/assets/scripts/ui/GameButton.ts|Implement normal pressed disabled loading selected locked visuals and one input owner.
Currency and stage HUD fixture|cocos-game/assets/prefabs/Hud.prefab|Reconstruct measured HUD positions and stage health with injected Figma text; exact values remain fixture-only.
Board and battle static fixture|cocos-game/assets/prefabs/BattleBoard.prefab|Render Figma ground/heroes/slots plus separate15-slot adaptation using calibrated feet and source art.
Bottom navigation fixture|cocos-game/assets/prefabs/BottomNavigation.prefab|Reconstruct five79x80tabs at source anchors with selected/locked states and safe-area protection.
Loading start maintenance fixtures|cocos-game/assets/prefabs/BootPanels.prefab|Build SCREEN001/002/012 from components with loading/error/retry states; no full-screen raster substitute.
Hero equipment static fixture|cocos-game/assets/prefabs/HeroEquipmentPanel.prefab|Match SCREEN004 six equipment positions,hero/stat/card hierarchy and scroll bounds.
Hero upgrades static fixture|cocos-game/assets/prefabs/HeroUpgradesPanel.prefab|Match SCREEN007 five named cards,stats,orb prices and clipped list behavior.
Relic dungeon static fixtures|cocos-game/assets/prefabs/ExtendedModePanels.prefab|Reconstruct SCREEN005/006 art-only fixtures; keep unverified mode actions disabled outside debug.
Daily reward static fixtures|cocos-game/assets/prefabs/DailyRewardPanel.prefab|Match SCREEN008/009 chest and claim variants with explicit visual-only1000gold fixture.
Settings static fixtures|cocos-game/assets/prefabs/SettingsPanel.prefab|Match SCREEN010/011 sliders,toggles,links and modal dimmer using acquired fonts.
Wheel static fixtures|cocos-game/assets/prefabs/WheelPanel.prefab|Build SCREEN013/014/015 twelve constructed sectors,pointer and free/cooldown states separate from nav icon.
Static golden comparison|tooling/visual/compare-static.ts|Capture all15source fixtures and report overlay/diff/anchor errors with separate gameplayAdapted baseline.''',
6:'''Amount value type|game-core/src/model/Amount.ts|Implement bigint arithmetic with canonical decimal serialization and exact huge-value comparisons.
Normalized game state|game-core/src/model/GameState.ts|Define state groups and owned/deployed/board invariants matching save schema; keep ViewState separate.
Command dispatcher|game-core/src/commands/Dispatcher.ts|Validate commandId/revision,queue reentrant commands and return typed rejection without state/RNG mutation.
Durable transaction coordinator|game-core/src/systems/TransactionCoordinator.ts|Persist draft grant/debit/receipt/watermark before install/events; save failure retains old authoritative state.
Reward receipt service|game-core/src/systems/RewardService.ts|Apply configured grant kinds once per source token and return cached outcome for duplicates.
Seeded RNG streams|game-core/src/ports/SeededRng.ts|Separate combat/reward/presentation streams and serialize authoritative RNG state where required by replay policy.
Game state selectors|game-core/src/selectors/index.ts|Derive affordability,board occupancy,DPS display and claimability without mutation or reparsing labels.
Simulation clock|game-core/src/systems/SimulationClock.ts|Implement proposed50msstep,max5catchup and explicit suspend; split-tick tests remain deterministic.
Input router|cocos-game/assets/scripts/input/InputRouter.ts|Capture one pointer owner with modal/tutorial priority and consume closing pointer-up.
State invariant tests|game-core/tests/unit/state-invariants.test.ts|Generate valid boards and command sequences; prove balance ownership ID and watermark invariants.
Core replay harness|game-core/tests/simulation/replay.test.ts|Replay same seed/commands at varied render cadence and compare final hash/events.''',
7:'''Hero definition and instance model|game-core/src/model/Hero.ts|Separate family/tier/visual definition from owned instance,slot,upgrade and deployment state.
Board slot model|game-core/src/model/Board.ts|Represent15logical slots with5initial open and explicit unlock IDs; reject duplicate occupancy.
Purchase quote selector|game-core/src/selectors/PurchaseQuote.ts|Read exact configured cost and capacity; expose insufficient/full/locked reasons without changing purchase count.
Purchase hero transaction|game-core/src/commands/PurchaseHero.ts|Atomically debit quoted cost,increment count and create one hero in deterministic free slot.
Purchase hold controller|cocos-game/assets/scripts/input/PurchaseHold.ts|Schedule accepted repeat commands with cancel/up/background cleanup; no uncontrolled timer after pointer release.
Manual merge compatibility|game-core/src/systems/MergeRules.ts|Validate same configured family/tier or explicit pair,max tier and deployment policy before any consume.
Manual merge transaction|game-core/src/commands/MergeHeroes.ts|Consume source/target and create result at drop target in one durable transaction with discovery hook.
Timed auto-merge entitlement|game-core/src/commands/ActivateAutoMerge.ts|Reserve configured60-minute entitlement once,handle enable/disable/expiry and persist clock guard;development free grant is separate from disabled ad/payment providers.
Auto-merge pair selector|game-core/src/systems/AutoMergeSelector.ts|Implement only verified/configured policy with stable tie-break and unit cases for ambiguous boards.
Auto-merge cascade reducer|game-core/src/systems/AutoMergeSystem.ts|Repeat pair selection with occupancy-bound termination and deterministic chain IDs; serialize with purchases.
Discovery reward command|game-core/src/systems/DiscoveryService.ts|Mark discovered tier and reward token atomically; repeated-tier merge produces no discovery grant.
Deployment command|game-core/src/commands/DeployHero.ts|Enforce owned subset/cap and preserve board instance; withdrawal is idempotent.
Board input projection|cocos-game/assets/scripts/ui/BoardPresenter.ts|Render drag targets,full/max/locked feedback and committed results; cancel gesture cannot mutate core.
Purchase merge acceptance|game-core/tests/integration/purchase-merge.test.ts|Exercise exact-funds,full-board,rapid input,cascade,max tier,deployed pair and interrupted presentation.''',
8:'''Combat entity model|game-core/src/model/CombatEntity.ts|Represent HP,stats,cooldown,target and stable spawnOrdinal independently of Cocos transforms.
Encounter spawn service|game-core/src/systems/EncounterSpawner.ts|Instantiate configured waves with unique encounter/entity IDs and no reward on spawn.
Target selector|game-core/src/systems/TargetingSystem.ts|Choose configured deterministic target; clear dead/stale IDs and test ties across stage boundary.
Attack cooldown system|game-core/src/systems/AttackSystem.ts|Emit scheduled attack intents at exact ticks and respect disabled/dead actors.
Hit intent queue|game-core/src/systems/HitQueue.ts|Resolve due attacks in stable order with explicit target-stale policy; renderer does not schedule damage.
Damage resolver|game-core/src/systems/DamageResolver.ts|Apply configured integer rounding defense crit and minimum; clamp HP and reject overflow config.
Death reducer|game-core/src/systems/DeathSystem.ts|Emit one death per entity and create unique kill entitlement under simultaneous lethal hits.
Battle tick pipeline|game-core/src/systems/BattleSystem.ts|Compose cooldown,target,intents,hits,damage,deaths,rewards and stage handoff in documented order.
Hero combat presenter|cocos-game/assets/scripts/battle/HeroView.ts|Bind owned/deployed hero to battle anchor and event phases; no combat rules in component.
Enemy presenter|cocos-game/assets/scripts/battle/EnemyView.ts|Project HP/hit/death and release pooled view after fade without retaining target references.
Projectile presenter|cocos-game/assets/scripts/battle/ProjectileView.ts|Animate configured travel and cancel stale visual safely; impact callback never grants damage.
Damage label presenter|cocos-game/assets/scripts/battle/DamageLabel.ts|Display exact committed damage with normal/crit styles and bounded pooled overlap.
Combat reward adapter|game-core/src/systems/KillRewardService.ts|Use unique encounter/entity source token and durable queue; repeated callbacks cannot grant twice.
Mode attack and recovery policy|game-core/src/systems/RecoveryPolicy.ts|Gate enemy counterattack/death behavior by verified mode config; no invented permanent hero loss.
Combat deterministic fixtures|game-core/tests/simulation/combat.test.ts|Run twenty-hit cases,simultaneous deaths,zero targets and varied render cadence with same seed.
Combat visual acceptance|tests/integration/combat-presentation.md|Capture melee/ranged/magic,hits,crit,death and missing target under full/low/reduced motion.''',
9:'''Stage definition graph|game-core/src/model/Stage.ts|Validate ordinal/world/waves/next and explicit boss/farm references with no unintended cycle.
Wave progression reducer|game-core/src/systems/StageSystem.ts|Advance after committed final death exactly once; ignore stale prior-encounter events.
First-clear reward watermark|game-core/src/systems/StageRewardService.ts|Separate once-per-stage clear from repeat farm kill receipts and maintain monotonic highest ordinal.
Boss timer and tie rule|game-core/src/systems/BossSystem.ts|Use simulation time and explicit lethal-before-timeout policy; pause does not consume wall time.
Boss failure and retry|game-core/src/commands/RetryBoss.ts|Return to configured farm state after failure and create new encounter sequence on manual retry.
Unlock condition evaluator|game-core/src/systems/UnlockService.ts|Evaluate stage/account/tier allOf/anyOf and persist unlocked/announced IDs once.
Stage boss HUD presenter|cocos-game/assets/scripts/ui/StageHud.ts|Display stage HP/timer/retry/farm states without inventing formula from Figma100label.
Stage boss acceptance|game-core/tests/simulation/stage-boss.test.ts|Test three-stage chain,timeout,win,tie,retry and save/reopen without duplicated first-clear reward.''',
10:'''Equipment instance model|game-core/src/model/Equipment.ts|Represent owned item IDs,slot type,level and optional owner; one item cannot be on two heroes.
Equipment slot compatibility|game-core/src/systems/EquipmentRules.ts|Validate allowed family/slot and ownership before equip; wrong slot rejects unchanged.
Equip and swap transaction|game-core/src/commands/EquipItem.ts|Atomically unequip prior item and bind new item with stable stats recomputation.
Equipment enhancement transaction|game-core/src/commands/EnhanceItem.ts|Debit configured cost and increment item level once; max/insufficient/pending cases reject correctly.
Hero stat aggregation|game-core/src/selectors/HeroStats.ts|Combine base,tier,upgrade,item bonuses in documented order without double counting or overflow.
Hero upgrade transaction|game-core/src/commands/UpgradeHero.ts|Apply level cap,cost and stat change atomically; selected UI hero does not redirect stale request.
Equipment panel binding|cocos-game/assets/scripts/ui/EquipmentPanel.ts|Bind inventory/slots/selection and equip/unequip/loading/empty/locked/error states to commands.
Hero upgrades panel binding|cocos-game/assets/scripts/ui/HeroUpgradesPanel.ts|Show exact costs and affordable/max states across scroll/selection changes.
Equipment progression acceptance|game-core/tests/integration/equipment.test.ts|Test swap,unequip,upgrade cap,save failure,restart and repeated input with conserved ownership.''',
11:'''Route and popup coordinator|cocos-game/assets/scripts/ui/NavigationCoordinator.ts|Maintain one route and prioritized deduplicated popup stack; late load callbacks use generation guards.
Settings persistence binding|cocos-game/assets/scripts/ui/SettingsController.ts|Persist music/SFX/haptics/reduced motion preferences and apply host revision ordering.
Quest event reducer|game-core/src/systems/QuestService.ts|Count committed deduplicated source events and expose complete/unclaimed/claimed states.
Quest claim transaction|game-core/src/commands/ClaimQuest.ts|Grant reward and advance quest/reset marker once through durable coordinator.
Red-dot selectors|game-core/src/selectors/RedDots.ts|Derive claimable/unseen state across tabs and preserve announced unlocks on restart.
Daily period service|game-core/src/systems/DailyService.ts|Implement reviewed day/streak/missed-day policy with injected UTC clock and rollback protection.
Daily claim transaction|game-core/src/commands/ClaimDaily.ts|Credit configured day reward and watermark atomically; double tap/reopen same day cannot regrant.
Daily panel binding|cocos-game/assets/scripts/ui/DailyPanel.ts|Render available/claimed/loading/error variants and Figma chest layout with actual reward values.
Wheel outcome selector|game-core/src/systems/WheelOutcome.ts|Validate weights/segment mapping and select using reward RNG once per stable spin ID.
Wheel reserve transaction|game-core/src/commands/ReserveSpin.ts|Debit free/paid entitlement and persist pending outcome before any rotation starts.
Wheel claim transaction|game-core/src/commands/CompleteSpin.ts|Resolve saved outcome exactly once across skip/reopen/duplicate callbacks with no reroll.
Wheel panel controller|cocos-game/assets/scripts/ui/WheelController.ts|Animate to saved segment and expose free/cooldown/insufficient/spinning/result/error states.
Quest and offline popup binding|cocos-game/assets/scripts/ui/RewardPopupController.ts|Display pending entitlements and invoke stable claim IDs; closing animation never credits.
Tutorial step reducer|game-core/src/systems/TutorialService.ts|Persist completion version and advance only on committed matching events; skip policy explicit.
Tutorial input mask|cocos-game/assets/scripts/ui/TutorialOverlay.ts|Allow only named target,position hand responsively and clean mask on route change/restart.
Meta lifecycle acceptance|tests/integration/meta-lifecycle.md|Exercise settings/quest/daily/wheel during battle and background with no click-through or duplicate claim.''',
12:'''Save envelope codec|game-core/src/persistence/SaveCodec.ts|Canonical encode/decode schemaVersion/dataVersion/generation with checksum wrapper and strict validation.
Web save adapter|cocos-game/assets/scripts/platform/WebSaveStore.ts|Implement isolated IndexedDB A/B candidate write/read/verify and injected quota failure.
Native save adapter contract|mobile-shell/src/native/SaveStore.ts|Expose app-private atomic candidate transport with one writer and account/environment namespace.
Save candidate recovery|game-core/src/persistence/SaveRecovery.ts|Scan both generations,choose newest valid supported candidate and preserve corrupt bytes.
Save checkpoint scheduling|game-core/src/persistence/SaveCoordinator.ts|Flush durable queue on lifecycle and coalesce only safe progress snapshots; expose backlog metrics.
Save migration pipeline|game-core/src/persistence/Migrations.ts|Apply sequential pure migrations on backup draft and reject unknown future version without overwrite.
Migration fixture suite|game-core/tests/fixtures/save-migrations/README.md|Create syntheticv0/v1,unsafe integer,missing alias and pending reward fixtures with expected conserved totals.
Offline interval calculator|game-core/src/systems/OfflineService.ts|Clamp negative/capped UTC elapsed and integer reward units without offline stage advancement in fixture.
Offline entitlement reservation|game-core/src/commands/ReserveOffline.ts|Persist stable from/to/grants pending claim before popup and avoid overlap with prior watermark.
Offline claim transaction|game-core/src/commands/ClaimOffline.ts|Grant pending entitlement once and advance watermark atomically across crash/retry.
Receipt compaction policy|game-core/src/persistence/ReceiptCompaction.ts|Bound receipt history only when source watermarks prove old replay remains rejected.
Save crash injection harness|game-core/tests/integration/save-crash.test.ts|Crash at each write/verify/install/event barrier and prove exact old-or-new economic state.
Lifecycle save integration|cocos-game/assets/scripts/platform/LifecycleCoordinator.ts|Suspend ticks,flush once,resume one offline reconciliation and reject stale host session.
Save offline acceptance|tests/integration/save-offline.md|Pass corrupt/full-disk/future-version/clock/repeated-resume/restart cases with recoverable UI.''',
13:'''Motion art calibration|analysis/figma/motion_calibration.json|Review flattened character feet,sockets and background layer limits; do not auto-cut limbs.
Animation director|cocos-game/assets/scripts/presentation/AnimationDirector.ts|Resolve profiles/events with priority,cancel-and-reconcile and reduced-motion mode.
Presentation pool manager|cocos-game/assets/scripts/presentation/EffectPool.ts|Bound acquire/release,reset callbacks/material/tweens and guard reused node generation.
Hero idle spawn profiles|cocos-game/assets/scripts/presentation/HeroMotion.ts|Implement grounded idle/spawn for10families and verify no clipping/foot drift.
Hero attack hit profiles|cocos-game/assets/scripts/presentation/HeroCombatMotion.ts|Align anticipation/release/recovery with domain timestamps; hit cannot restart death.
Enemy boss profiles|cocos-game/assets/scripts/presentation/EnemyMotion.ts|Implement spawn/hit/death and boss intro/death with pool teardown and skip behavior.
Merge convergence profile|cocos-game/assets/scripts/presentation/MergeMotion.ts|Implement650msstaged merge keyed by mergeId and reconstruct result after any cancellation.
Merge cascade escalation|cocos-game/assets/scripts/presentation/CascadeMotion.ts|Sequence bounded intensity/pitch hooks and cap concurrent rings while preserving committed order.
Projectile art task|cocos-game/assets/art/effects/projectile-manifest.json|Create original arrow/magic primitive assets and reviewed sockets; no reference extraction.
Effect primitive task|cocos-game/assets/scripts/presentation/EffectPrimitives.ts|Create bounded hit/crit/merge/death/reward primitives matching palette and outline style.
Damage number motion|cocos-game/assets/scripts/presentation/DamageMotion.ts|Pool48labels with normal/crit rise/spread and bounded presentation-only coalescing.
Currency reward flyers|cocos-game/assets/scripts/presentation/RewardMotion.ts|Animate bounded symbolic coins/gems to HUD after commit; skip leaves final balance correct.
UI button counter motion|cocos-game/assets/scripts/presentation/UiMotion.ts|Implement pressed/counter/tab/red-dot states with coalesced revisions and no tween property fights.
Popup route transitions|cocos-game/assets/scripts/presentation/TransitionMotion.ts|Implement280/180msmodal and route transitions with input ownership and load generation cleanup.
Wheel motion profile|cocos-game/assets/scripts/presentation/WheelMotion.ts|Accelerate/decelerate monotonically to saved angle and throttle pointer ticks; no outcome chosen by tween.
Daily chest upgrade feedback|cocos-game/assets/scripts/presentation/MetaRewardMotion.ts|Wire daily/chest/equip/upgrade events to bounded bursts and interruption-safe final states.
Background motion fallback|cocos-game/assets/scripts/presentation/BackgroundMotion.ts|Keep flattened scenery static/subtle drift with clamped edges; reduced motion disables offset.
Haptic event adapter|mobile-shell/src/native/Haptics.ts|Map semantic events to supported native feedback with preference,cooldown and background suppression.
Motion freeze and interruption QA|tests/integration/motion-interruption.md|Capture every matrix event at named markers and cancel midway; no orphan node or lost result.''',
14:'''Audio acquisition|analysis/figma/audio_asset_ownership.csv|Acquire original/licensed core SFX with per-event brief,creator,file and distribution proof; no ripped reference audio.
Music acquisition|cocos-game/assets/audio/music/manifest.json|Acquire original main/boss loops with clean boundaries and compatible transitions; attach license and audition notes.
Ambience acquisition|cocos-game/assets/audio/ambience/manifest.json|Acquire quiet main-world loops and validate seamless repetition without distracting transient pattern.
Audio import validation|tooling/assets/validate-audio.ts|Check event file refs,format,duration,loop metadata,peaks and license status before import.
Audio director buses|cocos-game/assets/scripts/audio/AudioDirector.ts|Implement music/SFX/UI/ambience buses,gain/mute and optional missing-file silence.
Audio voice budget|cocos-game/assets/scripts/audio/VoiceAllocator.ts|Enforce matrix cooldown/concurrency,priority stealing and independent presentation RNG.
Music duck crossfade|cocos-game/assets/scripts/audio/MusicController.ts|Reference-count duck requests and crossfade boss/main without duplicate loops after interruption.
Audio event wiring|cocos-game/assets/scripts/audio/AudioEventBindings.ts|Bind all35semantic event families to committed events and UI actions exactly once.
Audio settings lifecycle|cocos-game/assets/scripts/audio/AudioLifecycle.ts|Persist gains and respond to host focus/background/web gesture unlock without replaying stale sounds.
Audio mix acceptance|tests/integration/audio-mix.md|Audition all events,100hit stress,headphones/speaker,loop boundaries and mute/resume; mark final only with evidence.''',
15:'''Numeric precision capture|analysis/reference/number_format_cases.csv|Record displayedK/M/B scales and exact known prices; separate display abbreviation from arithmetic.
Balance fitting tool|tools/analysis/balance_fit.py|Fit candidate rounded/piecewise/exponential models to observed samples and report residuals/holdout error; never extrapolate as fact.
Hero tier content table|cocos-game/assets/game-data/hero-tiers.json|Import reviewed tier progression/discovery rewards with evidence IDs and independent visual mapping.
Hero enemy content table|cocos-game/assets/game-data/heroes.json|Populate selected hero definitions and companion enemies/bosses records with valid stats/profile/asset refs.
Stage world content table|cocos-game/assets/game-data/stages.json|Populate a reviewed stage/world chain and explicit boss/farm values without square-HP extrapolation.
Economy merge content table|cocos-game/assets/game-data/economy.json|Import measured costs/offline parameters and separate merge-policy config with evidence mode flags.
Equipment reward content table|cocos-game/assets/game-data/equipment.json|Populate owned-item definitions and reward catalogue with no rarity-based invented formulas.
Meta unlock content table|cocos-game/assets/game-data/unlocks.json|Populate quests/daily/wheel/unlocks using closed evidence gates or explicit proposed scope decisions.
Animation audio config table|cocos-game/assets/game-data/animations.json|Generate animation/audio-event records from reviewed matrices and validate all semantic refs.
Content cross-reference validator|tooling/config/validate-content.ts|Reject orphan IDs,cycles,invalid tier progression,missing licenses and mislabeled proposed data.
Balance simulation report|analysis/reports/balance_simulation.md|Run deterministic progression with purchase/merge strategies and report time-to-tier,boss stalls,currency sources/sinks.
Number formatter localization|game-core/src/selectors/NumberFormatter.ts|Format huge Amount values with locale-aware grouping/compact notation; exact transaction value untouched.
Localization string catalogue|cocos-game/assets/game-data/localization/en.json|Replace baked/dynamic UI text with stable keys and test long/Cyrillic strings without clipping.
Content fidelity acceptance|analysis/reports/content_fidelity_acceptance.md|Trace shipped mechanics/numbers/art to observed or explicit proposed decisions and list remaining parity exclusions.''',
16:'''Production RN shell|mobile-shell/src/App.tsx|Build shell entry/loading/error surfaces around accepted native host; game UI remains Cocos.
Android production host|mobile-shell/android/app/src/main/java/game/host/GameActivity.kt|Integrate lifecycle-safe exported engine with Back,process recreation and one owner using locked toolchain.
iOS production host|mobile-shell/ios/GameHost/GameViewController.mm|Integrate engine presentation/dismissal and scene lifecycle without retained controller cycles.
Typed native module codegen|mobile-shell/src/native/NativeGameHost.ts|Implement current pinned RN native-module interface and typed event transport on both platforms.
Bridge state machine|cocos-game/assets/scripts/platform/HostBridge.ts|Implement ready/initialize/session generation,request IDs,timeout and payload validation from protocol catalogue.
Native storage implementation|mobile-shell/src/native/NativeSaveStore.ts|Implement and measure app-private A/Bwrite/read/verify and account namespace on both hosts.
Native lifecycle audio ownership|mobile-shell/src/native/LifecycleBridge.ts|Coordinate pause/resume/flush/audio focus exactly once with engine thread marshaling.
Deep-link notification routing|mobile-shell/src/navigation/ExternalRoutes.ts|Allowlist routes after initialization/unlock and reject payloads attempting resource grants.
Analytics decision|docs/technical/21_ANALYTICS_EVENTS.md|Choose no-op/local or consented provider from actual scope; document data minimization and retention before network SDK.
Analytics adapter|mobile-shell/src/analytics/AnalyticsAdapter.ts|Implement selected no-op/consented sink with bounded queue and no PII/raw save payloads.
Native production lifecycle QA|tests/integration/native-production.md|Pass50reopen,background,process-death,audio and malformed bridge cases on Android/iOS with memory traces.
Native build reproducibility|tooling/ci/native-builds.md|Build both targets from clean checkout with pinned versions and artifact provenance; secrets remain external.''',
17:'''Performance baseline capture|analysis/reports/performance_baseline.md|Measure release-like frame percentiles,memory,draw calls,pools,bridge and save queue on required physical tiers.
Texture residency optimization|analysis/reports/texture_optimization.md|Reduce measured route residency using reviewed sizing/atlas/loading changes and compare visual quality.
Pool allocation optimization|analysis/reports/pool_optimization.md|Remove measured per-hit allocations and retained callbacks; stress fixture shows bounded counts.
Draw-call batching optimization|analysis/reports/drawcall_optimization.md|Group compatible materials/atlases based on profiler trace without changing UI layering.
Low-quality preset|cocos-game/assets/scripts/presentation/QualityPreset.ts|Reduce cosmetics/parallax/flyers and optional30fpsrender while preserving core state hash.
Save throughput optimization|analysis/reports/save_throughput.md|Measure durable queue under kill bursts and optimize batching/journal only with crash-idempotency tests.
Native memory leak closure|analysis/reports/native_memory_acceptance.md|Prove10/50cycle and30minmemory settles after warmup on both hosts; fix retained engine/context refs.
Performance budget acceptance|analysis/reports/performance_acceptance.md|Compare all proposed budgets to raw traces and close exceptions with measured decisions.''',
18:'''Core unit matrix execution|analysis/reports/qa_unit_results.md|Run allUTcases and retain failing seed/repro fixtures; zero economic invariant failures.
Integration matrix execution|analysis/reports/qa_integration_results.md|Run allITcases including native/lifecycle/save faults with exact build and artifact references.
Gameplay golden path execution|analysis/reports/qa_gameplay_results.md|ExecuteGP001–004 with proposed versus reference-derived fixtures clearly separated.
Visual regression execution|analysis/reports/qa_visual_results.md|Compare15screens and adapted board across five viewports and all required UI states.
Device matrix execution|analysis/reports/qa_device_results.md|Record actual physical/emulator models,OS,build and pass/block status for every required tier.
Save migration release QA|analysis/reports/qa_save_results.md|Exercise all corruption/crash/migration/offline boundaries with conserved balances and ownership.
Accessibility localization QA|analysis/reports/qa_accessibility_results.md|Check44pointtargets,contrast,non-color cues,reduced motion,mute,long text and large numbers.
Audio haptic release QA|analysis/reports/qa_audio_results.md|Validate original asset rights,event coverage,mix,focus and preference persistence on physical devices.
Regression defect closure|analysis/reports/qa_defect_register.md|Triage reproducible defects byP0/P1/P2 and attach fix/retest evidence; no vague accepted failure.
Beta gate acceptance|analysis/reports/beta_gate.md|Evaluate MVP/beta criteria with zeroP0/no unacceptedP1 and native/content/rights gates closed.''',
19:'''Release readiness|analysis/reports/release_identity.json|Resolve owner,bundle IDs,audience,support/privacy/terms and scope from actual product decisions.
Current platform requirements review|analysis/reports/platform_release_requirements.md|Verify official Android/iOS/store/toolchain requirements at release date and map each to build evidence.
Distribution rights acceptance|analysis/reports/release_rights.md|Verify selected art/fonts/audio ownership proof and exclude unresolved assets from distributable bundle.
Release build provenance|analysis/reports/release_manifest.json|Record source/toolchain/data/schema/protocol versions and signed artifact checksums from reproducible builds.
Store metadata package|docs/release/store_metadata.md|Prepare accurate descriptions/screenshots/ratings/privacy answers from shipped behavior; no inherited payout text.
Rollback and recovery drill|analysis/reports/release_rollback.md|Demonstrate previous compatible reader/artifact and save recovery without unsupported schema downgrade.
Production release gate|analysis/reports/production_gate.md|Review checklist,QA,performance,rights and known issues; block anyP0or unresolved native platform.
Controlled distribution task|analysis/reports/distribution_record.md|After explicit release authorization,submit approved artifact/channel and record outcome; no implicit publication.''',
20:'''Alternative mode capture|analysis/reference/extended_mode_cases.md|Reach Dragon/Demon/Tower unlocks and record entry,roster,timer,reward/failure rules before implementation.
Summon capture|analysis/reference/summon_cases.md|Record disclosed pool probabilities,pity andx1/x10rules without paid sampling or rarity guesswork.
Prestige presence check|analysis/reference/prestige_presence.md|Inspect bounded late-menu/versioned sources and record observed/unknown status; no invented rebirth loop.
Relic progression design|docs/progression/RELIC_EXTENSION.md|Specify slots,ownership,acquisition and effects from evidence with save/schema/motion/audio/test impacts.
Dragon mode implementation slice|game-core/src/modes/DragonMode.ts|Implement one verified mode entry/wave/reward path with isolated roster and idempotent exit.
Demon mode implementation slice|game-core/src/modes/DemonMode.ts|Implement one verified counterattack/recovery path and test hero defeat without unintended permanent loss.
Tower mode implementation slice|game-core/src/modes/TowerMode.ts|Implement one verified floor progression/checkpoint/reward path with save compatibility.
Summon pool reducer|game-core/src/systems/SummonService.ts|Implement reviewed pool,pity and atomic batch grant only after separate scope/economy acceptance.
Skill status reducer|game-core/src/systems/SkillService.ts|Implement one verified skill/status family with stacking,cooldown,target and interruption tests.
Custom character motion|docs/visual/CUSTOM_CHARACTER_MOTION.md|Commission separable art/rigs only if whole-sprite quality insufficient; preserve provenance and runtime budgets.
Background expansion|docs/visual/LAYERED_BACKGROUND_EXTENSION.md|Acquire true separated layers and compare parallax quality/memory before replacing flattened source.
Post-launch diagnostics triage|analysis/reports/post_launch_triage.md|Turn consented crash/save/bridge reports into bounded reproduction tasks with build/evidence IDs.
Optional online systems ADR|docs/adr/ADR-007-ONLINE-SYSTEMS.md|Define accounts/cloud-save/ads/payments scope,authority and migration before any SDK/backend implementation.'''}
