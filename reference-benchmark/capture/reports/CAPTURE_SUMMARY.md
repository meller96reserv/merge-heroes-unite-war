# Final public capture summary

```json
{
  "requests": 2784,
  "successfulResponses": 2775,
  "resourcesCaptured": 2340,
  "uniqueBodies": 1166,
  "uniqueBytes": 95349250,
  "failedRequests": 71,
  "uncapturedResponses": 5,
  "hosts": [
    "builds.crazygames.com",
    "cdn.privacy-mgmt.com",
    "files.crazygames.com",
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "games.crazygames.com",
    "sdk.crazygames.com",
    "www.crazygames.com"
  ]
}
```

Bodies are decoded bytes. Repeated responses preserve request/URL mapping; unique bodies are SHA-256 deduplicated. Primary game host: files.crazygames.com, directory heroes-unite/51. Public SDK and required loader/font/consent dependencies are also archived.

## Unique MIME categories

- binary/octet-stream: 491 unique bodies, 43,433,465 bytes
- application/json: 211 unique bodies, 24,336,165 bytes
- application/javascript: 77 unique bodies, 10,237,731 bytes
- image/png: 182 unique bodies, 6,538,896 bytes
- image/webp: 48 unique bodies, 4,918,972 bytes
- audio/mpeg: 111 unique bodies, 2,551,792 bytes
- text/css: 30 unique bodies, 1,386,880 bytes
- font/ttf: 3 unique bodies, 1,099,544 bytes
- text/html: 7 unique bodies, 389,357 bytes
- text/javascript: 3 unique bodies, 266,062 bytes
- image/jpeg: 3 unique bodies, 190,386 bytes

Desktop and mobile capture runs plus 41 exact-path browser texture supplements and 46 Android WebView cache responses. 101 non-debug desktop bundles completed (1059 assets); mobile pass completed the same 101 bundles, while a resources loadDir attempt timed out. Its successfully returned bytes are retained; timeout is not PASS. No game-host HTTP request failures were recorded in the initial desktop pass. Other failed requests were primarily portal services; mobile final failure details are partially unavailable after recovery. See index and mobile-recovery.json.

Main and supplemental HARs contain actual response content with safe headers, no credentials, and unavailable timing placeholders. Mobile HAR was recovered from 1179 complete response journal entries with zero malformed lines after a stalled final response-header request; storage/failure detail limits are recorded. Android cache response MIME is explicitly inferred from extensions because its original headers were not retained. No WASM or source-map response was observed; no guessed maps or debug_scene requested.

No claim of 100% of all future/late-game resources. Guest backend response bodies are not replayed. See CAPTURE_COVERAGE.md and runtime/LOCAL_PATCHES.md.

Request/response/failure totals are session counters and include background services outside the archived resource subset. They are not a partition of the retained records. The five uncaptured responses are known retained details; mobile missing-detail accounting is incomplete.
