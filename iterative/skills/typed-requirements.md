---
id: typed-requirements
version: 22
---

# Author one normal-link requirement graph

Read the exact input records in guidance.context. For an existing RQS, follow every contains and decomposition link and inspect the complete exact REQ and DCP content. Prefer an authenticated native export when its selected revisions match the current graph; retain its path, digest and exact revision bindings. Use `mdlm show <exact-revision> --json` or contextual search for missing content or changed related context. Obtain current native guidance and authenticate its action, subject, snapshot, package and fixed envelope separately; reuse unchanged content, never a stale action or proposal envelope. A software leaf is a selected software requirement with no selected children. Write one REQ per obligation in the direct requirements batch. Stakeholder requirements use kind: stakeholder and statement for the user outcome or a constraint the stakeholder imposes; record the constraint's reason and the components it binds, and allocate it to those components rather than restating it product-wide. All non-stakeholder levels use kind: software and ears for required behavior, including system, software high-level and software low-level roles. Give each a useful title and keep source or rationale when needed to explain intent. The CLI supplies ordinary identities and generates one RQS containing the complete selected graph. The set receives one independent Review; individual requirements need no extra authoring or review turns.

Author REQs and DCPs in the proposal's `candidates` array, each with a unique `localId`. A group names its parent's complete immediate children:

```json
{
  "localId": "task-behavior",
  "type": "DCP",
  "payload": {"title": "Task behavior", "publication": "recorded"},
  "links": [
    {"type": "parent", "target": "$need"},
    {"type": "child", "target": "$complete"}
  ],
  "body": ""
}
```

Here `need` and `complete` are REQ candidate localIds in the same proposal. Use a string such as `"REQ-0123456789AB-r00001"` for an existing exact revision. `$<localId>.id` names a candidate's stable identity when a field requires it. REQs carry statements; DCP normal links carry decomposition. Multiple parents and useful levels are allowed. Every software path must reach a stakeholder root. Include exactly one RQS candidate from guidance, preserving its links and predecessor if present; the CLI derives its selection and payload.

Apply the coherent-obligation rule in [product-quality](product-quality.md). Keep the
functional transition in the leaves alongside shared success and failure rules;
generic success or rejection alone does not define the action. A path to an
ancestor cannot replace a missing leaf obligation.

Fill ears.pattern, system and response. Supply the complete subject in system and the response without a trailing period. Event requires event; state requires state; optional requires feature; unwanted requires unwanted. Ubiquitous has no guard. Complex combines at least two guards, with at most one event or unwanted guard. Preserve necessary semantics from stakeholder and approved design inputs while separating their obligations; existing code is never an authoring source to transcribe. Carry a parent constraint into the requirement of each component it binds, keeping its stated reason; do not restate it as a product-wide obligation or add a version floor the stakeholder did not ask for.

Before submission, apply the shared checks to the final normative statements and
exact selected child memberships in this authoring turn. Treat rationale as
explanation. For each classified outcome, identify the obligation that produces
it, including required progress when no external event arrives. Try a case where
every selected child holds but its parent fails; close gaps by reusing existing
shared requirements where applicable. Keep permitted implementation choices open.

## Record architecture and chosen depth

For each meaningful system boundary, designate one owning REQ and put the
architecture/depth note in its `rationale`. Identify the system elements, allocation
to one or many elements, each element's contribution, relevant exact ICDs and owned
state. For joint allocation, explain how the contributions deliver the whole
integration claim; each element need not implement that whole claim alone. Describe
the software-item boundaries and any internal parts, why these boundaries are
useful, the chosen requirement roles and what remains to refine. Running or replacing
programs separately is evidence for examining their interfaces, not an automatic
classification as software HLRs.

State every required behavior in `statement`, `ears` or explicitly incorporated
normative ICD clauses. Rationale explains allocation, design origin, proposed or
reviewed status, permitted variation and refinement triggers; it cannot add an
obligation. DCP links express behavioral refinement/contribution, not allocation
metadata alone. Each contributing REQ explains its responsibility and applicable
scope in its own rationale, referring to the owning architecture REQ by unambiguous
title in the initial batch or exact revision once published. Keep the shared note
in one place. The RQS/DCP graph selects the exact obligations and `uses-interface`
selects applicable exact ICDs. Record a meaningful contract, not every helper.

### Supporting architecture and intention notes

Keep the concise boundary, intention, allocation and depth summary in the owning
REQ's `rationale`. When useful explanation needs diagrams, alternatives, decision
tables or several paragraphs, put it in that same REQ's body under
`Supplemental architecture notes`. Mark proposed versus selected decisions and
identify diagrams/examples as descriptive. The exact REQ revision carries the
supplement through existing review and source-free verification context. Descendants
refer to that owner instead of duplicating the note. DCP bodies may explain the
selected children's collective contribution; ICDs own real interface agreements,
not a fictitious endpoint pair created to hold an architecture essay.

