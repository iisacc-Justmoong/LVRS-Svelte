<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from './Icon.svelte';
  export let text = '';
  export let label = '';
  export let placeholderText = '';
  export let mode: 'default' | 'search' = 'default';
  export let type = 'text';
  export let name = '';
  export let readOnly = false;
  export let disabled = false;
  export let required = false;
  export let clearButtonVisible = true;
  export let hint = '';
  const dispatch = createEventDispatcher<{textEdited: string; input: Event; change: Event}>();
</script>
<label class="lvrs-field" data-disabled={disabled}>
  {#if label}<span class="lvrs-field__label">{label}</span>{/if}
  <span class="lvrs-input-wrap">
    {#if mode === 'search'}<Icon name="generalsearch" />{/if}
    <input {...$$restProps} {type} {name} {required} {disabled} readonly={readOnly} value={text}
      aria-label={label || $$restProps['aria-label'] || placeholderText || 'Text'} placeholder={placeholderText}
      on:input={(event) => { text = event.currentTarget.value; dispatch('textEdited', text); dispatch('input', event); }} on:change />
    {#if clearButtonVisible && text && !disabled && !readOnly}<button type="button" class="lvrs-field__clear" aria-label="Clear text" on:click={() => {text = ''; dispatch('textEdited', text);}}>×</button>{/if}
  </span>
  {#if hint}<span class="lvrs-field__hint">{hint}</span>{/if}
</label>
