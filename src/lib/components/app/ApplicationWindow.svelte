<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { LayoutMode, LayoutProfile, NavigationMode, NavItem } from '../../types.js';
	import Label from '../control/Label.svelte';

	export let title = 'LVRS';
	export let subtitle = '';
	export let navItems: NavItem[] = [];
	export let navIndex = 0;
	export let navigationEnabled = true;
	export let navTitle = 'Navigation';
	export let navTitleVisible = true;
	export let layoutMode: LayoutMode = 'auto';
	export let desktopBreakpoint = 980;
	export let windowColor = 'var(--lvrs-color-window, #141414)';
	export let contentPadding = 16;
	export let preferBottomNavigation = true;
	export let bottomNavigationMaxItems = 5;

	const dispatch = createEventDispatcher<{
		navActivated: { index: number; item: NavItem };
		adaptiveLayoutStateChanged: { profile: LayoutProfile; navigationMode: NavigationMode };
	}>();

	let host: HTMLElement | null = null;
	let width = 0;
	let lastLayoutSignature = '';

	function normalizedNavItem(item: NavItem): { label: string; subtitle: string; path: string; id: string } {
		if (typeof item === 'string') {
			return {
				label: item,
				subtitle: '',
				path: '',
				id: item
			};
		}
		return {
			label: item.label,
			subtitle: item.subtitle ?? '',
			path: item.path ?? '',
			id: item.id ?? item.label
		};
	}

	function activateNav(index: number): void {
		if (index < 0 || index >= navItems.length) return;
		navIndex = index;
		dispatch('navActivated', { index, item: navItems[index] });
	}

	$: hasNav = navigationEnabled && navItems.length > 0;
	$: isWide = width >= desktopBreakpoint;
	$: layoutProfile = (() => {
		if (layoutMode === 'mobile') return isWide ? 'mobile-wide' : 'mobile-compact';
		if (layoutMode === 'desktop') return isWide ? 'desktop-wide' : 'desktop-compact';
		return isWide ? 'desktop-wide' : 'mobile-compact';
	})() as LayoutProfile;
	$: navigationMode = (() => {
		if (!hasNav) return 'none';
		const isDesktopProfile = layoutProfile.startsWith('desktop');
		if (isDesktopProfile) return 'rail';
		if (preferBottomNavigation && navItems.length <= bottomNavigationMaxItems) return 'bottom';
		return 'drawer';
	})() as NavigationMode;

	$: {
		const signature = `${layoutProfile}:${navigationMode}`;
		if (signature !== lastLayoutSignature) {
			lastLayoutSignature = signature;
			dispatch('adaptiveLayoutStateChanged', { profile: layoutProfile, navigationMode });
		}
	}

	onMount(() => {
		if (!host) return;
		width = host.clientWidth;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				width = entry.contentRect.width;
			}
		});
		observer.observe(host);

		return () => observer.disconnect();
	});
</script>

<section
	bind:this={host}
	class="lvrs-application-window"
	data-layout-profile={layoutProfile}
	data-navigation-mode={navigationMode}
	style={`--lvrs-window-color: ${windowColor}; --lvrs-content-padding: ${contentPadding}px;`}
