import {test} from 'node:test';import assert from 'node:assert/strict';import {heroView} from '../../app/src/battle/HeroView';import {layout} from '../../app/src/ui/ResponsiveLayout';import {combatEntity} from '../../game-core/src/model/CombatEntity';import {heroes} from '../../game-core/src/content/PlayableConfig';
import {BattleSystem} from '../../game-core/src/systems/BattleSystem';
import {spawnEncounter} from '../../game-core/src/systems/EncounterSpawner';
import {battleConfig} from '../../game-core/src/content/BattleConfig';
import {createState} from '../../game-core/src/model/GameState';
test('hero projection preserves canonical anchors and semantic identity without modifying combat',()=>{
 const definition=heroes.get('hero_tier_1'),entity=combatEntity({id:'h1',definitionId:definition.id,encounterId:'e1',side:'hero',spawnOrdinal:0,stats:definition.baseStats,stepMs:50,hitDelayMs:150,canAttack:true});entity.attackSequence=3;
 const before=JSON.stringify(entity),view=heroView(entity,0,layout(430,932,undefined,10))!;assert.deepEqual(view.rect,{x:8,y:384,width:83,height:86});assert.equal(view.visualId,definition.visualId);assert.equal(view.attackSequence,3);assert.equal(JSON.stringify(entity),before);assert.equal(heroView(entity,3,layout(430,932)),null);
});
test('the same owned hero carries a new combat identity when encounter attack sequences restart',()=>{
 const state=createState({dataVersion:'test',initialGold:'0',utcMs:0});
 const hero=heroes.instantiate('hero_tier_1','owned-hero',0);hero.deployed=true;state.data.heroes=[hero];
 const enemy={id:'boar',stats:{hp:10,attack:0,defense:0,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:10000},rewardId:null,canAttack:false,hitDelayMs:0};
 const l=layout(430,932),views=[];
 for(let sequence=0;sequence<3;sequence++){
  const engine=new BattleSystem(spawnEncounter('boss',sequence,0,[{enemyId:'boar',count:1}],[enemy],50),battleConfig,[1,2,3,4]);
  engine.syncRoster(state,heroes);
  const initial=heroView(engine.snapshot().encounter.entities.find(e=>e.side==='hero')!,0,l)!;
  assert.equal(initial.id,hero.id);assert.equal(initial.attackSequence,0);assert.equal(initial.encounterId,engine.snapshot().encounter.id);
  assert.ok(views.every(previous=>previous.encounterId!==initial.encounterId));
  for(let tick=0;tick<23;tick++)engine.step();
  const end=engine.snapshot();assert.equal(end.encounter.entities.find(e=>e.side==='enemy')!.hp,0);
  const final=heroView(end.encounter.entities.find(e=>e.side==='hero')!,0,l)!;
  assert.equal(final.attackSequence,1);assert.equal(final.encounterId,initial.encounterId);views.push(final);
 }
});
