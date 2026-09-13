<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { interactionMotion } from '../../motion.js';
  import Icon from './Icon.svelte';
  export let text = '';
  export let tone = 'primary';
  export let href: string | undefined = undefined;
  export let disabled = false;
  export let checkable = false;
  export let checked = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let size: 'small' | 'medium' | 'large' = 'small';
  export let iconName = '';
  export let iconSource = '';
  export let iconGlyph = '';
  export let iconMode = false;
  export let onclick: ((event: MouseEvent) => void) | undefined = undefined;
  let className = '';
  export { className as class };
  const dispatch = createEventDispatcher<{ click: MouseEvent; change: boolean }>();
  $: inactive = disabled || tone === 'disabled';
  function activate(event: MouseEvent) {
    if (inactive) { event.preventDefault(); return; }
    if (checkable) { checked = !checked; dispatch('change', checked); }
    onclick?.(event);
    dispatch('click', event);
  }
</script>

<svelte:element this={href !== undefined ? 'a' : 'button'}
  {...$$restProps} href={inactive ? undefined : href} type={href === undefined ? type : undefined}
  disabled={href === undefined ? inactive : undefined} aria-disabled={inactive || undefined}
  aria-pressed={checkable ? checked : undefined} tabindex={inactive && href !== undefined ? -1 : undefined}
  class="lvrs-button {className}" data-tone={tone} data-size={size} data-icon={iconMode || undefined}
  use:interactionMotion={!inactive} on:click={activate}>
  <span class="lvrs-button__visual lvrs-motion-visual">
    {#if iconSource || iconName}<Icon name={iconName} source={iconSource} />{:else if iconGlyph}<span aria-hidden="true">{iconGlyph}</span>{/if}
    <slot>{text}</slot>
  </span>
</svelte:element>
