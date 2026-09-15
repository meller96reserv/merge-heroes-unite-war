# CODEX MASTER PLANNING DIRECTIVE
## Merge Heroes Unite War — полный reverse-engineering, Figma-аудит и план разработки от нуля до релиза

> **Назначение файла:** положить этот файл в корень репозитория рядом с исходным `.fig`-макетом и дать Codex одну команду: **«Прочитай `CODEX_MASTER_PLAN.md` полностью и выполни его как planning mission. Не начинай production-реализацию игры, пока не сформирован весь комплект планов и спецификаций.»**
>
> Этот документ — не краткое ТЗ и не просьба «сделай похожую игру». Он задаёт процедуру, по которой Codex должен сначала изучить все доступные исходники, реконструировать фактическую логику референсной игры, разобрать Figma-ассеты, отделить доказанные факты от предположений, затем создать и связать между собой подробные Markdown-планы для каждого этапа разработки.

---

# 0. ГЛАВНАЯ МИССИЯ CODEX

Ты работаешь как одновременно:

- lead game designer;
- systems designer;
- gameplay programmer;
- Cocos Creator / TypeScript architect;
- React Native integration architect;
- reverse-engineering analyst игровой логики;
- UI/UX engineer;
- technical artist;
- animation/VFX designer;
- audio designer;
- balance/economy designer;
- QA lead;
- build/release engineer;
- technical writer.

Твоя задача **на этом проходе — не написать всю игру**, а создать такой комплект документации, чтобы после него другой Codex-сеанс мог реализовывать проект последовательно, по атомарным задачам, почти не принимая архитектурных решений «на ходу» и не выдумывая механику самостоятельно.

Конечная цель проекта:

1. воспроизвести core loop и фактическую игровую логику референса **HEROES UNITE : IDLE & MERGE** настолько точно, насколько это подтверждается наблюдением;
2. использовать предоставленный Figma-макет и его ассеты как основной визуальный source of truth;
3. сделать визуально живую и приятную игру: idle/attack/hit/death/merge/reward/UI-анимации, VFX, parallax, screen feedback, sound design;
4. основной игровой runtime проектировать на **Cocos Creator + TypeScript**;
5. сохранить возможность разработки/отладки через browser preview;
6. конечное мобильное приложение должно быть пригодно для Android/iOS;
7. если формальное требование проекта требует React Native, использовать **React Native shell + Cocos native game runtime**, предварительно доказав жизнеспособность интеграции на Android и iOS отдельным ранним spike;
8. архитектура игровой логики должна максимально отделяться от Cocos API, чтобы доменная логика, баланс, save model и конфиги были переносимыми и тестируемыми;
9. никаких «магических чисел», случайно придуманных механик, неучтённых ассетов и скрытых предположений.

---

# 1. ОДНА КОМАНДА, КОТОРУЮ ПОЛЬЗОВАТЕЛЬ ДОЛЖЕН СМОЧЬ ДАТЬ CODEX

После размещения этого файла и `.fig` в репозитории пользователь должен иметь возможность написать только:

```text
Прочитай CODEX_MASTER_PLAN.md полностью. Выполни planning mission от начала до конца автономно. Проанализируй репозиторий, Figma-файл, доступные ассеты и референсную игру; создай весь комплект docs/plans/data-manifests, описанный в документе. Не начинай production-реализацию игры. Не спрашивай меня о мелочах: неизвестное фиксируй как UNKNOWN с планом верификации. Остановись только после создания PLANNING_COMPLETE.md.
```

После этого Codex обязан сам:

1. найти `.fig`;
2. сделать технический аудит архива;
3. извлечь/проиндексировать ассеты в служебную analysis-папку, не разрушая оригинал;
4. найти доступные референсы игры;
5. изучить игровые сценарии;
6. составить evidence ledger;
7. создать asset manifest;
8. создать screen map;
9. реконструировать system/state/gameplay logic;
10. определить неизвестные параметры и способы их измерения;
11. разработать animation/VFX/audio spec;
12. определить архитектуру Cocos и мобильной оболочки;
13. разбить разработку на фазы;
14. разбить фазы на атомарные задачи;
15. определить acceptance criteria и тесты;
16. сформировать окончательный execution order;
17. проверить непротиворечивость планов;
18. создать `PLANNING_COMPLETE.md`;
19. **остановиться и не начинать production-код игры**.

---

# 2. НЕОБСУЖДАЕМЫЕ ПРАВИЛА

## 2.1. Не выдавать предположение за факт

Каждый существенный вывод должен иметь один из тегов:

- `[OBSERVED]` — напрямую видно в Figma, видео, live gameplay, имеющемся коде или другом первичном источнике;
- `[MEASURED]` — параметр получен измерением/серией наблюдений;
- `[DERIVED]` — математически выведено из наблюдаемых данных;
- `[INFERRED]` — наиболее вероятная логика, но не подтверждена;
- `[PROPOSED]` — сознательно предлагаемая нами реализация/улучшение;
- `[UNKNOWN]` — данных недостаточно.

Запрещено писать «точно работает так», если источник — только внешний вид статического макета.

## 2.2. Figma не является источником точного баланса

Figma может доказать:

- существование экрана;
- расположение визуальных элементов;
- наличие кнопки;
- тексты и числа на конкретном дизайнерском состоянии;
- стили;
- графические ресурсы;
- предполагаемые переходы, если они явно нарисованы.

Figma **не доказывает автоматически**:

- реальные формулы урона;
- частоту атак;
- стоимость summon на каждом уровне;
- вероятность drop;
- точное поведение auto-merge;
- сохранение состояния;
- offline progression formula;
- unlock thresholds, если они не показаны;
- API/backend поведение;
- timing runtime-анимации;
- точный sound design.

## 2.3. Не копировать звук/код/закрытые ресурсы из референсной игры

Для звуков:

- анализировать **назначение, характер, длительность и feedback**;
- создавать оригинальный sound brief;
- использовать собственные/лицензированные/сгенерированные SFX;
- не вытаскивать proprietary audio из APK/сайта без явного права.

То же правило относится к чужому исходному коду.

## 2.4. Оригинальный `.fig` не изменять

Любой анализ делать на копии в служебной директории.

## 2.5. Production-код до завершения планирования не писать

Разрешено создавать только:

- analysis scripts;
- asset inventory tools;
- image contact sheets;
- CSV/JSON manifests;
- временные feasibility spikes, если они нужны именно для доказательства архитектурной возможности и помещены в `spikes/`;
- документацию.

Нельзя начинать реализацию полноценного BattleSystem, MergeSystem, UI и т. п. в рамках planning mission.

## 2.6. Не задавать пользователю вопросы, которые можно превратить в проверяемую гипотезу

Если точный факт неизвестен:

1. зафиксируй `[UNKNOWN]`;
2. укажи, почему он важен;
3. укажи метод верификации;
4. поставь задачу в `REFERENCE_CAPTURE_PLAN.md`;
5. если возможно — предложи временное безопасное значение с тегом `[PROPOSED]`, но не называй его оригинальным.

---

# 3. ИСХОДНЫЕ МАТЕРИАЛЫ И SOURCE-OF-TRUTH PRIORITY

Использовать источники в следующем порядке.

## Tier A — материалы пользователя

1. `.fig` файл в репозитории.
2. Любые screenshots/videos/reference captures, если они лежат рядом.
3. Существующий код проекта, если он уже есть.
4. Любые JSON/CSV/notes пользователя.

## Tier B — live reference

Если есть интернет/браузер:

- CrazyGames: `https://www.crazygames.com/game/heroes-unite`
- Google Play package: `com.superjoy.idleheroes`
- App Store / официальный store listing;
- публичные gameplay-видео;
- публичные screenshots/version history;
- официальные описания/патчноуты.

Seed video, который можно использовать для раннего геймплейного сравнения:

- `https://www.youtube.com/watch?v=5WKZ0TPW0H4`

**Важно:** внешние гайды и SEO-страницы — только вспомогательные источники. При конфликте выигрывает наблюдение live gameplay / видео / официальный store listing.

## Tier C — наши архитектурные решения

Если данных нет, предлагать собственную реализацию, но маркировать `[PROPOSED]`.

---

# 4. ПРЕДВАРИТЕЛЬНЫЕ ФАКТЫ О ПРЕДОСТАВЛЕННОЙ FIGMA, КОТОРЫЕ НАДО ПЕРЕПРОВЕРИТЬ

На момент создания этого master-документа предварительный локальный аудит показал:

- файл: `Merge Heroes Unite War (Copy) (Copy).fig`;
- размер около 231 MiB;
- `.fig` является ZIP-контейнером;
- внутри присутствуют `canvas.fig`, `thumbnail.png`, `meta.json`, `images/`;
- в `images/` предварительно обнаружено **351 embedded image asset**;
- из них предварительно: 349 PNG и 2 JPEG;
- значительная часть — RGBA с прозрачностью;
- есть полноэкранные/почти полноэкранные portrait-растры и много отдельных sprite-like ассетов;
- в макете визуально присутствуют как минимум:
  - стартовый экран с логотипом и CTA;
  - основной battle/merge экран;
  - hero/equipment screen;
  - Wheel of Luck;
  - Daily Bonus;
  - fantasy backgrounds;
  - персонажи/монстры;
  - hero portraits;
  - оружие;
  - armor/equipment;
  - rings/accessories;
  - chests;
  - currencies;
  - кнопки/frames/panels/icons;
  - stage/boss HUD;
  - bottom navigation;
  - декоративные fantasy elements.

Эти цифры **не считать окончательным manifest**. Codex обязан повторить анализ локально и создать воспроизводимый отчёт.

`canvas.fig` может быть внутренним бинарным представлением Figma. Простого unzip недостаточно для получения всей семантической hierarchy. Поэтому hierarchy/названия слоёв нужно получать одним из путей:

1. доступный Figma MCP/API;
2. экспорт/плагин, если уже настроен;
3. анализ thumbnail/screens + embedded images;
4. локальные parser tools только если они надёжно работают с текущим форматом;
5. если hierarchy недоступна — явно указать это как limitation и всё равно построить semantic asset map по растрам.

Исходная Figma-ссылка, если доступ к MCP/API настроен:

`https://www.figma.com/design/2zNs6x9wJhfcMy8B0vCCd9/Merge-Heroes-Unite-War--Copy-?node-id=0-1`

---

# 5. ЧТО ИМЕННО CODEX ДОЛЖЕН СОЗДАТЬ

Итоговая структура документации должна быть не меньше следующей.

