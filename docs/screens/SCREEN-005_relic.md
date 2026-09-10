# SCREEN-005 — relic

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `71:279`; Figma name `relic`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/71_279.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Inspect collectible relics and opening controls. Entry: Relic tab. Exit: Main or other tab.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 71:280 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 71:282 | Component 8 | [61, 18, 144, 54] | [0.14186, 0.01931, 0.33488, 0.05794] |
| 71:283 | Rectangle 63 | [108, 86, 53, 53] | [0.25116, 0.09227, 0.12326, 0.05687] |
| 71:284 | Rectangle 64 | [269, 86, 53, 53] | [0.62558, 0.09227, 0.12326, 0.05687] |
| 71:285 | coin | [72, 29, 32, 32] | [0.16744, 0.03112, 0.07442, 0.03433] |
| 71:286 | Component 9 | [225, 17, 144, 54] | [0.52326, 0.01824, 0.33488, 0.05794] |
| 71:287 | gem | [236, 28, 32, 32] | [0.54884, 0.03004, 0.07442, 0.03433] |
| 71:288 | battle_board | [7, 847, 79, 80] | [0.01628, 0.9088, 0.18372, 0.08584] |
| 71:289 | battle_board | [91, 847, 79, 80] | [0.21163, 0.9088, 0.18372, 0.08584] |
| 71:290 | battle_board | [175, 847, 79, 80] | [0.40698, 0.9088, 0.18372, 0.08584] |
| 71:291 | battle_board | [259, 847, 79, 80] | [0.60233, 0.9088, 0.18372, 0.08584] |
| 71:292 | battle_board | [343, 847, 79, 80] | [0.79767, 0.9088, 0.18372, 0.08584] |
| 73:407 | board | [14, 192, 403, 633] | [0.03256, 0.20601, 0.93721, 0.67918] |
| 73:438 | relic | [48, 245, 80, 110] | [0.11163, 0.26288, 0.18605, 0.11803] |
| 73:442 | relic | [133, 245, 80, 110] | [0.3093, 0.26288, 0.18605, 0.11803] |
| 73:453 | relic | [218, 245, 80, 110] | [0.50698, 0.26288, 0.18605, 0.11803] |
| 73:454 | relic | [303, 245, 80, 110] | [0.70465, 0.26288, 0.18605, 0.11803] |
| 73:460 | relic | [48, 365, 80, 110] | [0.11163, 0.39163, 0.18605, 0.11803] |
| 73:461 | relic | [133, 365, 80, 110] | [0.3093, 0.39163, 0.18605, 0.11803] |
| 73:462 | relic | [218, 365, 80, 110] | [0.50698, 0.39163, 0.18605, 0.11803] |
| 73:463 | relic | [303, 365, 80, 110] | [0.70465, 0.39163, 0.18605, 0.11803] |
| 73:473 | relic | [48, 485, 80, 110] | [0.11163, 0.52039, 0.18605, 0.11803] |
| 73:474 | relic | [133, 485, 80, 110] | [0.3093, 0.52039, 0.18605, 0.11803] |
| 73:475 | relic | [218, 485, 80, 110] | [0.50698, 0.52039, 0.18605, 0.11803] |
| 73:476 | relic | [303, 485, 80, 110] | [0.70465, 0.52039, 0.18605, 0.11803] |
| 73:477 | relic | [48, 605, 80, 110] | [0.11163, 0.64914, 0.18605, 0.11803] |
| 73:478 | relic | [133, 605, 80, 110] | [0.3093, 0.64914, 0.18605, 0.11803] |
| 73:479 | relic | [218, 605, 80, 110] | [0.50698, 0.64914, 0.18605, 0.11803] |
| 73:480 | relic | [303, 605, 80, 110] | [0.70465, 0.64914, 0.18605, 0.11803] |
| 75:606 | open_x10_gem | [218, 725, 132, 71] | [0.50698, 0.7779, 0.30698, 0.07618] |
| 75:607 | open_x1_coin | [81, 725, 132, 71] | [0.18837, 0.7779, 0.30698, 0.07618] |

## Assets

| Semantic asset | Source |
| --- | --- |
| currency_gem_blue__300x252 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_compass_gold__538x602 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_fire_crystal__447x635 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_blue_square__1448x1614 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_wheel_reward_illustration__1774x1837 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_shop__438x436 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_dark_square__1576x1595 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_forest_glade__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_boar_mask__510x544 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_battle_swords__1402x1456 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_leaf_crescent__470x571 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_equipment_gold__1035x1545 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_purple_shield__1628x1719 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_orange__2542x1359 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_settings__369x374 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_orange_wings__1714x1662 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| currency_gold_coin__254x262 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_blue_crescent__505x579 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_crystal_relic__1407x1332 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_shadow_crystal__469x599 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_blue_shard__354x641 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_green_disc__483x547 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_frost_dragon_head__471x629 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_heroes_helmet__1902x1550 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_gold_hammer__474x528 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_gold_dragon_head__455x633 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_bar_dark_track__3646x435 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_gold__2378x1300 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_heart_wings__1728x1616 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_wolf_mask__479x633 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_magic_gold__1289x1762 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_rabbit_mask__490x644 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_blue_feather__473x665 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_fire_dragon_head__406x576 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_dungeon__1494x1139 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| relic_gold_bird_mask__527x591 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

4×4 cards; UR/SR/SS badges visible; do not derive probability/rarity order from color. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Sixteen cards; Open x1 coin/Open x10 gem. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

collection,empty,locked,opening,reward_pending,insufficient. Post-MVP gate; open reserves outcome before animation. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-005-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-019; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).
