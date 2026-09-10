import type {DomainEvent} from '../../../game-core/src/events/EventBus';
import {EffectPrimitives,type EffectKind,type EffectMode} from './EffectPrimitives';
/** Committed semantic contracts shared by the required panels. Purely cosmetic. */
export const metaFeedback:Readonly<Record<string,{kind:EffectKind;priority:number}>>={
 'daily.claimed':{kind:'reward',priority:3},'chest.opened':{kind:'reward',priority:3},
 'relic.opened':{kind:'reward',priority:3},'equipment.opened':{kind:'reward',priority:3},
 'item.enhanced':{kind:'reward',priority:2},'upgrade.committed':{kind:'reward',priority:2},
 'equipment.changed':{kind:'merge',priority:1},'tier.discovered':{kind:'reward',priority:3},
};
export class MetaRewardMotion extends EffectPrimitives {
 ingest(batch:readonly DomainEvent[],anchor:{x:number;y:number},mode:EffectMode){
  const selected=new Map<string,DomainEvent>();
  for(const event of batch){
   const rule=metaFeedback[event.type];if(!rule||!event.eventId||!event.transactionId)continue;
   const previous=selected.get(event.transactionId);
   if(!previous||rule.priority>metaFeedback[previous.type]!.priority)selected.set(event.transactionId,event);
  }
  for(const event of selected.values())this.emit({id:`meta:${event.transactionId}`,kind:metaFeedback[event.type]!.kind,...anchor,mode});
 }
}
