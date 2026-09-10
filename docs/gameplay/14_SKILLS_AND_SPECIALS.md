# Skills and specials (conditional)

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Skill=effect definition with duration/stack/target/cooldown; not ordinary attack animation.

## B. Inputs

Verified active/passive skill trigger only

## C. Outputs/events

skill.started, status.applied/expired if in scope

## D. State

cooldown/status stacks plus duration ticks only for approved skills

## E. Preconditions

Presence and mechanics verified; otherwise feature disabled

## F. Transaction order

validate → cost/cooldown reserve → deterministic target list → effect resolve → durable grant if any → visual hooks

## G. State machine

```text
DISABLED; future READY→CASTING→COOLDOWN→READY
```

## H. Algorithms

```text
until observed: no skill commands accepted
future effect ordering: expire→refresh/stack by explicit rule→recompute stats
```

## I. Config dependencies

skills.schema.json optional content; battle damage/target policies

## J. UI dependencies

No unverified button added to Figma main

## K. Animation/audio hooks

Animation IDs: `hero.attack`. Audio IDs: `combat.magic`. Haptic/interrupt decision: none until specific skill approved;magic art alone is not a gameplay skill. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Do not create unused save fields except versioned empty capability collection

## M. Analytics

skill_used only if implemented

## N. Edge cases

stack overflow, stun interrupt, expired caster

## O. Test matrix

schema rejects unsupported effect; unit future refresh/stack rules

## P. Evidence

EV-004 magic-looking art only

## Q. Unknowns

U-021

## R. Acceptance criteria

Documented UNKNOWN and post-MVP gate; no invented skills reach MVP configs.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
