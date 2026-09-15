# SCREEN-007 — hero_upgrades

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `89:1310`; Figma name `game`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/89_1310.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Scrollable per-hero upgrade catalogue. Entry: Heroes list route (exact nav relationship proposed). Exit: Main/detail.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 89:1311 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 89:1313 | Component 8 | [62, 18, 144, 54] | [0.14419, 0.01931, 0.33488, 0.05794] |
| 89:1314 | Rectangle 63 | [108, 86, 53, 53] | [0.25116, 0.09227, 0.12326, 0.05687] |
| 89:1315 | Rectangle 64 | [269, 86, 53, 53] | [0.62558, 0.09227, 0.12326, 0.05687] |
| 89:1316 | coin | [72, 29, 32, 32] | [0.16744, 0.03112, 0.07442, 0.03433] |
| 89:1317 | Component 9 | [226, 17, 144, 54] | [0.52558, 0.01824, 0.33488, 0.05794] |
| 89:1318 | gem | [236, 28, 32, 32] | [0.54884, 0.03004, 0.07442, 0.03433] |
| 89:1319 | battle_board | [7, 847, 79, 80] | [0.01628, 0.9088, 0.18372, 0.08584] |
| 89:1320 | battle_board | [91, 847, 79, 80] | [0.21163, 0.9088, 0.18372, 0.08584] |
| 89:1321 | battle_board | [175, 847, 79, 80] | [0.40698, 0.9088, 0.18372, 0.08584] |
| 89:1322 | battle_board | [259, 847, 79, 80] | [0.60233, 0.9088, 0.18372, 0.08584] |
| 89:1323 | battle_board | [343, 847, 79, 80] | [0.79767, 0.9088, 0.18372, 0.08584] |
| 89:1349 | 50 | [131, 810, 11, 12] | [0.30465, 0.8691, 0.02558, 0.01288] |
| 89:1350 | coin | [117, 810, 11, 11] | [0.27209, 0.8691, 0.02558, 0.0118] |
| 89:1604 | shop_board | [28, 164, 384, 665] | [0.06512, 0.17597, 0.89302, 0.71352] |

## Assets

| Semantic asset | Source |
| --- | --- |
| currency_gem_blue__300x252 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_blue_square__1448x1614 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_elf_archer__1797x1858 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_grass_platform__754x329 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_heart__474x437 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_wheel_reward_illustration__1774x1837 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_shop__438x436 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_dark_square__1576x1595 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_battle_swords__1402x1456 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_plain_navy__1126x2000 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_sword__525x536 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| currency_blue_orb__545x554 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_ice_fairy__1718x1740 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_settings__369x374 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_gold_navy_wide__2339x828 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| currency_gold_coin__254x262 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_crystal_relic__1407x1332 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_heroes_helmet__1902x1550 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_lion_knight__1616x1788 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_star__478x497 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_bar_dark_track__3646x435 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_gold__2378x1300 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_banner_name_purple__959x176 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_fox_sorcerer__1828x1679 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_stats_black__966x425 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_dungeon__1494x1139 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_bunny_assassin__1711x1827 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Five visible rows: Ice Fairy, Fox Sorcerer, Elf Archer, Lion Knight, Assassin; ATK200 HP150 LVL1 / cost5 static. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Hero cards and orb-cost buttons. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

list,scrolling,available,insufficient,maxed,selected. Orb currency meaning and stat cost U-016; no hardcoded Figma stats. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-007-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-016,U-035; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).
