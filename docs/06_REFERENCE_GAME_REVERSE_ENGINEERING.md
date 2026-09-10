# Reverse engineering — Heroes Unite

## Implementation capture update

RUN-03 reconfirms web3.16.2 and extends the planning observations: [EV-039 thirty isolated purchases](../analysis/reference/purchase_cost_capture.md) measure15×1,8×2,6×3,1×4gold; all display/deduction deltas match. The floor-exponential candidate is non-identifiable, so the generalized function remainsUNKNOWN. [EV-041 input cases](../analysis/reference/purchase_input_capture.md) covertap,20rapid clicks,2shold,fullboard andoutside release. Manual progress reachesWizard6/account3 whiletheoffer stillgrants tier1. Native parity,exact hold cadence andgeneral tieradvance remainUNKNOWN.

## Historical planning capture baseline

Reference observed directly in CrazyGames on2026-09-08: LIVE_CRAZY3.16.2,portrait,Cocos. Two fresh guest sessions,own screenshots and silent video;mobile listings and inaccessible seed video are separated in the source ledger. The bounded run reachedaccountlevel2,herotier4 andstage1-16,unlocked/activatedauto,won firstboss and returned to an offline reward. Extended modes,equipment,wheel and long-term economy remain capture gates.

## First-session sequence and core loop

Initial100gold,0gems,thirdcurrency0,level1,stage1-1HP1,15boardpositions/5open. TapBuy twice at1gold each→two tier1. Tutorial requires source slot2→slot1 drag;opposite-direction attempts were intercepted/rejected in tutorial and do not prove general directional restriction. ResultArcher2,displayicons25/5/2.0,discovery+100gems/+10gold. Drag to battlefield starts automatic attacks;owned board slot staysoccupied/Battle. Tutorial then requires tapwithdraw and redeploy.

Early kills advance stage and give gold;stage1-9 repeatedly farms whileBossretry is available. A2-second hold fills four remaining open positions and showsfull-board feedback. No auto merge occurs before activation. Reserve pairs manually merge throughMagician3,display52/13/2.5,new discovery+100gems/+1000gold. RepeatArcher2creation did not show another discovery popup.

Magician3deploy plusBossretry enters1-10,HP70,timerbar andGiveup. Repeated13damage hits win;gold8389→18389 before tutorial advances. One boss cannot establish general cadence/timeout/reward formula. Early normal-stageHPs resemble squares,butboss70requires distinct records.

After firstboss,a tutorial opensAuto merge:60minutes,Freevideooption,500gemoption. Freeactivation leaves200gems and starts59:51countdown. Two subsequent buys with existingtier2reserve+tier3deployed cause three merges andBerserker4in the deployed slot;display106/16/1.5,+100gems/+1440gold. One observed chain confirms cascade and deployed participation,not universal pair order. Accountlevel2popup grants+1platform,+5%goldicon,+100gems/+1510gold;the first second-row platform becomesavailable.

## Battle,meta and persistence

Normal combat is automatic after deployment;projectile/hit/death/rewardfeedback is visible. Figma art is a separate animal-based visual system. In-game help explicitly distinguishes normal andLegendarydungeon rules,including HP/DEF and monster counterattack inLegendary;actual mode combat/recovery was not played. General targeting,armor,critprobability,skills and hero recovery remain unknown. ACRITICAL32labelwas observed forBerserker4,but one case does not establish a crit formula.

Settings showsLIVE_CRAZY3.16.2 and buttonsforinfo,sound,attendance,notice,ranking,language,help,terms,account/server,powersaving. BattleHP/gold continue behind settings and some reward/event overlays. Native background/audiofocus was not tested. Quest UI progresses fromkill2/2toHireHero0/5and2/5. Attendance is a7daycalendar;LaunchLoginEventis separate. These differ from the Figma dailygoldchest. Wheel/equipment/livegacha were not reached in this bounded session.

Navigating toabout:blankandreturning in the same guest context producedOfflineReward00:03:34:247Kgold plus four other icon rewards×2/×100/×1/×5. HUDalreadyshowed269Kgold/400gems behind the open popup. This supports a grant-before-dismissal presentation hypothesis;it does not expose internal save/transaction timing. Level2andprogress persisted. Stage changes during return/loading/foregroundcombat prevent a clean conclusion about offline stage advancement. Rounded247Kis preserved asdisplaytext,not converted into falsely exact247000. Rate/cap/otherrewardIDsrequire more controlled samples.

## Measurements and limitations

[Balance samples](../analysis/reference/balance_samples.csv) distinguish purchase,kill,discovery,account andoffline sources. [Timing samples](../analysis/reference/timing_measurements.csv) use25fpssource with coarse review-sheet bounds:manualconvergence→result≈600ms,autoresultspacing≈600ms,andtwoMagicianimpactintervals≈2500ms withlargeuncertainty. No generalized curve/probability is fitted. Proposed650msmerge andothermotiontokens remain design targets,not measured exact copies.

Own video contains idle authoring intervals;use11reviewclips and actualtimeline,not filenames such asafter10as elapsedtimeproof. Several intended clicks were intercepted by popup/tutorial queues;captureindex explicitly corrects misleading filenames. No proprietary game code,private assets or waveform audio was extracted. The unavailableYouTubeseed was not bypassed with external cookies.

