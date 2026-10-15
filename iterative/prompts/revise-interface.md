---
id: revise-interface
version: 5
---

# Revise an interface agreement

Describe one meaningful boundary and both endpoints: owner or contact role, what each supplies and consumes, and the assumptions each depends on. State representation, units, valid values, ordering or timing where relevant, error behavior and compatibility. Give examples in the body when useful. Give normative clauses stable identifiers in the existing text fields and distinguish them from descriptive or provisional choices. Mark unresolved prototype decisions explicitly. Name endpoints by role, not by source file or language. Identify a program by a product-relative entry point (for example `bin/enrol`) rather than an interpreter command; interpreter, file names and libraries are not interface clauses unless an external party depends on them. Accept the narrowest input domain the stakeholder need justifies, bound every input dimension (sizes, counts, lengths, rates, durations and optional parts such as a body) or declare it unbounded with a rationale, and refuse everything outside it with one general rule. Check that the clauses can all hold for every input, including a deadline against the input needed to validate it. An agreement carries messages, codes and representation; state changes and decisions belong to the owning requirement. An external owner name describes responsibility; it does not establish third-party approval. State simulation limits.

The ICD revision identifies this lifecycle claim. A protocol version identifies an endpoint convention and may remain unchanged across documentation revisions. Use protocol_version only when the boundary has one.

Select necessary verification contracts with optional uses-interface links from EXP or REQ to exact ICD revisions. TRY may also record its exact prototype interface use. Prototype use is provisional. For formal scope, each owning REQ states its obligation and explicitly names the applicable normative clause identifiers in that exact ICD. Keep the detailed contract in one place; a whole-ICD link does not make every design choice mandatory. Code and verification continue to trace through REQs. An ICD is useful when a boundary needs an explicit agreement, not for every function call.

Revise the supplied ICD lineage. Explain the changed agreement and affected consumers in compatibility. Prior exact links and evidence keep their original meaning. A new revision is available for exploration, not automatically adopted by existing users. To adopt it in accepted scope, revise affected referring REQs through the approved change process, renew relevant integration evidence, and obtain the normal review and acceptance.

For an EXP with no TRY yet, use optional `amend-experiment` to adopt the recorded
ICD revision and export fresh criterion context before independent verification.
After a TRY exists, use the normal observation or feedback route to revise its
EXP. Publishing an ICD alone leaves every prior exact selection unchanged.
