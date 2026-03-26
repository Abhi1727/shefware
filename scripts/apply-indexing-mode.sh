#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-/var/www/shefware/backend/.env}"
NGINX_SITE="${2:-/etc/nginx/sites-available/shefware.com}"
DIST_DIR="${3:-/var/www/shefware/frontend/dist}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE" >&2
  exit 1
fi

if [[ ! -f "$NGINX_SITE" ]]; then
  echo "Missing nginx site file: $NGINX_SITE" >&2
  exit 1
fi

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Missing frontend dist directory: $DIST_DIR" >&2
  exit 1
fi

INDEXING_ENABLED="$(awk -F= '/^INDEXING_ENABLED=/{print tolower($2)}' "$ENV_FILE" | tr -d '[:space:]')"
INDEXING_ENABLED="${INDEXING_ENABLED:-false}"
NOINDEX_VALUE='noindex, nofollow, noarchive, nosnippet, noimageindex'

python3 - "$DIST_DIR/index.html" "$INDEXING_ENABLED" "$NOINDEX_VALUE" <<'PY'
from pathlib import Path
import sys

index_file = Path(sys.argv[1])
indexing_enabled = sys.argv[2] == "true"
noindex = sys.argv[3]
html = index_file.read_text()

robots_tag = f'<meta name="robots" content="{noindex}" />'
googlebot_tag = f'<meta name="googlebot" content="{noindex}" />'

for tag in (robots_tag, googlebot_tag):
    html = html.replace("    " + tag + "\n", "")
    html = html.replace(tag + "\n", "")
    html = html.replace(tag, "")

if not indexing_enabled:
    marker = '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n'
    insertion = marker + f"    {robots_tag}\n    {googlebot_tag}\n"
    html = html.replace(marker, insertion, 1)

index_file.write_text(html)
PY

if [[ "$INDEXING_ENABLED" == "true" ]]; then
  printf "User-agent: *\nAllow: /\n" > "$DIST_DIR/robots.txt"
else
  printf "User-agent: *\nDisallow: /\n" > "$DIST_DIR/robots.txt"
fi

python3 - "$NGINX_SITE" "$INDEXING_ENABLED" "$NOINDEX_VALUE" <<'PY'
from pathlib import Path
import sys

nginx_file = Path(sys.argv[1])
indexing_enabled = sys.argv[2] == "true"
noindex = sys.argv[3]

line = f'    add_header X-Robots-Tag "{noindex}" always;\n'
text = nginx_file.read_text()
text = text.replace(line, "")

if not indexing_enabled:
    marker = "    # Prevent indexing while site is in development.\n"
    if marker in text:
        text = text.replace(marker, marker + line, 1)
    else:
        text = text.replace("    index index.html;\n", "    index index.html;\n\n" + line, 1)

nginx_file.write_text(text)
PY

nginx -t
systemctl reload nginx

if [[ "$INDEXING_ENABLED" == "true" ]]; then
  echo "Indexing mode applied: ENABLED"
else
  echo "Indexing mode applied: DISABLED"
fi
