<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import HierarchyItem from './HierarchyItem.svelte';

	export let model: any[] = [];
	export let childrenRole = 'children';
	export let itemIdRole = 'itemId';
	export let itemKeyRole = 'key';
	export let labelRole = 'label';
	export let iconNameRole = 'iconName';
	export let iconSourceRole = 'iconSource';
	export let iconGlyphRole = 'iconGlyph';
	export let enabledRole = 'enabled';
	export let expandedRole = 'expanded';
	export let showChevronRole = 'showChevron';
	export let autoExpandDepth = 1;
	export let activeItem: any = null;
	export let activeItemId: number | string = -1;
	export let activeItemKey = '';
	export let command: '' | 'expandAll' | 'collapseAll' | 'activateById' | 'activateByKey' = '';
	export let commandArg: any = null;
	export let commandVersion = 0;

	const dispatch = createEventDispatcher<{
		activeChanged: { item: any; itemId: any; index: number };
		expansionChanged: { item: any; expanded: boolean; index: number };
		ensureVisibleRequested: { y: number; height: number };
	}>();

	let expandedKeys = new Set<string>();
	let lastCommandVersion = -1;

	function roleValue(item: any, role: string, fallback: any): any {
		if (!item || typeof item !== 'object') return fallback;
		return item[role] ?? fallback;
	}

	function nodeKey(item: any, index: number, parentKey: string): string {
		const explicit = roleValue(item, itemKeyRole, '');
		if (String(explicit).length > 0) return String(explicit);
		return `${parentKey}/${index}`;
	}

	function isExpanded(item: any, depth: number, key: string): boolean {
		if (expandedKeys.has(key)) return true;
		const byModel = roleValue(item, expandedRole, undefined);
		if (typeof byModel === 'boolean') return byModel;
		return depth < autoExpandDepth;
	}

	interface FlatEntry {
		item: any;
		depth: number;
		key: string;
		id: any;
		label: string;
		iconName: string;
		iconSource: string;
		iconGlyph: string;
		enabled: boolean;
		expanded: boolean;
		showChevron: boolean;
	}

	function flatten(items: any[], depth = 0, parentKey = 'root'): FlatEntry[] {
		const result: FlatEntry[] = [];
		(items ?? []).forEach((item, index) => {
			const key = nodeKey(item, index, parentKey);
			const children = Array.isArray(item?.[childrenRole]) ? item[childrenRole] : [];
			const expanded = isExpanded(item, depth, key);
			const entry: FlatEntry = {
				item,
				depth,
				key,
				id: roleValue(item, itemIdRole, index),
				label: String(roleValue(item, labelRole, item?.label ?? item?.text ?? 'Item')),
				iconName: String(roleValue(item, iconNameRole, '')),
				iconSource: String(roleValue(item, iconSourceRole, '')),
				iconGlyph: String(roleValue(item, iconGlyphRole, '')),
				enabled: roleValue(item, enabledRole, true) !== false,
				expanded,
				showChevron: roleValue(item, showChevronRole, children.length > 0) !== false && children.length > 0
			};
			result.push(entry);
			if (children.length > 0 && expanded) {
				result.push(...flatten(children, depth + 1, key));
			}
		});
		return result;
	}

	$: flat = flatten(Array.isArray(model) ? model : []);

	function activate(entry: FlatEntry, index: number): void {
		activeItem = entry.item;
		activeItemId = entry.id;
		activeItemKey = entry.key;
		dispatch('activeChanged', { item: entry.item, itemId: entry.id, index });
		dispatch('ensureVisibleRequested', { y: index * 28, height: 28 });
	}

	function toggle(entry: FlatEntry, index: number): void {
		if (expandedKeys.has(entry.key)) expandedKeys.delete(entry.key);
		else expandedKeys.add(entry.key);
		expandedKeys = new Set(expandedKeys);
		dispatch('expansionChanged', { item: entry.item, expanded: expandedKeys.has(entry.key), index });
	}

	function expandAllInternal(): void {
		flat.forEach((entry) => {
			if (entry.showChevron) expandedKeys.add(entry.key);
		});
		expandedKeys = new Set(expandedKeys);
	}

	function collapseAllInternal(keepRootExpanded = false): void {
		expandedKeys.clear();
		if (keepRootExpanded) {
			flat.filter((entry) => entry.depth === 0 && entry.showChevron).forEach((entry) => expandedKeys.add(entry.key));
		}
		expandedKeys = new Set(expandedKeys);
	}

	function activateByIdInternal(id: any): boolean {
		const index = flat.findIndex((entry) => entry.id === id);
		if (index < 0) return false;
		activate(flat[index], index);
		return true;
	}

	function activateByKeyInternal(key: string): boolean {
		const index = flat.findIndex((entry) => entry.key === key);
		if (index < 0) return false;
		activate(flat[index], index);
		return true;
	}

	$: {
		if (commandVersion === lastCommandVersion) {
			// no-op
		} else {
			lastCommandVersion = commandVersion;
			if (command === 'expandAll') expandAllInternal();
			if (command === 'collapseAll') collapseAllInternal(!!commandArg);
			if (command === 'activateById') activateByIdInternal(commandArg);
			if (command === 'activateByKey') activateByKeyInternal(String(commandArg ?? ''));
		}
	}
</script>

<div class="lvrs-hierarchy-list">
	{#each flat as entry, index (entry.key)}
		<HierarchyItem
			itemId={entry.id}
			itemKey={entry.key}
			label={entry.label}
			iconName={entry.iconName}
			iconSource={entry.iconSource}
			iconGlyph={entry.iconGlyph}
			showChevron={entry.showChevron}
			expanded={entry.expanded}
			selected={activeItemKey === entry.key}
			indentLevel={entry.depth}
			disabled={!entry.enabled}
			on:activate={() => activate(entry, index)}
			on:toggle={() => toggle(entry, index)}
		/>
	{/each}
	<slot />
</div>

<style>
	.lvrs-hierarchy-list {
		display: flex;
		flex-direction: column;
	}
</style>
