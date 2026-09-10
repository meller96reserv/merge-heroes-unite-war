# Shared audio milestone evidence

Acquisition, technical playback and audible mix approval are separate. This
single report replaces repetitive per-effect acceptance artifacts under the
delivery QA policy. Native-only cases remain part of native release smoke.

## TASK-0177 — Original SFX acquisition

- Created 97 original mono PCM variants for 31 required UI/combat/merge/reward/
  wheel/equipment event families, 2,727,452 bytes total. Each event retains its
  acquisition brief, variant count, gain and cadence from the event matrix.
- `tooling/audio/synthesize-sfx.py` contains deterministic original oscillator,
  filtered-noise, envelope, chord and reflection sources. No reference audio or
  external sampled material is used. Provenance and actual file SHA-256 values
  are recorded in the audio manifest and ownership ledger.
- Wheel empty-result variant is neutral and explicitly distinguished from the
  success chimes. Deferred offline-reward audio remains catalogued but unbundled.
- PASS: all 97 files decode as 44.1 kHz mono 16-bit PCM; hashes match, audio is
  non-silent, peaks stay below clipping, endpoints are zero, mean DC is below
  20 PCM units. No large duplicate masters are needed: runtime WAV is lossless.
- In-game voice limits, playback and user audible review are still pending
  TASK-0181–0186. These acquisition checks do not assert phone/headphone audition.

## TASK-0178 — Original music acquisition

- Two complete original 96 BPM scores: 100-second main theme and 60-second boss
  theme. Synthesized plucked/celesta/flute/pad/bass/soft-percussion orchestration
  shares a harmonic palette; phrase density varies to leave space for game SFX.
  Source score, creator/provenance and master/runtime hashes accompany both.
- PASS: MP3 files decode to exactly 3,200,000 / 1,920,000 stereo frames at 32 kHz,
  preserving intended gapless length. Decoded output has no clipping, DC below
  0.001, and boundary steps within ordinary waveform variation. Runtime total
  2,562,712 bytes; deterministic lossless masters remain local/reproducible.
- Technical review found and removed abrupt individual-note tails before final
  export. In-game transition and audible mix/user review remain TASK-0183/0186;
  no physical speaker/headphone audition is asserted by these decoding checks.

## TASK-0179 — Original world ambience

- Two original 90-second quiet wind/leaves loops with sparse synthesized bird
  details; no sampled location. Spectral noise and slow periodic modulation
  preserve continuous source boundaries. One ambience source is intended at once.
- PASS: both 96 kbps mono MP3s decode to exactly 2,880,000 frames at 32 kHz;
  no clipping, DC below 0.001 and seam within normal waveform variation.
  Runtime total 2,161,816 bytes; source/provenance/master/runtime hashes recorded.
- Playback ownership and final audible balance remain TASK-0181–0186.

## TASK-0181 — Shared audio buses and playable integration

