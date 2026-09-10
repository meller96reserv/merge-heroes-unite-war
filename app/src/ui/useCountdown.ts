import {useEffect,useState} from 'react';import {AppState} from 'react-native';
/** Display only. Eligibility remains the domain's rollback-safe decision. */
export function useCountdown(deadline:number){
 const [now,setNow]=useState(()=>Date.now());
 useEffect(()=>{
  const update=()=>setNow(Date.now());update();
  if(deadline<=Date.now())return;
  const timer=setInterval(()=>{update();if(Date.now()>=deadline)clearInterval(timer);},1000);
  const subscription=AppState.addEventListener('change',state=>{if(state==='active')update();});
  return()=>{clearInterval(timer);subscription.remove();};
 },[deadline]);
 return Math.max(0,deadline-now);
}
