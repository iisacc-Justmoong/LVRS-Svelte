<script lang="ts">
	import type { HStackAlignment } from '../../types.js';

	export let spacing = -1;
	export let defaultSpacing = 8;
	export let alignmentName: HStackAlignment = 'center';
	export let wrap = false;

	$: resolvedGap = spacing < 0 ? defaultSpacing : spacing;
	$: alignItems = alignmentName === 'top' ? 'flex-start' : alignmentName === 'bottom' ? 'flex-end' : 'center';
</script>

<div class="lvrs-hstack" style={`--lvrs-stack-gap: ${resolvedGap}px; align-items: ${alignItems}; flex-wrap: ${wrap ? 'wrap' : 'nowrap'};`}>
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
