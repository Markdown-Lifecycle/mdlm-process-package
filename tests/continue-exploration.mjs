import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// node tests/continue-exploration.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {compileExpressionValue} = await import(path.join(kernel, 'dist/expression.js'));
const {evaluateExpressionValue} = await import(path.join(kernel, 'dist/evaluator.js'));
const loaded = await loadProcessPackage(root);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const pkg = loaded.package, action = pkg.actions['continue-exploration'];
assert.ok(action, 'Closed keep needs an optional pre-formal continuation route');
const datum = (id, links = [], payload = {}, revision = 1) => ({id, type: id.split('-')[0], revision, revision_id: `${id}-r${String(revision).padStart(5, '0')}`, links, payload, created_by: {process_ref: 'fixture@1#exact'}, body: 'Eligibility fixture'});
const link = (type, d) => ({type, target: d.revision_id});
function fixture(recommendation, feedback) {
  const exp = datum('EXP-brief'), trial = datum('TRY-first', [link('explores', exp)]);
  const obs = datum('OBS-first', [link('observes', trial), link('against', exp)], {recommendation});
  const data = [exp, trial, obs];
  if (feedback) data.push(datum('FDB-first', [link('responds-to', obs)], {action: feedback}));
  return {exp, trial, obs, data};
}
function evaluate(data, value, subject) {
  const snapshot = {processRef: 'fixture@1#exact', dependencyComparisons: [], records: data.map(d => ({datum: d, storage: {editable: false, frozen: true}, integrity: {parseable: true, schema_valid: true, identity_valid: true, references_valid: true, hash_valid: true, transaction_valid: true}}))};
  const compiled = typeof value === 'string' ? compileExpressionValue(value, pkg, subject ? {subject: 'entity'} : {}) : {expression: value, diagnostics: []};
  assert.deepEqual(compiled.diagnostics, []);
  return evaluateExpressionValue(pkg, snapshot, compiled.expression, subject ? {subject: subject.revision_id} : {});
}
for (const [recommendation, feedback, eligible] of [['keep', undefined, true], ['drop', undefined, true], ['nominate', 'stop', true], ['revise', 'stop', true], ['nominate', undefined, false], ['revise', undefined, false], ['nominate', 'revise-criteria', false]]) {
  const f = fixture(recommendation, feedback);
  assert.equal(evaluate(f.data, action.when, f.exp), eligible, `${recommendation}/${feedback}`);
}
const f = fixture('keep');
assert.equal(evaluate([f.exp], action.when, f.exp), false, 'Untried');
assert.equal(evaluate([f.exp, f.trial], action.when, f.exp), false, 'Missing observation');
assert.equal(evaluate([...f.data, datum('RQS-formal')], action.when, f.exp), false, 'Formal scope');
const other = datum('TRY-open', [link('explores', f.exp)]);
assert.equal(evaluate([...f.data, other], action.when, f.exp), false, 'Another unresolved trial');
assert.deepEqual(evaluate(f.data, action.inputs.observations, f.exp).map(d => d.identity.revision_id), [f.obs.revision_id]);
const next = datum(f.exp.id, [], {}, 2), data = [...f.data, next];
assert.deepEqual(evaluate(data, action.subjects).map(d => d.identity.revision_id), [next.revision_id]);
assert.equal(evaluate(data, action.when, next), false, 'Continuation consumed until next closure');
assert.equal(evaluate(data, pkg.actions['prepare-prototype'].when, next), true);
assert.equal(evaluate(data, pkg.manifest.terminal.when), false);
assert.equal(evaluate(data, pkg.actions['draft-requirements'].when), true);
assert.equal(action.optional, true);
assert.equal(action.revises.EXP, 'experiment');
console.log(JSON.stringify({ok: true, package: pkg.manifest.version, cases: 14, successor: next.revision_id}));
