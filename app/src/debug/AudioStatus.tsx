import {useEffect,useState} from 'react';import {View} from 'react-native';import {getAudio} from '../audio/audioService';
export default function AudioStatus(){
 const [stats,setStats]=useState(()=>getAudio().stats);
 useEffect(()=>{const timer=setInterval(()=>setStats(getAudio().stats),500);return()=>clearInterval(timer);},[]);
 return <View testID="audio-status" accessible accessibilityLabel={JSON.stringify(stats)} style={{position:'absolute',width:1,height:1,opacity:0}}/>;
}
