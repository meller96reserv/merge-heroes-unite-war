# Каталог экранов

[OBSERVED] 15 artboards, 11 семейств, 430×932 portrait. По одному детальному документу на каждый вариант; 0 prototype reactions, поэтому UI transitions предложены. Marketing frames scrn1…scrn6 (1080×1920) и wide scrn1 (6570×1920) — promotional reference only, не отдельные игровые функции.

| ID | Name | Node | Spec | Assets | States |
| --- | --- | --- | --- | --- | --- |
| SCREEN-001 | loading | 2:2 | [spec](screens/SCREEN-001_loading.md) | 5 | loading,load_failed,retry |
| SCREEN-002 | start | 2:406 | [spec](screens/SCREEN-002_start.md) | 6 | ready,pressed,restoring,error |
| SCREEN-003 | main_battle | 2:426 | [spec](screens/SCREEN-003_main_battle.md) | 32 | first_launch,tutorial_buy_prompt,normal_idle,hero_purchase_available,insufficient_gold,board_full,merge_available,auto_merge_running,stage_in_progress,boss_warning,boss_combat,stage_clear,stage_failed,feature_unlock,reward_flying,modal_open,app_paused,returning_from_background |
| SCREEN-004 | hero_equipment | 75:744 | [spec](screens/SCREEN-004_hero_equipment.md) | 28 | selected,empty_slot,locked_slot,equipped,affordable,insufficient,max_level,opening |
| SCREEN-005 | relic | 71:279 | [spec](screens/SCREEN-005_relic.md) | 36 | collection,empty,locked,opening,reward_pending,insufficient |
| SCREEN-006 | dungeon | 80:1109 | [spec](screens/SCREEN-006_dungeon.md) | 18 | locked,available,loading,active,failed,completed |
| SCREEN-007 | hero_upgrades | 89:1310 | [spec](screens/SCREEN-007_hero_upgrades.md) | 28 | list,scrolling,available,insufficient,maxed,selected |
| SCREEN-008 | daily_get_gold | 2:418 | [spec](screens/SCREEN-008_daily_get_gold.md) | 6 | available,committing,claimed,error |
| SCREEN-009 | daily_claim | 106:553 | [spec](screens/SCREEN-009_daily_claim.md) | 6 | available,committing,claimed,error |
| SCREEN-010 | settings | 2:186 | [spec](screens/SCREEN-010_settings.md) | 3 | normal,muted,permission_denied,save_error |
| SCREEN-011 | settings_modal | 2:171 | [spec](screens/SCREEN-011_settings_modal.md) | 2 | open,editing,closing,permission_denied |
| SCREEN-012 | maintenance | 2:114 | [spec](screens/SCREEN-012_maintenance.md) | 4 | unavailable,retrying,recovered |
| SCREEN-013 | wheel_spin | 2:265 | [spec](screens/SCREEN-013_wheel_spin.md) | 6 | available,spinning,result,error |
| SCREEN-014 | wheel_free | 2:276 | [spec](screens/SCREEN-014_wheel_free.md) | 6 | free_available,spinning,result |
| SCREEN-015 | wheel_cooldown | 2:287 | [spec](screens/SCREEN-015_wheel_cooldown.md) | 6 | cooldown,expired,app_paused |

## Дополнительные runtime surfaces

| Surface | Статус | Политика |
|---|---|---|
| Tutorial / New Hero / withdraw prompt | [OBSERVED] web capture EV-009…011 | Создать overlay из Figma panel/character assets; поведение по tutorial spec |
| Quest/reward | [OBSERVED] ранний web HUD | Detailed claim flow проверяется U-017 |
| Offline reward | [UNKNOWN] runtime details | P0 functional-equivalent popup, U-006 |
| Boss intro/fail/stage clear | [UNKNOWN] exact sequences | P0 runtime overlay, U-005 |
| Shop | [OBSERVED] nav icon; полноценного Figma shop artboard нет | Rewarded-only Free coins1000gold/no cooldown per product amendment; no IAP catalogue |
| Inventory | [INFERRED] equipment/relic collection fulfill role | Отдельный screen только после evidence |
| Gift/Event | [OBSERVED] web entry icons; rules pending | P2 gate U-018 |
| Locked popup / error | [PROPOSED] usable fallback | No dead taps, explain condition/error |
| Prestige | [UNKNOWN] | OUT OF SCOPE until U-020 verified |

[State matrix](10_SCREEN_STATE_MATRIX.md) · [Layout](12_UI_LAYOUT_SPEC.md) · [Index](00_INDEX.md).
