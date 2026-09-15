#import <UIKit/UIKit.h>
// Compiled with ARC; Cocos reflection resolves this Objective-C class.
#import <AppMetricaCore/AppMetricaCore.h>
#import <StartApp/StartApp.h>
#import <UserNotifications/UserNotifications.h>
#import "GameServiceConfig.h"

@interface GameServices : NSObject
+ (NSString *)request:(NSString *)raw;
+ (NSString *)poll:(NSString *)requestId;
+ (void)finish:(NSString *)requestId value:(NSDictionary *)value;
@end
@interface GameAdAttempt : NSObject <STADelegateProtocol>
@property(nonatomic,strong) NSString *requestId;
@property(nonatomic,strong) STAStartAppAd *ad;
@property(nonatomic) BOOL completed;
- (void)finish:(NSString *)status;
@end
static GameAdAttempt *gameAttempt;
static BOOL gameServicesReady=NO,gameAdsReady=NO;
static NSMutableDictionary *gameResults;

@implementation GameAdAttempt
- (void)finish:(NSString *)status {
    if(gameAttempt!=self)return;
    gameAttempt=nil;
    [GameServices finish:self.requestId value:@{@"status":status,@"completed":@(self.completed&&[status isEqualToString:@"completed"])}];
}
- (void)didLoadAd:(STAAbstractAd *)ad {if(gameAttempt==self)[self.ad showAd];}
- (void)didCompleteVideo:(STAAbstractAd *)ad {if(gameAttempt==self&&ad==self.ad)self.completed=YES;}
- (void)didCloseAd:(STAAbstractAd *)ad {[self finish:self.completed?@"completed":@"cancelled"];}
- (void)failedLoadAd:(STAAbstractAd *)ad withError:(NSError *)error {[self finish:@"unavailable"];}
- (void)failedShowAd:(STAAbstractAd *)ad withError:(NSError *)error {[self finish:@"failed"];}
@end

@implementation GameServices
+ (void)finish:(NSString *)requestId value:(NSDictionary *)value {
    @synchronized(self){if(!gameResults)gameResults=[NSMutableDictionary new];if(gameResults.count>32)[gameResults removeAllObjects];gameResults[requestId]=value;}
}
+ (NSString *)poll:(NSString *)requestId {
    NSDictionary *value;
    @synchronized(self){value=gameResults[requestId];[gameResults removeObjectForKey:requestId];}
    return [[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:value?:@{@"status":@"pending"} options:0 error:nil] encoding:NSUTF8StringEncoding];
}
+ (NSString *)request:(NSString *)raw {
    NSDictionary *q=[NSJSONSerialization JSONObjectWithData:[raw dataUsingEncoding:NSUTF8StringEncoding] options:0 error:nil];
    if(![q isKindOfClass:NSDictionary.class]||![q[@"requestId"] isKindOfClass:NSString.class])return @"{\"status\":\"failed\"}";
    NSString *rid=q[@"requestId"];
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString *action=q[@"action"];
        if([action isEqualToString:@"initialize"]){
            if(!gameServicesReady){
                AMAAppMetricaConfiguration *config=[[AMAAppMetricaConfiguration alloc] initWithAPIKey:GAME_METRICA];config.locationTracking=NO;
                [AMAAppMetrica activateWithConfiguration:config];gameServicesReady=YES;
                STAStartAppSDK *sdk=[STAStartAppSDK sharedInstance];sdk.returnAdEnabled=NO;sdk.testAdsEnabled=NO;
                if([GAME_START_IO rangeOfString:@"^[0-9]{5,12}$" options:NSRegularExpressionSearch].location!=NSNotFound){
                    [sdk setUserConsent:NO forConsentType:@"pas" withTimestamp:(long)NSDate.date.timeIntervalSince1970];
                    [sdk initializeWithAppID:GAME_START_IO completion:^(NSError *error){gameAdsReady=error==nil;}];
                }
            }
            [self finish:rid value:@{@"status":@"ok"}];
        }else if([action isEqualToString:@"event"]){
            NSString *name=q[@"name"],*value=q[@"value"]?:@"";
            if(gameServicesReady&&name.length<=48)[AMAAppMetrica reportEvent:name parameters:@{@"value":[value substringToIndex:MIN(value.length,80)]} onFailure:nil];
            [self finish:rid value:@{@"status":@"ok"}];
        }else if([action isEqualToString:@"legal"]){
            NSString *url=[q[@"kind"] isEqualToString:@"terms"]?GAME_TERMS:GAME_PRIVACY;
            if([url hasPrefix:@"https://telegra.ph/"])[UIApplication.sharedApplication openURL:[NSURL URLWithString:url] options:@{} completionHandler:^(BOOL ok){[self finish:rid value:@{@"status":ok?@"ok":@"failed"}];}];
            else [self finish:rid value:@{@"status":@"unavailable"}];
        }else if([action isEqualToString:@"notifications"]){
            UNUserNotificationCenter *center=UNUserNotificationCenter.currentNotificationCenter;
            void (^complete)(BOOL)=^(BOOL enabled){
                [center removePendingNotificationRequestsWithIdentifiers:@[@"game-bonuses"]];
                if(enabled){UNMutableNotificationContent *content=[UNMutableNotificationContent new];content.title=@"Merge Heroes Unite War";content.body=@"Your heroes are waiting. Come back for more rewards.";content.sound=UNNotificationSound.defaultSound;
                    [center addNotificationRequest:[UNNotificationRequest requestWithIdentifier:@"game-bonuses" content:content trigger:[UNTimeIntervalNotificationTrigger triggerWithTimeInterval:43200 repeats:NO]] withCompletionHandler:nil];}
                [self finish:rid value:@{@"status":@"ok",@"enabled":@(enabled)}];
            };
            if([q[@"enabled"] boolValue])[center requestAuthorizationWithOptions:UNAuthorizationOptionAlert|UNAuthorizationOptionSound completionHandler:^(BOOL granted,NSError *error){complete(granted&&error==nil);}];else complete(NO);
        }else if([action isEqualToString:@"ad"]){
            if(!gameAdsReady||gameAttempt||![@[@"wheel",@"freeCoins",@"stageBoost"] containsObject:q[@"placement"]]||UIApplication.sharedApplication.applicationState!=UIApplicationStateActive){[self finish:rid value:@{@"status":@"unavailable"}];return;}
            GameAdAttempt *attempt=[GameAdAttempt new];attempt.requestId=rid;attempt.ad=[STAStartAppAd new];gameAttempt=attempt;
            [attempt.ad loadRewardedVideoAdWithDelegate:attempt];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW,175*NSEC_PER_SEC),dispatch_get_main_queue(),^{if(gameAttempt==attempt){[attempt finish:@"failed"];[attempt.ad closeAd];}});
        }else if([action isEqualToString:@"cancel"]){
            if([gameAttempt.requestId isEqualToString:rid]){GameAdAttempt *attempt=gameAttempt;[attempt finish:@"cancelled"];[attempt.ad closeAd];}
            else [self finish:rid value:@{@"status":@"cancelled"}];
        }else [self finish:rid value:@{@"status":@"unavailable"}];
    });
    return @"{\"status\":\"pending\"}";
}
@end
