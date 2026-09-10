import {assertState,type GameState} from '../model/GameState';import {saveSchema} from './SaveSchema';import {validateSchema} from './SchemaValidation';import {SeededRng} from '../ports/SeededRng';
export function checksum(text:string){let h=0x811c9dc5;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),0x01000193)>>>0;return h.toString(16).padStart(8,'0');}
function canonical(value:unknown):unknown {
 if(Array.isArray(value))return value.map(canonical);
 if(value!==null&&typeof value==='object')return Object.fromEntries(Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,v])=>[k,canonical(v)]));
 return value;
}
export function validateSave(value:unknown,supportedDataVersions?:readonly string[]):GameState {
 const errors=validateSchema(value,saveSchema);if(errors.length)throw Error(`Invalid save: ${errors.slice(0,8).join(', ')}`);
 const state=value as GameState;
 if(supportedDataVersions&&!supportedDataVersions.includes(state.dataVersion))throw Error('Unsupported save data version');
 assertState(state);new SeededRng(state.data.rng.combatState);new SeededRng(state.data.rng.rewardState);
 if(state.data.board.length!==15||state.data.board.some(s=>s.slotId<0||s.slotId>=15)||new Set(state.data.equipment.map(e=>e.id)).size!==state.data.equipment.length)throw Error('Invalid saved identities');
 return state;
}
export function encodeSave(state:GameState):string {
 validateSave(state);const payload=JSON.stringify(canonical(state));return JSON.stringify({format:1,payload,checksum:checksum(payload)});
}
export function decodeSave(bytes:string,supportedDataVersions?:readonly string[]):GameState {
 const envelope:unknown=JSON.parse(bytes);
 if(envelope===null||typeof envelope!=='object'||Array.isArray(envelope))throw Error('Invalid save envelope');
 const e=envelope as Record<string,unknown>;
 if(Object.keys(e).length!==3||e.format!==1||typeof e.payload!=='string'||checksum(e.payload)!==e.checksum)throw Error('Invalid save envelope');
 return validateSave(JSON.parse(e.payload),supportedDataVersions);
}
