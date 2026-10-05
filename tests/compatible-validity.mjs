import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Read-only package/evaluator regression against an authenticated disposable fixture.
// node tests/compatible-validity.mjs KERNEL_ROOT FIXTURE_ROOT [TARGET_ROOT]
const [kernel, fixture, target = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel || !fixture) throw new Error('Expected KERNEL_ROOT FIXTURE_ROOT [TARGET_ROOT]');
const { loadProcessPackage } = await import(path.join(kernel, 'dist/index.js'));
const { readRepositoryData } = await import(path.join(kernel, 'dist/lifecycle-repository.js'));
const { directExpectations } = await import(path.join(kernel, 'dist/direct-proposal.js'));
const { packageSummary } = await import(path.join(kernel, 'dist/repository-contract.js'));
const { evaluateProcessDefinition } = await import(path.join(kernel, 'dist/evaluator.js'));
const baseline = path.join(fixture, '.lifecycle/packages/mdlm-iterative@2.5.23');
async function current(root) {
  const loaded = await loadProcessPackage(root);
  assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
  const parsed = await readRepositoryData(fixture, loaded.package);
  assert.equal(parsed.ok, true, JSON.stringify(parsed.diagnostics));
  const summary = await packageSummary(loaded.package, root);
  return {root: fixture, pkg: loaded.package, package: {reference: summary.reference, digest: summary.digest, language: summary.language}, snapshot: 'read-only-fixture', data: parsed.value.map(p => p.lifecycleDatum.datum), parsed: parsed.value};
}
function visible(result) { const {package: _, snapshot: __, ...rest} = result; return rest; }
const before = await current(baseline), after = await current(target);
const beforeResult = directExpectations(before), afterResult = directExpectations(after);
assert.ok(beforeResult.optional.length > 0, 'Fixture must exercise accepted formal optional work');
assert.deepEqual(visible(afterResult), visible(beforeResult), 'Complete required/optional actions, exact subjects, inputs and outcome must survive');
assert.equal(JSON.stringify(after.data), JSON.stringify(before.data), 'Historical datum bytes must remain unchanged');
const selection = after.parsed.find(p => p.lifecycleDatum.datum.type === 'RQS');
assert.ok(selection, 'Need an authenticated historical requirements selection');
const id = selection.lifecycleDatum.datum.revision_id;
const snapshot = {processRef: `${after.package.reference}#${after.package.digest}`, records: after.parsed.map(p => p.lifecycleDatum), dependencyComparisons: []};
const valid = evaluateProcessDefinition(after.pkg, snapshot, 'state', `validity@${after.pkg.states.validity.version}`,  {subject: id});
assert.equal(valid.result, 'valid', JSON.stringify(valid));
const broken = structuredClone(snapshot);
const record = broken.records.find(r => r.datum.revision_id === id);
record.integrity.transaction_valid = false;
const invalid = evaluateProcessDefinition(after.pkg, broken, 'state', `validity@${after.pkg.states.validity.version}`,  {subject: id});
assert.equal(invalid.result, 'invalid', JSON.stringify(invalid));
console.log(JSON.stringify({ok: true, datums: after.data.length, before: beforeResult, after: afterResult, authenticatedState: valid, unauthenticatedState: invalid}, null, 2));