```text
docs/
├── 00_INDEX.md
├── 01_PROJECT_SCOPE.md
├── 02_SOURCE_OF_TRUTH.md
├── 03_EVIDENCE_LEDGER.md
├── 04_UNKNOWNS_REGISTER.md
├── 05_REFERENCE_CAPTURE_PLAN.md
├── 06_REFERENCE_GAME_REVERSE_ENGINEERING.md
├── 07_FIGMA_TECHNICAL_AUDIT.md
├── 08_FIGMA_ASSET_MAP.md
├── 09_SCREEN_CATALOG.md
├── 10_SCREEN_STATE_MATRIX.md
├── 11_NAVIGATION_FLOW.md
├── 12_UI_LAYOUT_SPEC.md
├── 13_DESIGN_TOKENS.md
├── 14_RESPONSIVE_AND_SAFE_AREAS.md
├── 15_GAME_DESIGN_DOCUMENT.md
├── 16_CORE_GAME_LOOP.md
├── 17_GAME_STATE_MODEL.md
├── 18_SESSION_FLOW.md
├── gameplay/
│   ├── 00_GAMEPLAY_INDEX.md
│   ├── 01_HERO_SYSTEM.md
│   ├── 02_HERO_PURCHASE_SUMMON_SYSTEM.md
│   ├── 03_MERGE_SYSTEM.md
│   ├── 04_AUTO_MERGE_SYSTEM.md
│   ├── 05_BOARD_SLOT_SYSTEM.md
│   ├── 06_BATTLE_SYSTEM.md
│   ├── 07_TARGETING_SYSTEM.md
│   ├── 08_ATTACK_SYSTEM.md
│   ├── 09_DAMAGE_CRIT_DEFENSE.md
│   ├── 10_PROJECTILE_SYSTEM.md
│   ├── 11_ENEMY_SYSTEM.md
│   ├── 12_STAGE_SYSTEM.md
│   ├── 13_BOSS_SYSTEM.md
│   ├── 14_SKILLS_AND_SPECIALS.md
│   ├── 15_DEATH_RESPAWN_RECOVERY.md
│   ├── 16_BATTLE_CONTENT_MODES.md
│   └── 17_TUTORIAL_SYSTEM.md
├── progression/
│   ├── 00_PROGRESSION_INDEX.md
│   ├── 01_CURRENCIES.md
│   ├── 02_ECONOMY_MODEL.md
│   ├── 03_HERO_PROGRESSION.md
│   ├── 04_STAGE_PROGRESSION.md
│   ├── 05_UNLOCKS.md
│   ├── 06_REWARDS.md
│   ├── 07_QUESTS.md
│   ├── 08_DAILY_REWARD.md
│   ├── 09_WHEEL_OF_LUCK.md
│   ├── 10_EQUIPMENT.md
│   ├── 11_UPGRADES.md
│   ├── 12_SUMMON_GACHA_IF_APPLICABLE.md
│   ├── 13_OFFLINE_PROGRESS.md
│   ├── 14_PRESTIGE_META_IF_APPLICABLE.md
│   └── 15_BALANCE_REVERSE_ENGINEERING.md
├── visual/
│   ├── 00_VISUAL_INDEX.md
│   ├── 01_ART_DIRECTION.md
│   ├── 02_ASSET_NAMING_AND_IMPORT.md
│   ├── 03_SPRITE_ATLAS_PLAN.md
│   ├── 04_ANIMATION_LANGUAGE.md
│   ├── 05_HERO_ANIMATIONS.md
│   ├── 06_ENEMY_ANIMATIONS.md
│   ├── 07_MERGE_ANIMATIONS.md
│   ├── 08_COMBAT_VFX.md
│   ├── 09_UI_MOTION.md
│   ├── 10_REWARD_VFX.md
│   ├── 11_BACKGROUND_PARALLAX.md
│   ├── 12_SCREEN_TRANSITIONS.md
│   └── 13_HAPTICS.md
├── audio/
│   ├── 00_AUDIO_INDEX.md
│   ├── 01_AUDIO_DIRECTION.md
│   ├── 02_SFX_EVENT_MAP.md
│   ├── 03_MUSIC_PLAN.md
│   ├── 04_AMBIENCE_PLAN.md
│   ├── 05_AUDIO_MIX_RULES.md
│   └── 06_AUDIO_ASSET_ACQUISITION.md
├── technical/
│   ├── 00_TECH_INDEX.md
│   ├── 01_ARCHITECTURE.md
│   ├── 02_REPOSITORY_STRUCTURE.md
│   ├── 03_DOMAIN_GAME_CORE.md
│   ├── 04_COCOS_RENDERING_LAYER.md
│   ├── 05_EVENT_SYSTEM.md
│   ├── 06_STATE_MANAGEMENT.md
│   ├── 07_CONFIG_AND_DATA_SCHEMAS.md
│   ├── 08_SAVE_SYSTEM.md
│   ├── 09_SAVE_MIGRATIONS.md
│   ├── 10_OFFLINE_TIME_SERVICE.md
│   ├── 11_ASSET_LOADING.md
│   ├── 12_OBJECT_POOLING.md
│   ├── 13_AUDIO_RUNTIME.md
│   ├── 14_PERFORMANCE_BUDGET.md
│   ├── 15_REACT_NATIVE_COCOS_INTEGRATION.md
│   ├── 16_ANDROID_INTEGRATION.md
│   ├── 17_IOS_INTEGRATION.md
│   ├── 18_BRIDGE_PROTOCOL.md
│   ├── 19_WEB_PREVIEW_AND_DEBUG.md
│   ├── 20_BUILD_AND_CI.md
│   ├── 21_ANALYTICS_EVENTS.md
│   ├── 22_ERROR_HANDLING.md
│   └── 23_SECURITY_AND_ANTI_TAMPER.md
├── qa/
│   ├── 00_QA_INDEX.md
│   ├── 01_TEST_STRATEGY.md
│   ├── 02_UNIT_TEST_MATRIX.md
│   ├── 03_INTEGRATION_TEST_MATRIX.md
│   ├── 04_GAMEPLAY_ACCEPTANCE.md
│   ├── 05_VISUAL_REGRESSION.md
│   ├── 06_PERFORMANCE_TESTING.md
│   ├── 07_DEVICE_MATRIX.md
│   ├── 08_SAVE_MIGRATION_TESTS.md
│   └── 09_RELEASE_CHECKLIST.md
├── adr/
│   ├── ADR-001-ENGINE.md
│   ├── ADR-002-MOBILE-HOST.md
│   ├── ADR-003-DOMAIN-SEPARATION.md
│   ├── ADR-004-SAVE-STORAGE.md
│   ├── ADR-005-ASSET-PIPELINE.md
│   └── ADR-006-RN-COCOS-BRIDGE.md
└── release/
    ├── 01_MVP_DEFINITION.md
    ├── 02_VERTICAL_SLICE_DEFINITION.md
    ├── 03_BETA_DEFINITION.md
    ├── 04_PRODUCTION_DEFINITION.md
    └── 05_POST_LAUNCH_BACKLOG.md

plans/
├── 00_EXECUTION_ORDER.md
├── 01_DEPENDENCY_GRAPH.md
├── 02_CRITICAL_PATH.md
├── PHASE_00_REPOSITORY_AND_ANALYSIS.md
├── PHASE_01_REFERENCE_REVERSE_ENGINEERING.md
├── PHASE_02_FIGMA_AND_ASSET_PIPELINE.md
├── PHASE_03_NATIVE_INTEGRATION_SPIKE.md
├── PHASE_04_PROJECT_FOUNDATION.md
├── PHASE_05_STATIC_VERTICAL_SLICE.md
├── PHASE_06_CORE_GAME_STATE.md
├── PHASE_07_HERO_PURCHASE_AND_MERGE.md
├── PHASE_08_BATTLE_LOOP.md
├── PHASE_09_STAGE_AND_BOSS_PROGRESSION.md
├── PHASE_10_HERO_PROGRESSION_AND_EQUIPMENT.md
├── PHASE_11_META_SCREENS.md
├── PHASE_12_SAVE_AND_OFFLINE.md
├── PHASE_13_ANIMATION_VFX_HAPTICS.md
├── PHASE_14_AUDIO.md
├── PHASE_15_BALANCE_AND_CONTENT.md
├── PHASE_16_REACT_NATIVE_PRODUCTION_INTEGRATION.md
├── PHASE_17_PERFORMANCE_AND_OPTIMIZATION.md
├── PHASE_18_QA_AND_REGRESSION.md
├── PHASE_19_RELEASE.md
└── PHASE_20_POST_RELEASE.md

tasks/
├── README.md
├── TASK_INDEX.md
├── TASKS_PHASE_00.md
├── TASKS_PHASE_01.md
├── ...
└── TASKS_PHASE_20.md

analysis/
├── figma/
│   ├── README.md
│   ├── meta.json
│   ├── asset_manifest.csv
│   ├── asset_manifest.json
│   ├── duplicate_report.md
│   ├── contact_sheets/
│   ├── screen_candidates/
│   ├── semantic_map.json
│   └── extraction_log.md
├── reference/
│   ├── capture_index.md
│   ├── mechanic_observations.csv
│   ├── timing_measurements.csv
│   ├── balance_samples.csv
│   └── screenshots/
└── reports/
    ├── planning_consistency_report.md
    └── unresolved_blockers.md

data-spec/
├── README.md
├── hero.schema.json
├── enemy.schema.json
├── stage.schema.json
├── economy.schema.json
├── merge.schema.json
├── equipment.schema.json
├── rewards.schema.json
├── animation.schema.json
├── audio-event.schema.json
└── save.schema.json

CODEX_EXECUTION_RULES.md
PLANNING_COMPLETE.md
```

Если часть систем референса отсутствует, соответствующий документ **всё равно создать**, но отметить `NOT PRESENT / NOT IN SCOPE` и привести доказательство, чтобы потом никто не решил добавить систему случайно.

---

# 6. ФОРМАТ КАЖДОГО ПЛАНА PHASE_XX

Каждый `plans/PHASE_XX_*.md` обязан иметь одинаковый каркас:

```markdown
# PHASE XX — Name

## Goal
## Why this phase exists
## Entry criteria
## Source documents to read first
## Inputs
## Outputs
## Non-goals
## Dependencies
## Risks
## Decisions that must already be locked
## Detailed implementation sequence
### Step XX.1
### Step XX.2
...
## Files/directories expected to be created
## Existing files expected to be modified
## Data migrations if any
## Tests required
## Manual validation procedure
## Performance checks
## Visual checks
## Android checks
## iOS checks
## Web-preview checks
## Failure/rollback strategy
## Definition of Done
## Exit criteria
## Tasks generated from this phase
```

Каждый шаг должен быть конкретным. Запрещены формулировки уровня:

> «Сделать battle system.»

Нужен уровень:

> «Создать pure-TS `BattleSimulation` без Cocos imports; определить `BattleState`, `CombatantState`, `AttackIntent`, `DamageResult`; реализовать deterministic tick/update API; покрыть тестами target selection, attack cooldown, death transition; после этого подключить adapter в Cocos layer.»

---

# 7. ФОРМАТ КАЖДОЙ АТОМАРНОЙ ЗАДАЧИ

Каждая задача должна иметь уникальный ID:

```text
TASK-0001
TASK-0002
...
```

Формат:

```markdown
## TASK-XXXX — Short title

**Phase:** PHASE_XX
**Priority:** P0/P1/P2/P3
**Type:** analysis / architecture / gameplay / UI / art-tech / animation / audio / integration / QA / release
**Dependencies:** TASK-...
**Can run in parallel:** yes/no + with what

### Goal
### Context
### Source-of-truth docs
### Exact files to inspect first
### Files expected to create
### Files expected to modify
### Implementation steps
1. ...
2. ...
3. ...

### Edge cases
### Test cases
### Manual verification
### Acceptance criteria
### Definition of Done
### Do not do
### Estimated complexity
### Notes / unknowns
```

Задача должна быть размером примерно от 15 минут до 4 часов работы агента. Всё, что больше — разбивать.

---

# 8. ПЕРВЫЙ ЭТАП: АУДИТ РЕПОЗИТОРИЯ

До анализа игры:

1. просканировать дерево репозитория;
2. определить, пустой это проект или существующий;
3. найти:
   - `.fig`;
   - images;
   - videos;
   - docs;
   - package manifests;
   - Cocos project files;
   - RN project files;
   - Android/iOS native dirs;
4. не предполагать, что проект пустой;
5. если код уже существует — описать его и не планировать дублирующую архитектуру без причины;
6. создать `docs/01_PROJECT_SCOPE.md`;
7. создать inventory existing code/assets;
8. определить риск удаления/перезаписи пользовательских файлов.

Обязательная команда/аналог:

```bash
find . -maxdepth 4 -type f | sort
```

Но не выводить в документацию гигантские vendor/node_modules списки.

---

# 9. FIGMA TECHNICAL AUDIT — ПОДРОБНАЯ ПРОЦЕДУРА

## 9.1. Найти `.fig`

Если несколько файлов — сравнить даты/размеры, не выбирать молча. Основной файл указать в `FIGMA_TECHNICAL_AUDIT.md`.

## 9.2. Определить контейнер

Проверить `file`, magic bytes, archive members.

Если ZIP:

```bash
unzip -l "<file>.fig"
```

Извлечь **копию** в:

```text
analysis/figma/raw/
```

Не трогать оригинал.

## 9.3. Обработать `meta.json`

Зафиксировать:

- file name;
- export timestamp;
- thumbnail size;
- render coordinates;
- background color;
- любые developer links.

## 9.4. Обработать `thumbnail.png`

Создать:

- оригинальную копию;
- увеличенную inspection preview;
- zoning map — где находятся основные кластеры экранов на canvas.

## 9.5. Проиндексировать `images/`

Для каждого embedded image определить:

- internal hash/name;
- detected MIME/format;
- width;
- height;
- aspect ratio;
- color mode;
- alpha yes/no;
- actual non-transparent bounding box;
- file size;
- perceptual hash;
- exact SHA-256;
- duplicate group;
- near-duplicate group;
- likely category;
- likely semantic role;
- whether it looks like full screen, background, character, icon, weapon, panel, etc.;
- whether text baked into raster;
- whether it is likely 9-slice candidate;
- whether it has suspicious transparent padding;
- whether a higher-resolution duplicate exists.

Создать:

```text
analysis/figma/asset_manifest.csv
analysis/figma/asset_manifest.json
```

### Минимальные поля manifest

```json
{
  "sourceInternalId": "...",
  "sourceFile": "images/...",
  "sha256": "...",
  "phash": "...",
  "width": 0,
  "height": 0,
  "aspectRatio": 0,
  "format": "PNG",
  "hasAlpha": true,
  "alphaBounds": {"x":0,"y":0,"w":0,"h":0},
  "exactDuplicateOf": null,
  "nearDuplicateGroup": null,
  "category": "unknown",
  "semanticName": null,
  "confidence": 0.0,
  "usedOnScreens": [],
  "notes": ""
}
```

## 9.6. Сделать contact sheets

Не пытаться анализировать 351 изображение по одному вручную без общего обзора.

Создать набор contact sheets:

- 50–80 assets на лист;
- индекс;
- short hash;
- размеры;
- checkerboard под transparency;
- отдельные sheets по категориям после классификации.

## 9.7. Найти full-screen candidates

Кандидаты:

- portrait aspect ratio;
- width >= ~700;
- height >= ~1200;
- либо меньшие rasterized screenshots с аналогичным ratio.

Для каждого:

1. сохранить preview;
2. определить экран;
3. сопоставить с individual assets;
4. зафиксировать UI regions;
5. определить reference coordinate system.

## 9.8. Семантическое переименование

Оригинальные hash-файлы не удалять.

Создать semantic copy/mapping, например:

```text
assets/source-map/
```

И mapping:

```json
{
  "9288f249...": "ui/building/dungeon_entrance.png",
  "...": "currency/gold_coin.png"
}
```

Имена не должны быть `image1.png`, `icon2.png`.

## 9.9. Выявить повторное использование

Отдельно описать:

- один и тот же character fullbody vs portrait;
- equipment icons;
- duplicate backgrounds;
- same button in multiple sizes;
- same frame with different colors;
- same logo in multiple resolutions.

## 9.10. 9-slice candidates

Для панелей/кнопок/frames определить:

- stretch-safe center;
- borders;
- corner radii/ornament;
- можно ли использовать 9-slice в Cocos;
- или лучше фиксированный sprite.

## 9.11. Texture import plan

Для каждого класса ассетов определить:

- filtering;
- mipmaps;
- wrap mode;
- compression;
- sprite frame;
- atlas eligibility;
- max texture size;
- alpha bleed risk;
- premultiplied alpha considerations.

## 9.12. Figma hierarchy

Если Figma MCP/API доступен:

- получить frame/node names;
- coordinates;
- constraints;
- text nodes;
- component instances;
- styles;
- fills;
- exports.

Если недоступен:

- не придумывать hierarchy;
- создать `FIGMA_HIERARCHY_LIMITATIONS` section;
- основывать runtime layout на визуальной реконструкции.

---

# 10. SCREEN CATALOG

Создать `docs/09_SCREEN_CATALOG.md`.

Для каждого экрана:

```markdown
# SCREEN-XXX — Name

Status: OBSERVED / INFERRED
Source: Figma asset/hash/node, gameplay capture timestamp
Reference resolution:
Orientation:
Purpose:
Entry points:
Exit points:
Persistent state shown:
Interactive elements:
Non-interactive elements:
Overlay layers:
Modal behavior:
Animations on enter:
Animations on exit:
Audio on enter:
Safe-area behavior:
Responsive rules:
Loading behavior:
Error/empty/locked states:
Related assets:
Unknowns:
```

Минимум проверить наличие/отсутствие:

- Splash / loading;
- Start / Let’s Play;
- Tutorial overlay;
- Main battle screen;
- Hero screen;
- Equipment screen;
- Summon/open screen;
- Wheel of Luck;
- Daily Bonus;
- Shop;
- Gift/Event;
- Settings;
- Battle content selection;
- boss/stage overlays;
- victory/reward popup;
- offline reward popup;
- locked feature popup;
- inventory;
- quests;
- any screens visible on Figma canvas but not in first contact sheet.

---

# 11. SCREEN STATE MATRIX

Для каждого screen не ограничиваться «normal state».

Пример main battle:

```text
MAIN_BATTLE
├── first_launch
├── tutorial_buy_prompt
├── normal_idle
├── hero_purchase_available
├── insufficient_gold
├── board_full
├── merge_available
├── auto_merge_running
├── stage_in_progress
├── boss_warning
├── boss_combat
├── stage_clear
├── stage_failed/stalled (if applicable)
├── feature_unlock
├── reward_flying
├── modal_open
├── app_paused
└── returning_from_background
```

Для каждого state указать:

