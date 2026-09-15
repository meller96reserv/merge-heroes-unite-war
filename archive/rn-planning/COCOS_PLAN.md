> Current delivery (2026-09-11): the user chose native Cocos Android/iOS and continued the existing game beyond this original spike. Active source and the bounded customer correction are in [cocos-spike/PLAN-1.8.md](cocos-spike/PLAN-1.8.md); build/service handoff is [cocos-spike/HANDOFF.md](cocos-spike/HANDOFF.md). Cocos source inputs are now versioned in Git; build/editor caches, recordings and private keys remain ignored. The original experiment instructions below are historical where superseded by those explicit user requests. The RN task DAG has not been falsely marked complete by Cocos work.

# RAPID COCOS MIGRATION SPIKE

Create a FAST, isolated Cocos Creator proof-of-concept of the existing game.

This is NOT a full migration yet.

The purpose of this task is to answer one practical question:

> Can the existing game be implemented more naturally, smoothly and efficiently as a pure Cocos Creator game than with the current React Native + Skia implementation?

We already have:

- an existing React Native + Skia game implementation;
- existing TypeScript gameplay/domain logic;
- existing Figma-derived production assets;
- existing gameplay/reference specifications;
- an existing Android APK of the current RN implementation;
- extensive planning/documentation elsewhere in the repository.

DO NOT restart planning.

DO NOT migrate the entire game.

DO NOT spend hours on tests.

Build ONE representative production-quality battle screen in pure Cocos as quickly as practical, compile a real Android APK, run it, and compare it with the existing RN build.

---

# 1. CREATE AN ISOLATED COCOS SPIKE

At repository root create:

`cocos-spike/`

Everything created specifically for this experiment must remain inside this directory.

Prefer approximately:

cocos-spike/
├── README.md
├── project.json / settings as required by Cocos
├── assets/
│   ├── scenes/
│   ├── scripts/
│   ├── prefabs/
│   ├── textures/
│   ├── atlases/
│   ├── audio/
│   ├── effects/
│   └── data/
├── native/
├── build/
│   └── android/
└── benchmark/
    └── RESULT.md

Use the actual standard Cocos Creator project structure where it differs from this example.

Do NOT delete, rewrite, migrate or break the existing React Native application.

The RN application remains the baseline/reference during this experiment.

---

# 2. NO GIT WORK FOR THIS SPIKE

Do not:

- create commits;
- stage files;
- push;
- create branches;
- rewrite history;
- reset user changes.

Leave the spike as local working-tree changes.

We will decide what to keep after evaluating the result.

---

# 3. USE PURE COCOS

This spike must be a genuine Cocos Creator game.

Do NOT:

- embed React Native;
- embed React;
- use React Native Skia;
- use WebView;
- wrap the RN game;
- create another HTML game;
- use Flutter.

Target architecture:

Cocos Creator
+
TypeScript
+
Cocos scenes/nodes/components
+
Sprite/SpriteFrame
+
Prefab
+
Animation/Tween
+
Particle/VFX where useful
+
Audio
+
native Android build

The Android result must be generated as a native Cocos Android application.

---

# 4. COCOS VERSION

Use a stable compatible Cocos Creator 3.8.x version suitable for production.

If Cocos Creator is not installed:

- install it autonomously if possible;
- do not ask the user merely because installation is required;
- use the official/supported distribution;
- verify that the editor/build tools work.

Do not spend excessive time comparing versions.

If a compatible Cocos Creator 3.8.x installation already exists, use it.

---

# 5. PRIMARY SOURCES

Use, in this priority order:

1. current source repository;
2. current Figma-derived assets already present in the repository;
3. existing Figma asset maps/specifications;
4. current RN game behavior;
5. existing planning/gameplay documentation;
6. the supplied current RN Android APK only as an execution/performance reference.

Do NOT use proprietary assets/code downloaded from the Heroes Unite reference runtime in the new Cocos spike.

Reference-game material may be used to understand behavior only.

The Cocos spike must use OUR existing assets.

---

# 6. EXISTING RN APK

If `com.mergeheroes.unitewar.apk` exists in repository/root or another obvious local location, treat it as the current baseline build.

Do NOT waste time deeply reverse-engineering the APK because the source application already exists.

Use the APK only where useful for:

- launching the current build;
- visually comparing behavior;
- comparing startup;
- comparing smoothness;
- comparing memory;
- comparing APK size.