>
	<div class="lvrs-shell">
		{#if hasNav && navigationMode === 'rail'}
			<aside class="lvrs-nav-rail">
				{#if navTitleVisible}
					<div class="lvrs-nav-title">
						<Label variant="header2">{navTitle}</Label>
					</div>
				{/if}
				<slot name="nav-header" />
				<div class="lvrs-nav-items">
					{#each navItems as item, index (normalizedNavItem(item).id)}
						{@const navItem = normalizedNavItem(item)}
						<button
							type="button"
							class="lvrs-nav-item {index === navIndex ? 'is-active' : ''}"
							on:click={() => activateNav(index)}
						>
							<Label variant="body">{navItem.label}</Label>
							{#if navItem.subtitle}
								<Label variant="caption">{navItem.subtitle}</Label>
							{/if}
						</button>
					{/each}
				</div>
				<slot name="nav-footer" />
			</aside>
		{/if}

		<div class="lvrs-content-frame">
			<header class="lvrs-header">
				<div class="lvrs-title-wrap">
					<Label variant="header" block={true}>
						<slot name="title">{title}</slot>
					</Label>
					{#if subtitle.length > 0}
						<Label variant="description" block={true}>{subtitle}</Label>
					{/if}
				</div>
				<div class="lvrs-header-actions">
					<slot name="header-actions" />
				</div>
			</header>

			<main class="lvrs-content">
				<slot />
			</main>
		</div>
	</div>

	{#if hasNav && navigationMode === 'bottom'}
		<nav class="lvrs-bottom-nav">
			{#each navItems as item, index (normalizedNavItem(item).id)}
				{@const navItem = normalizedNavItem(item)}
				<button
					type="button"
					class="lvrs-bottom-nav-item {index === navIndex ? 'is-active' : ''}"
					on:click={() => activateNav(index)}
				>
					<Label variant="caption" align="center">{navItem.label}</Label>
				</button>
			{/each}
		</nav>
	{/if}
</section>

<style>
	.lvrs-application-window {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100%;
		background: radial-gradient(1200px 640px at 12% -10%, #2d3542 0%, transparent 55%),
			radial-gradient(900px 560px at 100% 120%, #222f40 0%, transparent 64%),
			var(--lvrs-window-color);
	}

	.lvrs-shell {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.lvrs-nav-rail {
		display: flex;
		flex-direction: column;
		width: 220px;
		padding: var(--lvrs-gap-12, 12px);
		border-right: 1px solid color-mix(in srgb, var(--lvrs-color-panel-bg12, #3c3e3f), transparent 30%);
		background: color-mix(in srgb, var(--lvrs-color-panel-bg03, #1f1f20), black 8%);
		gap: var(--lvrs-gap-8, 8px);
	}

	.lvrs-nav-title {
		padding-bottom: var(--lvrs-gap-8, 8px);
	}

	.lvrs-nav-items {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-gap-4, 4px);
	}

	.lvrs-nav-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--lvrs-gap-2, 2px);
		padding: var(--lvrs-gap-8, 8px);
		border-radius: var(--lvrs-radius-base, 6px);
		border: 1px solid transparent;
		background: transparent;
		cursor: pointer;
	}

	.lvrs-nav-item:hover {
		background: color-mix(in srgb, var(--lvrs-color-panel-bg07, #292a2b), transparent 20%);
	}

	.lvrs-nav-item.is-active {
		border-color: color-mix(in srgb, var(--lvrs-color-primary, #0a84ff), transparent 45%);
		background: color-mix(in srgb, var(--lvrs-color-overlay-primary, #400a84ff), transparent 18%);
	}

	.lvrs-content-frame {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		min-height: 0;
	}

	.lvrs-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--lvrs-gap-12, 12px);
		padding: var(--lvrs-gap-16, 16px) var(--lvrs-content-padding);
		border-bottom: 1px solid color-mix(in srgb, var(--lvrs-color-panel-bg12, #3c3e3f), transparent 35%);
		background: color-mix(in srgb, var(--lvrs-color-panel-bg04, #212223), black 10%);
	}

	.lvrs-title-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-gap-4, 4px);
		min-width: 0;
	}

	.lvrs-header-actions {
		display: inline-flex;
		align-items: center;
		gap: var(--lvrs-gap-8, 8px);
	}

	.lvrs-content {
		flex: 1;
		min-height: 0;
		padding: var(--lvrs-content-padding);
	}

	.lvrs-bottom-nav {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
		gap: var(--lvrs-gap-6, 6px);
		padding: var(--lvrs-gap-8, 8px);
		border-top: 1px solid color-mix(in srgb, var(--lvrs-color-panel-bg12, #3c3e3f), transparent 35%);
		background: color-mix(in srgb, var(--lvrs-color-panel-bg04, #212223), black 12%);
	}

	.lvrs-bottom-nav-item {
		height: var(--lvrs-control-height-sm, 22px);
		border: 1px solid transparent;
		border-radius: var(--lvrs-radius-sm, 4px);
		background: transparent;
		cursor: pointer;
	}

	.lvrs-bottom-nav-item.is-active {
		background: color-mix(in srgb, var(--lvrs-color-overlay-primary, #400a84ff), transparent 20%);
		border-color: color-mix(in srgb, var(--lvrs-color-primary, #0a84ff), transparent 45%);
	}
</style>
