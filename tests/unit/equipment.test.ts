import {runMetaAction} from '../../app/src/ui/MetaActions';
import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState,draft,assertState} from '../../game-core/src/model/GameState';
import {heroes} from '../../game-core/src/content/PlayableConfig';
import {equipmentDefinitions,enhanceCost} from '../../game-core/src/content/EquipmentConfig';
import {heroStats} from '../../game-core/src/selectors/HeroStats';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {recoverSave} from '../../game-core/src/persistence/SaveRecovery';
import {BattleSystem} from '../../game-core/src/systems/BattleSystem';
import {battleConfig} from '../../game-core/src/content/BattleConfig';
async function setup(){const state=createState({dataVersion:'playable-v1',initialGold:'1000',utcMs:1000});state.data.currencies.gem='1000';state.data.currencies.orb='100';
 for(let i=0;i<2;i++){const h=heroes.instantiate('hero_tier_1',`hero_${i+1}`,i);h.deployed=true;state.data.heroes.push(h);state.data.board[i]!.unitId=h.id;}state.data.nextInstanceSequence=3;state.data.progression.discoveredTiers=[1];
 const definition=equipmentDefinitions.find(d=>d.heroDefinitionId==='hero_tier_1'&&d.slotType==='weapon')!;
 state.data.equipment=[1,2].map(i=>({id:`owned_${i}`,definitionId:definition.id,slotType:definition.slotType,level:1,ownerHeroId:null}));
 const store=new MemorySaveStore(),clock=new FakeClock(1000),commit=new TransactionCoordinator(store,clock,'meta').commit;
 return {game:new GameRuntime(state,commit,clock),store,clock,commit};}
