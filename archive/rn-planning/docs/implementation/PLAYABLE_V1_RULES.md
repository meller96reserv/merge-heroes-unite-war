Owner defect amendment (TASK-0229): production new game has **zero heroes**, five
empty usable islands and100 gold. During the minimal first-session guide, purchases remain in reserve until the
player taps the merged hero to deploy; after the guide, ordinary purchase auto-
join resumes up to account deployment capacity. Preserve existing saves. This overrides any earlier
starter/demo hero description. See PLAYABLE_STAGES.md for shipped-roster-v2.

# Playable-v1 product rules — PROPOSED

TASK-0093 wires the existing core into the shared battle screen. These are explicit approximation rules under ADR-007, not recovered reference formulas. Figma fixtures and reference balance remain unchanged.

- Start with 100 gold and zero heroes on the five-open-slot dock board. Purchases fill the lowest free slot and deploy only while the saved account capacity has room:1 at account1,2 at account2 (EV-045). Further purchases remain owned reserves. All five visible battle placement positions remain unchanged; capacity does not control their count, locks or appearance. Tap a hero to deploy/withdraw; its board ownership remains.
- Three explicit offers buy tiers 1/2/3 for 1/4/12 gold. Higher offers unlock after first discovering that tier. Prices repeat their table entry; hold starts after 350 ms and repeats 200 ms after each acknowledged purchase. These short playable tables are separate from the 30 observed reference prices.
- Ten explicit tier/result definitions preserve the semantic Figma mapping. Tier 10's elf mapping remains a proposed extension. Same-family, same-tier pairs merge into the drop destination; deployment inherits either source. Equipped heroes reject merge until equipment inheritance is implemented. Empty unlocked cells accept moves; occupied incompatible cells reject, without swapping.
- Each newly discovered tier grants its configured 20 × tier gold once in the same durable merge transaction. Repeated discoveries grant zero. This supports the early playable loop; it is not an observed balance claim.
- Auto merge stays disabled in this production configuration. The separately tested timed entitlement/cascade modules do not simulate ad completion. Required rewarded flows remain TASK-0254–0259.
- Hero combat fields are provisional content: attack 10 × 2^(tier−1), HP 100 × 2^(tier−1), 1000 ms interval, no critical hits. Combat owning tasks validate their use before activation. Stage progression and slot unlock events are implemented by their existing DAG tasks.

Browser uses real IndexedDB A/B snapshots. Native uses the same domain/presentation with the app-private file transport; actual native crash, power-loss and performance gates remain NOT_RUN. Gesture motion uses shared presentation values and never applies money, damage or rewards.

TASK-0095–0102 combat contract: 50 ms ticks, a full configured cooldown before the first attack, 150 ms logical hit delay, spawn-ordinal/ID targeting, cancellation of stale target or withdrawn/consumed source, floor rounding after basis-point crit and subtraction of defense with minimum 1 for positive attacks. Zero attack deals zero. Waves are bounded to 32 enemies and the pending hit queue to 128; unsupported/overflowing configuration is rejected. A death requests a durable commit and blocks further ticks/clear handoff until its exact reward sources are acknowledged. The last encounter restarts on reload from its durable boundary; no tween state is saved.

TASK-0107 connects kill rewards to the durable queue: the early boar grants 1 gold per unique encounter/entity token. The kill receipt, combat RNG and incremented encounter sequence commit together before a 500 ms foreground transition spawns the next opponent. This interim loop repeats the current stage until the stage DAG owns advancement. Reload restarts the current uncommitted encounter; completed kills cannot replay. Saving failure freezes the boundary and shows a retry action. A verification failure after a successful write reuses byte-identical candidate data on an equivalent retry; a different concurrent session remains a conflict.

The interim same-stage loop is superseded by the [playable stage chapter](PLAYABLE_STAGES.md) in TASK-0117. Its wave cursor, kill/first-clear grants, next-stage state and slot unlocks share the same durable command. The battle HUD projects the active encounter during the transition, then shows the new stage. A two-second stage-clear panel displays the committed gold; rewarded boosting remains TASK-0256/0257 and cannot grant anything through a cosmetic callback. The ordinary chapter currently uses one semantic boar art family for its configured strength variants.

TASK-0108 makes the chapter's PROPOSED passive-enemy policy explicit. Other reviewed modes may opt into counterattacks; UNKNOWN policies cannot run. Hero HP/death is encounter-local, never deletion of ownership. Withdrawal/redeployment preserves damage/death within that encounter; a new encounter restores full configured HP. No reference death/recovery parity is claimed (U-022).
