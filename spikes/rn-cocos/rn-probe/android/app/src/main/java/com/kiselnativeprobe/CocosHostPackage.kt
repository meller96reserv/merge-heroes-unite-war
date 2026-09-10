package com.kiselnativeprobe

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class CocosHostPackage : BaseReactPackage() {
  override fun getModule(name: String, context: ReactApplicationContext): NativeModule? =
    if (name == CocosHostModule.NAME) CocosHostModule(context) else null

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(CocosHostModule.NAME to ReactModuleInfo(
      CocosHostModule.NAME, CocosHostModule.NAME, false, false, false, true))
  }
}
