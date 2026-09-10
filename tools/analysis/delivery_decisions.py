# Explicit task-by-task scope decisions. Only remaining tasks are annotated.
R='REQUIRED_NOW';S='SUPPORTING_REQUIRED';D='DEFERRED_POST_DELIVERY'
APP='docs/tz/Merge Heroes Unite War тз на разработку.md';ADS='docs/tz/Реклама в приложениях.md';GENERAL='docs/tz/Инструкция для разработчиков.md';FIGMA='analysis/figma/screen_map.json'
def ids(*values):
 out=[]
 for v in values:
  out.extend(range(v[0],v[1]+1) if isinstance(v,tuple) else [v])
 return out
GROUPS=[
 (D,ids(7,(10,24),187,188,239,240,241),'Reference parity research','Exact hidden formulas and additional reference captures do not expand the delivered product.',[APP,FIGMA]),
 (D,ids(130,131,140,141,142,(151,153)),'Additional progression','Reference quests, offline reward farming and the full reference tutorial are not in the supplied application screens. Existing buy/merge guidance and durable restart remain required.',[APP,FIGMA]),
 (D,ids(197,199,214,215,216,218),'Optional investigation and optimization campaigns','Exhaustive strategy fitting, extra language rollout and speculative optimization projects are deferred. Shipped-language legibility, performance measurements and correction of real P0/P1 defects remain mandatory in current QA.',[APP,GENERAL]),
 (D,ids(235,238,244,245,(247,251)),'Post-delivery extensions','Store submission/marketing and reference-only Demon/Tower/skills/rigs/parallax/online systems are beyond the required delivery. Functional Figma Dungeon dragons and Relic/Open controls stay required.',[APP,FIGMA,GENERAL]),
 (R,ids((62,68),125,126,129,(134,139),242,243,246),'Required Figma screens and actions','Implement all 15 supplied artboards and real interactions, including equipment, hero upgrades, daily claim, relic Open x1/x10 and three Dungeon dragon entries; static fixtures alone cannot close delivery.',[APP,FIGMA,ADS]),
 (R,ids((168,179),181,183,184),'Visual and audio polish','Complete required attack/merge/reward/UI/wheel motion, original music/SFX/ambience and interruption-safe presentation; no quality downgrade.',[APP,FIGMA,GENERAL]),
 (R,ids(202,203,208,209,210,231,232,233,234,237,(254,259)),'Platform, rewarded ads and delivery','Required Android/iOS behavior, notification controls, AppMetrica project configuration, rewarded-only Start.io flows, legal links, provenance and release artifacts.',[APP,ADS,GENERAL]),
 (S,ids(36,53,69,80,(119,124),127,128,132,133,143,(148,150),(154,157),180,182,185,186,(189,196),198,200,201,(204,207),211,212,213,217,(219,230),236),'Production reliability and acceptance','Necessary state/content/UI/platform dependencies and representative release QA for required features: durability, ownership, bounded resources, adaptive layout, smooth performance and zero known P0/P1 defects.',[APP,FIGMA,ADS,GENERAL]),
]
# Remove sequencing dependencies that assumed deferred reference systems, or
# unnecessarily required full release QA before a feature/model could be built.
DEPS={
 119:[71,73,74],128:[61,78],132:[129,117],133:[77],143:[129,135,139,128],
 154:[148,147],155:[154,149],156:[148,47],157:[155,156,150],
 189:[31,50,118],193:[120,31,74],194:[117,75,253],198:[70,54],
 200:[196,198,118,127,143],201:[47,147],204:[201,52],207:[206,156,185],208:[207,128,129],
 202:[201,206,207,210,232],203:[201,206,207,210,232],
 211:[202,203,207,208,210,206],212:[202,203],213:[211,200,186,212],
 217:[213,159],219:[217,207],221:[79,80],222:[221,157,143,127,211],
 223:[222,118,243],224:[223,69],227:[224,198],228:[186,211],
 229:[220,221,222,223,224,225,226,227,228],231:[253],233:[28,29,177,178,179],
 234:[232,233,212,230],236:[234,155,150],
 242:[65,74,75],243:[65,118,74],246:[242,120,74,75],
}
OVERRIDES={
 36:'Compose only required boot/error/permission, reward and win-boost surfaces from the supplied Figma assets. No quest/offline-farm popup is required.',
 128:'One active route and a deduplicated priority popup stack for required Figma screens, with stale load-generation rejection and Back/focus ownership; full offline acceptance is a release gate, not a route implementation predecessor.',
 132:'Claimable/unseen indicators for required daily/wheel/unlock surfaces only; do not introduce a quest system.',
 133:'One daily UTC period with monotonic rollback protection and stable claim token. No reference streak calendar or missed-day penalty is required.',
 143:'Exercise all required Figma/meta/rewarded surfaces during battle, background, reopening and failed saves; no click-through or duplicated claim. Exclude deferred quest/offline/tutorial flows.',
 150:'Validate the actual persisted formats already written by this repository, backup retention, future-version rejection and pending reward migration. Do not invent an unsupported legacy game format.',
 156:'Suspend ticks, flush accepted writes once and resume a single application generation. Resume must preserve shipped state; do not introduce an offline reward calculation.',
 157:'Accept corrupt/full-disk/future-version/repeated-resume/restart cases for the shipped save schema and pending rewarded operations. Offline-farming entitlement tests remain deferred.',
 173:'Wire required daily/relic/equipment/upgrade rewards to bounded bursts with interruption-safe final states. Deferred quest/offline reward events are not a delivery prerequisite.',
 176:'Capture named markers and cancellation for every animation used by required screens/gameplay. Classify unused reference-only matrix events as deferred coverage, never as PASS.',
 184:'Bind all audio events actually used by required screens and gameplay exactly once. Preserve unused reference-only event definitions for later; they do not force additional mechanics.',
 186:'Audition the shipped soundtrack/SFX, stress concurrency and verify mute/focus/loop recovery. Record device-only audition limitations; do not claim them from browser success.',
 189:'Validate shipped ten-family hero/tier/discovery records against semantic Figma mappings and explicit proposed coherent balance; reference curve fitting is not a prerequisite.',
 192:'Validate shipped purchase/merge/economy values and required ad/daily/wheel rewards; offline income parameters are deferred.',
 193:'Complete Figma equipment/relic reward definitions and owned item data with explicit project rules, not inferred rarity formulas.',
 194:'Complete required daily/wheel/unlock content and rollback-safe timers. Exclude the reference quest/streak catalogue.',
 195:'Validate shipped animation/audio records and semantic references. Unused preserved matrix events do not require implementation of deferred systems.',
 200:'Trace every shipped feature and asset to the app TZ, advertising TZ, Figma or a necessary documented project rule. Verify coherent balance on the delivery golden paths without reference-formula parity claims.',
 208:'Settings notification permission/toggle behavior and safe routing for this app only; a denied permission must remain usable. No unrelated deep-link marketing system.',
 211:'Native repeated-open/background/process-death/audio and malformed provider-result acceptance for shipped features. Record physical-only external requirements explicitly; extended reference lifecycle parity is deferred.',
 213:'Measure real shipped scenes on supported available native/device classes, including representative dense board, combat and reward effects. Record unavailable physical tiers as external actions, not PASS.',
 220:'Meet measured frame/memory/resource/save budgets on required supported classes; any real regression is owned by TASK-0229 and cannot be waived by deferring an optimization campaign.',
 221:'Run all unit cases applicable to shipped features and preserve failing seeds; economic and state invariants must all pass. Deferred mechanics do not create release dependencies.',
 222:'Run shipped-feature integration and persistence/provider fault cases, with actual build/evidence references. Exclude reference-only systems.',
 223:'Run complete delivered buy/merge/battle/stage/boss, Figma equipment/relic/dungeon/daily and rewarded shop/wheel/boost golden paths. Verify progression is coherent and no required control is a placeholder.',
 226:'Validate corruption/crash/migration and pending rewarded-operation boundaries for shipped save versions, with conserved balances and ownership. Offline farming is deferred.',
 227:'Verify safe touch targets, contrast/non-color feedback, reduced motion, mute, supported-language text and large numeric values. Additional language rollout is not required.',
 230:'Production delivery candidate: zero known P0/P1 defects, required native/content/visual/audio/rewarded/save/rights acceptance; this is not an MVP or prototype gate.',
 234:'Produce tested package-named release APK/AAB/project ZIP with monotonic build numbers, source/toolchain/schema/data versions and checksums; prepare the required GitLab release pipeline/repository metadata and secure separate signing handoff.',
 237:'DELIVERY_COMPLETE requires every current required/supporting task accepted, all 15 required Figma screens interactive and faithful, polished core/stages/bosses/motion/audio, Settings/Wheel/confirmed rewarded flows, AppMetrica, safe persistence/adaptation, Android production artifacts, iOS production validation where credentials permit, final smoke and zero known P0/P1 defects. External-only requirements must be named and keep the gate open; never emit DELIVERY_COMPLETE.md prematurely.',
 242:'Specify the Figma relic collection and its working Open x1/x10 controls, ownership and useful bounded effects. Keep the 16 supplied relic visuals. No reference relic research, hidden rarity curve or unrelated progression system is required.',
 243:'Implement the three Figma Dungeon entries (Infernal, Frost and Shadow Dragon) as functioning challenges using the shared combat runtime and durable rewards. Preserve their supplied art/composition; no reference Dragon/Demon/Tower mode parity is required.',
 246:'Implement atomic Figma equipment/relic Open controls (x1/x10 where shown), configured in-game currency costs and saved item outcomes; bind required panels and reject insufficient/duplicate/restarted operations. Pity, reference summon events and real-money packs remain deferred.',
}
