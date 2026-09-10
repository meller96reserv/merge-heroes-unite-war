from plan_common import *
import csv,re

audio_rows=[
('music.main','session.ready','music',1,0,-16,0,1,0,'Warm fantasy loop, celesta/plucked strings, 86–100 BPM; 90–150s seamless, no vocal hook.'),
('music.boss','boss.spawned','music',1,0,-14,0,1,0,'Same harmonic world with low drums and rising strings; 45–90s loop, avoid alarm fatigue.'),
('ambience.main','world.entered','ambience',2,0,-30,0,1,0,'Quiet wind/leaves and occasional birds; seamless60–120s, no obvious rhythmic pulse.'),
('ui.soft','button.secondary','ui',3,.03,-14,40,3,0,'Soft woody click20–70ms with rounded top end.'),
('ui.primary','button.primary','ui',3,.02,-11,60,2,0,'Confident rounded tap60–100ms, short magical tail.'),
('ui.popupOpen','popup.opened','ui',2,.02,-14,120,2,-2,'Soft air rise120–200ms, no harsh zipper.'),
('ui.popupClose','popup.closed','ui',2,.02,-16,120,2,0,'Short downward air80–140ms.'),
('ui.tab','tab.selected','ui',3,.02,-14,80,2,0,'Small wooden/plucked switch50–90ms.'),
('ui.error','command.rejected','ui',2,.01,-14,250,1,0,'Friendly low double tick120ms; avoid punitive buzzer.'),
('economy.goldGain','currency.gold.gained','sfx',4,.06,-15,70,3,-1,'Small bright coin tinkle80–180ms; varied to avoid repetition.'),
('economy.goldSpend','currency.gold.spent','sfx',3,.03,-17,90,2,0,'Dry purse/coin tick70ms.'),
('economy.gemGain','currency.gem.gained','sfx',3,.04,-13,100,2,-2,'Glassy high sparkle180–300ms with soft attack.'),
('hero.spawn','hero.spawned','sfx',3,.04,-14,80,3,0,'Soft magical poof100–180ms, warm low body.'),
('merge.low','hero.merged.low','sfx',4,.04,-12,90,3,-2,'Two soft inputs converge into round pop and tiny chime250–450ms.'),
('merge.mid','hero.merged.mid','sfx',4,.03,-11,120,2,-3,'Converging whoosh with richer chord350–550ms.'),
('merge.high','hero.merged.high','sfx',3,.02,-9,250,1,-5,'Wide magical bloom500–800ms; strong but soft peak.'),
('merge.cascade','merge.chainStep','sfx',4,.02,-13,100,2,-2,'Escalating chime degrees, capped fourth step; avoid unlimited pitch rise.'),
('combat.melee','battle.attack.melee','sfx',4,.05,-18,60,4,0,'Short cloth/blade whoosh80–140ms, no heavy gore.'),
('combat.ranged','projectile.arrow.released','sfx',4,.04,-17,70,4,0,'Light bow/string release70–120ms.'),
('combat.magic','projectile.magic.released','sfx',4,.05,-17,80,3,0,'Airy magical pulse120–200ms, controlled high end.'),
('combat.hit','battle.hit','sfx',5,.06,-19,45,6,0,'Soft rounded impact45–100ms; choose wood/stone/magic variants.'),
('combat.crit','battle.critical','sfx',3,.03,-13,120,2,-2,'Stronger impact plus restrained bright accent100–180ms.'),
('enemy.deathSmall','enemy.died.small','sfx',4,.05,-17,90,3,0,'Friendly creature poof120–240ms, no vocal pain.'),
('enemy.deathLarge','enemy.died.large','sfx',3,.03,-15,140,2,-1,'Low soft crumble200–350ms.'),
('boss.intro','boss.spawned','sfx',2,.01,-11,1500,1,-5,'Low drum and magical breath600–900ms, clear anticipation.'),
('boss.death','boss.defeated','sfx',2,.01,-10,1500,1,-6,'Broad soft impact then reward sparkle700–1100ms.'),
('progress.stageClear','stage.cleared','sfx',3,.02,-13,400,1,-3,'Short rising three-note reward figure300–500ms.'),
('progress.unlock','unlock.changed','sfx',2,.01,-12,500,1,-4,'Warm discovery chord450–700ms.'),
('wheel.tick','wheel.segmentPassed','ui',3,.02,-19,45,1,0,'Tiny mechanical click15–40ms, throttle at high speed.'),
('wheel.result','wheel.landed','sfx',3,.02,-11,500,1,-4,'Reward chime400–700ms; neutral short variant for empty result.'),
('reward.daily','daily.claimed','sfx',3,.02,-12,500,1,-3,'Warm coin/chime flourish350–600ms.'),
('reward.chest','chest.opened','sfx',3,.03,-12,400,1,-3,'Wood creak then magical sparkle400–650ms.'),
('equipment.equip','equipment.changed','sfx',3,.03,-15,100,2,0,'Satisfying cloth/metal fit100–170ms.'),
('equipment.upgrade','upgrade.committed','sfx',3,.02,-12,250,1,-3,'Short ascending forge sparkle300–500ms.'),
('reward.offline','offline.claimed','sfx',2,.02,-12,500,1,-3,'Soft treasure collection flourish400–650ms.')]
audio_ids={r[0] for r in audio_rows}
def csvwrite(path,headers,rows):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True)
 with p.open('w',newline='') as f:w=csv.writer(f);w.writerow(headers);w.writerows(rows)
