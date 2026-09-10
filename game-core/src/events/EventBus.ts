export type EventMeta = Readonly<{ eventId: string; transactionId: string; revision: number; simulationTick: number }>;
export type DomainEvent<T extends string = string, P = unknown> = EventMeta & Readonly<{ type: T; payload: P }>;
export function freeze<T>(value: T): Readonly<T> {
  if (value !== null && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
/** Publish only committed batches. Reentrant publications wait for the current batch. */
export class EventBus<E extends DomainEvent> {
  private listeners = new Set<(batch: readonly E[]) => void>();
  private queue: (readonly E[])[] = [];
  private dispatching = false;
  constructor(private onError: (error: unknown) => void = () => {}) {}
  subscribe(listener: (batch: readonly E[]) => void): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }
  get listenerCount() { return this.listeners.size; }
  publish(batch: readonly E[]): void {
    // Events contain JSON-compatible value payloads, never references into a mutable draft.
    this.queue.push(freeze(JSON.parse(JSON.stringify(batch)) as E[]));
    if (this.dispatching) return;
    this.dispatching = true;
    try {
      while (this.queue.length) {
        const next = this.queue.shift()!;
        for (const listener of [...this.listeners]) {
          try { listener(next); } catch (error) { try { this.onError(error); } catch { /* observer failure cannot abort committed publication */ } }
        }
      }
    } finally { this.dispatching = false; }
  }
}
