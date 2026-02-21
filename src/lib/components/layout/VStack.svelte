<script lang="ts">
	import type { VStackAlignment } from '../../types.js';

	export let spacing = -1;
	export let defaultSpacing = 8;
	export let alignmentName: VStackAlignment = 'center';

	$: resolvedGap = spacing < 0 ? defaultSpacing : spacing;
	$: alignItems = alignmentName === 'leading' ? 'flex-start' : alignmentName === 'trailing' ? 'flex-end' : 'center';
</script>

<div class="lvrs-vstack" style={`--lvrs-stack-gap: ${resolvedGap}px; align-items: ${alignItems};`}>
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
