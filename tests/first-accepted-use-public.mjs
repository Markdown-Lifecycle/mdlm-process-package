import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

// Component fixture only: normal publication of a disclosed synthetic OPU; no product runtime/use claimed.
// node tests/first-accepted-use-public.mjs KERNEL_ROOT ORIGINAL_WORKSPACE NEW_OUTPUT_ROOT
const [kernel, source, output]=process.argv.slice(2);
assert.ok(kernel&&source&&output,'Expected KERNEL_ROOT ORIGINAL_WORKSPACE NEW_OUTPUT_ROOT');
await fs.mkdir(output);const repo=path.join(output,'accepted');
const cmd=(args,cwd=output)=>{const r=spawnSync(args[0],args.slice(1),{cwd,encoding:'utf8',timeout:45000});assert.equal(r.status,0,r.stdout+r.stderr);return r.stdout;};
cmd(['git','clone','--no-local',source,repo]);cmd(['git','checkout','--detach','d8f4defa930dd3dc890893d7308a07ea94fda782'],repo);
const cli=(...args)=>JSON.parse(cmd([process.execPath,path.join(kernel,'dist/mdlm.js'),...args,'--json'],repo));
const target=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../iterative');
const history=cli('history','ACC-CDE34EEB3DD4');const accepted=cli('show','ACC-CDE34EEB3DD4-r00001');
const before=cli('expectations');assert.equal(before.items.length,0);
const preview=cli('upgrade','preview',target);assert.equal(preview.after.items.length,1);assert.equal(preview.after.items[0].action,'record-first-accepted-use@1');assert.equal(preview.after.items[0].subject,'IMP-3F7807B4FBA6-r00004');assert.equal(preview.after.outcome,'work-available');assert.deepEqual(preview.after.optional,before.optional);
const previewFile=path.join(output,'preview.json');await fs.writeFile(previewFile,JSON.stringify(preview));assert.equal(cli('upgrade','apply',previewFile,'test-first-use-upgrade').outcome,'published');assert.equal(cli('upgrade','settlement','test-first-use-upgrade').outcome,'published');
async function publish(action,subject,operation){const file=path.join(output,operation+'.json');cli('proposal','draft',action,subject,'--operation',operation,'--output',file);const p=JSON.parse(await fs.readFile(file,'utf8'));p.candidates[0].payload={...p.candidates[0].payload,title:'Disclosed component-test account',actor_kind:'scripted',actor:'component fixture (not independent real operator)',occurred_at:'2026-10-05T00:00:00Z',scenario:'Synthetic publication eligibility test; no product session executed',observed_outcome:'inconclusive',evidence_reference:'test-only:no-runtime',assessment:'Tests normal OPU publication/eligibility, not actual operational evidence',limitations:'No product runtime, actual use, acceptance or actor attestation'};p.candidates[0].body='Disclosed synthetic component fixture; not a real use transcript.';await fs.writeFile(file,JSON.stringify(p));return cli('proposal','submit',file);}
await publish('record-operational-use@1','IMP-3F7807B4FBA6-r00003','test-historical-use');assert.equal(cli('expectations').items.length,1,'Historical use cannot satisfy current product duty');
await publish('record-first-accepted-use@1','IMP-3F7807B4FBA6-r00004','test-current-use');const after=cli('expectations');assert.equal(after.items.length,0);assert.equal(after.outcome,'profile-boundary-reached');assert.ok(after.optional.some(i=>i.action==='record-operational-use@1'&&i.subject==='IMP-3F7807B4FBA6-r00004'),'Optional repeat use remains');assert.equal(cli('expectations').items.length,0,'Duty does not recur');assert.deepEqual(cli('history','ACC-CDE34EEB3DD4').history,history.history);assert.deepEqual(cli('show','ACC-CDE34EEB3DD4-r00001').lifecycleDatum,accepted.lifecycleDatum);assert.equal(cli('doctor').ok,true);
console.log(JSON.stringify({ok:true,target:preview.target,requiredBefore:0,requiredAfterUpgrade:1,requiredAfterHistoricalUse:1,requiredAfterCurrentInconclusiveUse:0,historicalAcceptancePreserved:true,productRuntime:false,realOperationalUse:false},null,2));
