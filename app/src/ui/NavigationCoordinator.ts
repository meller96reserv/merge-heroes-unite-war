export type RouteName='daily'|'start'|'battle'|'heroes'|'upgrades'|'shop'|'dungeon'|'relic'|'wheel'|'settings'|'boost';
export type Route={name:RouteName;entityId?:string};
export type Popup={id:string;kind:string;text?:string;priority:number;order:number;closing:boolean};
type NavigationState={route:Route;history:readonly Route[];popups:readonly Popup[];top:Popup|null;loading:number|null;focused:boolean};
/** Transient navigation only. Closing/pending reward presentation never consumes
 * its domain entitlement. The top popup retains input until its exit finishes. */
export class NavigationCoordinator {
 private state:NavigationState={route:{name:'battle'},history:[],popups:[],top:null,loading:null,focused:true};
 private listeners=new Set<()=>void>();private generation=0;private order=0;
 getSnapshot=()=>this.state;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 private update(patch:Partial<NavigationState>){this.state={...this.state,...patch};for(const listener of this.listeners)listener();}
 beginRoute(){const generation=++this.generation;this.update({loading:generation});return generation;}
 finishRoute(generation:number,route:Route,replace=false){
  if(generation!==this.generation||this.state.loading!==generation||!this.state.focused||this.state.top)return false;
  const same=this.state.route.name===route.name&&this.state.route.entityId===route.entityId;
  this.update({route:{...route},history:same||replace?this.state.history:[...this.state.history,this.state.route].slice(-16),loading:null});return true;
 }
 navigate(name:RouteName,entityId?:string){if(this.state.top||!this.state.focused)return false;return this.finishRoute(this.beginRoute(),{name,entityId});}
 cancelRoute(generation:number){if(this.state.loading===generation){this.invalidate();this.update({loading:null});}}
 private invalidate(){this.generation++;}
 back(){
  if(this.state.top){this.closePopup(this.state.top.id);return true;}
  this.invalidate();const route=this.state.history.at(-1);
  if(this.state.loading!==null){this.update({loading:null});return true;}
  if(!route)return false;
  this.update({route,history:this.state.history.slice(0,-1),loading:null});return true;
 }
 enqueue(popup:Omit<Popup,'order'|'closing'>){
  if(this.state.popups.some(p=>p.id===popup.id))return false;
  this.invalidate();const popups=[...this.state.popups,{...popup,order:++this.order,closing:false}].sort((a,b)=>b.priority-a.priority||a.order-b.order);
  // Do not preempt an exit animation: it still owns the closing pointer.
  const top=this.state.top?.closing?this.state.top:popups[0]!;
  this.update({popups,top,loading:null});return true;
 }
 closePopup(id:string){
  if(this.state.top?.id!==id||this.state.top.closing)return false;
  const top={...this.state.top,closing:true};this.update({top,popups:this.state.popups.map(p=>p.id===id?top:p)});return true;
 }
 finishPopupExit(id:string){
  if(this.state.top?.id!==id||!this.state.top.closing)return false;
  const popups=this.state.popups.filter(p=>p.id!==id);this.update({popups,top:popups[0]??null});return true;
 }
 setFocused(focused:boolean){if(!focused)this.invalidate();this.update({focused,loading:focused?this.state.loading:null});}
}
