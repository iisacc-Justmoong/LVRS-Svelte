<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ToolbarButton from './ToolbarButton.svelte';

	export let buttonItems: any[] = [];
	export let activeIndex = -1;
	export let horizontalPadding = 8;
	export let verticalPadding = 2;
	export let spacing = 0;
	export let backgroundColor = 'var(--lvrs-color-surface-sub, #212223)';

	const dispatch = createEventDispatcher<{
		activeChanged: { button: any; buttonId: any; index: number };
		buttonTriggered: { button: any; buttonId: any; index: number; item: any };
		buttonEventTriggered: { eventName: string; payload: any; index: number; item: any; buttonId: any };
	}>();

	function trigger(index: number, item: any): void {
		activeIndex = index;
		const buttonId = item?.buttonId ?? item?.id ?? index;
		dispatch('activeChanged', { button: item, buttonId, index });
		dispatch('buttonTriggered', { button: item, buttonId, index, item });
		const eventName = String(item?.eventName ?? item?.event ?? item?.action ?? '').trim();
		if (eventName.length > 0) {
			dispatch('buttonEventTriggered', {
				eventName,
				payload: item?.eventPayload ?? item?.payload ?? item,
				index,
				item,
				buttonId
			});
		}
		if (typeof item?.onClicked === 'function') item.onClicked({ index, item });
	}
</script>

<div class="lvrs-hierarchy-toolbar" style={`--lvrs-toolbar-pad-x:${horizontalPadding}px; --lvrs-toolbar-pad-y:${verticalPadding}px; --lvrs-toolbar-gap:${spacing}px; --lvrs-toolbar-bg:${backgroundColor};`}>
	{#each buttonItems as item, index (item?.id ?? index)}
		<button type="button" class="item-wrap" on:click={() => trigger(index, item)}>
			<ToolbarButton
				buttonId={item?.buttonId ?? item?.id ?? index}
				iconName={String(item?.iconName ?? item?.icon ?? '')}
				iconSource={String(item?.iconSource ?? item?.source ?? '')}
				iconGlyph={String(item?.iconGlyph ?? '')}
				active={index === activeIndex}
				disabled={item?.enabled === false}
			/>
		</button>
	{/each}
	<slot />
</div>

<style>
	.lvrs-hierarchy-toolbar {
		display: flex;
		align-items: center;
		gap: var(--lvrs-toolbar-gap, 0px);
		padding: var(--lvrs-toolbar-pad-y, 2px) var(--lvrs-toolbar-pad-x, 8px);
		background: var(--lvrs-toolbar-bg, #212223);
	}

	.item-wrap {
		display: inline-flex;
		padding: 0;
		border: 0;
		background: transparent;
	}
</style>
