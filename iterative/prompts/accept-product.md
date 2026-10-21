---
id: accept-product
version: 7
skills:
- skills/design-criteria.md@1
- skills/endgame.md@1
---

# Accept the working tiny product

Ask the stakeholder to judge this exact implementation, current requirement set and passing evidence. Copy their explicit `accept` or `reject` into the required authored `decision` field and record their rationale. The decision judges necessity as well as correctness and may decline an obligation or narrow a requirement instead of demanding a fix. Never turn a rejection into acceptance. Rejection preserves the decision and dispatches product correction, followed by fresh review, verification and a new stakeholder decision. This is the only stakeholder acceptance step, and it follows a passing implementation review of the frozen for-credit version (endgame). A stakeholder who stops instead ends the run in stopped with findings, informal verdict (review-policy); never record that as an ACC. Do not infer acceptance from agent work completion.

Use the supplied direct proposal guidance and payload schema. The CLI supplies identities, exact required links and publication markers. Submit the authored values with mdlm proposal submit. Keep the body empty when the structured payload contains the whole claim.

For acceptance_scope partial, show the stakeholder the exact formal_files and the remaining provisional inventory. Acceptance covers only that formal scope at the exact IMP source commit. A working CLI or a profile boundary does not extend it to provisional neighbors or a later commit. For whole-product acceptance, confirm all agreed behavior is represented and the source selection is whole-product.

A historical_observation is a current applicability claim about one authenticated past passing observation, with original execution times visible. It supplies no new sample or claim about today's host. Acceptance still needs a passing current independent implementation Review and complete selected evidence; the CLI rechecks historical applicability before accepting. Show this distinction and any limitations to the stakeholder. A reviewer or explicit requirement for fresh execution remains binding.

In the acceptance request, list every recorded design criterion as "decided by the team" in plain language, and confirm that no provisional requirement remains open. The stakeholder may promote any criterion to a requirement before accepting; that is a refinement, not an acceptance.
