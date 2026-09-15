/* Explicit local adaptation. No remote requests, identities, purchases or ad grants. */
(function () {
  'use strict';
  const offline = window.ReferenceOffline = {version: 1, installed: false, requests: {}, unavailable: []};
  const clone = value => JSON.parse(JSON.stringify(value));
  let noticeTimer;
  function notice() {
    let node = document.getElementById('reference-offline-notice');
    if (!node) {
      node = document.createElement('div'); node.id = 'reference-offline-notice';
      node.style.cssText = 'position:fixed;left:7%;right:7%;top:8%;z-index:99999;padding:14px;border-radius:12px;background:#18252fee;color:white;text-align:center;font:15px sans-serif;pointer-events:none';
      document.body.appendChild(node);
    }
    node.textContent = /^ru/i.test(navigator.language) ? 'Эта сетевая функция недоступна в автономной версии' : 'This online feature is unavailable in the offline edition';
    node.hidden = false; clearTimeout(noticeTimer); noticeTimer = setTimeout(() => {node.hidden = true;}, 2500);
  }
  offline.install = function () {
    if (offline.installed) return;
    const require = window.__require;
    const Conn = require('ConnMgr'), User = require('UserMgr'), Data = require('DataMgr');
    const Global = require('Global'), Time = require('TimeUtil');
    const Popup = require('PopupMgr'), Ads = require('AdMgr');
    const localUid = 'offline-local';
    const originalUserInit = User.init;
    User.init = function () {originalUserInit.apply(this, arguments); this.setUid(localUid);};
    Conn.init = function () {this._baseUrl = location.origin; this._crazyGamesSessionToken = '';};
    Conn.setCrazyGamesSessionToken = function () {};
    // The unchanged save writer remains authoritative for this separate app's local data.
    function persist() {Data.saveData(); Data.saveTimeData();}
    offline.save = persist;
    function resultFor(path, payload) {
      switch (path) {
        case '/setting/version': return clone(window.ReferenceOfflineSettings);
        case '/setting/svrtime': return {};
        case '/svr/list': return {
          server_list: [{svr_id: 1, sub_svr_id: 0, recomYN: 'Y', newYN: 'N', eventYN: 'N', svr_name_code: 1}],
          my_account_list: []
        };
        case '/user/chk_new_user': {
          const count = Number(localStorage.getItem('reference.offline.runCount') || 0) + 1;
          localStorage.setItem('reference.offline.runCount', String(count));
          return {uid: localUid, new_flag: 0, now_data: '', run_cnt: count, account_lv: 0};
        }
        case '/info/get_my_all_info': return {post: 0, minus_reward: []};
        case '/user/update2': persist(); return {};
        case '/user/update_nick': User.setNick(String(payload.nick || 'Offline')); persist(); return {};
        case '/user/update_hero': case '/log/reg': case '/rank/upload_score': return {};
        default: return undefined;
      }
    }
    Conn.getRequest = function (url, success, failure) {
      const path = new URL(url, location.href).pathname;
      let aborted = false;
      return {
        abort() {aborted = true;},
        send(body) {
          setTimeout(() => {
            if (aborted) return;
            offline.requests[path] = (offline.requests[path] || 0) + 1;
            Time.setSvrNowT(Math.floor(Date.now() / 1000));
            // Existing failure handlers hide rank/loading UI. A fabricated rank 0
            // would request a nonexistent Spine skin and leave the input mask up.
            if (path.startsWith('/rank/load')) {
              if (typeof failure === 'function') failure(0);
              return;
            }
            let result;
            try {result = resultFor(path, body ? JSON.parse(body) : {});}
            catch (error) {
              console.error('Offline persistence/adapter failure:', error.name);
              if (typeof failure === 'function') failure(Conn.RESULT_INTENAL_ERROR);
              return;
            }
            if (result === undefined) {
              if (!offline.unavailable.includes(path)) offline.unavailable.push(path);
              notice();
              if (typeof failure === 'function') failure(Conn.RESULT_INTENAL_ERROR);
              return;
            }
            if (typeof success === 'function') success(result);
          }, 0);
        }
      };
    };
    Time.setSvrNowT(Math.floor(Date.now() / 1000));
    Ads.isPreloadRewardVideo = function () {return false;};
    Ads.showRewardVideo = function (_success, failure) {notice(); if (typeof failure === 'function') failure();};
    Ads.showInterstitial = function () {};
    // These screens require a real service; base hero/shop/equipment screens remain interactive.
    const blockedNames = ['POPUP_RANK', 'POPUP_RANK_REWARD', 'POPUP_POST', 'POPUP_SAVE_N_SERVER', 'POPUP_LOGIN', 'POPUP_CASHSHOP', 'POPUP_CASHSHOP2', 'POPUP_FIRST_PURCHASE', 'POPUP_EVENT_ADS'];
    const blocked = new Set(blockedNames.map(name => Popup[name]).filter(value => value !== undefined));
    const showPopup = Popup.prototype.showPopup;
    Popup.prototype.showPopup = function (id) {
      if (blocked.has(id)) {this.hideLoading(); notice(); return;}
      return showPopup.apply(this, arguments);
    };
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && window.cc?.director?.getScene()?.name === 'PlayScene') {
        try {persist();} catch (error) {console.error('Offline background save failed:', error.name);}
      }
    });
    offline.installed = true;
  };
}());
