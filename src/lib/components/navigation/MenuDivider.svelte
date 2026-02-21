<script lang="ts">
	export let axis: 'horizontal' | 'vertical' = 'horizontal';
	export let dividerColor = 'var(--lvrs-color-context-divider, #2C2E2F)';
	export let thickness = 1;
	export let crossPadding = 1;
	export let lineLength = 220;

	$: vertical = axis === 'vertical';
</script>

<div class="lvrs-menu-divider" style={`--lvrs-divider-color:${dividerColor}; --lvrs-divider-thickness:${thickness}px; --lvrs-divider-pad:${crossPadding}px; --lvrs-divider-length:${lineLength}px;`} data-axis={axis}></div>

<style>
	.lvrs-menu-divider {
		position: relative;
		display: block;
	}

	.lvrs-menu-divider[data-axis='horizontal'] {
		width: var(--lvrs-divider-length, 220px);
		height: calc(var(--lvrs-divider-thickness, 1px) + var(--lvrs-divider-pad, 1px) * 2);
	}

	.lvrs-menu-divider[data-axis='vertical'] {
		width: calc(var(--lvrs-divider-thickness, 1px) + var(--lvrs-divider-pad, 1px) * 2);
		height: var(--lvrs-divider-length, 220px);
	}

	.lvrs-menu-divider::before {
		content: '';
		position: absolute;
		background: var(--lvrs-divider-color, #2C2E2F);
	}

	.lvrs-menu-divider[data-axis='horizontal']::before {
		left: 0;
		right: 0;
		top: 50%;
		height: var(--lvrs-divider-thickness, 1px);
		transform: translateY(-50%);
	}

	.lvrs-menu-divider[data-axis='vertical']::before {
		top: 0;
		bottom: 0;
		left: 50%;
		width: var(--lvrs-divider-thickness, 1px);
		transform: translateX(-50%);
	}
</style>
