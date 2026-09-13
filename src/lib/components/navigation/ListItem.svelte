<script lang="ts">
  import Icon from '../control/Icon.svelte';
  import { interactionMotion } from '../../motion.js';
  export let label = '';
  export let detail = '';
  export let iconName = '';
  export let selected = false;
  export let showChevron = false;
  export let disabled = false;
</script>
<button {...$$restProps} type="button" class="lvrs-list-item" aria-pressed={selected} {disabled} use:interactionMotion={!disabled} on:click>
  <span class="lvrs-motion-visual">{#if iconName}<Icon name={iconName} />{/if}<span class="label">{label}</span>{#if detail}<span class="detail">{detail}</span>{/if}{#if showChevron}<span aria-hidden="true">›</span>{/if}<slot /></span>
</button>
<style>.lvrs-list-item{display:block;border:0;border-radius:6px;padding:0;width:100%;text-align:left;color:var(--lvrs-color-text-body);font:500 13px var(--lvrs-font-body);background:transparent;cursor:pointer}.lvrs-list-item>.lvrs-motion-visual{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:inherit}.lvrs-list-item:hover>.lvrs-motion-visual{background:var(--lvrs-color-panel-bg07)}.lvrs-list-item[aria-pressed='true']>.lvrs-motion-visual{background:var(--lvrs-color-overlay-primary)}.lvrs-list-item:focus-visible{outline:2px solid var(--lvrs-color-primary);outline-offset:2px}.lvrs-list-item:disabled{opacity:.35;cursor:default}.label{flex:1}.detail{font-size:11px;color:var(--lvrs-color-text-description)}</style>
