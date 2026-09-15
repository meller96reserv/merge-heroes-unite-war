# Minimal first-session tutorial — current owner override (TASK-0141/0142)

Only five steps in the existing Battle screen: first successful purchase → second
purchase → real Tier1 merge → real deployment → observed automatic attack.
Persistent player.tutorialState: not_started,step_1,step_2,step_3,step_4,step_5,
completed. Purchases/merge/deploy checkpoint with the same gameplay transaction;
final completion saves only tutorial state after the real attack hint. Failure
cannot advance a step. Small Skip saves completed without any gameplay action.
No currency, hero creation, merge, deployment or damage from the tutorial.

For this initial hands-on flow, ordinary purchase auto-join is withheld while
onboarding is active; the purchased heroes stay owned in reserve until the
player taps one. This is an admission policy in the existing purchase reducer,
not a tutorial-issued Deploy command. Completed/legacy play keeps normal auto-
join up to capacity. Account1 still max1 active; account2 max2; all five visible
battle positions remain available and dock slots remain separate.

Reconcile forward from owned heroes/discovery/deployed state after restore.
Already-progressed pre-tutorial saves stay completed; an old empty new-account
save may start the guide. An active interrupted guide skips obsolete actions;
already deployed heroes proceed to the combat hint. Completed never restarts.
Hints/highlights are simple, nonblocking and hidden behind other routes. No
bespoke assets, cutscenes, voice, branching framework or advanced systems.
Target: explain the loop in approximately30–60s, not a timed reward/task gate.

The earlier reference tutorial below is historical supporting material and stays
POST_DELIVERY wherever it exceeds this five-step owner request.

# Data-driven tutorial

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

StepId persistent checkpoint; target semantic UI ID; tutorial input owner allows only required action.

## B. Inputs

Fresh save/version migration, command completed, popup acknowledged

## C. Outputs/events

tutorial.stepChanged/completed; overlay target/focus command

## D. State

tutorialVersion,completedSteps,currentStepId; transient overlay pointer

## E. Preconditions

Target exists and feature state eligible; already-completed event skips obsolete step

## F. Transaction order

resolve required step → acquire input token → show hand/message → observe committed domain completion → checkpoint → release → advance

## G. State machine

```text
BUY_FIRST→BUY_SECOND→DRAG_SECOND_TO_FIRST→NEW_HERO_ACK→DRAG_TO_FIGHT→TAP_WITHDRAW→DRAG_TO_FIGHT_AGAIN→TUTORIAL_ACK→COMPLETE
```

## H. Algorithms

```text
step.completeOnlyOn = committed event or explicit popup acknowledgment
if restored state already satisfies step: reconcile forward once
if target missing: release lock, show retry/skip-safe diagnostic; never freeze app indefinitely
```

## I. Config dependencies

tutorial.schema.json targetId,eventFilter,allowInputs,skipPolicy,version

## J. UI dependencies

SCREEN-003 + proposed NewHero overlay; Figma hand asset gap; tutorial overlays block underlying clicks selectively

## K. Animation/audio hooks

Animation IDs: `tutorial.hand`, `button.secondary`. Audio IDs: `ui.primary`. Haptic/interrupt decision: none for looping hand;target highlight static. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Persist completed steps with action transaction, not hand animation; migration maps stable step IDs

## M. Analytics

tutorial_step once per actual completion

## N. Edge cases

close midstep; delayed target load; second tap too fast; missing node; old tutorial version

## O. Test matrix

unit step advance only correct event; integration relaunch each step; manual full golden path

## P. Evidence

EV-009…011 two buys, drag, new hero, deploy/withdraw; current run completed tutorial acknowledgment

## Q. Unknowns

U-012 exact version; U-007 tutorial grants; U-030 later auto tutorial

## R. Acceptance criteria

Fresh run reaches free play; save at each step restores without double grant; no blocked invisible target; step order evidence-backed.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
