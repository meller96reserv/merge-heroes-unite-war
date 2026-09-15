# Measurement and curve fitting

[PROPOSED] Исполняемый контракт нашей реализации; observed facts перечислены отдельно в Evidence. Псевдокод описывает будущую реализацию и не является production code.

## A. Terminology

Observed display sample differs from damage measurement or mathematical derivation. Fit quality is a reported result, not proof from few samples.

## B. Inputs

Versioned samples CSV and timestamps

## C. Outputs/events

reference observed JSON; candidate fit report; separate proposed fixture

## D. State

sample IDs,source/version,tier/stage,display values,measurements,error

## E. Preconditions

Known sample provenance; minimum sample size appropriate; never mix platforms or Figma fixture numbers

## F. Transaction order

transcribe→cross-check→group version→test candidates→compute residuals→flag unsupported→review before config promotion

## G. State machine

```text
CAPTURED→VALIDATED→FIT_CANDIDATE→MEASURED/DERIVED; insufficient→UNKNOWN
```

## H. Algorithms

```text
cost models: table,base*growth^n,round/floor/ceil variants,piecewise
report maxAbsError,MAPE,holdoutError,n,rounding
for random damage use≥20hits/group and separate crit; no sample→no fit
```

## I. Config dependencies

reference_balance_observed.json/proposed_balance_v1.json; balance_fit.py

## J. UI dependencies

HUD abbreviations are display observations; raw numeric precision unknown

## K. Animation/audio hooks

Animation IDs: none. Audio IDs: none. Haptic/interrupt decision: none;measurement tooling does not change game presentation. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.

## L. Save implications

Data version changes independent of save schema; existing balances not silently rescaled

## M. Analytics

Simulation diagnostics CSV, no user telemetry needed

## N. Edge cases

Missing rows;K/M display ambiguity;early tutorial special price;outliers;version mismatch

## O. Test matrix

Fit synthetic known curve as analysis-tool selfcheck; empty dataset reports insufficient; runtime regression later

## P. Evidence

EV-009 two prices1; EV-010 Archer display; EV-012 first enemy1HP and gold1; EV-020 tier3discovery+1000gold/+100gems; EV-021 boss1-10HP70; EV-023 tier4discovery+1440gold/+100gems. BossHP70 breaks naive stage-index-squared extrapolation; no generalized curve claimed

## Q. Unknowns

U-003,U-004,U-005,U-006,U-034

## R. Acceptance criteria

Observed/proposed never mixed, every fitted number traces to sample and residual, exact parity gates remain visible.

[Evidence ledger](../03_EVIDENCE_LEDGER.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Screens/assets](../09_SCREEN_CATALOG.md) · [Semantic assets](../../analysis/figma/semantic_map.json) · [Schemas](../../data-spec/README.md) · [Phases](../../plans/00_EXECUTION_ORDER.md) · [Atomic tasks](../../tasks/TASK_INDEX.md) · [Index](../00_INDEX.md).
