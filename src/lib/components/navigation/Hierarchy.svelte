<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import HierarchyList from './HierarchyList.svelte';
	import HierarchyToolbar from './HierarchyToolbar.svelte';
	import ListFooter from './ListFooter.svelte';

	export let minimumPanelWidth = 200;
	export let minimumPanelHeight = 530;
	export let panelColor = 'var(--lvrs-color-panel-bg05, #242525)';

	export let toolbarItems: any[] = [];
	export let activeToolbarIndex = -1;
	
	export let model: any[] = [];
	export let autoExpandDepth = 1;
	export let listCommand: '' | 'expandAll' | 'collapseAll' | 'activateById' | 'activateByKey' = '';
	export let listCommandArg: any = null;
	export let listCommandVersion = 0;
	export let footerVisible = false;
	export let footerInteractive = true;
	export let footerButton1: any = { type: 'icon', iconName: 'projectStructure' };
	export let footerButton2: any = { type: 'icon', iconName: 'delete' };
	export let footerButton3: any = { type: 'icon', iconName: 'cwmPermissionView' };

	const dispatch = createEventDispatcher<{
		toolbarActivated: { button: any; buttonId: any; index: number };
		toolbarButtonTriggered: { button: any; buttonId: any; index: number; item: any };
		toolbarEventTriggered: { eventName: string; payload: any; index: number; item: any; buttonId: any };
		listItemActivated: { item: any; itemId: any; index: number };
		listItemExpanded: { item: any; itemId: any; index: number; expanded: boolean };
		footerButtonTriggered: { index: number; config: any };
	}>();
</script>

<section class="lvrs-hierarchy" style={`--lvrs-hier-min-w:${minimumPanelWidth}px; --lvrs-hier-min-h:${minimumPanelHeight}px; --lvrs-hier-bg:${panelColor};`}>
	<HierarchyToolbar
		buttonItems={toolbarItems}
		bind:activeIndex={activeToolbarIndex}
		on:activeChanged={(event) => dispatch('toolbarActivated', event.detail)}
		on:buttonTriggered={(event) => dispatch('toolbarButtonTriggered', event.detail)}
		on:buttonEventTriggered={(event) => dispatch('toolbarEventTriggered', event.detail)}
	/>

	<div class="list-wrap">
		<HierarchyList
			{model}
			{autoExpandDepth}
			command={listCommand}
			commandArg={listCommandArg}
			commandVersion={listCommandVersion}
			on:activeChanged={(event) => dispatch('listItemActivated', event.detail)}
			on:expansionChanged={(event) =>
				dispatch('listItemExpanded', {
					item: event.detail.item,
					itemId: event.detail.item?.itemId ?? event.detail.index,
					index: event.detail.index,
					expanded: event.detail.expanded
				})}
		/>
	</div>

	{#if footerVisible}
		<ListFooter
			button1={footerButton1}
			button2={footerButton2}
			button3={footerButton3}
			interactive={footerInteractive}
			on:buttonClicked={(event) => dispatch('footerButtonTriggered', event.detail)}
		/>
	{/if}
</section>

<style>
	.lvrs-hierarchy {
		display: flex;
		flex-direction: column;
		min-width: var(--lvrs-hier-min-w, 200px);
		min-height: var(--lvrs-hier-min-h, 530px);
		background: var(--lvrs-hier-bg, #242525);
	}

	.list-wrap {
		flex: 1;
		overflow: auto;
	}
</style>