csvwrite('docs/audio/audio_event_matrix.csv',['eventId','trigger','category','variants','pitchRandomPlusMinus','gainDb','cooldownMs','maxConcurrent','duckMusicDb','sourceStatus','brief'],[(*r[:9],'custom needed',r[9]) for r in audio_rows])

# Each event is a presentation decision. Durations are proposed, not measured reference timings.
motion=[
('app.logo','app.loading','logo','fade+scale0.92→1',560,'cubicOut','softGlow',None,None,False),
('start.idle','start.ready','startButton','scale1→1.025→1 loop',1800,'sineInOut',None,None,None,False),
('start.press','button.primary','startButton','scale1→.96→1',200,'quadOut',None,'ui.primary','light',False),
('screen.transition','route.changed','screen','fade+translate12px',280,'cubicOut',None,None,None,False),
('hud.enter','battle.ready','hud','stagger fade/slide8px',280,'cubicOut',None,None,None,False),
('hero.spawn','hero.spawned','hero','scale0→1.08→1 from foot',280,'backOut','spawnPuff','hero.spawn','light',True),
('hero.idle','hero.visible','hero','scaleY1→1.02; offset0→-2',1600,'sineInOut',None,None,None,False),
('hero.attack','battle.attackStarted','hero','anticipation80 release60 recover140',280,'quadOut','weaponArc','combat.melee',None,False),
('hero.hit','hero.damaged','hero','flash40 knockback4px recover100',140,'quadOut','hitFlash','combat.hit',None,False),
('hero.upgrade','upgrade.committed','heroCard','scale1→1.06→1',560,'backOut','upgradeRing','equipment.upgrade','medium',True),
('hero.mergeOut','hero.merged','sourceHero','converge180 then shrink90',270,'quadIn','mergeTrail','merge.low',None,True),
('hero.mergeIn','hero.merged','resultHero','reveal pop120 settle260',380,'backOut','mergeBloom','merge.mid','medium',True),
('enemy.spawn','enemy.spawned','enemy','fade+scale.9→1',280,'cubicOut','spawnPuff',None,None,True),
('enemy.idle','enemy.visible','enemy','offset0→-2 and tilt±1deg',1800,'sineInOut',None,None,None,False),
('enemy.attack','enemy.attackStarted','enemy','anticipate100 lunge60 recover180',340,'quadOut','weaponArc','combat.melee',None,False),
('enemy.hit','battle.hit','enemy','flash40 recoil6px settle100',140,'quadOut','hitFlash','combat.hit',None,True),
('enemy.death','enemy.died','enemy','squash80 fade/scale200',280,'quadIn','deathPuff','enemy.deathSmall',None,True),
('boss.intro','boss.spawned','boss+banner','scale.88→1 and banner slide',900,'cubicOut','bossAura','boss.intro','heavy',True),
('boss.hit','boss.damaged','boss','flash50 recoil3px',140,'quadOut','hitFlash','combat.hit',None,True),
('boss.death','boss.defeated','boss','impact120 dissolve780',900,'cubicOut','bossBurst','boss.death','heavy',True),
('projectile.launch','projectile.released','projectile','muzzle flash and position bind',80,'linear','muzzle','combat.ranged',None,True),
('projectile.travel','projectile.inFlight','projectile','interpolate visual endpoints',280,'linear','trail',None,None,True),
('projectile.impact','projectile.impacted','impact','scale.6→1.2 fade',140,'quadOut','impactSpark','combat.hit',None,True),
('damage.normal','battle.hit','damageLabel','rise24px spread±8 fade',650,'quadOut',None,None,None,True),
('damage.crit','battle.critical','damageLabel','pop1.25 rise32px fade',800,'backOut','critStar','combat.crit','light',True),
('reward.coin','currency.gold.gained','coinFlyer','arc source→HUD',560,'quadIn','coinSpark','economy.goldGain',None,True),
('reward.gem','currency.gem.gained','gemFlyer','arc source→HUD',650,'quadIn','gemSpark','economy.gemGain',None,True),
('currency.bump','currency.changed','currencyCounter','count interpolation then scale1.08',280,'quadOut',None,None,None,False),
('purchase.success','hero.purchased','buyButton','press then confirm glow',280,'quadOut','buttonGlow','economy.goldSpend','light',False),
('purchase.failure','purchase.rejected','buyButton','horizontal shake±4px',180,'quadOut',None,'ui.error',None,False),
('slot.unlock','board.slotUnlocked','slot','lock fade and ring expand',560,'cubicOut','unlockRing','progress.unlock','medium',True),
('merge.cascade','merge.chainStep','board','serial result pulse; cap intensity4',650,'backOut','mergeBloom','merge.cascade','medium',True),
('stage.progress','stage.changed','stageHUD','label crossfade and bar reset',280,'cubicOut',None,None,None,False),
('boss.warning','boss.approaching','stageHUD','warm glow two pulses',900,'sineInOut','warningGlow',None,None,False),
('stage.clear','stage.cleared','banner','slide/fade hold then exit',900,'cubicOut','smallConfetti','progress.stageClear','light',True),
('feature.unlock','unlock.changed','featureCard','pop and lock dissolve',560,'backOut','unlockRing','progress.unlock','medium',True),
('popup.open','popup.opened','popup','dimmer fade and scale.94→1',280,'cubicOut',None,'ui.popupOpen',None,False),
('popup.close','popup.closed','popup','fade scale1→.97',180,'quadIn',None,'ui.popupClose',None,False),
('tab.switch','tab.selected','navButton','selected scale1.04 and panel fade',200,'quadOut',None,'ui.tab','light',False),
('redDot.appear','claimability.changed','redDot','scale0→1.1→1',280,'backOut',None,None,None,False),
('daily.claim','daily.claimed','rewardPanel','chest glow then flyers',900,'cubicOut','rewardBurst','reward.daily','medium',True),
('wheel.accelerate','wheel.reserved','wheel','angular speed0→peak',900,'quadIn',None,None,None,False),
('wheel.tick','wheel.segmentPassed','pointer','deflect6deg and settle',80,'quadOut',None,'wheel.tick',None,False),
('wheel.decelerate','wheel.braking','wheel','monotonic ease to saved angle',2800,'quintOut',None,None,None,False),
('wheel.land','wheel.landed','segment','winner pulse and reward reveal',560,'backOut','rewardBurst','wheel.result','medium',True),
('chest.open','chest.opened','chest','whole-sprite wobble and glow reveal',650,'backOut','rewardBurst','reward.chest','medium',True),
('equipment.equip','equipment.changed','itemSlot','icon settle and slot glow',280,'backOut','slotGlow','equipment.equip','light',False),
('equipment.enhance','upgrade.committed','itemCard','pulse stat change and sparkle',560,'cubicOut','upgradeRing','equipment.upgrade','medium',True),
('currency.insufficient','command.insufficientFunds','price','shake4px and warm tint',180,'quadOut',None,'ui.error',None,False),
('feature.locked','command.locked','lock','wiggle±5deg',180,'quadOut',None,'ui.error',None,False),
('offline.popup','offline.pending','rewardPopup','popup enter and subtle chest glow',560,'cubicOut','softGlow','ui.popupOpen',None,False),
('button.secondary','button.secondary','button','scale1→.97→1',200,'quadOut',None,'ui.soft',None,False),
('settings.slider','settings.previewChanged','slider','direct thumb tracking; no tween lag',0,'linear',None,None,None,False),
('settings.toggle','settings.changed','toggle','thumb slide and color crossfade',140,'quadOut',None,'ui.soft',None,False),
('loading.progress','loading.changed','progressBar','monotonic width interpolation',140,'linear',None,None,None,False),
('maintenance.idle','maintenance.visible','panel','static; readability priority',0,'linear',None,None,None,False),
('hero.deploy','hero.deployed','hero','arc board→battle anchor',280,'quadOut','spawnPuff','hero.spawn','light',False),
('hero.withdraw','hero.withdrawn','hero','fade battle; board pulse',200,'quadOut',None,'ui.soft',None,False),
('tutorial.hand','tutorial.stepShown','hand','drag path loop; target remains fixed',1200,'sineInOut',None,None,None,False),
('quest.claim','quest.claimed','questCard','checkmark pop and reward flyers',560,'backOut','rewardBurst','progress.stageClear','light',True),
('battle.camera','battle.majorImpact','worldLayer','offset max3px≤120ms',120,'quadOut',None,None,None,False)]
assert all(r[7] is None or r[7] in audio_ids for r in motion)
csvwrite('docs/visual/animation_matrix.csv',['eventId','trigger','visualTarget','animation','durationMsProposed','easing','vfxId','sfxId','hapticId','interruptPolicy','pool','reducedMotion','lowQuality','status'],[(i,tr,t,a,d,e,v or 'none',s or 'none',h or 'none','cancelAndReconcile',str(p).lower(),'instant final state / opacity only; no shake','halve particles; one flyer; no camera shake','PROPOSED') for i,tr,t,a,d,e,v,s,h,p in motion])

