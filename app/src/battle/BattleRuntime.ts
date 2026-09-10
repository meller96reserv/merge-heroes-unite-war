import {dragonDefinition,DRAGON_TIMER_MS,type FinishDragon} from '../../../game-core/src/modes/DragonMode';
import {DamageLabelPool,type DamageLabel} from './DamageLabel';
import type {GameRuntime} from '../game/GameRuntime';
import {BattleSystem,type BattleSnapshot} from '../../../game-core/src/systems/BattleSystem';
import {spawnEncounter} from '../../../game-core/src/systems/EncounterSpawner';
import {SimulationClock} from '../../../game-core/src/systems/SimulationClock';
import {BossSystem} from '../../../game-core/src/systems/BossSystem';
import {heroes} from '../../../game-core/src/content/PlayableConfig';
import {battleConfig,encounterTransitionMs} from '../../../game-core/src/content/BattleConfig';
import {stages,stageEnemies} from '../../../game-core/src/content/StageConfig';
import type {Intent} from '../../../game-core/src/commands/Dispatcher';
import type {ClaimBattleRewards} from '../../../game-core/src/systems/KillRewardService';
import type {FailBoss} from '../../../game-core/src/commands/RetryBoss';
import type {Grant} from '../../../game-core/src/systems/RewardService';
import {Amount} from '../../../game-core/src/model/Amount';
export type BattleVisualSnapshot={combat:BattleSnapshot;events:readonly Intent[];revision:number;paused:boolean;damageLabels?:readonly DamageLabel[];rewardStatus?:'idle'|'saving'|'failed';stageId?:string;waveOrdinal?:number;boss?:{remainingMs:number;status:'fighting'|'won'|'failed'};victory?:{stageId:string;gold:string;boostId?:string}};
/** Application clock drives the pure simulation; no view callback advances combat. */
export class BattleRuntime {
 engine:BattleSystem;
 private labels=new DamageLabelPool();
 private clock=new SimulationClock();
 private listeners=new Set<()=>void>();
 private timer:ReturnType<typeof setInterval>|null=null;
 private lastMs=0;
 private paused=true;
 private unsubscribe:()=>void;
 private value:BattleVisualSnapshot;
 private hudValue:BattleVisualSnapshot;
 private hudKey='';
 private pendingCommand:ClaimBattleRewards|FailBoss|FinishDragon|null=null;
 private rewardStatus:'idle'|'saving'|'failed'='idle';
 private transitionRemaining=0;
 private stageId='stage_1_1';
 private waveOrdinal=0;
 private boss:BossSystem|null=null;
 private victory:BattleVisualSnapshot['victory'];
 private victoryRemaining=0;
 constructor(readonly game:Pick<GameRuntime,'dispatcher'|'nextId'>){
  this.engine=this.createEncounter();
  this.value={combat:this.engine.snapshot(),events:[],revision:0,paused:true,rewardStatus:'idle',stageId:this.stageId,waveOrdinal:this.waveOrdinal,boss:this.boss?{remainingMs:this.boss.remainingMs,status:this.boss.status}:undefined};
  this.hudValue=this.value;
  this.unsubscribe=game.dispatcher.events.subscribe(batch=>{
   if(batch.some(e=>['boss.retryStarted','dungeon.started','dungeon.completed','dungeon.failed','dungeon.left'].includes(e.type)))this.replaceEncounter();
   else this.engine.syncRoster(game.dispatcher.getSnapshot(),heroes);
   const clear=batch.find(e=>e.type==='stage.cleared'||e.type==='dungeon.completed');
   if(clear){
    let gold=Amount.from('0');
    for(const e of batch)if(e.type==='kill.rewardCommitted'||e.type==='stage.firstClearCommitted'||e.type==='dungeon.completed')for(const grant of (e.payload as {grants:Grant[]}).grants)if(grant.kind==='currency'&&grant.id==='gold')gold=gold.add(Amount.from(grant.amount));
    const boost=batch.find(e=>e.type==='stageBoost.available');
    this.victory={boostId:(boost?.payload as {boostId:string}|undefined)?.boostId,stageId:(clear.payload as {stageId:string}).stageId,gold:gold.toString()};this.victoryRemaining=2000;
   }
   this.publish([]);
  });
 }
 private createEncounter(){
  const state=this.game.dispatcher.getSnapshot(),active=state.data.dungeon?.active;
  if(active){
   const d=dragonDefinition(active.dragonId)!;this.stageId=`dungeon_${d.id}`;this.waveOrdinal=0;this.victory=undefined;
   this.boss=new BossSystem({timerMs:DRAGON_TIMER_MS,farmStageId:'stage_1_1',retryPolicy:'manual',tiePolicy:'lethal_before_timeout'},battleConfig.stepMs);
   const enemy={id:`dragon_${d.id}`,stats:{attack:0,defense:0,hp:d.hp,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},rewardId:null,canAttack:false,hitDelayMs:150};
   const engine=new BattleSystem(spawnEncounter(this.stageId,active.sequence,0,[{enemyId:enemy.id,count:1}],[enemy],battleConfig.stepMs),battleConfig,state.data.rng.combatState);engine.syncRoster(state,heroes);return engine;
  }
  const stage=stages.get(state.data.stages.currentStageId),waveOrdinal=state.data.stages.waveOrdinal??0,wave=stage.waves[waveOrdinal];
  if(!wave)throw Error('Invalid current wave');
  this.stageId=stage.id;this.waveOrdinal=waveOrdinal;this.boss=stage.boss?new BossSystem(stage.boss,battleConfig.stepMs):null;
  const engine=new BattleSystem(spawnEncounter(stage.id,state.data.stages.encounterSequence,waveOrdinal,[wave],stageEnemies,battleConfig.stepMs),battleConfig,state.data.rng.combatState);
  engine.syncRoster(state,heroes);return engine;
 }
 private replaceEncounter(){this.labels.reset();this.pendingCommand=null;this.rewardStatus='idle';this.transitionRemaining=0;this.engine=this.createEncounter();}
 getSnapshot=()=>this.value;
 /** The page does not subscribe to projectile/attack/particle bookkeeping. */
 getHudSnapshot=()=>this.hudValue;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 releaseDamageLabel=(id:string,lease:number)=>{if(this.labels.release(id,lease))this.publish([]);};
 private publish(events:readonly Intent[]){
  this.labels.ingest(events);
  this.value={combat:this.engine.snapshot(),events,revision:this.value.revision+1,paused:this.paused,damageLabels:this.labels.snapshot(),rewardStatus:this.rewardStatus,stageId:this.stageId,waveOrdinal:this.waveOrdinal,boss:this.boss?{remainingMs:this.boss.remainingMs,status:this.boss.status}:undefined,victory:this.victory};
  const hp=this.value.combat.encounter.entities.filter(e=>e.side==='enemy').reduce((n,e)=>n+e.hp,0);
  const key=[this.stageId,this.waveOrdinal,this.paused,this.rewardStatus,this.boss?.status,Math.ceil((this.boss?.remainingMs??0)/1000),hp,this.victory?.stageId,this.victory?.gold,this.victory?.boostId].join('|');
  if(key!==this.hudKey){this.hudKey=key;this.hudValue=this.value;}
  for(const listener of this.listeners)listener();
 }
 private requestFailure(){
  const state=this.engine.snapshot();
  const active=this.game.dispatcher.getSnapshot().data.dungeon?.active;
  if(active){this.pendingCommand={type:'FinishDragon',commandId:this.game.nextId('dragonFail'),attemptId:active.id,outcome:'failed',tick:state.encounter.tick,defeated:false,rng:state.rng};void this.retryRewards();return;}
  this.pendingCommand={type:'FailBoss',commandId:this.game.nextId('bossFail'),stageId:this.stageId,sequence:state.encounter.sequence,waveOrdinal:this.waveOrdinal,tick:state.encounter.tick,rng:state.rng};
  void this.retryRewards();
 }
 advance(elapsedMs:number){
  this.clock.advance(elapsedMs,()=>{
   if(this.victory){this.victoryRemaining-=battleConfig.stepMs;if(this.victoryRemaining<=0){this.victory=undefined;this.publish([]);}}
   if(this.transitionRemaining>0){
    this.transitionRemaining-=battleConfig.stepMs;
    if(this.transitionRemaining<=0){this.replaceEncounter();this.publish([]);}
    return;
   }
   for(let i=0;i<(this.game.dispatcher.getSnapshot().data.settings.battleSpeed??1);i++)this.combatStep();
  });
 }
 private combatStep(){
   if(this.pendingCommand)return;
   // Consume wall-clock time without advancing enemies/timers until the player
   // deploys a hero. No catch-up combat when the first purchase is placed.
   if(!this.game.dispatcher.getSnapshot().data.heroes.some(h=>h.deployed))return;
   if(this.boss?.status==='failed'){this.requestFailure();return;}
   const previousSecond=this.boss?Math.ceil(this.boss.remainingMs/1000):null;
   const events=this.engine.step(),state=this.engine.snapshot(),allDead=state.encounter.entities.filter(e=>e.side==='enemy').every(e=>e.hp===0);
   const outcome=this.boss?.afterHits(state.encounter.tick,allDead);
   if(events.length||previousSecond!==(this.boss?Math.ceil(this.boss.remainingMs/1000):null))this.publish(events);
   if(this.engine.pending){
    const active=this.game.dispatcher.getSnapshot().data.dungeon?.active;
    if(active){this.pendingCommand={type:'FinishDragon',commandId:this.game.nextId('dragonWin'),attemptId:active.id,outcome:'won',tick:state.encounter.tick,defeated:allDead,rng:state.rng};void this.retryRewards();return;}
    this.pendingCommand={type:'ClaimBattleRewards',commandId:this.game.nextId('battle'),encounterId:state.encounter.id,waveOrdinal:this.waveOrdinal,rewards:state.pendingRewards,cleared:allDead,rng:state.rng};
    void this.retryRewards();
   }else if(outcome==='failed')this.requestFailure();
 }
 retryRewards=async()=>{
  const command=this.pendingCommand,engine=this.engine;if(!command||this.rewardStatus==='saving')return;
  this.rewardStatus='saving';this.publish([]);
  const result=await this.game.dispatcher.dispatch(command);
  if(engine!==this.engine)return;
  if(!result.ok){this.rewardStatus='failed';this.publish([]);return;}
  const events=command.type==='ClaimBattleRewards'?this.engine.acknowledgeRewards(command.rewards.map(r=>r.source)):[];
  this.pendingCommand=null;this.rewardStatus='idle';
  if(this.engine.complete||command.type==='FailBoss')this.transitionRemaining=encounterTransitionMs;
  this.publish(events);
 };
 resume(){
  if(this.timer)return;
  this.paused=false;this.publish([]);this.clock.resume();this.engine.setSuspended(false);this.lastMs=performance.now();
  this.timer=setInterval(()=>{const now=performance.now(),elapsed=Math.max(0,now-this.lastMs);this.lastMs=now;this.advance(elapsed);},25);
 }
 pause(){this.paused=true;if(this.timer)clearInterval(this.timer);this.timer=null;this.clock.suspend();this.engine.setSuspended(true);this.labels.clear();this.publish([]);}
 dispose(){this.pause();this.unsubscribe();this.listeners.clear();}
}
