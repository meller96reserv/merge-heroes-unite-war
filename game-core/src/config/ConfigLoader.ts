import { freeze } from '../events/EventBus';
export type SchemaIssue = Readonly<{ path: string; message: string }>;
/** Adapter is a generated schema checker; it must validate before casting unknown data. */
export interface SchemaValidator<T> { check(value: unknown): readonly SchemaIssue[]; readonly type?: T }
export type ConfigRules<T> = Readonly<{
  unique?: readonly {path: string; ids: readonly string[]}[];
  references?: readonly {path: string; id: string | null; allowed: readonly string[]}[];
  integers?: readonly {path: string; value: number; min: number; max: number}[];
  graphs?: readonly {path: string; edges: Readonly<Record<string, string | null>>}[];
  inspect?: (data: T) => readonly SchemaIssue[];
}>;
export function loadConfig<T>(file: string, json: string, schema: SchemaValidator<T>, rules: (data: T) => ConfigRules<T>): Readonly<T> {
  const fail = (path: string, message: string): never => { throw Error(`${file}:${path}: ${message}`); };
  let value: unknown;
  try { value = JSON.parse(json); } catch { return fail('$','invalid JSON'); }
  for (const issue of schema.check(value)) fail(issue.path,issue.message);
  const data = value as T;
  const checks = rules(data);
  for (const {path,ids} of checks.unique ?? []) if (new Set(ids).size !== ids.length) fail(path,'duplicate ID');
  for (const {path,id,allowed} of checks.references ?? []) if(id !== null && !allowed.includes(id)) fail(path,`unknown reference ${id}`);
  for (const {path,value,min,max} of checks.integers ?? []) if(!Number.isSafeInteger(value) || value<min || value>max) fail(path,'integer out of bounds');
  for (const {path,edges} of checks.graphs ?? []) {
    for (const start of Object.keys(edges)) {
      const visited = new Set<string>();let id: string | null = start;
      while (id !== null) {
        if(visited.has(id)) fail(path,`cycle at ${id}`);
        if(!Object.hasOwn(edges,id)) fail(path,`dangling edge ${id}`);
        visited.add(id); id = edges[id]!;
      }
    }
  }
  for (const issue of checks.inspect?.(data) ?? []) fail(issue.path,issue.message);
  return freeze(data);
}
