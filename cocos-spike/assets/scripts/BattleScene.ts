import { _decorator, Camera, Canvas, Color, Component, Game, game, Graphics, Label, Layers, Node,
    ResolutionPolicy, Sprite, sys, tween, Tween, UIOpacity, UITransform, Vec3, view } from 'cc';
import { ActorView } from './ActorView';
import { BattleAssets } from './BattleAssets';
import { BattleEvent, BattleModel, CONFIG, Hero } from './BattleModel';
import { BattleInput, BoardGesture } from './BattleInput';
import { MetaScreens } from './MetaScreens';
import { CONTENT } from './BattleContent';
import { FeedbackPool } from './FeedbackPool';
import { RewardCounter, RewardCurrency } from './RewardCounter';
import { TutorialGuide } from './TutorialGuide';
import { BATTLE_PANEL_TOP, BATTLE_ROW_GAP, BATTLE_SLOT_TOP, battleBoardTop, battleBoostTop, insideBattle } from './BattleLayout';
import { BonusAttention, ShopShine } from './BonusAttention';
import { redDots } from './core/selectors/RedDots';
import { bossReadiness } from './core/content/HuntConfig';
import { BoardFeedback, TileTone } from './BoardFeedback';
import { formatAmount } from './core/selectors/NumberFormatter';
import { checkMerge } from './core/systems/MergeRules';
import { heroes as catalog, mergeRules } from './core/content/PlayableConfig';
import { child, makeLabel, SceneUI, setSize, spriteNode } from './SceneUI';

const { ccclass } = _decorator;

@ccclass('BattleScene')
export class BattleScene extends Component {
    private meta!: MetaScreens; private metaGesture = false;
    private tutorial!:TutorialGuide;private tutorialGesture=false;
    private wheelAttention!:BonusAttention;private dailyAttention!:BonusAttention;
    private shopShine!:ShopShine;
    private bonusRevision=-1;private bonusSecond=-1;
    private anchors:Vec3[]=[];
    private huntInfo!:Label;private huntDetail!:Label;private progressionRevision=-1;
    private readiness=0;private huntWave=1;
    private battleHeroes = new Map<number, ActorView>();
    private slots: Node[] = [];
    private gems!: Label;
    private assets = new BattleAssets();
    private model = new BattleModel(e => this.event(e));
    private ui!: SceneUI;
    private canvasNode!: Node;
    private world!: Node;
    private board!: Node;
    private hud!: Node;
    private fx!: FeedbackPool;
    private rewards = new RewardCounter();
    private enemy!: ActorView;
    private heroes = new Map<number, ActorView>();
    private tags = new Map<number, Label>();
    private guides!: BoardFeedback;
    private picked: number | null = null;
    private ghostTarget = new Vec3(); private ghostTag!: Label;
    private hovered = ''; private pointerX = 0; private pointerY = 0;
    private dropOrigin: {id:number;from:Vec3;slot:number|null} | null = null;
    private displayedHp = -1;private hintSeconds=3;private hintBackground!:Node;

    private controls!: BattleInput;
    private ghost!: Node;
    private draggingHeroId: number | null = null;
    private tapAction: 'buy' | null = null;
    private wave!: Label;
    private capacity!: Label;
    private gold!: Label;
    private price!: Label; private sidePrices:Label[]=[];
    private hint!: Label;
    private stage!: Label;
    private hp!: Label;
    private hpFill!: Node;
    private progress!: Node;
    private buyButton!: Node;
    private ready = false;
    private paused = false;
    private boardTop = 541;private readonly boardRowGap=BATTLE_ROW_GAP;private pickedSeconds=0;
    private worldHero = new Vec3();
    private worldEnemy = new Vec3();
    private frameBins = new Uint32Array(201);
    private frameCount = 0;
    private frameElapsed = 0;
    private maxFrame = 0;
    private measuredSeconds = 0;

