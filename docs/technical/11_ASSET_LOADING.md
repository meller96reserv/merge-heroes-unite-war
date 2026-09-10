# Asset loading

Source inventory contains 351 images, approximately 905.53 MiB decoded RGBA if all loaded. This is a source-library size, not a runtime budget. Load a minimal boot bundle, then shared HUD/board plus current-world entities. Equipment, relic, dungeon and reward art load on route demand. Release route-specific references after transitions and pool drains.

Use semantic asset IDs from analysis/figma/semantic_map.json. Import tooling chooses the appropriate resolution variant by measured on-screen size, preserves aspect ratio/alpha and emits a static semantic RN asset registry. Original .fig and extracted source hashes remain unchanged. Reference screenshots and marketing frames are excluded from runtime bundles.

Atlas groups: ui_common, ui_battle, ui_meta, icons_currency, portraits, equipment_by_family and effect_primitives. Large full-screen backgrounds remain standalone; large character variants are sized before packing. Target atlas edge 2048 initially; avoid one all-assets atlas and scene-spanning accidental residency. Mipmaps default off for pixel-aligned 2D UI, enable only after a world-scale sampling test. Platform compression choices are benchmarked for alpha/outline fidelity.

Loading failures display retry/fallback for optional visuals; a required definition visual failure prevents entering a broken battle. Asset requests have cancellation/generation guards. Concurrent requests deduplicate by bundle key; releasing an old screen cannot evict assets retained by another.

Acceptance: cold boot does not decode all 351 sources; ten meta-route cycles return near baseline memory; airplane-mode native launch uses bundled essential assets; atlas changes preserve trim offsets and grounded character feet.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)
