# Legal screens and source requirements

This note preserves the requirements used for the in-game Terms of Use and Privacy Policy screens. It summarizes sources; it does not replace the authoritative customer documents or overwrite the published Telegraph pages.

## Sources reviewed

- App brief: `docs/tz/Merge Heroes Unite War тз на разработку.md` and its live Google Doc, revision read on 2026-09-14.
- General developer brief: `docs/tz/Инструкция для разработчиков.md` and its linked live Google Doc.
- Advertising brief: `docs/tz/Реклама в приложениях.md` and both advertising documents linked from the app/general briefs.
- Analytics brief: the two linked AppMetrica documents, including the `game`, `settings`, `rewarded_ad` and ad lifecycle/revenue event conventions.
- Legal template: Google Doc `1pcaT0QReg9XQNX-QEj49P6KCyw44xb3KR9aJMXhbVB8`, including its Terms and Privacy tabs.
- Existing published source pages: `cocos-spike/legal/TERMS.md`, `cocos-spike/legal/PRIVACY.md` and `cocos-spike/legal/urls.json`.
- Existing product research: `analysis/figma/` and `analysis/reference/`; no new reference capture was needed.

## Product-specific decisions applied

- Terms and Privacy are working screens reachable from both Let's Play and Settings.
- The screens use the existing Cocos background, branded heading, back arrow, navy panel, gold section headings and touch scrolling. They are not flattened screenshots.
- Legal navigation is silent, matching the accepted product decision for Start/Terms/Privacy clicks.
- The app is a local merge-and-battle game for users 18+, not a casino, gambling product, cash-prize service or payout product.
- The current app has no paid IAP, accounts, backend, cloud save, withdrawals or payment-card collection. Generic template paragraphs claiming those features were excluded.
- Virtual gold, gems, equipment and rewards have no real-world value and cannot be withdrawn or exchanged.
- Progress and preferences are stored locally. Clearing app data or uninstalling can remove them.
- AppMetrica analytics and crash diagnostics are disclosed. Precise location is disabled and the full save/contact lists are not sent as custom events.
- Start.io rewarded video is disclosed. No banner, return or ordinary interstitial ads are claimed. A reward is authorized only after provider-confirmed completion; close/failure/unavailability grants nothing.
- Optional locally scheduled notifications and their system permission are disclosed.
- Provider policies, cross-border provider processing, retention limits, user choices/rights and the 18+ audience are summarized.
- Contact text points to the developer/store listing. No support email or Telegram handle was added.

## External-document conflicts resolved

The app-specific brief and current product decisions override generic examples. Therefore the general document's betting controls, 90% wager cap, cash-out flow, casino wording, IAP packs, billing permission and banners/interstitials do not apply to this game. The newer advertising brief's rewarded-only rule overrides an older linked advertising note that still mentions banners, return ads, interstitials and 500 coins. The product uses 1,000 gold for the free-coins rewarded placement.

The template asks for Telegraph publication. Existing public Telegraph pages remain configured in native sources and can be republished from the tracked Markdown with `tools/publish-legal.py` when the private Telegraph account file is available. The app now also contains readable native Cocos screens, so legal text is available without leaving the game.

## Implementation map

- `cocos-spike/assets/scripts/MetaScreens.ts`: internal `terms` and `privacy` routes, scrolling content, silent links and back navigation.
- `cocos-spike/legal/TERMS.md` and `PRIVACY.md`: authoritative publishable long-form text.
- `cocos-spike/legal/urls.json`: published Telegraph URLs.
- `cocos-spike/native/engine/android/app/src/com/cocos/game/GameServices.java` and iOS equivalent: retained external-link bridge for native integrations.
