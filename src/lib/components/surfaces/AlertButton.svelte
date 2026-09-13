<script lang="ts">import PushButton from '../control/PushButton.svelte';</script>
<PushButton {...$$restProps} size="medium" on:click><slot>{$$restProps.text ?? ''}</slot></PushButton>
