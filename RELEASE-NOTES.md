# Unreleased: Dry runs before one for-credit pass, a finding ledger and stakeholder checkpoints

New shared skill `skills/endgame.md` sets the order that ends formal work: dry runs of the activities a change could affect, class-wide pre-review with runtime replays, a full dry run with a mechanically parsed result, one for-credit pass on a single frozen version, implementation review, then acceptance. Dry runs publish no RES. They use `mdlm execution dry-run` when the kernel offers it (kernel issue 1111) and otherwise invoke the committed verifier directly with the activity's command and environment. An activity is affected when the change touches its verifier, exercised source, shared mechanism, requirements or runtime, or when impact is uncertain. Pre-review inventories every caller of each touched shared mechanism and replays each finding's reproducer, both orders of racing responses and neighbouring behaviour. A result is clean only when a script counts every selected case as passed; a summary never decides. The for-credit pass freezes the product commit, verifier commit, VFY revisions and environment, and runs every selected activity once.

`skills/review-policy.md` adds a finding ledger (ID `F-n`, reporting revision, severity class, blocking status, disposition, causal commit and fixing commit), a stakeholder checkpoint after every review with severity classes credential or privacy, wrong saved value, data loss, small display and other, and the terminal state "stopped with findings, informal verdict", recorded with the open ledger rows and an optional OPU, never an accepting ACC. A stakeholder stopping rule applies only to the classes it names.

Replaced text: `correct-product` and `correct-implementation-after-review` "Run those activities on the new source and obtain fresh implementation review" now dry-runs affected activities and follows the endgame to one for-credit pass. `review-implementation` findings carry a severity class. `accept-product` follows a passing review of the frozen version and excludes the stopped state.

Skill versions: endgame 1 (new), review-policy 3. Prompt versions: accept-product 7, correct-implementation-after-review 39, correct-product 38, correct-requirements-after-review 32, correct-requirements-review 10, execute-verification 7, implement-product 38, plan-verification 34, review-implementation 42, review-requirements 38, review-verification 13; every action that uses them advances by one. There are no schema, capability, selector or kernel changes. Existing products keep their selected package. Evidence: the Ledger, Tracker and Clinic large runs; see PROCESS-LEARNINGS.

# 2.5.47: Design decisions, provisional requirements and a walking skeleton

New shared skill `skills/design-criteria.md` splits each statement into its outcome, which stays a requirement, and its mechanism, which becomes a design decision (`DC-n` in the owning REQ body) when a first-match test finds no stakeholder source, outside contract or never-demote consequence. Design decisions get one review pass, no verification activity of their own and nonblocking findings unless they endanger a requirement; acceptance lists them as "decided by the team". The protected outcome is the requirement and the mechanism protecting it is a design decision: authors choose the simplest mechanism that holds the outcome and add rollback, queues, order stamps, polling or retries only for a demonstrated failure. Unknown stakeholder answers are provisional requirements (`Open P-n`) closed before their branch is elaborated. Reviewers reclassify with `needs-change` and rationale `reclassify: …`; after two failed rounds the root-cause decision checks the item's tier first. Every prompt that loads `product-quality` or `review-policy` also loads the new skill.

`draft-requirements` adds two operating-profile items. Item (5) asks which failures saved data must survive (process crash or kill, OS crash, power loss; process crash or kill recommended) and stops a derived obligation's wording from raising it. Item (6) adds a default for everything else, beside the unchanged protected outcomes for input outside the profile. Rejections give a clear reason with codes and wording left as design decisions, and status stays truthful. Races inside a window the user was already warned about get only the protected outcomes (no crash, no corruption, a late change never overwrites a newer one, status never claims success for an unconfirmed change, later valid input still works). Text, date and size edge cases outside ordinary use are the author's stated limits, not stakeholder questions. Roots stay at stakeholder granularity: independent stakeholder outcomes get separate roots, but finer detail of one outcome is split at the software level; requirements review no longer asks for a coherent root to be split for finer detail, for durability above the profile's level, or for stakeholder questions on stated edge-case limits. After the roots pass, the author builds and runs a thin walking skeleton before elaborating software groups. No provisional requirement in the selected formal scope may remain open at its first IMP.

