import {Group} from '@shopify/react-native-skia';
import {Sprite,heroArt} from '../rendering/Art';
import {useHeroMotion} from '../presentation/useHeroMotion';
/** A committed instance appears around its calibrated feet; no reward callback. */
export function BoardHero({tier,x,y,exact,animated,reducedMotion=false}:{tier:number;x:number;y:number;exact:boolean;animated:boolean;reducedMotion?:boolean}){
 const id=heroArt[tier-1]!,rect={x:x+(exact?8:12),y,width:exact?53:45,height:exact?55:47};
 const motion=useHeroMotion(`board-${tier}`,id,rect,reducedMotion,false,animated);
 return <Group opacity={motion.opacity} origin={motion.pivot} transform={motion.transform}><Sprite id={id} {...rect}/></Group>;
}
