# SCREEN-002 — start

Status: [OBSERVED] visual composition, EV-004. Navigation/behavior below [PROPOSED] except reference behavior explicitly cited. Source node `2:406`; Figma name `Splash screen`; reference 430×932 portrait. [Screenshot](../../analysis/figma/screenshots/2_406.png). Screen hash/node mapping comes from [screen map](../../analysis/figma/screen_map.json).

## Purpose / entry / exit

Explicit entry into game session. Entry: Boot ready. Exit: Main or queued daily/offline claim.

## Hierarchy and layout

Frame → background → content/world → HUD → navigation → modal/reward/toast. Node-local reference coordinates below are [MEASURED]; runtime applies anchors and safe areas, never uses a flattened screen as UI.

| Node | Name | Reference x,y,w,h | Normalized bounds |
| --- | --- | --- | --- |
| 2:407 | bg | [0, 0, 430, 932] | [0.0, 0.0, 1.0, 1.0] |
| 2:408 | Component 4 | [51, 705, 328, 78] | [0.1186, 0.75644, 0.76279, 0.08369] |
| 2:409 | By tapping “Let’s Play” you confirm that you 18+ and | [51, 808, 328, 44] | [0.1186, 0.86695, 0.76279, 0.04721] |
| 2:410 | other | [19, 365, 392, 262] | [0.04419, 0.39163, 0.91163, 0.28112] |
| 2:412 | Frame 5 | [113.5, 861, 204, 18] | [0.26395, 0.92382, 0.47442, 0.01931] |
| 90:1757 | Component 2 | [65, 49, 300, 238] | [0.15116, 0.05258, 0.69767, 0.25536] |

## Assets

| Semantic asset | Source |
| --- | --- |
| branding_hero_collage__1536x1024 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| branding_logo__1448x1086 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| branding_hero_collage__1536x1024_variant2 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| background_floating_islands__941x1672 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| branding_logo__1448x1086_variant2 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |
| ui_button_gold__2378x1300 | [hash/node lookup](../../analysis/figma/asset_source_map.json) |

## Text and persistent state shown

Logo, hero collage, orange CTA, legal copy. Actual characters/font/size are in [text inventory](../../analysis/figma/text_inventory.json); source names alone are not text. Currency, selected hero, claim state and settings bind to domain snapshots. Hardcoded fixture values only in golden screenshot mode. English keys first; reserve 30% expansion and numeric-width stress fixtures. Font licenses pending U-009.

## Interactive and non-interactive elements

Let’s Play; terms/privacy links only after valid destination configured. Decorative characters/panels do not intercept events. Touch target ≥44×44 reference CSS-equivalent points proposed, expand hit area without stretching art. Modal close/back always has accessible label; pointer capture belongs to drag source; cancellation releases ownership.

## States and transitions

ready,pressed,restoring,error. Tap requests session start once; lifecycle interruptions return to ready. Missing assets load a labeled dev placeholder; production mandatory-art failure offers retry without enabling economy actions. Empty items show empty slot; locked actions show requirement; pending operations disable only their owning command. Economy error leaves amounts/instances unchanged.

## Modal / interruption / lifecycle

[PROPOSED] Stack manager with one top interactive modal; restore focus/source route on close. First-session queue: tutorial-required popup → pending offline → daily → informational unlock, deduplicated by semantic token. Foreground meta battle-continuity policy is U-033; background app pauses simulation and audio. Interrupted view effects reconcile to committed state, never replay rewards.

## Animation / audio

`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error` as appropriate. Shared motion token enter=280ms, exit=180ms, press=80ms [PROPOSED]. Claims/upgrade/wheel attach committed semantic events from [animation matrix](../visual/animation_matrix.csv) and [audio event map](../audio/audio_event_matrix.csv); decorative idle is nonblocking. Reduced motion replaces travel/shake with short fades.

## Safe areas and platform behavior

Width-fit world with crop, anchored top HUD/bottom nav, elastic middle region. Safe inset applied once by shared RN layout; desktop pillarbox ignores outside input. Test 430×932,360×640,390×844,412×915,768×1024. RN owns this screen and native back/lifecycle; Skia renders the shared game surface; web stubs haptics and external integrations visibly in dev.

## Analytics and tests

One `screen_view` on settled route, no PII. Golden ID `GOLDEN-SCREEN-002-default`; additional fixtures for each state above. Validate main anchors within 2 reference px after freeze; mask animated/art-only differences and font AA for pixel diff; no critical text clipping. Verify Back→return preserves selected state, rapid double-tap produces one transaction, pause during transition restores committed screen. Screenshot comparison uses matching design fixture, not live balance.

## Unknowns / acceptance / implementation links

U-029; source relationships not present in prototype remain [PROPOSED]. Accepted only after exact selected assets have validated source mapping, runtime text replaces mutable baked labels, state matrix covered and relevant unknown gates resolved. [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Static slice](../../plans/PHASE_05_STATIC_VERTICAL_SLICE.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Catalog](../09_SCREEN_CATALOG.md).


Product requirement: LET'S PLAY includes clickable Terms of Use and Privacy Policy; menu music follows browser activation/native focus. Final legal URLs are configured and verified before release; do not substitute empty links.
