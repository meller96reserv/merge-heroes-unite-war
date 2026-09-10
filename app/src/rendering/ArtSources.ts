import {PixelRatio} from 'react-native';
import {art,type AssetId} from '../assets/registry';
import {componentArt} from '../assets/components';
import {variants} from '../assets/variants';
export type VisualId=AssetId|keyof typeof componentArt;
export const assets={...art,...componentArt};
const requests=__DEV__?new Map<string,{id:string;logicalEdge:number;pixelEdge:number}>():undefined;
if(__DEV__)(globalThis as typeof globalThis&{__textureRequests?:()=>unknown}).__textureRequests=()=>[...requests!.values()];
export function artSource(id:VisualId,width:number,height:number){
 const pixels=Math.max(width,height)*PixelRatio.get(),density=variants[id];
 if(__DEV__){const prior=requests!.get(id);if(!prior||pixels>prior.pixelEdge)requests!.set(id,{id,logicalEdge:Math.max(width,height),pixelEdge:pixels});}
 const edge=[128,256,512].find(edge=>pixels<=edge&&density?.[edge]);
 return (edge?density?.[edge]:undefined)??assets[id];
}
