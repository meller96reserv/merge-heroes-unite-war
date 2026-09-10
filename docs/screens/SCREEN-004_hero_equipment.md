# SCREEN-004 — hero_equipment

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `75:744`; Figma name `hero`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/75_744.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Inspect selected hero and item loadout. Entry: Heroes tab/portrait selection. Exit: Main or other tab.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 75:745 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 75:746 | Component 8 | [61, 18, 144, 54] | [0.14186, 0.01931, 0.33488, 0.05794] |
| 75:747 | Rectangle 63 | [108, 86, 53, 53] | [0.25116, 0.09227, 0.12326, 0.05687] |
| 75:748 | Rectangle 64 | [269, 86, 53, 53] | [0.62558, 0.09227, 0.12326, 0.05687] |
| 75:749 | coin | [72, 29, 32, 32] | [0.16744, 0.03112, 0.07442, 0.03433] |
| 75:750 | Component 9 | [225, 17, 144, 54] | [0.52326, 0.01824, 0.33488, 0.05794] |
| 75:751 | gem | [236, 28, 32, 32] | [0.54884, 0.03004, 0.07442, 0.03433] |
| 75:752 | battle_board | [7, 847, 79, 80] | [0.01628, 0.9088, 0.18372, 0.08584] |
| 75:753 | battle_board | [91, 847, 79, 80] | [0.21163, 0.9088, 0.18372, 0.08584] |
| 75:754 | battle_board | [175, 847, 79, 80] | [0.40698, 0.9088, 0.18372, 0.08584] |
| 75:755 | battle_board | [259, 847, 79, 80] | [0.60233, 0.9088, 0.18372, 0.08584] |
| 75:756 | battle_board | [343, 847, 79, 80] | [0.79767, 0.9088, 0.18372, 0.08584] |
| 75:867 | character_elf_archer | [107, 287, 216, 223] | [0.24884, 0.30794, 0.50233, 0.23927] |
| 80:937 | equipment | [343, 199, 80, 110] | [0.79767, 0.21352, 0.18605, 0.11803] |
| 80:941 | equipment | [343, 319, 80, 110] | [0.79767, 0.34227, 0.18605, 0.11803] |
| 80:945 | equipment | [343, 439, 80, 110] | [0.79767, 0.47103, 0.18605, 0.11803] |
| 80:949 | equipment | [7, 199, 80, 110] | [0.01628, 0.21352, 0.18605, 0.11803] |
| 80:950 | equipment | [7, 319, 80, 110] | [0.01628, 0.34227, 0.18605, 0.11803] |
| 80:951 | equipment | [7, 439, 80, 110] | [0.01628, 0.47103, 0.18605, 0.11803] |
| 80:925 | open_x10_gem | [217, 750, 132, 71] | [0.50465, 0.80472, 0.30698, 0.07618] |
| 80:1097 | Lv. 60/60 | [149, 522, 114, 35] | [0.34651, 0.56009, 0.26512, 0.03755] |
| 80:1080 | icon_character | [170, 184, 91, 84] | [0.39535, 0.19742, 0.21163, 0.09013] |
| 80:1241 | icon_character | [264, 200, 75, 68] | [0.61395, 0.21459, 0.17442, 0.07296] |
| 80:1239 | icon_character | [92, 200, 75, 68] | [0.21395, 0.21459, 0.17442, 0.07296] |
| 92:553 | Frame 6 | [45, 582, 340, 142] | [0.10465, 0.62446, 0.7907, 0.15236] |

## Assets

| Semantic asset | Source |
| --- | --- |
| currency_gem_blue__300x252 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_crown__353x325 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_upgrade_arrow__1302x1413 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_blue_square__1448x1614 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| hero_elf_archer__1797x1858 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| portrait_elf_archer__647x592 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| equipment_elf_archer_ring__536x516 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_wheel_reward_illustration__1774x1837 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_shop__438x436 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_dark_square__1576x1595 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_battle_swords__1402x1456 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| equipment_elf_archer_ring_leaf__529x544 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_settings__369x374 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| equipment_elf_archer_boots__497x535 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| currency_gold_coin__254x262 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| equipment_elf_archer_bow__561x739 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_crystal_relic__1407x1332 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| portrait_ice_fairy__660x590 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_heroes_helmet__1902x1550 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| portrait_bunny_assassin__662x590 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_castle_platform__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| equipment_elf_archer_quiver__519x688 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| equipment_elf_archer_hood__622x656 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_bar_dark_track__3646x435 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_gold__2378x1300 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_gold_black_wide__3815x1593 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_magic_gold__1289x1762 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_nav_dungeon__1494x1139 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Selected elf, six equipment cards, Lv.60/60, DAMAGE/ARMOR and x10 gem price are static design values. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Portrait select; six equipment slots; enhance; EXP; Open x10. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

selected,empty_slot,locked_slot,equipped,affordable,insufficient,max_level,opening. Selection changes displayed definition; equip recomputes derived stats once; Open uses reward transaction. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-004-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-016,U-019,U-035; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).
