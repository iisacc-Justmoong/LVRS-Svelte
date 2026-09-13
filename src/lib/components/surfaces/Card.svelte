<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { interactionMotion } from '../../motion.js';
  import Icon from '../control/Icon.svelte';
  import ProgressBar from '../control/ProgressBar.svelte';
  export let title = '';
  export let description = '';
  export let metadata = '';
  export let statusText = '';
  export let type: 'file' | 'filePreview' | 'folder' | 'project' | 'device' | 'model' | 'member' | 'link' = 'file';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let detail: 'brief' | 'detailed' = 'brief';
  export let selected = false;
  export let selectable = false;
  export let disabled = false;
  export let href: string | undefined = undefined;
  export let previewSource = '';
  export let previewAlt = '';
  export let iconName = '';
  export let iconSource = '';
  export let actionText = '';
  export let rows: Array<{label: string; value: string}> = [];
  export let progress = 0;
  export let progressLabel = 'Progress';
  export let loading: 'lazy' | 'eager' = 'lazy';
  let className = ''; export { className as class };
  const dispatch = createEventDispatcher<{click: MouseEvent; select: boolean}>();
  $: element = href !== undefined ? 'a' : selectable ? 'button' : 'article';
  function activate(event: MouseEvent) {
    if (disabled) {event.preventDefault(); return;}
    if (selectable) {selected = !selected; dispatch('select', selected);}
    dispatch('click', event);
  }
</script>
<svelte:element this={element} {...$$restProps} class="lvrs-card {className}" {...{href: disabled ? undefined : href, type: element === 'button' ? 'button' : undefined, disabled: element === 'button' ? disabled : undefined}}
  aria-disabled={disabled || undefined} aria-pressed={element === 'button' ? selected : undefined}
  data-selected={selected} data-type={type} data-size={size} data-detail={detail}
  use:interactionMotion={!disabled && (selectable || href !== undefined)} on:click={activate}>
  <div class="lvrs-card__visual lvrs-motion-visual">
    <slot name="preview">{#if previewSource}<img class="lvrs-card__preview" src={previewSource} alt={previewAlt} {loading} decoding="async" />{/if}</slot>
    <div class="lvrs-card__body">
      <slot name="icon">{#if iconName || iconSource || !previewSource}<Icon name={iconName || type} source={iconSource} size={32} />{/if}</slot>
      {#if metadata}<span class="lvrs-card__meta">{metadata}</span>{/if}
      {#if title}<h3>{title}</h3>{/if}
      {#if description}<p>{description}</p>{/if}
      {#if statusText}<span class="lvrs-card__meta">{statusText}</span>{/if}
      {#if type === 'project' || type === 'device'}<ProgressBar value={progress} label={progressLabel} />{/if}
      {#if detail === 'detailed' && rows.length}<dl class="lvrs-card__rows">{#each rows as row}<div><dt>{row.label}</dt><dd>{row.value}</dd></div>{/each}</dl>{/if}
      <slot />
      {#if actionText}<span style="color:var(--lvrs-color-primary);margin-top:8px;">{actionText} <span aria-hidden="true">↗</span></span>{/if}
    </div>
  </div>
</svelte:element>
