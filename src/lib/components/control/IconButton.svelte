<script lang="ts">
	import type { AbstractButtonTone } from '../../types.js';
	import AbstractButton from './AbstractButton.svelte';
	import Label from './Label.svelte';

	export let text = '';
	export let tone: AbstractButtonTone = 'primary';
	export let disabled = false;
	export let iconName = '';
	export let iconSource = '';
	export let iconGlyph = '';
	export let iconSize = 22;

	$: fallbackGlyph = iconName.length > 0 ? iconName.slice(0, 1).toUpperCase() : '■';
	$: resolvedGlyph = iconGlyph || fallbackGlyph;
</script>

<AbstractButton {text} {tone} {disabled} horizontalPadding={8} verticalPadding={4} cornerRadius={4}>
	<slot>
		<span class="lvrs-icon-button-content" style={`--lvrs-icon-size:${iconSize}px;`}>
			{#if iconSource.length > 0}
				<img class="lvrs-icon" src={iconSource} alt={iconName || text} />
			{:else}
				<span class="lvrs-icon-glyph" aria-hidden="true">{resolvedGlyph}</span>
			{/if}
			{#if text.length > 0}
				<Label variant="body">{text}</Label>
			{/if}
		</span>
	</slot>
</AbstractButton>

<style>
	.lvrs-icon-button-content {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--lvrs-gap-4, 4px);
	}

	.lvrs-icon,
	.lvrs-icon-glyph {
		width: var(--lvrs-icon-size, 22px);
		height: var(--lvrs-icon-size, 22px);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: calc(var(--lvrs-icon-size, 22px) * 0.75);
		line-height: 1;
	}

	.lvrs-icon {
		object-fit: contain;
	}
</style>
