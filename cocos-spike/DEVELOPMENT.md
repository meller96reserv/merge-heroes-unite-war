# Разработка текущей игры

Cocos Creator **3.8.8**, Node **22**, TypeScript **6.0.3**. Активный проект — эта папка, не корень Git. Сцена: assets/scenes/Battle.scene. Версия/номер сборки: release.json. Package/Bundle ID: com.mergeheroes.unitewar.

## Карта исходников

Все пути в таблице относительно assets/scripts/.

| Файл / папка | Что менять здесь |
| --- | --- |
| BattleScene.ts | Слои сцены, safe area, маршрутизация тапа/drag/удержания |
| BattleInput.ts, BattleLayout.ts | Один активный указатель, координаты, область выставления/подсветки |
| BattleModel.ts | Команды core и адаптация подтверждённых событий для UI/аудио |
| MetaScreens.ts | Старт, магазин, экипировка, улучшения, реликвии, dungeon, daily, wheel, настройки и продажа |
| TutorialGuide.ts | Пять обязательных шагов: купить дважды, merge, выставить, настоящая атака |
| SceneUI.ts | UI-примитивы и полный фон отдельно от safe-area контента |
| ActorView.ts, FeedbackPool.ts, BoardFeedback.ts | Движение героев, снаряды, hit/VFX, подсветка; только представление |
| RewardCounter.ts, BonusAttention.ts | Полёт валюты/отображение баланса, индикаторы доступных бонусов |
| BattleAssets.ts | Загрузка ресурсов, пул звуков, громкость/ducking, хаптик |
| NativeServices.ts, RewardedFlow.ts | Нативный JSON bridge и durable flow rewarded рекламы |
| runtime/GameRuntime.ts, BattleRuntime.ts | Подключение команд, игровой таймер и бой |
| runtime/LocalGame.ts, ProgressMigration.ts | Сохранение и миграции |
| core/ | Самостоятельный чистый TypeScript: commands, content, model, systems, persistence, selectors |

Core — единственный источник денег, урона, слияний, прогресса и наград. Он исторически перенесён из RN, но теперь независим; синхронизации с прежним game-core нет. Старые одноразовые import/patch-скрипты удалены, чтобы ими не затереть текущую реализацию.

## Правила текущего продукта

Это согласованная адаптация референса; точное совпадение всех скрытых формул не заявляется.

- PlayableConfig.ts: 15 ячеек, 5 колонок, сначала открыты 5. AccountProgression.ts управляет открытиями и третьим бойцом при последнем ряде. HeroDefinitions.ts задаёт героев/уровни; merge одинаковых героев до tier 10.
- EconomyConfig.ts и PurchaseQuote.ts задают цены найма. StageConfig.ts задаёт 10 встреч на главу, босс — десятый; при неудаче фарм у девятой встречи с вариациями противников. Автопереход без Continue.
- BuyEquipment.ts: предлагаемая цена в золоте = tier героя × 50 + индекс слота × 25. Покупка/надевание — одна транзакция. Уже купленный предмет повторно не оплачивается.
- SellHero.ts: предлагаемая цена — половина текущей стоимости tier-one найма × число tier-one героев в merge, минимум 1. Продажа последнего героя оставляет возможность нанять одного нового. Экипировка возвращается в инвентарь. Подтверждение после удержания 550 мс или SELL; в обязательном обучении продажа закрыта.
- RelicConfig.ts / команды OpenRelics: x1 за 100 gold, x10 за 100 gems; сообщения должны указывать нужную валюту.
- DailyService.ts, WheelConfig.ts и rewarded-команды: бонусы и их доступность. Связка Begin → completed native result → durable Record → Claim. Ошибка/закрытие видео не дают награды.
- Снаряд визуально летит около 0.5 с, попадание планирует симуляция; VFX/полёт валюты не изменяют authoritative state. Урон без минуса и разделителей.

