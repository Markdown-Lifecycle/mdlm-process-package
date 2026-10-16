---
id: verification-checks
version: 1
---

# Shared verification check rules

Verification authors apply these rules to every activity. Adequacy reviewers judge
oracles against them and do not ask for stricter checks than they set.

- **Timing.** Every event time is an interval from its earliest possible instant
  (for example receipt of the triggering reply in the network log) to its latest
  (for example the first observation of the result). A deadline check passes only
  if the whole interval is admissible, fails only if the whole interval is
  inadmissible, and otherwise reports `error`.
- **Visibility and presence.** Judge whether an element is shown, hidden or present
  with the test framework's or platform's own semantics (for example Playwright
  `locator.isVisible()`), and only for the elements the requirements constrain. Do
  not build custom visibility predicates or require wrapper geometry.
- **Integration checkpoints.** An integration activity claims integrated outcomes at
  stable checkpoints only. Continuous preservation between checkpoints belongs to
  named component activities; name them in the coverage rationale. Sampled traces
  may be kept as evidence, but no pass claim rests on them.
- **Dry run.** Before requesting adequacy review, the author runs each activity
  against the real product, or a reference build when no product exists yet, and
  records the outcome in the coverage rationale. An oracle that can never pass a
  correct product is a verification defect. The dry run checks invocation and oracle
  soundness; it never sets expected behavior.
- **Coverage gaps.** After the first IMP is published, run
  `mdlm verification status <exact-IMP> --json` and author an activity for any
  selected leaf that no activity scopes.
