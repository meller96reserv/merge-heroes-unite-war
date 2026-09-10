# Shipped economy v2 — TASK-0229 pacing correction

Owner-authorized shipped slice of TASK-0192; its broader research task stays deferred.
The first 30 tier-1 prices match RUN-03 (15×1, 8×2, 6×3, 1×4; total 53).
Everything below is a PROPOSED project balance, not a recovered reference formula.

Recruitment counts persisted tier-1 equivalents across all three offers (1/2/4).
After the observed table, a unit costs `4 + floor((index-29)^2/1600)` gold.
Higher offers sum the equivalent next unit prices; switching offers cannot reset
growth. Initial 100 gold buys at least 32 but fewer than 64 base units. 1000 gold
buys at least 128 but fewer than 256; even 10000 buys fewer than the 512 units
needed for one tier-10 hero. These are recruitment-only bounds, not playtime claims.

Discovery grants are 0/5/10/15/25/40/60/90/140/220 gold. Enhancement costs
25×currentLevel² gold; archetype upgrades cost 5×(level+1)×(1+floor(level/5)) orbs.
The first enhancement and upgrade remain 25 and 5. Current ownership, currency,
levels, receipts, discovered tiers and pending rewards are never reset/rescaled.

Bosses 1-3/1-6/1-9 require approximately 600/8000/25000 sustained DPS before
equipment, critical hits and projectile timing; their timers are 20/25/30 seconds.
Earned board rows remain at boss 1-3 and 1-6. Normal HP and gold/orb/gem drops scale
between these encounters (authoritative runtime table: StageConfig.ts). Infernal,
Frost and Shadow challenges have 60k/200k/600k HP with the existing 45-second limit.
This makes merging and permanent/equipment upgrades useful beyond early recruiting.

Free Coins remains exactly 1000, unlimited, with no cooldown. Daily, Wheel,
reserved results and rewarded completion gates are unchanged. No existing award
receipt is rewritten. Pacing may be refined after normal manual play; neither
instant full progression nor excessive grind is an accepted outcome.

Focused verification: observed curve/budget bounds, shared-offer exact debit,
failed-write rollback, duplicate receipt, current-save reload, equipment costs,
real boss row unlocks and all three dragon settlements pass. Android manual
acceptance must include a fresh start, continued buys/merges/upgrades, useful
1000/Daily/Wheel grants, and earned rather than immediate later rows/challenges.
