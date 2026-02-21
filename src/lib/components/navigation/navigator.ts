import { get, writable } from 'svelte/store';

export interface RouterLike {
	go?: (path: string, params?: Record<string, unknown>) => boolean;
	replace?: (path: string, params?: Record<string, unknown>) => boolean;
	setRoot?: (path: string, params?: Record<string, unknown>) => boolean;
	back?: () => boolean;
	popToRoot?: () => boolean;
	goTo?: (component: unknown, params?: Record<string, unknown>) => boolean;
	replaceWith?: (component: unknown, params?: Record<string, unknown>) => boolean;
}

const stackStore = writable<RouterLike[]>([]);

export const routerStack = stackStore;

export function registerRouter(router: RouterLike): void {
	stackStore.update((stack) => [...stack.filter((entry) => entry !== router), router]);
}

export function unregisterRouter(router: RouterLike): void {
	stackStore.update((stack) => stack.filter((entry) => entry !== router));
}

export function activeRouter(): RouterLike | null {
	const stack = get(stackStore);
	return stack.length > 0 ? stack[stack.length - 1] : null;
}

export function go(path: string, params: Record<string, unknown> = {}): boolean {
	const router = activeRouter();
	return !!router?.go?.(path, params);
}

export function replace(path: string, params: Record<string, unknown> = {}): boolean {
	const router = activeRouter();
	return !!router?.replace?.(path, params);
}

export function setRoot(path: string, params: Record<string, unknown> = {}): boolean {
	const router = activeRouter();
	return !!router?.setRoot?.(path, params);
}

export function goTo(component: unknown, params: Record<string, unknown> = {}): boolean {
	const router = activeRouter();
	return !!router?.goTo?.(component, params);
}

export function replaceWith(component: unknown, params: Record<string, unknown> = {}): boolean {
	const router = activeRouter();
	return !!router?.replaceWith?.(component, params);
}

export function back(): boolean {
	const router = activeRouter();
	return !!router?.back?.();
}

export function popToRoot(): boolean {
	const router = activeRouter();
	return !!router?.popToRoot?.();
}
