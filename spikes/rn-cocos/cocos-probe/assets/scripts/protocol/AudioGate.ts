/** Spike-only presentation policy. Native focus AND visibility AND mute allow one loop. */
export class AudioGate {
    private ready = false;
    private shown = true;
    private focus = false;
    private muted = false;
    private closed = false;
    private loopActive = false;
    constructor(private startLoop: () => void, private stopAll: () => void) {}
    get allowed(): boolean { return this.ready && this.shown && this.focus && !this.muted && !this.closed; }
    get isMuted(): boolean { return this.muted; }
    setReady(): void { this.ready = true; this.reconcile(); }
    setState(focus: boolean, muted: boolean): void { this.focus = focus; this.muted = muted; this.reconcile(); }
    setShown(shown: boolean): void {
        this.shown = shown;
        if (!shown) this.focus = false; // Fresh host approval is required on every foreground.
        this.reconcile();
    }
    close(): void { this.closed = true; this.reconcile(); }
    private reconcile(): void {
        if (this.allowed === this.loopActive) return;
        this.loopActive = this.allowed;
        if (this.loopActive) this.startLoop(); else this.stopAll();
    }
}
