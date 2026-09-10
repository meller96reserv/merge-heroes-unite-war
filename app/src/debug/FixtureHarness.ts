import { freeze } from '../../../game-core/src/events/EventBus';
/** Designer numbers are view data only, never a runtime balance import. */
export const fixtureNames = ['figma-battle-10','adapted-battle-15','button-states','combat-acceptance','hero-motion','frame-probe','effect-primitives','wheel-ui'] as const;
export type FixtureName = typeof fixtureNames[number];
export type VisualFixture = Readonly<{name: FixtureName; seed:number; utcMs:number; animationMs:number; slots:number; tiers:readonly number[]; gold:string; gems:string; stage:string}>;
export function loadFixture(name: string, animationMs=0): VisualFixture {
  if(!fixtureNames.includes(name as FixtureName))throw Error(`Unknown visual fixture: ${name}`);
  if(!Number.isFinite(animationMs)||animationMs<0)throw Error('Invalid animation marker');
  return freeze({name:name as FixtureName,seed:426,utcMs:1700000000000,animationMs,slots:name==='figma-battle-10'?10:15,tiers:[9,8,7,6,5,4,1,2,3,0],gold:'1.569',gems:'1.569',stage:'2-100'});
}
export function fixtureFromSearch(search: string) {
  const params=new URLSearchParams(search);const name=params.get('fixture');
  return name?loadFixture(name,Number(params.get('animationMs')??0)):null;
}
