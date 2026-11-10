import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('module build excludes the optional catalog and cache stays outside build', async () => {
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
  assert.doesNotMatch(manifest.scripts.build, /vite build/);
  assert.match(manifest.scripts['build:catalog'], /vite build/);
  const npmrc = await readFile(new URL('../.npmrc', import.meta.url), 'utf8');
  assert.match(npmrc, /^cache=\.\/resources\/\.state\/npm-cache$/m);
});
