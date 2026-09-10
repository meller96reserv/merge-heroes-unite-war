import {memo} from 'react';
import {useCachedImage,useCachedFont,fontAssets} from './ResourceCache';
import {Image,Text,Group,ColorMatrix,FilterMode,MipmapMode} from '@shopify/react-native-skia';
import {type AssetId} from '../assets/registry';
import {artSource,type VisualId} from './ArtSources';
export type {VisualId} from './ArtSources';
export const Sprite=memo(function Sprite({id,x,y,width,height,fit='contain',opacity=1,white=false}:{id:VisualId;x:number;y:number;width:number;height:number;fit?:'contain'|'cover'|'fill';opacity?:number;white?:boolean}){
 const source=artSource(id,width,height);
 const image=useCachedImage(source);return <Image image={image} x={x} y={y} width={width} height={height} fit={fit} opacity={opacity} sampling={{filter:FilterMode.Linear,mipmap:MipmapMode.Linear}}>{white&&<ColorMatrix matrix={[0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0]}/>}</Image>;
});
export const Label=memo(function Label({text,x,y,size=20,bold=false,small=false,center=false,maxWidth,outline=0,color='white'}:{text:string;x:number;y:number;size?:number;bold?:boolean;small?:boolean;center?:boolean;maxWidth?:number;outline?:number;color?:string}){
 const font=useCachedFont(small?fontAssets.small:bold?fontAssets.bold:fontAssets.regular,size);
 if(!font)return null;
 const width=font.getGlyphWidths(font.getGlyphIDs(text)).reduce((a,b)=>a+b,0),scale=maxWidth&&width>maxWidth?maxWidth/width:1;
 const start=center?x-width*scale/2:x;
 return <Group transform={[{translateX:start},{translateY:y},{scale}]}>{outline>0&&<Text text={text} x={0} y={0} font={font} color="black" style="stroke" strokeWidth={outline}/>}<Text text={text} x={0} y={0} font={font} color={color}/></Group>;
});
export const heroArt: readonly AssetId[]=[
 'hero_turtle_warrior__1815x1620','hero_fox_sorcerer__1828x1679','hero_raccoon_engineer__1617x1662','hero_owl_mage__1813x1760','hero_panda_monk__1705x1775','hero_bunny_assassin__1711x1827','hero_lion_knight__1616x1788','hero_ice_fairy__1718x1740','hero_inferno_dragon__1886x1748','hero_elf_archer__1797x1858',
];
