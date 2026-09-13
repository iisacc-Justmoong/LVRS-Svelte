<script lang="ts">
  import PushButton from './PushButton.svelte';

  export let checked = false;
</script>
<PushButton text='?' tone='borderless' aria-label='Help' {...$$restProps}  bind:checked on:click on:change><slot>{$$restProps.text ?? "?"}</slot></PushButton>
