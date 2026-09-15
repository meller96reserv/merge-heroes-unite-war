# Core loop and transaction boundaries

```text
eligible gold → Buy command → cost+unit atomic commit → first free unlocked slot
→ manual compatible merge (tutorial) / eligible auto scheduler
→ result tier+discovery transaction → deploy/withdraw roster decision
→ tick-based automatic attack → validated target/impact → enemy HP/death once
→ kill reward commit → stage first-clear/unlock commit → next encounter or farm/retry
→ resources feed next buy/upgrade
background → save time → offline pending entitlement → claim commit → foreground loop
```

[OBSERVED] Initial gold100, two quoted purchases1; first merge tier1+1→2; new Archer popup+100gems/+10gold; deployment retains board slot and consumes active roster capacity; first kill gold+1 and stage1-2. These are bounded first-session samples. Auto ordering/cost growth/advanced balance remain U-002/003/004. Hold can fill open slots; full board has explicit message (EV-015).

[PROPOSED] Commit sequence serializes conflicting commands. Twenty Buy taps evaluate latest revision in order; no global animation lock. Full board rejects spend, leaves compatible merge available. Three equal units settle toone result+one source; four equal can cascade under configured auto policy. Deployed merge effects follow explicit policy before next tick.

Reward source IDs distinguish repeatable kill, first stage clear, first hero discovery, daily period, wheel spin and offline interval. Expired/duplicate entitlement cannot regrant even after scene change. Foreground navigation policy and background offline policy are separate. [Rewards](progression/06_REWARDS.md) · [State](17_GAME_STATE_MODEL.md).


[Индекс](00_INDEX.md).
