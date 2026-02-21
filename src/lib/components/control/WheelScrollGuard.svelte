<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let targetElement: HTMLElement | null = null;
	export let consumeInside = true;
	export let fallbackStep = 20;

	let host: HTMLDivElement | null = null;
	let off: (() => void) | null = null;

	function routeWheel(event: WheelEvent): void {
		const target = targetElement ?? host;
		if (!target) return;

		const delta = Math.abs(event.deltaY) > 0 ? event.deltaY : (event.deltaMode === 1 ? fallbackStep : event.deltaX);
		if (target.scrollHeight > target.clientHeight) {
			target.scrollTop += delta;
		}
		if (consumeInside) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	onMount(() => {
		if (!host) return;
		const listener = (event: WheelEvent): void => routeWheel(event);
		host.addEventListener('wheel', listener, { passive: false });
		off = () => host?.removeEventListener('wheel', listener);
	});

	onDestroy(() => {
		off?.();
		off = null;
	});
</script>

<div bind:this={host} class="lvrs-wheel-guard">
	<slot />
</div>

<style>
	.lvrs-wheel-guard {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
