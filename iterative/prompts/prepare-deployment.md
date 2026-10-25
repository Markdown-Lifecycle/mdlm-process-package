---
id: prepare-deployment
version: 1
skills:
- skills/product-quality.md@9
- skills/source-trace.md@11
- skills/design-criteria.md@1
- skills/aws-deployment.md@1
---

# Prepare the product for its deployment target

The stakeholder recorded a deployment target, so this product ships to AWS. Revise the exact IMP with a new product commit that adds the CDK app at the target's `cdk_app_path` and the version endpoint at its `probe_path`, following the aws-deployment skill, and changes nothing else in the product's behaviour. Keep the same requirement set, attribute the CDK app and the version endpoint as build and configuration source (source-trace), and preserve the verification selection. Before publishing, synthesize the app locally in the target's synth image with the kernel's container settings and confirm the template holds only the allowed resources. A new product commit needs the endgame's dry runs and a new for-credit pass like any other product change.
