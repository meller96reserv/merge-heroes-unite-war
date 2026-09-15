# Planning Complete

## Summary

Planning mission завершена 2026-09-08. `docs/CODEX_MASTER_PLAN.md` прочитан полностью, все обязательные planning artifacts созданы. Выполнены аудит текущего репозитория, локального Figma-архива и доступного живого Figma-файла, непосредственное исследование референсной игры, детализация систем, архитектуры, визуала, аудио, QA, релиза и атомарных задач. Production-реализация игры не начата.

Отдельный consistency pass: **PASS, 31 проверка, 0 ошибок**. Проверены обязательные файлы, исходные хеши, manifests, JSON Schema и положительные/отрицательные примеры, ссылки, покрытие экранов и систем, motion/audio IDs, задачи неизвестных и ацикличность графов задач и фаз. Это проверка planning package; игровые тесты, native builds и device performance остаются будущими работами. [Отчёт](analysis/reports/planning_consistency_report.md), [машинный результат](analysis/reports/planning_validation.json), [основной индекс](docs/00_INDEX.md).

## Repository analyzed

Исходный текущий набор: README, пустой AGENTS.md, .gitignore, master directive, локальный `.fig`, links.txt и служебный .DS_Store. Текущий baseline — commit `94fb53abe16046ad24e9c14878413f00e91cb62b`; удалённое пользователем старое приложение не восстановлено. В текущем checkout нет production runtime или package manifest. Существующие пользовательские файлы сохранены; оригинальный `.fig` и master-файл сверены по SHA-256. [Инвентаризация](analysis/reports/repository_inventory.json).

## Figma analyzed

- File: `docs/Merge Heroes Unite War.fig`, 241 954 197 bytes; SHA-256 `59b80b59e499d68278363460e0f4cf46498eb688366e3ed098fe3fafc92aec69`. Оригинал не изменён.
- Embedded assets: **351**, включая 349 PNG и 2 JPEG; 324 с alpha. Exact duplicates: 0; perceptual candidate pairs: 167. Все растры просмотрены через contact sheets и семантически классифицированы.
- Screens identified: **15 artboards 430×932, 11 семейств**; marketing frames отделены от игровых экранов. Для каждого экрана есть фактический render, node mapping, layout/state/interaction spec.
- Semantic assets mapped: **351/351**. Живая hierarchy: 1 801 узел, 296 text nodes; 185 distinct image hashes сопоставлены с локальным архивом, ещё 166 растров классифицированы визуально. Prototype reactions не обнаружены; навигационные решения явно PROPOSED.
- Scope candidates: 283 MVP, 52 post-MVP, 16 reference-only. Это классификация источников, не список одновременно загружаемых runtime textures.
- Unresolved asset gaps: **18 записей**, включая fonts/licenses, права распространения, 9-slice/pivot calibration, оригинальные VFX/projectiles/audio и недостающие состояния/popup layouts. Неклассифицированных растров нет; production import не выполнен.

Старый file key из master недоступен; использован доступный файл из links.txt с подтверждённым совпадением image hashes. [Аудит](docs/07_FIGMA_TECHNICAL_AUDIT.md), [asset map](docs/08_FIGMA_ASSET_MAP.md), [semantic manifest](analysis/figma/semantic_map.json), [gaps](docs/visual/asset_gap_analysis.md).

## Reference game analyzed

Version/platform/date: **LIVE_CRAZY 3.16.2 / CrazyGames web / 2026-09-08**. Версия установлена через фактическое окно Settings. Мобильные store listings рассмотрены отдельно; их версии не смешаны с веб-наблюдениями. Seed YouTube не просмотрен из-за недоступного fetch/bot-check; ограничение зафиксировано.

Captures used: **60 screenshots**, собственная silent video recording 4 091.12 s с исходными timestamps, **11 коротких clips**, три frame sheets, 17 mechanic observations, 13 balance samples, 7 timing/display measurements. Заполнены все 45 пунктов reference mechanic checklist. Запись включает интервалы ожидания во время работы над документацией; короткие clips выделяют действия.

