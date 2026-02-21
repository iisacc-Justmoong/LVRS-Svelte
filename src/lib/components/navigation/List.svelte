<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ListFooter from './ListFooter.svelte';
	import ListItem from './ListItem.svelte';
	import ListToolbar from './ListToolbar.svelte';

	export let items: any[] = ['Label', 'Label', 'Label'];
	export let selectedIndex = 1;
	export let interactive = true;
	export let toolbarVisible = false;
	export let toolbarIcon1 = '';
	export let toolbarIcon2 = '';
	export let toolbarIcon3 = '';
	export let footerVisible = true;
	export let footerButton1: any = { type: 'icon', iconName: 'projectStructure' };
	export let footerButton2: any = { type: 'icon', iconName: 'delete' };
	export let footerButton3: any = { type: 'icon', iconName: 'cwmPermissionView' };
	export let listWidth = 170;
	export let minimumListHeight = 223;
	export let itemHeight = 24;
	export let itemLabelLeftPadding = 8;
	export let backgroundColor = 'var(--lvrs-color-panel-bg03, #1F1F20)';

	const dispatch = createEventDispatcher<{
		itemTriggered: { index: number; item: any };
		toolbarIconTriggered: { index: number; source: string };
		footerButtonTriggered: { index: number; config: any };
	}>();

	$: safeItems = Array.isArray(items) ? items : [];

	function itemLabel(entry: any): string {
		if (typeof entry === 'string') return entry;
		return String(entry?.label ?? entry?.text ?? entry?.title ?? '');
	}

	function itemEnabled(entry: any): boolean {
		return !(entry && typeof entry === 'object' && entry.enabled === false);
	}
</script>

<div class="lvrs-list" style={`--lvrs-list-w:${listWidth}px; --lvrs-list-min-h:${minimumListHeight}px; --lvrs-list-item-h:${itemHeight}px; --lvrs-list-label-pad:${itemLabelLeftPadding}px; --lvrs-list-bg:${backgroundColor};`}>
	{#if toolbarVisible}
		<ListToolbar
			icon1={toolbarIcon1}
			icon2={toolbarIcon2}
			icon3={toolbarIcon3}
			{interactive}
			on:iconClicked={(event) => dispatch('toolbarIconTriggered', event.detail)}
		/>
	{/if}

	<div class="items">
		{#each safeItems as item, index (item?.id ?? index)}
			<div class="row" style={`min-height:var(--lvrs-list-item-h, 24px); padding-left:var(--lvrs-list-label-pad, 8px);`}>
				<ListItem
					label={itemLabel(item)}
					selected={(item?.selected ?? false) || index === selectedIndex}
					disabled={!interactive || !itemEnabled(item)}
					on:click={() => dispatch('itemTriggered', { index, item })}
				/>
			</div>
		{/each}
	</div>

	{#if footerVisible}
		<ListFooter
			button1={footerButton1}
			button2={footerButton2}
			button3={footerButton3}
			{interactive}
			on:buttonClicked={(event) => dispatch('footerButtonTriggered', event.detail)}
		/>
	{/if}
</div>

<style>
	.lvrs-list {
		display: flex;
		flex-direction: column;
		width: var(--lvrs-list-w, 170px);
		min-height: var(--lvrs-list-min-h, 223px);
		background: var(--lvrs-list-bg, #1F1F20);
	}

	.items {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		align-items: center;
	}
</style>
