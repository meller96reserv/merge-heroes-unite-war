"""Create a reusable release key once; do not publish private/ in source control."""
from pathlib import Path
import os,json,secrets,subprocess,sys
P=Path(__file__).resolve().parents[1];private=P/'private';private.mkdir(exist_ok=True)
config=private/'android-signing.json';key=private/'com.mergeheroes.unitewar.jks'
if config.exists():
    assert key.exists(), 'Missing existing release key; restore it instead of replacing it'
else:
    assert not key.exists(), 'Existing key requires its original credentials'
    if '--create-new' not in sys.argv:
        raise SystemExit('Restore the existing private Android key and android-signing.json before release builds. New signing identity requires explicit --create-new; it cannot update the existing app.')
    password=secrets.token_urlsafe(32)
    env=os.environ.copy();env['GAME_SIGNING_PASS']=password
    java=Path(os.environ.get('JAVA_HOME','/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home'))
    subprocess.run([str(java/'bin/keytool'),'-genkeypair','-keystore',str(key),'-storetype','JKS','-alias','mergeheroes','-keyalg','RSA','-keysize','3072','-validity','10000','-dname','CN=Merge Heroes Unite War','-storepass:env','GAME_SIGNING_PASS','-keypass:env','GAME_SIGNING_PASS'],env=env,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    fd=os.open(config,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
    with os.fdopen(fd,'w') as f:json.dump({'alias':'mergeheroes','storePassword':password,'keyPassword':password},f,indent=2)
    os.chmod(key,0o600)
print('Existing reusable Android release signing is ready')
