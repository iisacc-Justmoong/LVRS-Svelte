<script lang="ts">
	import {
		Alert,
		AppCard,
		ApplicationWindow,
		HStack,
		Label,
		LabelButton,
		LvrsThemeProvider,
		Spacer,
		VStack
	} from '../lib/index.js';

	let navIndex = 0;
	let alertOpen = false;

	const navItems = [
		{ label: 'Overview', subtitle: 'Current package status' },
		{ label: 'Tokens', subtitle: 'Theme and typography' },
		{ label: 'Roadmap', subtitle: 'QML to Svelte migration' }
	];
</script>

<LvrsThemeProvider as="main">
	<ApplicationWindow
		title="LVRS-Svelte"
		subtitle="NPM publishing readiness preview"
		{navItems}
		bind:navIndex
	>
		<HStack slot="header-actions" spacing={8}>
			<LabelButton text="Preview Alert" on:click={() => (alertOpen = true)} />
		</HStack>

		<VStack spacing={16}>
			<AppCard title="Current Implementation Scope" subtitle="Components included in the initial readiness phase">
				<VStack spacing={8}>
					<Label variant="body" block={true}>app: ApplicationWindow, AppShell</Label>
					<Label variant="body" block={true}>layout: HStack, VStack, ZStack, Spacer</Label>
					<Label variant="body" block={true}>control: Label, LabelButton</Label>
					<Label variant="body" block={true}>surfaces: AppCard, Alert</Label>
				</VStack>
			</AppCard>

			<AppCard title="Layout Sample" subtitle="Spacing and alignment token behavior check">
				<HStack spacing={12} alignment="center">
					<LabelButton text="Primary" />
					<LabelButton text="Default" tone="default" />
					<Spacer minLength={16} />
					<Label variant="caption">navIndex: {navIndex}</Label>
				</HStack>
			</AppCard>
		</VStack>
	</ApplicationWindow>

	<Alert
		bind:open={alertOpen}
		buttonCount={3}
		title="LVRS Alert"
		message="The Svelte migration foundation is working as expected."
		primaryText="Confirm"
		secondaryText="Defer"
		tertiaryText="Close"
		on:primaryClicked={() => (alertOpen = false)}
		on:secondaryClicked={() => (alertOpen = false)}
		on:tertiaryClicked={() => (alertOpen = false)}
	/>
</LvrsThemeProvider>
