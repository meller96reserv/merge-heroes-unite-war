/** PROPOSED v1: 50ms steps, five steps per frame; excess stall time is discarded.
 * Presentation wall time never advances suspended combat. */
export class SimulationClock {
  private remainder = 0;
  private paused = false;
  private count = 0;
  constructor(readonly stepMs = 50, readonly maxCatchup = 5) {
    if (!Number.isSafeInteger(stepMs) || stepMs <= 0 || !Number.isSafeInteger(maxCatchup) || maxCatchup <= 0) throw Error('Invalid simulation clock');
  }
  get tick() {return this.count;}
  suspend() {this.paused = true; this.remainder = 0;}
  resume() {this.paused = false;}
  advance(elapsedMs: number, step: (tick: number, stepMs: number) => void): {steps: number; droppedMs: number} {
    if (!Number.isFinite(elapsedMs) || elapsedMs < 0) throw Error('Invalid elapsed time');
    if (this.paused) return {steps: 0, droppedMs: 0};
    this.remainder += elapsedMs;
    const due = Math.floor(this.remainder / this.stepMs), steps = Math.min(due, this.maxCatchup);
    this.remainder -= due * this.stepMs;
    for (let i = 0; i < steps; i++) step(++this.count, this.stepMs);
    return {steps, droppedMs: (due - steps) * this.stepMs};
  }
}
