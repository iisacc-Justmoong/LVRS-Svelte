<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Label from '../control/Label.svelte';
	import LabelButton from '../control/LabelButton.svelte';

	export let open = false;
	export let title = 'Alert Dialog';
	export let message = 'It can have 2 or 3 actions depending on your needs.';
	export let buttonCount = 0;
	export let primaryText = 'Button';
	export let secondaryText = 'Button';
	export let tertiaryText = '';
	export let primaryEnabled = true;
	export let secondaryEnabled = true;
	export let tertiaryEnabled = true;
	export let dismissOnBackground = false;
	export let minWidth = 280;
	export let maxWidth = 360;

	const dispatch = createEventDispatcher<{
		primaryClicked: void;
		secondaryClicked: void;
		tertiaryClicked: void;
		dismissed: void;
	}>();

	$: resolvedButtonCount = (() => {
		if (buttonCount === 2 || buttonCount === 3) return buttonCount;
		if (tertiaryText.length > 0) return 3;
		if (secondaryText.length > 0) return 2;
		return 1;
	})();
	$: hasSecondaryAction = resolvedButtonCount >= 2;
	$: hasTertiaryAction = resolvedButtonCount >= 3;
	$: useVerticalActionLayout = hasTertiaryAction;

	function dismiss(): void {
		open = false;
		dispatch('dismissed');
	}

	function onBackdropClick(): void {
		if (!dismissOnBackground) return;
		dismiss();
	}

	function onPrimaryClick(): void {
		dispatch('primaryClicked');
	}

	function onSecondaryClick(): void {
		dispatch('secondaryClicked');
	}

	function onTertiaryClick(): void {
		dispatch('tertiaryClicked');
	}
</script>

{#if open}
	<div class="lvrs-alert-overlay" role="presentation">
		<button type="button" class="lvrs-alert-backdrop-hit" aria-label="Dismiss alert" on:click={onBackdropClick}></button>
		<div
			class="lvrs-alert-card"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-label={title}
			style={`--lvrs-alert-min-width: ${minWidth}px; --lvrs-alert-max-width: ${maxWidth}px;`}
		>
			<div class="lvrs-alert-content">
				<div class="lvrs-alert-icon-wrap">
					<div class="lvrs-alert-icon-frame">
						<div class="lvrs-alert-icon-core"></div>
					</div>
				</div>

				<div class="lvrs-alert-text">
					{#if title.length > 0}
						<Label variant="title2" align="center" block={true}>{title}</Label>
					{/if}
					{#if message.length > 0}
						<Label variant="body" align="center" block={true}>{message}</Label>
					{/if}
				</div>

				{#if useVerticalActionLayout}
					<div class="lvrs-alert-actions vertical">
						<LabelButton text={primaryText} tone="primary" disabled={!primaryEnabled} on:click={onPrimaryClick} />
						{#if hasSecondaryAction}
							<LabelButton text={secondaryText} tone="default" disabled={!secondaryEnabled} on:click={onSecondaryClick} />
						{/if}
						{#if hasTertiaryAction}
							<LabelButton text={tertiaryText || 'Button'} tone="default" disabled={!tertiaryEnabled} on:click={onTertiaryClick} />
						{/if}
					</div>
				{:else if hasSecondaryAction}
					<div class="lvrs-alert-actions horizontal">
						<LabelButton text={primaryText} tone="primary" disabled={!primaryEnabled} on:click={onPrimaryClick} />
						<LabelButton text={secondaryText} tone="default" disabled={!secondaryEnabled} on:click={onSecondaryClick} />
					</div>
				{:else}
					<div class="lvrs-alert-actions single">
						<LabelButton text={primaryText} tone="primary" disabled={!primaryEnabled} on:click={onPrimaryClick} />
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.lvrs-alert-overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--lvrs-gap-24, 24px);
		background: var(--lvrs-color-overlay-backdrop, #59000000);
		z-index: 1000;
	}

	.lvrs-alert-backdrop-hit {
		position: absolute;
		inset: 0;
		padding: 0;
		margin: 0;
		border: 0;
		background: transparent;
	}

	.lvrs-alert-card {
		width: min(var(--lvrs-alert-max-width, 360px), calc(100vw - var(--lvrs-gap-24, 24px) * 2));
		min-width: var(--lvrs-alert-min-width, 280px);
		border-radius: var(--lvrs-radius-lg, 12px);
		background: var(--lvrs-color-panel-bg08, #2c2e2f);
		border: 1px solid color-mix(in srgb, var(--lvrs-color-panel-bg12, #3c3e3f), transparent 24%);
		box-shadow: 0 22px 44px #1f000000;
	}

	.lvrs-alert-content {
		display: flex;
		flex-direction: column;
		padding: 32px var(--lvrs-gap-24, 24px) var(--lvrs-gap-24, 24px);
		gap: var(--lvrs-gap-16, 16px);
	}

	.lvrs-alert-icon-wrap {
		display: flex;
		justify-content: center;
	}

	.lvrs-alert-icon-frame {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 10px;
		border: 4px solid #e8f0f5;
		background: #c9d4db;
	}

	.lvrs-alert-icon-core {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: #d8e0e6;
		opacity: 0.42;
	}

	.lvrs-alert-text {
		display: flex;
		flex-direction: column;
		gap: var(--lvrs-gap-12, 12px);
	}

	.lvrs-alert-actions {
		display: flex;
		gap: var(--lvrs-gap-12, 12px);
	}

	.lvrs-alert-actions.vertical {
		flex-direction: column;
	}

	.lvrs-alert-actions.vertical :global(.lvrs-label-button),
	.lvrs-alert-actions.single :global(.lvrs-label-button) {
		width: 100%;
		height: var(--lvrs-control-height-md, 36px);
	}

	.lvrs-alert-actions.horizontal {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.lvrs-alert-actions.horizontal :global(.lvrs-label-button) {
		width: 100%;
		height: var(--lvrs-control-height-md, 36px);
	}
</style>
