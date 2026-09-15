# Текущее состояние и открытые вопросы

На 2026-09-11 Cocos **1.8 (9)** собран для Android APK/AAB и Apple Silicon iOS Simulator. Состав и степень проверки — [HANDOFF](../cocos-spike/HANDOFF.md), [release evidence](../cocos-spike/releases/1.8-9.json). Это рабочий кандидат, не завершённая публикация в магазинах.

| Вопрос | Что осталось |
| --- | --- |
| Rewarded video | Владелец должен дать Start.io App ID Android/iOS. Поля app-services.json пустые. Затем проверить одно полное видео/награду и закрытие без награды. |
| AppMetrica | SDK и UUID подключены. Доставку событий в кабинете владельца ещё не подтвердили. |
| iPhone / TestFlight | Требуются Apple Team, provisioning и подпись. Simulator ZIP не устанавливается на физический телефон. |
| iOS после ARC | Финальная сборка прошла; gameplay после исправления bridge не перепроверяли по просьбе пользователя. При следующем iOS smoke пройти Let's Play. |
| Notifications | Реализация есть; системное разрешение/напоминание не подтверждены отдельным тестом. |
| Передача заказчику | Исходники сейчас на GitHub. Если остаётся требование GitLab, нужны адрес/доступ. Ключ подписи передавать приватно. |
| Windows native QA | Toolchain установлен. Нужны подтверждённый путь Cocos Creator 3.8.8, первый import/export и подключённое устройство либо уже существующий видимый эмулятор для единственного smoke. До этого новый APK и smoke имеют статус NOT_RUN. |

Функции и формулы описаны в [DEVELOPMENT](../cocos-spike/DEVELOPMENT.md) и [PLAN-1.8](../cocos-spike/PLAN-1.8.md). Пустые live ad IDs не обходить фальшивой рекламой. Не добавлять IAP/вывод денег/регистрацию из общих примеров.

Новую задачу задаёт пользователь; прежний RN DAG не возобновляется. После изменения поведения обновить соответствующий документ и краткую запись проверки. Старые PASS не переносятся на новые непроверенные артефакты.
# Verification update — 2026-09-14

- DONE: Cocos Creator 3.8.8 import, generated TypeScript environment, `typecheck`, and core regression checks on Windows.
- DONE: Android debug export/build and install on the persisted Android 36 emulator.
- DONE: one relevant native smoke covering launch, purchase, battle/reward activity, accepted battlefield drag, and internal Terms/Privacy navigation/scrolling.
- NOT_RUN: iOS build and device smoke (requires macOS/Xcode and signing inputs).
- BLOCKED: live rewarded-video verification until the owner supplies the Start.io Android/iOS App IDs.
