import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync, mkdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

// Ordinary disposable Git clone only; preserves the fixture on success or failure.
// node tests/continue-exploration-public.mjs CLI_JS CLONE TARGET_PACKAGE EVIDENCE_DIR
const [cli, fixture, target, evidence] = process.argv.slice(2);
if (!evidence) throw new Error('Expected CLI_JS CLONE TARGET_PACKAGE EVIDENCE_DIR');
mkdirSync(evidence, {recursive: true});
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
process.on('uncaughtException', error => {
  writeFileSync(path.join(evidence, 'OUTCOME.json'), JSON.stringify({ok: false, error: error.stack, fixturePreserved: fixture}, null, 2));
  console.error(error); process.exit(1);
});
let sequence = 0;
function run(name, argv, expectedExit = 0) {
  const r = spawnSync(argv[0], argv.slice(1), {cwd: fixture, timeout: 60000});
  const prefix = path.join(evidence, `${String(++sequence).padStart(2, '0')}-${name}`);
  writeFileSync(`${prefix}.stdout`, r.stdout ?? ''); writeFileSync(`${prefix}.stderr`, r.stderr ?? '');
  writeFileSync(`${prefix}.terminal.json`, JSON.stringify({argv, cwd: fixture, exitCode: r.status, signal: r.signal, error: r.error?.message}, null, 2));
  assert.equal(r.status, expectedExit, `${name}: ${r.stderr}`);
  return {stdout: r.stdout.toString(), prefix};
}
const native = (name, args, exit = 0) => {
  const r = run(name, [process.execPath, cli, ...args, '--json'], exit);
  return {...r, value: JSON.parse(r.stdout)};
};
const baseline = run('baseline-files', ['git', 'ls-files', '--stage', '-z']).stdout.split('\0').filter(Boolean).map(line => {
  const [metadata, name] = line.split('\t'), [gitMode, blob] = metadata.split(' '), bytes = readFileSync(path.join(fixture, name));
  return {name, gitMode, blob, mode: statSync(path.join(fixture, name)).mode & 0o777, sha256: sha(bytes)};
});
writeFileSync(path.join(evidence, 'baseline-files.json'), JSON.stringify(baseline, null, 2));
const originalHead = run('baseline-head', ['git', 'rev-parse', 'HEAD']).stdout.trim();
assert.equal(run('baseline-clean', ['git', 'status', '--porcelain']).stdout, '');
const before = native('before', ['expectations']).value;
assert.equal(before.outcome, 'profile-boundary-reached');
assert.equal(before.optional.some(x => x.action.startsWith('continue-exploration@')), false);
const preview = native('preview', ['upgrade', 'preview', target]);
assert.equal(preview.value.ok, true);
const operation = `continue-upgrade-${path.basename(evidence)}`;
const applied = native('apply', ['upgrade', 'apply', `${preview.prefix}.stdout`, operation]).value;
assert.equal(applied.outcome, 'published');
const settled = native('settlement', ['upgrade', 'settlement', operation]).value;
assert.equal(settled.receipt, applied.receipt);
const after = native('after-upgrade', ['expectations']).value;
assert.equal(after.outcome, before.outcome);
assert.equal(after.items.length, 0);
const choice = after.optional.find(x => x.action.startsWith('continue-exploration@'));
assert.ok(choice);
const guidance = native('guidance', ['expectations', 'show', choice.action, choice.subject]).value;
assert.deepEqual(guidance.inputs.experiment, [choice.subject]);
assert.ok(guidance.inputs.observations.length && guidance.inputs.trials.length);
const c = structuredClone(guidance.candidates[0]);
Object.assign(c.payload, {title: 'Next integrated prototype slice fixture', criterion: 'The operator can distinguish complete aggregates from known subtotals in the next provisional slice.', question: 'Can the operator understand aggregate completeness?', approach: 'Extend the preserved browser desk provisionally.', constraints: 'Preserve earlier one-meter behavior and evidence; this fixture publishes criteria only.', allowance_minutes: 30, scope_cut: 'Begin with fixed included meters before convenience navigation.'});
c.body = 'Public route fixture. Earlier kept observations remain exact history. New criteria require independent verification; no source, method, result or acceptance is authored here.';
const proposal = {operation: `continue-proposal-${path.basename(evidence)}`, action: guidance.action, package: guidance.package, snapshot: guidance.snapshot, subject: guidance.subject, inputs: guidance.inputs, candidates: [c]};
const proposalPath = path.join(evidence, 'proposal.json');writeFileSync(proposalPath, JSON.stringify(proposal, null, 2));
const submitted = native('submit', ['proposal', 'submit', proposalPath]).value;
assert.equal(submitted.outcome, 'accepted');
const published = native('proposal-settlement', ['proposal', 'settlement', proposal.operation]).value;
assert.equal(published.transaction, submitted.transaction);
const successor = submitted.revisions[0];
assert.equal(successor, `${choice.subject.slice(0, -5)}00002`);
const inspected = native('successor', ['show', successor]).value;
assert.equal(inspected.lifecycleDatum.datum.id, choice.subject.split('-r')[0]);
assert.equal(inspected.lifecycleDatum.integrity.transaction_valid, true);
const work = native('successor-expectations', ['expectations']).value;
assert.notEqual(work.outcome, 'profile-boundary-reached');
assert.ok(work.items.some(x => x.action.startsWith('prepare-prototype@') && x.subject === successor));
assert.ok(work.optional.some(x => x.action.startsWith('draft-requirements@')));
assert.equal([...work.items, ...work.optional].some(x => x.action.startsWith('continue-exploration@')), false);
const stale = {...proposal, operation: `${proposal.operation}-stale`};
const stalePath = path.join(evidence, 'stale-proposal.json');writeFileSync(stalePath, JSON.stringify(stale, null, 2));
const rejected = native('stale-submit', ['proposal', 'submit', stalePath], 1).value;
assert.equal(rejected.ok, false);
assert.ok(rejected.diagnostics.some(d => /snapshot|stale|eligible/i.test(d.message)), 'Reject the stale guidance');
const finalWork = native('after-stale', ['expectations']).value;
assert.equal(finalWork.snapshot, work.snapshot, 'Rejected stale proposal publishes nothing');
const diagnosis = native('doctor', ['doctor']).value;
assert.equal(diagnosis.ok, true);
assert.equal([...finalWork.items, ...finalWork.optional].some(x => x.action.startsWith('execute-criterion-verification@') && x.subject === successor), false, 'No old verification result satisfies successor');
for (const row of baseline.filter(x => x.name !== '.lifecycle/process-selection.json')) {
  assert.equal(sha(readFileSync(path.join(fixture, row.name))), row.sha256, row.name);
  assert.equal(statSync(path.join(fixture, row.name)).mode & 0o777, row.mode, row.name);
}
assert.equal(run('unchanged-head', ['git', 'rev-parse', 'HEAD']).stdout.trim(), originalHead);
const outcome = {ok: true, originalHead, beforePackage: before.package, afterPackage: after.package, successor, preservedFiles: baseline.length - 1, historicalVerificationTransferred: false, fixturePreserved: fixture};
writeFileSync(path.join(evidence, 'OUTCOME.json'), JSON.stringify(outcome, null, 2));
console.log(JSON.stringify(outcome));
