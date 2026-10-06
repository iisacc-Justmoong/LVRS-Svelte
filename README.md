# LVRS-Svelte

LVRS visual components, materials and elastic interaction for Svelte 5.
This release follows LVRS source `953189f1217b8eab6ec0abba23c8ad5dc6a43ef2` (2026-09-13).

```sh
npm install lvrs-svelte
```

```svelte
<script>
  import { PushButton, PanelMaterial, InputField, Card } from 'lvrs-svelte';
  let title = '';
</script>

<PanelMaterial>
  <InputField label="Project name" bind:text={title} />
  <PushButton text="Create project" size="medium" on:click={() => console.log(title)} />
</PanelMaterial>
<Card type="link" title="Documentation" href="/docs" actionText="Read docs" />
```

CSS is imported with the package and is available during SSR. A theme provider and browser
initialization are unnecessary. `lvrs-svelte/theme.css` and `lvrs-svelte/styles.css` are also
explicit exports. All build output lives under `build/`.

## Visual scope

59 public components cover buttons, labels, inputs, selection, progress, tables, lists, hierarchy,
menus, cards, dialogs, sheets, popovers, tooltips and materials. See [component reference](docs/components.md).
ApplicationWindow, AppShell, HStack, VStack, ZStack, Spacer, PageRouter and Navigator were removed
in 0.2.0. Use native HTML/CSS and your application's router to compose these visual components.

Authored metrics are unscaled: body 13px, icons 18px, compact controls 22px. Medium (36px) and
large (44px) buttons are explicit options for web and touch surfaces. Panel colors and CSS alpha
are derived from the current LVRS tokens. Panel materials support dense (75%, 64px blur), glass
(25%, 16px blur) and solid coatings. Web backdrop blur is a CSS approximation of native LVRS materials.

## Motion and accessibility

Controls share a bounded 90ms press, 160ms hover and 360ms elastic release. Their visual child
animates independently from the hit area. Surfaces enter over 420ms and dialogs exit over 150ms.
`prefers-reduced-motion` is respected. Explicit preferences are supported:

```js
import { setMotionOptions } from 'lvrs-svelte';
setMotionOptions({ reducedMotion: true, speed: 1 });
```

Native form controls preserve name/value, disabled, validation and keyboard behavior. Segments
use arrow/Home/End keys; menus skip disabled items and support Escape; native dialogs provide
focus trapping, background inertness, Escape dismissal and focus restoration.

## Development and verification

```sh
npm ci
npm test
npm run check
npm run build
npm run dev
npm pack --ignore-scripts --pack-destination build
```

The build emits a standalone static catalog at `build/catalog` and the typed npm package at
`build/package`. `npm test` validates token fidelity, motion bounds and SSR for every public
component. See [release verification](docs/verification.md) for browser scenarios.

The package uses Svelte as its only runtime peer and adds no runtime component dependency.
It uses browser-native input, select, dialog and details behavior, Svelte reactivity/transitions,
and the official Svelte packaging toolchain. AGPL-3.0-only; see LICENSE and NOTICE.md.
# Windows validation

Shell scripts use LF endings through `.gitattributes`. The installer contract test
checks the Git executable mode on Windows, where filesystem POSIX execute bits
are unavailable; POSIX hosts continue to check the working-file mode.
