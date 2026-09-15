# Target acquisition and stale-target policy

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

TargetId is encounter-scoped enemy identity; target policy is ordered eligibility, not nearest visual sprite unless observed.

## B. Inputs

Attack readiness, target died/despawned, encounter changed, roster replacement.

## C. Outputs/events

target.acquired / target.lost; deterministic AttackIntent target reference.

## D. State

Runtime targetId and encounterGeneration per combatant. No persistent pointer to a presentation resource.

## E. Preconditions

Target alive, correct encounter, legal class/range if enabled; attacker active.

## F. Transaction order

Build eligible target list → sort by configured policy → stable tie-break spawnOrdinal then enemyId → emit intent; revalidate at hit.

## G. State machine

```text
NO_TARGET→ACQUIRED→LOST→NO_TARGET; encounter change invalidates all old targets.
```

## H. Algorithms

```text
PROPOSED choose min(spawnOrdinal,enemyId) among alive eligible enemies
if intent.target generation != current: cancel
if target died before impact: cancel hit; no auto-retarget until observed
```

## I. Config dependencies

battle.schema.json targetingPolicy, rangePolicy, staleProjectilePolicy. Unknown exact priority stays configurable.

## J. UI dependencies

SCREEN-003 target highlight optional debug-only; enemy HP bar attached to current entity.

## K. Animation/audio hooks

Animation IDs: `projectile.travel`. Audio IDs: none. Haptic/interrupt decision: none;stale target cancels visual without fake impact. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Target references reset at encounter restore; stable IDs valid only in saved generation.

## M. Analytics

No production per-target event; debug trace includes decision order.

## N. Edge cases

Equal-distance enemies, zero targets, dying same tick, new spawn reusing view, AoE unsupported.

## O. Test matrix

Unit stable ties and stale generation rejection; integration two projectiles into dead target grants once; replay order unaffected by view insertion order.

## P. Evidence

EV-012 single early enemy seen; multi-target priority not established.

## Q. Unknowns

U-031 must close before REFERENCE_EXACT target policy.

## R. Acceptance criteria

All intents reference eligible current-generation entities; deterministic tie-break; pooled view reuse never redirects a logical hit.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
