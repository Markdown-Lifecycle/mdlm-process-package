---
id: draft-requirements
version: 32
skills:
- skills/product-quality.md@9
- skills/typed-requirements.md@24
---

# Define the agreed scope as individual obligations

Apply the supplied shared product-quality skill before authoring or reviewing.

Read the stakeholder request. Before drafting, agree an **operating profile** with the stakeholder as one batched decision, recorded with the other stakeholder decisions: (1) who supplies and who consumes each boundary (the product's own components, named operators, any outside party); (2) which faults matter and which outcomes they must not break; (3) which platform components are trusted as given (for example the runtime's standard HTTP server, the standard JSON parser and the browser), whose documented behaviour, limits and rejections the product accepts rather than re-specifies; (4) which numbers the stakeholder actually cares about (deadlines, limits, tolerances). Recommend a default; the stakeholder decides. For input outside the profile, the protected outcomes are: no crash; no bad, old or unreadable value shown or acted on as current; later valid input still works. A value that passes every application check is good whatever message carried it. Do not constrain raw input size or shape beyond what the trusted parser does.

Write stakeholder REQ statements only, in the stakeholder's own terms, using the typed-requirements skill. Each states one outcome or constraint the stakeholder asked for or decided, and its source names the intent sentence or decision it comes from. A stakeholder REQ contains no interface clause references, no protocol or representation detail and no number the stakeholder did not state. Do not add universal or negative obligations ("every", "never", "refuse all") unless the stakeholder stated them. Settle stakeholder intent before any software refinement: cardinality, error and refusal precedence, time and boundary tolerances, response deadlines and the cases the stakeholder's use cannot reach. List any obligation you believe is needed but the stakeholder did not ask for as a **derived obligation** with its reason in the RQS body. Before requesting review, send the stakeholder the plain-language root list and the derived obligations, and record the stakeholder's confirmation, changes and each derived obligation approved or declined. Record no ICD yet; `elaborate-requirements` records each one with the group whose children first need that boundary. Apply the shared author checklist and record the per-system architecture/depth rationale. The next independent Review judges these roots on their own. After it passes, `elaborate-requirements` adds one decomposition group at a time, and each group gets its own review.

Use the supplied direct proposal guidance and payload schema. The CLI supplies identities, exact required links and publication markers. Submit the authored values with mdlm proposal submit. Keep the body empty when the structured payload and concise rationale suffice. For useful descriptive supporting specification, follow typed-requirements' owning-REQ body guidance; all required duties remain in normative fields or exact ICD clauses.

Record the stakeholder request reference in source so a reviewer can recover the original intent.

Choose this optional action when stakeholder intent justifies a formal scope. Exploration may close without requirements. Publishing this fresh requirement set starts ordinary formal review, implementation, independent verification and acceptance work in the same history.

Read the exact experiment in guidance.context and its relevant observations with `mdlm show <exact-revision> --json`. State the selected formal scope and the neighboring behavior that remains provisional. Start from stakeholder need or a useful prototype decision, then write fresh obligations. Record optional `informed-by` links to zero or more exact EXP/OBS revisions on each REQ, with rationale identifying what each origin contributed. Several requirements may share origins. A requirement may have no design predecessor. Keep replaceable implementation choices in exploration; do not turn all prototype behavior into requirements. Prior observations explain learning and do not replace current formal verification.
