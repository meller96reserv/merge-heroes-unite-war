# SCREEN-003 — main_battle

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `2:426`; Figma name `game`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/2_426.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Purchase/merge/deploy and combat feedback. Entry: Start or Battle tab. Exit: Hero/shop/dungeon/relic/settings/wheel.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 2:427 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 32:1318 | Rectangle 65 | [-26, 546, 476, 423] | [-0.06047, 0.58584, 1.10698, 0.45386] |
| 2:428 | Component 8 | [62, 18, 144, 54] | [0.14419, 0.01931, 0.33488, 0.05794] |
| 2:431 | Rectangle 63 | [108, 86, 53, 53] | [0.25116, 0.09227, 0.12326, 0.05687] |
| 2:432 | Rectangle 64 | [269, 86, 53, 53] | [0.62558, 0.09227, 0.12326, 0.05687] |
| 2:433 | coin | [72, 29, 32, 32] | [0.16744, 0.03112, 0.07442, 0.03433] |
| 57:260 | Component 9 | [226, 17, 144, 54] | [0.52558, 0.01824, 0.33488, 0.05794] |
| 57:266 | gem | [236, 28, 32, 32] | [0.54884, 0.03004, 0.07442, 0.03433] |
| 19:1203 | battle_board | [7, 847, 79, 80] | [0.01628, 0.9088, 0.18372, 0.08584] |
| 19:1207 | battle_board | [91, 847, 79, 80] | [0.21163, 0.9088, 0.18372, 0.08584] |
| 19:1211 | battle_board | [175, 847, 79, 80] | [0.40698, 0.9088, 0.18372, 0.08584] |
| 19:1215 | battle_board | [259, 847, 79, 80] | [0.60233, 0.9088, 0.18372, 0.08584] |
| 19:1216 | battle_board | [343, 847, 79, 80] | [0.79767, 0.9088, 0.18372, 0.08584] |
| 19:1223 | Слой 20 2 | [99, 770, 68, 60] | [0.23023, 0.82618, 0.15814, 0.06438] |
| 39:1383 | level | [104, 776, 12, 12] | [0.24186, 0.83262, 0.02791, 0.01288] |
| 19:1225 | Слой 20 3 | [263, 770, 68, 60] | [0.61163, 0.82618, 0.15814, 0.06438] |
| 30:1272 | champ_level | [347, 651, 68, 93] | [0.80698, 0.6985, 0.15814, 0.09979] |
| 30:1278 | champ_level | [264, 651, 68, 93] | [0.61395, 0.6985, 0.15814, 0.09979] |
| 30:1282 | champ_level | [181, 651, 68, 93] | [0.42093, 0.6985, 0.15814, 0.09979] |
| 30:1283 | champ_level | [98, 651, 68, 93] | [0.22791, 0.6985, 0.15814, 0.09979] |
| 30:1289 | champ_level | [15, 651, 68, 93] | [0.03488, 0.6985, 0.15814, 0.09979] |
| 30:1293 | champ_level | [347, 549, 68, 93] | [0.80698, 0.58906, 0.15814, 0.09979] |
| 30:1294 | champ_level | [264, 549, 68, 93] | [0.61395, 0.58906, 0.15814, 0.09979] |
| 53:1475 | STAGE | [79, 165, 46, 22] | [0.18372, 0.17704, 0.10698, 0.02361] |
| 30:1295 | champ_level | [181, 549, 68, 93] | [0.42093, 0.58906, 0.15814, 0.09979] |
| 32:1314 | character | [174, 368, 83, 86] | [0.40465, 0.39485, 0.19302, 0.09227] |
| 30:1296 | champ_level | [98, 549, 68, 93] | [0.22791, 0.58906, 0.15814, 0.09979] |
| 32:1313 | character | [8, 384, 83, 86] | [0.0186, 0.41202, 0.19302, 0.09227] |
| 30:1297 | champ_level | [15, 549, 68, 93] | [0.03488, 0.58906, 0.15814, 0.09979] |
| 32:1312 | character | [77, 358, 104, 108] | [0.17907, 0.38412, 0.24186, 0.11588] |
| 32:1310 | character | [117, 775, 38, 35] | [0.27209, 0.83155, 0.08837, 0.03755] |
| 37:1350 | enemy_ironhide_boar | [262, 327, 146, 132] | [0.6093, 0.35086, 0.33953, 0.14163] |
| 45:1430 | x2_time | [94, 487, 54, 55] | [0.2186, 0.52253, 0.12558, 0.05901] |
| 45:1431 | auto_merge | [188, 487, 54, 55] | [0.43721, 0.52253, 0.12558, 0.05901] |
| 45:1433 | x2_gold | [282, 487, 54, 55] | [0.65581, 0.52253, 0.12558, 0.05901] |
| 45:1451 | buy_character | [172, 761, 86, 77] | [0.4, 0.81652, 0.2, 0.08262] |
| 45:1446 | 50 | [131, 810, 11, 12] | [0.30465, 0.8691, 0.02558, 0.01288] |
| 45:1447 | coin | [117, 810, 11, 11] | [0.27209, 0.8691, 0.02558, 0.0118] |
| 51:1470 | 8615a402-b845-4cb1-bf81-dc6f34d3e059 1 1 | [73, 189, 284, 34] | [0.16977, 0.20279, 0.66047, 0.03648] |
| 51:1471 | 00a3b66c-f59b-4c9d-8973-976579fc7a09 1 1 | [145, 195, 141, 22] | [0.33721, 0.20923, 0.32791, 0.02361] |
| 51:1472 | 9f7511af-8dea-4f98-8bf1-9582f91e4197 1 1 | [362, 179, 54, 54] | [0.84186, 0.19206, 0.12558, 0.05794] |
| 51:1473 | 9be31cff-28e3-4112-8d41-15b9cf7288e4 1 1 | [368, 185, 42, 42] | [0.85581, 0.1985, 0.09767, 0.04506] |
| 52:1474 | e1d6f87b-d3a2-4dc0-abd3-e6d47d1ffa04 1 1 | [26, 183, 42, 45] | [0.06047, 0.19635, 0.09767, 0.04828] |
| 55:1479 | 2-100 | [87, 195, 42, 22] | [0.20233, 0.20923, 0.09767, 0.02361] |
| 55:1481 | BOSS | [303, 195, 38, 22] | [0.70465, 0.20923, 0.08837, 0.02361] |