- visible nodes;
- enabled inputs;
- allowed transitions;
- timers;
- audio;
- persistence;
- race conditions;
- interruption behavior.

---

# 12. REFERENCE GAME REVERSE ENGINEERING

Цель — получить **functional specification**, а не обзор игры.

## 12.1. Версия референса

Зафиксировать:

- platform;
- date;
- version, если видно;
- web/mobile;
- отличия между 2022/2024/2026 материалами.

Не смешивать старую механику с новой без маркировки.

## 12.2. Проверенные seed-факты

Официальное описание текущей игры указывает среди core features:

- merge двух героев в более сильного;
- auto-merge;
- взаимодействие «touch and buy» вместо обязательного drag;
- различные battle contents, в том числе Dragon’s Lair, Demon’s Castle, Tower of Challenge;
- idle/offline progression.

Codex должен **проверить runtime**, потому что описание магазина не раскрывает детали алгоритмов.

## 12.3. Первая сессия

Записать полностью от launch до конца tutorial:

- каждое действие пользователя;
- hand pointer / forced taps;
- какие кнопки locked;
- стоимость первой покупки;
- что появляется после покупки;
- как происходит merge;
- когда начинается бой;
- когда начисляется gold;
- какие feature unlock появляются;
- stage progression;
- popup order;
- red dots;
- freebies;
- ad prompts;
- момент появления bottom navigation.

Создать timeline:

```text
T+00:00 App start
T+...
```

## 12.4. Core loop decomposition

Не писать просто:

```text
buy → merge → battle → earn
```

Нужно определить:

- источник currency;
- spend trigger;
- purchase cost progression;
- hero tier selection logic;
- board placement rule;
- duplicate detection rule;
- merge cascade;
- auto-merge timing;
- deployed hero selection;
- combat contribution;
- stage reward;
- next stage transition;
- offline loop.

## 12.5. Input model

Проверить, что именно требуется игроку:

- tap buy;
- tap merge;
- auto merge;
- drag/drop;
- hold-to-buy;
- multi-buy;
- auto purchase;
- auto progression;
- skill activation;
- navigation taps.

Если разные версии отличаются — зафиксировать отдельно.

## 12.6. Механика merge

Обязательно измерить/описать:

- что является merge-compatible;
- нужен ли одинаковый level/tier;
- нужен ли одинаковый hero type;
- merge 2→1 или другой ratio;
- место результата;
- приоритет слотов;
- cascade behavior;
- auto-merge order;
- merge while battle continues;
- merge when board full;
- max tier;
- overflow;
- unlock requirements;
- animation lock duration;
- может ли purchase породить сразу higher tier;
- как работает «buy level»/starting tier, если присутствует;
- что происходит при одновременном появлении нескольких пар.

Создать state machine.

## 12.7. Board / slots

Для board определить:

- exact slot count;
- rows/columns;
- locked slots;
- unlock thresholds;
- occupancy rules;
- ordering;
- hero selection/highlight;
- battle-deployed vs reserve distinction;
- sell/delete behavior;
- swap behavior;
- overflow inventory, если есть.

## 12.8. Hero purchase/summon

Измерить:

- base cost;
- cost increase rule;
- currency type;
- cost reset?;
- probability/tier logic;
- purchase cooldown;
- hold behavior;
- bulk purchase;
- free purchase/ad;
- auto purchase;
- insufficient currency feedback.

## 12.9. Battle

Для боя описать:

- кто атакует;
- сколько heroes участвует одновременно;
- hero positions;
- enemy positions;
- target priority;
- attack interval;
- projectile/melee distinction;
- hit timing;
- damage formula;
- defense/armor;
- crit;
- evasion/block, если есть;
- skill effects;
- enemy attack;
- player HP/lives, если есть;
- battle loss/stall;
- respawn;
- stage timer;
- boss timer;
- invulnerability;
- damage numbers;
- health bars;
- status effects.

## 12.10. Stage progression

Измерить:

- stage notation (`1-1`, `2-100`, etc.);
- enemies per stage;
- waves;
- boss cadence;
- auto next stage;
- replay/backtracking;
- stage failure;
- reward formula;
- unlock milestones;
- world/chapter transitions.

## 12.11. Boss

Определить:

- boss appearance cadence;
- warning state;
- HP multiplier;
- timer;
- special animation;
- fail behavior;
- reward;
- retry;
- stage lock.

## 12.12. Offline progression

Нужно определить:

- максимальную offline duration;
- что симулируется: gold only или stages тоже;
- exact formula;
- whether VIP/ad multiplier exists;
- popup flow;
- timestamp storage;
- server/local time dependence;
- cap;
- claim behavior.

## 12.13. Meta systems

Для каждого обнаруженного system создать отдельную спецификацию:

- daily bonus;
- wheel;
- hero upgrades;
- equipment;
- artifact/rune/accessory;
- summons/gacha;
- quests;
- achievements;
- tower/dungeon modes;
- events;
- treasure hunt;
- battle pass;
- VIP/ad pass;
- shop/IAP;
- notifications/red dots.

Если scope MVP не включает систему — всё равно описать факт и поместить в post-MVP backlog.

---

# 13. EVIDENCE LEDGER

Создать таблицу, где **каждая важная механика имеет доказательство**.

Пример:

| ID | Claim | Status | Source | Evidence | Confidence | Needs verification |
|---|---|---|---|---|---|---|
| EV-001 | Hero purchase costs gold | OBSERVED | gameplay 00:12 | gold decreases after tap | 1.0 | no |
| EV-002 | Auto-merge prioritizes lowest tier | INFERRED | capture A | one observed cascade | 0.55 | yes |

Для video evidence использовать timestamp.
Для Figma — node/hash/screen ID.

---

# 14. UNKNOWN REGISTER

Никакое неизвестное не должно раствориться в тексте.

Формат:

| ID | Unknown | Why important | Current hypothesis | Verification method | Blocks phase | Severity |
|---|---|---|---|---|---|---|

Severity:

- BLOCKER;
- HIGH;
- MEDIUM;
- LOW;
- COSMETIC.

---

# 15. BALANCE REVERSE ENGINEERING

**Не придумывать числа только потому, что нужен JSON.**

## 15.1. Создать измерительную таблицу

Для каждого observed stage/hero tier собирать:

- hero tier;
- attack;
- attack speed;
- observed damage;
- crit;
- enemy HP;
- enemy armor, если выводимо;
- kill time;
- stage reward;
- purchase cost;
- upgrade cost;
- unlock cost;
- stage index;
- boss multiplier.

## 15.2. Повторные измерения

Если damage random:

- минимум 20 hits на sample;
- histogram;
- min/max/mean;
- crit separation.

## 15.3. Вывод формул

Проверять кандидаты:

```text
cost(n) = base * growth^n
cost(n) = round(base * growth^n)
cost(n) = piecewise(...)
attack(tier) = base * tierMultiplier^tier
enemyHp(stage) = base * stageGrowth^stage
```

Не закреплять формулу, пока samples не согласуются.

## 15.4. Precision

Отдельно определить:

- integer rounding;
- floor/ceil/round;
- display abbreviation (`K`, `M`, `B`, ...);
- internal numeric precision;
- overflow strategy.

## 15.5. Если точный баланс невозможно снять

Создать два слоя:

```text
reference_balance_observed.json
proposed_balance_v1.json
```

И никогда не смешивать их.

---

# 16. GAME DATA — ВСЁ DATA-DRIVEN

Не хардкодить баланс внутри компонентов.

Предложенная концепция:

```text
assets/game-data/
├── heroes.json
├── hero-tiers.json
├── enemies.json
├── bosses.json
├── stages.json
├── worlds.json
├── economy.json
├── merge.json
├── unlocks.json
├── equipment.json
├── rewards.json
├── quests.json
├── wheel.json
├── daily-rewards.json
├── animations.json
└── audio-events.json
```

Каждый файл должен иметь JSON Schema в `data-spec/`.

Пример hero schema concept:

```json
{
  "id": "hero_archer_01",
  "displayNameKey": "hero.archer01.name",
  "tier": 1,
  "rarity": "common",
  "attackType": "ranged",
  "baseAttack": 10,
  "attackIntervalMs": 900,
  "projectileId": "arrow_basic",
  "visualId": "hero_archer_01",
  "audioProfile": "archer",
  "animationProfile": "ranged_small"
}
```

Это **пример структуры**, не source-of-truth numbers.

---

# 17. DOMAIN GAME CORE — ОТДЕЛИТЬ ОТ COCOS

Архитектурная цель:

```text
packages/game-core (pure TypeScript)
        ↑
        │ adapters
        ↓
Cocos runtime / renderer
```

В pure game core не должно быть imports из:

- `cc`;
- Node;
- Sprite;
- Vec3;
- Tween;
- Component;
- Animation;
- ParticleSystem.

Core владеет:

- economy calculations;
- merge eligibility;
- merge result;
- hero data state;
- stage progression state;
- battle simulation rules;
- reward calculation;
- unlocks;
- save model;
- offline progression;
- quest state.

Cocos владеет:

- scenes;
- nodes;
- sprites;
- input;
- tweens;
- VFX;
- audio playback;
- camera;
- visual pooling;
- animation playback.

---

# 18. ПРЕДЛАГАЕМАЯ TECH ARCHITECTURE

Codex должен проверить/уточнить, но baseline:

```text
repo/
├── game-core/
│   ├── src/
│   │   ├── model/
│   │   ├── systems/
│   │   ├── simulation/
│   │   ├── economy/
│   │   ├── progression/
│   │   ├── save/
│   │   └── events/
│   └── tests/
│
├── cocos-game/
│   ├── assets/
│   │   ├── scenes/
│   │   ├── prefabs/
│   │   ├── scripts/
│   │   ├── art/
│   │   ├── audio/
│   │   └── game-data/
│   └── settings/
│
├── mobile-shell/
│   ├── React Native app
│   ├── android/
│   └── ios/
│
├── tools/
├── docs/
├── plans/
├── tasks/
└── analysis/
```

Если monorepo tooling усложняет Cocos import/resolution — задокументировать более простой layout.

---

# 19. REACT NATIVE + COCOS: НЕ ОТКЛАДЫВАТЬ РИСК ДО КОНЦА

Это критично.

Если конечное требование — React Native mobile application, нельзя сначала потратить недели на Cocos, а потом впервые проверять интеграцию.

## PHASE_03 обязана доказать:

### Android

Минимальный RN app:

```text
Home Screen
   ↓ tap
Cocos Game Screen
   ↓
rendering loop
   ↓ back
RN Home
```

Проверить:

- launch;
- return;
- pause/resume;
- orientation;
- lifecycle;
- sound focus;
- memory;
- bridge RN→Cocos;
- bridge Cocos→RN;
- app background/foreground;
- repeated entering/exiting game;
- process recreation.

### iOS

Аналогично:

- UIViewController/presentation lifecycle;
- engine surface;
- safe areas;
- audio session;
- background/foreground;
- bridge;
- repeated open/close.

## Сравнить 3 стратегии

### A. Full-screen native Cocos Activity / ViewController launched from RN

Плюсы:

- меньше риска вокруг surface embedding;
- игровому движку отдаётся полный экран;
- проще lifecycle.

Минусы:

- переход между RN/Cocos требует аккуратной навигации;
- bridge нужен на уровне native modules/events.

### B. Embedded Cocos native surface as RN native view

Плюсы:

- можно композиционно смешивать RN и game view.

Минусы:

- выше integration complexity;
- lifecycle/render surface issues;
- вероятно больше platform-specific кода.

### C. Cocos Web build in RN WebView

Использовать только как fallback/MVP, если native integration неприемлема.

Проверить:

- FPS;
- input latency;
- memory;
- WebView bridge;
- audio restrictions;
- app size;
- device compatibility.

После spike создать `ADR-006-RN-COCOS-BRIDGE.md` и **зафиксировать вариант**.

---

# 20. BRIDGE PROTOCOL

Даже если shell минимален, protocol проектировать заранее.

События Cocos → RN, потенциально:

```text
game.ready
game.error
game.exitRequested
progress.stageChanged
currency.changed
reward.claimed
purchase.requested
ad.rewardRequested
analytics.event
save.changed
player.levelChanged
```

Команды RN → Cocos:

```text
app.initialize
app.userChanged
app.purchaseResult
app.rewardGranted
app.pause
app.resume
app.settingsChanged
app.deepLink
app.notificationOpened
```

Каждое сообщение:

```json
{
  "version": 1,
  "type": "currency.changed",
  "requestId": null,
  "timestamp": 0,
  "payload": {}
}
```

Нужны:

- versioning;
- schema validation;
- idempotency для reward/purchase;
- error response;
- logging;
- backwards compatibility.

---

# 21. SAVE SYSTEM

Создать versioned save model.

Нельзя раскидывать `localStorage`/native storage calls по компонентам.

Нужен единый SaveRepository / adapter.

Минимальные группы:

```text
meta
player
currencies
heroes
board
progression
stages
unlocks
equipment
quests
daily
wheel
offline
settings
analytics-consent
```

Save payload:

```json
{
  "schemaVersion": 1,
  "createdAt": 0,
  "updatedAt": 0,
  "lastActiveAt": 0,
  "data": {}
}
```

Обязательно:

- atomic writes;
- debounce;
- save after important transaction;
- migration tests;
- corrupted save recovery;
- backup slot;
- reset debug command;
- deterministic defaults;
- no duplicate reward on crash/restart.

---

# 22. OFFLINE PROGRESSION

Вынести в отдельный service.

State transition:

```text
APP_BACKGROUND
  record lastActiveAt

APP_FOREGROUND
  now - lastActiveAt
  clamp duration
  calculate offline reward
  create claim state
  persist claim token
  show popup
  consume claim exactly once
```

Проверить:

- device clock rollback;
- huge future timestamp;
- timezone change;
- daylight saving;
- crash during claim;
- multiple resume events;
- no negative duration.

Если backend отсутствует — anti-tamper только best-effort.

---

# 23. GAME STATE MODEL

Не управлять всей игрой десятками несвязанных booleans.

Определить explicit state machines.

Примеры:

## AppState

```text
BOOT
LOADING
READY
PAUSED
ERROR
```

## MainBattleState

```text
ENTERING_STAGE
SPAWNING_WAVE
COMBAT
ENEMY_DEATH
REWARD
BOSS_WARNING
BOSS_COMBAT
STAGE_CLEAR
TRANSITION
```

## MergeState

```text
IDLE
PURCHASE_PENDING
SPAWNING
MERGE_SCAN
MERGING
CASCADE
BOARD_FULL
```

## PopupState

stack-based или explicit modal manager, но решение задокументировать.

---

