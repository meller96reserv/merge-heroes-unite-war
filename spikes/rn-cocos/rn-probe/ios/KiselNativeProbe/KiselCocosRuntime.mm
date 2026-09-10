#import "KiselCocosRuntime.h"
#import <AVFoundation/AVFoundation.h>
#include <boost/assert.hpp>
#import "platform/ios/View.h"
#import "platform/ios/AppDelegateBridge.h"
#include "platform/ios/IOSPlatform.h"
#import "platform/apple/JsbBridge.h"

@interface KiselCocosController : UIViewController
@end
@implementation KiselCocosController
- (BOOL)prefersStatusBarHidden { return YES; }
- (UIInterfaceOrientationMask)supportedInterfaceOrientations { return UIInterfaceOrientationMaskPortrait; }
@end

@interface KiselCocosRuntime ()
@property(nonatomic, strong) UIViewController *rnController;
@property(nonatomic, strong) KiselCocosController *cocosController;
@property(nonatomic, strong) AppDelegateBridge *delegateBridge;
// Cocos 3.8.8 JsbBridge is non-ARC and only assigns its callback pointer.
// Keep an owned heap block alive for the retained engine's entire lifetime.
@property(nonatomic, copy) ICallback nativeCallback;
@property(nonatomic, weak) UIWindow *window;
@property(nonatomic) BOOL initialized;
@property(nonatomic) BOOL visible;
@property(nonatomic) BOOL renderActive;
@property(nonatomic) NSUInteger enters;
@property(nonatomic) BOOL audioInterrupted;
@property(nonatomic) BOOL audioRouteBlocked;
@end

@implementation KiselCocosRuntime
- (instancetype)init {
  if ((self = [super init])) {
    NSNotificationCenter *notifications = NSNotificationCenter.defaultCenter;
    [notifications addObserver:self selector:@selector(appWillResignActive:)
                          name:UIApplicationWillResignActiveNotification object:nil];
    [notifications addObserver:self selector:@selector(appDidBecomeActive:)
                          name:UIApplicationDidBecomeActiveNotification object:nil];
    [notifications addObserver:self selector:@selector(audioInterruption:)
                          name:AVAudioSessionInterruptionNotification object:nil];
    [notifications addObserver:self selector:@selector(audioRoute:)
                          name:AVAudioSessionRouteChangeNotification object:nil];
  }
  return self;
}

- (void)appWillResignActive:(NSNotification *)notification {
  if (self.visible) [self setRendering:NO reason:@"app-inactive"];
  [self publishAudio:@"app-inactive"];
}

- (void)appDidBecomeActive:(NSNotification *)notification {
  if (self.visible) [self setRendering:YES reason:@"app-active"];
  [self publishAudio:@"app-active"];
}

- (void)audioInterruption:(NSNotification *)notification {
  NSDictionary *info = notification.userInfo;
  dispatch_async(dispatch_get_main_queue(), ^{
    BOOL began = [info[AVAudioSessionInterruptionTypeKey] unsignedIntegerValue] == AVAudioSessionInterruptionTypeBegan;
    BOOL shouldResume = ([info[AVAudioSessionInterruptionOptionKey] unsignedIntegerValue] & AVAudioSessionInterruptionOptionShouldResume) != 0;
    self.audioInterrupted = began || !shouldResume;
    [self publishAudio:began ? @"interruption-began" : @"interruption-ended"];
  });
}

- (void)audioRoute:(NSNotification *)notification {
  NSUInteger reason = [notification.userInfo[AVAudioSessionRouteChangeReasonKey] unsignedIntegerValue];
  dispatch_async(dispatch_get_main_queue(), ^{
    if (reason == AVAudioSessionRouteChangeReasonOldDeviceUnavailable) self.audioRouteBlocked = YES;
    if (reason == AVAudioSessionRouteChangeReasonNewDeviceAvailable) self.audioRouteBlocked = NO;
    [self publishAudio:[NSString stringWithFormat:@"route:%lu", (unsigned long)reason]];
  });
}

- (void)publishAudio:(NSString *)reason {
  NSAssert(NSThread.isMainThread, @"Audio focus belongs to native main thread");
  BOOL allowed = self.visible && self.renderActive && !self.audioInterrupted && !self.audioRouteBlocked;
  NSError *error = nil;
  if (allowed) {
    // Match the pinned Cocos OpenAL session category; host still gates playback on interruption.
    AVAudioSession *session = AVAudioSession.sharedInstance;
    allowed = [session setCategory:AVAudioSessionCategoryAmbient error:&error] && [session setActive:YES error:&error];
  }
  NSDictionary *state = @{@"focus": @(allowed), @"active": @(self.visible && self.renderActive), @"reason": reason};
  NSData *data = [NSJSONSerialization dataWithJSONObject:state options:0 error:nil];
  NSString *raw = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  NSLog(@"[KiselAudio] native-state=%@ error=%@", raw, error);
  if (self.audioHandler) self.audioHandler(raw);
}

- (void)setRendering:(BOOL)active reason:(NSString *)reason {
  NSAssert(NSThread.isMainThread, @"Lifecycle must run on main");
  if (!self.initialized || self.renderActive == active) return;
  self.renderActive = active;
  if (active) [self.delegateBridge applicationDidBecomeActive:UIApplication.sharedApplication];
  else [self.delegateBridge applicationWillResignActive:UIApplication.sharedApplication];
  NSLog(@"[KiselLifecycle] iOS renderActive=%d reason=%@ engineOwners=1 enters=%lu", active, reason, (unsigned long)self.enters);
}

