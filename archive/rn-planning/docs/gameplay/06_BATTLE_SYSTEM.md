# Deterministic battle simulation

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

EncounterId identifies one spawned enemy/wave; tick is fixed simulation time; presentation time is independent. Stage progress is separate from transient enemy HP.

## B. Inputs

Tick(deltaTicks), roster changed, enter stage, pause/resume, explicit retry; injected seeded RNG and config snapshot.

## C. Outputs/events

attack.intent, projectile.launched, damage.applied, enemy.died, reward.committed, stage.changed; ordered immutable event batch.

## D. State

Persistent stage/highest clear and reward watermarks; encounter snapshot/checkpoint per save policy. Runtime combatants, cooldowns, projectiles {hitTick,attackId,targetId}, RNG cursor, encounter generation.

## E. Preconditions

Validated definitions; spawned encounter; at least one active deployed hero for progress; app READY/foreground; pending durable reward blocks next stage.

## F. Transaction order

At fixed tick: cooldown/update statuses → eligible target acquisition → attack intents sorted by instanceId → scheduled hits → damage → death once → reward draft → durable commit → stage transition. View never reports an authoritative damage result.

## G. State machine

```text
ENTERING_STAGE→SPAWNING_WAVE→COMBAT→ENEMY_DEATH→REWARD_COMMIT→STAGE_CLEAR→TRANSITION; boss stage inserts BOSS_WARNING→BOSS_COMBAT; timeout→STALLED; app pause preserves checkpoint.
```

## H. Algorithms

```text
advance(realDelta): accumulator+=min(realDelta,maxFrameDelta)
while accumulator>=step && steps<maxCatchUp:
 tick++; advanceCooldowns(); acquireTargets(); produceAttackIntents()
 resolveScheduledHits(tick,encounterGeneration); resolveDamageAndDeaths()
 if rewardOrClearPending: waitForDurableCommit(); thenHandoffStage()
 accumulator-=step
background delta is handled by OfflineService, never thousands of catch-up battle ticks
```

## I. Config dependencies

enemy.schema.json, hero.schema.json, stage.schema.json, battle.schema.json: stepMs=50 and maxCatchUp=5 are PROPOSED performance fixture, not measured attack speed.

## J. UI dependencies

SCREEN-003 world, damage labels and stage HUD; adapters index views by entityId. Keep HUD outside world shake layer.

## K. Animation/audio hooks

Animation IDs: `hero.attack`, `projectile.launch`, `projectile.travel`, `projectile.impact`, `enemy.hit`, `enemy.death`, `damage.normal`, `damage.crit`. Audio IDs: `combat.melee`, `combat.ranged`, `combat.magic`, `combat.hit`, `combat.crit`. Haptic/interrupt decision: ordinary hits none;rare crit light with cooldown. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Economy always durable at death/stage boundaries. Proposed resume restarts current encounter with checkpoint roster and HP policy; no dead-enemy reward replay. Exact reference encounter persistence U-013.

## M. Analytics

stage_start/clear, boss_start/clear, error; optional combat traces only dev to avoid per-hit analytics traffic.

## N. Edge cases

Two hits kill same tick; dead target hit; roster merge mid-attack; boss transition pending projectile; frame spike; pause during impact; no active hero; invalid config.

## O. Test matrix

Unit deterministic same seed+commands; compare 16/33/100ms host frame partitions with same tick count. Integration 1000 progressions no deadlock/duplicate reward; mobile 30min soak.

## P. Evidence

EV-011 deployed Archer attacks automatically; EV-012 first enemy cleared, next stage visible and gold+1. Timing/formula not measured from static screenshot.

## Q. Unknowns

U-004 stats/timing, U-031 target policy, U-005 bosses, U-022 death, U-033 background/meta behavior.

## R. Acceptance criteria

Identical replay yields identical domain snapshot; no presentation/native/browser imports; every death transitions once; animation quality/time scale cannot alter combat result.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
