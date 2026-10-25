---
id: choose-deployment-target
version: 1
skills: []
---

# Record the stakeholder's deployment target

Use this action only when the stakeholder has decided that this product ships to AWS, ideally while agreeing the operating profile. Most products never deploy; do not suggest deployment to a stakeholder who has not asked for it. Recording a target makes deployment work available for this product: deploying the frozen product, preparing its CDK app, verifying it through its endpoint and tearing every deployment down.

Ask the stakeholder for the target, recommending values, and record their decision with stakeholder authority. The target names: the pinned synth image (`name@sha256:<digest>`), the exact host CDK CLI version, the CDK app path in the product, one AWS region, the aws-permissions-manager project, the stack slots (credit and, optionally, `dry_run_slots`), the stack outputs the kernel may record and which one is the endpoint, the version probe path, the maximum lifetime of a deployment in minutes and the resource types the product's stack may contain (from Lambda functions, HTTP APIs, DynamoDB tables and log groups). The APM project's grants must name exactly those stacks and that region, and the project's execution role must exist before the first deployment. In `rationale`, quote the stakeholder's decision and the cost limit they accepted. Never record credentials or account secrets.
