<script lang="ts">
  export let text = '';
  export let label = '';
  export let placeholderText = '';
  export let disabled = false;
  export let readOnly = false;
  export let name = '';
  export let rows = 5;
</script>
<label class="lvrs-field" data-disabled={disabled}>
  {#if label}<span class="lvrs-field__label">{label}</span>{/if}
  <span class="lvrs-input-wrap"><textarea {...$$restProps} {name} {rows} {disabled} readonly={readOnly} bind:value={text} placeholder={placeholderText} aria-label={label || $$restProps['aria-label'] || placeholderText || 'Text editor'} on:input on:change></textarea></span>
</label>
