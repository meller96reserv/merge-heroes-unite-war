# Merge animation specification

Proposed total650ms:0–80ms select/highlight compatible pair;80–260ms source converges toward destination with short trail;260–350ms compression/flash;350–470ms result reveal/pop;470–650ms settle and reward accents. Manual destination is drop target; automatic policy is a separate unknown and must not be inferred from this visual sequence.

Commit result before presentation. Store mergeId, source IDs, result ID and destination slot in the event. Both inputs are locked only for that presentation; after interruption redraw result from committed board and free the lock. A failed merge has no result bloom or currency sound. Max-tier incompatible gesture gets small feedback without consuming either hero.

Cascade plays serial links or bounded overlaps, intensity capped at fourth step, no unlimited pitch/particle growth. Low quality uses one ring/spark and reduced motion uses immediate result plus highlight. New-tier discovery popup queues after result; it must not block saving the merge. Popup dismissal cannot grant discovery reward twice.

Acceptance: record normal, cascade, full-board, max-tier, repeated input, background-at300ms and scene-exit cases. No transient source remains; pool count returns; final state is identical with animation disabled.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).

TASK-0165 implements a PROPOSED 1,500ms ancestry window, intensity 1–4 and pitch
1.00–1.18. Every committed event ID is processed in order (several auto merges
can share one transaction ID). Atomic intermediate heroes already consumed by
the same commit are coalesced into the surviving result's pulse. Four leases
cap concurrent rings; saturation drops only cosmetic work. Cancellation clears
ancestry, retains event deduplication and immediately shows the committed board.
[Unit acceptance](../../analysis/reports/motion/cascade/tests.tap) and
[browser acceptance](../../analysis/reports/motion/cascade/browser/results.json).
