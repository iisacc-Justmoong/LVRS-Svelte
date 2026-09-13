<script lang="ts">
	import TableCellItem from './TableCellItem.svelte';

	export let cellItems: any[] | undefined = undefined;
	export let cells: any[] = ['Text', 'Text', 'Text'];
	export let cellWidth = 0;
	export let cellHeight = 24;
	export let contentSpacing = 8;
	export let dividerColor = 'var(--lvrs-color-panel-bg03, #1F1F20)';
	export let textColor = 'var(--lvrs-color-text-body, #FFFFFFCC)';

	$: source = cellItems ?? cells;
	$: normalized = (source ?? []).map((entry) =>
		typeof entry === 'string' || typeof entry === 'number' ? { text: String(entry) } : entry
	);
</script>

<div class="lvrs-table-row" role="row" style={`--lvrs-row-cell-w:${cellWidth > 0 ? `${cellWidth}px` : '0px'}; --lvrs-row-cell-h:${cellHeight}px;`}>
	{#if normalized.length === 0}
		<TableCellItem text="Text" {cellHeight} {contentSpacing} {dividerColor} {textColor} />
	{:else}
		{#each normalized as entry, idx (idx)}
			<TableCellItem itemData={entry} text={String(entry?.text ?? entry?.label ?? 'Text')} {cellHeight} {contentSpacing} {dividerColor} {textColor} />
		{/each}
	{/if}
</div>

<style>
	.lvrs-table-row {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(var(--lvrs-row-cell-w, 234px), 1fr);
		align-items: stretch;
	}
</style>
