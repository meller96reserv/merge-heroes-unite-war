import { envelopeSchema, payloadSchemas } from './Schema';

export const MAX_BYTES = 64 * 1024;
export const CHANNEL = 'kisel.protocol.v1';
export type MessageType = keyof typeof payloadSchemas;
type Payloads = {
    'game.ready': { gameBuild: string; supportedVersions: number[]; capabilities: string[] };
    'app.initialize': typeof INITIALIZE_PAYLOAD;
    'probe.ping': { token: string }; 'probe.pong': { token: string };
    'probe.color': { color: 'cyan' | 'violet' };
    'probe.report': { caseId: string; result: string; applied: number };
    'probe.audioState': { focus: boolean; muted: boolean };
    'probe.audioMute': { muted: boolean };
};
export type Envelope = {
    version: 1; type: MessageType; requestId: string | null; sessionId: string;
    generation: number; sequence: number; timestamp: number; payload: Record<string, unknown>;
};
type Schema = {
    type?: string; properties?: Record<string, Schema>; required?: string[];
    additionalProperties?: boolean; anyOf?: Schema[]; enum?: unknown[]; const?: unknown;
    pattern?: string; minimum?: number; maximum?: number; exclusiveMinimum?: number;
    items?: Schema; minItems?: number;
};
export type Result = { kind: 'accepted' | 'duplicate' | 'rejected'; code: string; path: string; message?: Envelope };
export function utf8Bytes(text: string): number {
    let count = 0;
    for (const char of text) {
        const point = char.codePointAt(0)!;
        count += point < 0x80 ? 1 : point < 0x800 ? 2 : point < 0x10000 ? 3 : 4;
    }
    return count;
}
function matches(schema: Schema, value: unknown, path: string): string | null {
    if (schema.anyOf) return schema.anyOf.some(s => matches(s, value, path) === null) ? null : path;
    if ('const' in schema && schema.const !== value) return path;
    if (schema.enum && !schema.enum.includes(value)) return path;
    if (schema.type === 'null') return value === null ? null : path;
    if (schema.type === 'object') {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) return path;
        const object = value as Record<string, unknown>;
        for (const key of schema.required || []) if (!Object.prototype.hasOwnProperty.call(object, key)) return `${path}.${key}`;
        for (const [key, item] of Object.entries(object)) {
            const child = schema.properties && Object.prototype.hasOwnProperty.call(schema.properties, key)
                ? schema.properties[key] : undefined;
            if (!child && schema.additionalProperties === false) return `${path}.${key}`;
            const error = child ? matches(child, item, `${path}.${key}`) : null;
            if (error) return error;
        }
    } else if (schema.type === 'array') {
        if (!Array.isArray(value) || value.length < (schema.minItems || 0)) return path;
        for (let i = 0; i < value.length; i++) {
            const error = matches(schema.items!, value[i], `${path}[${i}]`);
            if (error) return error;
        }
    } else if (schema.type === 'integer' || schema.type === 'number') {
        if (typeof value !== 'number' || !Number.isFinite(value)) return path;
        if (schema.type === 'integer' && !Number.isSafeInteger(value)) return path;
        if (schema.minimum !== undefined && value < schema.minimum) return path;
        if (schema.maximum !== undefined && value > schema.maximum) return path;
        if (schema.exclusiveMinimum !== undefined && value <= schema.exclusiveMinimum) return path;
    } else if (schema.type === 'string') {
        if (typeof value !== 'string' || (schema.pattern && !new RegExp(schema.pattern).test(value))) return path;
    } else if (schema.type === 'boolean' && typeof value !== 'boolean') return path;
    return null;
}
const rejected = (code: string, path = '$'): Result => ({ kind: 'rejected', code, path });
export function decode(raw: string): Result {
    if (utf8Bytes(raw) > MAX_BYTES) return rejected('OVERSIZE');
    let message: Envelope;
    try { message = JSON.parse(raw); } catch { return rejected('INVALID_JSON'); }
    const error = matches(envelopeSchema, message, '$');
    if (error) return rejected('INVALID_ENVELOPE', error);
    const payloadError = matches(payloadSchemas[message.type], message.payload, '$.payload');
    if (payloadError) return rejected('INVALID_PAYLOAD', payloadError);
    return { kind: 'accepted', code: 'VALID', path: '$', message };
}
function canonical(value: unknown): string {
    if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
    if (value !== null && typeof value === 'object') {
        const object = value as Record<string, unknown>;
        return '{' + Object.keys(object).sort().map(key => JSON.stringify(key) + ':' + canonical(object[key])).join(',') + '}';
    }
    return JSON.stringify(value) ?? 'null';
}

