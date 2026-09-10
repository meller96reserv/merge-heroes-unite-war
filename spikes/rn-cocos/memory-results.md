# Native memory probe — TASK-0045

**Completed bounded measurement/investigation:** [44 samples](memory-cycles.csv), [metrics and evidence hashes](memory-results.json). This does not pass release-device performance or the complete native gate.

Both installed Debug simulator apps ran an explicit warmup followed by ten native open/return cycles, sampled open and closed after2s settling, with no forced GC during the series. Each platform kept one process throughout the measurements. iOS had already run the lifecycle series, so its baseline is deliberately a previously warm process.

| Measurement | Warmup | Closed cycle10 | Investigation |
| --- | --- | --- | --- |
| Android allocated native heap | 73,726 KiB | 75,593 KiB | Later idle72,995 KiB, below warmup; Activities2→1 |
| iOS physical footprint | 193.6 MiB | 196.7 MiB | Closed range192.9–196.7 MiB; one retained paused engine/controller |

Android closed samples rise192.75KiB/cycle over this short series. The later idle sample **before managed heap dumping** returns Activity count to1 and native allocations below warmup. Thus the immediate post-close Activity2 is not cumulative growth across ten cycles. PSS after idle238,665KiB is also below the original baseline241,146KiB. Native allocation-stack dumping returned unavailable because this process lacks malloc backtrace instrumentation; no global emulator restart/root configuration was applied. A48MB managed diagnostic dump was then captured locally and ignored; its allocation/RSS perturbation is explicitly outside the series. This evidence does not establish long-soak leak freedom.

iOS uses a retained engine/controller by design. Native logs show exactly one initialization and memory-series entries12…22. Closed physical-footprint regression is +0.176MiB/cycle, with non-monotonic fluctuations; no zero-slope claim is made. Simulator RSS varies with host swapping, so physical footprint is the primary iOS metric. Neither metric is a physical release budget result.

**Failure preserved:** all iOS samples and the final RN screenshot completed, then PID61817 crashed in an injected `XCTAutomationSession` block. [Crash details](evidence/memory-ios-automation-crash.json) remain FAIL. The triggered stack contains XCTestAutomationSupport and system dispatch frames. Timing suggests automation cleanup, but root cause is not proven. TASK-0046 owns the followup; full native acceptance remains open. Standard System Events automation reports Accessibility disabled, so that alternative cannot currently operate without an OS permission. No permission was bypassed.

The first Android sampling attempt hit an inherited outbound proxy when requesting localhost. The runner now bypasses proxy **only for its local sampler**; failed attempt/log remain recorded. No TLS verification was disabled. A transient uiautomator null-root message in the retry did not prevent actual native owner/bridge checks completing.

Reproduction uses the pinned installed probe and `memory_probe.py --ios-pid PID --run-id NEW`, bound only to127.0.0.1:7458. `flows/ios-memory.yaml` synchronizes native UI steps with local measurement through the documented [Maestro HTTP client](https://docs.maestro.dev/maestro-flows/javascript/make-http-requests); `android_memory.py` drives the private emulator. Use fresh evidence destinations for a new attempt. The accepted raw capture is immutable.

```sh
python3 spikes/rn-cocos/verify_memory.py
```

This verifies recorded samples and hashes, not new device behavior. Physical devices, release builds,30-minute soak, audio, mixed Android launcher routing and the iOS automation crash remain unpassed gates.