visual={
'01_ART_DIRECTION':('Art direction','''Use the supplied fantasy animal heroes, saturated warm/cool panels, thick dark outlines, gold/wood accents and clear silhouettes. The live reference establishes mechanics; its human characters are not copied over the user's Figma art. Preserve Figma proportions and expression rather than repainting assets during implementation.

Visual hierarchy: battle enemy/hero action first, readable stage health second, board decisions third, primary buy control then navigation. Currency HUD remains high contrast. UI is constructed from components and text; full-screen raster captures are comparison evidence only. Marketing posters are not runtime screens.

Fidelity has two fixtures: exact Figma430×932 layout and functional gameplay adaptation with15-slot board. Label captures accordingly. Every mismatch has an evidence/conflict entry; do not compress15slots into a10-slot golden and call it exact. Character foot pivots and alpha trim are calibrated before animation. QA judges silhouette, outline, text baseline and spacing separately from decorative particles.'''),
'02_ASSET_NAMING_AND_IMPORT':('Asset naming and import','''Use semantic IDs from semantic_map.json, retaining resolution suffixes until variant selection is reviewed. Filenames express category/family/role; original SHA/hash remains provenance only. Preserve source alpha and aspect ratio. Convert to runtime format through a reproducible import manifest, never overwrite raw extracted images.

For each selected asset record source hash, target pixel dimensions, pixels-per-unit, trim rectangle, original canvas size, pivot, atlas, compression, filtering, mipmaps and intended use. Foot pivot is proposed from alpha bounds for characters; center pivot is appropriate for icons. Negative/large transparent padding is inspected against adjacent variants. Do not independently trim animation variants without compensating offsets.

9-slice candidates are framed panels/buttons, not ornate character portraits or entire decorated screens. Insets remain null until border regions are measured; stretch tests at0.75×/1×/1.5× must preserve corners. Texture sRGB/color settings and premultiplied-alpha behavior are verified using dark/light backgrounds. Exclude reference-only scopes from runtime imports.

Acceptance: source hashes unchanged, all runtime IDs resolve, no accidental duplicate .meta UUID, no clipped glow/feet and no visible seams at intended display sizes.'''),
'03_SPRITE_ATLAS_PLAN':('Sprite atlas plan','''Start with2048×2048 atlas groups by co-residency: ui_common, ui_battle, ui_meta, currency_icons, portraits, equipment_by_family, effects. Keep full backgrounds standalone. Character variants that exceed intended screen size are downscaled through reviewed import settings before packing; source resolution is not a runtime requirement.

Packing uses extrusion/padding to avoid bilinear bleeding. Atlas manifest maps semantic ID to frame UUID, trim/original bounds and dependencies. Never assume a pHash near duplicate is replaceable: compare outlines, alpha, hue and actual node use. Current exact duplicate count is zero;167 pHash pairs are review candidates.

Texture residency target battle≤128MiB is proposed. Raw351-image decode size≈905.53MiB demonstrates why loading everything is unacceptable. Measure bundle residency by route and unload only after pooled effects release references. Compression is chosen per target after alpha/outline tests; do not claim ASTC/ETC settings are validated before device builds.

Acceptance: atlas boundaries show no halos at scale; changing routes does not retain all equipment/relic art; grouped atlases reduce draw calls without a single huge texture keeping unrelated screens resident.'''),
'04_ANIMATION_LANGUAGE':('Animation language','''All timing values in animation_matrix.csv are proposed design targets. Reference video measurements live separately. Use anticipation→action→settle, grounded pivots and bounded overshoot. Timing tokens: instant80ms, fast140ms, normal280ms, reward560ms, major900ms. Idle motion is slow and subtle; important rewards may be expressive while frequent hits remain economical.

An authoritative event starts presentation only after commit. Interrupt policy is cancel-and-reconcile: cancel tweens/effects, release pools and redraw committed state. Attack visual release markers align to configured domain hit scheduling but do not trigger damage. A presentation skip/reduced-motion option cannot change outcomes or RNG.

State priority: death/merge result > hit > attack > idle. Repeated hits coalesce flash, do not restart death. Global shake affects world only, max3px/120ms, never HUD. Reduced motion disables shake/parallax/large scale sweeps and replaces rewards with opacity/label updates. Debug freeze supports named markers for screenshots.

Acceptance: every matrix event has target, duration, easing, VFX/SFX/haptic decision, cancellation and fallback; no orphan nodes after interruption; no overlapping tweens fight the same transform property.'''),
'05_HERO_ANIMATIONS':('Hero animation specification','''The Figma inventory has flattened whole-character rasters and portraits, not skeletal rigs or separate limbs. Initial runtime profiles use a root grounded pivot, sprite child and separate shadow. Idle uses±2px lift and≤2% squash over1.6s; feet should not visibly skate. Spawn280ms scales from foot with a brief1.08 overshoot.

Melee attack profile:80ms anticipation,60ms release,140ms recover; ranged/magic share the phase contract with distinct rotation/flash/projectile visual. Domain attack interval and release timestamp remain configuration. Hero hit140ms uses short tint/recoil; deployment280ms travels toward the battle anchor while the owned board slot retains its identity/Battle marker.

Merge-out and merge-in are one visual transaction keyed by mergeId. Equip/upgrade overlays do not permanently change base scale. Death/recovery support is gated by mode evidence; normal reference help describes counterattacks for Legendary Dungeon, so do not assume all stage enemies damage heroes.

Acceptance: all10 art families grounded in idle/attack/merge frames, no clipped weapons/glows after trim, pose neutral after interruption, and reduced-motion result is readable.'''),
'06_ENEMY_ANIMATIONS':('Enemy and boss animation specification','''Ten enemy families and three dragon boss families have raster variants. Use family profiles for small creature, bulky creature and dragon. Normal spawn280ms, idle1.8s, hit140ms and death280ms; bosses use900ms entrance/death and smaller recoil to communicate mass. These are proposed timings.

Death wins over hit/attack. At zero HP the domain emits one death and reward; view finishes/fades or skips safely on scene exit. Pool release clears tint, HP label, target link and animation generation. Do not keep a dead collider/input target during a decorative fade.

Enemy attacks are mode/config gated. Live How to Play mentions monster counterattack and HP/DEF in Legendary Dungeon; it does not establish normal-stage attack/recovery formulas. Boss warning/timer remain readable above VFX. World shake is bounded and reduced-motion aware.

Acceptance: simultaneous hits produce one death presentation; boss skip does not skip reward;20-enemy stress fixture respects pool cap; all silhouettes and floor contacts remain consistent across resolution variants.'''),
'07_MERGE_ANIMATIONS':('Merge animation specification','''Proposed total650ms:0–80ms select/highlight compatible pair;80–260ms source converges toward destination with short trail;260–350ms compression/flash;350–470ms result reveal/pop;470–650ms settle and reward accents. Manual destination is drop target; automatic policy is a separate unknown and must not be inferred from this visual sequence.

Commit result before presentation. Store mergeId, source IDs, result ID and destination slot in the event. Both inputs are locked only for that presentation; after interruption redraw result from committed board and free the lock. A failed merge has no result bloom or currency sound. Max-tier incompatible gesture gets small feedback without consuming either hero.

Cascade plays serial links or bounded overlaps, intensity capped at fourth step, no unlimited pitch/particle growth. Low quality uses one ring/spark and reduced motion uses immediate result plus highlight. New-tier discovery popup queues after result; it must not block saving the merge. Popup dismissal cannot grant discovery reward twice.

Acceptance: record normal, cascade, full-board, max-tier, repeated input, background-at300ms and scene-exit cases. No transient source remains; pool count returns; final state is identical with animation disabled.'''),
'08_COMBAT_VFX':('Combat VFX and damage numbers','''Effects are proposed original primitives: short weapon arc, muzzle glint, arrow/magic trail, hit flash, crit star, death puff, boss aura and bounded camera nudge. New art may be acquired if primitives cannot match style, but no reference texture is extracted. Projectile runtime art is a gap, not an assumed Figma asset.

Damage labels show the committed integer damage. Normal rises24px over650ms; crit rises32px over800ms with1.25 pop and a distinct marker/shape as well as color. Pool48 labels initially; combine low-priority simultaneous numbers by target/time bucket for presentation only. Cap spread to avoid covering stage HP or buy controls. Rounding/display never changes damage calculation.

Projectiles interpolate visual endpoints using attack event timing; impact SFX/VFX correspond to the committed hit. Target dies early: cancel obsolete visual or use configured harmless fade; do not select a new logical target in the renderer. Boss lethal hit and timeout use domain order.

Acceptance: stress burst leaves HUD readable, pooled overflow drops only cosmetics, zero references to dead entities after release, and low-quality/reduced-motion gameplay hashes match full quality.'''),
'09_UI_MOTION':('UI motion and component coverage','''Buttons define normal/pressed/disabled/loading/selected/locked states. Primary press80ms down plus120ms return; disabled stays readable with tint and no success sound. Loading consumes repeated taps and preserves label/size. Missing raster states can use reviewed tint/scale overlays; they must not be confused with missing logical states.

Counters animate display toward committed amount over280ms, coalescing updates by revision. Gameplay affordability reads exact Amount immediately, never the intermediate label. Popup enter280ms/exit180ms; dimmer owns input. Tab200ms switches selected art and panel; rapid taps cancel stale transitions. Red dots appear280ms, then remain static to avoid perpetual distraction.

Sliders track the pointer directly with no tween latency; toggles use140ms. Loading progress is monotonic and derived from actual loader weights. Maintenance remains static. Tutorial hand loops1.2s but permitted input uses named hit target, not hand coordinates.

Every screen/component is assigned a motion decision in component_motion_map.csv. No-motion is an explicit decision for static body copy/background decoration. Acceptance: keyboard/focus and touch states readable, popup close cannot click underlying purchase, and repeated transitions leave one active screen.'''),
'10_REWARD_VFX':('Reward VFX','''RewardService commits grants, receipt and watermark before reward reveal. Presentation receives transactionId and grants; coins/gems fly to their HUD anchors but the balance is already authoritative. A visual counter can animate after commit without allowing a second claim. On background/skip, release effects and show final balance on resume.

Normal gold uses≤6 flyers, gems≤4; low quality one symbolic flyer. Reward burst has a fixed pool cap and does not instantiate one node per currency unit. Daily/chest/offline variants share a650–900ms reveal and distinct title/icon. Wheel chooses and persists outcome before rotation; segment highlight and result popup cannot reroll.

Multiple rewards queue by priority: irreversible claimed result then discovery/unlock, with informational toasts last. Duplicate transactionId has no second celebratory sequence. Empty wheel outcome receives neutral feedback, not a false win. Counter overflow uses localized compact formatting while detail view exposes exact value.

Acceptance:1000/1e20 amounts use bounded node count, close during reveal preserves grant, reopened daily/wheel cannot duplicate animation or credit, and all required grants remain readable with reduced motion.'''),
'11_BACKGROUND_PARALLAX':('Background and parallax','''Most supplied backgrounds are flattened images. Treat each as a standalone layer unless separable source layers actually exist. Do not cut silhouettes from a flattened landscape and invent missing scenery behind them. Battle ground alignment and hero feet take priority over parallax.

Proposed initial implementation: static background with optional subtle full-layer offset≤3px, no implied depth. Future custom background layers may support far/mid/near factors0.1/0.25/0.5 after art approval. UI and board remain fixed. Clamp edges to prevent revealing empty pixels; portrait resize uses cover/crop policy documented per screen.

Low quality and reduced motion disable parallax. Background texture dimensions are selected by displayed area, not maximum source size. Dungeon backgrounds load only for that route/mode. Transition between worlds crossfades while preserving domain stage state.

Acceptance: narrow/tall/tablet viewports show no gaps, combat floor remains consistent, no parallax on modal text, and texture residency stays within budget.'''),
'12_SCREEN_TRANSITIONS':('Screen transitions','''Loading→start→battle is a stateful boot flow; user entry waits for required assets and valid save. Start CTA has feedback then one navigation command. Main tabs retain the same domain session. Foreground meta transition does not independently pause the simulation; actual pause policy remains explicit in route metadata and reference unknownU033.

Use280ms fade/12px slide for routes and200ms tab content. Popup stack uses280/180ms open/close with dimmer; close consumes gesture. Maintenance/error panels replace route content with clear retry/back action. Deep links resolve after initialization and unlock checks, then enqueue a single route change.

Rapid navigation increments route generation; late asset/tween callbacks from old route are ignored. Keep outgoing required assets until its transition/pools finish, then release. Reentering a panel derives current state instead of replaying stale reward events.

Acceptance:20 rapid tab/popup transitions leave one route and valid input owner; Back unwinds popup before game exit; background during transition resumes to a stable route; frozen screenshot mode selects the final settled state.'''),
'13_HAPTICS':('Haptics','''Haptics are proposed optional platform feedback: light for primary purchase/deploy/tab; medium for merge result, equip upgrade and reward claim; heavy only for boss intro/death with cooldown. Ordinary attack/hit loops do not vibrate. Failure/locked action uses visual/audio feedback by default to avoid repetitive buzz.

Host interface exposes semantic light/medium/heavy/success requests, not waveform authoring in the domain. Map to supported native APIs during integration; unsupported devices/web are silent. Global user preference and platform settings are respected. Cooldown proposed80ms light,200ms medium,1500ms heavy; cascade intensity is capped.

Events occur after committed result, never on every pointermove or wheel segment tick. Background suppresses requests. Reduced-motion and haptics are separate preferences; do not silently couple them. Queue does not replay missed haptics after resume.

Acceptance: settings persist, repeated rewards obey cooldown, muted haptics generate no native call, and low-end devices remain responsive without haptic support.''')}
for stem,(title,body) in visual.items():
 path='docs/visual/'+stem+'.md';write(path,f'# {title}\n\n{body}\n\n## Traceability\n\n[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).')

