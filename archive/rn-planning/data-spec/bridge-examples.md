# Historical protocol validation examples

Status: SUPERSEDED for production by [ADR-007](../docs/adr/ADR-007-RN-SKIA-RUNTIME.md). These examples retain compatibility with the historical spike evidence.

# Bridge validation examples

Validate each envelope against both bridge.schema.json and bridge-payloads.schema.json. The payload schema discriminates on `type`; it is not a free-form payload validator. Transport additionally enforces size/depth, direction, request IDs, sequence/session state and pending-operation authority.

Valid control example: version1, type app.pause, requestId pause:1, sessionId session:1, generation1, sequence4, timestamp1000; payload reason background, hostMonotonicMs100, wallUtcMs1000, flushRequested true. Invalid examples: currency balance −1, unknown message type, app.rewardGranted with arbitrary amount, missing operationId, stale session, protocol2 and >64KiB body. Structural schemas catch shape errors; stateful harness catches stale/replay/authority errors.

[Protocol catalogue](bridge-protocol.json) · [Protocol spec](../docs/technical/18_BRIDGE_PROTOCOL.md) · [Native spike](../spikes/rn-cocos/README.md).
