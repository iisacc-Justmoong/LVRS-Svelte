<script lang="ts">
	import type { LabelButtonTone } from '../../types.js';
	import LabelButton from '../control/LabelButton.svelte';

	export let text = 'Button';
	export let tone: LabelButtonTone = 'default';
	export let disabled = false;
</script>

<LabelButton
	{text}
	tone={tone === 'default' ? 'default' : tone}
	{disabled}
/>
