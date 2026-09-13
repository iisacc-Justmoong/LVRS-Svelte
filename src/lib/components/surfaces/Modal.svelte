<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { motionDuration, motionTokens } from '../../motion.js';
  import PushButton from '../control/PushButton.svelte';
  export let open = false;
  export let title = '';
  export let dismissOnBackground = true;
  export let closeButton = true;
  export let sheet = false;
  let dialog: HTMLDialogElement;
  let revision = 0;
  const dispatch = createEventDispatcher<{closed: void}>();
  async function synchronize(isOpen: boolean, node: HTMLDialogElement | undefined) {
    const current = ++revision;
    if (!node) return;
    if (isOpen) { if (!node.open) node.showModal(); }
    else if (node.open) {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animation = node.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(6px)'}], {duration:reduced ? 0 : motionDuration(motionTokens.exit),easing:'ease-out'});
      await animation.finished.catch(() => {});
      if (current === revision) node.close();
    }
  }
  $: synchronize(open, dialog);
  function backdrop(event: MouseEvent) {
    if (!dismissOnBackground || event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) open = false;
  }
</script>
<dialog {...$$restProps} bind:this={dialog} class="lvrs-dialog" data-sheet={sheet || undefined} aria-label={title || 'Dialog'}
  on:cancel={(event) => {event.preventDefault(); open = false;}}
  on:close={() => {open = false; dispatch('closed');}} on:click={backdrop}>
  <div class="lvrs-dialog__header"><h2>{title}</h2>{#if closeButton}<PushButton text="×" tone="borderless" aria-label="Close dialog" on:click={() => open = false} />{/if}</div>
  <slot />
  <slot name="actions" />
</dialog>
