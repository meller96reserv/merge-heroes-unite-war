const fs = require('node:fs');
const path = require('node:path');
module.exports = ({config}) => {
  // Project analytics identifier comes from the app-specific source, never a shared example.
  // SDK app IDs are build configuration; do not print the resolved Expo config in logs.
  const source = fs.readFileSync(path.join(__dirname,'docs/tz/Merge Heroes Unite War тз на разработку.md'),'utf8');
  const apiKey = process.env.EXPO_PUBLIC_APPMETRICA_API_KEY || source.match(/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}/i)?.[0];
  return {...config,extra:{...config.extra,appmetricaApiKey:apiKey},plugins:[...(config.plugins||[]),'./tooling/native/with-candidate-native.cjs',['expo-notifications',{defaultChannel:'game-rewards'}]]};
};