screen_map=json.loads((ROOT/'analysis/figma/screen_map.json').read_text())
# Screen catalogue identifiers are stable regardless of raw container shape.
screen_files=sorted((ROOT/'docs/screens').glob('SCREEN-*.md'))
component_rows=[]
for p in screen_files:
 sid=p.stem.split('_')[0];name=p.stem.split('_',1)[1]
 for component,event in [('screenRoot','screen.transition'),('background','none.static'),('title/bodyText','none.static'),('primaryButton','start.press'),('secondary/closeButton','button.secondary')]:component_rows.append((sid,component,event,'PROPOSED; use only when component exists'))
 if name in ['main_battle','hero_equipment','relic','dungeon','hero_upgrades']:
  component_rows.extend([(sid,'currencyHUD','currency.bump','PROPOSED'),(sid,'bottomNavigation','tab.switch','PROPOSED'),(sid,'lockedAction','feature.locked','PROPOSED')])
 if 'wheel' in name:component_rows.extend([(sid,'wheel','wheel.accelerate/wheel.decelerate/wheel.land','PROPOSED'),(sid,'pointer','wheel.tick','PROPOSED')])
 if 'settings' in name:component_rows.extend([(sid,'slider','settings.slider','PROPOSED'),(sid,'toggle','settings.toggle','PROPOSED')])
 if 'daily' in name:component_rows.append((sid,'rewardPanel','daily.claim','PROPOSED'))
