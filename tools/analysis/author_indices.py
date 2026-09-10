from plan_common import *

indices={'gameplay':'00_GAMEPLAY_INDEX.md','progression':'00_PROGRESSION_INDEX.md','visual':'00_VISUAL_INDEX.md','audio':'00_AUDIO_INDEX.md','technical':'00_TECH_INDEX.md','qa':'00_QA_INDEX.md'}
phase_map={'gameplay':'07_HERO_PURCHASE_AND_MERGE','progression':'10_HERO_PROGRESSION_AND_EQUIPMENT','visual':'13_ANIMATION_VFX_HAPTICS','audio':'14_AUDIO','technical':'04_PROJECT_FOUNDATION','qa':'18_QA_AND_REGRESSION'}
for folder,index in indices.items():
 path=f'docs/{folder}/{index}';files=sorted(p for p in (ROOT/'docs'/folder).iterdir() if p.is_file() and p.name!=index)
 write(path,f'# {folder.title()} index\n\nSpecifications describe future implementation. OBSERVED/MEASURED evidence is separate from PROPOSED contracts; runtime/native tests are not executed during planning.\n\n'+ '\n'.join('- '+link(path,str(p.relative_to(ROOT)),p.stem.replace('_',' ')) for p in files)+f'\n\n[Phase entry](../../plans/PHASE_{phase_map[folder]}.md) · [All tasks](../../tasks/TASK_INDEX.md) · [Unknowns](../04_UNKNOWNS_REGISTER.md) · [Evidence](../03_EVIDENCE_LEDGER.md) · [Main index](../00_INDEX.md).')

write('CODEX_EXECUTION_RULES.md','''# Codex execution rules after planning

This repository is at PLANNING_COMPLETE only when the root completion report exists and the consistency report passes. No production game implementation has been performed. The user's current instruction authorizes planning only; future implementation begins under a new implementation instruction.

1. Read docs/00_INDEX.md, the evidence/unknown/conflict registers, the relevant phase and one ready atomic task. Use tasks/task_manifest.json dependencies rather than numeric phase order. TASK-0001 validates handoff before changes.
2. Preserve original .fig, source hashes, user edits and the deleted-app baseline. Do not restore old RN code from history as an assumed foundation. Use isolated implementation changes and inspect current repository state.
3. OBSERVED/MEASURED facts require source IDs, screenshots/video PTS or reproducible measurements. INFERRED/PROPOSED/UNKNOWN remain explicit. Figma numbers are visual fixtures; web3.16.2 and mobile store versions are separate datasets.
4. Unknowns have concrete verification tasks and behavior/data gates. Continue independent work; do not invent missing costs, probabilities, timers or algorithms. If a rule is deliberately redesigned, record a proposed-scope decision and its acceptance tests before enabling it.
5. Native RN/Cocos feasibility is an early spike. A NOT_RUN/BLOCKED ledger is not a pass. Full-screen native Activity/ViewController is preferred; exact versions and lifecycle/thread ownership must be proven. No silent WebView/Flutter substitution.
6. Keep game-core pure and deterministic. Domain owns money,merges,damage,stage and reward receipts. Cocos projects state and routes input. RN owns host/system integration. No per-frame bridge traffic and no reward/damage from tween completion.
7. Durable actions commit draft+receipt+watermark before state install/events. Duplicate requests/results are idempotent. Save failures preserve old authoritative state; migrations preserve backups. Decimal currencies never pass through floating display parsing.
8. Source art uses semantic IDs,calibrated pivots/trim/insets and bounded bundle residency. Never use a full-screen screenshot as interactive UI or chop flattened characters automatically. Keep all source assets classified even when out of MVP.
9. Audio is original or licensed. Do not extract reference code,audio or private resources. Rights/fonts/audio proof is required before distribution. Missing audio remains custom needed,not final.
10. Execute the smallest bounded task and its meaningful checks. Update evidence/spec/schema/task/test traceability together. Split newly discovered independent work into stable IDs; recompute DAG and critical path. Do not mark a task complete while its own oracle is unmet.
11. Test core invariants,save crash points,visual fixtures,native lifecycle and device performance according to changed surface. Web success does not prove mobile. Exact Figma and15-slot adaptation goldens are separate. Record actual expected/actual results and limits.
12. Keep debug tools and proposed fixtures out of release. Purchases/ads/backend are outside MVP; reserved bridge messages do not enable them. Release submission/distribution needs explicit authorization for the concrete approved artifact.

Documentation changes follow evidence→unknown/conflict→spec/schema→phase/task→test. Never rewrite historical captures to match an implementation. [Task index](tasks/TASK_INDEX.md) · [Execution order](plans/00_EXECUTION_ORDER.md) · [Consistency report](analysis/reports/planning_consistency_report.md).
''')

