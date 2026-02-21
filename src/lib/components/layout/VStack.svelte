<script lang="ts">
	import type { VStackAlignment } from '../../types.js';

	export let alignment: VStackAlignment = 'center';
	export let spacing: number | undefined = undefined;

	$: resolvedGap = typeof spacing === 'number' ? `${spacing}px` : 'var(--lvrs-stack-system-spacing, 8px)';
	$: alignItems = alignment === 'leading' ? 'flex-start' : alignment === 'trailing' ? 'flex-end' : 'center';
</script>

<div class="lvrs-vstack" style={`--lvrs-stack-gap: ${resolvedGap}; align-items: ${alignItems};`}>
	<slot />
</div>

<style>
	.lvrs-vstack {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-stack-gap, 8px);
		min-width: 0;
	}
</style>
