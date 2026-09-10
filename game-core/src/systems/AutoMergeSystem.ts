import type {GameState} from '../model/GameState';import type {HeroCatalog} from '../model/Hero';import type {Reduction,Intent} from '../commands/Dispatcher';import {mergeHeroes,type DiscoverTier} from '../commands/MergeHeroes';import {selectAutoPair,type AutoRules} from './AutoMergeSelector';
/** Settles an entire occupancy-bounded cascade in the caller's isolated durable draft. */
export function runAutoMerge(state:GameState,rootId:string,utcMs:number,rules:AutoRules,catalog:HeroCatalog,discover:DiscoverTier):Reduction {
 const source=`cascade:${rootId}`;if(Object.hasOwn(state.data.sourceWatermarks,source))return {ok:true,events:[]};
 const initial=state.data.heroes.length,events:Intent[]=[];let operations=0;
 while(true){
  const pair=selectAutoPair(state,rules,catalog,utcMs);if(!pair)break;
  if(operations>=initial-1)throw Error('Cascade exceeded occupancy bound');
  const before=state.data.heroes.length,result=mergeHeroes(state,{type:'MergeHeroes',commandId:`${rootId}.merge.${operations}`,...pair},rules,catalog,discover,true);
  if(!result.ok||state.data.heroes.length!==before-1)throw Error('Cascade failed to consume pair');
  events.push(...result.events);operations++;
 }
 if(operations){state.data.sourceWatermarks[source]=state.revision+1;events.push({type:'cascade.completed',payload:{rootId,operations}});}
 return {ok:true,events};
}
