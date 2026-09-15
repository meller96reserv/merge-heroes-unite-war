import {Color,Graphics,Node,Vec3} from 'cc';
import {BattleAssets} from './BattleAssets';
import {child} from './SceneUI';
export type TileTone='empty'|'merge'|'source'|'blocked';
export type TileGuide={position:Vec3;tone:TileTone};
const COLORS={empty:new Color(117,229,255),merge:new Color(255,211,100),source:new Color(216,253,255),blocked:new Color(255,113,113)};
/** Gesture guidance only. Accept/reject and every board mutation remain in game-core. */
export class BoardFeedback {
 private g:Graphics;private guides:TileGuide[]=[];private selected=false;private hover=-1;private time=0;
 private ghost:Vec3|null=null;private destination:Vec3|null=null;private deploy:Vec3|null=null;private deployAllowed=false;private tone:TileTone='empty';
 constructor(parent:Node){this.g=child(parent,'PlacementGuides').addComponent(Graphics);}
 show(guides:TileGuide[],deploy:Vec3,allowed:boolean){this.guides=guides;this.deploy=deploy.clone();this.deployAllowed=allowed;this.selected=true;this.draw();}
 aim(index:number,ghost:Vec3|null,destination:Vec3|null,tone:TileTone){this.hover=index;this.ghost=ghost?.clone()??null;this.destination=destination?.clone()??null;this.tone=tone;}
 clear(){this.selected=false;this.ghost=null;this.destination=null;this.hover=-1;this.g.clear();}
 update(dt:number){if(!this.selected)return;this.time+=dt;this.draw();}
 private ring(p:Vec3,c:Color,scale:number,alpha:number,focus=false){
  const g=this.g,rx=32*scale,ry=11*scale;
  g.fillColor=new Color(c.r,c.g,c.b,focus?43:18);g.ellipse(p.x,p.y,rx,ry);g.fill();
  g.strokeColor=new Color(c.r,c.g,c.b,alpha*.17);g.lineWidth=8;g.ellipse(p.x,p.y,rx,ry);g.stroke();
  g.strokeColor=new Color(c.r,c.g,c.b,alpha);g.lineWidth=focus?2.8:1.8;g.ellipse(p.x,p.y,rx,ry);g.stroke();
 }
 private chevrons(p:Vec3,c:Color){const g=this.g;g.strokeColor=c;g.lineWidth=2.5;for(let i=0;i<2;i++){const y=p.y+22+i*7;g.moveTo(p.x-6,y-4);g.lineTo(p.x,y);g.lineTo(p.x+6,y-4);}g.stroke();}
 private draw(){
  const g=this.g;g.clear();const pulse=BattleAssets.reducedMotion?1:.86+Math.sin(this.time*5)*.14;
  this.guides.forEach((tile,i)=>{
   const focus=i===this.hover;if(tile.tone==='blocked'&&!focus)return;
   this.ring(tile.position,COLORS[tile.tone],focus?1.12:1,focus?245:tile.tone==='merge'?210*pulse:115,focus);
   if(tile.tone==='merge')this.chevrons(tile.position,COLORS.merge);
   if(tile.tone==='blocked'&&focus){g.strokeColor=COLORS.blocked;g.lineWidth=2.5;const p=tile.position;g.moveTo(p.x-5,p.y-5);g.lineTo(p.x+5,p.y+5);g.moveTo(p.x-5,p.y+5);g.lineTo(p.x+5,p.y-5);g.stroke();}
  });
  if(this.deploy)this.ring(this.deploy,this.deployAllowed?COLORS.empty:COLORS.blocked,1.4,this.deployAllowed?170*pulse:80,this.hover===15);
  if(this.ghost){
   g.fillColor=new Color(6,22,37,60);g.ellipse(this.ghost.x,this.ghost.y-37,25,7);g.fill();
   if(this.destination&&this.tone!=='blocked'){
    const a=this.ghost,b=this.destination,c=COLORS[this.tone];
    for(let i=1;i<10;i++){const t=(i+(BattleAssets.reducedMotion?0:(this.time*3)%1))/10,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t+Math.sin(t*Math.PI)*17;g.fillColor=new Color(c.r,c.g,c.b,65+130*t);g.circle(x,y,1.2+1.1*t);g.fill();}
   }
  }
 }
 dispose(){this.g.node.destroy();}
}
