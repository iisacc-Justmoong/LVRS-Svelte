<script lang="ts">
	import Label from './Label.svelte';

	export let text = '';
	export let checked = false;
	export let disabled = false;
	export let boxSize = 17;
</script>

<label class="lvrs-check" style={`--lvrs-box-size:${boxSize}px;`}>
	<input type="checkbox" bind:checked disabled={disabled} />
	<span class="indicator" aria-hidden="true"></span>
	{#if text.length > 0}
		<Label variant="body">{text}</Label>
	{/if}
</label>

<style>
	.lvrs-check {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-6, 6px);
		cursor: pointer;
	}

	.lvrs-check input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.lvrs-check .indicator {
		width: var(--lvrs-box-size, 17px);
		height: var(--lvrs-box-size, 17px);
		border-radius: 4px;
		background: var(--lvrs-color-text-body, #CCFFFFFF);
		border: 1px solid color-mix(in srgb, var(--lvrs-color-text-body, #CCFFFFFF), black 35%);
		position: relative;
	}

	.lvrs-check .indicator::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 48%;
		width: 48%;
		height: 28%;
		border: 2px solid #ffffff;
		border-top: 0;
		border-right: 0;
		transform: translate(-50%, -50%) rotate(-45deg) scale(0);
		transform-origin: center;
		transition: transform 120ms ease-out;
	}

	.lvrs-check input:checked + .indicator {
		background: var(--lvrs-color-primary, #0A84FF);
		border-color: transparent;
	}

	.lvrs-check input:checked + .indicator::after {
		transform: translate(-50%, -50%) rotate(-45deg) scale(1);
	}

	.lvrs-check input:disabled + .indicator {
		opacity: 0.6;
	}
</style>
