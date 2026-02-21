<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AbstractButtonTone } from '../../types.js';
	import Label from './Label.svelte';

	export let text = '';
	export let tone: AbstractButtonTone = 'default';
	export let disabled = false;
	export let checkable = false;
	export let checked = false;
	export let horizontalPadding = 14;
	export let verticalPadding = 10;
	export let cornerRadius = 8;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const dispatch = createEventDispatcher<{ click: MouseEvent; change: boolean }>();

	const toneMap: Record<AbstractButtonTone, { text: string; background: string; hover: string; pressed: string }> = {
		primary: {
			text: '#ffffff',
			background: 'var(--lvrs-color-primary, #0A84FF)',
			hover: 'color-mix(in srgb, var(--lvrs-color-primary, #0A84FF), black 10%)',
			pressed: 'color-mix(in srgb, var(--lvrs-color-primary, #0A84FF), black 18%)'
		},
		default: {
			text: 'var(--lvrs-color-text-primary, #E5FFFFFF)',
			background: 'var(--lvrs-color-panel-bg12, #3C3E3F)',
			hover: 'var(--lvrs-color-surface-alt, #262728)',
			pressed: 'color-mix(in srgb, var(--lvrs-color-surface-alt, #262728), black 8%)'
		},
		borderless: {
			text: 'var(--lvrs-color-primary, #0A84FF)',
			background: 'transparent',
			hover: 'var(--lvrs-color-surface-alt, #262728)',
			pressed: 'color-mix(in srgb, var(--lvrs-color-surface-alt, #262728), black 8%)'
		},
		destructive: {
			text: '#ffffff',
			background: 'var(--lvrs-color-danger, #FF453A)',
			hover: 'color-mix(in srgb, var(--lvrs-color-danger, #FF453A), black 10%)',
			pressed: 'color-mix(in srgb, var(--lvrs-color-danger, #FF453A), black 18%)'
		},
		disabled: {
			text: 'var(--lvrs-color-text-disabled, #4DFFFFFF)',
			background: 'var(--lvrs-color-panel-bg04, #212223)',
			hover: 'var(--lvrs-color-panel-bg04, #212223)',
			pressed: 'var(--lvrs-color-panel-bg04, #212223)'
		}
	};

	$: effectiveEnabled = !disabled && tone !== 'disabled';
	$: visual = toneMap[tone];

	function onClick(event: MouseEvent): void {
		if (!effectiveEnabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		if (checkable) {
			checked = !checked;
			dispatch('change', checked);
		}
		dispatch('click', event);
	}
</script>

<button
	class="lvrs-abstract-button {checked ? 'is-checked' : ''}"
	type={type}
	disabled={!effectiveEnabled}
	on:click={onClick}
	style={`--lvrs-btn-pad-x:${horizontalPadding}px; --lvrs-btn-pad-y:${verticalPadding}px; --lvrs-btn-radius:${cornerRadius}px; --lvrs-btn-text:${visual.text}; --lvrs-btn-bg:${visual.background}; --lvrs-btn-bg-hover:${visual.hover}; --lvrs-btn-bg-pressed:${visual.pressed};`}
>
	<slot>
		<Label variant="body" color="var(--lvrs-btn-text)">{text}</Label>
	</slot>
</button>

<style>
	.lvrs-abstract-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		min-height: var(--lvrs-control-height-md, 44px);
		padding: var(--lvrs-btn-pad-y, 10px) var(--lvrs-btn-pad-x, 14px);
		border: 1px solid transparent;
		border-radius: var(--lvrs-btn-radius, 8px);
		background: var(--lvrs-btn-bg);
		cursor: pointer;
		transition: background-color 120ms ease-out, transform 120ms ease-out, filter 120ms ease-out;
	}

	.lvrs-abstract-button:hover:enabled {
		background: var(--lvrs-btn-bg-hover);
	}

	.lvrs-abstract-button:active:enabled {
		background: var(--lvrs-btn-bg-pressed);
		transform: translateY(1px);
	}

	.lvrs-abstract-button:disabled {
		opacity: 0.72;
		cursor: not-allowed;
	}

	.lvrs-abstract-button.is-checked {
		outline: 1px solid color-mix(in srgb, var(--lvrs-color-primary, #0A84FF), transparent 45%);
	}
</style>
