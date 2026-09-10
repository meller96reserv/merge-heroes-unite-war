# Session and recovery flow

[PROPOSED] Cold start: load minimal branding→validate configs and source map→read latest valid save generation→migrate→initialize adapters/clock→reconcile pending reward→start route/tutorial→enable inputs. Corrupt latest slot falls back to validated backup with explicit error record; both invalid offer user-controlled recovery/reset with export, never silently discard progress.

Fresh save: source-backed tutorial commands and checkpoints; required NewHero acknowledgment before deploy; withdraw/redeploy teaching; tutorial completion acknowledgment. Subsequent mission hints/popups are independent steps, not proof all tutorial UI has ended. Existing save skips satisfied steps and queued duplicate discovery reward.

Background: stop accepting pointer input, cancel drags, checkpoint critical pending transaction, mark lastActiveAt, pause simulation/audio. Foreground: dedupe lifecycle sequence, reconcile storage, clamp elapsed, preserve or create pending offline token, resume one application simulation. UI claim appearance waits for durable pending record. Repeated resume never calculates overlapping interval.

Route remount: subscribe to the existing application state once; discard late prior-mount callbacks. Exit waits for a bounded save barrier and reports recoverable timeout. Process death uses durable snapshot; no assumption JS callbacks survive. Scene-switch cleanup unsubscribes every observer and returns all pooled handles.

Manual acceptance: close/reopen after buy, merge, kill, daily/wheel/offline claim; background during drag/projectile/boss/modal; test fresh/old/corrupt saves. [Golden path](qa/04_GAMEPLAY_ACCEPTANCE.md) · [Platform services](technical/18_PLATFORM_SERVICES.md) · [Save migrations](technical/09_SAVE_MIGRATIONS.md).


[Индекс](00_INDEX.md).
