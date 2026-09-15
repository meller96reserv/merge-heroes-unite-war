# Shipped roster amendment — TASK-0229

PROPOSED shipped-roster-v2, authorized by owner physical review. Stage IDs1–6,
early HP/rewards, manual boss retry/farm and unlock thresholds3/6 remain compatible.
The chapter now covers the supplied10 normal enemies and3 distinct dragon bosses:
1 boar;2 crocodile/goblin;3 infernal boss;4 fire lizard/gargoyle;5 slime/wolf;
6 frost boss;7 mushroom/beetle;8 bat mage;9 shadow boss. Final stage remains
repeatable using existing terminal-stage behavior. Added normal HP220/260/320,
shadow bossHP1200/16s, clear gold20/25/150 are project-defined, not reference facts.
Legacy boar-named profile IDs are compatibility aliases for their mapped artwork.
No new progression subsystem or deferred content campaign is activated.

Initial production board is empty with5 usable slots. A player purchase places
and deploys the first hero, starting combat; no deployed hero means no combat or
boss timer advancement. Existing owned heroes/progress are preserved. Older earned
unlock flags reconcile durably on load; UI shows Boss1-3/1-6 requirements and a
brief highlight when each earned row opens.

The older six-stage fixture below remains historical context.

# Playable-v1 stage chapter — PROPOSED

TASK-0111 defines six stages for the shared runtime. These are explicit product fixtures under ADR-007, not recovered reference balance. The supplied Ironhide Boar semantic art remains the visual family; stronger variants do not imply new observed characters. A wave entry spawns its configured count together; entries run sequentially. Farm links are intentional return transitions, separate from the acyclic next-stage graph.

| Stage | Sequential waves | Enemy HP | Gold per kill | First-clear gold | Boss timer / farm |
| --- | --- | --- | --- | --- | --- |
| 1-1 | 1 | 40 | 1 | 5 | — |
| 1-2 | 2 | 60 | 2 | 8 | — |
| 1-3 | 1 | 180 | 5 | 40 | 8 sec / 1-2 |
| 1-4 | 2 | 120 | 3 | 12 | — |
| 1-5 | 1 | 160 | 4 | 15 | — |
| 1-6 | 1 | 600 | 10 | 100 | 12 sec / 1-5 |

Normal enemies and bosses in this chapter do not counterattack. A boss fails by its foreground timer. The lethal hit wins a same-tick timeout tie. Manual retry is free and creates a fresh encounter identity. Failed attempts farm the configured ordinary stage without automatically re-entering the boss. The terminal stage repeats for kill rewards; its first-clear grant remains once only. Owned heroes are never destroyed by an enemy.

The stage runtime tasks own activation and acceptance of these rules. TASK-0111 validates content only; no unimplemented timer or first-clear behavior is marked complete here.

TASK-0112 adds an optional `stages.waveOrdinal` save field. Existing saves without it remain valid and resume wave 0; new snapshots persist the cursor. No currency, board or receipt is reset. Each wave consumes a fresh global encounter sequence. Progression requires the matching clear receipt and records its own once-only boundary watermark. Stage schemas cap a group at 32 enemies and a stage at 100 sequential waves, matching runtime bounds.

TASK-0116 defines the two row unlocks: first clearing 1-3 opens slots 6–10, and first clearing 1-6 opens slots 11–15. Conditions use highest cleared ordinal, not the currently viewed stage. Unlock and announcement markers are separate durable fields; returning to a farm stage never relocks a slot. No account level, wheel cooldown, ad entitlement or unrelated menu is inferred from these proposed row thresholds.
