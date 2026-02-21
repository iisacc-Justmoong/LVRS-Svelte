<script lang="ts">
	export let size: 'large' | 'regular' = 'large';
	export let startValue = 0;
	export let endValue = 100;
	export let currentValue = 0;
	export let trackColor = '#0D000000';
	export let fillColor = '#007AFF';
	export let cornerRadius = 100;

	$: barHeight = size === 'regular' ? 3 : 6;
	$: range = endValue - startValue;
	$: progress = Math.abs(range) < 0.000001 ? (currentValue >= endValue ? 1 : 0) : Math.max(0, Math.min(1, (currentValue - startValue) / range));
</script>

<div class="lvrs-progress" style={`--lvrs-progress-h:${barHeight}px; --lvrs-progress-track:${trackColor}; --lvrs-progress-fill:${fillColor}; --lvrs-progress-radius:${cornerRadius}px;`}>
	<div class="track"></div>
	<div class="fill" style={`width:${progress * 100}%`}></div>
</div>

<style>
	.lvrs-progress {
		position: relative;
		display: block;
		width: 100%;
		min-width: 100px;
		height: var(--lvrs-progress-h, 6px);
	}

	.track,
	.fill {
		position: absolute;
		inset: 0;
		border-radius: var(--lvrs-progress-radius, 100px);
	}

	.track {
		background: var(--lvrs-progress-track, #0D000000);
	}

	.fill {
		background: var(--lvrs-progress-fill, #007AFF);
	}
</style>
