<script lang="ts">
  export let items: Array<string | {label: string; value: string; disabled?: boolean}> = [];
  export let value = '';
  export let label = 'Select';
  export let disabled = false;
  export let name = '';
</script>
<label class="lvrs-field" data-disabled={disabled}>
  <span class="lvrs-field__label">{label}</span>
  <span class="lvrs-input-wrap"><select {...$$restProps} {name} {disabled} bind:value on:change>
    {#each items as item}<option value={typeof item === 'string' ? item : item.value} disabled={typeof item !== 'string' && item.disabled}>{typeof item === 'string' ? item : item.label}</option>{/each}
  </select></span>
</label>
