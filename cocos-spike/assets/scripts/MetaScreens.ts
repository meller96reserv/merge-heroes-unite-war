import {Color,Node,Label,Sprite,UIOpacity,tween,Vec3,Tween,Graphics,Mask,UITransform} from 'cc';
import {SceneUI,child,makeLabel,spriteNode,setSize} from './SceneUI';
import {BattleAssets} from './BattleAssets';
import {BattleModel} from './BattleModel';
import {heroes} from './core/content/PlayableConfig';
import {heroStats,heroLevel} from './core/selectors/HeroStats';
import {heroNames,equipmentSlots,equipmentDefinitions,equipmentById,enhanceCost,upgradeCost,maxHeroLevel,maxEquipmentLevel,EquipmentSlot} from './core/content/EquipmentConfig';
import {heroSaleGold} from './core/commands/SellHero';
import {equipmentPrice} from './core/commands/BuyEquipment';
import {relicDefinitions} from './core/content/RelicConfig';
import {dragons,dragonReward} from './core/modes/DragonMode';
import {dailyEligibility,dailyGold} from './core/systems/DailyService';
import {wheelSegment,wheelLandingAngle,wheelSectors} from './core/systems/WheelOutcome';
import {stageDefinitions} from './core/content/StageConfig';
import {BonusAttention,ShopShine} from './BonusAttention';
import {NativeServices} from './NativeServices';
import {RewardedFlow} from './RewardedFlow';
import {stageBoostAmounts} from './core/commands/ClaimStageBoost';
import {RewardedPlacement} from './core/rewards/RewardedOperation';
import {redDots} from './core/selectors/RedDots';
import {battleBoostTop} from './BattleLayout';

