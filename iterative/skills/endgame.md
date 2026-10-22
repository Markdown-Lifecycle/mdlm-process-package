---
id: endgame
version: 2
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
  `mdlm execution dry-run <exact-IMP-or-TRY> [--source <commit>] [--all] --json`.
  It runs the selected activities in the same native runtime as
  `mdlm execution run`, writes no lifecycle data and reruns only activities whose
  text, verifier source, runtime or product inputs changed since their last cached
  run. `--source` runs a committed candidate product commit before you publish its
  IMP revision; `--all` reruns every selected activity, for the full dry run. With a
  kernel that lacks the command, run each affected activity's committed verifier
  directly against the candidate product commit, with the activity's own command
  and pinned environment, and keep its machine-readable report. An activity is
  affected when the change touches its verifier, exercised product source, shared
  mechanism (including the shared verifier library), requirements or runtime
  environment. When the impact is uncertain, treat the activity as affected.
- **Parse every result mechanically.** With the kernel command, a script reads the
  JSON response: the result is clean only when `ready` is `true` and every selected
  activity appears with outcome `pass`. Otherwise a script reads each report and
  counts passed, failed, errored and skipped cases for every selected activity. The
  result is clean only when every report matches its declared format, lists exactly
  the activity's declared case IDs with no duplicates or extras, every case passed,
  each captured exit status agrees with its report, and no activity is missing.
  Never judge a run from a human or agent summary, which can read an error as a pass.
- **Class-wide pre-review.** Before the full dry run, a reviewer with source access
  inventories every caller of each shared mechanism a finding or correction touched
  (for example a storage writer, a session or account check, a request queue or a
  shared renderer). For each finding, replay at runtime its exact reproducer, both
  orders of any two responses that can race, and the neighbouring behaviour of every
  listed caller. Reading source alone does not complete pre-review. Each fix it
  causes gets its own reproducer replay before step 3. Pre-review is clean only when
  a full round finds nothing blocking and no blocking ledger row from it is open.
- **Full dry run.** Run every selected activity on the exact candidate that will be
  frozen, and parse the result. Only a clean parsed result freezes it.
- **Gate the for-credit pass on a clean pre-review.** Never start a for-credit pass,
  or publish the IMP revision it will freeze, while class-wide pre-review has an open
  blocking finding. A pass on a version with known defects only feeds an
  implementation review that must fail, and costs another pass after the fix.
- **One for-credit pass.** Freeze one version: the product commit, the verifier
  commit, the selected VFY revisions and the pinned environment. Publish the IMP
  revision for that version, then run every selected activity once with
  `mdlm execution run` and record each RES. Change nothing during the pass. Record
  every outcome, including failures; a failure enters the ledger, and the next
  for-credit pass again runs everything on a new frozen version. Historical
  applicability (execute-verification) remains available only where its own
  unchanged-source rules hold.
- **Sweep a repeating class.** When a review or pre-review finds a second variant of
  a finding class already in the ledger (for example a stale result left on screen
  after a failed, lost or late reply), stop fixing variants one at a time. Before the
  next review, run one class-wide sweep: list every screen, surface or endpoint the
  class could reach, replay the pattern at runtime in each, fix the shared
  mechanism, and replay every earlier reproducer of the class. Repeat in rounds
  until a round finds nothing blocking, up to the round cap agreed with the
  stakeholder in the checkpoint that starts the sweep. After the last round, stop
  sweeping, fix every blocking finding it reported, ledger the nonblocking ones and
  go on to the dry run. The cap ends the search, never the fixing; the
  proportionality floor alone decides which warned-window ordering cases block.
- **Judge against the proportionality floor.** The operating profile records the
  proportionality floor: the protected outcomes a race inside a window the user was
  warned about must keep. A narrower ordering case that keeps every protected
  outcome is a nonblocking ledger row. Put the floor text word for word in every
  sweep, inspector and implementation reviewer brief.
- **Split judgment of browser evidence.** When for-credit evidence carries screen
  captures for postrun inspection, give each such activity its own independent
  inspector before implementation review. The inspector judges every frame and case
  of that one activity against its frozen criteria and reports PASS, FAIL or
  incomplete per case with frame references. Each FAIL enters the ledger. An
  inspector's pass does not close an open ledger row; the author carries rows
  forward.
- **Then review and accept.** Independent implementation review judges the frozen
  version and its for-credit results, authenticating and spot-checking the
  per-activity inspection reports rather than judging every frame itself. Acceptance follows a passing review. A
  stakeholder who stops before then ends the run in "stopped with findings, informal
  verdict" (review-policy), not in acceptance.
- **Keep progress snapshots.** Keep writing any periodic progress snapshot the run
  requires through the endgame. Long passes, sweeps and reviews make the schedule
  easy to miss, so check the time since the last snapshot at every event.