The supplement explains intention and permitted choices; it neither replaces nor
repeats normative fields. Every mandatory duty stays in the REQ statement/EARS or
explicitly incorporated exact ICD clauses. If deleting a note changes a required
result, fix the normative graph. Review the complete note for hidden duties,
contradictions and drift from the selected graph, including retained context
outside the assessment frontier. Keep requirement and verification context free
of implementation excerpts and product-authored expected results.

An optional lifecycle-repository document can aid readers. Pin its repository,
relative path and exact commit in the owning note and explicitly supply source-free
content when needed. The native context does not automatically retrieve,
authenticate or review Markdown links or Git document pins. Essential explanation
belongs in the selected REQ, not only in that external document. A changed note
uses the normal owning REQ revision/review route; changed duties also need the
appropriate change authority. Keep unaffected historical records unchanged.

## Keep normative ownership explicit

Each coherent obligation has an owning REQ. Its `statement` or `ears` states the
required behavior and explicitly names any applicable stable normative ICD clause
identifiers, with `uses-interface` selecting the exact ICD revision.

Apply the coherent-obligation rule to the complete meaning incorporated from an
ICD, not only the REQ's own words. If one clause mixes independently changeable
duties, identify the exact clause and its unambiguous applicable aspect in
statement/EARS, or revise the ICD into stable coherent subclauses through the
normal interface route. A short reference must not silently import unrelated
duties. Keep every required aspect owned by the selected graph's functional leaves
or exact shared requirements; narrowing a citation does not retire the remaining
behavior.

For each operation, apply its exact incorporated clauses to the inputs that operation
actually supplies. The clauses may own encoding, schema, ordering and compatibility
details; keep their normative definition there rather than copying it into the REQ. Define a shared term once, in one cited interface clause or one owning requirement, and cite it elsewhere. A whole-ICD link
alone does not identify which clauses the REQ requires. Keep unrelated capabilities
under their own owning requirements.

Rationale explains origin, allocation and design choices. If removing a rationale
sentence changes the required result, move that rule into the normative obligation
or an explicitly incorporated ICD clause. Mark normative ICD clauses
separately from provisional or descriptive choices. In the existing requirement
assessment and verification coverage rationale, identify the applicable clause IDs
and their evidence or gaps. This adds no per-clause datum or lifecycle transaction.

## Settle useful depth

Choose requirement roles from the explicit system-element, software-item and
internal-part boundaries and their reasons. Use `level` on software REQs when
these distinctions help author and review the contract; single-item products
normally omit it unless useful depth or replacement boundaries need explanation.
When levels are used, set `component` on high-level and low-level REQs as required
by the schema. It names the software responsibility scope of the chosen item or
justified internal part, never a file or system-allocation list. Relate an internal
scope to its software item in the architecture note. Existing historical field
values retain their recorded meaning; a compatible update does not reclassify
records or require cosmetic migration. `kind: software` also covers this package's
technical system-role requirements; this does not expand its scope to a general
hardware or human requirements discipline.

`system` states product, subsystem or element behavior, including integration
across elements. It may be allocated to one element or jointly to several; record
that allocation in rationale, with the duties in normative content. The existing
schema leaves `component` absent on system REQs because that field is a software
scope, not allocation. System parents are stakeholder or system REQs. A system
child adds a distinct subsystem/element responsibility or integration claim.

`high-level` states what the bounded software item must do to satisfy allocated
system duties against its ICDs and owned state. It adds necessary behavior or
settles a contract rather than copying allocation labels. Its parents are
stakeholder, system or high-level REQs. `low-level` settles a necessary calculation,
validation rule, state transition or justified realization constraint left open
by its high-level or low-level parent, or implements a stakeholder constraint.
Only low-level software REQs may prescribe implementation technology. Never move
from low-level detail back to a broader high-level or system claim. Same-scope
HLR/LLR refinements may repeat at useful depth. For refinement into a different
internal scope, explain its relationship to the software item and the contributions
and exact ICDs that preserve the parent duty. A changed label alone neither
justifies nor invalidates refinement. Cross-element integration still needs an
owning system claim; an unexplained worker LLR under an API LLR misallocates it.

