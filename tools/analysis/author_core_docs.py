from plan_common import *
docs={
'11_NAVIGATION_FLOW.md':'''# Навигация и input ownership

[OBSERVED] Figma показывает пять tab icons, center Battle, отдельные wheel/settings entries; prototype reactions отсутствуют. [PROPOSED] Stable routes: start, battle, heroes/detail, heroes/upgrades, shop, dungeon, relic, wheel, settings. Shop без полноценного Figma frame остаётся scope gate. SCREEN-007 — список upgrades, не второй battle screen.

```text
BOOT → LOADING → START → SESSION_RESTORE → BATTLE
BATTLE ↔ HERO_DETAIL ↔ HERO_UPGRADES
BATTLE ↔ DUNGEON / RELIC (P2 gated)
BATTLE or HERO → WHEEL → prior route
any ready route → SETTINGS_MODAL → prior route
session → priority popup queue → underlying route
```

Overlay stack has one interactive top owner. Input locks use {owner,reason,scope}; releasing unrelated lock cannot enable controls. Drag captures one pointer; second pointer ignored; pointercancel/background closes drag with no mutation. Reward fly layer does not block input. Wheel disables only spin until settled; closing visual result does not discard committed outcome. Native Back delegates to top modal, then returns to shell only from root game route.

[PROPOSED] Foreground meta keeps battle running, app background pauses. U-033 must verify exact reference behavior. Popup queue order: tutorial required acknowledgments, pending durable rewards/offline, daily, unlock informational; stable token dedupe. Store per-route selected hero and scroll state transiently; no duplicated state store in RN. [Screens](09_SCREEN_CATALOG.md) · [State matrix](10_SCREEN_STATE_MATRIX.md) · [Events](technical/05_EVENT_SYSTEM.md).
''',
'12_UI_LAYOUT_SPEC.md':'''# Layout reconstruction contract

[MEASURED] Canonical artboard430×932. [screen_map.json](../analysis/figma/screen_map.json) stores every direct-child rectangle and normalized bounds for15 artboards; [screen specs](09_SCREEN_CATALOG.md) map assets and text. Transform from top-left Figma to Cocos anchor coordinates happens once in adapter; do not mix coordinate origins.

Main SCREEN-003 anchors [MEASURED]: currency backgrounds x61/y18/w144/h54 and x225/y17/w144/h54; stage label x79/y165; stage bar near y190; bottom tabs at x7,91,175,259,343 / y847 /79×80. Main board shows5 columns×2 rows; live behavior15 slots introduces CF-003. The exact remaining node rectangles are machine-readable, not hand-rounded copies.

[PROPOSED] Layer constants: BACKGROUND, WORLD, PROJECTILES, WORLD_VFX, HUD, BOARD, NAV, MODAL_BACKDROP, MODAL, REWARD_OVERLAY, TOAST, DEBUG. World shake moves world-only descendants; HUD/counter landing anchors stay fixed. Bottom-nav clickable hit areas cannot overlap OS home/navigation insets.

Use sprite assets for decorative backgrounds/cards, runtime text for prices/HP/level/counters and vector primitives for simple tracks/sliders. No screenshot-as-UI. Board15 adaptation uses3 rows inside elastic region and compact purchase area, retaining world readability; compare against ten-slot Figma fixture separately so adaptation is explicit. Figma exact nonadaptive fixture and functional-equivalent gameplay layout have different golden IDs.

Measurement acceptance [PROPOSED]: core anchor error≤2 reference px; no critical clipping at required viewports;44pt target minimum; font baseline≤2px where font version matches. Pixel threshold starts1.5% differing unmasked pixels at per-channel tolerance16; calibrate with same-render baseline and record rationale, never hide layout drift behind large masks.

[Responsive](14_RESPONSIVE_AND_SAFE_AREAS.md) · [Tokens](13_DESIGN_TOKENS.md) · [Visual QA](qa/05_VISUAL_REGRESSION.md).
''',
'13_DESIGN_TOKENS.md':'''# Design and timing tokens

[OBSERVED] Typography in [styles](../analysis/figma/styles_and_reactions.json): Passion One Regular/Bold for game headings/body, Roboto Regular/SemiBold for alternative loading texts, Nunito for small labels/timer.21 style combinations across296 text nodes. Dominant game fill white, black outline; exact sizes/strokes stored by text ID. Small Figma labels8–12px need usability adaptation; do not silently substitute fonts.

[PROPOSED] Tokens: design.width430,height932; touch.minimum44; spacing.xs4,s8,m16,l24; panel backdrop opacity0.65; active text #ffffff and outline #000000 from Figma; disabled opacity0.55 plus explicit lock/text; do not encode eligibility by color alone. Runtime palette roles sampled from selected art rather than recoloring detailed raster artwork.

Motion ms: instant80,fast140,normal280,reward560,major900; merge650 total; popup enter280/exit140; button80/120; label650. Easing roles pressIn=quadIn,popOut=backOut,softOut=cubicOut,rewardArc=cubicBezier,shakeDecay=damped. These are PROPOSED, not Figma/runtime measurements. Quality profile cannot change logical attack/cooldown times.

Numeric formatter: integer decimal below1000; three significant digits withK/M/B/T then scientific fallback; deterministic floor at suffix boundary until reference rounding verified U-034. Locale group separators come from formatter, never parse display back. Strings use keys; Figma baked logo/welcome remain artwork, mutable labels recreated as runtime text. Localization scope English first;30% expansion test, Cyrillic/Korean only after font coverage decision.

[Typography acquisition](asset_gaps.md) · [Motion](visual/04_ANIMATION_LANGUAGE.md) · [Layout](12_UI_LAYOUT_SPEC.md).
''',
'14_RESPONSIVE_AND_SAFE_AREAS.md':'''# Portrait scaling and safe areas

[PROPOSED] Viewport safe rectangle = pixel viewport minus host-reported insets once. Design width430; primary scale = safeWidth/430. Background covers safe rectangle with crop, HUD anchored top, navigation bottom, world and board share flexible height. Do not apply both RN SafeArea padding and Cocos SafeArea to the same edge.

360×640: compact world vertically before shrinking interaction targets; board15 row hit zones stay≥44pt.390×844 and412×915: expand world/row spacing;430×932 golden fixture.768×1024 tablet: centered portrait playfield with decorative sides, never stretch characters horizontally. Desktop uses portrait pillarbox and ignores pointer starts outside canvas. Landscape mobile remains portrait lock; web landscape centers portrait area.

Validate notch/Dynamic Island, Android gesture+3button navigation, keyboard external links, split-screen/window resize, modal content taller than safe area. Modals max-height within safe rect and scroll content; close remains fixed. Low-height conflict is resolved by content scrolling/tab panels, not underlapping navbar.

Tests: assert key bounding boxes within safe rect, no world-shake displacement of HUD, inverse input transform roundtrip error<1px at5sample points; screenshot all15frames at canonical, main+settings+wheel at each variant. Reference exact composition screenshot uses saved designer data and frozen animations;15-slot adapted layout separate fixture.

[Layout](12_UI_LAYOUT_SPEC.md) · [Device matrix](qa/07_DEVICE_MATRIX.md) · [Screen catalog](09_SCREEN_CATALOG.md).
''',
'15_GAME_DESIGN_DOCUMENT.md':'''# Game design document

[OBSERVED] Live early loop includes buy tier1→manual merge→tier2 discovery→drag deployment→automatic attacks→enemy/stage progression; player can tap to withdraw. Public description advertises auto-merge and offline progression, whose exact rules still require evidence. Figma supplies a distinct high-detail animal fantasy art direction and additional equipment/relic/dungeon/wheel views.

[PROPOSED] Player goal: improve owned roster and effective battle power to clear stages and unlock progression. Decisions: spend versus save, combine units, deploy roster, invest upgrades, claim earned rewards. Basic battle does not require repeated attack taps. Keep board ownership separate from deployed roster; merge source identity is data, not portrait colors.

Priorities: P0 playable durable core with first boss and offline claim; P1 equipment/hero/daily/wheel/quest/settings after slice; P2 relic/dungeons/summon/event content; monetization/backend/prestige conditional. Full parity means verified mechanics per version, not all advertised2026contents copied automatically. Exact/fallback distinctions in [source policy](02_SOURCE_OF_TRUTH.md).

System specs [gameplay](gameplay/00_GAMEPLAY_INDEX.md), [progression](progression/00_PROGRESSION_INDEX.md) are normative. Immutable definitions + owned instance state + typed commands/events; all economy changes pass transaction API; persistence precedes grant presentation. Missing mechanics block relevant exact rule via U IDs; proposed fixture enables isolated development without falsifying evidence.

Art/motion/audio are part of acceptance: living flattened-sprite motion with calibrated feet/sockets, clear merge/result feedback, pooled projectiles/rewards, original licensed audio, reduced motion/haptic toggles. No requirement implies extracting proprietary reference art/audio/code.

[Core loop](16_CORE_GAME_LOOP.md) · [Vertical slice](release/02_VERTICAL_SLICE_DEFINITION.md) · [MVP](release/01_MVP_DEFINITION.md) · [Unknowns](04_UNKNOWNS_REGISTER.md).
''',
'16_CORE_GAME_LOOP.md':'''# Core loop and transaction boundaries

```text
eligible gold → Buy command → cost+unit atomic commit → first free unlocked slot
→ manual compatible merge (tutorial) / eligible auto scheduler
→ result tier+discovery transaction → deploy/withdraw roster decision
→ tick-based automatic attack → validated target/impact → enemy HP/death once
→ kill reward commit → stage first-clear/unlock commit → next encounter or farm/retry
→ resources feed next buy/upgrade
background → save time → offline pending entitlement → claim commit → foreground loop
```

[OBSERVED] Initial gold100, two quoted purchases1; first merge tier1+1→2; new Archer popup+100gems/+10gold; deployment retains board slot and consumes active roster capacity; first kill gold+1 and stage1-2. These are bounded first-session samples. Auto ordering/cost growth/advanced balance remain U-002/003/004. Hold can fill open slots; full board has explicit message (EV-015).

[PROPOSED] Commit sequence serializes conflicting commands. Twenty Buy taps evaluate latest revision in order; no global animation lock. Full board rejects spend, leaves compatible merge available. Three equal units settle toone result+one source; four equal can cascade under configured auto policy. Deployed merge effects follow explicit policy before next tick.

Reward source IDs distinguish repeatable kill, first stage clear, first hero discovery, daily period, wheel spin and offline interval. Expired/duplicate entitlement cannot regrant even after scene change. Foreground navigation policy and background offline policy are separate. [Rewards](progression/06_REWARDS.md) · [State](17_GAME_STATE_MODEL.md).
''',
'17_GAME_STATE_MODEL.md':'''# Domain state and clocks

[PROPOSED] One GameState owns revision,dataVersion,player,currencies,heroes,board,progression,stages,unlocks,equipment,quests,daily,wheel,offline,settings,analyticsConsent,transactionReceipts. Schema: [save.schema.json](../data-spec/save.schema.json). View state (route,modal stack,drag,particle handles) is not authoritative economy state.

```text
AppState: BOOT→LOADING→READY↔PAUSED; validation/persistence failure→ERROR→RETRY
Battle: ENTERING→SPAWNING→COMBAT→DEATH→REWARD_COMMIT→CLEAR→TRANSITION
Boss: WARNING→COMBAT→WIN or TIMEOUT→FARMING→RETRY_AVAILABLE
Merge: IDLE→VALIDATING→COMMIT_PENDING→RESOLVED→optional CASCADE→IDLE
Claim: AVAILABLE→COMMIT_PENDING→COMMITTED→PRESENTED
```

Clocks: simulation tick fixed-step; animation clock interpolated/reducible; wall UTC for daily/offline; monotonic elapsed for profiling; UI cooldown derived from absolute eligibility timestamp. Debug speed changes explicitly selected sim/animation clocks, never real claim periods. RNG interface has separate seeded streams for combat and reward to keep cosmetic particles from changing results.

Invariants: balances nonnegative integers; one unit/slot; unit IDs unique; deployed IDs owned; consumed units absent; result tier valid; dead enemy reward once; source claim eligibility monotonic; save/bridge/data/asset versions independently known. Every command includes expectedRevision/idempotency ID; mismatch recomputes quote or rejects visibly. No giant GameManager or distributed booleans.

Commands produce candidate snapshot+event batch; adapter persists required checkpoint; acknowledgment installs revision and publishes events. Pending commit backpressure prevents newer mutations racing durable order. Tick-only visual updates do not trigger full save. [Architecture](technical/01_ARCHITECTURE.md) · [Save](technical/08_SAVE_SYSTEM.md) · [Events](technical/05_EVENT_SYSTEM.md).
''',
'18_SESSION_FLOW.md':'''# Session and recovery flow

[PROPOSED] Cold start: load minimal branding→validate configs and source map→read latest valid save generation→migrate→initialize adapters/clock→reconcile pending reward→start route/tutorial→enable inputs. Corrupt latest slot falls back to validated backup with explicit error record; both invalid offer user-controlled recovery/reset with export, never silently discard progress.

Fresh save: source-backed tutorial commands and checkpoints; required NewHero acknowledgment before deploy; withdraw/redeploy teaching; tutorial completion acknowledgment. Subsequent mission hints/popups are independent steps, not proof all tutorial UI has ended. Existing save skips satisfied steps and queued duplicate discovery reward.

Background: stop accepting pointer input, cancel drags, checkpoint critical pending transaction, mark lastActiveAt, pause engine/audio. Foreground: dedupe lifecycle sequence, reconcile storage, clamp elapsed, preserve or create pending offline token, resume one engine instance. UI claim appearance waits for durable pending record. Repeated resume never calculates overlapping interval.

Return from RN root: send requestId/sessionGeneration; Cocos confirms ready once; late prior-generation messages discarded; exit waits bounded save acknowledgment and reports recoverable timeout. Process death uses durable snapshot; no assumption JS callbacks survive. Scene-switch cleanup unsubscribes every observer and returns all pooled handles.

Manual acceptance: close/reopen after buy, merge, kill, daily/wheel/offline claim; background during drag/projectile/boss/modal; test fresh/old/corrupt saves. [Golden path](qa/04_GAMEPLAY_ACCEPTANCE.md) · [Bridge](technical/18_BRIDGE_PROTOCOL.md) · [Save migrations](technical/09_SAVE_MIGRATIONS.md).
'''
}
for path,text in docs.items():write('docs/'+path,text+'\n\n[Индекс](00_INDEX.md).')
