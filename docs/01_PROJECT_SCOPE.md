# Объём проекта и исходное состояние

[HISTORICAL OBSERVED at planning baseline] Planning mission задана [master-документом](CODEX_MASTER_PLAN.md), прочитанным полностью (5 285 строк). Текущий репозиторий содержит README, пустой AGENTS.md, master, локальный `.fig` и `links.txt`. Исходников Cocos/RN, package manifest, native-проектов и тестов в текущем рабочем дереве нет. [Инвентарь](../analysis/reports/repository_inventory.json).

[OBSERVED] В начале сеанса были пользовательские удаления старого приложения; во время аудита они вошли в commit `94fb53a`. Этот код не является текущим продуктом. Ничего из удалённого не восстанавливать, чужие изменения не отменять. Новая реализация должна начинаться отдельно после planning и по task gates.

[ACCEPTED requirement, ADR-007] Продукт: portrait fantasy idle/merge в React Native + TypeScript, Expo где совместим, Skia, Reanimated и Gesture Handler. Общая игра для Android/iOS/Web; browser-first разработка с npm run dev:web. Качество Figma/interaction/gameplay сохраняется. [ADR-007](adr/ADR-007-RN-SKIA-RUNTIME.md).

[PROPOSED] P0: покупка, ручной merge/tutorial и auto-merge после уточнения unlock, board/deployment, автоматический бой, stages/boss, rewards, сохранение/offline, доступный HUD. P1: hero upgrades, equipment, daily, wheel, quests, settings и unlocks. P2: relic, dungeon и дополнительные режимы, продвинутая summon-мета. Монетизация, аккаунты, backend, PvP, реальные выплаты, push и live events не включены в MVP автоматически.

В завершённой planning mission были разрешены только analysis scripts, извлечённые исследовательские данные, схемы, документация и планы spike. Теперь [start_prompt.md](../start_prompt.md) разрешает реализацию по существующему DAG после handoff. Production gameplay остаётся закрыт до нативной приёмки. Экспортированные screenshots служат визуальными источниками, а не интерактивными экранами.

Критерии результата: 100% local embedded assets учтены; каждый существенный вывод помечен статусом и evidence ID; неизвестное имеет capture method и task gate; все обязательные документы содержательны; DAG проверен; создан `PLANNING_COMPLETE.md`, после чего работа остановлена. [Порядок исполнения](../plans/00_EXECUTION_ORDER.md), [индекс](00_INDEX.md).
