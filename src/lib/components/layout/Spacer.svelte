<script lang="ts">
	export let minLength: number | undefined = undefined;

	$: resolvedMinLength = typeof minLength === 'number' ? `${minLength}px` : '0px';
</script>

<div
	class="lvrs-spacer"
	aria-hidden="true"
	style={`--lvrs-spacer-min: ${resolvedMinLength};`}
></div>

<style>
	.lvrs-spacer {
		flex: 1 1 auto;
		min-width: 0;
		min-height: 0;
	}

	:global(.lvrs-hstack) > :global(.lvrs-spacer) {
		min-width: var(--lvrs-spacer-min, 0px);
	}

	:global(.lvrs-vstack) > :global(.lvrs-spacer) {
		min-height: var(--lvrs-spacer-min, 0px);
	}

	:global(.lvrs-zstack) > :global(.lvrs-spacer) {
		min-width: var(--lvrs-spacer-min, 0px);
		min-height: var(--lvrs-spacer-min, 0px);
	}
</style>
