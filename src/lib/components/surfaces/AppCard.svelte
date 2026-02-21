<script lang="ts">
	import Label from '../control/Label.svelte';

	export let title = '';
	export let subtitle = '';
	export let cardPadding = 18;
	export let sectionSpacing = 10;
</script>

<section
	class="lvrs-app-card"
	style={`--lvrs-card-padding: ${cardPadding}px; --lvrs-card-spacing: ${sectionSpacing}px;`}
>
	<header class="lvrs-card-header">
		{#if title.length > 0}
			<Label variant="header" block={true}>{title}</Label>
		{/if}
		{#if subtitle.length > 0}
			<Label variant="description" block={true}>{subtitle}</Label>
		{/if}
		<slot name="header" />
	</header>

	<div class="lvrs-card-separator"></div>

	<div class="lvrs-card-content">
		<slot />
	</div>
</section>

<style>
	.lvrs-app-card {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-card-spacing, 10px);
		min-width: var(--lvrs-control-dialog-min-width, 280px);
		padding: var(--lvrs-card-padding, 18px);
		border-radius: var(--lvrs-radius-lg, 12px);
		background: var(--lvrs-color-surface-solid, #242525);
		box-sizing: border-box;
	}

	.lvrs-card-header {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-gap-4, 4px);
	}

	.lvrs-card-separator {
		height: var(--lvrs-stroke-thin, 1px);
		border-radius: var(--lvrs-stroke-thin, 1px);
		background: color-mix(in srgb, var(--lvrs-color-panel-bg08, #2c2e2f), transparent 15%);
	}

	.lvrs-card-content {
		min-height: 1px;
	}
</style>
