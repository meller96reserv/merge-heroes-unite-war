import { measured } from './DesignTokens';
export type Rect = Readonly<{x:number;y:number;width:number;height:number}>;
export type Insets = Readonly<{top:number;right:number;bottom:number;left:number}>;
export function layout(width:number,height:number,insets:Insets={top:0,right:0,bottom:0,left:0},slots=15) {
  const safeWidth=width-insets.left-insets.right,safeHeight=height-insets.top-insets.bottom;
  const playWidth=Math.min(safeWidth,measured.width),scale=playWidth/measured.width;
  const virtualHeight=safeHeight/scale;
  const offsetX=insets.left+(safeWidth-playWidth)/2,offsetY=insets.top;
  const exact=slots===10,boardTop=virtualHeight-(exact?383:391),rowHeight=exact?102:69;
  const board=Array.from({length:slots},(_,i)=>({x:15+83*(i%5),y:boardTop+Math.floor(i/5)*rowHeight,width:68,height:exact?93:69}));
  const toScreen=(r:Rect):Rect=>({x:offsetX+r.x*scale,y:offsetY+r.y*scale,width:r.width*scale,height:r.height*scale});
  const toDesign=(x:number,y:number)=>({x:(x-offsetX)/scale,y:(y-offsetY)/scale});
  return {scale,offsetX,offsetY,playWidth,virtualHeight,boardTop,rowHeight,board,navY:virtualHeight-85,buyY:virtualHeight-171,boostY:boardTop-(exact?62:62),toScreen,toDesign};
}
