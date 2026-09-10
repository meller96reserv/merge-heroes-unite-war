require 'json'
require 'pathname'
require 'shellwords'
require 'xcodeproj'

root = Pathname.new(__dir__).join('../..').realpath
ios = root.join('spikes/rn-cocos/rn-probe/ios')
config = JSON.parse(root.join('.tools/cocos-ios-host/settings.json').read)
project = Xcodeproj::Project.open(ios.join('KiselNativeProbe.xcodeproj'))
target = project.targets.find { |item| item.name == 'KiselNativeProbe' }
group = project.main_group.find_subpath('KiselNativeProbe')
%w[RCTCocosHost.mm KiselCocosRuntime.mm KiselCocosRuntime.h].each do |name|
  path = "KiselNativeProbe/#{name}"
  ref = group.files.find { |file| [name, path].include?(file.path) } || group.new_file(path)
  ref.path = path
  next unless name.end_with?('.mm')
  build = target.source_build_phase.files.find { |item| item.file_ref == ref } || target.source_build_phase.add_file_reference(ref)
  if name == 'KiselCocosRuntime.mm'
    build.settings = { 'COMPILER_FLAGS' => config['definitions'].map { |value| "-D#{value}".shellescape }.join(' ') }
  end
end
relative_setting = lambda do |value|
  if value.start_with?(root.to_s)
    '$(SRCROOT)/' + Pathname.new(value).relative_path_from(ios).to_s
  else
    value
  end
end
target.build_configurations.each do |build|
  next unless build.name == 'Debug'
  build.build_settings['HEADER_SEARCH_PATHS'] = ['$(inherited)'] + config['headers'].reject { |p| p == '$(inherited)' }.map(&relative_setting)
  build.build_settings['OTHER_LDFLAGS'] = ['$(inherited)', '-ObjC'] + config['ldflags'].map(&relative_setting)
end
phase = target.shell_script_build_phases.find { |item| item.name == 'Copy Cocos probe data' } || target.new_shell_script_build_phase('Copy Cocos probe data')
phase.shell_script = "set -e\n/usr/bin/ditto \"$SRCROOT/../../cocos-probe/build/ios/data\" \"$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH\"\n"
phase.always_out_of_date = '1'
project.save
