<script lang="ts">
  import { interactionMotion } from '../../motion.js';
  export let text = '';
  export let group: string | number | undefined = undefined;
  export let value: string | number = '';
  export let disabled = false;
  export let name = '';
</script>
<label class="lvrs-check-control" use:interactionMotion={!disabled}>
  <input {...$$restProps} type="radio" bind:group {value} {name} {disabled} aria-label={text || $$restProps['aria-label'] || 'Radio option'} on:change />
  <span class="lvrs-indicator lvrs-motion-visual" data-radio aria-hidden="true"></span><span>{text}</span>
</label>
