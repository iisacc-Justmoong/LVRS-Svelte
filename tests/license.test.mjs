import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('distribution metadata and visual catalog identify the MIT license', () => {
  const manifest = JSON.parse(read('package.json'));
  const lock = JSON.parse(read('package-lock.json'));
  assert.equal(manifest.license, 'MIT');
  assert.equal(lock.packages[''].license, manifest.license);
  assert.match(read('LICENSE'), /MIT License/);
  assert.match(read('LICENSE'), /Permission is hereby granted, free of charge/);
  assert.match(read('NOTICE.md'), /distributed under MIT/);
  assert.match(read('README.md'), /SPDX-License-Identifier: MIT/);
  assert.match(read('src/routes/+page.svelte'), /LVRS-Svelte · MIT · iisacc/);
});
