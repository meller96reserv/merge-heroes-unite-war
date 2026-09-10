# Logical projectiles and pooled presentation

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Logical projectile = scheduled hit record; visual projectile = disposable pooled sprite. Only domain clock resolves damage.

## B. Inputs

attack.intent ranged; tick reaches hitTick; pause; encounter/target invalidation.

## C. Outputs/events

projectile.launched/impact/cancelled; one damage resolver call per attackId.

## D. State

Runtime projectileId, attackId, targetId, encounterGeneration, launchTick,hitTick, stat snapshot. Renderer stores start/end socket positions.

## E. Preconditions

Ranged attack valid; configured projectile profile exists; pool exhaustion cannot prevent logical hit.

## F. Transaction order

Schedule logical record → acquire view if budget → interpolate against tick fraction → at hitTick revalidate target → resolve once → recycle all transient state.

## G. State machine

```text
SCHEDULED→IN_FLIGHT→IMPACTED→RECYCLED; stale target/encounter→CANCELLED→RECYCLED.
```

## H. Algorithms

```text
alpha=clamp((renderTick-launchTick)/(hitTick-launchTick),0,1)
view.position=curve(socket,targetAnchor,alpha)
onHitTick: if generation/target valid resolveDamage once else cancel
recycle resets opacity,scale,trails,listeners and target refs
```

## I. Config dependencies

projectiles.schema.json speed/travelTicks/visualId/trailProfile; animation markers; object-pool capacities.

## J. UI dependencies

SCREEN-003 ProjectileLayer below HUD and above combatants; separate debug socket overlay.

## K. Animation/audio hooks

Animation IDs: `projectile.launch`, `projectile.travel`, `projectile.impact`. Audio IDs: `combat.ranged`, `combat.magic`, `combat.hit`. Haptic/interrupt decision: none;pool overflow affects cosmetics only. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Proposed resume clears transient projectiles and restarts encounter consistently; alternative exact checkpoint must serialize hit schedule+resolved IDs together.

## M. Analytics

Pool misses and cancelled stale hits are dev/performance metrics.

## N. Edge cases

Two projectiles same kill; target despawn; scene switch; zero travel ticks; pool exhausted; pause at impact; recycled generation.

## O. Test matrix

Unit no duplicate hit; integration kill+stage boundary cancels stale projectile; stress pool reuse1000 cycles, allocations flat after warmup.

## P. Evidence

EV-012 visible Archer arrow in live screenshot; exact trajectory/impact timing unknown.

## Q. Unknowns

U-031 retarget; U-004 timing; U-026 sockets.

## R. Acceptance criteria

Presentation may be skipped without changing result; pool release always executes; no previous-stage projectile damages new enemy.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
