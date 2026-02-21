#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

usage() {
	cat <<'EOF'
Usage: ./publish.sh [options]

Options:
  --tag <tag>          npm dist-tag (default: latest)
  --access <access>    npm access level (default: public)
  --otp <code>         npm 2FA one-time password
  --skip-checks        skip npm validation steps
  --allow-dirty        allow publishing with git uncommitted changes
  --dry-run            run all checks but skip npm publish
  -h, --help           show this help
EOF
}

require_command() {
	local cmd="$1"
	if ! command -v "$cmd" >/dev/null 2>&1; then
		echo "ERROR: required command not found: $cmd" >&2
		exit 1
	fi
}

tag="latest"
access="public"
otp=""
skip_checks=0
allow_dirty=0
dry_run=0

while [[ $# -gt 0 ]]; do
	case "$1" in
		--tag)
			[[ $# -ge 2 ]] || { echo "ERROR: --tag requires a value" >&2; exit 1; }
			tag="$2"
			shift 2
			;;
		--access)
			[[ $# -ge 2 ]] || { echo "ERROR: --access requires a value" >&2; exit 1; }
			access="$2"
			shift 2
			;;
		--otp)
			[[ $# -ge 2 ]] || { echo "ERROR: --otp requires a value" >&2; exit 1; }
			otp="$2"
			shift 2
			;;
		--skip-checks)
			skip_checks=1
			shift
			;;
		--allow-dirty)
			allow_dirty=1
			shift
			;;
		--dry-run)
			dry_run=1
			shift
			;;
		-h|--help)
			usage
			exit 0
			;;
		*)
			echo "ERROR: unknown option: $1" >&2
			usage
			exit 1
			;;
	esac
done

[[ -f package.json ]] || { echo "ERROR: package.json not found in $SCRIPT_DIR" >&2; exit 1; }

require_command node
require_command npm
require_command git

package_name="$(node -p "require('./package.json').name")"
package_version="$(node -p "require('./package.json').version")"

echo "Preparing publish for ${package_name}@${package_version}"
echo "Options: tag=${tag}, access=${access}, skip_checks=${skip_checks}, allow_dirty=${allow_dirty}, dry_run=${dry_run}"

if [[ "$allow_dirty" -eq 0 ]]; then
	if [[ -n "$(git status --porcelain)" ]]; then
		echo "ERROR: git working tree is not clean. Commit/stash changes or use --allow-dirty." >&2
		exit 1
	fi
fi

if [[ "$skip_checks" -eq 0 ]]; then
	echo "[local-check] Running type check"
	npm run check

	echo "[local-check] Running package validation"
	npm run prepack

	echo "[local-check] Running npm pack dry-run"
	npm run pack:dry
else
	echo "[local-check] Skipping local checks (--skip-checks)"
fi

if [[ "$dry_run" -eq 1 ]]; then
	echo "Dry run completed. Publish step skipped."
	exit 0
fi

echo "[publish-preflight] Verifying npm login"
npm whoami >/dev/null

echo "[publish-preflight] Checking duplicate version on npm"
if npm view "${package_name}@${package_version}" version >/dev/null 2>&1; then
	echo "ERROR: ${package_name}@${package_version} is already published on npm." >&2
	exit 1
fi

publish_args=(--access "$access" --tag "$tag")
if [[ -n "$otp" ]]; then
	publish_args+=(--otp "$otp")
fi

echo "Publishing to npm..."
npm publish "${publish_args[@]}"
echo "Publish completed: ${package_name}@${package_version}"
