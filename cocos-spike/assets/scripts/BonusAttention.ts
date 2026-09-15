import {Color,Graphics,Mask,Node,Tween,tween,UIOpacity,UITransform,Vec3} from 'cc';
import {child,setSize} from './SceneUI';

/** One reusable badge and a gentle pulse; availability comes from game-core. */
export class BonusAttention {
 private badge:Node;private opacity:UIOpacity;private pulse:Tween<Node>|null=null;private key='';
 constructor(private icon:Node){
  const size=icon.getComponent(UITransform)!.contentSize;
  this.badge=child(icon,'BonusReady');setSize(this.badge,18,18);this.badge.setPosition(size.width*.39,size.height*.39);
  const g=this.badge.addComponent(Graphics);g.fillColor=new Color(224,47,44);g.strokeColor=new Color(255,224,126);g.lineWidth=1.5;
  g.circle(0,0,7.5);g.fill();g.stroke();g.fillColor=Color.WHITE;g.roundRect(-1.1,-.1,2.2,5,1);g.fill();g.circle(0,-3.1,1.1);g.fill();
  this.opacity=this.badge.addComponent(UIOpacity);this.opacity.opacity=0;
 }
 set(available:boolean,reduced:boolean){
  const key=available+':'+reduced;if(this.key===key)return;this.key=key;
  this.pulse?.stop();this.pulse=null;this.icon.setScale(1,1,1);this.opacity.opacity=available?255:0;
  console.log('[cocos-spike] bonus-ready',this.icon.name,available);
  if(available&&!reduced)this.pulse=tween(this.icon).to(.3,{scale:new Vec3(1.09,1.09,1)},{easing:'sineInOut'}).to(.35,{scale:new Vec3(1,1,1)},{easing:'sineInOut'}).delay(1.2).union().repeatForever().start();
 }
 dispose(){this.pulse?.stop();this.pulse=null;}
}

/** A brief gold glint every few seconds, clipped to the existing shop tab. */
export class ShopShine {
 private streak:Node;private motion:Tween<Node>|null=null;private reduced:boolean|null=null;
 constructor(icon:Node){
  const size=icon.getComponent(UITransform)!.contentSize,mask=child(icon,'ShopShineClip');setSize(mask,size.width,size.height);mask.addComponent(Mask).type=Mask.Type.GRAPHICS_RECT;
  this.streak=child(mask,'GoldGlint');const g=this.streak.addComponent(Graphics);
  for(const [width,alpha] of [[22,22],[12,36],[4,55]]){g.fillColor=new Color(255,229,149,alpha);g.moveTo(-width-20,-45);g.lineTo(width-20,-45);g.lineTo(width+20,45);g.lineTo(-width+20,45);g.close();g.fill();}
 }
 set(reduced:boolean){
  if(reduced===this.reduced)return;this.reduced=reduced;this.motion?.stop();this.motion=null;this.streak.active=!reduced;this.streak.setPosition(-90,0);
  if(!reduced)this.motion=tween(this.streak).delay(2.8).to(.8,{position:new Vec3(90,0,0)},{easing:'sineInOut'}).set({position:new Vec3(-90,0,0)}).delay(2.2).union().repeatForever().start();
 }
 dispose(){this.motion?.stop();this.motion=null;}
}
