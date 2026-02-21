<script lang="ts">
	import type { AbstractButtonTone } from '../../types.js';
	import AbstractButton from './AbstractButton.svelte';
	import Label from './Label.svelte';

	export let text = 'Open';
	export let tone: AbstractButtonTone = 'primary';
	export let disabled = false;
</script>

<AbstractButton {text} {tone} {disabled} horizontalPadding={8} verticalPadding={4} cornerRadius={4}>
	<span class="lvrs-label-menu-content">
		<Label variant="body">{text}</Label>
		<span class="lvrs-chevron" aria-hidden="true">▾</span>
	</span>
</AbstractButton>

<style>
	.lvrs-label-menu-content {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-2, 2px);
	}

	.lvrs-chevron {
		font-size: 0.9em;
		opacity: 0.85;
	}
</style>
