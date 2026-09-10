# Runtime texture audit — TASK-0229

Measured local runtime copies: 512 PNGs, 110.36 MiB compressed (115.72 decimal MB),
270.68 MiB if all decoded as RGBA. The old boot path created and permanently
retained every image plus every 128/256 density variant. RGBA estimates describe
image capacity, not measured GPU allocation: native Skia uses deferred decoding.

| Finding | Action |
| --- | --- |
| Equipment art up to 768 px, displayed at most 76 logical px | 59 reviewed runtime copies capped at 384 px; covers 4× density plus motion margin |
| Selector portraits 621–662 px, displayed at most 91 logical px | 10 runtime copies capped at 448 px |
| Large illustrations unnecessarily selected between 256 and 512 physical px | 9 selected 512 px derivatives; higher-density original runtime copy remains available |
| Castle/forest backgrounds 864×1535, 5.06 MiB each | Preserve resolution; load only while their route is mounted |
| Three Dungeon strips 1536×512, 3 MiB each | Preserve resolution for wide cropped 3×/4× cards; release after Dungeon |
| Wheel sectors 1096², 4.58 MiB despite only 95 KiB PNG | Load only on Wheel; preserve its large displayed resolution |
| Spears/staves up to 78% transparent | Downscale reviewed icon copies; do not crop authored pivots/edges/glow |

Transparency alone is not removable padding: the large transparent weapons and
wheel ring still have nontransparent content at their canvas boundaries. Source
hashes, original Figma/raw files, semantic IDs, full-canvas proportions and pivots
are unchanged. No general recompression or background-quality reduction.

The 69 capped copies drop from 86.52 to 34.73 MiB RGBA and 33.87 to 15.14 MiB PNG.
Including the nine new density choices, the art folder is 94.76 MiB compressed.
The registry still describes all shipped assets; it no longer implies residency.
`runtime-texture-policy.json` records each reviewed limit and keeps asset import
reproducible. Unrelated runtime files were not re-encoded.

Resources now have leases per mounted Sprite. Concurrent consumers share one
read/image. A 1.5-second grace period absorbs remounts; last release evicts the
image. In-flight completion after abandonment is also evicted. Native recordings
retain their own safe references until released; CanvasKit images are explicitly
deleted after unmount/grace. Encoded SkData handles are released after decoding.
Four concurrent reads are shared across fonts/images. Three font faces remain
cached; boot pins only its five actual images and releases them on LET'S PLAY.

Actual dev browser, 430×932 at 3× density: Battle had 29 images, 11.10–11.22 MiB
RGBA capacity after each Equipment, Dungeon, Settings, Relics, Wheel and Shop
round trip. No closed-route equipment/portrait, castle/forest/Dungeon background,
Wheel-sector or Settings-component image remained. Shared Battle navigation icons
and its infernal-mask icon intentionally remain. The final stable encounter held
87 total historical image loads across two samples: no repeated decode per tick.
During routes, the largest exercised capacity was 25.08 MiB on Relics including
the still-mounted Battle behind it. These are cache measurements, not physical
device GPU/process certification.

Focused cache tests PASS: shared load, shared ownership, release, rapid reopen,
abandoned in-flight completion. Typecheck, production web export and source/runtime
hash + density registry validation PASS (170 base, 346 derivatives, 5 components).
A second pass at 4× density and production web at 3× passed repeated
Equipment/Dungeon transitions with zero app errors; Battle remained 29 images
(15.69 MiB capacity at 4×). Native final build/smoke results are recorded in
qa_defect_register.md.

Final Android Release, same emulator after route/restart smoke: process PSS
281132 KiB versus the earlier surface-only checkpoint's 358428 KiB. The 12-second
sample reports zero slow bitmap uploads, 1.83% janky frames and P95 32 ms. These
are indicative process/frame observations; GPU-cache allocation and physical
phone performance are not inferred from the RGBA-capacity figures.
