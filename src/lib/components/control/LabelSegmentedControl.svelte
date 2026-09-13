<script lang="ts">
  import { interactionMotion } from '../../motion.js';
  import Icon from './Icon.svelte';
  export let items: Array<{id?: string | number; text: string; iconName?: string; disabled?: boolean}> = [];
  export let activeIndex = 0;
  export let label = 'Choose a view';
  export let iconOnly = false;
  function key(event: KeyboardEvent, index: number) {
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const enabled = items.map((item, i) => item.disabled ? -1 : i).filter(i => i >= 0);
    if (!enabled.length) return;
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const next = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled[enabled.length - 1] : enabled[(enabled.indexOf(index) + direction + enabled.length) % enabled.length];
    activeIndex = next;
    (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
  }
</script>
<div {...$$restProps} class="lvrs-segments" role="radiogroup" aria-label={label}>
  {#each items as item, index (item.id ?? index)}
    <button type="button" class="lvrs-segment" role="radio" aria-label={item.text} aria-checked={index === activeIndex} disabled={item.disabled} tabindex={index === activeIndex || (activeIndex < 0 && index === 0) ? 0 : -1} on:click={() => activeIndex = index} on:keydown={(event) => key(event, index)} use:interactionMotion={!item.disabled}>
      <span class="lvrs-motion-visual">{#if item.iconName}<Icon name={item.iconName} />{/if}{#if !iconOnly}{item.text}{/if}</span>
    </button>
  {/each}
</div>