# 24. HERO SYSTEM

Документ обязан определить data vs runtime state.

### Definition data

- hero ID;
- family/type;
- tier;
- rarity;
- base stats;
- visual profile;
- attack profile;
- projectile;
- audio profile;
- unlock.

### Runtime state

- instance ID;
- slot;
- current tier;
- buffs;
- attack cooldown;
- current target;
- animation state;
- alive/active;
- selected.

Если merge-game не требует unique instance persistence после auto-merge — упростить, но документировать.

---

# 25. MERGE / AUTO-MERGE ALGORITHM

Codex должен описать алгоритм псевдокодом после наблюдения.

Проверить как минимум варианты:

### Candidate A — first pair by slot order

```text
scan slots left→right/top→bottom
find first two equal tier
merge into deterministic destination
repeat until no pairs
```

### Candidate B — grouped tier priority

```text
find lowest/highest mergeable tier
merge pair
cascade
```

### Candidate C — purchase immediately feeds auto-merge chain

Наблюдением определить реальный.

Тестовые случаи:

- one pair;
- two disjoint pairs;
- three equal units;
- four equal units;
- cascade 1+1→2 plus existing 2;
- full board;
- purchase during animation;
- rapid tap;
- app background during merge;
- save during merge;
- max tier.

Runtime логика должна быть транзакционной: визуальная анимация не является source of truth state.

---

# 26. BATTLE SIMULATION

Battle core желательно делать deterministic при seeded RNG.

Pipeline concept:

```text
update(dt)
  cooldowns
  target acquisition
  attack intent generation
  projectile/melee resolution
  damage resolution
  death events
  rewards
  stage transition
```

Отделить:

- logical attack time;
- visual projectile travel;
- hit event timing.

Если референс наносит damage в момент визуального impact — adapter должен синхронизировать gameplay event с marker/timeline, не допуская double hit.

---

# 27. OBJECT POOLING

Планировать pooling для:

- projectiles;
- damage labels;
- hit sparks;
- coin fly icons;
- merge particles;
- common enemy visual instances при необходимости;
- temporary glows/trails.

Не создавать/уничтожать сотни Node в горячем loop.

---

# 28. VISUAL TARGET

Ключевой принцип: игра не должна выглядеть как «статический Figma screen с кликабельными картинками».

Нужно создать motion language.

## 28.1. Основные качества

- playful;
- responsive;
- fantasy;
- juicy, но не перегруженный;
- readable на маленьком portrait screen;
- каждое важное действие имеет feedback;
- эффекты не скрывают цифры и цели.

## 28.2. Timing tokens

Codex должен определить central animation tokens, например:

```text
instant: 60–90 ms
fast: 120–180 ms
normal: 220–320 ms
reward: 450–650 ms
major: 700–1200 ms
```

Это стартовый proposal, затем визуально отрегулировать.

Easing tokens:

```text
pressIn
popOut
softOut
backOut
rewardArc
shakeDecay
```

Не использовать случайные duration/easing в каждом компоненте.

---

# 29. HERO ANIMATION SPEC

Если есть полноценные sprite sheets / skeletal parts — использовать их.

Если Figma даёт только flattened transparent sprite, сделать pseudo-animation через transform layers и VFX.

Для каждого hero profile нужны состояния:

```text
idle
spawn
attack_anticipation
attack_release
attack_recover
hit
critical_reaction (optional)
death/disable (if applicable)
merge_out
merge_in
upgrade
selected
```

## 29.1. Idle

Цель: персонаж «дышит», но не плавает как UI sticker.

Варианты:

- body y ±2–4px в reference space;
- subtle scaleY/scaleX compensation;
- shadow inverse scale;
- weapon secondary lag;
- random blink only if separate eye layer exists;
- idle phase offset между несколькими героями.

Запрещено синхронно качать всех персонажей в одной фазе.

## 29.2. Attack

Sequence:

```text
anticipation
→ weapon/body windup
→ release marker
→ projectile/melee event
→ recoil
→ settle
```

У attack event должен быть marker, а не `setTimeout(317)` в gameplay code.

## 29.3. Hit

Комбинация:

- 1–2 frame color flash / material flash;
- micro knockback;
- squash/stretch;
- hit spark;
- damage label;
- optional camera micro shake for large hit.

## 29.4. Spawn

Нельзя просто `active=true`.

Proposal:

```text
opacity 0→1
scale 0.65→1.12→1
small vertical offset
spawn ring/glow
```

## 29.5. Merge

Смотри отдельный раздел.

---

# 30. ENEMY ANIMATION SPEC

Нужны:

- idle variation;
- spawn/enter;
- attack;
- hit;
- low HP signal only if reference/design supports;
- death;
- boss intro.

Для flattened creature sprite:

- squash/stretch;
- tilt;
- shadow deformation;
- directional knockback;
- death dissolve/poof/scale/fade;
- particles matching element.

Уникальные boss effects допускаются отдельным profile.

---

# 31. MERGE ANIMATION — ОБЯЗАТЕЛЬНО JUICY

Определить минимум 3 интенсивности:

- low tier;
- mid tier;
- high/milestone tier.

Baseline sequence для обычного merge:

```text
0ms      logical merge transaction already resolved or locked
0–80ms   source units compress slightly
80–180ms source visuals converge toward destination
140ms    destination glow starts
180ms    source visuals hide
180–240ms flash / radial burst
190–330ms new visual scale 0.55 → 1.18
330–430ms 1.18 → 0.96
430–500ms 0.96 → 1.0
220–550ms particles disperse
250–650ms tier/level label pop if applicable
```

Конкретные значения — `[PROPOSED]` до playtest.

Добавить:

- merge pitch sound mapping;
- haptic light;
- escalating feedback on cascade;
- screen shake only for high tier;
- no input-block longer than necessary.

При cascade нужно избежать 5 эффектов, закрывающих экран. Ввести intensity throttling.

---

# 32. COMBAT VFX

Создать VFX event catalog:

```text
vfx.hero.spawn
vfx.hero.attack
vfx.projectile.trail
vfx.hit.normal
vfx.hit.crit
vfx.enemy.death
vfx.boss.spawn
vfx.merge.low
vfx.merge.mid
vfx.merge.high
vfx.reward.coin
vfx.reward.gem
vfx.stage.clear
vfx.unlock
vfx.button.primary
```

Каждый event:

- trigger;
- location space;
- parent layer;
- duration;
- pooling yes/no;
- max concurrent;
- assets;
- color inheritance;
- performance fallback.

---

# 33. DAMAGE NUMBERS

Определить:

- normal;
- crit;
- heal;
- blocked/miss if applicable;
- boss damage.

Rules:

- object pool;
- random horizontal offset small;
- vertical rise;
- fade;
- no exact overlap of rapid hits;
- crit larger but not 3x;
- number abbreviation consistent with HUD.

---

# 34. CAMERA FEEDBACK

Portrait battle scene нуждается в очень осторожном shake.

Profiles:

```text
micro_hit
crit_hit
boss_land
merge_milestone
stage_clear
```

Shake не должен двигать fixed HUD. Разделить game camera/world layer и UI canvas/layer.

---

# 35. BACKGROUND / PARALLAX

По Figma есть большие fantasy backgrounds. Если исходный artwork flattened:

1. проверить, есть ли отдельные foreground/background variants;
2. если нет — не вырезать грубо автоматически без визуальной проверки;
3. можно создать subtle camera drift/zoom;
4. можно добавить отдельные clouds/particles/foliage overlays;
5. battle platform может иметь независимое micro motion;
6. HUD остаётся fixed.

Если layers доступны из Figma — определить parallax coefficients.

---

# 36. UI MOTION

Для каждой interactive UI category:

## Buttons

- pointer/touch down scale;
- release overshoot;
- disabled state;
- insufficient currency shake;
- optional glow pulse на primary CTA.

## Currency counters

При gain:

- fly icons;
- count tween;
- counter bump.

При spend:

- count decrement;
- short tint/scale feedback.

## Popups

Enter:

- backdrop fade;
- panel scale/slide;
- content stagger only on major popups.

Exit:

- fast, not symmetric slow reverse.

## Locked feature

- lock bounce/shake;
- requirement text;
- no dead tap.

## Red dots

- appear pulse once;
- no perpetual distracting bounce.

---

# 37. WHEEL OF LUCK

Figma явно содержит wheel screen candidate. Спецификация должна определить:

- wheel segments;
- prize mapping;
- RNG source;
- server-authoritative vs local;
- free spin cooldown;
- paid spin currency;
- spin button states;
- spin duration;
- acceleration;
- deceleration;
- exact landing behavior;
- input lock;
- result popup;
- reward transaction timing;
- crash/restart mid-spin;
- duplicate claim protection.

Animation:

```text
anticipation 150ms
accelerate 400–700ms
constant velocity optional
controlled deceleration 1.5–3s
landing tick
pointer bounce
reward burst
```

Не выбирать результат по визуальной физике. Сначала определить reward logically, затем анимировать wheel к нему.

---

# 38. DAILY BONUS

Определить:

- calendar day basis;
- reset time;
- streak or independent day;
- missed days;
- claim once;
- reward transaction;
- popup auto-open;
- red dot;
- offline return interaction.

Animation:

- chest/glow;
- reward number pop;
- coin/gem fly;
- claim button press;
- popup close only после safe reward commit.

---

# 39. HERO / EQUIPMENT SCREEN

Предварительно Figma показывает hero-oriented screen с центральным персонажем/портретом, equipment slots и stat upgrade UI.

Codex обязан точно определить:

- hero selection;
- level cap;
- displayed stats;
- equipment slot types;
- equipped/empty/locked states;
- item rarity frame;
- enhance buttons;
- currency cost;
- stat delta;
- open x1 / open x10 controls, если это действительно summon/item opening;
- navigation behavior;
- whether hero visual changes with equipment.

Не связывать визуальное оружие с stat item без доказательства.

---

# 40. AUDIO DIRECTION

Figma не содержит звука, поэтому audio spec является `[PROPOSED]`, кроме случаев, где reference audio явно измерен.

Цель: создать оригинальный sound identity в том же функциональном классе, не копируя proprietary files.

## 40.1. Audio buses

```text
Master
Music
SFX
UI
Ambience
Voice (optional)
```

## 40.2. SFX event families

### UI

```text
ui.tap.soft
ui.tap.primary
ui.popup.open
ui.popup.close
ui.tab.switch
ui.locked
ui.error.currency
ui.reward.claim
```

### Economy

```text
currency.gold.gain
currency.gold.spend
currency.gem.gain
shop.purchase
```

### Merge

```text
merge.tier.low
merge.tier.mid
merge.tier.high
merge.cascade.1
merge.cascade.2
merge.cascade.3
```

Лучше использовать pitch layers/variants, а не один repetitive sound.

### Combat

```text
hero.attack.melee
hero.attack.bow
hero.attack.magic
projectile.release
projectile.impact
hit.normal
hit.crit
enemy.death.small
enemy.death.large
boss.intro
boss.death
```

### Progression

```text
stage.clear
feature.unlock
hero.upgrade
item.equip
wheel.tick
wheel.land
chest.open
```

## 40.3. Music

Минимум:

- main/battle loop;
- menu/meta loop, если screen flow требует;
- boss intensity layer optional.

Music должна loop seamlessly.

## 40.4. Ambience

Fantasy environment:

- subtle wind;
- distant birds/water/magic;
- не перегружать телефонный speaker range.

## 40.5. Mix rules

Определить:

- target loudness relationships;
- max concurrent hits;
- same-sample cooldown;
- ducking на major reward/boss;
- mute in background;
- respect OS audio focus;
- settings persisted.

## 40.6. Acquisition plan

Для каждого отсутствующего audio event указать:

- create internally;
- generated sound;
- licensed library;
- record/custom design;
- placeholder policy.

Не оставлять «TODO звук потом» без event ID.

---

# 41. HAPTICS

Если RN/native shell позволяет:

Profiles:

- button primary: light;
- merge: light/medium by tier;
- crit: very subtle, not every rapid hit;
- boss intro: medium once;
- major reward: success pattern;
- error: warning.

Обязательно:

- global toggle;
- accessibility consideration;
- rate limiting;
- no vibration spam.

---

# 42. RESPONSIVE / PORTRAIT LAYOUT

Reference design в основном portrait.

Создать canonical design coordinate space, например фактический Figma frame size, а не случайные dp.

Определить:

- reference width/height;
- scaling mode;
- safe area top/bottom;
- aspect ratio extremes;
- tablets;
- notches;
- Android nav area;
- iPhone Dynamic Island/notch;
- web desktop pillarboxing;
- input outside game canvas.

Группы UI:

```text
TOP_SAFE_HUD
BATTLE_WORLD
STAGE_HUD
MERGE_BOARD
BOTTOM_NAV
MODAL_LAYER
TOAST_LAYER
DEBUG_LAYER
```

Не масштабировать весь UI одной картинкой.

---

# 43. ASSET IMPORT RULES

Перед import в Cocos semantic assets должны иметь стабильные имена.

Пример:

```text
art/
├── backgrounds/
├── characters/heroes/
├── characters/enemies/
├── equipment/weapons/
├── equipment/armor/
├── equipment/accessories/
├── ui/buttons/
├── ui/panels/
├── ui/icons/
├── ui/frames/
├── currencies/
├── rewards/
├── vfx/
└── branding/
```

Naming:

```text
hero_lion_knight_full.png
hero_lion_knight_portrait.png
enemy_boar_01.png
ui_button_primary_orange.png
ui_panel_gold_large.png
currency_gold_coin.png
```

Нельзя оставлять production references на raw Figma hash names.

`asset_source_map.json` должен сохранять связь semantic name ↔ Figma internal hash/node.

---

# 44. SPRITE ATLASES / TEXTURE BUDGET

Codex должен составить план, а не бездумно сложить всё в один atlas.

Группировать по usage lifetime:

```text
core_ui
battle_common
hero_portraits
hero_fullbody_group_X
equipment_icons
meta_daily_wheel
```

Не тащить wheel assets в память battle screen без необходимости.

Зафиксировать:

- max atlas size;
- expected texture memory;
- compression by platform;
- high-res/low-res variants if needed;
- alpha texture cost;
- unload strategy.

---

# 45. PERFORMANCE BUDGET

Цели определить после device matrix, но baseline:

- 60 FPS target на mid-range phones;
- допустимый 30 FPS fallback только если продуктовая цель это разрешает;
- стабильный frame time;
- отсутствие allocation spikes в battle loop;
- ограниченное количество active particles;
- pooled projectiles/labels;
- controlled draw calls;
- texture memory budget;
- no synchronous heavy load during battle.

План измерений:

