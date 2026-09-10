# TASK-0146 bounded contract

The app-private transport writes a temporary candidate, verifies it, then replaces the inactive A/B file. One adapter serializes writes; encoded account/environment namespaces cannot escape the save directory. Corrupt recovery bytes are archived before replacement. The contract fake verifies write ordering, namespace isolation and failed-write preservation. TypeScript compilation against pinned Expo FileSystem 57.0.6 passes.

Actual Android/iOS execution, filesystem atomicity under process kill, physical power loss and explicit fsync behavior are NOT_RUN. Expo's public API exposes closed writes and file replacement, not a separately verified fsync barrier. TASK-0207 and TASK-0157 retain native crash/durability acceptance before release. This contract result does not mark those gates passed.

API source: https://docs.expo.dev/versions/latest/sdk/filesystem/ . Browser uses IndexedDB through the platform resolver; gameplay and rendering stay shared.
