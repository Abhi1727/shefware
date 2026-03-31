#!/usr/bin/env bash
set -euo pipefail

# Load common profile files so PATH includes node/npm in non-interactive CI SSH sessions.
[[ -f /etc/profile ]] && source /etc/profile || true
[[ -f "$HOME/.profile" ]] && source "$HOME/.profile" || true
[[ -f "$HOME/.bashrc" ]] && source "$HOME/.bashrc" || true
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"

BUNDLE_DIR="${1:-}"
APP_ROOT="${2:-/var/www/shefware}"
PM2_APP_NAME="${3:-shefware-api}"

resolve_cmd() {
  local cmd="$1"
  if command -v "$cmd" >/dev/null 2>&1; then
    command -v "$cmd"
    return 0
  fi
  for candidate in "/usr/local/bin/$cmd" "/usr/bin/$cmd" "/bin/$cmd"; do
    if [[ -x "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done
  return 1
}

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
NPM_BIN="$(resolve_cmd npm || true)"
PM2_BIN="$(resolve_cmd pm2 || true)"
RSYNC_BIN="$(resolve_cmd rsync || true)"
CURL_BIN="$(resolve_cmd curl || true)"

if [[ -z "$NPM_BIN" ]]; then
  echo "npm not found in PATH during deployment." >&2
  exit 1
fi

if [[ -z "$PM2_BIN" ]]; then
  echo "pm2 not found in PATH during deployment." >&2
  exit 1
fi

if [[ -z "$RSYNC_BIN" ]]; then
  echo "rsync not found in PATH during deployment." >&2
  exit 1
fi

if [[ -z "$CURL_BIN" ]]; then
  echo "curl not found in PATH during deployment." >&2
  exit 1
fi

mkdir -p "$BACKEND_DIR" "$FRONTEND_DIST_DIR" "$SCRIPTS_DIR"

echo "Syncing backend..."
"$RSYNC_BIN" -a --delete --exclude ".env" "$BUNDLE_DIR/backend/" "$BACKEND_DIR/"

echo "Installing backend dependencies..."
"$NPM_BIN" ci --omit=dev --prefix "$BACKEND_DIR"

echo "Syncing frontend dist..."
"$RSYNC_BIN" -a --delete "$BUNDLE_DIR/frontend/dist/" "$FRONTEND_DIST_DIR/"

echo "Syncing deployment scripts..."
"$RSYNC_BIN" -a "$BUNDLE_DIR/scripts/" "$SCRIPTS_DIR/"
chmod +x "$SCRIPTS_DIR/"*.sh

if "$PM2_BIN" describe "$PM2_APP_NAME" >/dev/null 2>&1; then
  echo "Restarting PM2 app: $PM2_APP_NAME"
  "$PM2_BIN" restart "$PM2_APP_NAME"
else
  echo "Starting PM2 app: $PM2_APP_NAME"
  "$PM2_BIN" start "$BACKEND_DIR/src/server.js" --name "$PM2_APP_NAME"
fi

"$PM2_BIN" save || true

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
"$CURL_BIN" -fsS "http://127.0.0.1:${PORT_VALUE}/api/health" >/dev/null

echo "Deployment complete. Health check passed on port ${PORT_VALUE}."
