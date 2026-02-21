<script lang="ts">
	import { createLvrsCssVariables, cssVariablesToStyle, mergeLvrsTheme, type DeepPartial, type LvrsThemeTokens } from '../../theme/index.js';

	export let theme: DeepPartial<LvrsThemeTokens> = {};
	export let as: keyof HTMLElementTagNameMap = 'div';

	$: mergedTheme = mergeLvrsTheme(theme);
	$: styleText = cssVariablesToStyle(createLvrsCssVariables(mergedTheme));
</script>

<svelte:element this={as} class="lvrs-theme-provider" style={styleText}>
	<slot />
</svelte:element>

<style>
	.lvrs-theme-provider {
		color: var(--lvrs-color-text-primary, #e5ffffff);
		font-family: var(--lvrs-font-body, "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif);
	}
</style>
