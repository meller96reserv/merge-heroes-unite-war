import type { VisualFixture } from './FixtureHarness';
// Metro removes the require branch and fixture catalogue from production exports.
export const currentFixture: VisualFixture | null = __DEV__ && typeof globalThis.location !== 'undefined'
  ? require('./FixtureHarness').fixtureFromSearch(globalThis.location.search) : null;
