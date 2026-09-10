export type InputOwner = 'board' | 'button' | 'tutorial' | 'modal';
const priority: Record<InputOwner, number> = {board: 0, button: 1, tutorial: 2, modal: 3};
/** A closing overlay keeps the pointer captured until its up/cancel is consumed. */
export class InputRouter {
  private capture: {pointer: number; owner: InputOwner} | null = null;
  private layers = new Set<InputOwner>();
  setLayer(owner: 'modal' | 'tutorial', active: boolean) {if (active) this.layers.add(owner); else this.layers.delete(owner);}
  down(pointer: number, owner: InputOwner): boolean {
    if (this.capture || [...this.layers].some(layer => priority[layer] > priority[owner])) return false;
    this.capture = {pointer, owner}; return true;
  }
  owns(pointer: number, owner: InputOwner) {return this.capture?.pointer === pointer && this.capture.owner === owner;}
  up(pointer: number): InputOwner | null {
    if (this.capture?.pointer !== pointer) return null;
    const owner = this.capture.owner; this.capture = null; return owner;
  }
  cancel(pointer?: number) {if (pointer === undefined || this.capture?.pointer === pointer) this.capture = null;}
}
