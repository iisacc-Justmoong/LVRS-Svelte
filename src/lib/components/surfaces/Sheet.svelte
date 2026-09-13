<script lang="ts">import Modal from './Modal.svelte'; export let open = false; export let title = '';</script>
<Modal {...$$restProps} bind:open {title} sheet on:closed><slot /><svelte:fragment slot="actions"><slot name="actions" /></svelte:fragment></Modal>
