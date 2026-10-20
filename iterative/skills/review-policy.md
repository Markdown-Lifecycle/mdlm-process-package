---
id: review-policy
version: 3
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

Findings about correctly classified design criteria (DC-n, see design-criteria) do not block unless the choice endangers a requirement or protected outcome; record them as nonblocking. Misclassification of an outcome as a criterion is blocking. A formal verification method is not inadequate for leaving a DC-n design decision unchecked; this does not apply to EXP criteria, whose activities verify them as before.

Review the whole relevant contract in one pass, report every finding family you
see, and say what you did not examine.

After two failed rounds in the same finding class on the same target, the author
records a root-cause and contract decision before the next correction instead of
patching again. The decision first checks the item's tier (design-criteria). For a
verification method, a second decision on the same activity reconsiders the observation
method. The activity may narrow its claim to stable checkpoints only if named
complementary activities or declared exact-source inspection establish every remaining
requirement obligation; preserve frozen obligations and explain the transferred
coverage. If no adequate method is available, leave the obligation unverified; changing
the requirement needs its normal authorized route.

## Finding ledger

The author keeps one finding ledger for the run, outside the product and verifier
source. Each review, result or pre-review finding gets a row when it is reported:
a stable ID (`F-n`, never reused), the exact review or result revision that reported
it, its severity class, blocking or nonblocking, its disposition (open, fixed,
declined with reason, scope note, or duplicate of `F-m`) and its causal commit, the
product or verifier commit that introduced it, plus the fixing commit when fixed.
Reviewers name each finding's severity class (see Stakeholder checkpoint). Copy each
finding from the structured review payload, not from extracted prose.
Before declaring another product cycle necessary, reconcile duplicates and evidence
gaps against the ledger.

## Stakeholder checkpoint

After every review (requirements, verification adequacy, class-wide pre-review and
implementation), send the stakeholder a short checkpoint: the ledger rows added or
changed, counted by severity class and blocking status, and the next step with its
expected cost. Severity classes, most serious first:

1. credential or privacy;
2. wrong saved value;
3. data loss;
4. small display;
5. other (name it).

The stakeholder may continue, narrow scope or stop; the author continues unless told
otherwise. A stopping rule the stakeholder sets applies only to the classes it
names: a rule to stop when only small display findings remain does not cover a new
credential or wrong-value finding, which is reported at the next checkpoint.

**Stopped with findings, informal verdict** is a terminal state distinct from
formal acceptance. When the stakeholder stops before acceptance, record their
informal verdict in their words, the open ledger rows with severity, the exact last
candidate and what was and was not formally established. Record any hands-on
session behind the verdict with `record-operational-use` on the exact IMP. Never
record an accepting ACC for it or describe the product as accepted.
