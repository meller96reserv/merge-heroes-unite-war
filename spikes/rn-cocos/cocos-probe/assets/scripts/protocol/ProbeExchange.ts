import { decode, Envelope, INITIALIZE_PAYLOAD, invalidCases, MAX_BYTES, Receiver, Sender } from './Protocol';

type Send = (raw: string) => void | Promise<unknown>;
type Log = (entry: Record<string, unknown>) => void;
const wire = JSON.stringify;

/** Explicit development-only exchange: it has no economy, save or release authority. */
export class GameExchange {
    private readonly receiver: Receiver;
    private readonly sender: Sender;
    private inbound = 0;
    private colorApplications = 0;
    private reverseStarted = false;
    private audioRequests = 0;
    constructor(session: string, generation: number, private send: Send, private color: (value: 'cyan' | 'violet') => void, private log: Log,
                private audio: (focus: boolean, muted: boolean) => void = () => {}) {
        this.receiver = new Receiver('game', session, generation);
        this.sender = new Sender(session, generation);
    }
    start(): void {
        this.send(wire(this.sender.message('game.ready', { gameBuild: 'cocos.3.8.8', supportedVersions: [1], capabilities: ['probe.exchange'] }, null)));
        this.log({ event: 'local-size-check', actual: decode('x'.repeat(MAX_BYTES + 1)).code, expected: 'OVERSIZE' });
    }
    receive(raw: string): void {
        const result = this.receiver.accept(raw);
        const m = result.message;
        this.inbound++;
        this.log({ event: 'receive', runtime: 'game', kind: result.kind, code: result.code, path: result.path, type: m?.type, sequence: m?.sequence });
        if (result.kind === 'accepted' && m?.type === 'probe.color') {
            this.colorApplications++;
            this.color(m.payload.color as 'cyan' | 'violet');
            this.log({ event: 'color-applied', count: this.colorApplications, color: m.payload.color });
        }
        this.send(wire(this.sender.message('probe.report', { caseId: `receive.${this.inbound}`, result: `${result.kind}:${result.code}:${result.path}`, applied: this.colorApplications }, null)));
        if (result.kind !== 'accepted' || !m) return;
        if (m.type === 'probe.audioState') this.audio(Boolean(m.payload.focus), Boolean(m.payload.muted));
        if (m.type === 'app.initialize') this.send(wire(this.sender.message('probe.ping', { token: 'game.first' }, 'game.first')));
        if (m.type === 'probe.ping') {
            this.send(wire(this.sender.message('probe.pong', { token: String(m.payload.token) }, `game.pong.${m.payload.token}`)));
            if (m.payload.token === 'host.final' && !this.reverseStarted) this.reverseCases();
        }
    }
    requestAudioState(): void {
        const token = `game.audio-state.${++this.audioRequests}`;
        this.send(wire(this.sender.message('probe.ping', { token }, token)));
    }
    requestMute(muted: boolean): void {
        this.send(wire(this.sender.message('probe.audioMute', { muted }, `game.audio-mute.${++this.audioRequests}`)));
    }
    private reverseCases(): void {
        this.reverseStarted = true;
        const once = this.sender.message('probe.ping', { token: 'game.once' }, 'game.once');
        this.send(wire(once));
        this.send(wire(once));
        this.send(wire({ ...once, payload: { token: 'game.conflict' } }));
        const next = this.sender.message('probe.ping', { token: 'game.final' }, 'game.final');
        for (const item of invalidCases(next)) {
            this.log({ event: 'send-invalid', caseId: item.id, expected: item.expected });
            this.send(item.raw);
        }
        this.send('x'.repeat(MAX_BYTES + 1));
        this.send(wire(next));
    }
    close(): void { this.receiver.close(); }
}

