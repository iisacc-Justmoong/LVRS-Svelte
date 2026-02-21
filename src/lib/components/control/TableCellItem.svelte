<script lang="ts">
	import Label from './Label.svelte';

	export let itemData: any = null;
	export let text = 'Text';
	export let cellHeight = 24;
	export let contentSpacing = 8;
	export let dividerColor = 'var(--lvrs-color-panel-bg03, #1F1F20)';
	export let textColor = 'var(--lvrs-color-text-body, #CCFFFFFF)';
	export let showDivider = true;
	export let textStyle: import('../../types.js').LabelVariant = 'body';

	$: resolvedText = itemData && typeof itemData === 'object'
		? String(itemData.label ?? itemData.text ?? itemData.title ?? text)
		: text;
</script>

<div class="lvrs-table-cell" style={`--lvrs-cell-h:${cellHeight}px; --lvrs-cell-gap:${contentSpacing}px; --lvrs-cell-divider:${dividerColor};`}>
	{#if showDivider}
		<div class="divider"></div>
	{/if}
	<Label variant={textStyle} color={textColor} truncate={true} block={true}>{resolvedText}</Label>
</div>

<style>
	.lvrs-table-cell {
		display: flex;
		align-items: center;
		min-height: var(--lvrs-cell-h, 24px);
		padding-left: var(--lvrs-cell-gap, 8px);
		box-sizing: border-box;
		gap: var(--lvrs-cell-gap, 8px);
		overflow: hidden;
	}

	.divider {
		width: 1px;
		align-self: stretch;
		background: var(--lvrs-cell-divider, #1F1F20);
	}
</style>
