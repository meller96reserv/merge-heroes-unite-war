#import <NativeCocosHostSpec/NativeCocosHostSpec.h>
#import "KiselCocosRuntime.h"

@interface RCTCocosHost : NativeCocosHostSpecBase <NativeCocosHostSpec>
@end

@implementation RCTCocosHost
+ (NSString *)moduleName { return @"NativeCocosHost"; }

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeCocosHostSpecJSI>(params);
}

- (void)open:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  dispatch_async(dispatch_get_main_queue(), ^{
    __weak RCTCocosHost *weakModule = self;
    [KiselCocosRuntime shared].messageHandler = ^(NSString *raw) { [weakModule emitOnMessage:raw]; };
    [KiselCocosRuntime shared].audioHandler = ^(NSString *raw) { [weakModule emitOnAudioState:raw]; };
    @try { resolve([[KiselCocosRuntime shared] open]); }
    @catch (NSException *exception) { reject(@"OPEN_FAILED", exception.reason, nil); }
  });
}

- (void)send:(NSString *)raw resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  dispatch_async(dispatch_get_main_queue(), ^{
    NSString *status = [[KiselCocosRuntime shared] send:raw];
    if ([status isEqualToString:@"queued"]) resolve(status);
    else reject(status, @"Native Cocos transport rejected delivery", nil);
  });
}
@end
