# LVRS-Svelte

This repository prepares the Svelte migration of the LVRS (QML) framework for NPM distribution.  
The current phase focuses on establishing a publishable baseline and a stable starting API for core tokens/components.

## Current Scope

- Svelte library packaging (`@sveltejs/package`) is configured
- NPM publishing metadata, scripts, and validation scripts are configured
- Initial Svelte migration draft for LVRS theme tokens is implemented
- Initial component set is provided
  - app: `ApplicationWindow`, `AppShell`
  - layout: `HStack`, `VStack`, `ZStack`, `Spacer`
  - control: `Label`, `LabelButton`
  - surfaces: `AppCard`, `Alert`
- Preview page (`src/routes/+page.svelte`) is included

For detailed migration coverage, see `docs/migration-status.md`.

## Local Development

```bash
npm install
npm run dev
```

Type/package validation:

```bash
npm run check
npm run prepack
npm run pack:dry
```

## Package Usage Example

```svelte
<script>
	import { AppCard, Label } from 'lvrs-svelte';
</script>

<AppCard title="Card">
	<Label variant="body">Hello LVRS</Label>
</AppCard>
```

`LvrsThemeProvider` and `ApplicationWindow` are optional.
Default LVRS theme variables are automatically installed at package import time, so components can be used directly.

Optional global theme override:

```js
import { applyLvrsTheme } from 'lvrs-svelte';

applyLvrsTheme({
	colors: {
		semantic: {
			primary: '#2ED3A0'
		}
	}
});
```

## NPM Publishing Procedure

1. Update `name`, `version`, and `repository` in `package.json` according to your release policy.
2. Run and pass the validations below.
   - `npm run check`
   - `npm run prepack`
   - `npm run pack:dry`
3. Verify npm login state.
   - `npm whoami`
4. Publish publicly.
   - `npm publish --access public`

## Notes

- This repository follows the original LVRS license policy and uses `AGPL-3.0-only`.
- Not all original QML features are migrated yet. The current implementation is a readiness phase for API stabilization and publish infrastructure.
