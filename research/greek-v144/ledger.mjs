// Greek historical evidence, separate from Modern Greek ASR. No generated ancient pronunciation.
export const PERIODS=Object.freeze({
 mycenaean:{label:'Mycenaean / Linear B',dates:'c. 1450–1200 BCE'},
 archaic:{label:'Archaic regional dialects',dates:'c. 800–480 BCE'},
 attic:{label:'Classical Attic',dates:'c. 480–323 BCE'},
 koine_hellenistic:{label:'Hellenistic Koine',dates:'c. 323–30 BCE'},
 koine_roman:{label:'Roman-period Koine',dates:'c. 30 BCE–330 CE'},
 late_antique:{label:'Late Antique Greek',dates:'c. 330–650 CE'},
 medieval:{label:'Medieval / Byzantine Greek',dates:'c. 650–1453 CE'},
 modern:{label:'Modern Greek (recorded)',dates:'modern audio documentation'}
});
export const EVIDENCE=Object.freeze({
 inscription:'Regionally dated inscription',papyrus:'Dated documentary papyrus',
 linear_b:'Original Linear B tablet',ancient_grammar:'Ancient grammarian',
 poetic_metre:'Poetic metre',transliteration:'Cross-language transcription',
 comparative:'Explicitly argued comparative method',
 modern_recording:'Dated modern spoken recording',
 teaching_tradition:'Erasmian/other modern teaching convention'
});
const req=(s,m=800)=>typeof s==='string'&&s.trim().length>0&&s.length<=m;
const has=(o,k)=>Object.hasOwn(o,k);
const id=(s)=>req(s,64)&&/^[a-z0-9][a-z0-9-]*$/i.test(s);
function err(s){throw Error(s)}
export function createCase({caseId,period,original,sourceId}){
 if(!id(caseId)||!has(PERIODS,period)||!req(original,800)||!req(sourceId))err('Case requires an ID, dated period, written source and citation');
 const text=original.trim().normalize('NFC');
 if(period==='mycenaean'){if(!/[\u{10000}-\u{1007f}]/u.test(text))err('Linear B cannot be silently read as the later Greek alphabet')}
 else if(!/[\u0370-\u03ff\u1f00-\u1fff]/u.test(text))err('Use the original Greek script, not only transliteration');
 return {schema:'greek-witness-lane-v144',caseId,period,original:text,sourceId,witnesses:[],proposals:[],
 review:'DRAFT',historical_pronunciation_certified:false,training_allowed:false,generated_ancient_audio:false,study_minutes:0};
}
export function addWitness(record,{id:witnessId,type,source,period,dating,synthetic=true,reviewed=false}){
 if(!record||record.schema!=='greek-witness-lane-v144'||!id(witnessId)||!has(EVIDENCE,type)||!has(PERIODS,period)||!req(source)||!req(dating))err('Witness must have a unique ID, type, period, date and exact source');
 if(record.witnesses.some(w=>w.id===witnessId))err('Duplicate witness ID');
 if(typeof synthetic!=='boolean'||typeof reviewed!=='boolean')err('Synthetic/review flags required');
 const w={id:witnessId,type,source,period,dating,synthetic,reviewed};
 record.witnesses.push(w);return w;
}
export function proposeSound(record,{id:proposalId,ipa,witnessIds,reason,uncertainty,kind='reconstruction'}){
 if(!record||record.schema!=='greek-witness-lane-v144'||!id(proposalId)||!req(ipa,250)||!req(reason,1600)||!req(uncertainty)||!Array.isArray(witnessIds)||!witnessIds.length||new Set(witnessIds).size!==witnessIds.length)err('Explicit IPA, limitations and distinct witnesses required');
 if(record.proposals.some(p=>p.id===proposalId))err('Duplicate hypothesis');
 const witnesses=witnessIds.map(w=>record.witnesses.find(x=>x.id===w));if(witnesses.some(w=>!w))err('Unknown witness');
 if(witnesses.some(w=>w.synthetic||!w.reviewed))err('Synthetic or unreviewed evidence cannot ground a sound proposal');
 if(!['reconstruction','modern_recorded','pedagogy'].includes(kind))err('Unknown claim type');
 if(kind==='modern_recorded'&&(record.period!=='modern'||!witnesses.some(w=>w.type==='modern_recording'&&w.period==='modern')))err('Modern speech claim requires a modern recording');
 if(kind==='reconstruction'&&(record.period==='modern'||witnesses.every(w=>w.type==='teaching_tradition'||w.type==='modern_recording')))err('Teaching conventions and modern recordings alone cannot prove an ancient pronunciation');
 if(kind==='pedagogy'&&!witnesses.some(w=>w.type==='teaching_tradition'))err('Teaching convention must be explicitly sourced');
 const p={id:proposalId,ipa,kind,witnessIds:[...witnessIds],reason,uncertainty,expert_review:'REQUIRED',automatic_tts:false};record.proposals.push(p);return p;
}
export function audit(record){
 if(!record||record.schema!=='greek-witness-lane-v144'||record.training_allowed!==false||record.generated_ancient_audio!==false||record.study_minutes!==0)err('Research cannot authorize model training or ancient voice');
 const problems=[];
 if(record.witnesses.some(w=>w.synthetic))problems.push('Illustrative evidence exists; it cannot support a reconstruction');
 if(record.witnesses.some(w=>w.period!==record.period))problems.push('Evidence spans periods; argue the chronology and sound-change mechanism');
 if(record.witnesses.some(w=>w.type==='teaching_tradition'))problems.push('Erasmian reading is a pedagogy, not a recorded ancient voice');
 if(['koine_hellenistic','koine_roman'].includes(record.period))problems.push('Koine differs by date, region, social situation and register');
 if(!record.proposals.length)problems.push('Written spelling is not a recording; no pronunciation has been established');
 return Object.freeze({caseId:record.caseId,period:record.period,witnessCount:record.witnesses.length,hypotheses:record.proposals.length,problems,
   ancient_voice_attested:false,voice_generation_authorized:false,speech_training_authorized:false,study_minutes:0,expert_review:'REQUIRED'});
}