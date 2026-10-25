---
id: teardown-deployment
version: 1
skills: []
---

# Tear down a deployment

Every DPL without a successful teardown is live, whatever its outcome. Tear it down once its for-credit pass's results are recorded, as soon as it fails, drifts or passes its `expires_at`, and always before the run reaches any terminal state: accepted, or stopped with findings, informal verdict. A live deployment blocks the next deployment. The lifecycle cannot read the clock, so compare `expires_at` with the current time at every event; once it has passed, teardown comes before any other work, and any result run against it afterwards is `error`.

Use the deployment target's APM profile (`apm-<project>`, from aws-permissions-manager). Run `mdlm deployment teardown <exact-DPL> <new-operation> --aws-profile apm-<project> --json`. After an uncertain response, recover that operation's receipt through the kernel's teardown settlement; never start another teardown of the same deployment while the first one's outcome is unknown. A teardown passes only when the stack is `DELETE_COMPLETE`, the tag query for the deployment comes back empty, and every top-level resource in the recorded inventory reports not found.

Submit one TDN that cites the completed teardown receipt as top-level `evidence.receipt` and keeps the supplied `tears-down` link to the exact DPL. The kernel fills `outcome` and `receipt` from that receipt; do not author them. In `assessment`, state the three checks and name any remaining ARNs. A TDN with outcome `error` leaves the deployment live. Then run `mdlm deployment orphans --aws-profile apm-<project> --json`, remove what it reports with `mdlm deployment teardown <new-operation> --orphan-stack <slot>` or `--orphan-resource <arn>` (confirming each deletion), and record a new teardown. Report any resource of a type the kernel cannot delete to the stakeholder for manual removal.
