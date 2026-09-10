import {useEffect} from 'react';import {View,Text,Pressable} from 'react-native';import {Canvas,Circle,Rect,Group} from '@shopify/react-native-skia';import {useSharedValue,useDerivedValue,withTiming,cancelAnimation,Easing} from 'react-native-reanimated';
export default function FrameProbe(){
 const x=useSharedValue(40),value=useDerivedValue(()=>({x:x.value})),transform=useDerivedValue(()=>[{translateX:value.value.x}]);useEffect(()=>()=>cancelAnimation(x),[]);
 return <View><Canvas style={{width:430,height:300}}><Rect x={0} y={0} width={430} height={300} color="#102030"/><Group transform={transform}><Circle cx={0} cy={120} r={20} color="#ff0000"/></Group></Canvas><Pressable testID="start-probe" onPress={()=>{x.value=40;x.value=withTiming(340,{duration:1000,easing:Easing.linear});}}><Text>Start frame probe</Text></Pressable></View>;
}
