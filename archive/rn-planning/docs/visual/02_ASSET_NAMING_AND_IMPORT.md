# Asset naming and import

Use semantic IDs from semantic_map.json, retaining resolution suffixes until variant selection is reviewed. Filenames express category/family/role; original SHA/hash remains provenance only. Preserve source alpha and aspect ratio. Convert to runtime format through a reproducible import manifest, never overwrite raw extracted images.

For each selected asset record source hash, target pixel dimensions, pixels-per-unit, trim rectangle, original canvas size, pivot, atlas, compression, filtering, mipmaps and intended use. Foot pivot is proposed from alpha bounds for characters; center pivot is appropriate for icons. Negative/large transparent padding is inspected against adjacent variants. Do not independently trim animation variants without compensating offsets.

9-slice candidates are framed panels/buttons, not ornate character portraits or entire decorated screens. Insets remain null until border regions are measured; stretch tests at0.75×/1×/1.5× must preserve corners. Texture sRGB/color settings and premultiplied-alpha behavior are verified using dark/light backgrounds. Exclude reference-only scopes from runtime imports.

Acceptance: source hashes unchanged, all runtime IDs resolve, no accidental duplicate semantic runtime ID, no clipped glow/feet and no visible seams at intended display sizes.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
