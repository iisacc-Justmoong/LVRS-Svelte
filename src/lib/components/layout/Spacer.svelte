<script lang="ts">
	import type { SpacerAxis } from '../../types.js';

	export let minLength = 0;
	export let axis: SpacerAxis = 'both';
</script>

<div
	class="lvrs-spacer"
	aria-hidden="true"
	style={`--lvrs-spacer-min: ${minLength}px;`}
	data-axis={axis}
></div>

<style>
	.lvrs-spacer {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
	}

	.lvrs-spacer[data-axis='horizontal'] {
		min-width: var(--lvrs-spacer-min, 0px);
	}

	.lvrs-spacer[data-axis='vertical'] {
		min-height: var(--lvrs-spacer-min, 0px);
	}

	.lvrs-spacer[data-axis='both'] {
		min-width: var(--lvrs-spacer-min, 0px);
		min-height: var(--lvrs-spacer-min, 0px);
	}
</style>