component_rows += [('SCREEN-003','boardHeroes','hero.spawn/hero.idle/hero.mergeOut/hero.mergeIn','PROPOSED'),('SCREEN-003','battleEntities','hero.attack/enemy.hit/enemy.death','PROPOSED'),('SCREEN-004','equipmentSlots','equipment.equip/equipment.enhance','PROPOSED'),('SCREEN-007','upgradeCards','hero.upgrade','PROPOSED'),('SCREEN-001','progress','loading.progress','PROPOSED'),('SCREEN-012','maintenancePanel','maintenance.idle','PROPOSED')]
csvwrite('docs/visual/component_motion_map.csv',['screenId','component','motionDecision','status'],component_rows)

gaps=[
('GAP-001','Projectile sprites','No runtime-ready arrow/magic set established','yes, original primitive shapes','yes if primitives fail','yes','yes','optional','P0','Projectile art task'),
('GAP-002','Hit/crit/merge particles','No complete effect sequence/atlas','derive color palette only','optional','yes','yes','optional','P0','Effect primitive task'),
('GAP-003','Ground shadows','Flattened figures lack separate consistent shadow','yes alpha ellipse','no','yes','yes','no','P0','Pivot calibration'),
('GAP-004','Hero skeletal parts','Whole raster characters, no rigs','no safe automatic cut','yes if skeletal scope approved','no','no','optional','P2','Custom character motion'),
('GAP-005','Layered backgrounds','Most scenery flattened','no safe hidden scenery inference','yes for true parallax','limited','static only','optional','P2','Background expansion'),
('GAP-006','Button pressed/disabled/loading','Not all component states drawn','yes tint/scale/spinner','review','yes','yes','no','P0','Button state task'),
('GAP-007','Locked/selected variants','Some lock/nav art available, coverage incomplete','yes existing lock','review','yes','yes','no','P0','Navigation states'),
('GAP-008','Fonts and licenses','Passion One/Roboto/Nunito referenced; files absent','no','acquire licensed fonts','no','fallback only','no','P0','Font acquisition'),
('GAP-009','SFX','No authorized audio assets supplied','no reference extraction','yes original/library','yes synthesis','playback only','no','P0','Audio acquisition'),
('GAP-010','Music/ambience','No authorized loops supplied','no reference extraction','yes original/library','possible','playback only','no','P1','Music acquisition'),
('GAP-011','9-slice insets','Candidate borders not calibrated','yes pixel inspection','no','no','yes after calibration','no','P0','Asset import calibration'),
('GAP-012','Full15-slot board layout','Figma shows10 vs reference15','yes existing slot components','adaptation review','yes layout','yes','no','P0','Board layout conflict review'),
('GAP-013','Offline/quest/boss failure popups','No explicit matching Figma artboards','yes shared panel/button styles','yes composed layout','yes','yes','no','P1','Missing popup designs'),
('GAP-014','Loading error/retry','Loading art exists; failure state absent','yes loading panel','yes state design','yes','yes','no','P0','Loading states'),
('GAP-015','Rarity color semantics','UR/SR/SS art badges without full gameplay taxonomy','yes existing frames','semantic mapping review','no','yes labels','no','P1','Content visual mapping'),
('GAP-016','Localization glyph coverage','No measured Cyrillic/long-string font export','font acquisition','review layout','no','font rasterization','no','P1','Localization QA'),
('GAP-017','Icon active/inactive meaning','Some image names ambiguous; semantic assignment visual','yes semantic map','review interactions','yes overlays','yes','no','P1','Asset usage review'),
('GAP-018','Rights evidence','User-supplied fig is not distribution license proof','no','obtain ownership/license confirmation','no','no','no','P0','Asset rights ledger')]
csvwrite('analysis/figma/asset_gaps.csv',['gapId','category','evidence','canDerive','needsDesign','procedural','cocosPrimitives','imageGeneration','priority','taskKey'],gaps)
write('docs/visual/asset_gap_analysis.md','# Asset gap analysis\n\nAll gaps are planning decisions. Image generation is only an optional future acquisition route, not performed here. No source art was automatically sliced or repainted.\n\n'+table(['ID','Gap','Observed basis','Derive','New design','Procedural','Cocos','Imagegen','Priority','Verification/task'],gaps)+'\n\n[Full source manifest](../../analysis/figma/asset_manifest.csv) · [Ownership ledger](../../analysis/figma/asset_ownership.csv) · [Tasks](../../tasks/TASK_INDEX.md).')

