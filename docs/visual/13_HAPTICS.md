# Haptics

Haptics are proposed optional platform feedback: light for primary purchase/deploy/tab; medium for merge result, equip upgrade and reward claim; heavy only for boss intro/death with cooldown. Ordinary attack/hit loops do not vibrate. Failure/locked action uses visual/audio feedback by default to avoid repetitive buzz.

Host interface exposes semantic light/medium/heavy/success requests, not waveform authoring in the domain. Map to supported native APIs during integration; unsupported devices/web are silent. Global user preference and platform settings are respected. Cooldown proposed80ms light,200ms medium,1500ms heavy; cascade intensity is capped.

Events occur after committed result, never on every pointermove or wheel segment tick. Background suppresses requests. Reduced-motion and haptics are separate preferences; do not silently couple them. Queue does not replay missed haptics after resume.

Acceptance: settings persist, repeated rewards obey cooldown, muted haptics generate no native call, and low-end devices remain responsive without haptic support.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
