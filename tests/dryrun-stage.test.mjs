import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
for(const [mode,status,expected] of [
 ['pass',0,'PUBLISH OK (dry run)'],
 ['invalid-source',1,'source gate failed'],
 ['invalid-built',1,'built-page gate failed']
]) test(`isolated fixture ${mode}: original trees unchanged and sandbox removed`,{timeout:240000},()=>{
 const r=spawnSync('node',['scripts/dryrun-stage.mjs','--fixture','--case',mode],{encoding:'utf8',timeout:225000});
 const out=(r.stdout??'')+(r.stderr??'');
 assert.equal(r.status,status,out);
 assert.ok(out.includes(expected),out);
 assert.ok(out.includes('PROTECTED TREES UNCHANGED sha256='),out);
 assert.ok(out.includes('sandbox removed=true'),out);
 assert.ok(out.includes('SANDBOX DEPLOYMENT DENIED even with -AllowDeploy'),out);
 if(status===0)assert.ok(out.includes('ISOLATED RECEIPT'),out);
 else assert.ok(!out.includes('ISOLATED RECEIPT'),out);
});
test('fixture traversal rejected before creating staging',()=>{
 const r=spawnSync('node',['scripts/dryrun-stage.mjs','--fixture','--slug','../oops'],{encoding:'utf8'});
 assert.notEqual(r.status,0);assert.match(r.stderr,/invalid rehearsal arguments/);
});
