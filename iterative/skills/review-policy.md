---
id: review-policy
version: 1
---

# Review severity and stopping

Every independent review (requirements, verification adequacy and implementation)
and every correction after review applies this policy.

Classify each finding as blocking or nonblocking. A blocking finding cites the
affected commitment or stakeholder outcome, identifies the concrete mismatch or
missing evidence, explains its impact and gives a concrete reproducer.

- Requirements and implementation review: a finding blocks when a stakeholder
  scenario, a named caller's contract or the operating profile's protected outcome
  fails, or when required evidence is missing.
- Verification adequacy review: a finding blocks when the method would accept a
  defective product, or reject a valid one, within the operating profile and the
  stated requirements. A hypothetical alternative product outside the profile does
  not block.

A violation reachable only through input no named caller sends and outside the
profile's fault families does not block; record it as a scope note for the
stakeholder. Requalifying trusted platform components is out of scope. Optional
improvements do not block and add no requirement or acceptance criterion without a
stakeholder decision that names the need. Return pass when no blocking finding
remains.

Review the whole relevant contract in one pass, report every finding family you
see, and say what you did not examine.

After two failed rounds in the same finding class on the same target, the author
records a root-cause and contract decision before the next correction instead of
patching again.