Every immediate group must keep its parent's complete functional duty, including
relevant interactions and failures. A mechanism constraint is additional to that
duty, never a substitute. For example, an admission duty may have a child that
accepts q units exactly when q ≤ a, leaving a − q, and otherwise rejects without
changing a, and another child that applies admissions for a pool in serial order
each using its predecessor's state. A child requiring only one atomically written
file establishes neither duty. An allocated system REQ may remain an implementation
and verification leaf when its contract is fully settled and no meaningful
refinement remains. Explain any dual use as the software-item contract in rationale.
Do not create an identical HLR copy to cross a tier, or stop at a broad system leaf
while required software behavior, interactions or failure rules remain open.
A high-level REQ with nothing to refine stays a leaf; never restate it as a
low-level one. An author's freely chosen mechanism belongs in implementation and
rationale, not in an obligation made to fill the low-level field. A rewrite of one
component revises only requirements and incorporated clauses whose meaning changes,
including any prescribed language or runtime; it retains every other exact
revision at every level, including language-neutral low-level behavior. Retained
requirements still need fresh verification against the new product commit. Levels are not a fixed tier count: add a refinement only where
it settles a necessary decision, refines a responsibility or expresses an integration claim.
Stop when a reader can derive the
required inputs, outputs, state changes and relevant failures from the leaf and
its exact applicable contracts; remaining choices must be permitted implementation
variation. Another level must settle a necessary decision, refine a meaningful responsibility
or express an integration claim. Restating the parent, splitting a formula into
branches or following helper functions does not justify more depth. A singleton
group can be useful when it adds that information. Shared rules remain shared
requirements. The source-free verification export includes the full REQ rationale
and selected ICDs, so author it without implementation excerpts or product-authored
expectations.

### Worked reservation refinement

This example illustrates useful roles and contributions, not an approved workshop
specification or a complete accepted group. Assume the stakeholder has chosen an
automatic release deadline and maximum visible delay delta while UI, API and worker
are operating under a stated workload. Any persistence or concurrent-use guarantees
need their own approved meaning. The following statements belong in normative REQ
content or exact incorporated ICD clauses; the allocation column belongs in rationale.

| Record and role | Illustrative obligation and added information | Boundary and allocation |
| --- | --- | --- |
| S-RELEASE, stakeholder | Staff need overdue equipment holds to release automatically, without another user request. | Desired user outcome; the agreed delay and operating conditions constrain it. |
| SYS-VISIBLE, product system | After an active hold's deadline passes, the product shall present that item as available within delta under the agreed operating conditions. | Joint UI/service allocation. UI presents the authoritative result; service supplies it. This adds the observable outcome and timing boundary. |
| SYS-LIFECYCLE, subsystem system | After that deadline, the reservation service shall publish authoritative available state within its allocated part of delta. | Joint API/worker allocation. This settles the subsystem outcome; the UI propagation contribution must complete the parent interval. |
| SYS-EXPIRE, allocated system | On a conforming expiration request for an overdue active hold, the API shall release that item's authoritative reservation state as defined by the expiry ICD clause. | Allocated to the API element. The worker has a separate necessary initiation duty. This adds the element's required interaction and owned-state responsibility. |
| HLR-EXPIRE, software high-level | On Expire(r,t), the reservation software item shall change active r to expired exactly when its recorded deadline is at most t, leaving future and non-active reservations unchanged. | Software item reservation-api. This refines the allocated contract into its decision/state cases; exact ICD clauses supply input identity, response and refusal rules. |
| LLR-DECISION, software low-level | Expiry eligibility and its state update shall use one item's latest committed state in the same serialized decision order as other admitted changes to that item. | Reservation-api scope. This settles the necessary shared-state decision rule when the approved concurrency contract leaves it open. It names no lock, language, file or storage library. |

Every row needs its exact parent links and any shared obligations, not merely this
illustrative label. A complete SYS-LIFECYCLE group must include the worker's timely
initiation and the API's transition/publication contributions. A complete SYS-VISIBLE
group also needs the UI's correlated authoritative display contribution and their
combined timing. The API admission system duty is separately allocated to the API:
reserve an eligible available item exclusively for its borrower until the approved
deadline. Its HLR settles the available-to-held and refusal/no-change cases; an LLR
can settle deadline t + D when approved duration D and time origin require that
calculation. Retain a parent/ICD that already settles it rather than copying it.
These admission contributions remain distinct from expiry, and neither branch
alone establishes the complete reservation lifecycle.

For the expiry group, suppose a child only requires the worker to send a correct
request when invoked, and another requires the API to expire the named overdue
hold on such a request. Both children pass if the worker is never invoked, while
the parent fails after delta. Add the necessary initiation/progress obligation
and evaluate the complete timing chain. If persistence across restart is required,
checks entirely before restart do not establish it. If cancellation is retired,
retained selected children or ICD clauses must not continue to require it. Apply
these conditions only when they belong to the actual approved scope.

