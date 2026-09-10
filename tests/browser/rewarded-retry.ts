import {GameRuntime} from '../../app/src/game/GameRuntime';
import {RewardedController} from '../../app/src/rewards/RewardedController';
import {WheelController} from '../../app/src/ui/WheelController';
import {WebSaveStore} from '../../app/src/platform/WebSaveStore';
import {FakeClock} from '../../game-core/src/ports';
import {createState} from '../../game-core/src/model/GameState';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {recoverSave} from '../../game-core/src/persistence/SaveRecovery';
import type {SaveStore} from '../../game-core/src/ports';
function check(value:unknown,message:string):asserts value{if(!value)throw Error(message);}
/** Uses the actual strict IndexedDB store: a different same-generation candidate
 * is rejected, unlike the permissive in-memory fake. No runtime logs exported. */
export async function verifyRewardedRetry(){
 const cases=[];
 for(const placement of ['freeCoins','stageBoost','wheel'] as const)for(const point of ['confirmation','claim'] as const){
  const clock=new FakeClock(Date.now()),native=new WebSaveStore(indexedDB,`rewarded-${placement}-${point}`);let armed=true,failRead=false;
  const store:SaveStore={readCandidates:n=>native.readCandidates(n),flush:()=>native.flush(),verifyCandidate:async(n,s)=>{if(failRead){failRead=false;throw Error('Injected post-write verification');}return native.verifyCandidate(n,s);},writeCandidate:async(n,s,bytes)=>{
   await native.writeCandidate(n,s,bytes);
   const data=JSON.parse(JSON.parse(bytes).payload).data,ops=Object.values(data.rewardedOperations??{}) as {status:string}[];
   if(armed&&ops.some(op=>op.status===(point==='confirmation'?'confirmed':'consumed'))){armed=false;failRead=true;}
  }};
  const game=new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:clock.utcMs()}),new TransactionCoordinator(store,clock,'guest').commit,clock,'session:1');
  let videos=0;const ads={isShowing:()=>false,show:async()=>{videos++;return 'completed' as const;}};
  let controller:RewardedController|WheelController=placement==='wheel'?new WheelController(game,ads):new RewardedController(game,ads),boostId:string|undefined;
  if(placement==='stageBoost'){
   const encounterId='stage_1_1:0:0',entityId=encounterId+':enemy:0';
   const clear=await game.dispatcher.dispatch({type:'ClaimBattleRewards',commandId:'battle:clear',encounterId,waveOrdinal:0,cleared:true,rng:[1,2,3,4],rewards:[{entityId,encounterId,source:`kill:${encounterId}:${entityId}`,rewardId:'early_boar'}]});
   check(clear.ok,'clear setup');boostId=Object.keys(game.dispatcher.getSnapshot().data.stageBoosts!)[0]!;
   check(await (controller as RewardedController).selectBoost(boostId),'select setup');(controller as RewardedController).settled(boostId);
  }else if(placement==='wheel'){await (controller as WheelController).action();(controller as WheelController).settled(game.dispatcher.getSnapshot().data.wheel.pendingSpin!.id);}
  const claim=()=>placement==='wheel'?(controller as WheelController).action():(controller as RewardedController).claim(placement,boostId);
  const before=game.dispatcher.getSnapshot().data.currencies.gold;
  await claim();check(!armed,'fault reached');check(!!controller.getSnapshot().error,'retry error surfaced');check(videos===1,'one actual video');check(game.dispatcher.getSnapshot().data.currencies.gold===before,'no early grant');
  controller.dispose();clock.advance(100);
  controller=placement==='wheel'?new WheelController(game,ads):new RewardedController(game,ads);
  await claim();check(!controller.getSnapshot().error,'retry succeeds');check(videos===1,'retry must reuse completion');
  const data=game.dispatcher.getSnapshot().data;
  check(Object.values(data.rewardedOperations!).some(op=>op.status==='consumed'),'operation consumed');
  const prefix=placement==='freeCoins'?'freeCoins:':placement==='stageBoost'?'stageBoost:':'wheel:';
  check(data.transactionReceipts.filter(r=>r.source.startsWith(prefix)).length===1,'one reward receipt');
  const saved=recoverSave(await native.readCandidates('guest'),['playable-v1']);check(saved.status==='recovered','recover candidate');
  check(saved.state.data.currencies.gold===data.currencies.gold,'restart preserves exact funds');
  controller.dispose();await native.close();cases.push({placement,point,videos,retry:'PASS',restart:'PASS'});
 }
 return {status:'PASS',cases};
}
