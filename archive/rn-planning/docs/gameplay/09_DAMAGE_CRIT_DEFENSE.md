# Damage, defense and crit resolver

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Damage is nonnegative integer; multipliers integer basis points (10000=1); RNG draws explicit; displayed attack may differ from effective damage.

## B. Inputs

AttackIntent immutable stat snapshot, defender stats, injectable RNG.

## C. Outputs/events

DamageResult {raw,crit,mitigated,applied,hpBefore,hpAfter,attackId}; death candidate if HP crosses zero.

## D. State

Runtime HP and RNG cursor; definition/config immutable. Currency numerical representation separate from combat small integers.

## E. Preconditions

Finite safe-integer combat stats or explicit bigint representation; probability within0..10000; multiplier valid; attackId unresolved.

## F. Transaction order

Check intent uniqueness → draw crit once if applicable → calculate raw → defense → round at specified step → clamp applied to remaining HP → mark resolved → detect death crossing.

## G. State machine

```text
UNRESOLVED→RESOLVED_NORMAL/CRIT→APPLIED; duplicate→IGNORED; invalid config→ERROR.
```

## H. Algorithms

```text
PROPOSED fixture only:
crit = rngBp()<critChanceBp
raw=floor(attack*(crit?critMultiplierBp:10000)/10000)
damage=max(1,raw-defense) for positive damaging intent
applied=min(hp,damage); hp=max(0,hp-applied)
Reference formula remains UNKNOWN until fit validates samples.
```

## I. Config dependencies

battle.schema.json damageModel/rounding/minDamage; hero/enemy stats; proposed_balance_v1 separate from reference_balance_observed.

## J. UI dependencies

SCREEN-003 normal/crit damage labels; same number formatter as HUD; show zero/miss only if mechanics established.

## K. Animation/audio hooks

Animation IDs: `enemy.hit`, `damage.normal`, `damage.crit`. Audio IDs: `combat.hit`, `combat.crit`. Haptic/interrupt decision: crit light with cooldown;no per-digit feedback. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

HP checkpoint policy explicit; never persist post-death state without matching reward token/watermark.

## M. Analytics

Only aggregated battle metrics; no RNG/private state network disclosure.

## N. Edge cases

Defense>=attack; zero/negative inputs; damage>HP; simultaneous attacks; crit0/100%; integer bounds; evade/block UNKNOWN.

## O. Test matrix

Unit boundary probabilities, rounding and clamping; seeded distribution sanity; observed-data regression requires≥20 samples/tier/target; no formula promotion on one hit.

## P. Evidence

EV-004 Figma stat labels; EV-010 display values; neither proves formula.

## Q. Unknowns

U-004 and U-034; block reference balance import until residual analysis and rounding choice documented.

## R. Acceptance criteria

No NaN/negative HP/overflow; result reproducible; duplicate attack causes no mutation; every numeric constant either config fixture or evidence-backed.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
