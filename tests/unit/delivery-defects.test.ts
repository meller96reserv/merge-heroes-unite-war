import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {initialGame,reconcileBoardUnlocks} from '../../app/src/game/initialGame';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {BattleRuntime} from '../../app/src/battle/BattleRuntime';
import {heroes} from '../../game-core/src/content/PlayableConfig';
import {stageEnemies,stages} from '../../game-core/src/content/StageConfig';
import {EnemyViewPool,enemyArt} from '../../app/src/battle/EnemyView';
import {spawnEncounter} from '../../game-core/src/systems/EncounterSpawner';
import {equipmentDefinitions} from '../../game-core/src/content/EquipmentConfig';
import {BoardPresenter} from '../../app/src/ui/BoardPresenter';
import {draft,type GameState} from '../../game-core/src/model/GameState';
const flush=()=>new Promise<void>(r=>setImmediate(r));
test('fresh production save is empty; idle battle and boss timers wait for player placement; existing heroes remain',async()=>{
 const state=initialGame(1000);assert.equal(state.data.heroes.length,0);assert.deepEqual(state.data.board.map(s=>s.unlocked),Array.from({length:15},(_,i)=>i<5));assert.ok(state.data.board.every(s=>s.unitId===null));
 let saved!:GameState;const game=new GameRuntime(state,async s=>{saved=structuredClone(s);}),battle=new BattleRuntime(game);
 for(let i=0;i<400;i++)battle.advance(50);assert.equal(battle.engine.tick,0);assert.equal(game.dispatcher.getSnapshot().data.currencies.gold,'100');
 assert.equal((await game.dispatcher.dispatch({type:'BuyHero',commandId:'first',offerId:'buy_tier_1'})).ok,true);
 assert.equal(saved.data.heroes.length,1);assert.equal(saved.data.heroes[0]!.deployed,true);assert.equal(saved.data.currencies.gold,'99');battle.advance(50);assert.equal(battle.engine.tick,1);battle.dispose();
 const before=JSON.stringify(saved.data.heroes);reconcileBoardUnlocks(saved);assert.equal(JSON.stringify(saved.data.heroes),before);
 const emptyBoss=initialGame(1000);emptyBoss.data.stages.currentStageId='stage_1_3';const boss=new BattleRuntime(new GameRuntime(emptyBoss,async()=>{}));for(let i=0;i<400;i++)boss.advance(50);assert.equal(boss.getSnapshot().boss?.remainingMs,20000);boss.dispose();
});
test('real boss clears unlock 10 then 15 usable islands durably; old earned flags reconcile without rewards',async()=>{
 for(const [stage,expected] of [['stage_1_3',10],['stage_1_6',15]] as const){
  const state=initialGame(1000);state.data.stages.currentStageId=stage;const h=heroes.instantiate('hero_tier_10','owned',0);h.deployed=true;state.data.heroes=[h];state.data.board[0]!.unitId=h.id;state.data.heroLevels={hero_tier_10:20};
  let saved!:GameState;const game=new GameRuntime(state,async s=>{saved=structuredClone(s);}),battle=new BattleRuntime(game);
  for(let i=0;i<320&&game.dispatcher.getSnapshot().data.progression.highestClearedOrdinal<Number(stage.at(-1));i++){battle.advance(50);await flush();}
  assert.equal(game.dispatcher.getSnapshot().data.board.filter(s=>s.unlocked).length,expected);assert.equal(saved.data.board.filter(s=>s.unlocked).length,expected);
  const next=new GameRuntime(saved,async()=>{}),p=new BoardPresenter(next);p.begin(0);assert.ok(p.targets().includes(expected-1));assert.equal((await p.drop(expected-1))?.ok,true);assert.equal(next.dispatcher.getSnapshot().data.board[expected-1]!.unitId,'owned');battle.dispose();
  const old=draft(next.dispatcher.getSnapshot()),money=JSON.stringify(old.data.currencies);old.data.board.forEach(s=>{if(s.slotId>=5&&s.unitId===null)s.unlocked=false;});old.data.unlocks.unlockedIds=[];
  assert.equal(reconcileBoardUnlocks(old),true);assert.equal(old.data.board.filter(s=>s.unlocked).length,expected);assert.equal(JSON.stringify(old.data.currencies),money);assert.equal(reconcileBoardUnlocks(old),false);
 }
});
test('all shipped enemy profiles and equipment variants resolve to supplied bundled art',()=>{
 const registry=JSON.parse(fs.readFileSync('app/assets/asset-registry.json','utf8')).records;const ids=new Set<string>(registry.map((r:{id:string})=>r.id));
 for(const item of equipmentDefinitions)assert.ok(ids.has(item.visualId),item.id+': '+item.visualId);
 const used=new Set<string>(),bosses=new Set<string>();const pool=new EnemyViewPool();
 for(const stage of stages.all())for(const [i,wave] of stage.waves.entries()){
  const entity=spawnEncounter(stage.id,0,i,[wave],stageEnemies,50).entities[0]!;const view=pool.project([entity],()=>({x:0,y:0,width:146,height:132}))[0]!;
  assert.ok(ids.has(view.visualId),view.visualId);assert.equal(view.boss,!!stage.boss);(view.boss?bosses:used).add(view.visualId);pool.reset();
 }
 assert.equal(used.size,10);assert.equal(bosses.size,3);assert.equal(Object.keys(enemyArt).length,13);
});
test('attack-only presentation updates do not invalidate the page snapshot; health changes still update the HUD',async()=>{
 const game=new GameRuntime(initialGame(1000),async()=>{});await game.dispatcher.dispatch({type:'BuyHero',commandId:'first',offerId:'buy_tier_1'});const battle=new BattleRuntime(game);
 let hud=battle.getHudSnapshot(),changes=0,full=0;const off=battle.subscribe(()=>{full++;if(hud!==battle.getHudSnapshot()){changes++;hud=battle.getHudSnapshot();}});
 for(let i=0;i<19;i++)battle.advance(50);const before=battle.getHudSnapshot();battle.advance(50);const attack=battle.getSnapshot();assert.equal(attack.combat.encounter.entities.find(e=>e.side==='hero')!.attackSequence,1);
 // First publication initializes the HUD key; subsequent actor/lease-only changes don't.
 const current=battle.getHudSnapshot();battle.releaseDamageLabel('missing',0);assert.equal(battle.getHudSnapshot(),current);
 for(let i=0;i<3;i++)battle.advance(50);assert.notEqual(battle.getHudSnapshot(),current);assert.equal(battle.getHudSnapshot().combat.encounter.entities.find(e=>e.side==='enemy')!.hp,30);
 const settled=battle.getHudSnapshot();for(let i=0;i<17;i++)battle.advance(50);assert.equal(battle.getHudSnapshot(),settled);assert.ok(full>changes);off();battle.dispose();
});
