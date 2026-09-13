<script lang="ts">
  import IconButton from '../control/IconButton.svelte';
  export let active = false;
  export let iconName = '';
  export let text = '';
</script>
<IconButton {...$$restProps} {iconName} {text} tone={active ? 'default' : 'borderless'} on:click />
