#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@interface KiselCocosRuntime : NSObject
+ (instancetype)shared;
@property(nonatomic, copy, nullable) void (^messageHandler)(NSString *raw);
@property(nonatomic, copy, nullable) void (^audioHandler)(NSString *raw);
- (NSString *)open;
- (NSString *)send:(NSString *)raw;
- (void)dismiss;
@end
NS_ASSUME_NONNULL_END
