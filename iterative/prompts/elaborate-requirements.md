---
id: elaborate-requirements
version: 1
skills:
- skills/product-quality.md@8
- skills/typed-requirements.md@23
---

# Elaborate one decomposition group

Apply the supplied shared product-quality skill before authoring.

Use this action after the current requirement set passed independent review. Add exactly one decomposition group: choose one existing requirement as its parent, write its new software REQ children, and author one DCP that links that parent to exactly those children. The CLI rejects a candidate that rewords, removes or regroups any existing requirement or group, adds a stakeholder root, or adds more than one group. Corrections to passed records use the correction route after a review finding. Changed stakeholder intent uses `refine-requirements`.

Choose the next parent from the stakeholder roots and existing software requirements that still need refinement. Prefer the parent whose behavior unblocks the most later work, such as shared inputs, interfaces and state. Write the children using the typed-requirements skill. Together they must fully satisfy their parent, including its boundaries, failures, timing and the relevant interactions with sibling behavior already in the graph. Read the complete current graph first so a new child neither repeats an existing obligation nor contradicts one. Stop decomposing a branch when its leaves are concrete enough to implement and verify.

Use the supplied direct proposal guidance and payload schema. The CLI supplies identities, exact required links and publication markers. Publish one successor RQS in the same lineage; the CLI selects the graph and records whether it is complete. Then obtain independent requirements review of the successor. That review assesses only the new requirements and group, so its rows stay small; the earlier passing judgments keep their credit.

Once this group passes and its children are leaves you will not decompose further, export `mdlm verification context <exact-RQS> --output <new-file> --json` and start independent verification for those leaves. Other groups can continue in parallel. Implementation becomes available once the graph is complete: every stakeholder root is decomposed and at least one software leaf exists.
