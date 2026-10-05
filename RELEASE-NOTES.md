# 2.5.23

This first independent distribution extracts the unchanged Process Package roots from kernel source b3a60cbb6e5d1837b47dbf6af7c9afd602cee436. It contains mdlm-tiny@1.0.1, mdlm-exploratory@1.0.0 and mdlm-iterative@2.5.23. Every root keeps its original relative paths and exact bytes, so its selected-package digest stays unchanged.

Existing products keep their installed package copies. Installing this distribution does not change product selection or add loose ends. Existing-product package adoption remains unsupported by these unchanged fresh-only manifests.

The tested counterpart is recorded in the kernel split evidence. Required contracts remain mdlm-direct@1, mdlm-expression@1 and the kernel capabilities in each manifest. The historical minimum_kernel field is metadata and does not prove compatibility with independently numbered kernels.

Install an exact private Git commit with npm, or install the packed data tarball. Kernel 0.1.0 resolves catalog.json to select its existing tiny, exploratory and iterative alternatives. Release notes and provenance live outside the digest roots.
