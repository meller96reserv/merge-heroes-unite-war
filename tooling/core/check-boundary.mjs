import ts from 'typescript';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

export function checkSource(source, filename, sourceRoot) {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const errors = [];
  function specifier(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return node.moduleSpecifier;
    if (ts.isImportTypeNode(node)) return ts.isLiteralTypeNode(node.argument) ? node.argument.literal : node.argument;
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) return node.moduleReference.expression;
    if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || ts.isIdentifier(node.expression) && node.expression.text === 'require')) return node.arguments[0] ?? node;
    return undefined;
  }
  function visit(node) {
    const value = specifier(node);
    if (value) {
      const name = ts.isStringLiteralLike(value) ? value.text : '';
      const target = relative(sourceRoot, resolve(filename, '..', name));
      if (!name.startsWith('.') || target === '..' || target.startsWith('../') || isAbsolute(target)) {
        const position = file.getLineAndCharacterOfPosition(value.getStart(file));
        errors.push(`${filename}:${position.line + 1}: forbidden core dependency ${name || '<dynamic expression>'}`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return errors;
}
async function sources(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await sources(path));
    else if (path.endsWith('.ts')) files.push(path);
  }
  return files;
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = resolve('game-core/src');
  const errors = [];
  for (const file of await sources(root)) errors.push(...checkSource(await readFile(file, 'utf8'), file, root));
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Core dependency direction PASS: only internal domain imports.');
}
