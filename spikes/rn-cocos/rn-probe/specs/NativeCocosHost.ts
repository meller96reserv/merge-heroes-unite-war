import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  open(): Promise<string>;
  send(raw: string): Promise<string>;
  readonly onMessage: CodegenTypes.EventEmitter<string>;
  readonly onAudioState: CodegenTypes.EventEmitter<string>;
}

export default TurboModuleRegistry.get<Spec>('NativeCocosHost');