- empty scene baseline;
- static main screen;
- normal battle;
- merge cascade stress;
- boss + particles;
- rapid reward spam;
- repeated screen switching;
- 30 min soak;
- background/resume.

---

# 46. ANALYTICS EVENT PLAN

Даже если analytics backend пока не подключается, определить semantic events:

```text
session_start
session_end
tutorial_step
hero_purchase
hero_merge
hero_tier_reached
stage_start
stage_clear
boss_start
boss_clear
feature_unlock
currency_earned
currency_spent
upgrade
wheel_spin
daily_claim
offline_claim
screen_view
error
```

Не логировать PII без необходимости.

Analytics не должна быть зависимостью game logic.

---

# 47. DEBUG / DEVELOPER TOOLS

Запланировать debug panel:

- add gold/gems;
- jump stage;
- spawn hero tier;
- force merge setup;
- kill enemy;
- spawn boss;
- simulate offline X hours;
- reset save;
- export save;
- import save;
- toggle FPS;
- toggle hitboxes/anchors;
- animation speed 0.25/0.5/1/2x;
- mute buses;
- force daily available;
- force wheel reward.

Debug tools должны быть disabled/stripped in production.

---

# 48. TEST STRATEGY

## 48.1. Pure game-core unit tests

Обязательно:

- merge eligibility;
- merge cascade;
- purchase transaction;
- insufficient currency;
- stage reward;
- damage formula;
- crit RNG seeded;
- boss transition;
- unlock;
- offline clamp;
- save migration;
- wheel reward idempotency;
- daily claim idempotency.

## 48.2. Simulation tests

Запустить thousands of simulated progressions без renderer:

- no deadlock;
- no negative currency;
- no impossible stage state;
- progression monotonic where expected;
- economy curves;
- merge board never violates invariant.

## 48.3. Cocos integration tests/manual harness

- visual spawn;
- event adapter;
- projectile hit synchronization;
- pool reuse;
- scene transition;
- pause/resume.

## 48.4. Visual regression

Для ключевых screen states хранить golden screenshots.

Сравнивать:

- reference resolution;
- at least 2 narrow/tall devices;
- tablet.

Допустимый pixel threshold определить отдельно; artwork animations замораживать debug flag.

## 48.5. Mobile integration

- Android physical device;
- iOS physical device;
- RN→Cocos→RN 50 cycles;
- background/foreground;
- calls/interruptions/audio focus;
- low memory;
- orientation lock;
- cold start;
- warm start.

---

# 49. ACCESSIBILITY / USABILITY

Хотя это arcade/idle game:

- minimum touch targets;
- avoid critical info only by color;
- settings for music/SFX/haptics;
- reduced motion option if feasible;
- readable numbers;
- no important text under safe area;
- avoid seizure-like flashing;
- cap flash intensity/frequency.

---

# 50. ERROR HANDLING

Определить behavior для:

- missing asset;
- corrupt config;
- invalid save;
- failed native bridge;
- purchase callback timeout;
- ad reward failure;
- web preview unsupported native feature;
- audio unavailable;
- app resume with stale state.

Production не должен silently continue with broken economy state.

---

# 51. IMPLEMENTATION PHASES — ОБЩАЯ ЛОГИКА

Ниже — не замена фазовым документам, а обязательный high-level порядок.

## PHASE 00 — Repository & Analysis Foundation

Цель:

- понять исходное состояние;
- создать analysis workspace;
- настроить правила документации;
- не менять gameplay.

DoD:

- repo inventory;
- source files mapped;
- `.fig` найден;
- tooling plan создан.

## PHASE 01 — Reference Reverse Engineering

Цель:

- reconstruct actual game behavior.

DoD:

- capture plan;
- evidence ledger;
- core loop;
- screen list;
- gameplay state machines;
- unknowns with verification methods.

## PHASE 02 — Figma & Asset Pipeline

Цель:

- превратить 231MiB design dump в контролируемый asset catalog.

DoD:

- reproducible extraction;
- asset manifest;
- contact sheets;
- duplicates;
- semantic map;
- screen reconstruction;
- import plan.

## PHASE 03 — Native Integration Spike

Цель:

- доказать mobile architecture **до** большой реализации.

DoD:

- RN shell launches Cocos on Android;
- equivalent iOS path proven;
- bi-directional message;
- pause/resume;
- ADR decision.

Если iOS environment недоступен локально, должен быть compile-ready plan + отдельно flagged blocker. Нельзя писать «доказано» без build/run.

## PHASE 04 — Project Foundation

- game-core;
- Cocos project;
- config loading;
- event bus;
- save interface;
- test harness;
- debug overlay;
- screen coordinate system.

## PHASE 05 — Static Vertical Slice

Собрать main screen **из semantic Figma assets**, без полной логики.

Проверить:

- composition;
- anchors;
- safe area;
- layering;
- screen match;
- asset quality;
- memory.

## PHASE 06 — Core Game State

- boot;
- game state;
- currencies;
- transaction API;
- stage skeleton;
- hero state;
- save skeleton.

## PHASE 07 — Hero Purchase & Merge

Сначала exact rules, затем UI.

DoD:

- purchase transaction;
- board placement;
- merge;
- cascade;
- auto-merge;
- full board;
- visual sync;
- tests.

## PHASE 08 — Battle Loop

- hero attacks;
- enemies;
- target;
- damage;
- projectiles;
- death;
- reward;
- next enemy;
- pooling.

## PHASE 09 — Stage & Boss Progression

- stage waves;
- boss;
- progression;
- fail/stall;
- rewards;
- unlocks.

## PHASE 10 — Hero Progression & Equipment

Только системы, подтверждённые scope/reference.

## PHASE 11 — Meta Screens

- daily;
- wheel;
- shop;
- quests;
- settings;
- content modes;
- hero screen.

Разбить на subphases по dependency.

## PHASE 12 — Save & Offline

Хотя interfaces создаются раньше, здесь production-hardening:

- migrations;
- resume;
- offline reward;
- crash safety;
- corruption recovery.

## PHASE 13 — Animation/VFX/Haptics

Важно: базовый feedback идёт раньше, но здесь полный polish pass.

## PHASE 14 — Audio

- original SFX;
- music;
- mix;
- concurrency;
- lifecycle.

## PHASE 15 — Balance & Content

- observed balance import;
- proposed adjustments;
- stage data;
- hero data;
- automated simulations.

## PHASE 16 — RN Production Integration

- final bridge;
- app shell;
- native lifecycle;
- settings/payments/analytics hooks as required.

## PHASE 17 — Optimization

- textures;
- atlases;
- pooling;
- draw calls;
- memory;
- loading;
- low-end fallbacks.

## PHASE 18 — QA

- full regression;
- device matrix;
- visual regression;
- long session;
- saves;
- offline;
- edge cases.

## PHASE 19 — Release

- versioning;
- Android/iOS builds;
- store assets if scope;
- privacy/settings;
- crash logging;
- release checklist.

## PHASE 20 — Post-release

- telemetry review;
- balance updates;
- additional content;
- live events only if desired.

---

# 52. VERTICAL SLICE DEFINITION

Vertical slice должен доказать качество игры раньше, чем будет реализована вся мета.

Минимальный slice:

```text
launch
→ main battle screen
→ initial currency
→ buy hero
→ hero appears
→ auto-merge / merge according to reference
→ active hero contributes to combat
→ enemy takes damage
→ enemy dies
→ reward flies to counter
→ stage advances
→ boss appears
→ boss dies
→ reward/progression persists
→ close app
→ reopen
→ state restored
```

Плюс:

- Figma visuals;
- baseline animation;
- baseline SFX placeholders;
- stable 60 FPS target;
- mobile input;
- browser preview.

До доказательства этого slice не тратить недели на secondary shop/event screens.

---

# 53. MVP VS FULL PARITY

Создать feature matrix:

| Feature | Reference has | Figma has | MVP | Full parity | Post-launch | Evidence |
|---|---:|---:|---:|---:|---:|---|

Нельзя автоматически считать, что всё современное содержимое HEROES UNITE необходимо в первом релизе.

Разделить:

### P0 Core

- purchase/summon;
- merge/auto merge;
- battle;
- stages;
- boss;
- currencies;
- save;
- offline;
- main HUD.

### P1 Core meta

- hero progression;
- equipment;
- daily;
- wheel;
- quests;
- feature unlocks.

### P2 Extended content

- alternative battle modes;
- events;
- advanced rarity/summon systems;
- artifacts;
- battle pass etc.

Но реальный список формировать по evidence.

---

# 54. FIDELITY RULES

Для каждого элемента выбрать один режим:

- `REFERENCE_EXACT` — намеренно повторяем observed behavior;
- `FIGMA_EXACT` — визуал должен совпасть с Figma;
- `FUNCTIONAL_EQUIVALENT` — та же функция, визуал адаптирован;
- `IMPROVED` — сознательное улучшение;
- `PLACEHOLDER` — временно;
- `OUT_OF_SCOPE`.

Это снимает конфликт «точно как игра» vs «точно как Figma», если они различаются.

---

# 55. CONFLICT RESOLUTION: FIGMA VS REFERENCE GAME

Если Figma и референс расходятся:

1. не выбирать молча;
2. зарегистрировать conflict ID;
3. определить тип:
   - visual;
   - interaction;
   - navigation;
   - content;
   - economy;
4. baseline правило:
   - **визуал** → Figma;
   - **core gameplay behavior** → observed reference;
   - **отсутствующий в Figma runtime feedback** → proposed animation/VFX;
5. если конфликт влияет на продуктовую механику — вынести в decision doc.

---

# 56. ANIMATION MATRIX

Создать таблицу для **каждого screen/component**:

| Event | Trigger | Visual target | Animation | Duration | Easing | VFX | SFX | Haptic | Interruptible | Pool |
|---|---|---|---|---:|---|---|---|---|---|---|

Нельзя оставить компоненты без motion decision.

Минимальные triggers:

- screen enter/exit;
- button press;
- tab select;
- purchase success/fail;
- hero spawn;
- merge start/result/cascade;
- attack;
- projectile;
- hit;
- crit;
- enemy death;
- boss spawn/death;
- reward;
- currency update;
- feature unlock;
- popup open/close;
- daily claim;
- wheel spin/land;
- equipment equip/upgrade;
- insufficient currency;
- locked action.

---

# 57. AUDIO EVENT MATRIX

Аналогично animation matrix:

| Event ID | Trigger | Category | Variants | Pitch random | Gain | Cooldown | Max concurrent | Duck | Source status |
|---|---|---|---:|---|---:|---:|---:|---|---|

`Source status`:

- placeholder;
- custom needed;
- licensed;
- generated;
- final.

---

# 58. ASSET GAP ANALYSIS

После Figma audit создать список того, чего **не хватает** для качественной runtime-анимации.

Категории:

- missing VFX;
- missing shadows;
- missing projectiles;
- missing hit effects;
- missing background layers;
- missing button states;
- missing disabled states;
- missing locked states;
- missing particles;
- missing icon variations;
- missing hero body parts;
- missing audio;
- missing fonts/license;
- missing loading art.

Для каждого gap:

```text
can derive from existing asset?
needs new design?
can generate procedurally?
can create with Cocos primitives?
needs image generation?
priority?
```

Не искажать исходный арт автоматической нарезкой, если качество плохое.

---

# 59. FONT / TEXT AUDIT

Определить:

- какие тексты baked into images;
- какие должны быть runtime text;
- font family;
- weight;
- outline/stroke;
- shadow;
- localization needs;
- numeric font;
- missing font files;
- licensing.

Если точный font неизвестен — не подменять случайным silently.

Создать fallback recommendation.

---

# 60. LOCALIZATION READINESS

Даже если первая версия English-only:

- UI text не хардкодить в sprite, если он должен меняться;
- string keys;
- pluralization;
- number formats;
- abbreviations;
- layout expansion;
- Korean/English/Russian potential only if product scope.

Baked logo text остаётся artwork.

---

# 61. NUMBER FORMATTER

Idle game требует отдельный форматтер.

Определить:

- `<1000`;
- K/M/B/T...;
- significant digits;
- rounding;
- very large numbers;
- scientific fallback;
- consistent display across HUD/popups.

Не использовать разные formatters в разных screens.

---

# 62. CURRENCY TRANSACTIONS

Любое изменение currency — через transaction system.

Пример conceptual API:

```ts
spend(currency, amount, reason): Result
grant(currency, amount, reason): TransactionId
```

Нужно:

- atomicity;
- insufficient check;
- reason code;
- analytics hook;
- save trigger;
- duplicate reward protection.

---

# 63. REWARD PIPELINE

Разделить:

1. calculate reward;
2. commit reward to state;
3. persist;
4. emit reward event;
5. animate icons;
6. update counter.

Не делать source of truth зависимым от окончания animation.

Если animation interrupted, reward уже должен быть корректно начислен.

---

# 64. TUTORIAL

Если референс использует hand pointer, forced taps и unlock sequence, сделать data-driven tutorial steps.

Каждый step:

```text
id
gate condition
target UI element
allowed inputs
hand position
message
completion event
skip allowed?
persist flag
```

Тестировать:

- app close during tutorial;
- target missing;
- feature already unlocked;
- tutorial version migration.

---

# 65. RED DOT / NOTIFICATION SYSTEM

Не вычислять red dots вручную каждым screen.

Создать notification rules:

```text
hasDailyClaim
hasWheelFreeSpin
hasHeroUpgrade
hasEquipmentAction
hasQuestReward
hasGift
```

Aggregate для bottom tabs.

---

# 66. SCENE / UI LAYERING

Предлагаемый logical hierarchy main scene:

```text
GameRoot
├── WorldLayer
│   ├── Background
│   ├── ParallaxBack
│   ├── BattlePlatform
│   ├── EnemyLayer
│   ├── HeroBattleLayer
│   ├── ProjectileLayer
│   └── WorldVfxLayer
├── HudLayer
│   ├── CurrencyHud
│   ├── StageHud
│   └── ContextButtons
├── MergeLayer
│   ├── Board
│   ├── HeroSlots
│   └── MergeVfx
├── NavigationLayer
├── ModalLayer
├── RewardOverlay
├── ToastLayer
└── DebugLayer
```

Точная hierarchy зависит от Figma/layout.

---

# 67. INPUT ROUTING

Определить central input policy:

- modal blocks lower layers;
- reward animations generally do not block;
- merge input and navigation conflicts;
- multi-touch;
- rapid tap debounce only где необходимо;
- no global `inputLocked` boolean без owner/reason.

Use lock tokens/reasons, если нужны:

```text
inputLock.acquire("wheel_spin")
inputLock.release(...)
```

---

# 68. EVENT BUS

Event bus полезен, но не превращать всё в скрытые string events.

