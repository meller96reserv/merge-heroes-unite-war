# SCREEN-011 — settings_modal

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `2:171`; Figma name `Settings, pop up`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/2_171.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Settings overlay variant. Entry: Settings modal request. Exit: Return underlying screen via close.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 2:172 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 2:173 | Rectangle 56 | [51, 139, 328, 435] | [0.1186, 0.14914, 0.76279, 0.46674] |
| 2:174 | Component 21 | [306, 376, 42, 22] | [0.71163, 0.40343, 0.09767, 0.02361] |
| 2:175 | Component 26 | [306, 416, 42, 22] | [0.71163, 0.44635, 0.09767, 0.02361] |
| 2:176 | Component 24 | [82, 253, 266, 14] | [0.1907, 0.27146, 0.6186, 0.01502] |
| 2:177 | Component 25 | [82, 331, 266, 14] | [0.1907, 0.35515, 0.6186, 0.01502] |
| 2:178 | Settings | [168, 158, 94, 26] | [0.3907, 0.16953, 0.2186, 0.0279] |
| 2:179 | + | [331, 162, 17.227705001831055, 17.227705001831055] | [0.76977, 0.17382, 0.04006, 0.01848] |
| 2:180 | Sound | [82, 220, 76, 22] | [0.1907, 0.23605, 0.17674, 0.02361] |
| 2:181 | Music | [82, 298, 76, 22] | [0.1907, 0.31974, 0.17674, 0.02361] |
| 2:182 | Vibration | [82, 376, 93, 22] | [0.1907, 0.40343, 0.21628, 0.02361] |
| 2:183 | Notifications | [82, 420, 120, 22] | [0.1907, 0.45064, 0.27907, 0.02361] |
| 2:184 | terms of use | [84, 514, 77, 18] | [0.19535, 0.5515, 0.17907, 0.01931] |
| 2:185 | privacy policy | [257, 514, 82, 18] | [0.59767, 0.5515, 0.1907, 0.01931] |

## Assets

| Semantic asset | Source |
| --- | --- |
| ui_panel_plain_navy__1126x2000 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Gold bordered modal panel. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Same controls; close button. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

open,editing,closing,permission_denied. One modal owner; background input blocked, navigation restored on close. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-011-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-033; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).


Product requirement: sound/music and notification controls plus clickable Terms/Privacy; modal traps input and returns focus. Unrelated shared-document mechanics are excluded.

TASK-0067/0129 connects this variant to the battle gear. “Full settings” is a
PROPOSED secondary navigation action between the supplied variants, placed in
unused panel space without moving Figma controls. The exact panel, close glyph,
sliders and live labels remain separate assets/drawings. Input stays owned through
exit; battle resumes interaction only when the window closes. Web notification
permission is requested only from the user's toggle; denied/revoked permission
never appears enabled. Native permission/routing remains TASK-0208.
