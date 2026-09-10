import type {RouteName} from '../ui/NavigationCoordinator';
/** Notification payloads only select known screens. They never carry grants. */
export function externalRoute(data:unknown):RouteName|null {
 if(!data||typeof data!=='object'||Array.isArray(data))return null;
 const record=data as Record<string,unknown>;
 if(Object.keys(record).some(k=>k!=='route'))return null;
 return ['battle','daily','wheel'].includes(String(record.route))?record.route as RouteName:null;
}