Replaced text: `elaborate-requirements` "Write the children using the typed-requirements skill" now also classifies outcome and mechanism; `review-policy`'s two-round rule gains the tier check and a narrow-the-claim route for a second verification decision on the same activity; `verification-checks`' integration bullet now defaults browser and integration UI claims to stable checkpoints and a new bullet exempts DC-n decisions (not EXP criteria) from their own verification. `design-criteria` overrides product-quality's "another component depends on it" clause and typed-requirements' timing-chain checks for internal allocations; the parent's end-to-end bound stays normative.

Skill versions: design-criteria 1 (new), review-policy 2, verification-checks 2. Prompt versions: accept-product 6, amend-change 11, approve-change 11, correct-expectations 29, correct-implementation-after-review 38, correct-product 37, correct-requirements-after-review 31, correct-requirements-review 9, draft-requirements 33, elaborate-requirements 5, implement-product 37, plan-verification 33, rebind-product 38, refine-requirements 25, request-change 16, review-implementation 41, review-requirements 37, review-verification 12, revise-requirements 39; every action that uses them advances by one. There are no schema, capability, selector or kernel changes. Existing products keep their selected package. Evidence: the Markdown Editor pilot (2.5.91) against a 2.5.46 control; see PROCESS-LEARNINGS. Qualified with kernel `62e3a613`.

# 2.5.46: Shared verification check rules

New shared skill `skills/verification-checks.md`, loaded by `plan-verification` and `review-verification`, holds five rules the Plant Pulse treatment run had to invent mid-run. Timing: every event time is an interval from its earliest to its latest possible instant; a deadline check passes only if the whole interval is admissible, fails only if it is wholly inadmissible, and otherwise reports `error`. Visibility and presence use the test framework's or platform's own semantics, only on elements the requirements constrain. Integration activities claim outcomes at stable checkpoints only; continuous between-checkpoint preservation belongs to named component activities. The author dry-runs each activity against the real product, or a reference build, before adequacy review, and an oracle that can never pass a correct product is a defect. After the first IMP, `mdlm verification status` finds leaves no activity scopes. Adequacy review judges oracles against these rules, does not ask for stricter checks, and marks an activity with no recorded dry run `needs-change`.

Prompt versions: plan-verification 32 (plan-verification, plan-criterion-verification and revise-verification actions 29, correct-verification-after-review 17) and review-verification 11 (action 8). There are no schema, capability, selector or kernel changes. Existing products keep their selected package. Evidence: Plant Pulse treatment friction F14–F18; see PROCESS-LEARNINGS. Qualified with kernel `0452bdcf`.

# 2.5.45: Bound requirements scope with an operating profile and one review policy

`draft-requirements` now agrees an operating profile with the stakeholder before drafting: who supplies and consumes each boundary, which faults matter, which platform components are trusted as given, and which numbers the stakeholder cares about. Roots use the stakeholder's terms with no interface clauses, protocol detail or unstated numbers. Obligations the stakeholder did not ask for are listed as derived obligations, and the stakeholder confirms the roots and approves or declines each derived obligation before review. ICDs are no longer recorded with the roots; `elaborate-requirements` records each one with the group that first needs it. `record-interface` and `revise-interface` replace "refuse everything outside it with one general rule" with: define the named callers' traffic, trust the platform parsers' documented behaviour, and for any other input guarantee only the protected outcomes (no crash; no bad, old or unreadable value shown or acted on as current; later valid input still works). A value that passes every application check is good whatever message carried it, and raw input size or shape is not constrained beyond the trusted parser. `product-quality` drops the "one general refusal" rule for internal interfaces in the same way, and `correct-requirements-after-review` narrows an unreachable case to the profile's protected outcomes instead of "so the case is refused". Requirements review checks root sources and these interface limits.

