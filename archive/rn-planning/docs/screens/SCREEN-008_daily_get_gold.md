# SCREEN-008 — daily_get_gold

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `2:418`; Figma name `Daily bonus!`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/2_418.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Present available daily claim. Entry: Session popup queue or daily entry. Exit: Underlying screen.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 2:419 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 2:420 | Rectangle 55 | [51, 248, 328, 435] | [0.1186, 0.26609, 0.76279, 0.46674] |
| 2:421 | Component 6 | [135, 389, 161, 162] | [0.31395, 0.41738, 0.37442, 0.17382] |
| 2:422 | daily bonus! | [111, 276, 210, 40] | [0.25814, 0.29614, 0.48837, 0.04292] |
| 2:423 | We give you daily bonus! | [93, 325, 246, 26] | [0.21628, 0.34871, 0.57209, 0.0279] |
| 2:424 | Component 4 | [70, 591, 291, 78] | [0.16279, 0.63412, 0.67674, 0.08369] |
| 2:425 | Component 7 | [118, 512, 195, 54] | [0.27442, 0.54936, 0.45349, 0.05794] |

## Assets

| Semantic asset | Source |
| --- | --- |
| reward_gold_chest__1254x1254 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_plain_navy__1126x2000 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_orange__2542x1359 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_gold__2378x1300 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| reward_gold_chest__1254x1254_variant2 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

+1000 chest is design fixture. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

GET FREE GOLD. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

available,committing,claimed,error. persist reward+period token → animate → dismiss; repeat tap no-op. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-008-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-014; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).
