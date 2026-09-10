const {withPodfileProperties}=require('@expo/config-plugins');
/** Expo 57 precompiled modules reference a dynamic React.framework unavailable
 * with this RN source build. Compile the same Expo modules from source. */
module.exports=config=>withPodfileProperties(config,c=>{c.modResults.EXPO_USE_PRECOMPILED_MODULES='false';return c;});
