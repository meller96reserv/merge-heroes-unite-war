# Design and timing tokens

[OBSERVED] Typography in [styles](../analysis/figma/styles_and_reactions.json): Passion One Regular/Bold for game headings/body, Roboto Regular/SemiBold for alternative loading texts, Nunito for small labels/timer.21 style combinations across296 text nodes. Dominant game fill white, black outline; exact sizes/strokes stored by text ID. Small Figma labels8–12px need usability adaptation; do not silently substitute fonts.

[PROPOSED] Tokens: design.width430,height932; touch.minimum44; spacing.xs4,s8,m16,l24; panel backdrop opacity0.65; active text #ffffff and outline #000000 from Figma; disabled opacity0.55 plus explicit lock/text; do not encode eligibility by color alone. Runtime palette roles sampled from selected art rather than recoloring detailed raster artwork.

Motion ms: instant80,fast140,normal280,reward560,major900; merge650 total; popup enter280/exit140; button80/120; label650. Easing roles pressIn=quadIn,popOut=backOut,softOut=cubicOut,rewardArc=cubicBezier,shakeDecay=damped. These are PROPOSED, not Figma/runtime measurements. Quality profile cannot change logical attack/cooldown times.

Numeric formatter: integer decimal below1000; three significant digits withK/M/B/T then scientific fallback; deterministic floor at suffix boundary until reference rounding verified U-034. Locale group separators come from formatter, never parse display back. Strings use keys; Figma baked logo/welcome remain artwork, mutable labels recreated as runtime text. Localization scope English first;30% expansion test, Cyrillic/Korean only after font coverage decision.

[Typography acquisition](visual/asset_gap_analysis.md) · [Motion](visual/04_ANIMATION_LANGUAGE.md) · [Layout](12_UI_LAYOUT_SPEC.md).


[Индекс](00_INDEX.md).
