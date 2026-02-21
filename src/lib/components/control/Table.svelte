<script lang="ts">
	import TableHeader from './TableHeader.svelte';
	import TableRow from './TableRow.svelte';

	export let headerCellItems: any[] | undefined = undefined;
	export let headerColumns: any[] = ['Column', 'Column', 'Column'];
	export let rows: any[] = [
		['Text', 'Text', 'Text'],
		['Text', 'Text', 'Text'],
		['Text', 'Text', 'Text']
	];
	export let rowHeight = 24;
	export let cellWidth = 0;
	export let backgroundColor = '#282828';
	export let borderColor = 'var(--lvrs-color-surface-alt, #262728)';
	export let borderWidth = 1;
	export let headerTextColor = 'var(--lvrs-color-text-description, #99FFFFFF)';
	export let cellTextColor = 'var(--lvrs-color-text-body, #CCFFFFFF)';
	export let dividerColor = 'var(--lvrs-color-panel-bg03, #1F1F20)';
	export let headerSeparatorColor = 'var(--lvrs-color-panel-bg10, #343536)';

	$: safeRows = Array.isArray(rows) ? rows : [];
</script>

<div class="lvrs-table" style={`--lvrs-table-bg:${backgroundColor}; --lvrs-table-border:${borderColor}; --lvrs-table-border-w:${borderWidth}px;`}>
	<TableHeader cellItems={headerCellItems} columns={headerColumns} textColor={headerTextColor} separatorColor={headerSeparatorColor} rowHeight={rowHeight} />
	{#each safeRows as row, idx (idx)}
		<TableRow cellItems={Array.isArray(row) ? row : []} cellHeight={rowHeight} cellWidth={cellWidth > 0 ? cellWidth : 234} dividerColor={dividerColor} textColor={cellTextColor} />
	{/each}
</div>

<style>
	.lvrs-table {
		display: flex;
		flex-direction: column;
		background: var(--lvrs-table-bg, #282828);
		border: var(--lvrs-table-border-w, 1px) solid var(--lvrs-table-border, #262728);
		overflow: hidden;
	}
</style>
