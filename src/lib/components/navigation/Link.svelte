<script lang="ts">
  import { interactionMotion } from '../../motion.js';
  export let href = '/';
  export let disabled = false;
</script>
<a {...$$restProps} href={disabled ? undefined : href} aria-disabled={disabled || undefined} tabindex={disabled ? -1 : undefined} class="lvrs-link" use:interactionMotion={!disabled} on:click><span class="lvrs-motion-visual"><slot>{href}</slot></span></a>
<style>.lvrs-link{color:var(--lvrs-color-primary);text-decoration:none;display:inline-flex}.lvrs-link:hover{text-decoration:underline}.lvrs-link:focus-visible{outline:2px solid var(--lvrs-color-primary);outline-offset:3px}.lvrs-link[aria-disabled]{opacity:.35}</style>
