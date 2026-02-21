<script lang="ts">
	import Label from './Label.svelte';

	export let cellItems: any[] | undefined = undefined;
	export let columns: any[] = ['Column', 'Column', 'Column'];
	export let rowHeight = 24;
	export let cellHorizontalPadding = 8;
	export let textColor = 'var(--lvrs-color-text-description, #99FFFFFF)';
	export let separatorHeight = 1;
	export let separatorColor = 'var(--lvrs-color-panel-bg10, #343536)';

	$: source = cellItems ?? columns;
	$: normalized = (source ?? []).map((entry) =>
		typeof entry === 'string' || typeof entry === 'number'
			? { label: String(entry), contentSpacing: cellHorizontalPadding }
			: {
					label: String(entry?.label ?? entry?.text ?? entry?.title ?? 'Column'),
					contentSpacing: Number(entry?.contentSpacing ?? entry?.horizontalPadding ?? cellHorizontalPadding)
				}
	);
</script>

<div class="lvrs-table-header" style={`--lvrs-header-row-h:${rowHeight}px; --lvrs-header-sep-h:${separatorHeight}px; --lvrs-header-sep:${separatorColor};`}>
	<div class="row">
		{#each normalized as col, idx (idx)}
			<div class="cell" style={`padding-left:${Math.max(0, col.contentSpacing)}px;`}>
				<Label variant="description" color={textColor} truncate={true} block={true}>{col.label}</Label>
			</div>
		{/each}
	</div>
	<div class="separator"></div>
</div>

<style>
	.lvrs-table-header {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		min-height: var(--lvrs-header-row-h, 24px);
	}

	.cell {
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.separator {
		height: var(--lvrs-header-sep-h, 1px);
		background: var(--lvrs-header-sep, #343536);
	}
</style>
