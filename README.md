# MDLM Process Packages

The process guides agents from stakeholder intent through prototypes, requirements,
verification and maintained products. Every required behavior should have a purpose,
trace to stakeholder needs and have evidence that it works.

This repository releases declarative packages independently of the
[MDLM kernel](https://github.com/taylorrowser/mdlm). The kernel validates lifecycle
transactions; the selected package defines lifecycle data, available work and
agent guidance. Each product retains its exact selected package and history.

## Start here

- **Contribute in Codex cloud:** [CONTRIBUTING.md](CONTRIBUTING.md) has setup,
  validation, the change workflow and next work.
- **Use a process:** [iterative](iterative/README.md) supports prototype-to-formal
  work; [exploratory](exploratory/README.md) and [tiny](process/README.md) describe
  the smaller packages. [catalog.json](catalog.json) maps their directories.
- **Upgrade a product:** read [release notes](RELEASE-NOTES.md) and the selected
  package's upgrade instructions. Installing a new kernel does not select a new
  process for an existing product.

Run `npm pack` to create the data distribution. Install an exact Git commit or
packed tarball alongside the kernel. [PROVENANCE.json](PROVENANCE.json) identifies
the original source history.
