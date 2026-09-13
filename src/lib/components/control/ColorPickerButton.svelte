<script lang="ts">
  import ColorPicker from './ColorPicker.svelte';
  export let value = '#0a84ff';
</script>
<ColorPicker {...$$restProps} bind:value on:input on:change />
