import { Color, instantiate, Node, Prefab, Sprite, SpriteFrame, tween, Tween, UIOpacity, UITransform, Vec3 } from 'cc';
import { BattleAssets } from './BattleAssets';
import { setSize, spriteNode } from './SceneUI';

export class ActorView {
    readonly node: Node;
    readonly body: Node;
    private sprite: Sprite;
    private destination: Vec3 | null = null;
    private travel: {p:number} | null = null;
    private opacity: UIOpacity;
    constructor(parent: Node, prefab: Prefab, frame: SpriteFrame, w: number, h: number) {
        this.node = instantiate(prefab); parent.addChild(this.node); setSize(this.node, w, h);
        this.body = spriteNode(this.node, 'Art', frame, w, h);
        this.ground(w, h);
        this.sprite = this.body.getComponent(Sprite)!; this.opacity = this.body.addComponent(UIOpacity);
    }
    moveTo(to: Vec3, animate = true, origin?:Vec3): void {
        if (!origin && this.destination && Vec3.squaredDistance(this.destination,to)<.01) return;
        this.destination=to.clone();if(this.travel)Tween.stopAllByTarget(this.travel);this.travel=null;
        if(!animate||BattleAssets.reducedMotion){this.node.setPosition(to);return;}
        const from=origin?.clone()??this.node.position.clone(),state={p:0};this.node.setPosition(from);this.travel=state;
        tween(state).to(.2,{p:1},{easing:'quadOut',onUpdate:()=>{
            const p=state.p;this.node.setPosition(from.x+(to.x-from.x)*p,from.y+(to.y-from.y)*p+Math.sin(Math.PI*p)*25);
        }}).call(()=>{this.travel=null;}).start();
    }
    private ground(_w:number,h:number):void {
        const actual=this.body.getComponent(UITransform)!.contentSize;
        this.body.setPosition(0,-(h-actual.height)/2-3);
    }
    resize(w: number, h: number): void {
        setSize(this.node, w, h);const frame=this.sprite.spriteFrame!;
        const scale=Math.min(w/Math.max(1,frame.originalSize.width),h/Math.max(1,frame.originalSize.height));
        setSize(this.body,frame.originalSize.width*scale,frame.originalSize.height*scale);this.ground(w,h);
    }
    setFrame(frame: SpriteFrame): void {
        this.sprite.spriteFrame = frame;const box=this.node.getComponent(UITransform)!.contentSize;
        const scale=Math.min(box.width/Math.max(1,frame.originalSize.width),box.height/Math.max(1,frame.originalSize.height));
        setSize(this.body,frame.originalSize.width*scale,frame.originalSize.height*scale);this.ground(box.width,box.height);
    }
    private reset(): void {
        Tween.stopAllByTarget(this.body); Tween.stopAllByTarget(this.opacity); Tween.stopAllByTarget(this.sprite);
        const box=this.node.getComponent(UITransform)!.contentSize;this.ground(box.width,box.height); this.body.setScale(1, 1, 1); this.body.angle = 0;
        this.opacity.opacity = 255; this.sprite.color = Color.WHITE; this.body.active = true;
    }
    idle(): void {
        this.reset(); if(BattleAssets.reducedMotion)return;
        const base=this.body.position.clone();tween(this.body).to(.85, { position: base.clone().add3f(0, 1.5, 0), scale: new Vec3(1.015, .985, 1), angle: -.6 }, { easing: 'sineInOut' })
            .to(.85, { position: base, scale: new Vec3(1, 1, 1), angle: .6 }, { easing: 'sineInOut' }).union().repeatForever().start();
    }
    pop(): void {
        this.reset(); if(BattleAssets.reducedMotion)return; this.body.setScale(.45, .45, 1);
        tween(this.body).to(.28, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' }).call(() => this.idle()).start();
    }
    attack(): void {
        this.reset(); if(BattleAssets.reducedMotion)return;const base=this.body.position.clone();
        tween(this.body).to(.065, { position: base.clone().add3f(-6, -2, 0), angle: 5, scale: new Vec3(.94, 1.04, 1) })
            .to(.085, { position: base.clone().add3f(16, 3, 0), angle: -7, scale: new Vec3(1.08, .96, 1) }, { easing: 'quadOut' })
            .to(.22, { position: base, angle: 0, scale: new Vec3(1, 1, 1) }, { easing: 'sineOut' })
            .call(() => this.idle()).start();
    }
    hit(): void {
        this.reset(); this.sprite.color = new Color(255, 170, 150);
        tween(this.sprite).to(.18, { color: Color.WHITE }).start();
        if(BattleAssets.reducedMotion)return;const base=this.body.position.clone();
        tween(this.body).to(.07, { position: base.clone().add3f(7, 0, 0), angle: -3, scale: new Vec3(.97, 1.04, 1) })
            .to(.18, { position: base, angle: 0, scale: new Vec3(1, 1, 1) }).call(() => this.idle()).start();
    }
    death(): void {
        this.reset(); if(BattleAssets.reducedMotion){this.opacity.opacity=0;return;}const base=this.body.position.clone();
        tween(this.body).to(.3, { position: base.clone().add3f(15, -20, 0), scale: new Vec3(.5, .5, 1), angle: -25 }, { easing: 'quadIn' }).start();
        tween(this.opacity).to(.3, { opacity: 0 }).start();
    }
    dispose(): void { if(this.travel)Tween.stopAllByTarget(this.travel); this.reset(); Tween.stopAllByTarget(this.node); this.node.destroy(); }
}
