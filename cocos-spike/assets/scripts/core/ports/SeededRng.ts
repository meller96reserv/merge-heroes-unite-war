import type {RNG} from './index';
/** xoshiro128** 1.1, public-domain algorithm by Blackman/Vigna.
 * https://prng.di.unimi.it/xoshiro128starstar.c
 * Project choice is PROPOSED; this is not a reference-game formula or a security RNG. */
const rotl = (x: number, k: number) => ((x << k) | (x >>> (32 - k))) >>> 0;
export class SeededRng implements RNG<readonly number[]> {
  private s: [number, number, number, number];
  constructor(state: readonly number[]) {
    if (state.length !== 4 || state.some(n => !Number.isInteger(n) || n < 0 || n > 0xffffffff) || state.every(n => n === 0)) throw Error('Invalid xoshiro state');
    this.s = [...state] as typeof this.s;
  }
  nextUint32(): number {
    const s = this.s, result = Math.imul(rotl(Math.imul(s[1], 5), 7), 9) >>> 0, t = s[1] << 9;
    s[2] ^= s[0]; s[3] ^= s[1]; s[1] ^= s[2]; s[0] ^= s[3]; s[2] ^= t; s[3] = rotl(s[3], 11);
    this.s = s.map(n => n >>> 0) as typeof s;
    return result;
  }
  below(limit: number): number {
    if (!Number.isInteger(limit) || limit < 1 || limit > 0x100000000) throw Error('Invalid RNG bound');
    const ceiling = 0x100000000 - (0x100000000 % limit);
    let value: number; do {value = this.nextUint32();} while (value >= ceiling);
    return value % limit;
  }
  snapshot(): readonly number[] {return [...this.s];}
}
export function rngStreams(combat: readonly number[], reward: readonly number[], presentation: readonly number[]) {
  return {combat: new SeededRng(combat), reward: new SeededRng(reward), presentation: new SeededRng(presentation)};
}
