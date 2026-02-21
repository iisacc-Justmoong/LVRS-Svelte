<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let target: HTMLInputElement | HTMLTextAreaElement | null = null;
	export let guardEnabled = true;
	export let commitOnLocaleChanged = false;
	export let commitOnVisibilityLost = true;
	export let commitOnFocusLost = true;

	let composing = false;
	let cleanup: Array<() => void> = [];

	function addListener<K extends keyof HTMLElementEventMap>(node: HTMLElement, event: K, handler: (ev: HTMLElementEventMap[K]) => void): void {
		node.addEventListener(event, handler as EventListener);
		cleanup.push(() => node.removeEventListener(event, handler as EventListener));
	}

	function commit(reason: string): void {
		if (!guardEnabled || !target || !composing) return;
		const commitEvent = new CustomEvent('lvrs:ime-commit', { detail: { reason } });
		target.dispatchEvent(commitEvent);
		composing = false;
	}

	onMount(() => {
		if (!target) return;
		addListener(target, 'compositionstart', () => {
			composing = true;
		});
		addListener(target, 'compositionend', () => {
			composing = false;
		});
		if (commitOnFocusLost) {
			addListener(target, 'blur', () => commit('focus-lost'));
		}

		const onVisibilityChange = (): void => {
			if (commitOnVisibilityLost && document.visibilityState === 'hidden') commit('visibility-hidden');
		};
		document.addEventListener('visibilitychange', onVisibilityChange);
		cleanup.push(() => document.removeEventListener('visibilitychange', onVisibilityChange));

		const onLanguageChange = (): void => {
			if (commitOnLocaleChanged) commit('locale-changed');
		};
		window.addEventListener('languagechange', onLanguageChange);
		cleanup.push(() => window.removeEventListener('languagechange', onLanguageChange));
	});

	onDestroy(() => {
		cleanup.forEach((fn) => fn());
		cleanup = [];
	});
</script>
