import {useEffect,useMemo,useSyncExternalStore} from 'react';
import {Group} from '@shopify/react-native-skia';
import {EffectPrimitives,type EffectMode} from '../presentation/EffectPrimitives';
import {EffectBurst} from '../presentation/EffectBurst';
import type {BattleVisualSnapshot} from './BattleRuntime';
import type {DamageResult} from '../../../game-core/src/systems/DamageResolver';
import type {Death} from '../../../game-core/src/systems/DeathSystem';
import type {BattleLayout} from '../components/BattleBoard';
import {heroView,worldAnchor} from './HeroView';
export function CombatEffects({snapshot,l,mode}:{snapshot:BattleVisualSnapshot;l:BattleLayout;mode:EffectMode}){
 const pool=useMemo(()=>new EffectPrimitives(),[snapshot.combat.encounter.id]);
 const records=useSyncExternalStore(pool.subscribe,pool.getSnapshot,pool.getSnapshot);
 useEffect(()=>{pool.clear();return()=>pool.clear();},[pool,mode,snapshot.paused,l.virtualHeight]);
 useEffect(()=>{
  if(snapshot.paused)return;
  const heroes=snapshot.combat.encounter.entities.filter(e=>e.side==='hero'),enemies=snapshot.combat.encounter.entities.filter(e=>e.side==='enemy');
  for(const event of snapshot.events){
   const damage=event.type==='damage.applied'?event.payload as DamageResult:null,death=event.type==='enemy.died'||event.type==='hero.died'?event.payload as Death:null;
   if(!death&&(!damage||damage.applied<=0))continue;
   const id=damage?.targetId??death!.entityId,enemyIndex=enemies.findIndex(e=>e.id===id),heroIndex=heroes.findIndex(e=>e.id===id);
   const rect=enemyIndex>=0?worldAnchor(l,262+(enemyIndex%3)*10,327-Math.floor(enemyIndex/3)*12,146,132):heroIndex>=0?heroView(heroes[heroIndex]!,heroIndex,l)?.rect:null;
   if(!rect)continue;
   pool.emit({id:`${event.type}:${damage?.attackId??death!.entityId}`,kind:death?'death':damage!.crit?'crit':'hit',x:rect.x+rect.width*0.5,y:rect.y+rect.height*0.48,mode});
  }
 },[pool,snapshot.revision]);
 return <Group>{records.map(lease=><EffectBurst key={`${lease.slot}:${lease.generation}`} lease={lease} release={pool.release}/>)}</Group>;
}
