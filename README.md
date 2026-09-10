# Merge Heroes Unite War

React Native + TypeScript game, using Expo, Skia, Reanimated and Gesture Handler.
Android, iOS and Web share application code and assets.

```sh
nvm install
nvm use
npm ci
npm run dev:web
```

Open **http://localhost:8082**. Fast Refresh is enabled. The current workspace also
uses its existing local Node 22 automatically when the terminal still uses Node 20.
A fresh checkout requires Node 22 from `.nvmrc`.

```sh
npm run typecheck
npm run check:expo
npm run build:web
```

Current milestone: a [playable shared battle](app/README.md) with Figma assets,
buy/spawn, drag/drop/merge, auto combat, durable rewards, six stages, boss timers,
manual retry/farming and row unlocks. Calibrated hero motion, distinct boss
reactions and a staged merge reveal now run in the shared Skia presentation. Buy a hero with the centre card; drag equal
heroes together to merge; tap a board hero to deploy or withdraw. Three heroes
can fight at once. Clear bosses to open more board space.

[Current acceptance evidence](analysis/reports/motion/checkpoint.md) records browser,
save, core and production web checks. Full Figma pixel calibration, remaining
screens/audio/rewarded providers and native acceptance remain separate tasks in
the [task order](plans/00_EXECUTION_ORDER.md).

[ADR-007](docs/adr/ADR-007-RN-SKIA-RUNTIME.md) · [Product/design documentation](docs/00_INDEX.md) ·
[Task manifest](tasks/task_manifest.json) · [Execution rules](CODEX_EXECUTION_RULES.md).
The [historical spike](spikes/rn-cocos/README.md) is SUPERSEDED.

Current delivery scope: [required work, deferred groups and DELIVERY_COMPLETE gate](plans/DELIVERY_SCOPE.md).