test('equip, swap, unequip preserve unique ownership and reject incompatible/other-owner items',async()=>{
 const {game}=await setup(),d=game.dispatcher;
 const equip={type:'EquipItem' as const,commandId:'equip1',heroId:'hero_1',itemId:'owned_1',slot:'weapon' as const};
 assert.equal((await d.dispatch(equip)).ok,true);await d.dispatch(equip);assert.deepEqual(d.getSnapshot().data.heroes[0]!.equippedItemIds,['owned_1']);
 assert.equal((await d.dispatch({...equip,commandId:'wrong',slot:'armor'})).ok,false);
 assert.equal((await d.dispatch({...equip,commandId:'other',heroId:'hero_2'})).ok,false);
 await d.dispatch({...equip,commandId:'swap',itemId:'owned_2'});assert.equal(d.getSnapshot().data.equipment[0]!.ownerHeroId,null);
 await d.dispatch({...equip,commandId:'unequip',itemId:null});assert.ok(d.getSnapshot().data.equipment.every(i=>i.ownerHeroId===null));assertState(d.getSnapshot());
});
test('enhancement and archetype upgrade debit exactly once; stale level, cap and insufficient reject unchanged',async()=>{
 const {game}=await setup(),d=game.dispatcher;
 const enhance={type:'EnhanceItem' as const,commandId:'enhance1',itemId:'owned_1',expectedLevel:1};await d.dispatch(enhance);await d.dispatch(enhance);
 assert.equal(d.getSnapshot().data.currencies.gold,String(1000-Number(enhanceCost(1))));assert.equal(d.getSnapshot().data.equipment[0]!.level,2);
 assert.equal((await d.dispatch({...enhance,commandId:'stale'})).ok,false);
 const upgrade={type:'UpgradeHero' as const,commandId:'upgrade1',definitionId:'hero_tier_1',expectedLevel:0};await d.dispatch(upgrade);await d.dispatch(upgrade);assert.equal(d.getSnapshot().data.currencies.orb,'95');assert.equal(d.getSnapshot().data.heroLevels?.hero_tier_1,1);
 const capped=draft(d.getSnapshot());capped.data.heroLevels!.hero_tier_1=59;capped.data.equipment[0]!.level=20;const g=new GameRuntime(capped,async()=>{});
 assert.equal((await g.dispatcher.dispatch({...upgrade,commandId:'cap',expectedLevel:59})).ok,false);assert.equal((await g.dispatcher.dispatch({...enhance,commandId:'itemcap',expectedLevel:20})).ok,false);
 const poor=draft(d.getSnapshot());poor.data.currencies.orb='0';const p=new GameRuntime(poor,async()=>{});assert.equal((await p.dispatcher.dispatch({...upgrade,commandId:'poor',expectedLevel:1})).ok,false);assert.equal(p.dispatcher.getSnapshot().data.heroLevels!.hero_tier_1,1);
});
test('open x1/x10 persist exact debit, unique items and RNG; duplicate/restart never reroll',async()=>{
 const {game,store,commit}=await setup(),d=game.dispatcher;
 for(const count of [1,10] as const){const c={type:'OpenEquipment' as const,commandId:`open${count}`,heroId:'hero_1',count};const before=d.getSnapshot();await d.dispatch(c);const after=d.getSnapshot();await d.dispatch(c);assert.equal(after.data.equipment.length,before.data.equipment.length+count);assert.equal(after.data.currencies.gem,String(BigInt(before.data.currencies.gem!)-BigInt(10*count)));assert.deepEqual(d.getSnapshot().data.rng.rewardState,after.data.rng.rewardState);
 const recovered=recoverSave(await store.readCandidates('meta'),['playable-v1']);if(recovered.status!=='recovered')throw Error('recovery');const restart=new GameRuntime(recovered.state,commit);await restart.dispatcher.dispatch(c);assert.deepEqual(restart.dispatcher.getSnapshot().data.equipment,after.data.equipment);}
});
test('post-write failure retries the same open without second debit or RNG draw',async()=>{
 for(const point of ['write','verify','flush'] as const){const {game,store}=await setup(),d=game.dispatcher,before=d.getSnapshot();store.failNext=point;const c={type:'OpenEquipment' as const,commandId:'retryOpen',heroId:'hero_1',count:10 as const};assert.deepEqual(await d.dispatch(c),{ok:false,reason:'SAVE_FAILED'});assert.deepEqual(d.getSnapshot(),before);assert.equal((await d.dispatch(c)).ok,true);assert.equal(d.getSnapshot().data.currencies.gem,'900');assert.equal(d.getSnapshot().data.equipment.length,12);}
});
test('merge returns equipped items and preserves permanent levels; battle updates damage without resetting attack cadence',async()=>{
 const {game}=await setup(),d=game.dispatcher;
 await d.dispatch({type:'EquipItem',commandId:'equip',heroId:'hero_1',itemId:'owned_1',slot:'weapon'});
 await d.dispatch({type:'UpgradeHero',commandId:'upgrade',definitionId:'hero_tier_1',expectedLevel:0});
 assert.equal(heroStats(d.getSnapshot(),heroes.get('hero_tier_1'),d.getSnapshot().data.heroes[0]).attack,11);
 const battle=new BattleSystem({id:'test',sequence:0,tick:0,entities:[],complete:false},battleConfig,[1,2,3,4]);battle.syncRoster(d.getSnapshot(),heroes);
 const before=battle.snapshot().encounter.entities[0]!;await d.dispatch({type:'EnhanceItem',commandId:'enhance',itemId:'owned_1',expectedLevel:1});battle.syncRoster(d.getSnapshot(),heroes);const after=battle.snapshot().encounter.entities[0]!;assert.equal(after.attack,12);assert.equal(after.cooldownTicks,before.cooldownTicks);
 await d.dispatch({type:'MergeHeroes',commandId:'merge',sourceId:'hero_1',targetId:'hero_2'});assert.equal(d.getSnapshot().data.equipment[0]!.ownerHeroId,null);assert.equal(d.getSnapshot().data.heroLevels?.hero_tier_1,1);assertState(d.getSnapshot());
});
test('ordinary kill adds meta currencies once using the existing reward receipt',async()=>{
 const {game}=await setup(),d=game.dispatcher,id='stage_1_1:0:0',entityId=id+':enemy:0',c={type:'ClaimBattleRewards' as const,commandId:'kill',encounterId:id,waveOrdinal:0,cleared:true,rng:[1,2,3,4],rewards:[{entityId,encounterId:id,source:`kill:${id}:${entityId}`,rewardId:'early_boar'}]};
 await d.dispatch(c);await d.dispatch(c);assert.equal(d.getSnapshot().data.currencies.gem,'1001');assert.equal(d.getSnapshot().data.currencies.orb,'101');assert.equal(d.getSnapshot().data.currencies.gold,'1006');
});

test('UI action retry survives route disposal and finishes the original pending draw first',async()=>{
 const {game,store}=await setup();store.failNext='verify';const first={type:'OpenEquipment' as const,commandId:'uiOpen',heroId:'hero_1',count:10 as const};
 assert.equal((await runMetaAction(game,first)).result.ok,false);
 const next={...first,commandId:'newRoute',heroId:'hero_2',count:1 as const};const retry=await runMetaAction(game,next);assert.equal(retry.result.ok,true);assert.equal(retry.command.commandId,'uiOpen');assert.equal(game.dispatcher.getSnapshot().data.currencies.gem,'900');assert.equal(game.dispatcher.getSnapshot().data.equipment.length,12);
});
