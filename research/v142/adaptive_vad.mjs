/** v1.0.42 research copy — EXPERIMENTAL sound-energy detector, NOT a speech classifier.
 * Public-safe: no recording, transcript, account data or network access.
 * See the isolated source ZIP for the integration with MediaRecorder.
 */
export function createAdaptiveTurnDetector({
  floor=0.012,noiseMultiplier=2.8,sensitivity=0.023,
  minVoiceMs=320,endSilenceMs=850,maxTurnMs=17000,
  noiseSmoothing=0.07,releaseRatio=0.65,maxNoiseFloor=0.075
}={}){
  const finite=v=>typeof v==='number'&&Number.isFinite(v);
  if(![floor,noiseMultiplier,sensitivity,minVoiceMs,endSilenceMs,maxTurnMs,noiseSmoothing,releaseRatio,maxNoiseFloor].every(finite)
    ||floor<=0||floor>=1||sensitivity<floor||sensitivity>=1||noiseMultiplier<1||noiseMultiplier>12
    ||minVoiceMs<100||endSilenceMs<250||maxTurnMs<1500||noiseSmoothing<=0||noiseSmoothing>1
    ||releaseRatio<0.2||releaseRatio>1||maxNoiseFloor<=floor||maxNoiseFloor>=1){
    throw new Error('Invalid adaptive detector configuration');
  }
  let noise=floor,phase='idle',candidate=null,started=null,lastVoice=null,previousTime=null,detectedTurns=0;
  const reset=()=>{phase='idle';candidate=started=lastVoice=null;};
  const thresholds=()=>{const start=Math.max(sensitivity,noise*noiseMultiplier);return {start,release:Math.max(floor,start*releaseRatio)};};
  const snapshot=()=>Object.freeze({noiseFloor:noise,threshold:thresholds().start,phase,detectedTurns});
  return {reset,snapshot,phase:()=>phase,feed(rms,ms){
    if(!finite(rms)||rms<0||rms>1||!finite(ms)||ms<0)throw new Error('Invalid audio detector input');
    if(previousTime!==null&&ms<previousTime)throw new Error('Non-monotonic audio clock');
    previousTime=ms;
    const {start,release}=thresholds();
    if(phase==='idle'){
      if(rms<start){
        noise=Math.min(maxNoiseFloor,Math.max(floor,(1-noiseSmoothing)*noise+noiseSmoothing*rms));
        candidate=null;return null;
      }
      if(candidate===null){candidate=ms;return null;}
      if(ms-candidate>=minVoiceMs){phase='active';started=candidate;lastVoice=ms;return 'begin';}
      return null;
    }
    if(rms>=release)lastVoice=ms;
    if(ms-started>=maxTurnMs||ms-lastVoice>=endSilenceMs){detectedTurns++;reset();return 'finish';}
    return null;
  }};
}
