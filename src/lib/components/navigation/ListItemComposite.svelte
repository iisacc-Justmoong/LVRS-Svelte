<script lang="ts">import ListItem from './ListItem.svelte'; export let expanded = false; export let label = '';</script>
<div><ListItem {...$$restProps} {label} showChevron aria-expanded={expanded} on:click={() => expanded = !expanded} />{#if expanded}<div style="padding-left:18px;"><slot /></div>{/if}</div>
