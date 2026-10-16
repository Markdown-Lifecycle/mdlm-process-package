---
id: refine-requirements
version: 24
skills:
- skills/product-quality.md@9
- skills/typed-requirements.md@24
---

# Refine requirements before first acceptance

Use this optional action when stakeholder learning changes or clarifies the
current formal scope before its first accepted baseline. Obtain the stakeholder's
decision against the exact current requirements and record its reason in the
changed requirements' rationale. Submit with explicit stakeholder authority as
described in the operator guide. This action requires no failed review or result.

Revise each requirement whose meaning changes using its exact predecessor.
Preserve unchanged requirement revisions. Publish one successor RQS in the same
lineage; the CLI selects the graph and refreshes affected decomposition endpoints.
Author a DCP revision only when its membership changes. Preserve earlier wording,
reviews and evidence. If the clarification changes a selected public interface,
revise the ICD through its own action, then retarget the set to that revision
with one `retargets-interface` link on the RQS candidate (typed-requirements).
Revise only the requirements whose own wording must change.

After publication, refresh expectations and obtain independent requirements
review on the successor RQS. Use its native review context for the required
statement and decomposition assessments. Export the successor verification
context for independent verification; prior activities and implementation evidence
retain their exact old bindings. A retarget alone revises no requirement, so
activities verifying only unchanged requirements need no revision for it. Follow current implementation, verification and
acceptance guidance for the revised selection. Accepted lineages and change-bound
work use the approved-change or correction route instead.
