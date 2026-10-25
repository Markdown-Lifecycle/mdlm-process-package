---
id: plan-deployment-verification
version: 1
skills:
- skills/review-policy.md@4
- skills/design-criteria.md@1
- skills/verification-checks.md@3
- skills/aws-deployment.md@1
---

# Verify the deployed product through its endpoint

Revise one exact independent activity so that it verifies the product as deployed to its deployment target. The verification author stays independent: give a fresh author, without product source, `mdlm verification context <exact-RQS-or-EXP> --output <new-file> --json`, the public operation contact, the deployment target's public settings and a source-free projection of this guidance, exactly as `plan-verification` does, and never revise the verifier from a thread that has seen product source. Keep its requirements, cases, coverage, expected results and adequacy argument, and apply the verification-checks skill as for any activity. Change the verifier to reach the product through the endpoint by the aws-deployment skill's endpoint-verifier rules, with run-scoped data and environment `error` kept distinct from product `fail`, and state in the method that the activity runs in the networked mode. For a for-credit pass, add the `verified-against` link to that pass's one DPL, and when the only change is that link, say so for the adequacy reviewer. The revised activity needs its adequacy review, then selection with `update-verification-selection`.
