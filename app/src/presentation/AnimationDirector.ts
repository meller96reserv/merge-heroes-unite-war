import profiles from './MotionProfiles.json';

export type MotionEvent = keyof typeof profiles;
export type MotionMode = 'full' | 'low' | 'reduced';
export type MotionProfile = ReturnType<typeof resolveMotion>;
export function resolveMotion(event: MotionEvent, mode: MotionMode) {
  const profile = profiles[event];
  if (!profile) throw Error('Unknown motion profile');
  return Object.freeze({...profile, event, mode,
    durationMs: mode === 'reduced' ? Math.min(140, profile.durationMs) : profile.durationMs,
    loop: mode !== 'reduced' && profile.loop,
    spatial: mode !== 'reduced', particleScale: mode === 'full' ? 1 : mode === 'low' ? 0.5 : 0,
    shakeAllowed: mode === 'full',
  });
}
export type MotionMount = Readonly<{target: string; generation: number}>;
export type MotionTicket = Readonly<{mount: MotionMount; sequence: number; profile: MotionProfile}>;
type Active = {ticket: MotionTicket; cleanup: () => void};
type Mounted = {mount: MotionMount; reconcile: () => void; active?: Active; terminal: boolean; seen: Set<string>};
/** Scene-owned cosmetic arbitration. It has no clock, RNG, domain mutation or reward callback. */
export class AnimationDirector {
  private mounts = new Map<string, Mounted>();
  private generation = 0;
  private sequence = 0;
  constructor(private mode: MotionMode = 'full', readonly capacity = 128) {
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1024) throw Error('Invalid motion capacity');
  }
  mount(target: string, reconcile: () => void): MotionMount {
    if (!target) throw Error('Missing motion target');
    const previous = this.mounts.get(target);
    if (previous) this.unmount(previous.mount);
    if (this.mounts.size >= this.capacity) throw Error('Motion mount capacity exceeded');
    const mount = Object.freeze({target, generation: ++this.generation});
    this.mounts.set(target, {mount, reconcile, terminal: false, seen: new Set()});
    return mount;
  }
  private current(mount: MotionMount) {
    const entry = this.mounts.get(mount.target);
    return entry?.mount.generation === mount.generation ? entry : undefined;
  }
  play(mount: MotionMount, event: MotionEvent, eventKey: string, start: (ticket: MotionTicket) => () => void): MotionTicket | null {
    const entry = this.current(mount);
    if (!entry || !eventKey || entry.terminal || entry.seen.has(eventKey)) return null;
    const profile = resolveMotion(event, this.mode);
    // A bounded event window coalesces repeats; mount generations reject old completion callbacks.
    entry.seen.add(eventKey);
    if (entry.seen.size > 256) entry.seen.delete(entry.seen.values().next().value!);
    if (entry.active && entry.active.ticket.profile.priority > profile.priority) return null;
    this.cancel(mount);
    const ticket = Object.freeze({mount, sequence: ++this.sequence, profile});
    const active: Active = {ticket, cleanup: () => {}};
    entry.active = active;
    entry.terminal = profile.terminal;
    try {
      const cleanup = start(ticket);
      // Synchronous finish/unmount during start must not retain newly allocated resources.
      if (this.current(mount)?.active === active) active.cleanup = cleanup;
      else cleanup();
    } catch (error) {this.finish(ticket); throw error;}
    return ticket;
  }
  finish(ticket: MotionTicket): boolean {
    const entry = this.current(ticket.mount);
    if (entry?.active?.ticket.sequence !== ticket.sequence) return false;
    this.cancel(ticket.mount);
    return true;
  }
  cancel(mount: MotionMount): boolean {
    const entry = this.current(mount), active = entry?.active;
    if (!entry || !active) return false;
    entry.active = undefined;
    try {active.cleanup();} finally {entry.reconcile();}
    return true;
  }
  unmount(mount: MotionMount) {
    if (!this.current(mount)) return false;
    try {this.cancel(mount);} finally {this.mounts.delete(mount.target);}
    return true;
  }
  setMode(mode: MotionMode) {
    if (this.mode === mode) return;
    this.mode = mode;
    const errors: unknown[] = [];
    for (const entry of this.mounts.values()) try {this.cancel(entry.mount);} catch (error) {errors.push(error);}
    if (errors.length) throw new AggregateError(errors, 'Motion mode cleanup failed');
  }
  dispose() {
    const errors: unknown[] = [];
    for (const entry of [...this.mounts.values()]) try {this.unmount(entry.mount);} catch (error) {errors.push(error);}
    if (errors.length) throw new AggregateError(errors, 'Motion disposal failed');
  }
  get stats() {return {mounts: this.mounts.size, active: [...this.mounts.values()].filter(e => e.active).length};}
}
