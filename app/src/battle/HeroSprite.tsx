import {Group,Oval} from '@shopify/react-native-skia';
import {useHeroCombatMotion} from '../presentation/useHeroCombatMotion';
import {Sprite} from '../rendering/Art';
import {useHeroMotion} from '../presentation/useHeroMotion';
import type {heroView} from './HeroView';
export function HeroSprite({view,reducedMotion=false}:{view:NonNullable<ReturnType<typeof heroView>>;reducedMotion?:boolean}){
 const {rect:r}=view,motion=useHeroMotion(view.id,view.visualId,r,reducedMotion,true,view.alive),combat=useHeroCombatMotion(view,reducedMotion);
 return <Group opacity={combat.opacity}><Group opacity={motion.opacity}><Oval x={motion.pivot.x-r.width*0.35} y={motion.pivot.y-2} width={r.width*0.7} height={8} color="#071c25" opacity={0.2}/><Group origin={motion.pivot} transform={combat.transform}><Group origin={motion.pivot} transform={motion.transform}><Sprite id={view.visualId} {...r}/><Group opacity={combat.flash}><Sprite id={view.visualId} {...r} white/></Group></Group></Group></Group></Group>;
}
