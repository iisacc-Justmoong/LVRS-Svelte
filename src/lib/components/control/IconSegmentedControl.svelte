<script lang="ts">
  import LabelSegmentedControl from './LabelSegmentedControl.svelte';
  export let activeIndex = 0;
  export let items: Array<{id?: string | number; text: string; iconName?: string; disabled?: boolean}> = [];
</script>
<LabelSegmentedControl {...$$restProps} {items} bind:activeIndex iconOnly />
