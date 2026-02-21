<script lang="ts">
	import type { AbstractButtonTone } from '../../types.js';
	import IconButton from './IconButton.svelte';
	import Label from './Label.svelte';

	export let text = '';
	export let tone: AbstractButtonTone = 'primary';
	export let disabled = false;
	export let iconName = '';
	export let iconSource = '';
	export let iconGlyph = '';
	export let iconSize = 22;
</script>

<IconButton {text} {tone} {disabled} {iconName} {iconSource} {iconGlyph} {iconSize}>
	<span class="lvrs-icon-menu-content" style={`--lvrs-icon-size:${iconSize}px;`}>
		<slot name="icon">
			{#if iconSource.length > 0}
				<img class="lvrs-icon" src={iconSource} alt={iconName || text} />
			{:else}
				<span class="lvrs-icon-glyph" aria-hidden="true">{iconGlyph || (iconName.length > 0 ? iconName.slice(0, 1).toUpperCase() : '■')}</span>
			{/if}
		</slot>
		{#if text.length > 0}
			<Label variant="body">{text}</Label>
		{/if}
		<span class="lvrs-chevron" aria-hidden="true">▾</span>
	</span>
</IconButton>

<style>
	.lvrs-icon-menu-content {
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
	}

	.lvrs-icon {
		object-fit: contain;
	}

	.lvrs-chevron {
		font-size: 0.9em;
		opacity: 0.85;
	}
</style>
