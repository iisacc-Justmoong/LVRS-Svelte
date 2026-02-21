<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { activeRouter } from './navigator.js';

	export let href = '/';
	export let to = href;
	export let params: Record<string, unknown> = {};
	export let replace = false;
	export let targetComponent: any = null;
	export let disabled = false;
	export let underline = false;

	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	function onClick(event: MouseEvent): void {
		if (disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		const router = activeRouter();
		if (router) {
			event.preventDefault();
			if (targetComponent) {
				if (replace) router.replaceWith?.(targetComponent, params);
				else router.goTo?.(targetComponent, params);
			} else if (to) {
				if (replace) router.replace?.(to, params);
				else router.go?.(to, params);
			}
		}
		dispatch('click', event);
	}
</script>

<a href={to || href} class="lvrs-link" class:disabled={disabled} style:text-decoration={underline ? 'underline' : 'none'} on:click={onClick}>
	<slot>{to || href}</slot>
</a>

<style>
	.lvrs-link {
		color: var(--lvrs-color-primary, #0A84FF);
		cursor: pointer;
	}

	.lvrs-link:hover {
		color: var(--lvrs-color-text-primary, #E5FFFFFF);
	}

	.lvrs-link.disabled {
		pointer-events: none;
		opacity: 0.65;
	}
</style>
