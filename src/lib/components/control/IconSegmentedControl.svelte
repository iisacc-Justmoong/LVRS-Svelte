<script lang="ts">
	import IconButton from './IconButton.svelte';

	interface IconSegmentItem {
		id?: string | number;
		iconName?: string;
		iconSource?: string;
		iconGlyph?: string;
		text?: string;
		disabled?: boolean;
	}

	export let items: IconSegmentItem[] = [];
	export let activeIndex = -1;
	export let forceBorderlessTone = true;
</script>

<div class="lvrs-segmented icon">
	{#each items as item, index (item.id ?? index)}
		<IconButton
			text={item.text ?? ''}
			iconName={item.iconName ?? ''}
			iconSource={item.iconSource ?? ''}
			iconGlyph={item.iconGlyph ?? ''}
			tone={forceBorderlessTone ? 'borderless' : index === activeIndex ? 'default' : 'borderless'}
			disabled={!!item.disabled}
			on:click={() => (activeIndex = index)}
		/>
	{/each}
	<slot />
</div>

<style>
	.lvrs-segmented {
		display: inline-flex;
		align-items: center;
		padding: var(--lvrs-gap-4, 4px);
		gap: var(--lvrs-gap-2, 2px);
		border: 2px solid var(--lvrs-color-panel-bg12, #3C3E3F);
		border-radius: var(--lvrs-radius-md, 8px);
		background: var(--lvrs-color-panel-bg08, #2C2E2F);
	}
</style>
