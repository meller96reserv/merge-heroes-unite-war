from author_schemas import *

gain={'type':'number','minimum':0,'maximum':1}
settings=obj({'musicGain':gain,'sfxGain':gain,'haptics':BOOL,'reducedMotion':BOOL,'notifications':BOOL})
safeArea=obj({'top':N,'right':N,'bottom':N,'left':N,'unit':enum('logicalPoints'),'scale':{'type':'number','exclusiveMinimum':0}})
payloads={
'game.ready':obj({'gameBuild':ID,'supportedVersions':arr(POS,1),'capabilities':arr(ID)}),
'game.error':obj({'code':ID,'messageKey':ID,'retryable':BOOL,'correlationId':ID}),
'game.exitRequested':obj({'reason':enum('back','close','fatal'),'lastCommittedGeneration':N,'flushStatus':enum('complete','pending','failed')}),
'progress.stageChanged':obj({'stageId':ID,'highestClearedOrdinal':N,'revision':N}),
'currency.changed':obj({'currencyId':ID,'balance':AMT,'revision':N,'transactionId':nullable(ID)}),
'reward.claimed':obj({'transactionId':ID,'sourceId':ID,'rewardId':ID,'revision':N}),
'purchase.requested':obj({'operationId':ID,'productId':ID,'quantity':{'const':1}}),
'ad.rewardRequested':obj({'operationId':ID,'placementId':ID}),
'analytics.event':obj({'eventId':ID,'name':ID,'properties':{'type':'object','maxProperties':20,'additionalProperties':{'type':['string','number','boolean','null']}},'consent':enum('granted')}),
'save.changed':obj({'generation':N,'revision':N,'schemaVersion':POS,'dataVersion':ID,'checksum':{'type':'string','pattern':'^[a-f0-9]{64}$'}}),
'player.levelChanged':obj({'accountLevel':POS,'xp':AMT,'revision':N}),
'app.initialize':obj({'userNamespace':ID,'environment':enum('development','test','production'),'hostBuild':ID,'safeArea':safeArea,'settings':settings,'settingsRevision':N,'initialRoute':nullable(ID),'externalRewardsEnabled':BOOL}),
'app.userChanged':obj({'userNamespace':ID,'reason':enum('signIn','signOut','switchAccount')}),
'app.purchaseResult':obj({'operationId':ID,'productId':ID,'status':enum('verified','cancelled','failed','pending'),'verificationToken':nullable(S),'errorCode':nullable(ID)}),
'app.rewardGranted':obj({'operationId':ID,'placementId':ID,'verificationToken':S}),
'app.pause':obj({'reason':enum('background','interruption','exit'),'hostMonotonicMs':N,'wallUtcMs':N,'flushRequested':BOOL}),
'app.resume':obj({'hostMonotonicMs':N,'wallUtcMs':N,'safeArea':safeArea}),
'app.settingsChanged':obj({'settingsRevision':N,'settings':settings}),
'app.deepLink':obj({'routeId':ID,'entityId':nullable(ID)}),
'app.notificationOpened':obj({'notificationId':ID,'routeId':ID})}
schema('bridge-payloads',{'$defs':payloads,'oneOf':[{'type':'object','required':['type','payload'],'properties':{'type':{'const':name},'payload':{'$ref':'#/$defs/'+name}}} for name in payloads]})
catalog=[]
for name,shape in payloads.items():
 external=name in ['purchase.requested','ad.rewardRequested','app.purchaseResult','app.rewardGranted']
 catalog.append({'type':name,'direction':'host_to_game' if name.startswith('app.') else 'game_to_host','payloadSchema':f'bridge-payloads.schema.json#/$defs/{name}','mvpEnabled':not external,'requestIdRequired':name.startswith('app.') or name in ['purchase.requested','ad.rewardRequested','game.exitRequested'],'replayPolicy':'same operationId/receipt only; never regrant' if external or name=='reward.claimed' else 'reject stale session/generation; coalesce summaries by revision; idempotent request ID','threadPolicy':'marshal to receiving runtime thread before dispatch','maxEncodedBytes':65536})
dump('data-spec/bridge-protocol.json',{'status':'PROPOSED_NOT_NATIVE_VERIFIED','version':1,'validation':['bridge.schema.json','bridge-payloads.schema.json'],'messages':catalog,'transportConstraints':{'maxEncodedBytes':65536,'maxDepth':12,'maxBatchMessages':32,'unknownType':'reject','unknownVersion':'reject','staleGeneration':'reject','purchaseGrantAuthority':'verified pending operation mapped by configuration; callback cannot supply arbitrary amount'}})
write('data-spec/bridge-examples.md','''# Bridge validation examples

Validate each envelope against both bridge.schema.json and bridge-payloads.schema.json. The payload schema discriminates on `type`; it is not a free-form payload validator. Transport additionally enforces size/depth, direction, request IDs, sequence/session state and pending-operation authority.

Valid control example: version1, type app.pause, requestId pause:1, sessionId session:1, generation1, sequence4, timestamp1000; payload reason background, hostMonotonicMs100, wallUtcMs1000, flushRequested true. Invalid examples: currency balance −1, unknown message type, app.rewardGranted with arbitrary amount, missing operationId, stale session, protocol2 and >64KiB body. Structural schemas catch shape errors; stateful harness catches stale/replay/authority errors.

[Protocol catalogue](bridge-protocol.json) · [Protocol spec](../docs/technical/18_BRIDGE_PROTOCOL.md) · [Native spike](../spikes/rn-cocos/README.md).
''')
