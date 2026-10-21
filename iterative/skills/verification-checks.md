---
id: verification-checks
version: 3
---

# Shared verification check rules

Verification authors apply these rules to every activity. Adequacy reviewers judge
oracles against them and do not ask for stricter checks than they set.

- **Timing.** Every event time is an interval from its earliest possible instant
  (for example receipt of the triggering reply in the network log) to its latest
  (for example the first observation of the result). A deadline check passes only
  if the whole interval is admissible, fails only if the whole interval is
  inadmissible, and otherwise reports `error`.
- **Formal requirements and exploratory criteria.** For formal REQ verification, assert
  normative requirements and the stakeholder's end-to-end numbers; non-normative DC-n
  design decisions (for example internal timing allocations, polling intervals, exit
  codes, message wording, internal formats) get no verification of their own. Verify an
  exact code, wording, format or timing when a selected requirement requires it. This
  exemption does not apply to EXP criteria: EXP/TRY activities verify their declared
  exploratory criteria as before.
- **Visibility and presence.** Judge whether an element is shown, hidden or present
  with the test framework's or platform's own semantics (for example Playwright
  `locator.isVisible()`), and only for the elements the requirements constrain. Do
  not build custom visibility predicates or require wrapper geometry.
- **Integration checkpoints.** Browser and integration activities claim UI state at stable checkpoints by default. An integration activity claims integrated outcomes at
  stable checkpoints only. Continuous preservation between checkpoints belongs to
  named component activities; name them in the coverage rationale. Sampled traces
  may be kept as evidence, but no pass claim rests on them.
- **Dry run.** Before requesting adequacy review, the author runs each activity
  against the real product, or a reference build when no product exists yet, and
  records the outcome in the coverage rationale. An oracle that can never pass a
  correct product is a verification defect. The dry run checks invocation and oracle
  soundness; it never sets expected behavior.
- **Screen truth.** For a claim that the screen shows the true current value, freeze
  the judging criteria in the activity before execution, so adequacy review judges
  them, and capture cheaply: timestamped screenshots or frames at the claimed
  moments, analysed after capture. The verdict for each sample cites the qualifying
  frame and its capture time. Mechanical floors (pixel, DOM or text checks) are
  necessary-only: a floor can fail a sample but never pass it alone. A false fail or
  false pass that only a floor makes, and that the judged verdict corrects, is a
  nonblocking limitation to record; a floor miss on a real rendering stays a failure
  until investigated.
- **Session and identity risk scenarios.** When the product restores saved data and
  has sessions or accounts, the activities for its protected outcomes (no wrong saved
  value, no credential or private data shown to another account) cover restore ×
  session × account identity, treating an expired session, a changed account and a
  restored database as distinct scenarios. Check at the server: send each mutation
  from a session or tab that predates the restore and from one bound to another
  account, and confirm it is refused before any write and nothing changed. A refusal
  only in the client does not pass. The product typically holds a restore epoch
  outside the restored data and an account binding checked on every mutation; the
  verifier observes the refusal, not the mechanism. If no selected requirement covers
  a scenario, report the gap instead of asserting beyond the requirements.
- **Evidence size.** When planning activities, project the review packet: receipts,
  captured screenshots, video and other artifacts for every activity, plus verifier
  source. If the projection approaches the kernel's limit (about 512 MiB with the
  current kernel), reduce capture in the plan; never cut evidence after execution.
  Keep the shared verifier library in its own frozen commit and directory, not
  copied into each activity's commit.
- **Proportionality.** An adversarial inspection activity states its operating
  bounds before it starts: the inputs and faults it treats as realistic, taken from
  the operating profile. A finding that needs crafted input outside those bounds is
  a nonblocking scope note (review-policy). Realistic corruption stays blocking, for
  example a backup any real writer could produce, a truncated or partly written
  file, or a hand edit the profile allows.
- **Coverage gaps.** After the first IMP is published, run
  `mdlm verification status <exact-IMP> --json` and author an activity for any
  selected leaf that no activity scopes.
