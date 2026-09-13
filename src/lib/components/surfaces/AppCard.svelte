<script lang="ts">
  import PanelMaterial from './PanelMaterial.svelte';
  export let title = '';
  export let subtitle = '';
  export let cardPadding = 18;
</script>
<PanelMaterial {...$$restProps} material="solid" padding={cardPadding}>
  {#if title || subtitle}<header style="margin-bottom:18px;">{#if title}<h2 style="font-size:17px;margin:0 0 6px;">{title}</h2>{/if}{#if subtitle}<p style="color:var(--lvrs-color-text-description);margin:0;">{subtitle}</p>{/if}<slot name="header" /></header>{/if}
  <slot />
</PanelMaterial>
