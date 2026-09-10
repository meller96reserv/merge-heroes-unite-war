# Delivery QA execution policy

The user's QA correction supersedes exhaustive acceptance instructions in older
task blocks and QA matrices. Product scope and visual quality are unchanged.

Correctness owners must retain automated coverage for purchases/debits, merge
state, rewards/idempotency, save/reload/migration, wheel cooldown/claims, ad
completion gating and testable analytics/platform contracts. A failed or missing
completion callback must never grant a reward. Release builds and smoke remain
mandatory. Existing passing tests are reused; repeat them when changed code or
a discovered failure justifies the run.

Presentation tasks require typecheck/build success, a working `npm run dev:web`
feature and no app-caused browser errors. Use a short browser interaction check;
capture images only to diagnose a defect. Do not create a large fixture, golden
matrix or separate acceptance report for each small animation or UI adjustment.
Record a short observation in the owning milestone notes and link it from the
task. The user may provide final visual acceptance in the browser; do not invent
user approval or block unrelated implementation while that review is pending.

Batch reviews: TASK-0176 animations/VFX, TASK-0143 Settings/Wheel and required
meta UI, TASK-0186 audio, TASK-0224 one final responsive/safe-area pass. These
are brief working-feature reviews, not exhaustive marker/viewport matrices.
Audio remains original/licensed, audible, balanced and interruption-safe.

| Deferred duplicate task | Required check retained by |
| --- | --- |
| TASK-0069 repeated static goldens | TASK-0224 final responsive/user visual review; screen owners retain visual fidelity |
| TASK-0127 equipment acceptance matrix | TASK-0121/0122/0124 transaction tests; TASK-0223 release golden path |
| TASK-0157 save acceptance matrix | TASK-0149/0150/0155/0156 correctness tests; TASK-0223 restart smoke |
| TASK-0180 standalone audio import test | TASK-0177/0178/0179 asset validity/rights; TASK-0186 audio milestone |
| TASK-0200 repeated content fidelity matrix | TASK-0196 content validation; TASK-0223 golden path |
| TASK-0220 repeated performance gate | TASK-0213 representative measurement; TASK-0219 real leak fixes; TASK-0229 defect closure |
| TASK-0221 repeated unit matrix | Correctness implementation tests; TASK-0223 final applicable automated suite |
| TASK-0222 repeated integration matrix | Correctness implementation tests, TASK-0211 native smoke and TASK-0223 release path |
| TASK-0225 combinatorial device matrix | TASK-0224 representative responsive pass; TASK-0202/0203 native builds/smoke |
| TASK-0226 repeated migration QA | TASK-0150/0155 fixture/crash checks; TASK-0223 release restart smoke |
| TASK-0228 repeated audio/haptic QA | TASK-0186 audio review; TASK-0202/0203 native smoke |
| TASK-0230 duplicate beta gate | TASK-0229 defects and TASK-0237 final production gate |

Deferred IDs/specifications remain available. Exhaustive parity, repeated
goldens, long soaks and noncritical combinatorial cases do not gate delivery.
Representative native lifecycle, bounded-resource checks and fixes for observed
performance defects remain required.

Final release: one clean web production build; Android release build/smoke;
iOS release build/smoke where environment permits; complete core/Figma gameplay
golden path; persistence/restart; rewarded provider completion verification;
AppMetrica/platform configuration; required artifacts; no known P0/P1 defects.
Missing external prerequisites remain explicitly NOT_RUN/BLOCKED. Neither a
scope validator nor user visual review substitutes for these safety checks.

[Delivery scope](../../plans/DELIVERY_SCOPE.md) · [QA index](00_QA_INDEX.md)

Current user override: [six-hour candidate mode](../../plans/DELIVERY_CANDIDATE_MODE.md). Group coherent task IDs, reuse green checks, prioritize reachable required UI and early Android/iOS Simulator launches; no repeated full-suite/report ceremony. Final native smoke still checks the completed app.