Do not spend significant time extracting implementation details from it.

---

# 7. DO NOT RE-ANALYZE THE ENTIRE PROJECT

The existing repository already contains extensive specifications and prior analysis.

Do not read hundreds of documents unnecessarily.

Inspect only the files required to answer:

- how the first battle screen should look;
- which assets belong to it;
- how purchasing works;
- how deployment works;
- how basic combat works;
- what current values/configs are used.

Use targeted search through existing docs/source.

Do not create another planning package.

Do not generate dozens of Markdown documents.

At most maintain:

`cocos-spike/README.md`

and:

`cocos-spike/benchmark/RESULT.md`

for this experiment.

Spend tokens on implementation, not documentation.

---

# 8. SCOPE — ONLY THE FIRST PLAYABLE BATTLE SCREEN

Implement ONLY enough functionality to produce one representative playable battle screen.

Do not migrate the rest of the game yet.

Required flow:

START
↓
Battle screen visible
↓
player buys a hero
↓
hero appears on the hero/merge board
↓
player can deploy that hero into battle
↓
hero automatically attacks an enemy
↓
attack has visible feedback
↓
enemy receives damage
↓
enemy can die
↓
gold/reward is applied
↓
next enemy can appear
↓
combat continues

That is sufficient for this spike.

---

# 9. USE THE REAL BATTLE SCREEN ASSETS

Reconstruct the first battle screen using actual existing Figma-derived assets.

Do not create placeholder rectangles when the actual visual assets already exist.

Use the real available:

- battle background;
- platforms/slots;
- board;
- hero art;
- enemy art;
- HUD;
- currency display;
- purchase button;
- navigation/background decoration required for the screen;
- health display;
- relevant frames/icons.

It does not have to implement every button on the screen.

Nonessential buttons may be visually present but inactive during this spike.

The important goal is that when the APK opens, it already LOOKS recognizably like our actual game.

---

# 10. MATCH THE CURRENT VISUAL COMPOSITION

Use the existing Figma screen specifications/layout measurements.

Support portrait mobile layout.

Do not spend excessive time achieving pixel-perfect ±1px parity.

Aim for visually convincing close parity.

Prioritize:

1. correct overall composition;
2. correct asset sizes;
3. correct battle/board proportions;
4. correct hero/enemy scale;
5. correct HUD positioning;
6. smooth rendering.

Minor spacing differences are acceptable for this spike.

---

# 11. MINIMAL HERO PURCHASE SYSTEM

Implement the actual minimal purchase behavior.

Use existing gameplay/domain configuration when easy to reuse.

Required:

- purchase button;
- current gold amount;
- purchase price;
- successful purchase deducts gold;
- purchased hero appears in the first valid board slot;
- insufficient funds is safely rejected;
- full board is safely rejected.

For a fresh spike test state, initialize enough currency to exercise purchase easily if the existing normal starting state would make testing inconvenient.

If changing starting currency only for the spike, clearly mark it as development/spike configuration.

Do not redesign economy.

---

# 12. HERO TIER

For this first spike, Tier 1 is sufficient.

Do not implement the entire hero tier progression unless some existing reusable logic makes it almost free.

Do not migrate:

- full discovery system;
- all hero tiers;
- hero collection;
- equipment;
- hero upgrades

during this task.

The purpose is renderer/gameplay performance, not feature completeness.

---

# 13. DEPLOYMENT

Implement minimal deployment.

The first purchased hero appears on the board/reserve.

The player must be able to deploy it to the battle area.

Use whichever interaction is already appropriate/easiest:

- drag-and-drop;
- tap followed by placement;

but prefer the interaction matching the current application if already clearly implemented.

At Account Level 1:

`deploymentCapacity = 1`

The battle screen may show all five visual positions/platforms, but only ONE hero may be actively deployed simultaneously.

Do NOT confuse:

- visible battle positions
with
- maximum simultaneous deployed heroes.

Five positions may remain visible.

Only the deployment count is limited to 1 for the initial account state.

---

# 14. BASIC COMBAT

Once deployed, the hero automatically attacks.

Implement only the minimum complete combat loop:

Hero:
- target enemy;
- attack cooldown;
- attack;
- deal damage.

Enemy:
- HP;
- receive damage;
- hit feedback;
- death.

After enemy death:

