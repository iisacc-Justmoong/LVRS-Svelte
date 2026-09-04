#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
BUILD_DIR="${ROOT_DIR}/build"
NPM_PREFIX="${LVRS_SVELTE_NPM_PREFIX:-${HOME}/.local/SDK}"
SKIP_DEPENDENCY_INSTALL="${LVRS_SVELTE_SKIP_DEPENDENCY_INSTALL:-0}"

require_command() {
	local command_name="$1"

	if ! command -v "${command_name}" >/dev/null 2>&1; then
		echo "Required command was not found: ${command_name}" >&2
		exit 1
	fi
}

is_enabled() {
	case "$1" in
		1|ON|on|TRUE|true|YES|yes) return 0 ;;
		*) return 1 ;;
	esac
}

require_command node
require_command npm

node_major="$(node -p "Number(process.versions.node.split('.')[0])")"
if ((node_major < 20)); then
	echo "LVRS-Svelte requires Node.js 20 or newer; current version is $(node --version)." >&2
	exit 1
fi

if [[ -z "${NPM_PREFIX}" || "${NPM_PREFIX}" == "null" || "${NPM_PREFIX}" == "undefined" ]]; then
	echo "Unable to resolve the npm global prefix." >&2
	exit 1
fi

cd "${ROOT_DIR}"
mkdir -p "${BUILD_DIR}"

if is_enabled "${SKIP_DEPENDENCY_INSTALL}"; then
	echo "Skipping dependency installation because LVRS_SVELTE_SKIP_DEPENDENCY_INSTALL=${SKIP_DEPENDENCY_INSTALL}."
else
	echo "Installing locked LVRS-Svelte dependencies."
	npm ci --prefer-offline --no-audit --no-fund
fi

echo "Running LVRS-Svelte tests."
npm test

echo "Checking LVRS-Svelte types and components."
npm run check

echo "Building and validating the LVRS-Svelte package."
npm run build

echo "Packing LVRS-Svelte into ${BUILD_DIR}."
tarball_name="$(npm pack --ignore-scripts --pack-destination "${BUILD_DIR}" --silent | tail -n 1)"
tarball_path="${BUILD_DIR}/${tarball_name}"

if [[ ! -f "${tarball_path}" ]]; then
	echo "Packed LVRS-Svelte tarball was not found: ${tarball_path}" >&2
	exit 1
fi

echo "Installing the LVRS-Svelte package copy into npm prefix ${NPM_PREFIX}."
npm install --global --ignore-scripts --prefix "${NPM_PREFIX}" --no-audit --no-fund "${tarball_path}"

package_name="$(node -p "require('./package.json').name")"
package_version="$(node -p "require('./package.json').version")"
global_root="$(npm root --global --prefix "${NPM_PREFIX}")"
installed_dir="${global_root}/${package_name}"

if [[ ! -d "${installed_dir}" ]]; then
	echo "Installed LVRS-Svelte package directory was not found: ${installed_dir}" >&2
	exit 1
fi

if test -L "${installed_dir}"; then
	echo "LVRS-Svelte must be installed as a package copy, not a source-tree symlink: ${installed_dir}" >&2
	exit 1
fi

installed_identity="$(node -e 'const packageJson = require(process.argv[1]); process.stdout.write(`${packageJson.name}@${packageJson.version}`);' "${installed_dir}/package.json")"
if [[ "${installed_identity}" != "${package_name}@${package_version}" ]]; then
	echo "Installed LVRS-Svelte package identity mismatch: ${installed_identity}" >&2
	exit 1
fi

for required_file in dist/index.js dist/index.d.ts LICENSE package.json; do
	if [[ ! -f "${installed_dir}/${required_file}" ]]; then
		echo "Installed LVRS-Svelte package is missing ${required_file}." >&2
		exit 1
	fi
done

echo "Installed ${package_name}@${package_version}: ${installed_dir}"
