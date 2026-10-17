---
id: design-criteria
version: 1
---

# Requirements, provisional requirements and design criteria

Design criteria here are the team's recorded design decisions (`DC-n`). They are not the
exploratory criteria of an EXP, which keep their own verification route unchanged.

Outcomes are requirements; how the product achieves them are design criteria. Split a
mixed statement: keep its outcome as a requirement and record its mechanism as a
criterion.

## Classify each item (first match wins)
1. The stakeholder stated or approved it (intent text or a recorded decision): **requirement**.
2. Getting it wrong could lose or corrupt data, show a wrong or stale value as current,
   hide something the stakeholder must see, or affect safety or security: **requirement**.
   Never demote these.
3. It is a contract with something the product does not own (an outside caller, a file
   or format another tool reads, an existing saved format): **requirement** for
   compatibility. A representation both ends of which the product owns is a criterion.
4. The stakeholder would notice and could reject a reasonable alternative: if you know
   what they want, **requirement**; if you are guessing, **provisional requirement**.
5. Otherwise: **design criterion**. Typical criteria: internal timing allocations,
   polling and retry intervals, exit codes, message wording, internal data formats,
   storage layout, library choices, limits on input outside ordinary use.

Another of the product's own components depending on a choice does not make it a
requirement. An internal dependency alone does not make a representation, polling
interval, retry policy or timing allocation normative; this overrides the "another
component depends on" wording in product-quality and the timing-chain checks in
typed-requirements. Keep necessary component outcomes normative. Keep the parent's
end-to-end bound normative and verify it directly; record feasible internal timing
allocations as design decisions instead of normative child budgets.

For example, in a persistent Markdown editor, storage layout and unspecified cosmetic
details may be criteria. Keeping documents across the agreed save, reload and restart
boundary, truthful saved or unsaved indicators, and the rendering and toolbar behaviour
the stakeholder asked for remain requirements. An unspecified icon or shade is a
criterion; whether a toolbar action makes the requested edit and preserves the document
is a requirement.

## Simplest mechanism and default decisions
- A protected outcome is the requirement; the mechanism that protects it is a design
  decision. Rule 2 keeps the outcome ("a saved document is never lost") normative, not
  its mechanism. Choose the simplest mechanism that holds the outcome, for example one
  atomic write and flush with one request at a time. Add machinery (rollback, queues,
  order stamps, polling, extra retries) only when a demonstrated failure within the
  operating profile needs it, and record that failure in the DC-n reason.
- Timing races inside a window the user has already been warned about (a failure was
  shown, or a leave-page or unsaved-changes warning was accepted) get only the
  protected outcomes: no crash, no corruption, a late change never overwrites a newer
  one, and the status never claims success for an unconfirmed change. Record the
  behaviour as a DC-n; do not raise it as a stakeholder question.
- Saved data survives only the failures the operating profile names (default: process
  crash or kill). A derived obligation or child wording cannot raise that level.
- Limits on input and edge cases outside ordinary use (very long or unusual text,
  far-past, far-future or invalid dates, very large sizes) are DC-n stated limits,
  not stakeholder questions. Input beyond a stated limit still gets the protected
  outcomes.

## Record
- **Requirements** state outcomes in normative fields. Their numbers come only from
  stakeholder decisions, outside contracts or never-demote consequences.
- **Provisional requirements** are listed in the RQS body as `Open P-n: <question>`
  with your recommendation. Close each with the stakeholder (batched) before
  elaborating the branch that needs it; none in the selected formal scope may remain
  open when its first IMP is published.
- **Design criteria** are recorded in the owning requirement's body under
  `Design decisions` as `DC-n: <choice> — <why> — <alternative considered>`. They are
  descriptive, not normative obligations, and need no stakeholder approval.

## Rigor
- Requirements get full review, independent verification and blocking implementation
  review.
- Design criteria get one review pass for coherence and feasibility. Findings about
  correctly classified design choices are nonblocking unless they endanger a requirement
  or protected outcome. Misclassification is a blocking requirements defect, including
  when the missing outcome has no normative owner yet: split the statement, keep the
  choice as descriptive where appropriate, and add or correct the normative outcome. Design criteria
  get no verification activity of their own; the requirements' activities exercise them.
  Implementation may deviate from a criterion if every requirement still holds.
- Initial design decisions are recorded in the owning REQ body. Record later
  criterion-only changes in a versioned run decision log (owning exact REQ, stable
  DC-n, new choice, reason, alternative). Give the current log to requirements review,
  implementation review and acceptance, reconciled into one current criteria list.
  Changing a published REQ body still needs its normal revision route.

## Reclassify
- `DC-n` is a body label, not an assessment target. A reviewer records a
  reclassification as `needs-change` on the owning REQ's assessment with rationale
  `reclassify: <item> — <rule> — <correction>` (or as a finding with an explicit
  correction target when that REQ is outside the assessment frontier). Do not add
  fields.
- A reviewer may propose, citing the rule
  above that applies: mechanism → design criterion (only the mechanism; the outcome
  stays), or criterion → requirement (a stakeholder source, outside contract or
  never-demote consequence was found).
- After two failed rounds on the same item, run this classification before patching
  again. Do not demote an outcome because it is hard to specify.
- At most one tier change per item per baseline. Moving anything the stakeholder
  approved needs the stakeholder.

## Deliver
The acceptance request lists every design criterion as "decided by the team" and
confirms that no provisional requirement remains open.
