#!/usr/bin/env bash
set -euo pipefail

BUNDLE_DIR="${1:-}"
APP_ROOT="${2:-/var/www/shefware}"
PM2_APP_NAME="${3:-shefware-api}"

if [[ -z "$BUNDLE_DIR" ]]; then
  echo "Usage: $0 <bundle_dir> [app_root] [pm2_app_name]" >&2
  exit 1
fi

if [[ ! -d "$BUNDLE_DIR/backend" ]]; then
  echo "Missing backend in bundle: $BUNDLE_DIR/backend" >&2
  exit 1
fi

if [[ ! -d "$BUNDLE_DIR/frontend/dist" ]]; then
  echo "Missing frontend dist in bundle: $BUNDLE_DIR/frontend/dist" >&2
  exit 1
fi

if [[ ! -d "$BUNDLE_DIR/scripts" ]]; then
  echo "Missing scripts in bundle: $BUNDLE_DIR/scripts" >&2
  exit 1
fi

BACKEND_DIR="$APP_ROOT/backend"
FRONTEND_DIST_DIR="$APP_ROOT/frontend/dist"
SCRIPTS_DIR="$APP_ROOT/scripts"

mkdir -p "$BACKEND_DIR" "$FRONTEND_DIST_DIR" "$SCRIPTS_DIR"

echo "Syncing backend..."
rsync -a --delete --exclude ".env" "$BUNDLE_DIR/backend/" "$BACKEND_DIR/"

echo "Installing backend dependencies..."
npm ci --omit=dev --prefix "$BACKEND_DIR"

echo "Syncing frontend dist..."
rsync -a --delete "$BUNDLE_DIR/frontend/dist/" "$FRONTEND_DIST_DIR/"

echo "Syncing deployment scripts..."
rsync -a "$BUNDLE_DIR/scripts/" "$SCRIPTS_DIR/"
chmod +x "$SCRIPTS_DIR/"*.sh

if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  echo "Restarting PM2 app: $PM2_APP_NAME"
  pm2 restart "$PM2_APP_NAME"
else
  echo "Starting PM2 app: $PM2_APP_NAME"
  pm2 start "$BACKEND_DIR/src/server.js" --name "$PM2_APP_NAME"
fi

pm2 save || true

if [[ -f "$BACKEND_DIR/.env" && -f "/etc/nginx/sites-available/shefware.com" ]]; then
  echo "Applying indexing mode and reloading nginx..."
  if command -v sudo >/dev/null 2>&1; then
    sudo -n "$SCRIPTS_DIR/apply-indexing-mode.sh" \
      "$BACKEND_DIR/.env" \
      "/etc/nginx/sites-available/shefware.com" \
      "$FRONTEND_DIST_DIR"
  else
    "$SCRIPTS_DIR/apply-indexing-mode.sh" \
      "$BACKEND_DIR/.env" \
      "/etc/nginx/sites-available/shefware.com" \
      "$FRONTEND_DIST_DIR"
  fi
else
  echo "Skipping apply-indexing-mode (missing .env or nginx config)."
fi

PORT_VALUE="$(awk -F= '/^PORT=/{print $2}' "$BACKEND_DIR/.env" 2>/dev/null | tr -d '[:space:]')"
PORT_VALUE="${PORT_VALUE:-5000}"
curl -fsS "http://127.0.0.1:${PORT_VALUE}/api/health" >/dev/null

echo "Deployment complete. Health check passed on port ${PORT_VALUE}."
