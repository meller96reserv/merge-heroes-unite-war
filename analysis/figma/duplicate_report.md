# Duplicate report

[MEASURED] Exact byte duplicates: 0. Near duplicate candidates (64-bit pHash Hamming ≤6, aspect difference <0.15): 167.

Perceptual similarity is not interchangeability; inspect state, alpha and resolution before deduplication. See [pair data](near_duplicates.json).

TASK-0027: all167 pairs reviewed side-by-side across14 sheets. All differ in native
resolution and decoded RGBA; all originals are retained with explicit
[KEEP_BOTH decisions](near_duplicate_decisions.csv). No aliases or deletions.
[Measurements](near_duplicate_measurements.json) include alpha bounds, normalized
outline/RGBA differences and actual source-node usage. [Visual review](near_duplicate_visual_review.json)
binds the reviewed sheets and measurements by SHA-256.

NEAR-036/099 are distinct blue/dark panels with different proportions. NEAR-160/164
expose inconsistent small/large family names: each pair depicts one cannon design
at two resolutions, while the scoped and top-coil cannons are different designs.
NEAR-117 has a14.2% normalized alpha-outline difference in welcome lettering.
These observations do not authorize semantic-ID renaming, gameplay tier assignment,
ownership claims or loading every resolution into runtime memory.

Validation: `python3 tools/analysis/validate_near_duplicate_decisions.py`.