- grant the normal reward/gold;
- spawn/advance to another enemy.

Do not migrate advanced combat systems during this spike.

Do not implement:

- complex skills;
- equipment;
- many damage types;
- deep boss logic;
- entire stage progression system

unless a piece is trivial because reusable framework-independent code already exists.

---

# 15. REUSE FRAMEWORK-INDEPENDENT TYPESCRIPT LOGIC

Inspect the existing RN code for pure TypeScript/domain modules.

Where code is independent from:

- React;
- React Native;
- Skia;
- Reanimated;

reuse the existing logic directly when practical.

Examples that may be reusable:

- hero definitions;
- enemy definitions;
- damage calculations;
- economy values;
- purchase rules;
- stage data;
- config types;
- IDs;
- deterministic utilities.

However:

DO NOT spend hours refactoring the RN project merely to share code during this spike.

If existing logic is deeply coupled to React/RN, reimplement the tiny subset required for the spike cleanly inside Cocos.

Later, after deciding to migrate, we can properly consolidate shared game-core logic.

---

# 16. COCOS-NATIVE STRUCTURE

Implement the screen using normal Cocos concepts.

Prefer something conceptually like:

BattleScene
├── Background
├── World
│   ├── EnemyLayer
│   ├── HeroBattleLayer
│   ├── ProjectileLayer
│   ├── VfxLayer
│   └── DamageTextLayer
├── HeroBoard
└── HUD

Use Prefabs for reusable runtime entities.

At minimum consider:

Hero.prefab
Enemy.prefab
Projectile.prefab
DamageText.prefab
SimpleVfx.prefab

Do not build a giant monolithic script controlling every visual object.

But also do not overengineer an elaborate ECS/framework for this spike.

Use simple clean Cocos architecture.

---

# 17. AVOID RN-STYLE PERFORMANCE PATTERNS

This migration spike exists partly to test whether a real game engine simplifies runtime performance.

Use the Cocos update/render model naturally.

Do NOT reproduce React-style high-frequency state propagation.

Continuous visual movement should happen in Cocos directly.

Avoid:

- unnecessary allocations every frame;
- recreating sprites/textures repeatedly;
- loading images during every attack;
- expensive scene graph rebuilds;
- unnecessary per-frame event dispatch;
- uncontrolled object creation.

---

# 18. PROJECTILE POOL

Implement a small projectile pool if the hero uses projectiles.

Do not instantiate/destroy a brand-new runtime object indefinitely for every shot if pooling is straightforward.

Example:

ProjectilePool
→ acquire
→ launch
→ hit/expire
→ reset
→ return

Keep the implementation simple.

---

# 19. DAMAGE TEXT / VFX POOL

If floating damage numbers or repeated hit effects are implemented, reuse/pool them.

Again, keep this lightweight.

The goal is to demonstrate proper game-runtime behavior from the beginning.

---

# 20. MINIMAL ANIMATION QUALITY

Do not leave the scene completely static.

Implement a SMALL but representative amount of game feel.

Hero should have at minimum:

- subtle idle motion;
- attack anticipation/recoil;
- attack release.

Enemy:

- subtle idle;
- hit feedback;
- death feedback.

Projectile:

- movement;
- simple impact.

Purchase:

- small spawn/pop.

Reward:

- small feedback.

Use the simplest Cocos-native techniques that look good:

- Tween;
- AnimationClip;
- sprite animation;
- particles where useful.

Do not spend hours creating elaborate animation systems for the spike.

---

# 21. FLATTENED FIGMA CHARACTERS

Do not attempt a full character-rigging pipeline during this first experiment.

If the current Figma hero/enemy assets are flattened:

use tasteful:

- translation;
- rotation;
- scale;
- squash/stretch;
- recoil;
- bounce;
- hit flash;
- simple layered effect

to make them feel alive.

Do not spend the spike manually cutting every character into body parts.

We can evaluate Spine/cutout animation after Cocos is proven.

---

# 22. BASIC VFX

Use a few lightweight representative effects.

For example:

Attack:
small muzzle/magic flash where appropriate.

Hit:
small flash/spark.

Enemy death:
scale/fade/particle burst.

Reward:
small coin/gold response.

Do not attempt to reproduce the entire reference game's VFX library.

The purpose is to ensure Cocos remains smooth with normal game feedback.

---

# 23. BASIC AUDIO