export class HostExchange {
    private receiver: Receiver | null = null;
    private sender: Sender | null = null;
    private awaitingReady = false;
    private chain: Promise<unknown> = Promise.resolve();
    private hostRejected = 0;
    private hostDuplicates = 0;
    private gameRejected = 0;
    private gameDuplicates = 0;
    private maximumColorApplications = 0;
    private firstPing = false;
    private hostPong = false;
    private finalGamePing = false;
    private oversizeRejected = false;
    private finished = false;
    private epoch = 0;
    private lifecyclePings = 0;
    private audioFocus = false;
    private audioMuted = false;
    private audioHostActive = true;
    constructor(private send: Send, private log: Log) {}
    setAudioFocus(focus: boolean, active = true): void {
        this.audioFocus = focus; this.audioHostActive = active; this.sendAudioState();
    }
    private sendAudioState(): void {
        if (!this.sender || !this.finished || !this.audioHostActive) return;
        this.enqueue(wire(this.sender.message('probe.audioState', { focus: this.audioFocus, muted: this.audioMuted }, null)));
    }
    begin(reset: boolean): void {
        if (this.awaitingReady) return;
        if (reset) {
            this.epoch++;
            this.receiver?.close(); this.receiver = null; this.sender = null;
            this.hostRejected = this.hostDuplicates = this.gameRejected = this.gameDuplicates = this.maximumColorApplications = 0;
            this.firstPing = this.hostPong = this.finalGamePing = this.oversizeRejected = this.finished = false;
        }
        this.awaitingReady = !this.receiver;
    }
    probeRetainedSession(): void {
        if (!this.receiver || !this.sender || !this.finished) return;
        const token = `host.lifecycle.${++this.lifecyclePings}`;
        this.enqueue(wire(this.sender.message('probe.ping', { token }, token)));
    }
    receive(raw: string): void {
        if (!this.receiver) {
            const first = decode(raw);
            if (!this.awaitingReady || first.message?.type !== 'game.ready') {
                this.log({ event: 'ignored-before-handshake', code: first.code }); return;
            }
            this.receiver = new Receiver('host', first.message.sessionId, first.message.generation);
            this.sender = new Sender(first.message.sessionId, first.message.generation);
            this.awaitingReady = false;
        }
        const result = this.receiver.accept(raw);
        const m = result.message;
        this.log({ event: 'receive', runtime: 'host', kind: result.kind, code: result.code, path: result.path, type: m?.type, sequence: m?.sequence });
        if (result.kind === 'rejected') this.hostRejected++;
        if (result.kind === 'duplicate') this.hostDuplicates++;
        if (result.kind !== 'accepted' || !m) { this.check(); return; }
        if (m.type === 'probe.audioMute') { this.audioMuted = Boolean(m.payload.muted); this.sendAudioState(); }
        if (m.type === 'game.ready') this.enqueue(wire(this.sender!.message('app.initialize', INITIALIZE_PAYLOAD, 'host.initialize')));
        if (m.type === 'probe.report') {
            const report = String(m.payload.result);
            if (report.startsWith('rejected:')) this.gameRejected++;
            if (report.startsWith('duplicate:')) this.gameDuplicates++;
            this.maximumColorApplications = Math.max(this.maximumColorApplications, Number(m.payload.applied));
            this.log({ event: 'game-report', ...m.payload });
        }
        if (m.type === 'probe.pong' && m.payload.token === 'host.final') this.hostPong = true;
        if (m.type === 'probe.pong' && String(m.payload.token).startsWith('host.lifecycle.'))
            this.log({ event: 'lifecycle-pong', token: m.payload.token, sessionId: m.sessionId, generation: m.generation });
        if (m.type === 'probe.ping') {
            if (String(m.payload.token).startsWith('game.audio-state.')) this.sendAudioState();
            this.enqueue(wire(this.sender!.message('probe.pong', { token: String(m.payload.token) }, `host.pong.${m.payload.token}`)));
            if (m.payload.token === 'game.first' && !this.firstPing) {
                this.firstPing = true;
                this.forwardCases();
            }
            if (m.payload.token === 'game.final') this.finalGamePing = true;
        }
        this.check();
    }
    private enqueue(raw: string, expectedError?: string): void {
        const epoch = this.epoch;
        this.chain = this.chain.then(async () => {
            if (epoch !== this.epoch) { this.log({ event: 'cancelled-old-owner' }); return; }
            try {
                await this.send(raw);
                if (epoch !== this.epoch) return;
                if (expectedError) this.log({ event: 'transport-check', expected: expectedError, actual: 'UNEXPECTED_ACCEPT' });
            } catch (error) {
                if (epoch !== this.epoch) return;
                const code = (error as { code?: string }).code || String(error);
                this.log({ event: 'transport-check', expected: expectedError || 'DELIVER', actual: code });
                if (expectedError === 'OVERSIZE' && code === expectedError) this.oversizeRejected = true;
            }
            this.check();
        });
    }
    private forwardCases(): void {
        const color = this.sender!.message('probe.color', { color: 'cyan' }, 'host.color');
        this.enqueue(wire(color));
        this.enqueue(wire(color));
        this.enqueue(wire({ ...color, payload: { color: 'violet' } }));
        const next = this.sender!.message('probe.ping', { token: 'host.final' }, 'host.final');
        for (const item of invalidCases(next)) {
            this.log({ event: 'send-invalid', caseId: item.id, expected: item.expected });
            this.enqueue(item.raw);
        }
        this.enqueue('x'.repeat(MAX_BYTES + 1), 'OVERSIZE');
        this.enqueue(wire(next));
    }
    private check(): void {
        if (this.finished || !this.finalGamePing || !this.hostPong || !this.oversizeRejected) return;
        this.finished = true;
        const counts = { hostRejected: this.hostRejected, hostDuplicates: this.hostDuplicates,
            gameRejected: this.gameRejected, gameDuplicates: this.gameDuplicates, colorApplications: this.maximumColorApplications };
        const passed = counts.hostRejected === 9 && counts.gameRejected === 9 && counts.hostDuplicates === 1 && counts.gameDuplicates === 1 && counts.colorApplications === 1;
        this.log({ event: 'exchange-complete', status: passed ? 'PASS' : 'FAIL', ...counts });
        if (passed) this.sendAudioState();
    }
    close(): void { this.epoch++; this.receiver?.close(); this.awaitingReady = false; }
}
