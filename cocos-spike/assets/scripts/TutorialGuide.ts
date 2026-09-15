import {Color,Graphics,Label,Node,Tween,tween,UIOpacity,Vec3} from 'cc';
import {BattleAssets} from './BattleAssets';
import {BattleModel} from './BattleModel';
import {child,SceneUI,setSize} from './SceneUI';
import {tutorialState} from './core/systems/TutorialService';
import {BATTLE_ROW_GAP,BATTLE_SLOT_TOP,battleDropArea} from './BattleLayout';

type Rect={x:number;y:number;w:number;h:number};
const inside=(r:Rect,x:number,y:number)=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;
const GOLD=new Color(255,218,116);
/** Five small hints observing existing durable tutorial checkpoints. */
export class TutorialGuide {
 private root:Node|null=null;private key='';private holes:Rect[]=[];private step=0;
 private replay=0;private pressed:''|'next'='';private panelY=0;
 private pointer:Node|null=null;private pulse:Node|null=null;
 constructor(private parent:Node,private ui:SceneUI,private art:BattleAssets,private model:BattleModel,private boardTop:number){}
 startReplay(){this.replay=1;this.key='';}
 get active(){return !!this.root;}
 private destroy(){if(this.pointer)Tween.stopAllByTarget(this.pointer);if(this.pulse){const opacity=this.pulse.getComponent(UIOpacity);if(opacity)Tween.stopAllByTarget(opacity);}this.root?.removeFromParent();this.root?.destroy();this.root=null;this.pointer=null;this.pulse=null;}
 update(visible:boolean){
  const checkpoint=tutorialState(this.model.snapshot);
  const step=this.replay||((checkpoint==='completed')?0:checkpoint==='not_started'?1:Number(checkpoint.slice(-1)));
  if(!visible||!step){if(this.root)this.destroy();this.key='';return;}
  const key=[step,this.replay,this.model.tutorialObserved,this.model.heroes.map(h=>`${h.id}:${h.slot}:${h.deployed}`).join(',')].join('|');
  if(key===this.key)return;this.key=key;this.step=step;this.render();
 }
 begin(x:number,y:number):boolean {
  this.pressed='';if(!this.root)return false;
  if(this.replay&&inside({x:48,y:this.panelY+62,w:180,h:38},x,y)){this.pressed='next';return true;}
  return !this.holes.some(r=>inside(r,x,y));
 }
 end(x:number,y:number,moved:boolean){
  const pressed=this.pressed;this.pressed='';if(moved)return;
  if(pressed==='next'&&inside({x:48,y:this.panelY+62,w:180,h:38},x,y)){
   this.art.sound('ui_soft_1');this.art.haptic('selection');
   this.replay=this.replay===5?0:this.replay+1;this.key='';if(!this.replay)this.destroy();
  }
 }
 private slot(slot:number):Rect{return {x:14+slot%5*83,y:this.boardTop+BATTLE_SLOT_TOP-10+Math.floor(slot/5)*BATTLE_ROW_GAP,w:70,h:66};}
 private label(text:string,x:number,y:number,size:number,width=310,color=Color.WHITE){
  const label=this.ui.label(this.root!,'TutorialText',text,x,y,size,color);setSize(label.node,width,48);label.overflow=Label.Overflow.SHRINK;return label;
 }
 private render(){
  this.destroy();this.root=child(this.parent,'TutorialGuide');const h=this.ui.height,heroes=this.model.heroes;
  const buying=this.step<=2,merging=this.step===3,observed=this.step===5&&(this.model.tutorialObserved||!!this.replay);
  let start:Vec3|null=null,end:Vec3|null=null;
  if(buying)this.holes=[{x:165,y:h-178,w:100,h:89}];
  else if(merging){
   const pair=heroes.flatMap((a,i)=>heroes.slice(i+1).filter(b=>a.tier===b.tier).map(b=>[a,b]))[0];
   this.holes=(pair??heroes.slice(0,2)).map(hero=>this.slot(hero.slot));
  }else if(!observed){
   const hero=heroes.find(h=>h.tier>=2)??heroes[0];
   this.holes=hero?[this.slot(hero.slot)]:[];
   this.holes.push(battleDropArea(this.boardTop));
  }else this.holes=[{x:14,y:this.boardTop-245,w:401,h:192}];
  if(!this.holes.length)this.holes=[{x:10,y:this.boardTop,w:410,h:210}];
  this.panelY=buying?h-287:observed?this.boardTop-7:this.step>=4?this.holes[this.holes.length-1]!.y-112:this.boardTop-125;
  const shade=child(this.root,'SpotlightDimming').addComponent(Graphics);shade.fillColor=new Color(3,12,23,188);
  // Split at rectangle boundaries to dim everything except the union of targets.
  const cuts=[...new Set([0,h,...this.holes.flatMap(r=>[Math.max(0,r.y),Math.min(h,r.y+r.h)])])].sort((a,b)=>a-b);
  for(let i=0;i<cuts.length-1;i++){
   const top=cuts[i]!,bottom=cuts[i+1]!,middle=(top+bottom)/2;
   const spans=this.holes.filter(r=>middle>=r.y&&middle<r.y+r.h).map(r=>[Math.max(0,r.x),Math.min(430,r.x+r.w)]).sort((a,b)=>a[0]!-b[0]!);
   let x=0;for(const [left,right] of [...spans,[430,430]]){if(left!>x)shade.rect(x-215,h/2-bottom,left!-x,bottom-top);x=Math.max(x,right!);}
  }shade.fill();
  this.pulse=child(this.root,'TargetGlow');const border=this.pulse.addComponent(Graphics);
  for(const r of this.holes){border.strokeColor=new Color(255,218,116,45);border.lineWidth=10;border.roundRect(r.x-215,h/2-r.y-r.h,r.w,r.h,10);border.stroke();border.strokeColor=GOLD;border.lineWidth=2;border.roundRect(r.x-215,h/2-r.y-r.h,r.w,r.h,10);border.stroke();}
  const opacity=this.pulse.addComponent(UIOpacity);if(!BattleAssets.reducedMotion)tween(opacity).to(.7,{opacity:145},{easing:'sineInOut'}).to(.7,{opacity:255},{easing:'sineInOut'}).union().repeatForever().start();
  this.ui.rect(this.root,'TutorialCard',38,this.panelY,354,99,new Color(10,33,51,250),15);
  const titles=['','Buy your first hero','Buy another hero','Merge matching heroes','Send your hero into battle','Heroes fight automatically'];
  const subtitles=buying?'Tap the glowing Buy button':merging?'Drag one matching hero onto the other':observed?'Collect rewards. Merge to get stronger.':'Tap your hero or drag it into battle';
  this.label(titles[this.step]!,215,this.panelY+26,24);this.label(subtitles,215,this.panelY+53,16,326,new Color(188,216,235));
  this.label(this.replay?(this.replay===5?'DONE':'NEXT'):`${this.step} / 5`,this.replay?105:70,this.panelY+81,17,this.replay?110:48,GOLD);
  const a=this.holes[0]!,b=this.holes[this.holes.length-1]!;
  start=new Vec3(a.x+a.w*.6-215,h/2-a.y-a.h*.55);
  end=merging||this.step===4?new Vec3(b.x+b.w*.6-215,h/2-b.y-b.h*.55):start.clone().add(new Vec3(0,-10));
  if(!observed){
   this.pointer=child(this.root,'TutorialPointer');this.pointer.setPosition(start);
   const g=this.pointer.addComponent(Graphics);g.fillColor=new Color(255,250,225);g.strokeColor=new Color(72,45,20);g.lineWidth=2;
   g.moveTo(0,5);g.lineTo(0,21);g.quadraticCurveTo(4,27,8,21);g.lineTo(8,8);g.lineTo(19,4);g.quadraticCurveTo(24,1,21,-9);g.lineTo(17,-20);g.lineTo(4,-20);g.lineTo(-7,-3);g.quadraticCurveTo(-8,4,-3,2);g.close();g.fill();g.stroke();
   if(!BattleAssets.reducedMotion)tween(this.pointer).delay(.25).to(merging||this.step===4?1:.5,{position:end},{easing:'sineInOut'}).delay(.2).set({position:start}).union().repeatForever().start();
  }
  console.log('[cocos-spike] tutorial',this.replay?'help-'+this.step:'step-'+this.step);
 }
 dispose(){this.destroy();}
}
