import {periods,kinds,features,createCase,addWitness,addHypothesis,audit} from './phonology.mjs';
const $=id=>document.getElementById(id);let caseData=null;
function addOptions(id,list){for(const [key,label] of Object.entries(list)){const o=document.createElement('option');o.value=key;o.textContent=Array.isArray(label)?label[0]:label;$(id).add(o);}}
addOptions('casePeriod',periods);addOptions('witnessPeriod',periods);addOptions('witnessKind',Object.fromEntries(kinds.map(x=>[x,x.replaceAll('_',' ')])));addOptions('feature',Object.fromEntries(features.map(x=>[x,x.replaceAll('_',' ')])));
$('casePeriod').value='attic';$('witnessPeriod').value='attic';
Object.entries(periods).forEach(([id,meta],i)=>{
 const item=document.createElement('div');item.className='period';item.setAttribute('role','listitem');
 const num=document.createElement('span');num.className='num';num.textContent=String(i+1).padStart(2,'0');
 const body=document.createElement('div'),head=document.createElement('h3'),age=document.createElement('em'),p=document.createElement('p');
 head.textContent=meta[0];age.textContent=meta[1];p.textContent=meta[2];body.append(head,age,p);
 const btn=document.createElement('button');btn.type='button';btn.textContent='Study ↗';btn.setAttribute('aria-label','Select '+meta[0]);
 btn.onclick=()=>{$('casePeriod').value=id;$('witnessPeriod').value=id;$('evidence').scrollIntoView({behavior:'smooth'});};
 item.append(num,body,btn);$('periods').append(item);
});
function message(s){$('message').textContent=s;}
function display(){
 const exists=Boolean(caseData);$('witness').disabled=!exists;$('hypothesis').disabled=!exists;$('export').disabled=!exists;
 $('state').textContent=exists?'UNVERIFIED · LOCAL ONLY':'NOT INITIALIZED';
 if(!exists){$('report').textContent='Create a case to begin.';return;}
 const a=audit(caseData);
 $('report').textContent=['CASE '+caseData.id+' / '+periods[caseData.period][0],
 a.witness_count+' witnesses / '+a.hypothesis_count+' manually argued readings',
 ...a.warnings.map((w,i)=>(i+1)+'. '+w),
 'Historical voice certified: NO','Training authorized: NO','Independent expert review: REQUIRED'].join('\n');
}
function run(fn){try{fn()}catch(e){message(e.message)}}
$('create').onclick=()=>run(()=>{caseData=createCase({id:$('caseId').value,period:$('casePeriod').value,text:$('written').value,edition:$('edition').value,dialect:$('dialect').value});display();message('Unverified case in page memory. Cite independent sources before sound claims.');});
$('witness').onclick=()=>run(()=>{addWitness(caseData,{id:$('witnessId').value,kind:$('witnessKind').value,source:$('witnessSource').value,dating:$('witnessDating').value,period:$('witnessPeriod').value,synthetic:$('synthetic').checked,reviewed:$('reviewed').checked});display();message('Witness recorded. Synthetic and unreviewed evidence cannot support IPA.');});
$('hypothesis').onclick=()=>run(()=>{addHypothesis(caseData,{id:$('hypId').value,ipa:$('ipa').value,feature:$('feature').value,witnessIds:$('sourceIds').value.split(',').map(s=>s.trim()).filter(Boolean),argument:$('argument').value,limitations:$('limits').value,claim:caseData.period==='modern'?'modern_attested':'historical_reconstruction'});display();message('Hypothesis entered as unverified, without speech synthesis.');});
$('export').onclick=()=>run(()=>{if(!caseData)throw Error('Create case first');const a=document.createElement('a');const blob=new Blob([JSON.stringify({draft_only:true,...caseData,assessment:audit(caseData)},null,2)],{type:'application/json'});a.href=URL.createObjectURL(blob);a.download='greek-'+caseData.id+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);message('Dossier downloaded locally. Files previously downloaded are not deleted by Reset.');});
$('reset').onclick=()=>{caseData=null;display();message('Local case discarded. Previously exported files are unaffected.');};
$('theme').onclick=()=>{const dark=document.body.dataset.theme!=='dark';document.body.dataset.theme=dark?'dark':'light';$('theme').textContent=dark?'Light mode ◑':'Dark mode ◐';};
display();