- Pinned Expo Audio 57.0.4, matching the installed Expo SDK's compatibility map
  and [official playback documentation](https://docs.expo.dev/versions/latest/sdk/audio/).
  Native uses bounded local buffering and explicit focus; recording/microphone
  and background playback permissions are disabled. Native execution is NOT_RUN.
- One shared catalogue maps 34 required events to 101 verified files. Browser
  uses Web Audio buffers/gains for exact loops and short-cue latency; native uses
  Expo Audio. Both use identical original files and the same semantic director.
  This also avoids the installed Expo web player's unhandled `media.play()`
  promise and its documented mobile Safari element-volume limitation.
- Actual game now plays main/boss music, world ambience, button feedback and
  Wheel tick/result cues. Gains read the saved music/SFX preferences. No replay
  of suppressed one-shots; foreground resumes existing loops once. Broader
  gameplay bindings/voice prioritization/crossfades follow TASK-0182–0185.
- PASS: typecheck, web production export; 2 director tests cover activation,
  independent gains, mute, focus, dedupe, single loop ownership and late preload
  after disposal. Browser real Wheel flow reports 28 tick/result/UI plays,
  56,431,988 decoded bytes, exactly 2 loops, focus suspend/resume and 0 app errors.
  Pre-activation playback stays zero. Final audible mix review stays TASK-0186.

## TASK-0182 — Cadence, priorities and bounded voices

- Matrix cooldowns and event concurrency now apply before playback. UI and SFX
  have separate pools; boss/result/merge cues can replace older quieter voices.
  Replacement fades for 8 ms with bounded retiring sources. Active limits are
  22 SFX + 2 retiring and 3 UI + 1 retiring, within the 24/4 source ceilings.
- Variant/pitch draws use a private presentation generator; neutral Wheel result
  is selected explicitly. Released/stolen voice IDs cannot release a newer lease.
- PASS: 3 allocator tests cover 100 simultaneous hits, per-event/global limits,
  priority protection, stale releases, pitch/variant bounds and neutral selection.
  Both director lifecycle tests still PASS; typecheck and web export PASS.
- Real browser `tests/browser/audio-smoke.py` confirms the reachable Wheel keeps
  its audio, activation/focus behavior and two loops with 0 app errors.

## TASK-0183 — Music transitions and duck ownership

- Main/boss themes now crossfade over 600 ms with at most two music sources.
  Rapid changes reuse the still-owned track. Wheel keeps the main theme while
  battle continues behind it. Reward/result effects own temporary duck tokens;
  the strongest attenuation wins, capped at −8 dB, with 40/350 ms envelopes.
- Focus loss pauses tracks, cancels envelope timers and removes transient duck
  ownership; resume restores the intended track without duplicate playback.
- PASS: 2 music tests cover midpoint/end gains, rapid main/boss/main replacement,
  independent/repeated duck release, attenuation cap and interrupted recovery.
  Director tests, typecheck, web export and the real browser audio smoke PASS;
  no app errors. Final audible mix/device review remains TASK-0186/native smoke.

## TASK-0184 — Actual gameplay event bindings

- Direct battle subscriptions bind melee/ranged/magic release, applied hit/crit,
  boss entry/death and enemy defeat; encounter-qualified identities survive boss
  replacement. Durable subscriptions bind buy/spawn/spend, merge/cascade,
  discovery, reward receipts and the named required meta events. Hidden combat
  stays quiet behind the Wheel; failed saves cannot sound like a successful grant.
- PASS: 3 binding tests cover duplicate batches, failed merge persistence/retry,
  all attack families across two encounters, hidden combat and Wheel receipts.
  Allocator tests, typecheck, core build and web production export PASS.
- Browser audio smoke PASS: real purchase/drag-merge/battle and Wheel produce
  45 presentation plays, 2 resumed loops and 0 app errors. Initial scripted drag
  attempts timed out; an instrumented run confirmed the correct slot hit and
  successful merge, followed by a passing complete smoke. No gameplay state was
  altered by this task. Audible user review and native checks remain separate.

## TASK-0185 — Durable gains and composed lifecycle gates

- `AudioLifecycle` composes loaded preferences, AppState, window visibility/
  focus, Android focus and nested external-audio holds. Rewarded adapters release
  their own hold even on failure; they cannot override background or another hold.
  Late preference snapshots cannot restore an older gain. Gesture unlock restores
  the current active policy; serialized focus changes avoid stale async resumes.
- Gain updates use the existing durable dispatcher and an additive, optional
  settings revision (old saves default to zero). Battle reward revisions do not
  reject a settings change; older settings writers do. Failed storage keeps the
  installed gains unchanged. TASK-0129/0067 owns the reachable Figma controls.
- PASS: 2 lifecycle tests plus 2 director tests cover nested interruptions, failed
  ad release, stale preferences, atomic mute/save failure, real save recovery and
  duplicate-loop prevention. Typecheck, pure core build and web export PASS.
  Real browser purchase/merge/battle/Wheel/focus smoke: 49 plays, 2 resumed loops,
  0 app errors. Physical native interruptions/headphones remain native release QA.
