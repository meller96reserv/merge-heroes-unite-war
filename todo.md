You are working on a Windows machine. The repository has already been cloned, but Cocos Creator and the Android development toolchain may not be installed yet.

Your job is to inspect the project, prepare a fully working Windows development environment for Merge Heroes Unite War, and then complete the requested product changes.

Work autonomously. Do not stop after every intermediate step. Do not ask for confirmation unless a truly unavoidable manual action is required. Avoid unnecessary repeated tests.

## 1. Read the project documentation first

Before making changes, read these files completely:

* AGENTS.md
* CODEX_EXECUTION_RULES.md
* README.md
* docs/00_INDEX.md
* docs/BACKLOG.md
* cocos-spike/DEVELOPMENT.md
* cocos-spike/HANDOFF.md
* cocos-spike/PLAN-1.8.md
* all task-relevant documents under docs/tz/

Treat the documentation and repository state as the source of truth.

## 2. Use the correct project

The active product is in:

cocos-spike/

Despite the historical folder name, this is the current full game built with Cocos Creator 3.8.8.

Do not restore, revive, migrate, or work on:

* the old React Native project;
* the archived React Native task DAG;
* any obsolete RN workflow.

Do not change architecture merely to make the project resemble the old RN version.

## 3. Prepare the Windows toolchain

The machine may be missing some or all required tools.

Inspect the system first, then install or configure the following as needed:

* Git
* Node.js 22
* Python 3.11 or newer
* official Cocos Dashboard
* exactly Cocos Creator 3.8.8
* JDK 17
* Android Studio
* Android SDK Platform 36
* Android SDK Build Tools
* Android Platform Tools
* CMake 3.22.1
* Android NDK r24, version 24.0.8215888

Do not silently substitute Cocos Creator 3.8.8 with a newer release.

Install development tools outside the repository.

Never place any of the following inside Git:

* Android SDK
* Android NDK
* Cocos Creator installation
* Gradle caches
* Android emulators
* toolchain archives
* generated build caches

If Cocos Dashboard requires a manual login, license acceptance, or GUI action that cannot be automated, do everything possible beforehand and then give the user exactly one concrete action to perform.

After that action is completed, continue autonomously.

## 4. Verify Git state

Check the repository before changing anything.

Requirements:

* active branch must be main;
* local main must match origin/main before beginning implementation;
* do not add generated or local-only directories to Git.

In particular, do not commit:

* .tools
* node_modules
* library
* temp
* build
* private
* logs
* SDK files
* NDK files
* local IDE state unless already intentionally tracked

Do not discard unrelated existing user work.

## 5. Bootstrap the Cocos project

Inside cocos-spike:

1. Run:
   npm ci

2. Run:
   npm run check:core

3. Open cocos-spike as a standalone project in Cocos Creator 3.8.8.

4. Let the first asset import complete.

5. Confirm that Cocos generates:

   * library/
   * temp/

6. Open:
   assets/scenes/Battle.scene

7. After Cocos typings have been generated, run:
   npm run typecheck

Resolve environment or Windows-specific issues where necessary, but do not alter gameplay logic merely to satisfy Windows tooling.

## 6. Configure Android development builds

Configure Android builds for this package ID:

com.mergeheroes.unitewar

Use:

* JDK 17
* Android SDK Platform 36
* current compatible Android Build Tools
* Android Platform Tools
* CMake 3.22.1
* Android NDK 24.0.8215888

Inspect existing build automation.

If current Python scripts contain hardcoded macOS paths or assumptions, either:

* make them properly cross-platform; or
* add a Windows/PowerShell equivalent.

Prefer the smallest safe change.

Do not modify game logic solely to make the Windows build work.

## 7. Build and smoke-test the Android app

Build a development APK using debug signing.

Do not create a permanent production signing key.

For release builds, the user will later provide:

* com.mergeheroes.unitewar.jks
* android-signing.json

These files are intentionally absent from Git.

Without the original release signing material, only development/debug builds are allowed.

