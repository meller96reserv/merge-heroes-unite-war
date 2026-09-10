# Источники и режимы точности

| Source ID | Источник | Статус и границы |
|---|---|---|
| SRC-LOCAL | `docs/Merge Heroes Unite War.fig`, SHA-256 `59b80b59e499d68278363460e0f4cf46498eb688366e3ed098fe3fafc92aec69` | [OBSERVED] первичный визуальный архив пользователя, export 2026-09-08T11:38:21.907Z |
| SRC-FIGMA | [Файл из links.txt](https://www.figma.com/design/YL2jFE10viR9zQV5GzBCuZ/Merge-Heroes-Unite-War--Copy---Copy-?node-id=0-1) | [OBSERVED] доступен; одна страница, 1 801 узел; 185 distinct image hashes совпадают с локальным архивом |
| SRC-FIGMA-OLD | [Ссылка master](https://www.figma.com/design/2zNs6x9wJhfcMy8B0vCCd9/Merge-Heroes-Unite-War--Copy-?node-id=0-1) | [UNKNOWN] MCP отказал в доступе; версия не установлена; не считать тождественной текущему файлу |
| SRC-WEB | [Heroes Unite / CrazyGames](https://www.crazygames.com/game/heroes-unite) | [OBSERVED] listing: Cocos, portrait, обновление 2026-08-24; live captures 2026-09-08, runtime build `LIVE_CRAZY 3.16.2` установлен через settings (EV-026) |
| SRC-PLAY | [Google Play](https://play.google.com/store/apps/details?id=com.superjoy.idleheroes) | [OBSERVED] SUPERJOY; listing updated 2026-09-01, notes v3.18.0; описание не доказывает точный алгоритм |
| SRC-APPLE | [App Store](https://apps.apple.com/us/app/heroes-unite-idle-merge/id6755369572) | [OBSERVED] iOS/iPad listing; история версий может различаться по стране/кэшу |
| SRC-VIDEO | [Seed video](https://www.youtube.com/watch?v=5WKZ0TPW0H4) | [UNKNOWN] web fetch неуспешен, yt-dlp требует bot sign-in; видео не просмотрено |

Статусы: `[OBSERVED]` непосредственно видно; `[MEASURED]` воспроизводимо измерено; `[DERIVED]` выведено с формулой; `[INFERRED]` гипотеза; `[PROPOSED]` наше решение; `[UNKNOWN]` недостаточно данных. Отсутствие доступа не равно `NOT PRESENT`. Каждый balance sample хранит platform/version/source; Figma-числа никогда не попадают в observed runtime balance.

[PROPOSED] Fidelity: визуал `FIGMA_EXACT` при canonical viewport; live core `REFERENCE_EXACT` только для подтверждённого поведения; responsive/native UI `FUNCTIONAL_EQUIVALENT`; lifecycle/idempotency `IMPROVED`; непроверенные конфиги `PLACEHOLDER`; монетизация/реальные выплаты `OUT_OF_SCOPE`.

Конфликты см. [реестр](conflicts.md). Приоритет: локальный пользовательский art → проверенное Figma соответствие; runtime behavior → live конкретной версии; публичные описания → наличие рекламируемой функции. Не смешивать этот web build со старым YouTube или мобильным v3.18.0. [Evidence](03_EVIDENCE_LEDGER.md), [unknowns](04_UNKNOWNS_REGISTER.md).

Implementation authority: [start_prompt.md](../start_prompt.md) superseded the planning-only restriction (historical EV-032); the explicit user correction on 2026-09-09 now requires the game itself in RN/Skia under [ADR-007](adr/ADR-007-RN-SKIA-RUNTIME.md), EV-043. Newly supplied [game brief](<tz/Merge Heroes Unite War тз на разработку.md>), [general instructions](<tz/Инструкция для разработчиков.md>) and [advertising instructions](<tz/Реклама в приложениях.md>) are authoritative product inputs under the latest user direction: app-specific TZ first,advertising second,relevant general delivery/UX third. [Targeted amendment](05_PRODUCT_REQUIREMENTS_AMENDMENT.md) incorporates rewarded-only ads and AppMetrica; generic betting/payout/IAP examples do not apply.

Implementation reference lock: [RUN-03 and mobile version inventory](../analysis/reference/version_lock.json), EV-034. Confirmed webLIVE_CRAZY3.16.2; Android store3.18.0 updated2026-09-01; iOSUS3.18.0 released2026-09-02T05:54:52Z. Mobile runtime comparison is NOT_RUN.

Delivery scope correction (2026-09-09): app-specific docs/tz ТЗ is the highest
product authority. Advertising ТЗ controls ad behavior; supplied Figma controls
required screens, composition and art. General developer guidance applies only
to this application. Existing gameplay/progression/technical/reference documents
provide supporting detail and never expand delivery scope.
[Task classification and delivery gate](../plans/DELIVERY_SCOPE.md) supersede
older parity/MVP/post-release labels for current execution.
