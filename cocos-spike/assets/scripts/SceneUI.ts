import { Color, Font, Graphics, Label, Layers, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { ArtId } from './ArtIds';
import { BattleAssets } from './BattleAssets';

export function child(parent: Node, name: string): Node {
    const n = new Node(name); n.layer = Layers.Enum.UI_2D; parent.addChild(n); return n;
}
export function setSize(n: Node, w: number, h: number): void {
    (n.getComponent(UITransform) || n.addComponent(UITransform)).setContentSize(w, h);
}
export type SpriteSizing = 'contain' | 'sliced';
export function spriteNode(parent: Node, name: string, frame: SpriteFrame, w: number, h: number, sizing: SpriteSizing = 'contain'): Node {
    const n = child(parent, name); const s = n.addComponent(Sprite);
    s.spriteFrame = frame; s.sizeMode = Sprite.SizeMode.CUSTOM; s.trim = false;
    if (sizing === 'sliced') {
        const sourceW = Math.max(1, frame.originalSize.width), sourceH = Math.max(1, frame.originalSize.height);
        const inset = Math.max(2, Math.floor(Math.min(sourceW, sourceH) * .18));
        frame.insetLeft ||= inset; frame.insetRight ||= inset; frame.insetTop ||= inset; frame.insetBottom ||= inset;
        s.type = Sprite.Type.SLICED; setSize(n, w, h);
    } else {
        const sourceW = Math.max(1, frame.originalSize.width), sourceH = Math.max(1, frame.originalSize.height);
        const scale = Math.min(w / sourceW, h / sourceH);
        setSize(n, sourceW * scale, sourceH * scale);
    }
    return n;
}
export function makeLabel(n: Node, font: Font, value: string, size: number, color = Color.WHITE): Label {
    const l = n.addComponent(Label); l.font = font; l.useSystemFont = false;
    l.fontSize = size; l.lineHeight = size + 6; l.string = value; l.color = color;
    l.horizontalAlign = Label.HorizontalAlign.CENTER; l.verticalAlign = Label.VerticalAlign.CENTER;
    l.overflow = Label.Overflow.NONE; l.enableOutline = true; l.outlineWidth = 2; l.outlineColor = new Color(28, 37, 48);
    // Native per-label textures avoid the missing/overlapping glyphs seen with CHAR.
    // Labels change only on transactions/hits, never on each frame.
    l.cacheMode = Label.CacheMode.NONE; return l;
}
/** Figma's 430-wide top-left coordinates mapped once into native UI space. */
export class SceneUI {
    constructor(readonly root: Node, readonly assets: BattleAssets, readonly height: number) {}
    /** Counter the safe-area transform for artwork only. UI and input retain
     * their existing safe coordinates; one continuous sprite covers the glass. */
    background(parent:Node,frame:SpriteFrame,zoom=1,raise=0):Node {
        const s=this.root.scale.x,viewportW=430/s,viewportH=this.height/s;
        const fit=Math.max(viewportW/frame.originalSize.width,viewportH/frame.originalSize.height)*zoom;
        const n=spriteNode(parent,'FullScreenBackground',frame,frame.originalSize.width*fit,frame.originalSize.height*fit);
        n.setPosition(-this.root.position.x/s,-this.root.position.y/s+viewportH*raise);
        return n;
    }
    position(n: Node, x: number, y: number, w = 0, h = 0): void { n.setPosition(x + w / 2 - 215, this.height / 2 - y - h / 2); }
    art(parent: Node, id: string, x: number, y: number, w: number, h: number): Node {
        // Cards, purchase frames, board slots, icons and actors must retain the
        // source aspect ratio. Only true scalable chrome uses nine-slice.
        const scalable = /(?:button|panel|track|progress)/i.test(id);
        const n = spriteNode(parent, id, this.assets.frame(id), w, h, scalable ? 'sliced' : 'contain');
        this.position(n, x, y, w, h); return n;
    }
    label(parent: Node, name: string, value: string, x: number, y: number, size: number, color = Color.WHITE): Label {
        const n = child(parent, name); setSize(n, 250, size + 8); this.position(n, x, y);
        return makeLabel(n, this.assets.bold, value, size, color);
    }
    rect(parent: Node, name: string, x: number, y: number, w: number, h: number, color: Color, radius = 0): Node {
        const n = child(parent, name); this.position(n, x, y, w, h); setSize(n, w, h);
        const g = n.addComponent(Graphics); g.fillColor = color;
        if (radius) g.roundRect(-w / 2, -h / 2, w, h, radius); else g.rect(-w / 2, -h / 2, w, h);
        g.fill(); return n;
    }
}
