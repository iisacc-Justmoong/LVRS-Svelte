<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { registerRouter, unregisterRouter } from './navigator.js';

	interface RouteEntry {
		path: string;
		component?: any;
		props?: Record<string, unknown>;
	}

	export let routes: RouteEntry[] = [];
	export let initialPath = '/';
	export let registerAsGlobalNavigator = true;
	export let notFoundComponent: any = null;
	export let command: '' | 'go' | 'replace' | 'setRoot' | 'goTo' | 'replaceWith' | 'back' | 'popToRoot' = '';
	export let commandPath = '';
	export let commandComponent: any = null;
	export let commandParams: Record<string, unknown> = {};
	export let commandVersion = 0;

	const dispatch = createEventDispatcher<{
		navigated: { path: string; params: Record<string, unknown> };
		navigationFailed: { path: string };
	}>();

	type StackEntry = { path: string; params: Record<string, unknown>; component?: any; props?: Record<string, unknown> };

	let stack: StackEntry[] = [{ path: normalizePath(initialPath), params: {} }];
	let lastCommandVersion = -1;

	$: current = stack[stack.length - 1];
	$: currentPath = current?.path ?? '';
	$: currentParams = current?.params ?? {};
	$: currentRoute = resolveRoute(currentPath);

	function normalizePath(path: string): string {
		const raw = String(path || '/').trim();
		if (!raw) return '/';
		if (raw === '/') return '/';
		const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
		return withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash;
	}

	function matchPath(routePath: string, targetPath: string): { ok: boolean; params: Record<string, string> } {
		const routeTokens = normalizePath(routePath).split('/').filter(Boolean);
		const targetTokens = normalizePath(targetPath).split('/').filter(Boolean);
		if (routeTokens.length !== targetTokens.length) return { ok: false, params: {} };
		const params: Record<string, string> = {};
		for (let i = 0; i < routeTokens.length; i++) {
			const routeToken = routeTokens[i];
			const targetToken = targetTokens[i];
			if (routeToken.startsWith(':')) {
				params[routeToken.slice(1)] = targetToken;
				continue;
			}
			if (routeToken !== targetToken) return { ok: false, params: {} };
		}
		return { ok: true, params };
	}

	function resolveRoute(path: string): RouteEntry | null {
		for (const route of routes) {
			const match = matchPath(route.path, path);
			if (match.ok) return route;
		}
		return null;
	}

	function pushEntry(entry: StackEntry): void {
		stack = [...stack, entry];
		dispatch('navigated', { path: entry.path, params: entry.params });
	}

	function goInternal(path: string, params: Record<string, unknown> = {}): boolean {
		const normalized = normalizePath(path);
		const route = resolveRoute(normalized);
		if (!route && !notFoundComponent) {
			dispatch('navigationFailed', { path: normalized });
			return false;
		}
		const entry: StackEntry = { path: normalized, params: { ...params }, component: route?.component, props: route?.props };
		pushEntry(entry);
		return true;
	}

	function replaceInternal(path: string, params: Record<string, unknown> = {}): boolean {
		const normalized = normalizePath(path);
		const route = resolveRoute(normalized);
		if (!route && !notFoundComponent) {
			dispatch('navigationFailed', { path: normalized });
			return false;
		}
		const entry: StackEntry = { path: normalized, params: { ...params }, component: route?.component, props: route?.props };
		stack = [...stack.slice(0, Math.max(0, stack.length - 1)), entry];
		dispatch('navigated', { path: entry.path, params: entry.params });
		return true;
	}

	function setRootInternal(path: string, params: Record<string, unknown> = {}): boolean {
		const normalized = normalizePath(path);
		const route = resolveRoute(normalized);
		if (!route && !notFoundComponent) {
			dispatch('navigationFailed', { path: normalized });
			return false;
		}
		const entry: StackEntry = { path: normalized, params: { ...params }, component: route?.component, props: route?.props };
		stack = [entry];
		dispatch('navigated', { path: entry.path, params: entry.params });
		return true;
	}

	function goToInternal(component: any, params: Record<string, unknown> = {}): boolean {
		const path = `${currentPath || '/'}#component-${stack.length + 1}`;
		pushEntry({ path, params, component });
		return true;
	}

	function replaceWithInternal(component: any, params: Record<string, unknown> = {}): boolean {
		const path = `${currentPath || '/'}#component-${stack.length}`;
		stack = [...stack.slice(0, Math.max(0, stack.length - 1)), { path, params, component }];
		dispatch('navigated', { path, params });
		return true;
	}

	function backInternal(): boolean {
		if (stack.length <= 1) return false;
		stack = stack.slice(0, -1);
		return true;
	}

	function popToRootInternal(): boolean {
		if (stack.length <= 1) return false;
		stack = [stack[0]];
		return true;
	}

	const router = {
		go: goInternal,
		replace: replaceInternal,
		setRoot: setRootInternal,
		goTo: goToInternal,
		replaceWith: replaceWithInternal,
		back: backInternal,
		popToRoot: popToRootInternal
	};

	$: {
		if (commandVersion === lastCommandVersion) {
			// no-op
		} else {
			lastCommandVersion = commandVersion;
			if (command === 'go') goInternal(commandPath, commandParams);
			if (command === 'replace') replaceInternal(commandPath, commandParams);
			if (command === 'setRoot') setRootInternal(commandPath, commandParams);
			if (command === 'goTo') goToInternal(commandComponent, commandParams);
			if (command === 'replaceWith') replaceWithInternal(commandComponent, commandParams);
			if (command === 'back') backInternal();
			if (command === 'popToRoot') popToRootInternal();
		}
	}

	onMount(() => {
		if (registerAsGlobalNavigator) registerRouter(router);
	});

	onDestroy(() => {
		if (registerAsGlobalNavigator) unregisterRouter(router);
	});
</script>

<div class="lvrs-page-router">
	{#if currentRoute?.component}
		<svelte:component this={currentRoute.component} {...(currentRoute.props ?? {})} routePath={currentPath} routeParams={currentParams} />
	{:else if current?.component}
		<svelte:component this={current.component} {...(current.props ?? {})} routePath={currentPath} routeParams={currentParams} />
	{:else if notFoundComponent}
		<svelte:component this={notFoundComponent} routePath={currentPath} routeParams={currentParams} />
	{:else}
		<slot currentPath={currentPath} currentParams={currentParams} />
	{/if}
</div>

<style>
	.lvrs-page-router {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
