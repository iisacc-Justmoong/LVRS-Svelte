<script lang="ts">
	import Label from '../control/Label.svelte';

	export let label = '';
	export let detail = '';
	export let iconName = '';
	export let selected = false;
	export let showChevron = false;
	export let disabled = false;
</script>

<button type="button" class="lvrs-list-item {selected ? 'selected' : ''}" disabled={disabled}>
	{#if iconName.length > 0}
		<span class="icon">{iconName.slice(0, 1).toUpperCase()}</span>
	{/if}
	<Label variant="body" truncate={true}>{label}</Label>
	{#if detail.length > 0}
		<Label variant="caption">{detail}</Label>
	{/if}
	{#if showChevron}
		<span class="chevron">▸</span>
	{/if}
</button>

<style>
	.lvrs-list-item {
		display: flex;
		align-items: center;
		gap: var(--lvrs-gap-8, 8px);
		width: 100%;
		padding: var(--lvrs-gap-4, 4px);
		min-height: 24px;
		border: 0;
		background: transparent;
		cursor: pointer;
		text-align: left;
	}

	.lvrs-list-item.selected {
		background: var(--lvrs-color-primary, #0A84FF);
	}

	.chevron {
		margin-left: auto;
		opacity: 0.8;
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		font-size: 12px;
	}
</style>
