---
id: draft-requirements
version: 29
skills:
- skills/product-quality.md@8
- skills/typed-requirements.md@23
---

# Define the agreed scope as individual obligations

Apply the supplied shared product-quality skill before authoring or reviewing.

Read the stakeholder request. Apply the shared author checklist and record the per-system architecture/depth rationale. Write focused stakeholder REQ statements only, using the typed-requirements skill, and record the ICDs they depend on. Settle stakeholder intent before any software refinement: cardinality, error and refusal precedence, time and boundary tolerances, response deadlines and the cases the stakeholder's use cannot reach. Include relevant state transitions, boundaries and failures without inventing obligations. The next independent Review judges these roots on their own. After it passes, `elaborate-requirements` adds one decomposition group at a time, and each group gets its own review.

Use the supplied direct proposal guidance and payload schema. The CLI supplies identities, exact required links and publication markers. Submit the authored values with mdlm proposal submit. Keep the body empty when the structured payload and concise rationale suffice. For useful descriptive supporting specification, follow typed-requirements' owning-REQ body guidance; all required duties remain in normative fields or exact ICD clauses.

Record the stakeholder request reference in source so a reviewer can recover the original intent.

Choose this optional action when stakeholder intent justifies a formal scope. Exploration may close without requirements. Publishing this fresh requirement set starts ordinary formal review, implementation, independent verification and acceptance work in the same history.

Read the exact experiment in guidance.context and its relevant observations with `mdlm show <exact-revision> --json`. State the selected formal scope and the neighboring behavior that remains provisional. Start from stakeholder need or a useful prototype decision, then write fresh obligations. Record optional `informed-by` links to zero or more exact EXP/OBS revisions on each REQ, with rationale identifying what each origin contributed. Several requirements may share origins. A requirement may have no design predecessor. Keep replaceable implementation choices in exploration; do not turn all prototype behavior into requirements. Prior observations explain learning and do not replace current formal verification.

For interface-dependent behavior, add optional uses-interface links to exact ICD revisions. State each obligation in the REQ and cite the ICD clauses that define its representation; do not copy clause content, paths or tables into the REQ. Descriptive and provisional choices stay in the ICD. Adopting a changed ICD in accepted scope requires the normal approved requirement change and fresh applicable evidence.
