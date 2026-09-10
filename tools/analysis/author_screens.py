from plan_common import *
screens=json.loads((ROOT/'analysis/figma/screen_map.json').read_text())
details={
'loading':('Boot config/art/save validation','Launch','Start or recoverable error','No input except retry on error','Loading label and progress track; branding logo and baked welcome','loading,load_failed,retry','BOOT→LOADING→READY; progress reflects completed mandatory bundles','U-009'),
'start':('Explicit entry into game session','Boot ready','Main or queued daily/offline claim','Let’s Play; terms/privacy links only after valid destination configured','Logo, hero collage, orange CTA, legal copy','ready,pressed,restoring,error','Tap requests session start once; lifecycle interruptions return to ready','U-029'),
'main_battle':('Purchase/merge/deploy and combat feedback','Start or Battle tab','Hero/shop/dungeon/relic/settings/wheel','Buy; drag merge/deploy; tap withdraw; boosters; five tabs; settings/wheel','Two currency counters, stage track, world, 10 visual slots, 3 purchase cells','first_launch,tutorial_buy_prompt,normal_idle,hero_purchase_available,insufficient_gold,board_full,merge_available,auto_merge_running,stage_in_progress,boss_warning,boss_combat,stage_clear,stage_failed,feature_unlock,reward_flying,modal_open,app_paused,returning_from_background','Commands resolve atomically; navigation never owns reward commit; CF-003 requires responsive 15-slot adaptation','U-002,U-023,U-025,U-030'),
'hero_equipment':('Inspect selected hero and item loadout','Heroes tab/portrait selection','Main or other tab','Portrait select; six equipment slots; enhance; EXP; Open x10','Selected elf, six equipment cards, Lv.60/60, DAMAGE/ARMOR and x10 gem price are static design values','selected,empty_slot,locked_slot,equipped,affordable,insufficient,max_level,opening','Selection changes displayed definition; equip recomputes derived stats once; Open uses reward transaction','U-016,U-019,U-035'),
'relic':('Inspect collectible relics and opening controls','Relic tab','Main or other tab','Sixteen cards; Open x1 coin/Open x10 gem','4×4 cards; UR/SR/SS badges visible; do not derive probability/rarity order from color','collection,empty,locked,opening,reward_pending,insufficient','Post-MVP gate; open reserves outcome before animation','U-019'),
'dungeon':('Choose alternate battle content','Dungeon tab','Main/content loading/result','Three dragon cards','Infernal/Frost/Shadow labels with HP 5000/10000/15000 are Figma fixtures','locked,available,loading,active,failed,completed','Post-MVP content selection → eligibility → content session; stage core remains isolated','U-018,U-005'),
'hero_upgrades':('Scrollable per-hero upgrade catalogue','Heroes list route (exact nav relationship proposed)','Main/detail','Hero cards and orb-cost buttons','Five visible rows: Ice Fairy, Fox Sorcerer, Elf Archer, Lion Knight, Assassin; ATK200 HP150 LVL1 / cost5 static','list,scrolling,available,insufficient,maxed,selected','Orb currency meaning and stat cost U-016; no hardcoded Figma stats','U-016,U-035'),
'daily_get_gold':('Present available daily claim','Session popup queue or daily entry','Underlying screen','GET FREE GOLD','+1000 chest is design fixture','available,committing,claimed,error','persist reward+period token → animate → dismiss; repeat tap no-op','U-014'),
'daily_claim':('Alternate daily CTA state','Same daily entry; visual variant','Underlying screen','CLAIM','Same chest/value; actual override differs from stale layer name','available,committing,claimed,error','Treat as a UI copy variant, not proof of second independent reward','U-014'),
'settings':('Persistent sound/music/haptic/notification controls','Settings gear','Previous screen via back','Sound/music sliders; vibration/notifications toggles; policy links','Two panel groups; red back arrow','normal,muted,permission_denied,save_error','Audio change immediate; setting checkpoint; notification permission only if scoped','U-029,U-033'),
'settings_modal':('Settings overlay variant','Settings modal request','Return underlying screen via close','Same controls; close button','Gold bordered modal panel','open,editing,closing,permission_denied','One modal owner; background input blocked, navigation restored on close','U-033'),
'maintenance':('Recoverable service-unavailable presentation','Only actual service failure if backend exists','Retry/close according to error ownership','Close/retry if safe','Please wait; raccoon castle; loyalty promise is design copy','unavailable,retrying,recovered','Offline MVP does not fabricate remote outage or loyalty reward','U-029'),
'wheel_spin':('Wheel standard spin control','Wheel icon','Back to previous screen','SPIN and back','12 constructed sectors, runtime labels, pointer and ring; separate decorative wheel icon','available,spinning,result,error','Logical result committed/persisted before deceleration; wheel angle cannot award','U-015'),
'wheel_free':('Free spin available variant','Cooldown elapsed or free token','Result/back','FREE SPIN and back','Same 12 sectors and labels','free_available,spinning,result','Reserve spin token, outcome and cost/free usage atomically','U-015'),
'wheel_cooldown':('Free spin unavailable variant','No free token / cooldown','Free available/back','Disabled FREE SPIN; back; timer noninteractive','00:21:19 is fixture; no inference of cooldown duration','cooldown,expired,app_paused','Remaining time from period timestamp; resume recomputes, not decrement-only timer','U-015,U-033')}
catalog=[]
for s in screens:
 sid=s['screenId'];purpose,entry,exit_,inputs,content,states,trans,unknown=details[s['name']];path=f"docs/screens/{sid}_{s['name']}.md"
 assets=table(['Semantic asset','Source'],[(a,link(path,'analysis/figma/asset_source_map.json','hash/node lookup')) for a in s['assets']])
 layout=table(['Node','Name','Reference x,y,w,h','Normalized bounds'],[(n['id'],n['name'],n['bounds'],n['normalizedBounds']) for n in s['directChildren']])
 text=f'''# {sid} — {s['name']}

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `{s['nodeId']}`; Figma name `{s['figmaName']}`; reference 430×932 portrait. {link(path,s['screenshot'],'Screenshot')}. Screen hash/node mapping comes from {link(path,'analysis/figma/screen_map.json','screen map')}.

## Purpose / entry / exit

{purpose}. Entry: {entry}. Exit: {exit_}.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

{layout}

## Assets

{assets}

## Text and persistent state shown

{content}. Actual characters/font/size are in {link(path,'analysis/figma/text_inventory.json','text inventory')}; source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

{inputs}. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

{states}. {trans}. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.enter`/`screen.exit`, `ui.tap.primary`, `ui.popup.open`/`ui.popup.close`, `ui.error.currency` as appropriate. Shared motion token enter=280ms, exit=140ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from {link(path,'visual/animation_matrix.csv','animation matrix')} and {link(path,'audio/audio_event_map.csv','audio event map')}; decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset passed once by host; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns native back/lifecycle, Cocos owns this screen; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-{sid}-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

{unknown}; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. {link(path,'docs/04_UNKNOWNS_REGISTER.md','Unknowns')} · {link(path,'plans/PHASE_05_STATIC_VERTICAL_SLICE.md','Static slice')} · {link(path,'tasks/TASK_INDEX.md','Tasks')} · {link(path,'docs/09_SCREEN_CATALOG.md','Catalog')}.
'''
 # Paths rooted under docs require explicit docs/ prefix for helper.
 text=text.replace('](../../visual/','](../visual/').replace('](../../audio/','](../audio/')
 write(path,text);catalog.append((sid,s['name'],s['nodeId'],link('docs/09_SCREEN_CATALOG.md',path,'spec'),len(s['assets']),states))
