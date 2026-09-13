<script lang="ts">
  import PushButton from './PushButton.svelte';

  export let checked = false;
</script>
<PushButton tone='default' iconName='generalchevronDown' {...$$restProps}  bind:checked on:click on:change><slot>{$$restProps.text ?? ""}</slot></PushButton>
