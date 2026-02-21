<script lang="ts">
	import AbstractInputBar from './AbstractInputBar.svelte';

	export let mode: 'default' | 'search' = 'default';
	export let text = '';
	export let placeholderText = '';
	export let readOnly = false;
	export let disabled = false;
	export let clearButtonVisible = true;
	export let searchIconVisible = mode === 'search';

	$: showClearButton = clearButtonVisible && !readOnly && !disabled && text.length > 0;
</script>

<AbstractInputBar
	text={text}
	placeholderText={placeholderText}
	readOnly={readOnly}
	disabled={disabled}
	fieldMinHeight={28}
	insetHorizontal={7}
	insetVertical={3}
	sideSpacing={5}
	cornerRadius={5}
	on:textEdited={(event) => {
		text = event.detail;
	}}
>
	<svelte:fragment slot="leading">
		{#if searchIconVisible}
			<span class="icon">⌕</span>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="trailing">
		{#if showClearButton}
			<button
				type="button"
				class="clear"
				on:click={() => {
					text = '';
				}}
			>
				×
			</button>
		{/if}
	</svelte:fragment>
</AbstractInputBar>

<style>
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: var(--lvrs-control-icon-sm, 22px);
		height: var(--lvrs-control-icon-sm, 22px);
		font-size: 0.9em;
		color: var(--lvrs-color-text-description, #99FFFFFF);
	}

	.clear {
		width: 14px;
		height: 14px;
		border: 0;
		border-radius: 999px;
		padding: 0;
		background: var(--lvrs-color-text-description, #99FFFFFF);
		color: var(--lvrs-color-panel-bg10, #343536);
		font-size: 11px;
		line-height: 1;
		cursor: pointer;
	}
</style>