sections=[('Source and design',[p for p in sorted((ROOT/'docs').glob('*.md')) if p.name not in ['00_INDEX.md','CODEX_MASTER_PLAN.md']]),('Subsystem indices',[ROOT/'docs'/f/i for f,i in indices.items()]),('Individual screens',sorted((ROOT/'docs/screens').glob('*.md'))),('Architecture decisions',sorted((ROOT/'docs/adr').glob('*.md'))),('Release scope',sorted((ROOT/'docs/release').glob('*.md')))]
parts=['# Planning documentation index\n\nRead scope→source/evidence/unknowns→screen/gameplay/technical contracts→execution order→one ready atomic task. This package plans the game from an empty runtime baseline; implementation is not started.']
for title,files in sections:parts.append('## '+title+'\n\n'+'\n'.join('- '+link('docs/00_INDEX.md',str(p.relative_to(ROOT)),p.stem.replace('_',' ')) for p in files))
parts.append('''## Plans, tasks and contracts

- [Execution order](../plans/00_EXECUTION_ORDER.md), [dependency graph](../plans/01_DEPENDENCY_GRAPH.md), [critical path](../plans/02_CRITICAL_PATH.md).
- [Atomic task index](../tasks/TASK_INDEX.md), [machine-readable task manifest](../tasks/task_manifest.json), [execution rules](../CODEX_EXECUTION_RULES.md).
- [Data schemas](../data-spec/README.md), [bridge catalogue](../data-spec/bridge-protocol.json), [event catalogue](../data-spec/event-catalog.json).
- [Figma source manifest](../analysis/figma/asset_manifest.csv), [semantic map](../analysis/figma/semantic_map.json), [asset gaps](visual/asset_gap_analysis.md), [ownership ledger](../analysis/figma/asset_ownership.csv).
- [Reference capture index](../analysis/reference/capture_index.md), [unknown verification tasks](../analysis/reference/unknown_task_mapping.md), [native spike plan](../spikes/rn-cocos/README.md).
- [Consistency report](../analysis/reports/planning_consistency_report.md), [unresolved blockers](../analysis/reports/unresolved_blockers.md), [planning completion](../PLANNING_COMPLETE.md).

## Source directive

[CODEX_MASTER_PLAN.md](CODEX_MASTER_PLAN.md) was read in full. Original Figma and links remain user inputs. Generated docs distinguish planning acceptance from native/game runtime acceptance.
''')
write('docs/00_INDEX.md','\n\n'.join(parts))

for p in (ROOT/'docs/screens').glob('*.md'):
 s=p.read_text().replace('../audio/audio_event_map.csv','../audio/audio_event_matrix.csv').replace('exit=140ms','exit=180ms').replace('`screen.enter`/`screen.exit`, `ui.tap.primary`, `ui.popup.open`/`ui.popup.close`, `ui.error.currency`','`screen.transition`, `ui.primary`, `ui.popupOpen`/`ui.popupClose`, `ui.error`')
 p.write_text(s)
print('indices and execution rules created')
