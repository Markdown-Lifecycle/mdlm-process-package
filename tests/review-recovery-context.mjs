import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Read-only normative context regression. node tests/review-recovery-context.mjs KERNEL_ROOT [PACKAGE_ROOT]
const [kernel, target = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative')] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT [PACKAGE_ROOT]');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {buildDirectReviewContext} = await import(path.join(kernel, 'dist/direct-review-context.js'));
const loaded = await loadProcessPackage(target);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const context = action => buildDirectReviewContext({root: target, pkg: loaded.package, package: {reference: 'read-only-fixture', digest: 'read-only-fixture', language: 'mdlm-expression@1'}, snapshot: 'read-only-fixture', action, inputs: {}, data: []});
const recovery = await context(loaded.package.actions['correct-requirements-review']);
const ordinary = await context(loaded.package.actions['review-requirements']);
const references = result => result.prompt.skills.map(skill => skill.reference);
assert.deepEqual(references(recovery), references(ordinary), 'Recovery context must include the ordinary requirements-review normative standards');
assert.ok(references(recovery).some(ref => ref.startsWith('skills/product-quality.md@')), 'Recovery needs product-quality standards');
assert.ok(references(recovery).some(ref => ref.startsWith('skills/typed-requirements.md@')), 'Recovery needs typed-requirements standards');
assert.ok(recovery.prompt.skills.every(skill => skill.content.trim()), 'Exported normative skills must include their actual content');
console.log(JSON.stringify({ok: true, action: `${recovery.action.id}@${recovery.action.version}`, prompt: recovery.prompt.reference, skills: references(recovery)}, null, 2));
