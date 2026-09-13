<script lang="ts">import InputField from './InputField.svelte'; export let text = '';</script>
<InputField {...$$restProps} bind:text on:textEdited on:input on:change />
