<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AbstractButton from '../control/AbstractButton.svelte';
	import Label from '../control/Label.svelte';

	export let state: 'default' | 'selected' | 'inactive' = 'default';
	export let label = 'Label';
	export let key = '';
	export let showChevron = true;
	export let selectionDirection: 'right' | 'left' | 'up' | 'down' = 'right';
	export let itemWidth = 161;
	export let itemHeight = 28;
	export let iconSize = 22;
	export let iconName = '';
	export let iconSource = '';
	export let disabled = false;

	const dispatch = createEventDispatcher<{ trigger: void }>();

	$: isSelected = state === 'selected';
	$: isInactive = state === 'inactive';
	$: tone = 'borderless' as const;
	$: chevron = selectionDirection === 'left' ? '◂' : selectionDirection === 'up' ? '▴' : selectionDirection === 'down' ? '▾' : '▸';
</script>

<AbstractButton
	text=""
	{tone}
	disabled={disabled || isInactive}
	horizontalPadding={4}
	verticalPadding={3}
	cornerRadius={4}
	on:click={() => dispatch('trigger')}
>
	<div class="lvrs-menu-item {isSelected ? 'selected' : ''} {isInactive ? 'inactive' : ''}" style={`--lvrs-item-w:${itemWidth}px; --lvrs-item-h:${itemHeight}px; --lvrs-item-icon:${iconSize}px;`}>
		<div class="left">
			{#if iconSource.length > 0}
				<img class="icon" src={iconSource} alt={iconName || label} />
			{:else}
				<span class="icon-glyph">{iconName.length > 0 ? iconName.slice(0, 1).toUpperCase() : '■'}</span>
			{/if}
			<Label variant="body" truncate={true}>{label}</Label>
		</div>
		<div class="right">
			{#if key.length > 0}
				<Label variant="caption">{key}</Label>
			{/if}
			{#if showChevron}
				<span class="chevron">{chevron}</span>
			{/if}
		</div>
	</div>
</AbstractButton>

<style>
	.lvrs-menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--lvrs-gap-8, 8px);
		min-width: var(--lvrs-item-w, 161px);
		min-height: var(--lvrs-item-h, 28px);
	}

	.left,
	.right {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-8, 8px);
		min-width: 0;
	}

	.icon,
	.icon-glyph {
		width: var(--lvrs-item-icon, 22px);
		height: var(--lvrs-item-icon, 22px);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		object-fit: contain;
	}

	.chevron {
		opacity: 0.8;
	}

	.selected {
		background: var(--lvrs-color-context-selected, #0A84FF);
		border-radius: 4px;
	}

	.inactive {
		opacity: 0.72;
	}
</style>
