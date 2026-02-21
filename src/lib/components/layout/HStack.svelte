<script lang="ts">
	import type { HStackAlignment } from '../../types.js';

	export let alignment: HStackAlignment = 'center';
	export let spacing: number | undefined = undefined;

	$: resolvedGap = typeof spacing === 'number' ? `${spacing}px` : 'var(--lvrs-stack-system-spacing, 8px)';
	$: alignItems =
		alignment === 'top'
			? 'flex-start'
			: alignment === 'bottom'
				? 'flex-end'
				: alignment === 'firstTextBaseline'
					? 'baseline'
					: alignment === 'lastTextBaseline'
						? 'last baseline'
						: 'center';
</script>

<div class="lvrs-hstack" style={`--lvrs-stack-gap: ${resolvedGap}; align-items: ${alignItems};`}>
	<slot />
</div>

<style>
	.lvrs-hstack {
		display: flex;
		flex-direction: row;
		gap: var(--lvrs-stack-gap, 8px);
		min-width: 0;
	}
</style>
