<script lang="ts">
	import Label from './Label.svelte';

	export let checked = false;
	export let disabled = false;
	export let text = '';
	export let trackWidth = 38;
	export let trackHeight = 28;
	export let knobSize = 22;
</script>

<label class="lvrs-toggle" style={`--lvrs-track-w:${trackWidth}px; --lvrs-track-h:${trackHeight}px; --lvrs-knob:${knobSize}px;`}>
	<input type="checkbox" bind:checked disabled={disabled} />
	<span class="track" aria-hidden="true"><span class="knob"></span></span>
	{#if text.length > 0}
		<Label variant="body">{text}</Label>
	{/if}
</label>

<style>
	.lvrs-toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-8, 8px);
		cursor: pointer;
	}

	.lvrs-toggle input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.track {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: var(--lvrs-track-w, 38px);
		height: var(--lvrs-track-h, 28px);
		border-radius: 999px;
		background: var(--lvrs-color-panel-bg12, #3C3E3F);
		padding: 2px;
		transition: background-color 120ms ease-out;
	}

	.knob {
		width: var(--lvrs-knob, 22px);
		height: var(--lvrs-knob, 22px);
		border-radius: 999px;
		background: var(--lvrs-color-text-primary, #E5FFFFFF);
		transform: translateX(0);
		transition: transform 140ms ease-out;
	}

	.lvrs-toggle input:checked + .track {
		background: var(--lvrs-color-primary, #0A84FF);
	}

	.lvrs-toggle input:checked + .track .knob {
		transform: translateX(calc(var(--lvrs-track-w, 38px) - var(--lvrs-knob, 22px) - 4px));
	}

	.lvrs-toggle input:disabled + .track {
		opacity: 0.6;
	}
</style>
