import type {Snapshot} from '../model/GameState';import type {HeroCatalog} from '../model/Hero';
export type MergeRules = Readonly<{manualEnabled:boolean;compatibility:'sameFamilyAndTier'|'explicitPairs';pairs:readonly {sourceDefinitionId:string;targetDefinitionId:string;resultDefinitionId:string}[];maxTier:number;deployedPolicy:'reject'|'preserveDestination'|'inheritEither'}>;
export type MergeCheck={ok:true;resultDefinitionId:string;destinationSlot:number;deployed:boolean}|{ok:false;reason:'INVALID_MERGE'|'MAX_TIER'|'LOCKED'};
export function checkMerge(state:Snapshot,sourceId:string,targetId:string,rules:MergeRules,catalog:HeroCatalog):MergeCheck {
 const a=state.data.heroes.find(h=>h.id===sourceId),b=state.data.heroes.find(h=>h.id===targetId);
 if(!a||!b||a.id===b.id)return {ok:false,reason:'INVALID_MERGE'};
 if(a.tier>=rules.maxTier||b.tier>=rules.maxTier)return {ok:false,reason:'MAX_TIER'};
 if(rules.deployedPolicy==='reject'&&(a.deployed||b.deployed))return {ok:false,reason:'LOCKED'};
 if(!state.data.board.some(s=>s.slotId===a.slotId&&s.unlocked&&s.unitId===a.id)||!state.data.board.some(s=>s.slotId===b.slotId&&s.unlocked&&s.unitId===b.id))return {ok:false,reason:'INVALID_MERGE'};
 const da=catalog.get(a.definitionId),db=catalog.get(b.definitionId);
 if(rules.compatibility==='sameFamilyAndTier'&&(da.family!==db.family||da.tier!==db.tier))return {ok:false,reason:'INVALID_MERGE'};
 const pair=rules.pairs.find(p=>p.sourceDefinitionId===da.id&&p.targetDefinitionId===db.id);
 // Even same-family merges require an explicit, validated result mapping.
 if(!pair)return {ok:false,reason:'INVALID_MERGE'};
 const result=catalog.get(pair.resultDefinitionId);
 if(result.tier>rules.maxTier||result.tier<=Math.max(da.tier,db.tier))return {ok:false,reason:'INVALID_MERGE'};
 return {ok:true,resultDefinitionId:result.id,destinationSlot:b.slotId,deployed:rules.deployedPolicy==='inheritEither'?a.deployed||b.deployed:rules.deployedPolicy==='preserveDestination'?b.deployed:false};
}
