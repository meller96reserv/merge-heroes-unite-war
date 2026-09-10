# TASK-0047 — Expo/RN application foundation

Status: PASS on Web. Root `npm run dev:web` launches the actual RN application on port 8082 using the shared native App module. Local CanvasKit initializes before that module imports Skia. No separate web gameplay implementation exists.

Verified: final-lockfile clean npm ci; TypeScript; Expo compatibility; production web export and actual exported-page boot/input; four real-browser cases (cold boot, state-preserving Fast Refresh without navigation, compact/tablet resize, failed WASM load and retry). [Browser results](browser.json), [production results](production-browser.json), [toolchain/source hashes](toolchain.json), [install log](clean-install.log), [export log](web-export.log).

The initial package map was refined by official Expo install --check to RN Web 0.21.2 and TypeScript 6.0.3. Final compatibility reports dependencies up to date. WebRoot reloads on WASM retry because the pinned Skia loader retains its rejected module promise. Production CanvasKit is copied from the locked package, with no runtime CDN dependency.

This acceptance covers the application foundation and bootstrap UI. The Skia game surface is TASK-0049; Figma battle reconstruction and gameplay remain subsequent tasks. Browser dev cold time includes Metro compilation and is not a release performance result. Android/iOS builds, physical audio and frame budgets are NOT_RUN for this task.

Source guidance: [Expo Skia installation](https://docs.expo.dev/versions/latest/sdk/skia/) and [Skia web initialization](https://shopify.github.io/react-native-skia/docs/getting-started/web/). [Architecture amendment](../runtime_amendment.md).