write('docs/09_SCREEN_CATALOG.md','# Каталог экранов\n\n[OBSERVED] 15 artboards, 11 семейств, 430×932 portrait. По одному детальному документу на каждый вариант; 0 prototype reactions, поэтому UI transitions предложены. Marketing frames scrn1…scrn6 (1080×1920) и wide scrn1 (6570×1920) — promotional reference only, не отдельные игровые функции.\n\n'+table(['ID','Name','Node','Spec','Assets','States'],catalog)+'''\n\n## Дополнительные runtime surfaces

| Surface | Статус | Политика |
|---|---|---|
| Tutorial / New Hero / withdraw prompt | [OBSERVED] web capture EV-009…011 | Создать overlay из Figma panel/character assets; поведение по tutorial spec |
| Quest/reward | [OBSERVED] ранний web HUD | Detailed claim flow проверяется U-017 |
| Offline reward | [UNKNOWN] runtime details | P0 functional-equivalent popup, U-006 |
| Boss intro/fail/stage clear | [UNKNOWN] exact sequences | P0 runtime overlay, U-005 |
| Shop | [OBSERVED] nav icon; полноценного Figma shop artboard нет | Не выдумывать IAP экран; U-029 / post-MVP monetization |
| Inventory | [INFERRED] equipment/relic collection fulfill role | Отдельный screen только после evidence |
| Gift/Event | [OBSERVED] web entry icons; rules pending | P2 gate U-018 |
| Locked popup / error | [PROPOSED] usable fallback | No dead taps, explain condition/error |
| Prestige | [UNKNOWN] | OUT OF SCOPE until U-020 verified |

[State matrix](10_SCREEN_STATE_MATRIX.md) · [Layout](12_UI_LAYOUT_SPEC.md) · [Index](00_INDEX.md).
''')
matrix=[]
for s in screens:
 for state in details[s['name']][5].split(','):
  pending=state in ['spinning','committing','opening','loading','load_failed','app_paused','returning_from_background']
  matrix.append([s['screenId'],state,'base HUD + '+('owning overlay' if pending else 'state-specific affordance'),'owning action disabled; close per contract' if pending else 'eligible commands + navigation','command result / timer / lifecycle','simulation paused only on background; UI time separate','semantic audio after commit','critical transaction checkpoint; UI transient','dedupe token; stale revision rejected','cancel effects; reconcile snapshot'])
write('docs/10_SCREEN_STATE_MATRIX.md','# Матрица screen states\n\n[PROPOSED] Каждая строка дополняет детальный screen spec; domain event determines state, not animation callbacks.\n\n'+table(['Screen','State','Visible nodes','Enabled input','Transitions','Timers','Audio','Persistence','Race policy','Interruption'],matrix)+'\n\n[Screen catalog](09_SCREEN_CATALOG.md) · [Game state](17_GAME_STATE_MODEL.md) · [Tasks](../tasks/TASK_INDEX.md).')

