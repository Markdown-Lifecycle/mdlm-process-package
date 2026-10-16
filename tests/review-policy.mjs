import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Every review type receives the shared severity and stop policy. node tests/review-policy.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, target = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {buildDirectReviewContext} = await import(path.join(kernel, 'dist/direct-review-context.js'));
const loaded = await loadProcessPackage(target);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const reviews = ['review-requirements', 'review-verification', 'review-implementation'];
const loadedBy = {};
for (const id of reviews) {
  const context = await buildDirectReviewContext({root: target, pkg: loaded.package, package: {reference: 'read-only-fixture', digest: 'read-only-fixture', language: 'mdlm-expression@1'}, snapshot: 'read-only-fixture', action: loaded.package.actions[id], inputs: {}, data: []});
  const policy = context.prompt.skills.find(skill => skill.reference.startsWith('skills/review-policy.md@'));
  assert.ok(policy?.content.includes('Verification adequacy review'), `${id} must export the review-policy skill content`);
  loadedBy[id] = policy.reference;
}
console.log(JSON.stringify({ok: true, loadedBy}, null, 2));
