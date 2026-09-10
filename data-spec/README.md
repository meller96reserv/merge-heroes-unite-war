# Data contracts

[PROPOSED] JSON Schema draft2020-12. These are planning artifacts, not production data. Strict object keys except intentional maps/event payload extensions. Monetary amounts are canonical decimal strings; combat values safe nonnegative integers; multipliers in basis points. Schema validation is necessary but does not validate semantic cross-references by itself.

| Schema | Purpose |
| --- | --- |
| [animation](animation.schema.json) | versioned configuration / state contract |
| [audio-event](audio-event.schema.json) | versioned configuration / state contract |
| [battle](battle.schema.json) | versioned configuration / state contract |
| [bosses](bosses.schema.json) | versioned configuration / state contract |
| [bridge](bridge.schema.json) | SUPERSEDED historical spike fixture |
| [bridge-payloads](bridge-payloads.schema.json) | SUPERSEDED historical spike fixture |
| [daily-rewards](daily-rewards.schema.json) | versioned configuration / state contract |
| [economy](economy.schema.json) | versioned configuration / state contract |
| [enemies](enemies.schema.json) | versioned configuration / state contract |
| [enemy](enemy.schema.json) | single record |
| [equipment](equipment.schema.json) | versioned configuration / state contract |
| [hero](hero.schema.json) | single record |
| [hero-tiers](hero-tiers.schema.json) | versioned configuration / state contract |
| [heroes](heroes.schema.json) | versioned configuration / state contract |
| [merge](merge.schema.json) | versioned configuration / state contract |
| [modes](modes.schema.json) | versioned configuration / state contract |
| [prestige](prestige.schema.json) | versioned configuration / state contract |
| [projectiles](projectiles.schema.json) | versioned configuration / state contract |
| [quests](quests.schema.json) | versioned configuration / state contract |
| [rewards](rewards.schema.json) | versioned configuration / state contract |
| [save](save.schema.json) | versioned configuration / state contract |
| [skills](skills.schema.json) | versioned configuration / state contract |
| [stage](stage.schema.json) | single record |
| [stages](stages.schema.json) | versioned configuration / state contract |
| [summon](summon.schema.json) | versioned configuration / state contract |
| [tutorial](tutorial.schema.json) | versioned configuration / state contract |
| [unlocks](unlocks.schema.json) | versioned configuration / state contract |
| [wheel](wheel.schema.json) | versioned configuration / state contract |
| [worlds](worlds.schema.json) | versioned configuration / state contract |

## Data-file mapping and cross-validation

Future heroes.json→heroes.schema;hero-tiers.json→hero-tiers;enemies.json→enemies;bosses.json→bosses;stages.json→stages;worlds.json→worlds;economy.json→economy;merge.json→merge;unlocks.json→unlocks;equipment.json→equipment;rewards.json→rewards;quests.json→quests;wheel.json→wheel;daily-rewards.json→daily-rewards;animations.json→animation;audio-events.json→audio-event. Extra skills/projectiles/modes/tutorial only when required. All filenames above are future paths under app/assets/game-data, not created in planning.

Cross validators: unique IDs; all definition/asset/profile/localization refs exist; merge result tier advances validly; unlocked slot count≤capacity; deploy subset owned; wheel weights sum>0 and each outcome maps one segment; total spin free grants nonnegative; stage.next references valid except explicit end; boss farm stage valid; no orphan item refs; source watermark matches reward receipt; timestamp order from≤to; sum integer bounds. Reject PROPOSED content in reference-parity/release build unless explicit fidelity decision records it.

Schema default does not mutate data. Empty observed formula table means unknown. [Observed balance](reference_balance_observed.json) and [proposed fixture](proposed_balance_v1.json) never merge implicitly. Production uses direct [typed platform services](../docs/technical/18_PLATFORM_SERVICES.md). Historical protocol schemas remain only to validate archived examples; they are excluded from production code generation.

[Technical data](../docs/technical/07_CONFIG_AND_DATA_SCHEMAS.md) · [Tasks](../tasks/TASK_INDEX.md) · [Index](../docs/00_INDEX.md).


## Cross-system examples and IDs

[Subsystem presentation map](subsystem-presentation-map.json) resolves every gameplay/progression hook to canonical [animation](../docs/visual/animation_matrix.csv) and [audio](../docs/audio/audio_event_matrix.csv) IDs. [Domain event aliases](event-catalog.json) are translations,not duplicate emissions. [Bridge examples](bridge-examples.md),[valid pause](examples/bridge-pause.valid.json) and[valid save](examples/save-v1.valid.json) exercise the schemas. Matrix source status `custom needed` maps to schema enum `custom_needed` during config generation. RNG all-zero state and active auto entitlement/expiry consistency require semantic validation beyond JSON Schema.
