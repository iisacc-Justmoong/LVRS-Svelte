# Release verification: 0.2.1

2026-09-13. The local automated suite validates the authored 13/18/22px metrics, CSS
alpha ordering, theme-override isolation, bounded scale displacement, speed/reduced-motion
behavior, disabled link semantics, progress clamping and SSR of every public visual export.

Browser verification in Chromium, using the real catalog:
- Primary and wrapped LabelButton clicks update the counter.
- Search text clears; Stepper increments; RadioButton group switches; arrow navigation selects Details.
- Modal closes with Escape and returns focus; Sheet saves and closes; Alert invokes its primary action.
- ContextMenu opens, ArrowDown skips its disabled item and Enter invokes Duplicate.
- The global Reduce motion switch changes the shared preference.

Reproduce with npm run dev. Exercise the catalog on desktop and at 390px width.
Build and package outputs are independent gates: npm run check; npm test; npm run build;
npm pack --ignore-scripts --pack-destination build. Inspect the tarball's file list before publishing.

0.2.1 fixes tooltip positioning inside a material with backdrop-filter. Tooltips are
owned by a DOM action and rendered under document.body, so the material cannot redefine
their fixed positioning coordinate system. Edge placement and below-trigger fallback
are regression-tested; the action restores aria-describedby and removes the portal
and listeners when destroyed. Verify both hidden and focused tooltips at 390px and
confirm that Escape dismisses the tooltip without moving its trigger.

Final local result: svelte-check 0 errors / 0 warnings; 5/5 tests; publint and static
catalog build passed. At a 390px browser viewport (375px content width), the document
remained 375px wide with the tooltip both hidden and keyboard-focused. The visible
tooltip stayed within the content viewport, and Escape cleared its visible state.
The publication tarball contains 150 expected files and no credentials, caches or app/layout APIs.
