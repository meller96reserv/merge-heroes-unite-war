cmake_minimum_required(VERSION 3.13)
project(appmodules)
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Fail at build time if the app module was omitted by a stale pre-codegen configure.
if(NOT TARGET react_codegen_NativeCocosHostSpec)
  message(FATAL_ERROR "NativeCocosHost codegen missing: generateCodegenArtifactsFromSchema before CMake configure")
endif()
