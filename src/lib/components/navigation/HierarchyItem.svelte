<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Label from '../control/Label.svelte';

	export let itemId: number | string = -1;
	export let itemKey = '';
	export let label = 'Label';
	export let iconName = '';
	export let iconSource = '';
	export let iconGlyph = '';
	export let showChevron = true;
	export let expanded = false;
	export let selected = false;
	export let indentLevel = 0;
	export let indentStep = 13;
	export let rowHeight = 28;
	export let iconSize = 22;
	export let disabled = false;

	const dispatch = createEventDispatcher<{ activate: void; toggle: void }>();

	$: glyph = iconGlyph || (iconName.length > 0 ? iconName.slice(0, 1).toUpperCase() : '■');
	$: leftPad = 8 + Math.max(0, indentLevel) * indentStep;
</script>

<div
	class="lvrs-hierarchy-item {selected ? 'selected' : ''}"
	style={`--lvrs-item-h:${rowHeight}px; --lvrs-item-icon:${iconSize}px; --lvrs-item-pad-left:${leftPad}px;`}
	data-item-id={String(itemId)}
	data-item-key={itemKey}
>
	<button type="button" class="main" disabled={disabled} on:click={() => dispatch('activate')}>
		<span class="icon-wrap">
			{#if iconSource.length > 0}
				<img src={iconSource} alt={iconName || label} class="icon" />
			{:else}
				<span class="icon-glyph">{glyph}</span>
			{/if}
		</span>
		<Label variant="body" truncate={true}>{label}</Label>
	</button>
	{#if showChevron}
		<button type="button" class="chevron" disabled={disabled} on:click={() => dispatch('toggle')}>
			{expanded ? '▾' : '▸'}
		</button>
	{/if}
</div>

<style>
	.lvrs-hierarchy-item {
		display: flex;
		align-items: center;
		min-height: var(--lvrs-item-h, 28px);
		padding-left: var(--lvrs-item-pad-left, 8px);
		padding-right: var(--lvrs-gap-8, 8px);
		gap: var(--lvrs-gap-6, 6px);
		box-sizing: border-box;
	}

	.main {
		flex: 1;
		min-width: 0;
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-6, 6px);
		border: 0;
		background: transparent;
		padding: 0;
		cursor: pointer;
		text-align: left;
	}

	.icon-wrap,
	.icon,
	.icon-glyph {
		width: var(--lvrs-item-icon, 22px);
		height: var(--lvrs-item-icon, 22px);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.icon {
		object-fit: contain;
	}

	.chevron {
		border: 0;
		background: transparent;
		padding: 0;
		cursor: pointer;
		opacity: 0.8;
	}

	.selected {
		background: var(--lvrs-color-overlay-primary, #400A84FF);
	}
</style>
