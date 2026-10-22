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
  assert.ok(context.prompt.skills.some(skill => skill.reference.startsWith('skills/design-criteria.md@') && skill.content.includes('Simplest mechanism')), `${id} must export the design-criteria skill`);
  assert.ok(policy.content.includes('Finding ledger') && policy.content.includes('Stopped with findings, informal verdict') && policy.content.includes('t3_thread_send'), `${id} must export the ledger, checkpoint and stopped state`);
  if (id === 'review-implementation') assert.ok(context.prompt.skills.some(skill => skill.reference.startsWith('skills/endgame.md@') && skill.content.includes('One for-credit pass') && skill.content.includes('Sweep a repeating class') && skill.content.includes('proportionality floor')), 'Implementation review must export the endgame skill');
  if (id === 'review-verification') assert.ok(context.prompt.skills.some(skill => skill.reference.startsWith('skills/verification-checks.md@') && skill.content.includes('Dry run') && skill.content.includes('Screen truth') && skill.content.includes('Proportionality')), 'Adequacy review must export the verification-checks skill');
}
console.log(JSON.stringify({ok: true, loadedBy}, null, 2));
