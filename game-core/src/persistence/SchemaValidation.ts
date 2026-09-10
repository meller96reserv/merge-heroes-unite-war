export type Schema={type?:string;const?:unknown;enum?:unknown[];anyOf?:Schema[];properties?:Record<string,Schema>;required?:string[];additionalProperties?:boolean|Schema;items?:Schema;minimum?:number;maximum?:number;minItems?:number;maxItems?:number;pattern?:string;minLength?:number;maxLength?:number;[annotation:string]:unknown};
/** Subset used by the checked-in save schema. Generator rejects unsupported keywords. */
export function validateSchema(value:unknown,schema:Schema,path='$'):string[] {
 if(schema.anyOf)return schema.anyOf.some(s=>validateSchema(value,s,path).length===0)?[]:[`${path}: anyOf`];
 if(Object.hasOwn(schema,'const')&&value!==schema.const)return [`${path}: const`];
 if(schema.enum&&!schema.enum.includes(value))return [`${path}: enum`];
 const errors:string[]=[];
 switch(schema.type){
  case 'null':if(value!==null)errors.push(`${path}: null`);break;
  case 'boolean':if(typeof value!=='boolean')errors.push(`${path}: boolean`);break;
  case 'string':if(typeof value!=='string'||(schema.pattern&&!new RegExp(schema.pattern).test(value))||(typeof value==='string'&&((schema.minLength!==undefined&&[...value].length<schema.minLength)||(schema.maxLength!==undefined&&[...value].length>schema.maxLength))))errors.push(`${path}: string`);break;
  case 'number':case 'integer':
   if(typeof value!=='number'||!Number.isFinite(value)||(schema.type==='integer'&&!Number.isSafeInteger(value))||(schema.minimum!==undefined&&value<schema.minimum)||(schema.maximum!==undefined&&value>schema.maximum))errors.push(`${path}: number`);break;
  case 'array':
   if(!Array.isArray(value))return [`${path}: array`];
   if((schema.minItems!==undefined&&value.length<schema.minItems)||(schema.maxItems!==undefined&&value.length>schema.maxItems))errors.push(`${path}: length`);
   if(schema.items)value.forEach((v,i)=>errors.push(...validateSchema(v,schema.items!,`${path}[${i}]`)));break;
  case 'object':
   if(value===null||typeof value!=='object'||Array.isArray(value))return [`${path}: object`];
   for(const key of schema.required??[])if(!Object.hasOwn(value,key))errors.push(`${path}.${key}: required`);
   for(const [key,v] of Object.entries(value)){
    const property=schema.properties&&Object.hasOwn(schema.properties,key)?schema.properties[key]:undefined;
    if(property)errors.push(...validateSchema(v,property,`${path}.${key}`));
    else if(schema.additionalProperties===false)errors.push(`${path}.${key}: unexpected`);
    else if(typeof schema.additionalProperties==='object')errors.push(...validateSchema(v,schema.additionalProperties,`${path}.${key}`));
   }break;
 }
 return errors;
}
