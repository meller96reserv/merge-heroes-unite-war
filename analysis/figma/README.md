# Figma analysis artifacts

[MEASURED] Local copy/inventory only. Original archive is ignored by the user's .gitignore and stays in docs. `raw/source.fig` is a byte-identical analysis copy; raw/images are source rasters, not production import. The CSV/JSON/source maps and contact sheets are review artifacts.

Reproduce in an isolated venv: install Pillow, numpy, scipy, ImageHash and jsonschema; run `python tools/analysis/fig_inventory.py`, then `python tools/analysis/semantic_map.py`. Tested with Python 3.13, Pillow 12.3.0, numpy 2.5.3, scipy 1.18.1, ImageHash 4.3.2, jsonschema 4.26.0. Browser capture used Playwright 1.62.0 + installed Chrome. Tool dependencies belong to analysis only.

MCP data is cached in node_inventory.json, text_inventory.json and styles_and_reactions.json; screenshots are direct 430×932 renders. Re-run read-only page inventory on the same file if design changes. Compare source hashes first; never assume current remote content matches a historical ZIP. `visual_classification.txt` is manually authored after visual inspection and is preserved across inventory regeneration.

See [audit](../../docs/07_FIGMA_TECHNICAL_AUDIT.md), [asset map](../../docs/08_FIGMA_ASSET_MAP.md) and [screen map](screen_map.json). No production imports have occurred.
