# Historical strategy — SUPERSEDED

The production strategy is superseded by [ADR-007](../../docs/adr/ADR-007-RN-SKIA-RUNTIME.md), 2026-09-09. Checkpoint `18cad48` preserves coherent audio work; physical acceptance remains PARTIAL. No further production work or active task dependency targets this spike. Original architecture texts are retained under `architecture/` as verbatim `.txt` snapshots.

# RN/Cocos feasibility spike

Status: IN_PROGRESS under `start_prompt.md`. TASK-0037…0043 are complete: pinned tools, standalone builds, integrated [Android](android-host-results.md)/[iOS](ios-host-results.md) hosts and [bidirectional native bridge](bridge-results.json) have actual runtime evidence. [Repeated lifecycle checks](lifecycle-results.json) pass the bounded normal-launch oracle; [TASK-0045 memory measurements](memory-results.md) are complete; TASK-0044 owns audio; full [NAT acceptance](ACCEPTANCE.md) remains unpassed. [Cocos probe](cocos-probe/README.md), [RN probe](rn-probe/README.md), [toolchain lock](toolchain.json).

Run pinned tools from the repository with `python3 spikes/rn-cocos/run.py cocos ...`, `rn ...`, `npm ...` or `pod ...`. This wrapper removes the inherited Electron-as-Node mode, enables TLS verification, sets task-local caches and selects the recorded JDK/SDK/NDK. Cocos CLI build success is exit code 36; the wrapper converts only that success code to shell exit 0. No global shell configuration is changed.

## Spike execution sequence

1. Lock a Cocos3.8 LTS patch and current compatible RN release from official documentation. Record editor binary path, Node/package manager, JDK, SDK/NDK/AGP and Xcode in toolchain.json. Install missing tools through normal licensed sources.
2. Create an isolated minimal RN app and Cocos project under this directory. Export Android and iOS using saved build profiles. Inspect generated Activity/AppDelegate/engine bootstrap APIs before modifying host integration.
3. Build/run the standalone Cocos colored scene and RN entry screen separately. Save exact successful commands and full logs. Intended Cocos CLI shape is editor --project <project> --build <exported profile options>; resolve the selected version's configPath syntax from official CLI docs instead of pasting an unverified command.
4. Add full-screen host strategy A. A tap increments a local counter and emits a typed ping to RN; RN sends a command changing the scene color. Add a one-shot sound and loop to observe audio focus.
5. Exercise all acceptance cases in ACCEPTANCE.md. Capture before/after memory, logs, recordings, device/OS and exact commit. Test release-like builds, not only JS debug mode.
6. Record PASS/FAIL/BLOCKED per case. Attach iOS environment limitations precisely. Update ADR-002/006 with selected strategy and blocking defects. Production phase04/16 can proceed only according to these gates.

## Expected future artifacts

TASK-0042 implementation follows the bounded [bridge fixture contract](bridge-probe-contract.md) and [spike-only schema](bridge-probe.schema.json). Its shared receiver runs in RN/Cocos; passing JS tests does not substitute for native protocol acceptance.

`python3 spikes/rn-cocos/verify_bridge.py` checks the recorded exact rejection code/path histograms, ping/color results and runtime thread logs. It does not rerun devices. Native fixture evidence and the same-scene browser dev exchange pass; physical devices remain NOT_RUN. The first iOS bridge attempt exposed an unowned callback in the non-ARC vendor API; our adapter now retains a copied block for the engine lifetime, and the complete native exchange was rerun successfully.

toolchain.json, android-build.log, ios-build.log, lifecycle-results.json, bridge-results.json, memory-cycles.csv and evidence/ recordings. Current per-task states and evidence are recorded in the task manifest; absent integrated results remain NOT_RUN. [Acceptance ledger](ACCEPTANCE.md) · [Tasks](../../tasks/TASKS_PHASE_03.md).
