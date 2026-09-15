# Merge Heroes Unite War

Мобильная игра на **Cocos Creator 3.8.8** для Android и iOS. Актуальная версия — **1.8 (9)**, пакет `com.mergeheroes.unitewar`. Основная разработка ведётся в `main`.

**Исходники игры: [cocos-spike/](cocos-spike/).** Имя папки осталось от прототипа; внутри текущий самостоятельный продукт. React Native удалён из рабочего дерева и доступен в истории Git.

## Начать работу

```sh
git clone --depth 1 https://github.com/franticus/kisel.git
cd kisel
git config core.hooksPath .githooks
cd cocos-spike
npm ci
npm run check:core
```

Нужен Node.js 22. В Cocos Creator 3.8.8 открыть именно папку `cocos-spike` и сцену `assets/scenes/Battle.scene`. Первый импорт создаст library/ и temp/; после него доступен `npm run typecheck`. Скрипты сборки рассчитаны на macOS, iOS Simulator — на Apple Silicon.

- [Карта исходников, ассетов и сборка с нового компьютера](cocos-spike/DEVELOPMENT.md).
- [Состояние, сервисы, комплект 1.8-9 и ограничения](cocos-spike/HANDOFF.md).
- [Документация и ТЗ](docs/00_INDEX.md), [открытые вопросы](docs/BACKLOG.md).
- [Инструкции агенту](AGENTS.md), [правила работы](CODEX_EXECUTION_RULES.md).

Локальные сборки находятся в `cocos-spike/build/delivery/1.8-9/`. Они не входят в Git. iOS-комплект содержит приложение для Simulator, **не подписанный IPA для iPhone**. Для рекламных видео ещё нужны Start.io App ID владельца, для физического iPhone — Apple signing. [Фактические проверки 1.8-9](cocos-spike/releases/1.8-9.json).

## Структура

| Путь | Назначение |
| --- | --- |
| cocos-spike/assets/ | Сцена, TypeScript, игровой core, изображения, шрифты, музыка и звуки |
| cocos-spike/native/, settings/, tools/ | Нативные шаблоны, настройки Creator и сборочные скрипты внутри проекта |
| docs/tz/ | Исходные документы заказчика |
| analysis/figma/, analysis/reference/ | Экспорты Figma, скриншоты/клипы, исследование механик и измерения |
| reference-benchmark/ | Прежний захват/бенчмарк оригинала; не часть текущего приложения |
| archive/rn-planning/ | Архив прежних спецификаций и задач; не активный план |

Для продолжения с Codex: «Прочитай AGENTS.md и текущую документацию, затем выполни [конкретную задачу]». Предыдущая переписка для понимания текущего кода не требуется. Доступ к редактируемой Figma и приватным ключам передаётся отдельно.

Большие исходные .fig и полная видеозапись сохранены локально и не входят в Git; ресурсы игры, короткие клипы и исследовательские таблицы включены. `--depth 1` позволяет не скачивать историю удалённого RN-приложения. Зависимости проверок содержат только TypeScript; движок, SDK, сборки и эмуляторы не версионируются. Постоянный ключ Android, пароли и Telegraph token хранятся в игнорируемом `cocos-spike/private/`.
