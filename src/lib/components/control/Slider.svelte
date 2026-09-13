<script lang="ts">
  export let value = 0;
  export let from = 0;
  export let to = 100;
  export let step = 1;
  export let label = 'Value';
  export let disabled = false;
  export let showValue = true;
</script>
<label class="lvrs-field" data-disabled={disabled}>
  <span class="lvrs-field__label">{label}{#if showValue}<output> · {value}</output>{/if}</span>
  <input {...$$restProps} class="lvrs-slider" type="range" min={from} max={to} {step} bind:value {disabled} on:input on:change />
</label>
