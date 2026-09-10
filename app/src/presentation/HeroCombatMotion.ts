/** Proposed choreography anchored to the actual domain hit deadline, never a damage trigger. */
export function heroAttackTiming(hitDelayMs:number,elapsedMs=0) {
 if(!Number.isFinite(hitDelayMs)||hitDelayMs<0||!Number.isFinite(elapsedMs)||elapsedMs<0)throw Error('Invalid attack motion time');
 const anticipation=Math.min(80,hitDelayMs),release=hitDelayMs-anticipation,recovery=140;
 return {anticipationMs:Math.max(0,anticipation-elapsedMs),releaseMs:Math.max(0,release-Math.max(0,elapsedMs-anticipation)),recoveryMs:Math.max(0,recovery-Math.max(0,elapsedMs-hitDelayMs)),hitAtMs:Math.max(0,hitDelayMs-elapsedMs)};
}
export const heroCombatProfile={melee:{lungePx:12,tilt:-0.065},ranged:{lungePx:4,tilt:-0.025},magic:{lungePx:4,tilt:-0.035}} as const;
