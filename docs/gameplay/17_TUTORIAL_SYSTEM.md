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
