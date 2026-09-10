import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const localNode = resolve(root, '.tools/node-v22.23.2-darwin-arm64/bin/node');
const major = Number(process.versions.node.split('.')[0]);
const node = major === 22 ? process.execPath : existsSync(localNode) ? localNode : null;
if (!node) {
  console.error('Use Node 22 (.nvmrc): nvm install && nvm use, then retry.');
  process.exit(1);
}
const args = process.argv.slice(2);
// Expo 57 defaults to deleting native folders; preserve current projects by default.
if (args[0] === 'prebuild' && !args.includes('--clean') && !args.includes('--no-clean')) args.push('--no-clean');
const child = spawn(node, [resolve(dirname(require.resolve('expo/package.json')), 'bin/cli'), ...args], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, PATH: `${dirname(node)}${delimiter}${process.env.PATH ?? ''}` },
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
