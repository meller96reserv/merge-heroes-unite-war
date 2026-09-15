# Audio acquisition and rights

Acquire original commissioned, generated/synthesized or explicitly licensed library assets. Do not download/rip the live game's audio, code or private resources. For each event, keep source master, runtime file, creator, acquisition URL/invoice, license terms, attribution requirement, permitted distribution and review status. The ownership ledger now records TASK-0177–0179 original acquisitions; project provenance and reproducible source replace an external acquisition invoice for these synthesized assets. Music/ambience masters are reproducible locally; their hashes and compact runtime files are tracked. Final audible mix is a separate acceptance gate.

Short SFX should be trimmed without cutting natural decay, with tiny fades and mono unless stereo matters. Music/ambience retain clean loop metadata. Normalize deliberately with headroom; avoid blindly normalizing every file to identical peaks. Runtime codec/sample-rate choices are verified in RN audio adapter native/web builds; final audible quality and memory determine the encoding.

Acquisition sequence: UI/core combat/merge first for vertical slice, then rewards/meta, then music/ambience and optional modes. Briefs are in the event matrix, music and ambience documents. Generated assets still need provenance and license review; generation is not proof of unrestricted rights.

Acceptance: no event marked final without an actual file and rights record; no placeholder ships unnoticed; every imported clip resolves from the audio registry and passes loop/peak/audition checks.

## Traceability

[Event matrix](audio_event_matrix.csv) · [Audio index](00_AUDIO_INDEX.md) · [Runtime](../technical/13_AUDIO_RUNTIME.md) · [Visual hooks](../visual/animation_matrix.csv) · [Tasks](../../tasks/TASKS_PHASE_14.md).
