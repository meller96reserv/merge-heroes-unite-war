#!/usr/bin/env python3
import json,re
from pathlib import Path
m=json.loads(Path('tasks/task_manifest.json').read_text());tasks={t['id']:t for t in m['tasks']};doc=Path('docs/05_PRODUCT_REQUIREMENTS_AMENDMENT.md').read_text();app=json.loads(Path('app.json').read_text())['expo']
assert app['android']['package']==app['ios']['bundleIdentifier']=='com.mergeheroes.unitewar'
checks={'identity':True,'wheelCooldown':'12-hour' in tasks['TASK-0137']['oracle'] or '12hours' in tasks['TASK-0137']['oracle'],'wheelCompletionDependency':'TASK-0254' in tasks['TASK-0138']['dependencies'],'nativeAdReleaseGate':'TASK-0259' in tasks['TASK-0237']['dependencies'],'appmetricaSelected':'AppMetrica' in tasks['TASK-0210']['oracle'],'noCooldownShop':'no cooldown' in tasks['TASK-0255']['oracle'],'noInterstitials':'ordinary interstitials' in tasks['TASK-0258']['oracle'],'notGenericCasino':'Not applicable: betting' in doc,'noKeyValues':not re.search(r'\b[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\b',doc,re.I),'wheelIndependentOfDaily':'TASK-0135' not in tasks['TASK-0136']['dependencies']}
assert all(checks.values()),checks
for path in ['CODEX_EXECUTION_RULES.md','docs/release/01_MVP_DEFINITION.md','docs/technical/18_PLATFORM_SERVICES.md']:
 assert not re.search(r'Purchases/ads/backend are outside|excludes live payments/ads|Ads, purchases and payouts are outside',Path(path).read_text())
print(json.dumps({'task':'TASK-0253','status':'PASS','checks':checks,'nativeSDKAcceptance':'NOT_RUN'},indent=2))
