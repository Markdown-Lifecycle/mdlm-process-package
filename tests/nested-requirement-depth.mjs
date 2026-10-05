import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Read-only component check: node tests/nested-requirement-depth.mjs KERNEL_ROOT
const [kernel] = process.argv.slice(2);
if (!kernel) throw new Error('Expected KERNEL_ROOT');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../iterative');
const {loadProcessPackage} = await import(path.join(kernel, 'dist/index.js'));
const {buildDirectReviewContext} = await import(path.join(kernel, 'dist/direct-review-context.js'));
const {requirementTraceBinding, selectedRequirementGraph} = await import(path.join(kernel, 'dist/requirement-trace.js'));
const loaded = await loadProcessPackage(root);
assert.equal(loaded.ok, true, JSON.stringify(loaded.diagnostics));
const binding = requirementTraceBinding(loaded.package);
// Contributions illustrate depth, not a complete workshop requirements verdict.
const rows = [
  ['need', 'stakeholder', undefined, undefined, 'Staff need reliable equipment availability'],
  ['product', 'software', 'system', undefined, 'The product returns truthful reservation outcomes across browser and service'],
  ['lifecycle', 'software', 'system', undefined, 'The reservation subsystem keeps authoritative availability consistent across API and worker'],
  ['allocated-api', 'software', 'system', undefined, 'On conforming expiration interaction the API releases authoritative state of an overdue hold'],
  ['api', 'software', 'high-level', 'reservation-api', 'The reservation software item expires active overdue holds and leaves future or non-active holds unchanged'],
  ['internal-decision', 'software', 'high-level', 'reservation-decision', 'The decision part resolves expiry eligibility against the item state defined by its exact internal contract'],
  ['transition', 'software', 'low-level', 'reservation-decision', 'The decision part compares the recorded deadline with the interaction time before changing active state'],
  ['decision', 'software', 'low-level', 'reservation-decision', 'The decision part evaluates and applies expiry using the latest committed item state in its serialized decision order']
];
const requirements = rows.map(([id, kind, level, component, obligation]) => ({id, revision: 1, revision_id: `${id}-r00001`, type: 'REQ', links: [], payload: {rationale: id === 'allocated-api' ? 'System allocation: API element; authoritative reservation state contribution. Software scope is recorded on later refinements, not allocation metadata.' : id === 'internal-decision' ? 'Internal decision scope of reservation-api, justified by its state-decision contract; this explanatory fixture supplies no semantic review verdict.' : 'Illustrative contribution only; not a complete accepted parent decomposition.', kind, ...(level && {level}), ...(component && {component}), ...(kind === 'stakeholder' ? {statement: obligation} : {ears: {pattern: 'ubiquitous', system: 'Reservation product', response: obligation}})}}));
const groups = requirements.slice(1).map((child, i) => ({id: `group-${i}`, revision: 1, revision_id: `group-${i}-r00001`, type: 'DCP', payload: {}, links: [{type: 'parent', target: requirements[i].revision_id}, {type: 'child', target: child.revision_id}]}));
const set = {id: 'set', revision: 1, revision_id: 'set-r00001', type: 'RQS', payload: {}, links: [...requirements.map(r => ({type: 'contains', target: r.revision_id})), ...groups.map(g => ({type: 'decomposition', target: g.revision_id}))]};
const graph = selectedRequirementGraph([...requirements, ...groups, set], set, binding);
assert.deepEqual(graph.diagnostics, []);
assert.deepEqual([...graph.leaves], ['decision-r00001']);
assert.deepEqual(graph.parents.get('lifecycle-r00001'), ['product-r00001']);
assert.deepEqual(graph.parents.get('decision-r00001'), ['transition-r00001']);
assert.deepEqual(graph.parents.get('allocated-api-r00001'), ['lifecycle-r00001']);
assert.deepEqual(graph.parents.get('internal-decision-r00001'), ['api-r00001']);
assert.equal(requirements.find(r => r.id === 'allocated-api').payload.component, undefined);
const context = async id => buildDirectReviewContext({root, pkg: loaded.package, package: {reference: 'component-fixture', digest: 'component-fixture', language: 'mdlm-expression@1'}, snapshot: 'component-fixture', action: loaded.package.actions[id], inputs: {}, data: []});
const contexts = await Promise.all(['draft-requirements', 'review-requirements', 'correct-requirements-review'].map(context));
for (const result of contexts) {
  const skill = result.prompt.skills.find(s => s.reference === 'skills/typed-requirements.md@21');
  assert.ok(skill?.content, 'Author, ordinary and recovery reviewers resolve the new full normative skill');
}
assert.equal(contexts[0].prompt.skills.find(s => s.reference.endsWith('typed-requirements.md@21')).content, contexts[1].prompt.skills.find(s => s.reference.endsWith('typed-requirements.md@21')).content);
console.log(JSON.stringify({ok: true, graph: {requirements: requirements.length, groups: groups.length, leaves: [...graph.leaves]}, skills: contexts.map(c => ({action: c.action.id, prompt: c.prompt.reference, skills: c.prompt.skills.map(s => s.reference)})), limits: 'Structural graph/context check only; no native publication, independent semantic verdict, installed upgrade or runtime.'}, null, 2));