    async start(): Promise<void> {
        game.frameRate = 60;
        view.setDesignResolutionSize(430, 932, ResolutionPolicy.FIXED_WIDTH);
        const h = view.getVisibleSize().height;
        this.boardTop = battleBoardTop(h);
        const stageCanvas = child(this.node.scene, 'BattleCanvas'); setSize(stageCanvas, 430, h);
        const canvas = stageCanvas.addComponent(Canvas);
        const cameraNode = new Node('BattleCamera'); this.node.scene.addChild(cameraNode); cameraNode.setPosition(0, 0, 1000);
        const camera = cameraNode.addComponent(Camera); camera.projection = Camera.ProjectionType.ORTHO;
        camera.orthoHeight = h / 2; camera.near = .1; camera.far = 2000;
        camera.visibility = Layers.Enum.UI_2D; camera.clearFlags = Camera.ClearFlag.SOLID_COLOR;
        camera.clearColor = new Color(61, 117, 167); canvas.cameraComponent = camera;
        this.canvasNode = child(stageCanvas, 'GameContent'); setSize(this.canvasNode, 430, h);
        game.on(Game.EVENT_HIDE, this.hide, this); game.on(Game.EVENT_SHOW, this.show, this);
        try {
            await this.model.init();
            await this.assets.init(this.canvasNode);
            if (!this.isValid) return;
            if (sys.isNative && sys.os === sys.OS.IOS) {
                // Keep the existing Figma proportions and input coordinates while
                // fitting every screen below the notch and above the home indicator.
                // Background art still covers the entire display.
                const safe = sys.getSafeAreaRect(false);
                const top = Math.max(0, h - safe.y - safe.height), bottom = Math.max(0, safe.y);
                const scale = Math.min(1, safe.width / 430, (h - top - bottom - 8) / h);
                this.canvasNode.setScale(scale, scale, 1);
                this.canvasNode.setPosition(safe.x + safe.width / 2 - 215, (bottom - top) / 2);
                console.log('[cocos-spike] safe-area', JSON.stringify({top, bottom, scale}));
            }
            this.ui = new SceneUI(this.canvasNode, this.assets, h);
            this.assets.preferences(this.model.snapshot.data.settings); this.buildScreen(); this.syncHeroes(); this.refresh(); this.ready = true;
            this.meta = new MetaScreens(this.canvasNode, this.ui, this.assets, this.model, () => {
                this.clearDrag(); this.rewards.clear(); this.syncHeroes(); this.refresh();
            },()=>this.tutorial.startReplay());
            this.tutorial=new TutorialGuide(this.canvasNode,this.ui,this.assets,this.model,this.boardTop);
            this.controls = new BattleInput(camera, this.canvasNode.getComponent(UITransform)!, h, {
                begin: (x, y) => this.beginGesture(x, y), drag: (g, x, y) => this.dragGesture(g, x, y),
                end: (g, x, y, moved) => this.endGesture(g, x, y, moved), pointerMove:(x,y)=>{if(this.metaGesture)this.meta.move(x,y);}, cancel: () => {this.clearDrag();this.meta?.cancel();},
            });
            this.meta.open('start');
            console.log('[cocos-spike] ready', JSON.stringify({ build: '1.8', width: 430, height: h, gold: this.model.gold,
                price: this.model.price, capacity: this.model.capacity, audio: this.assets.audio.size }));
        } catch (err) { console.error('[cocos-spike] startup failed', String(err)); const n = child(this.canvasNode, 'StartupError'); setSize(n, 400, 200); makeLabel(n, this.assets.bold, 'COULD NOT LOAD GAME\n' + String(err), 18); }
    }
    private buildScreen(): void {
        const u = this.ui, h = u.height, dy = h - 940;
        u.background(this.canvasNode,this.assets.background,1.16,.07);
        const abilityLayer=child(this.canvasNode,'BattleAbilities');
        this.world = child(this.canvasNode, 'World');
        const enemyLayer = child(this.world, 'EnemyLayer'), heroLayer = child(this.world, 'HeroBattleLayer');
        // Five logical anchors remain; the unwanted battlefield pad art is gone.
        // Deployed heroes share the visible arena baseline. The former staggered
        // anchors placed their feet over the sky on tall screens.
        // Combat actors keep their established ground line while every control
        // and merge element below them moves into the lower content region.
        const battleGroundY=this.boardTop-57;
        const actorCenterY=(boxHeight:number)=>battleGroundY-boxHeight/2+3;
        this.anchors=Array.from({length:5},(_,i)=>new Vec3([55,123,191,89,157][i]-215,h/2-actorCenterY(62)));
        enemyLayer.setSiblingIndex(this.world.children.length - 1); heroLayer.setSiblingIndex(this.world.children.length - 1);
        this.worldHero.set(this.anchors[0]);
        this.worldEnemy.set(346 - 215, h / 2 - actorCenterY(104), 0);
        this.enemy = new ActorView(enemyLayer, this.assets.prefabs.get('Enemy')!, this.assets.frame(this.model.enemy.art), 116, 104);
        this.enemy.node.setPosition(this.worldEnemy); this.enemy.idle();
        this.board = child(this.canvasNode, 'HeroBoard');
        const panelTop=this.boardTop+BATTLE_PANEL_TOP;
        u.rect(this.board, 'BoardTint', 0, panelTop, 430, h-panelTop, new Color(47, 56, 155, 140));
        for (let i = 0; i < 15; i++) {
            const n = u.art(this.board, 'slot', 19 + i % 5 * 83, this.boardTop + Math.floor(i / 5) * this.boardRowGap + BATTLE_SLOT_TOP, 60, 46);
            this.slots.push(n); n.addComponent(UIOpacity).opacity = i < this.model.unlockedSlots ? 255 : 105;
        }
        this.guides = new BoardFeedback(this.board);
        this.hud = child(this.canvasNode, 'HUD');
        this.fx = new FeedbackPool(child(this.canvasNode,'BattleFeedback'),this.assets);
        u.art(this.hud, 'currencyFrame', 61, 18, 145, 54); u.art(this.hud, 'currencyFrame', 225, 17, 145, 54);
        u.art(this.hud, 'gold', 72, 29, 32, 32); u.art(this.hud, 'gem', 236, 28, 32, 32);
        this.gold = u.label(this.hud, 'Gold', '', 156, 45, 32); this.gems = u.label(this.hud, 'Gems', '0', 320, 44, 32);
        this.wheelAttention=new BonusAttention(u.art(this.hud, 'wheel', 108, 86, 53, 53)); u.art(this.hud, 'settings', 269, 86, 53, 53);
        u.art(this.hud, 'track', 73, 189, 284, 34);
        this.progress = u.art(this.hud, 'progress', 145, 195, 141, 22);
        this.progress.getComponent(UITransform)!.setAnchorPoint(0, .5); this.progress.setPosition(145 - 215, this.progress.position.y);
        u.art(this.hud, 'stage', 26, 183, 42, 45); u.art(this.hud, 'bossFrame', 362, 179, 54, 54); u.art(this.hud, 'boss', 368, 185, 42, 42);
        u.label(this.hud, 'StageLabel', 'STAGE', 98, 179, 16); this.stage = u.label(this.hud, 'Stage', '1-1', 103, 204, 26);
        this.wave = u.label(this.hud, 'Wave', '', 313, 204, 21);
        this.capacity = u.label(this.hud, 'DeploymentCapacity', 'BATTLE 0/1', 215, 245, 17);
        this.huntInfo=u.label(this.hud,'HuntStatus','',215,245,17,new Color(255,235,176));setSize(this.huntInfo.node,390,27);
        this.huntDetail=u.label(this.hud,'HuntDetail','',215,268,14,new Color(240,249,255));setSize(this.huntDetail.node,400,24);
        const boostY = battleBoostTop(h);
        u.art(abilityLayer, 'hourglass', 66, boostY, 47, 48); u.art(abilityLayer, 'snowflake', 191, boostY, 47, 48); this.dailyAttention=new BonusAttention(u.art(abilityLayer, 'goldPile', 316, boostY, 47, 48));
        const buyY = h - 171;
        for (const x of [99, 263]) {
            const frame = u.art(this.hud, 'buyFrame', x, buyY + 9, 68, 60); frame.addComponent(UIOpacity).opacity = 150;
            const tier=x===99?2:3;u.art(this.hud, 'hero'+tier, x+13,buyY+12,43,41);u.art(this.hud,'gold',x+11,buyY+50,15,16);this.sidePrices.push(u.label(this.hud,'OfferPrice','',x+43,buyY+59,17));
        }
        this.buyButton = u.art(this.hud, 'buyFrame', 172, buyY, 86, 77);
        u.art(this.hud, 'hero', 189, buyY + 7, 52, 48);
        u.art(this.hud, 'gold', 188, buyY + 51, 20, 21); this.price = u.label(this.hud, 'PurchasePrice', '', 226, buyY + 61, 23);
        const nav = ['shop', 'heroes', 'battle', 'dungeon', 'relic'] as const;
        nav.forEach((id, i) => { u.art(this.hud, i === 2 ? 'navBlue' : 'navDark', 7 + i * 84, h - 85, 79, 80);
            const icon=u.art(this.hud, id, 18 + i * 84, h - 76, 58, 60);if(i===0)this.shopShine=new ShopShine(icon); });
        this.hintBackground=u.rect(this.hud, 'HintBackground', 9, battleGroundY - 100, 412, 25, new Color(15, 34, 52, 225), 8);
        this.hint = u.label(this.hud, 'InteractionHint', 'TAP TO DEPLOY · DRAG TO MERGE · HOLD TO SELL', 215, battleGroundY - 88, 15, new Color(255, 243, 195));
        const enemyHpTop=battleGroundY-112;
        u.rect(this.hud, 'EnemyHpTrack', 303, enemyHpTop, 86, 7, new Color(46, 56, 62), 3);
        this.hpFill = u.rect(this.hud, 'EnemyHp', 305, enemyHpTop+2, 82, 3, new Color(126, 231, 96), 1);
        this.hp = u.label(this.hud, 'EnemyHpValue', '40 / 40', 346, enemyHpTop-13, 16);
        this.ghost = spriteNode(this.hud, 'DragPreview', this.assets.hero(1), 72, 70); this.ghost.active = false;
        const tag=child(this.ghost,'DragTier');setSize(tag,90,26);tag.setPosition(0,45);this.ghostTag=makeLabel(tag,this.assets.bold,'',16,new Color(255,231,145));
    }
    private reservePosition(slot: number): Vec3 {
        return new Vec3(49 + slot % 5 * 83 - 215, this.ui.height / 2 - this.boardTop - Math.floor(slot / 5) * this.boardRowGap - BATTLE_SLOT_TOP - 2, 0);
    }
    private syncHeroes(popId = -1): void {
        for (const [id, v] of this.heroes) {
            if (!this.model.heroes.some(h => h.id === id)) { v.dispose(); this.heroes.delete(id); this.tags.delete(id); }
        }
        for (const hero of this.model.heroes) {
            let v = this.heroes.get(hero.id); const created = !v;
            if (!v) {
                v = new ActorView(this.board, this.assets.prefabs.get('Hero')!, this.assets.hero(hero.tier), 53, 51);
                this.heroes.set(hero.id, v);
                const tag = child(v.node, 'Tier'); setSize(tag, 48, 24); tag.setPosition(0, -24);
                this.tags.set(hero.id, makeLabel(tag, this.assets.bold, '', 16));
                v.idle();
            }
            v.setFrame(this.assets.hero(hero.tier));
            const origin=this.dropOrigin?.id===hero.id&&this.dropOrigin.slot===hero.slot?this.dropOrigin.from:undefined;
            v.moveTo(this.reservePosition(hero.slot),!created,origin);if(origin)this.dropOrigin=null;
            this.tags.get(hero.id)!.string = String(hero.tier) + (hero.deployed ? ' •' : '');
            this.tags.get(hero.id)!.color = hero.deployed ? new Color(139, 255, 150) : new Color(255, 225, 110);
            if (hero.id === popId) v.pop();
        }
        const active = this.model.deployedHeroes;
        for (const [id, v] of this.battleHeroes) if (!active.some(h => h.id === id)) {v.dispose();this.battleHeroes.delete(id);}
        active.forEach((hero, i) => {
            let v = this.battleHeroes.get(hero.id);
            if (!v) {v = new ActorView(this.world.getChildByName('HeroBattleLayer')!, this.assets.prefabs.get('Hero')!, this.assets.hero(hero.tier), 62, 62); this.battleHeroes.set(hero.id,v);v.node.setPosition(this.reservePosition(hero.slot));v.idle();}
            const position=this.anchors[i];
            const origin=this.dropOrigin?.id===hero.id&&this.dropOrigin.slot===null?this.dropOrigin.from:undefined;
            v.moveTo(position,true,origin);if(origin)this.dropOrigin=null;
            v.setFrame(this.assets.hero(hero.tier)); if (hero.id === popId) v.pop();
        });
        this.fx.roster(new Set(active.map(h=>h.id)));
        if(this.picked!==null){const hero=this.model.heroes.find(h=>h.id===this.picked);if(hero)this.configureGuides(hero);else this.controls?.cancel();}
        this.slots.forEach((n,i) => {n.getComponent(UIOpacity)!.opacity = this.model.snapshot.data.board[i].unlocked ? 255 : 105;});
    }
    private rawSlotAt(x: number, y: number): number | null {
        if(x<7||x>423||y<this.boardTop+BATTLE_PANEL_TOP||y>this.boardTop+this.boardRowGap*2+BATTLE_SLOT_TOP+46)return null;
        const row=Math.max(0,Math.min(2,Math.round((y-this.boardTop-BATTLE_SLOT_TOP-23)/this.boardRowGap)));
        const i=Math.floor((x-7)/83)+row*5;
        return i>=0&&i<15?i:null;
    }
    private slotAt(x:number,y:number):number|null {const i=this.rawSlotAt(x,y);return i!==null&&this.model.snapshot.data.board[i].unlocked?i:null;}
    private tone(hero:Hero,slot:number):TileTone {
        const other=this.model.atSlot(slot);
        if(!this.model.snapshot.data.board[slot].unlocked)return 'blocked';
        if(!other)return 'empty';if(other.id===hero.id)return 'source';
        return checkMerge(this.model.snapshot,'hero_'+hero.id,'hero_'+other.id,mergeRules,catalog).ok?'merge':'blocked';
    }
    private configureGuides(hero:Hero):void {
        this.guides.show(this.model.snapshot.data.board.map((slot,i)=>({position:this.reservePosition(i).add(new Vec3(0,-26)),tone:this.tone(hero,i)})),new Vec3(this.worldHero.x,this.worldHero.y-39),hero.deployed||this.model.deployedHeroes.length<this.model.capacity);
    }
    private pick(hero:Hero,fromWorld:boolean):{heroId:number;fromWorld:boolean} {
        this.clearDrag();this.dropOrigin=null;this.picked=hero.id;this.pickedSeconds=0;this.configureGuides(hero);this.assets.sound('ui_soft_1',.7);this.assets.haptic('selection');
        return {heroId:hero.id,fromWorld};
    }
    private inBattle(x: number, y: number): boolean { return insideBattle(x,y,this.boardTop); }
    private inBuy(x: number, y: number): boolean { return x > 165 && x < 265 && y > this.ui.height - 179 && y < this.ui.height - 86; }
    private beginGesture(x: number, y: number): { heroId: number; fromWorld: boolean } | null {
        this.tapAction = null;
        if (!this.ready || this.paused) return null;
        this.tutorialGesture=!this.meta.isOpen&&this.tutorial.begin(x,y);if(this.tutorialGesture)return null;
        this.metaGesture = this.meta.begin(x, y); if (this.metaGesture) return null;
        if (this.inBuy(x, y)) { this.tapAction = 'buy'; return null; }
        const slot = this.slotAt(x, y), hero = slot === null ? undefined : this.model.atSlot(slot);
        if (hero) return this.pick(hero,false);
        for (const [id, actor] of this.battleHeroes) if (Math.abs(x - actor.node.position.x - 215) < 48 && Math.abs(y - (this.ui.height / 2 - actor.node.position.y)) < 55) return this.pick(this.model.heroes.find(h=>h.id===id)!,true);
        return null;
    }
    private dragGesture(g: BoardGesture, x: number, y: number): void {
        const hero=this.model.heroes.find(h=>h.id===g.heroId);if(!hero){this.controls.cancel();return;}
        this.draggingHeroId=hero.id;this.pointerX=x;this.pointerY=y;
        this.ghost.getComponent(Sprite)!.spriteFrame=this.assets.hero(hero.tier);this.ghostTag.string='TIER '+hero.tier;
        this.ghostTarget.set(x-215,this.ui.height/2-y+28,0);
        if(!this.ghost.active){this.ghost.active=true;this.ghost.setPosition(this.ghostTarget);this.ghost.setScale(.96,.96,1);}
        const actor=g.fromWorld?this.battleHeroes.get(hero.id):this.heroes.get(hero.id);
        if(actor)(actor.node.getComponent(UIOpacity)||actor.node.addComponent(UIOpacity)).opacity=85;
        const slot=this.rawSlotAt(x,y),battle=slot===null&&this.inBattle(x,y),allowed=hero.deployed||this.model.deployedHeroes.length<this.model.capacity;
        const tone=slot!==null?this.tone(hero,slot):battle&&allowed?'empty':'blocked';
        const dest=slot!==null?this.reservePosition(slot).add(new Vec3(0,-26)):battle?new Vec3(this.worldHero.x,this.worldHero.y-39):null;
        this.guides.aim(slot??(battle?15:-1),this.ghost.position,dest,tone);
        const key=(slot??(battle?'battle':'outside'))+':'+tone;
        if(key!==this.hovered){
            this.hovered=key;if(tone==='merge'||tone==='empty')this.assets.sound('ui_soft_1',.3);
            this.message(tone==='merge'?'MERGE · TIER '+hero.tier+' → '+(hero.tier+1):tone==='source'?'RETURN TO SLOT':tone==='empty'?(battle?'DROP TO DEPLOY':'DROP TO MOVE'):slot!==null&&!this.model.snapshot.data.board[slot].unlocked?'SLOT LOCKED':battle?'BATTLE FULL · RECALL A HERO':slot!==null?'MATCH HEROES OF THE SAME TIER':'DRAG TO A GLOWING SLOT');
        }
    }
    private clearDrag(): void {
        for(const collection of [this.heroes,this.battleHeroes])for(const actor of collection.values()){const opacity=actor.node.getComponent(UIOpacity);if(opacity)opacity.opacity=255;}
        this.draggingHeroId=null;this.picked=null;this.hovered='';this.guides?.clear();
        if(this.ghost){Tween.stopAllByTarget(this.ghost);this.ghost.active=false;this.ghost.angle=0;this.ghost.setScale(1,1,1);}
    }
    private returnGhost(hero:Hero,fromWorld:boolean,from:Vec3):void {
        const to=fromWorld?this.battleHeroes.get(hero.id)?.node.position:this.reservePosition(hero.slot);if(!to)return;
        this.assets.sound('ui_error_1',.7);this.assets.haptic('error');
        if(BattleAssets.reducedMotion)return;
        this.ghost.active=true;this.ghost.setPosition(from);this.ghost.setScale(1.08,1.08,1);
        tween(this.ghost).to(.18,{position:to.clone(),scale:new Vec3(.8,.8,1),angle:0},{easing:'quadOut'}).call(()=>{this.ghost.active=false;}).start();
    }
    private endGesture(g: BoardGesture | null, x: number, y: number, moved: boolean): void {
        const released=this.ghost?.active?this.ghost.position.clone():null;
        this.clearDrag(); const action = this.tapAction; this.tapAction = null;
        if (!this.ready || this.paused) return;
        if(this.tutorialGesture){this.tutorialGesture=false;this.tutorial.end(x,y,moved);return;}
        if (this.metaGesture) {this.metaGesture = false; this.meta.end(x, y, moved);return;}
        if (!g) {
            if (!moved && action === 'buy' && this.inBuy(x, y)) {
                const error = this.model.buy(); if (error) this.message(error);
                Tween.stopAllByTarget(this.buyButton); this.buyButton.setScale(.94, .94, 1);
                tween(this.buyButton).to(.16, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).start();
            }
            return;
        }
        const hero = this.model.heroes.find(h => h.id === g.heroId); if (!hero) return;
        let error: string | null = null;
        if (!moved) {
            if(this.pickedSeconds>=.55&&this.model.snapshot.data.player.tutorialState==='completed'){this.meta.sellHero('hero_'+hero.id);return;}
            if (hero.deployed) this.model.withdraw(hero.id); else error = this.model.deploy(hero.id);
        } else {
            const raw=this.rawSlotAt(x,y),slot=this.slotAt(x,y),battle=raw===null&&this.inBattle(x,y);
            const allowed=raw!==null?this.tone(hero,raw)!=='blocked':battle&&(hero.deployed||this.model.deployedHeroes.length<this.model.capacity);
            if(!allowed){if(released)this.returnGhost(hero,g.fromWorld,released);this.message('DROP ON A GLOWING SLOT · MATCH TIERS TO MERGE');return;}
            if(released)this.dropOrigin={id:hero.id,from:released,slot};
            if(slot!==null){if(g.fromWorld)this.model.withdraw(hero.id);error=this.model.move(hero.id,slot);}
            else if(battle)error=this.model.deploy(hero.id);
        }
        if (error) this.message(error);
        console.log('[cocos-spike] input', JSON.stringify({ hero: g.heroId, drag: moved, x: Math.round(x), y: Math.round(y), error }));
    }
    private event(e: BattleEvent): void {
        if (!this.ready) return;
        switch (e.type) {
        case 'notice': this.dropOrigin=null; this.assets.sound('ui_error_1',.4); this.message(e.message!); this.meta?.notice(e.message!); break;
        case 'boost': if(e.boostId)this.meta?.offerStageBoost(e.boostId);break;
        case 'sync': this.assets.preferences(this.model.snapshot.data.settings); this.syncHeroes(); this.meta?.refresh(); break;
        case 'purchase': this.syncHeroes(e.hero.id); this.fx.landing(this.reservePosition(e.hero.slot)); this.assets.sound('hero_spawn_1');this.assets.haptic('light'); this.message('DRAG MATCHING HEROES TO MERGE · TAP TO FIGHT'); break;
        case 'merge': this.syncHeroes(e.hero.id); this.fx.merge(this.reservePosition(e.hero.slot),e.hero.tier);this.assets.haptic('merge'); this.assets.sound(e.hero.tier>=5?'merge_high_1':'merge_low_1');
            this.message('TIER ' + e.hero.tier + ' · ATTACK ' + CONTENT.heroes[e.hero.tier - 1].attack); break;
        case 'capacity': this.assets.sound('merge_high_1',.6);this.message(e.message!);break;
        case 'move': this.syncHeroes();this.assets.sound('hero_drop_1');this.assets.haptic('light'); this.message('HERO MOVED · MATCHING TIERS MERGE'); break;
        case 'deploy': this.syncHeroes(e.hero.id); this.fx.landing(this.worldHero); this.assets.sound('hero_drop_1');this.assets.haptic('light'); this.message('AUTO BATTLE · TAP HERO TO RECALL'); break;
        case 'withdraw': this.syncHeroes(e.hero.id); this.fx.landing(this.reservePosition(e.hero.slot));this.assets.sound('hero_drop_1',.8);this.assets.haptic('light'); this.message('HERO RECALLED · DRAG MATCHING TIERS TO MERGE'); break;
        case 'attack': {
            const actor=this.battleHeroes.get(e.heroId!),hero=this.model.heroes.find(h=>h.id===e.heroId);actor?.attack();
            const from=(actor?.node.position||this.worldHero).clone().add(new Vec3(22,10));
            this.fx.projectile(from,this.worldEnemy.clone().add(new Vec3(-22,10)),e.attackType!,e.flightSeconds,e.heroId,e.attackId,hero?.tier);
            this.assets.sound(e.attackType==='magic'?'combat_magic_1':e.attackType==='ranged'?'combat_ranged_1':'combat_melee_1',.65);break;
        }
        case 'hit': {
            const hero=this.model.heroes.find(h=>h.id===e.heroId),type=hero?CONTENT.heroes[hero.tier-1].attackType:'melee';
            this.fx.hit(e.attackId);this.enemy.hit();this.fx.impact(this.worldEnemy.clone().add(new Vec3(-22,10)),type,hero?.tier,!!e.crit);
            this.fx.damage(e.damage!,this.worldEnemy,!!e.boss,!!e.crit);this.assets.sound(e.crit?'combat_crit_1':'combat_hit_1',e.crit?.85:.65);break;
        }
        case 'death': this.enemy.death();this.fx.spark(this.worldEnemy,true);this.assets.sound('enemy_deathSmall_1');break;
        case 'clear': if(e.boss){this.assets.sound('reward_claim_1');this.assets.haptic('reward');}break;
        case 'reward': for(const currency of ['gold','gem'] as const)if(BigInt(e.rewards![currency])>0n)this.flyReward(currency,e.rewards![currency]);break;
        case 'respawn': this.fx.clearFlights(); this.enemy.setFrame(this.assets.frame(this.model.enemy.art)); this.enemy.pop();break;
        }
        this.refresh();
        if (!['attack','hit','hud','sync'].includes(e.type)) console.log('[cocos-spike] gameplay', JSON.stringify({ event: e.type,
            gold: this.model.gold, price: this.model.price, heroes: this.model.heroes.map(h => ({ id: h.id, tier: h.tier, slot: h.slot })),
            deployed: this.model.deployed?.id ?? null, hp: this.model.hp, kills: this.model.kills, stage: this.model.stage.name,
            wave: this.model.waveIndex + 1 }));
    }
    private flyReward(currency:RewardCurrency,amount:string):void {
        if(this.meta?.isOpen)return;
        const count=currency==='gold'?5:3,arrive=this.rewards.reserve(currency,amount,count);
        const target=new Vec3((currency==='gold'?88:252)-215,this.ui.height/2-(currency==='gold'?45:44));
        this.fx.currency(this.worldEnemy,target,currency,count,part=>{
            if(!arrive(part))return;
            this.refreshBalances();this.fx.collect(target,currency);
            const label=currency==='gold'?this.gold:this.gems;
            if(!BattleAssets.reducedMotion){Tween.stopAllByTarget(label.node);label.node.setScale(1.13,1.13,1);tween(label.node).to(.22,{scale:new Vec3(1,1,1)},{easing:'sineOut'}).start();}
            if(part===0)this.assets.sound(currency==='gold'?'economy_goldGain_1':'economy_gemGain_1',.7);
        });
    }
    private refreshBalances():void {
        const balances=this.model.snapshot.data.currencies;
        this.gold.string=formatAmount(this.rewards.display('gold',balances.gold),'en-US',true);
        this.gems.string=formatAmount(this.rewards.display('gem',balances.gem),'en-US',true);
    }
    private refresh(): void {
        this.refreshBalances(); this.price.string = String(this.model.price);
        this.sidePrices.forEach((l,i)=>l.string=String(this.model.offerPrice(i+2)));
        this.hp.string = this.model.hp + ' / ' + this.model.maxHp; if(this.displayedHp!==this.model.hp){this.displayedHp=this.model.hp;Tween.stopAllByTarget(this.hpFill);const scale=new Vec3(this.model.hp/this.model.maxHp,1,1);if(BattleAssets.reducedMotion)this.hpFill.setScale(scale);else tween(this.hpFill).to(.12,{scale},{easing:'quadOut'}).start();}
        const state=this.model.snapshot,farming=state.data.stages.bossRetryAvailable;
        this.stage.string = this.model.stage.name; this.wave.string = farming?'BOSS READY':'BOSS';this.wave.fontSize=farming?15:21;
        const v=this.model.battle.getSnapshot(), timer=v.boss?.status==='fighting'?' · '+Math.ceil(v.boss.remainingMs/1000)+'s':'';
        this.capacity.string = 'BATTLE ' + this.model.deployedHeroes.length + '/' + this.model.capacity + timer;
        this.capacity.node.active=!!v.boss||this.draggingHeroId!==null;
        if(state.revision!==this.progressionRevision){
            this.progressionRevision=state.revision;this.readiness=bossReadiness(state).ratio;
            let lastFailure=-1;for(const key of Object.keys(state.data.sourceWatermarks))if(key.startsWith('bossFailed:'))lastFailure=Math.max(lastFailure,Number(key.split(':')[2])||0);
            this.huntWave=Math.max(1,state.data.stages.encounterSequence-lastFailure);
        }
        this.huntInfo.node.active=this.huntDetail.node.active=!v.boss&&this.draggingHeroId===null;
        this.huntInfo.string=farming?'FARMING · WAVE '+this.huntWave:'KILLS '+this.model.waveIndex+' / '+this.model.stage.waves.length;
        this.huntDetail.string=farming?'MERGE & UPGRADE · BOSS POWER ~'+Math.floor(this.readiness*100)+'%':'DEFEAT ENEMIES · BOSS AT '+this.model.stage.name.split('-')[0]+'-10';
        this.assets.preferences(this.model.snapshot.data.settings);
        const index=Number(this.model.stage.name.split('-')[1])||1;
        this.progress.setScale(Math.max(.005,farming?this.readiness:((index-1)+(this.model.waveIndex+1-this.model.hp/this.model.maxHp)/this.model.stage.waves.length)/10),1,1);
    }
    private message(value: string): void { this.hint.string = value; this.hintSeconds=2.8; }
    private refreshBonuses():void {
        const state=this.model.snapshot,now=Date.now(),second=Math.floor(now/1000);
        if(state.revision===this.bonusRevision&&second===this.bonusSecond)return;
        this.bonusRevision=state.revision;this.bonusSecond=second;const ready=redDots(state,now);
        this.wheelAttention.set(ready.wheel,BattleAssets.reducedMotion);this.dailyAttention.set(ready.daily,BattleAssets.reducedMotion);
        this.shopShine.set(BattleAssets.reducedMotion);
    }
    private hide(): void { this.paused = true;this.assets.suspend(true); this.controls?.cancel(); this.model.pause(true); this.fx?.clear(); this.rewards.clear(); }
    private show(): void { this.paused = false;this.assets.suspend(false); this.model.pause(false);if(this.ready)this.refreshBalances(); }
    update(dt: number): void {
        if (!this.ready || this.paused) return;
        // A delayed frame must not turn a short tap into a long press.
        if(this.picked!==null&&this.draggingHeroId===null)this.pickedSeconds+=Math.min(dt,.05);
        this.assets.update(dt);
        if (!this.meta?.isOpen) this.model.update(dt);
        if (!this.meta?.isOpen) this.refreshBonuses();
        this.fx.update(dt);this.guides.update(dt);this.meta?.update();
        this.tutorial?.update(!this.meta?.isOpen);
        if(!this.meta?.isOpen)this.hintSeconds=Math.max(0,this.hintSeconds-dt);
        for(const n of [this.hintBackground,this.hint.node]){const opacity=n.getComponent(UIOpacity)||n.addComponent(UIOpacity);opacity.opacity=Math.min(1,this.hintSeconds*3)*255;}
        if(this.draggingHeroId!==null&&this.ghost.active){
            const p=this.ghost.position,dx=this.ghostTarget.x-p.x,dy=this.ghostTarget.y-p.y,a=BattleAssets.reducedMotion?1:1-Math.exp(-48*dt);
            this.ghost.setPosition(p.x+dx*a,p.y+dy*a);this.ghost.setScale(1.08,1.08,1);this.ghost.angle=BattleAssets.reducedMotion?0:Math.max(-7,Math.min(7,-dx*.25));
        }
        const ms = dt * 1000; this.frameBins[Math.min(200, Math.floor(ms))]++;
        this.frameCount++; this.frameElapsed += dt; this.maxFrame = Math.max(this.maxFrame, ms);
        if (this.frameElapsed >= 10) {
            let total = 0, p95 = 200;
            for (let i = 0; i < this.frameBins.length; i++) { total += this.frameBins[i]; if (total >= this.frameCount * .95) { p95 = i + 1; break; } }
            this.measuredSeconds += this.frameElapsed;
            console.log('[cocos-spike] frames', JSON.stringify({ seconds: +this.measuredSeconds.toFixed(2), frames: this.frameCount,
                interval: +this.frameElapsed.toFixed(3), fps: +(this.frameCount / this.frameElapsed).toFixed(2), p95Ms: p95,
                maxMs: +this.maxFrame.toFixed(2), kills: this.model.kills }));
            this.frameBins.fill(0); this.frameCount = 0; this.frameElapsed = 0; this.maxFrame = 0;
        }
    }
    onDestroy(): void {
        game.off(Game.EVENT_HIDE, this.hide, this); game.off(Game.EVENT_SHOW, this.show, this);
        this.meta?.dispose(); this.model.dispose(); for (const v of this.battleHeroes.values()) v.dispose();
        this.tutorial?.dispose();
        this.wheelAttention?.dispose();this.dailyAttention?.dispose();
        this.shopShine?.dispose();
        this.controls?.dispose(); this.guides?.dispose(); this.fx?.dispose(); this.enemy?.dispose(); for (const v of this.heroes.values()) v.dispose();
        if (this.ready) this.assets.dispose();
    }
}
