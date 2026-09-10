import ExpoModulesCore
import StartApp
import UIKit

private final class RewardedAttempt: NSObject, STADelegateProtocol {
  let id: String
  let placement: String
  let promise: Promise
  let ad = STAStartAppAd()
  var completed = false
  var finished = false
  var onFinish: (() -> Void)?
  init(_ id: String, _ placement: String, _ promise: Promise) {
    self.id = id; self.placement = placement; self.promise = promise
  }
  func finish(_ status: String) {
    guard !finished else { return }; finished = true
    promise.resolve(["operationId": id, "placement": placement, "status": status, "completed": completed] as [String: Any])
    onFinish?()
  }
  @objc(didLoadAd:) func didLoad(_ ad: STAAbstractAd!) { if !finished { self.ad?.show() } }
  @objc(failedLoadAd:withError:) func failedLoad(_ ad: STAAbstractAd!, withError error: Error!) { finish("unavailable") }
  @objc(didCompleteVideo:) func didCompleteVideo(_ ad: STAAbstractAd!) { if !finished, ad === self.ad { completed = true } }
  @objc(didCloseAd:) func didClose(_ ad: STAAbstractAd!) { finish(completed ? "completed" : "cancelled") }
  @objc(failedShowAd:withError:) func failedShow(_ ad: STAAbstractAd!, withError error: Error!) { finish("failed") }
}
public class MergeNativeModule: Module {
  private var initialized = false
  private var attempt: RewardedAttempt?
  public func definition() -> ModuleDefinition {
    Name("MergeNative")
    AsyncFunction("initialize") { (appId: String, testMode: Bool, promise: Promise) in
      guard appId.range(of: "^[0-9]{5,12}$", options: .regularExpression) != nil else { promise.resolve(false); return }
      if self.initialized { promise.resolve(true); return }
      guard let sdk = STAStartAppSDK.sharedInstance() else { promise.resolve(false); return }
      sdk.returnAdEnabled = false
      #if DEBUG
      sdk.testAdsEnabled = testMode
      #else
      sdk.testAdsEnabled = false
      #endif
      sdk.setUserConsent(false, forConsentType: "pas", withTimestamp: Int(Date().timeIntervalSince1970))
      sdk.initialize(withAppID: appId) { error in
        self.initialized = error == nil
        promise.resolve(self.initialized)
      }
    }.runOnQueue(.main)
    AsyncFunction("showRewarded") { (id: String, placement: String, promise: Promise) in
      guard self.initialized, self.attempt == nil, ["freeCoins", "wheel", "stageBoost"].contains(placement), UIApplication.shared.applicationState == .active else {
        promise.resolve(["operationId": id, "placement": placement, "status": "unavailable", "completed": false] as [String: Any]); return
      }
      let a = RewardedAttempt(id, placement, promise)
      self.attempt = a
      a.onFinish = { [weak self, weak a] in if self?.attempt === a { self?.attempt = nil } }
      guard let ad = a.ad else { a.finish("unavailable"); return }
      ad.loadRewardedVideoAd(withDelegate: a)
    }.runOnQueue(.main)
    Function("cancelRewarded") { (id: String) in
      DispatchQueue.main.async { if let a = self.attempt, a.id == id { a.finish("cancelled") } }
    }
    OnDestroy { DispatchQueue.main.async { self.attempt?.finish("cancelled") } }
  }
}
