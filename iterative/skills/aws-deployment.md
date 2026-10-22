---
id: aws-deployment
version: 1
---

# AWS CDK products and endpoint verifiers

Apply this only to a product that ships to AWS through `deploy-product` (kernel
ADR-0009). Everything else keeps the default `--network none` runtime.

## The CDK app

The product commit carries a TypeScript CDK app in `infra/` (the package's
`cdk_app_path`). It is ordinary product source, reviewed like code. The kernel runs
`cdk synth` in `infra/` inside the pinned synth image, with no network and no
credentials, and refuses the assembly unless it holds one stack named for the slot.

- **Dependencies come from the synth image.** Commit no `node_modules`; the image
  provides `aws-cdk-lib`, `constructs`, the CDK CLI and esbuild at `/node_modules`,
  which Node resolves from `/product/infra`. Write the app as `infra/app.ts`, with
  `infra/package.json` declaring `"type": "module"` and `infra/cdk.json` setting
  `"app": "node app.ts"` (Node 24 strips the types) and `"versionReporting": false`,
  so the template has no `AWS::CDK::Metadata` resource.
- **Stack and synthesizer.** Name the one stack and its `stackName` from
  `MDLM_STACK_NAME`, set `env: {region: process.env.CDK_DEFAULT_REGION}` with no
  account, and use `new CliCredentialsStackSynthesizer()`. The default synthesizer
  assumes bootstrap roles, which the APM profile cannot do.
- **Imported role.** The stack creates no IAM resources. Import the Lambda execution
  role registered for the APM project with
  `Role.fromRoleName(stack, 'ExecutionRole', <name>, {mutable: false})`, taking the
  name from `cdk.json` context. Grants such as `table.grantReadWriteData(fn)` change
  nothing on an immutable role; the role's own policy must already allow the
  product's tables and log groups.
- **Allowed resources only.** Use Lambda, an API Gateway v2 HTTP API, on-demand
  DynamoDB and CloudWatch log groups. Add no custom resources, so no `logRetention`
  property, no `autoDeleteObjects` and no S3 buckets. Give each function an explicit
  `LogGroup` with `RetentionDays.ONE_DAY`, passed as its `logGroup`, because Lambda's
  implicit log group sits outside the stack and survives teardown. Set
  `reservedConcurrentExecutions` to 10 or less and stage throttling on the HTTP API
  (`defaultRouteSettings` on the default `CfnStage`). Prefer `Code.fromAsset` of
  committed, dependency-free JavaScript; if you bundle with `NodejsFunction`, rely
  on the image's esbuild and a committed lockfile, never Docker bundling.
- **DESTROY.** Give every stateful resource (tables, log groups)
  `removalPolicy: RemovalPolicy.DESTROY`, so teardown leaves nothing behind.
- **Tags.** Do not set `mdlm:*` tags yourself. The kernel applies
  `mdlm:repository`, `mdlm:deployment`, `mdlm:mode` and `mdlm:expires-at` as stack
  tags at deploy time, and CloudFormation propagates them to taggable resources.
- **Outputs.** Output the endpoint as `ApiEndpoint`, the package's only allowlisted
  output. Output no secrets; the kernel records only allowlisted outputs.
- **Version endpoint.** Pass `MDLM_PRODUCT_COMMIT` from synth into the function's
  environment and serve `GET /version` from the product's own function with status
  200 and a body containing that commit, for example `{"version": "<commit>"}`. The
  kernel probes it after deploying and before and after every networked run; a
  mismatch is an environment `error`.

