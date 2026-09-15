# Analytics events

[USER_REQUIREMENT] AppMetrica is the selected native analytics provider. Read the project UUID from app-specific TZ through build configuration; never use the shared example UUID or package-name label. TASK-0209 validates consent/retention and pinned Expo native compatibility; TASK-0210 integrates it. Web/core tests use a no-op or recording sink; a no-op does not satisfy native release integration.

Events: session_started/session_ended, tutorial_step_completed, hero_purchased, merge_completed, hero_discovered, deployment_changed, stage_started/stage_cleared, boss_attempt/boss_result, reward_claimed, offline_claimed, quest_claimed, daily_claimed, wheel_started/wheel_result, equipment_changed, upgrade_purchased, insufficient_currency, save_error, platform_service_error and performance_summary. Each has schemaVersion, eventId, sessionId, build/data version and coarse elapsed duration. Reward events include source and stable transaction ID; never full save contents.

Use bounded enums and numeric buckets for tier/stage/duration where practical. No names, email, advertising IDs, copied guest identifiers, raw platform-result payloads, exact local file paths or screenshots. Consent denied drops nonessential analytics. Diagnostics can remain local and export only through an explicit support flow.

Economic analytics emit after durable commit. Duplicate callbacks cannot produce duplicate reward_claimed because its eventId derives from the transaction receipt. Queue is bounded and expiry-defined; network failure never blocks gameplay or retrying a save. Batch background flush respects platform time constraints.

Acceptance: fake sink verifies one event per committed reward and none on rejection; denied consent sends nothing; schema rejects arbitrary properties; production debug data is absent. Provider choice and retention are release decisions, not invented reference behavior.

## Traceability

[00_TECH_INDEX.md](00_TECH_INDEX.md) · [17_GAME_STATE_MODEL.md](../17_GAME_STATE_MODEL.md) · [04_UNKNOWNS_REGISTER.md](../04_UNKNOWNS_REGISTER.md) · [README.md](../../data-spec/README.md) · [TASK_INDEX.md](../../tasks/TASK_INDEX.md) · [01_TEST_STRATEGY.md](../qa/01_TEST_STRATEGY.md)

## Candidate integration decision — TASK-0209/0210

Pinned official @appmetrica/react-native-analytics 4.2.0 supports the new RN
architecture; native build/smoke establishes compatibility with this app.
The build resolver reads only the app-specific TZ UUID. Logs, advertising-ID,
location, automatic revenue and raw crash reporting are disabled. Optional
Usage analytics in Full settings defaults off; only an explicit saved opt-in
enables transmission. Turning it off clears the application queue immediately.
Only implemented post-commit gameplay events are mapped; deferred quest/offline/
tutorial/performance events are not enabled. No save, identity, URL, free text or
raw SDK payload is sent. Event/field allowlists and a bounded recent-event set
reject duplicate delivery; restart does not replay committed domain events.
Application queue: 64 events, 60-second TTL. Native queue: 100 reports, batches
of 20, 90-second dispatch. Provider-side dashboard retention is controlled by
the project owner and remains an external release configuration, not claimed
verified by a client build. Analytics failure never blocks play or saving.

Sources: [official RN initialization](https://yandex.com/support/appmetrica-io/en/sdk/react-native/analytics/quick-start),
[official release 4.2.0](https://github.com/appmetrica/appmetrica-react-native-plugin/releases/tag/v4.2.0).
