<script lang="ts">
  export let material: 'dense' | 'glass' | 'solid' = 'dense';
  export let padding = 18;
  export let window = false;
  let className = ''; export { className as class };
</script>
<div {...$$restProps} class="lvrs-material {className}" data-material={material} data-window={window || undefined} style={`--lvrs-material-padding:${padding}px;${$$restProps.style ?? ''}`}><slot /></div>
