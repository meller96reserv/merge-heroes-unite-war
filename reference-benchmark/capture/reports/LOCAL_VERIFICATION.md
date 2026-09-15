# Local browser smoke

Status: SUCCESS for startup, interactive PlayScene, purchase, merge, discovery, deployment/withdrawal tutorial and restored guest session. Browser-only exhaustive combat/menu QA intentionally stopped per latest user direction; Android is the primary verification target.

The initial captured SDK used localhost authenticated mock mode and caused backend ERROR 12. `benchmark-portal.js` selects the unchanged plugin's SDK-unavailable guest fallback. Subsequent public guest startup succeeded. No backend version check was removed. Local HTTP startup had no failed resource requests in the recorded browser pass.

Evidence: `local-purchase.png`, `local-two-heroes.png`, `local-merged.png`, `local-resumed.png`, `local-gameplay-final.png` and timestamped local session reports. Screenshot names are labels, not guaranteed successful action outcomes: `local-battle.png` shows discovery, and `local-combat-verified.png` still shows the redeploy tutorial. Final PlayScene and advancing Cocos frame counter were read directly. No audible sound assessment was performed; Android audio context is recorded separately.

Command: `npm run reference:web`; URL http://localhost:8087. Original source files remain hash-preserved. Remote guest backend is required; no Mac server is needed by the Android APK.
