---
id: deploy-product
version: 1
skills:
- skills/endgame.md@1
---

# Deploy the frozen product for its for-credit pass

Deploy only the single frozen version of a for-credit pass (endgame step 4), never a candidate. Dry-run deployments for non-credit checks use `mdlm deployment dry-run` in a dry-run slot, publish no lifecycle data and are never evidence.

Obtain the package's APM profile through aws-permissions-manager (`get_aws_credentials` for project `mdlm-demo`, which sets up profile `apm-mdlm-demo`). Never use another profile or copied keys. Run `mdlm deployment run <exact-IMP> <new-operation> --stack mdlm-demo-credit --aws-profile apm-mdlm-demo --json`. The kernel synthesizes the product's CDK app in the sandbox, checks the assembly, deploys from the host and probes the endpoint for the product commit. After an uncertain response, inspect `mdlm deployment settlement <operation> --json`; never re-run a started operation. Recovery from an interrupted deployment is teardown and an orphan check, never a second deploy.

Submit one DPL that cites the completed receipt as top-level `evidence.receipt` and keeps the supplied `deploys` link to the exact IMP. Author the title and, when useful, a short body. The kernel fills outcome, receipt, stack, outputs, endpoint, deployed_version and expires_at. Publish an `error` deployment too: every DPL, whatever its outcome, needs a teardown, and a live deployment blocks the next one.

**One deployment per for-credit pass.** Every networked verification activity in the pass runs against this one DPL. Revise each such activity with `revise-verification` so that its only change is the `verified-against` link to this DPL, give its adequacy reviewer the previous revision and that statement, then select the revisions with `update-verification-selection`, preserving the source commit. Run every selected activity once. Implementation review and acceptance are unavailable while the selected activities name more than one DPL. If the deployment fails, drifts (a probe mismatch or a changed stack update time) or passes its `expires_at` during the pass, the affected results are `error`, not `fail`: tear the deployment down, deploy again, retarget and run the whole pass again. Never mix results from two deployments. Any product change means a new frozen commit, a new DPL and a full pass.

The package fixes the synth image, host CDK CLI version (install exactly that version on the host), CDK app path, region, APM project, stack slots, output allowlist, endpoint output, version probe path and maximum lifetime in this action's payload. Do not author them. Deploy for credit only to `mdlm-demo-credit`; the dry-run slots are for `mdlm deployment dry-run`. Tear down every deployment before the run reaches any terminal state (teardown-deployment).
