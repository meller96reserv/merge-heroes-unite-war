/** Root-owned gates compose app state, browser visibility and platform focus. */
class ApplicationLifecycle {
 private gates=new Map<string,boolean>();private active=true;private listeners=new Set<()=>void>();
 getSnapshot=()=>this.active;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 setGate(name:string,open:boolean){this.gates.set(name,open);const next=[...this.gates.values()].every(Boolean);if(next===this.active)return;this.active=next;for(const listener of this.listeners)listener();}
}
export const applicationLifecycle=new ApplicationLifecycle();
