# Screen transitions

Loading→start→battle is a stateful boot flow; user entry waits for required assets and valid save. Start CTA has feedback then one navigation command. Main tabs retain the same domain session. Foreground meta transition does not independently pause the simulation; actual pause policy remains explicit in route metadata and reference unknownU033.

Use280ms fade/12px slide for routes and200ms tab content. Popup stack uses280/180ms open/close with dimmer; close consumes gesture. Maintenance/error panels replace route content with clear retry/back action. Deep links resolve after initialization and unlock checks, then enqueue a single route change.

Rapid navigation increments route generation; late asset/tween callbacks from old route are ignored. Keep outgoing required assets until its transition/pools finish, then release. Reentering a panel derives current state instead of replaying stale reward events.

Acceptance:20 rapid tab/popup transitions leave one route and valid input owner; Back unwinds popup before game exit; background during transition resumes to a stable route; frozen screenshot mode selects the final settled state.

## Traceability

[Animation matrix](animation_matrix.csv) · [Component decisions](component_motion_map.csv) · [Asset gaps](asset_gap_analysis.md) · [Visual index](00_VISUAL_INDEX.md) · [Audio](../audio/00_AUDIO_INDEX.md) · [Tasks](../../tasks/TASK_INDEX.md) · [Visual QA](../qa/05_VISUAL_REGRESSION.md).