Use existing OUR audio assets if suitable ones already exist.

At minimum try to provide:

- purchase;
- attack;
- hit;
- enemy death;
- reward.

If final suitable sounds do not exist, do not spend significant time sourcing or creating a full audio pack.

Temporary development sounds or silence are acceptable for this spike.

Do not copy sounds from the reference game.

Audio must not block completion of the APK.

---

# 24. ASSET PIPELINE — IMPORTANT

Use this spike to test a proper game-oriented asset pipeline.

Do NOT simply import every full-resolution Figma export blindly.

Only bring the assets required for the battle-screen spike.

For imported assets:

- remove obviously unnecessary transparent padding where safe;
- use SpriteFrames correctly;
- configure filtering appropriately;
- avoid unnecessarily huge texture dimensions;
- preserve visual quality;
- group related small textures where atlas packing is beneficial.

---

# 25. SPRITE ATLASES

Create sensible atlases for the battle-screen resources where they provide a practical benefit.

Do not spend hours manually micro-optimizing atlas layouts.

Prefer logical groups such as:

`battle_ui`
`battle_common`
`hero_board`
`battle_fx`

Do not place unrelated giant backgrounds into atlases merely for the sake of having atlases.

Large unique background textures can remain standalone.

Verify that atlas usage is actually enabled in the Android build.

---

# 26. TEXTURE COMPRESSION

Configure Android-appropriate texture compression for production-like performance/size.

Prefer GPU-friendly texture compression supported by the chosen Cocos version and target.

Where appropriate consider:

- ASTC for modern Android targets;
- ETC2 fallback where compatibility requires it.

Do not aggressively destroy image quality merely to make the APK tiny.

The purpose is representative production-quality compression.

Avoid spending excessive time creating every possible device-format variant during this spike.

One sensible modern Android configuration is sufficient.

Record briefly in README which compression strategy was used.

---

# 27. AUDIO COMPRESSION

Use reasonable Android audio compression/settings.

Do not store unnecessarily large uncompressed audio if compressed audio is appropriate.

But do not waste time optimizing a handful of temporary sounds.

---

# 28. LOAD ONLY WHAT THIS SCREEN NEEDS

Do not import/load hundreds of unrelated game assets during this spike.

Only load the resources needed for the playable battle screen.

This will give a cleaner measurement of:

- engine baseline;
- battle runtime;
- representative assets;
- gameplay rendering.

Later migration can introduce proper asset bundles/lazy loading for the complete application.

---

# 29. KEEP MEMORY LIFETIME SIMPLE

For this single-screen spike:

load battle resources
→ retain while scene exists
→ clean up correctly

No need to implement the entire production asset-streaming architecture yet.

Do not build an enormous asset manager during this experiment.

---

# 30. NO FULL SAVE SYSTEM

Do NOT migrate the production save system yet.

The spike may initialize deterministic test/default state on launch.

Persisting a tiny amount of state is optional, not required.

Do not spend time implementing:

- migration;
- A/B saves;
- offline rewards;
- crash recovery;
- account persistence

for this experiment.

---

# 31. NO TUTORIAL

Do not implement the tutorial during this Cocos spike.

We already know how it should work.

Tutorial migration can happen after choosing Cocos.

---

# 32. NO META SCREENS

Do not migrate during this spike:

- Heroes screen;
- Equipment;
- Daily rewards;
- Wheel;
- Settings;
- Quests;
- Store;
- Profile;
- other secondary screens.

Only the first Battle screen matters.

---

# 33. NO IOS

Do not build or test iOS during this experiment.

If we choose Cocos after evaluating Android, iOS migration will be handled separately.

For this task:

ANDROID ONLY.

---

# 34. NO WEB BUILD REQUIREMENT

Do not spend time preparing or testing a browser/web build during this experiment.

The decision target is Android native performance.

Cocos editor preview may be used internally if it speeds implementation, but it is not a deliverable.

Required deliverable:

ANDROID APK.

---

# 35. BUILD A RELEASE-LIKE APK

Do not benchmark an unnecessarily instrumented/debug-heavy configuration if a release-like development build is straightforward.

Create a production-like Android build suitable for performance evaluation.

Use a unique package ID so it can coexist with the current RN game.

For example:

`com.mergeheroes.unitewar.cocosspike`

App display name:

`Merge Heroes — Cocos Spike`

