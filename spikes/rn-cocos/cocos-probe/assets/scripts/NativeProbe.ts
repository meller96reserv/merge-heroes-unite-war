import {
    _decorator, Camera, Canvas, Color, Component, EventTouch, Graphics,
    game, Game, input, Input, Label, Layers, native, Node, ResolutionPolicy, UITransform, view,
} from 'cc';
import { DEBUG, NATIVE } from 'cc/env';
import { CHANNEL, MAX_BYTES, utf8Bytes } from './protocol/Protocol';
import { GameExchange, HostExchange } from './protocol/ProbeExchange';
import { ProbeAudio } from './ProbeAudio';

const { ccclass } = _decorator;

/** Standalone feasibility fixture. It contains no gameplay or rewards. */
@ccclass('NativeProbe')
export class NativeProbe extends Component {
    private taps = 0;
    private frames = 0;
    private elapsed = 0;
    private displayElapsed = 0;
    private counter: Label | null = null;
    private background: Graphics | null = null;
    private bridgeLabel: Label | null = null;
    private bridgeColor: 'cyan' | 'violet' | null = null;
    private exchange: GameExchange | null = null;
    private webHost: HostExchange | null = null;
    private shown = true;
    private resumeFrame = false;
    private showCount = 0;
    private hideCount = 0;
    private audio: ProbeAudio | null = null;

    start(): void {
        view.setDesignResolutionSize(430, 932, ResolutionPolicy.SHOW_ALL);
        const canvasNode = new Node('ProbeCanvas');
        canvasNode.layer = Layers.Enum.UI_2D;
        this.node.scene.addChild(canvasNode);
        canvasNode.addComponent(UITransform).setContentSize(430, 932);
        const canvas = canvasNode.addComponent(Canvas);

        const cameraNode = new Node('ProbeCamera');
        this.node.scene.addChild(cameraNode);
        cameraNode.setPosition(0, 0, 1000);
        const camera = cameraNode.addComponent(Camera);
        camera.projection = Camera.ProjectionType.ORTHO;
        camera.orthoHeight = 466;
        camera.near = 0.1;
        camera.far = 2000;
        camera.visibility = Layers.Enum.UI_2D;
        camera.clearFlags = Camera.ClearFlag.SOLID_COLOR;
        camera.clearColor = new Color(15, 23, 42, 255);
        canvas.cameraComponent = camera;

        const panel = this.child(canvasNode, 'ColorPanel');
        this.background = panel.addComponent(Graphics);
        this.drawColor();
        this.label(canvasNode, 'NativeProbeTitle', 'COCOS NATIVE PROBE', 265, 25);
        this.label(canvasNode, 'ProbeVersion', 'Cocos 3.8.8 · TASK-0038', 210, 18);
        this.counter = this.label(canvasNode, 'TouchCounter', '', 60, 30);
        this.bridgeLabel = this.label(canvasNode, 'BridgeStatus', 'BRIDGE WAITING', -65, 18);
        this.label(canvasNode, 'TouchHint', 'Tap anywhere to change color', -140, 21);
        this.label(canvasNode, 'AudioControls', 'LEFT: MUTE · RIGHT: SFX', -225, 18);
        const audioLabel = this.label(canvasNode, 'AudioState', 'DEV AUDIO LOADING', -295, 17);
        this.audio = new ProbeAudio(canvasNode, value => { audioLabel.string = value; }, muted => this.exchange?.requestMute(muted));
        input.on(Input.EventType.TOUCH_END, this.onTouch, this);
        game.on(Game.EVENT_HIDE, this.onHide, this);
        game.on(Game.EVENT_SHOW, this.onShow, this);
        this.refresh();
        console.log('[kisel-probe] ready', JSON.stringify({ version: 1, taps: 0 }));
        this.startBridge();
    }

    update(dt: number): void {
        if (this.resumeFrame) {
            console.log('[kisel-lifecycle]', JSON.stringify({ event: 'resume-frame', rawDt: dt, appliedDt: 0, frames: this.frames }));
            this.resumeFrame = false;
            dt = 0; // Paused presentation time never becomes simulated catch-up.
        }
        this.frames += 1;
        this.elapsed += dt;
        this.displayElapsed += dt;
        if (this.displayElapsed >= 1) {
            this.displayElapsed = 0;
            this.refresh();
            console.log('[kisel-probe] tick', JSON.stringify({ frames: this.frames, seconds: this.elapsed, taps: this.taps, shown: this.shown }));
        }
    }