A repeated "make overdue holds available" child adds nothing. An API storage-helper
name does not justify another LLR. An unexplained worker LLR under the API decision
misplaces a cross-element relationship; its owning system claim must account for
that interaction. Keep implementation choices open once inputs, outputs, state
changes, required failures and applicable timing/persistence are fully settled.
A settled allocated system leaf can directly support implementation and verification;
an underspecified integration claim cannot. Add another level only for a necessary
decision, responsibility or integration claim, never to reach a label quota.

Revise an architecture note through the normal owning REQ revision and applicable
review/change route. Assess affected allocations and contracts explicitly; prior
notes remain history. Review the note as design rationale, not blanket stakeholder
approval of every recorded choice. Keep exploratory choices provisional until their
necessity is justified for the selected formal scope.

When approved maintenance retains an older architecture note, use an already
affected authored DCP explanation to locate the current note's owning selected
REQ, using its local candidate reference or exact published revision, and mark
the older note as historical context. Reviewers identify the current owner and
applicable review records in existing set-level findings. Preserve unaffected
normative obligations and prior rationale; do not revise records solely to update
publication-time status.

For corrections and approved changes, inspect the exact prior review and approved change inputs to identify the correction scope. When an interface definition changes, reassess every selected requirement incorporating the changed clause, including parents whose visible outcome is unchanged. Use `predecessor` with the exact prior revision only for requirements whose claims change or whose incorporated clauses change meaning. A requirement whose clauses are unchanged keeps its existing exact ICD binding. Retain compatible exact revisions, including unchanged children and ancestors. The CLI refreshes affected endpoints in retained DCP groups, generates RQS selection and queues review. Author a DCP only to change membership or, during approved maintenance, to correct explanatory prose that would otherwise misstate changed requirements; use `predecessor` for its existing lineage. In each authored DCP, use `$<localId>` for every parent or child created or revised in the same proposal; use exact selected revisions for unchanged endpoints. To retire a requirement, add `{ "type": "retires", "target": "<exact-selected-REQ-revision>" }` to the existing RQS candidate's links, retaining its predecessor and other guidance links. Its authored payload may be empty and its body should be empty. Revise surviving DCP membership to remove retired endpoints; the CLI omits groups whose parent is retired. Removing one parent link from a shared child does not retire it. Reinstatement is outside this package.

## Check the refinement

Authors and reviewers use the existing requirement rationale and exact group
assessment fields for these judgments, without a separate proof artifact:

- Identify what each child adds to the parent: a settled decision, an allocated
  responsibility or a necessary interaction. For a derived constraint, explain its
  origin, why it is needed and which parent outcome depends on it. A derived child
  is the weakest obligation that still delivers its parent. Allocation labels alone
  do not justify a design choice.
- Enumerate the parent's desired behavior and incorporated clauses, including
  applicable input/output cases, state changes, failures, interfaces, shared-state
  interactions, persistence, timing and progress without another external event.
  Match each to the complete immediate children's normative obligations or exact
  shared requirements. Try a case where all those children hold but the parent
  fails. For a timed parent, trace the clock-start event through scheduling,
  queueing, delivery, decision, effect and visible completion under its conditions
  and workload; the combined bounds must fit its interval. A sent request alone is
  not its completed effect. For persistence, include the specified restart/failure
  boundary. Check that changed or retired behavior is actually removed from the
  selected graph and applicable clauses, while every unaffected duty is retained.
  Resolve gaps through necessary obligations or authorized clarification; rationale,
  reachability and individually passing endpoint tests cannot supply missing duties.
- Judge each child's validity separately from collective coverage. Resolve a real
  gap through necessary behavior, shared requirements or an authorized clarification.
  Keep permitted variation open and stop at the depth rule above.

For example, a parent says that a failed action preserves saved state. Its child
preserves state on validation, unknown-item and save failures. Saving may succeed
and then the reply be lost: every listed child case can hold while the parent's
meaning remains unsettled. Identify the commit/acknowledgement boundary and obtain
a decision about what counts as failure. This does not authorize new rollback or
retry behavior. A test of rejection or failed saving does not establish the
lost-reply case. Once the chosen boundary and transition are explicit, decomposing
into file or HTTP-handler steps adds no required behavior.

For independent review, use the assessments and exact DCP context exported by
`mdlm review context <action> <exact-subject> --json`. Record `revise-membership`
when collective coverage requires additions, removals or redistribution, even if
all existing children are valid. An unchanged child's own exact group retains its
prior review; a revised child triggers review of its group. No minimum number of
edits applies.

After accepted product baseline, changes require an approved CHG. Its roots and derived descendants define scope; the current frontier defines what to edit now. Unrelated revisions require amended stakeholder approval. Keep the body empty when the structured fields and concise rationale suffice. Use a body only for useful descriptive supporting notes as defined above, not repeated normative fields.
