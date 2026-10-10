# Contributing in Codex cloud

## Prepare a checkout

Connect this private repository and the [kernel repository](https://github.com/taylorrowser/mdlm)
to the cloud environment. Follow the kernel's [cloud setup instructions](https://github.com/taylorrowser/mdlm/blob/main/docs/CLOUD-DEVELOPMENT.md) and the
[Codex cloud environment guide](https://learn.chatgpt.com/docs/environments/cloud-environments).
Repository access must cover both repositories because the kernel installs a pinned
private Process Package dependency. Keep credentials in the environment's credential
configuration, outside source, logs and evidence.

The process repository contains data and needs no dependency install or build.
The kernel needs its documented Node version and `scripts/cloud-setup.sh`, which
installs dependencies, builds and checks the CLI. Use that script in the environment
install script. A repository refresh does
not rerun that script or its start skill. After a dependency change, rerun the
install and build steps before checking the new source.

Set these paths to the actual cloud checkouts. They need not be siblings:

```sh
export MDLM_PROCESS="$PWD"
export MDLM_KERNEL=/path/to/mdlm
```

No EC2 path, local message-board installation, persistent worker or running demo
is required. Track the current task in GitHub. An independent review can happen in
a separate cloud task or PR review with the relevant context and exact candidate.

## Make and check a change

1. Find or create a scoped GitHub issue. Record ownership there, branch from current
   `origin/main`, and leave other agents' branches and PRs alone.
2. Read the affected package README and [learning rules](PROCESS-LEARNINGS.md).
   For requirements work, read its `skills/typed-requirements.md` and
   `skills/product-quality.md`. Keep one obligation per requirement, justify
   allocation and refinement, and review each decomposition against its own parent.
3. Edit the owning prompt, skill or declaration. Keep installed product copies
   unchanged. Record new process behavior with a focused check in the kernel if
   the change needs one; this repository has no test runner of its own.
4. Validate with an explicitly chosen kernel and retain both source identities:

```sh
git -C "$MDLM_KERNEL" rev-parse HEAD
git -C "$MDLM_KERNEL" status --short
git -C "$MDLM_PROCESS" rev-parse HEAD
git -C "$MDLM_PROCESS" status --short
node "$MDLM_KERNEL/dist/mdlm.js" --version
node "$MDLM_KERNEL/dist/mdlm.js" process validate --ref "$MDLM_PROCESS/process" --json
node "$MDLM_KERNEL/dist/mdlm.js" process validate --ref "$MDLM_PROCESS/exploratory" --json
node "$MDLM_KERNEL/dist/mdlm.js" process validate --ref "$MDLM_PROCESS/iterative" --json
npm --prefix "$MDLM_PROCESS" pack --dry-run --json
```

Save the full validation outputs, including the package identity and digest. Build
the kernel from the recorded source before these commands. A dirty checkout is a
candidate with a diff, not evidence for its HEAD alone. A clean committed candidate
makes later reproduction simpler. Validation checks the declared structure and
kernel capabilities; it does not establish instruction quality or product behavior.

For a behavior change, use a fresh scratch lifecycle with the exact candidate
package instead of the kernel's bundled default:

```sh
MDLM_TRIAL_ROOT=$(mktemp -d)
node "$MDLM_KERNEL/dist/mdlm.js" init "$MDLM_TRIAL_ROOT/lifecycle" --package "$MDLM_PROCESS/iterative" --json
cd "$MDLM_TRIAL_ROOT/lifecycle"
node "$MDLM_KERNEL/dist/mdlm.js" process show --json
node "$MDLM_KERNEL/dist/mdlm.js" expectations --json
```

Continue through the kernel's [operator guide](https://github.com/taylorrowser/mdlm/blob/main/operator/MDLM.md)
for the issue's learning question. Save the initial candidate, ordinary independent
reviews, failures and corrections. Keep verification expectations grounded in the
requirements and public contracts before exposing implementation details. Docker
execution is a separate environment capability; confirm it before promising a
runtime demonstration. Initialization and validation alone are not a full run.

5. Open a PR with the issue, final behavior, exact kernel and process identities,
   checks and observed limitations. Obtain an independent review. For a runtime
   claim, preserve its committed product and verifier, lifecycle history and
   results in durable storage, with locators in the handoff. A cloud workspace path
   alone is not a transferable evidence location.

## Versions and existing products

Kernel and Process Package versions advance separately. A docs-only contributor
change needs no process version bump. A released change to package content must
update its affected manifest and distribution version and release notes according
to the existing version references. Notes explain changed expectations, product
impact, compatibility limits and the exact kernel used in qualification.

Installing a newer distribution or kernel leaves an existing product's selected
package unchanged. Test an upgrade on a preserved copy of the lifecycle history:

```sh
# Run from the preserved lifecycle copy. Use a new output and operation ID.
MDLM_UPGRADE_DIR=$(mktemp -d)
node "$MDLM_KERNEL/dist/mdlm.js" upgrade preview "$MDLM_PROCESS/iterative" --json > "$MDLM_UPGRADE_DIR/preview.json"
node "$MDLM_KERNEL/dist/mdlm.js" upgrade apply "$MDLM_UPGRADE_DIR/preview.json" unique-upgrade-operation --json
node "$MDLM_KERNEL/dist/mdlm.js" upgrade settlement unique-upgrade-operation --json
node "$MDLM_KERNEL/dist/mdlm.js" expectations --json
```

Inspect the preview and its notes before apply. Confirm history, original package
copies and applicable reviews remain intact, then address newly exposed work.
Recover an uncertain apply through settlement before any further mutation. A
changed target or lifecycle requires a fresh preview. Compatible upgrade support
has a checked contract boundary; a version number or similarity of wording does
not establish compatibility. Preserve the original failed attempt when correcting
an upgrade problem.

## Next work

- Reproduce a complete fresh lifecycle in the prepared cloud environment and save
  a portable handoff, including independent verification and review.
- Exercise the current dated-budget maintenance change in Energy Desk after its
  accepted baseline and evidence are available in durable storage. Keep the
  original run identities; follow its handoff rather than restarting from memory.
- Test an external meter interface and then an implementation in another language
  against the same required behavior. Inspect allocation, decomposition and
  evidence sufficiency as complexity increases.
- Qualify package updates against preserved in-progress and accepted histories.
  Check which work becomes due and whether unaffected evidence stays applicable.

Choose one bounded issue and learning question at a time. Record findings in the
owning issue and improve the relevant process instruction when actual use shows a
problem. Use [open issues](https://github.com/taylorrowser/mdlm-process-package/issues)
and [open PRs](https://github.com/taylorrowser/mdlm-process-package/pulls) for current
ownership and ordering.