    onDestroy(): void {
        input.off(Input.EventType.TOUCH_END, this.onTouch, this);
        game.off(Game.EVENT_HIDE, this.onHide, this);
        game.off(Game.EVENT_SHOW, this.onShow, this);
        this.exchange?.close();
        this.webHost?.close();
        this.audio?.close();
        if (NATIVE) native.bridge.onNative = () => {};
        console.log('[kisel-lifecycle]', JSON.stringify({ event: 'destroy', inputListeners: 0, lifecycleListeners: 0 }));
    }

    private onHide(): void {
        this.shown = false;
        this.audio?.visibility(false);
        console.log('[kisel-lifecycle]', JSON.stringify({ event: 'hide', count: ++this.hideCount, frames: this.frames, seconds: this.elapsed, taps: this.taps }));
    }

    private onShow(): void {
        this.shown = true;
        this.audio?.visibility(true);
        // Native onShow can precede Activity.onResume. The host sends fresh focus
        // after opening its transport; an early game ping would be dropped.
        if (!NATIVE && DEBUG) this.webHost?.setAudioFocus(true);
        this.resumeFrame = true;
        console.log('[kisel-lifecycle]', JSON.stringify({ event: 'show', count: ++this.showCount, frames: this.frames, seconds: this.elapsed, taps: this.taps }));
    }

    private onTouch(event: EventTouch): void {
        this.taps += 1;
        this.bridgeColor = null;
        const point = event.getUILocation();
        if (point.y < 255) {
            if (point.x < 215) this.audio?.toggleMute(); else this.audio?.oneShot();
        }
        this.drawColor();
        this.refresh();
        console.log('[kisel-probe] touch', JSON.stringify({ taps: this.taps, x: point.x, y: point.y }));
    }

    private drawColor(): void {
        if (!this.background) return;
        this.background.clear();
        this.background.fillColor = this.bridgeColor === 'cyan' ? new Color(10, 135, 150, 255)
            : this.bridgeColor === 'violet' ? new Color(98, 57, 136, 255)
                : this.taps % 2 === 0 ? new Color(25, 87, 111, 255) : new Color(98, 57, 136, 255);
        this.background.roundRect(-195, -390, 390, 780, 24);
        this.background.fill();
    }

    private refresh(): void {
        if (this.counter) this.counter.string = `TAPS ${this.taps}\nFRAMES ${this.frames}\nTIME ${Math.floor(this.elapsed)}s`;
    }

    private startBridge(): void {
        const generation = Date.now(); // Diagnostic session identity, never an economic clock.
        const log = (entry: Record<string, unknown>) => console.log('[bridge-probe][game]', JSON.stringify(entry));
        const send = (raw: string): void => {
            if (NATIVE) native.bridge.sendToNative(CHANNEL, raw);
            else if (DEBUG && utf8Bytes(raw) <= MAX_BYTES) Promise.resolve().then(() => this.webHost?.receive(raw));
        };
        this.exchange = new GameExchange(`probe.${generation}`, generation, send, color => {
            this.bridgeColor = color;
            this.drawColor();
            if (this.bridgeLabel) this.bridgeLabel.string = 'BRIDGE COLOR APPLIED ONCE';
        }, log, (focus, muted) => this.audio?.state(focus, muted));
        if (NATIVE) {
            native.bridge.onNative = (channel: string, raw?: string | null): void => {
                if (channel === CHANNEL && typeof raw === 'string') this.exchange?.receive(raw);
            };
        } else if (DEBUG) {
            this.webHost = new HostExchange(async raw => {
                if (utf8Bytes(raw) > MAX_BYTES) throw { code: 'OVERSIZE' };
                this.exchange?.receive(raw);
            }, entry => {
                console.log('[bridge-probe][web-host]', JSON.stringify(entry));
                if (entry.event === 'exchange-complete' && this.bridgeLabel) this.bridgeLabel.string = `WEB DEV BRIDGE ${entry.status}`;
            });
            this.webHost.begin(true);
            this.webHost.setAudioFocus(true); // Development browser fixture; not native focus evidence.
        }
        this.exchange.start();
    }

    private child(parent: Node, name: string): Node {
        const node = new Node(name);
        node.layer = Layers.Enum.UI_2D;
        parent.addChild(node);
        node.addComponent(UITransform).setContentSize(390, 150);
        return node;
    }

    private label(parent: Node, name: string, text: string, y: number, size: number): Label {
        const node = this.child(parent, name);
        node.setPosition(0, y, 0);
        const label = node.addComponent(Label);
        label.string = text;
        label.fontSize = size;
        label.lineHeight = size + 12;
        label.color = Color.WHITE;
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        label.verticalAlign = Label.VerticalAlign.CENTER;
        return label;
    }
}