Пройдено до hero tier 4, account level 2 и stage 1-16; проверены tutorial, покупки/hold/full board, manual merge, deployment/withdrawal, бой, первый boss retry/win, активация timed auto-merge и cascade, account unlock, settings/modal continuity и возврат с offline reward. Confidence высокая для непосредственно видимых ограниченных сценариев; общие формулы, вероятности, поздние режимы и native lifecycle остаются UNKNOWN. Грубые timing samples имеют явно указанную погрешность.

[Reverse engineering](docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md), [capture index](analysis/reference/capture_index.md), [evidence ledger](docs/03_EVIDENCE_LEDGER.md).

## Docs generated

**136 Markdown-документов в docs**, помимо исходного master: source/evidence/unknown/conflict registers; 15 screen specs; 17 gameplay и 15 progression specs с разделами A–R; visual/audio/technical/QA/release комплект; шесть ADR и индексы.

Дополнительно: **29 JSON Schema**, observed/proposed balance files, bridge/event/presentation catalogues, asset/ownership/gap manifests, QA/motion/audio CSV, analysis reports, native spike plan и root execution rules. [Индекс](docs/00_INDEX.md), [schemas](data-spec/README.md), [execution rules](CODEX_EXECUTION_RULES.md).

## Plans generated

**24 плана**: 21 phase plan, execution order, dependency graph и computed critical path. Каждый phase plan содержит все обязательные разделы master. Граф фаз и граф задач ацикличны; числовой порядок файлов не подменяет реальные зависимости. Native spike выполняется рано; реальное сохранение/recovery требуется до приёмки playable purchase/merge loop. [Execution order](plans/00_EXECUTION_ORDER.md), [DAG](plans/01_DEPENDENCY_GRAPH.md), [critical path](plans/02_CRITICAL_PATH.md).

## Atomic tasks generated

**251 задача**, TASK-0001…TASK-0251, все **NOT_STARTED**. У каждой есть phase, priority, dependencies, parallelization policy, точные входы/выходы, implementation steps, edge/test cases, manual verification, acceptance criteria, DoD, запреты, complexity и risk. Граф содержит **418 dependency edges**. [Task index](tasks/TASK_INDEX.md), [machine-readable manifest](tasks/task_manifest.json).

## P0 task count

**184**.

## P1 task count

**54**.

## P2 task count

**13**.

## Confirmed core mechanics

- Первые две покупки стоят по 1 gold; hold создаёт несколько героев, заполненное поле даёт отдельный отказ.
- Ручное объединение ранних одинаковых tiers создаёт следующий tier; discovery rewards отличаются по tier. Получены Archer 2, Magician 3, Berserker 4.
- Герой переносится на battlefield, автоматически атакует и сохраняет занятый owned board slot; tap withdrawal проверен.
- После убийств меняются gold/stage; stage 1-9 поддерживает farming и boss retry. Первый boss 1-10 имеет показанные HP 70; наблюдались hits 13 и победа.
- Auto-merge открывается в tutorial после первого босса как временная активация на 60 минут; показаны Free video и 500 gems. Free activation и трёхступенчатый cascade после двух покупок проверены; результат остался deployed.
- Account level 2 даёт дополнительную Hero Platform. Settings и некоторые popup overlays позволяют бою продолжаться.
- Возврат в тот же guest context сохраняет прогресс и показывает offline reward: 00:03:34, 247K gold и четыре других вида наград. Точная формула из этого не выводится.

Каждый факт ограничен конкретным сценарием и связан с evidence ID; это не утверждение о полной parity всех версий/режимов.

## Inferred mechanics

Финальный auto merge в одном cascade может предпочитать deployed destination; общее правило ещё не доказано. Offline balance, видимый до закрытия popup, поддерживает гипотезу начисления до dismiss, но не раскрывает внутреннюю transaction/save последовательность. Небольшие timing samples дают ориентиры визуальных фаз, а не точные универсальные интервалы.

## Major proposed improvements

Deterministic pure TypeScript core; единый durable transaction/receipt/watermark pipeline; безопасное восстановление A/B saves и migrations; независимые RNG streams; versioned bridge с session/generation guards; разделение simulation и presentation; bounded pools/audio voices, reduced motion и явные performance budgets. Эти решения принадлежат проекту и не выдаются за извлечённую реализацию референса.

