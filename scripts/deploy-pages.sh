#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-${CLOUDFLARE_DELPHIC_API_TOKEN:-}}"
export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-${CLOUDFLARE_DELPHIC_ACCOUNT_ID:-}}"
if [[ -z "${CLOUDFLARE_API_TOKEN}" || -z "${CLOUDFLARE_ACCOUNT_ID}" ]]; then
  echo "Missing CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID (or CLOUDFLARE_DELPHIC_*)." >&2
  exit 1
fi
bun run build
bunx wrangler pages deploy ./out --project-name=1st-single-photocard --branch=main
