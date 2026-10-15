import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// node tests/interface-retargets.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {compileExpressionValue} = await import(path.join(kernel, 'dist/expression.js'));
const {evaluateExpressionValue} = await import(path.join(kernel, 'dist/evaluator.js'));
const loaded = await loadProcessPackage(root);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const pkg = loaded.package;
const datum = (id, links = [], payload = {}, revision = 1) => ({id, type: id.split('-')[0], revision, revision_id: `${id}-r${String(revision).padStart(5, '0')}`, links, payload, created_by: {process_ref: 'fixture@1#exact'}, body: 'Retarget fixture'});
const link = (type, d) => ({type, target: d.revision_id});
function holds(data, expression, set) {
  const snapshot = {processRef: 'fixture@1#exact', dependencyComparisons: [], records: data.map(d => ({datum: d, storage: {editable: false, frozen: true}, integrity: {parseable: true, schema_valid: true, identity_valid: true, references_valid: true, hash_valid: true, transaction_valid: true}}))};
  const compiled = compileExpressionValue(expression, pkg, {subject: 'entity'});
  assert.deepEqual(compiled.diagnostics, []);
  return evaluateExpressionValue(pkg, snapshot, compiled.expression, {subject: set.revision_id});
}
const selects = (selector, d) => `!every("${selector}", {requirements: subject}, item => item.identity.revision_id != "${d.revision_id}")`;
const icd1 = datum('ICD-feed'), icd2 = datum('ICD-feed', [], {}, 2);
const req = datum('REQ-need', [link('uses-interface', icd1)], {kind: 'stakeholder'});
const accepted = datum('RQS-set', [link('contains', req)]);
const product = datum('IMP-product', [link('implements', accepted)]);
const acceptance = datum('ACC-first', [link('confirms', accepted), link('accepts', product)], {decision: 'accept'});
const change = datum('CHG-first', [link('baseline', acceptance), link('changes', req)]);
const reviews = [datum('REV-set', [link('reviews', accepted)], {outcome: 'pass'}), datum('REV-change', [link('reviews', change)], {outcome: 'pass'})];
const same = datum('RQS-set', [link('contains', req), link('changes-under', change)], {}, 2);
const retargeted = datum('RQS-set', [link('contains', req), link('changes-under', change), link('retargets-interface', icd2)], {}, 2);
const base = [icd1, icd2, req, accepted, product, acceptance, change, ...reviews];

assert.equal(holds([...base, retargeted], `${selects('selected-interfaces@2', icd1)} && ${selects('selected-interfaces@2', icd2)}`, retargeted), true, 'Review sees both the bound and the retargeted revision');
assert.equal(holds([...base, same], selects('selected-interfaces@2', icd2), same), false);
assert.equal(holds([...base, same], selects('reusable-requirements-review@2', accepted), same), true, 'An unchanged graph reuses its review');
assert.equal(holds([...base, retargeted], 'exists("reusable-requirements-review@2", {requirements: subject})', retargeted), false, 'A retarget needs fresh requirements review');
console.log('interface retargets: ok');
