import test from 'node:test';
import assert from 'node:assert/strict';
import {createAdaptiveTurnDetector} from './adaptive_vad.mjs';

test('ignores isolated spikes without creating a turn',()=>{
 const d=createAdaptiveTurnDetector();
 for(let t=0;t<1000;t+=75)d.feed(.009,t);
 assert.equal(d.feed(.1,1050),null);
 assert.equal(d.feed(.009,1125),null);
 assert.equal(d.snapshot().detectedTurns,0);
});
test('detects two separate voiced turns with a silence boundary',()=>{
 const d=createAdaptiveTurnDetector();
 const events=[];
 for(let t=0;t<8000;t+=75){
  const voiced=(t>=600&&t<1600)||(t>=3500&&t<4600);
  const v=voiced?.05+.015*Math.sin(t/75):.007;
  const out=d.feed(v,t);if(out)events.push(out);
 }
 assert.deepEqual(events,['begin','finish','begin','finish']);
 assert.equal(d.snapshot().detectedTurns,2);
});
test('tracks quiet-but-changing noise without hallucinating turns',()=>{
 const d=createAdaptiveTurnDetector({sensitivity:.025,noiseMultiplier:3});
 for(let t=0;t<8000;t+=75)d.feed(.016+(t%150?.001:0),t);
 assert.equal(d.snapshot().detectedTurns,0);
 assert.ok(d.snapshot().noiseFloor>.012&&d.snapshot().noiseFloor<.019);
 assert.ok(d.snapshot().threshold>=.04);
});
test('does not adapt noise model upward during active speech',()=>{
 const d=createAdaptiveTurnDetector();d.feed(.005,0);
 const n=d.snapshot().noiseFloor;
 for(let t=75;t<800;t+=75)d.feed(.1,t);
 assert.ok(d.snapshot().noiseFloor<=n+1e-8);
 assert.equal(d.snapshot().phase,'active');
});
test('caps maximum spoken segment time',()=>{
 const d=createAdaptiveTurnDetector({minVoiceMs:100,maxTurnMs:1500}),events=[];
 for(let t=0;t<1600;t+=100){const e=d.feed(.1,t);if(e)events.push(e);}
 assert.deepEqual(events,['begin','finish']);
});
test('refuses backwards timing and bad parameters',()=>{
 const d=createAdaptiveTurnDetector();d.feed(.01,100);
 assert.throws(()=>d.feed(.01,99),/Non-monotonic/);
 for(const o of [{noiseMultiplier:Infinity},{releaseRatio:3},{sensitivity:0},{floor:-1}])
   assert.throws(()=>createAdaptiveTurnDetector(o),/Invalid/);
});
test('reset does not silently erase background calibration',()=>{
 const d=createAdaptiveTurnDetector();
 for(let t=0;t<1000;t+=50)d.feed(.02,t);
 const n=d.snapshot().noiseFloor;d.reset();
 assert.equal(d.snapshot().noiseFloor,n);
});
