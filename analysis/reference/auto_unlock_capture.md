# Auto-merge activation — TASK-0006

Status: bounded capture complete. Dataset: LIVE_CRAZY3.16.2, RUN-02 isolated Chrome guest, 2026-09-08. This report rechecks existing first-party observation artifacts rather than inventing a new repetition. Sample count: one observed unlock/activation sequence, two purchase inputs for the following cascade. RUN-03 independently reconfirms the web version in [version_lock.json](version_lock.json).

| Step | Input / before | Observed after | Evidence |
| --- | --- | --- | --- |
| Finish early tutorial / first boss | Manual purchases/merge/deploy/withdraw; defeat stage1-10 HP70 with Magician3 | Boss grant +10000 gold; auto booster becomes a tutorial target | [Boss clip](clips/boss_retry_win.mp4), original video PTS2860…2890s; EV-021 |
| Open auto panel | RUN-02 monotonic3431.699s: click(545,478); gems200 | OFF, timer00:00:00; offer says60minutes; Free video button and500gem button | [CAP-052](screenshots/after_boss_unlock.png), capture3432.501s |
| Activate free option | RUN-02 monotonic3776.903s: click(615,555), wait10s | Panel dismisses; countdown00:59:51; gems remain200; deployed hero continues combat | [CAP-053](screenshots/auto_free_activation.png), capture3787.031s; [activation clip](clips/auto_activation.mp4), original PTS3775…3789s |
| Demonstrate active behavior | Two buys with tier2 reserve and tier3 deployed | Cascade creates Berserker4; final result remains deployed in slot2; active countdown visible | [Cascade clip](clips/auto_cascade.mp4), original PTS3807…3821s; [CAP-055](screenshots/auto_cascade_settled.png); EV-023 |

The screenshots were visually reread during implementation. Exact input timestamps come from [session_timeline.json](session_timeline.json); command time and video PTS have scheduling uncertainty and are not interchangeable for subframe timing. The source video hash/format is in [video_metadata.json](video_metadata.json). No reference code, private assets or audio was extracted.

The observed availability sequence is “first boss victory → tutorial points to auto → panel can be opened”. This is one sequence, not proof of a universal stage-only unlock predicate. A paid500gem activation was not attempted: the observed balance200 was insufficient and there is no need to acquire paid currency. The UI price is OBSERVED; a successful paid debit is NOT_RUN. Free activation was observed once; ad-provider verification and repeat limits are UNKNOWN.

U-030 now distinguishes the observed60-minute offer, free activation and countdown from unobserved expiry persistence, background elapsed-time policy, stacking and reactivation. The proposed guarded UTC entitlement in the auto system remains a product rule, not an observed internal implementation. Those unresolved cases stay explicit for auto/save acceptance. Mobile behavior is UNKNOWN and excluded from this dataset.

Acceptance: expected reachable activation cost/duration/availability evidence exists; actual before/input/after artifacts verify60minutes, Free/500gem choices, no gem debit on this free trial and active auto behavior. No expiry, paid path, generalized unlock formula or advertising SDK claim is marked PASS. [Auto contract](../../docs/gameplay/04_AUTO_MERGE_SYSTEM.md) · [Unknowns](../../docs/04_UNKNOWNS_REGISTER.md).
