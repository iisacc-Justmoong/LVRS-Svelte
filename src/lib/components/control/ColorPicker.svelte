<script lang="ts">
  export let value = '#0a84ff';
  export let label = 'Color';
  export let disabled = false;
</script>
<label class="lvrs-color-picker"><span>{label}</span><input {...$$restProps} type="color" bind:value {disabled} on:input on:change /><output>{value.toUpperCase()}</output></label>
