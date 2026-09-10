# Native spike acceptance ledger

All rows were NOT RUN at planning completion. Standalone prerequisites TASK-0037…0039 now pass with [Cocos](cocos-probe/README.md) and [RN](rn-probe/README.md) native evidence. The rows below concern the integrated host; standalone success does not pass them.

| ID | Case | Required evidence | Status |
| --- | --- | --- | --- |
| NAT-01 | Android build installs | APK installed and launches on named emulator plus physical target | PARTIAL — [API36 emulator PASS](android-host-results.md); physical NOT RUN |
| NAT-02 | RN screen renders | Entry screen screenshot and navigation action | PASS — [Android RN entry/return and native navigation](android-host-results.md) |
| NAT-03 | Cocos opens and renders continuously | 60-second render/tick counter video | PASS — [Android integrated video68.7462s](evidence/android-host.json) |
| NAT-04 | Touch works | Tap coordinates and visible counter response | PASS — [Android controlled touch1→2 and second scene0→1](android-host-results.md) |
| NAT-05 | Cocos→RN | Typed ping payload and receiver log | PASS — [Android/iOS native runtime exchange](bridge-results.json) |
| NAT-06 | RN→Cocos | Typed command changes color once | PASS — [color applied once on both native targets](bridge-results.json) |
| NAT-07 | Android Back | Popup then game dismissal returns correctly | PARTIAL — [game dismissal PASS](android-host-results.md); popup NOT RUN |
| NAT-08 | Re-enter10+ times | Cycle log and memory slope after warmup | PARTIAL — [10 cycles per platform PASS](lifecycle-results.json); [memory samples/slopes collected](memory-results.md); physical/long-soak limits remain |
| NAT-09 | Background/resume | 10cycles, no time catch-up or duplicate callbacks | PASS — [10 per platform; unchanged hide/show counters and single touch delivery](lifecycle-results.json), documented launcher path |
| NAT-10 | Audio focus | Interrupt/resume/mute/headphones without duplicate loop | PARTIAL — [simulator controls/resume and real Android transient focus PASS](audio-results.md); physical headphones and iOS OS interruption NOT RUN |
| NAT-11 | Engine ownership | No double initialization; listeners/resources return to baseline | PARTIAL — [one owner and session/touch lifetime PASS](lifecycle-results.json); [resource investigation completed](memory-results.md); mixed Android entry routing and iOS automation crash remain TASK-0046 |
| NAT-12 | iOS equivalent | Build/run simulator and physical-device checks, or specific blocker | PARTIAL — [host](ios-host-results.md), [protocol](bridge-results.json) and [lifecycle PASS](lifecycle-results.json); [memory captured](memory-results.md); audio/physical and post-run XCTest crash remain |
| NAT-13 | Process death/save handshake | Valid generation restored; no stale result applied | NOT RUN — integrated host evidence pending |
| NAT-14 | Protocol robustness | Invalid/duplicate/stale/oversize messages rejected | PASS — [exact rejection code/path histograms and duplicate no-apply on Android/iOS](bridge-results.json); teardown/process-death remain NAT-11/13 |
| NAT-15 | ADR outcome | Strategy, versions, evidence and unresolved failures recorded | NOT RUN — integrated host evidence pending |

[Spike plan](README.md) · [Native integration phase](../../plans/PHASE_03_NATIVE_INTEGRATION_SPIKE.md).
