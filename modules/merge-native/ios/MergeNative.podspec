Pod::Spec.new do |s|
  s.name = 'MergeNative'
  s.version = '1.0.0'
  s.summary = 'Rewarded-only Start.io integration for Merge Heroes Unite War'
  s.description = s.summary
  s.license = { :type => 'Proprietary' }
  s.author = 'Merge Heroes Unite War'
  s.homepage = 'https://support.start.io'
  s.platforms = { :ios => '16.4' }
  s.swift_version = '5.9'
  s.source = { :git => '' }
  s.static_framework = true
  s.dependency 'ExpoModulesCore'
  s.dependency 'StartAppSDK', '4.14.0'
  s.source_files = '**/*.{h,m,swift}'
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }
end
