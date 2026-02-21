<script lang="ts">
	import LabelButton from './LabelButton.svelte';

	interface LabelSegmentItem {
		id?: string | number;
		text: string;
		disabled?: boolean;
	}

	export let items: LabelSegmentItem[] = [];
	export let activeIndex = -1;
	export let forceBorderlessTone = true;
</script>

<div class="lvrs-segmented label">
	{#each items as item, index (item.id ?? index)}
		<LabelButton
			text={item.text}
			tone={forceBorderlessTone ? 'default' : index === activeIndex ? 'primary' : 'default'}
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
