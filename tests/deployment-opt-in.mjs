import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Deployment is opt-in: without a deployment target, common prompts carry no AWS text and no deployment work is offered.
// node tests/deployment-opt-in.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {resolvePrompt} = await import(path.join(kernel, 'dist/direct-prompt.js'));
const {buildDirectReviewContext} = await import(path.join(kernel, 'dist/direct-review-context.js'));
const {compileExpressionValue} = await import(path.join(kernel, 'dist/expression.js'));
const {evaluateExpressionValue} = await import(path.join(kernel, 'dist/evaluator.js'));
const loaded = await loadProcessPackage(root);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const pkg = loaded.package;

// 1. A product that does not deploy sees no AWS or deployment text.
const deploymentText = /\bAWS\b|\bCDK\b|\bAPM\b|\bDPL\b|\bDTG\b|deployment target|teardown|tear (it )?down|deploy-product|verified-against|aws-deployment|MDLM_ENDPOINT|stack slot/i;
const exported = {};
for (const id of ['implement-product', 'plan-verification']) {
  const {prompt} = await resolvePrompt(pkg, pkg.actions[id].prompt_ref);
  exported[id] = [prompt, ...prompt.skills];
}
const review = await buildDirectReviewContext({root, pkg, package: {reference: 'read-only-fixture', digest: 'read-only-fixture', language: 'mdlm-expression@1'}, snapshot: 'read-only-fixture', action: pkg.actions['review-implementation'], inputs: {}, data: []});
exported['review-implementation'] = [review.prompt, ...review.prompt.skills];
for (const [id, assets] of Object.entries(exported)) for (const asset of assets) {
  const match = deploymentText.exec(asset.content);
  assert.equal(match, null, `${id} exports deployment text in ${asset.reference}: ${match?.[0]}`);
}

// 2. Deployment actions are offered only after the stakeholder records a deployment target.
const datum = (id, links = [], payload = {}, revision = 1) => ({id, type: id.split('-')[0], revision, revision_id: `${id}-r${String(revision).padStart(5, '0')}`, links, payload, created_by: {process_ref: 'fixture@1#exact'}, body: 'Opt-in fixture'});
const link = (type, d) => ({type, target: d.revision_id});
function eligible(data, action, subject) {
  const snapshot = {processRef: 'fixture@1#exact', dependencyComparisons: [], records: data.map(d => ({datum: d, storage: {editable: false, frozen: true}, integrity: {parseable: true, schema_valid: true, identity_valid: true, references_valid: true, hash_valid: true, transaction_valid: true}}))};
  const compiled = compileExpressionValue(pkg.actions[action].when.source, pkg, {subject: 'entity'});
  assert.deepEqual(compiled.diagnostics, []);
  return evaluateExpressionValue(pkg, snapshot, compiled.expression, {subject: subject.revision_id});
}
const requirements = datum('RQS-set'), product = datum('IMP-product', [link('implements', requirements)]);
const target = datum('DTG-aws', [link('targets', requirements)]);
const deployment = datum('DPL-one', [link('deploys', product)], {outcome: 'pass', target: target.revision_id});
const optIn = ['deploy-product', ...['prepare-deployment', 'plan-deployment-verification'].filter(id => pkg.actions[id])];
for (const id of optIn) {
  assert.equal(eligible([requirements, product], id, id === 'plan-deployment-verification' ? datum('VFY-a') : product), false, `${id} is not offered without a deployment target`);
}
assert.equal(eligible([requirements, product], 'choose-deployment-target', requirements), true, 'The opt-in itself is available');
assert.equal(pkg.actions['choose-deployment-target'].optional, true, 'Opting in is never required');
assert.equal(pkg.actions['choose-deployment-target'].authority?.kind, 'stakeholder', 'Only the stakeholder opts in');
assert.equal(eligible([requirements, product, target], 'choose-deployment-target', requirements), false, 'One target per product');
assert.equal(eligible([requirements, product, target], 'deploy-product', product), true, 'A target offers deployment');
assert.equal(eligible([requirements, product, target, deployment], 'deploy-product', product), false, 'A live deployment blocks the next one');
assert.ok(pkg.actions['teardown-deployment'].subjects.source.includes('live-deployments@1') && pkg.actions['teardown-deployment'].optional !== true, 'Teardown is required for every live deployment');
console.log('deployment opt-in: ok');
