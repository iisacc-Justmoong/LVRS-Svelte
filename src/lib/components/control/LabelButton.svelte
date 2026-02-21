<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { LabelButtonTone } from '../../types.js';
	import Label from './Label.svelte';

	export let text = 'Button';
	export let tone: LabelButtonTone = 'primary';
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	const toneMap: Record<LabelButtonTone, { background: string; border: string; text: string }> = {
		primary: {
			background: 'var(--lvrs-color-primary, #0A84FF)',
			border: 'transparent',
			text: '#FFFFFF'
		},
		default: {
			background: 'var(--lvrs-color-surface-alt, #262728)',
			border: 'var(--lvrs-color-panel-bg08, #2C2E2F)',
			text: 'var(--lvrs-color-text-body, #CCFFFFFF)'
		},
		danger: {
			background: 'var(--lvrs-color-danger, #FF453A)',
			border: 'transparent',
			text: '#FFFFFF'
		}
	};

	$: visual = toneMap[tone];

	function onClick(event: MouseEvent): void {
		if (disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		dispatch('click', event);
	}
</script>

<button
	class="lvrs-label-button"
	type={type}
	disabled={disabled}
	on:click={onClick}
	style={`--lvrs-button-bg: ${visual.background}; --lvrs-button-border: ${visual.border}; --lvrs-button-text: ${visual.text};`}
>
	<Label variant="body" color="var(--lvrs-button-text)">{text}</Label>
</button>

<style>
	.lvrs-label-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		min-width: var(--lvrs-control-button-min-width, 100px);
		min-height: var(--lvrs-control-height-sm, 28px);
		padding: var(--lvrs-gap-4, 4px) var(--lvrs-gap-8, 8px);
		gap: var(--lvrs-gap-0, 0px);
		border-radius: var(--lvrs-radius-sm, 4px);
		border: 1px solid var(--lvrs-button-border);
		background: var(--lvrs-button-bg);
		cursor: pointer;
		transition: filter 120ms ease-out, transform 120ms ease-out;
	}

	.lvrs-label-button:hover:enabled {
		filter: brightness(1.06);
	}

	.lvrs-label-button:active:enabled {
		transform: translateY(1px);
	}

	.lvrs-label-button:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
</style>
