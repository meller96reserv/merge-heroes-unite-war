# Execution rules — current Cocos game

The user selected a standalone native Cocos product for Android and iOS. `cocos-spike/` is the only active runtime. Historical RN/Expo/Skia instructions and the old task DAG are superseded; documents remain in `archive/rn-planning/` for reference only.

## Authority and scope

Latest user decisions override earlier internal plans. Then apply the game-specific brief in docs/tz/, the advertising brief for ads, supplied Figma for art/composition, and general developer instructions only where relevant to this game. Research supports implementation; it does not add delivery scope or prove exact parity.

Read docs/00_INDEX.md, cocos-spike/DEVELOPMENT.md, cocos-spike/HANDOFF.md and docs/BACKLOG.md. Resolve the bounded requested change from those documents and actual source. Do not execute the archived task manifest or label unfinished RN tasks completed.

## Preserve these product decisions

- Native Cocos Android/iOS; package com.mergeheroes.unitewar, display name Merge Heroes Unite War. No RN/WebView game host.
- Mandatory short tutorial; both tap and drag deploy/recall. Merge and sale of reserve/deployed heroes after onboarding; sale requires confirmation.
- Continuous stage progression without per-round Continue dialogs. Boss farming stays within its chapter. Third fighter unlocks with the last platform row.
- Figma-style screens with working controls. Settings has branded title/back arrow, sound/music/vibration/notifications and legal links; no Usage Analytics UI.
- Visible projectiles, bare positive integer damage, flying gold/gems and restrained licensed audio/haptics. Start/Terms/Privacy clicks stay silent. Full-bleed background with safe-area HUD.
- Rewarded-only ads: only recorded completed video authorizes an idempotent reward. No fake videos, borrowed ad IDs or grants on failure/close. AppMetrica is separate.
- No IAP, payouts, accounts or backend. Core play/assets are local; native services and legal URLs use the network.
- Do not add a support email or Telegram to legal pages: the user withdrew that addition. Published text refers to the developer/store listing.

## Engineering and evidence

1. Inspect changes before editing. Preserve user files, original Figma, captures, saves and permanent signing material.
2. Keep core deterministic and platform-independent. Commit draft, receipts and watermarks before state/events; presentation never applies authoritative damage/rewards.
3. Use semantic assets and persistent .meta UUIDs. Atlases/audio are committed; old RN import scripts must not overwrite them.
4. Reuse evidence. Mark OBSERVED/MEASURED, PROPOSED and UNKNOWN accurately. Document changed balance rules in source/current notes.
5. Finish related edits before verification. Use focused correctness checks and the requested build; one representative smoke when appropriate. Browser QA is optional. Time-box noncritical investigation to 5–10 minutes. Do not claim unperformed native checks.
6. Record changes, validation and remaining owner inputs in current docs. cocos-spike/releases/ holds historical release evidence; an old successful check does not certify a new binary.
7. Keep outputs, local toolchains, emulators and credentials ignored. Keep the pre-commit security hook enabled and sanitize diagnostics with tooling/security/sanitize-log.py.
8. Commit coherent work after applicable checks. Merge/push when authorized; store submission, new public services and messages require relevant user authorization.