Do not generate a replacement release key because a new key would not be able to update the already published application.

After creating the development APK:

* install and launch it on one connected Android device, or
* use one already available and visible Android emulator.

Perform exactly one short smoke test unless something fails.

Smoke-test flow:

1. launch the game;
2. tap “Let’s Play”;
3. go through the tutorial;
4. purchase two heroes;
5. merge them;
6. drag/place the resulting hero onto the arena;
7. attack;
8. proceed to the next step.

If this smoke test passes, do not run repeated full cycles or long exploratory tests.

## 8. Do not attempt iOS builds on Windows

On Windows:

* do not build iOS;
* do not install macOS virtualization hacks;
* do not install questionable macOS emulators;
* do not attempt to imitate Xcode.

Keep the source compatible with iOS.

Final iOS build, signing, and TestFlight distribution will be done later on a Mac.

## 9. Reuse existing research

Use the existing project research:

* analysis/figma/
* analysis/reference/

Do not repeat lengthy recording or reverse-engineering of the original game unless a specific missing detail makes it absolutely necessary.

Do not restore the React Native implementation.

Do not overwrite original .fig files.

Preserve all existing guarantees around:

* core game rules;
* save atomicity;
* reward idempotency.

## 10. Product task: Privacy Policy and Terms & Conditions

After the environment is working, immediately implement the following task.

Create the Privacy Policy and Terms & Conditions screens according to this document:

https://docs.google.com/document/d/1SpfHips8hATWUPFs7L4-MGSCzSoSck79DU-YVeCaguE/edit?tab=t.0

Read the entire document.

Do not rely on a partial preview or summary.

Also open and inspect every relevant link referenced from that document.

Extract and document all useful requirements, content, references, UI expectations, and source information in the repository so that future work does not require repeatedly revisiting the external document or linked resources.

Do not overwrite authoritative source files when documenting them.

Implement the screens in the current Cocos project using the existing visual style and project conventions.

Use the existing research under analysis/figma/ and analysis/reference/ where relevant.

## 11. Product task: fix the tutorial drag issue

Fix the tutorial bug where the player currently cannot drag a character onto the arena during the tutorial.

Investigate the actual interaction flow and identify the root cause.

The fix must allow the intended tutorial progression without weakening unrelated gameplay restrictions.

Preserve existing game rules and state guarantees.

Do not bypass the tutorial by forcibly advancing its state unless that is genuinely part of the intended design.

After the fix, verify the tutorial path during the single Android smoke test described above.

## 12. Documentation

Update the current project documentation with the actual environment and build results.

Document at least:

* Windows prerequisites that were installed;
* exact versions used;
* Cocos Creator installation location;
* Android SDK location;
* Android NDK location;
* JDK location;
* any required environment variables;
* commands used to install dependencies;
* commands used to validate the project;
* commands used to open or build the project where applicable;
* any new PowerShell or Windows build scripts;
* development APK output path;
* details of the Privacy Policy / Terms & Conditions implementation;
* summarized requirements extracted from the external Google Doc and its linked references;
* the root cause and fix for the tutorial drag issue;
* smoke-test result;
* any genuine remaining limitations.

Keep documentation factual. Record what actually worked on this machine instead of documenting hypothetical commands that were not verified.

## 13. Final report

At the end, provide one concise completion report.

Include:

* what was installed or already present;
* exact installed versions;
* where Cocos Creator 3.8.8 is located;
* where the Android SDK and NDK are located;
* how to launch/open the project;
* how to run the validation commands;
* how to build the development Android APK;
* path to the generated APK;
* whether the APK was successfully launched;
* result of the smoke test;
* what was implemented for Privacy Policy and Terms & Conditions;
* what caused the tutorial drag bug and how it was fixed;
* what files were changed;
* what documentation was updated;
* any limitations that genuinely remain.

Do not report planned work as completed work.

Do not claim a smoke test passed unless it actually ran successfully.

Do not claim an APK exists unless the file was actually produced.

Do not create or claim a production/release build without the original signing files.
