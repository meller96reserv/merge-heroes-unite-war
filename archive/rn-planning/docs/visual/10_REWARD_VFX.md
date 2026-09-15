# Reward VFX

RewardService commits grants, receipt and watermark before reward reveal. Presentation receives transactionId and grants; coins/gems fly to their HUD anchors but the balance is already authoritative. A visual counter can animate after commit without allowing a second claim. On background/skip, release effects and show final balance on resume.

Normal gold uses≤6 flyers, gems≤4; low quality one symbolic flyer. Reward burst has a fixed pool cap and does not instantiate one node per currency unit. Daily/chest/offline variants share a650–900ms reveal and distinct title/icon. Wheel chooses and persists outcome before rotation; segment highlight and result popup cannot reroll.

Multiple rewards queue by priority: irreversible claimed result then discovery/unlock, with informational toasts last. Duplicate transactionId has no second celebratory sequence. Empty wheel outcome receives neutral feedback, not a false win. Counter overflow uses localized compact formatting while detail view exposes exact value.

Acceptance:1000/1e20 amounts use bounded node count, close during reveal preserves grant, reopened daily/wheel cannot duplicate animation or credit, and all required grants remain readable with reduced motion.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
