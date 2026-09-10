# Domain state and clocks

[PROPOSED] One GameState owns revision,dataVersion,player,currencies,heroes,board,progression,stages,unlocks,equipment,quests,daily,wheel,offline,settings,analyticsConsent,transactionReceipts. Schema: [save.schema.json](../data-spec/save.schema.json). View state (route,modal stack,drag,particle handles) is not authoritative economy state.

```text
AppState: BOOT→LOADING→READY↔PAUSED; validation/persistence failure→ERROR→RETRY
Battle: ENTERING→SPAWNING→COMBAT→DEATH→REWARD_COMMIT→CLEAR→TRANSITION
Boss: WARNING→COMBAT→WIN or TIMEOUT→FARMING→RETRY_AVAILABLE
Merge: IDLE→VALIDATING→COMMIT_PENDING→RESOLVED→optional CASCADE→IDLE
Claim: AVAILABLE→COMMIT_PENDING→COMMITTED→PRESENTED
```

Clocks: simulation tick fixed-step; animation clock interpolated/reducible; wall UTC for daily/offline; monotonic elapsed for profiling; UI cooldown derived from absolute eligibility timestamp. Debug speed changes explicitly selected sim/animation clocks, never real claim periods. RNG interface has separate seeded streams for combat and reward to keep cosmetic particles from changing results.

Invariants: balances nonnegative integers; one unit/slot; unit IDs unique; deployed IDs owned; consumed units absent; result tier valid; dead enemy reward once; source claim eligibility monotonic; save/platform-contract/data/asset versions independently known. Every command includes expectedRevision/idempotency ID; mismatch recomputes quote or rejects visibly. No giant GameManager or distributed booleans.

Commands produce candidate snapshot+event batch; adapter persists required checkpoint; acknowledgment installs revision and publishes events. Pending commit backpressure prevents newer mutations racing durable order. Tick-only visual updates do not trigger full save. [Architecture](technical/01_ARCHITECTURE.md) · [Save](technical/08_SAVE_SYSTEM.md) · [Events](technical/05_EVENT_SYSTEM.md).


[Индекс](00_INDEX.md).


Persistence refinement: save.data also contains nextInstanceSequence, separate combat/reward RNG states and timed autoMerge entitlement/enabled/expiry. RNG all-zero state is rejected by semantic validation; presentation RNG is not persisted. Auto expiry uses proposed monotonic-clamped wall UTC until reference background behavior is verified.
