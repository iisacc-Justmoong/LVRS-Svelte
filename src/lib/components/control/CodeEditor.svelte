<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Label from './Label.svelte';
	import InputMethodGuard from './InputMethodGuard.svelte';
	import WheelScrollGuard from './WheelScrollGuard.svelte';

	export let text = '';
	export let readOnly = false;
	export let placeholderText = '';
	export let snippetTitle = 'Snippet';
	export let snippetLanguage = '';
	export let showSnippetHeader = true;
	export let showScrollBar = true;
	export let fieldMinHeight = 176;
	export let editorHeight = 176;
	export let headerHeight = 28;
	export let insetHorizontal = 10;
	export let insetVertical = 8;
	export let headerSpacing = 4;
	export let cornerRadius = 8;
	
	const dispatch = createEventDispatcher<{ textEdited: string; submitted: string }>();
	let textareaEl: HTMLTextAreaElement | null = null;

	$: normalizedHeight = Math.max(fieldMinHeight, editorHeight);

	function onInput(event: Event): void {
		text = (event.currentTarget as HTMLTextAreaElement).value;
		dispatch('textEdited', text);
	}

	function onKeyDown(event: KeyboardEvent): void {
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			dispatch('submitted', text);
			event.preventDefault();
		}
	}
</script>

<div class="lvrs-code-editor" style={`--lvrs-editor-h:${normalizedHeight}px; --lvrs-editor-radius:${cornerRadius}px; --lvrs-editor-pad-x:${insetHorizontal}px; --lvrs-editor-pad-y:${insetVertical}px; --lvrs-editor-header-h:${headerHeight}px; --lvrs-editor-header-gap:${headerSpacing}px;`}>
	{#if showSnippetHeader}
		<div class="meta">
			<Label variant="caption">{snippetLanguage.length > 0 ? `${snippetTitle} - ${snippetLanguage}` : snippetTitle}</Label>
		</div>
	{/if}
	<div class="editor-pane {showScrollBar ? 'scroll' : 'no-scroll'}">
		<textarea
			bind:this={textareaEl}
			value={text}
			readonly={readOnly}
			on:input={onInput}
			on:keydown={onKeyDown}
		></textarea>
		{#if text.length === 0 && placeholderText.length > 0}
			<div class="placeholder">
				<Label variant="description">{placeholderText}</Label>
			</div>
		{/if}
		<WheelScrollGuard targetElement={textareaEl} consumeInside={true} />
		<InputMethodGuard target={textareaEl} guardEnabled={!readOnly} />
	</div>
</div>

<style>
	.lvrs-code-editor {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-editor-header-gap, 4px);
		min-height: var(--lvrs-editor-h, 176px);
		padding: var(--lvrs-editor-pad-y, 8px) var(--lvrs-editor-pad-x, 10px);
		border-radius: var(--lvrs-editor-radius, 8px);
		background: var(--lvrs-color-surface-sub, #212223);
		box-sizing: border-box;
	}

	.meta {
		opacity: 0.82;
	}

	.editor-pane {
		position: relative;
		flex: 1;
		min-height: 0;
	}

	textarea {
		width: 100%;
		height: 100%;
		min-height: calc(var(--lvrs-editor-h, 176px) - var(--lvrs-editor-pad-y, 8px) * 2 - var(--lvrs-editor-header-h, 28px));
		resize: none;
		outline: none;
		border: 0;
		background: transparent;
		color: var(--lvrs-color-text-primary, #E5FFFFFF);
		font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		font-size: var(--lvrs-text-body-size, 18px);
		line-height: 1.35;
	}

	.editor-pane.no-scroll textarea {
		overflow: hidden;
	}

	.editor-pane.scroll textarea {
		overflow: auto;
	}

	.placeholder {
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		opacity: 0.75;
	}
</style>
