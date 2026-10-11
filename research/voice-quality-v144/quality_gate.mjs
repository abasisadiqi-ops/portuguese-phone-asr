/** Candidate selection contract. A model listing/benchmark never equals iPhone support. */
export const CANDIDATES=Object.freeze({
 'whisper-tiny':Object.freeze({job:'asr',deployment:'previously_phone_tested',source:'onnx-community/whisper-tiny',claims:['pt-PT baseline'],license_review:'required'}),
 'whisper-base':Object.freeze({job:'asr',deployment:'previously_phone_tested',source:'onnx-community/whisper-base',claims:['pt-PT baseline'],license_review:'required'}),
 'whisper-large-v3-turbo':Object.freeze({job:'asr',deployment:'research_only',source:'onnx-community/whisper-large-v3-turbo',claims:['multilingual ASR research'],license_review:'required'}),
 'qwen3-asr-0.6b':Object.freeze({job:'asr',deployment:'research_only',source:'Qwen/Qwen3-ASR-0.6B-hf',claims:['Modern Portuguese','Modern Greek','Modern Arabic'],license_review:'Apache-2.0 card; inspect dependencies'}),
 'qwen3-asr-1.7b':Object.freeze({job:'asr',deployment:'research_only',source:'Qwen/Qwen3-ASR-1.7B-hf',claims:['multilingual research'],license_review:'Apache-2.0 card; inspect dependencies'}),
 'silero-vad':Object.freeze({job:'vad',deployment:'research_only',source:'github.com/snakers4/silero-vad',claims:['learned VAD candidate; browser format and license to validate'],license_review:'required'}),
 'qwen3-tts-0.6b':Object.freeze({job:'tts',deployment:'research_only',source:'Qwen/Qwen3-TTS-12Hz-0.6B-Base',claims:['Portuguese supported; pt-PT quality unverified'],license_review:'Apache-2.0 card; individual voice rights review'}),
 'qwen2.5-0.5b-dialogue':Object.freeze({job:'dialogue',deployment:'research_only',source:'onnx-community/Qwen2.5-0.5B-Instruct',claims:['open conversation candidate; low-resource dialogue unverified'],license_review:'required'})
});
const valid=x=>typeof x==='string'&&x.length>0&&x.length<=150;
const uniq=x=>new Set(x).size;
export function gateAsr({model,locale,clips,baseline=[]}){
 if(!Object.hasOwn(CANDIDATES,model)||CANDIDATES[model].job!=='asr'||!valid(locale)||!Array.isArray(clips)||!Array.isArray(baseline))throw Error('Invalid ASR candidate request');
 for(const x of [...clips,...baseline]){
  if(!x||!valid(x.sha256)||!valid(x.speaker_group)||!valid(x.session_group)||!valid(x.condition)||x.locale!==locale||x.reference_reviewed!==true||x.use_rights_verified!==true||x.split!=='test'||!(Number.isFinite(x.cer)&&x.cer>=0)||!(Number.isFinite(x.latency_ms)&&x.latency_ms>=0))throw Error('Invalid or unreviewed independent speech observation');
 }
 if(uniq(clips.map(x=>x.sha256))!==clips.length||uniq(baseline.map(x=>x.sha256))!==baseline.length)throw Error('Duplicate audio cannot inflate sample count');
 const ids=clips.map(x=>x.sha256).sort(),compare=baseline.map(x=>x.sha256).sort();
 const paired=ids.length>0&&ids.length===compare.length&&ids.every((s,i)=>s===compare[i]);
 const speakers=uniq(clips.map(x=>x.speaker_group)),sessions=uniq(clips.map(x=>x.session_group)),conditions=uniq(clips.map(x=>x.condition));
 const sufficient=clips.length>=30&&speakers>=5&&sessions>=5&&conditions>=2;
 const mean=clips.length?clips.reduce((a,x)=>a+x.cer,0)/clips.length:null;
 const latencies=clips.map(x=>x.latency_ms).sort((a,b)=>a-b);
 const p95=latencies.length?latencies[Math.ceil(latencies.length*.95)-1]:null;
 return Object.freeze({schema:'model-quality-gate-v144',model,locale,observations:clips.length,speakers,sessions,conditions,paired_with_baseline:paired,
  mean_cer:mean,p95_decode_ms:p95,coverage_sufficient:sufficient,training_allowed:false,study_minutes:0,promoted:false,
  stage:sufficient&&paired?'AWAIT_INDEPENDENT_LINGUIST_AND_DEVICE_REVIEW':'HOLD_INSUFFICIENT_EVIDENCE',
  historic_voice_claim:false,source_audio_embedded:false});
}
export function gateTts({model,locale,ratings,voice_consent=false}){
 if(!Object.hasOwn(CANDIDATES,model)||CANDIDATES[model].job!=='tts'||!valid(locale)||!Array.isArray(ratings))throw Error('Invalid voice candidate');
 for(const x of ratings)if(!x||!valid(x.id)||!valid(x.native_rater)||x.locale!==locale||!Number.isInteger(x.pronunciation)||x.pronunciation<1||x.pronunciation>5||!Number.isInteger(x.prosody)||x.prosody<1||x.prosody>5)throw Error('Invalid native-speaker quality score');
 if(uniq(ratings.map(x=>x.id))!==ratings.length)throw Error('Duplicated speech prompt');
 const eligible=ratings.length>=30&&uniq(ratings.map(x=>x.native_rater))>=3&&voice_consent===true;
 return Object.freeze({schema:'voice-quality-gate-v144',model,locale,promoted:false,auto_voice_cloning:false,
  native_reviews:ratings.length,voice_consent_verified:voice_consent,
  stage:eligible?'AWAIT_INDEPENDENT_AUDIO_AND_IP_REVIEW':'HOLD_INSUFFICIENT_NATIVE_REVIEWS',
  claims_historical_authenticity:false,training_allowed:false,study_minutes:0});
}
