# Семантическая карта ассетов

[OBSERVED] Все 351 embedded assets просмотрены на [общих листах](../analysis/figma/contact_sheets/all_01.jpg) 01…06 и именованы в [ручной классификации](../analysis/figma/visual_classification.txt). [Manifest JSON](../analysis/figma/asset_manifest.json), [CSV](../analysis/figma/asset_manifest.csv), [semantic map](../analysis/figma/semantic_map.json), [source map](../analysis/figma/asset_source_map.json).

[MEASURED] Категории: equipment 109; UI 72; relic 34; backgrounds 29; hero 20; enemy 20; portraits 20; branding 16; reference 12; bosses 6; rewards 5; currencies 4; decorations 4. Две растровые версии большинства characters — не два новых типа героя. 10 визуальных hero families, 10 enemy families, 3 dragon bosses. Game stats и tier соответствия к этим families остаются U-035.

[PROPOSED] Каждая запись имеет descriptive semanticId с размером/variant suffix, source hash, source nodes, alpha bounds, target path, atlas, screens, prefab role, proposed pivot, 9-slice status, derivative policy и provenance. Target paths пока только проектируются. В production коде обращаться к visualId, не к hash. Полные source images сохраняются; automatic trim не выполнялся.

Usage sets: 283 `USED_IN_MVP` — разрешённые кандидаты для MVP/content selection, не обещание загрузить их одновременно; 52 `USED_POST_MVP` — relic/dungeon; 16 `UNUSED_OR_REFERENCE_ONLY` — screenshots, marketing, wallpaper. `UNKNOWN_UNCLASSIFIED`=0 по визуальному классу; gameplay meaning/rarity/license могут оставаться UNKNOWN. Перед import отобрать одну нужную resolution для usage lifetime.

Ключевые family aliases: `background_floating_islands` → main world; `background_castle_platform` → hero; `background_forest_glade` → relic; `currency_gold_coin`/`currency_gem_blue` → HUD; `ui_frame_board_slot`/`background_stone_slot` → board/purchase; `ui_button_orange` → CTA; `ui_icon_settings` → settings; `ui_wheel_outer_ring` → wheel; `ui_nav_shop`, `ui_nav_heroes_helmet`, `ui_icon_battle_swords`, `ui_nav_dungeon`, `ui_nav_crystal_relic` → пять tab icons. Точные выбранные hashes на каждом экране: [screen_map.json](../analysis/figma/screen_map.json).

Near duplicates не объединять без side-by-side: варианты ring/robe/weapon внутри family могут отличаться рисунком, размером и alpha. Герою foot pivot предлагается по alpha bbox; projectile socket требует ручного target-coordinate pass. 9-slice insets пока null с U-010, это gate на stretch, а не разрешение использовать неправильные borders.

[Ownership ledger](../analysis/figma/asset_ownership.csv), [gaps](visual/asset_gap_analysis.md), [import rules](visual/02_ASSET_NAMING_AND_IMPORT.md), [atlas plan](visual/03_SPRITE_ATLAS_PLAN.md), [screen catalog](09_SCREEN_CATALOG.md), [index](00_INDEX.md).

Implementation verification: [TASK-0027 decisions](../analysis/figma/near_duplicate_decisions.csv)
retain all167 candidate pairs after resolution/alpha/side-by-side review.
[TASK-0028 checks](../analysis/reports/asset_rights_validation.json) require either
distribution proof or explicit exclusion. All351 supplied assets currently have
`allowed_in_production=NO` for distributable release; no owner/license grant was
found in the supplied documents. Local source analysis/calibration may continue.
U-008 remains unresolved; TASK-0233 must validate selected release assets and proof.

Font acquisition: [five face mappings and license proofs](../analysis/figma/font_ownership.csv), [metrics and revision/fallback limits](../analysis/figma/fonts/README.md). These licensed fonts are separate from the351 raster assets with unverified distribution rights.

TASK-0030 [calibration overlay](../analysis/figma/import_calibration.json) supplies measured geometry for351 rasters and eight reviewed, bounded cap selections. The original semantic map remains the planning input; null insets never authorize stretch. [Calibration evidence and exclusions](../analysis/figma/import_review/README.md) preserve fixed-only decorated panels, geometric-pivot proposals and separate runtime import/release gates.

TASK-0031/0032 now provide the [definition/visual mapping](../analysis/figma/content_visual_mapping.csv) and [runtime residency plan](../analysis/figma/atlas_plan.json). Tiers1–9 match Figma badge placement; tier10 is a PROPOSED extension. Rarity and reference names are not inferred. [Validation and access limits](../analysis/reports/asset-import/README.md).
