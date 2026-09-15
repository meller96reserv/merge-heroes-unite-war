# Configuration and data schemas

Planning contracts live in data-spec. Future runtime data is generated into app/assets/game-data from reviewed source tables. Each record uses stable semantic IDs, explicit schema/data versions and evidence provenance. Observed values and proposed fixtures are separate files. Figma text is a visual fixture, not a balance import.

Validation order: parse JSON → JSON Schema 2020-12 → unique IDs → foreign keys → numeric bounds → graph constraints → visual/audio/profile existence → evidence/fidelity policy. Fail a build on unknown hero/asset references, zero total wheel weight, non-advancing merge results, circular next-stage graph, inaccessible required slot unlock, or reward table with an unsupported grant kind. Disabled optional modes are explicitly disabled, not populated with invented values.

Monetary values use canonical strings without leading zeros or floating notation. Rates declare time units; percentages use basis points. Timing fields end in Ms. Currency display is localized separately and never reparsed for transactions. Large-number fixture boundaries include 999/1000/999999/1000000 and values above Number.MAX_SAFE_INTEGER.

Generated data includes a content digest and source report; production startup verifies supported versions before state hydration. Config updates cannot invalidate active wheel outcomes or remove owned item definitions without an explicit migration/alias map. Tables can include reference-evidence IDs but production may strip large research metadata.

Acceptance: validate all configs in CI before Expo build; invalid references produce file/record/field diagnostics; a proposed fixture cannot silently pass the reference-parity release gate; generated output is byte-stable for identical inputs.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)

TASK-0050 implements the pure validation pipeline with an injected structural schema checker, followed by IDs/references/bounds/graph checks and a frozen result. A schema adapter is required, never an unchecked cast at an application call site. Current negative fixtures cover ordering and diagnostics; reviewed runtime content adapters are supplied by their owning content tasks.
