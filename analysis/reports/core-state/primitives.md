# TASK-0074–0078 bounded checks

Reward tests: configured currency/item/spin grants, huge decimal amount, duplicate source with a different command ID, compacted receipt watermark, invalid mixed grant rollback, failed flush and reentrant duplicate. All pass. Receipts are applied to a private draft and become authoritative only at durable commit. Item batch limit 1000 is a PROPOSED defensive configuration ceiling.

RNG: xoshiro128** 1.1 known first output 11520 for state [1,2,3,4], 1000-step restore equality, independent presentation/reward streams, invalid state/bound rejection. Project choice is PROPOSED, not observed reference behavior. Algorithm source: https://prng.di.unimi.it/xoshiro128starstar.c (public domain).

Selectors: exact equality affordability above safe Number range, occupancy, lowest empty slot, configured DPS, source claimability, frozen-state identity. Clock: equal accepted elapsed sequences, five-step catch-up cap and explicit suspended background exclusion. Split-frame equivalence applies before deliberate stall-time dropping; dropped milliseconds are returned.

Input router: modal/tutorial precedence, second-pointer rejection, closing pointer-up retained by overlay, cancellation. Pure router harness PASS; actual Gesture Handler integration belongs to TASK-0093. Native lifecycle/device QA remains NOT_RUN. No new gameplay formulas claim reference parity.
