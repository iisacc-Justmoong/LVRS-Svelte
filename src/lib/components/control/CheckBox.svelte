<script lang="ts">
  import { interactionMotion } from '../../motion.js';
  export let text = '';
  export let checked = false;
  export let indeterminate = false;
  export let disabled = false;
  export let name = '';
  export let value = 'on';
</script>
<label class="lvrs-check-control" use:interactionMotion={!disabled}>
  <input {...$$restProps} type="checkbox" bind:checked bind:indeterminate {name} {value} {disabled} aria-label={text || $$restProps['aria-label'] || 'Checkbox'} on:change />
  <span class="lvrs-indicator lvrs-motion-visual" aria-hidden="true"></span><span>{text}</span>
</label>
