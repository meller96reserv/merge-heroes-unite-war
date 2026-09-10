export function enemyMotionProfile(boss:boolean,reducedMotion=false) {
 return Object.freeze({spawnMs:reducedMotion?140:boss?900:280,spawnScale:reducedMotion?1:boss?0.88:0.9,
  idleMs:1800,breathScale:reducedMotion?0:0.012,recoilPx:reducedMotion?0:boss?3:6,
  flashMs:boss?50:40,hitMs:140,deathMs:reducedMotion?140:boss?900:280,
  deathSquash:reducedMotion?0:0.04,deathTilt:reducedMotion?0:boss?0.06:0.12,deathRise:reducedMotion?0:boss?6:12,
  status:'PROPOSED_WHOLE_SPRITE' as const});
}
/** Current chapter's boar variants share the reviewed source canvas and foot anchor. */
export function enemyFoot(rect:{x:number;y:number;width:number;height:number}) {
 const scale=Math.min(rect.width/1862,rect.height/1681),width=1862*scale,height=1681*scale;
 return {x:rect.x+(rect.width-width)/2+width*0.59,y:rect.y+(rect.height-height)/2+height*0.98};
}
