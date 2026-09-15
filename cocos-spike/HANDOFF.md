# Merge Heroes Unite War 1.8 (9)

Cocos Creator 3.8.8, TypeScript + нативные Android/iOS. React Native и WebView не входят. Package / Bundle ID: **com.mergeheroes.unitewar**. Figma: https://www.figma.com/design/Yc3y8PHv9qJdh1fXUzLl1S

## Что изменено

- Обучение: область сброса героя совпадает с подсветкой на коротких и высоких экранах. Тап выставляет/отзывает героя; drag-and-drop выставляет, перемещает и объединяет. Пять обязательных шагов сохранены.
- Экипировка: каталог предметов с ценами за золото, покупка и немедленное надевание, смена/снятие/улучшение. Предметы не исчезают при продаже героя.
- Продажа любого резервного или боевого героя после обучения: удерживать героя не менее 0.55 сек либо нажать SELL на его экране, затем подтвердить сумму. Продажа сохраняется атомарно, повторные нажатия не дублируют золото.
- Реликвии и улучшения: сообщения о нужной валюте/сумме, нехватке гемов/сфер, закрытом герое и максимальном уровне.
- Единый фон без стыков под Dynamic Island; тихие Let’s Play / Terms / Privacy.
- Нативные ссылки Terms/Privacy, AppMetrica, разрешение и локальное напоминание для Notifications. Нет Usage Analytics в Settings.
- Встроенные прокручиваемые Terms of Use и Privacy Policy в стиле игры доступны с Let's Play и Settings без выхода из приложения; опубликованные Telegraph-страницы сохранены как внешние long-form источники.
- Нативный Start.io rewarded bridge для Free Coins, Wheel и Stage Boost. Только подтверждённое завершение видео разрешает награду; закрытие/ошибка/нет рекламы не дают валюту. Выбранный приз сохраняется для повторной попытки. Бонус этапа предлагается ненавязчиво на 2 сек; обычная игра продолжает переходить дальше без Continue.

## Состав

- `com.mergeheroes.unitewar.apk`: подписанный Android ARM64, Android 7+.
- `com.mergeheroes.unitewar.aab`: Android App Bundle той же версии.
- `com.mergeheroes.unitewar.ios-simulator.zip`: unsigned Release `.app` для iOS Simulator на Mac Apple Silicon. Это **не IPA для физического iPhone**.
- `com.mergeheroes.unitewar.zip`: отдельные исходники Cocos, ассеты, звуки с лицензиями, нативные шаблоны и скрипты.
- `manifest.json`, `SHA256SUMS`: фактические проверки, ограничения, размеры и хеши.
- `com.mergeheroes.unitewar.jks` и `project-settings.private.json`: постоянный ключ подписи и его параметры. Передавать владельцу приватно, не размещать в GitLab/публичном репозитории.

В 1.8 идентификатор изменён с `com.mergeheroes.unitewar.cocosspike` на требуемый производственный. Старый Cocos APK остаётся отдельным приложением со своим сохранением; новая установка начинает своё сохранение. Если уже установлен прежний RN APK с тем же производственным ID, его отладочная подпись отличается. Не удаляйте его данные ради установки без сохранения нужного прогресса. Новый ключ необходимо хранить и использовать для всех последующих обновлений.

## Сервисы

AppMetrica API key: `69728c63-1c5c-4239-976f-cdfca334fb55`. SDK: Android 8.4.1, iOS 6.6.0. Инициализация при Let's Play, события экрана и подтверждённых игровых операций, без отправки полного сохранения; precise location выключена. Доставку в кабинете владельца нужно подтвердить там отдельно.

Terms: https://telegra.ph/Terms-of-Use--Merge-Heroes-Unite-War-09-11

Privacy: https://telegra.ph/Privacy-Policy--Merge-Heroes-Unite-War-09-11

Тексты адаптированы по предоставленному шаблону к фактическим функциям игры. Дополнительные email/Telegram не добавлены; контакты отсылают к странице приложения/профилю разработчика в магазине. Управление страницами требует приватного Telegraph token, который хранится отдельно от исходников и пакета.

