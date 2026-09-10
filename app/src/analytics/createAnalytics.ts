import AppMetrica from '@appmetrica/react-native-analytics';
import Constants from 'expo-constants';
import {AnalyticsAdapter} from './AnalyticsAdapter';
export function createAnalytics(){
 const apiKey=Constants.expoConfig?.extra?.appmetricaApiKey;
 if(typeof apiKey!=='string'||! /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(apiKey))return null;
 return new AnalyticsAdapter({start:()=>AppMetrica.activate({apiKey,logs:false,statisticsSending:false,locationTracking:false,advIdentifiersTracking:false,revenueAutoTrackingEnabled:false,crashReporting:false,nativeCrashReporting:false,sessionsAutoTracking:true,appVersion:Constants.expoConfig?.version,maxReportsInDatabaseCount:100,maxReportsCount:20,dispatchPeriodSeconds:90}),enabled:v=>AppMetrica.setDataSendingEnabled(v),event:(name,params)=>AppMetrica.reportEvent(name,params),flush:()=>AppMetrica.sendEventsBuffer()});
}
