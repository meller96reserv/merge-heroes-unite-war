# Delivery dependency graph

Only REQUIRED_NOW + SUPPORTING_REQUIRED work and completed predecessor anchors participate. Deferred tasks remain in the full manifest with their specifications. Numeric phases are organizational labels, not scheduling barriers.

| Task | Dependencies | Output |
| --- | --- | --- |
| TASK-0001 | none | `analysis/reports/implementation_handoff.md` |
| TASK-0002 | TASK-0001 | `analysis/reports/implementation_baseline.json` |
| TASK-0025 | TASK-0001 | `analysis/figma/source_integrity.json` |
| TASK-0177 | TASK-0001 | `analysis/figma/audio_asset_ownership.csv` |
| TASK-0178 | TASK-0001 | `app/assets/audio/music/manifest.json` |
| TASK-0179 | TASK-0001 | `app/assets/audio/ambience/manifest.json` |
| TASK-0003 | TASK-0002 | `docs/adr/ADR-002-MOBILE-HOST.md` |
| TASK-0026 | TASK-0001, TASK-0025 | `tools/analysis/asset_semantic_validator.py` |
| TASK-0027 | TASK-0001, TASK-0025 | `analysis/figma/near_duplicate_decisions.csv` |
| TASK-0028 | TASK-0001, TASK-0025 | `analysis/figma/asset_ownership.csv` |
| TASK-0029 | TASK-0001, TASK-0025 | `analysis/figma/font_ownership.csv` |
| TASK-0030 | TASK-0001, TASK-0025 | `analysis/figma/import_calibration.json` |
| TASK-0031 | TASK-0001, TASK-0025 | `analysis/figma/content_visual_mapping.csv` |
| TASK-0032 | TASK-0001, TASK-0025 | `analysis/figma/atlas_plan.json` |
| TASK-0035 | TASK-0001, TASK-0025 | `analysis/figma/button_state_decisions.csv` |
| TASK-0004 | TASK-0003 | `analysis/reports/fidelity_gates.json` |
| TASK-0158 | TASK-0030 | `analysis/figma/motion_calibration.json` |
| TASK-0005 | TASK-0004 | `analysis/reference/version_lock.json` |
| TASK-0055 | TASK-0030, TASK-0004 | `analysis/figma/board_layout_decision.md` |
| TASK-0252 | TASK-0003, TASK-0004 | `docs/adr/ADR-007-RN-SKIA-RUNTIME.md` |
| TASK-0006 | TASK-0004, TASK-0005 | `analysis/reference/auto_unlock_capture.md` |
| TASK-0008 | TASK-0004, TASK-0005 | `analysis/reference/purchase_cost_series.csv` |
| TASK-0009 | TASK-0004, TASK-0005 | `analysis/reference/purchase_input_cases.csv` |
| TASK-0047 | TASK-0252 | `package.json` |
| TASK-0253 | TASK-0252 | `docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md` |
| TASK-0048 | TASK-0047 | `game-core/tsconfig.json` |
| TASK-0049 | TASK-0047 | `app/README.md` |
| TASK-0231 | TASK-0253 | `analysis/reports/release_identity.json` |
| TASK-0033 | TASK-0030, TASK-0032, TASK-0049 | `tooling/assets/import-figma.ts` |
| TASK-0051 | TASK-0048 | `game-core/src/events/EventBus.ts` |
| TASK-0052 | TASK-0048 | `game-core/src/ports/index.ts` |
| TASK-0056 | TASK-0049, TASK-0029 | `app/src/ui/DesignTokens.ts` |
| TASK-0181 | TASK-0177, TASK-0049 | `app/src/audio/AudioDirector.ts` |
| TASK-0232 | TASK-0231 | `analysis/reports/platform_release_requirements.md` |
| TASK-0034 | TASK-0033, TASK-0026 | `tooling/assets/validate-registry.ts` |
| TASK-0050 | TASK-0048, TASK-0052 | `game-core/src/config/ConfigLoader.ts` |
| TASK-0057 | TASK-0056, TASK-0055 | `app/src/ui/ResponsiveLayout.ts` |
| TASK-0070 | TASK-0048, TASK-0052 | `game-core/src/model/Amount.ts` |
| TASK-0075 | TASK-0052 | `game-core/src/ports/SeededRng.ts` |
| TASK-0077 | TASK-0052 | `game-core/src/systems/SimulationClock.ts` |
| TASK-0146 | TASK-0052, TASK-0047 | `app/src/platform/SaveStore.ts` |
| TASK-0182 | TASK-0181 | `app/src/audio/VoiceAllocator.ts` |
| TASK-0185 | TASK-0181, TASK-0047 | `app/src/audio/AudioLifecycle.ts` |
| TASK-0054 | TASK-0049, TASK-0050 | `app/src/debug/FixtureHarness.ts` |
| TASK-0058 | TASK-0057, TASK-0035 | `app/src/ui/GameButton.ts` |
| TASK-0071 | TASK-0070 | `game-core/src/model/GameState.ts` |
| TASK-0133 | TASK-0077 | `game-core/src/systems/DailyService.ts` |
| TASK-0183 | TASK-0182, TASK-0178 | `app/src/audio/MusicController.ts` |
| TASK-0059 | TASK-0058, TASK-0034, TASK-0054 | `app/src/components/Hud.tsx` |
| TASK-0060 | TASK-0058, TASK-0034, TASK-0054 | `app/src/components/BattleBoard.tsx` |
| TASK-0061 | TASK-0058, TASK-0034, TASK-0054 | `app/src/components/BottomNavigation.tsx` |
| TASK-0062 | TASK-0034, TASK-0054, TASK-0058 | `app/src/components/BootPanels.tsx` |
| TASK-0063 | TASK-0034, TASK-0054, TASK-0058 | `app/src/components/HeroEquipmentPanel.tsx` |
| TASK-0064 | TASK-0034, TASK-0054, TASK-0058 | `app/src/components/HeroUpgradesPanel.tsx` |
| TASK-0065 | TASK-0034, TASK-0054, TASK-0058 | `app/src/components/ExtendedModePanels.tsx` |
| TASK-0066 | TASK-0034, TASK-0054, TASK-0058 | `app/src/components/DailyRewardPanel.tsx` |
| TASK-0067 | TASK-0058, TASK-0034, TASK-0054 | `app/src/components/SettingsPanel.tsx` |
| TASK-0068 | TASK-0058, TASK-0034, TASK-0054 | `app/src/components/WheelPanel.tsx` |
| TASK-0072 | TASK-0071, TASK-0051 | `game-core/src/commands/Dispatcher.ts` |
| TASK-0076 | TASK-0071 | `game-core/src/selectors/index.ts` |
| TASK-0078 | TASK-0058, TASK-0049 | `app/src/input/InputRouter.ts` |
| TASK-0134 | TASK-0133 | `game-core/src/commands/ClaimDaily.ts` |
| TASK-0144 | TASK-0071 | `game-core/src/persistence/SaveCodec.ts` |
| TASK-0198 | TASK-0054, TASK-0070 | `game-core/src/selectors/NumberFormatter.ts` |
| TASK-0073 | TASK-0072, TASK-0052 | `game-core/src/systems/TransactionCoordinator.ts` |
| TASK-0128 | TASK-0061, TASK-0078 | `app/src/ui/NavigationCoordinator.ts` |
| TASK-0135 | TASK-0066, TASK-0134 | `app/src/ui/DailyPanel.ts` |
| TASK-0145 | TASK-0144, TASK-0049 | `app/src/platform/WebSaveStore.ts` |
| TASK-0074 | TASK-0073 | `game-core/src/systems/RewardService.ts` |
| TASK-0129 | TASK-0128 | `app/src/ui/SettingsController.ts` |
| TASK-0147 | TASK-0144, TASK-0145 | `game-core/src/persistence/SaveRecovery.ts` |
| TASK-0079 | TASK-0074, TASK-0076, TASK-0075, TASK-0077 | `game-core/tests/unit/state-invariants.test.ts` |
| TASK-0119 | TASK-0071, TASK-0073, TASK-0074 | `game-core/src/model/Equipment.ts` |
| TASK-0136 | TASK-0075, TASK-0074, TASK-0050 | `game-core/src/systems/WheelOutcome.ts` |
| TASK-0148 | TASK-0073, TASK-0147 | `game-core/src/persistence/SaveCoordinator.ts` |
| TASK-0201 | TASK-0047, TASK-0147 | `app/src/platform/services.ts` |
| TASK-0242 | TASK-0065, TASK-0074, TASK-0075 | `docs/progression/RELIC_EXTENSION.md` |
| TASK-0254 | TASK-0074, TASK-0077 | `game-core/src/rewards/RewardedOperation.ts` |
| TASK-0081 | TASK-0079 | `game-core/src/model/Hero.ts` |
| TASK-0120 | TASK-0119 | `game-core/src/systems/EquipmentRules.ts` |
| TASK-0137 | TASK-0136 | `game-core/src/commands/ReserveSpin.ts` |
| TASK-0156 | TASK-0047, TASK-0148 | `app/src/platform/LifecycleCoordinator.ts` |
| TASK-0202 | TASK-0201 | `tests/native/android-smoke.md` |
| TASK-0203 | TASK-0201 | `tests/native/ios-smoke.md` |
| TASK-0204 | TASK-0052, TASK-0201 | `app/src/platform/PlatformRequests.ts` |
| TASK-0209 | TASK-0201 | `docs/technical/21_ANALYTICS_EVENTS.md` |
| TASK-0255 | TASK-0254 | `game-core/src/commands/ClaimFreeCoins.ts` |
| TASK-0258 | TASK-0201, TASK-0254 | `app/src/platform/StartIoRewarded.ts` |
| TASK-0082 | TASK-0081 | `game-core/src/model/Board.ts` |
| TASK-0121 | TASK-0120 | `game-core/src/commands/EquipItem.ts` |
| TASK-0138 | TASK-0137, TASK-0254 | `game-core/src/commands/CompleteSpin.ts` |
| TASK-0205 | TASK-0204 | `app/src/platform/RequestCoordinator.ts` |
| TASK-0210 | TASK-0209 | `app/src/analytics/AnalyticsAdapter.ts` |
| TASK-0246 | TASK-0074, TASK-0075, TASK-0120, TASK-0242 | `game-core/src/systems/SummonService.ts` |
| TASK-0083 | TASK-0082 | `game-core/src/selectors/PurchaseQuote.ts` |
| TASK-0122 | TASK-0121 | `game-core/src/commands/EnhanceItem.ts` |
| TASK-0139 | TASK-0138, TASK-0068 | `app/src/ui/WheelController.ts` |
| TASK-0206 | TASK-0146, TASK-0205 | `app/src/platform/NativeSaveStore.ts` |
| TASK-0084 | TASK-0083, TASK-0073 | `game-core/src/commands/PurchaseHero.ts` |
| TASK-0123 | TASK-0122 | `game-core/src/selectors/HeroStats.ts` |
| TASK-0207 | TASK-0156, TASK-0185, TASK-0206 | `app/src/platform/Lifecycle.ts` |
| TASK-0085 | TASK-0084, TASK-0009, TASK-0078 | `app/src/input/PurchaseHold.ts` |
| TASK-0124 | TASK-0123 | `game-core/src/commands/UpgradeHero.ts` |
| TASK-0208 | TASK-0128, TASK-0129, TASK-0207 | `app/src/navigation/ExternalRoutes.ts` |
| TASK-0086 | TASK-0085 | `game-core/src/systems/MergeRules.ts` |
| TASK-0125 | TASK-0063, TASK-0124 | `app/src/ui/EquipmentPanel.ts` |
| TASK-0087 | TASK-0086, TASK-0074 | `game-core/src/commands/MergeHeroes.ts` |
| TASK-0126 | TASK-0064, TASK-0125 | `app/src/ui/HeroUpgradesPanel.ts` |
| TASK-0088 | TASK-0087, TASK-0006, TASK-0074 | `game-core/src/commands/ActivateAutoMerge.ts` |
| TASK-0089 | TASK-0088 | `game-core/src/systems/AutoMergeSelector.ts` |
| TASK-0090 | TASK-0089, TASK-0006 | `game-core/src/systems/AutoMergeSystem.ts` |
| TASK-0091 | TASK-0090 | `game-core/src/systems/DiscoveryService.ts` |
| TASK-0092 | TASK-0091 | `game-core/src/commands/DeployHero.ts` |
| TASK-0093 | TASK-0092, TASK-0060, TASK-0078 | `app/src/ui/BoardPresenter.ts` |
| TASK-0095 | TASK-0092 | `game-core/src/model/CombatEntity.ts` |
| TASK-0094 | TASK-0093, TASK-0091 | `game-core/tests/integration/purchase-merge.test.ts` |
| TASK-0096 | TASK-0095 | `game-core/src/systems/EncounterSpawner.ts` |
| TASK-0141 | TASK-0075, TASK-0093, TASK-0147 | `game-core/src/systems/TutorialService.ts` |
| TASK-0097 | TASK-0096 | `game-core/src/systems/TargetingSystem.ts` |
| TASK-0142 | TASK-0141, TASK-0063 | `app/src/ui/TutorialOverlay.tsx` |
| TASK-0098 | TASK-0097 | `game-core/src/systems/AttackSystem.ts` |
| TASK-0099 | TASK-0098 | `game-core/src/systems/HitQueue.ts` |
| TASK-0100 | TASK-0099 | `game-core/src/systems/DamageResolver.ts` |
| TASK-0101 | TASK-0100 | `game-core/src/systems/DeathSystem.ts` |
| TASK-0102 | TASK-0101 | `game-core/src/systems/BattleSystem.ts` |
| TASK-0103 | TASK-0102 | `app/src/battle/HeroView.ts` |
| TASK-0111 | TASK-0102 | `game-core/src/model/Stage.ts` |
| TASK-0104 | TASK-0103 | `app/src/battle/EnemyView.ts` |
| TASK-0112 | TASK-0111 | `game-core/src/systems/StageSystem.ts` |
| TASK-0105 | TASK-0104 | `app/src/battle/ProjectileView.ts` |
| TASK-0113 | TASK-0112 | `game-core/src/systems/StageRewardService.ts` |
| TASK-0106 | TASK-0105 | `app/src/battle/DamageLabel.ts` |
| TASK-0114 | TASK-0113 | `game-core/src/systems/BossSystem.ts` |
| TASK-0107 | TASK-0106 | `game-core/src/systems/KillRewardService.ts` |
| TASK-0115 | TASK-0114 | `game-core/src/commands/RetryBoss.ts` |
| TASK-0108 | TASK-0107 | `game-core/src/systems/RecoveryPolicy.ts` |
| TASK-0116 | TASK-0115 | `game-core/src/systems/UnlockService.ts` |
| TASK-0256 | TASK-0254, TASK-0107 | `game-core/src/commands/ClaimStageBoost.ts` |
| TASK-0109 | TASK-0108 | `game-core/tests/simulation/combat.test.ts` |
| TASK-0117 | TASK-0116 | `app/src/ui/StageHud.ts` |
| TASK-0257 | TASK-0255, TASK-0256, TASK-0139, TASK-0061 | `app/src/rewards/RewardedController.ts` |
| TASK-0110 | TASK-0109 | `tests/integration/combat-presentation.md` |
| TASK-0118 | TASK-0117 | `game-core/tests/simulation/stage-boss.test.ts` |
| TASK-0132 | TASK-0117, TASK-0129 | `game-core/src/selectors/RedDots.ts` |
| TASK-0259 | TASK-0207, TASK-0257, TASK-0258 | `tests/native/rewarded-ads.md` |
| TASK-0159 | TASK-0110, TASK-0158 | `app/src/presentation/AnimationDirector.ts` |
| TASK-0243 | TASK-0065, TASK-0074, TASK-0118 | `game-core/src/modes/DragonMode.ts` |
| TASK-0160 | TASK-0159 | `app/src/presentation/EffectPool.ts` |
| TASK-0184 | TASK-0182, TASK-0159 | `app/src/audio/AudioEventBindings.ts` |
| TASK-0161 | TASK-0160 | `app/src/presentation/HeroMotion.ts` |
| TASK-0162 | TASK-0161 | `app/src/presentation/HeroCombatMotion.ts` |
| TASK-0163 | TASK-0162 | `app/src/presentation/EnemyMotion.ts` |
| TASK-0164 | TASK-0163 | `app/src/presentation/MergeMotion.ts` |
| TASK-0165 | TASK-0164 | `app/src/presentation/CascadeMotion.ts` |
| TASK-0166 | TASK-0165 | `app/assets/art/effects/projectile-manifest.json` |
| TASK-0167 | TASK-0166 | `app/src/presentation/EffectPrimitives.ts` |
| TASK-0168 | TASK-0167 | `app/src/presentation/DamageMotion.ts` |
| TASK-0169 | TASK-0168 | `app/src/presentation/RewardMotion.ts` |
| TASK-0170 | TASK-0169 | `app/src/presentation/UiMotion.ts` |
| TASK-0171 | TASK-0170 | `app/src/presentation/TransitionMotion.ts` |
| TASK-0172 | TASK-0171 | `app/src/presentation/WheelMotion.ts` |
| TASK-0173 | TASK-0172 | `app/src/presentation/MetaRewardMotion.ts` |
| TASK-0174 | TASK-0173 | `app/src/presentation/BackgroundMotion.ts` |
| TASK-0175 | TASK-0174, TASK-0047 | `app/src/platform/Haptics.ts` |
| TASK-0176 | TASK-0175 | `tests/integration/motion-interruption.md` |
| TASK-0229 | TASK-0049, TASK-0059, TASK-0060, TASK-0061, TASK-0062, TASK-0063, TASK-0064, TASK-0065, TASK-0066, TASK-0067, TASK-0068, TASK-0075, TASK-0077, TASK-0079, TASK-0117, TASK-0118, TASK-0126, TASK-0128, TASK-0129, TASK-0135, TASK-0139, TASK-0147, TASK-0148, TASK-0156, TASK-0159, TASK-0176, TASK-0177, TASK-0179, TASK-0183, TASK-0184, TASK-0185, TASK-0198, TASK-0202, TASK-0203, TASK-0206, TASK-0207, TASK-0208, TASK-0210, TASK-0243, TASK-0253 | `analysis/reports/qa_defect_register.md` |
| TASK-0234 | TASK-0028, TASK-0029, TASK-0177, TASK-0178, TASK-0179, TASK-0202, TASK-0203, TASK-0229, TASK-0232, TASK-0142 | `analysis/reports/release_manifest.json` |
| TASK-0237 | TASK-0132, TASK-0234, TASK-0246, TASK-0259 | `analysis/reports/production_gate.md` |

[Scope](DELIVERY_SCOPE.md) · [Manifest](../tasks/task_manifest.json)