Start.io: Android 5.3.1, iOS 4.14.0. **App ID Android/iOS ещё не предоставлены**, поля в `app-services.json` пустые. До их заполнения живое видео недоступно; чужие и тестовые идентификаторы не подставлялись. AppMetrica key не заменяет Start.io App ID. Баннеры, автоматическая стартовая/возвратная реклама и обычные interstitial отключены. IAP/реальные платежи/вывод денег отсутствуют, список платных продуктов не требуется.

Основная игра и ресурсы локальные. Реклама, аналитика и юридические страницы используют интернет. Это не прежняя полностью сетевая изоляция reference APK.

## Повторная сборка

Команды ниже выполняются из `cocos-spike/` (или корня распакованного Cocos source ZIP). Полная инструкция для чистого клона, карта кода и ассетов: [DEVELOPMENT.md](DEVELOPMENT.md).

Открыть исходники в Cocos Creator 3.8.8. На macOS нужны Python 3.11+, JDK 17, Android SDK 36/NDK r24, Xcode, CocoaPods, FFmpeg. Пути инструментов можно задать окружением:

```sh
export COCOS_CREATOR_APP=/путь/CocosCreator.app
export JAVA_HOME=/путь/jdk17/Contents/Home
export ANDROID_HOME=/путь/Android/sdk
export NDK_ROOT=/путь/android-ndk-r24
python3 tools/build.py --bundle
python3 tools/build-ios.py
```

Для сохранения подписи положить выданный `.jks` в `private/com.mergeheroes.unitewar.jks` и восстановить `private/android-signing.json` с `alias`, `storePassword`, `keyPassword` из приватного комплекта. Скрипт требует восстановить существующие ключ и параметры; новый ключ автоматически не создаётся. Нельзя заменять существующий ключ новым. Настройки SDK и ссылки менять в `app-services.json` перед сборкой.

На Windows установлен и проверен основной Android toolchain, описанный в `DEVELOPMENT.md`. `python tools/build.py --debug` использует debug keystore и `gradlew.bat`; `COCOS_CREATOR_EXE` должен указывать на установленный Creator 3.8.8. iOS на Windows не собирается.

Для физического iPhone: `python3 tools/build-ios.py --device` создаёт неподписанную сборку; затем требуются Apple Team владельца, provisioning и подпись в Xcode. Simulator не подтверждает работу live ads или реального хаптика на iPhone.

## Оставшиеся входные данные владельца

Start.io App ID для каждой платформы; Apple Team/подпись для iPhone/TestFlight; адрес и доступ к целевому GitLab для требуемой публикации исходников. Сейчас настроен только прежний GitHub remote. Локальный пакет подготовлен для передачи; публикация в магазинах или GitLab этим комплектом не имитируется. Итоговый `deliveryComplete` остаётся false до закрытия этих пунктов.

Новая экономика прямой покупки/продажи — согласованная продуктовая аппроксимация, не измеренные правила оригинала; точные формулы в `PLAN-1.8.md` и чистом core. Анимации и звук не начисляют награды/урон. Происхождение CC0-аудио сохранено в `audio-licenses/`.
# Windows verification — 2026-09-14

- Cocos Creator 3.8.8: `C:\ProgramData\cocos\editors\Creator\3.8.8\CocosCreator.exe`.
- First import and Android debug export completed successfully. `npm run typecheck` and `npm run check:core` pass.
- Debug APK: `build/android/merge-heroes-unite-war-debug.apk` (34,725,721 bytes). Installed with `adb install -r` on the preserved `MergeHeroes_API36` Android 36 emulator.
- Native smoke passed for cold launch, purchases, combat/reward progression, and deployment drag. The runtime marker for the formerly rejected tutorial target was `x=215, y=358, error=null`; combat continued and kills advanced. The user also confirmed the game opened successfully and then closed it manually.
- Settings opened the internal Terms and Privacy routes successfully; both scroll gestures completed without an exception.
- The emulator already contained completed-tutorial progress, so it was not erased or reset. The complete five-step fresh tutorial is additionally covered by `check:core`; the native run verified the repaired release target on preserved data.
- Root cause of the old tutorial defect: spotlight and release handling previously used mismatched/narrow battlefield geometry on short layouts. `battleDropArea()` is now the single responsive rectangle used by both `TutorialGuide` and `BattleScene`, with 16:9 and tall-layout regression coverage.
# Responsive visual fixes — 2026-09-14

