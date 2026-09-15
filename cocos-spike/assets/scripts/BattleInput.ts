import { Camera, EventTouch, input, Input, UITransform, Vec3 } from 'cc';

export interface BoardGesture { heroId: number; fromWorld: boolean; moved: boolean; }
export interface BattleInputActions {
    begin(x: number, y: number): { heroId: number; fromWorld: boolean } | null;
    drag(gesture: BoardGesture, x: number, y: number): void;
    end(gesture: BoardGesture | null, x: number, y: number, moved: boolean): void;
    pointerMove?(x:number,y:number):void;
    cancel(): void;
}

/** Captures one pointer through release, independent of source sprite hit bounds. */
export class BattleInput {
    private gesture: BoardGesture | null = null;
    private touchId: number | null = null;
    private startX = 0;
    private startY = 0;
    private screen = new Vec3();
    private world = new Vec3();
    private local = new Vec3();
    constructor(private camera: Camera, private canvas: UITransform, private height: number, private actions: BattleInputActions) {
        input.on(Input.EventType.TOUCH_START, this.start, this);
        input.on(Input.EventType.TOUCH_MOVE, this.move, this);
        input.on(Input.EventType.TOUCH_END, this.end, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.cancelEvent, this);
    }
    private point(e: EventTouch): Vec3 {
        const p = e.getLocation(); this.screen.set(p.x, p.y, 0);
        this.camera.screenToWorld(this.screen, this.world);
        this.canvas.convertToNodeSpaceAR(this.world, this.local);
        this.local.x += 215; this.local.y = this.height / 2 - this.local.y;
        return this.local;
    }
    private start(e: EventTouch): void {
        if (this.touchId !== null) return;
        const p = this.point(e); this.touchId = e.getID(); this.startX = p.x; this.startY = p.y;
        const picked = this.actions.begin(p.x, p.y); this.gesture = picked ? { ...picked, moved: false } : null;
    }
    private move(e: EventTouch): void {
        if (e.getID() !== this.touchId) return;
        const p = this.point(e);
        if(!this.gesture){this.actions.pointerMove?.(p.x,p.y);return;}
        this.gesture.moved ||= Math.hypot(p.x - this.startX, p.y - this.startY) > 9;
        if (this.gesture.moved) this.actions.drag(this.gesture, p.x, p.y);
    }
    private end(e: EventTouch): void {
        if (e.getID() !== this.touchId) return;
        const p = this.point(e), g = this.gesture;
        const moved = !!g?.moved || Math.hypot(p.x - this.startX, p.y - this.startY) > 9;
        this.gesture = null; this.touchId = null;
        this.actions.end(g, p.x, p.y, moved);
    }
    private cancelEvent(e: EventTouch): void { if (e.getID() === this.touchId) this.cancel(); }
    cancel(): void { this.gesture = null; this.touchId = null; this.actions.cancel(); }
    dispose(): void {
        this.cancel();
        input.off(Input.EventType.TOUCH_START, this.start, this); input.off(Input.EventType.TOUCH_MOVE, this.move, this);
        input.off(Input.EventType.TOUCH_END, this.end, this); input.off(Input.EventType.TOUCH_CANCEL, this.cancelEvent, this);
    }
}
