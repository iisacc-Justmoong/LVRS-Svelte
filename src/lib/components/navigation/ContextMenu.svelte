<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import MenuDivider from './MenuDivider.svelte';
	import MenuItem from './MenuItem.svelte';

	export let open = false;
	export let x = 0;
	export let y = 0;
	export let items: any[] = [];
	export let itemWidth = 161;
	export let itemSpacing = 0;
	export let selectedIndex = -1;
	export let autoCloseOnTrigger = true;
	export let dismissOnGlobalPress = true;
	export let dismissOnGlobalContextRequest = true;

	const dispatch = createEventDispatcher<{
		itemTriggered: { index: number; item: any };
		itemEventTriggered: { eventName: string; payload: any; index: number; item: any };
		closed: void;
	}>();

	function isDivider(item: any): boolean {
		if (!item || typeof item !== 'object') return false;
		return String(item.type ?? '').toLowerCase() === 'divider' || item.divider === true;
	}

	function close(): void {
		open = false;
		dispatch('closed');
	}

	function emitItem(index: number, item: any): void {
		dispatch('itemTriggered', { index, item });
		const eventName = String(item?.eventName ?? item?.event ?? item?.action ?? item?.id ?? '').trim();
		if (eventName.length > 0) {
			dispatch('itemEventTriggered', {
				eventName,
				payload: item?.eventPayload ?? item?.payload ?? item,
				index,
				item
			});
		}
		if (typeof item?.onTriggered === 'function') {
			item.onTriggered({ index, item, close });
		}
		if (autoCloseOnTrigger) close();
	}

	function onDocumentPointer(event: PointerEvent): void {
		if (!open || !dismissOnGlobalPress) return;
		const target = event.target as HTMLElement | null;
		if (!target?.closest('.lvrs-context-menu')) close();
	}

	function onDocumentContextMenu(event: MouseEvent): void {
		if (!open || !dismissOnGlobalContextRequest) return;
		const target = event.target as HTMLElement | null;
		if (!target?.closest('.lvrs-context-menu')) close();
	}

	$: {
		if (open) {
			document.addEventListener('pointerdown', onDocumentPointer);
			document.addEventListener('contextmenu', onDocumentContextMenu);
		} else {
			document.removeEventListener('pointerdown', onDocumentPointer);
			document.removeEventListener('contextmenu', onDocumentContextMenu);
		}
	}

	onDestroy(() => {
		document.removeEventListener('pointerdown', onDocumentPointer);
		document.removeEventListener('contextmenu', onDocumentContextMenu);
	});
</script>

{#if open}
	<div class="lvrs-context-menu" style={`left:${x}px; top:${y}px; --lvrs-menu-item-w:${itemWidth}px; --lvrs-menu-gap:${itemSpacing}px;`}>
		{#each items as item, index (item?.id ?? index)}
			{#if isDivider(item)}
				<MenuDivider axis="horizontal" lineLength={itemWidth} />
			{:else}
				<MenuItem
					label={String(item?.label ?? item?.text ?? item?.title ?? '')}
					key={String(item?.key ?? item?.shortcut ?? '')}
					showChevron={item?.showChevron ?? item?.hasSubmenu ?? false}
					selectionDirection={item?.selectionDirection ?? 'right'}
					state={item?.state ?? (index === selectedIndex ? 1 : item?.enabled === false ? 2 : 0)}
					iconName={String(item?.iconName ?? item?.icon ?? '')}
					iconSource={String(item?.iconSource ?? item?.source ?? '')}
					itemWidth={itemWidth}
					disabled={item?.enabled === false}
					on:trigger={() => emitItem(index, item)}
				/>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.lvrs-context-menu {
		position: fixed;
		z-index: 1200;
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-menu-gap, 0px);
		padding: var(--lvrs-gap-4, 4px);
		border-radius: var(--lvrs-radius-md, 8px);
		background: var(--lvrs-color-context-surface, #1F1F20);
		box-shadow: 0 16px 38px #30000000;
	}
</style>
