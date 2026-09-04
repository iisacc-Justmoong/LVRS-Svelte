import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const installScriptPath = `${projectRoot}/install.sh`;

test('install.sh builds, validates, and installs a copied global package', async () => {
	const installScript = await readFile(installScriptPath, 'utf8');
	const installScriptStat = await stat(installScriptPath);

	assert.match(installScript, /^#!\/usr\/bin\/env bash\n/);
	assert.match(installScript, /set -euo pipefail/);
	assert.notEqual(installScriptStat.mode & 0o111, 0, 'install.sh must be executable');
	assert.match(installScript, /BUILD_DIR="\$\{ROOT_DIR\}\/build"/);
	assert.ok(installScript.includes('NPM_PREFIX="${LVRS_SVELTE_NPM_PREFIX:-${HOME}/.local/SDK}"'));
	assert.doesNotMatch(installScript, /npm config get prefix/);
	assert.match(installScript, /npm ci/);
	assert.match(installScript, /npm test/);
	assert.match(installScript, /npm run check/);
	assert.match(installScript, /npm run build/);
	assert.match(installScript, /npm pack .*--pack-destination/);
	assert.match(installScript, /npm install --global/);
	assert.match(installScript, /npm install --global .*--ignore-scripts/);
	assert.match(installScript, /test -L/);
	assert.doesNotMatch(installScript, /npm link/);
});
