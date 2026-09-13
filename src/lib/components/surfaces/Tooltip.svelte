<script module lang="ts">
  export function tooltipPosition(
    trigger: { left: number; top: number; right: number; bottom: number },
    tip: { width: number; height: number },
    viewport: { width: number; height: number }
  ) {
    const left = (trigger.left + trigger.right - tip.width) / 2;
    const above = trigger.top - tip.height - 8;
    const top = above >= 8 ? above : trigger.bottom + 8;
    return {
      left: Math.max(8, Math.min(viewport.width - tip.width - 8, left)),
      top: Math.max(8, Math.min(viewport.height - tip.height - 8, top))
    };
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  let { text = '', children }: { text?: string; children?: Snippet } = $props();
  const id = $props.id();
  function describe(node: HTMLElement, content: string) {
    const target = node.querySelector<HTMLElement>('button, a, input, [tabindex]');
    const previous = target?.getAttribute('aria-describedby');
    const tip = document.createElement('span');
    tip.id = id;
    tip.className = 'lvrs-tooltip__text';
    tip.setAttribute('role', 'tooltip');
    tip.textContent = content;
    // A filtered material creates a containing block for fixed descendants.
    // Own this portal in the action so it is removed with its trigger.
    document.body.append(tip);
    target?.setAttribute('aria-describedby', [previous, id].filter(Boolean).join(' '));
    let hovered = false;
    let focused = false;
    let dismissed = false;
    const position = () => {
      const point = tooltipPosition(node.getBoundingClientRect(),
        { width: tip.offsetWidth, height: tip.offsetHeight },
        { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
      tip.style.left = `${point.left}px`;
      tip.style.top = `${point.top}px`;
    };
    const refresh = () => {
      position();
      tip.dataset.visible = String((hovered || focused) && !dismissed);
    };
    const enter = () => { hovered = true; dismissed = false; refresh(); };
    const leave = () => { hovered = false; refresh(); };
    const focus = () => { focused = true; dismissed = false; refresh(); };
    const blur = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && node.contains(event.relatedTarget); refresh(); };
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { dismissed = true; refresh(); } };
    node.addEventListener('pointerenter', enter);
    node.addEventListener('pointerleave', leave);
    node.addEventListener('focusin', focus);
    node.addEventListener('focusout', blur);
    node.addEventListener('keydown', key);
    window.addEventListener('scroll', position, true);
    window.addEventListener('resize', position);
    position();
    return {
      update(value: string) { tip.textContent = value; position(); },
      destroy() {
        if (previous) target?.setAttribute('aria-describedby', previous);
        else target?.removeAttribute('aria-describedby');
        tip.remove();
        node.removeEventListener('pointerenter', enter);
        node.removeEventListener('pointerleave', leave);
        node.removeEventListener('focusin', focus);
        node.removeEventListener('focusout', blur);
        node.removeEventListener('keydown', key);
        window.removeEventListener('scroll', position, true);
        window.removeEventListener('resize', position);
      }
    };
  }
</script>

<span class="lvrs-tooltip" use:describe={text}>{@render children?.()}</span>
