import { Asset, AudioClip, AudioSource, Font, Node, Prefab, resources, SpriteAtlas, SpriteFrame, native, sys } from 'cc';
import { ART, ArtId } from './ArtIds';
import { CONTENT } from './BattleContent';
import { META_ATLASES, META_BACKGROUNDS } from './FullArt';

export type HapticKind='selection'|'light'|'merge'|'reward'|'error';
type Voice={source:AudioSource;name:string;until:number;gain:number};
const SOUND_IDS=['hero_spawn_1','hero_drop_1','combat_melee_1','combat_hit_1','combat_crit_1','enemy_deathSmall_1',
    'economy_goldGain_1','economy_gemGain_1','combat_magic_1','combat_ranged_1','merge_low_1','merge_high_1',
    'ui_soft_1','ui_primary_1','ui_error_1','ui_tab_1','ui_open_1','ui_close_1','ui_toggle_1','ui_tick_1',
    'reward_claim_1','upgrade_1','equipment_1','wheel_stop_1'];

export class BattleAssets {
    static reducedMotion=false; private sfxGain=1; private haptics=true; private hapticAvailable=true;
    private voices:Voice[]=[];private started=new Set<string>();private ended=new Set<string>();
    private musicGain=-1;private musicDuck=1;private duckUntil=0;private suspended=false;
    private lastHaptic=0;private lastCombat=0;
    private retained: Asset[] = [];
    extra: SpriteAtlas[] = []; backgrounds = new Map<string, SpriteFrame>();
    private music!: AudioSource;
    ui!: SpriteAtlas;
    actors!: SpriteAtlas;
    background!: SpriteFrame;
    font!: Font;
    bold!: Font;
    prefabs = new Map<string, Prefab>();
    audio = new Map<string, AudioClip>();
    private lastSound = new Map<string, number>();
    private load<T extends Asset>(path: string, type: new (...args: any[]) => T): Promise<T> {
        return new Promise((resolve, reject) => resources.load(path, type, (err, asset) => {
            if (err) { reject(err); return; }
            asset.addRef(); this.retained.push(asset); resolve(asset);
        }));
    }
    async init(root: Node): Promise<void> {
        [this.ui, this.actors, this.background, this.font, this.bold] = await Promise.all([
            this.load('atlases/battle_ui', SpriteAtlas), this.load('atlases/battle_actors', SpriteAtlas),
            this.load('textures/background/spriteFrame', SpriteFrame),
            this.load('fonts/PassionOne-Regular', Font), this.load('fonts/PassionOne-Bold', Font),
        ]);
        this.extra = await Promise.all(META_ATLASES.map(name => this.load('atlases/' + name, SpriteAtlas)));
        await Promise.all(META_BACKGROUNDS.map(async name => this.backgrounds.set(name, await this.load('textures/' + name + '/spriteFrame', SpriteFrame))));
        const musicNode = new Node('Music'); root.addChild(musicNode); this.music = musicNode.addComponent(AudioSource);
        // Licensed Town Theme RPG; start only after saved preferences apply.
        this.music.clip = await this.load('audio/ambience', AudioClip); this.music.loop = true; this.music.volume = 0;
        await Promise.all(['Hero', 'Enemy', 'Projectile', 'DamageText', 'SimpleVfx'].map(async name =>
            this.prefabs.set(name, await this.load('prefabs/' + name, Prefab))));
        await Promise.all(SOUND_IDS.map(async name => {
            try { this.audio.set(name, await this.load('audio/' + name, AudioClip)); }
            catch (err) { console.warn('[cocos-spike] optional audio unavailable', name); }
        }));
        // Persistent sources avoid playOneShot's silent asynchronous failure path.
        // Pre-bind clips once; at most eight effects can actually play together.
        for(const [name,clip] of this.audio){
            for(let i=0;i<(name.startsWith('combat_')?2:1);i++){
                const node=new Node('Sound_'+name+'_'+i);root.addChild(node);
                const source=node.addComponent(AudioSource);source.playOnAwake=false;source.loop=false;source.clip=clip;
                const voice:Voice={source,name,until:0,gain:1};this.voices.push(voice);
                node.on(AudioSource.EventType.STARTED,()=>{if(!this.started.has(name)){this.started.add(name);console.log('[cocos-audio] started',JSON.stringify({name,gain:source.volume}));}});
                node.on(AudioSource.EventType.ENDED,()=>{voice.until=0;if(!this.ended.has(name)){this.ended.add(name);console.log('[cocos-audio] ended',name);}});
            }
        }
        console.log('[cocos-spike] assets', JSON.stringify({ uiFrames: this.ui.getSpriteFrames().length,
            actorFrames: this.actors.getSpriteFrames().length, sounds: this.audio.size,
            uiTextureFormat: this.ui.getTexture()!.getPixelFormat(), actorTextureFormat: this.actors.getTexture()!.getPixelFormat() }));
    }
    frame(id: string): SpriteFrame {
        const semantic = (ART as Record<string,string>)[id] || id;
        const f = this.actors.getSpriteFrame(semantic) || this.ui.getSpriteFrame(semantic) || this.extra.map(a => a.getSpriteFrame(semantic)).find(Boolean) || this.backgrounds.get(semantic);
        if (!f) throw Error('Missing original asset: ' + semantic);
        return f;
    }
    preferences(settings: {musicGain:number;sfxGain:number;reducedMotion?:boolean;haptics?:boolean}):void {
        BattleAssets.reducedMotion=!!settings.reducedMotion; this.haptics=settings.haptics!==false;
        if(this.sfxGain!==settings.sfxGain){this.sfxGain=settings.sfxGain;for(const voice of this.voices){voice.source.volume=this.sfxGain*voice.gain;if(!this.sfxGain){voice.source.stop();voice.until=0;}}}
        if(this.musicGain!==settings.musicGain){this.musicGain=settings.musicGain;this.music.volume=this.musicGain*.15*this.musicDuck;
            if(!this.musicGain)this.music.pause();else if(!this.suspended&&!this.music.playing)this.music.play();}
    }
    portrait(prefix:string):SpriteFrame {for(const atlas of [this.actors,this.ui,...this.extra]){const frame=atlas.getSpriteFrames().find(f=>f?.name.startsWith(prefix+'__'));if(frame)return frame;}throw Error('Missing portrait '+prefix);}
    hero(tier: number): SpriteFrame {
        const f = this.actors.getSpriteFrame(CONTENT.heroes[tier - 1].visualId);
        if (!f) throw Error('Missing hero tier ' + tier);
        return f;
    }
    haptic(kind:HapticKind='light'):void {
        const now=Date.now();if(!this.haptics||!this.hapticAvailable||!sys.isNative||this.suspended||now-this.lastHaptic<90)return;
        this.lastHaptic=now;
        try{if(sys.os===sys.OS.ANDROID)native.reflection.callStaticMethod('com/cocos/game/AppActivity','gameHaptic','(Ljava/lang/String;)V',kind);
            else if(sys.os===sys.OS.IOS)native.reflection.callStaticMethod('AppDelegate','gameHaptic:',kind);
        }catch{this.hapticAvailable=false;console.warn('[cocos-audio] native haptics unavailable');}
    }
    sound(name: string, gain=1): void {
        const clip = this.audio.get(name); if (!clip || this.sfxGain<=0 || this.suspended) return;
        const combat=name.startsWith('combat_'),now=Date.now(),gap=combat?100:name==='ui_tick_1'?85:80;
        if(now-(this.lastSound.get(name)??-Infinity)<gap)return;
        if(combat&&now-this.lastCombat<65)return;
        const active=this.voices.filter(v=>v.until>now);
        if(combat&&active.filter(v=>v.name.startsWith('combat_')).length>=4)return;
        if(active.length>=8){if(combat)return;const old=active.filter(v=>v.name.startsWith('combat_')).sort((a,b)=>a.until-b.until)[0];if(!old)return;old.source.stop();old.until=0;}
        const candidates=this.voices.filter(v=>v.name===name);
        const voice=candidates.find(v=>v.until<=now)??candidates[0];if(!voice)return;
        this.lastSound.set(name,now);
        if(combat)this.lastCombat=now;else if(name!=='ui_tick_1')this.duckUntil=now+450;
        // UI/rewards sit above music. Rapid automatic combat stays farther back.
        voice.gain=(combat?.5:.8)*Math.max(0,Math.min(1,gain));voice.source.volume=voice.gain*this.sfxGain;
        voice.source.stop();voice.source.play();voice.until=now+Math.max(.08,clip.getDuration())*1000+35;
    }
    update(dt:number):void {const target=Date.now()<this.duckUntil?.62:1;this.musicDuck+=(target-this.musicDuck)*Math.min(1,dt*(target<this.musicDuck?16:4));if(this.music)this.music.volume=Math.max(0,this.musicGain)*.15*this.musicDuck;}
    suspend(value:boolean):void {this.suspended=value;if(value){for(const v of this.voices){v.source.stop();v.until=0;}this.music?.pause();}else if(this.musicGain>0)this.music?.play();}
    dispose(): void { for(const v of this.voices)v.source.stop();this.voices.length=0;this.music.stop();this.lastSound.clear();for(const asset of this.retained)asset.decRef();this.retained.length=0; }
}
