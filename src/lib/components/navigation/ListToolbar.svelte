<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconButton from '../control/IconButton.svelte';

	export let icon1 = '';
	export let icon2 = '';
	export let icon3 = '';
	export let iconSize = 22;
	export let buttonSize = 28;
	export let horizontalPadding = 8;
	export let verticalPadding = 4;
	export let spacing = 4;
	export let interactive = true;

	const dispatch = createEventDispatcher<{ iconClicked: { index: number; source: string } }>();

	$: icons = [icon1, icon2, icon3];
</script>

<div class="lvrs-list-toolbar" style={`--lvrs-lt-pad-x:${horizontalPadding}px; --lvrs-lt-pad-y:${verticalPadding}px; --lvrs-lt-gap:${spacing}px; --lvrs-lt-btn-size:${buttonSize}px;`}>
	{#each icons as icon, index (index)}
		<IconButton
			iconName={icon}
			iconSize={iconSize}
			tone="borderless"
			disabled={!interactive || icon.length === 0}
			on:click={() => dispatch('iconClicked', { index, source: icon })}
		/>
	{/each}
</div>

<style>
	.lvrs-list-toolbar {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-lt-gap, 4px);
		padding: var(--lvrs-lt-pad-y, 4px) var(--lvrs-lt-pad-x, 8px);
		background: var(--lvrs-color-surface-sub, #212223);
	}

	.lvrs-list-toolbar :global(.lvrs-abstract-button) {
		min-height: var(--lvrs-lt-btn-size, 28px);
		min-width: var(--lvrs-lt-btn-size, 28px);
		padding: 4px;
	}
</style>
