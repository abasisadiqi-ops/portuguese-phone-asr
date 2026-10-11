/* Research-only Greek phonology evidence engine. No reconstructed audio or automatic IPA. */
export const periods=Object.freeze({
mycenaean:['Mycenaean Greek','c. 1450–1200 BCE','Linear B syllabary; underdetermines later Greek sounds'],
archaic:['Archaic dialects','c. 800–480 BCE','Local alphabets, poetic registers and regional differences'],
attic:['Classical Attic','c. 480–323 BCE','Historically bounded educated Attic, not all ancient speech'],
hellenistic:['Hellenistic Koine','c. 323–30 BCE','Developing common language with regional differences'],
roman:['Roman-period Koine','c. 30 BCE–330 CE','Papyri, spelling and register differences must be dated'],
late:['Late Antique Greek','c. 330–650 CE','Written conservatism need not imply unchanged pronunciation'],
byzantine:['Medieval Greek','c. 650–1453 CE','Manuscripts and later reading traditions'],
modern:['Modern Greek','modern documented speech','Modern phonetic records are not Ancient Greek recordings']
});
export const kinds=Object.freeze(['linear_b_tablet','regional_inscription','dated_papyrus','grammatian','metrical_evidence','ancient_music','transliteration','manuscript','comparative','modern_recording','pedagogical_convention']);
export const features=Object.freeze(['vowel_quality','vowel_quantity','diphthongs','itacism','pitch_accent','stress_accent','aspiration','consonant_manner','contact','prosody']);
const check=(v,msg)=>{if(!v)throw new Error(msg)};
const txt=(s,n=500)=>typeof s==='string'&&s.trim().length>0&&s.length<=n;
const key=s=>txt(s,70)&&/^[a-z0-9][a-z0-9._-]*$/i.test(s);
export function createCase({id,period,text,edition,dialect='unspecified',region='unspecified'}={}){
check(key(id),'Stable ID required');check(Object.hasOwn(periods,period),'Specific Greek period required');
check(txt(edition,650),'Citable edition identifier required');check(txt(text,650),'Original written text required');
const original=text.normalize('NFC').trim();
check(period==='mycenaean'?/[\u{10000}-\u{1007F}]/u.test(original):/[\u0370-\u03FF\u1F00-\u1FFF]/u.test(original),'Expected attested script for this period');
return {schema:'greek-sound-evidence-v1',id,period,original,edition,dialect,region,
 witnesses:[],hypotheses:[],review:'UNVERIFIED',historical_voice_certified:false,
 machine_training_authorized:false,synthetic_audio_authorized:false,study_minutes:0};
}
export function checkCase(c){
check(c?.schema==='greek-sound-evidence-v1'&&Object.hasOwn(periods,c.period),'Unknown dossier');
check(c.historical_voice_certified===false&&c.machine_training_authorized===false&&c.synthetic_audio_authorized===false&&c.study_minutes===0,'Training/audio claims forbidden');
check(Array.isArray(c.witnesses)&&Array.isArray(c.hypotheses),'Evidence arrays required');return true;
}
export function addWitness(c,{id,kind,source,period,dating,synthetic=true,reviewed=false}={}){
checkCase(c);check(key(id)&&!c.witnesses.some(x=>x.id===id),'Unique witness ID required');
check(kinds.includes(kind)&&Object.hasOwn(periods,period),'Dated evidence type required');
check(txt(source,650)&&txt(dating,120),'Source item and dating required');
check(typeof synthetic==='boolean'&&typeof reviewed==='boolean','Explicit witness authentication required');
const w={id,kind,source,period,dating,synthetic,reviewed};c.witnesses.push(w);return w;
}
export function addHypothesis(c,{id,ipa,feature,witnessIds,argument,limitations,claim='historical_reconstruction'}={}){
checkCase(c);check(key(id)&&!c.hypotheses.some(x=>x.id===id),'Unique hypothesis ID required');
check(features.includes(feature)&&['historical_reconstruction','modern_attested','teaching_convention'].includes(claim),'Select explicit sound claim');
check(txt(ipa,250)&&txt(argument,1200)&&txt(limitations,650),'Manual IPA, argument and limitation required');
check(Array.isArray(witnessIds)&&witnessIds.length>0,'Cite at least one witness');
const ws=witnessIds.map(id=>c.witnesses.find(w=>w.id===id));
check(ws.every(Boolean),'Unknown witness ID');
check(ws.every(w=>!w.synthetic&&w.reviewed),'Synthetic/unreviewed witnesses cannot support sound');
if(claim==='historical_reconstruction')check(c.period!=='modern'&&ws.some(w=>!['modern_recording','pedagogical_convention'].includes(w.kind)),'Modern recordings or teaching convention alone cannot prove ancient voice');
if(claim==='modern_attested')check(c.period==='modern'&&ws.some(w=>w.kind==='modern_recording'&&w.period==='modern'),'Documented modern recording required');
if(claim==='teaching_convention')check(ws.some(w=>w.kind==='pedagogical_convention'),'Name pedagogical evidence explicitly');
const p={id,ipa,feature,witness_ids:[...new Set(witnessIds)],argument,limitations,claim,
 expert_review_required:true,certified_historical_audio:false,training_allowed:false};
c.hypotheses.push(p);return p;
}
export function audit(c){checkCase(c);const warnings=[];
if(!c.witnesses.length)warnings.push('No witness: keep written form; do not invent a pronunciation.');
if(!c.hypotheses.length)warnings.push('No human argued sound value has been entered.');
if(c.witnesses.some(w=>w.synthetic))warnings.push('Illustrative witnesses never authenticate sound.');
if(c.witnesses.some(w=>w.period!==c.period))warnings.push('Cross-period comparison requires a sound-change argument.');
if(c.witnesses.some(w=>w.kind==='pedagogical_convention'))warnings.push('Erasmian teaching is a convention, not ancient speech.');
if(['hellenistic','roman'].includes(c.period))warnings.push('Koine varied by place and register; never impose one timeless pronunciation.');
if(c.period==='mycenaean')warnings.push('Linear B notation underspecifies later distinctions.');
return {schema:'greek-research-audit-v1',id:c.id,period:c.period,witness_count:c.witnesses.length,
 hypothesis_count:c.hypotheses.length,warnings,historical_sound_certified:false,
 speech_synthesis_authorized:false,training_authorized:false,study_minutes:0,
 expert_review_required:true};
}