Do not overwrite/uninstall the current RN application simply to install the Cocos version.

---

# 36. OUTPUT APK

Put the final APK at a predictable path:

`cocos-spike/build/android/merge-heroes-cocos-spike.apk`

If Cocos/Gradle naturally generates another output path, copy the final installable APK to that exact path as the final deliverable.

---

# 37. TESTING PHILOSOPHY — MOVE FAST

This is NOT production QA.

Do not spend excessive time testing obvious implementation details.

If something is:

- straightforward;
- deterministic;
- low risk;
- successfully compiled;
- visually obvious;

do not add redundant layers of testing merely because production plans elsewhere contain extensive QA.

Use engineering judgment.

The goal is:

BUILD THE SCREEN
→ BUILD APK
→ RUN APK
→ OBSERVE PERFORMANCE

not:

BUILD TEST FRAMEWORKS.

---

# 38. DO NOT CREATE LARGE AUTOMATED TEST SUITES

Do not spend time creating:

- exhaustive unit tests;
- integration test suites;
- snapshot/golden infrastructure;
- repeated lifecycle tests;
- 50-cycle tests;
- long soak tests;
- extensive benchmark automation.

None are required for this experiment.

If pure gameplay code is trivial and already tested elsewhere, reuse it without duplicating tests.

---

# 39. WHEN TESTING IS ACTUALLY REQUIRED

The only meaningful runtime acceptance test for this spike is the final Android APK.

Once the APK is built, verify on ONE available Android device/emulator:

1. application launches;
2. Battle screen renders correctly enough;
3. purchase button works;
4. hero appears;
5. hero can be deployed;
6. hero attacks automatically;
7. enemy receives damage;
8. enemy dies;
9. reward/next enemy works;
10. no obvious visual stutter/crash.

That is sufficient.

Do NOT repeat these checks 10/20/50 times.

One successful representative run is enough unless an actual problem occurs.

---

# 40. TIME-BOX NON-CRITICAL ISSUES

Do not spend a long time investigating warnings that do not affect the final experiment.

For any non-blocking issue:

- investigate briefly;
- fix if obvious;
- otherwise document it and continue.

Rough guidance:

5–10 minutes maximum investigation for a non-critical issue.

Deep debugging is justified only if the issue blocks:

- Cocos project startup;
- battle screen;
- purchase;
- deployment;
- combat;
- Android build;
- APK launch;
- representative smooth gameplay.

---

# 41. PERFORMANCE CHECK — KEEP IT SIMPLE

After the APK works, perform ONE lightweight performance measurement on the same Android target.

Use standard Android tooling where practical.

Record approximately:

- APK size;
- process memory after warmup;
- frame statistics / FPS or frame pacing;
- startup time if easy to obtain.

Do not build a complicated benchmark system.

A short 60–90 second representative battle run is sufficient.

---

# 42. COMPARE AGAINST CURRENT RN APK

If the existing RN APK can be installed/run on the same target without significant extra work, perform a short comparison.

Compare:

Current RN+Skia APK
vs
Cocos Spike APK

on the same device/emulator.

Record:

- APK size;
- memory after warmup;
- visual smoothness;
- frame statistics if available;
- startup;
- subjective visible stutter.

Use equivalent/simple battle interaction where possible.

Do not spend significant time creating mathematically perfect identical benchmark conditions.

The comparison is meant to answer:

> Is Cocos obviously better/simpler for this game?

---

# 43. OPTIONAL QUICK STRESS CHECK

ONLY if it takes very little additional work, add a development-only way to temporarily increase runtime activity, for example:

- faster attack rate;
- several simultaneous projectiles;
- repeated hit effects.

Use it for a short visual smoothness check.

Do not build a sophisticated stress-test scene.

This section is OPTIONAL.

Normal gameplay performance is enough for the decision.

---

# 44. DO NOT LOWER QUALITY TO WIN THE BENCHMARK

Do not make the Cocos version artificially faster by removing the visual content necessary for a fair representative comparison.

The Cocos screen should contain:

- real background;
- real UI;
- hero;
- enemy;
- attack;
- projectile/attack visual where appropriate;
- hit/death feedback;
- representative HUD.

It should look like an actual early version of the game, not an empty benchmark scene.

---

# 45. DO NOT PORT RN IMPLEMENTATION LITERALLY

The purpose is to see what the game would look like if we had chosen Cocos from the beginning.