Требования:

- typed events;
- ownership;
- unsubscribe lifecycle;
- debug tracing optional;
- no circular cascade.

Game core events отделить от view events.

---

# 69. CONFIG VALIDATION

На boot dev build должен валидировать JSON schemas.

Ошибки:

- duplicate IDs;
- missing asset reference;
- invalid stage hero ref;
- negative cost;
- missing localization key;
- animation profile not found.

Production behavior определить отдельно.

---

# 70. CONTENT PIPELINE

Чтобы добавление героя не требовало 10 ручных правок:

1. add art;
2. add hero config;
3. add visual profile;
4. add optional audio profile;
5. validation catches missing refs;
6. hero appears in debug catalog.

То же для enemy/equipment.

---

# 71. BALANCE TOOLING

Создать CLI/scripts, а не обязательно отдельный React dashboard на первом этапе.

Минимум:

```text
simulate-progress
simulate-battle
print-cost-curve
print-stage-curve
validate-economy
```

Outputs CSV/JSON/markdown.

Позже dashboard optional.

---

# 72. GOLDEN PATH TEST

Описать один полный сценарий, который должен всегда проходить:

```text
fresh install
→ tutorial
→ first hero purchase
→ first merge
→ first enemy kill
→ first stage clear
→ first boss
→ first unlock
→ close app
→ wait/simulate offline
→ reopen
→ claim offline reward
→ upgrade hero
→ claim daily
→ spin wheel if unlocked
```

Для каждого шага expected state before/after.

---

# 73. EDGE-CASE MATRIX

Обязательно планировать:

### Economy

- exactly enough gold;
- 1 less than cost;
- huge currency;
- rapid purchases.

### Merge

- board full;
- max tier;
- cascade;
- concurrent purchase.

### Battle

- enemy dies same tick as next attack;
- two projectiles hit dead enemy;
- boss transition with pending projectile;
- pause during projectile.

### Save

- crash after reward commit before animation;
- corrupted JSON;
- old schema;
- empty save.

### Lifecycle

- home button during wheel spin;
- background during boss;
- screen lock;
- RN navigation while Cocos event pending.

---

# 74. SECURITY / PURCHASES / ADS — ТОЛЬКО ЕСЛИ В SCOPE

Если monetization требуется:

- purchase verification;
- idempotency;
- restore purchases;
- rewarded ad callback integrity;
- never grant reward only because UI says success;
- separate adapter from game-core.

Если monetization не нужна MVP — интерфейсы/stubs можно описать, но не реализовывать.

---

# 75. CI / BUILD

План должен учитывать:

- lint TypeScript;
- game-core tests;
- config validation;
- asset manifest validation;
- Cocos build automation feasibility;
- RN Android build;
- RN iOS build;
- version info;
- artifact naming;
- debug/release env separation.

Не создавать сложный CI раньше, чем подтверждены реальные build commands.

---

# 76. VERSIONING

Версионировать независимо:

- app version;
- save schema version;
- bridge protocol version;
- game-data version;
- asset manifest version.

---

# 77. CODE STYLE RULES ДЛЯ БУДУЩЕЙ РЕАЛИЗАЦИИ

Записать в `CODEX_EXECUTION_RULES.md`.

Минимум:

- TypeScript strict;
- no `any` без justification;
- no giant God `GameManager`;
- no balance constants inside UI scripts;
- no raw asset hash paths in gameplay code;
- no direct storage calls outside save adapter;
- no setTimeout-based combat timing when engine/timeline event is appropriate;
- no duplicate number formatting;
- no duplicate currency mutation logic;
- no magic z-index/layer numbers without enum/token;
- no silent catch;
- no production placeholders unnoticed;
- no dead code «на потом»;
- all critical state transitions testable.

---

# 78. DOCUMENT CROSS-LINKING

Все docs должны ссылаться друг на друга относительными links.

`00_INDEX.md` — центральная карта.

Для каждой subsystem spec указать:

- related screens;
- related assets;
- related data schemas;
- related phase;
- related tasks;
- evidence IDs;
- unknown IDs.

---

# 79. CONSISTENCY PASS

После генерации всех docs Codex обязан выполнить отдельный review.

Проверить:

1. одинаковые названия currencies;
2. одинаковые hero tier terms;
3. одинаковая stage notation;
4. нет двух разных save models;
5. нет конфликтующих merge rules;
6. animation IDs совпадают;
7. audio IDs совпадают;
8. asset semantic names совпадают;
9. phase dependencies ацикличны;
10. task dependencies существуют;
11. P0 features имеют tasks;
12. каждый major unknown имеет verification task;
13. каждый observed system имеет spec;
14. каждый Figma screen имеет mapping;
15. каждый используемый asset имеет semantic mapping;
16. no orphan docs;
17. no orphan tasks;
18. native integration risk закрывается рано.

Создать `analysis/reports/planning_consistency_report.md`.

---

# 80. НЕЛЬЗЯ СЧИТАТЬ PLANNING COMPLETE, ЕСЛИ...

Не создавать `PLANNING_COMPLETE.md`, если:

- `.fig` не проанализирован хотя бы на asset level;
- отсутствует asset manifest;
- отсутствует screen catalog;
- core loop основан только на предположениях без evidence tags;
- нет reference capture plan;
- merge algorithm не описан или не отмечен unknown;
- battle loop не описан;
- save/offline не описан;
- RN/Cocos integration не имеет отдельного раннего spike plan;
- animations сведены к «добавить анимации»;
- audio сведено к «подобрать звуки»;
- нет performance budget;
- нет QA matrix;
- нет атомарных tasks;
- phase execution order не определён;
- остаются BLOCKER unknowns без конкретного метода проверки.

---

# 81. PLANNING_COMPLETE.md — ОБЯЗАТЕЛЬНЫЙ ФОРМАТ

Финальный файл должен содержать:

```markdown
# Planning Complete

## Summary
## Repository analyzed
## Figma analyzed
- file
- embedded asset count
- screens identified
- semantic assets mapped
- unresolved asset gaps

## Reference game analyzed
- version/platform/date
- captures used
- confidence

## Docs generated
## Plans generated
## Atomic tasks generated
## P0 task count
## P1 task count
## P2 task count

## Confirmed core mechanics
## Inferred mechanics
## Major proposed improvements
## Blockers
## High-priority unknowns
## Architecture decisions
## RN/Cocos integration decision status
## Vertical slice scope
## MVP scope
## Recommended first implementation task

## STOP
Planning mission is complete. Production implementation has NOT started.
```

---

# 82. ПОДРОБНО: ЧТО CODEX ДОЛЖЕН ИЗУЧИТЬ В ТЕКУЩЕЙ FIGMA

При визуальном аудите специально искать и семантически классифицировать:

## Branding

- Merge Heroes Unite War logo variants;
- start screen composition;
- promotional/banner art;
- CTA button styles.

## Backgrounds

- floating-island bright battlefield;
- forest/blue fantasy environment;
- platform/arena variants;
- wide battle backdrop strips;
- dark/purple dungeon strips;
- fire/orange dungeon strips;
- green forest dungeon strips;
- blue/ice dungeon strips.

## Heroes / character candidates

Видны стилистические классы вроде:

- lion knight;
- green archer/elf;
- panda fighter;
- blue mage/cat;
- raccoon engineer;
- fairy/ice/light character;
- purple rogue/bunny-like character;
- turtle/green tank;
- fire/demon character.

**Не считать эти descriptive names финальными IDs.** Использовать их только для первичной классификации, затем выбрать стабильные semantic IDs.

## Enemies

Видны кандидаты:

- boar;
- goblin;
- crocodile/lizard;
- shadow wolf;
- slime;
- mushroom shaman;
- dark armored monster;
- gargoyle;
- ice beast;
- fire dragon;
- shadow demon/boss.

Создать enemy asset group mapping.

## Equipment

Видны многочисленные:

- swords;
- staffs;
- bows;
- hammers;
- daggers;
- armor/chest;
- pants;
- boots;
- helmets;
- rings;
- accessories/amulets;
- elemental/fire/ice/green themed sets.

Определить, какие наборы визуально принадлежат hero archetypes/rarities.

## UI

- orange primary buttons;
- blue/purple circular frames;
- gold frame panels;
- dark blue panels;
- triangular blue gem-like control;
- settings gear;
- upgrade arrow;
- sword/battle icon;
- chest;
- gift;
- wheel;
- hourglass;
- crown;
- shield/emblems;
- currency icons.

## Screens visually visible in preliminary audit

- Start / Let’s Play;
- main Battle/Merge;
- hero/equipment/open screen;
- Wheel of Luck;
- Daily Bonus;
- clean background references.

Codex должен найти **все остальные** screen states на canvas, а не остановиться на этих пяти.

---

# 83. STATIC SCREEN RECONSTRUCTION METHOD

Перед runtime implementation для каждого ключевого Figma screen создать reconstruction spec:

1. screenshot reference;
2. reference dimensions;
3. region segmentation;
4. list of source assets;
5. text styles;
6. anchors;
7. normalized positions;
8. responsive behavior;
9. overlay order;
10. interaction map.

Region example:

```text
0–10% height    currency/settings HUD
10–18%          stage progress / boss HUD
18–53%          battle world
53–80%          merge board
80–100%         bottom nav / purchase area
```

Это лишь пример. Codex должен измерить фактические ratios по макету.

---

# 84. PIXEL / LAYOUT MEASUREMENT

Для Figma screen raster можно программно измерять:

- element bounding boxes;
- spacing;
- margins;
- button sizes;
- positions relative to screen;
- content scale.

Но не делать fragile pixel-perfect абсолютные координаты для всех устройств.

Хранить:

- reference layout coordinates;
- runtime anchors/constraints.

---

# 85. VISUAL COMPARISON HARNESS

Запланировать dev mode:

- capture current game screenshot at reference resolution;
- overlay Figma screenshot 50% opacity;
- difference image;
- optional edge comparison.

Использовать для static layout parity.

Не пытаться pixel-compare animated battle frame без freeze mode.

---

# 86. ANIMATION FREEZE / DEBUG MODE

Для visual regression:

- deterministic idle phase;
- freeze timers;
- fixed RNG seed;
- disable particles;
- fixed currency values;
- fixed hero/enemy lineup.

Это позволит стабильно сравнивать экран.

---

# 87. SOUND CREATION BRIEFS

Для каждого финального SFX создать короткий production brief.

Пример:

```text
ID: merge.tier.low
Length: 220–380 ms
Character: bright magical pop + soft metallic sparkle
Transient: medium
Low end: minimal
Pitch variants: 3
Avoid: harsh glass, cartoon boing
Must layer well during cascade
```

Пример crit:

```text
ID: hit.crit
Length: 120–220 ms
Character: stronger impact, crisp transient, short magic tail
Must be distinguishable from normal hit without being 2x louder
```

---

# 88. MUSIC BRIEFS

Main battle music:

- upbeat fantasy;
- unobtrusive loop;
- supports idle repetition;
- no exhausting lead melody every 8 bars;
- loop 60–120s or layered variation;
- mobile speaker friendly;
- leave space for SFX.

Boss layer:

- optional percussion/intensity layer;
- transition on boss warning;
- smooth return after clear.

---

# 89. AUDIO TECH RULES

- preload only frequent short SFX;
- stream/appropriate load strategy for music;
- avoid decoding huge audio on battle start;
- voice limit;
- random variants;
- pitch jitter within bounded range;
- same-sound cooldown;
- audio settings stored;
- pause/resume with app lifecycle.

---

# 90. LOW-END DEVICE FALLBACK

Если performance ниже бюджета:

Quality tiers:

```text
HIGH
MEDIUM
LOW
```

Потенциально уменьшать:

- particle count;
- trail density;
- background effects;
- shadow effects;
- screen-space shaders.

Не ухудшать:

- input responsiveness;
- core animation timings;
- readability;
- gameplay simulation correctness.

---

# 91. WEB PREVIEW

Browser preview — основной быстрый feedback loop, но **не считать его эквивалентом native**.

В web preview проверять:

- gameplay logic;
- layout;
- animation;
- most VFX;
- save adapter web version;
- debug tools.

На native отдельно:

- touch latency;
- safe area;
- audio focus;
- memory;
- lifecycle;
- haptics;
- bridge;
- platform texture behavior.

---

# 92. DON'T BUILD REACT WEB PROTOTYPE TO THROW AWAY

Не создавать отдельную полноценную React DOM игру только ради browser testing.

Если нужен tooling dashboard — React допустим отдельно.

Основной gameplay preview должен идти из Cocos Web Preview/Build, чтобы не реализовывать визуальный layer дважды.

---

# 93. RN SHELL SCOPE

Если RN нужен формально, shell должен содержать только то, что оправдано вне игрового runtime.

Возможные RN responsibilities:

- app bootstrap;
- account/auth, если появится;
- push;
- deep links;
- native purchases;
- ads SDK;
- privacy/consent;
- analytics SDK bridge;
- settings outside game, если нужно;
- navigation to/from Cocos runtime.

Не переносить battle/merge UI в RN без необходимости.

---

# 94. FLUTTER FALLBACK

Flutter не использовать одновременно с RN.

Если проектное требование реально допускает Flutter вместо RN и native Cocos integration окажется чрезмерно сложной, можно создать отдельный ADR:

```text
Cocos+RN vs Flutter+Flame
```

Но нельзя молча менять стек.

При выбранном baseline этого master plan:

```text
Cocos + TypeScript + React Native shell
```

является предпочтительным вариантом до результата spike.

---

# 95. CRITICAL INVARIANTS

Зафиксировать invariants, которые тестируются всегда.

Примеры:

- currency never becomes negative;
- reward transaction applied once;
- one board slot contains max one unit;
- merged source units cease to exist logically;
- result tier is valid;
- dead enemy cannot receive state-changing duplicate death reward;
- stage reward applied once;
- save schema version known;
- daily claim once per period;
- wheel reward once per spin token;
- RN bridge request with same idempotency key cannot grant twice.

---

# 96. RACE CONDITIONS TO DESIGN OUT

Особенно проверить:

- rapid buy taps;
- buy while merge cascade;
- navigation during reward animation;
- pause during merge;
- app background during save;
- two projectiles kill same enemy;
- stage changes while VFX from previous stage alive;
- wheel result + app close;
- daily claim double tap;
- offline reward + resume event twice.

---

# 97. ASSET OWNERSHIP / LICENSE LEDGER

Создать lightweight ledger:

```text
asset id
source
owner/license status
allowed in production?
notes
```

Figma assets считать user-provided, но не делать юридических предположений о лицензии. Просто отметить источник.

Original new audio/VFX asset sources тоже записывать.

---

# 98. PLAN QUALITY BAR

