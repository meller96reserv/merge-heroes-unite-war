import type {CombatEntity} from '../../../game-core/src/model/CombatEntity';import type {DeepReadonly} from '../../../game-core/src/model/GameState';import {heroes} from '../../../game-core/src/content/PlayableConfig';import type {BattleLayout} from '../components/BattleBoard';import type {AssetId} from '../assets/registry';
export function worldAnchor(l:BattleLayout,x:number,y:number,width:number,height:number){const scale=Math.min(1,Math.max(0.35,(l.boostY-15-238)/139));return {x:x+width*(1-scale)/2,y:l.boostY-21-(466-y)*scale,width:width*scale,height:height*scale};}
export function heroView(entity:DeepReadonly<CombatEntity>,index:number,l:BattleLayout){
 const positions=[[8,384,83,86],[77,358,104,108],[174,368,83,86]],p=positions[index];if(entity.side!=='hero'||!p)return null;
 const definition=heroes.get(entity.definitionId);
 return {id:entity.id,encounterId:entity.encounterId,visualId:definition.visualId as AssetId,attackType:definition.attackType,attackSequence:entity.attackSequence,alive:entity.hp>0,hp:entity.hp,hitDelayMs:entity.hitDelayTicks*50,rect:worldAnchor(l,p[0]!,p[1]!,p[2]!,p[3]!)};
}
