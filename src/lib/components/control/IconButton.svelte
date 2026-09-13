<script lang="ts">
  import PushButton from './PushButton.svelte';
  export let text = ''; export let iconName = '';
  export let checked = false;
</script>
<PushButton iconMode={true} aria-label={text || iconName || 'Action'} {...$$restProps} {text} {iconName} bind:checked on:click on:change><slot>{text}</slot></PushButton>
