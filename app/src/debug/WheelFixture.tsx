import {useState} from 'react';import {useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WheelPanel,type WheelPhase} from '../components/WheelPanel';
export default function WheelFixture(){
 const {width,height}=useWindowDimensions(),insets=useSafeAreaInsets(),params=new URLSearchParams(globalThis.location?.search),[phase,setPhase]=useState<WheelPhase>(params.get('state')==='cooldown'?'cooldown':params.get('state')==='result'?'result':'available'),[spin,setSpin]=useState<{id:string;landingAngleDegrees:number}|null>(null);
 return <WheelPanel width={width} height={height} insets={insets} phase={phase} remainingMs={1279000} free={params.get('state')!=='spin'} spin={spin} rewardText="1 000 GOLD" reducedMotion={params.get('mode')==='reduced'} onBack={()=>{globalThis.location.href='/';}} onSettled={()=>setPhase('result')} onAction={()=>{if(phase==='available'){setSpin({id:'visual-only',landingAngleDegrees:240});setPhase('spinning');}else setPhase('cooldown');}}/>;
}
