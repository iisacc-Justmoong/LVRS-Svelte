<script lang="ts">
  import PushButton from './PushButton.svelte';

  export let checked = false;
</script>
<PushButton iconMode={true} tone='borderless' iconName='generalmoreHorizontal' aria-label='More actions' {...$$restProps}  bind:checked on:click on:change><slot>{$$restProps.text ?? ""}</slot></PushButton>
