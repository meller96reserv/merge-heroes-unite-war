const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
const existing = config.resolver.blockList;
const excluded = ['analysis', 'docs', 'spikes', '.tools'].map(folder => {
  const directory = path.resolve(__dirname, folder).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${directory}[/\\\\].*`);
});
config.resolver.blockList = [...(Array.isArray(existing) ? existing : existing ? [existing] : []), ...excluded];
module.exports = config;
