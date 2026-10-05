# 2.5.24

This distribution changes only the iterative package to mdlm-iterative@2.5.24. Its manifest now permits explicit compatible adoption, and its README explains preview/apply/settlement. Types, actions, selectors, prompts, contracts and kernel capability bindings are unchanged. Tiny1.0.1 and exploratory1.0.0 retain exact bytes and digests.

The selected source for this guidance-only qualification is mdlm-iterative@2.5.23. The runtime does not enforce a source-version allowlist; it checks same-family contracts, capabilities and target-schema compatibility. Existing products keep their selected package until an explicit upgrade applies. Historical package copies, lifecycle data and review evidence remain preserved. This release adds no obligation or artificial loose end; target expectations determine current work without blanket reverification.

The required kernel includes the actual upgrade preview/apply/settlement operation introduced under kernel issue1058. Kernel0.1.0 numbering alone does not establish that operation is installed. Exact tested kernel source and artifact identity remain pending integration qualification. This candidate does not claim qualification or live-product upgrade success. The historical minimum_kernel manifest field remains descriptive metadata; concrete unchanged contracts/capabilities and existing target-schema validation govern compatible adoption.

Read iterative/README.md for the commands. Read the target preview and these notes before applying. Stale previews or incompatible targets require refusal, not an in-place package edit.

# 2.5.23

This first independent distribution extracts the unchanged Process Package roots from kernel source b3a60cbb6e5d1837b47dbf6af7c9afd602cee436. It contains mdlm-tiny@1.0.1, mdlm-exploratory@1.0.0 and mdlm-iterative@2.5.23. Every root keeps its original relative paths and exact bytes, so its selected-package digest stays unchanged.

Existing products keep their installed package copies. Installing this distribution does not change product selection or add loose ends. Existing-product package adoption remains unsupported by these unchanged fresh-only manifests.

The tested counterpart is recorded in the kernel split evidence. Required contracts remain mdlm-direct@1, mdlm-expression@1 and the kernel capabilities in each manifest. The historical minimum_kernel field is metadata and does not prove compatibility with independently numbered kernels.

Install an exact private Git commit with npm, or install the packed data tarball. Kernel 0.1.0 resolves catalog.json to select its existing tiny, exploratory and iterative alternatives. Release notes and provenance live outside the digest roots.
