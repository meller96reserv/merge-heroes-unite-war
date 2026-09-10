# Audio runtime

AudioDirector resolves semantic events through audio-event configuration and an acquired asset registry. Buses: music, sfx, ui, ambience and optional voice. Master mute, per-bus gain, focus state and lifecycle mute compose multiplicatively. Missing optional audio produces a diagnostic once, then silence; it does not block a reward.

Prioritize UI confirmations, merge result and boss cues above ambient combat repetition. Enforce event cooldown plus global voice budget (proposed 24 SFX voices, four UI, two music crossfade sources). Steal the oldest lowest-priority cosmetic voice. Pitch variation uses presentation RNG, independent of reward/combat RNG. Music ducking uses reference-counted duck requests with bounded attack/release so interrupted popups do not leave music permanently quiet.

The RN audio adapter owns platform focus, interruption and playback; the shared AudioDirector owns semantic buses/settings. Prefer compatible Expo audio APIs, validating actual focus behavior. On AppState background, stop/hold loops and suspend new one-shots; resume restores one loop per bus and never replays all missed combat sounds. iOS phone call/interruption, Android transient focus loss and headphone changes are explicit application QA cases. Web audio unlock requires a user gesture and may remain muted before it.

Historical TASK-0044 [native spike evidence](../../spikes/rn-cocos/audio-results.md): simulator mute/resume and real Android transient focus interruption are verified; physical headphones and actual iOS audio interruption remain NOT_RUN. This is a bounded Cocos-spike checkpoint, not full production native acceptance. The user has directed a React Native + Skia production amendment after preserving this work.

Assets are new original or licensed work. No source audio was extracted from the reference. Acquisition ledger records author, license, source and proof. Decode short SFX ahead of use; stream longer music where supported and measured. All looping clips have clean loop boundaries.

TASK-0181 uses one shared acquired catalogue and AudioDirector. Native playback
uses pinned Expo Audio 57.0.4; Web uses predecoded Web Audio sources and gain nodes
for low-latency cues, loop continuity and mobile-browser volume control. Browser
loading is asynchronous in batches of six; decoded residency is measured at
56,431,988 bytes for the current selected bank. No per-frame React audio updates.
Recording and background playback permissions are disabled. Main/boss music,
ambience, buttons and Wheel are already reachable; remaining bindings, voice
priorities, crossfades and final mix follow TASK-0182–0186. Native adapter code
exists but actual production-device acceptance remains the native release gate.

Acceptance: mute persists; repeated resumes do not double music; 100 hit events respect limits; rewarded action produces one confirmation even after duplicated callback; mix is evaluated on speaker and headphones.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)

TASK-0182–0185 implement the voice budget, event bindings, crossfades and composed
lifecycle gates. AudioLifecycle consumes only committed settings snapshots.
UpdateSettings uses an independent optional settings revision (zero for old
saves) so battle receipts cannot conflict with preference writes. External video
owns a releasable suppression token; foreground and visibility must also permit
playback. Required Figma Settings controls are wired by TASK-0067/0129. Native
focus/headphone behavior still requires the production release smoke.