New shared skill `skills/review-policy.md` holds the severity, single-pass and two-round root-cause rules. Requirements, verification and implementation review load it, as do their correction prompts and `plan-verification`. It replaces product-quality's "a demonstrated violation ... is blocking however unusual the input" paragraph. Verification adequacy review previously loaded no skill; its blocking test is now that the method would accept a defective product, or reject a valid one, within the operating profile and stated requirements. `plan-verification` adds one generated robustness activity per interface whose consumer must survive unusual input, as containment evidence sized to a small fixed budget.

Prompt versions: draft-requirements 32, elaborate-requirements 4, record-interface 6, revise-interface 7, review-requirements 36, review-verification 10, review-implementation 40, plan-verification 31, correct-requirements-review 8, correct-requirements-after-review 30, correct-implementation-after-review 37, and every other prompt that loads product-quality, now 9. Their actions advance with them. There are no schema, capability, selector or kernel changes. Existing products keep their selected package. Evidence: the Plant Pulse experiment, where a treatment package with these changes cut time to acceptance from 5 h 39 to 3 h 04 and implementation review passed first time instead of failing five times; see PROCESS-LEARNINGS. Qualified with kernel `0452bdcf`.

# 2.5.44: Retarget unchanged requirements to a revised interface

A requirement set can now adopt a newer revision of an interface agreement in one declared step. The RQS candidate adds `retargets-interface` to the exact ICD revision. Every selected requirement bound to an older revision of that agreement then uses the named revision, without a new requirement or group revision, and later sets keep the retarget. Requirements review assesses each retargeted requirement again under the new clauses; the review context lists them in `interfaceRetargets`. Requirement revisions keep their predecessor's interface bindings. Verification activities whose targets are unchanged stay valid and selectable, so a retarget alone needs no activity revision. typed-requirements no longer tells authors to revise requirements only because a cited clause changed.

RQS type 4 adds the link. New selector `interface-retargets-for@1`; `selected-interfaces@2` includes retargeted revisions; `reusable-requirements-review@2` and `accepted-formal-scope@2` reuse a review only when retargets also match. typed-requirements 24 and every prompt and action that loads it, plus refine-requirements, revise-requirements, revise-interface, review-requirements, rebind-product and plan-verification guidance, advance with their actions. The package declares `interface-retarget@1`, which requires the kernel change in Markdown-Lifecycle/mdlm-kernel#1097; older kernels reject the package. Compatible upgrade may add the capability, because it changes nothing until a set declares a retarget. A requirement that binds a newer revision than its set's retarget is rejected until the set retargets that revision too, so each retargeted agreement keeps one selected revision. Existing products keep their selected package. Evidence: staged Watt Watch RQS r00019, where one changed clause forced 10 requirement, 6 group and 3 activity revisions; see PROCESS-LEARNINGS.
# 2.5.43: Per-group verification keeps its authoring set

Per-group verification no longer rebinds activities to the current RQS before publication. An activity keeps the set its verification author exported as `authoring_subject` and `authoring_context` while later groups are elaborated. The kernel accepts an earlier revision of the current set while every targeted requirement revision and the interfaces it uses are still selected unchanged, and names the changed target otherwise; only then is a re-export needed. This requires the kernel change in Markdown-Lifecycle/mdlm-kernel#1094; older kernels still require the current set and the rebind steps from 2.5.41 and 2.5.42.

Prompt versions: plan-verification 29 (plan-verification, plan-criterion-verification and revise-verification actions 26, correct-verification-after-review 14) and elaborate-requirements 2 (action 2). There are no schema, capability or selector changes. Evidence: staged Watt Watch run, friction F5/F6, where an activity authored from RQS r00005 was rejected at r00012 although its targets were byte-identical.

# 2.5.42: Bounded interface inputs and joint satisfiability in requirements review

