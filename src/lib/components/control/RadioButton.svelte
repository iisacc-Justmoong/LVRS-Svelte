<script lang="ts">
	import Label from './Label.svelte';

	export let text = '';
	export let checked = false;
	export let disabled = false;
	export let indicatorSize = 22;
	export let name = '';
</script>

<label class="lvrs-radio" style={`--lvrs-radio-size:${indicatorSize}px;`}>
	<input
		type="radio"
		checked={checked}
		disabled={disabled}
		{name}
		on:change={() => {
			checked = true;
		}}
	/>
	<span class="indicator" aria-hidden="true"></span>
	{#if text.length > 0}
		<Label variant="body">{text}</Label>
	{/if}
</label>

<style>
	.lvrs-radio {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-8, 8px);
		cursor: pointer;
	}

	.lvrs-radio input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.lvrs-radio .indicator {
		width: var(--lvrs-radio-size, 22px);
		height: var(--lvrs-radio-size, 22px);
		border-radius: 999px;
		background: var(--lvrs-color-text-primary, #E5FFFFFF);
		position: relative;
	}

	.lvrs-radio .indicator::after {
		content: '';
		position: absolute;
		inset: 28%;
		border-radius: 999px;
		background: var(--lvrs-color-window, #141414);
		opacity: 0;
		transform: scale(0.6);
		transition: opacity 120ms ease-out, transform 120ms ease-out;
	}

	.lvrs-radio input:checked + .indicator {
		background: var(--lvrs-color-primary, #0A84FF);
	}

	.lvrs-radio input:checked + .indicator::after {
		opacity: 1;
		transform: scale(1);
	}

	.lvrs-radio input:disabled + .indicator {
		opacity: 0.55;
	}
</style>