Предложенные gold-only offline fixture, claim flow и uniform wheel weights отделены от observed data. Их нельзя называть exact reference balance; расхождения закреплены в conflicts и fidelity gates.

## Blockers

Нераспределённых planning blockers нет. Остаётся **один BLOCKER для native implementation**: RN/Cocos integration ещё не собрана и не запущена. Cocos Creator не найден в проверенных стандартных расположениях; Android tools и Xcode присутствуют. Есть конкретный ранний spike и acceptance ledger со статусами NOT_RUN.

Права на assets/fonts/audio, точные reference rules и release identity остаются самостоятельными implementation/release gates. [Полный список](analysis/reports/unresolved_blockers.md), [native environment](analysis/reports/native_environment.json).

## High-priority unknowns

Всего **35 unresolved remainders**: 1 BLOCKER, 24 HIGH, 7 MEDIUM, 2 LOW, 1 COSMETIC. Главные: общее auto pair ordering/expiry, price progression, damage/targeting, boss cadence/timeout, offline rate/cap/reward IDs, equipment/daily/wheel rules, поздние unlocks, visual tier mapping, native lifecycle и права распространения.

У всех есть причина важности, конкретный метод проверки, affected phase и действительный TASK ID. Частичные новые наблюдения обновили реестр, но не закрыли неподтверждённые остатки. [Unknown register](docs/04_UNKNOWNS_REGISTER.md), [verification tasks](analysis/reference/unknown_task_mapping.md).

## Architecture decisions

Cocos Creator 3.8 LTS как planning direction, exact patch после spike; pure TypeScript game-core; React Native shell; full-screen native game host; versioned A/B save contract; semantic asset pipeline; typed JSON bridge. Шесть ADR фиксируют status, rationale, alternatives, consequences и verification gates. [Architecture](docs/technical/01_ARCHITECTURE.md), [ADR-001](docs/adr/ADR-001-ENGINE.md), [ADR-002](docs/adr/ADR-002-MOBILE-HOST.md), [ADR-006](docs/adr/ADR-006-RN-COCOS-BRIDGE.md).

## RN/Cocos integration decision status

**PROPOSED strategy A, NOT VERIFIED**: Android Activity / iOS ViewController, запускаемые из RN. Embedded surface и WebView сравнены как альтернативы; подмена выбранной стратегии без нового решения не допускается. Spike проверяет обе платформы, touch, bidirectional bridge, Back/dismiss, 10+ re-entry cycles, background/resume, audio focus и память. Production acceptance расширяет lifecycle проверку до 50 cycles. [Spike plan](spikes/rn-cocos/README.md), [acceptance ledger](spikes/rn-cocos/ACCEPTANCE.md), [phase 03](plans/PHASE_03_NATIVE_INTEGRATION_SPIKE.md).

## Vertical slice scope

Native portrait launch → Figma-based battle HUD/board → buy ×2 → merge/discovery → deploy → automatic attacks/projectile/hit/death → reward → next stage/boss attempt → save/restart/resume, с минимальными оригинальными audio/VFX и settings. Exact Figma fixture с 10 слотами и functional 15-slot adaptation имеют разные visual baselines. [Definition](docs/release/02_VERTICAL_SLICE_DEFINITION.md).

## MVP scope

P0 core плюс P1 hero upgrades/equipment, quests, daily, wheel, settings, persistence/offline, полный motion/audio и native/device QA. Extended relic/dungeon/summon/skills/prestige, backend/accounts и live monetization имеют отдельные post-MVP/scope gates; зарезервированный интерфейс не означает реализованную функцию. [MVP](docs/release/01_MVP_DEFINITION.md), [post-launch](docs/release/05_POST_LAUNCH_BACKLOG.md).

## Recommended first implementation task

Начать с **[TASK-0001 — Planning handoff validation](tasks/TASKS_PHASE_00.md#task-0001)**. После исходных handoff/host dependencies первый native шаг — **[TASK-0037 — Native toolchain lock](tasks/TASKS_PHASE_03.md#task-0037)**, затем **[TASK-0038 — Standalone Cocos export probe](tasks/TASKS_PHASE_03.md#task-0038)**. Production gameplay не начинать до соответствующих evidence/native gates.

## STOP

Planning mission is complete. Production implementation has NOT started.
