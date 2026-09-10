# Planning documentation index

Read scope→source/evidence/unknowns→screen/gameplay/technical contracts→execution order→one ready atomic task. Current execution follows accepted [ADR-007](adr/ADR-007-RN-SKIA-RUNTIME.md). The original planning report remains historical; current progress is in the task manifest.

## Source and design

- [01 PROJECT SCOPE](01_PROJECT_SCOPE.md)
- [02 SOURCE OF TRUTH](02_SOURCE_OF_TRUTH.md)
- [04 UNKNOWNS REGISTER](04_UNKNOWNS_REGISTER.md)
- [05 REFERENCE CAPTURE PLAN](05_REFERENCE_CAPTURE_PLAN.md)
- [07 FIGMA TECHNICAL AUDIT](07_FIGMA_TECHNICAL_AUDIT.md)
- [08 FIGMA ASSET MAP](08_FIGMA_ASSET_MAP.md)
- [09 SCREEN CATALOG](09_SCREEN_CATALOG.md)
- [10 SCREEN STATE MATRIX](10_SCREEN_STATE_MATRIX.md)
- [11 NAVIGATION FLOW](11_NAVIGATION_FLOW.md)
- [12 UI LAYOUT SPEC](12_UI_LAYOUT_SPEC.md)
- [13 DESIGN TOKENS](13_DESIGN_TOKENS.md)
- [14 RESPONSIVE AND SAFE AREAS](14_RESPONSIVE_AND_SAFE_AREAS.md)
- [15 GAME DESIGN DOCUMENT](15_GAME_DESIGN_DOCUMENT.md)
- [16 CORE GAME LOOP](16_CORE_GAME_LOOP.md)
- [17 GAME STATE MODEL](17_GAME_STATE_MODEL.md)
- [18 SESSION FLOW](18_SESSION_FLOW.md)
- [conflicts](conflicts.md)

## Subsystem indices

- [00 GAMEPLAY INDEX](gameplay/00_GAMEPLAY_INDEX.md)
- [00 PROGRESSION INDEX](progression/00_PROGRESSION_INDEX.md)
- [00 VISUAL INDEX](visual/00_VISUAL_INDEX.md)
- [00 AUDIO INDEX](audio/00_AUDIO_INDEX.md)
- [00 TECH INDEX](technical/00_TECH_INDEX.md)
- [00 QA INDEX](qa/00_QA_INDEX.md)

## Individual screens

- [SCREEN-001 loading](screens/SCREEN-001_loading.md)
- [SCREEN-002 start](screens/SCREEN-002_start.md)
- [SCREEN-003 main battle](screens/SCREEN-003_main_battle.md)
- [SCREEN-004 hero equipment](screens/SCREEN-004_hero_equipment.md)
- [SCREEN-005 relic](screens/SCREEN-005_relic.md)
- [SCREEN-006 dungeon](screens/SCREEN-006_dungeon.md)
- [SCREEN-007 hero upgrades](screens/SCREEN-007_hero_upgrades.md)
- [SCREEN-008 daily get gold](screens/SCREEN-008_daily_get_gold.md)
- [SCREEN-009 daily claim](screens/SCREEN-009_daily_claim.md)
- [SCREEN-010 settings](screens/SCREEN-010_settings.md)
- [SCREEN-011 settings modal](screens/SCREEN-011_settings_modal.md)
- [SCREEN-012 maintenance](screens/SCREEN-012_maintenance.md)
- [SCREEN-013 wheel spin](screens/SCREEN-013_wheel_spin.md)
- [SCREEN-014 wheel free](screens/SCREEN-014_wheel_free.md)
- [SCREEN-015 wheel cooldown](screens/SCREEN-015_wheel_cooldown.md)

## Architecture decisions

- [ADR-007 — Current RN/Skia architecture](adr/ADR-007-RN-SKIA-RUNTIME.md)
- [ADR-001-ENGINE](adr/ADR-001-ENGINE.md)
- [ADR-002-MOBILE-HOST](adr/ADR-002-MOBILE-HOST.md)
- [ADR-003-DOMAIN-SEPARATION](adr/ADR-003-DOMAIN-SEPARATION.md)
- [ADR-004-SAVE-STORAGE](adr/ADR-004-SAVE-STORAGE.md)
- [ADR-005-ASSET-PIPELINE](adr/ADR-005-ASSET-PIPELINE.md)
- [ADR-006-RN-COCOS-BRIDGE](adr/ADR-006-RN-COCOS-BRIDGE.md)

## Release scope

- [01 MVP DEFINITION](release/01_MVP_DEFINITION.md)
- [02 VERTICAL SLICE DEFINITION](release/02_VERTICAL_SLICE_DEFINITION.md)
- [03 BETA DEFINITION](release/03_BETA_DEFINITION.md)
- [04 PRODUCTION DEFINITION](release/04_PRODUCTION_DEFINITION.md)
- [05 POST LAUNCH BACKLOG](release/05_POST_LAUNCH_BACKLOG.md)

## Plans, tasks and contracts

- [Execution order](../plans/00_EXECUTION_ORDER.md), [dependency graph](../plans/01_DEPENDENCY_GRAPH.md), [critical path](../plans/02_CRITICAL_PATH.md).
- [Atomic task index](../tasks/TASK_INDEX.md), [machine-readable task manifest](../tasks/task_manifest.json), [execution rules](../CODEX_EXECUTION_RULES.md).
- [Data schemas](../data-spec/README.md), [historical protocol catalogue](../data-spec/bridge-protocol.json), [event catalogue](../data-spec/event-catalog.json).
- [Figma source manifest](../analysis/figma/asset_manifest.csv), [semantic map](../analysis/figma/semantic_map.json), [asset gaps](visual/asset_gap_analysis.md), [ownership ledger](../analysis/figma/asset_ownership.csv).
- [Reference capture index](../analysis/reference/capture_index.md), [unknown verification tasks](../analysis/reference/unknown_task_mapping.md), [superseded spike evidence](../spikes/rn-cocos/README.md).
- [Consistency report](../analysis/reports/planning_consistency_report.md), [unresolved blockers](../analysis/reports/unresolved_blockers.md), [planning completion](../PLANNING_COMPLETE.md).

## Source directive

[CODEX_MASTER_PLAN.md](CODEX_MASTER_PLAN.md) was read in full. Original Figma and links remain user inputs. Generated docs distinguish planning acceptance from native/game runtime acceptance.

## Implementation handoff inputs

[start_prompt.md](../start_prompt.md) authorizes execution of the existing task DAG. The following user documents arrived after planning and remain unchanged:

- [Game development brief](<tz/Merge Heroes Unite War тз на разработку.md>).
- [General developer instructions](<tz/Инструкция для разработчиков.md>).
- [Advertising instructions](<tz/Реклама в приложениях.md>).

Their project identifiers, wheel cooldown, legal links and integration requests must be reconciled by the relevant existing tasks. Generic examples do not automatically enable payouts, purchases or change accepted ADR-007 architecture. Publishing, credentials and distribution remain subject to the execution rules.


Current product authority: [targeted requirements amendment](05_PRODUCT_REQUIREMENTS_AMENDMENT.md), including rewarded-only ads,AppMetrica and delivery acceptance.

Current execution: [delivery scope and final gate](../plans/DELIVERY_SCOPE.md).
