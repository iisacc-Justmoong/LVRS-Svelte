<script lang="ts">
	import { registerRouter, unregisterRouter, type RouterLike } from './navigator.js';
	import { onDestroy, onMount } from 'svelte';

	export let router: RouterLike | null = null;

	onMount(() => {
		if (router) registerRouter(router);
	});

	onDestroy(() => {
		if (router) unregisterRouter(router);
	});
</script>

<slot />
