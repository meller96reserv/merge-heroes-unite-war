# SCREEN-010 — settings

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `2:186`; Figma name `Settings`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/2_186.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Persistent sound/music/haptic/notification controls. Entry: Settings gear. Exit: Previous screen via back.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 2:187 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 2:188 | terms of use | [88, 849, 77, 18] | [0.20465, 0.91094, 0.17907, 0.01931] |
| 2:189 | privacy policy | [261, 849, 82, 18] | [0.60698, 0.91094, 0.1907, 0.01931] |
| 2:190 | Rectangle 56 | [51, 139, 328, 175] | [0.1186, 0.14914, 0.76279, 0.18777] |
| 2:191 | Rectangle 57 | [51, 340, 328, 134] | [0.1186, 0.36481, 0.76279, 0.14378] |
| 2:192 | Sound | [82, 166, 76, 22] | [0.1907, 0.17811, 0.17674, 0.02361] |
| 2:193 | Music | [82, 244, 76, 22] | [0.1907, 0.2618, 0.17674, 0.02361] |
| 2:194 | Component 24 | [82, 277, 266, 14] | [0.1907, 0.29721, 0.6186, 0.01502] |
| 2:195 | Component 25 | [82, 199, 266, 14] | [0.1907, 0.21352, 0.6186, 0.01502] |
| 2:196 | Vibration | [82, 371, 93, 22] | [0.1907, 0.39807, 0.21628, 0.02361] |
| 2:197 | Notifications | [82, 415, 120, 22] | [0.1907, 0.44528, 0.27907, 0.02361] |
| 2:198 | Component 21 | [306, 371, 42, 22] | [0.71163, 0.39807, 0.09767, 0.02361] |
| 2:199 | Component 22 | [306, 416, 42, 22] | [0.71163, 0.44635, 0.09767, 0.02361] |
| 90:1739 | Settings | [122, 60, 187, 53] | [0.28372, 0.06438, 0.43488, 0.05687] |
| 90:1745 | arrow | [17, 67, 42, 39] | [0.03953, 0.07189, 0.09767, 0.04185] |

## Assets

| Semantic asset | Source |
| --- | --- |
| ui_icon_upgrade_arrow__1302x1413 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_panel_stats_black__966x425 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Two panel groups; red back arrow. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Sound/music sliders; vibration/notifications toggles; policy links. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

normal,muted,permission_denied,save_error. Audio change immediate; setting checkpoint; notification permission only if scoped. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-010-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-029,U-033; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).


Product requirement: sound/music and notification controls plus clickable Terms/Privacy. OS permission denied/unavailable stays visible and recoverable. No banking,withdrawal or generic shared-document controls are added.

TASK-0067/0129 browser integration: the gear opens SCREEN-011; its small
“Full settings” navigation action opens this full variant, and Back returns to
that prior window. This entry relationship is PROPOSED because Figma has no
prototype reactions. All original full-screen anchors remain unchanged. Sliders
support drag, tap, keyboard and accessibility adjustment; values commit on release
and restore after save/reload. Final legal URLs remain release-owner input.
