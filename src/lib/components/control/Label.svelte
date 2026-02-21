<script lang="ts">
	import type { LabelAlign, LabelVariant } from '../../types.js';

	export let text = '';
	export let variant: LabelVariant = 'description';
	export let color: string | undefined = undefined;
	export let align: LabelAlign = 'left';
	export let block = false;
	export let truncate = false;
	export let clamp = 0;

	const styleMap: Record<LabelVariant, { size: string; weight: string; lineHeight: string; color: string }> = {
		title: {
			size: 'var(--lvrs-text-title-size, 26px)',
			weight: 'var(--lvrs-text-title-weight, 700)',
			lineHeight: 'var(--lvrs-text-title-line-height, 26px)',
			color: 'var(--lvrs-color-text-primary, #E5FFFFFF)'
		},
		title2: {
			size: 'var(--lvrs-text-title2-size, 22px)',
			weight: 'var(--lvrs-text-title2-weight, 700)',
			lineHeight: 'var(--lvrs-text-title2-line-height, 22px)',
			color: 'var(--lvrs-color-text-primary, #E5FFFFFF)'
		},
		header: {
			size: 'var(--lvrs-text-header-size, 17px)',
			weight: 'var(--lvrs-text-header-weight, 600)',
			lineHeight: 'var(--lvrs-text-header-line-height, 17px)',
			color: 'var(--lvrs-color-text-primary, #E5FFFFFF)'
		},
		header2: {
			size: 'var(--lvrs-text-header2-size, 15px)',
			weight: 'var(--lvrs-text-header2-weight, 600)',
			lineHeight: 'var(--lvrs-text-header2-line-height, 15px)',
			color: 'var(--lvrs-color-text-primary, #E5FFFFFF)'
		},
		body: {
			size: 'var(--lvrs-text-body-size, 12px)',
			weight: 'var(--lvrs-text-body-weight, 500)',
			lineHeight: 'var(--lvrs-text-body-line-height, 12px)',
			color: 'var(--lvrs-color-text-body, #CCFFFFFF)'
		},
		description: {
			size: 'var(--lvrs-text-description-size, 12px)',
			weight: 'var(--lvrs-text-description-weight, 600)',
			lineHeight: 'var(--lvrs-text-description-line-height, 12px)',
			color: 'var(--lvrs-color-text-description, #99FFFFFF)'
		},
		caption: {
			size: 'var(--lvrs-text-caption-size, 11px)',
			weight: 'var(--lvrs-text-caption-weight, 400)',
			lineHeight: 'var(--lvrs-text-caption-line-height, 11px)',
			color: 'var(--lvrs-color-text-caption, #80FFFFFF)'
		},
		disabled: {
			size: 'var(--lvrs-text-caption-size, 11px)',
			weight: 'var(--lvrs-text-caption-weight, 400)',
			lineHeight: 'var(--lvrs-text-caption-line-height, 11px)',
			color: 'var(--lvrs-color-text-disabled, #4DFFFFFF)'
		}
	};

	$: styleToken = styleMap[variant];
	$: resolvedColor = color ?? styleToken.color;
	$: styleText = [
		`font-size: ${styleToken.size}`,
		`font-weight: ${styleToken.weight}`,
		`line-height: ${styleToken.lineHeight}`,
		`color: ${resolvedColor}`,
		`text-align: ${align}`
	].join('; ');
</script>

<span
	class="lvrs-label {block ? 'is-block' : ''} {truncate ? 'is-truncate' : ''} {clamp > 0 ? 'is-clamp' : ''}"
	style={styleText}
	style:--lvrs-label-clamp={clamp}
>
	{#if text}
		{text}
	{:else}
		<slot />
	{/if}
</span>

<style>
	.lvrs-label {
		display: inline;
		font-family: var(--lvrs-font-body, "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif);
		letter-spacing: 0;
	}

	.lvrs-label.is-block {
		display: block;
	}

	.lvrs-label.is-truncate {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.lvrs-label.is-clamp {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: var(--lvrs-label-clamp);
		line-clamp: var(--lvrs-label-clamp);
		overflow: hidden;
	}
</style>