Сохранение: native SQLite-backed sys.localStorage, namespace mergeheroes.cocos.v1; поколения A/B с checksum. TransactionCoordinator сохраняет состояние/receipt до публикации; SaveRecovery восстанавливает поколение. Миграции сохраняют исходные данные. Не менять namespace или очищать данные как средство исправления ошибки.

## Ассеты и звук

- assets/resources/atlases/ — игровые атласы; assets/resources/textures/ — отдельные текстуры. BattleAssets.ts, ArtIds.ts и FullArt.ts задают загрузку/семантические имена.
- assets/data/asset-manifest.json хранит происхождение и размеры экспорта. Его app/assets/... — исторические пути происхождения, не зависимости сборки.
- assets/resources/fonts/ — шрифты; assets/resources/audio/ — готовые музыка/SFX. Все эти runtime-файлы и .meta включены в Git.
- branding/ — логотип и launcher art. native/engine/ios/Images.xcassets/ — иконки iOS.
- audio-licenses/ — CC0 notices, источники и хеши. Старые оригиналы audio-sources/ нужны только при повторной обработке, не при сборке. import-licensed-audio.py — опциональный инструмент, ожидает скачанные оригиналы по manifest/credits.
- Полная исходная Figma и reference-видео локальны; извлечённые оригинальные изображения/семантика/экраны доступны в ../analysis/figma/. Подмена отдельного ассета должна сохранять UUID/семантику и учитывать trim/pivot; это не автоматический импорт целого нового Figma-дизайна.

## Чистый клон и проверка

Из этой папки:

```sh
npm ci
npm run check:core
```

Нужен только TypeScript из package-lock.json; RN-зависимостей нет. Этот focused integration check запускается без Creator/эмулятора. Открыть проект в Creator 3.8.8 и дождаться импорта: он создаёт temp/tsconfig.cocos.json с engine typings. Затем `npm run typecheck`. Это проверка типов, не native gameplay acceptance.

Проверки — после всех связанных правок. Не запускать долгие циклы/повторные записи. Меняется игра — один целевой smoke; изменились только документы/упаковка — достаточно проверки этих изменений.

## Android и iOS

`tools/build.py` поддерживает macOS release и Windows Android debug. Требуются Python **3.11+**, JDK 17, Android SDK 36 / build-tools / CMake 3.22.1, NDK **r24 (24.0.8215888)**. Для iOS: Xcode с iOS SDK/Simulator, CocoaPods, FFmpeg. На машине проверенной сборки использовался iOS Simulator 26.2; deployment target iOS 16.4. SDK Maven/Pods загружаются при первой сборке.

Фактическая Windows-конфигурация 2026-09-14:

- Git 2.55.0.windows.3; portable Node 22.23.2 (`C:\Users\pksto\AppData\Local\Programs\node-v22.23.2-win-x64`); Python 3.11.9 (`C:\Users\pksto\AppData\Local\Programs\Python\Python311`). Системная Node 24 сохранена, но для проекта первой в PATH должна быть Node 22.
- Temurin JDK 17.0.20.1 (`C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot`).
- Android Studio Quail 4 / 2026.1.4 (`C:\Program Files\Android\Android Studio`).
- SDK `C:\Users\pksto\AppData\Local\Android\Sdk`: Platform 36 revision 2, Build Tools 36.0.0, Platform Tools 37.0.1, CMake 3.22.1 and NDK 24.0.8215888.
- User variables: `JAVA_HOME`, `ANDROID_HOME`, `ANDROID_SDK_ROOT`, `ANDROID_NDK_HOME`; Node 22, platform-tools and command-line tools are prepended to the user PATH.

Открыть `cocos-spike` как самостоятельный проект в Cocos Creator **ровно 3.8.8**, дождаться первого импорта и открыть `assets/scenes/Battle.scene`. На Windows путь редактора передаётся как `COCOS_CREATOR_EXE`. Debug APK не требует production signing:

```powershell
$env:COCOS_CREATOR_EXE='C:\path\to\CocosCreator.exe'
python tools/build.py --debug
```

