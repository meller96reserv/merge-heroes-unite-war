import {useState} from 'react';import {View,Text,Pressable} from 'react-native';import {Canvas} from '@shopify/react-native-skia';
import {HeroSprite} from '../battle/HeroSprite';import {heroes} from '../../../game-core/src/content/PlayableConfig';
import type {AssetId} from '../assets/registry';
export default function HeroMotionFixture(){
 const [generation,setGeneration]=useState(0),[reduced,setReduced]=useState(false);
 return <View style={{width:430,height:932,backgroundColor:'#24394a'}}><Canvas style={{width:430,height:800}}>{Array.from({length:10},(_,i)=>{const h=heroes.get(`hero_tier_${i+1}`);return <HeroSprite key={`${generation}:${i}`} reducedMotion={reduced} view={{id:`hero${i}`,encounterId:`fixture:${generation}`,visualId:h.visualId as AssetId,alive:true,hp:100,hitDelayMs:150,attackType:h.attackType,attackSequence:0,rect:{x:15+(i%3)*140,y:20+Math.floor(i/3)*190,width:110,height:150}}}/>;})}</Canvas>
 <Pressable testID="restart-motion" onPress={()=>setGeneration(g=>g+1)}><Text style={{color:'white',padding:10}}>Replay appearance</Text></Pressable><Pressable testID="reduce-motion" onPress={()=>setReduced(v=>!v)}><Text style={{color:'white',padding:10}}>Reduced motion: {String(reduced)}</Text></Pressable><View testID="hero-motion-ready"/></View>;
}
