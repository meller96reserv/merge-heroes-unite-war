# Реестр конфликтов

| ID | Конфликт | Evidence | Решение / проверка |
|---|---|---|---|
| CF-001 | Разные file keys в master и links.txt | EV-003 | [PROPOSED] локальный архив + доступный файл из links; старую ссылку не использовать для догадок |
| CF-002 | Store обещает no drag; web tutorial требует Drag to Merge | EV-006, EV-009, EV-010 | [OBSERVED] ручной tutorial; auto-merge unlock/order U-030/U-002; отдельные команды manual/auto, общий resolver |
| CF-003 | Figma main 5×2 slots; web 5×3 positions | EV-004, EV-009 | [PROPOSED] сохранить 15 logical slots для web parity; reference Figma screenshot fixture сохраняет 10; адаптировать board-region с третьим рядом по U-025, не скрывать расхождение |
| CF-004 | Figma art — 10 звериных archetypes; web ранние tier — human Warrior/Archer | EV-004, EV-010 | [PROPOSED] visualId отдельно от reference hero definition; таблица соответствий до content import (U-035) |
| CF-005 | Figma stage 2-100, gold/gems 1.569, prices 50/120; live first buys 1 | EV-004, EV-009 | [PROPOSED] designer state fixtures отдельно от runtime data; не выводить cost formula из Figma |
| CF-006 | Figma пять nav icons без полной однозначности; web locked tabs/tutorial | EV-004, EV-009 | [PROPOSED] center battle; left shop, next heroes, right dungeon/relic по именам узлов; missing pages catalogued, unlock gates по capture |
| CF-007 | Wheel artwork reward illustration не совпадает с 12-sector constructed wheel | EV-004 | [PROPOSED] использовать vector sectors/runtime labels и outer ring; декоративное изображение wheel — nav icon, не RNG table |
| CF-008 | В Figma есть 18+ текст, FAIL, Mega Win и устаревшее layer name Add payout method | EV-004, EV-005 | [PROPOSED] это дизайнерский контент; actual characters прочитаны отдельно. Реальные выплаты не вводить. Target audience и финальные тексты U-029; не наследовать юридические обещания макета |

Каждая замена статуса требует обновить [evidence ledger](03_EVIDENCE_LEDGER.md), [unknowns](04_UNKNOWNS_REGISTER.md), соответствующий spec, JSON manifest и task note. [Индекс](00_INDEX.md).


| ID | Conflict | Evidence | Resolution |
|---|---|---|---|
| CF-009 | Figma daily chest+1000gold versus live7-day attendance calendar and separate launch event | EV-004,EV-013 | Preserve Figma visuals; define reviewed daily product behavior separately. UTC independent-day fixture is PROPOSED and not a claim about live consecutive attendance. U-014 gate. |
| CF-010 | Auto-merge marketed broadly but live is a60-minute activation after boss tutorial | EV-006,EV-022/023 | Persist timed entitlement; MVP development grant can exercise it without ad SDK. Exact expiry/paid provider remains gated; permanent auto default would be a separate product change. |
| CF-011 | Early normal HP1,4,16,81 suggests a square curve but first bossHP70 | EV-012,EV-021 | Use explicit stage/boss records; do not extrapolate one formula to bosses. |


| ID | Conflict | Evidence | Resolution |
|---|---|---|---|
| CF-012 | Live offline has multiple rewards and balance visible before dismissal;proposed fixture is gold-only with explicit pending claim | EV-025,EV-031 | Keep fixture as a labeled functional simplification. Exact parity requires reward-ID/rate/cap/grant-timing capture U006/U013;do not call the fixture reconstructed live behavior. |

CF-013 — Earlier host-only RN interpretation is SUPERSEDED by explicit user requirement EV-043: the actual game uses RN/TypeScript + Skia. [ADR-007](adr/ADR-007-RN-SKIA-RUNTIME.md) is authoritative; historical spike evidence remains unchanged and incomplete physical acceptance is not converted to PASS.


CF-014 — Latest explicit user direction adopts app-specific TZ then advertising then relevant general guidelines. Rewarded-only ads/AppMetrica supersede the earlier MVP exclusion. Shared example analytics UUID,betting,withdrawal,IAP packs and low-balance subsidies are inapplicable. CF-015 — Successful game maps to a stage clear (PROPOSED); boost credits only the additional multiplier amount above the durable base, preventing double pay. See [amendment](05_PRODUCT_REQUIREMENTS_AMENDMENT.md).