Ожидаемый результат: `build/android/merge-heroes-unite-war-debug.apk`. Release без исходного `private/com.mergeheroes.unitewar.jks` и `private/android-signing.json` не собирать.

```sh
export COCOS_CREATOR_APP=/Applications/CocosCreator/Creator/3.8.8/CocosCreator.app
export JAVA_HOME=/path/to/jdk17/Contents/Home
export ANDROID_HOME="$HOME/Library/Android/sdk"
export NDK_ROOT="$ANDROID_HOME/ndk/24.0.8215888"
python3 tools/build.py --bundle
python3 tools/build-ios.py
```

Указать свои пути. Локальные значения по умолчанию ищут сохранённые инструменты в ../.tools/; повторно скачивать движок/SDK внутрь каждого клона не требуется. GRADLE_USER_HOME тоже можно переопределить. Creator запускается с cwd этой папки.

Для Android release сначала приватно восстановить private/com.mergeheroes.unitewar.jks и private/android-signing.json (alias, storePassword, keyPassword). Скрипт **останавливается при отсутствии ключа**. Нельзя создавать другой ключ для обновления установленной игры. `prepare-signing.py --create-new` предназначен только для явно согласованной новой линии подписи; для существующего продукта он не нужен. Экспорт без подписи возможен через `build.py --export-only`.

Итоги: build/android/merge-heroes-unite-war-1.8.apk, Gradle AAB; build/ios/derived-simulator/Build/Products/Release-iphonesimulator/MergeHeroesUniteWar-mobile.app. `build.py --gradle-only --bundle` и `build-ios.py --skip-export` — только для уже актуального экспорта. После TypeScript/asset-правок нужен обычный экспорт.

`build-ios.py --device` компилирует unsigned iphoneos, затем нужны Apple Team/provisioning/signing владельца. Simulator не заменяет iPhone-проверку.

Нативные сервисы: app-services.json → prepare-services.py → Android Java / iOS headers. GameServices.java и GameServices.mm реализуют рекламу, аналитику, notifications, legal. **GameServices.mm компилировать под ARC**: иначе уже наблюдалось повреждение времени жизни reply-объектов. Ограничения сервисов — в HANDOFF.md.

## Упаковка и передача

```sh
python3 tools/package-builds.py --source-only --output /tmp/mergeheroes-source.zip
python3 tools/package-builds.py
```

Полная упаковка требует существующие Android/iOS продукты и приватный ключ. Она создаёт build/delivery/<version>-<build>/ и общий ZIP **с приватными материалами**. Не публиковать общий комплект/ключ/пароли в Git или публичных загрузках. Source ZIP не содержит ключей, token, логов, editor caches, SDK или RN; npm ci работает и в распакованном проекте.

По умолчанию упаковщик записывает verification=NOT_RUN. Для переупаковки именно проверенных артефактов передать `--evidence releases/1.8-9.json`; это историческая запись конкретной версии, не сертификат любого нового build. После игровых изменений поднять release.json и записать только реально выполненную проверку. Обычная очистка Git/документов не требует новой версии APK.

Постоянный signing key и Telegraph token отсутствуют в Git. Существующие готовые APK/AAB/Simulator ZIP сохраняются локально, не перезаписываются при обычной работе с исходниками.
# Verified Windows workstation — 2026-09-14

The installed editor path is `C:\ProgramData\cocos\editors\Creator\3.8.8\CocosCreator.exe`. Set `COCOS_CREATOR_EXE` to that file before invoking `tools/build.py`.

The command `python tools/build.py --debug` completed the first Cocos import, Android export, native C++ compilation, and Gradle debug packaging. Its verified output is `build/android/merge-heroes-unite-war-debug.apk`. The first build may download Gradle 8.11.1 and install Android Build Tools 35 required by the generated project.

After the first import, `temp/tsconfig.cocos.json` exists and `npm run typecheck` completes successfully. `npm run check:core` also passes, including the shared tutorial spotlight/drop geometry on 16:9 and tall layouts.
