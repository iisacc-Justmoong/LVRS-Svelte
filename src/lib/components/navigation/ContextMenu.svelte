<script lang="ts">
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { surfaceTransition } from '../../motion.js';
  import MenuItem from './MenuItem.svelte';
  export let open = false;
  export let x = 0;
  export let y = 0;
  export let items: Array<{id?: string; type?: string; divider?: boolean; label?: string; text?: string; title?: string; disabled?: boolean; enabled?: boolean; shortcut?: string; iconName?: string; onTriggered?: (event: unknown) => void}> = [];
  export let label = 'Context menu';
  export let itemWidth = 180;
  export let autoCloseOnTrigger = true;
  let mounted = false;
  let menu: HTMLDivElement;
  let left = 0;
  let top = 0;
  let previous: HTMLElement | null = null;
  const dispatch = createEventDispatcher<{itemTriggered: {index: number; item: unknown}; closed: void}>();
  function close(restore = false) {open = false; dispatch('closed'); if (restore) previous?.focus();}
  async function position(visible: boolean, px: number, py: number, ready: boolean) {
    if (!ready || !visible) return;
    previous = document.activeElement as HTMLElement;
    await tick();
    if (!menu || !open) return;
    left = Math.max(8, Math.min(px, innerWidth - menu.offsetWidth - 8));
    top = Math.max(8, Math.min(py, innerHeight - menu.offsetHeight - 8));
    menu.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();
  }
  $: position(open, x, y, mounted);
  onMount(() => {
    mounted = true;
    const outside = (event: PointerEvent) => {if (open && !menu?.contains(event.target as Node)) close();};
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  });
  function keyboard(event: KeyboardEvent) {
    if (event.key === 'Escape') {event.preventDefault(); close(true); return;}
    if (event.key === 'Tab') {close(); return;}
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = Array.from(menu.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowUp' ? -1 : 1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }
</script>
{#if open}
  <div {...$$restProps} bind:this={menu} class="lvrs-menu lvrs-material" role="menu" aria-label={label} tabindex="-1" style={`left:${left}px;top:${top}px;width:${itemWidth}px;`} transition:surfaceTransition on:keydown={keyboard}>
    {#each items as item,index (item.id ?? index)}
      {#if item.divider || item.type === 'divider'}<div class="lvrs-menu-divider" role="separator"></div>{:else}
        <MenuItem label={item.label ?? item.text ?? item.title ?? ''} disabled={item.disabled || item.enabled === false} key={item.shortcut ?? ''} iconName={item.iconName ?? ''} on:trigger={() => {dispatch('itemTriggered',{index,item}); item.onTriggered?.({index,item}); if(autoCloseOnTrigger) close(true);}} />
      {/if}
    {/each}
    <slot />
  </div>
{/if}