Therefore:

DO NOT mechanically translate every React component into a Cocos Node.

Instead:

- preserve gameplay behavior;
- preserve visual design;
- preserve useful TypeScript domain logic;
- implement rendering/input/runtime in a natural Cocos architecture.

Think:

"How should this game have been built in Cocos from day one?"

not:

"How can I simulate React Native inside Cocos?"

---

# 46. OPTIMIZE AS IF THIS COULD BECOME THE PRODUCTION FOUNDATION

Even though this is a spike, avoid throwaway architectural mistakes in the important runtime areas.

Use sane foundations for:

- scenes;
- prefabs;
- object pooling;
- asset ownership;
- texture setup;
- atlases;
- input;
- combat entity lifecycle.

If we decide to migrate, this `cocos-spike/` may become the foundation of the production Cocos project.

However, do NOT overengineer systems that are outside the current battle-screen scope.

---

# 47. TOKENS / CONTEXT — BE ECONOMICAL

Do not burn model context by repeatedly reading:

- the entire planning package;
- huge generated reports;
- APK binary contents;
- all Figma assets;
- reference-runtime bundles.

Search targeted files.

Inspect only the source/assets/specs needed for this screen.

Use scripts/filesystem tools for asset inventories.

Do not print massive logs.

When a build fails:

filter to the relevant error.

Spend the majority of effort on actual implementation.

---

# 48. STOP AFTER THE SPIKE

Do NOT begin migrating the rest of the game automatically.

Once the first functional Cocos battle APK has been produced and evaluated:

STOP.

We want to inspect the result before deciding whether to move the complete game to Cocos.

---

# 49. FINAL RESULT FILE

Create:

`cocos-spike/benchmark/RESULT.md`

Keep it SHORT.

Include:

## Build
- Cocos version
- Android configuration
- package ID
- APK path
- APK size

## Implemented
- battle screen
- purchase
- hero board
- deployment
- automatic attack
- damage/death
- reward/respawn
- animations/VFX/audio actually included

## Asset pipeline
- atlases used
- texture compression used
- major texture dimensions
- relevant optimization choices

## Android run
- device/emulator
- launch success
- gameplay success
- obvious bugs

## Performance
- memory
- FPS/frame data if available
- visible smoothness

## RN comparison
- current APK size
- Cocos APK size
- rough memory comparison
- rough frame/smoothness comparison

## Recommendation
One concise conclusion:

- MIGRATE TO COCOS
- KEEP RN+SKIA
- INCONCLUSIVE

with concrete reasons.

Do not write a giant report.

---

# 50. DEFINITION OF DONE

This experiment is complete when:

1. `cocos-spike/` exists.
2. It is a real Cocos Creator project.
3. Existing RN implementation is untouched.
4. Existing Figma-derived assets are used.
5. First Battle screen visually resembles the actual game.
6. Hero purchase works.
7. Purchased hero appears on board/reserve.
8. Hero can be deployed.
9. Account Level 1 allows max one simultaneously deployed hero.
10. Hero automatically attacks.
11. Enemy takes damage.
12. Enemy can die.
13. Reward is applied.
14. Another enemy can appear.
15. Simple representative animation/VFX exist.
16. Sensible atlas/texture setup exists.
17. Android texture compression is configured appropriately.
18. A native Cocos Android APK builds.
19. Final APK exists at:

`cocos-spike/build/android/merge-heroes-cocos-spike.apk`

20. APK has been launched once on an available Android target.
21. The representative gameplay loop works.
22. One short performance measurement exists.
23. Existing RN APK is compared if practical.
24. No full-game migration has begun.
25. No iOS work has been performed.
26. No unnecessary long tests have been performed.
27. No Git commits have been created.

---

# EXECUTION PRIORITY

Optimize for SPEED.

Priority order:

1. inspect current battle implementation/assets;
2. bootstrap Cocos;
3. render actual battle screen;
4. purchase hero;
5. deploy hero;
6. automatic combat;
7. simple animation/VFX;
8. sensible asset optimization;
9. Android release-like APK;
10. run APK once;
11. short performance comparison;
12. STOP.

Do not let secondary concerns delay this sequence.

If you are at least reasonably confident that a low-risk internal step is correct and the project builds, continue instead of creating elaborate tests for it.

The final APK runtime is the primary validation target.

Start now.
