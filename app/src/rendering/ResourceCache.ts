import {useEffect,useMemo,useState} from 'react';
import {Platform} from 'react-native';
import {Asset} from 'expo-asset';
import {Skia,type SkTypeface} from '@shopify/react-native-skia';
import {ResourceLeaseCache} from './ResourceLeaseCache';
import {artSource,assets} from './ArtSources';
import {variants} from '../assets/variants';
export const fontAssets={regular:require('../../assets/fonts/PassionOne-Regular.ttf'),bold:require('../../assets/fonts/PassionOne-Bold.ttf'),small:require('../../assets/fonts/Nunito.ttf')};
let reads=0;const waiting:Array<()=>void>=[];
async function decoded<T>(source:number,make:(data:ReturnType<typeof Skia.Data.fromBytes>)=>T|null){
 if(reads>=4)await new Promise<void>(resolve=>waiting.push(resolve));else reads++;
 try{const a=Asset.fromModule(source);await a.downloadAsync();const data=await Skia.Data.fromURI(a.localUri??a.uri);
  try{const value=make(data);if(!value)throw Error('Bundled visual resource could not be decoded');return value;}finally{data.dispose();}
 }finally{const next=waiting.shift();if(next)next();else reads--;}
}
// Native recordings retain their own references. Drop our handle so GC can
// release it safely after the last recording. CanvasKit requires explicit delete
// once consumers unmount and the grace period/recording update has passed.
const images=new ResourceLeaseCache((source:number)=>decoded(source,data=>Skia.Image.MakeImageFromEncoded(data)),1500,image=>{if(Platform.OS==='web')image.dispose();});
const faces=new ResourceLeaseCache<number,SkTypeface>(source=>decoded(source,data=>Skia.Typeface.MakeFreeTypeFaceFromData(data)),Infinity);
function useResource<T>(source:number,cache:ResourceLeaseCache<number,T>){
 const [,changed]=useState(0);
 useEffect(()=>cache.retain(source,()=>changed(n=>n+1)),[source,cache]);
 return cache.get(source);
}
export const useCachedImage=(source:number)=>useResource(source,images);
export function useCachedFont(source:number,size:number){const face=useResource(source,faces);return useMemo(()=>face?Skia.Font(face,size):null,[face,size]);}
/** Boot pins its own artwork/fonts at one density; other routes load on demand. */
export async function prepareVisualResources(progress:(fraction:number)=>void):Promise<()=>void>{
 const sources=[artSource('background_floating_islands__941x1672',430,932),artSource('branding_logo__1448x1086_variant2',318,238),artSource('branding_welcome_text__2172x724',441,147),artSource('branding_hero_collage__1536x1024',392,262),artSource('ui_button_gold__2378x1300',328,78)];
 const releases=sources.map(source=>images.retain(source));const release=()=>releases.forEach(off=>off());
 const fonts=Object.values(fontAssets);let done=0;
 try{await Promise.all([...sources.map(source=>images.ready(source)),...fonts.map(source=>faces.ready(source))].map(p=>p.then(()=>progress(++done/(sources.length+fonts.length)))));return release;}catch(error){release();throw error;}
}
// Read-only local diagnostic; excluded by Metro from production bundles.
if(__DEV__){
 const names=new Map<number,string>();for(const [id,source] of Object.entries(assets))names.set(source,id);for(const [id,values] of Object.entries(variants))for(const [edge,source] of Object.entries(values))if(source!==undefined)names.set(source,`${id}@${edge}`);
 (globalThis as typeof globalThis&{__textureStats?:()=>unknown}).__textureStats=()=>({loads:images.loads,entries:images.inspect().map(({key,users,value,pending,error})=>({id:names.get(key),users,pending,error,width:value?.width(),height:value?.height(),rgbaBytes:value?value.width()*value.height()*4:0}))});
}
