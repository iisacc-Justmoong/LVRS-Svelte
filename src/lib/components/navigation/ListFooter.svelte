<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconButton from '../control/IconButton.svelte';
	import IconMenuButton from '../control/IconMenuButton.svelte';

	export let button1: any = { type: 'icon', iconName: 'projectStructure' };
	export let button2: any = { type: 'icon', iconName: 'delete' };
	export let button3: any = { type: 'icon', iconName: 'cwmPermissionView' };
	export let horizontalPadding = 2;
	export let verticalPadding = 2;
	export let spacing = 0;
	export let interactive = true;

	const dispatch = createEventDispatcher<{ buttonClicked: { index: number; config: any } }>();

	$: buttons = [button1, button2, button3];

	function isMenu(config: any): boolean {
		const type = String(config?.type ?? config?.kind ?? 'icon').toLowerCase();
		return type === 'menu' || type === 'iconmenu' || type === 'iconmenubutton';
	}

	function onClick(index: number, config: any): void {
		if (typeof config?.onClicked === 'function') config.onClicked();
		dispatch('buttonClicked', { index, config });
	}
</script>

<div class="lvrs-list-footer" style={`--lvrs-lf-pad-x:${horizontalPadding}px; --lvrs-lf-pad-y:${verticalPadding}px; --lvrs-lf-gap:${spacing}px;`}>
	{#each buttons as config, index (index)}
		{#if isMenu(config)}
			<IconMenuButton
				iconName={String(config?.iconName ?? '')}
				iconSource={String(config?.iconSource ?? '')}
				iconGlyph={String(config?.iconGlyph ?? '')}
				tone="borderless"
				disabled={!interactive || config?.enabled === false}
				on:click={() => onClick(index, config)}
			/>
		{:else}
			<IconButton
				iconName={String(config?.iconName ?? '')}
				iconSource={String(config?.iconSource ?? '')}
				iconGlyph={String(config?.iconGlyph ?? '')}
				tone="borderless"
				disabled={!interactive || config?.enabled === false}
				on:click={() => onClick(index, config)}
			/>
		{/if}
	{/each}
</div>

<style>
	.lvrs-list-footer {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-lf-gap, 0px);
		padding: var(--lvrs-lf-pad-y, 2px) var(--lvrs-lf-pad-x, 2px);
	}
</style>
