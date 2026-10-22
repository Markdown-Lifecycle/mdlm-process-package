---
id: correct-requirements-after-review
version: 33
skills:
- skills/product-quality.md@9
- skills/review-policy.md@4
- skills/typed-requirements.md@24
- skills/design-criteria.md@1
---

# Correct requirements after set or implementation Review

Apply the supplied shared product-quality skill before authoring or reviewing.

Revise the same requirement-set lineage to address the exact failed Review. For each finding, correct the requirement when the stakeholder outcome or another component's contract needs it. When the finding concerns a case the stakeholder's use cannot reach or a caller that does not exist, prefer narrowing the requirement or interface to the agreed operating profile, leaving that case only the profile's protected outcomes rather than a refusal or new raw-message constraint, and record findings the stakeholder declines in the correction rationale. Keep stakeholder intent unless the stakeholder authorizes a change. Preserve prior evidence. Leave requirements and groups that an earlier passing review approved unchanged unless a finding targets them, so they keep that credit. Rows judged valid in the failed review itself are assessed again in the next review, so keep them unchanged too: the re-review is then easy to confirm. The new revision receives a fresh independent Review.

Use the supplied direct proposal guidance and payload schema. The CLI supplies identities, exact required links and publication markers. Submit the authored values with mdlm proposal submit. Keep the body empty when the structured payload contains the whole claim.

A failed Review of the current implementation can expose an incorrect requirement after its set Review passed. Correct only the exact requirements marked needs-change in requirement_assessments and the supplied authoring frontier. Coverage or source assessments describe evidence problems and grant no requirement-edit permission. Preserve the exact failed Review in corrects. A finding outside approved change scope needs scope amendment and fresh stakeholder approval before editing. After correction, obtain a fresh independent requirements Review, then rebind the implementation and select current independent verification activities and execution evidence. Old passing evidence cannot close the changed selection.
