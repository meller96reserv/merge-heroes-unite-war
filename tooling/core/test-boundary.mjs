import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import ts from 'typescript';
import { checkSource } from './check-boundary.mjs';
const root = resolve('game-core/src');
const file = join(root, 'negative.ts');
const denied = [
  `import { View } from 'react-native';`,
  `import type { SkImage } from '@shopify/react-native-skia';`,
  `export { default } from '../../app/src/App';`,
  `const load = () => import('react-native-reanimated');`,
  `type T = import('react-native-gesture-handler').State;`,
  `const x = require('node:fs');`,
  `const x = import(variable);`,
];
for (const source of denied) assert.equal(checkSource(source, file, root).length, 1, source);
assert.deepEqual(checkSource(`export type { DomainState } from './model/DomainState';`, file, root), []);
const temporary = await mkdtemp(join(tmpdir(), 'kisel-core-boundary-'));
try {
  const filename = join(temporary, 'globals.ts');
  await writeFile(filename, 'document.body; window.location; process.exit(); Buffer.from("x");');
  const config = ts.readConfigFile(resolve('game-core/tsconfig.json'), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, resolve('game-core'));
  const program = ts.createProgram([filename], { ...parsed.options, rootDir: temporary, noEmit: true });
  const messages = ts.getPreEmitDiagnostics(program).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' '));
  for (const name of ['document', 'window', 'process', 'Buffer']) assert.ok(messages.some(m => m.includes(`'${name}'`)), messages.join('\n'));
} finally { await rm(temporary, { recursive: true, force: true }); }
console.log('PASS: 7 forbidden import forms, allowed internal type export, 4 unavailable browser/Node globals.');
