import {Directory,File,Paths} from 'expo-file-system';
import {NativeSaveStore,type PrivateFiles} from './NativeSaveStore';
export function createSaveStore(){
 const directory=new Directory(Paths.document,'merge-heroes-saves');directory.create({intermediates:true,idempotent:true});
 const activeMoves=new Set<File>();
 const files:PrivateFiles={
  // Snapshot-sized reads stay synchronous: Expo 57 async text can outlive its
  // shared native File handle under Hermes GC. No borrowed handle escapes.
  async read(path){const file=new File(directory,path);return file.exists?file.textSync():null;},
  async write(path,bytes){const file=new File(directory,path);file.create({overwrite:true});file.write(bytes);},
  async replace(source,destination){
   const from=new File(directory,source),to=new File(directory,destination);
   // Expo 57 move is asynchronous. Retain both native handles through the
   // awaited rename; verification may not race an unfinished replacement.
   activeMoves.add(from);activeMoves.add(to);
   try{await from.move(to,{overwrite:true});}finally{activeMoves.delete(from);activeMoves.delete(to);}
  },
  async flush(){/* Expo closes each write; physical power-loss/fsync guarantee is a native release gate. */},
 };
 return new NativeSaveStore(files);
}
