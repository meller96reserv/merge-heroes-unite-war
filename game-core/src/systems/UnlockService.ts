import type {GameState,Snapshot} from '../model/GameState';import type {Command,Intent,Reduction} from '../commands/Dispatcher';import {freeze} from '../events/EventBus';
export type UnlockCondition={kind:'stageAtLeast'|'accountLevelAtLeast'|'tierAtLeast';value:number}|{kind:'allOf'|'anyOf';conditions:readonly UnlockCondition[]};
export type UnlockRule=Readonly<{id:string;condition:UnlockCondition;popupKey:string;targetFeatureId:string;tutorialStepId:string|null}>;
export type AnnounceUnlocks=Command&{type:'AnnounceUnlocks';ids:readonly string[]};
export class UnlockService {
 readonly rules:readonly UnlockRule[];
 constructor(rules:readonly UnlockRule[]){
  const ids=new Set<string>();
  const validate=(condition:UnlockCondition,depth=0):void=>{
   if(depth>16||!condition)throw Error('Invalid unlock condition depth');
   if(condition.kind==='allOf'||condition.kind==='anyOf'){
    if(!condition.conditions.length||condition.conditions.length>64)throw Error('Invalid unlock condition group');
    condition.conditions.forEach(c=>validate(c,depth+1));
   }else if(!['stageAtLeast','accountLevelAtLeast','tierAtLeast'].includes(condition.kind)||!('value' in condition)||!Number.isSafeInteger(condition.value)||condition.value<0)throw Error('Invalid unlock threshold');
  };
  for(const rule of rules){if(!rule.id||ids.has(rule.id)||!rule.popupKey||!rule.targetFeatureId)throw Error('Invalid unlock identity');ids.add(rule.id);validate(rule.condition);}
  this.rules=freeze(JSON.parse(JSON.stringify(rules)) as UnlockRule[]);
 }
 matches(state:Snapshot,condition:UnlockCondition):boolean{
  switch(condition.kind){
   case 'stageAtLeast':return state.data.progression.highestClearedOrdinal>=condition.value;
   case 'accountLevelAtLeast':return state.data.player.accountLevel>=condition.value;
   case 'tierAtLeast':return state.data.progression.discoveredTiers.some(t=>t>=condition.value);
   case 'allOf':return condition.conditions.every(c=>this.matches(state,c));
   case 'anyOf':return condition.conditions.some(c=>this.matches(state,c));
  }
 }
 evaluate(state:GameState):Intent[]{
  const events:Intent[]=[];
  for(const rule of this.rules)if(!state.data.unlocks.unlockedIds.includes(rule.id)&&this.matches(state,rule.condition)){
   state.data.unlocks.unlockedIds.push(rule.id);events.push({type:'feature.unlocked',payload:{id:rule.id,targetFeatureId:rule.targetFeatureId,popupKey:rule.popupKey,tutorialStepId:rule.tutorialStepId}});
  }
  return events;
 }
 pending(state:Snapshot){return this.rules.filter(r=>state.data.unlocks.unlockedIds.includes(r.id)&&!state.data.unlocks.announcedIds.includes(r.id));}
 announce(state:GameState,c:AnnounceUnlocks):Reduction{
  if(new Set(c.ids).size!==c.ids.length||c.ids.some(id=>!this.rules.some(r=>r.id===id)||!state.data.unlocks.unlockedIds.includes(id)))return {ok:false,reason:'INVALID_COMMAND'};
  state.data.unlocks.announcedIds.push(...c.ids.filter(id=>!state.data.unlocks.announcedIds.includes(id)));
  return {ok:true,events:[]};
 }
}
