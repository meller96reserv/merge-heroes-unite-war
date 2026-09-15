import type {GameState,Snapshot} from '../model/GameState';
import {Amount} from '../model/Amount';
import type {Intent} from '../commands/Dispatcher';

/** Existing early progression plus user-authorized final-row capacity grant.
 * XP and the third fighter rule are project rules, not reference measurements. */
export const earlyAccountProgression={version:'early-platforms-v1',mergeXp:'10',level2Xp:'100'} as const;
export function deploymentCapacity(state:GameState|Snapshot):1|2|3 {
 if(state.data.board.length===15&&state.data.board.every(slot=>slot.unlocked))return 3;
 return state.data.player.accountLevel>=2?2:1;
}

/** Apply only newly committed merge intents, in the owning command's draft.
 * Replays have no merge intents; rejected/failed commits publish no XP/unlock. */
export function advanceAccountProgression(state:GameState,events:readonly Intent[]):Intent[] {
 const merged=events.filter(e=>e.type==='merge.completed').length;
 if(!merged)return [];
 const player=state.data.player,result:Intent[]=[];
 player.xp=Amount.from(player.xp).add(Amount.from(earlyAccountProgression.mergeXp).multiply(BigInt(merged))).toString();
 if(player.accountLevel===1&&Amount.from(player.xp).compare(Amount.from(earlyAccountProgression.level2Xp))>=0){
  player.accountLevel=2;
  result.push({type:'player.levelChanged',payload:{level:2}},{type:'deployment.capacityUnlocked',payload:{capacity:2}});
 }
 state.data.progression.deploymentCapacity=deploymentCapacity(state);
 return result;
}

/** Upgrade pre-platform saves before publishing the runtime. Extra deployed
 * heroes become reserves in slot order; ownership, items and money are intact.
 * The loader commits this repair through the existing A/B durability barrier. */
export function reconcileDeploymentCapacity(state:GameState):boolean {
 const capacity=deploymentCapacity(state);
 let changed=state.data.progression.deploymentCapacity!==capacity;
 state.data.progression.deploymentCapacity=capacity;
 const deployed=state.data.heroes.filter(h=>h.deployed).sort((a,b)=>a.slotId-b.slotId);
 for(const hero of deployed.slice(capacity)){hero.deployed=false;changed=true;}
 return changed;
}
