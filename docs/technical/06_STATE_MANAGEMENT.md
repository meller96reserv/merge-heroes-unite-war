# State management

Maintain one normalized GameState and a separate ephemeral ViewState. GameState contains player, balances, owned heroes, board, progression, stages, equipment, unlocks, claims, settings and source watermarks. ViewState contains selected tab, popup stack, drag pointer, animation handles and inspection selection. See the save schema for persistence fields; derived DPS, red dots, affordability and formatted numbers are selectors.

AppState: Boot→Loading→Ready or RecoverableError; Ready can become Backgrounded or Exiting. MainBattleState: Idle/Encounter/Boss/Farming. MergeState: Idle/Validating/Committed/Presenting, with presentation cancellation returning to the current authoritative board. PopupState is an ordered queue with priority and dedupe key, not multiple booleans that can overlap.

Rewards follow a durable draft barrier. During an outstanding save the old visible balance remains authoritative; conflicting purchases/claims queue or return busy. A success installs the new revision then emits events. A failed write retains the old state, presents retry and keeps the same commandId for retry. Non-economic simulation state can checkpoint at a measured cadence, but kill rewards and stage transitions may not overtake the durable queue.

Red dots are derived from claimable rewards, affordable upgrades and unlocked unseen content; announcedIds survive restart. UI selection may be reset safely after migration. A changed account closes the current session before loading another save namespace.

Acceptance: opening the same popup twice produces one entry; updating a balance refreshes only subscribed selectors; interrupted animations reconcile state; stale expectedRevision returns a typed rejection without partial mutation.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)


Persistence refinement: save.data also contains nextInstanceSequence, separate combat/reward RNG states and timed autoMerge entitlement/enabled/expiry. RNG all-zero state is rejected by semantic validation; presentation RNG is not persisted. Auto expiry uses proposed monotonic-clamped wall UTC until reference background behavior is verified.