type Route='battle'|'shop'|'heroes'|'upgrades'|'dungeon'|'relic'|'daily'|'wheel'|'settings'|'terms'|'privacy'|'boost'|'start'|'stageReward'|'sellHero';
type Button={x:number;y:number;w:number;h:number;action:()=>void|Promise<unknown>;scroll?:boolean;silent?:boolean;drag?:(x:number)=>void;visuals?:Node[]};
const nav:Route[]=['shop','heroes','battle','dungeon','relic'];
const fmt=(v:string|number)=>{const n=Number(v);return n>=1e9?(n/1e9).toFixed(1)+'B':n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e4?(n/1e3).toFixed(1)+'K':String(v);};
const GOLD=new Color(255,225,135),MUTED=new Color(161,183,204);
const contains=(b:Button,x:number,y:number)=>x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h;
/** Native Cocos screen composition using the same semantic art and domain commands as the existing app. */
export class MetaScreens {
 private root:Node|null=null;private buttons:Button[]=[];private pressed:Button|null=null;
 private route:Route='battle';private tier=1;private page=0;private slot:EquipmentSlot|'all'|null=null;private inventoryPage=0;private ownedIndex=0;
 private detail:string|null=null;private history:Route[]=[];
 private scrollNode:Node|null=null;private scrollY=0;private scrollMax=0;private scrollBase=new Vec3();private scrollStart=0;private pressY=0;private scrolling=false;private drawingScroll=false;private drawingBody=false;
 private sliderKey:'sfxGain'|'musicGain'|null=null;private sliderValue=0;private sliderBucket=-1;private sliderVisuals=new Map<string,{fill:Node;knob:Node;y:number}>();
 private timerLabel:Label|null=null;private timerSecond=-1;
 private wheelAttention:BonusAttention|null=null;private bonusSecond=-1;
 private shopShine:ShopShine|null=null;
 private saleHeroId='';
 private rewarded=new RewardedFlow(this.model);private adBusy=false;private boostId='';private boostOffer:Node|null=null;private offerUntil=0;
 private toast='';private toastLabel:Label|null=null;private busy=false;private wheelAnimating=false;
 constructor(private parent:Node,private ui:SceneUI,private art:BattleAssets,readonly model:BattleModel,private back:()=>void,private help:()=>void=()=>{}){}
 get isOpen(){return this.route!=='battle';}
 private get state(){return this.model.snapshot;}
 private get h(){return this.ui.height;}
 private get y(){return 164;}
 private artNode(id:string,x:number,y:number,w:number,h:number){return this.ui.art(this.root!,id,x,y,w,h);}
 private text(value:string,x:number,y:number,size=23,color=Color.WHITE){return this.ui.label(this.root!,'Text',value,x,y,size,color);}
 private hit(x:number,y:number,w:number,h:number,action:Button['action'],silent=false){if(this.drawingBody){const s=Math.min(1,(this.h-265)/667);x=215+(x-215)*s;y=164+(y-164)*s;w*=s;h*=s;}this.buttons.push({x,y,w,h,action,silent,scroll:this.drawingScroll});}
 private button(value:string,x:number,y:number,w:number,h:number,action:Button['action'],enabled=true,silent=false){
  const n=this.artNode('ui_button_orange__2542x1359',x,y,w,h);if(!enabled)n.addComponent(UIOpacity).opacity=130;
  const label=this.text(value,x+w/2,y+h/2,Math.min(w<=110?14:h>=60?36:24,(w-20)/Math.max(1,value.length*.55)),enabled?Color.WHITE:MUTED);label.overflow=Label.Overflow.SHRINK;label.enableWrapText=false;setSize(label.node,w-16,h-8);if(enabled){this.hit(x,y,w,h,action,silent);this.buttons[this.buttons.length-1].visuals=[n,label.node];}
 }
 private label(value:string,x:number,baseline:number,size=20,bold=false,width=250){
  const l=this.text(value,x,baseline-size*.34,size);l.font=bold?this.art.bold:this.art.font;l.outlineWidth=bold?1.5:.5;l.overflow=Label.Overflow.SHRINK;l.enableWrapText=false;setSize(l.node,width,size+8);return l;
 }
 private body(draw:()=>void){const root=this.root!,node=child(root,'FigmaBody'),s=Math.min(1,(this.h-265)/667);node.setScale(s,s,1);node.setPosition(0,(this.h/2-164)*(1-s));this.root=node;this.drawingBody=true;try{draw();}finally{this.root=root;this.drawingBody=false;}}
 private clipped(x:number,y:number,w:number,h:number,draw:()=>void,scroll=false){
  const root=this.root!,mask=child(root,'FigmaClip');setSize(mask,w,h);this.ui.position(mask,x,y,w,h);mask.addComponent(Mask).type=Mask.Type.GRAPHICS_RECT;
  const inner=child(mask,'Content');inner.setPosition(-mask.position.x,-mask.position.y+(scroll?this.scrollY:0));
  if(scroll){this.scrollNode=inner;this.scrollBase.set(-mask.position.x,-mask.position.y,0);}
  this.root=inner;const old=this.drawingScroll;this.drawingScroll=scroll;try{draw();}finally{this.drawingScroll=old;this.root=root;}
 }
 private frame(x:number,y:number,w:number,h:number){this.clipped(x,y,w,h,()=>this.artNode('ui_panel_plain_navy__1126x2000',x-w*.0573,y-h*.0508,w*1.1146,h*1.0791));}
 private backButton(action=()=>this.goBack()){
  const arrow=this.artNode('ui_icon_upgrade_arrow__1302x1413',18,65,39,42);arrow.angle=90;this.hit(12,59,52,53,action);
 }
 private currencyButton(count:1|10,cost:string,currency:'gem'|'gold',x:number,y:number,action:Button['action'],enabled=true,gold=false){
  const n=this.artNode(gold?'ui_button_gold__2378x1300':'ui_button_orange__2542x1359',x,y,132,71);if(!enabled)n.addComponent(UIOpacity).opacity=130;
  this.label('OPEN x'+count,x+66,y+26,20,false,110);this.artNode(currency,x+30,y+32,32,32);this.label(cost,x+80,y+53,20,false,58);const affordable=BigInt(this.state.data.currencies[currency]??'0')>=BigInt(cost);if(!affordable&&!n.getComponent(UIOpacity))n.addComponent(UIOpacity).opacity=140;this.hit(x,y,132,71,()=>{if(enabled&&this.afford(currency,cost))return action();});
 }
 private hud(){
  this.artNode('currencyFrame',61,18,145,54);this.artNode('currencyFrame',225,17,145,54);this.artNode('gold',72,29,32,32);this.artNode('gem',236,28,32,32);
  this.label(fmt(this.state.data.currencies.gold),156,54,32,true,96);this.label(fmt(this.state.data.currencies.gem),320,53,32,true,96);
  this.wheelAttention=new BonusAttention(this.artNode('wheel',108,86,53,53));this.hit(102,80,65,65,()=>this.open('wheel'));this.artNode('settings',269,86,53,53);this.hit(263,80,65,65,()=>this.open('settings'));
 }
 private hasNavigation(){return ['heroes','upgrades','relic','dungeon'].includes(this.route);}
 private matches(b:Button,x:number,y:number){return (!b.scroll||(y>=164&&y<=this.h-101))&&contains(b,x,y+(b.scroll?this.scrollY:0));}
 private press(b:Button|null,on:boolean){for(const n of b?.visuals??[]){if(!n.isValid)continue;Tween.stopAllByTarget(n);if(on)n.setScale(.97,.97,1);else tween(n).to(.1,{scale:new Vec3(1,1,1)}).start();}}
 private panel(x:number,y:number,w:number,h:number){this.ui.rect(this.root!,'Panel',x,y,w,h,new Color(10,31,51,245),14);}
 private async run(type:Parameters<BattleModel['command']>[0],fields:Record<string,unknown>={},message=''){
  if(this.busy)return false;this.busy=true;
  try{const ok=await this.model.command(type,fields);if(ok){if(message)this.toast=message;
   const cues:Record<string,string>={ClaimDaily:'reward_claim_1',OpenRelics:'reward_claim_1',OpenEquipment:'reward_claim_1',SellHero:'reward_claim_1',BuyEquipment:'equipment_1',UpgradeHero:'upgrade_1',EnhanceItem:'upgrade_1',EquipItem:'equipment_1',ActivateAutoMerge:'upgrade_1',StartDragon:'ui_open_1',LeaveDragon:'ui_close_1',RetryBoss:'ui_open_1'};
   if(cues[type]){this.art.sound(cues[type]);this.art.haptic(cues[type]==='reward_claim_1'?'reward':'light');}
   if(type==='UpdateSettings'&&(fields.patch as {haptics?:boolean}|undefined)?.haptics){this.art.preferences(this.state.data.settings);this.art.haptic('light');}
  }this.refresh();return ok;}finally{this.busy=false;}
 }
 notice(message:string){this.toast=message;if(this.toastLabel){this.toastLabel.string=message;this.toastLabel.node.parent!.active=!!message;}}
 open(route:Route){this.show(route,true);}
 private goBack(){this.show(this.history.pop()??'battle',false);}
 private show(route:Route,record:boolean){
  this.cancel();if(route==='heroes'&&!this.state.data.heroes.some(h=>h.tier===this.tier)&&this.state.data.heroes.length)this.tier=this.state.data.heroes[0].tier;
  if(route===this.route)return;
  if(record){if(route==='battle')this.history=[];else this.history.push(this.route);}
  NativeServices.event('screen',route);this.route=route;this.page=0;this.scrollY=0;this.slot=null;this.detail=null;this.toast='';this.wheelAnimating=false;this.render();if(route==='battle')this.back();console.log('[cocos-spike] screen',route);
 }
 refresh(){if(this.isOpen&&!this.wheelAnimating&&!this.sliderKey)this.render();}
 begin(x:number,y:number):boolean{
  this.pressed=null;this.pressY=y;this.scrollStart=this.scrollY;this.scrolling=false;this.sliderBucket=-1;
  if(this.adBusy)return true;
  if(this.isOpen){this.pressed=[...this.buttons].reverse().find(b=>this.matches(b,x,y))??null;this.press(this.pressed,true);if(this.pressed?.drag)this.pressed.drag(x);return true;}
  const action=this.battleAction(x,y);if(action){this.pressed={x:x-20,y:y-20,w:40,h:40,action};return true;}return false;
 }
 move(x:number,y:number){
  if(this.pressed?.drag){this.pressed.drag(x);return;}
  if(this.scrollNode&&this.pressY>=140&&this.pressY<this.h-25){
   if(Math.abs(y-this.pressY)>6)this.scrolling=true;
   if(this.scrolling){this.press(this.pressed,false);const fallback=this.route==='upgrades'?1300-(this.h-265):0;this.scrollY=Math.max(0,Math.min(this.scrollMax||fallback,this.scrollStart+this.pressY-y));this.scrollNode.setPosition(this.scrollBase.x,this.scrollBase.y+this.scrollY);}
  }
 }
 end(x:number,y:number,moved:boolean){
  const b=this.pressed;this.pressed=null;this.press(b,false);
  if(this.sliderKey){const key=this.sliderKey,value=this.sliderValue;this.sliderKey=null;void this.run('UpdateSettings',{settingsRevision:this.state.data.settings.revision??0,patch:{[key]:value}}).then(ok=>{if(ok)this.art.sound('ui_primary_1',.9);});return;}
  if(b&&!moved&&!this.scrolling&&this.matches(b,x,y)&&!this.busy){const before=this.route;void b.action();if(!b.silent)this.art.sound(before!==this.route?(this.route==='battle'?'ui_close_1':'ui_tab_1'):this.route==='settings'?'ui_toggle_1':'ui_soft_1',.85);this.art.haptic('selection');}
 }
 cancel(){this.press(this.pressed,false);this.pressed=null;this.scrolling=false;if(this.sliderKey){this.sliderKey=null;this.art.preferences(this.state.data.settings);this.refresh();}}
 update(){const now=Date.now();if(this.boostOffer&&now>=this.offerUntil){this.boostOffer.destroy();this.boostOffer=null;}const second=Math.floor(now/1000);if(this.wheelAttention&&second!==this.bonusSecond){this.bonusSecond=second;this.wheelAttention.set(redDots(this.state,now).wheel,BattleAssets.reducedMotion);}if(this.timerLabel&&!this.wheelAnimating){const sec=Math.ceil(Math.max(0,this.state.data.wheel.nextFreeAt-now)/1000);if(sec!==this.timerSecond){this.timerSecond=sec;this.timerLabel.string=sec?'NEXT FREE SPIN  '+[Math.floor(sec/3600),Math.floor(sec/60)%60,sec%60].map(n=>String(n).padStart(2,'0')).join(':'):'FREE SPIN READY';}}}
 private battleAction(x:number,y:number):Button['action']|null{
  if(this.boostOffer&&Date.now()<this.offerUntil&&x>85&&x<345&&y>240&&y<291)return ()=>this.selectStageBoost(this.boostId);
  if(y>=this.h-85&&y<=this.h)return ()=>this.open(nav[Math.max(0,Math.min(4,Math.floor((x-7)/84)))]);
  if(y>=80&&y<=145){if(x>=96&&x<=169)return ()=>this.open('wheel');if(x>=260&&x<=330)return ()=>this.open('settings');}
  if(x>360&&y>170&&y<240)return ()=>{const s=this.state.data.stages;const boss=stageDefinitions.find(d=>d.boss?.farmStageId===s.farmStageId);if(s.bossRetryAvailable&&boss)return this.run('RetryBoss',{stageId:boss.id,expectedSequence:s.encounterSequence});this.notice('DEFEAT WAVES TO REACH THE BOSS');};
  const boostY=battleBoostTop(this.h);if(y>boostY&&y<boostY+52){
   if(x>56&&x<123)return ()=>{const s=this.state.data.settings;return this.run('UpdateSettings',{settingsRevision:s.revision??0,patch:{battleSpeed:s.battleSpeed===2?1:2}},s.battleSpeed===2?'BATTLE SPEED 1X':'BATTLE SPEED 2X');};
   if(x>181&&x<247)return ()=>this.open('boost');if(x>306&&x<375)return ()=>this.open('daily');
  }
  if(y>this.h-171&&y<this.h-92){if(x>=92&&x<=169)return ()=>{this.model.buy(2);};if(x>=263&&x<=336)return ()=>{this.model.buy(3);};}
  return null;
 }
 private render(){
  this.wheelAttention?.dispose();this.wheelAttention=null;this.bonusSecond=-1;
  this.shopShine?.dispose();this.shopShine=null;
  if(this.root){this.root.removeFromParent();this.root.destroy();this.root=null;}this.buttons=[];this.toastLabel=null;this.timerLabel=null;this.scrollNode=null;this.sliderVisuals.clear();
  if(!this.isOpen)return;this.root=child(this.parent,'Screen_'+this.route);this.scrollMax=0;
  const hud=this.hasNavigation(),bg=this.route==='heroes'?'background_castle_platform__941x1672':this.route==='relic'?'background_forest_glade__941x1672':null;
  this.ui.background(this.root,bg?this.art.frame(bg):this.art.background);
  if(hud){this.hud();if(['heroes','upgrades'].includes(this.route)){this.artNode('currency_blue_orb__545x554',183,89,25,25);this.label(fmt(this.state.data.currencies.orb??'0'),239,111,18,false,54);}}
  switch(this.route){case 'heroes':this.body(()=>this.hero());break;case 'upgrades':this.upgrades();break;case 'relic':this.body(()=>this.relics());break;case 'dungeon':this.body(()=>this.dungeon());break;case 'daily':this.daily();break;case 'settings':this.settings();break;case 'terms':this.legal('terms');break;case 'privacy':this.legal('privacy');break;case 'wheel':this.wheel();break;case 'shop':this.shop();break;case 'boost':this.boost();break;case 'start':this.startScreen();break;case 'stageReward':this.stageReward();break;case 'sellHero':this.saleScreen();break;}
  if(!hud&&!['battle','start','settings','terms','privacy'].includes(this.route))this.settingsShortcut();
  if(hud)nav.forEach((r,i)=>{this.artNode(r===this.route||(r==='heroes'&&this.route==='upgrades')?'navBlue':'navDark',7+i*84,this.h-85,79,80);const icon=this.artNode(r,18+i*84,this.h-76,58,60);if(i===0){this.shopShine=new ShopShine(icon);this.shopShine.set(BattleAssets.reducedMotion);}this.hit(7+i*84,this.h-85,79,80,()=>this.open(r));});
  if(this.detail)this.details();
  const toast=child(this.root,'Notice');const previous=this.root;this.root=toast;this.panel(9,hud?140:this.h-76,412,28);this.toastLabel=this.label(this.toast,215,hud?159:this.h-57,14,false,394);this.root=previous;toast.active=!!this.toast;
 }
 private settingsShortcut(){this.artNode('settings',365,71,43,43);this.hit(357,63,59,59,()=>this.open('settings'));}
 private hero(){
  const d=heroes.all()[this.tier-1],owned=this.state.data.heroes.filter(h=>h.definitionId===d.id),h=owned[this.ownedIndex%Math.max(1,owned.length)],stats=heroStats(this.state,d,h),y=164;
  const portrait=(tier:number)=>{const base=heroes.all()[tier-1].visualId.split('__')[0].replace('hero_','portrait_');return this.art.portrait(base);};
  const prev=(this.tier+8)%10+1,next=this.tier%10+1;
  [[prev,92,36,75,68],[this.tier,170,20,91,84],[next,264,36,75,68]].forEach(([tier,x,sy,w,hh])=>{const n=spriteNode(this.root!,'Portrait',portrait(tier),w,hh);this.ui.position(n,x,y+sy,w,hh);});
  this.hit(88,y+20,75,88,()=>{this.tier=prev;this.ownedIndex=0;this.slot=null;this.render();});this.hit(264,y+20,79,88,()=>{this.tier=next;this.ownedIndex=0;this.slot=null;this.render();});
  if(owned.length>1)this.hit(170,y+20,91,84,()=>{this.ownedIndex++;this.render();});
  this.artNode(d.visualId,107,y+123,216,223);
  equipmentSlots.forEach((slot,i)=>{const x=i<3?7:343,sy=y+35+i%3*120;this.artNode('ui_frame_magic_gold__1289x1762',x,sy,80,110);
   const item=this.state.data.equipment.find(it=>it.ownerHeroId===h?.id&&it.slotType===slot);
   if(item){this.artNode(equipmentById.get(item.definitionId)!.visualId,x+13,sy+21,54,76);this.label('Lv.'+item.level,x+40,sy+101,13,false,65);}else{const offer=equipmentDefinitions.find(it=>it.heroDefinitionId===d.id&&it.slotType===slot);if(offer){const preview=this.artNode(offer.visualId,x+13,sy+16,54,67);preview.addComponent(UIOpacity).opacity=175;this.label(equipmentPrice(offer)+' GOLD',x+40,sy+99,12,true,73);}else this.label(slot.toUpperCase(),x+40,sy+65,12,false,73);}
   this.hit(x,sy,80,110,()=>{this.slot=slot;this.inventoryPage=0;this.render();});
  });
  this.label(h?'Lv. '+(heroLevel(this.state,d.id)+1)+'/60':'MERGE TO DISCOVER',215,y+385,h?32:22,true,290);this.label(heroNames[this.tier-1].toUpperCase(),215,y+403,14,false,290);
  this.artNode('ui_panel_gold_black_wide__3815x1593',45,y+418,340,142);this.artNode('battle',59,y+429,51,53);this.artNode('ui_icon_crown__353x325',59,y+495,51,53);
  this.label(fmt(stats.attack)+' DAMAGE',193,y+463,20,true,147);this.label(fmt(stats.defense)+' ARMOR',193,y+529,20,true,147);
  this.button('ENHANCE',274,y+428,102,55,()=>{this.slot=(this.state.data.equipment.find(it=>it.ownerHeroId===h?.id)?.slotType??'weapon') as EquipmentSlot;this.render();},!!h);
  this.artNode('ui_button_orange__2542x1359',274,y+494,102,55);this.label('EXP',300,y+528,14,false,40);this.artNode('ui_icon_upgrade_arrow__1302x1413',327,y+504,31,34);this.hit(274,y+494,102,55,()=>this.open('upgrades'));
  if(h)this.button('SELL '+heroSaleGold(this.state,h.id)+' GOLD',238,y+582,165,62,()=>this.sellHero(h.id),this.state.data.player.tutorialState==='completed');
  this.button('EQUIPMENT SHOP',27,y+582,202,62,()=>{this.slot='all';this.inventoryPage=0;this.render();});
  if(this.slot)this.inventory(h?.id,d.id,this.slot);
 }
 private async openEquipment(count:1|10){const list=this.state.data.heroes.filter(h=>h.tier===this.tier),h=list[this.ownedIndex%Math.max(1,list.length)];if(!h)return;
  const before=new Set(this.state.data.equipment.map(e=>e.id));if(await this.run('OpenEquipment',{heroId:h.id,count})){
   const items=this.state.data.equipment.filter(e=>!before.has(e.id));this.toast=items.map(e=>equipmentById.get(e.definitionId)!.name).join(' · ');this.slot=items[0]?.slotType as EquipmentSlot;this.inventoryPage=0;this.render();
  }
 }
 private inventory(heroId:string|undefined,definitionId:string,slot:EquipmentSlot|'all'){
  this.buttons=[];const top=175,bottom=this.h-145;
  this.panel(16,top,398,bottom-top);this.label('EQUIPMENT SHOP',215,top+29,26,true,325);
  this.button('ALL ITEMS',31,top+42,125,40,()=>{this.slot='all';this.inventoryPage=0;this.render();});
  this.button('CLOSE',302,top+42,95,40,()=>{this.slot=null;this.render();});
  this.label(heroId?'BUY & EQUIP · PRICES IN GOLD':'MERGE TO UNLOCK THIS HERO',215,top+107,16,true,365);
  const seen=new Set<string>(),all=equipmentDefinitions.filter(d=>d.heroDefinitionId===definitionId&&(slot==='all'||d.slotType===slot)&&!seen.has(d.visualId)&&!!seen.add(d.visualId));
  const rows=Math.max(1,Math.min(5,Math.floor((bottom-top-178)/103))),pages=Math.max(1,Math.ceil(all.length/rows));this.inventoryPage=Math.min(this.inventoryPage,pages-1);
  all.slice(this.inventoryPage*rows,(this.inventoryPage+1)*rows).forEach((d,i)=>{
   const y=top+119+i*103,item=this.state.data.equipment.find(it=>equipmentById.get(it.definitionId)?.visualId===d.visualId&&(!it.ownerHeroId||it.ownerHeroId===heroId)),equipped=!!item&&item.ownerHeroId===heroId,cost=equipmentPrice(d);
   this.artNode('ui_panel_gold_navy_wide__2339x828',28,y,375,97);this.artNode(d.visualId,40,y+8,65,79);
   this.label(d.name.toUpperCase()+(item?' · LV '+item.level:''),245,y+25,17,true,260);
   this.label(equipped?'EQUIPPED':d.slotType.toUpperCase(),77,y+94,10,true,85);
   if(!heroId){this.button('HERO LOCKED',124,y+39,264,45,()=>{},false);return;}
   if(item){
    this.button(equipped?'REMOVE':'EQUIP',119,y+41,118,44,()=>this.run('EquipItem',{heroId,itemId:equipped?null:item.id,slot:d.slotType},equipped?'ITEM RETURNED TO INVENTORY':'ITEM EQUIPPED'));
    this.button(item.level>=maxEquipmentLevel?'MAX':'UP '+enhanceCost(item.level)+' G',242,y+41,148,44,()=>{if(!this.afford('gold',enhanceCost(item.level)))return;return this.run('EnhanceItem',{itemId:item.id,expectedLevel:item.level},'ITEM UPGRADED');},item.level<maxEquipmentLevel);
   }else this.button('BUY & EQUIP · '+cost+' G',120,y+39,268,46,()=>{if(!this.afford('gold',cost))return;return this.run('BuyEquipment',{heroId,definitionId:d.id,expectedCost:cost},'PURCHASED AND EQUIPPED');});
  });
  this.pager(this.inventoryPage,pages,bottom-52,p=>{this.inventoryPage=p;this.render();});
 }
 private afford(currency:'gold'|'gem'|'orb',cost:string):boolean{
  const balance=this.state.data.currencies[currency]??'0';if(BigInt(balance)>=BigInt(cost))return true;
  const unit=currency==='gem'?'GEMS':currency==='orb'?'UPGRADE ORBS':'GOLD';
  this.notice('NEED '+cost+' '+unit+' · YOU HAVE '+balance);this.art.sound('ui_error_1');this.art.haptic('error');return false;
 }
 private pager(page:number,pages:number,y:number,action:(p:number)=>void){this.button('<',66,y,65,41,()=>action((page+pages-1)%pages),pages>1);this.text((page+1)+' / '+pages,215,y+21,21);this.button('>',299,y,65,41,()=>action((page+1)%pages),pages>1);}
 private upgrades(){
  this.label('EARN BLUE ORBS IN DUNGEON BATTLES',215,153,13,true,380);
  this.artNode('ui_frame_equipment_gold__1035x1545',14,164,403,this.h-265);
  const order=[8,2,10,7,6,1,3,4,5,9],list=[...heroes.all()].sort((a,b)=>Number(this.state.data.heroes.some(h=>h.definitionId===b.id))-Number(this.state.data.heroes.some(h=>h.definitionId===a.id))||order.indexOf(a.tier)-order.indexOf(b.tier));
  this.clipped(28,164,384,this.h-265,()=>list.forEach((d,i)=>{
   const x=28,y=178+i*127,level=heroLevel(this.state,d.id),stats=heroStats(this.state,d),known=this.state.data.heroes.some(h=>h.definitionId===d.id)||this.state.data.progression.discoveredTiers.includes(d.tier),max=level>=maxHeroLevel,affordable=BigInt(this.state.data.currencies.orb??'0')>=BigInt(upgradeCost(level));
   this.artNode('ui_panel_gold_navy_wide__2339x828',x+18,y,347,123);this.artNode('background_grass_platform__754x329',x+39,y+68,82,36);this.artNode(d.visualId,x+47,y+13,65,67);
   this.artNode('ui_banner_name_purple__959x176',x+126,y+16,149,27);this.label(heroNames[d.tier-1].toUpperCase(),x+200,y+35,16,true,133);this.artNode('ui_panel_stats_black__966x425',x+129,y+45,144,63);
   ['ATK','HP','LVL'].forEach((name,j)=>{this.artNode(['ui_icon_sword__525x536','ui_icon_heart__474x437','ui_icon_star__478x497'][j],x+137,y+47+j*20,17,17);this.label(name,x+176,y+61+j*20,14,true,34);this.label(fmt([stats.attack,stats.hp,level+1][j]),x+237,y+61+j*20,14,true,48);});
   const btn=this.artNode('ui_button_gold__2378x1300',x+275,y+53,72,55);if(!known||max||!affordable)btn.addComponent(UIOpacity).opacity=140;
   if(known&&!max)this.artNode('currency_blue_orb__545x554',x+300,y+58,22,22);this.label(!known?'LOCKED':max?'MAX':upgradeCost(level),x+311,y+(!known||max?85:99),!known?12:16,false,61);
   this.hit(x+275,y+53,72,55,()=>{if(!known){this.notice('MERGE HEROES TO DISCOVER '+heroNames[d.tier-1].toUpperCase());return;}if(max){this.notice('MAX LEVEL REACHED');return;}if(!this.afford('orb',upgradeCost(level)))return;return this.run('UpgradeHero',{definitionId:d.id,expectedLevel:level},'HERO UPGRADED');});
  }),true);
 }
 private relics(){
  const y=164;this.artNode('ui_frame_equipment_gold__1035x1545',14,y+28,403,633);
  relicDefinitions.forEach((d,i)=>{const x=48+i%4*85,sy=y+81+Math.floor(i/4)*120,count=this.state.data.relics?.[d.id]??0;
   this.artNode('ui_frame_magic_gold__1289x1762',x,sy,80,110);this.artNode(d.visualId,x+13,sy+21,54,76);
   const badge=d.badge==='UR'?'ui_frame_heart_wings__1728x1616':d.badge==='SR'?'ui_frame_purple_shield__1628x1719':'ui_frame_orange_wings__1714x1662';this.artNode(badge,x-7,sy,26,25);this.label(d.badge,x+6,sy+16,8,true,25);this.label('Lv.'+Math.min(20,count),x+40,sy+103,11,false,65);
   this.hit(x,sy,80,110,()=>{this.detail=d.id;this.render();});
  });
  for(const [i,count] of ([1,10] as const).entries())this.currencyButton(count,'100',i?'gem':'gold',81+i*137,y+561,async()=>{if(await this.run('OpenRelics',{count})){this.detail='reveal';this.render();}},true,!!i);
 }
 private dungeon(){
  const y=164;this.clipped(23,y,384,665,()=>this.artNode('ui_panel_plain_navy__1126x2000',1,y-34,428,718));this.artNode('ui_banner_stage_blue__3876x605',83,y+11,265,65);this.label('DUNGEON',215,y+54,36,true,250);
  dragons.forEach((d,i)=>{const x=43,sy=y+94+i*165,w=344,h=145;
   this.clipped(x,sy,w,h,()=>this.artNode(d.banner,x-w*[.2334,.2353,.2459][i],sy+h*[-.0207,-.0897,-.0276][i],w*1.2645,h*[1.0483,1.1379,1.0552][i]));
   const n=child(this.root!,'DragonBorder'),g=n.addComponent(Graphics);this.ui.position(n,x,sy,w,h);g.strokeColor=new Color(88,88,88);g.lineWidth=5;g.roundRect(-w/2,-h/2,w,h,19);g.stroke();
   this.label(d.name.toUpperCase(),151,sy+35,16,true,160);this.ui.rect(this.root!,'HP',64,sy+98,113,26,new Color(235,31,29),11);this.label('HP '+fmt(d.hp),120,sy+116,16,true,109);
   const clears=this.state.data.dungeon?.clears[d.id]??0;if(clears)this.label(clears+' WINS',354,sy+126,14,true,65);
   this.hit(x,sy,w,h,()=>{this.detail='dragon:'+d.id;this.render();});
  });
  const active=this.state.data.dungeon?.active;if(active)this.button('LEAVE CHALLENGE',85,y+610,260,46,async()=>{if(await this.run('LeaveDragon',{attemptId:active.id}))this.open('battle');});
 }
 private details(){
  if(this.detail==='reveal'){this.relicReveal();return;}
  this.buttons=[];this.ui.rect(this.root!,'ModalShade',0,0,430,this.h,new Color(5,15,27,215));const top=(this.h-570)/2;this.frame(25,top,380,570);
  const close=()=>{this.detail=null;this.render();};this.artNode('ui_icon_close__figma_2_121',366,top+17,23,23);this.hit(355,top+7,46,46,close);
  const relic=relicDefinitions.find(d=>d.id===this.detail),dragon=dragons.find(d=>'dragon:'+d.id===this.detail);
  this.label(relic?relic.name.toUpperCase():dragon?dragon.name.toUpperCase():'RELICS DISCOVERED',215,top+55,28,true,324);
  if(relic){const count=this.state.data.relics?.[relic.id]??0;this.artNode(relic.visualId,133,top+95,164,196);this.label('OWNED: '+count,215,top+339,24,true);this.label('+'+Math.min(20,count)*2+'% ALL HERO '+relic.stat.toUpperCase(),215,top+380,23,true,330);this.label('Each copy adds 2%, up to 40%.',215,top+419,15);}
  else if(dragon){const reward=dragonReward(dragon.id,this.state.data.dungeon?.clears[dragon.id]??0);this.artNode(dragon.visualId,90,top+75,250,232);this.label('DEFEAT IN 45 SECONDS',215,top+348,24,true);this.label('HP '+fmt(dragon.hp),215,top+388,28,true);this.label(fmt(reward.gold)+' GOLD · '+reward.gems+' GEMS',215,top+428,23);this.label(reward.orbs+' ORBS · FREE ENTRY',215,top+462,21);}
  else this.state.data.lastRelicOpen?.relicIds.forEach((id,i)=>{const d=relicDefinitions.find(d=>d.id===id)!;this.artNode(d.visualId,42+i%5*70,top+100+Math.floor(i/5)*158,62,99);this.label(d.name.toUpperCase(),73+i%5*70,top+220+Math.floor(i/5)*158,11,false,65);});
  this.button(dragon?'FIGHT!':'CONTINUE',70,top+487,290,65,async()=>{if(dragon){if(await this.run('StartDragon',{dragonId:dragon.id}))this.open('battle');}else close();});
 }
 private relicReveal(){
  this.buttons=[];this.ui.rect(this.root!,'ModalShade',0,0,430,this.h,new Color(5,15,27,215));
  const top=this.h*.18,height=this.h*.66,close=()=>{this.detail=null;this.render();};
  const panel=this.ui.rect(this.root!,'RelicsDiscovered',25,top,380,height,new Color(17,47,73),19),g=panel.getComponent(Graphics)!;
  g.strokeColor=new Color(218,196,138);g.lineWidth=2;g.roundRect(-190,-height/2,380,height,19);g.stroke();
  this.label('RELICS DISCOVERED',215,top+49,27,true,324);this.artNode('ui_icon_close__figma_2_121',378,top+17,15,15);this.hit(366,top+5,38,40,close);
  this.state.data.lastRelicOpen?.relicIds.forEach((id,i)=>{const d=relicDefinitions.find(d=>d.id===id)!;
   this.artNode(d.visualId,42+i%5*70,top+97+Math.floor(i/5)*144,62,99);this.label(d.name.toUpperCase(),73+i%5*70,top+215+Math.floor(i/5)*144,11,false,65);
  });
  this.label('BONUSES APPLIED TO YOUR HEROES',215,top+height-131,21,true,345);
  this.button('CONTINUE',70,top+height-76,290,65,close);
 }
 private gift(shop=false){
  const top=(this.h-435)/2,e=dailyEligibility(this.state,Date.now()),gold=shop?'1000':dailyGold(this.state);this.backButton();this.frame(51,top,328,435);
  this.label(shop?'FREE GOLD':'DAILY BONUS!',216,top+58,36,true,302);this.label(shop?'Watch a video to collect gold':e.available?'We give you daily bonus!':'Come back tomorrow!',216,top+100,24,true,302);
  this.artNode('reward_gold_chest__1254x1254_variant2',135,top+141,161,162);this.artNode('ui_button_gold__2378x1300',118,top+265,195,54);this.label('+'+gold,215.5,top+304,36,true,175);
  this.button(shop?'WATCH VIDEO':e.available?'GET FREE GOLD':'COLLECTED',70,top+343,291,78,async()=>{if(shop){await this.watchReward('freeCoins');return;}if(await this.run('ReserveDaily')){const period=this.state.data.daily.pendingPeriod;if(period!=null)await this.run('ClaimDaily',{period},'Daily gold saved.');}},shop||e.available);
 }
 sellHero(id:string){
  if(this.state.data.player.tutorialState!=='completed')return;
  this.saleHeroId=id;this.open('sellHero');
}
private saleScreen(){
  const h=this.state.data.heroes.find(h=>h.id===this.saleHeroId),close=()=>this.goBack();
  this.backButton(close);this.label('SELL HERO',215,103,44,true,310);
  if(!h){this.label('HERO ALREADY SOLD',215,260,27);this.button('BACK',75,350,280,65,close);return;}
  const top=Math.max(153,(this.h-530)/2),gold=heroSaleGold(this.state,h.id);
  this.frame(51,top,328,413);this.artNode(heroes.get(h.definitionId).visualId,132,top+18,166,168);
  this.label(heroNames[h.tier-1].toUpperCase(),215,top+207,27,true,295);
  this.label('TIER '+h.tier+' · '+(h.deployed?'IN BATTLE':'IN RESERVE'),215,top+239,20,true,290);
  this.label('+'+gold+' GOLD',215,top+290,39,true,290);
  this.label('Equipment stays in your inventory',215,top+330,17,false,300);
  this.label('This hero will be removed',215,top+367,19,false,290);
  this.button('CANCEL',51,top+430,153,64,close);
  this.button('SELL HERO',216,top+430,163,64,async()=>{if(await this.run('SellHero',{heroId:h.id,expectedGold:gold}))close();});
 }
 async watchReward(placement:RewardedPlacement,outcomeId=''){
  if(this.adBusy)return;this.adBusy=true;this.notice('LOADING VIDEO…');
  try{const result=await this.rewarded.claim(placement,outcomeId);
   this.toast=result==='claimed'?'REWARD ADDED':result==='cancelled'?'WATCH THE FULL VIDEO TO CLAIM':result==='unavailable'?'NO VIDEO AVAILABLE · TRY AGAIN LATER':'VIDEO COULD NOT FINISH · TRY AGAIN';
   if(result==='claimed'){this.art.sound('reward_claim_1');this.art.haptic('reward');}
  }finally{this.adBusy=false;this.refresh();}
 }
 offerStageBoost(boostId:string){
  if(this.isOpen||this.state.data.player.tutorialState!=='completed')return;
  const boost=this.state.data.stageBoosts?.[boostId];if(!boost)return;
  this.boostOffer?.destroy();this.boostId=boostId;this.offerUntil=boost.offerEndsAt;
  const n=this.boostOffer=child(this.parent,'BattleBonusOffer');
  this.ui.art(n,'ui_button_orange__2542x1359',85,240,260,51);
  this.ui.label(n,'BonusOffer','BOOST REWARD  ×1–10',215,265,24,Color.WHITE);
 }
 private async selectStageBoost(id:string){
  if(!await this.run('ReserveStageBoost',{boostId:id}))return;
  this.boostOffer?.destroy();this.boostOffer=null;this.boostId=id;this.open('stageReward');
 }
 private stageReward(){
  this.backButton();this.label('BATTLE BONUS',215,103,39,true,310);
  const boost=this.state.data.stageBoosts?.[this.boostId];if(!boost){this.label('NO PENDING REWARD',215,250,25);return;}
  const top=Math.max(168,(this.h-540)/2);this.frame(51,top,328,405);
  const wheel=this.artNode('wheel',112,top+31,206,206);this.label('MULTIPLIER ×'+boost.multiplier,215,top+278,32,true,300);
  this.label('+'+stageBoostAmounts(boost).bonus+' GOLD',215,top+331,40,true,300);
  this.button(boost.status==='claimed'?'REWARD ADDED':'WATCH & CLAIM',51,top+430,328,65,()=>{if(!this.wheelAnimating)return this.watchReward('stageBoost',boost.id);},boost.status!=='claimed');
  this.wheelAnimating=true;tween(wheel).by(BattleAssets.reducedMotion?.01:1.5,{angle:-1080},{easing:'cubicOut'}).call(()=>{this.wheelAnimating=false;this.art.sound('wheel_stop_1');}).start();
 }
 private daily(){this.gift();}
 private shop(){
  this.backButton();this.label('SHOP',215,103,48,true,290);
  this.artNode('currencyFrame',143,125,145,54);this.artNode('gold',154,136,32,32);this.label(fmt(this.state.data.currencies.gold),237,161,32,true,96);
  const saved=Object.values(this.state.data.stageBoosts??{}).find(b=>b.status==='reserved');if(saved)this.button('SAVED BATTLE BONUS',89,this.h-74,252,43,()=>{this.boostId=saved.id;this.open('stageReward');});
  const top=211+(this.h-932)*.25;this.frame(51,top,328,401);
  this.label('FREE COINS',215,top+58,36,true,302);this.artNode('goldPile',139,top+89,152,156);
  const amount=this.label('+1,000',215,top+277,48,true,296);amount.color=GOLD;
  this.label('GOLD',215,top+307,25,true,290);this.label('Every completed video earns 1,000 coins',215,top+351,15,false,295);
  const y=top+424;this.button('FREE COINS',51,y,328,65,()=>this.watchReward('freeCoins'));
  // Same simple video pictogram as the existing app's RewardViews.
  const n=child(this.root!,'VideoIcon'),g=n.addComponent(Graphics);this.ui.position(n,80,y+23);
  g.fillColor=Color.WHITE;g.roundRect(0,-18,24,18,4);g.fill();g.fillColor=new Color(89,49,38);g.moveTo(9,-4);g.lineTo(9,-14);g.lineTo(17,-9);g.close();g.fill();
 }
 private settings(){
  const s=this.state.data.settings,top=139,height=455;
  this.backButton();this.label('SETTINGS',215,103,48,true,318);this.frame(51,top,328,height);
  const slider=(key:'sfxGain'|'musicGain',title:string,y:number)=>{
   const titleLabel=this.label(title,167,y-21,23,false,170);titleLabel.horizontalAlign=Label.HorizontalAlign.LEFT;
   this.ui.rect(this.root!,'SliderTrack',82,y,266,8,new Color(255,248,248),4);
   const fill=child(this.root!,'SliderFill');
   const knob=child(this.root!,'SliderKnob');const g=knob.addComponent(Graphics);g.fillColor=new Color(255,128,0);g.circle(0,0,7.5);g.fill();this.ui.position(knob,82+s[key]*266,y+4);this.sliderVisuals.set(key,{fill,knob,y});
   const update=(x:number)=>{this.sliderKey=key;this.sliderValue=Math.max(0,Math.min(1,(x-82)/266));const v=this.sliderVisuals.get(key)!;this.ui.position(v.knob,82+266*this.sliderValue,v.y+4);this.art.preferences({...this.state.data.settings,[key]:this.sliderValue});const bucket=Math.round(this.sliderValue*10);if(bucket!==this.sliderBucket){this.sliderBucket=bucket;this.art.haptic('selection');if(key==='sfxGain')this.art.sound('ui_tick_1',.6);}};
   this.hit(72,y-17,286,44,()=>{});this.buttons[this.buttons.length-1].drag=update;
  };slider('sfxGain','Sound',top+81);slider('musicGain','Music',top+159);
  const toggle=(text:string,on:boolean,y:number,action:Button['action'])=>{const l=this.label(text,178,y+6,23,false,192);l.horizontalAlign=Label.HorizontalAlign.LEFT;
   this.ui.rect(this.root!,'Toggle',306,y-11,42,22,new Color(255,248,248),11);const n=child(this.root!,'ToggleKnob');const g=n.addComponent(Graphics);g.fillColor=on?new Color(255,128,0):new Color(143,72,0);g.circle(0,0,7);g.fill();this.ui.position(n,on?337:317,y);this.hit(72,y-22,286,44,action);};
  toggle('Vibration',s.haptics,top+227,()=>this.run('UpdateSettings',{settingsRevision:s.revision??0,patch:{haptics:!s.haptics}}));toggle('Notifications',s.notifications,top+281,async()=>{const result=await NativeServices.request('notifications',{enabled:!s.notifications});if(result.status==='ok'){await this.run('UpdateSettings',{settingsRevision:this.state.data.settings.revision??0,patch:{notifications:!!result.enabled}});if(!s.notifications&&!result.enabled)this.notice('ALLOW NOTIFICATIONS IN YOUR DEVICE SETTINGS');}else this.notice('NOTIFICATIONS ARE UNAVAILABLE ON THIS DEVICE');});
  this.legalLinks(top+height-28);
  this.label('HOW TO PLAY',215,top+height+45,20,true,256);this.hit(87,top+height+15,256,50,()=>{this.open('battle');this.help();});
 }
 private legalLinks(y:number){this.label('Terms Of Use',126,y,16,false,108);this.label('Privacy Policy',302,y,16,false,110);(['terms','privacy'] as const).forEach((kind,i)=>this.hit(i?251:77,y-25,105,44,()=>this.open(kind),true));}
 private legal(kind:'terms'|'privacy'){
  this.backButton();this.label(kind==='terms'?'TERMS OF USE':'PRIVACY POLICY',215,103,kind==='terms'?38:34,true,330);
  this.label('MERGE HEROES UNITE WAR · UPDATED SEPTEMBER 14, 2026',215,132,12,false,390);
  const terms=[
   ['AGREEMENT','These terms govern your use of Merge Heroes Unite War. By playing, you accept them. The game is for users aged 18 or older and for personal entertainment.'],
   ['GAME AND VIRTUAL ITEMS','You may recruit and merge heroes, equip items, fight computer-controlled enemies and earn virtual rewards. Gold, gems, equipment and rewards have no real-world monetary value and cannot be withdrawn, transferred or redeemed for money, cryptocurrency or goods.'],
   ['NO GAMBLING OR PURCHASES','This is a merge-and-battle entertainment game, not gambling. It offers no cash prizes or real-money wagering. The current version has no paid in-app purchases.'],
   ['REWARDED VIDEO','Optional rewarded advertisements may grant virtual items only after the advertising provider confirms the full video was completed. Closing, cancelling or failing to load a video grants nothing. Ordinary gameplay does not require ads.'],
   ['SAVES AND AVAILABILITY','Progress is stored locally on your device without an account or cloud backup. Clearing app data or uninstalling can remove progress. Features, balance and online services may change and uninterrupted availability is not guaranteed.'],
   ['ACCEPTABLE USE','Do not exploit defects, cheat, interfere with the service, distribute unauthorized modified copies or use the game unlawfully. Game code and media belong to their owners or licensors.'],
   ['WARRANTIES AND CONTACT','The game is supplied as available. Liability is limited to the extent permitted by law without removing rights that cannot legally be excluded. Current developer contact details are on the application store listing or developer profile.']
  ];
  const privacy=[
   ['LOCAL GAME DATA','No account registration is required. Progress, currency, heroes, equipment, reward receipts and preferences are stored locally on your device. We do not operate an account or cloud-save backend.'],
   ['ANALYTICS','AppMetrica may process launches, screens, gameplay events, app and operating-system versions, device model, language, SDK identifiers, IP-derived region, session timing and crash diagnostics. Precise location is disabled. The full save and contact lists are not sent as custom analytics events.'],
   ['OPTIONAL ADVERTISING','Start.io supplies rewarded video only when you request a reward. Its SDK may process device and advertising identifiers, IP address, app/device characteristics and ad interactions for delivery, measurement and fraud prevention. No completion means no reward.'],
   ['NOTIFICATIONS AND SUPPORT','Notifications are optional, scheduled locally and can be disabled in system settings. If you contact support, information you choose to send is used to answer you. Current contact channels are on the store listing.'],
   ['NO PAYMENT DATA','The current game has no paid in-app purchases and does not collect card details. Virtual currency and items cannot be cashed out.'],
   ['USE, SHARING AND RETENTION','Information supports gameplay, diagnostics, analytics, requested ads and support. SDK providers process data under their own policies and may operate internationally. Local saves remain until removed or normally replaced; provider records follow provider settings and applicable law.'],
   ['YOUR CHOICES','You can control device permissions and advertising identifiers, change app settings, clear local data or stop using the app. Applicable law may provide access, correction, deletion, objection or consent-withdrawal rights. The game is not directed to children.'],
   ['PROVIDER POLICIES','AppMetrica: yandex.com/legal/confidential/   Start.io: start.io/policy/privacy-policy/']
  ];
  const sections=kind==='terms'?terms:privacy,top=148,bottom=this.h-27,line=19;
  let y=top+13;const rows:{text:string;y:number;size:number;color:Color;bold:boolean}[]=[];
  const wrap=(value:string,max=46)=>{const words=value.split(/\s+/),lines:string[]=[];let current='';for(const word of words){if(current&&current.length+word.length+1>max){lines.push(current);current=word;}else current+=(current?' ':'')+word;}if(current)lines.push(current);return lines;};
  for(const [heading,body] of sections){rows.push({text:heading,y,size:18,color:GOLD,bold:true});y+=25;for(const lineText of wrap(body)){rows.push({text:lineText,y,size:15,color:Color.WHITE,bold:false});y+=line;}y+=15;}
  const viewportH=bottom-top,contentH=Math.max(viewportH,y-top+20);
  this.scrollMax=Math.max(0,contentH-viewportH);
  const mask=child(this.root!,'LegalViewport');setSize(mask,398,viewportH);this.ui.position(mask,16,top,398,viewportH);mask.addComponent(Mask).type=Mask.Type.GRAPHICS_RECT;
  const inner=child(mask,'LegalContent');this.scrollNode=inner;this.scrollBase.set(0,0,0);
  const panel=child(inner,'LegalPanel'),g=panel.addComponent(Graphics);g.fillColor=new Color(10,31,51,245);g.roundRect(-199,viewportH/2-contentH,398,contentH,14);g.fill();
  for(const row of rows){const n=child(inner,'LegalText');n.setPosition(0,top+viewportH/2-row.y);const l=makeLabel(n,row.bold?this.art.bold:this.art.font,row.text,row.size,row.color);setSize(n,368,row.size+8);l.horizontalAlign=Label.HorizontalAlign.LEFT;l.overflow=Label.Overflow.SHRINK;l.enableWrapText=false;}
  this.label('SWIPE TO READ',215,this.h-7,11,false,180);
 }
 private startScreen(){
  this.artNode('branding_logo__1448x1086_variant2',65,49,300,238);this.artNode('branding_hero_collage__1536x1024',19,365+(this.h-932)*.4,392,262);
  this.button("LET'S PLAY",51,this.h-227,328,78,()=>{NativeServices.initialize();this.open('battle');},true,true);
  this.label('By tapping “Let’s Play” you confirm that',215,this.h-110,18,false,328);this.label('you are 18+ and accept',215,this.h-85,18,false,328);this.legalLinks(this.h-55);
 }
 private boost(){this.backButton();this.label('AUTO MERGE',215,110,32,true);const a=this.state.data.autoMerge,active=a.entitlementId!==null&&(a.expiresAtUtcMs??0)>Date.now();
  this.panel(30,196,370,this.h-347);this.artNode('snowflake',147,247,136,138);this.text('AUTOMATIC MERGING',215,434,29,GOLD);this.text('MERGES MATCHING HEROES',215,479,21);this.text('60 MINUTES · 100 GOLD',215,515,23);
  if(active)this.text(Math.max(0,Math.ceil(((a.expiresAtUtcMs??0)-Date.now())/60000))+' MINUTES LEFT',215,556,21);
  this.button(active?(a.enabled?'PAUSE':'RESUME'):'ACTIVATE',99,598,232,64,()=>active?this.run('SetAutoMerge',{enabled:!a.enabled}):this.run('ActivateAutoMerge',{},'AUTO MERGE ENABLED'));
 }
 private wheel(){
  this.backButton();this.label('WHEEL OF LUCK',216,94,24,true,290);this.timerLabel=this.label('',215,124,12,false,360);this.timerSecond=-1;this.update();
  const buttonY=this.h-162,top=Math.min(296+(this.h-932)/2,buttonY-377),left=51,w=this.state.data.wheel,p=w.pendingSpin,pending=p?.status==='reserved',sectors=wheelSectors(pending?p.outcomeId:undefined);
  const rotating=child(this.root!,'WheelSectors');this.ui.position(rotating,left+164,top+176.9);const old=this.root;this.root=rotating;
  const circle=spriteNode(rotating,'Sectors',this.art.frame('ui_wheel_sectors__figma_2_634'),273.6647,273.8134);circle.setPosition(0,0);
  const labels=[[-1,169.49,95.89,92.84,14.155],[6,164.36,255.24,-90,14],[7,121.865,249.30,-60.39,14.155],[1,206.05,102.24,119.61,14.155],[8,90.069,217.47,-29.73,14.155],[2,237.53,134.03,150.27,14.155],[9,79.835,175.70,-.14,14.155],[3,248.69,175.83,179.86,14.155],[10,90.93,133.845,29.67,14.155],[4,235.545,217.70,-150.33,14.155],[11,122.546,102.40,60.38,14.155],[5,205.869,249.54,-119.62,14.155],[0,156.42,92.846,92.84,11.796]];
  labels.forEach(([i,x,y,angle,size])=>{const grant=sectors[i]?.grants[0],text=i===-1?'MEGA WIN!':grant?.kind==='freeSpin'?grant.amount+' FREE SPINS':grant?Number(grant.amount).toLocaleString('en-US').replace(/,/g,' '):'FAIL',l=this.label(text,215,this.h/2,size,true,125);l.node.setPosition(x-164,176.9-y);l.node.angle=-angle;});this.root=old;
  this.artNode('ui_frame_purple_orb__1428x1440',left+134,top+140,59.49,59.49);this.artNode('ui_wheel_outer_ring__1940x1924',left-7,top+10,341,341);this.artNode('ui_icon_blue_triangle__1484x1322',left+131,top,66,59);
  if(pending){rotating.angle=-wheelLandingAngle(p.outcomeId);const result=wheelSegment(p.outcomeId);this.label(result.grants.length?result.grants.map(g=>fmt(g.amount)+' '+(g.kind==='freeSpin'?'SPINS':'GOLD')).join(' · '):'BETTER LUCK NEXT TIME',215,buttonY-43,28,true,350);
   this.button(result.grants.length?'WATCH & CLAIM':'CONTINUE',58,buttonY,314,61.34,()=>result.grants.length?this.watchReward('wheel',p.id):this.run('DismissEmptySpin',{spinId:p.id}));
  }else{const eligible=Date.now()>=w.nextFreeAt||w.freeSpins>0;this.button('FREE SPIN',58,buttonY,314,61.34,async()=>{
    this.wheelAnimating=true;if(await this.run('ReserveSpin')){const selected=this.state.data.wheel.pendingSpin!;let sector=-1;tween(rotating).to(BattleAssets.reducedMotion?.01:2.8,{angle:-(1080+wheelLandingAngle(selected.outcomeId))},{easing:'cubicOut',onUpdate:()=>{const next=Math.floor(Math.abs(rotating.angle)/30);if(next!==sector){sector=next;this.art.sound('ui_tick_1',.5);}}}).call(()=>{this.art.sound('wheel_stop_1');this.art.haptic('light');this.wheelAnimating=false;this.render();}).start();}else{this.wheelAnimating=false;this.render();}
   },eligible);}
 }
 dispose(){this.boostOffer?.destroy();this.wheelAttention?.dispose();this.shopShine?.dispose();this.root?.destroy();this.root=null;}
}