Хороший план должен позволять агенту ответить на вопросы **до кода**:

- что происходит, когда игрок тапает Buy 20 раз подряд?
- куда ставится новый герой?
- что если board полный?
- когда именно снимается gold?
- когда происходит merge?
- как определяется порядок cascade?
- какой герой атакует?
- что происходит с projectile, если цель умерла?
- когда начисляется reward?
- может ли animation быть прервана?
- что сохраняется при закрытии?
- что делает offline progression?
- какие assets используются на каждом screen?
- какой SFX звучит на каждом event?
- какой animation profile используется?
- что происходит на narrow iPhone и tall Android?
- как Cocos возвращается в RN?

Если документация не отвечает — план неполон.

---

# 99. ПОРЯДОК РАБОТЫ CODEX В ЭТОМ ОДНОМ PLANNING RUN

Выполнять строго:

## Pass 1 — Discovery

1. repo inventory;
2. locate user sources;
3. identify tooling;
4. create project scope.

## Pass 2 — Figma raw audit

1. safe copy/extract;
2. metadata;
3. images;
4. dimensions;
5. contact sheets;
6. duplicates;
7. screen candidates;
8. preliminary categories.

## Pass 3 — Reference research

1. version/date;
2. store descriptions;
3. gameplay captures;
4. tutorial;
5. core loop;
6. screen flows;
7. mechanics;
8. measurements.

## Pass 4 — Evidence model

1. evidence ledger;
2. unknown register;
3. conflicts Figma/reference;
4. confidence levels.

## Pass 5 — Semantic Figma map

1. screen IDs;
2. asset names;
3. usage mapping;
4. gaps;
5. import rules.

## Pass 6 — Game design specs

1. core loop;
2. state;
3. heroes;
4. merge;
5. battle;
6. stages;
7. progression;
8. meta;
9. offline.

## Pass 7 — Technical design

1. game core;
2. Cocos adapters;
3. save;
4. pooling;
5. assets;
6. data schemas;
7. debug tooling;
8. RN integration.

## Pass 8 — Visual/audio design

1. animation profiles;
2. VFX;
3. UI motion;
4. haptics;
5. audio events;
6. music briefs;
7. missing asset list.

## Pass 9 — QA/performance/release

1. test matrix;
2. device matrix;
3. visual regression;
4. performance budget;
5. build/release.

## Pass 10 — Plans

1. phases;
2. dependencies;
3. critical path;
4. tasks;
5. acceptance criteria.

## Pass 11 — Consistency review

Cross-check everything.

## Pass 12 — Final planning report

Create `PLANNING_COMPLETE.md` and stop.

---

# 100. ЕСЛИ НЕТ ИНТЕРНЕТА ИЛИ НЕЛЬЗЯ ЗАПУСТИТЬ РЕФЕРЕНС

Не блокировать весь planning run.

Сделать:

1. Figma audit полностью;
2. source list;
3. game logic based on known/visible materials с тегами;
4. `REFERENCE_CAPTURE_PLAN.md` с точными действиями, которые нужно сделать позже;
5. `UNKNOWN` для недоказанного;
6. implementation phases можно планировать с gate conditions.

Например:

```text
Gate before TASK-0712:
AUTO_MERGE_ORDER must move from UNKNOWN to OBSERVED/MEASURED.
```

---

# 101. ЕСЛИ МОЖНО ЗАПУСТИТЬ РЕФЕРЕНС В БРАУЗЕРЕ

Использовать controlled capture session.

Для каждого действия:

- до input screenshot;
- input;
- после input screenshot;
- currency before/after;
- stage before/after;
- board before/after;
- timing;
- video timestamp.

Не нужно делать OCR на каждом кадре. Использовать ручное/визуальное чтение и выборочные measurements.

---

# 102. REFERENCE CAPTURE DATA FORMAT

`analysis/reference/mechanic_observations.csv`:

```text
observation_id,date,version,screen,state,action,before,after,timing_ms,evidence_file,confidence,notes
```

`balance_samples.csv`:

```text
sample_id,stage,hero_tier,attack_display,enemy_hp_display,damage_observed,crit,battle_time_ms,reward_gold,purchase_cost,notes
```

---

# 103. STOP CONDITION ДЛЯ CODEX

После создания `PLANNING_COMPLETE.md`:

- не создавать production gameplay files;
- не начинать TASK-0001 implementation;
- не «помогать» дополнительным рефакторингом;
- в финальном ответе пользователю дать только:
  - что проанализировано;
  - сколько docs/plans/tasks создано;
  - top blockers;
  - какой первый implementation task;
  - что planning mission завершена.

---

# 104. ДОПОЛНИТЕЛЬНЫЙ УРОВЕНЬ ДЕТАЛИЗАЦИИ ДЛЯ GAMEPLAY DOCS

Каждый gameplay subsystem документ обязан содержать не только prose, а следующие разделы.

## A. Terminology

Словарь точных терминов.

## B. Inputs

Что может инициировать систему.

## C. Outputs/events

Что система изменяет/эмитит.

## D. State

Какие поля persistent/runtime.

## E. Preconditions

Когда action допустим.

## F. Transaction order

Порядок мутаций.

## G. State machine

ASCII diagram / Mermaid при необходимости.

## H. Algorithms

Pseudocode.

## I. Config dependencies

Какие data files.

## J. UI dependencies

Какие screens/widgets.

## K. Animation/audio hooks

Какие events.

## L. Save implications

Что сохраняется.

## M. Analytics

Какие события.

## N. Edge cases

Полный список.

## O. Test matrix

Unit/integration/manual.

## P. Evidence

Evidence IDs.

## Q. Unknowns

Unknown IDs.

## R. Acceptance criteria

Проверяемые пункты.

---

# 105. ДЕТАЛИЗАЦИЯ ДЛЯ UI SCREEN DOCS

Каждый screen doc:

- exact source screenshot/node;
- reference resolution;
- hierarchy;
- assets;
- text;
- layout rules;
- touch targets;
- states;
- transitions;
- modal behavior;
- animation enter/exit;
- button feedback;
- loading;
- empty;
- locked;
- error;
- safe area;
- platform differences;
- analytics screen_view;
- test screenshot IDs.

---

# 106. ДЕТАЛИЗАЦИЯ ДЛЯ ASSET MAP

Каждый production asset entry:

```text
semantic id
source hash/node
source dimensions
trimmed dimensions
alpha
target path
category
screen usage
prefab usage
atlas group
import settings
pivot/anchor
9-slice if any
animation role
derivative allowed?
license/source note
status
```

---

# 107. PIVOT / ANCHOR AUDIT

Для heroes/enemies/weapons необходимо определить визуальный pivot.

Character:

- обычно foot/base point, не image center;
- shadow центрируется относительно feet;
- projectile origin отдельно;
- weapon attachment point отдельно если возможно.

Если flattened sprite:

- хранить normalized pivot metadata.

Неправильный pivot будет ломать idle/attack/merge animations.

---

# 108. TRANSPARENT PADDING

Многие Figma PNG могут иметь большой transparent padding.

Codex должен:

- вычислить alpha bbox;
- не обрезать production asset автоматически без source map;
- решить для каждого class, нужно ли trim;
- учитывать pivot shift при trim;
- не ломать alignment with Figma.

---

# 109. DUPLICATE POLICY

Exact duplicate:

- production хранить одну semantic copy, если usage identical;
- source mapping содержит все original refs.

Near duplicate:

- не объединять автоматически;
- проверить визуальные отличия: glow/frame/state/resolution.

---

# 110. SCREENSHOT ASSET VS CONSTRUCTED UI

Если Figma содержит весь экран одним screenshot PNG, **не использовать его как production interactive screen**.

Использовать screenshot только как reference.

Production screen собирать из:

- background;
- semantic UI sprites;
- runtime text;
- components;
- game entities.

Исключения: purely decorative non-interactive full background.

---

# 111. BUTTON STATES

Для каждой button family определить:

- normal;
- pressed;
- disabled;
- locked if different;
- highlighted CTA;
- loading if async.

Если Figma имеет только normal:

- pressed можно делать transform/tint;
- disabled через saturation/opacity + explicit text/icon;
- не генерировать новый чужой artwork без необходимости.

---

# 112. HERO PORTRAIT FRAMES / RARITY

Если colored borders соответствуют rarity/element/class — доказать mapping.

Не делать предположение `purple = epic`, пока не подтверждено.

Создать mapping table с evidence/confidence.

---

# 113. EQUIPMENT SETS

В Figma видны тематические equipment families.

Нужно определить:

- cosmetic only vs gameplay stats;
- slot type;
- rarity;
- hero restrictions;
- set bonus, если есть;
- upgrade path;
- duplicate handling;
- equip/unequip;
- auto-equip.

Если exact reference system отличается от Figma, оформить conflict.

---

# 114. STAGE HUD

Main screen должен иметь спецификацию для:

- stage label;
- progress bar;
- boss indicator;
- enemy count;
- colors by state;
- transition animation;
- boss warning;
- unlock marker if any.

Progress bar не должен просто lerp к случайному target; source logic описать.

---

# 115. CURRENCY HUD

Для каждой currency:

- icon asset;
- value formatting;
- max display;
- gain animation;
- spend feedback;
- click behavior;
- plus button behavior;
- source of truth.

Figma предварительно показывает gold-like coin и blue diamond-like gem.
Проверить реальный набор валют.

---

# 116. BOTTOM NAVIGATION

Определить:

- tab count;
- icons;
- labels;
- selected state;
- locked state;
- red dot;
- navigation stack behavior;
- whether battle continues behind meta screen;
- whether game simulation pauses.

Очень важно определить: battle/economy продолжаются, пока открыт hero/wheel screen, или нет.

---

# 117. TIME MODEL

Разделить:

- simulation time;
- animation time;
- real wall clock;
- offline elapsed time;
- UI cooldown time.

Time scale debug должен менять simulation/animation по понятным правилам, но не real daily reset.

---

# 118. RNG MODEL

Если есть random summon/wheel/crit/drop:

- единый injectable RNG interface;
- seeded RNG для tests;
- production RNG adapter;
- probability tables в data;
- no hidden `Math.random()` scattered in components.

---

# 119. LARGE NUMBER SAFETY

Idle progression потенциально растёт быстро.

Codex должен определить, достаточно ли JS Number.

Если значения остаются безопасными — Number + formatter.
Если exponential progression может выйти за safe range — выбрать BigInt/decimal/bignumber strategy, но не усложнять без evidence.

Decision задокументировать.

---

# 120. CONTENT UNLOCK GRAPH

Создать graph:

```text
stage X → feature A
stage Y → slot N
hero tier Z → feature B
account level → content C
```

Каждый unlock:

- condition;
- one-time popup;
- persistence;
- nav visibility;
- red dot;
- tutorial hook.

---

# 121. FEATURE GATES В TASK PLAN

Нельзя реализовывать экран, если его core dependency ещё не готова.

Например:

- Equipment UI после Item data/state interface;
- Wheel UI после reward transaction system;
- Offline popup после Save + TimeService;
- native purchases после bridge protocol.

Dependency graph должен отражать это.

---

# 122. CRITICAL PATH

Отдельно вычислить critical path до vertical slice:

```text
Figma asset map
→ layout foundation
→ game-core state
→ purchase
→ merge
→ battle
→ reward
→ stage
→ save
→ slice polish
```

И параллельные tracks:

```text
Audio briefs
VFX asset gaps
RN integration spike
reference measurements
```

---

# 123. WHAT CAN BE PARALLELIZED

В каждом phase/task указывать parallelization.

Пример:

- Figma classification может идти параллельно reference gameplay capture;
- audio brief может идти после event catalog, параллельно balance;
- RN integration spike может идти параллельно detailed economy reverse-engineering;
- visual layout foundation не должен ждать точных late-game balance numbers.

---

# 124. ESTIMATION

Не давать ложную точность в часах для всего проекта.

Для tasks использовать complexity:

- XS;
- S;
- M;
- L;
- XL (и XL обязана быть разбита, если можно).

Дополнительно risk:

- low;
- medium;
- high.

---

# 125. DOCUMENTATION CHANGE POLICY ПОСЛЕ PLANNING

Будущая реализация обязана:

- если mechanics меняются — обновить соответствующий spec;
- если architecture меняется — ADR;
- если asset mapping меняется — manifest/source map;
- если task scope меняется — task note.

Docs не должны умереть после первого дня.

---

# 126. ACCEPTANCE CRITERIA — ПРИМЕРЫ КАЧЕСТВА

Плохой criterion:

> Merge работает.

Хороший:

> При наличии двух compatible units одного tier система создаёт ровно один unit следующего tier, списывает source instances ровно один раз, сохраняет invariant slot occupancy, emits one `merge.completed`, запускает visual sequence без изменения logical result, корректно обрабатывает cascade из четырёх units и после reload состояние идентично завершённому merge.

Плохой:

> Экран похож на Figma.

Хороший:

> При reference viewport screen composition совпадает с Figma по ключевым anchors; отклонение bounding boxes основных HUD regions не превышает согласованный threshold; assets соответствуют semantic source map; нет baked screenshot вместо интерактивного UI; safe-area variants не перекрывают content.

---

# 127. DEFINITION OF DONE ДЛЯ АНИМАЦИИ

Animation task не done, пока:

- есть trigger;
- есть state interruption behavior;
- тайминг централизован;
- no state mutation hidden inside view unless explicitly intended;
- tested at 0.5x/1x/2x debug speed;
- does not block input unnecessarily;
- pooled VFX where hot;
- звук/haptic hook определён;
- low quality fallback указан;
- no obvious clipping at aspect ratio extremes.

---

# 128. DEFINITION OF DONE ДЛЯ AUDIO

- event ID существует;
- final/placeholder status отмечен;
- volume/concurrency rules;
- at least required variants;
- no clipping;
- respects settings;
- respects lifecycle;
- licensed/original source tracked;
- missing events explicitly visible in report.

---

# 129. DEFINITION OF DONE ДЛЯ SYSTEM

- spec;
- data schema;
- pure logic where appropriate;
- test matrix;
- edge cases;
- save interaction;
- UI event hooks;
- animation/audio hooks;
- analytics hooks;
- no unresolved BLOCKER unknown.

---

# 130. FINAL RULE: ПЛАН ДОЛЖЕН БЫТЬ ИСПОЛНИМЫМ CODEX ПОШАГОВО

Главный критерий качества всей planning mission:

После завершения пользователь должен иметь возможность в новом Codex-сеансе написать:

```text
Начни с TASK-0001 из tasks/TASK_INDEX.md и выполняй задачи строго по dependency order. После каждой задачи запускай указанные tests/checks и не переходи дальше, пока acceptance criteria не выполнены.
```

