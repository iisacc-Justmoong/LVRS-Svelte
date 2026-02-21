<script lang="ts">
	import IconButton from '../control/IconButton.svelte';

	export let buttonId: string | number = -1;
	export let iconName = '';
	export let iconSource = '';
	export let iconGlyph = '';
	export let active = false;
	export let disabled = false;
</script>

<span data-button-id={String(buttonId)} class="lvrs-toolbar-button-wrap">
	<IconButton
		text=""
		{iconName}
		{iconSource}
		{iconGlyph}
		tone={active ? 'default' : 'borderless'}
		{disabled}
	/>
</span>

<style>
	.lvrs-toolbar-button-wrap {
		display: inline-flex;
	}
</style>
