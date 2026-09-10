# TASK-0186 — Batched audio milestone

Technical checks are recorded in [the shared audio evidence](../../analysis/reports/audio/MILESTONE.md)
and [the reachable Settings evidence](../../analysis/reports/ui/MILESTONE.md).
The shared original music/SFX/ambience now play in the actual browser game.

PASS: acquisition decode/hash/headroom/seam checks; bounded 100-hit allocator;
activation gate, separate music/SFX mute, saved gains/reload, interrupted music
crossfade/duck ownership, no stale one-shot replay and no duplicate resumed loop.
Real gameplay/Wheel audio smoke and both Settings variants have zero app errors.
Existing owning tests are reused; no exhaustive event/device matrix is rerun.

User audible balance/audition is PENDING, not asserted by automated playback.
The review surface is `npm run dev:web`: buy, merge, battle/boss, Wheel and
Settings sliders. Native interruption, speaker/headphone and release behavior
remain part of native release smoke. This task remains IN_PROGRESS until its
remaining audible review is recorded; unrelated required implementation continues.
