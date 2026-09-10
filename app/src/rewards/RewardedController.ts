import type {GameRuntime} from '../game/GameRuntime';
import type {RewardedAds} from '../platform/RewardedAds';
import type {RewardedPlacement,RewardedResult} from '../../../game-core/src/rewards/RewardedOperation';
import {rewardedAttempts} from './RewardedAttemptCache';
export type RewardedView={busy:boolean;placement:RewardedPlacement|null;error:string;animatedBoostId:string|null;settledBoostId:string|null;lastClaim:{placement:RewardedPlacement;id:string}|null};
export const emptyRewardedView:RewardedView={busy:false,placement:null,error:'',animatedBoostId:null,settledBoostId:null,lastClaim:null};
const saveError='Could not save your reward. Please try again.';
/** Shared visible flow. SDK results authorize domain commands; motion only
 * controls presentation. No amount ever comes from the UI or ad provider. */
export class RewardedController {
 private state:RewardedView={...emptyRewardedView};private listeners=new Set<()=>void>();private alive=true;
 constructor(private game:GameRuntime,private ads:RewardedAds){}
 getSnapshot=()=>this.state;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 private update(patch:Partial<RewardedView>){if(!this.alive)return;this.state={...this.state,...patch};for(const listener of this.listeners)listener();}
 dispose=()=>{this.alive=false;this.listeners.clear();};
 settled=(id:string)=>{if(this.state.animatedBoostId===id)this.update({settledBoostId:id});};
 async selectBoost(boostId:string){
  if(!this.alive||this.state.busy||this.ads.isShowing())return false;
  this.update({busy:true,placement:'stageBoost',error:''});
  try{
   const wasReserved=this.game.dispatcher.getSnapshot().data.stageBoosts?.[boostId]?.status==='reserved';
   const result=await this.game.dispatcher.dispatch({type:'ReserveStageBoost',commandId:`boostSelect:${boostId}`,boostId});
   if(!result.ok){this.update({error:result.reason==='LOCKED'?'This boost offer has ended.':saveError});return false;}
   this.update({animatedBoostId:boostId,settledBoostId:wasReserved?boostId:null});return true;
  }catch{this.update({error:saveError});return false;}finally{this.update({busy:false});}
 }
 async claim(placement:'freeCoins'|'stageBoost',boostId?:string){
  if(!this.alive||this.state.busy||this.ads.isShowing())return;
  if(placement==='stageBoost'&&(!boostId||this.state.animatedBoostId===boostId&&this.state.settledBoostId!==boostId))return;
  this.update({busy:true,placement,error:'',lastClaim:null});
  const d=this.game.dispatcher,cache=rewardedAttempts(this.game);
  try{
   let operation=Object.values(d.getSnapshot().data.rewardedOperations??{}).find(op=>op.placement===placement&&(placement==='freeCoins'||op.outcomeId===boostId)&&(op.status==='confirmed'||op.status==='reserved'&&op.sessionId===this.game.sessionId&&(cache.has(op.id)||op.expiresAt>Date.now())));
   if(!operation){
    const began=await d.dispatch(placement==='freeCoins'?{type:'BeginFreeCoinsAd',commandId:this.game.nextId('freeCoinsBegin')}:{type:'BeginStageBoostAd',commandId:this.game.nextId('boostAdBegin'),boostId:boostId!});
    if(!began.ok){this.update({error:saveError});return;}
    operation=Object.values(d.getSnapshot().data.rewardedOperations??{}).find(op=>op.placement===placement&&(placement==='freeCoins'||op.outcomeId===boostId)&&(op.status==='confirmed'||op.status==='reserved'&&op.sessionId===this.game.sessionId));
   }
   if(!operation){this.update({error:'Please reopen this reward and try again.'});return;}
   if(operation.status!=='confirmed'){
    let result=cache.get(operation.id);
    if(!result){
     if(this.ads.isShowing()){this.update({error:'A video is already playing.'});return;}
     const binding={id:operation.id,placement:operation.placement,outcomeId:operation.outcomeId,sessionId:operation.sessionId};
     let status:RewardedResult['status'];try{status=await this.ads.show(binding);}catch{status='failed';}
     result={...binding,status};cache.set(operation.id,result);
    }
    const recorded=await d.dispatch(placement==='freeCoins'?{type:'RecordFreeCoinsAd',commandId:`adResult:${operation.id}`,result}:{type:'RecordStageBoostAd',commandId:`adResult:${operation.id}`,result});
    if(!recorded.ok){if(recorded.reason!=='SAVE_FAILED')cache.delete(operation.id);this.update({error:saveError});return;}
    cache.delete(operation.id);
    if(result.status!=='completed'){this.update({error:result.status==='cancelled'?'Video not finished. No reward was claimed.':'No video available. Please try again later.'});return;}
   }
   const claim=placement==='freeCoins'?{type:'ClaimFreeCoins' as const,commandId:`freeCoinsClaim:${operation.outcomeId}`,operationId:operation.id}:{type:'ClaimStageBoost' as const,commandId:`stageBoostClaim:${boostId}`,boostId:boostId!,operationId:operation.id};
   const granted=await d.dispatch(claim);if(!granted.ok){this.update({error:saveError});return;}
   this.update({lastClaim:{placement,id:operation.outcomeId}});
  }catch{this.update({error:saveError});}
  finally{this.update({busy:false});}
 }
}
