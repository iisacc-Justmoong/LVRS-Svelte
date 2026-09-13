<script lang="ts">
  import { onMount } from 'svelte';
  export let open = false;
  export let text = 'Options';
  let details: HTMLDetailsElement;
  onMount(() => {
    const closeOutside = (event: PointerEvent) => {if (!details.contains(event.target as Node)) open = false;};
    const escape = (event: KeyboardEvent) => {if (open && event.key === 'Escape') {open = false; details.querySelector('summary')?.focus();}};
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', escape);
    return () => {document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', escape);};
  });
</script>
<details {...$$restProps} bind:this={details} class="lvrs-popover" bind:open>
  <summary class="lvrs-button" aria-expanded={open}><span class="lvrs-button__visual"><slot name="trigger">{text}</slot></span></summary>
  <div class="lvrs-popover__panel lvrs-material"><slot /></div>
</details>