- Artwork and actors now use aspect-preserving `contain`; only true scalable UI chrome uses nine-slice. Purchase cards and board slots are explicitly excluded from stretching.
- Deployed heroes share the visible arena ground baseline instead of the former staggered sky anchors. Actor frame changes and combat animations preserve bottom grounding.
- Settings remembers and returns to its actual source route, and a Settings shortcut is available on modal/meta routes that do not render the standard HUD.
- Terms and Privacy use a dedicated full-width clipped viewport. Label width is applied after Cocos creates the `Label`, preventing the narrow centered text column; overflow scrolls vertically.
- Android adaptive and legacy launcher art and the complete iOS AppIcon set use centered safe-area artwork. iOS outputs have the exact catalog dimensions and no alpha channel.
- Verified: `npm run typecheck`, `npm run check:core`, Cocos Android export, and Gradle debug assembly. Visual acceptance is delegated to the owner in BlueStacks as requested.
- Follow-up build 11 aligns enemy and boss ActorView containers to the same bottom ground baseline as deployed heroes. Settings and legal pages now keep separate return routes, preventing the Settings -> Terms/Privacy -> Settings -> Terms/Privacy loop. Typecheck, core checks, Cocos export and Gradle debug assembly passed; final device appearance/navigation verification remains with the owner.
- Build 12 moves the battle/merge section 24 px lower and reduces the three-row board gap from 69 to 57 px so ability controls, actors and the first merge rows sit lower without colliding with purchase cards/navigation. Slot hit testing and reserve positions use the same spacing. Android adaptive logo artwork is increased from 220 to 250 px within its 432 px foreground; legacy Android and opaque iOS masters increase from 560 to 680 px within 1024 px. Typecheck, core checks, Cocos export and Gradle assembly passed; visual acceptance remains with the owner.
- Build 13 replaces all ad-hoc previous/settings/legal return variables with one LIFO route history. Back now unwinds Shop -> Settings/legal/modal chains one screen at a time, and navigation to Battle clears the history. Ability icons render in a dedicated canvas layer below World, so deployed heroes, enemies and bosses always draw above them on every aspect ratio. Typecheck, core checks, Cocos export and Gradle assembly passed; device verification remains with the owner.
- Build 14 fully separates vertical regions instead of moving actors together with the board. The actor ground line stays fixed; boost controls start 18 px below it, the merge board starts lower, its row gap is 45 px and slot art is 60x46, keeping the third row above purchases on 16:9 and tall layouts. BattleScene, MetaScreens hit testing and TutorialGuide share BattleLayout constants. Geometry regressions now assert both boost-below-actors and board-above-purchases invariants. Typecheck, core checks, Cocos export and Gradle assembly passed; device verification remains with the owner.
- Build 15 moves the blue merge-panel top below the full 48 px boost controls with a tested minimum 8 px clear gap. Merge slot top offset is 28 px and row gap is compressed to 43 px, keeping all three 60x46 rows above purchase cards. Hit testing, reserve positions and tutorial highlights use the same constants. Typecheck, geometry/core checks, Cocos export and Gradle assembly passed; device verification remains with the owner.
- Build 16 positions the enemy HP bar from the fixed combat ground baseline instead of the independently shifted merge-board top. Track/fill/value move 33 px closer to the 104 px enemy/boss container while retaining a small head gap across aspect ratios. Typecheck, core checks, Cocos export and Gradle assembly passed; device verification remains with the owner.
- Build 17 replaces the launcher master with the owner-supplied root `icon.png` (512x512, fully opaque). The untouched square is centered at 300x300 in the opaque 432x432 Android adaptive foreground and at 700x700 in the opaque 1024x1024 legacy Android/iOS master, with a blurred extension of the same artwork filling outer mask space. All generated Android/iOS icon files were dimension-checked and verified opaque. Android APK/AAB and `build/delivery/merge-heroes-unite-war-1.8-17-android-review.zip` were rebuilt; device appearance remains for owner verification.
