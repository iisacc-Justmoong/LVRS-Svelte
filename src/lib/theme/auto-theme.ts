import { createLvrsCssVariables, cssVariablesToStyle, mergeLvrsTheme, type DeepPartial, type LvrsThemeTokens } from './tokens.js';

const LVRS_GLOBAL_THEME_STYLE_ID = 'lvrs-global-theme-style';

export interface ApplyLvrsThemeOptions {
	replace?: boolean;
}

function canUseDom(): boolean {
	return typeof document !== 'undefined';
}

function buildThemeCss(theme: DeepPartial<LvrsThemeTokens>): string {
	const variables = createLvrsCssVariables(mergeLvrsTheme(theme));
	return `:root { ${cssVariablesToStyle(variables)}; }`;
}

export function applyLvrsTheme(theme: DeepPartial<LvrsThemeTokens> = {}, options: ApplyLvrsThemeOptions = {}): void {
	if (!canUseDom()) return;

	const replace = options.replace ?? true;
	const existing = document.getElementById(LVRS_GLOBAL_THEME_STYLE_ID) as HTMLStyleElement | null;
	if (existing && !replace) return;

	const cssText = buildThemeCss(theme);
	if (existing) {
		existing.textContent = cssText;
		return;
	}

	const styleEl = document.createElement('style');
	styleEl.id = LVRS_GLOBAL_THEME_STYLE_ID;
	styleEl.textContent = cssText;
	(document.head ?? document.documentElement).appendChild(styleEl);
}

export function ensureLvrsGlobalTheme(): void {
	applyLvrsTheme({}, { replace: false });
}
