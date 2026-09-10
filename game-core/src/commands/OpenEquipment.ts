import type {GameState} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import {Amount} from '../model/Amount';
import {equipmentDefinitions,equipmentRewardCatalog} from '../content/EquipmentConfig';
import {SeededRng} from '../ports/SeededRng';
import {grantReward,type Grant} from '../systems/RewardService';
import {priorMeta} from './MetaTransaction';
export type OpenEquipment=Command&{type:'OpenEquipment';heroId:string;count:1|10};
export function openEquipment(state:GameState,c:OpenEquipment):Reduction{
 const source=`equipmentOpen:${c.heroId}:${c.count}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const hero=state.data.heroes.find(h=>h.id===c.heroId);if(!hero||![1,10].includes(c.count))return {ok:false,reason:'INVALID_COMMAND'};
 const pool=equipmentDefinitions.filter(d=>d.heroDefinitionId===hero.definitionId);if(!pool.length)return {ok:false,reason:'INVALID_STATE'};
 const cost=Amount.from(String(c.count*10)),balance=Amount.from(state.data.currencies.gem??'0');if(balance.compare(cost)<0)return {ok:false,reason:'INSUFFICIENT_GOLD'};
 const rng=new SeededRng(state.data.rng.rewardState),grants:Grant[]=Array.from({length:c.count},()=>({kind:'item',id:pool[rng.below(pool.length)]!.id,amount:'1'}));
 state.data.currencies.gem=balance.subtract(cost).toString();
 const first=state.data.nextInstanceSequence;
 grantReward(state,c.commandId,source,grants,{currencies:['gold','gem','orb'],items:equipmentRewardCatalog,freeSpinId:'fortune'});
 state.data.rng.rewardState=[...rng.snapshot()];
 return {ok:true,events:[{type:'equipment.opened',payload:{heroId:c.heroId,itemIds:Array.from({length:c.count},(_,i)=>`item_${first+i}`)}},{type:'equipment.changed',payload:{heroId:c.heroId}}]};
}
