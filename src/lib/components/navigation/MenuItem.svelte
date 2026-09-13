<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Icon from '../control/Icon.svelte';
  import { interactionMotion } from '../../motion.js';
  export let label = '';
  export let key = '';
  export let disabled = false;
  export let selected = false;
  export let iconName = '';
  export let iconSource = '';
  export let showChevron = false;
  const dispatch = createEventDispatcher<{trigger: MouseEvent}>();
</script>
<button {...$$restProps} type="button" role="menuitem" class="lvrs-menu-item" {disabled} use:interactionMotion={!disabled} on:click={(event) => dispatch('trigger',event)}>
  <span class="lvrs-motion-visual" style="display:flex;align-items:center;gap:8px;flex:1;">{#if iconName || iconSource}<Icon name={iconName} source={iconSource} />{/if}<span>{label}</span>{#if key}<kbd>{key}</kbd>{/if}{#if selected}<span aria-hidden="true">✓</span>{/if}{#if showChevron}<span aria-hidden="true">›</span>{/if}<slot /></span>
</button>
