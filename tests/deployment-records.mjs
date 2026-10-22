import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Deployment records: live deployments block terminal and new deploys; a pass names one deployment. node tests/deployment-records.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {compileExpressionValue} = await import(path.join(kernel, 'dist/expression.js'));
const {evaluateExpressionValue} = await import(path.join(kernel, 'dist/evaluator.js'));
const loaded = await loadProcessPackage(root);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const pkg = loaded.package;
assert.deepEqual(pkg.kernelCapabilities['aws-cdk-deployment@1'], {type: 'DPL', implementation_type: 'IMP', action: 'deploy-product'});
const datum = (id, links = [], payload = {}, revision = 1) => ({id, type: id.split('-')[0], revision, revision_id: `${id}-r${String(revision).padStart(5, '0')}`, links, payload, created_by: {process_ref: 'fixture@1#exact'}, body: 'Deployment fixture'});
const link = (type, d) => ({type, target: d.revision_id});
function holds(data, expression, subject) {
  const snapshot = {processRef: 'fixture@1#exact', dependencyComparisons: [], records: data.map(d => ({datum: d, storage: {editable: false, frozen: true}, integrity: {parseable: true, schema_valid: true, identity_valid: true, references_valid: true, hash_valid: true, transaction_valid: true}}))};
  const compiled = compileExpressionValue(expression, pkg, {subject: 'entity'});
  assert.deepEqual(compiled.diagnostics, []);
  return evaluateExpressionValue(pkg, snapshot, compiled.expression, {subject: subject.revision_id});
}
const product = datum('IMP-product');
const dpl1 = datum('DPL-one', [link('deploys', product)], {outcome: 'pass'}), dpl2 = datum('DPL-two', [link('deploys', product)], {outcome: 'error'});
const torn = datum('TDN-one', [link('tears-down', dpl1)], {outcome: 'pass'}), failedTeardown = datum('TDN-two', [link('tears-down', dpl1)], {outcome: 'error'});
const local = datum('VFY-local'), onOne = datum('VFY-a', [link('verified-against', dpl1)]), alsoOne = datum('VFY-b', [link('verified-against', dpl1)]), onTwo = datum('VFY-b', [link('verified-against', dpl2)], {}, 2);
const selecting = (...activities) => datum('IMP-product', activities.map(a => link('verification', a)), {}, 2);

const live = 'exists("live-deployments@1", {})';
assert.equal(holds([product], live, product), false);
assert.equal(holds([product, dpl1], live, product), true, 'An untorn deployment is live');
assert.equal(holds([product, dpl1, failedTeardown], live, product), true, 'A failed teardown leaves it live');
assert.equal(holds([product, dpl1, torn], live, product), false, 'A passing teardown ends it');
assert.equal(holds([product, dpl1, torn, dpl2], live, product), true, 'An error deployment still needs a teardown');

const one = selecting(local, onOne, alsoOne), mixed = selecting(local, onOne, onTwo);
const unmixed = 'none("mixed-deployment-activities@1", {product: subject})';
assert.equal(holds([product, dpl1, dpl2, local, onOne, alsoOne, one], unmixed, one), true, 'Local and same-deployment activities form one pass');
assert.equal(holds([product, dpl1, dpl2, local, onOne, onTwo, mixed], unmixed, mixed), false, 'Two deployments in one pass are refused');

for (const id of ['review-implementation', 'accept-product']) assert.ok(pkg.actions[id].when.source.includes('mixed-deployment-activities@1'), `${id} must refuse a pass that names two deployments`);
assert.ok(pkg.actions['deploy-product'].when.source.includes('live-deployments@1'), 'A live deployment blocks the next one');
assert.notEqual(pkg.actions['teardown-deployment'].optional, true, 'Teardown is an Expectation, not optional work');
assert.ok(pkg.manifest.terminal.when.startsWith('none("live-deployments@1", {}) && '), 'No terminal state while a deployment is live');
assert.deepEqual(pkg.types.TDN.kernel_managed_payload_paths, ['outcome', 'receipt'], 'Only the kernel can record a teardown outcome');
const {resolvePrompt} = await import(path.join(kernel, 'dist/direct-prompt.js'));
const {parseDeploymentConfig} = await import(path.join(kernel, 'dist/aws-cdk-deployment.js'));
assert.match(parseDeploymentConfig(pkg.actions['deploy-product'].fixed_payload.DPL).synth_image, /^mdlm-cdk-synth@sha256:(?!0{64})[a-f0-9]{64}$/, 'The demo synth image is pinned');
for (const id of ['implement-product', 'plan-verification', 'deploy-product']) {
  const {prompt} = await resolvePrompt(pkg, pkg.actions[id].prompt_ref);
  const skill = prompt?.skills.find(s => s.reference.startsWith('skills/aws-deployment.md@'));
  assert.ok(skill?.content.includes('CliCredentialsStackSynthesizer') && skill.content.includes('MDLM_RUN_ID') && skill.content.includes('product_paths'), `${id} must load the aws-deployment skill`);
}
assert.ok(pkg.types.VFY.payload_schema.properties.product_paths, 'VFY may declare product_paths');
console.log('deployment records: ok');
