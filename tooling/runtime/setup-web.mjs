import { createRequire } from 'node:module';
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
const require = createRequire(import.meta.url);
// Match Skia's own resolved CanvasKit dependency, including when npm nests it.
const skiaRequire = createRequire(require.resolve('@shopify/react-native-skia/package.json'));
const source = join(dirname(skiaRequire.resolve('canvaskit-wasm/package.json')), 'bin/full/canvaskit.wasm');
await mkdir('public', { recursive: true });
await copyFile(source, 'public/canvaskit.wasm');
console.log('Prepared local CanvasKit from the locked Skia dependency.');