## Assets

| Semantic asset | Source |
| --- | --- |
| currency_gem_blue__300x252 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_infernal_mask__1628x1757 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_red_square__1580x1579 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_blue_square__1448x1614 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_board_slot__244x219 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_wheel_reward_illustration__1774x1837 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_shop__438x436 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_stone_slot__348x265 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_dark_square__1576x1595 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_inferno_dragon__1886x1748 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_battle_swords__1402x1456 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_hourglass__1343x1364 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_ice_fairy__1718x1740 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_settings__369x374 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_raccoon_engineer__1617x1662 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| currency_gold_coin__254x262 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_bar_cyan_fill__2680x420 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_crystal_relic__1407x1332 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_heroes_helmet__1902x1550 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_lion_knight__1616x1788 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_panda_monk__1705x1775 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| enemy_ironhide_boar__1862x1681 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_bar_dark_track__3646x435 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_crystal_snowflake__1318x1341 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_owl_mage__1813x1760 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_gold_pile__1134x1163 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_fox_sorcerer__1828x1679 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_turtle_warrior__1815x1620 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_dungeon__1494x1139 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_bunny_assassin__1711x1827 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_dragon_red__1540x1564 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Two currency counters, stage track, world, 10 visual slots, 3 purchase cells. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Buy; drag merge/deploy; tap withdraw; boosters; five tabs; settings/wheel. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

first_launch,tutorial_buy_prompt,normal_idle,hero_purchase_available,insufficient_gold,board_full,merge_available,auto_merge_running,stage_in_progress,boss_warning,boss_combat,stage_clear,stage_failed,feature_unlock,reward_flying,modal_open,app_paused,returning_from_background. Commands resolve atomically; navigation never owns reward commit; CF-003 requires responsive 15-slot adaptation. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-003-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-002,U-023,U-025,U-030; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).

Implementation approximation: [playable-v1 rules](../implementation/PLAYABLE_V1_RULES.md). Source observations and golden fixtures are unchanged.
