from plan_common import *
import csv,re
path=ROOT/'docs/visual/animation_matrix.csv'
with path.open() as f:r=csv.DictReader(f);headers=r.fieldnames;rows=list(r)
extra=[('hero.death','hero.died','hero','mode-gated fade/squash;domain already committed',280,'none'),('hero.recover','hero.recovered','hero','mode-gated grounded spawn/recover',280,'hero.spawn'),('quest.progress','quest.progressed','questCounter','brief counter pulse without reward',140,'none')]
for i,tr,target,anim,dur,sfx in extra:
 if i not in {r['eventId'] for r in rows}:rows.append(dict(zip(headers,[i,tr,target,anim,str(dur),'quadOut','none',sfx,'none','cancelAndReconcile','false','instant final state / opacity only','no extra particles','PROPOSED_MODE_GATED' if i.startswith('hero.') else 'PROPOSED'])))
with path.open('w',newline='') as f:w=csv.DictWriter(f,headers);w.writeheader();w.writerows(rows)
mapping={
'gameplay/01_HERO_SYSTEM.md':(['hero.spawn','hero.idle','hero.attack','hero.hit','hero.mergeOut','hero.mergeIn','hero.upgrade'],['hero.spawn','equipment.upgrade'],'light/medium after committed result'),
'gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md':(['purchase.success','purchase.failure','hero.spawn'],['economy.goldSpend','hero.spawn','ui.error'],'light'),
'gameplay/03_MERGE_SYSTEM.md':(['hero.mergeOut','hero.mergeIn','merge.cascade'],['merge.low','merge.mid','merge.high','merge.cascade'],'medium,cooldown and intensity cap4'),
'gameplay/04_AUTO_MERGE_SYSTEM.md':(['merge.cascade','hero.mergeOut','hero.mergeIn'],['merge.cascade'],'medium;cap4,no unbounded escalation'),
'gameplay/05_BOARD_SLOT_SYSTEM.md':(['slot.unlock','hero.deploy','hero.withdraw','feature.locked'],['progress.unlock','hero.spawn','ui.error'],'light/medium;selection ring is static'),
'gameplay/06_BATTLE_SYSTEM.md':(['hero.attack','projectile.launch','projectile.travel','projectile.impact','enemy.hit','enemy.death','damage.normal','damage.crit'],['combat.melee','combat.ranged','combat.magic','combat.hit','combat.crit'],'ordinary hits none;rare crit light with cooldown'),
'gameplay/07_TARGETING_SYSTEM.md':(['projectile.travel'],[],'none;stale target cancels visual without fake impact'),
'gameplay/08_ATTACK_SYSTEM.md':(['hero.attack','projectile.launch'],['combat.melee','combat.ranged','combat.magic'],'none;profile selects melee/ranged/magic variant'),
'gameplay/09_DAMAGE_CRIT_DEFENSE.md':(['enemy.hit','damage.normal','damage.crit'],['combat.hit','combat.crit'],'crit light with cooldown;no per-digit feedback'),
'gameplay/10_PROJECTILE_SYSTEM.md':(['projectile.launch','projectile.travel','projectile.impact'],['combat.ranged','combat.magic','combat.hit'],'none;pool overflow affects cosmetics only'),
'gameplay/11_ENEMY_SYSTEM.md':(['enemy.spawn','enemy.idle','enemy.attack','enemy.hit','enemy.death'],['enemy.deathSmall','enemy.deathLarge'],'none for frequent enemy events'),
'gameplay/12_STAGE_SYSTEM.md':(['stage.progress','stage.clear','reward.coin'],['progress.stageClear','economy.goldGain'],'light on clear'),
'gameplay/13_BOSS_SYSTEM.md':(['boss.intro','boss.hit','boss.death','boss.warning'],['boss.intro','boss.death','combat.hit'],'heavy intro/death with1500mscooldown;HUD fixed'),
'gameplay/14_SKILLS_AND_SPECIALS.md':(['hero.attack'],['combat.magic'],'none until specific skill approved;magic art alone is not a gameplay skill'),
'gameplay/15_DEATH_RESPAWN_RECOVERY.md':(['hero.hit','hero.death','hero.recover'],['hero.spawn'],'none;death/recovery events enabled only by verified mode'),
'gameplay/16_BATTLE_CONTENT_MODES.md':(['screen.transition','boss.intro'],['music.boss'],'mode-gated;release background bundle after exit'),
'gameplay/17_TUTORIAL_SYSTEM.md':(['tutorial.hand','button.secondary'],['ui.primary'],'none for looping hand;target highlight static'),
'progression/01_CURRENCIES.md':(['currency.bump','reward.coin','reward.gem'],['economy.goldGain','economy.goldSpend','economy.gemGain'],'none for frequent counters'),
'progression/02_ECONOMY_MODEL.md':(['currency.bump'],['economy.goldSpend','economy.goldGain'],'derive feedback from receipt reason'),
'progression/03_HERO_PROGRESSION.md':(['hero.upgrade','feature.unlock'],['equipment.upgrade','progress.unlock'],'medium'),
'progression/04_STAGE_PROGRESSION.md':(['stage.clear','reward.coin'],['progress.stageClear'],'light;no currency grant from effect'),
'progression/05_UNLOCKS.md':(['feature.unlock','slot.unlock','redDot.appear'],['progress.unlock'],'medium once'),
'progression/06_REWARDS.md':(['reward.coin','reward.gem','currency.bump'],['economy.goldGain','economy.gemGain'],'claim-source-specific;no duplicate presentation per transaction'),
'progression/07_QUESTS.md':(['quest.progress','quest.claim','reward.coin'],['progress.stageClear'],'light on claim;progress pulse grants nothing'),
'progression/08_DAILY_REWARD.md':(['daily.claim','chest.open','reward.gem'],['reward.daily','reward.chest'],'medium'),
'progression/09_WHEEL_OF_LUCK.md':(['wheel.accelerate','wheel.tick','wheel.decelerate','wheel.land'],['wheel.tick','wheel.result'],'medium final only;tick audio throttled'),
'progression/10_EQUIPMENT.md':(['equipment.equip','equipment.enhance','chest.open'],['equipment.equip','equipment.upgrade','reward.chest'],'light equip/medium enhance'),
'progression/11_UPGRADES.md':(['hero.upgrade','equipment.enhance','currency.bump'],['equipment.upgrade','economy.goldSpend'],'medium'),
'progression/12_SUMMON_GACHA_IF_APPLICABLE.md':(['chest.open'],['reward.chest'],'mode-gated;new rare reveal needs a dedicated reviewed profile'),
'progression/13_OFFLINE_PROGRESS.md':(['offline.popup','reward.coin','currency.bump'],['reward.offline','economy.goldGain'],'medium claim;no reward waits for fly icon'),
'progression/14_PRESTIGE_META_IF_APPLICABLE.md':([],[],'none;out of scope,no fabricated prestige effect'),
'progression/15_BALANCE_REVERSE_ENGINEERING.md':([],[],'none;measurement tooling does not change game presentation')}
out=[]
for name,(anim,audio,note) in mapping.items():
 p=ROOT/'docs'/name;s=p.read_text()
 body='Animation IDs: '+(', '.join('`'+i+'`' for i in anim) or 'none')+'. Audio IDs: '+(', '.join('`'+i+'`' for i in audio) or 'none')+'. Haptic/interrupt decision: '+note+'. All presentation cancels/reconciles to committed state;no grant or damage from completion callbacks.'
 s=re.sub(r'(## K\. Animation/audio hooks\n\n).*?(\n\n## L\.)',lambda m:m.group(1)+body+m.group(2),s,flags=re.S);p.write_text(s)
 out.append({'spec':'docs/'+name,'animationIds':anim,'audioIds':audio,'decision':note})
