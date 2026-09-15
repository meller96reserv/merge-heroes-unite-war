# Технический аудит Figma

[MEASURED] Основной архив `docs/Merge Heroes Unite War.fig`: 241 954 197 bytes (230.7455 MiB), ZIP, 355 members с учётом directory entry. Изображений 351: 349 PNG, 2 JPEG; 324 с альфа-каналом. `canvas.fig` 658 966 bytes, `thumbnail.png` 62 697 bytes. CRC всех members проверен; source SHA-256 до/после одинаков. [Отчёт](../analysis/figma/inventory_summary.json), [log](../analysis/figma/extraction_log.md).

[OBSERVED] Metadata: имя `Merge Heroes Unite War (Copy) (Copy)`, export `2026-09-08T11:38:21.907Z`; thumbnail 400×108; canvas bounding region x=-9859, y=-1672, w=17544, h=4737; background ≈#1e1e1e; developer links пусты. [meta](../analysis/figma/meta.json).

[MEASURED] 0 byte-exact duplicates; 167 perceptual candidate pairs при pHash64 distance ≤6 и разнице aspect <0.15. Это кандидаты, не доказательство идентичности. 23 portrait candidates включают backgrounds и низкие/высокие версии экранов. Сумма w×h×4 = 949 517 472 bytes (~905.53 MiB), без mipmaps/дополнительных copies. [Duplicate report](../analysis/figma/duplicate_report.md).

[OBSERVED] Живой файл содержит одну Page 1 и 1 801 узел, 296 text nodes, 21 комбинацию типографических свойств, 671 node с image fills. Из 185 distinct fill hashes все найдены в локальном archive; 166 остальных растров классифицированы визуально. 15 artboards 430×932 представляют 11 семейств экранов и варианты. Шесть 1080×1920 marketing frames и широкий promotional component учитываются отдельно, это не новые gameplay screens. [Hierarchy](../analysis/figma/node_inventory.json), [screens](../analysis/figma/screen_map.json).

Canvas zoning: слева marketing captures x≈-9859…-2042; loading text/branding x≈-1187…253; основной ряд экранов x=-755…7373, y=-536; daily variant y=-1574; component/character/equipment atlas ниже ряда. Полное zoning строится по actual x/y в inventory; thumbnail — обзор, не источник точных bounds.

## Воспроизводимость

`python tools/analysis/fig_inventory.py` (Pillow, ImageHash, numpy/scipy) копирует archive в analysis/figma/raw/source.fig, проверяет path traversal/CRC, извлекает metadata/images, считает SHA/pHash/alpha bbox, пишет CSV/JSON и contact sheets. Затем `python tools/analysis/semantic_map.py` объединяет ручную классификацию и сохранённую read-only hierarchy. Версии окружения и команды — [analysis README](../analysis/figma/README.md).

## FIGMA_HIERARCHY_LIMITATIONS

[OBSERVED] У старого file key нет доступа. `get_metadata` не разворачивает все descendants; полный inventory получен paginated read-only Plugin API calls, 1 801 unique IDs. Большой единый JSON tool response был truncated на 20 KiB, поэтому он не использован. Реакций prototype найдено 0: навигация в specs предложена, не извлечена из работающего prototype. Screenshot URL endpoint вернул пустые bodies; изображения повторно получены через inline MCP и декодированы локально. Ни один пустой screenshot не принят за evidence.

[UNKNOWN] Канонический layout constraints/paint visibility отдельных nested overrides требуют targeted export перед production import. Names не равны actual text; [text inventory](../analysis/figma/text_inventory.json) хранит characters. Оригинальный бинарный canvas не декодировался сторонним parser, так как доступна первичная hierarchy. [Asset map](08_FIGMA_ASSET_MAP.md).
