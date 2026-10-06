---
id: source-trace
version: 11
skills: []
---

# Attribute committed source

Declare file_roles for every committed product entry. Production, build and configuration files are attributed to exact selected software requirements. Attribute behavior code, launchers, runtime manifests and build files to the exact selected implementation-ready software leaves at their justified depth, including fully settled allocated system-role leaves. Apply the sufficient-contract and stopping rules in typed-requirements; attribution cannot justify an underspecified leaf or an artificial HLR/LLR copy. Documentation is nonexecutable prose. Verification source belongs to its separate VFY repository and is not part of this inventory.

Use source_ranges for language-neutral attribution. Each entry contains path, name, start, end and requirements, a nonempty list of stable requirement IDs. Ranges are inclusive physical line numbers. Within each file, give every range a distinct name and keep inclusive ranges disjoint. When several requirements share code, put them in one range's requirements list; after splitting a range, give each piece its own descriptive name. Give every nonblank production, build and configuration source line a clear responsibility; several ranges may support one requirement and one range may support several requirements. The CLI binds stable IDs to exact revisions in the selected RQS, checks coverage and generates source inventory and SCP data. Python source may retain supported closed comment regions when source_ranges is omitted. Do not mix representations ambiguously.

When a selected software leaf requires documentation, keep the file's documentation role and supply explicit source_ranges for the prose that fulfills it. These ranges generate documentation SCPs with normal implements links to the exact selected leaf revisions. Documentation must have a supported prose filename, nonexecutable Git mode and no shebang. Other prose may remain outside ranges; documentation without ranges remains in the inventory. Every selected software leaf still needs an implements scope, and every nonblank executable source line still needs attribution.

Before calculating ranges, inspect numbered source from the exact committed revision.
For example, use `git show <source_commit>:<path> | nl -ba`.
Do not infer line numbers from memory or a working tree that may differ from the commit.

Use meaningful responsibilities instead of one blanket file annotation when the
code implements distinct obligations. Review both directions: every production
responsibility has a justified purpose, and every implementation obligation has
code. In existing review rationale, distinguish mandatory behavior from justified
implementation support and permitted choices. For mandatory behavior, cite the
owning REQ and any incorporated ICD clause. For support such as startup logging,
temporary-file cleanup or repository configuration, explain which obligation it
helps realize without claiming its particular mechanism is required. Different
mechanisms may satisfy the same contract. Remove unrelated behavior or resolve a
missing product decision through the normal requirement route; do not manufacture
a requirement per helper or line. Keep the existing leaf links for attribution.
They explain purpose, not independent verification. Independent activities link
cases to requirements without needing source regions.

For partial acceptance, explicitly name formal_files and acceptance_scope partial. The selected product files must implement the claim exercised by independent verification. Provisional files remain visible in inventory but are not formally accepted. Whole-product acceptance requires the complete supported production inventory. Every new source commit needs its own applicable execution evidence.

For an approved change, use exact selected requirements and generated source scopes to inspect affected responsibilities. Preserve unchanged requirements and explain source impact dispositions. A verification plan can remain unchanged when its public contract and requirements remain valid, but a different product commit still needs fresh execution. Review actual evidence rather than presuming that unchanged code or a historical pass accepts new source.
