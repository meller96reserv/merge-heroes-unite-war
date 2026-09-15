export interface Clock { utcMs(): number; monotonicMs(): number }
export interface RNG<State = number> { nextUint32(): number; snapshot(): State }
export type SaveCandidate = Readonly<{ slot: 'A' | 'B'; bytes: string }>;
export interface SaveStore {
  readCandidates(namespace: string): Promise<readonly SaveCandidate[]>;
  writeCandidate(namespace: string, slot: 'A' | 'B', bytes: string): Promise<void>;
  verifyCandidate(namespace: string, slot: 'A' | 'B'): Promise<string | null>;
  flush(): Promise<void>;
}
export interface Logger { error(code: string, detail: unknown): void }
export interface Analytics { track(name: string, fields: Readonly<Record<string, string | number | boolean>>): void }
export class FakeClock implements Clock {
  constructor(public wall = 0, public mono = 0) {}
  utcMs() { return this.wall; }
  monotonicMs() { return this.mono; }
  advance(ms: number) { if (!Number.isSafeInteger(ms) || ms < 0) throw Error('invalid elapsed'); this.wall += ms; this.mono += ms; }
}
export class FakeRNG implements RNG {
  private index = 0;
  constructor(private readonly values: readonly number[] = [1, 17, 1024]) {
    if (!values.length || values.some(v => !Number.isInteger(v) || v < 0 || v > 0xffffffff)) throw Error('invalid RNG fixture');
  }
  nextUint32() { return this.values[this.index++ % this.values.length]!; }
  snapshot() { return this.index; }
}
export class MemorySaveStore implements SaveStore {
  private slots = new Map<string, string>();
  failNext: 'write' | 'verify' | 'flush' | null = null;
  private fail(point: string) { if (this.failNext === point) { this.failNext = null; throw Error(`injected ${point} failure`); } }
  async readCandidates(namespace: string): Promise<SaveCandidate[]> {
    return (['A','B'] as const).flatMap(slot => { const bytes = this.slots.get(`${namespace}:${slot}`); return bytes === undefined ? [] : [{slot,bytes}]; });
  }
  async writeCandidate(namespace: string, slot: 'A' | 'B', bytes: string) { this.fail('write'); this.slots.set(`${namespace}:${slot}`,bytes); }
  async verifyCandidate(namespace: string, slot: 'A' | 'B') { this.fail('verify'); return this.slots.get(`${namespace}:${slot}`) ?? null; }
  async flush() { this.fail('flush'); }
}
export class RecordingServices implements Logger, Analytics {
  errors: {code: string; detail: unknown}[] = [];
  events: {name: string; fields: Readonly<Record<string, string | number | boolean>>}[] = [];
  error(code: string, detail: unknown) { this.errors.push({code,detail}); }
  track(name: string, fields: Readonly<Record<string, string | number | boolean>>) { this.events.push({name,fields: {...fields}}); }
}
