<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import PushButton from '../control/PushButton.svelte';
  export let open = false;
  export let title = 'Alert';
  export let message = '';
  export let primaryText = 'Continue';
  export let secondaryText = 'Cancel';
  export let tertiaryText = '';
  export let primaryEnabled = true;
  const dispatch = createEventDispatcher<{primaryClicked: void; secondaryClicked: void; tertiaryClicked: void; dismissed: void}>();
</script>
<Modal {...$$restProps} bind:open {title} dismissOnBackground={false} closeButton={false} role="alertdialog" on:closed={() => dispatch('dismissed')}>
  <p style="line-height:1.6;margin:0;">{message}</p><slot />
  <div class="lvrs-dialog__actions" slot="actions">
    {#if tertiaryText}<PushButton text={tertiaryText} tone="borderless" on:click={() => dispatch('tertiaryClicked')} />{/if}
    {#if secondaryText}<PushButton text={secondaryText} tone="default" on:click={() => {open = false; dispatch('secondaryClicked');}} />{/if}
    <PushButton text={primaryText} disabled={!primaryEnabled} on:click={() => dispatch('primaryClicked')} />
  </div>
</Modal>
