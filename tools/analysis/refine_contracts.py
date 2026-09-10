from plan_common import *

def patch(path,old,new):
 p=ROOT/path;s=p.read_text()
 if old not in s:print('not found',path,old[:40]);return
 p.write_text(s.replace(old,new))

save=json.loads((ROOT/'data-spec/save.schema.json').read_text())
data=save['properties']['data'];n={'type':'integer','minimum':0,'maximum':9007199254740991};sid={'type':'string','pattern':'^[A-Za-z][A-Za-z0-9_.:-]*$'}
def obj(p):return {'type':'object','additionalProperties':False,'properties':p,'required':list(p)}
data['properties']['nextInstanceSequence']=n
data['properties']['rng']=obj({'algorithm':{'const':'xoshiro128ss-proposed-v1'},'combatState':{'type':'array','minItems':4,'maxItems':4,'items':{'type':'integer','minimum':0,'maximum':4294967295}},'rewardState':{'type':'array','minItems':4,'maxItems':4,'items':{'type':'integer','minimum':0,'maximum':4294967295}}})
data['properties']['autoMerge']=obj({'enabled':{'type':'boolean'},'entitlementId':{'anyOf':[sid,{'type':'null'}]},'expiresAtUtcMs':{'anyOf':[n,{'type':'null'}]},'lastObservedWallUtcMs':n})
for k in ['nextInstanceSequence','rng','autoMerge']:
 if k not in data['required']:data['required'].append(k)
dump('data-spec/save.schema.json',save)
merge=json.loads((ROOT/'data-spec/merge.schema.json').read_text())
merge['properties']['activation']=obj({'durationMs':n,'costCurrencyId':{'anyOf':[sid,{'type':'null'}]},'costAmount':{'type':'string','pattern':'^(0|[1-9][0-9]*)$'},'timeBasis':{'enum':['wallUtcProposed','verified']},'freeActivationPolicy':{'enum':['developmentGrant','disabled','verifiedProvider']},'evidenceIds':{'type':'array','items':sid}})
if 'activation' not in merge['required']:merge['required'].append('activation')
dump('data-spec/merge.schema.json',merge)

patch('docs/gameplay/04_AUTO_MERGE_SYSTEM.md','Persistent auto mode/expiry if reference requires, settled board.','Persistent auto mode/entitlement/expiry and settled board. Live60-minute activation is now observed. Proposed wall-UTC expiry is guarded against clock rollback; reference background expiry policy remains U-030.')
patch('docs/gameplay/04_AUTO_MERGE_SYSTEM.md','SCREEN-003 booster indicator/board; badge expiry if paid/timed proven; no invisible always-on default while tutorial requires drag.','SCREEN-003 booster indicator/board; timed expiry badge required. Live panel after first boss shows60minutes,Free video option and500gem option; free activation produced a59:51countdown. No always-on tutorial default.')
patch('docs/gameplay/04_AUTO_MERGE_SYSTEM.md','Cascade visual intensity saturates at3','Cascade visual intensity saturates at4')
patch('docs/gameplay/04_AUTO_MERGE_SYSTEM.md','EV-006 public description advertises auto; EV-009…010 tutorial manual. Runtime activation/order not yet proven.','EV-006 marketing; EV-009/010 manual tutorial; EV-022 observed60-minute auto panel and free activation; EV-023 observed two buys causing2→3→4cascade including a deployed hero, result remained deployed in slot2. Exact general ordering/max-tier/expiry semantics remain unproven.')
patch('docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md','Hold tooltip observed after tutorial, exact cadence U-032.','EV-015 confirms2-second hold filled four free slots and displayed full-board feedback. Exact repeat cadence, purchase-tier changes and generalized cost curve remain U-032/U-003.')
patch('docs/progression/15_BALANCE_REVERSE_ENGINEERING.md','EV-009 two prices1; EV-010 Archer display; EV-012 first enemy1HP and gold1; no generalized curve claimed','EV-009 two prices1; EV-010 Archer display; EV-012 first enemy1HP and gold1; EV-020 tier3discovery+1000gold/+100gems; EV-021 boss1-10HP70; EV-023 tier4discovery+1440gold/+100gems. BossHP70 breaks naive stage-index-squared extrapolation; no generalized curve claimed')
for path in ['docs/17_GAME_STATE_MODEL.md','docs/technical/06_STATE_MANAGEMENT.md']:
 p=ROOT/path;p.write_text(p.read_text()+'\n\nPersistence refinement: save.data also contains nextInstanceSequence, separate combat/reward RNG states and timed autoMerge entitlement/enabled/expiry. RNG all-zero state is rejected by semantic validation; presentation RNG is not persisted. Auto expiry uses proposed monotonic-clamped wall UTC until reference background behavior is verified.\n')
conf=ROOT/'docs/conflicts.md'
conf.write_text(conf.read_text()+'''

| ID | Conflict | Evidence | Resolution |
|---|---|---|---|
| CF-009 | Figma daily chest+1000gold versus live7-day attendance calendar and separate launch event | EV-004,EV-013 | Preserve Figma visuals; define reviewed daily product behavior separately. UTC independent-day fixture is PROPOSED and not a claim about live consecutive attendance. U-014 gate. |
| CF-010 | Auto-merge marketed broadly but live is a60-minute activation after boss tutorial | EV-006,EV-022/023 | Persist timed entitlement; MVP development grant can exercise it without ad SDK. Exact expiry/paid provider remains gated; permanent auto default would be a separate product change. |
| CF-011 | Early normal HP1,4,16,81 suggests a square curve but first bossHP70 | EV-012,EV-021 | Use explicit stage/boss records; do not extrapolate one formula to bosses. |
''')

events={}
import csv
for row in csv.DictReader((ROOT/'docs/visual/animation_matrix.csv').open()):events.setdefault(row['trigger'],{'canonical':row['trigger'],'consumers':[],'aliases':[]})['consumers'].append('animation:'+row['eventId'])
for row in csv.DictReader((ROOT/'docs/audio/audio_event_matrix.csv').open()):events.setdefault(row['trigger'],{'canonical':row['trigger'],'consumers':[],'aliases':[]})['consumers'].append('audio:'+row['eventId'])
aliases={'hero.purchased':['purchase.succeeded'],'hero.merged':['merge.completed'],'currency.changed':[],'reward.committed':['reward.granted'],'equipment.changed':['equipment.equipped','equipment.unequipped'],'upgrade.committed':['equipment.enhanced','hero.upgraded'],'merge.chainStep':['cascade.step'],'merge.cascadeCompleted':['cascade.completed'],'hero.discovered':['tier.discovered']}
for name,als in aliases.items():events.setdefault(name,{'canonical':name,'consumers':[],'aliases':[]})['aliases']=als
dump('data-spec/event-catalog.json',{'status':'PROPOSED','policy':'Canonical domain events emitted once after commit. Aliases are documentation/adapter translations, never additional emitted events. Presentation-only triggers are derived by directors; audio variants use independent RNG.','events':list(events.values())})
patch('docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md','currency.gold.spend, hero.spawn, ui.error.currency audio','economy.goldSpend, hero.spawn, ui.error audio')
print('refined save/merge/events and late reference contracts')