## Mechanic coverage checklist

| Mechanic | Status | Finding |
| --- | --- | --- |
| Launch/loading | OBSERVED | RUN01/02portal/loading and fresh tutorial |
| Tutorial | OBSERVED | buy2→manualmerge→deploy→withdraw→redeploy→missions→boss/auto |
| Main currency | OBSERVED | gold icon/cost/kill and reward changes |
| Premium currency | OBSERVED | bluegems and discovery grants |
| Hero buy | OBSERVED | tap and hold |
| Buy cost progression | UNKNOWN | firstprices1;no30-buyisolatedseries |
| Buy tier progression | UNKNOWN | buytier1remaineddisplayed |
| Board slots | OBSERVED | 15positions,5initialopen |
| Slot unlock | OBSERVED | accountlevel2+1platform;laterthresholdsunknown |
| Merge condition | OBSERVED | equal earlytierpairs;max/familyexceptionsunknown |
| Auto merge | OBSERVED | 60minuteFree/500gemoffer;Freeactivated |
| Merge cascade | OBSERVED | three-stepauto cascade toBerserker4 |
| Max tier | UNKNOWN | notreached |
| Hero deployment | OBSERVED | drag,tapwithdraw,cap1early;autoresultretained |
| Auto battle | OBSERVED | attacks/deaths/stagesafterdeployment |
| Attack speed | UNKNOWN | icon2.0/2.5/1.5displayed;shorttimingboundsnotformula |
| Damage | OBSERVED | 5/13normaland32critdisplaycases;formularemainsunknown |
| Crit | OBSERVED | CRITICAL32labelonBerserker4;probabilityunknown |
| Enemy HP | OBSERVED | 1,4,16,81;boss70;normal121/144/196 |
| Enemy attack | UNKNOWN | Legendaryhelpdescribesit;modeunplayed |
| Stage waves | UNKNOWN | singlevisibletargetearly;generalwavecountunknown |
| Boss cadence | UNKNOWN | firstboss1-10observed;threerepeatedbossesnotcaptured |
| Boss timer/fail | OBSERVED | timerbar/Giveup,priorfarmretryandonewin;exacttimeoutunknown |
| Stage rewards | OBSERVED | kill1early,bossdelta10000;generalcatalogueunknown |
| Unlocks | OBSERVED | autoafterboss,platformlevel2;fullgraphunknown |
| Offline rewards | OBSERVED | 3:34popup,247Kgold+4types;cap/rateunknown |
| Hero level | OBSERVED | tier1–4andaccountlevel2;upgradeformulaunknown |
| Hero equipment | UNKNOWN | Figmaexists;liveequipmentnotreached |
| Equipment upgrade | UNKNOWN | Figmaexists;liveenhancenotcaptured |
| Summon/open x1/x10 | UNKNOWN | Figmaoffersonly;livepoolunknown |
| Daily reward | OBSERVED | 7dayattendance;claim/resetnotfullytested |
| Wheel | UNKNOWN | Figmathreestates;livewheelnotlocatedinboundedearlysession |
| Quest | OBSERVED | kill2/2thenHireHero0/5→2/5 |
| Gift | OBSERVED | sidebarGifticon;contentsunknown |
| Event | OBSERVED | LaunchLoginEventandAdPackEventmenu |
| Settings | OBSERVED | version,info,sound,attendance,language,help,terms,account,powersavingbuttons |
| Audio settings | OBSERVED | Soundentry;actualsoundauditionnotdone |
| Haptics | UNKNOWN | Figma toggle;reference nativebehaviorunmeasured |
| Alternative battle contents | OBSERVED | marketing/helpdescribesDragon/Demon;actualmodesunplayed |
| Shop/IAP | OUT OF SCOPE | mobilelistingadvertisesIAP;nocharges/SDKimplementation |
| Ads/rewarded ads | OBSERVED | Freevideoautoofferactivated;providerverificationnotinspected |
| Save behavior | OBSERVED | sameguestcontextreloadretainslevel2/gems400/progress;crashsemanticsunknown |
| Background behavior | UNKNOWN | browsernavigationabsenceobserved;nativehome/locknotavailable |
| Navigation while battle active | OBSERVED | settings/help/rewardpopupcontinuity |
| Red dot rules | UNKNOWN | dotsvisible;completepredicate/resetnotestablished |

## Implementation consequences

Separate manual/auto commands with shared atomic resolver;persist timed auto entitlement;make pair/deployed policies configurable until verified. Separate accountlevel,herotier,upgradelevel andstageordinal. Use explicit boss/stage data,not Figma labels or a guessed square curve. Reward transaction/sourcewatermarks prevent duplicate grants independently of animation. Gold-onlyoffline8h anduniformwheel are proposed development fixtures with explicitCF012/U006/U015gates. ExactFigma10-slot andfunctional15-slot layouts have separate golden fixtures.

[Evidence ledger](03_EVIDENCE_LEDGER.md) · [Unknown register](04_UNKNOWNS_REGISTER.md) · [Capture index](../analysis/reference/capture_index.md) · [Conflicts](conflicts.md) · [Task index](../tasks/TASK_INDEX.md) · [Index](00_INDEX.md).