dump('data-spec/subsystem-presentation-map.json',{'status':'PROPOSED','entries':out})
events=json.loads((ROOT/'data-spec/event-catalog.json').read_text())
for i,tr,_,_,_,_ in extra:
 if tr not in {e['canonical'] for e in events['events']}:events['events'].append({'canonical':tr,'consumers':['animation:'+i],'aliases':[]})
dump('data-spec/event-catalog.json',events)
readme=ROOT/'data-spec/README.md'
if 'subsystem-presentation-map' not in readme.read_text():readme.write_text(readme.read_text()+'''\n\n## Cross-system examples and IDs\n\n[Subsystem presentation map](subsystem-presentation-map.json) resolves every gameplay/progression hook to canonical [animation](../docs/visual/animation_matrix.csv) and [audio](../docs/audio/audio_event_matrix.csv) IDs. [Domain event aliases](event-catalog.json) are translations,not duplicate emissions. [Bridge examples](bridge-examples.md),[valid pause](examples/bridge-pause.valid.json) and[valid save](examples/save-v1.valid.json) exercise the schemas. Matrix source status `custom needed` maps to schema enum `custom_needed` during config generation. RNG all-zero state and active auto entitlement/expiry consistency require semantic validation beyond JSON Schema.\n''')
print('canonical hooks harmonized across32subsystems;64animation events')
