import {Color,Graphics,instantiate,Label,Layers,Node,NodePool,Sprite,UIOpacity,Vec3} from 'cc';
import {BattleAssets} from './BattleAssets';
import {child,makeLabel,setSize} from './SceneUI';
import type {RewardCurrency} from './RewardCounter';

type Kind='Projectile'|'DamageText'|'SimpleVfx'|'Coin';
type Fx={node:Node;kind:Kind;t:number;life:number;from:Vec3;to:Vec3;arc:number;size:number;spin:number;role:string;color:Color;actor?:number;attack?:string;scatter?:Vec3;control?:Vec3;done?:()=>void};
const GOLD=new Color(255,210,96),WHITE=new Color(255,254,225),GEM=new Color(128,238,255);
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
/** Bounded cosmetic effects. Flight timing comes from attack intents; no combat is resolved here. */
export class FeedbackPool {
 private pools=new Map<Kind,NodePool>();private nodes:Node[]=[];private active:Fx[]=[];
 private trails:Graphics;private sequence=0;
 constructor(private parent:Node,private assets:BattleAssets){
  this.trails=child(parent,'ProjectileTrails').addComponent(Graphics);
  for(const [kind,count] of [['Projectile',8],['DamageText',16],['SimpleVfx',52],['Coin',24]] as const){
   const pool=new NodePool();this.pools.set(kind,pool);
   for(let i=0;i<count;i++){
    const n=instantiate(assets.prefabs.get(kind==='Coin'?'SimpleVfx':kind)!);n.layer=Layers.Enum.UI_2D;n.addComponent(UIOpacity);
    if(kind==='DamageText'){setSize(n,200,56);makeLabel(n,assets.bold,'',28);}
    else if(kind==='Coin'){const s=n.addComponent(Sprite);s.spriteFrame=assets.frame('gold');s.sizeMode=Sprite.SizeMode.CUSTOM;setSize(n,18,18);}
    else n.addComponent(Graphics);
    this.nodes.push(n);pool.put(n);
   }
  }
 }
 private spawn(kind:Kind,at:Vec3,life:number,role:string,color=GOLD):Fx|null{
  const n=this.pools.get(kind)!.get();if(!n)return null;
  this.parent.addChild(n);n.active=true;n.setPosition(at);n.setScale(1,1,1);n.angle=0;n.getComponent(UIOpacity)!.opacity=255;
  const f:Fx={node:n,kind,t:0,life,from:at.clone(),to:at.clone(),arc:0,size:1,spin:0,role,color};this.active.push(f);return f;
 }
 private point(f:Fx,p:number,out:Vec3):Vec3{return out.set(mix(f.from.x,f.to.x,p),mix(f.from.y,f.to.y,p)+4*f.arc*p*(1-p),0);}
 static color(type:string,tier=1){return type==='magic'?(tier===2?new Color(114,255,204):tier===4?new Color(197,146,255):new Color(114,224,255)):type==='ranged'?new Color(255,197,103):new Color(247,241,161);}
 projectile(from:Vec3,to:Vec3,type='melee',duration=.5,actor?:number,attack?:string,tier=1):void{
  if(BattleAssets.reducedMotion)return;
  const color=FeedbackPool.color(type,tier),f=this.spawn('Projectile',from,Math.max(.05,duration),type,color);if(!f)return;
  f.to.set(to);f.arc=type==='magic'?48:type==='ranged'?20:32;f.actor=actor;f.attack=attack;
  const g=f.node.getComponent(Graphics)!;g.clear();
  g.fillColor=new Color(color.r,color.g,color.b,45);g.ellipse(0,0,type==='magic'?16:19,12);g.fill();
  g.fillColor=new Color(color.r,color.g,color.b,125);g.ellipse(0,0,11,8);g.fill();
  if(type==='magic'){
   g.fillColor=color;g.circle(0,0,7);g.fill();g.fillColor=WHITE;g.circle(2,1,3.5);g.fill();
   g.strokeColor=WHITE;g.lineWidth=1;g.moveTo(-1,-11);g.lineTo(-1,-7);g.moveTo(-1,7);g.lineTo(-1,11);g.stroke();
  }else if(type==='ranged'){
   g.strokeColor=color;g.lineWidth=3;g.moveTo(-15,0);g.lineTo(10,0);g.stroke();
   g.fillColor=WHITE;g.moveTo(8,5);g.lineTo(19,0);g.lineTo(8,-5);g.close();g.fill();
   g.strokeColor=WHITE;g.lineWidth=2;g.moveTo(-15,-5);g.lineTo(-9,0);g.lineTo(-15,5);g.stroke();
  }else{
   g.fillColor=color;g.moveTo(-9,-15);g.quadraticCurveTo(24,0,-9,15);g.quadraticCurveTo(7,0,-9,-15);g.fill();
   g.strokeColor=WHITE;g.lineWidth=2;g.moveTo(-8,-15);g.quadraticCurveTo(24,0,-8,15);g.stroke();
  }
 }
 private ring(at:Vec3,color:Color,radius:number,life=.38){
  const f=this.spawn('SimpleVfx',at,life,'ring',color);if(!f)return;f.size=radius;
  const g=f.node.getComponent(Graphics)!;g.clear();g.strokeColor=new Color(color.r,color.g,color.b,45);g.lineWidth=8;g.circle(0,0,20);g.stroke();
  g.strokeColor=color;g.lineWidth=2;g.circle(0,0,20);g.stroke();f.node.setScale(.1,.1,1);
 }
 private burst(at:Vec3,color:Color,count:number,radius:number){
  if(BattleAssets.reducedMotion)return;
  for(let i=0;i<count;i++){
   const angle=i/count*Math.PI*2+this.sequence*.37,spread=radius*(.65+(i%3)*.18),f=this.spawn('SimpleVfx',at,.28+(i%4)*.065,'particle',i%3===0?WHITE:color);if(!f)break;
   f.to.set(at.x+Math.cos(angle)*spread,at.y+Math.sin(angle)*spread-13);f.arc=9;f.spin=i%2?110:-95;f.size=i%3===0?1.2:.8;
   const g=f.node.getComponent(Graphics)!;g.clear();g.fillColor=f.color;
   if(i%2){g.moveTo(0,5);g.lineTo(1.4,1.4);g.lineTo(5,0);g.lineTo(1.4,-1.4);g.lineTo(0,-5);g.lineTo(-1.4,-1.4);g.lineTo(-5,0);g.lineTo(-1.4,1.4);g.close();}else g.circle(0,0,2.5);g.fill();
  }this.sequence++;
 }
 impact(at:Vec3,type='melee',tier=1,crit=false):void{
  const c=FeedbackPool.color(type,tier);this.ring(at,c,crit?1.9:1.25,.24);this.burst(at,c,crit?10:6,crit?45:30);
 }
 spark(at:Vec3,death=false):void{this.ring(at,GOLD,death?2.1:1.1);this.burst(at,GOLD,death?12:6,death?65:28);}
 merge(at:Vec3,tier:number):void{
  this.ring(at,new Color(133,255,218),2.6,.5);this.ring(new Vec3(at.x,at.y-15),GOLD,1.7,.35);this.burst(at,GOLD,14,68);
  this.text('TIER '+tier,at,true);
 }
 landing(at:Vec3):void{this.ring(new Vec3(at.x,at.y-25),new Color(130,243,234),1.35,.3);this.burst(new Vec3(at.x,at.y-18),new Color(180,255,225),5,23);}
 currency(at:Vec3,to:Vec3,currency:RewardCurrency,count:number,arrive:(part:number)=>void):void{
  for(let i=0;i<count;i++){
   if(BattleAssets.reducedMotion){arrive(i);continue;}
   const f=this.spawn('Coin',at,(currency==='gem'?1.02:.92)+i*.035,'coin',currency==='gem'?GEM:GOLD);
   if(!f){arrive(i);continue;} // Pool pressure must never leave the HUD withholding a reward.
   const angle=(i/count)*Math.PI*2+(currency==='gem'?.6:0),radius=22+i%3*9;
   f.scatter=new Vec3(at.x+Math.cos(angle)*radius,at.y+Math.sin(angle)*radius+16);
   f.control=new Vec3(f.scatter.x+(i-(count-1)/2)*29,f.scatter.y+105);
   f.to.set(to);f.t=-i*.035;f.spin=i%2?30:-30;f.done=()=>arrive(i);
   f.node.getComponent(Sprite)!.spriteFrame=this.assets.frame(currency==='gem'?'gem':'gold');setSize(f.node,currency==='gem'?24:22,currency==='gem'?22:22);
  }
 }
 collect(at:Vec3,currency:RewardCurrency):void{this.ring(at,currency==='gold'?GOLD:GEM,.8,.2);}
 damage(value:number,at:Vec3,boss=false,crit=false):void{
  if(value<=0)return;
  const lane=this.sequence++%3-1,life=crit?1.1:boss?.95:.8;
  const f=this.spawn('DamageText',new Vec3(at.x-10+lane*22,at.y+30),life,'damage',crit?GOLD:WHITE);if(!f)return;
  const label=f.node.getComponent(Label)!;
  label.string=String(value);
  label.fontSize=crit?40:boss?34:28;label.lineHeight=label.fontSize+8;label.color=crit?GOLD:boss?new Color(255,237,197):WHITE;
  label.outlineWidth=crit?3:2;label.outlineColor=new Color(47,25,37);label.enableWrapText=false;
  f.to.set(f.from.x+lane*23,f.from.y+(crit?84:boss?66:48));f.arc=crit?12:6;f.size=crit?1.28:boss?1.14:1;
 }
 text(value:string,at:Vec3,reward=false,crit=false):void{
  const lane=this.sequence++%3-1,f=this.spawn('DamageText',new Vec3(at.x+lane*10,at.y+42),reward?.85:.65,'text');if(!f)return;
  const label=f.node.getComponent(Label)!;label.string=value;label.fontSize=crit?34:reward?24:28;label.lineHeight=label.fontSize+6;label.outlineWidth=2;label.color=reward||crit?GOLD:WHITE;
  f.to.set(f.from.x+lane*14,f.from.y+(reward?48:37));f.size=crit?1.13:1;
 }
 hit(attack?:string):void{if(attack)this.removeWhere(f=>f.kind==='Projectile'&&f.attack===attack);}
 roster(ids:Set<number>):void{this.removeWhere(f=>f.kind==='Projectile'&&f.actor!==undefined&&!ids.has(f.actor));}
 clearFlights():void{this.removeWhere(f=>f.kind==='Projectile');this.trails.clear();}
 clear():void{this.removeWhere(()=>true);this.trails.clear();}
 private removeWhere(test:(f:Fx)=>boolean){for(let i=this.active.length-1;i>=0;i--)if(test(this.active[i])){const f=this.active[i];this.pools.get(f.kind)!.put(f.node);this.active.splice(i,1);}}
 update(dt:number):void{
  dt=Math.min(.05,dt);this.trails.clear();const point=new Vec3(),past=new Vec3();
  for(let i=this.active.length-1;i>=0;i--){
   const f=this.active[i];f.t+=dt;if(f.t<0){f.node.getComponent(UIOpacity)!.opacity=0;continue;}
   const p=Math.min(1,f.t/f.life),ease=1-(1-p)*(1-p),reduced=BattleAssets.reducedMotion;
   if(f.kind==='Projectile'){
    this.point(f,p,point);f.node.setPosition(point);const angle=Math.atan2(f.to.y-f.from.y+4*f.arc*(1-2*p),f.to.x-f.from.x);f.node.angle=angle*180/Math.PI;
    f.node.setScale(1+.25*Math.sin(p*Math.PI),1+.25*Math.sin(p*Math.PI),1);
    for(let j=0;j<6;j++){
     const a=Math.max(0,p-.3+j*.05),b=Math.min(p,a+.05);if(b<=a)continue;
     this.point(f,a,past);this.point(f,b,point);this.trails.strokeColor=new Color(f.color.r,f.color.g,f.color.b,25+j*22);this.trails.lineWidth=1+j*.85;
     this.trails.moveTo(past.x,past.y);this.trails.lineTo(point.x,point.y);this.trails.stroke();
    }
   }else if(f.role==='ring'){
    const s=reduced?f.size*.5:.15+ease*f.size;f.node.setScale(s,s*.62,1);f.node.getComponent(UIOpacity)!.opacity=255*(1-p)*(1-p);
   }else if(f.role==='text'||f.role==='damage'){
    this.point(f,reduced?0:ease,point);f.node.setPosition(point);const s=reduced?1:p<.18?.7+(p/.18)*.4:1.1-(p-.18)*.12;f.node.setScale(s*f.size,s*f.size,1);
    f.node.getComponent(UIOpacity)!.opacity=255*Math.min(1,(1-p)*3);
   }else if(f.role==='coin'){
    const scatter=f.scatter!,control=f.control!;
    if(p<.23){const q=1-Math.pow(1-p/.23,3);point.set(mix(f.from.x,scatter.x,q),mix(f.from.y,scatter.y,q),0);}
    else{const q=Math.pow((p-.23)/.77,1.55),a=1-q;point.set(a*a*scatter.x+2*a*q*control.x+q*q*f.to.x,a*a*scatter.y+2*a*q*control.y+q*q*f.to.y,0);}
    f.node.setPosition(point);const s=p<.23?.55+p/.23*.65:1.2-.6*(p-.23)/.77;f.node.setScale(s,s,1);f.node.angle=f.spin*Math.sin(Math.PI*p);f.node.getComponent(UIOpacity)!.opacity=255*Math.min(1,(1-p)*12);
   }else{
    this.point(f,ease,point);f.node.setPosition(point);const s=(1-p)*f.size;f.node.setScale(s,s,1);f.node.angle=f.spin*p;f.node.getComponent(UIOpacity)!.opacity=255*(1-p);
   }
   if(p>=1){this.pools.get(f.kind)!.put(f.node);this.active.splice(i,1);f.done?.();}
  }
 }
 dispose():void{this.clear();for(const p of this.pools.values())p.clear();for(const n of this.nodes)if(n.isValid)n.destroy();this.trails.node.destroy();}
}
