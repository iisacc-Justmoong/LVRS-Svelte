<script lang="ts">
  import { interactionMotion } from '../../motion.js';
  export let text = '';
  export let checked = false;
  export let disabled = false;
  export let name = '';
</script>
<label class="lvrs-check-control" use:interactionMotion={!disabled}>
  <input {...$$restProps} type="checkbox" role="switch" bind:checked {name} {disabled} aria-label={text || $$restProps['aria-label'] || 'Toggle'} on:change />
  <span class="lvrs-switch-track lvrs-motion-visual" aria-hidden="true"><span class="lvrs-switch-knob"></span></span><span>{text}</span>
</label>
