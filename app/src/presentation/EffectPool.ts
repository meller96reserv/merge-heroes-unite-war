export type EffectLease<T> = Readonly<{slot: number; generation: number; value: T}>;
type Slot<T> = {value: T; generation: number; active: boolean; releasing: boolean; cleanup: (() => void)[]};
/** Bounded cosmetic resources. Exhaustion drops presentation, never a domain event. */
export class EffectPool<T> {
  private slots: Slot<T>[] = [];
  private disposed = false;
  constructor(readonly capacity: number, private create: (slot: number) => T,
    private reset: (value: T) => void, private destroy: (value: T) => void = () => {}) {
    if (!Number.isInteger(capacity) || capacity < 0 || capacity > 1024) throw Error('Invalid effect pool capacity');
  }
  acquire(): EffectLease<T> | null {
    if (this.disposed) return null;
    let index = this.slots.findIndex(s => !s.active && !s.releasing);
    if (index < 0) {
      if (this.slots.length >= this.capacity) return null;
      index = this.slots.length;
      this.slots.push({value: this.create(index), generation: 0, active: false, releasing: false, cleanup: []});
    }
    const slot = this.slots[index]!;
    slot.active = true;
    return Object.freeze({slot: index, generation: ++slot.generation, value: slot.value});
  }
  private current(lease: EffectLease<T>) {
    const slot = this.slots[lease.slot];
    return slot?.active && slot.generation === lease.generation && slot.value === lease.value ? slot : undefined;
  }
  own(lease: EffectLease<T>, cleanup: () => void): boolean {
    const slot = this.current(lease);
    if (!slot) {cleanup(); return false;}
    slot.cleanup.push(cleanup);
    return true;
  }
  release(lease: EffectLease<T>): boolean {
    const slot = this.current(lease);
    if (!slot) return false;
    slot.active = false; slot.releasing = true;
    const errors: unknown[] = [], callbacks = slot.cleanup.splice(0).reverse();
    // Cancel worklets/listeners/timers and dispose transient Skia resources before value reuse.
    for (const callback of callbacks) try {callback();} catch (error) {errors.push(error);}
    try {this.reset(slot.value); slot.releasing = false;} catch (error) {errors.push(error);}
    // A failed reset quarantines this slot until disposal; unsafe values never re-enter play.
    if (errors.length) throw new AggregateError(errors, 'Effect cleanup failed');
    return true;
  }
  clear() {
    const active = this.slots.flatMap((s,slot) => s.active ? [{slot,generation:s.generation,value:s.value}] : []);
    const errors: unknown[] = [];
    for (const lease of active) try {this.release(lease);} catch (error) {errors.push(error);}
    if (errors.length) throw new AggregateError(errors, 'Effect pool clear failed');
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    const errors: unknown[] = [];
    try {this.clear();} catch (error) {errors.push(error);}
    for (const slot of this.slots) try {this.destroy(slot.value);} catch (error) {errors.push(error);}
    this.slots = [];
    if (errors.length) throw new AggregateError(errors, 'Effect pool disposal failed');
  }
  get stats() {return {allocated: this.slots.length, active: this.slots.filter(s => s.active).length,
    callbacks: this.slots.reduce((n,s) => n+s.cleanup.length,0), capacity: this.capacity};}
}
