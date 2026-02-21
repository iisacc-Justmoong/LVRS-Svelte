<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import InputMethodGuard from './InputMethodGuard.svelte';

	export let text = '';
	export let placeholderText = '';
	export let readOnly = false;
	export let type: 'text' | 'password' | 'email' | 'search' = 'text';
	export let disabled = false;
	export let fieldMinHeight = 44;
	export let insetHorizontal = 12;
	export let insetVertical = 8;
	export let sideSpacing = 8;
	export let cornerRadius = 8;
	export let autoFocusOnPress = true;

	const dispatch = createEventDispatcher<{ accepted: string; textEdited: string }>();
	let inputEl: HTMLInputElement | null = null;

	function onInput(event: Event): void {
		text = (event.currentTarget as HTMLInputElement).value;
		dispatch('textEdited', text);
	}

	function onKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter') dispatch('accepted', text);
	}

	function forceInputFocus(): void {
		inputEl?.focus();
	}
</script>

<div
	class="lvrs-input-bar"
	role="group"
	data-auto-focus-on-press={autoFocusOnPress ? '1' : '0'}
	style={`--lvrs-input-min-h:${fieldMinHeight}px; --lvrs-input-pad-x:${insetHorizontal}px; --lvrs-input-pad-y:${insetVertical}px; --lvrs-input-side-gap:${sideSpacing}px; --lvrs-input-radius:${cornerRadius}px;`}
>
	<div class="leading"><slot name="leading" /></div>
	<input
		bind:this={inputEl}
		{type}
		placeholder={placeholderText}
		value={text}
		readonly={readOnly}
		disabled={disabled}
		on:input={onInput}
		on:keydown={onKeyDown}
	/>
	<div class="trailing"><slot name="trailing" /></div>
	<InputMethodGuard target={inputEl} guardEnabled={!disabled && !readOnly} />
</div>

<style>
	.lvrs-input-bar {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-input-side-gap, 8px);
		min-height: var(--lvrs-input-min-h, 44px);
		padding: var(--lvrs-input-pad-y, 8px) var(--lvrs-input-pad-x, 12px);
		border-radius: var(--lvrs-input-radius, 8px);
		background: var(--lvrs-color-surface-sub, #212223);
		box-sizing: border-box;
		width: 100%;
	}

	.leading,
	.trailing {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
	}

	input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: 0;
		outline: none;
		color: var(--lvrs-color-text-primary, #E5FFFFFF);
		font-family: var(--lvrs-font-body, "Pretendard", sans-serif);
		font-size: var(--lvrs-text-body-size, 18px);
		line-height: var(--lvrs-text-body-line-height, 18px);
	}

	input::placeholder {
		color: var(--lvrs-color-text-description, #99FFFFFF);
	}

	input:disabled {
		opacity: 0.6;
	}
</style>
