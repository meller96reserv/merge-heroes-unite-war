import {dragonDefinition} from '../../../game-core/src/modes/DragonMode';
import type {CombatEntity} from '../../../game-core/src/model/CombatEntity';import type {DeepReadonly} from '../../../game-core/src/model/GameState';import type {Rect} from '../ui/ResponsiveLayout';import type {AssetId} from '../assets/registry';
export type EnemyView={id:string;lease:number;visualId:AssetId;rect:Rect;hp:number;maxHp:number;phase:'alive'|'death';boss:boolean};
/** Legacy definition IDs retain save/reward compatibility, not legacy boar art. */
export const enemyArt:Readonly<Record<string,{visualId:AssetId;boss?:boolean}>>={
 ironhide_boar:{visualId:'enemy_ironhide_boar__1862x1681'},
 boar_scout:{visualId:'enemy_swamp_crocodile__1895x1429'},
 bomb_goblin:{visualId:'enemy_bomb_goblin__1606x1561'},
 boar_chief:{visualId:'boss_infernal_dragon__1968x1659',boss:true},
 boar_guard:{visualId:'enemy_fire_lizard__1562x1651'},
 stone_gargoyle:{visualId:'enemy_stone_gargoyle__1789x1558'},
 boar_veteran:{visualId:'enemy_toxic_slime__1654x1388'},
 shadow_wolf:{visualId:'enemy_shadow_wolf__1783x1677'},
 boar_overlord:{visualId:'boss_frost_dragon__1995x1925',boss:true},
 poison_mushroom:{visualId:'enemy_poison_mushroom__1596x1576'},
 iron_beetle:{visualId:'enemy_iron_beetle__1835x1638'},
 dark_bat_mage:{visualId:'enemy_dark_bat_mage__1888x1531'},
 shadow_dragon:{visualId:'boss_shadow_dragon__1974x1657',boss:true},
};
/** Bounded presentation leases, containing values rather than target/entity references. */
export class EnemyViewPool {
 private views=new Map<string,EnemyView>();private released=new Set<string>();private sequence=0;
 constructor(private capacity=32){}
 project(entities:readonly DeepReadonly<CombatEntity>[],rect:(index:number)=>Rect):readonly EnemyView[]{
  const ids=new Set(entities.map(e=>e.id));for(const id of this.views.keys())if(!ids.has(id))this.views.delete(id);
  entities.forEach((entity,i)=>{
   if(this.released.has(entity.id))return;
   const old=this.views.get(entity.id);if(!old&&this.views.size>=this.capacity)throw Error('Enemy presentation capacity exceeded');
   const dragon=entity.definitionId.startsWith('dragon_')?dragonDefinition(entity.definitionId.slice(7)):undefined;
   const art=enemyArt[entity.definitionId];if(!dragon&&!art)throw Error('Missing enemy visual mapping');
   const boss=!!dragon||!!art?.boss,r=rect(i);
   this.views.set(entity.id,{id:entity.id,lease:old?.lease??++this.sequence,visualId:(dragon?.visualId??art!.visualId) as AssetId,rect:boss?{...r,x:r.x-25,y:r.y-28,width:r.width+25,height:r.height+28}:r,hp:entity.hp,maxHp:entity.maxHp,phase:entity.hp<=0?'death':'alive',boss});
  });return [...this.views.values()];
 }
 release(id:string,lease:number):boolean {if(this.views.get(id)?.lease!==lease)return false;this.views.delete(id);this.released.add(id);return true;}
 get size(){return this.views.size;}
 reset(){this.views.clear();this.released.clear();}
}
