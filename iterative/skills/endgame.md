---
id: endgame
version: 1
---

# Dry runs, then one for-credit pass

Formal product work ends in this order. Each step starts only when the one before
it is clean:

1. **Dry runs** of the activities a change could affect.
2. **Class-wide pre-review** with runtime replays.
3. **Full dry run** of every selected activity, with a mechanically parsed result.
4. **One for-credit pass** on a single frozen version.
5. **Implementation review**, then **acceptance**.

A failure or blocking finding at any step enters the finding ledger
(review-policy), is corrected, and returns the work to step 1 for the activities the
correction could affect.

- **Dry runs earn no credit.** A dry run checks a candidate before formal
  execution; it publishes no RES and never sets expected behavior. Use
  `mdlm execution dry-run` when the installed kernel offers it. Until then, run the
  activity's committed verifier directly against the candidate product commit, with
  the activity's own command and pinned environment, and keep its machine-readable
  report. Re-run only the activities a change could affect: those whose verifier,
  exercised product source, shared mechanism (including the shared verifier
  library), requirements or runtime environment the change touches. When the impact
  is uncertain, treat the activity as affected.
- **Parse every result mechanically.** A script reads the report or receipt and
  counts passed, failed, errored and skipped cases for every selected activity. The
  result is clean only when every selected case passed and no activity is missing.
  Never judge a run from a human or agent summary, which can read an error as a pass.
- **Class-wide pre-review.** Before the full dry run, a reviewer with source access
  inventories every caller of each shared mechanism a finding or correction touched
  (for example a storage writer, a session or account check, a request queue or a
  shared renderer). For each finding, replay at runtime its exact reproducer, both
  orders of any two responses that can race, and the neighbouring behaviour of every
  listed caller. Reading source alone does not complete pre-review. Each fix it
  causes gets its own reproducer replay before step 3.
- **Full dry run.** Run every selected activity on the exact candidate that will be
  frozen, and parse the result. Only a clean parsed result freezes it.
- **One for-credit pass.** Freeze one version: the product commit, the verifier
  commit, the selected VFY revisions and the pinned environment. Publish the IMP
  revision for that version, then run every selected activity once with
  `mdlm execution run` and record each RES. Change nothing during the pass. Record
  every outcome, including failures; a failure enters the ledger, and the next
  for-credit pass again runs everything on a new frozen version. Historical
  applicability (execute-verification) remains available only where its own
  unchanged-source rules hold.
- **Then review and accept.** Independent implementation review judges the frozen
  version and its for-credit results. Acceptance follows a passing review. A
  stakeholder who stops before then ends the run in "stopped with findings, informal
  verdict" (review-policy), not in acceptance.
