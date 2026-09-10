import type {DiscoverTier} from '../commands/MergeHeroes';import {grantReward,type Grant,type RewardCatalog} from './RewardService';
export function discoveryService(rewards:Readonly<Record<number,readonly Grant[]>>,catalog:RewardCatalog):DiscoverTier {
 return (state,tier,transactionId)=>{
  if(state.data.progression.discoveredTiers.includes(tier))return [];
  const grants=rewards[tier];if(!grants)throw Error('Missing configured discovery reward');
  const outcome=grantReward(state,`${transactionId}.discovery.${tier}`,`discovery:${tier}`,grants,catalog);
  state.data.progression.discoveredTiers.push(tier);state.data.progression.discoveredTiers.sort((a,b)=>a-b);
  return [{type:'tier.discovered',payload:{tier,grants:outcome.duplicate?[]:grants}}];
 };
}
