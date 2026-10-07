---
id: execute-verification
version: 4
skills: []
---

# Execute an independent activity and record its results

Select one exact VFY linked by verification on this product. Run `mdlm execution run <exact-IMP-or-TRY> <new-operation> --activity <exact-VFY> --json`. The CLI captures the separate committed verifier, product source, pinned environment, all case results and declared evidence files. One script may cover several requirements. Use execution settlement after an uncertain response; never replay an uncertain started operation.

Use `mdlm execution export <operation> <new-directory> --json` to materialize the authenticated saved receipt, streams, report and artifacts for inspection. The export preserves existing directories and never repeats execution. Inspect the actual observations and artifacts. Submit one RES with evaluates pointing to that exact activity and the captured receipt in top-level evidence.receipt. Preserve the fixed product and requirement/experiment links supplied by guidance. The CLI derives outcome, receipt and case_results and supersedes the current earlier result for this exact product/activity. Author a descriptive title, assessment and correction_target. Use none for pass; distinguish implementation, verification or requirements when diagnosing a failure. Skipped cases and execution errors do not pass. Keep failures and interrupted attempts in history.

Run the other selected activities, then inspect `mdlm verification status <exact-product> --json`. Formal verified requires reviewed sufficient coverage for every selected requirement and current passing cases. Provisional criteria report observations without making a baseline claim. An incomplete coverage argument requires a plan revision, not an optimistic assessment of an old receipt.

## Apply one original historical observation

For an implementation only, the package also opts in to `verification-applicability@1`. An explicit alternative to a fresh run is ordinary result publication with `evidence.historicalResult` naming one exact original passing RES. Omit `evidence.receipt`. Use the same successor IMP subject, exact evaluates activity link and authored assessment/correction_target as an ordinary RES. The CLI derives the original receipt, passing cases, artifacts and `historical_observation` provenance. Do not author those managed fields. The receipt, operation and original execution times remain unchanged; applied_at records a separate applicability publication time. No execution occurs under this mode.

The original must bind the immediate predecessor of this same IMP lineage and package. The successor changes verification selection only; product source, complete inventory and attribution, requirements, scope, command and the exact retained activity/verifier/execution contract remain unchanged. Changed sibling activities can be selected and run freshly. Reuse chains, prototypes, longer lineages, source reverts and cross-package reuse are unsupported. The CLI rejects missing/forged evidence, changed relevant inputs, unresolved relevant attempts and later failing or errored attempts, including attempts without a published RES. It rechecks before current review and acceptance. A refused application leaves current evidence absent; choose fresh execution explicitly.

Inspect the complete original receipt/report/artifacts with execution export and the historical labels in RES, verification status and current review context. Historical applicability preserves one past observation under its recorded environment; it does not prove determinism or today's host equivalence. Current independent implementation review judges all current requirements, source, observations, shared assumptions, changed sibling implications and freshness. The reviewer may require fresh execution. Preserve failures and correction links. Explicit fresh-run obligations still require a fresh run.
