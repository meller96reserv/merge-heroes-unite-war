import type {GameState} from '../model/GameState';
import type {Command,Reduction} from '../commands/Dispatcher';
import {Amount} from '../model/Amount';
import {SeededRng} from '../ports/SeededRng';
import {relicDefinitions} from '../content/RelicConfig';
import {priorMeta,metaReceipt} from '../commands/MetaTransaction';
export {openEquipment} from '../commands/OpenEquipment';
export type OpenRelics=Command&{type:'OpenRelics';count:1|10};
export function openRelics(state:GameState,c:OpenRelics):Reduction{
 const source=`relicOpen:${c.count}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 if(c.count!==1&&c.count!==10)return {ok:false,reason:'INVALID_COMMAND'};
 const currency=c.count===1?'gold':'gem',balance=Amount.from(state.data.currencies[currency]??'0'),cost=Amount.from('100');if(balance.compare(cost)<0)return {ok:false,reason:'INSUFFICIENT_GOLD'};
 const rng=new SeededRng(state.data.rng.rewardState),ids=Array.from({length:c.count},()=>relicDefinitions[rng.below(relicDefinitions.length)]!.id),counts={...state.data.relics};
 for(const id of ids){const n=(counts[id]??0)+1;if(!Number.isSafeInteger(n))return {ok:false,reason:'INVALID_STATE'};counts[id]=n;}
 state.data.currencies[currency]=balance.subtract(cost).toString();state.data.relics=counts;state.data.rng.rewardState=[...rng.snapshot()];state.data.lastRelicOpen={id:c.commandId,relicIds:ids};
 metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'relic.opened',payload:{relicIds:ids}},{type:'hero.statsChanged',payload:{all:true}}]};
}