Requirements review now checks that every input dimension of an incorporated interface (sizes, counts, lengths, rates, durations, optional parts such as a request body) is bounded or explicitly declared unbounded with a rationale. A universal clause such as "refuse every request that is not X" is `needs-change` unless X is fully settled. Review also checks that the interface clauses and requirements a group relies on can all hold together for every input, including timing against validation, and gives a concrete counterexample input when they cannot. `record-interface`, `revise-interface` and `draft-requirements` ask authors for the same bounds and the same joint check.

Prompt versions: review-requirements 34, draft-requirements 30, record-interface 5, revise-interface 5, with their actions bumped. There are no schema, capability, selector or kernel changes. Existing products keep their selected package. Evidence: both Watt Watch runs lost their late time to implementation reviews on HTTP request edge cases; see PROCESS-LEARNINGS. This change alone does not show fewer implementation-review rounds.

# 2.5.41: Historical results from earlier selection-only revisions

Execution guidance lets `evidence.historicalResult` name the original execution RES on any earlier revision of the same IMP lineage, as long as every later revision changed verification selection only. This applies when one activity is revised several times: unchanged siblings keep pointing at their original run instead of being re-run every second round. It requires the kernel change in Markdown-Lifecycle/mdlm-kernel#1090; older kernels still accept only the immediate predecessor. A historical RES still can't serve as the original, and source reverts and cross-package reuse stay unsupported.

The shared execution prompt advances to 6, and both execution actions are bumped. There are no schema, capability or selector changes. Evidence: Watt Watch V1 re-ran unchanged activities across execution rounds 10–17 (kernel issue 947).

# 2.5.40: Staged requirements authoring and review

The iterative package now writes and reviews requirements in stages. `draft-requirements` publishes stakeholder roots and their ICDs. After a stage passes independent review, the new autonomous `elaborate-requirements` adds exactly one decomposition group, and the next review assesses only that group's new requirements. `implement-product` and `rebind-product` become available only once the graph is complete (`trace_complete`); elaboration ranks below implementation and reopens if refinement leaves the graph incomplete. Verification guidance starts activities per passed leaf group and asks authors to freeze or version the shared verifier library before activities fan out. `refine-requirements` keeps stakeholder authority for changed intent.

