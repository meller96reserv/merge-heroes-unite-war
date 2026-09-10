# Purchase input capture — TASK-0009

The bounded live-research oracle is complete. [Cases](purchase_input_cases.csv) preserve visually reviewed before/after screenshots, SHA256, input count and timestamps; [result/limits](purchase_input_results.json). Dataset RUN-03 / LIVE_CRAZY3.16.2, desktop browser1440×1000. Auto off, zero deployed heroes, no farming during every input interval.

| Input | Board before → after | Gold before → after | Accepted buys |
| --- | --- | --- | --- |
| One tap | 5/6 → 6/6 | 4446 → 4442 | 1 |
| Full-board tap | 6/6 → 6/6 | 4449 → 4449 | 0 |
| 2000ms hold | 4/6 → 6/6 | 4442 → 4434 | 2 |
| 20rapid clicks | 1/7 → 7/7 | 6634 → 6604 | 6 |
| Press, move outside, release; wait2.5s | 4/7 → 5/7 | 6604 → 6598 | 1 |

The20 complete clicks have observed input-completion timestamps spanning0.144s. The accepted buys fill all six free slots, with six visible tier1 units. The aggregate30gold spend is measured; intermediate rapid-buy prices were not individually observed. Full-board tap and hold/rapid overflow show `Hero platform is full.` No extra charge appears in the rejected full-board case. A single pointer gesture moving outside still leaves its first purchase; no continuing repeat is visible after2.5s. This supports cancelling **future repeats**, not rolling back an already accepted buy. It does not establish OS pointercancel or exact down-versus-up timing.

## Bounded tier-advance investigation

Manual merges progressed through tier5 to Wizard tier6 and account level3. The tier6 discovery screenshot shows516/129/2.5 and+100gems/+1100gold, while the buy offer remains tier1. After dismissal six rapid accepted buys are visibly stilltier1. Therefore discovering tier6 alone did not advance this offer in this captured first-boss state. The generalized tier-upgrade trigger, late-game offers and mobile equivalence remain **UNKNOWN U-032**. Earlier incorrectly named `input-tier6-discovery` actually showed a swapped board, not a discovery; only `input-tier6-real-discovery` is used as that evidence.

**PROPOSED product contract:** an offer grants its explicit configured tier; automatic tier advancement requires an explicit configured unlock and is not inferred from the current highest discovered hero. Pointer release/cancel/background clears the hold token, stopping future commands while preserving accepted durable receipts. Hold delay/cadence stays configurable and PROPOSED until independently measured. The existing core purchase/input implementation tasks own executable domain/pointer tests after the native gate; this research does not introduce production gameplay.

Each hold/rapid/cancel/full case has one isolated sample; ordinary taps additionally have the30-sample cost series. Account/discovery rewards occurred between cases. No reference code, private assets or audio was extracted. Native touch and OS cancellation remain NOT_RUN.

```sh
python3 tools/analysis/verify_purchase_inputs.py
```

The command validates five captured cases and their count/currency/hash oracles; it does not rerun the reference.
