import {useMemo,useState,useSyncExternalStore,useEffect} from 'react';
import {View,Text,Pressable} from 'react-native';import {Canvas} from '@shopify/react-native-skia';
import {EffectPrimitives,type EffectMode,type EffectKind} from '../presentation/EffectPrimitives';
import {EffectBurst} from '../presentation/EffectBurst';
export default function EffectFixture(){
 const pool=useMemo(()=>new EffectPrimitives(),[]),records=useSyncExternalStore(pool.subscribe,pool.getSnapshot,pool.getSnapshot),[sequence,setSequence]=useState(0);
 useEffect(()=>()=>pool.clear(),[pool]);
 const mode=(new URLSearchParams(globalThis.location?.search).get('mode')??'full') as EffectMode;
 const play=()=>{pool.clear();(['hit','crit','merge','death','reward'] as EffectKind[]).forEach((kind,i)=>pool.emit({id:`${sequence}:${kind}`,kind,x:60+i%3*150,y:100+Math.floor(i/3)*180,mode}));setSequence(s=>s+1);};
 return <View style={{width:430,height:932,backgroundColor:'#24394a'}}><Canvas style={{width:430,height:450}}>{records.map(lease=><EffectBurst key={`${lease.slot}:${lease.generation}`} lease={lease} release={pool.release}/>)}</Canvas>
 <Text style={{color:'white'}}>Hit / Crit / Merge / Death / Reward · {mode}</Text><Pressable testID="play-effects" onPress={play}><Text style={{color:'white',padding:20}}>Play</Text></Pressable><Pressable testID="cancel-effects" onPress={()=>pool.clear()}><Text style={{color:'white',padding:20}}>Cancel</Text></Pressable><View testID="effects-state" accessibilityLabel={String(records.length)}/></View>;
}
