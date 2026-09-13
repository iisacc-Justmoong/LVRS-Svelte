<script lang="ts">
  import ListItem from './ListItem.svelte';
  export let selected = false;
</script>
<ListItem {...$$restProps} {selected} on:click={() => selected = !selected}><slot /></ListItem>
