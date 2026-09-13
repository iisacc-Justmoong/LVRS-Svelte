<script lang="ts">
  import { icons } from '../../icons.js';
  export let name = '';
  export let source = '';
  export let size = 18;
  export let label = '';
  $: src = source || icons[name] || icons.generalprojectStructure;
</script>
<img {...$$restProps} class="lvrs-icon" src={src} alt={label} aria-hidden={label ? undefined : true} width={size} height={size} style={`width:${size}px;height:${size}px;object-fit:contain;flex:none;`} />
