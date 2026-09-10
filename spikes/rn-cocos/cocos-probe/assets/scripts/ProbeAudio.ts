import { AudioClip, AudioSource, Node, resources } from 'cc';
import { AudioGate } from './protocol/AudioGate';

/** Original quiet diagnostic tones, two controlled sources, no production audio assets. */
export class ProbeAudio {
    private readonly loop: AudioSource;
    private readonly shot: AudioSource;
    private starts = 0;
    private shots = 0;
    private destroyed = false;
    private readonly gate: AudioGate;
    constructor(parent: Node, private updateLabel: (value: string) => void, private requestMute: (muted: boolean) => void) {
        const loopNode = new Node('DiagnosticLoop'); parent.addChild(loopNode);
        const shotNode = new Node('DiagnosticOneShot'); parent.addChild(shotNode);
        this.loop = loopNode.addComponent(AudioSource); this.loop.playOnAwake = false; this.loop.loop = true; this.loop.volume = .4;
        this.shot = shotNode.addComponent(AudioSource); this.shot.playOnAwake = false; this.shot.volume = .4;
        this.gate = new AudioGate(() => {
            this.starts++; this.loop.play(); this.log('loop-request'); this.refresh();
        }, () => { this.loop.stop(); this.shot.stop(); this.log('stop-all'); this.refresh(); });
        loopNode.on(AudioSource.EventType.STARTED, () => this.log('loop-started'));
        shotNode.on(AudioSource.EventType.STARTED, () => this.log('oneshot-started'));
        shotNode.on(AudioSource.EventType.ENDED, () => this.log('oneshot-ended'));
        let loaded = 0;
        for (const [path, source] of [['loop', this.loop], ['oneshot', this.shot]] as const) {
            resources.load(`probe-audio/${path}`, AudioClip, (error, clip) => {
                if (this.destroyed) return;
                if (error) { this.log('asset-error', { path, error: String(error) }); return; }
                source.clip = clip;
                if (++loaded === 2) { this.gate.setReady(); this.log('assets-ready'); this.refresh(); }
            });
        }
    }
    state(focus: boolean, muted: boolean): void {
        this.gate.setState(focus, muted); this.log('host-state', { focus, muted }); this.refresh();
    }
    visibility(shown: boolean): void { this.gate.setShown(shown); this.log('visibility', { shown }); this.refresh(); }
    toggleMute(): void {
        const muted = !this.gate.isMuted;
        // Mute immediately; unmute waits for a fresh authoritative host focus state.
        if (muted) this.gate.setState(false, true);
        this.requestMute(muted); this.refresh();
    }
    oneShot(): void {
        if (!this.gate.allowed) { this.log('oneshot-suppressed'); return; }
        // One controlled SFX voice; stopping it on focus loss must remain possible.
        this.shot.stop(); this.shot.play(); this.shots++; this.log('oneshot-request'); this.refresh();
    }
    close(): void { this.destroyed = true; this.gate.close(); }
    private refresh(): void {
        this.updateLabel(`DEV AUDIO ${this.gate.allowed ? 'ON' : 'OFF'} · ${this.gate.isMuted ? 'MUTED' : 'UNMUTED'}\nloop starts ${this.starts} · SFX ${this.shots}`);
    }
    private log(event: string, extra: Record<string, unknown> = {}): void {
        console.log('[kisel-audio]', JSON.stringify({ event, starts: this.starts, shots: this.shots,
            loopPlaying: this.loop.playing, shotPlaying: this.shot.playing, ...extra }));
    }
}