A minimal `infra/app.ts` that follows these rules and passes the kernel's assembly
check (the function's code is committed JavaScript in `lambda/`):

```ts
import {App, CfnOutput, CliCredentialsStackSynthesizer, Duration, RemovalPolicy, Stack} from 'aws-cdk-lib';
import {CfnStage, HttpApi, HttpMethod} from 'aws-cdk-lib/aws-apigatewayv2';
import {HttpLambdaIntegration} from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import {AttributeType, BillingMode, Table} from 'aws-cdk-lib/aws-dynamodb';
import {Role} from 'aws-cdk-lib/aws-iam';
import {Architecture, Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';
import {LogGroup, RetentionDays} from 'aws-cdk-lib/aws-logs';

const commit = process.env.MDLM_PRODUCT_COMMIT, stackName = process.env.MDLM_STACK_NAME;
if (!commit || !stackName) throw new Error('MDLM_PRODUCT_COMMIT and MDLM_STACK_NAME are required');
const app = new App();
const stack = new Stack(app, stackName, {stackName, synthesizer: new CliCredentialsStackSynthesizer(), env: {region: process.env.CDK_DEFAULT_REGION}});
const role = Role.fromRoleName(stack, 'ExecutionRole', app.node.tryGetContext('executionRoleName'), {mutable: false});
const table = new Table(stack, 'Links', {partitionKey: {name: 'pk', type: AttributeType.STRING}, billingMode: BillingMode.PAY_PER_REQUEST, removalPolicy: RemovalPolicy.DESTROY});
const logGroup = new LogGroup(stack, 'Logs', {retention: RetentionDays.ONE_DAY, removalPolicy: RemovalPolicy.DESTROY});
const fn = new LambdaFunction(stack, 'Api', {runtime: Runtime.NODEJS_22_X, architecture: Architecture.ARM_64, memorySize: 256, timeout: Duration.seconds(10),
  code: Code.fromAsset('../lambda'), handler: 'index.handler', role, logGroup, reservedConcurrentExecutions: 10,
  environment: {PRODUCT_COMMIT: commit, TABLE_NAME: table.tableName}});
const api = new HttpApi(stack, 'Http');
api.addRoutes({path: '/{proxy+}', methods: [HttpMethod.ANY], integration: new HttpLambdaIntegration('Proxy', fn)});
(api.defaultStage!.node.defaultChild as CfnStage).defaultRouteSettings = {throttlingBurstLimit: 20, throttlingRateLimit: 10};
new CfnOutput(stack, 'ApiEndpoint', {value: api.apiEndpoint});
```

Before the first deployment, synthesize locally with the same container settings
the kernel uses and check that the template lists only the allowed types, plus the
untaggable children (stage, route, integration, Lambda permission) of the HTTP API
and function.

## The demo's synth image

`deploy-product` pins `mdlm-cdk-synth@sha256:f01976be62ae0ed21d0d33b3311b875da709f779c727aa49301cd0b9b3459606`,
built on the operator's machine from this recipe:

```dockerfile
FROM node:24-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205
WORKDIR /opt/cdk
RUN npm init -y >/dev/null \
 && npm install --no-fund --no-audit --save-exact \
      aws-cdk@2.1146.0 aws-cdk-lib@2.204.0 constructs@10.8.1 esbuild@0.28.2 \
 && npm cache clean --force && rm -rf /root/.npm \
 && ln -s /opt/cdk/node_modules /node_modules
ENV PATH=/opt/cdk/node_modules/.bin:$PATH CDK_DISABLE_VERSION_CHECK=1
WORKDIR /
```

Build it with `docker build -t mdlm-cdk-synth:2.1146.0 .` and read the pin from
`docker image inspect mdlm-cdk-synth:2.1146.0 --format '{{index .RepoDigests 0}}'`.
The build is not reproducible, so a rebuild on another machine has another digest:
publish the image to a registry or change the pin in a package release, never by
hand in one lifecycle. `aws-cdk-lib` stays at 2.204.0 because from 2.206.0 on it
writes a `cdk:feature-flag-report` artifact that the kernel's assembly check
refuses (kernel issue 1146). The host CDK CLI must be exactly `aws-cdk@2.1146.0`.

## Endpoint verifiers

A verification activity that links `verified-against` a DPL runs on a network whose
only route out is a kernel proxy to that deployment's endpoint, for at most 300
seconds, with no AWS credentials.

- **Reach the endpoint through the proxy.** Read the base URL from `MDLM_ENDPOINT`;
  never hard-code or author it. The kernel sets `HTTPS_PROXY`. Run Node verifiers
  with `node --use-env-proxy`, because Node's `fetch` otherwise ignores the proxy and
  has no route; `curl` honours `HTTPS_PROXY` by default.
- **Run-scoped data.** Namespace everything the verifier creates with
  `MDLM_RUN_ID`, unique per execution, for example as a key prefix or in names. Never
  read, count or depend on data that another activity, run or dry run created, and
  never assume an empty table: dry-run slots are shared. Each for-credit deployment
  starts empty, but other activities in the same pass write to it.
- **Environment `error`, product `fail`.** Record a case as `fail` when the
  product, or the gateway in front of it, answered and the answer contradicts the
  requirement, including a crash or timeout of the product's function. Record
  `error`, with the reason, only when the case could not observe the product: a
  connection refused, reset or timed out before any answer, a proxy refusal, or the
  stage's own throttling response (`429`). The kernel turns a version probe mismatch before
  or after the run into `error`. It does not yet detect a stack update that keeps
  the same commit, so nobody changes the deployment during a pass. Never retry a case until
  it passes; any bounded retry after `429` is part of the declared method and is
  reported.
- **Stay inside the limits.** Keep concurrent requests at or below the function's
  reserved concurrency and the stage throttle, and size the cases to finish well
  inside 300 seconds, including cold starts.

## Declaring product paths

`mdlm execution dry-run` reruns an activity only when its inputs changed. A VFY may
declare `product_paths`, a nonempty list of globs relative to the product root,
such as `["lambda/api/**", "infra/**", "package.json"]`, naming every product file
the activity depends on. Verification authors never read product source, so take
the paths only from what the verification context gives you, such as an interface
or requirement that names the product's layout; otherwise omit the field and the
dry run keys on the whole product (kernel issue 1140). List shared files such as
manifests, lockfiles and the CDK app explicitly. Only dry runs use the field: a
change outside the paths keeps the activity's cached dry-run result, while
`execution run` and the for-credit pass still run every selected activity. A
too-narrow list can only hide a regression from dry runs, never from the
for-credit pass.