audio_docs={
'01_AUDIO_DIRECTION':('Audio direction','''Create an original bright fantasy soundscape with soft transients, warm body and restrained sparkle. Frequent idle/combat sounds must remain comfortable over long sessions. No supplied authorized audio exists and the browser capture is silent; reference sound identity/timing is UNKNOWN, not recreated from memory.

Five buses: music, sfx, ui, ambience, optional voice. MVP has no voice requirement. Use small variation banks for repeated taps/hits and distinct semantic cues for success, discovery and boss events. Critical information is also visual; audio mute cannot hide timer/failure state.

All35 event families are specified in audio_event_matrix.csv with variants, pitch range, gain, cooldown, concurrency, duck and source status. Current source status is custom needed. Production acceptance requires an acquired file, license proof, mix audition and event wiring, not merely a placeholder beep.'''),
'02_SFX_EVENT_MAP':('SFX event map','''The matrix is the authoritative semantic event catalogue. Trigger on committed domain events or explicit UI interaction events; never on raw balance text changes or arbitrary tween completion. Merge tiers select low/mid/high banks through configuration; cascade uses a bounded musical sequence. Presentation RNG for variants cannot consume gameplay RNG.

The matrix brief column is an acquisition brief for every event: character, duration, frequency emphasis and variation intent. UI soft/primary/error stay differentiated; spend/gain have different contours; melee/ranged/magic release have separate timbres. Empty wheel result is neutral, not a success fanfare.

Test each event through a debug audition panel with gain/cooldown/voice count visible. Stress100 hits, simultaneous deaths and a reward overlay. Events dropped by mix budget remain counted in diagnostics but do not replay later. Audio IDs referenced by animation matrix must resolve exactly.'''),
'03_MUSIC_PLAN':('Music plan','''Two original loops: main exploration/battle90–150s at86–100BPM with plucked strings/celesta/light percussion; boss45–90s in compatible harmonic palette with low drums and restrained rising tension. Both must loop seamlessly and avoid recognizable reference melodies. Supply full-quality masters and runtime encodes with version/license metadata.

Main music starts after user entry/audio unlock. Boss crossfade proposed600ms; result ducks then returns over800ms. Popup does not restart a track; pause/resume restores playback policy without two active loops. Music preference persists independently of SFX.

Acceptance: loop boundary inaudible over five repeats, no clip peak overload, phone speaker retains melody at low gain, headphones reveal no clicks, and boss transition does not create a volume jump. Missing music is a tracked asset gap and can be silent in development, not falsely marked final.'''),
'04_AMBIENCE_PLAN':('Ambience plan','''Main-world ambience uses quiet wind/leaves and occasional soft birds in60–120s loops. Avoid dense moving stereo elements and identifiable real-world locations. Dungeon ambience, if extended mode ships, uses a separate low cave/wind palette with no oppressive constant rumble.

One ambience loop per active world, fade500ms on world transition. Level proposed−30dB relative source; music/SFX remain foreground. Background suspends loops, resume restores once. Low-quality/performance mode may disable ambience without changing mechanics.

Acceptance: seamless loop, no repeated obvious transient every few seconds, no audible DC/clicks, no conflict with critical UI cues and no unbounded source allocation across route changes.'''),
'05_AUDIO_MIX_RULES':('Audio mix rules','''Matrix gain values are starting mix levels, not measured loudness targets. Master output must remain unclipped after worst-case summation; use headroom and measured limiter policy if needed. Music duck by event is reference-counted; proposed attack40ms/release350ms and maximum attenuation−8dB. Never stack permanent duck offsets.

Global proposed budget24 SFX voices,4 UI voices,2 music sources during crossfade and1 ambience. Per-event limits/cooldowns apply first. Priority: mandatory UI result/major merge/boss > ordinary impact > ambience detail. Old low-priority voice can be stolen with short fade. Pitch variation stays within matrix ranges and never escalates without cap.

App pause/focus loss suppresses one-shots and handles loops explicitly. iOS interruptions and Android focus are native acceptance cases. Web autoplay blocking is expected before user gesture. Settings gain changes ramp20–50ms to avoid clicks.

Acceptance: prolonged battle is comfortable;50 simultaneous logical hits stay within voice budget; mute and resume do not emit stale audio; mix passes phone speaker, headphones and low volume tests.'''),
'06_AUDIO_ASSET_ACQUISITION':('Audio acquisition and rights','''Acquire original commissioned, generated/synthesized or explicitly licensed library assets. Do not download/rip the live game's audio, code or private resources. For each event, keep source master, runtime file, creator, acquisition URL/invoice, license terms, attribution requirement, permitted distribution and review status. The planning ledger currently marks all events custom needed.

Short SFX should be trimmed without cutting natural decay, with tiny fades and mono unless stereo matters. Music/ambience retain clean loop metadata. Normalize deliberately with headroom; avoid blindly normalizing every file to identical peaks. Runtime codec/sample-rate choices are verified in Cocos native/web builds; final audible quality and memory determine the encoding.

Acquisition sequence: UI/core combat/merge first for vertical slice, then rewards/meta, then music/ambience and optional modes. Briefs are in the event matrix, music and ambience documents. Generated assets still need provenance and license review; generation is not proof of unrestricted rights.

Acceptance: no event marked final without an actual file and rights record; no placeholder ships unnoticed; every imported clip resolves from the audio registry and passes loop/peak/audition checks.''')}
for stem,(title,body) in audio_docs.items():
 write('docs/audio/'+stem+'.md',f'# {title}\n\n{body}\n\n## Traceability\n\n[Event matrix](audio_event_matrix.csv) · [Audio index](00_AUDIO_INDEX.md) · [Runtime](../technical/13_AUDIO_RUNTIME.md) · [Visual hooks](../visual/animation_matrix.csv) · [Tasks](../../tasks/TASKS_PHASE_14.md).')
csvwrite('analysis/figma/audio_asset_ownership.csv',['eventId','status','creator','license','sourceFile','distributionProof','blocksRelease'],[(r[0],'custom needed','UNKNOWN','UNKNOWN','NOT_ACQUIRED','MISSING','yes') for r in audio_rows])
