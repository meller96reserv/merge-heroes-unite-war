# Audio mix rules

Matrix gain values are starting mix levels, not measured loudness targets. Master output must remain unclipped after worst-case summation; use headroom and measured limiter policy if needed. Music duck by event is reference-counted; proposed attack40ms/release350ms and maximum attenuation−8dB. Never stack permanent duck offsets.

Global proposed budget24 SFX voices,4 UI voices,2 music sources during crossfade and1 ambience. Per-event limits/cooldowns apply first. Priority: mandatory UI result/major merge/boss > ordinary impact > ambience detail. Old low-priority voice can be stolen with short fade. Pitch variation stays within matrix ranges and never escalates without cap.

TASK-0182 reserves tail headroom inside these ceilings: 22 active SFX + at most
2 retiring and 3 active UI + at most 1 retiring. Stolen sources fade for 8 ms;
excess retiring sources stop before a new one is retained. Variant/pitch state
belongs to the audio allocator and never reads or advances game reward/combat RNG.

App pause/focus loss suppresses one-shots and handles loops explicitly. iOS interruptions and Android focus are native acceptance cases. Web autoplay blocking is expected before user gesture. Settings gain changes ramp20–50ms to avoid clicks.

Acceptance: prolonged battle is comfortable;50 simultaneous logical hits stay within voice budget; mute and resume do not emit stale audio; mix passes phone speaker, headphones and low volume tests.

## Traceability

[Event matrix](audio_event_matrix.csv) · [Audio index](00_AUDIO_INDEX.md) · [Runtime](../technical/13_AUDIO_RUNTIME.md) · [Visual hooks](../visual/animation_matrix.csv) · [Tasks](../../tasks/TASKS_PHASE_14.md).
