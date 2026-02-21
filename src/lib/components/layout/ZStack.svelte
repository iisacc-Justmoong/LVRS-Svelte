<script lang="ts">
	import type { ZStackAlignment } from '../../types.js';

	export let alignment: ZStackAlignment = 'center';

	const placementByAlignment: Record<ZStackAlignment, string> = {
		topLeading: 'start start',
		top: 'center start',
		topTrailing: 'end start',
		leading: 'start center',
		center: 'center center',
		trailing: 'end center',
		bottomLeading: 'start end',
		bottom: 'center end',
		bottomTrailing: 'end end'
	};

	$: placement = placementByAlignment[alignment];
</script>

<div class="lvrs-zstack" style={`place-items: ${placement};`}>
	<slot />
</div>

<style>
	.lvrs-zstack {
		display: grid;
		min-width: 0;
		min-height: 0;
	}

	.lvrs-zstack :global(> *) {
		grid-area: 1 / 1;
	}
</style>
