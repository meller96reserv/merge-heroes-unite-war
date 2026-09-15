# Shipped economy v3 — TASK-0229 owner reward/pacing correction

Owner-authorized shipped slice of TASK-0192; broader reference research stays
DEFERRED_POST_DELIVERY. This supersedes v2 (9d5b7ca). Only the first 30 tier-1
prices are OBSERVED (RUN-03: 15×1, 8×2, 6×3, 1×4, total53). Later values below
are PROPOSED product balancing, not recovered reference formulas.

The owner's target is several days of voluntary play, not completion in a few
minutes/two hours, and no mandatory advertising. Working calibration target:
roughly 6–10 active hours spread over several daily sessions. This is a target,
not a measured completion time or a time gate; efficient strategies, previous
saves and optional ads can shorten it. A small illustrative 2× resource model
(no ads/Wheel, initial Daily5000, instant actions, free matched equipment and
optimistic upgrade transfer) reached the final campaign/dragon at ~7.9h. It is
not a player simulation or a guaranteed lower bound. Owner manual pacing review
remains required, including whether late farming becomes tedious.

Recruitment sums tier-1 equivalents (1/2/4) across all saved offer counts. After
the captured table each unit costs `min(100,4+floor((index-29)^2/1600))`. This
keeps exactly1000 Shop gold worth at least ten base units even late in play.
Three tier-10 recruits still require >120000 gold in total. Switching offers
cannot reset the shared index. Equipment enhancement costs
`min(1000,25×currentLevel²)`; one video funds at least one enhancement. Permanent
hero upgrades retain `5×(level+1)×(1+floor(level/5))` orbs, 45375 cumulative for
level50. Owned equipment, heroes, levels and all currency remain untouched.

Campaign boss HP/timers: 20000/20s, 600000/25s, 3200000/30s. First-clear boss
bonuses are 5000/15000/30000 gold, 100/500/1500 orbs and 100/250/500 gems, plus
ordinary kill grants. First-clear receipts prevent farming this treasure.
Repeat kills use the separately balanced StageConfig table; late enemies now
require sustained fighting. Earned rows stay at bosses1-3/1-6. The last boss
requires a developed two-hero team; level20 with maximal damage equipment
alone is insufficient, while the legal stat cap can win before timeout.

Infernal/Frost/Shadow: 900000/3600000/5333333HP,45s. First victory grants
5000/15000/30000 gold,100/250/500 gems,250/750/1500 orbs. Repeats grant
100/200/300 gold,5/10/15 gems,5/15/30 orbs. The existing durable clear count
selects the displayed/paid quote; entry remains free. No new currency/mode or
ad requirement was introduced. Saved claims and first-clear ownership survive.

Shop stays **exactly1000**, unlimited, no cooldown, confirmed video only.
New Daily reservations save **5000** gold. Legacy pending Daily without an amount
keeps its previously promised1000. New Wheel results use frozen `fortune_v2_*`
IDs: gold3000–25000, three free spins and two empty sectors in the existing
12-sector art. Gold sectors weight4; free-spin/empty sectors weight1 (39 total).
Old `fortune_v1_*` results retain their amounts/labels. Positive rewards always
require confirmed video; an empty result uses Continue without an ad or grant,
and still consumes that spin with its cooldown intact.

New Boost offers save `bonusBaseGold=max(1000,ordinary earned gold)`; the saved
x1–x10 multiplier applies to this **additional** bonus. The UI shows the bonus
separately from already earned money. Claim requires confirmed video. Owner
0.2.3 correction: old unclaimed boosts without that field receive the same
minimum bonus base, preserving their multiplier and RNG. The quote is persisted
when resuming/reserving the video; a recovered confirmed video upgrades within
the atomic claim. Already claimed history is untouched; no retroactive grant.
The victory banner labels earned gold separately from the video bonus range
(minimum1000–10000); it no longer implies the small ordinary payout is the ad
reward. Ordinary winnings are never granted twice. Failed, duplicate or stale
callbacks cannot mint rewards. Other v3 economy/Shop/Daily/Wheel rules unchanged.

Victory/Boost's ordinary offer lasts about2s. Closing an unclaimed selected
boost returns immediately to Battle; there is no persistent Victory Reward
banner. Its saved selection remains reachable through Shop → Saved victory
bonus, including after restart. Dismissal never forces a video or loses a prize.

EV-045 / TASK-0229: final campaign and Shadow Dungeon HP adjusted from the old
three-active-hero budget to two (×2/3). No third deployment unlock is assumed.
Timers, reward values, purchase and upgrade costs stay unchanged. See
[account progression](03_HERO_PROGRESSION.md) for the separate cap and XP rule.
