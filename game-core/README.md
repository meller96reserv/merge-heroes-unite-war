# Pure deterministic game-core

Strict TypeScript, ES2022, with no DOM, Node, React Native, Skia or application
imports/globals. The boundary starts empty; domain commands/systems follow their
own task contracts. Runtime ports supply time, RNG, persistence and diagnostics.

`npm run build:core` compiles to ignored dist/core and enforces import direction.
`npm run test:core-boundary` verifies negative dependency/global fixtures without
writing broken examples into production source.
