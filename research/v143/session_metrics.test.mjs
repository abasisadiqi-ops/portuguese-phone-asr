import test from 'node:test';
import assert from 'node:assert/strict';
import {createSessionMetrics} from './session_metrics.mjs';

test('timings accumulate only from monotonic foreground transitions',()=>{
 let t=0;const m=createSessionMetrics({now:()=>t});
 t=100;m.transition('listening');t=300;m.transition('capturing');
 t=1300;m.transition('processing');t=1600;m.transition('listening');
 t=1800;m.transition('muted');t=2200;
 const s=m.snapshot();
 assert.deepEqual(s.durations_ms,{off:100,listening:400,capturing:1000,processing:300,muted:400});
 assert.equal(s.transitions,5);assert.equal(s.state,'muted');
});
test('snapshot exposes only aggregate counters and never voice content',()=>{
 let t=1;const m=createSessionMetrics({now:()=>t});
 m.count('completed');m.count('failed');
 t+=5;m.transition('listening');
 const s=m.snapshot();
 assert.equal(s.completed_audio_turns,1);assert.equal(s.failed_audio_turns,1);
 assert.equal(s.stores_audio,false);assert.equal(s.stores_transcript,false);
 assert.equal(s.study_minutes,0);assert.equal(s.voice_accuracy_attested,false);
 assert.equal(s.storage,'ephemeral_only');
 assert.deepEqual(Object.keys(s).filter(k=>/^(text|audio_blob|transcript|speaker|location|timestamp)$/.test(k)),[]);
 assert.ok(Object.isFrozen(s));assert.ok(Object.isFrozen(s.durations_ms));
});
test('metric guard rejects invalid state, counter and time reversal',()=>{
 let t=100;const m=createSessionMetrics({now:()=>t});
 assert.throws(()=>m.transition('record_audio_forever'),/Unknown microphone state/);
 assert.throws(()=>m.count('say-whisper-transcript'),/Unknown/);
 t=90;assert.throws(()=>m.snapshot(),/Non-monotonic/);
});
test('each state is counted only on change, not status refresh',()=>{
 let t=0;const m=createSessionMetrics({now:()=>t});
 t=50;m.transition('listening');t=60;m.transition('listening');
 assert.equal(m.snapshot().transitions,1);
 t=70;m.transition('off');assert.equal(m.snapshot().durations_ms.listening,20);
});
