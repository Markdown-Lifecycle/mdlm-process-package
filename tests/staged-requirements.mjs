import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// node tests/staged-requirements.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {compileExpressionValue} = await import(path.join(kernel, 'dist/expression.js'));
const {evaluateExpressionValue} = await import(path.join(kernel, 'dist/evaluator.js'));
const loaded = await loadProcessPackage(root);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const pkg = loaded.package, elaborate = pkg.actions['elaborate-requirements'], implement = pkg.actions['implement-product'];
assert.deepEqual(pkg.kernelCapabilities['staged-requirements@1'], {type: 'RQS', action: 'elaborate-requirements'});
assert.equal(elaborate.authority, undefined, 'Elaboration is autonomous; stakeholder refinement keeps its authority');
assert.equal(pkg.actions['refine-requirements'].authority.kind, 'stakeholder');
const datum = (id, links = [], payload = {}, revision = 1) => ({id, type: id.split('-')[0], revision, revision_id: `${id}-r${String(revision).padStart(5, '0')}`, links, payload, created_by: {process_ref: 'fixture@1#exact'}, body: 'Eligibility fixture'});
const link = (type, d) => ({type, target: d.revision_id});
function evaluate(data, value, subject) {
  const snapshot = {processRef: 'fixture@1#exact', dependencyComparisons: [], records: data.map(d => ({datum: d, storage: {editable: false, frozen: true}, integrity: {parseable: true, schema_valid: true, identity_valid: true, references_valid: true, hash_valid: true, transaction_valid: true}}))};
  const compiled = typeof value === 'string' ? compileExpressionValue(value, pkg, subject ? {subject: 'entity'} : {}) : {expression: value, diagnostics: []};
  assert.deepEqual(compiled.diagnostics, []);
  return evaluateExpressionValue(pkg, snapshot, compiled.expression, subject ? {subject: subject.revision_id} : {});
}
const root_ = datum('REQ-root', [], {kind: 'stakeholder'});
const partial = datum('RQS-set', [link('contains', root_)], {publication: 'recorded', trace_complete: false});
const pass = (set, id = 'REV-pass') => datum(id, [link('reviews', set)], {outcome: 'pass'});
const fail = (set) => datum('REV-fail', [link('reviews', set)], {outcome: 'fail'});
assert.equal(evaluate([root_, partial], elaborate.when, partial), false, 'Unreviewed stage');
assert.equal(evaluate([root_, partial, fail(partial)], elaborate.when, partial), false, 'Failed stage is corrected first');
assert.equal(evaluate([root_, partial, pass(partial)], elaborate.when, partial), true, 'Passed stage elaborates');
assert.equal(evaluate([root_, partial, pass(partial)], implement.when, partial), false, 'Partial graph cannot be implemented');
const complete = {...partial, payload: {...partial.payload, trace_complete: true}};
assert.equal(evaluate([root_, complete, pass(complete)], implement.when, complete), true);
assert.equal(evaluate([root_, complete, pass(complete)], elaborate.when, complete), true, 'Deeper elaboration stays optional');
const legacy = {...partial, payload: {publication: 'recorded'}};
assert.equal(evaluate([root_, legacy, pass(legacy)], implement.when, legacy), true, 'Sets without the managed field keep prior eligibility');
const product = datum('IMP-product', [link('implements', complete)]);
assert.equal(evaluate([root_, complete, pass(complete), product], elaborate.when, complete), false, 'Implementation closes elaboration');
const refined = {...partial, revision: 2, revision_id: 'RQS-set-r00002'};
const refinedData = [root_, complete, product, refined, pass(refined, 'REV-refined')];
assert.equal(evaluate(refinedData, elaborate.when, refined), true, 'A partial graph after refinement reopens elaboration');
assert.equal(evaluate(refinedData, pkg.actions['rebind-product'].when, refined), false, 'A partial graph cannot be rebound');
assert.ok(elaborate.priority < implement.priority, 'Implementation ranks first once complete');
console.log(JSON.stringify({ok: true, package: pkg.manifest.version, cases: 11}));
