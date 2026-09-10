# SCREEN-014 — wheel_free

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `2:276`; Figma name `WHEEL OF LUCK`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/2_276.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Free spin available variant. Entry: Cooldown elapsed or free token. Exit: Result/back.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 2:277 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 2:278 | Component 19 | [58, 770, 314, 61] | [0.13488, 0.82618, 0.73023, 0.06545] |
| 2:279 | title_name | [92, 73, 248, 28] | [0.21395, 0.07833, 0.57674, 0.03004] |
| 90:1750 | arrow | [17, 67, 42, 39] | [0.03953, 0.07189, 0.09767, 0.04185] |
| 91:577 | wheel_full | [51, 296, 328, 340.9013366699219] | [0.1186, 0.3176, 0.76279, 0.36577] |

## Assets

| Semantic asset | Source |
| --- | --- |
| ui_icon_upgrade_arrow__1302x1413 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_wheel_outer_ring__1940x1924 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_icon_blue_triangle__1484x1322 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_orange__2542x1359 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_frame_purple_orb__1428x1440 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Same 12 sectors and labels. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

FREE SPIN and back. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

free_available,spinning,result. Reserve spin token, outcome and cost/free usage atomically. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-014-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-015; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).
