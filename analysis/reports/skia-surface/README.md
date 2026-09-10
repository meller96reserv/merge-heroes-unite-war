# TASK-0049 — Shared Skia surface acceptance

Status: PASS on Chromium Web, both Metro and production Expo export. Native execution
is NOT_RUN. Shared source: `app/src/rendering/GameSurface.tsx`, imported by the one
App component used by both native index.ts and WebRoot after CanvasKit initialization.

[Development pixel/gesture results](browser.json) and [production results](production/browser.json)
cover five actual cases: rendered marker drag, intermediate Reanimated release position,
cancelled gesture, compact/tablet visibility and three reloads with one canvas each.
Development marker moved (190.5,124.5)→(270,164), interpolated through (214.24,136.31)
and returned to (190.5,124.5). Cancellation returned to the same idle center. Screenshots
are retained beside each report; zero uncaught page errors.

[Bootstrap regression](bootstrap/browser.json) confirms state-preserving Fast Refresh,
local CanvasKit loading, resize and failed-load retry after adding Skia. TypeScript
and production web export pass. [Source hashes](source-hashes.json) identify this
accepted implementation; source changes for later Figma tasks do not rewrite this evidence.

The bootstrap composition is intentionally bounded foundation work. Figma visual
acceptance, merge/purchase/battle, persistence integration, native graphics/audio and
performance budgets remain separate task oracles. No reference-formula or full-game
completion is claimed.