И агент не должен спрашивать:

- «а какую архитектуру использовать?»;
- «а как должен работать merge?»;
- «а какие картинки брать?»;
- «а что делать при full board?»;
- «а какие анимации нужны?»;
- «а какие звуки нужны?»;
- «а как сохранить состояние?»;
- «а когда интегрировать React Native?».

Если такие вопросы остаются без ответа или explicit UNKNOWN+verification task — план недостаточно подробный.

---

# APPENDIX A — РЕКОМЕНДУЕМЫЕ ANALYSIS SCRIPTS

Codex может создать в `tools/analysis/` небольшие scripts.

## `fig_inventory.py`

Функции:

- inspect archive;
- extract metadata;
- image dimensions;
- alpha bbox;
- SHA256;
- pHash;
- CSV/JSON manifest.

## `fig_contact_sheets.py`

- index labels;
- dimensions;
- grouped sheets.

## `find_duplicates.py`

- exact hash;
- perceptual distance;
- report.

## `screen_candidate_detector.py`

- aspect ratio;
- size threshold;
- output previews.

## `asset_semantic_validator.py`

- every production asset maps to source;
- no duplicate semantic ID;
- referenced file exists.

## `balance_fit.py`

- load observed samples;
- fit candidate exponential/piecewise curves;
- error report;
- never silently choose formula without fit metrics.

---

# APPENDIX B — REFERENCE GAME MECHANIC CHECKLIST

Codex должен поставить status для каждого пункта:

```text
[ ] Launch/loading
[ ] Tutorial
[ ] Main currency
[ ] Premium currency
[ ] Hero buy
[ ] Buy cost progression
[ ] Buy tier progression
[ ] Board slots
[ ] Slot unlock
[ ] Merge condition
[ ] Auto merge
[ ] Merge cascade
[ ] Max tier
[ ] Hero deployment
[ ] Auto battle
[ ] Attack speed
[ ] Damage
[ ] Crit
[ ] Enemy HP
[ ] Enemy attack
[ ] Stage waves
[ ] Boss cadence
[ ] Boss timer/fail
[ ] Stage rewards
[ ] Unlocks
[ ] Offline rewards
[ ] Hero level
[ ] Hero equipment
[ ] Equipment upgrade
[ ] Summon/open x1/x10
[ ] Daily reward
[ ] Wheel
[ ] Quest
[ ] Gift
[ ] Event
[ ] Settings
[ ] Audio settings
[ ] Haptics
[ ] Alternative battle contents
[ ] Shop/IAP
[ ] Ads/rewarded ads
[ ] Save behavior
[ ] Background behavior
[ ] Navigation while battle active
[ ] Red dot rules
```

Каждый `[ ]` заменить на:

- `[OBSERVED]`;
- `[NOT PRESENT]`;
- `[UNKNOWN]`;
- `[OUT OF SCOPE]`.

---

# APPENDIX C — FIGMA ASSET CATEGORY CHECKLIST

```text
[ ] Full screens / screenshots
[ ] Backgrounds portrait
[ ] Backgrounds wide battle strips
[ ] Logos
[ ] Hero full bodies
[ ] Hero portraits
[ ] Enemy sprites
[ ] Boss sprites
[ ] Weapons
[ ] Armor chest
[ ] Pants
[ ] Boots
[ ] Helmets
[ ] Rings
[ ] Accessories
[ ] Currency icons
[ ] Reward icons
[ ] Chests
[ ] Buttons
[ ] Button states
[ ] Panels
[ ] Frames
[ ] Circular frames
[ ] Progress bars
[ ] Navigation icons
[ ] Settings
[ ] Lock icons
[ ] Upgrade arrows
[ ] Stage icons
[ ] Battle emblems
[ ] Wheel assets
[ ] Daily assets
[ ] Gift assets
[ ] VFX-like images
[ ] Decorative elements
[ ] Baked text images
[ ] Unknown assets
```

---

# APPENDIX D — MAJOR ANIMATION EVENT CHECKLIST

```text
[ ] App logo entrance
[ ] Start button idle pulse
[ ] Start button press
[ ] Screen transition
[ ] Main HUD entrance
[ ] Hero spawn
[ ] Hero idle
[ ] Hero attack
[ ] Hero hit
[ ] Hero upgrade
[ ] Hero merge-out
[ ] Hero merge-in
[ ] Enemy spawn
[ ] Enemy idle
[ ] Enemy attack
[ ] Enemy hit
[ ] Enemy death
[ ] Boss intro
[ ] Boss hit
[ ] Boss death
[ ] Projectile launch
[ ] Projectile travel
[ ] Projectile impact
[ ] Damage number
[ ] Crit number
[ ] Coin reward
[ ] Gem reward
[ ] Currency counter bump
[ ] Purchase success
[ ] Purchase failure
[ ] Board slot unlock
[ ] Merge cascade escalation
[ ] Stage progress update
[ ] Boss warning
[ ] Stage clear
[ ] Feature unlock
[ ] Popup open
[ ] Popup close
[ ] Tab switch
[ ] Red dot appear
[ ] Daily claim
[ ] Wheel accelerate
[ ] Wheel ticks
[ ] Wheel decelerate
[ ] Wheel land
[ ] Chest open
[ ] Equipment equip
[ ] Equipment enhance
[ ] Insufficient currency shake
[ ] Locked feature feedback
[ ] Offline reward popup
```

---

# APPENDIX E — MAJOR AUDIO EVENT CHECKLIST

```text
[ ] Music main
[ ] Music boss/overlay
[ ] Ambience main
[ ] UI soft tap
[ ] UI primary tap
[ ] UI popup open
[ ] UI popup close
[ ] Tab switch
[ ] Error/locked
[ ] Gold gain
[ ] Gold spend
[ ] Gem gain
[ ] Hero spawn
[ ] Merge low
[ ] Merge mid
[ ] Merge high
[ ] Cascade escalation
[ ] Melee attack
[ ] Ranged release
[ ] Magic release
[ ] Normal hit
[ ] Crit hit
[ ] Enemy death small
[ ] Enemy death large
[ ] Boss intro
[ ] Boss death
[ ] Stage clear
[ ] Unlock
[ ] Wheel tick
[ ] Wheel result
[ ] Daily claim
[ ] Chest open
[ ] Equip
[ ] Upgrade
[ ] Offline reward
```

---

# APPENDIX F — RN/COCOS SPIKE ACCEPTANCE

Spike считается успешным только если:

```text
[ ] Android build installs
[ ] RN screen renders
[ ] Cocos screen opens
[ ] Cocos renders continuously
[ ] Touch works
[ ] Cocos sends event to RN
[ ] RN sends command to Cocos
[ ] Back returns correctly
[ ] Re-enter works 10+ times
[ ] Background/resume works
[ ] Audio focus acceptable
[ ] No obvious engine double-initialization leak
[ ] iOS equivalent built/run OR explicit environment blocker documented
[ ] chosen integration strategy recorded in ADR
```

---

# APPENDIX G — PLANNING SELF-REVIEW QUESTIONS

Перед `PLANNING_COMPLETE.md` Codex должен сам ответить «да/нет»:

1. Я реально просмотрел Figma assets, а не только название файла?
2. Я могу указать, какой Figma asset используется для каждого ключевого UI region?
3. Я отделил screenshot references от production sprites?
4. Я знаю, какие core mechanics observed, а какие inferred?
5. Я описал auto-merge как алгоритм, а не лозунг?
6. Я описал full board?
7. Я описал cascade?
8. Я описал battle state machine?
9. Я описал reward transaction order?
10. Я описал save/offline?
11. Я не оставил RN/Cocos integration до последней недели?
12. Я сделал animation matrix?
13. Я сделал audio event map?
14. Я сделал asset gap list?
15. Я сделал balance measurement plan?
16. Я сделал device/performance plan?
17. Я сделал atomic tasks?
18. У каждой P0 задачи есть acceptance criteria?
19. Я проверил dependency graph?
20. Следующий Codex-сеанс сможет начать TASK-0001 без архитектурного гадания?

Если хоть на один критический вопрос ответ «нет» — planning mission продолжить.

---

# APPENDIX H — КРАТКИЙ BASELINE ПРОДУКТОВОЙ ЦЕЛИ

Если внешние материалы не дают полного ответа, baseline продукта трактовать так:

> Яркая portrait idle/merge fantasy game, в которой игрок регулярно покупает/получает героев, система объединяет совместимых героев в более высокий tier, сила команды растёт, бой идёт автоматически, прохождение stages приносит ресурсы, ресурсы снова вкладываются в рост, а meta systems дают дополнительные цели и награды. Визуальный язык берётся из предоставленной Figma. Поведение референса имеет приоритет для core gameplay, но недоказанные детали не объявляются оригинальными. Runtime должен ощущаться живым благодаря анимациям, VFX, звуку, haptics и responsive feedback.

Это **fallback design intent**, а не лицензия придумывать неизвестные exact mechanics.

---

# APPENDIX I — ЧТО ДЕЛАТЬ С НЕДОСТАЮЩИМИ ДАННЫМИ ПО ЗВУКУ

Поскольку Figma не содержит audio source of truth:

1. создать полный event list;
2. послушать публичный референс только для определения функционального характера;
3. не копировать waveform/files;
4. описать original audio brief;
5. поставить placeholder IDs;
6. определить источник будущего финального SFX;
7. сделать mix/concurrency plan заранее;
8. добавить audio acceptance tasks.

---

# APPENDIX J — ПРИМЕР РАЗБИЕНИЯ ОДНОЙ ФИЧИ НА TASKS

Фича: Auto Merge.

Плохой план:

```text
TASK: сделать auto merge
```

Правильное разбиение:

```text
TASK-XXXX — Verify reference auto-merge ordering
TASK-XXXX — Document auto-merge invariants and examples
TASK-XXXX — Add merge config schema
TASK-XXXX — Implement pure merge pair detection
TASK-XXXX — Unit test pair detection
TASK-XXXX — Implement deterministic merge transaction
TASK-XXXX — Unit test transaction invariants
TASK-XXXX — Implement cascade resolution
TASK-XXXX — Stress test 1000 random board states
TASK-XXXX — Create Cocos board visual adapter
TASK-XXXX — Create merge visual sequence
TASK-XXXX — Add pooled merge VFX
TASK-XXXX — Add merge audio profile
TASK-XXXX — Add cascade feedback scaling
TASK-XXXX — Integrate save checkpoint behavior
TASK-XXXX — Test pause/resume mid-animation
TASK-XXXX — Visual QA against target style
```

Именно такого уровня детализации ожидать для всех P0/P1 systems.

---

# APPENDIX K — ПРИМЕР РАЗБИЕНИЯ BATTLE

```text
Reference target selection capture
Reference attack timing capture
Battle domain model
Combatant state
Targeting policy
Attack cooldown
Damage resolver
Seeded RNG
Projectile logical event
Enemy death transaction
Reward transaction
Stage transition
Cocos hero adapter
Cocos enemy adapter
Projectile pool
Damage label pool
Hit VFX
Death VFX
Attack animation profiles
Audio event hooks
Boss transition
Pause/resume
Save boundary
Stress test
Visual QA
Performance QA
```

---

# APPENDIX L — ПРИМЕР РАЗБИЕНИЯ FIGMA PIPELINE

```text
Locate .fig
Verify archive
Copy to analysis
Extract meta
Extract thumbnail
Inventory embedded images
Detect formats
Compute dimensions
Compute alpha bounds
Compute exact hashes
Compute pHash
Exact duplicate groups
Near duplicate groups
Generate contact sheets
Detect portrait screen candidates
Detect wide background candidates
Detect icon candidates
Detect character candidates
Manual/vision classification
Assign semantic IDs
Generate source map
Find asset gaps
Define import settings
Define atlas groups
Validate no production hash paths
Create screen-to-assets mapping
```

---

# APPENDIX M — ПРИМЕР `00_EXECUTION_ORDER.md`

Codex должен сгенерировать реальный файл, но структура должна быть примерно:

```text
GATE A: Evidence sufficient for core loop
  ├─ TASK-0001...
  └─ TASK-00XX...

GATE B: Figma semantic map ready
  └─ ...

GATE C: RN/Cocos spike proven
  └─ ...

MILESTONE 1: Static main screen
MILESTONE 2: Purchase + board
MILESTONE 3: Merge
MILESTONE 4: Battle
MILESTONE 5: Stage + boss
MILESTONE 6: Save + offline
MILESTONE 7: Vertical slice polish
MILESTONE 8: Meta systems
MILESTONE 9: Full integration
MILESTONE 10: Release
```

---

# APPENDIX N — НИЧЕГО НЕ ТЕРЯТЬ ИЗ FIGMA

После semantic mapping должны существовать три множества:

```text
USED_IN_MVP
USED_POST_MVP
UNUSED_OR_REFERENCE_ONLY
```

Каждый embedded asset должен попасть хотя бы в одно.

`UNKNOWN_UNCLASSIFIED` допускается временно, но на planning complete должен быть минимизирован и перечислен.

Это гарантирует, что сотни Figma resources не потеряются просто потому, что Codex увидел первые пять экранов.

---

# APPENDIX O — QUALITY GATES

## Gate 1 — Source Understanding

- Figma inventoried;
- reference game identified;
- evidence system active.

## Gate 2 — Design Understanding

- screen catalog;
- asset map;
- gameplay state machines.

## Gate 3 — Technical Feasibility

- Cocos architecture;
- RN integration spike plan/result;
- performance constraints.

## Gate 4 — Implementation Readiness

- phases;
- tasks;
- schemas;
- tests;
- acceptance criteria.

## Gate 5 — Planning Complete

- consistency pass;
- blockers visible;
- first task ready.

---

# FINAL DIRECTIVE

Работай глубоко и доказательно. Не экономь на документации там, где это предотвращает неправильную реализацию. Не создавай десятки пустых `.md` ради количества: каждый документ должен реально содержать механику, алгоритмы, состояния, assets, tests, edge cases и связи с другими частями проекта.

Главная ценность planning run — превратить:

```text
«вот Figma и вот игра, сделай такую»
```

в:

```text
полностью индексированный source material
+ evidence-backed game specification
+ semantic asset catalog
+ exact known mechanics
+ explicitly tracked unknown mechanics
+ animation/VFX/audio direction
+ architecture
+ mobile integration decision
+ data schemas
+ test strategy
+ dependency graph
+ phased implementation plan
+ atomic Codex tasks
```

После выполнения этого документа реализация должна стать последовательной инженерной работой, а не серией догадок.

**До `PLANNING_COMPLETE.md` production implementation запрещена. После `PLANNING_COMPLETE.md` остановиться.**
