# Навигация и input ownership

[OBSERVED] Figma показывает пять tab icons, center Battle, отдельные wheel/settings entries; prototype reactions отсутствуют. [PROPOSED] Stable routes: start, battle, heroes/detail, heroes/upgrades, shop, dungeon, relic, wheel, settings. Shop без полноценного Figma frame остаётся scope gate. SCREEN-007 — список upgrades, не второй battle screen.

```text
BOOT → LOADING → START → SESSION_RESTORE → BATTLE
BATTLE ↔ HERO_DETAIL ↔ HERO_UPGRADES
BATTLE ↔ DUNGEON / RELIC (P2 gated)
BATTLE or HERO → WHEEL → prior route
any ready route → SETTINGS_MODAL → prior route
session → priority popup queue → underlying route
```

Overlay stack has one interactive top owner. Input locks use {owner,reason,scope}; releasing unrelated lock cannot enable controls. Drag captures one pointer; second pointer ignored; pointercancel/background closes drag with no mutation. Reward fly layer does not block input. Wheel disables only spin until settled; closing visual result does not discard committed outcome. Native Back delegates to top modal, then returns to shell only from root game route.

[PROPOSED] Foreground meta keeps battle running, app background pauses. U-033 must verify exact reference behavior. Popup queue order: tutorial required acknowledgments, pending durable rewards/offline, daily, unlock informational; stable token dedupe. Store per-route selected hero and scroll state transiently; no duplicated state store in RN. [Screens](09_SCREEN_CATALOG.md) · [State matrix](10_SCREEN_STATE_MATRIX.md) · [Events](technical/05_EVENT_SYSTEM.md).


[Индекс](00_INDEX.md).

TASK-0128 implements transient NavigationCoordinator history, load generations
and priority/deduplicated popup ownership. Back/closing never consumes a saved
reward. Current Wheel uses the coordinator; required screens are connected by
their own tasks. Deferred tutorial/offline/quest queue entries are not enabled.

TASK-0141/0142 owner override: the minimal first-session guide is a nonblocking
Battle hint/highlight, not a popup queue or input lock. It hides on other routes,
resumes its saved valid step, and disappears permanently after completion/Skip.
The full reference tutorial/offline/quest queue entries stay deferred.