The package declares `staged-requirements@1` and the managed RQS field `trace_complete` (RQS type 3), and extends its capability-binding meta-schema with `action`. Kernels without that capability (Markdown-Lifecycle/mdlm-kernel#1088) reject this package. Compatible upgrade does not add the capability, so existing products stay on their selected package and only fresh lifecycles can use this version.

Prompt versions: draft-requirements 29, review-requirements 33, correct-requirements-after-review 28, plan-verification 28 (with its consuming actions), new elaborate-requirements 1. implement-product action 24 and rebind-product action 26 add the completeness gate. Evidence: Watt Watch V1's four whole-set requirements rounds; see PROCESS-LEARNINGS. Exact qualifying kernel and run evidence belong in the PR. This change alone does not show fewer review rounds.

# 2.5.39: Continue exploration after a closed prototype slice

Optional `continue-exploration` publishes a successor in the existing EXP lineage
after keep/drop or explicit stakeholder stop, before formal requirements. Ordinary
prototype preparation reopens for that exact successor; earlier observations and
results remain history. Its new criteria need independently authored verification.
Formalization remains optional. Existing closure and terminal semantics are unchanged.

Process issue 28 addresses a pre-formal continuation gap observed in Energy. This
adds one action, prompt and observation-context selector, with unchanged schemas, contracts and capabilities.
Compatible adoption must use preview/apply/settlement and preserve original packages
and provenance. Exact tested kernel and preserved-history upgrade evidence belong
in qualification; this source change alone is not live adoption or product evidence.

# 2.5.38: Contract-required preservation state

Verification authors compare all state the contract requires to remain unchanged,
including complete required record collections. Accurate changed notices and
unspecified metadata may vary. Existing complete-context meaning inspection and
positive/negative control rules still apply.

The shared planning prompt advances to 27, its three planning/revision actions
to 24 and correction-after-review to 12. This is class 6 application guidance
from Process Package issue 24 and the Repairdesk control retrospective124.
Existing review identified the overconstrained comparison and unsuitable positive
fixture; their correction does not show that this wording would have prevented
the first mistakes. Fresh later authoring and ordinary review must test that.

Existing products retain their selected package and evidence. This source
candidate is not qualification, live adoption or evidence of preventive effect.

# 2.5.37: Exact saved receipt inspection

Execution guidance distinguishes the complete saved receipt in an execution or
settlement response from exported streams, report and artifact files. Compare
exact receipt locators before relying on operation/latest exports for historical
inspection; preserve complete observations and artifact inspection.

The shared execution prompt advances to 5, formal execution action to 5 and
criterion execution action to 4. This is class 6 guidance from Process Package
issue 22. Kernel behavior, schemas, lifecycle obligations and review criteria
remain unchanged. Existing products retain their selected package and evidence;
this source candidate is not qualification, live adoption or demonstrated
retrieval effectiveness.

# 2.5.36: Current verification criteria and retained history

Verification authors write current shared criteria and predecessor reconciliation
once, explicitly retaining applicable criteria, assigned inspectors and evidence
sufficiency limits. Target coverage keeps its own obligations, cases and gaps.
Historical change accounts remain reachable through exact pinned predecessor
revisions and supporting evidence rather than full copied explanations.

The shared planning prompt advances to 26, its three planning/revision actions
to 23 and correction-after-review to 11. This is class 6 authoring guidance from
Process Package issue 20. Schemas, lifecycle obligations, source-free freeze,
independent judgment, exact evidence and review duties remain unchanged. Tiny
and exploratory retain their exact bytes. Existing products keep their selected
packages and published methods. This source candidate is not qualification,
live adoption or evidence of improved authoring; fresh operation must show that
current criteria remain complete while recursive historical prose stops growing.

# 2.5.35: Explicit historical verification applicability

Iterative opts in to verification-applicability@1 on the existing RES type. Ordinary independent-result proposals may explicitly name evidence.historicalResult from the immediate predecessor IMP; the kernel derives optional historical_observation provenance while retaining the original completed receipt and all evidence bytes/times. Only an unchanged selection-only successor and exact retained method qualify. Current independent review and stakeholder acceptance retain their authority, and the reviewer may require fresh execution.

At the original 2.5.35 release, fresh initialization was the demonstrated route and the earlier compatible-upgrade kernel rejected the added capability. The later route in [kernel 22bb1808327f14d20943ff5abcb3db6af3a93cbf](https://github.com/taylorrowser/mdlm/blob/22bb1808327f14d20943ff5abcb3db6af3a93cbf/README.md#upgrade-an-existing-direct-product), implemented under [MDLM #1075](https://github.com/taylorrowser/mdlm/issues/1075), was qualified on preserved 2.5.26 history with retained IMP/VFY and fresh 2.5.35 results. Adoption remains explicit: inspect the exact current preview and its complete required and optional expectations, then apply and settle. Completed acceptance needs no execution solely for package selection; pending product review needs fresh target-package results. Old-package observations retain their original bytes and times and cannot supply target-package historical evidence. Real Expense 2.5.31 migration and guidance effectiveness remain unproved.

Older kernels reject the new capability. This candidate needs a kernel implementing that contract, and existing products keep their selected package. No live adoption, execution receipt migration, cross-package reuse, longer reuse chain, source-revert support, automatic determinism or current-host-equivalence claim is included. Tiny and exploratory remain unchanged. Source checks and disposable CLI proof establish the bounded contract only; release qualification and live adoption are separate.

# 2.5.34: Discriminating validation witnesses

Add one syntax-versus-calendar-domain example beside the shared verification-author control rule. Separate validation duties need evidence that distinguishes their rejection causes; useful combined-invalid tests and requirements-derived expectations remain available.

The planning prompt advances to 25, its three planning/revision actions to 22 and correction-after-review to 10. This is class 6 application guidance from Expense F1, with no schema, reviewer rule or lifecycle gate change. Tiny and exploratory stay unchanged. Existing products retain their selected packages and historical evidence; this candidate is not adoption or evidence of preventive effectiveness.

# 2.5.33: Requirement specificity and decomposition guidance

Clarify system allocation versus software-item refinement and the expected
specificity and verification boundary of stakeholder, system, software high-level
and software low-level requirements. The existing architecture note remains
supplementary; required duties stay in requirements or exact incorporated ICD
clauses. The API/browser example makes each contribution and its limits explicit.
Authors and reviewers check both whole stakeholder-intent coverage and immediate
child sufficiency. Useful depth follows necessary behavior, without a tier quota.

This versions the independently reviewed content from
fb3c2944da729e46ecdabc7455f97bf1bb5cc982 on package source
07d8f2fd7969562e51d206f21cc046cc3b61b3dd. The shared typed-requirements skill advances
from 22 to 23; its twelve consuming prompts and thirteen actions advance
with matching references. Schemas, kernel capabilities, lifecycle obligations,
tiny and exploratory packages remain unchanged.

Existing products retain their selected package and historical evidence. This
candidate does not require cosmetic requirement reclassification or blanket
reverification. For separately authorized adoption, inspect the exact public
compatible-upgrade preview, including required and optional expectations, then
use apply and settlement. Installing a kernel alone does not select this package.

Focused source/package checks use installed kernel 0.1.1 at source
0eed478d963f62afba8424225ec1f476515af8e8. They establish package loading and resolved
author/reviewer guidance, not installed qualification, successful upgrade or
operational effectiveness. Fresh review of the complete versioned candidate,
exact release qualification and an explicit preserved-history upgrade remain
separate before making those claims. No live product is upgraded by preparation.

# 2.5.32: Verification allocation guidance

Verification authors derive each consumer's validation assertions from its own
requirement and exact incorporated ICD aspect. A producer computation duty alone
does not require consumer recomputation. Producer correctness and integrated
results remain verification targets; ambiguous allocation needs requirements
clarification before a rejection expectation is frozen.

This versions the reviewed paragraph from source
f5f5744e32e5b3f732a0daefb14ef5618e92809a. The shared planning prompt advances to 24;
both planning actions and verification revision advance to 21, and correction
after review advances to 9, with matching prompt references. No schema, kernel
capability or lifecycle obligation changes. Tiny and exploratory stay unchanged.

Existing products retain their selected package and historical evidence. Before
separately authorized adoption, inspect the exact compatible-upgrade preview and
its required and optional expectations, then use the supported apply/settlement
route. Kernel installation alone does not select this successor. Sound historical
graphs need no cosmetic migration or blanket reverification.

Focused source/package checks use exact kernel 0.1.1 source
0eed478d963f62afba8424225ec1f476515af8e8. Existing 2.5.31 qualification covers only
process be24dd8b911c14948af6c739a8a4104259e08eab and does not qualify this successor.
Independent successor source review and exact post-merge qualification remain
pending. This preparation does not install, migrate or upgrade a live product,
and guidance effectiveness remains unproven until fresh operation.

# 2.5.31: Source range input clarity

Clarify the existing source-trace instructions: range names are unique within
each file, inclusive line ranges are disjoint, shared duties use one range
requirements list, and split pieces have distinct descriptive names.

This documents existing attribution constraints exposed by workshop input errors.
No kernel, schema, validation tool or lifecycle gate changes. Historical records
and qualified 2.5.30 remain unchanged. Independent review and qualification are
pending; this source successor does not migrate any live product.

# 2.5.30: Coherent duties incorporated from interfaces

Experimental guidance successor to 2.5.29. The coherent-obligation check now
explicitly includes the complete meaning incorporated by ICD reference. A mixed
clause needs an unambiguous applicable aspect in normative REQ text or stable
coherent subclauses through the normal interface route. Narrowing a citation does
not remove other required behavior; the selected graph must retain its owners.

No schema, kernel capability or lifecycle obligation changes. Sound historical
graphs and exact evidence remain unchanged, with no cosmetic migration or blanket
reverification. Future authored/reviewed graphs use the clarified guidance.
Independent source review and installed compatible-upgrade qualification remain
pending; this candidate is not selected automatically by kernel installation.
The live 2.5.29 artifact and separate first-use experiment remain unchanged.

# 2.5.29: System allocation and useful software refinement

Authoring and independent review guidance now distinguishes system decomposition,
allocation to one or many elements, and software-item/internal-part refinement.
System duties may be allocated to a single element or jointly. Existing rationale
records boundaries and contributions; every required behavior remains in EARS,
statements or explicitly incorporated ICD clauses. The existing `component` field
names software responsibility scope, not system allocation. Separate processes do
not automatically determine HLR/LLR classification.

Concise intention/architecture notes stay in the owning REQ rationale; useful longer
descriptive notes may use that exact REQ body and its current source-free export.
Notes supplement rather than replace normative duties; external document links
are not automatically retrieved or reviewed.

Useful nested system, HLR and LLR refinement is permitted when it adds necessary
behavior or decisions. Immediate children must jointly deliver their parent,
including integration and progress; repeated tiers and unexplained scope changes
remain defects. Fully settled allocated system duties need no duplicate HLR, while
broad leaves cannot hide unfinished software contracts.

This compatible guidance-only candidate from 2.5.27 changes no schema, kernel
capability or lifecycle obligation. Historical records and field values retain
their original meaning; sound graphs need no cosmetic migration or blanket
reverification. Future authored/revised graphs receive the new guidance through
normal independent review. Changed behavior or allocation still needs appropriate
change authority. Read the exact upgrade preview before explicit adoption;
installing a kernel does not select this target. No machine allocation query or
standards-compliance claim is introduced. Installed qualification and larger-demo
operation remain pending. The separate unmerged 2.5.28 first-use experiment is not
included or promoted by this candidate.

# 2.5.25

Corrects an observed compatible-upgrade defect in 2.5.24. A real accepted-product copy retained 94 valid historical datums after adopting2.5.24, but formal maintenance actions disappeared because its package validity state rejected a different historical process reference. Do not use 2.5.24 as the supported adoption target.

Iterative 2.5.25 validity@2 accepts authentic preserved historical applicability, while retaining parse/schema/identity/reference/hash checks and rejecting unauthenticated publication transactions. No provenance or historical review is rewritten. Earlier PASS evidence does not automatically satisfy new obligations; target expectations still own current work. Tiny/exploratory remain byte-for-byte unchanged.

This target introduces no artificial obligation. Exact kernel 0.1.0 source 5c2938b30fd1e3d830421393f881bff1acdda129 is already qualified. Focused applicability checks passed on a disposable copy with 94 authenticated historical datums: complete required and optional work remains equal to 2.5.23, and invalid transaction evidence still fails validity. Subsequent exact-target qualification remains pending. Existing2.5.23 and2.5.24 authoring package copies remain preserved. Compatibility still requires same family, unchanged contracts/capabilities and schemas accepting existing data, with no schema transformation.

Preview before adoption using `mdlm upgrade preview /absolute/target/iterative --json`, inspect notes and full required/optional expectations, then apply a saved preview with `mdlm upgrade apply preview.json unique-operation --json`. Use `mdlm upgrade settlement unique-operation --json` for uncertain results.

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

## 2.5.26

Requires the kernel review-correction@1 service, introduced in kernel0.1.1. Older kernels reject this package. Compatible upgrade adds this service without rebinding existing capabilities or rewriting lifecycle history. A current unaccepted failed requirements review now offers an independently registered corrected judgment, preserving the original failure and correction reason.

## 2.5.27

The requirements-review recovery context now includes the same product-quality and typed-requirements standards as ordinary requirements review. Fresh independent reviewers receive these selected-package skill contents normally, without an orchestrator supplement. Recovery authority, eligibility, scope and history rules are unchanged. Existing2.5.26 products keep their selected package until a separately authorized compatible upgrade.
