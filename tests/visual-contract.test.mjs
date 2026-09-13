import assert from 'node:assert/strict';
import { test, before, after } from 'node:test';
import { createServer } from 'vite';

let server;
before(async () => { server = await createServer({ server: { middlewareMode: true }, appType: 'custom' }); });
after(async () => { await server?.close(); });

test('LVRS tokens preserve authored metrics and CSS alpha ordering', async () => {
  const { lvrsTheme, createLvrsCssVariables, mergeLvrsTheme } = await server.ssrLoadModule('/src/lib/theme/tokens.ts');
  assert.equal(lvrsTheme.typography.body.size, 13);
  assert.equal(lvrsTheme.control.iconSm, 18);
  assert.equal(lvrsTheme.control.heightSm, 22);
  assert.equal(lvrsTheme.colors.text.titleHeader, 'rgba(255, 255, 255, 0.9)');
  assert.equal(lvrsTheme.colors.overlay.backdrop, '#00000059');
  const custom = mergeLvrsTheme({ colors: { semantic: { primary: '#abcdef' } } });
  assert.equal(createLvrsCssVariables(custom)['--lvrs-color-primary'], '#abcdef');
  assert.equal(lvrsTheme.colors.semantic.primary, '#0A84FF');
});

test('motion retains bounded displacement, speed limits and reduced motion', async () => {
  const { interactionScale, motionDuration } = await server.ssrLoadModule('/src/lib/motion.ts');
  assert.deepEqual(interactionScale(1000, 300, true, false), { x: 0.996, y: 1 - 4 / 300 });
  assert.deepEqual(interactionScale(100, 22, false, true), { x: 1.012, y: 1.018 });
  assert.equal(motionDuration(360, { reducedMotion: true }), 0);
  assert.equal(motionDuration(360, { speed: 2 }), 180);
  assert.equal(motionDuration(360, { speed: NaN }), 360);
});

test('tooltip stays inside a narrow viewport and flips below a top-edge trigger', async () => {
  const { tooltipPosition } = await server.ssrLoadModule('/src/lib/components/surfaces/Tooltip.svelte');
  assert.deepEqual(tooltipPosition({ left: 330, right: 370, top: 300, bottom: 322 },
    { width: 180, height: 30 }, { width: 375, height: 844 }), { left: 187, top: 262 });
  assert.deepEqual(tooltipPosition({ left: 0, right: 22, top: 0, bottom: 22 },
    { width: 180, height: 30 }, { width: 320, height: 780 }), { left: 8, top: 30 });
});

test('every public visual component renders on the server without browser globals', async () => {
  const library = await server.ssrLoadModule('/src/lib/index.ts');
  const { render } = await server.ssrLoadModule('svelte/server');
  for (const excluded of ['ApplicationWindow', 'AppShell', 'HStack', 'VStack', 'ZStack', 'Spacer', 'Navigator', 'PageRouter']) {
    assert.equal(library[excluded], undefined, `${excluded} is outside the visual package`);
  }
  for (const [name, Component] of Object.entries(library).filter(([name, value]) => /^[A-Z]/.test(name) && typeof value === 'function')) {
    assert.doesNotThrow(() => render(Component, { props: {} }), name);
  }
  for (const name of ['Card', 'Slider', 'Stepper', 'ComboBox', 'TextEditor', 'ColorPicker', 'Modal', 'Sheet', 'Popover', 'Tooltip', 'PanelMaterial', 'WindowMaterial', 'PushButton']) {
    assert.equal(typeof library[name], 'function', name);
  }
  const disabled = render(library.PushButton, { props: { text: 'Unavailable', href: '/private', disabled: true } }).body;
  assert.match(disabled, /aria-disabled="true"/);
  assert.doesNotMatch(disabled, /href="\/private"/);
  const card = render(library.Card, { props: { title: 'Project', type: 'project', progress: 130 } }).body;
  assert.match(card, /Project/);
  assert.match(card, /value="100"/);
});