+ (instancetype)shared {
  static KiselCocosRuntime *instance;
  static dispatch_once_t once;
  dispatch_once(&once, ^{ instance = [KiselCocosRuntime new]; });
  return instance;
}

- (NSString *)open {
  NSAssert(NSThread.isMainThread, @"Cocos UIKit/runtime thread must be main");
  if (self.visible) return @"already-open";
  UIWindow *window = UIApplication.sharedApplication.delegate.window;
  NSAssert(window.rootViewController != nil, @"RN root controller missing");
  self.window = window;
  self.rnController = window.rootViewController;
  if (!self.initialized) {
    auto *platform = cc::BasePlatform::getPlatform();
    const int initResult = platform->init();
    if (initResult != 0) [NSException raise:@"CocosInitFailed" format:@"Cocos platform init=%d", initResult];
    self.cocosController = [KiselCocosController new];
    self.cocosController.view = [[View alloc] initWithFrame:window.bounds];
    self.cocosController.view.multipleTouchEnabled = YES;
    self.delegateBridge = [AppDelegateBridge new];
    __weak KiselCocosRuntime *weakRuntime = self;
    self.nativeCallback = ^(NSString *channel, NSString *raw) {
      KiselCocosRuntime *runtime = weakRuntime;
      if (![channel isEqualToString:@"kisel.protocol.v1"] || raw == nil) return;
      NSUInteger bytes = [raw lengthOfBytesUsingEncoding:NSUTF8StringEncoding];
      if (bytes > 65536) { NSLog(@"[KiselBridge] G2H rejected OVERSIZE bytes=%lu", (unsigned long)bytes); return; }
      NSAssert(NSThread.isMainThread, @"Cocos callback must run on its main engine thread");
      NSLog(@"[KiselBridge] G2H mainThread=%d bytes=%lu", NSThread.isMainThread, (unsigned long)bytes);
      if (runtime.visible && runtime.renderActive && runtime.messageHandler) runtime.messageHandler(raw);
    };
    [[JsbBridge sharedInstance] setCallback:self.nativeCallback];
    UIButton *close = [UIButton buttonWithType:UIButtonTypeSystem];
    close.accessibilityIdentifier = @"dismiss-cocos";
    [close setTitle:@"Return to RN" forState:UIControlStateNormal];
    [close setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    close.backgroundColor = [UIColor colorWithRed:0.12 green:0.2 blue:0.4 alpha:1];
    close.layer.cornerRadius = 12;
    close.translatesAutoresizingMaskIntoConstraints = NO;
    [close addTarget:self action:@selector(dismiss) forControlEvents:UIControlEventTouchUpInside];
    [self.cocosController.view addSubview:close];
    [NSLayoutConstraint activateConstraints:@[
      [close.topAnchor constraintEqualToAnchor:self.cocosController.view.safeAreaLayoutGuide.topAnchor constant:8],
      [close.centerXAnchor constraintEqualToAnchor:self.cocosController.view.centerXAnchor],
      [close.widthAnchor constraintEqualToConstant:150], [close.heightAnchor constraintEqualToConstant:44]
    ]];
    // Cocos3.8.8 SystemWindow gets its Metal view from delegate.window.rootViewController.
    window.rootViewController = self.cocosController;
    [window makeKeyAndVisible];
    [self.delegateBridge application:UIApplication.sharedApplication didFinishLaunchingWithOptions:@{}];
    self.initialized = YES;
    self.renderActive = YES;
    NSLog(@"[KiselHost] iOS engine initialized=1 controllers=1");
  } else {
    window.rootViewController = self.cocosController;
    [window makeKeyAndVisible];
  }
  self.visible = YES;
  self.enters++;
  [self setRendering:(UIApplication.sharedApplication.applicationState == UIApplicationStateActive) reason:@"enter"];
  NSLog(@"[KiselHost] iOS entered=%lu engineOwners=1", (unsigned long)self.enters);
  [self publishAudio:@"open"];
  return @"opened";
}

- (void)dismiss {
  NSAssert(NSThread.isMainThread, @"Dismiss must run on main");
  if (!self.visible) return;
  [self setRendering:NO reason:@"dismiss"];
  self.window.rootViewController = self.rnController;
  [self.window makeKeyAndVisible];
  self.visible = NO;
  [self publishAudio:@"dismiss"];
  NSLog(@"[KiselHost] iOS dismissed; engineOwners=1 renderPaused=1");
}

- (NSString *)send:(NSString *)raw {
  NSAssert(NSThread.isMainThread, @"Cocos receiver thread must be main");
  NSUInteger bytes = [raw lengthOfBytesUsingEncoding:NSUTF8StringEncoding];
  if (bytes > 65536) return @"OVERSIZE";
  if (!self.initialized || !self.visible || !self.renderActive) return @"HOST_INACTIVE";
  NSLog(@"[KiselBridge] H2G mainThread=%d bytes=%lu", NSThread.isMainThread, (unsigned long)bytes);
  [[JsbBridge sharedInstance] sendToScript:@"kisel.protocol.v1" arg1:raw];
  return @"queued";
}
@end