/** No renderer/native imports. This exact receiver runs in Hermes, Cocos V8 and browser. */
export class Receiver {
    private sequence = -1;
    private initialized = false;
    private closed = false;
    private receipts = new Map<string, string>();
    constructor(readonly role: 'host' | 'game', readonly sessionId: string, readonly generation: number) {}
    accept(raw: string): Result {
        if (this.closed) return rejected('CLOSED');
        const decoded = decode(raw);
        if (!decoded.message) return decoded;
        const m = decoded.message;
        if (m.sessionId !== this.sessionId) return rejected('STALE_SESSION', '$.sessionId');
        if (m.generation !== this.generation) return rejected('STALE_GENERATION', '$.generation');
        if ((this.role === 'host' && (m.type === 'app.initialize' || m.type === 'probe.color' || m.type === 'probe.audioState')) ||
            (this.role === 'game' && (m.type === 'game.ready' || m.type === 'probe.audioMute'))) return rejected('WRONG_DIRECTION', '$.type');
        const signature = canonical({ type: m.type, payload: m.payload });
        const receipt = m.requestId === null ? undefined : this.receipts.get(m.requestId);
        if (receipt !== undefined) {
            if (receipt !== signature) return rejected('REQUEST_CONFLICT', '$.requestId');
            if (m.sequence > this.sequence + 1) return rejected('SEQUENCE_GAP', '$.sequence');
            if (m.sequence === this.sequence + 1) this.sequence = m.sequence;
            return { kind: 'duplicate', code: 'CACHED_NO_APPLY', path: '$.requestId', message: m };
        }
        if (m.sequence <= this.sequence) return rejected('REORDERED_SEQUENCE', '$.sequence');
        if (m.sequence !== this.sequence + 1) return rejected('SEQUENCE_GAP', '$.sequence');
        if (this.role === 'game' && !this.initialized && m.type !== 'app.initialize') return rejected('NOT_INITIALIZED');
        if (this.initialized && m.type === 'app.initialize') return rejected('ALREADY_INITIALIZED');
        if (m.requestId !== null && this.receipts.size >= 128) return rejected('RECEIPT_CAPACITY');
        if (m.type === 'app.initialize') this.initialized = true;
        this.sequence = m.sequence;
        if (m.requestId !== null) this.receipts.set(m.requestId, signature);
        return { ...decoded, code: 'ACCEPTED' };
    }
    close(): void { this.closed = true; this.receipts.clear(); }
}

export class Sender {
    private sequence = 0;
    constructor(readonly sessionId: string, readonly generation: number, private readonly clock: () => number = Date.now) {}
    message<T extends MessageType>(type: T, payload: Payloads[T], requestId: string | null): Envelope {
        return { version: 1, type, payload, requestId, sessionId: this.sessionId,
            generation: this.generation, sequence: this.sequence++, timestamp: this.clock() };
    }
}
export const INITIALIZE_PAYLOAD = {
    userNamespace: 'probe.guest', environment: 'test', hostBuild: 'rn.0.86.3',
    safeArea: { top: 0, right: 0, bottom: 0, left: 0, unit: 'logicalPoints', scale: 1 },
    settings: { musicGain: 0, sfxGain: 0, haptics: false, reducedMotion: false, notifications: false },
    settingsRevision: 0, initialRoute: null, externalRewardsEnabled: false,
};

/** Invalid fixtures do not consume the real sender's next sequence. */
export function invalidCases(next: Envelope): Array<{ id: string; raw: string; expected: string }> {
    const json = (patch: Record<string, unknown>) => JSON.stringify({ ...next, ...patch });
    return [
        { id: 'bad-json', raw: '{', expected: 'INVALID_JSON' },
        { id: 'bad-version', raw: json({ version: 2 }), expected: 'INVALID_ENVELOPE' },
        { id: 'bad-type', raw: json({ type: 'probe.unknown' }), expected: 'INVALID_ENVELOPE' },
        { id: 'bad-payload', raw: json({ payload: { token: 5 } }), expected: 'INVALID_PAYLOAD' },
        { id: 'stale-generation', raw: json({ generation: next.generation + 1 }), expected: 'STALE_GENERATION' },
        { id: 'stale-session', raw: json({ sessionId: 'probe.old' }), expected: 'STALE_SESSION' },
        { id: 'bad-sequence', raw: json({ sequence: next.sequence + 9 }), expected: 'SEQUENCE_GAP' },
        { id: 'extra-field', raw: json({ unexpected: true }), expected: 'INVALID_ENVELOPE' },
    ];
}
