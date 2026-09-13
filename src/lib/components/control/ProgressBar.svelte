<script lang="ts">
  export let value = 0;
  export let from = 0;
  export let to = 100;
  export let indeterminate = false;
  export let label = 'Progress';
  $: percentage = Math.max(0, Math.min(100, (value - from) / Math.max(1, to - from) * 100));
</script>
<progress {...$$restProps} class="lvrs-progress" max="100" value={indeterminate ? undefined : percentage} aria-label={label}>{percentage}%</progress>
