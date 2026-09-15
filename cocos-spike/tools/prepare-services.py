"""Generate public native configuration; signing credentials stay in private/."""
from pathlib import Path
import json
P=Path(__file__).resolve().parents[1]
c=json.loads((P/'app-services.json').read_text())
assert c['package']=='com.mergeheroes.unitewar'
for platform in ['android','ios']:
    values={'METRICA':c['appMetricaKey'],'START_IO':c['startIoAndroidAppId' if platform=='android' else 'startIoIosAppId'], 'TERMS':c['termsUrl'],'PRIVACY':c['privacyUrl']}
    if platform=='android':
        dest=P/'native/engine/android/app/src/com/cocos/game/GameServiceConfig.java'
        dest.write_text('package com.cocos.game;\npublic final class GameServiceConfig {\n'+''.join('public static final String '+k+'='+json.dumps(v)+';\n' for k,v in values.items())+'}\n')
    else:
        (P/'native/engine/ios/GameServiceConfig.h').write_text('#pragma once\n'+''.join('#define GAME_'+k+' @'+json.dumps(v)+'\n' for k,v in values.items()))
print('Native service configuration generated; Start.io IDs configured:', bool(c['startIoAndroidAppId']),bool(c['startIoIosAppId']))
