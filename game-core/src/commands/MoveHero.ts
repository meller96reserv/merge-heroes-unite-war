import type {GameState} from '../model/GameState';import type {Command,Reduction} from './Dispatcher';
export type MoveHero=Command&{type:'MoveHero';heroId:string;slotId:number};
export function moveHero(state:GameState,c:MoveHero):Reduction {
 const hero=state.data.heroes.find(h=>h.id===c.heroId),target=state.data.board.find(s=>s.slotId===c.slotId);
 if(!hero||!target)return {ok:false,reason:'INVALID_COMMAND'};
 if(!target.unlocked)return {ok:false,reason:'LOCKED'};
 if(target.unitId===hero.id)return {ok:true,events:[]};
 if(target.unitId!==null)return {ok:false,reason:'INVALID_MERGE'};
 state.data.board.find(s=>s.slotId===hero.slotId)!.unitId=null;target.unitId=hero.id;hero.slotId=target.slotId;
 return {ok:true,events:[{type:'board.changed',payload:{heroId:hero.id,slotId:target.slotId}}]};
}
