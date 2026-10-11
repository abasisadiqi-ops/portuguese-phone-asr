/** Foreground-only, ephemeral session statistics. Never contains transcript, audio,
 * speaker identity, filename, or wall-clock time. Snapshot is read-only evidence,
 * not a speech-accuracy score or confirmation of microphone hardware release.
 */
const STATES=Object.freeze(['off','listening','capturing','processing','muted']);
const TYPES=Object.freeze(['completed','failed']);
export function createSessionMetrics({now=()=>performance.now()}={}){
  let state='off',entered=now(),turns=0,failures=0,changes=0;
  const elapsed=Object.fromEntries(STATES.map(s=>[s,0]));
  function monotonic(){const t=now();if(!Number.isFinite(t)||t<entered)throw Error('Non-monotonic session clock');return t;}
  function transition(next){
    if(!STATES.includes(next))throw Error('Unknown microphone state');
    const t=monotonic();if(next===state)return;
    elapsed[state]+=t-entered;entered=t;state=next;changes++;
  }
  function count(type){if(!TYPES.includes(type))throw Error('Unknown non-identifying session event');if(type==='completed')turns++;else failures++;}
  function snapshot(){
    const t=monotonic();const durations={...elapsed};durations[state]+=t-entered;
    const whole=Object.freeze(Object.fromEntries(Object.entries(durations).map(([key,value])=>[key,Math.max(0,Math.round(value))])));
    return Object.freeze({schema:'verba-session-metrics-v1',storage:'ephemeral_only',source:'frontend_state_transitions',state,
      transitions:changes,completed_audio_turns:turns,failed_audio_turns:failures,durations_ms:whole,
      voice_accuracy_attested:false,network_offline_attested:false,study_minutes:0,
      stores_audio:false,stores_transcript:false,stores_identifiers:false});
  }
  return Object.freeze({transition,count,snapshot});
}
