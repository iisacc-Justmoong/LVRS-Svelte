export interface MotionOptions { enabled?: boolean; reducedMotion?: boolean; speed?: number }
export const motionTokens = Object.freeze({ press: 90, hover: 160, release: 360, surface: 420, exit: 150, color: 130, overshoot: 1.45 });
let options: MotionOptions = {};
const listeners = new Set<() => void>();
export function setMotionOptions(value: MotionOptions): void {
  options = { ...options, ...value };
  if (typeof document !== 'undefined') document.documentElement.dataset.lvrsMotion = options.enabled === false || options.reducedMotion ? 'off' : 'on';
  listeners.forEach((notify) => notify());
}
export function motionDuration(milliseconds: number, settings: MotionOptions = options): number {
  if (settings.enabled === false || settings.reducedMotion) return 0;
  const speed = Number.isFinite(settings.speed) ? Math.min(4, Math.max(0.1, settings.speed!)) : 1;
  return Math.max(0, Math.round(milliseconds / speed));
}
export function interactionScale(width: number, height: number, pressed: boolean, hovered: boolean): { x: number; y: number } {
  return {
    x: 1 + (hovered ? Math.min(0.012, 2 / Math.max(1, width)) : 0) - (pressed ? Math.min(0.045, 4 / Math.max(1, width)) : 0),
    y: 1 + (hovered ? Math.min(0.018, 2 / Math.max(1, height)) : 0) - (pressed ? Math.min(0.09, 4 / Math.max(1, height)) : 0)
  };
}

/** Animate the visual child while the control's hit area stays fixed. */
export function interactionMotion(node: HTMLElement, enabled = true) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let pressed = false;
  let hovered = false;
  let focused = false;
  const visual = node.querySelector<HTMLElement>('.lvrs-motion-visual') ?? node;
  function update() {
    const disabled = !enabled || node.matches(':disabled, [aria-disabled="true"]') || !!node.querySelector(':disabled');
    const active = !disabled && !media.matches && options.enabled !== false && !options.reducedMotion;
    const scale = interactionScale(node.offsetWidth, node.offsetHeight, active && pressed, active && (hovered || focused));
    visual.style.setProperty('--lvrs-motion-x', String(scale.x));
    visual.style.setProperty('--lvrs-motion-y', String(scale.y));
    visual.style.setProperty('--lvrs-motion-duration', `${active ? motionDuration(pressed ? motionTokens.press : motionTokens.release) : 0}ms`);
    visual.style.setProperty('--lvrs-motion-ease', pressed ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.22,1.45,.36,1)');
  }
  const enter = () => { hovered = true; update(); };
  const leave = () => { hovered = false; pressed = false; update(); };
  const down = (event: PointerEvent) => { if (event.button === 0) { pressed = true; update(); } };
  const up = () => { pressed = false; update(); };
  const focus = () => { focused = node.matches(':focus-visible') || !!node.querySelector(':focus-visible'); update(); };
  const blur = () => { focused = false; pressed = false; update(); };
  const keyDown = (event: KeyboardEvent) => { if (event.key === ' ' || event.key === 'Enter') { pressed = true; update(); } };
  node.addEventListener('pointerenter', enter);
  node.addEventListener('pointerleave', leave);
  node.addEventListener('pointerdown', down);
  node.addEventListener('pointercancel', up);
  node.addEventListener('focusin', focus);
  node.addEventListener('focusout', blur);
  node.addEventListener('keydown', keyDown);
  node.addEventListener('keyup', up);
  window.addEventListener('pointerup', up);
  media.addEventListener('change', update);
  listeners.add(update);
  update();
  return {
    update(value: boolean) { enabled = value; update(); },
    destroy() {
      node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave);
      node.removeEventListener('pointerdown', down);
      node.removeEventListener('pointercancel', up);
      node.removeEventListener('focusin', focus);
      node.removeEventListener('focusout', blur);
      node.removeEventListener('keydown', keyDown);
      node.removeEventListener('keyup', up);
      window.removeEventListener('pointerup', up);
      media.removeEventListener('change', update);
      listeners.delete(update);
    }
  };
}

export function surfaceTransition(_node: Element, { duration = motionTokens.surface, y = 8 } = {}) {
  const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  return { duration: reduced ? 0 : motionDuration(duration), css: (t: number) => {
    const p = t - 1;
    const eased = 1 + 2.45 * p * p * p + 1.45 * p * p;
    return `opacity:${Math.min(1, t * 4)};transform:translateY(${(1 - eased) * y}px) scale(${0.97 + 0.03 * eased})`;
  } };
}
