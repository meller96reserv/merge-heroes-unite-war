import type {BattleVisualSnapshot} from './BattleRuntime';import type {BattleLayout} from '../components/BattleBoard';import {heroView,worldAnchor} from './HeroView';
import {heroRelease} from '../presentation/HeroMotion';
export type ProjectileView={id:string;kind:'melee'|'ranged'|'magic';from:{x:number;y:number};to:{x:number;y:number};durationMs:number};
export function projectileViews(snapshot:BattleVisualSnapshot,l:BattleLayout,capacity=32):readonly ProjectileView[]{
 const {encounter,hits}=snapshot.combat,heroes=encounter.entities.filter(e=>e.side==='hero'),enemies=encounter.entities.filter(e=>e.side==='enemy');
 return hits.flatMap(hit=>{
  const index=heroes.findIndex(h=>h.id===hit.actorId),actor=heroes[index],target=enemies.find(e=>e.id===hit.targetId&&e.hp>0);if(!actor||!target||hit.encounterId!==encounter.id)return [];
  const hero=heroView(actor,index,l);if(!hero)return [];const targetIndex=enemies.indexOf(target),enemy=worldAnchor(l,262+(targetIndex%3)*10,327-Math.floor(targetIndex/3)*12,146,132);
  return [{id:hit.id,kind:hero.attackType,from:heroRelease(hero.visualId,hero.rect),to:{x:enemy.x+enemy.width*0.5,y:enemy.y+enemy.height*0.48},durationMs:Math.max(0,hit.hitTick-encounter.tick)*50}];
 }).slice(0,Math.max(0,capacity));
}
