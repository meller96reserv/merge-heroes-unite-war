export type ButtonState = 'normal'|'pressed'|'disabled'|'loading'|'selected'|'locked';
export function buttonVisual(state:ButtonState) {
  return {opacity:state==='disabled'?0.55:1,scale:state==='pressed'?0.96:1,selected:state==='selected',label:state==='loading'?'…':state==='locked'?'LOCKED':'',blocked:state==='disabled'||state==='loading'};
}
