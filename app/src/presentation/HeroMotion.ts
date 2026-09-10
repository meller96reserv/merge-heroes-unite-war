import anchors from './HeroAnchors.json';
export type HeroArtId = keyof typeof anchors;
export function heroMotionProfile(id: string) {
  const anchor = anchors[id as HeroArtId];
  if (!anchor) throw Error('Missing calibrated hero motion');
  return Object.freeze({foot: anchor.foot as readonly number[], release: anchor.release as readonly number[],
    sourceSize: anchor.sourceSize as readonly number[], idleMs: 1600, breathScale: id.includes('turtle') ? 0.012 : 0.018,
    hoverPx: id.includes('ice_fairy') ? 1.5 : 0, spawnMs: 280, overshoot: 1.08,
    clipMargin: 16, status: 'PROPOSED_CALIBRATED_WHOLE_SPRITE' as const});
}
/** A fixed pivot means grounded families breathe without sliding their feet. */
export function heroFoot(id: string, rect: {x:number;y:number;width:number;height:number}) {
  const {foot}=heroMotionProfile(id),image=heroImageRect(id,rect);
  return {x:image.x+image.width*foot[0]!,y:image.y+image.height*foot[1]!};
}

/** Match Skia Image fit=contain before applying full-canvas anchor coordinates. */
export function heroImageRect(id:string,rect:{x:number;y:number;width:number;height:number}) {
 const {sourceSize}=heroMotionProfile(id),scale=Math.min(rect.width/sourceSize[0]!,rect.height/sourceSize[1]!),width=sourceSize[0]!*scale,height=sourceSize[1]!*scale;
 return {x:rect.x+(rect.width-width)/2,y:rect.y+(rect.height-height)/2,width,height};
}
/** Use the reviewed whole-image release socket, including contain-fit letterboxing. */
export function heroRelease(id:string,rect:{x:number;y:number;width:number;height:number}){
 const {release}=heroMotionProfile(id),image=heroImageRect(id,rect);
 return {x:image.x+image.width*release[0]!,y:image.y+image.height*release[1]!};
}
