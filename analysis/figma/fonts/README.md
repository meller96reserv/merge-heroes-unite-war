# Font acquisition and measurements

TASK-0029 acquired four unmodified font binaries from pinned revisions of the primary [Google Fonts repository](https://github.com/google/fonts). They cover all five family/style combinations in the 296-node Figma text inventory: Passion One Bold/Regular, Roboto SemiBold/Regular and Nunito Regular. [Ownership/license ledger](../font_ownership.csv), [immutable acquisition URLs and hashes](acquisition.json), [measured metrics](metrics.json), [rendered specimens](specimens.png).

Each source directory contains its original OFL-1.1 license and upstream metadata. Redistribution requires keeping the copyright/license with the font. Passion One reserves the name “Passion”; no modified font binary is written or distributed here. Variable Roboto/Nunito instances are created in memory solely to measure the recorded weight/width axes. Runtime import must verify variable-font support or document any derived static-font packaging and license/name handling.

| Face | Figma nodes | Observed characters missing | Russian alphabet coverage |
| --- | ---: | --- | ---: |
| Passion One Bold | 198 | None | 0/66 |
| Passion One Regular | 67 | None | 0/66 |
| Roboto SemiBold | 7 | None | 66/66 |
| Roboto Regular | 6 | None | 66/66 |
| Nunito Regular | 18 | None | 66/66 |

Every text node was measured at its recorded size, with subpixel advance and source layout-box comparison. Three unwrapped strings exceed their boxes: 2:120 maintenance paragraph, 2:409 consent paragraph and 2:23 Roboto loading message. These require wrapping/layout validation; they are not automatically font failures. The Figma inventory does not contain tracking, auto-resize or source font binary version, and a fixed-width text box is not a glyph-width oracle.

Visual review compared the specimens with Figma screens 2:186 Settings, 2:2 loading and 2:114 maintenance. The narrow heavy Passion One shapes agree at the family level; source strokes, wrapping and renderer-specific rasterization remain visual-import checks. The gold/blue “WELCOME! LET'S GET STARTED!” lettering on screen2:2 is baked artwork and cannot be reconstructed by substituting any of these plain fonts.

**Reference font binary revision remains UNKNOWN.** The Figma source exposes family/style/axes, but no downloadable original font binary or version/hash. The pinned primary-source revisions are an explicit PROPOSED product selection under start_prompt.md §14. Acquisition/license/character measurements are complete; pixel parity is NOT_RUN and belongs to TASK-0062 and the phase05 visual gates. A fallback for Russian text is PROPOSED: Roboto at the requested weight, measured separately; do not render Cyrillic through Passion One or claim that fallback is observed Figma typography. Existing English source text needs no fallback.

Reproduce with Python3.13, Pillow with RAQM and FontTools4.59.2:

```sh
/tmp/kisel-planning-venv/bin/python tools/analysis/verify_fonts.py
```

The verifier checks all source/license hashes, family names, variable-axis ranges and coverage, then regenerates measurements/specimens. Original downloaded binaries remain unchanged.
