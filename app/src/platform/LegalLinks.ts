import {Linking} from 'react-native';
export type LegalDocument='terms'|'privacy';
const configured={terms:process.env.EXPO_PUBLIC_TERMS_URL,privacy:process.env.EXPO_PUBLIC_PRIVACY_URL};
export function legalURL(document:LegalDocument){
 const text=configured[document];if(!text)return null;
 try{const url=new URL(text);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}
}
export async function openLegalDocument(document:LegalDocument){const url=legalURL(document);if(!url)return false;try{await Linking.openURL(url);return true;}catch{return false;}}
