<script lang="ts">
  import TextEditor from './TextEditor.svelte';
  export let text = '';
  export let label = 'Code';
</script>
<div style="--lvrs-font-body: ui-monospace, SFMono-Regular, monospace;"><TextEditor {...$$restProps} {label} bind:text spellcheck={false} on:input on:change /></div>
