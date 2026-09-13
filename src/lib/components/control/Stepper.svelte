<script lang="ts">
  import PushButton from './PushButton.svelte';
  export let value = 0;
  export let from = 0;
  export let to = 100;
  export let step = 1;
  export let label = 'Quantity';
  export let disabled = false;
  const clamp = (number: number) => Math.max(from, Math.min(to, Number.isFinite(number) ? number : from));
</script>
<div class="lvrs-stepper">
  <PushButton text="−" tone="default" aria-label={`Decrease ${label}`} disabled={disabled || value <= from} on:click={() => value = clamp(Number((value - step).toFixed(10)))} />
  <label class="lvrs-field"><span class="lvrs-input-wrap"><input {...$$restProps} type="number" aria-label={label} min={from} max={to} {step} {disabled} value={value} on:change={(event) => value = clamp(event.currentTarget.valueAsNumber)} /></span></label>
  <PushButton text="+" tone="default" aria-label={`Increase ${label}`} disabled={disabled || value >= to} on:click={() => value = clamp(Number((value + step).toFixed(10)))} />
</div>
