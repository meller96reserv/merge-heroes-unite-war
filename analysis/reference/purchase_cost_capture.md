# Purchase cost capture — TASK-0008

Status: **PASS for the thirty-sample research oracle**, RUN-03 / LIVE_CRAZY3.16.2. Exact reference formula remains UNKNOWN.

[Measurements](purchase_cost_series.csv) contain thirty consecutive **accepted** purchases. Each row links the before/after screenshot with SHA256 and before/input/after monotonic timestamps. Source is the public game rendered in a fresh isolated desktop browser profile at 1440×1000; no reference code or audio was extracted. All purchased units were tier1. Visible deployed count was zero and auto was off during each measured purchase interval. Ordinary enemies were not being farmed.

| Accepted ordinals | Displayed and deducted gold per purchase | Count |
| --- | --- | --- |
| 1–15 | 1 | 15 |
| 16–23 | 2 | 8 |
| 24–29 | 3 | 6 |
| 30 | 4 | 1 |

Total deducted: **53 gold**. Thirty of thirty displayed prices equal their isolated before-minus-after delta, with one new unit per accepted tap. Discovery, tutorial and account rewards occurred **between** measurement intervals; net session balance is not a purchase-cost oracle. Manual merges freed slots. A full-board rejected tap between accepted purchases28/29 spent zero and did not advance the observed next price.

Raw snapshot names are capture labels, not authoritative purchase counts. `purchase-09-after` through `purchase-12-after` were masked tutorial attempts with no purchase. `purchase-accepted-17-after` only dismissed the delayed discovery popup, so actual accepted purchase17 uses raw `purchase-accepted-18-after`. These attempts are excluded from the thirty-sample CSV. The CSV ordinal and visible state delta are authoritative.

## Candidate comparison and limits

[Fit report](purchase_cost_fit.json) and [per-sample residuals](purchase_cost_residuals.csv) keep observation and fitting separate. Residual = observed price minus candidate prediction. For n beginning at1, `floor(1.05^(n−1))` has RMSE0 and30 exact matches. Constant1 has RMSE1.169; unrounded exponential0.536; round-half-up0.658; ceiling0.983. A piecewise table copied from the measured intervals also has zero residual and is explicitly overfit.

Even within the restricted `floor(r^(n−1))` family with initial coefficient fixed at1, every r in **[1.0489642553230345, 1.0507566386532194)** matches these thirty observations. Two distinct interior rates were checked. This is a derived compatibility interval, not a confidence interval or a recovered reference constant. There is no independent holdout series, late-tier evidence or installed-mobile equivalence. Generalized rounding/count indexing/extrapolation remains U-003.

**PROPOSED product decision:** retain a data-driven positive integer offer schedule and the existing isolated fixed-cost development fixture until the economy implementation tasks choose/configure the production schedule. The measured thirty-price table may be used as a versioned research acceptance fixture. The fitted exponential must not silently become OBSERVED balance or production authority.

Reproduce integrity/delta/count checks and candidate residuals:

```sh
python3 tools/analysis/fit_purchase_prices.py
```

The check validates60 screenshot references/hashes, chronological input intervals,30 sequential accepted ordinals, one unit/price per row and two indistinguishable growth rates. It does not rerun the live game or claim OCR; values were visually reviewed in the captures. Initial validation found inconsistent CSV spelling `false` versus `NO` for inactive farming; it was normalized without changing any measurement.
