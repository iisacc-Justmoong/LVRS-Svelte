<script lang="ts">
	import Label from '../control/Label.svelte';

	export let title = '';
	export let subtitle = '';
	export let menuVisible = false;
	export let compact = false;

	export let contentHorizontalPadding = compact ? 10 : 16;
	export let contentVerticalPadding = compact ? 10 : 16;
	export let rowSpacing = compact ? 8 : 12;
	export let actionSpacing = compact ? 6 : 8;
</script>

<header class="lvrs-app-header" style={`--lvrs-header-pad-x:${contentHorizontalPadding}px; --lvrs-header-pad-y:${contentVerticalPadding}px; --lvrs-header-row-gap:${rowSpacing}px; --lvrs-header-action-gap:${actionSpacing}px;`}>
	{#if menuVisible}
		<button type="button" class="menu-btn">Menu</button>
	{/if}
	<div class="title-wrap">
		<Label variant="title2" truncate={true} block={true}>{title}</Label>
		{#if subtitle.length > 0}
			<Label variant="description" truncate={true} block={true}>{subtitle}</Label>
		{/if}
	</div>
	<div class="actions">
		<slot />
	</div>
</header>

<style>
	.lvrs-app-header {
		display: flex;
		align-items: center;
		gap: var(--lvrs-header-row-gap, 12px);
		padding: var(--lvrs-header-pad-y, 16px) var(--lvrs-header-pad-x, 16px);
		min-height: var(--lvrs-control-height-md, 44px);
		background: var(--lvrs-color-surface-window-alt, #1F1F20);
	}

	.menu-btn {
		padding: 8px 10px;
		border-radius: 4px;
		border: 0;
		background: var(--lvrs-color-surface-solid, #242525);
		color: var(--lvrs-color-text-primary, #E5FFFFFF);
		cursor: pointer;
	}

	.title-wrap {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.actions {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-header-action-gap, 8px);
	}
</style>
